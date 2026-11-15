#!/usr/bin/env python3
"""Check an episode's story world before rendering: known entity types, unique ids, every time ref resolves against the real
timeline, every asset exists in public/, keys only on known props. python3 tools/check_world.py episodes/<slug>"""
import json, os, re, sys
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json'))
TYPES = {'camera', 'art', 'planet', 'pin', 'beam', 'arc', 'label', 'shape', 'lens', 'clue'}
KITS = {'Sky', 'Stars', 'Sun', 'Moon', 'Earth', 'Ridge', 'Water', 'Palm', 'Obelisk', 'Temple', 'Well', 'Scholar', 'Astrolabe', 'Telescope', 'Candle', 'SeaChart', 'Rose', 'Ship', 'Angle', 'GoldBeam', 'Pinned', 'DocumentPage', 'Eyepiece'}
err, ids = [], set()
def tref(r, where):
    if isinstance(r, (int, float)): return r
    m = re.match(r'^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$', str(r).strip())
    if r == 'end': return TL['duration']
    if not m: err.append(f'{where}: bad time "{r}"'); return 0
    i = int(m.group(1))
    if i >= len(TL['lines']): err.append(f'{where}: no line {i}'); return 0
    if m.group(3) and m.group(3).lower() not in TL['lines'][i]['text'].lower(): err.append(f'{where}: word "{m.group(3)}" not in line {i}')
    return 0
def walk(ents, path=''):
    for e in ents:
        w = path + e.get('id', '?')
        if e.get('id') in ids: err.append(f'{w}: duplicate id')
        ids.add(e.get('id'))
        if e.get('type') not in TYPES: err.append(f'{w}: unknown type {e.get("type")}')
        p = e.get('props', {})
        if e.get('type') == 'art' and p.get('name') not in KITS: err.append(f'{w}: unknown kit {p.get("name")}')
        for f in ('src',):
            v = p.get(f)
            if v and not re.match(r'^https?:', v) and not os.path.exists(f'public/{v}'): err.append(f'{w}: missing asset public/{v} (Muse → Drive → sync)')
        for k in e.get('keys', []): tref(k.get('t'), w + '.key')
        if e.get('children'): walk(e['children'], w + '/')
walk(E.get('world', []))
if not any(e.get('type') == 'camera' for e in E.get('world', [])): err.append('no camera entity')
print(f'check_world {E["slug"]}: {len(ids)} entities'); [print('  ERROR', x) for x in err]; print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
