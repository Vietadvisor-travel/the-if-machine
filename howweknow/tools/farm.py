#!/usr/bin/env python3
"""Render farm (owner 17 Nov 2026: "càng bào được càng tốt" — free, quality untouched).
  python3 tools/farm.py <slug> [--chunk S] [--only 0,6] [--to DIR] [--wait 50] [--local-only]
The film's chunks are rendered IN PARALLEL on free GitHub runners (public repo vietadvisor-travel/frame-batch, up to 20 at once),
then tools/render.py joins them and renders locally whatever did not come back. Same bundle, same Remotion, same Chromium build
(Playwright's headless shell), same flags → the same frames; tools/farm_check.py proves it before the farm is trusted.
Privacy: the public repo holds only a generic runner; job.json carries opaque Drive ids, never names. The pack (bundle + only this
film's files) and the returned chunks travel through the owner's private Drive (_farm/<sig>) and are deleted afterwards.
Needs: the repo attached to the session (add_repo vietadvisor-travel/frame-batch, push) and a clone at /home/user/frame-batch."""
import argparse, hashlib, json, math, os, re, shutil, subprocess, sys, tarfile, time
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); sys.path.insert(0, os.path.join(H, '..', 'studio', 'tools'))
ap = argparse.ArgumentParser(); ap.add_argument('slug'); ap.add_argument('--chunk', type=float, default=0); ap.add_argument('--only', default='')
ap.add_argument('--to', default=''); ap.add_argument('--wait', type=float, default=50); ap.add_argument('--local-only', action='store_true')
ap.add_argument('--conc', type=int, default=4); ap.add_argument('--crf', type=int, default=17)
A = ap.parse_args(); S = A.slug; FB = '/home/user/frame-batch'
log = lambda *a: print(time.strftime('%H:%M:%S'), 'farm', *a, flush=True)
tl = json.load(open(f'public/ep/{S}/timeline.json')); N = math.ceil(tl['duration'] * 30)
CH = A.chunk or max(15, math.ceil(tl['duration'] / 20)); STEP = int(CH * 30); NCH = math.ceil(N / STEP)
sig = hashlib.md5(open(f'public/ep/{S}/episode.json', 'rb').read() + open(f'public/ep/{S}/timeline.json', 'rb').read()   # = render.py's
                  + b''.join(open(os.path.join(d, f), 'rb').read() for d, _, fs in os.walk('src') for f in sorted(fs) if f.endswith(('.ts', '.tsx')))).hexdigest()[:10]
D = A.to or f'out/chunks/{S}'; os.makedirs(D, exist_ok=True)
name = lambda i: f'{D}/{sig}_{i:03d}.mp4'
want = lambda i: min(N - 1, i * STEP + STEP - 1) - i * STEP + 1


def frames_in(p):
    r = subprocess.run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', p], capture_output=True, text=True)
    try: return int(r.stdout.strip().strip(',').split(',')[0])
    except ValueError: return -1


def finish():
    if A.to or A.only: return
    log(f'local pass: render.py --chunk {CH:g} (joins, fills anything missing)')
    os.execvp('python3', ['python3', 'tools/render.py', S, '--chunk', f'{CH:g}', '--concurrency', str(A.conc), '--crf', str(A.crf)])


def pack():
    B = f'/tmp/farm_{S}'; shutil.rmtree(B, ignore_errors=True)
    subprocess.run(['npx', 'remotion', 'bundle', '--out-dir', f'{B}/b'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pub = f'{B}/b/public'; keep = set()
    E = open(f'public/ep/{S}/episode.json').read()
    for top in ('ep/' + S, 'fonts', 'brand', 'core', 'tex', 'music'): keep.add(top)
    for m in set(re.findall(r'"((?:stock|sfx|core|tex|brand)/[^"]+)"', E)): keep.add(m)
    tmp = f'{B}/keep'; os.makedirs(tmp)
    for k in keep:
        src = f'{pub}/{k}'
        if os.path.isdir(src): shutil.copytree(src, f'{tmp}/{k}', dirs_exist_ok=True)
        elif os.path.isfile(src): os.makedirs(os.path.dirname(f'{tmp}/{k}'), exist_ok=True); shutil.copy2(src, f'{tmp}/{k}')
    shutil.rmtree(pub); os.rename(tmp, pub)
    for f in ('package.json', 'package-lock.json', 'remotion.config.ts'): shutil.copy2(f, f'{B}/{f}')
    shell = os.path.basename(os.path.dirname(os.path.dirname(os.path.realpath('/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell'))))
    pw = subprocess.run(['node', '-e', "console.log(require('playwright/package.json').version)"], cwd='/tmp', capture_output=True, text=True).stdout.strip()
    json.dump({'slug': S}, open(f'{B}/props.json', 'w'))
    json.dump({'n': N, 'step': STEP, 'crf': A.crf, 'conc': A.conc, 'pw': pw, 'shell': shell}, open(f'{B}/meta.json', 'w'))
    out = f'/tmp/farm_{S}.tgz'
    with tarfile.open(out, 'w:gz') as t:
        for f in os.listdir(B): t.add(f'{B}/{f}', arcname=f)
    log(f'pack {os.path.getsize(out) / 1e6:.0f} MB (Chromium {shell}, Playwright {pw})'); return out


def main():
    todo = [int(x) for x in A.only.split(',')] if A.only else [i for i in range(NCH) if not (os.path.exists(name(i)) and frames_in(name(i)) == want(i))]
    log(f'{S}: {N} frames · {NCH} chunks of {CH:g} s · {len(todo)} to farm · sig {sig}')
    if not todo or A.local_only: return
    if not os.path.isdir(f'{FB}/.git'):
        r = subprocess.run(['git', 'clone', '-q', '--depth', '1', 'https://github.com/Vietadvisor-travel/frame-batch', FB])
        if r.returncode: log('frame-batch not reachable (add_repo vietadvisor-travel/frame-batch) — rendering locally'); return
    import pp_drive as dv
    p = pack(); root = dv.folder(create=True); fd = dv.mkdir(sig, dv.mkdir('_farm', root))
    for f in dv.children(fd): dv.call(f"files/{f['id']}", method='DELETE')   # a clean slate for this run
    dv.put([p], f'_farm/{sig}'); pid = next(f['id'] for f in dv.children(fd) if f['name'] == os.path.basename(p))
    json.dump({'p': pid, 'o': fd, 'todo': todo, 't': int(time.time())}, open(f'{FB}/job.json', 'w')); open(f'{FB}/job.json', 'a').write('\n')
    g = lambda *a: subprocess.run(['git', '-C', FB, *a], capture_output=True, text=True)
    g('pull', '-q', '--rebase'); g('add', 'job.json'); g('commit', '-qm', 'batch')
    for k in range(4):
        if g('-c', 'push.negotiate=true', 'push', '-q', 'origin', 'main').returncode == 0: break
        time.sleep(2 ** (k + 1))
    else: log('push to frame-batch failed — rendering locally'); return
    log(f'dispatched {len(todo)} chunks to the farm; waiting up to {A.wait:g} min')
    left, t0 = set(todo), time.time()
    while left and time.time() - t0 < A.wait * 60:
        time.sleep(30)
        try: have = {f['name']: f for f in dv.children(fd)}
        except SystemExit: continue
        for i in sorted(left):
            f = have.get(f'{i}.mp4')
            if not f: continue
            tmp = name(i) + '.farm.mp4'
            r = dv.call(f"files/{f['id']}", {'alt': 'media'})
            with open(tmp, 'wb') as w: shutil.copyfileobj(r, w, 1 << 22)
            if frames_in(tmp) == want(i): os.replace(tmp, name(i)); left.discard(i); log(f'chunk {i} back ({len(todo) - len(left)}/{len(todo)})')
            else: os.remove(tmp)
    if left: log(f'{len(left)} chunks did not come back in time: {sorted(left)} — local pass renders them')
    try: dv.call(f'files/{fd}', method='DELETE')   # the film's files leave Drive's _farm
    except SystemExit: pass
    try: os.remove(p)
    except OSError: pass


try: main()
except Exception as e: log(f'farm error ({type(e).__name__}: {e}) — rendering locally')
finish()
