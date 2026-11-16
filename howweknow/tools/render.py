#!/usr/bin/env python3
"""Crash-proof, hang-proof film render (owner 16 Nov 2026: "không có cơ chế chống sập và chống đơ à").
  python3 tools/render.py <slug> [--chunk 60] [--concurrency 3]   → out/<slug>_silent.mp4
- The film is rendered in CHUNKS (default 60 s), each by a fresh Chrome: a memory leak or a crash costs one chunk, never the film.
- RESUME: a chunk already on disk with the right number of frames is kept (the episode's world/timeline hash is part of its name,
  so a changed film never reuses stale chunks).
- WATCHDOG: if a chunk prints no progress for --stall seconds (default 300) it is killed and retried; a failed chunk is retried
  up to --tries times (default 3), with fewer parallel tabs each time.
- The chunks are joined losslessly (ffmpeg concat, stream copy)."""
import hashlib, json, math, os, signal, subprocess, sys, time, argparse
ap = argparse.ArgumentParser(); ap.add_argument('slug'); ap.add_argument('--chunk', type=float, default=60); ap.add_argument('--concurrency', type=int, default=4)
ap.add_argument('--stall', type=int, default=300); ap.add_argument('--tries', type=int, default=3); ap.add_argument('--crf', type=int, default=17)
A = ap.parse_args(); R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); os.chdir(R)
S = A.slug; tl = json.load(open(f'public/ep/{S}/timeline.json')); N = math.ceil(tl['duration'] * 30)
sig = hashlib.md5(open(f'public/ep/{S}/episode.json', 'rb').read() + open(f'public/ep/{S}/timeline.json', 'rb').read()
                  + b''.join(open(os.path.join(d, f), 'rb').read() for d, _, fs in os.walk('src') for f in sorted(fs) if f.endswith(('.ts', '.tsx')))).hexdigest()[:10]
D = f'out/chunks/{S}'; os.makedirs(D, exist_ok=True); B = f'/tmp/fathom_bundle_{S}'
log = lambda *a: print(time.strftime('%H:%M:%S'), *a, flush=True)
log(f'render {S}: {N} frames · chunks of {A.chunk:g} s · signature {sig}')
subprocess.run(['npx', 'remotion', 'bundle', '--out-dir', B], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def frames_in(p):
    r = subprocess.run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', p], capture_output=True, text=True)
    try: return int(r.stdout.strip().strip(',').split(',')[0])
    except ValueError: return -1

def run_chunk(a, b, out, conc):
    tmp = out + '.part.mp4'
    cmd = ['npx', 'remotion', 'render', B, 'Story', tmp, f'--props={json.dumps({"slug": S})}', f'--frames={a}-{b}', '--muted', f'--crf={A.crf}',
           f'--concurrency={conc}', '--timeout=120000', '--log=info']
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, start_new_session=True)
    os.set_blocking(p.stdout.fileno(), False); last, buf = time.time(), ''
    while p.poll() is None:
        try: chunk = p.stdout.read()
        except Exception: chunk = None
        if chunk: buf = (buf + chunk)[-4000:]; last = time.time()
        if time.time() - last > A.stall:
            log(f'  stalled {A.stall} s — killing'); os.killpg(p.pid, signal.SIGKILL); p.wait(); return False, buf
        time.sleep(2)
    rest = p.stdout.read() or ''; buf = (buf + rest)[-4000:]
    if p.returncode == 0 and frames_in(tmp) == b - a + 1: os.replace(tmp, out); return True, buf
    return False, buf

step = int(A.chunk * 30); parts = []
for i, a in enumerate(range(0, N, step)):
    b = min(N - 1, a + step - 1); out = f'{D}/{sig}_{i:03d}.mp4'; parts.append(out)
    if os.path.exists(out) and frames_in(out) == b - a + 1: log(f'chunk {i} ({a}-{b}) already rendered'); continue
    for k in range(A.tries):
        t0 = time.time(); ok, tail = run_chunk(a, b, out, max(1, A.concurrency - k))
        if ok: log(f'chunk {i} ({a}-{b}) ok in {time.time() - t0:.0f} s'); break
        log(f'chunk {i} ({a}-{b}) FAILED (try {k + 1}/{A.tries}):', tail.strip().splitlines()[-1:] if tail.strip() else '')
        subprocess.run(['pkill', '-9', '-f', 'chrome-headless-shell'], stderr=subprocess.DEVNULL)
    else: sys.exit(f'render: chunk {i} failed {A.tries} times — see the error above')
with open(f'{D}/list.txt', 'w') as f: f.writelines(f"file '{os.path.abspath(p)}'\n" for p in parts)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{D}/list.txt', '-c', 'copy', f'out/{S}_silent.mp4'], check=True)
n = frames_in(f'out/{S}_silent.mp4'); log(f'joined {len(parts)} chunks → out/{S}_silent.mp4 ({n}/{N} frames)')
if n != N: sys.exit('render: frame count mismatch after join')
for f in os.listdir(D):   # keep only this film's current chunks
    if not f.startswith(sig) and f.endswith('.mp4'): os.remove(f'{D}/{f}')
