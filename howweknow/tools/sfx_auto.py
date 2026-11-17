#!/usr/bin/env python3
"""SOUND ON THE FRAME (engine v7, CINEMA §5): place the film's signature sounds on the events of its world, so sound and picture hit together.
  python3 tools/sfx_auto.py episodes/<slug> [--dry]      (run after world.py, before vo.py/mix.py; it rewrites episode.json lines' `sfx`)
Rules (quiet, few, fitting — owner: "few fitting sound effects"):
- a `flash` event → a tiny bright tick (blip_click), at most one every 1.5 s
- a `Mark` drawn on (k 0→1) → a pen scratch (scratch)
- `shake` keyed up on the camera → a low impact (impact_sub_hit)
- a `stamp` text arriving → a soft thud (thud_soft)
- a `sheen` sweep → an airy whoosh (transition_whoosh_airy), quiet
- a camera `dolly` or a `shot` change of ≥ 2 sizes → a deep, very quiet whoosh (swoosh_deep)
- a line tagged `setpiece` starting → nothing new (the score swells there); a held breath (`hold: true` on a line) → strips every sfx in that line
Existing hand-placed `sfx` are kept; auto ones are marked "auto": true and replaced on each run. At most 4 sfx per line, ≥ 1.2 s apart."""
import json, os, re, sys
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); T = json.load(open(f'{ep}/timeline.json')); LN = T['lines']
SF = lambda n: f'public/sfx/{n}_1.wav' if os.path.exists(f'public/sfx/{n}_1.wav') else f'public/sfx/{n}.wav'
def tabs(t):
    if isinstance(t, (int, float)): return float(t)
    if t == 'end': return T['duration']
    m = re.match(r'^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$', str(t))
    if not m: return None
    l = LN[int(m.group(1))]; x = l['start'] + (l['dur'] if m.group(2) else 0)
    if m.group(3): j = l['text'].lower().find(m.group(3).lower()); x = l['start'] + l['dur'] * max(0, j) / max(1, len(l['text'])) * .97
    return x + float(m.group(4) or 0)
ev = []   # (time, sound, db)
for e in E['world']:
    p = e.get('props') or {}; ks = e.get('keys') or []
    if e['type'] == 'flash':
        last = -9
        for f in sorted((tabs(a[0]) for a in p.get('at', []) if tabs(a[0]) is not None)):
            if f - last >= 1.5: ev.append((f, 'blip_click', -30)); last = f
    if e['type'] == 'art' and p.get('name') == 'Mark':
        for k in ks:
            if k.get('k', 0) > .5 and tabs(k['t']) is not None: ev.append((tabs(k['t']), 'scratch', -26))
    if e['type'] == 'camera':
        for k in ks:
            t = tabs(k['t'])
            if t is None: continue
            if k.get('shake', 0) > .3: ev.append((t, 'impact_sub_hit', -24))
            if k.get('dolly', 0) > .4: ev.append((t, 'swoosh_deep', -30))
    if e['type'] == 'text' and p.get('style') == 'stamp':
        for k in ks:
            if k.get('k', 0) > .5 and tabs(k['t']) is not None: ev.append((tabs(k['t']) + .2, 'thud_soft', -24))
    if e['type'] == 'sheen':
        for k in ks:
            if k.get('k', 0) > .5 and tabs(k['t']) is not None: ev.append((tabs(k['t']) + .3, 'transition_whoosh_airy', -32))
lines = E['lines']; n = 0
for l in lines: l['sfx'] = [s for s in l.get('sfx', []) if not s.get('auto')]
for t, snd, db in sorted(ev):
    i = max((x['i'] for x in LN if x['start'] <= t), default=0); l = lines[i]
    if l.get('hold'): continue
    at = round(t - LN[i]['start'], 2)
    if len(l['sfx']) >= 4 or any(abs(s['at'] - at) < 1.2 for s in l['sfx']): continue
    l['sfx'].append({'at': at, 'file': SF(snd), 'db': db, 'auto': True}); n += 1
print(f'sfx_auto {E["slug"]}: {len(ev)} events → {n} sounds placed')
if '--dry' not in sys.argv: json.dump(E, open(f'{ep}/episode.json', 'w'), indent=1, ensure_ascii=False)
