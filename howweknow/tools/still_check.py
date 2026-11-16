#!/usr/bin/env python3
"""Stillness gate (owner 17 Nov 2026: "một số cảnh vẫn bị tĩnh — chả có gì xảy ra trong vài giây").
  python3 tools/still_check.py episodes/<slug> [--max 2.5]
Walks the film in 0.25 s steps and asks: is ANY visible thing changing right now (a key in flight: something being drawn, moving,
morphing, counting, a figure acting)? Ambient life (dust, boil, breathe, sway) does NOT count — the viewer must see something HAPPEN.
Every stretch longer than --max seconds with nothing happening is listed with its line and what is on screen, and the film FAILS."""
import json, re, sys
ep = sys.argv[1].rstrip('/'); MAX = float(sys.argv[sys.argv.index('--max') + 1]) if '--max' in sys.argv else 2.5
E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json')); LN = TL['lines']; D = TL['duration']
def tabs(t):
    if isinstance(t, (int, float)): return float(t)
    if t == 'end': return D
    m = re.match(r'^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$', t); l = LN[int(m.group(1))]; x = l['start']
    if m.group(2) == '$': x += l['dur']
    elif m.group(3): j = l['text'].lower().find(m.group(3).lower()); x += l['dur'] * max(0, j) / max(1, len(l['text'])) * .97
    return x + float(m.group(4) or 0)
AMBIENT = {'sway', 'bob', 'breathe', 'tremble', 'para', 'drift', 'light'}
busy = []   # (t0, t1) intervals where something visibly changes
def walk(e):
    if e['type'] in ('clue',): return
    cur = dict(e.get('props') or {})
    for k in sorted(e.get('keys') or [], key=lambda k: tabs(k['t'])):
        t0 = tabs(k['t']); d = k.get('dur', 1.2); ch = [q for q, v in k.items() if q not in ('t', 'dur', 'ease') and q not in AMBIENT and cur.get(q) != v]
        if ch and d >= .2 and not (ch == ['a'] and e['type'] == 'particles'): busy.append((t0, t0 + d))
        cur.update({q: v for q, v in k.items() if q not in ('t', 'dur', 'ease')})
    if e['type'] == 'art' and (e.get('props') or {}).get('src', '').endswith(('.mp4', '.webm', '.mov')): busy.append((0, D))   # footage moves by itself (approx.)
    if e['type'] == 'flash': busy.extend((tabs(f[0]), tabs(f[0]) + .6) for f in (e.get('props') or {}).get('at', []))   # a scintillation is an event
    if e['type'] == 'stream': p = e.get('props') or {}; busy.append((tabs(p.get('t0', 0)), tabs(p['until']) + p.get('dur', 1.6) if 'until' in p else D))   # beads keep flowing
    for c in e.get('children') or []: walk(c)
for e in E['world']: walk(e)
step, dead, run = .25, [], None
t = LN[0]['start']; end = LN[-1]['start'] + LN[-1]['dur']
while t < end:
    on = any(a <= t < b for a, b in busy)
    if not on and run is None: run = t
    if on and run is not None:
        if t - run > MAX: dead.append((run, t))
        run = None
    t += step
if run is not None and end - run > MAX: dead.append((run, end))
line = lambda t: max((l['i'] for l in LN if l['start'] <= t), default=0)
tot = sum(b - a for a, b in dead)
print(f'still_check {E["slug"]}: {len(dead)} dead stretches > {MAX:g} s · {tot:.0f} s of {end:.0f} s ({100 * tot / end:.0f} %) with nothing happening')
for a, b in dead: print(f'  {int(a // 60)}:{a % 60:04.1f}–{int(b // 60)}:{b % 60:04.1f}  ({b - a:.1f} s)  L{line(a)}: "{LN[line(a)]["text"][:70]}"')
print('PASS' if not dead else 'FAIL'); sys.exit(1 if dead else 0)
