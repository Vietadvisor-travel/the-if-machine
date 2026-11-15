#!/usr/bin/env python3
"""Variety gate (FX.md rules) — no repeated effects/scenes inside a film or across films.
  python3 tools/variety.py episodes/<slug> [--record] [--short]
Reads lines[i].plan {in, trans, cam, life[], comp, set, new[], stock[]} and the world; compares with history.json."""
import json, os, sys, collections
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); short = '--short' in sys.argv
HP = os.path.join(os.path.dirname(__file__), '..', 'history.json'); H = json.load(open(HP)) if os.path.exists(HP) else {'episodes': {}}
FX = open(os.path.join(os.path.dirname(__file__), '..', 'FX.md')).read()
L = E['lines']; plans = [l.get('plan') or {} for l in L]; err, warn = [], []
for i, p in enumerate(plans):
    for k in ('in', 'trans', 'cam', 'comp'):
        if not p.get(k): err.append(f'L{i}: plan.{k} missing')
    for k in ('in', 'trans', 'cam'):
        if p.get(k) and f'`{p[k]}`' not in FX: err.append(f'L{i}: plan.{k} "{p[k]}" is not in FX.md (add the new effect there first)')
def share(key, cap, minkinds):
    v = [p.get(key) for p in plans if p.get(key)]; c = collections.Counter(v)
    for k, n in c.items():
        if len(v) >= 10 and n / len(v) > cap: err.append(f'{key} "{k}" on {n}/{len(v)} lines (> {int(cap * 100)} %)')
    if not short and len(c) < minkinds: err.append(f'only {len(c)} different {key} ids (need ≥ {minkinds})')
    for i in range(1, len(plans)):
        if plans[i].get(key) and plans[i].get(key) == plans[i - 1].get(key) and key in ('in', 'trans'): err.append(f'L{i - 1}–L{i}: the same {key} "{plans[i][key]}" twice running')
share('in', .20, 9); share('trans', .20, 8); share('cam', .35, 5)
life = {x for p in plans for x in (p.get('life') or [])}
if not short and len(life) < 4: err.append(f'only {len(life)} life effects (need ≥ 4)')
for i in range(2, len(plans)):
    if plans[i].get('comp') and plans[i].get('comp') == plans[i - 1].get('comp') == plans[i - 2].get('comp'): err.append(f'L{i - 2}–L{i}: composition "{plans[i]["comp"]}" three lines running')
sets = [p['set'] for p in plans if p.get('set')]; new = sorted({x for p in plans for x in (p.get('new') or [])})
def arts(ents, out):
    for e in ents:
        n = (e.get('props') or {}).get('name') if e.get('type') == 'art' else e.get('type') if e.get('type') in ('planet',) else None
        if n: out.add(n)
        arts(e.get('children') or [], out)
    return out
used = arts(E.get('world', []), set())
past_sets = {s: k for k, v in H['episodes'].items() if k != E['slug'] for s in v.get('sets', [])}
past_art = {a for k, v in H['episodes'].items() if k != E['slug'] for a in v.get('arts', [])}
for s in set(sets):
    if s in past_sets: err.append(f'set-piece "{s}" was already used in {past_sets[s]} — invent a new one')
if not short:
    if len(set(sets)) < 5: err.append(f'{len(set(sets))} set-pieces (need ≥ 5 made for this film)')
    fresh = [a for a in used if a not in past_art]
    if H['episodes'] and used and len(fresh) / len(used) < .4: err.append(f'only {len(fresh)}/{len(used)} drawn elements are new to the channel (need ≥ 40 %)')
    if len(E.get('new_ideas', [])) < 2: err.append('`new_ideas` in episode.json: name ≥ 2 ideas new to the channel (a new effect or mechanism)')
print(f'variety {E["slug"]}: {len(L)} lines · in {len({p.get("in") for p in plans})} · trans {len({p.get("trans") for p in plans})} · sets {len(set(sets))} · elements {len(used)} ({len(new)} declared new)')
for e in err: print('  ERROR', e)
if '--record' in sys.argv and not err:
    H['episodes'][E['slug']] = {'sets': sorted(set(sets)), 'arts': sorted(used), 'new_ideas': E.get('new_ideas', []), 'in': sorted({p.get('in') for p in plans if p.get('in')}), 'trans': sorted({p.get('trans') for p in plans if p.get('trans')})}
    json.dump(H, open(HP, 'w'), indent=1); print('recorded in history.json')
print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
