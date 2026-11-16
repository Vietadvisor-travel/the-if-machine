#!/usr/bin/env python3
"""How We Know — narration: episode.json → one wav per line (Kokoro, af_heart) → placed voice track + timeline.json.
  python3 tools/vo.py episodes/<slug>
Lines play back to back: lead before the first, `gap` (default .45 s) before each next line, tail after the last."""
import json, os, sys, hashlib
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'studio', 'tools'))
import voice as V   # studio/tools/voice.py: Kokoro + pronunciations + *stress*

ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); SR = 24000
out = f'{ep}/build'; os.makedirs(out, exist_ok=True)
t, lines, parts = E.get('lead', .8), [], []
for i, L in enumerate(E['lines']):
    if i: t += L.get('gap', .45)
    vv, sp, pt = E.get('voice', 'af_heart'), E.get('speed', .92), E.get('pitch', 1.0); key = hashlib.md5((f"{L['text']}|{vv}|{sp}" + (f"|{pt}" if pt != 1.0 else "")).encode()).hexdigest()[:16]; cf = f'{out}/cache/{key}.wav'   # v4: a line is voiced once
    if os.path.exists(cf): s, sr = sf.read(cf, dtype='float32')
    else:
        s, sr = V.tts(L['text'], vv, sp)[:2]; os.makedirs(f'{out}/cache', exist_ok=True); sf.write(cf, s, sr)
        if pt != 1.0:   # a deeper narrator (owner 16 Nov 2026): pitch down with the formants kept, same length
            import subprocess; tmp = cf + '.raw.wav'; os.replace(cf, tmp)
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af', f'rubberband=pitch={pt}:formant=preserved', '-ar', str(SR), '-ac', '1', cf], check=True); os.remove(tmp)
            s, sr = sf.read(cf, dtype='float32')
    if sr != SR: raise SystemExit(f'unexpected sample rate {sr}')
    d = len(s) / SR; lines.append({'i': i, 'text': L['text'].replace('*', ''), 'start': round(t, 3), 'dur': round(d, 3), 'sfx': L.get('sfx', [])}); parts.append((t, s)); t += d
total = t + E.get('tail', 1.6)
track = np.zeros(int(total * SR) + SR, dtype=np.float32)
for st, s in parts: a = int(st * SR); track[a:a + len(s)] += s
sf.write(f'{out}/vo.wav', track[:int(total * SR)], SR)
json.dump({'slug': E['slug'], 'duration': round(total, 3), 'lines': lines}, open(f'{ep}/timeline.json', 'w'), indent=1)
import shutil; os.makedirs(f'public/ep/{E["slug"]}', exist_ok=True); shutil.copy(f'{ep}/episode.json', f'public/ep/{E["slug"]}/episode.json'); shutil.copy(f'{ep}/timeline.json', f'public/ep/{E["slug"]}/timeline.json')
print(f'{len(lines)} lines · {total:.1f} s →', f'{ep}/timeline.json')
