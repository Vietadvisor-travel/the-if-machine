#!/usr/bin/env python3
"""NOVELTY gate — engine v8 (owner 17 Nov 2026: "hình ảnh chỉ mới được 7 điểm… nhiều thành phần, hiệu ứng dùng lại nhiều lần giữa 1 tập và giữa
các tập. Nâng cấp thêm 1 bước nữa là SÁNG TẠO RA CÁC THỨ MỚI để dùng nếu cần thay vì chỉ dùng đi dùng lại").
  python3 tools/novelty.py episodes/<slug>              → PASS/FAIL with the counts
  python3 tools/novelty.py episodes/<slug> --record     → also writes this film's device counts into history.json (after delivery)
  python3 tools/novelty.py --baseline                   → (once) records the device counts of films already made (no gate)
What it measures in the built world (episode.json `world`), entity by entity:
  ENTRY  how a thing arrives  — ink-on · bleed · focus · iris · scale · glide · unroll · wipe · blinds · tear · pour · brush · window · burn · shatter …
  EXIT   how a thing leaves   — bleed · sweep-<dir> · bleed-to-point · fade · page-turn · collapse · burn · shatter · tear · lift-off …
  FRAMES the artefact frames  — DocumentPage · Pinned · CabinetCard · Clipping · Loupe · Eyepiece · FilmStrip · Etch
  MARKS  the pointers         — Mark · counter · ripple · quill hand · spot · lens · text styles (note / label / plate / figure / stamp)
  OWN    the film's own drawings — how many separate times each one is brought on
Rules — inside the film:
  E1 no ENTRY or EXIT recipe on more than 35 % of entities; ≥ 6 different of each
  E2 each artefact frame ≤ 4 times; Mark ≤ 5, counter ≤ 3, ripple ≤ 4, quill ≤ 2, spot ≤ 3; each text style ≤ 22
  E3 an own drawing brought on ≥ 5 separate times only if it is the film's motif (episode.json `motif_art`: [names])
Rules — against the films before it (history.json `devices`):
  X1 any device the last two films leaned on (≥ 6 uses in one of them) is used here at most 60 % as often — the film must find other ways
  X2 `new_devices` in episode.json: ≥ 3 devices INVENTED for this film (a new engine primitive, entity type, Fx prop, or a drawn mechanism with
     its own moving parts), each present in the world and never recorded for an earlier film. They are added to FX.md §K with a clip in fx-reel."""
import json, os, re, sys, collections, glob
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); HP = f'{R}/history.json'
FRAMES = ['DocumentPage', 'Pinned', 'CabinetCard', 'Clipping', 'Loupe', 'Eyepiece', 'FilmStrip', 'Etch']
SKIP = {'camera', 'lamp', 'shaft', 'motes', 'shadow', 'haze', 'sheen', 'particles', 'clue', 'flash', 'stream', 'swarm'}
CAPS = {'Mark': 5, 'counter': 3, 'ripple': 4, 'quill': 2, 'spot': 3, 'lens': 3}

def keys_t0(e):
    ks = e.get('keys') or []
    on = next((i for i, k in enumerate(ks) if k.get('a') == 1), 0); return ks, on

def entry(e):
    p, (ks, on) = e.get('props') or {}, keys_t0(e); near = ks[on:on + 4]; has = lambda q: any(q in k for k in near)
    for q, n in (('burn', 'burn'), ('shatter', 'shatter'), ('clipForm', 'window'), ('iris', 'iris'), ('unroll', 'unroll'), ('wipe', 'wipe'), ('blinds', 'blinds'),
                 ('tear', 'tear'), ('pour', 'pour'), ('brush', 'brush')):
        if q in p and has(q): return n
    if 'dissolve' in p and has('dissolve'): return 'bleed'
    if 'blur' in p and has('blur'): return 'focus'
    if p.get('fx_s', 1) != 1 and has('fx_s'): return 'scale'
    if (p.get('fx_x') or p.get('fx_y')) and (has('fx_x') or has('fx_y')): return 'glide'
    if 'draw' in p and has('draw'): return 'ink-on'
    if e['type'] == 'text': return 'write'
    return 'appear'

def exit_(e):
    ks = e.get('keys') or []
    for k in reversed(ks):
        if set(k) <= {'t', 'dur', 'ease', 'a'} and k.get('a') == 0 and k.get('dur', 1) <= .05: continue   # the instant hide after a transition
        if 'burn' in k: return 'burn'
        if 'shatter' in k: return 'shatter'
        if 'dissolve' in k and k['dissolve'] == 0: return 'bleed-to-point' if 'dissolveAt' in k else (f"sweep-{k['dissolveDir']}" if 'dissolveDir' in k else 'bleed')
        if 'flipY' in k or 'flipX' in k: return 'page-turn'
        if 'lift' in k and k['lift'] > 0: return 'lift-off'
        if 'tear' in k: return 'tear'
        if 'fx_s' in k and k['fx_s'] < .3: return 'collapse'
        if k.get('a') == 0: return 'fade'
    return None

def devices(E):
    W = E.get('world', []); c = collections.Counter(); runs = collections.Counter(); ent, ex = collections.Counter(), collections.Counter()
    def walk(es):
        for e in es:
            t = e['type']; p = e.get('props') or {}; name = p.get('name')
            if t in SKIP: c[t] += 1 if t in ('flash', 'stream', 'swarm') else 0; walk(e.get('children') or []); continue
            if t == 'text':
                c['text:' + p.get('style', 'plate')] += 1
                if 'num' in p: c['counter'] += 1
            elif t == 'hand': c['quill'] += 1
            elif t in ('ripple', 'spot', 'lens', 'trail', 'shape', 'planet', 'pin'): c[t] += 1
            elif t == 'art' and name:
                if name in FRAMES or name == 'Mark': c[name] += 1
                elif name not in ('Sky', 'Stars', 'TitleCard', 'EndCard', 'Person'): runs[name] += 1
                if name == 'Person': c['Person'] += 1
            if t != 'text':
                ent['in:' + entry(e)] += 1; x = exit_(e)
                if x: ex['out:' + x] += 1
            walk(e.get('children') or [])
    walk(W)
    return c, runs, ent, ex

def check(ep):
    E = json.load(open(f'{ep}/episode.json')); slug = E['slug']; H = json.load(open(HP)); err, info = [], []
    c, runs, ent, ex = devices(E)
    for name, cnt, minimum in (('ENTRY', ent, 6), ('EXIT', ex, 6)):
        tot = sum(cnt.values()) or 1; top = cnt.most_common(3)
        info.append(f'{name}: {len(cnt)} kinds · ' + ', '.join(f'{k.split(":")[1]} {v} ({100 * v // tot} %)' for k, v in top))
        if len(cnt) < minimum: err.append(f'E1 only {len(cnt)} kinds of {name.lower()} (≥ {minimum}): {dict(cnt)}')
        for k, v in cnt.items():
            if v / tot > .35: err.append(f'E1 {name.lower()} "{k.split(":")[1]}" on {v} of {tot} entities ({100 * v // tot} % > 35 %) — find other ways in/out')
    for f in FRAMES:
        if c[f] > 4: err.append(f'E2 artefact frame {f} used {c[f]} times (≤ 4) — show the real thing another way (in a hand, on a wall, through the instrument…)')
    for k, cap in CAPS.items():
        if c[k] > cap: err.append(f'E2 {k} used {c[k]} times (≤ {cap})')
    for k, v in c.items():
        if k.startswith('text:') and v > 22: err.append(f'E2 text style {k[5:]} used {v} times (≤ 22) — fewer words on screen, or another way to say it')
    motif = set(E.get('motif_art') or [])
    for n, v in runs.items():
        if v >= 5 and n not in motif: err.append(f'E3 own drawing {n} brought on {v} times — reinvent the scene, or declare it the film\'s motif (`motif_art`)')
    info.append('frames: ' + ', '.join(f'{f} {c[f]}' for f in FRAMES if c[f]) + ' · marks: ' + ', '.join(f'{k} {c[k]}' for k in CAPS if c[k]))
    # against the films before
    prev = [(k, v) for k, v in H.get('episodes', {}).items() if k != slug and v.get('devices')]
    prev.sort(key=lambda kv: kv[1].get('order', 0)); last2 = prev[-2:]
    here = {**c, **ent, **ex}
    for k in sorted({d for _, v in last2 for d, n in v['devices'].items() if n >= 6}):
        mx = max(v['devices'].get(k, 0) for _, v in last2)
        if here.get(k, 0) > .6 * mx and not k.startswith('text:'): err.append(f'X1 "{k}" used {here.get(k, 0)}× — the last films leaned on it ({mx}×); here ≤ {int(.6 * mx)}')
    nd = E.get('new_devices') or []; seen = {d for _, v in prev for d in v.get('invented', [])}
    wj = json.dumps(E.get('world', []))
    if len(nd) < 3: err.append(f'X2 `new_devices`: {len(nd)} declared (≥ 3 devices invented for this film — FX.md §K)')
    for d in nd:
        if d in seen: err.append(f'X2 "{d}" was invented for an earlier film — invent another')
        if not re.search(rf'"{re.escape(d)}"', wj): err.append(f'X2 "{d}" is declared but not used in the world')
    return E, err, info, {**{k: v for k, v in here.items() if v}}, nd

def record(slug, dev, nd):
    H = json.load(open(HP)); e = H['episodes'].setdefault(slug, {}); n = max([v.get('order', 0) for v in H['episodes'].values()] + [0])
    e['devices'] = dev; e['invented'] = list(nd); e.setdefault('order', n + 1); json.dump(H, open(HP, 'w'), indent=1)

if __name__ == '__main__':
    if '--baseline' in sys.argv:
        for i, slug in enumerate(('inside-earth', 'empty-atom', 'star-distance')):
            p = f'{R}/episodes/{slug}'
            if os.path.exists(f'{p}/episode.json'):
                E, err, info, dev, nd = check(p); record(slug, dev, nd)
                H = json.load(open(HP)); H['episodes'][slug]['order'] = i + 1; json.dump(H, open(HP, 'w'), indent=1); print(f'baseline {slug}: {len(dev)} devices recorded ({len(err)} would-be errors)')
        sys.exit(0)
    ep = sys.argv[1].rstrip('/'); E, err, info, dev, nd = check(ep)
    print(f'novelty {E["slug"]}:'); [print('  ' + i) for i in info]; [print('  ERROR', e) for e in err]
    if '--record' in sys.argv and not err: record(E['slug'], dev, nd); print('recorded in history.json')
    print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
