#!/usr/bin/env python3
"""EVENT gate (owner 18 Nov 2026, dinosaur-killer v1 rejected: "cảnh tĩnh (không có diễn biến gì) quá nhiều… chuyển cảnh và hiệu ứng lặp đi lặp lại").
still_check counted ANY key in flight — a camera drift or a slow 10-second linear crawl made a dead scene look "busy". This gate counts only
EVENTS: something in the scene visibly HAPPENS — an entity is brought on, leaves, or one of its own props changes in a key of ≤ 3 s
(a hand moves, a needle swings, a page turns, a figure acts). Camera, light, grain, dust, ambient sway and slow crawls (> 3 s) never count.
  python3 tools/event_check.py episodes/<slug> [--gap 2.5]
FAIL if any stretch longer than --gap seconds has no event START, or if a line has fewer than (its seconds / 2.5) events.
Also checks the camera grammar: world `camera_moves` (one named move per line, from tools/v6 CAMERA vocabulary) — no move on > 2 lines
running and no move on more than 12 % of lines; and transitions (`becomes.how` in lines.py) — none used more than 3 times."""
import json, re, sys, collections
ep = sys.argv[1].rstrip('/'); GAP = float(sys.argv[sys.argv.index('--gap') + 1]) if '--gap' in sys.argv else 2.5
E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json')); LN = TL['lines']; D = TL['duration']
def tabs(t):
    if isinstance(t, (int, float)): return float(t)
    if t == 'end': return D
    m = re.match(r'^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$', t); l = LN[int(m.group(1))]; x = l['start']
    if m.group(2) == '$': x += l['dur']
    return x + float(m.group(4) or 0)
SKIP = {'camera', 'lamp', 'shaft', 'motes', 'shadow', 'haze', 'sheen', 'particles', 'clue', 'spot'}
AMB = {'sway', 'bob', 'breathe', 'tremble', 'para', 'drift', 'light', 'tm', 'dissolveSeed', 'blur'}
ev = []
def walk(e):
    if e['type'] in SKIP: return
    cur = dict(e.get('props') or {})
    for k in sorted(e.get('keys') or [], key=lambda k: tabs(k['t'])):
        t0 = tabs(k['t']); d = k.get('dur', 1.2)
        ch = [q for q, v in k.items() if q not in ('t', 'dur', 'ease') and q not in AMB and cur.get(q) != v]
        if ch and (d <= 3.0 or ch == ['a']): ev.append((t0, e['id'], ','.join(ch)))
        cur.update({q: v for q, v in k.items() if q not in ('t', 'dur', 'ease')})
    if e['type'] == 'flash': ev.extend((tabs(f[0]), e['id'], 'flash') for f in (e.get('props') or {}).get('at', []))
    for c in e.get('children') or []: walk(c)
for e in E['world']: walk(e)
ev.sort(); ts = [t for t, _, _ in ev if 0 <= t <= D]
err = []
gaps = [(a, b) for a, b in zip([LN[0]['start']] + ts, ts + [LN[-1]['start'] + LN[-1]['dur']]) if b - a > GAP]
for a, b in gaps:
    li = max(i for i, l in enumerate(LN) if l['start'] <= a + .01); err.append(f'L{li} {a:6.1f}–{b:6.1f} s: {b - a:.1f} s with nothing happening')
for i, l in enumerate(LN):
    n = sum(1 for t in ts if l['start'] <= t < l['start'] + l['dur']); need = max(1, int(l['dur'] / 2.5))
    if n < need: err.append(f'L{i}: {n} events in {l["dur"]:.1f} s (need ≥ {need})')
cm = E.get('camera_moves') or []
if cm:
    c = collections.Counter(cm)
    for k, v in c.items():
        if v > .12 * len(cm) + .5: err.append(f'camera move "{k}" on {v} of {len(cm)} lines (> 12 %)')
    for i in range(2, len(cm)):
        if cm[i] == cm[i - 1] == cm[i - 2]: err.append(f'camera move "{cm[i]}" three lines running (L{i - 2}–L{i})')
else: err.append('no `camera_moves` in episode.json — name one camera move per line')
hows = collections.Counter(l.get('becomes', {}).get('how') for l in E['lines'] if l.get('becomes'))
for k, v in hows.items():
    if v > 3: err.append(f'transition "{k}" used {v} times (≤ 3)')
print(f'event_check {E["slug"]}: {len(ts)} events in {D:.0f} s ({len(ts) / D * 10:.1f} per 10 s) · camera moves {len(set(cm))} kinds')
for x in err[:60]: print('  ERROR', x)
if len(err) > 60: print(f'  … {len(err) - 60} more')
print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
