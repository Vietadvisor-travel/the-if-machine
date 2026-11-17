#!/usr/bin/env python3
"""Director's treatment gate (CINEMA.md §1).  python3 tools/treatment_check.py <slug>
PASS when jobs/scripts/<slug>_treatment.md has all ten parts filled, three set pieces each with all six fields, ≥ 4 motif returns, 3 held
breaths; and (once episodes/<slug>/episode.json exists) the lines carry the plan: ≥ 3 lines tagged `setpiece`, ≥ 4 tagged `motif`."""
import json, os, re, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); slug = sys.argv[1]
p = f'{H}/../jobs/scripts/{slug}_treatment.md'
if not os.path.exists(p): sys.exit(f'treatment_check {slug}: no {p} (template jobs/scripts/_TREATMENT.md)\nFAIL')
t = open(p).read(); err = []
parts = ['Logline', 'The feeling', 'Governing image', 'Visual metaphors', 'Set pieces', 'Hero', 'Colour script', 'Light script', 'Rhythm', 'Bookends']
for i, name in enumerate(parts, 1):
    m = re.search(rf'^## {i}\. {re.escape(name)}.*?$(.*?)(?=^## |\Z)', t, re.M | re.S)
    if not m: err.append(f'part {i} "{name}" missing'); continue
    body = re.sub(r'^- [^:\n]+:\s*$', '', m.group(1), flags=re.M).strip()
    if len(re.sub(r'[#\-\s:…?L]', '', body)) < 25: err.append(f'part {i} "{name}" is empty')
sp = re.findall(r'^### Set piece \d.*?$(.*?)(?=^### |^## |\Z)', t, re.M | re.S)
if len(sp) < 3: err.append(f'{len(sp)} set pieces (need 3)')
for n, b in enumerate(sp, 1):
    for f in ('idea', 'staging', 'camera', 'transformation', 'sound moment', 'reveal'):
        if not re.search(rf'^- {f}:\s*\S.{{8,}}', b, re.M): err.append(f'set piece {n}: `{f}` not written')
ret = re.search(r'returns.*?:(.*)', t)
if not ret or len(re.findall(r'L\d+', ret.group(1))) < 4: err.append('motif returns: name ≥ 4 lines (L12 — …)')
hb = re.search(r'held breaths.*?:(.*)', t)
if not hb or len([x for x in re.split(r'[·;,]', hb.group(1)) if len(x.strip()) > 3]) < 3: err.append('rhythm: three held breaths')
C = f'{H}/../jobs/scripts/{slug}_chain.md'   # CINEMA §0: the unbroken chain of transformations
if not os.path.exists(C): err.append(f'no chain {C} (CINEMA §0: 40–70 links "picture → how/why → picture", ★ on ten inventions)')
else:
    links = [l for l in open(C).read().splitlines() if '→' in l]; stars = sum(1 for l in links if '★' in l)
    if len(links) < 40: err.append(f'chain: {len(links)} links (need ≥ 40)')
    if stars < 10: err.append(f'chain: {stars} ★ inventions (need 10)')
E_ = f'{H}/episodes/{slug}/episode.json'
if os.path.exists(E_):
    L = json.load(open(E_)).get('lines', [])
    if sum(1 for l in L if l.get('setpiece')) < 3: err.append('lines.py: tag the set-piece lines (`setpiece`: 1|2|3) — fewer than 3 tagged')
    if sum(1 for l in L if l.get('motif')) < 4: err.append('lines.py: tag ≥ 4 lines where the motif returns (`motif`: "…")')
print(f'treatment_check {slug}: {10 - sum(1 for e in err if e.startswith("part"))}/10 parts · {len(sp)} set pieces')
[print('  ERROR', e) for e in err]; print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
