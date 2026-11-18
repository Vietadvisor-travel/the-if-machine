#!/usr/bin/env python3
"""SOUND gate (owner 18 Nov 2026, dinosaur-killer: "nhạc vẫn bị to quá… nhạc vui tươi, không phải nhạc bí ẩn hoặc nền phù hợp từng đoạn… cần thêm
hiệu ứng âm thanh ở một số điểm nhấn và các thành phần, đừng spam và quá to… quá trình mày làm vẫn cứ sót cái này cái kia").
  python3 tools/sound_check.py episodes/<slug>      (make.sh runs it before the mix)
- every music cue of a part that is not playful/triumph/warm comes from score.py MYSTERY_OK (hand-curated dark/ambient tracks)
- music cue level ≤ −20 dB (score.py LEVEL); one cue per part, no cue shorter than 60 s
- sound effects: 3–10 per minute, on actions (hand-placed in world.py), ≥ 1.2 s apart inside a line, each ≤ −24 dB (impacts ≤ −20)"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json')); LN = TL['lines']; D = TL['duration']
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'score.py')).read()
OK = set(re.findall(r"'([a-z_0-9]+)'", re.search(r'MYSTERY_OK = \{(.*?)\}', src, re.S).group(1)))
err = []; cues = (E.get('music') or {}).get('cues') or []
def tabs(t):
    if isinstance(t, (int, float)): return float(t)
    m = re.match(r'^L(\d+)([+\-]\d*\.?\d+)?$', t); return LN[int(m.group(1))]['start'] + float(m.group(2) or 0)
for j, c in enumerate(cues):
    name = os.path.basename(c['file'])[:-4]; t0 = tabs(c['at']); t1 = tabs(cues[j + 1]['at']) if j + 1 < len(cues) else D
    li = max(i for i, l in enumerate(LN) if l['start'] <= t0 + 2); mood = E['lines'][li].get('mood', 'mystery')
    if mood not in ('playful', 'triumph', 'warm') and name not in OK: err.append(f'music cue {name} at L{li} ({mood}) is not in MYSTERY_OK — a cheerful track under a mysterious part')
    if c.get('db', -16) > -20: err.append(f'music cue {name}: {c["db"]} dB (≤ −20)')
    if t1 - t0 < 55 and j + 1 < len(cues): err.append(f'music cue {name} lasts {t1 - t0:.0f} s (≥ 60)')
n = 0
for i, l in enumerate(E['lines']):
    s = sorted(l.get('sfx') or [], key=lambda x: x['at']); n += len(s)
    for a, b in zip(s, s[1:]):
        if b['at'] - a['at'] < 1.2: err.append(f'L{i}: two sfx {b["at"] - a["at"]:.1f} s apart ({os.path.basename(a["file"])}, {os.path.basename(b["file"])})')
    for x in s:
        cap = -20 if re.search(r'bass_drop|glass_break|impact_heavy', x['file']) else -24
        if x['db'] > cap: err.append(f'L{i}: {os.path.basename(x["file"])} at {x["db"]} dB (≤ {cap})')
pm = n / (D / 60)
if pm > 10: err.append(f'{n} sound effects = {pm:.1f}/min (≤ 10 — no spam)')
if pm < 3: err.append(f'{n} sound effects = {pm:.1f}/min (≥ 3 — the accents and the things on screen need their sound)')
print(f'sound_check {E["slug"]}: {len(cues)} music cues · {n} sfx ({pm:.1f}/min)'); [print('  ERROR', e) for e in err[:30]]
print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
