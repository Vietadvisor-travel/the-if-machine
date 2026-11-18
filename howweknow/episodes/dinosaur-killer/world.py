#!/usr/bin/env python3
"""dinosaur-killer — the story world (engine v8): every line's plan (lines.py) → entities keyed to the narration.
python3 episodes/dinosaur-killer/world.py → writes `world` (+ sfx, thumb, new_devices) into episode.json. Drawings: src/lib/dinosaur-killer/.
Governing image: the thin line of clay in the rock — the last day of a world, one centimetre thick. Motif: the LINE (clay band → needle →
half-ring → snapped chain → the clay again). Treatment: jobs/scripts/dinosaur-killer_treatment.md · chain: jobs/scripts/dinosaur-killer_chain.md."""
import json, math, os, re, shutil, sys
H = os.path.dirname(os.path.abspath(__file__)); EP = os.path.join(H, 'episode.json'); E = json.load(open(EP))
sys.path.insert(0, os.path.join(H, '../../tools')); from v6 import shot, rack, shake, grade, grade_keys
E['engine'] = 8
ST = 'stock/_hwk/dinosaur-killer/'; PD = 'stock/_pd/dinosaur-killer/'
W = []
_TL = os.path.join(H, 'timeline.json'); _LN = json.load(open(_TL))['lines'] if os.path.exists(_TL) else None
if _LN and len(_LN) != len(E['lines']): _LN = None
def _ratio(i):   # the plan's beats were timed at 2.35 words/s; the voice is what it is — the beats keep their place in the line
    if not _LN: return 1.0
    est = len(E['lines'][i]['text'].split()) / 2.35; return max(.7, min(1.3, _LN[i]['dur'] / est))
def dur(i): return _LN[i]['dur'] if _LN else len(E['lines'][i]['text'].split()) / 2.35
def L(i, off=0.0):
    if off > 0: off = round(off * _ratio(i), 2)
    return f'L{i}' if abs(off) < 1e-9 else (f'L{i}+{off:g}' if off > 0 else f'L{i}{off:g}')
def K(t, dur=1.2, ease=None, **p):
    k = {'t': t, 'dur': dur, **p}
    if ease: k['ease'] = ease
    return k
def ent(id, type, props=None, keys=None, children=None, z=None):
    e = {'id': id, 'type': type, 'props': props or {}, 'keys': list(keys or [])}
    if children: e['children'] = children
    if z is not None: e['z'] = z
    W.append(e); return e
def G(id): return next(e for e in W if e['id'] == id)
XS = {'ink': {}, 'left': {'dissolveDir': 'left'}, 'right': {'dissolveDir': 'right'}, 'up': {'dissolveDir': 'up'}, 'down': {'dissolveDir': 'down'}}
_seed = [11]
def _tadd(t, d):
    m = re.match(r'^(L\d+(?:\$|@[^+\-]+)?)([+\-]\d*\.?\d+)?$', t); o = float(m.group(2) or 0) + d
    return m.group(1) if abs(o) < 1e-9 else f'{m.group(1)}{o:+g}'
def gone(t, style='ink', dur=1.3, at=None):
    _seed[0] = _seed[0] % 89 + 7; b = dict(XS.get(style, {}))
    if at: b = {'dissolveAt': at, 'dissolveR': 1100}
    return [K(t, dur, 'linear', dissolve=0, dissolveSeed=_seed[0], **b), K(_tadd(t, dur + .02), .01, a=0)]
ENTER = {   # v8: many ways in (novelty E1) — each key starts from the prop given here
    'bleed': lambda p, t, o: (p.update(dissolve=0), [K(t, 1.4, 'linear', dissolve=1, dissolveSeed=_seed[0])]),
    'focus': lambda p, t, o: (p.update(blur=12), [K(t, 1.0, 'soft', blur=0)]),
    'iris': lambda p, t, o: (p.update(iris=0, irisAt=o or [960, 540]), [K(t, 1.4, 'in', iris=1)]),
    'wipe': lambda p, t, o: (p.update(wipe=0, wipeDir=o or 'right'), [K(t, 1.4, 'soft', wipe=1)]),
    'blinds': lambda p, t, o: (p.update(blinds=0), [K(t, 1.3, 'soft', blinds=1)]),
    'unroll': lambda p, t, o: (p.update(unroll=0), [K(t, 1.6, 'soft', unroll=1)]),
    'tear': lambda p, t, o: (p.update(tear=0), [K(t, 1.3, 'out', tear=1)]),
    'pour': lambda p, t, o: (p.update(pour=0, pourDir=o or 'up'), [K(t, 1.8, 'soft', pour=1)]),
    'brush': lambda p, t, o: (p.update(brush=0), [K(t, 1.8, 'linear', brush=1)]),
    'glide': lambda p, t, o: (p.update(**{('fx_x' if (o or [0, 1])[0] else 'fx_y'): (o or [0, 700])[0] or (o or [0, 700])[1]}), [K(t, 1.5, 'weight', **{('fx_x' if (o or [0, 1])[0] else 'fx_y'): 0})]),
    'scale': lambda p, t, o: (p.update(fx_s=.08, fx_ox=(o or [960, 540])[0], fx_oy=(o or [960, 540])[1]), [K(t, 1.6, 'out', fx_s=1)]),
}
EXIT0 = {'burn': {'burn': 1}, 'shatter': {'shatter': 0}, 'lift': {'lift': 0}, 'flip': {'flipY': 0}, 'tearout': {'tear': 1}}
def gone2(t, how, dur=1.3, at=None):
    if how == 'burn': return [K(t, dur, 'linear', burn=0, **({'burnAt': at} if at else {'dissolveDir': 'right'})), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'shatter': return [K(t, dur, 'in', shatter=1, shatterAt=at or [960, 540]), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'lift': return [K(t, dur, 'soft', lift=40, a=0)]
    if how == 'flip': return [K(t, dur, 'in', flipY=-100), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'collapse': return [K(t, dur, 'in', fx_s=.05, **({'fx_ox': at[0], 'fx_oy': at[1]} if at else {})), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'fade': return [K(t, dur, 'soft', a=0)]
    if how == 'tearout': return [K(t, dur, 'in', tear=0), K(_tadd(t, dur + .02), .01, a=0)]
    return gone(t, how, dur, at)
def art(id, name, t_in, t_out=None, keys=(), ink=True, inkdur=1.6, xs='ink', xdur=1.3, at=None, z=None, enter=None, eo=None, **props):
    p = {'name': name, 'a': 0, **EXIT0.get(xs, {}), **props}
    ks = [K(t_in, .01, a=1)]
    if enter in ENTER: ink = False; p.setdefault('draw', 1); ks += ENTER[enter](p, t_in, eo)[1]
    if ink: p.setdefault('draw', 0); ks.append(K(t_in, inkdur, 'out', draw=1))
    ks += list(keys)
    if t_out: ks += gone2(t_out, xs, xdur, at)
    return ent(id, 'art', p, ks, z=z)
def text(id, s, style, x, y, t_in, t_out=None, dur=1.2, keys=(), **kw):
    return ent(id, 'text', {'text': s, 'style': style, 'x': x, 'y': y, 'k': 0, 'a': 0, 'blur': 8, **kw},
               [K(t_in, .01, a=1), K(t_in, .9, 'soft', blur=0), K(t_in, dur, 'out', k=1)] + list(keys) + ([K(t_out, 1.0, 'soft', blur=10, a=0)] if t_out else []), z=60)
def counter(id, fmt, x, y, t_in, t_out, keys, size=96, style='figure', **kw):
    return ent(id, 'text', {'text': '', 'style': style, 'x': x, 'y': y, 'size': size, 'num': 0, 'fmt': fmt, 'k': 1, 'a': 0, 'blur': 8, **kw},
               [K(t_in, .01, a=1), K(t_in, .8, 'soft', blur=0)] + list(keys) + [K(t_out, 1.0, 'soft', blur=10, a=0)], z=60)
def person(id, who, t_in, t_out=None, keys=(), **p):
    p.setdefault('alive', 1)
    return art(id, 'Person', t_in, t_out, keys, inkdur=1.8, who=who, **p)
SKY = lambda id, t, tout, kind='night': ent(id, 'art', {'name': 'Sky', 'kind': kind, 'seed': id, 'a': 0}, [K(t, 1.4, a=1)] + gone(tout, 'ink', 1.0), z=1)
def shape(id, form, t_in, t_out=None, keys=(), dur=1.2, z=50, **p):
    pr = {'form': form, 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'col': '#2B1D12', 'sw': 3, **p}
    return ent(id, 'shape', pr, [K(t_in, .01, a=1), K(t_in, dur, 'out', draw=1)] + list(keys) + ([K(t_out, .9, a=0)] if t_out else []), z=z)
def trail(id, pts, t_in, d, t_out=None, col='#B8862B', w=3, r=6, ease='linear', keys=(), **p):
    return ent(id, 'trail', {'points': [{'screen': q} for q in pts], 'k': 0, 'a': 0, 'col': col, 'w': w, 'r': r, **p},
               [K(t_in, .01, a=1), K(t_in, d, ease, k=1)] + list(keys) + ([K(t_out, .8, a=0)] if t_out else []), z=56)
def ripple(id, at, t, r=160, n=4, d=1.6, col='#8C3424'):
    return ent(id, 'ripple', {'at': {'screen': at}, 'k': 0, 'n': n, 'r': r, 'col': col}, [K(t, d, 'out', k=1)], z=57)
def spot(id, at, r, t_in, t_out, dark=.55):
    return ent(id, 'spot', {'at': {'screen': at}, 'r': r, 'k': 0, 'dark': dark}, [K(t_in, 1.2, 'soft', k=1), K(t_out, 1.0, k=0)], z=45)
def quill(id, pts, t_in, t_out):
    ks = [K(t_in, .3, a=1)] + [K(_tadd(t_in, i * .5 + .3), .5, 'soft', at={'screen': q}) for i, q in enumerate(pts[1:])] + [K(t_out, .4, a=0)]
    return ent(id, 'hand', {'at': {'screen': pts[0]}, 's': .62, 'a': 0}, ks, z=80)
def mark(id, kind, box, t, t_out, w=5, seed=1):
    return ent(id, 'art', {'name': 'Mark', 'kind': kind, 'box': box, 'k': 0, 'w': w, 'seed': seed, 'a': 0}, [K(t, .01, a=1), K(t, .9, 'hand', k=1), K(t_out, .8, a=0)], z=61)
def circ(x, y, r): return f"M{x - r} {y} A{r} {r} 0 1 0 {x + r} {y} A{r} {r} 0 1 0 {x - r} {y}Z"
def rectp(x, y, w, h): return f"M{x} {y} L{x + w} {y} L{x + w} {y + h} L{x} {y + h}Z"
def dark(id, t_in, t_out=None, k=.96, d=1.4, keys=(), style='up', z=1, col='#0B0806'):
    return ent(id, 'shape', {'form': rectp(-60, -60, 2040, 1200), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'fill': col, 'fillA': k, 'wash': False, 'sw': 0, 'col': col},
               [K(t_in, d, 'soft', a=1)] + list(keys) + (gone(t_out, style, 1.6) if t_out else []), z=z)
# v6 light
def lamp(id, at, t_in, t_out, r=520, k=1, dark=.55, warm=.6, z=58):
    return ent(id, 'lamp', {'at': {'screen': at}, 'r': r, 'k': 0, 'dark': dark, 'warm': warm}, [K(t_in, 1.4, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def shaft(id, fr, to, t_in, t_out, w0=60, w1=420, n=3, k=.8, z=57):
    return ent(id, 'shaft', {'from': fr, 'to': to, 'w0': w0, 'w1': w1, 'n': n, 'k': 0, 'para': 0}, [K(t_in, 2.0, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def motes(id, box, t_in, t_out, n=40, k=1, seed=3, z=59):
    return ent(id, 'motes', {'box': box, 'n': n, 'k': 0, 'seed': seed, 'para': .3}, [K(t_in, 2.0, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def shadow(id, x, y, rx, ry, t_in, t_out, k=.8, z=3):
    return ent(id, 'shadow', {'x': x, 'y': y, 'rx': rx, 'ry': ry, 'k': 0}, [K(t_in, 1.2, k=k)] + ([K(t_out, .8, k=0)] if t_out else []), z=z)
def haze(id, y0, y1, t_in, t_out, k=.6, col='#C9DDE6', z=56):
    return ent(id, 'haze', {'y0': y0, 'y1': y1, 'k': 0, 'col': col}, [K(t_in, 1.6, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def sheen(id, box, t, rot=4, z=62):
    return ent(id, 'sheen', {'box': box, 'rot': rot, 'k': 0}, [K(t, 2.0, 'soft', k=1)], z=z)
SFX = {}
def sfx(i, at, f, db=-20): SFX.setdefault(i, []).append({'at': at, 'file': f, 'db': db})
FX = 'public/sfx/'; SK = 'public/stock/_hwk/dinosaur-killer/'
WALT = {'costume': 'walter1977', 'beard': 'full', 'face': {'nose': .5, 'brow': .5, 'chin': .4, 'age': .35, 'build': 1.0}, 'hairCol': '#4A3A2A', 'skin': .26}
LUIS = {'costume': 'luis1980', 'face': {'nose': .55, 'brow': .55, 'chin': .5, 'age': .75, 'build': 1.05}, 'hairCol': '#C9C2B6', 'skin': .27}
HILD = {'costume': 'hildebrand1990', 'beard': 'full', 'face': {'nose': .45, 'brow': .45, 'chin': .4, 'age': .2, 'build': .95}, 'hairCol': '#6A4A2E', 'skin': .25}
NL = len(E['lines'])
VERM = '#B8432A'; CREAM = '#F3E7CC'

ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': .6, 'light': .4, **grade('mystery'), 'push': 1, 'pan_x': 0, 'pan_y': 0, 'dof': 0, 'focus': 0, 'shake': 0})
# ======================================================================== COLD — the last evening (set piece 1): a shore at dusk, a theropod looks up
art('dusk0', 'CretaceousDusk', L(0), None, [K(L(0), dur(0) + dur(1), 'linear', dusk=.62), K(L(1, 1.6), 2.0, 'soft', stars=1), K(L(1, 3.2), 1.6, 'soft', point=1)] + gone2(L(2, 1.6), 'burn', 3.6, [1380, 210]),
    inkdur=2.4, dusk=.2, stars=0, point=0, px=1380, py=210, z=2, xs='burn')
art('rex0', 'Theropod', L(0, 2.8), None, [K(L(0, 2.8), dur(0) + dur(1) + 4, 'linear', tm=(dur(0) + dur(1) + 4) * .8), K(L(0, 4.4), 2.0, 'soft', head=1), K(L(0, 5.0), .9, 'soft', jaw=.25), K(L(0, 6.0), .8, eye=1, jaw=0), K(L(1, 4.8), 1.4, 'soft', head=1.1)] + gone2(L(2, 2.6), 'burn', 2.6, [1380, 210]),
    inkdur=1.8, x=1180, y=930, s=1.05, head=0, eye=0, tm=0, breathe=1, sway=.6, z=10, xs='burn')
lamp('lp0', [1650, 640], L(0, .4), L(2, 3.0), r=1100, dark=.35, warm=.9)
shadow('sh0', 1100, 940, 420, 26, L(0, 3.2), L(2, 2.6), k=.55)
haze('hz0', 520, 820, L(0, 1.0), L(2, 2.0), k=.35, col='#F2C98A')
mark('mk1', 'circle', [1340, 170, 80, 80], L(1, 3.6), L(2, 1.6), w=4)
sfx(0, 4.4, FX + 'animal_dino_roar_3.wav', -30); sfx(2, 1.6, FX + 'motion_whoosh_deep_1.wav', -24)
ent('emb2', 'particles', {'kind': 'embers', 'n': 40, 'k': 0, 'a': .8, 'speed': .4, 'para': .4}, [K(L(2, 2.0), 2.0, k=1), K(L(3, 1.6), 1.4, k=0)], z=70)
counter('c2', 'about {n} in 4 kinds of life — gone', 960, 900, L(2, 6.4), L(3, .6), [K(L(2, 6.4), 1.6, 'out', num=3)], size=64)
# L3 — the embers gather into bones: the same animal, a skeleton in a museum at night
MUS = dict(x=960, y=540, s=1, sx=1060, sy=800, ss=.92)
art('mus3', 'MuseumSkeleton', L(3), None, [K(L(3, 3.4), 2.4, 'soft', moon=1)] + gone2(L(5, 7.4), 'left', 1.4), enter='scale', eo=[1100, 560], moon=.3, **MUS, z=8, xs='left')
shaft('sf3', [340, 200], [1180, 900], L(3, 3.0), L(5, 7.4), w0=200, w1=520, n=3, k=.5)
motes('mo3', [300, 200, 1200, 900], L(3, 3.4), L(5, 7.0), n=36)
text('q3', '?', 'note', 1380, 820, L(3, 6.4), L(4, .6), size=90, col=VERM)
spot('sp4', [1390, 360], 170, L(4), L(5, .4), dark=.6)
sfx(3, 3.4, FX + 'real_wind_3.wav', -32)
# the title (gap before L5): the skeleton fades to a page; the question
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'What killed\nthe dinosaurs?', 'sub': 'a story in four clues', 'a': 0},
    [K(L(5, -5.8), .01, a=1), K(L(5, -5.8), 4.4, 'linear', k=1), K(L(5, -.9), 1.4, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(L(5, .6), .01, a=0)], z=90)
dark('dk5', L(5, -6.0), L(5, .2), k=.88, d=1.2, z=40, col='#0B0806', style='down')
# L5 — four relics on the plinth (they will be the four clues)
art('rel5', 'ClueRelics', L(5, .4), None, [K(L(5, 1.0), 6.0, 'linear', n=4), K(L(5, 7.6), 1.4, 'soft', glow=1)] + gone2(L(6, .4), 'lift', 1.0),
    enter='unroll', x=960, y=820, s=1.2, n=0, glow=0, z=20, xs='lift')
for j, (x, lab) in enumerate(((384, 'a line in the rock'), (768, 'a pinch of clay'), (1164, 'a scratched grain'), (1560, 'a report nobody read'))):
    text(f'l5{j}', lab, 'label', x, 900, L(5, 1.6 + j * 1.6), L(6, .4), size=36)
lamp('lp5', [960, 520], L(5, .4), L(6, .4), r=900, dark=.4, warm=.7)
# ======================================================================== THE STAKES — the old theories, in old books
art('haw6', 'Etch', L(6), None, gone2(L(7, 3.2), 'lift', 1.2), ink=False, src=PD + 'hawkins_ink.png', x=70, y=170, w=540, h=705, draw=1, enter='brush', tint='#C9AE84', washA=.35, z=12, xs='lift')
text('n6', 'Sydenham, 1853: how the Victorians imagined them', 'label', 340, 930, L(6, 1.0), L(7, 3.2), size=26)
art('th6', 'TheoryCards', L(6, .8), None, [K(L(6, 1.4), 6.0, 'linear', turn=3), K(L(7, .6), 1.6, 'soft', q=1), K(L(7, 3.2), 2.2, 'soft', blank=1)] + gone2(L(8, .2), 'fade', .8),
    enter='wipe', eo='left', x=1220, y=560, s=.66, turn=0, q=0, blank=0, z=14, xs='fade')
lamp('lp6', [900, 260], L(6), L(8, .4), r=1000, dark=.35, warm=.65)
sfx(6, 1.4, FX + 'foley_page_turn_1.wav', -26)
# L8 — bones tell size and diet, not time: the old sea of 1830 (Duria Antiquior) and, over it, a clock face with no hands
art('dur8', 'Etch', L(8), None, gone2(L(9, .6), 'collapse', 1.2, [960, 540]), ink=False, src=PD + 'duria_ink.png', x=260, y=80, w=1400, h=966, draw=1, enter='focus', tint='#7FA8C4', washA=.4, z=10, xs='collapse')
text('n8', 'Duria Antiquior, 1830', 'label', 960, 1050, L(8, .8), L(9), size=26)
shape('clk8', circ(960, 540, 190), L(8, 3.2), L(9), dur=1.4, col=VERM, sw=5, z=30)
text('q8', 'when?', 'note', 960, 560, L(8, 4.6), L(9), size=80, col=VERM)
# ======================================================================== CLUE 1 — a line in the rock (set piece 2: the stone book)
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'A Line in the Rock', 'a': 0},
    [K(L(9), .8, a=1), K(L(18), .5, a=0), K(L(18, .5), .01, n=2, label='Too Much of a Rare Metal'), K(L(18, .6), .8, a=1), K(L(29), .5, a=0), K(L(29, .5), .01, n=3, label='Scars in the Sand'),
     K(L(29, .6), .8, a=1), K(L(36), .5, a=0), K(L(36, .5), .01, n=4, label='A Ring Under the Jungle'), K(L(36, .6), .8, a=1), K(L(50), .8, a=0)])
art('rb9', 'RockBook', L(9), None, [K(L(9, .4), 1.4, 'soft', red=1)] + gone2(L(10, .4), 'down', 1.0), enter='iris', eo=[960, 600], x=960, y=600, s=1, open=0, red=0, z=20, xs='down')
text('t9', 'Clue I · A Line in the Rock', 'title', 960, 230, L(9, .2), L(10, .4), size=60)
sfx(9, .2, FX + 'impact_stone_1.wav', -24)
# L10 — Gubbio: the gorge, Walter at the rock face
art('gub10', 'GubbioGorge', L(10), None, [K(L(10, 3.0), 2.0, 'soft', red=.4)] + gone2(L(11, .4), 'flip', 1.2), enter='wipe', eo='up', x=960, y=540, s=1, red=0, z=6, xs='flip')
person('wal10', 'Walter Alvarez, geologist, at Gubbio (1970s)', L(10, 1.6), None, [K(L(10, 3.6), 1.6, 'soft', pk=1)] + gone2(L(11, .4), 'fade', .8),
       x=520, y=1000, h=520, facing=1, pose='stand', pose2='look', pk=0, expr='focus', ek=.6, look=[1, -.4], **WALT, z=14)
art('pin10', 'Pinned', L(10, 4.6), None, gone2(L(11, .2), 'burn', 1.0, [1520, 280]), ink=False, src=ST + 'R-01-x1_alvarez-trio-gubbio.jpg', x=1520, y=280, w=420, h=280, rot=3, caption='The Alvarez team at Gubbio', draw=1, enter='bleed', z=30, xs='burn')
text('pl10', 'Gubbio, Italy', 'plate', 1060, 980, L(10, 2.4), L(11, .2), size=40, col=CREAM, light=True)
lamp('lp10', [1500, 160], L(10), L(11, .6), r=1200, dark=.25, warm=.6)
# L11 — the strata ARE pages: the stone opens like a book (Lyell's 1852 section above it)
art('rb11', 'RockBook', L(11, .4), None, [K(L(11, 1.6), 2.6, 'soft', open=1), K(L(11, 4.2), 1.2, 'soft', red=.4), K(L(12), dur(12), 'linear', thread=1), K(L(14), 3.0, 'inOut', page=1), K(L(14, 2.8), 1.4, 'soft', red=1),
    K(L(15, .4), 1.6, 'soft', sparse=.1)] + gone2(L(16, .2), 'shatter', 1.4, [960, 560]), inkdur=1.6, x=960, y=600, s=.92, open=0, page=0, red=0, thread=0, sparse=1, z=20, xs='shatter')
lamp('lp11', [700, 260], L(11), L(16, .4), r=1100, dark=.4, warm=.7)
shadow('sh11', 960, 900, 560, 30, L(11, .6), L(16), k=.55)
for j, (y, lab) in enumerate(((820, 'older'), (380, 'younger'))):
    text(f'l12{j}', lab, 'label', 380, y, L(12, 1.6 + j * 2.2), L(13, .2), size=34, col='#5A3A22')
art('ly12', 'Etch', L(12, .2), None, gone2(L(13, .2), 'fade', .8), ink=False, src=PD + 'lyell_ink.png', x=560, y=40, w=800, h=267, draw=1, enter='wipe', eo='right', tint='#C9AE84', washA=.3, z=24, xs='fade')
text('n12', 'Lyell, 1852: the rocks as a record of time', 'label', 960, 330, L(12, 1.0), L(13, .2), size=26)
shape('ar12', "M380 790 L380 420", L(12, 2.4), L(13, .2), dur=2.0, col='#5A3A22', sw=3, z=30)
sfx(11, 1.6, FX + 'foley_book_close_1.wav', -26); sfx(14, .2, FX + 'transition_page_turn_2.wav', -24)
# L13 — dive into a lower page: the tiny shells
art('for13', 'Foraminifera', L(13), None, [K(L(13), dur(13), 'linear', turn=1)] + gone2(L(14, .2), 'at', 1.0, [960, 540]), enter='iris', eo=[860, 720], x=960, y=540, r=400, n=1, turn=0, z=30, xs='at')
text('l13', 'foraminifera — plankton shells', 'label', 960, 1010, L(13, 2.0), L(14), size=32, col=CREAM, light=True)
dark('dk13', L(13), L(14, .2), k=.82, d=.8, z=25, col='#1A120B', style='left')
# L14 — the blank page: one centimetre of reddish clay (the real band, P-01)
art('cl14', 'Clipping', L(14, 3.4), None, gone2(L(15, 3.0), 'tearout', 1.0), ink=False, src=ST + 'P-01_gubbio-kpg-boundary-outcrop.jpg', x=1530, y=300, w=300, h=294, rot=4, seed='p01', draw=1, enter='bleed', z=34, xs='tearout')
text('f14', '≈ 1 cm', 'figure', 1530, 660, L(14, 4.4), L(15, .6), size=110, col=VERM)
text('n14', 'the boundary clay, Gubbio', 'label', 1530, 485, L(14, 4.8), L(15, 3.0), size=26)
# L15 — above it, the shells are almost gone
art('for15', 'Foraminifera', L(15, .6), None, [K(L(15, .6), 3.0, 'soft', n=.05)] + gone2(L(16, .2), 'fade', .8), enter='pour', x=1440, y=760, r=230, n=1, z=32, xs='fade')
text('l15', 'above the clay: almost none', 'note', 1440, 470, L(15, 2.4), L(16, .2), size=40, col='#5A3A22')
# L16 — Walter's fingertip on the line
art('fin16', 'FingerOnClay', L(16, .4), None, [K(L(16, 2.0), 2.4, 'soft', glow=1)] + gone2(L(17, .4), 'collapse', 1.2, [1000, 520]), enter='scale', eo=[980, 520], x=960, y=540, s=1, glow=0, z=20, xs='collapse')
lamp('lp16', [980, 520], L(16, .4), L(17, .4), r=700, dark=.45, warm=.8)
text('n16', 'the whole ending, in one thin layer', 'note', 760, 260, L(16, 3.6), L(17, .2), size=48, col=CREAM, light=True)
# L17 — how long did the clay take? an hourglass whose sand is the clay
art('hg17', 'ClayHourglass', L(17, .4), None, [K(L(17, .4), dur(17) + dur(18), 'linear', flow=.85), K(L(18, 2.0), 1.6, 'inOut', turn=180)] + gone2(L(19, .4), 'up', 1.0),
    inkdur=1.4, x=960, y=560, s=1.1, flow=.05, turn=0, gauge=0, z=20, xs='up')
text('q17', 'how long?', 'note', 1360, 360, L(17, 2.6), L(18, .4), size=64, col=VERM)
lamp('lp17', [960, 420], L(17), L(19, .6), r=800, dark=.45, warm=.7)
shadow('sh17', 960, 830, 260, 22, L(17, .6), L(19, .4), k=.5)
# ======================================================================== CLUE 2 — too much of a rare metal (set piece 3: the needle through the roof)
text('t18', 'Clue II · Too Much of a Rare Metal', 'title', 960, 180, L(18, .2), L(19, .2), size=58)
ripple('rp18', [960, 560], L(18, 1.6), r=260, n=3, col='#8C3424')
# L19 — the son brings the question to his father (P-02)
art('st19', 'AlvarezStudy', L(19), None, gone2(L(20, .4), 'down', 1.0), enter='blinds', x=960, y=540, s=1, lamp=1, z=6, xs='down')
person('wal19', 'Walter Alvarez', L(19, .6), None, [K(L(19, 1.4), 1.6, 'soft', pk=1)] + gone2(L(20, .4), 'fade', .8),
       x=620, y=1010, h=500, facing=1, pose='stand', pose2='hold', pk=0, expr='focus', ek=.6, look=[1, 0], **WALT, z=14)
person('lui19', 'Luis Alvarez, Nobel physicist', L(19, 1.8), None, [K(L(19, 3.6), 1.6, 'soft', pk=1), K(L(19, 5.4), 1.4, 'soft', expr='surprise', ek=.7)] + gone2(L(20, .4), 'fade', .8),
       x=1300, y=1010, h=500, facing=-1, pose='stand', pose2='think', pk=0, expr='focus', ek=.5, look=[-1, 0], **LUIS, z=14)
art('pin19', 'Pinned', L(19, 4.4), None, gone2(L(20, .2), 'lift', .9), ink=False, src=ST + 'P-02_alvarez-father-son-gubbio.jpg', x=1640, y=330, w=280, h=376, rot=-3, caption='Luis and Walter Alvarez', draw=1, enter='bleed', z=30, xs='lift')
lamp('lp19', [1080, 600], L(19), L(20, .6), r=700, dark=.5, warm=.75)
# L20 — dust falls from space everywhere, all the time
art('sd20', 'SpaceDust', L(20), None, [K(L(20), dur(20) + dur(21), 'linear', k=3)] + gone2(L(22, .2), 'fade', .9), enter='glide', eo=[0, -900], k=0, earth=1, z=4, xs='fade')
text('n20', 'a slow, steady snow of space dust', 'note', 960, 220, L(20, 2.4), L(21, .2), size=46, col=CREAM, light=True)
# L21 — iridium as a clock: the hourglass again, now with an iridium gauge filling
art('hg21', 'ClayHourglass', L(21, .4), None, [K(L(21, .4), dur(21), 'linear', flow=.9, gauge=.6)] + gone2(L(22, .2), 'right', .9), enter='focus', x=1340, y=620, s=.8, flow=.1, gauge=.02, z=10, xs='right')
text('l21', 'more iridium = more time', 'label', 1340, 1000, L(21, 2.6), L(22, .2), size=34, col=CREAM, light=True)
# L22–24 — the meter: the needle swings past "normal", bends on the stop, and goes on up through the roof
art('im22', 'IridiumMeter', L(22), None, [K(L(22, 1.0), 1.4, 'soft', drawer=1), K(L(22, 2.6), 2.0, 'soft', v=.2), K(L(23, .6), 3.2, 'in', v=1.25), K(L(24, .2), 2.6, 'in', roof=1)] + gone2(L(25, .2), 'tearout', 1.2),
    enter='blinds', x=960, y=600, s=1, v=.05, roof=0, drawer=0, room=1, z=10, xs='tearout')
text('s23', 'far too much', 'stamp', 1420, 300, L(23, 3.6), L(24, .4), size=52, col=VERM)
text('l24', 'it came from above', 'note', 1300, 160, L(24, 2.6), L(25), size=52, col=VERM)
lamp('lp22', [960, 560], L(22), L(25, .2), r=900, dark=.4, warm=.55)
sfx(22, 1.0, FX + 'clack_toggle_1.wav', -24); sfx(23, 3.6, FX + 'impact_metal_2.wav', -24); sfx(24, .2, FX + 'transition_riser_2s_1.wav', -26)
# L25 — a century of dust in an afternoon
art('ds25', 'DustShelf', L(25), None, [K(L(25, .8), dur(25) - 1.0, 'in', dust=1), K(L(25), dur(25), 'linear', tick=36)] + gone2(L(26, .2), 'at', 1.0, [960, 500]), enter='glide', eo=[0, -900], x=960, y=560, s=1, dust=0, tick=0, z=10, xs='at')
# L26 — space rocks are rich in it: a sliced meteorite glints
art('met26', 'MeteoriteSlice', L(26, .2), None, [K(L(26, 1.6), 2.0, 'soft', cut=1)] + gone2(L(27, .2), 'flip', 1.2), enter='focus', x=960, y=560, s=1.25, cut=0, z=14, xs='flip')
sheen('she26', [700, 350, 600, 460], L(26, 3.0))
text('l26', 'a meteorite: rich in iridium', 'label', 960, 900, L(26, 3.4), L(27, .2), size=36)
lamp('lp26', [1200, 260], L(26), L(27, .4), r=900, dark=.45, warm=.6)
# L27 — the 1980 answer: a rock from space; it turns over out of the slice
art('ast27', 'Asteroid', L(27, .6), None, [K(L(27, .6), dur(27) + 4, 'linear', rot=60), K(L(27, 4.0), 1.6, 'soft', glow=.4)] + gone2(L(28, .2), 'fade', .6), inkdur=1.2, x=960, y=520, r=260, rot=0, glow=0, trail=0, z=14, xs='fade')
SKY('sky27', L(27, .2), L(28, .6))
text('pl27', '1980 · Alvarez, Alvarez, Asaro, Michel', 'plate', 960, 940, L(27, 2.0), L(28, .2), size=34, col=CREAM, light=True)
# L28 — ten kilometres: beside Everest
art('ev28', 'EverestScale', L(28), None, gone2(L(29, .2), 'at', 1.0, [700, 300]), enter='wipe', eo='left', x=620, y=980, s=1, z=6, xs='at')
art('ast28', 'Asteroid', L(28, 1.0), None, [K(L(28, 1.0), 3.0, 'out', fx_x=0), K(L(28), 10, 'linear', rot=40)] + gone2(L(29, .2), 'at', 1.0, [700, 300]), ink=False, draw=1, x=1400, y=420, r=330, rot=0, fx_x=900, z=10, xs='at')
text('f28', '≈ 10 km across', 'figure', 1400, 860, L(28, 3.0), L(29, .2), size=90, col=VERM)
text('l28', 'Mount Everest', 'label', 620, 220, L(28, 4.4), L(29, .2), size=32)
# ======================================================================== CLUE 3 — scars in the sand
art('sg29', 'ShockedGrain', L(29), None, [K(L(29, 1.0), 1.4, 'soft', etch=.35)] + gone2(L(30, .4), 'tearout', 1.0), enter='scale', eo=[1400, 420], x=960, y=560, r=300, etch=0, crack=0, z=20, xs='tearout')
text('t29', 'Clue III · Scars in the Sand', 'title', 960, 160, L(29, .2), L(30, .2), size=58)
# L30–31 — if it is true, the layer must be everywhere — and it is
art('wo30', 'WorldOutcrops', L(30), None, [K(L(31, .4), 3.2, 'soft', line=1), K(L(31, 1.0), 3.0, 'linear', pins=1)] + gone2(L(32, .4), 'at', 1.0, [960, 340]), enter='brush', x=960, y=560, line=0, pins=0, dust=0, z=8, xs='at')
text('q30', 'everywhere?', 'note', 960, 160, L(30, 3.0), L(31, .2), size=56, col=VERM)
text('l31', 'the same thin layer, all round the world', 'plate', 960, 1000, L(31, 3.4), L(32, .2), size=36, col='#2B1D12')
sfx(31, .4, FX + 'motion_whoosh_long_1.wav', -28)
# L32 — down the microscope: the lamellae etch in (the real grain, P-03, in the eyepiece)
art('sg32', 'ShockedGrain', L(32), None, [K(L(32, .8), 3.6, 'soft', etch=1), K(L(33, 2.4), 2.0, 'soft', crack=.25)] + gone2(L(34, 2.2), 'shatter', 1.6, [920, 540]),
    enter='iris', eo=[960, 340], x=960, y=540, r=430, etch=.1, crack=0, z=20, xs='shatter')
art('eye32', 'Eyepiece', L(32, 4.0), None, gone2(L(33, .6), 'right', .9), ink=False, src=ST + 'P-03_shocked-quartz-usgs.jpg', x=1620, y=300, r=200, cross=0, draw=1, enter='bleed', z=34, xs='right')
text('l32', 'shocked quartz (USGS)', 'label', 1620, 540, L(32, 4.6), L(33, .6), size=26, col=CREAM, light=True)
dark('dk32', L(32), L(34, 3.4), k=.9, d=1.0, z=3, col='#1A1424')
text('l33', 'quartz: one of the toughest minerals on Earth', 'note', 960, 1010, L(33, .8), L(34, .2), size=40, col=CREAM, light=True)
text('s34', 'only an impact', 'stamp', 960, 180, L(34, 1.0), L(35, .2), size=56, col=VERM)
sfx(34, 2.2, FX + 'real_glass_break_1.wav', -22)
# L35 — every grain a witness: the world again, a question mark where the crater should be
art('wo35', 'WorldOutcrops', L(35), None, gone2(L(36, .4), 'fade', .9), enter='bleed', x=960, y=560, line=1, pins=1, dust=0, z=8, xs='fade')
text('q35', 'where?', 'figure', 960, 260, L(35, 2.4), L(36, .2), size=150, col=VERM)
# ======================================================================== CLUE 4 — a ring under the jungle
text('t36', 'Clue IV · A Ring Under the Jungle', 'title', 960, 160, L(36, .2), L(37, .2), size=58)
art('ux36', 'Etch', L(36), None, gone2(L(37, .2), 'down', 1.0), ink=False, src=PD + 'uxmal_ink.png', x=60, y=330, w=1800, h=460, draw=1, enter='brush', z=8, xs='down')
text('l36', 'Yucatán: Catherwood, 1844', 'label', 960, 840, L(36, 1.4), L(37, .2), size=28)
# L37 — the world searched with a lens; nothing
art('gl37', 'SearchGlobe', L(37), None, [K(L(37, .6), dur(37), 'linear', look=1, spin=.3), K(L(37, 3.0), 1.4, 'soft', q=1)] + gone2(L(38, .4), 'collapse', 1.0, [960, 500]), inkdur=1.4, x=960, y=500, r=320, look=0, q=0, spin=0, z=10, xs='collapse')
lamp('lp37', [700, 300], L(37), L(38, .6), r=900, dark=.4, warm=.6)
# L38 — it had been found already: a records room, one bound report
art('rs38', 'ReportShelf', L(38), None, [K(L(38, 2.6), 1.6, 'soft', pull=1), K(L(38), .01, lamp=1)] + gone2(L(39, .6), 'at', 1.0, [700, 400]), enter='tear', x=960, y=560, s=1, pull=0, dust=.6, blow=0, open=0, lamp=0, z=8, xs='at')
text('n38', 'found years earlier', 'note', 1400, 180, L(38, 3.4), L(39, .4), size=50, col=VERM)
# L39–40 — 1978: Pemex geophysicists fly the coast; something old and strange below
art('yc39', 'YucatanCoast', L(39), None, [K(L(40, 1.0), 4.0, 'soft', ring=.35)] + gone2(L(41, .4), 'up', 1.0), enter='iris', eo=[700, 400], x=960, y=420, s=1, ring=0, night=0, z=4, xs='up')
art('pl39', 'SurveyPlane', L(39, 1.2), None, [K(L(39, 1.2), dur(39) + dur(40), 'linear', fx_x=1500, trail=1), K(L(39), .01, prop=1)] + gone2(L(41, .2), 'fade', .6), ink=False, draw=1, x=200, y=640, s=1.4, rot=0, prop=0, trail=0, fx_x=0, enter='focus', z=20, xs='fade')
text('pl39t', '1978 — Glen Penfield & Antonio Camargo, Pemex', 'plate', 960, 980, L(39, 2.4), L(40, .4), size=34, col=CREAM, light=True)
text('n40', 'looking for oil…', 'note', 1440, 200, L(40, .6), L(41, .2), size=48, col=CREAM, light=True)
sfx(39, 1.2, FX + 'impact_soft_engine_1.wav', -30)
# L41 — the survey draws HALF a ring on land (set piece: the line becomes a ring)
art('sr41', 'SurveyRing', L(41, .2), None, [K(L(41, .6), dur(41) - .8, 'linear', pas=1), K(L(42, .4), 3.0, 'soft', sea=1), K(L(42, 3.6), 2.0, 'soft', whole=1)] + gone2(L(43, .2), 'collapse', 1.0, [960, 520]),
    enter='unroll', x=960, y=520, R=340, pas=0, sea=0, whole=0, sheet=1, scale=0, z=14, xs='collapse')
ent('qh41', 'hand', {'at': {'screen': [620, 560]}, 's': .62, 'a': 0}, [K(L(41, .6), .3, a=1)] + [K(L(41, 1.0 + i * .6), .6, 'soft', at={'screen': q}) for i, q in enumerate([[700, 760], [960, 820], [1220, 760], [1300, 560]])] + [K(L(41, 4.4), .4, a=0)], z=80)
text('l42', 'the other half: under the sea', 'label', 960, 140, L(42, 1.2), L(43, .2), size=34)
art('m42', 'Pinned', L(42, 4.2), None, gone2(L(43, .2), 'lift', .8), ink=False, src=ST + 'M-01_chicxulub-ring-srtm.jpg', x=1620, y=560, w=330, h=374, rot=3, caption='The buried ring today (NASA)', draw=1, enter='bleed', z=30, xs='lift')
# L43 — 1981: a meeting, and nobody listens
art('ch43', 'ConferenceHall', L(43), None, [K(L(43, 1.4), dur(43), 'linear', empty=.8)] + gone2(L(44, .4), 'left', 1.0), enter='blinds', x=960, y=540, s=1, empty=0, beam=1, z=6, xs='left')
text('pl43', '1981', 'plate', 1600, 160, L(43, 1.0), L(44, .2), size=48, col=CREAM, light=True)
# L44–45 — back on the shelf; dust; 1990, Alan Hildebrand blows it off
art('rs44', 'ReportShelf', L(44), None, [K(L(44, .6), dur(44) - .4, 'linear', dust=1), K(L(45, 1.6), 1.6, 'soft', blow=1, pull=1, lamp=1)] + gone2(L(46, .4), 'right', 1.0), inkdur=1.2, x=960, y=560, s=1, pull=0, dust=0, blow=0, open=0, lamp=0, z=8, xs='right')
counter('c44', '{n}', 1600, 200, L(44, .6), L(45, .4), [K(L(44, .6), dur(44) - .8, 'linear', num=1990)], size=90, num=1981)
person('hil45', 'Alan Hildebrand, a young geologist (1990)', L(45, .4), None, [K(L(45, 1.2), 1.4, 'soft', pk=1), K(L(45, 3.2), 1.4, 'soft', expr='surprise', ek=.8)] + gone2(L(46, .2), 'fade', .8),
       x=420, y=1010, h=540, facing=1, pose='stand', pose2='reach', pk=0, expr='focus', ek=.6, look=[1, -.3], **HILD, z=16)
lamp('lp45', [1100, 300], L(45, 1.4), L(46, .4), r=900, dark=.45, warm=.6)
sfx(45, 1.6, FX + 'real_wind_4.wav', -30)
# L46 — the old drill cores, unwrapped
art('dc46', 'DrillCore', L(46), None, [K(L(46, .6), 1.6, 'soft', lid=1), K(L(46, 3.0), 1.6, 'soft', roll=1)] + gone2(L(47, .4), 'at', 1.0, [960, 580]), enter='unroll', x=960, y=540, s=1, lid=0, roll=0, lamp=1, z=8, xs='at')
text('l46', 'Pemex drill cores, from inside the ring', 'label', 960, 960, L(46, 2.0), L(47, .2), size=34)
# L47 — inside them: the same shocked grains
art('sg47', 'ShockedGrain', L(47), None, [K(L(47, .6), 1.8, 'soft', etch=1)] + gone2(L(48, .4), 'down', 1.0), enter='iris', eo=[960, 580], x=960, y=540, r=380, etch=.2, crack=0, z=14, xs='down')
text('n47', 'the same scars', 'note', 960, 1000, L(47, 2.4), L(48, .2), size=52, col=CREAM, light=True)
dark('dk47', L(47), L(48, .4), k=.85, d=.8, z=3, col='#1A1424')
# L48 — 1991: the crater gets a village's name
art('vs48', 'VillageSign', L(48), None, gone2(L(49, .4), 'down', 1.0), enter='glide', eo=[0, -700], x=960, y=560, s=1, sun=1, z=8, xs='down')
text('s48', 'CHICXULUB', 'stamp', 960, 382, L(48, 2.0), L(49, .2), size=70, col='#22507A')
text('pl48', '1991', 'plate', 300, 160, L(48, 1.0), L(49, .2), size=48)
sfx(48, 2.0, FX + 'impact_wood_2.wav', -22)
# L49 — about 180 km: the coast from very high, the ring traced on it
art('yc49', 'YucatanCoast', L(49), None, gone2(L(50, .4), 'flip', 1.2), enter='scale', eo=[960, 420], x=960, y=420, s=.62, ring=1, night=0, z=4, xs='flip')
art('sr49', 'SurveyRing', L(49, .8), None, [K(L(49, .8), 2.4, 'soft', whole=1), K(L(49, 3.0), 1.4, scale=1)] + gone2(L(50, .4), 'flip', 1.2), ink=False, draw=1, x=960, y=410, R=230, pas=0, sea=0, whole=0, sheet=0, scale=0, z=10, xs='flip')
# ======================================================================== THE TWIST — it was on a shelf
art('rs50', 'ReportShelf', L(50, .4), None, [K(L(50, 1.0), 2.4, 'soft', pull=1, open=1, lamp=1)] + gone2(L(52, .2), 'burn', 2.0, [960, 500]), enter='focus', x=960, y=560, s=1, pull=0, dust=0, blow=0, open=0, lamp=0, z=8, xs='burn')
text('n50', 'found 1978 · named 1991', 'note', 1440, 860, L(50, 3.0), L(51, .2), size=44, col=VERM)
spot('sp51', [960, 520], 420, L(51), L(52, .2), dark=.6)
text('s51', 'hidden on a shelf', 'stamp', 960, 130, L(51, 2.4), L(52, .2), size=56, col=VERM)
sfx(50, .4, FX + 'cue_twist_1.wav', -26)
# ======================================================================== THE ANSWER
art('mus52', 'MuseumSkeleton', L(52), None, gone2(L(53, .4), 'at', 1.0, [1390, 380]), enter='bleed', moon=1, **MUS, z=8, xs='at')
text('q52', 'what killed the dinosaurs?', 'plate', 760, 200, L(52, .8), L(53, .2), size=44, col=CREAM, light=True)
# L53 — the impact (from high above the Gulf)
art('imp53', 'ImpactRings', L(53), None, [K(L(53, 3.0), .4, 'out', flash=1), K(L(53, 3.4), 1.6, 'soft', flash=0), K(L(53, 3.2), dur(53) - 2.8, 'out', ring=1), K(L(53, 4.0), 4.0, 'soft', plume=.8)] + gone2(L(55, 4.0), 'up', 1.2),
    enter='wipe', eo='down', x=960, y=640, flash=0, ring=0, plume=0, dark=0, z=6, xs='up')
art('ast53', 'Asteroid', L(53, .4), None, [K(L(53, .4), 2.6, 'in', fx_x=0, fx_y=0, glow=1, trail=.4)] + gone2(L(53, 3.0), 'fade', .2), ink=False, draw=1, x=960, y=640, r=60, rot=0, glow=0, trail=0, tx=-1, ty=-.6, fx_x=1400, fx_y=-900, z=10, xs='fade')
text('f53', '66 million years ago', 'figure', 960, 180, L(53, 4.4), L(54, .2), size=80, col=CREAM)
sfx(53, .4, FX + 'transition_riser_2s_2.wav', -26); sfx(53, 3.0, FX + 'impact_bass_drop_2.wav', -18)
# L54 — the crater: 180 km, buried
art('yc54', 'YucatanCoast', L(54), None, [K(L(54, .8), 2.2, 'soft', ring=1)] + gone2(L(55, .4), 'at', 1.0, [960, 400]), enter='focus', x=960, y=420, s=1, ring=0, night=.2, z=10, xs='at')
text('f54', 'about 180 km wide', 'figure', 960, 940, L(54, 2.0), L(55, .2), size=74, col=VERM)
# L55 — the dust goes round the world and settles: the clay layer
art('wo55', 'WorldOutcrops', L(55, .4), None, [K(L(55, 1.2), 3.0, 'soft', dust=1), K(L(55, 3.2), 2.0, 'soft', line=1)] + gone2(L(56, .4), 'down', 1.0), inkdur=1.2, x=960, y=560, line=0, pins=0, dust=0, z=12, xs='down')
text('l55', 'the dust became the thin clay layer', 'note', 960, 160, L(55, 4.2), L(56, .2), size=46, col=CREAM, light=True)
# L56 — darkness and cold: the sun dims, the food chain snaps
art('fc56', 'FoodChain', L(56), None, [K(L(56, 1.4), 2.4, 'soft', dim=1), K(L(56, 4.0), 3.0, 'in', snap=1), K(L(57, .8), 1.4, 'soft', keep=1)] + gone2(L(58, .2), 'left', 1.0), inkdur=1.6, x=960, y=460, dim=0, snap=0, keep=0, z=12, xs='left')
for j, (x, lab) in enumerate(((360, 'sunlight'), (760, 'plants'), (1160, 'plant-eaters'), (1560, 'meat-eaters'))):
    text(f'l56{j}', lab, 'label', x, 680, L(56, .6 + j * .5), L(56, 4.2), size=30)
dark('dk56', L(56, 1.4), L(58, .2), k=.6, d=2.4, z=2, col='#2B1D12')
sfx(56, 4.0, FX + 'clang_metal_1.wav', -26)
# ======================================================================== WHAT IT MEANS
spot('sp57', [360, 460], 230, L(57, .4), L(58, .2), dark=.55)
art('bu58', 'Burrow', L(58), None, [K(L(58), dur(58) + 2, 'linear', tm=dur(58) + 2), K(L(58, 1.6), 2.4, 'soft', peek=1, ash=.8)] + gone2(L(59, .4), 'tearout', 1.0), enter='pour', eo='down', x=960, y=520, s=2, ash=0, peek=0, eye=1, tm=0, z=10, xs='tearout')
text('l58', 'our distant ancestors', 'note', 1400, 860, L(58, 3.0), L(59, .2), size=46, col=CREAM, light=True)
# L59–60 — a sparrow lands on the skeleton's skull
art('mus59', 'MuseumSkeleton', L(59), None, gone2(L(60, .6), 'right', 1.0), inkdur=1.2, moon=.6, dawn=.2, **MUS, z=8, xs='right')
art('sp59', 'Sparrow', L(59, 1.6), None, [K(L(59, 1.6), 1.4, 'out', fx_y=0, fx_x=0, wing=0), K(L(60, .4), 1.6, 'inOut', x=960, y=760, s=3.4)] + gone2(L(61, .2), 'fade', .8), ink=False, draw=1,
    x=1390, y=330, s=.9, wing=1, sing=0, fx_y=-500, fx_x=300, z=20, xs='fade')
G('sp59')['props']['tm'] = 0
G('sp59')['keys'] += [K(L(59, 1.6), dur(59) + dur(60), 'linear', tm=dur(59) + dur(60)), K(L(60, 2.4), .4, sing=1), K(L(60, 2.8), .4, sing=0), K(L(60, 3.4), .4, sing=1), K(L(60, 3.8), .4, sing=0), K(L(60, 2.0), 1.2, 'soft', head=.5)]
text('n60', 'a living dinosaur', 'note', 1380, 400, L(60, 2.0), L(61, .2), size=60, col=VERM)
dark('dk60', L(60, .4), L(61, .2), k=.0, d=.6, z=4, col='#F3E7CC')
sfx(60, 2.4, FX + 'amb_forest_dawn_1.wav', -28)
# L61 — four clues: the relics again, joined by one vermilion line
art('rel61', 'ClueRelics', L(61), None, [K(L(61, .6), 2.0, 'soft', glow=1)] + gone2(L(62, .4), 'collapse', 1.0, [960, 800]), enter='scale', eo=[960, 800], x=960, y=860, s=1.0, n=4, glow=0, z=14, xs='collapse')
shape('ln61', "M420 790 L800 790 L1130 790 L1460 790", L(61, 1.4), L(62, .2), dur=2.4, col=VERM, sw=5, z=20)
lamp('lp61', [960, 600], L(61), L(62, .4), r=900, dark=.4, warm=.7)
# L62 — a father and a son, a simple question
art('st62', 'AlvarezStudy', L(62), None, gone2(L(63, .4), 'fade', 1.0), enter='bleed', x=960, y=540, s=1, lamp=1, z=6, xs='fade')
person('wal62', 'Walter Alvarez', L(62, .4), None, [K(L(62, 1.6), 1.4, 'soft', pk=1)] + gone2(L(63, .4), 'fade', .8), x=760, y=1010, h=500, facing=1, pose='stand', pose2='explain', pk=0, expr='smile', ek=.5, look=[1, 0], **WALT, z=14)
person('lui62', 'Luis Alvarez', L(62, .8), None, [K(L(62, 2.6), 1.4, 'soft', pk=1)] + gone2(L(63, .4), 'fade', .8), x=1180, y=1010, h=500, facing=-1, pose='stand', pose2='think', pk=0, expr='smile', ek=.5, look=[-1, 0], **LUIS, z=14)
text('q62', 'how long did one thin layer of clay take?', 'note', 960, 200, L(62, 2.2), L(63, .2), size=46, col=CREAM, light=True)
lamp('lp62', [960, 640], L(62), L(63, .6), r=760, dark=.5, warm=.75)
# L63 — dawn in the museum; the bird flies up out of the skeleton into the morning (bookend; the burn of L2 reversed: the world back)
art('mus63', 'MuseumSkeleton', L(63), None, [K(L(63, .4), dur(63), 'linear', dawn=1, moon=0)] + gone2(L(63, dur(63) - 1.6), 'at', 2.0, [1390, 300]), enter='focus', moon=.4, dawn=0, **MUS, z=8, xs='at')
art('sp63', 'Sparrow', L(63, .8), None, [K(L(63, 2.4), .6, wing=1), K(L(63, 2.6), dur(63) - 2.6, 'in', fx_x=-500, fx_y=-500, s=.6)], ink=False, draw=1, x=1390, y=330, s=.9, wing=0, sing=0, fx_x=0, fx_y=0, enter='bleed', z=20)
shaft('sf63', [340, 160], [1200, 900], L(63, .6), None, w0=240, w1=640, n=4, k=.7)
ent('end', 'art', {'name': 'EndCard', 'k': 0, 'a': 0, 'ask': 'What will the rocks remember of us?', 'next': 'Fathom'}, [K('L63$+0.3', .01, a=1), K('L63$+0.3', 2.6, 'linear', k=1)], z=95)
sfx(63, .6, FX + 'amb_forest_dawn_2.wav', -28)

# ======================================================================== THE CAMERA — one shot per line (from lines.py `shot`), the grade per act, held breaths
AT = {5: (960, 720), 0: (1180, 560), 1: (1360, 280), 3: (1100, 520), 4: (1390, 380), 10: (760, 600), 13: (960, 540), 14: (1150, 520), 16: (1000, 520), 19: (960, 620), 23: (960, 480), 24: (1000, 300),
      26: (960, 560), 28: (1000, 540), 32: (960, 540), 34: (960, 540), 41: (960, 560), 45: (600, 600), 47: (960, 540), 48: (960, 440), 51: (960, 520), 53: (960, 600), 57: (360, 460), 59: (1300, 400), 60: (960, 700), 63: (1100, 400)}
SOFT = {'wide': 1.04, 'medium': 1.14, 'close': 1.3, 'insert': 1.45, 'detail': 1.6, 'over': 1.2}
STAGE = {1: [(0, 'close', (1240, 470)), (1.6, 'medium', (1360, 300))], 24: [(0, 'medium', (960, 560)), (1.0, 'medium', (1000, 260))]}
cam = G('camera'); ck = []
for i in range(NL):
    if i in STAGE:
        st = STAGE[i]
        for off, s_, at_ in st: ck.append(K(L(i, off), 1.4, 'soft', **shot(s_, at=at_, z=SOFT[s_])))
        off, s_, at_ = st[-1]; ck.append(K(L(i, off + 1.4), max(.9, dur(i) - off * _ratio(i) - 1.4), 'linear', **shot(s_, at=at_, z=SOFT[s_] * 1.08)))
        continue
    s = E['lines'][i].get('shot') or 'medium'; s = s if s in SOFT else 'medium'; at = AT.get(i, (960, 540)); z0 = SOFT[s]; d = dur(i)
    a = shot(s, at=at, z=z0 * .94); b = shot(s, at=at, z=z0 * 1.04)
    ck += [K(L(i), 1.6, 'soft', **a)] + ([K(L(i, 1.6), max(.9, d - 1.4), 'linear', **b)] if i != NL - 1 else [])
ck += [K(L(23, 3.4), .8, 'out', **shake(.3)), K(L(23, 4.4), 1.2, 'soft', **shake(0))]      # the needle hits the stop
ck += [K(L(53, 3.0), .6, 'out', **shake(.6)), K(L(53, 4.0), 2.0, 'soft', **shake(0))]      # the impact
ck += [K(L(34, 2.2), .6, 'out', **shake(.25)), K(L(34, 3.0), 1.0, 'soft', **shake(0))]     # the grain shatters
ck += [K(L(1), 1.6, 'soft', **rack(.4, 5)), K(L(2), 1.0, 'soft', dof=0), K(L(60), 1.4, 'soft', **rack(.2, 5)), K(L(61), 1.2, 'soft', dof=0)]
ck += [K(L(11), 2.4, 'weight', dolly=.25), K(L(12), 1.0, dolly=0), K(L(39), 3.0, 'weight', dolly=.3), K(L(40, 2.0), 1.0, dolly=0)]
ck += [K(L(63, 3.0), 3.0, 'inOut', push=1.0, pan_x=0, pan_y=0)]
ck += grade_keys(E['lines'], K)
cam['keys'] = sorted(ck, key=lambda k: (int(re.match(r'L(\d+)', str(k['t'])).group(1)) if isinstance(k['t'], str) else -1))
ent('motes', 'particles', {'kind': 'dust', 'n': 16, 'k': 0, 'a': .5, 'speed': .5, 'para': .8}, [K(L(0), 3, k=1)], z=96)

E['world'] = W
E['new_devices'] = ['RockBook', 'IridiumMeter', 'ShockedGrain', 'SurveyRing']
E['motif_art'] = []
mu = E.get('music') or {}
if isinstance(mu.get('swells'), list):   # held breaths: the blank page, the needle through the roof, the impact
    mu['swells'] = [w for w in mu['swells'] if w[2] > 0] + [['L14+2', 'L14$', -10], ['L24', 'L24$', -10], ['L53+2.6', 'L53$', -14]]
for i, l in enumerate(E['lines']): l['sfx'] = SFX.get(i, [])
E['thumb'] = {'t': 1, 'title': 'What killed the dinosaurs?', 'v': 'S', 'kicker': 'Gubbio · Yucatán', 'lines': ['WHAT', 'KILLED THE', 'DINOSAURS?'], 'accent': 2, 'note': 'One centimetre of clay.'}
json.dump(E, open(EP, 'w'), indent=1, ensure_ascii=False)
if _LN:
    TLP = os.path.join(H, 'timeline.json'); T = json.load(open(TLP))
    for i, l in enumerate(T['lines']): l['sfx'] = SFX.get(i, [])
    json.dump(T, open(TLP, 'w'), indent=1)
    os.makedirs(os.path.join(H, '../../public/ep/dinosaur-killer'), exist_ok=True)
    for f in ('episode.json', 'timeline.json'): shutil.copy(os.path.join(H, f), os.path.join(H, '../../public/ep/dinosaur-killer', f))
print(len(W), 'entities →', EP)
