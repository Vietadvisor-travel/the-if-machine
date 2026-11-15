#!/usr/bin/env python3
"""English subtitles from the voiced timeline: python3 tools/srt.py episodes/<slug> → out/<slug>.srt
One cue per spoken line, split into ≤ 2 rows of ≤ 42 characters; long lines become several cues timed by their share of words."""
import json, os, re, sys
ep = sys.argv[1].rstrip('/'); TL = json.load(open(f'{ep}/timeline.json')); slug = os.path.basename(ep)
ts = lambda t: f'{int(t // 3600):02d}:{int(t % 3600 // 60):02d}:{int(t % 60):02d},{int(round(t % 1 * 1000)) % 1000:03d}'
def rows(words, w=42):
    out, cur = [], ''
    for x in words:
        if len(cur) + len(x) + 1 > w and cur: out.append(cur); cur = x
        else: cur = (cur + ' ' + x).strip()
    return out + ([cur] if cur else [])
cues = []
for L in TL['lines']:
    text = re.sub(r'\*', '', L['text']).strip(); r = rows(text.split()); chunks = [r[i:i + 2] for i in range(0, len(r), 2)]
    n = sum(len(' '.join(c).split()) for c in chunks); t = L['start']
    for c in chunks:
        d = L['dur'] * len(' '.join(c).split()) / max(1, n); cues.append((t, t + d, '\n'.join(c))); t += d
os.makedirs('out', exist_ok=True); o = f'out/{slug}.srt'
open(o, 'w').write('\n'.join(f'{i + 1}\n{ts(a)} --> {ts(b)}\n{x}\n' for i, (a, b, x) in enumerate(cues)))
print(f'srt → {o} ({len(cues)} cues)')
