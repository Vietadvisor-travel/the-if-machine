#!/usr/bin/env python3
"""Resolve the variety gate's mechanical clashes in a script source BEFORE review: two lines running with the same `in`/`trans`, or one
composition three lines running → swap to the nearest effect of the same meaning (FX.md families). Prints every change for the review.
  python3 tools/plan_fix.py episodes/<slug>      (rewrites lines.py in place; run lines.py again afterwards)"""
import json, re, sys
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); P = [l['plan'] for l in E['lines']]; src = open(f'{ep}/lines.py').read()
ALT_IN = {'grow': ['ink-on', 'quill'], 'ink-on': ['quill', 'grow'], 'quill': ['ink-on', 'grow'], 'slide': ['drop', 'assemble'], 'drop': ['slide', 'rise'], 'rise': ['drop', 'slide'],
          'stamp': ['bloom', 'drop'], 'bloom': ['iris', 'stamp'], 'iris': ['wipe', 'bloom'], 'wipe': ['iris', 'blinds'], 'unroll': ['blinds', 'wipe'], 'blinds': ['unroll', 'wipe'],
          'flip': ['tear-in', 'slide'], 'tear-in': ['wipe', 'flip'], 'assemble': ['slide', 'grow']}
ALT_TR = {'trace': ['ride', 'morph'], 'ride': ['trace', 'through'], 'real-reveal': ['match', 'through'], 'window': ['through', 'scale-in'], 'page-turn': ['fold', 'tear-away'],
          'fold': ['page-turn', 'collapse'], 'collapse': ['eclipse', 'fold'], 'eclipse': ['light-change', 'collapse'], 'scale-out': ['collapse', 'scale-in'], 'scale-in': ['through', 'window'],
          'morph': ['match', 'trace'], 'match': ['morph', 'ride'], 'light-change': ['eclipse', 'morph'], 'tear-away': ['fold', 'page-turn'], 'through': ['scale-in', 'window'], 'window-close': ['fold', 'collapse']}
changes = []
def setp(i, k, v):
    global src
    old = P[i][k]; text = E['lines'][i]['text']; key = text[:60]
    a = src.index(json.dumps(text, ensure_ascii=False)[1:61]) if json.dumps(text, ensure_ascii=False)[1:61] in src else src.index(text[:50])
    pos = {'in': 0, 'trans': 1, 'comp': 3}[k]; seg = src[a:a + 1600]
    m = re.search(r"'([^']*)', '([^']*)', '([^']*)', '([^']*)', \[", seg); g = list(m.groups()); assert g[pos] == old, (i, k, g, old)
    g[pos] = v; new = "'" + "', '".join(g) + "', ["; src = src[:a + m.start()] + new + src[a + m.end():]; P[i][k] = v; changes.append(f'L{i} {k}: {old} → {v}')
for k, ALT in (('in', ALT_IN), ('trans', ALT_TR)):
    for i in range(1, len(P)):
        if P[i][k] == P[i - 1][k]:
            for c in ALT.get(P[i][k], []):
                if c != P[i - 1][k] and (i + 1 >= len(P) or c != P[i + 1][k]): setp(i, k, c); break
for i in range(2, len(P)):
    if P[i]['comp'] == P[i - 1]['comp'] == P[i - 2]['comp']:
        setp(i - 1, 'comp', P[i - 1]['comp'].replace('large', 'medium') if 'large' in P[i - 1]['comp'] else P[i - 1]['comp'] + '-close')
open(f'{ep}/lines.py', 'w').write(src); print('\n'.join(changes) or 'no clashes')
