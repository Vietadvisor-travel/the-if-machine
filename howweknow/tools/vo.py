#!/usr/bin/env python3
"""How We Know — narration: episode.json → one wav per line (Kokoro, af_heart) → placed voice track + timeline.json.
  python3 tools/vo.py episodes/<slug>
Lines play back to back: lead before the first, `gap` (default .45 s) before each next line, tail after the last."""
import json, os, sys
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'studio', 'tools'))
import voice as V   # studio/tools/voice.py: Kokoro + pronunciations + *stress*

ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); SR = 24000
out = f'{ep}/build'; os.makedirs(out, exist_ok=True)
t, lines, parts = E.get('lead', .8), [], []
for i, L in enumerate(E['lines']):
    if i: t += L.get('gap', .45)
    s, sr = V.tts(L['text'], E.get('voice', 'af_heart'), E.get('speed', .92))[:2]
    if sr != SR: raise SystemExit(f'unexpected sample rate {sr}')
    d = len(s) / SR; lines.append({'i': i, 'text': L['text'].replace('*', ''), 'start': round(t, 3), 'dur': round(d, 3), 'sfx': L.get('sfx', [])}); parts.append((t, s)); t += d
total = t + E.get('tail', 1.6)
track = np.zeros(int(total * SR) + SR, dtype=np.float32)
for st, s in parts: a = int(st * SR); track[a:a + len(s)] += s
sf.write(f'{out}/vo.wav', track[:int(total * SR)], SR)
json.dump({'slug': E['slug'], 'duration': round(total, 3), 'lines': lines}, open(f'{ep}/timeline.json', 'w'), indent=1)
print(f'{len(lines)} lines · {total:.1f} s →', f'{ep}/timeline.json')
