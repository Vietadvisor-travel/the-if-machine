#!/usr/bin/env python3
"""CHAIN gate — engine 11 (owner 19 Nov 2026: sun-fire 6/10 vs drifting-continents 8.5: "cái chính là visual, vẽ, các cảnh ấn tượng, sự chuyển
biến, biến đổi"). The chain is where the film is won or lost; sun-fire v1 reused a chain written before the lesson and drew "an object on a
brown wall + arrows / a tape / a number". Every link now names WHERE we are and what the WORLD does.
  python3 tools/chain_check.py <slug>        (jobs/scripts/<slug>_chain.md)
Link format (one per line):  N. [★] <PLACE> :: <what the world physically does> → <the next picture> | <camera> | <sound>
  PLACE   a real place with depth and scale (a quarry at dawn, the core of the Sun, a Victorian study) — never "a dark/plain background", "void"
  WORLD   a physical transformation of the world itself — something moves, splits, joins, melts, cracks, floods, grows, shrinks, turns into…
          A link whose only change is a label, an arrow, a number, a counter, a caption, a highlight or the camera FAILS.
  CANVAS  ≥ 40 % of links stay in the same PLACE as the link before (one world keeps transforming, like drifting's map), and ≥ 12 places.
  ★       ≥ 10 inventions; 40–70 links."""
import re, sys
slug = sys.argv[1]; P = f'{__import__("os").path.dirname(__file__)}/../../jobs/scripts/{slug}_chain.md'
L = [l.strip() for l in open(P) if re.match(r'^\s*\d+\.', l)]
STRONG = r'\b(becom|turns? into|turn|melt|crack|split|join|merg|grow|shrink|open|fold|unfold|pour|flood|fill|drain|burn|sink|rise|drift|explod|collaps|swallow|assembl|shatter|morph|flow|spill|swell|peel|freez|thaw|tear|break|fuse|bloom|wither|erupt|spin|orbit|fall|drop|fly|race|run|walk|climb|dive|push|pull|squeez|stretch|bend|twist|roll|slide|crumble|dissolv|condens|boil|ignit|flare|fade out|go(es)? out|age|decay|build|stack|carve|dig|bore|pierce|pass(es)? through|change|swap|trade)'
WEAK = r'\b(label|arrow|number|counter|caption|title|tag|text|highlight|circle[sd]?|underline|zoom|pan|camera|appears?)\b'
err = []; places = []
if not 40 <= len(L) <= 70: err.append(f'{len(L)} links (40–70)')
if sum('★' in l for l in L) < 10: err.append(f'{sum("★" in l for l in L)} ★ inventions (≥ 10)')
for l in L:
    n = l.split('.')[0]
    if '::' not in l or '→' not in l: err.append(f'link {n}: format "N. [★] PLACE :: what the world does → next | camera | sound"'); places.append(None); continue
    place, rest = l.split('::', 1); place = re.sub(r'^\s*\d+\.\s*(★\s*)?', '', place).strip().lower(); world = rest.split('→')[0].lower()
    places.append(place)
    if re.search(r'\b(dark|plain|blank|empty)\s+(background|wall|page)|\bvoid\b', place): err.append(f'link {n}: PLACE "{place}" is not a place')
    if not re.search(STRONG, world) and re.search(WEAK, world): err.append(f'link {n}: only a label/arrow/number/camera changes — "{world.strip()[:60]}"')
    elif not re.search(STRONG, world): err.append(f'link {n}: no physical transformation of the world in "{world.strip()[:60]}"')
ok = [p for p in places if p]; same = sum(1 for i in range(1, len(places)) if places[i] and places[i] == places[i - 1])
if len(set(ok)) < 12: err.append(f'{len(set(ok))} places (≥ 12)')
if L and same / len(L) < .4: err.append(f'CANVAS {same}/{len(L)} links stay in the same place ({same / len(L):.0%} < 40 %) — let one world keep transforming')
print(f'chain_check {slug}: {len(L)} links · {len(set(ok))} places · canvas {same}/{len(L)}'); [print('  ERROR', e) for e in err]; print('FAIL' if err else 'PASS'); sys.exit(1 if err else 0)
