#!/usr/bin/env python3
"""v5/v6 shot-plan gate (STORY.md §7, §8).  python3 tools/plan_check.py episodes/<slug>   — films with "standard" ≥ 5; v6 adds shot + light."""
import json, re, sys
from collections import Counter
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); L = E['lines']
if E.get('standard', 4) < 5: print(f'plan_check {E["slug"]}: standard {E.get("standard", 4)} film — skipped'); sys.exit(0)
KINDS = set(re.findall(r'`([a-z-]+)`', open('FX.md').read().split('## H. BECOMES')[1])) | {'ink-on'}
err = []; hows = []
for i, l in enumerate(L):
    for f in ('reads', 'focus', 'becomes', 'acts'):
        if not l.get(f): err.append(f'L{i}: no `{f}`')
    b = l.get('becomes') or {}; h = b.get('how'); hows.append(h)
    if h and h not in KINDS: err.append(f'L{i}: becomes.how "{h}" is not in FX.md §H (add the row first)')
    if b and not (b.get('from') and b.get('to')) and h != 'ink-on': err.append(f'L{i}: becomes needs from and to')
    if i and h and h == hows[i - 1] and h != 'ink-on': err.append(f'L{i}: "{h}" twice running')
    acts = sorted(a[0] for a in l.get('acts') or []); words = len(l['text'].split()); d = words / 2.35
    for a, b2 in zip([0] + acts, acts + [d]):
        if b2 - a > 2.6: err.append(f'L{i}: nothing happens for {b2 - a:.1f} s (acts at {acts}, line ≈ {d:.1f} s)'); break
if E.get('standard', 4) >= 6:   # v6 (STORY.md §8): the film is SHOT like a film — shot sizes vary, every scene has a light, people have faces
    SHOTS = {'wide', 'medium', 'close', 'insert', 'detail', 'over'}; sh = [l.get('shot') for l in L]
    for i, l in enumerate(L):
        if l.get('shot') not in SHOTS: err.append(f'L{i}: no `shot` (one of {sorted(SHOTS)})')
        if not l.get('light'): err.append(f'L{i}: no `light` (where the light comes from: "lamp over the bench", "window left", "open sky"…)')
        if i >= 3 and len(set(sh[i - 3:i + 1])) == 1: err.append(f'L{i}: four `{sh[i]}` shots running — change the size')
    near = sum(1 for x in sh if x in ('close', 'insert', 'detail')); nn = len(L)
    if near < nn * .3: err.append(f'only {near} of {nn} lines are close / insert / detail shots (≥ 30 %)')
    if sum(1 for x in sh if x == 'wide') > nn * .4: err.append('more than 40 % wide shots — come closer')
c = Counter(h for h in hows if h); n = len(L)
if len([k for k in c if k != 'ink-on']) < 14: err.append(f'only {len(c)} kinds of becoming (≥ 14): {dict(c)}')
for k, v in c.items():
    if v > n * (.15 if k == 'ink-on' else .12) + 1: err.append(f'"{k}" on {v} of {n} lines (too many)')
print(f'plan_check {E["slug"]}: {n} lines · {len(c)} kinds of becoming'); [print('  ERROR', e) for e in err[:40]]
print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
