#!/usr/bin/env python3
"""KEYFRAMES FIRST (engine v6, owner 17 Nov 2026): before the film is built out, 3 frames are made at FINAL quality and judged —
they set the bar every other scene must reach.
  python3 tools/keyframes.py <slug> [L0+6 L20+1.5 L46+3 …]   → out/<slug>_key_<n>.jpg (1920×1080) + out/<slug>_keyframes.jpg (sheet)
Default moments: the opening establishing shot, the governing image (the line whose plan says so, else the middle), the answer.
The sheet goes to the owner in the START message of the film (work continues; he can stop it), and to the critic: each keyframe must
score ≥ 8/10 on drawing · light and depth · composition · style (engraving) before the rest of the film is drawn to match."""
import json, re, subprocess, sys
slug = sys.argv[1]; refs = sys.argv[2:]
E = json.load(open(f'public/ep/{slug}/episode.json')); TL = json.load(open(f'public/ep/{slug}/timeline.json')); LN = TL['lines']
def tabs(t):
    if re.fullmatch(r'-?[\d.]+', t): return float(t)
    m = re.match(r'^L(\d+)(\$)?([+\-]\d*\.?\d+)?$', t); l = LN[int(m.group(1))]
    return l['start'] + (l['dur'] if m.group(2) else 0) + float(m.group(3) or 0)
if not refs:
    L = E.get('lines') or []; gov = next((i for i, l in enumerate(L) if 'governing' in json.dumps(l).lower()), len(LN) // 2)
    ans = next((i for i, l in enumerate(L) if str(l.get('section', '')).upper().startswith('ANSWER')), int(len(LN) * .8))
    refs = ['L0+5', f'L{gov}+2', f'L{ans}+2']
outs = []
for n, r in enumerate(refs):
    o = f'out/{slug}_key_{n + 1}.jpg'; f = int(round(tabs(r) * 30))
    subprocess.run(['npx', 'remotion', 'still', 'src/index.ts', 'Story', o, f'--frame={f}', '--props=' + json.dumps({'slug': slug}), '--image-format=jpeg', '--jpeg-quality=94'],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); outs.append(o); print(f'{r} (frame {f}) → {o}')
ins = sum((['-i', o] for o in outs), []); n = len(outs)
subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ''.join(f'[{i}]scale=1280:-1[v{i}];' for i in range(n)) + ''.join(f'[v{i}]' for i in range(n)) + f'vstack=inputs={n}' if n > 1 else '[0]scale=1280:-1',
                f'out/{slug}_keyframes.jpg'], check=True)
print(f'sheet → out/{slug}_keyframes.jpg')
