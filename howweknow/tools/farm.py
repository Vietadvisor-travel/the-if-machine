#!/usr/bin/env python3
"""Render farm (owner 17 Nov 2026: "càng bào được càng tốt… ổn định, tốc độ, nhưng vẫn fall back được về cơ chế cũ").
  python3 tools/farm.py <slug> [--chunk S] [--wait 60] [--dry]          (make.sh calls this; FARM=0 bash tools/make.sh … skips it)
  python3 tools/farm.py <slug> --only 0,6 --to DIR                       (test: farm just these chunks into DIR, no local pass)
HOW: the film is cut into ≤ 20 chunks. Chunks with real footage (video decoding differs between machines) are rendered HERE while every
other chunk goes to a free GitHub runner (public repo vietadvisor-travel/frame-batch, generic runner, no names; the pack and the results
travel through the owner's private Drive `_farm/<sig>`, deleted afterwards). Same bundle, same Remotion, same Chromium build, same flags.
SAFETY (the old engine is never at risk — the farm only ever ADDS finished chunks; tools/render.py joins and renders anything missing):
- each runner first drops `<i>.start`; no start at all within 15 min (a new batch cancels any older one still running) → the farm is down → everything renders here
- a runner that fails drops `<i>.fail` → that chunk renders here; a started chunk that does not come back in time → renders here
- every returned chunk: frame count checked, and ONE frame of it (`<i>.png`, a still the runner rendered) is rendered here too and
  measured: overall ≥ 45 dB PSNR AND the worst 64×64 detail ≥ 32 dB (quality(); owner: overall + detail OK, not pixel-exact) → a miss →
  ALL farm chunks are dropped and the whole film renders here
- any error in this script → the plain local render (render.py), exactly as before the farm existed."""
import argparse, hashlib, json, math, os, random, re, shutil, subprocess, sys, tarfile, time
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); sys.path.insert(0, os.path.join(H, '..', 'studio', 'tools'))
ap = argparse.ArgumentParser(); ap.add_argument('slug'); ap.add_argument('--chunk', type=float, default=0); ap.add_argument('--only', default='')
ap.add_argument('--to', default=''); ap.add_argument('--wait', type=float, default=60); ap.add_argument('--dry', '--local-only', action='store_true')
ap.add_argument('--conc', type=int, default=4); ap.add_argument('--crf', type=int, default=17)
A = ap.parse_args(); S = A.slug; FB = '/home/user/frame-batch'; BUNDLE = f'/tmp/fathom_bundle_{S}'
log = lambda *a: print(time.strftime('%H:%M:%S'), 'farm', *a, flush=True)
tl = json.load(open(f'public/ep/{S}/timeline.json')); N = math.ceil(tl['duration'] * 30)
CH = A.chunk or max(15, math.ceil(tl['duration'] / 20)); STEP = int(CH * 30); NCH = math.ceil(N / STEP)
sig = hashlib.md5(open(f'public/ep/{S}/episode.json', 'rb').read() + open(f'public/ep/{S}/timeline.json', 'rb').read()   # = render.py's
                  + b''.join(open(os.path.join(d, f), 'rb').read() for d, _, fs in os.walk('src') for f in sorted(fs) if f.endswith(('.ts', '.tsx')))).hexdigest()[:10]
D = A.to or f'out/chunks/{S}'; os.makedirs(D, exist_ok=True)
name = lambda i: f'{D}/{sig}_{i:03d}.mp4'
rng = lambda i: (i * STEP, min(N - 1, i * STEP + STEP - 1))
want = lambda i: rng(i)[1] - rng(i)[0] + 1
TEST = bool(A.to or A.only)
LOCALCMD = lambda idx: ['python3', 'tools/render.py', S, '--chunk', f'{CH:g}', '--concurrency', str(A.conc), '--crf', str(A.crf), '--bundle', BUNDLE] + (['--only', ','.join(map(str, idx))] if idx else [])


def frames_in(p):
    r = subprocess.run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', p], capture_output=True, text=True)
    try: return int(r.stdout.strip().strip(',').split(',')[0])
    except ValueError: return -1


# Quality gate (owner 17 Nov 2026: "không nhất thiết lệch 1 điểm là render lại… miễn là chất lượng tổng thể và chi tiết ok"):
#   OVERALL — PSNR of the whole frame ≥ PSNR_MIN dB (≥ 45 dB is far below what an eye can see; the 17 Nov footage chunk measured 50–57)
#   DETAIL  — the worst 64×64 tile ≥ TILE_MIN dB, so a local defect (a missing drawing, a wrong word, a broken corner) can never hide
#             inside a good average.
PSNR_MIN, TILE_MIN = 45.0, 32.0   # measured 17 Nov on runner-vs-local footage frames: 49–52 dB overall, 36–38 dB worst tile
#   (max 23/255 on 0.1 % of pixels, inside moving film grain — invisible); a missing or wrong element scores far below 25 dB


def rgb(p):
    import numpy as np
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True)
    if r.returncode or not r.stdout: return None
    return np.frombuffer(r.stdout, np.uint8).reshape(1080, 1920, 3).astype(np.float32)


def quality(a, b):
    """(ok, overall dB, worst-tile dB) between two decoded frames."""
    import numpy as np
    if a is None or b is None: return False, 0.0, 0.0
    db = lambda m: 99.0 if m <= 1e-10 else 10 * np.log10(255 ** 2 / m)
    d = (a - b) ** 2; whole = db(d.mean())
    t = d[:1024, :1920].reshape(16, 64, 30, 64, 3).mean(axis=(1, 3, 4)); worst = db(t.max())
    return whole >= PSNR_MIN and worst >= TILE_MIN, whole, worst


def bundle():
    subprocess.run(['npx', 'remotion', 'bundle', '--out-dir', BUNDLE], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def pack():
    B = f'/tmp/farm_{S}'; shutil.rmtree(B, ignore_errors=True); os.makedirs(B)
    shutil.copytree(BUNDLE, f'{B}/b', ignore=shutil.ignore_patterns('public'))   # the very bundle the local pass uses, minus the media library
    keep = {'ep/' + S, 'fonts', 'brand', 'core', 'tex', 'music'} | set(re.findall(r'"((?:stock|sfx|core|tex|brand)/[^"]+)"', open(f'public/ep/{S}/episode.json').read()))
    for k in keep:
        src = f'{BUNDLE}/public/{k}'; dst = f'{B}/b/public/{k}'
        if os.path.isdir(src): shutil.copytree(src, dst, dirs_exist_ok=True)
        elif os.path.isfile(src): os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy2(src, dst)
    for f in ('package.json', 'package-lock.json', 'remotion.config.ts', 'tsconfig.json'): shutil.copy2(f, f'{B}/{f}')
    shell = os.path.basename(os.path.dirname(os.path.dirname(os.path.realpath('/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell'))))
    pw = subprocess.run(['node', '-e', "console.log(require('playwright/package.json').version)"], cwd='/tmp', capture_output=True, text=True).stdout.strip()
    json.dump({'slug': S}, open(f'{B}/props.json', 'w'))
    json.dump({'n': N, 'step': STEP, 'crf': A.crf, 'conc': A.conc, 'pw': pw, 'shell': shell}, open(f'{B}/meta.json', 'w'))
    out = f'/tmp/farm_{S}.tgz'
    with tarfile.open(out, 'w:gz') as t:
        for f in os.listdir(B): t.add(f'{B}/{f}', arcname=f)
    shutil.rmtree(B, ignore_errors=True)
    log(f'pack {os.path.getsize(out) / 1e6:.0f} MB (Chromium {shell}, Playwright {pw})'); return out


def footage_spans():
    """[(t0, t1)] where real footage plays (17 Nov test: footage-free chunks were bit-identical on the runners; a chunk with footage was not)."""
    E = json.load(open(f'public/ep/{S}/episode.json')); LN = tl['lines']; out = []
    def tabs(t):
        if isinstance(t, (int, float)): return float(t)
        if t == 'end': return tl['duration']
        m = re.match(r'^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$', t); l = LN[int(m.group(1))]; x = l['start']
        if m.group(2) == '$': x += l['dur']
        elif m.group(3): j = l['text'].lower().find(m.group(3).lower()); x += l['dur'] * max(0, j) / max(1, len(l['text'])) * .97
        return x + float(m.group(4) or 0)
    def walk(e):
        p = e.get('props') or {}
        if str(p.get('src', '')).endswith(('.mp4', '.webm', '.mov')):
            ks = [(tabs(k['t']), k.get('dur', 1.2)) for k in e.get('keys') or []]
            out.append((min(t for t, _ in ks) - 1, max(t + d for t, d in ks) + 1) if ks else (0, tl['duration']))
        for c in e.get('children') or []: walk(c)
    for e in E['world']: walk(e)
    return out


def still_ok(i, png, k):
    """Render the same frame the runner rendered, here, and measure it (quality(): overall + worst detail)."""
    a, b = rng(i); f = a + (k * 7919 + i * 104729) % (b - a + 1); ref = f'/tmp/farm_ref_{S}_{i}.png'
    for _ in range(2):
        subprocess.run(['npx', 'remotion', 'still', BUNDLE, 'Story', ref, f'--props={json.dumps({"slug": S})}', f'--frame={f}', '--image-format=png',
                        '--timeout=120000', '--log=error'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        mine = rgb(ref)
        if mine is not None: break
    ok, whole, worst = quality(mine, rgb(png))
    for x in (ref, png):
        try: os.remove(x)
        except OSError: pass
    return ok, f'{f} · {whole:.0f} dB overall, {worst:.0f} dB worst detail'


def main():
    vid = []
    if A.only: todo = [int(x) for x in A.only.split(',')]
    else:
        todo = [i for i in range(NCH) if not (os.path.exists(name(i)) and frames_in(name(i)) == want(i))]
        if os.environ.get('FARM_FOOTAGE_LOCAL') == '1':   # footage decodes a hair differently on the runners (50–57 dB) — within the gate, so it farms too
            FS = footage_spans(); vid = [i for i in todo if any(rng(i)[0] / 30 < t1 and (rng(i)[1] + 1) / 30 > t0 for t0, t1 in FS)]
            todo = [i for i in todo if i not in vid]
    log(f'{S}: {N} frames · {NCH} chunks of {CH:g} s · {len(todo)} to the farm · {len(vid)} with footage stay here {vid} · sig {sig}')
    if A.dry or (not todo and not vid): return
    bundle()
    local = None
    if vid: local = subprocess.Popen(LOCALCMD(vid), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); log(f'local: rendering footage chunks {vid} meanwhile')
    if not todo: return local
    if not os.path.isdir(f'{FB}/.git') and subprocess.run(['git', 'clone', '-q', '--depth', '1', 'https://github.com/Vietadvisor-travel/frame-batch', FB]).returncode:
        log('frame-batch not attached to this session (add_repo vietadvisor-travel/frame-batch, push) — rendering here'); return local
    if not all(os.environ.get(k) for k in ('GDRIVE_CLIENT_ID', 'GDRIVE_CLIENT_SECRET', 'GDRIVE_REFRESH_TOKEN')):
        log('no Drive keys in this environment — rendering here'); return local
    import pp_drive as dv
    p = pack(); root = dv.folder(create=True); fd = dv.mkdir(sig, dv.mkdir('_farm', root))
    for f in dv.children(fd): dv.call(f"files/{f['id']}", method='DELETE')   # a clean slate for this run
    dv.put([p], f'_farm/{sig}'); pid = next(f['id'] for f in dv.children(fd) if f['name'] == os.path.basename(p)); os.remove(p)
    k = random.randint(1, 10 ** 6)
    g = lambda *a: subprocess.run(['git', '-C', FB, *a], capture_output=True, text=True)
    g('fetch', '-q', '--depth', '1', 'origin', 'main'); g('reset', '-q', '--hard', 'origin/main')
    json.dump({'p': pid, 'o': fd, 'todo': todo, 'k': k, 't': int(time.time())}, open(f'{FB}/job.json', 'w')); open(f'{FB}/job.json', 'a').write('\n')
    g('add', 'job.json'); g('commit', '-qm', 'batch')
    for n in range(4):
        if g('-c', 'push.negotiate=true', 'push', '-q', 'origin', 'HEAD:main').returncode == 0: break
        time.sleep(2 ** (n + 1))
    else: log('push to frame-batch failed — rendering here'); dv.call(f'files/{fd}', method='DELETE'); return local
    t0 = time.time(); log(f'dispatched {len(todo)} chunks; waiting up to {A.wait:g} min')
    left, started, back, gone, durs, pend = set(todo), {}, [], [], [], []
    def to_local(idx, why):
        idx = sorted(set(idx) & left)
        if not idx: return
        for i in idx: left.discard(i); gone.append(i)
        pend.extend(idx); log(f'chunks {idx} → rendered here ({why})')
    def pump():   # one local renderer at a time (4 cores): start the next batch when the last one is done
        nonlocal local
        if pend and not TEST and (local is None or local.poll() is not None):
            local = subprocess.Popen(LOCALCMD(sorted(pend)), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); pend.clear()
    while left:
        time.sleep(20); now = time.time(); pump()
        try: have = {f['name']: f for f in dv.children(fd)}
        except SystemExit: continue
        for i in sorted(left):
            if f'{i}.start' in have and i not in started: started[i] = now
            if f'{i}.fail' in have: to_local([i], 'the runner failed'); continue
            f, png = have.get(f'{i}.mp4'), have.get(f'{i}.png')
            if not (f and png): continue
            tmp = name(i) + '.farm.mp4'; tpng = f'/tmp/farm_{S}_{i}.png'
            with open(tmp, 'wb') as w: shutil.copyfileobj(dv.call(f"files/{f['id']}", {'alt': 'media'}), w, 1 << 22)
            with open(tpng, 'wb') as w: shutil.copyfileobj(dv.call(f"files/{png['id']}", {'alt': 'media'}), w, 1 << 22)
            if frames_in(tmp) != want(i): os.remove(tmp); to_local([i], 'wrong frame count'); continue
            ok, fr = still_ok(i, tpng, k)
            if not ok:   # quality is untouchable: one differing pixel and the farm's work is thrown away
                os.remove(tmp); log(f'QUALITY CHECK FAILED on chunk {i} (frame {fr}) — every farm chunk dropped, the whole film renders here')
                for j in back:
                    try: os.remove(name(j))
                    except OSError: pass
                back.clear(); left.clear(); break
            os.replace(tmp, name(i)); left.discard(i); back.append(i); durs.append(now - t0)
            log(f'chunk {i} back · frame {fr} · {len(back)}/{len(todo)}')
        if not left: break
        if not started and now - t0 > 900: to_local(list(left), 'no runner started within 15 min'); break
        late = [i for i in left if i in started and now - started[i] > max(1500, 3 * (max(durs) if durs else 0))]
        if late: to_local(late, 'too slow')
        if now - t0 > A.wait * 60: to_local(list(left), f'not back after {A.wait:g} min'); break
    pump()
    log(f'farm: {len(back)} chunks back in {(time.time() - t0) / 60:.1f} min · {len(gone)} rendered here instead')
    try: dv.call(f'files/{fd}', method='DELETE')   # the film's files leave Drive
    except SystemExit: pass
    return local


local = None
try: local = main()
except Exception as e: log(f'farm error ({type(e).__name__}: {e}) — the local render takes over')
if local is not None:
    try: local.wait()
    except Exception: pass
if not TEST and not A.dry:
    log(f'final pass: render.py --chunk {CH:g} (joins; renders anything still missing)')
    os.execvp('python3', LOCALCMD([]) if os.path.isdir(BUNDLE) else LOCALCMD([])[:-2])
