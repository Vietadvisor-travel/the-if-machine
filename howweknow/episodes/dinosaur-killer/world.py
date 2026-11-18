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

# ======================================================================================================================================
# v2 STAGING (18 Nov 2026 — v1 rejected by the owner: "cảnh tĩnh… chuyển cảnh, hiệu ứng lặp lại… không đạt chất lượng điện ảnh").
# Follows jobs/scripts/dinosaur-killer_chain.md link by link: in every line something HAPPENS at least every ~2 s (event_check), every line
# has its own named camera move (MOVE, below), and every scene turns INTO the next one.
# ======================================================================================================================================
ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': .35, 'light': .4, **grade('mystery'), 'push': 1, 'pan_x': 0, 'pan_y': 0, 'dof': 0, 'focus': 0, 'shake': 0, 'roll': 0, 'dolly': 0})
def beats(id, i, pairs):   # quick keyed beats inside line i: [(offset, dur, {props}), …]
    G(id)['keys'] += [K(L(i, o), d, 'soft', **p) for o, d, p in pairs]

# ---------------------------------------------------------------- L0–L2 · SET PIECE 1: the last evening
art('dusk0', 'CretaceousDusk', L(0), None, [K(L(0), dur(0) + dur(1), 'linear', dusk=.62), K(L(1, 1.4), 2.0, 'soft', stars=1), K(L(1, 3.4), 1.0, 'soft', point=1),
    K(L(2, .2), .6, 'out', point=1.8)] + gone2(L(2, 2.2), 'burn', 2.8, [1380, 210]), inkdur=2.0, dusk=.2, stars=0, point=0, px=1380, py=210, z=2, xs='burn')
# the rex WALKS in from the left (gait), stops, lowers its head to drink, lifts it, opens its jaw a little; then turns to the streak
art('rex0', 'Theropod', L(0), None, [K(L(0), 3.2, 'linear', x=1180, walk=2.0), K(L(0, 3.2), .9, 'soft', walk=2.25), K(L(0, 3.6), 1.4, 'soft', head=-.5),
    K(L(0, 5.2), 1.2, 'soft', head=1, jaw=.3), K(L(0, 6.4), .8, eye=1, jaw=0), K(L(0), dur(0) + dur(1) + 5, 'linear', tm=12),
    K(L(1, 4.6), 1.0, 'soft', head=1.15, jaw=.15), K(L(2, .6), .9, 'soft', head=.6, flip=1)] + gone2(L(2, 2.6), 'burn', 2.8, [1380, 210]),
    ink=False, draw=1, x=-200, y=930, s=1.05, head=0, eye=0, tm=0, walk=0, breathe=1, sway=.6, jaw=0, z=10, xs='burn')
lamp('lp0', [1650, 640], L(0), L(2, 3.0), r=1100, dark=.35, warm=.9)
shadow('sh0', 1100, 940, 420, 26, L(0, 3.2), L(2, 2.6), k=.55)
haze('hz0', 520, 820, L(0, .6), L(2, 2.0), k=.35, col='#F2C98A')
mark('mk1', 'circle', [1340, 170, 80, 80], L(1, 4.4), L(2, .4), w=4)
trail('st2', [[1380, 210], [1180, 330], [900, 470], [640, 560]], L(2, .2), 1.8, L(2, 2.6), col='#F7E3A0', w=6, r=10)
ent('fl2', 'flash', {'at': [[L(2, 1.9), 640, 560, 70]], 'col': '#FFFDF4', 'glow': '#F7E3A0', 'life': 1.6}, [], z=70)
ent('emb2', 'particles', {'kind': 'embers', 'n': 50, 'k': 0, 'a': .9, 'speed': .5, 'para': .4}, [K(L(2, 2.4), 1.6, k=1), K(L(3, 2.4), 1.4, k=0)], z=70)
counter('c2', 'about {n} in 4 kinds of life — gone', 960, 960, L(2, 5.2), L(3, .6), [K(L(2, 5.2), 1.6, 'out', num=3)], size=60, col=CREAM, light=True)
sfx(0, .4, FX + 'animal_dino_roar_3.wav', -32); sfx(2, 1.9, FX + 'impact_bass_drop_1.wav', -22); sfx(2, 2.2, FX + 'motion_whoosh_deep_1.wav', -24)
# ---------------------------------------------------------------- L3–L5 · the ash becomes bones; the hall rises round them; the socket
MUS = dict(x=960, y=540, s=1, sx=1060, sy=800, ss=.92)
art('mus3', 'MuseumSkeleton', L(3), None, [K(L(3), 3.6, 'linear', build=1), K(L(3, 2.4), 2.2, 'soft', hall=1), K(L(3, 4.2), 2.0, 'soft', moon=1), K(L(4, 3.2), 1.2, 'soft', head=.25)]
    + gone2(L(5, -5.6), 'collapse', 1.0, [1394, 380]), ink=False, draw=1, build=0, hall=0, moon=.1, head=0, **MUS, z=8, xs='collapse')
shaft('sf3', [340, 200], [1180, 900], L(3, 4.0), L(5, -5.8), w0=200, w1=520, n=3, k=.5)
ent('moth4', 'trail', {'points': [{'screen': q} for q in ([260, 300], [600, 420], [840, 360], [1100, 470], [1500, 260])], 'k': 0, 'a': 0, 'col': '#5A3A22', 'w': 1.6, 'r': 5},
    [K(L(4, .4), .01, a=1), K(L(4, .4), 2.6, 'linear', k=1), K(L(4, 3.2), .6, a=0)], z=56)
spot('sp4', [1394, 380], 150, L(4, 1.6), L(5, -5.6), dark=.65)
# out of the dark socket an iris opens on the plinth; a hand sets down four relics
dark('dk5', L(5, -6.2), L(5, .4), k=.94, d=.8, z=40, col='#0B0806', style='at')
art('rel5', 'ClueRelics', L(5, .3), None, [K(L(5, 1.2), .5, 'out', n=1), K(L(5, 2.6), .5, 'out', n=2), K(L(5, 4.0), .5, 'out', n=3), K(L(5, 5.4), .5, 'out', n=4), K(L(5, 7.0), 1.0, 'soft', glow=1)]
    + gone2(L(6, .2), 'lift', 1.0), enter='iris', eo=[1394, 380], x=960, y=820, s=1.2, n=0, glow=0, z=20, xs='lift')
for j, (x, lab) in enumerate(((384, 'a line in the rock'), (768, 'a pinch of clay'), (1164, 'a scratched grain'), (1560, 'a report nobody read'))):
    text(f'l5{j}', lab, 'label', x, 900, L(5, 1.5 + j * 1.4), L(6, .2), size=34)
lamp('lp5', [960, 520], L(5, .3), L(6, .4), r=900, dark=.4, warm=.7)
sfx(5, 1.2, FX + 'impact_wood_1.wav', -26); sfx(5, 2.6, FX + 'impact_glass_1.wav', -28); sfx(5, 4.0, FX + 'impact_soft_1.wav', -28); sfx(5, 5.4, FX + 'impact_cardboard_1.wav', -28)
# the title: SCREEN-LOCKED (prop lock), centred, never moved by the camera
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'What killed\nthe dinosaurs?', 'sub': 'a story in four clues', 'a': 0, 'lock': 1},
    [K(L(5, -5.6), .01, a=1), K(L(5, -5.6), 2.0, 'linear', k=.5), K(L(5, -3.6), 2.0, 'linear', k=1), K(L(5, -1.2), 1.3, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(L(5, .2), .01, a=0)], z=90)
# ---------------------------------------------------------------- L6–L8 · THE STAKES: the old book comes alive; a watch with no hands
art('haw6', 'Etch', L(6), None, gone2(L(8, .2), 'lift', 1.2), ink=False, src=PD + 'hawkins_ink.png', x=60, y=150, w=540, h=705, draw=1, enter='brush', tint='#C9AE84', washA=.35, z=12, xs='lift')
text('n6', 'Sydenham, 1853', 'label', 330, 900, L(6, .9), L(8, .2), size=28)
art('th6', 'TheoryCards', L(6, .6), None, [K(L(6, 1.0), 1.2, 'soft', turn=1), K(L(6, 1.6), 2.4, 'soft', frost=1), K(L(6, 2.6), 1.2, 'soft', turn=2), K(L(6, 4.4), 1.6, 'in', keel=1),
    K(L(6, 4.6), 1.2, 'soft', turn=3), K(L(6, 5.8), 1.8, 'soft', erupt=1), K(L(6), dur(6) + dur(7), 'linear', tm=dur(6) + dur(7)),
    K(L(7, .4), 1.6, 'soft', q=1), K(L(7, 2.6), 1.1, 'in', rip=1), K(L(7, 3.8), 1.1, 'in', rip=2), K(L(7, 5.0), 1.1, 'in', rip=3)] + gone2(L(8, .2), 'fade', .6),
    enter='wipe', eo='left', x=1220, y=540, s=.8, turn=0, q=0, blank=0, frost=0, keel=0, erupt=0, rip=0, tm=0, z=14, xs='at')
lamp('lp6', [900, 260], L(6), L(8, .4), r=1000, dark=.35, warm=.65)
sfx(6, 1.0, FX + 'foley_page_turn_1.wav', -26); sfx(6, 4.4, FX + 'impact_soft_2.wav', -28); sfx(6, 5.8, FX + 'amb_thunder_roll_1.wav', -32)
sfx(7, 2.6, FX + 'machine_paper_1.wav', -26); sfx(7, 3.8, FX + 'machine_paper_1.wav', -28)
art('dur8', 'Etch', L(8), None, gone2(L(9, .1), 'tearout', .9), ink=False, src=PD + 'duria_ink.png', x=260, y=80, w=1400, h=966, draw=1, enter='focus', tint='#7FA8C4', washA=.4, z=10, xs='tearout')
text('n8', 'Duria Antiquior, 1830', 'label', 960, 1050, L(8, .6), L(9), size=26)
art('pw8', 'PocketWatch', L(8, 1.2), None, [K(L(8, 1.2), 1.6, 'out', rise=1), K(L(8, 2.6), 1.2, 'soft', swing=12), K(L(8, 3.8), 1.2, 'soft', swing=-10), K(L(8, 4.4), .6, hands=1),
    K(L(8, 4.4), 2.6, 'in', spin=3.2), K(L(8, 5.0), 1.2, 'soft', swing=6), K(L(8, 7.0), .8, hands=0, swing=0), K(L(9), .6, 'in', fx_s=.5, fx_y=320)] + gone2(L(9, .7), 'collapse', .3, [960, 820]),
    ink=False, draw=1, x=960, y=520, s=1, swing=0, hands=0, spin=0, rise=0, fx_s=1, fx_y=0, fx_ox=960, fx_oy=520, z=20, xs='collapse')
text('q8', 'no clock in a bone', 'note', 1260, 200, L(8, 5.4), L(9), size=48, col=VERM)
sfx(8, 1.2, FX + 'amb_ocean_wave_1.wav', -32); sfx(8, 4.4, FX + 'clack_key_1.wav', -26)
# ---------------------------------------------------------------- CLUE 1 — a line in the rock · the watch lands as a block of stone
# v2: no clue chyron on screen (critic) — each clue's name is stamped into its scene. The `clue` entity stays as the story's structure tag
# (script_check: clues 1..4 in order) but is never shown (a = 0 throughout).
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'A Line in the Rock', 'a': 0}, [K(L(18, .5), .01, n=2, label='Too Much of a Rare Metal'), K(L(29, .5), .01, n=3, label='Scars in the Sand'),
    K(L(36, .5), .01, n=4, label='A Ring Under the Jungle')])
art('rb9', 'RockBook', L(9, .5), None, [K(L(9, .5), .7, 'in', fx_y=0), K(L(9, 1.2), .6, 'soft', red=1)] + gone2(L(10, .3), 'down', .9), ink=False, draw=1, x=960, y=600, s=1, open=0, red=0, fx_y=-500, z=20, xs='down')
text('t9', 'Clue I · A Line in the Rock', 'stamp', 960, 250, L(9, 1.0), L(10, .3), size=58, col=VERM)
sfx(9, 1.2, FX + 'impact_stone_1.wav', -20)
# L10 — Gubbio: Walter walks along the road, stops, taps the rock with his hammer; chips fly
art('gub10', 'GubbioGorge', L(10), None, [K(L(10, 5.2), 1.0, 'soft', red=.5)] + gone2(L(11, .4), 'flip', 1.1), enter='wipe', eo='up', x=960, y=540, s=1, red=0, z=6, xs='flip')
person('wal10', 'Walter Alvarez, geologist, at Gubbio (1970s)', L(10, .4), None, [K(L(10, .4), 3.2, 'linear', x=760, walk=3), K(L(10, 3.6), .9, 'soft', walk=3.25, pose2='raise', pk=0),
    K(L(10, 4.4), .8, 'hand', pk=1), K(L(10, 5.2), .5, 'hand', pk=.3), K(L(10, 5.8), .5, 'hand', pk=1), K(L(10, 6.4), .5, 'hand', pk=.3), K(L(10, 7.2), 1.0, 'soft', expr='focus', ek=1, pose2='look', pk=1)]
    + gone2(L(11, .4), 'down', .8), x=120, y=1000, h=520, facing=1, pose='stand', pose2='raise', pk=0, walk=0, holds='hammer', expr='focus', ek=0, look=[1, -.3], **WALT, z=14)
ent('chips10', 'particles', {'kind': 'dust', 'n': 26, 'k': 0, 'a': .9, 'speed': 1.2, 'para': .2}, [K(L(10, 5.2), .4, k=1), K(L(10, 6.8), 1.0, k=0)], z=30)
art('pin10', 'Pinned', L(10, 7.0), None, gone2(L(11, .2), 'burn', 1.0, [1520, 280]), ink=False, src=ST + 'R-01-x1_alvarez-trio-gubbio.jpg', x=1520, y=280, w=420, h=280, rot=3, caption='Walter Alvarez at Gubbio', draw=1, enter='bleed', z=30, xs='burn')
text('pl10', 'Gubbio, Italy · 1970s', 'plate', 1000, 940, L(10, 2.0), L(11, .2), size=38, col=CREAM, light=True)
lamp('lp10', [1500, 160], L(10), L(11, .6), r=1200, dark=.25, warm=.6)
sfx(10, 4.4, FX + 'impact_stone_2.wav', -24); sfx(10, 5.8, FX + 'impact_stone_3.wav', -24)
# L11–L15 — SET PIECE 2a: the stone book opens; a finger reads it upward; a dive into a living page; the blank red page
art('rb11', 'RockBook', L(11), None, [K(L(11, .4), 2.4, 'weight', open=1), K(L(11, 3.0), 1.0, 'soft', red=.35), K(L(14, .2), 1.6, 'inOut', page=1), K(L(14, 1.6), 1.0, 'soft', red=1),
    K(L(14, 2.6), 1.4, 'out', ruler=1), K(L(15, .2), .8, 'soft', ruler=0)] + gone2(L(16, .1), 'shatter', 1.3, [960, 560]),
    ink=False, draw=1, x=960, y=600, s=.92, open=0, page=0, red=0, thread=0, sparse=1, ruler=0, z=20, xs='shatter', enter='unroll')
art('ly11', 'Etch', L(11, 3.4), None, gone2(L(12, 4.6), 'fade', .8), ink=False, src=PD + 'lyell_ink.png', x=560, y=40, w=800, h=267, draw=1, enter='wipe', eo='right', tint='#C9AE84', washA=.3, z=24, xs='fade')
lamp('lp11', [700, 260], L(11), L(16, .4), r=1100, dark=.4, warm=.7)
shadow('sh11', 960, 900, 560, 30, L(11, .6), L(16), k=.55)
# Walter's finger climbs the pages from the bottom to the top (the quill hand used as his pointing hand)
quill('qh12', [[700, 800], [700, 720], [710, 620], [700, 520], [705, 430], [700, 380]], L(12, .4), L(13, .2))
text('l12a', 'older', 'label', 470, 820, L(12, .6), L(12, 3.4), size=36, col='#5A3A22')
text('l12b', 'younger', 'label', 470, 400, L(12, 3.0), L(13, .2), size=36, col='#5A3A22')
art('for13', 'Foraminifera', L(13), None, [K(L(13), dur(13), 'linear', tm=dur(13) * 1.5), K(L(13, 4.2), 2.6, 'inOut', alive=0)] + gone2(L(14, .1), 'at', .9, [960, 540]),
    enter='iris', eo=[760, 760], x=960, y=540, r=420, n=1, turn=0, alive=1, tm=0, z=30, xs='at')
text('l13a', 'plankton, alive in a warm sea', 'note', 960, 1010, L(13, 1.0), L(13, 4.0), size=40, col=CREAM, light=True)
text('l13b', '…then shells in stone', 'note', 960, 1010, L(13, 5.0), L(14), size=40, col=CREAM, light=True)
dark('dk13', L(13), L(14, .1), k=.82, d=.6, z=25, col='#1A120B', style='left')
art('cl14', 'Clipping', L(14, 3.2), None, gone2(L(15, 3.6), 'tearout', 1.0), ink=False, src=ST + 'P-01_gubbio-kpg-boundary-outcrop.jpg', x=1530, y=300, w=300, h=294, rot=4, seed='p01', draw=1, enter='tear', z=34, xs='tearout')
text('f14', '≈ 1 cm', 'figure', 1420, 680, L(14, 3.6), L(15, .6), size=100, col=VERM)
sfx(14, .2, FX + 'transition_page_turn_2.wav', -22); sfx(14, 2.6, FX + 'clang_metal_2.wav', -28)
art('for15', 'Foraminifera', L(15, .4), None, [K(L(15, 1.6), 4.2, 'linear', blink=.97)] + gone2(L(16, .1), 'at', .6, [1440, 560]), enter='pour', x=1440, y=560, r=250, n=1, blink=0, z=32, xs='at')
text('l15', 'above the clay: almost none', 'note', 1440, 900, L(15, 2.2), L(16, .1), size=40, col='#5A3A22')
# L16 — his fingertip lands on the band; it glows like an ember (the burn of the opening)
art('fin16', 'FingerOnClay', L(16, .2), None, [K(L(16, 1.6), .8, 'soft', glow=.8), K(L(16, 2.6), .8, 'soft', glow=.3), K(L(16, 3.6), .8, 'soft', glow=1), K(L(16, 4.8), .8, 'soft', glow=.4),
    K(L(16, 6.0), .8, 'soft', glow=1)] + gone2(L(17, .3), 'collapse', 1.0, [1000, 520]), enter='glide', eo=[1400, 0], x=960, y=540, s=1, glow=0, z=20, xs='collapse')
lamp('lp16', [980, 520], L(16, .4), L(17, .4), r=700, dark=.45, warm=.8)
text('n16', 'the whole ending, in one thin layer', 'note', 760, 220, L(16, 3.0), L(17, .2), size=48, col=CREAM, light=True)
# L17–L18 — the glowing clay pours into an hourglass; it flips; it flips again
art('hg17', 'ClayHourglass', L(17, .2), None, [K(L(17, .2), 2.0, 'soft', flow=.0), K(L(17, 2.2), 1.2, 'inOut', turn=180), K(L(17, 3.4), dur(17) - 3.0, 'linear', flow=.7),
    K(L(18, .1), 1.1, 'inOut', turn=360), K(L(18, 1.2), 2.0, 'linear', flow=.85)] + gone2(L(19, .3), 'up', .9), enter='pour', x=960, y=560, s=1.1, flow=0, turn=0, gauge=0, z=20, xs='up')
text('q17', 'how long?', 'note', 1380, 360, L(17, 4.0), L(18, .2), size=64, col=VERM)
lamp('lp17', [960, 420], L(17), L(19, .6), r=800, dark=.45, warm=.7)
text('t18', 'Clue II · Too Much of a Rare Metal', 'stamp', 960, 180, L(18, .2), L(19, .2), size=54, col=VERM)
ripple('rp18', [960, 560], L(18, .8), r=260, n=3, col='#8C3424')
sfx(17, 2.2, FX + 'foley_book_close_1.wav', -30)
# L19 — the study: the son walks in with the phial and gives it to his father; Luis lifts it to the lamp
art('st19', 'AlvarezStudy', L(19), None, gone2(L(20, .4), 'at', 1.0, [960, 160]), enter='blinds', x=960, y=540, s=1, lamp=1, z=6, xs='at')
person('wal19', 'Walter Alvarez', L(19, .3), None, [K(L(19, .3), 2.6, 'linear', x=760, walk=2.5), K(L(19, 2.9), .8, 'soft', walk=2.75, pose2='reach', pk=0), K(L(19, 3.4), 1.0, 'hand', pk=1),
    K(L(19, 4.6), .01, holds='none'), K(L(19, 5.0), 1.0, 'soft', pk=0, expr='smile', ek=.6)] + gone2(L(20, .4), 'fade', .8),
    x=260, y=1010, h=500, facing=1, pose='hold', pose2='reach', pk=0, walk=0, holds='phial', expr='focus', ek=.6, look=[1, 0], **WALT, z=14)
person('lui19', 'Luis Alvarez, Nobel physicist', L(19, .6), None, [K(L(19, 3.2), 1.0, 'soft', pose2='reach', pk=1), K(L(19, 4.6), .01, holds='phial'), K(L(19, 4.8), 1.2, 'soft', pose2='look', pk=1, look=[-.2, -1]),
    K(L(19, 6.6), 1.2, 'soft', expr='surprise', ek=.9), K(L(19, 8.4), 1.0, 'soft', pose2='think', expr='focus')] + gone2(L(20, .4), 'fade', .8),
    x=1200, y=1010, h=500, facing=-1, pose='stand', pose2='reach', pk=0, holds='none', expr='focus', ek=0, look=[-1, 0], **LUIS, z=14)
art('pin19', 'Pinned', L(19, 6.0), None, gone2(L(20, .2), 'lift', .9), ink=False, src=ST + 'P-02_alvarez-father-son-gubbio.jpg', x=1640, y=330, w=280, h=376, rot=-3, caption='Luis and Walter Alvarez', draw=1, enter='bleed', z=30, xs='lift')
lamp('lp19', [1080, 600], L(19), L(20, .6), r=700, dark=.5, warm=.75)
# L20 — out through the window: the night, the curve of the Earth, dust falling like snow
art('sd20', 'SpaceDust', L(20), None, [K(L(20), dur(20) + dur(21), 'linear', k=4), K(L(20, 1.2), 1.4, 'soft', earth=1)] + gone2(L(22, .1), 'down', .8), enter='scale', eo=[960, 160], k=0, earth=0, z=4, xs='down')
text('n20', 'space dust falls all the time', 'note', 960, 220, L(20, 1.8), L(21, .4), size=46, col=CREAM, light=True)
# L21 — the snow is a clock: it falls into the hourglass, a gauge climbs with each flake
art('hg21', 'ClayHourglass', L(21, .4), None, [K(L(21, 1.4), 2.0, 'soft', gauge=.2), K(L(21, 3.6), 2.0, 'soft', gauge=.4), K(L(21, 5.8), 2.0, 'soft', gauge=.6), K(L(21, 8.0), 2.0, 'soft', gauge=.8),
    K(L(21, .4), dur(21), 'linear', flow=.9)] + gone2(L(22, .1), 'tearout', .8), enter='focus', x=1340, y=620, s=.8, flow=.1, gauge=.02, z=10, xs='tearout')
for j, (lab, o) in enumerate((('1 000 years', 1.6), ('10 000 years', 4.0), ('100 000 years', 6.2))):
    text(f'y21{j}', lab, 'figure', 760, 420 + j * 120, L(21, o), L(22, .1), size=54, col=CREAM)
text('l21', 'more iridium = more time', 'note', 760, 860, L(21, 8.6), L(22, .1), size=46, col=VERM)
# L22–L24 — SET PIECE 2b: the meter; the needle slams the stop; it bends and grows up through the roof into the night
art('im22', 'IridiumMeter', L(22), None, [K(L(22, .3), .9, 'soft', drawer=1), K(L(22, 1.4), .7, 'soft', drawer=0), K(L(22, 2.2), 1.2, 'soft', v=.25), K(L(22, 3.4), .8, 'soft', v=.18),
    K(L(23, .2), 1.4, 'in', v=.7), K(L(23, 1.6), .6, 'in', v=1.08), K(L(23, 2.2), .4, 'out', v=1.02), K(L(23, 2.6), .5, 'in', v=1.12), K(L(23, 3.4), 1.0, 'in', v=1.25),
    K(L(24, .2), 3.0, 'in', roof=1)] + gone2(L(25, .1), 'tearout', 1.0), enter='blinds', x=960, y=600, s=1, v=.05, roof=0, drawer=0, room=1, z=10, xs='tearout')
text('s23', 'far too much', 'stamp', 1280, 260, L(23, 2.2), L(24, .4), size=52, col=VERM)
text('l23', 'dozens of times more than normal', 'note', 960, 990, L(23, 3.2), L(24, .2), size=40, col='#5A3A22')
SKY('sky24', L(24, 1.4), L(25, .2))
text('l24', 'it came from above', 'note', 1300, 160, L(24, 2.6), L(25), size=52, col=CREAM, light=True)
lamp('lp22', [960, 560], L(22), L(24, 1.4), r=900, dark=.4, warm=.55)
sfx(22, .3, FX + 'clack_toggle_1.wav', -24); sfx(23, 1.6, FX + 'impact_metal_2.wav', -22); sfx(23, 2.6, FX + 'impact_metal_1.wav', -24); sfx(24, .2, FX + 'transition_riser_2s_1.wav', -26)
# L25 — a century of dust in an afternoon: the clock spins, the dust falls all at once
art('ds25', 'DustShelf', L(25), None, [K(L(25, .3), 2.4, 'in', tick=60), K(L(25, 1.6), 1.6, 'in', dust=1)] + gone2(L(26, .1), 'at', .9, [960, 500]), enter='pour', eo='down', x=960, y=560, s=1, dust=0, tick=0, z=10, xs='at')
sfx(25, .3, FX + 'rewind_1.wav', -28)
# L26 — a saw goes through a meteorite: metal crystals like frost
art('met26', 'MeteoriteSlice', L(26), None, [K(L(26, .4), 2.6, 'inOut', cut=1)] + gone2(L(27, .1), 'collapse', .8, [960, 520]), enter='focus', x=960, y=560, s=1.2, cut=0, z=14, xs='collapse')
sheen('she26', [700, 350, 600, 460], L(26, 3.2))
text('l26', 'a meteorite: rich in iridium', 'label', 960, 820, L(26, 3.6), L(27, .1), size=36)
lamp('lp26', [1200, 260], L(26), L(27, .4), r=900, dark=.45, warm=.6)
sfx(26, .4, FX + 'machine_ratchet_engine_1.wav', -30)
# L27 — the slice swells into the asteroid, tumbling, heating at its leading edge
SKY('sky27', L(27), L(28, .6))
art('ast27', 'Asteroid', L(27), None, [K(L(27), dur(27) + 2, 'linear', rot=140), K(L(27, 2.2), 1.6, 'soft', glow=.6), K(L(27, 4.6), 1.2, 'soft', glow=.2), K(L(27, 6.6), 1.4, 'soft', glow=.8, trail=.3),
    K(L(28), 1.2, 'inOut', x=1420, y=420, r=330)] + gone2(L(29, .1), 'at', .9, [1420, 420]), enter='scale', eo=[960, 520], x=960, y=520, r=260, rot=0, glow=0, trail=0, z=14, xs='at')
text('pl27', '1980 · Alvarez, Alvarez, Asaro, Michel', 'plate', 960, 940, L(27, 3.2), L(28, .2), size=34, col=CREAM, light=True)
# L28 — beside Everest; a climber's flag; its shadow falls over the mountain
art('ev28', 'EverestScale', L(28), None, [K(L(28, 1.0), 1.0, 'soft', flag=1), K(L(28, 2.6), 2.4, 'in', shade=1)] + gone2(L(29, .3), 'at', .9, [700, 300]), enter='wipe', eo='left', x=620, y=980, s=1, flag=0, shade=0, z=6, xs='at')
text('f28', '≈ 10 km', 'figure', 1420, 860, L(28, 1.8), L(29, .2), size=90, col=VERM)
text('l28', 'Mount Everest', 'label', 620, 240, L(28, 3.0), L(29, .2), size=32)
# ---------------------------------------------------------------- CLUE 3 — scars in the sand: the mountain's shadow becomes the microscope's dark field
art('sg29', 'ShockedGrain', L(29), None, [K(L(29), 1.4, 'soft', sharp=1, etch=.3)] + gone2(L(30, .3), 'tearout', .9), enter='iris', eo=[960, 540], x=960, y=560, r=300, etch=0, crack=0, sharp=0, z=20, xs='tearout')
text('t29', 'Clue III · Scars in the Sand', 'stamp', 960, 200, L(29, .2), L(30, .2), size=54, col=VERM)
sfx(29, .2, FX + 'clack_key_2.wav', -26)
# L30–L31 — whip across a globe; cliffs pop up one by one round the curve; one red thread ties them like string round a parcel
art('wo30', 'WorldOutcrops', L(30), None, [K(L(30, 1.6), .6, 'out', pop=1), K(L(30, 3.0), .6, 'out', pop=2), K(L(30, 4.4), .6, 'out', pop=3), K(L(30, 5.8), .6, 'out', pop=4), K(L(30, 7.2), .6, 'out', pop=5),
    K(L(31, .2), 2.6, 'soft', line=1), K(L(31, 1.0), 2.6, 'linear', pins=1)] + gone2(L(32, .3), 'at', .9, [960, 340]), enter='glide', eo=[1900, 0], x=960, y=560, line=0, pins=0, dust=0, pop=0, z=8, xs='at')
text('q30', 'if it was true — everywhere?', 'note', 960, 160, L(30, 1.0), L(31, .2), size=50, col=VERM)
for j, (x, lab) in enumerate(((260, 'Italy'), (620, 'Denmark'), (960, 'Spain'), (1300, 'New Mexico'), (1660, 'New Zealand'))):
    text(f'l30{j}', lab, 'label', x, [700, 530, 480, 530, 700][j] + 30, L(30, 2.0 + j * 1.4), L(32, .2), size=26)
sfx(31, .2, FX + 'motion_whoosh_long_1.wav', -28)
# L32–L35 — SET PIECE: the grain. Lamellae etch in; pressure arrows squeeze it hot; it shatters; the shards fly up and become the question
art('sg32', 'ShockedGrain', L(32), None, [K(L(32, .6), 1.6, 'soft', etch=.45), K(L(32, 2.4), 1.6, 'soft', etch=.75), K(L(32, 4.2), 1.6, 'soft', etch=1),
    K(L(33, 1.4), 1.4, 'in', heat=.6), K(L(33, 3.0), .8, 'out', heat=.3), K(L(33, 4.0), 1.6, 'in', heat=1, crack=.2), K(L(34, .6), 1.0, 'in', crack=.6)]
    + [K(L(34, 1.8), 1.4, 'in', crack=1)] + gone2(L(34, 3.4), 'at', .8, [960, 540]), enter='iris', eo=[960, 340], x=960, y=540, r=430, etch=.1, crack=0, heat=0, sharp=1, z=20, xs='at')
art('eye32', 'Eyepiece', L(32, 5.0), None, gone2(L(33, .8), 'lift', .9), ink=False, src=ST + 'P-03_shocked-quartz-usgs.jpg', x=1500, y=340, r=190, cross=0, draw=1, enter='bleed', z=34, xs='lift')
text('l32', 'shocked quartz (USGS)', 'label', 1500, 570, L(32, 5.6), L(33, .8), size=26, col=CREAM, light=True)
dark('dk32', L(32), L(35, .3), k=.9, d=.8, z=3, col='#1A1424', style='down')
shape('pa33', "M300 540 L470 540 M440 510 L470 540 L440 570", L(33, 1.0), L(34, 1.8), dur=.8, col=VERM, sw=8, z=40)
shape('pb33', "M1620 540 L1450 540 M1480 510 L1450 540 L1480 570", L(33, 1.2), L(34, 1.8), dur=.8, col=VERM, sw=8, z=40)
G('pa33')['keys'] += [K(L(33, 2.2), 1.6, 'in', x=53), K(L(34), .6, 'in', x=56)]
G('pb33')['keys'] += [K(L(33, 2.2), 1.6, 'in', x=47), K(L(34), .6, 'in', x=44)]
text('l33', 'one of the toughest minerals on Earth', 'note', 960, 1010, L(33, .4), L(34, .2), size=40, col=CREAM, light=True)
text('s34', 'only an impact', 'stamp', 960, 180, L(34, 2.6), L(35, .2), size=56, col=VERM)
sfx(33, 1.4, FX + 'sweep_riser_2s_1.wav', -28); sfx(34, 1.8, FX + 'real_glass_break_1.wav', -20)
art('wo35', 'WorldOutcrops', L(35), None, [] + gone2(L(36, .2), 'collapse', .7, [960, 300]), enter='bleed', x=960, y=560, line=1, pins=0, dust=0, pop=5, z=8, xs='collapse')
text('q35', 'where?', 'figure', 960, 260, L(35, 1.8), L(36, .2), size=150, col=VERM)
ripple('rp35', [960, 300], L(35, 2.0), r=300, n=3, col='#8C3424')
# ---------------------------------------------------------------- CLUE 4 — a ring under the jungle
art('ux36', 'Etch', L(36), None, gone2(L(37, .3), 'down', .9), ink=False, src=PD + 'uxmal_ink.png', x=60, y=330, w=1800, h=460, draw=1, enter='brush', z=8, xs='down')
text('t36', 'Clue IV · A Ring Under the Jungle', 'stamp', 960, 240, L(36, .2), L(37, .2), size=54, col=VERM)
text('l36', 'Yucatán · Catherwood, 1844', 'label', 960, 840, L(36, .8), L(37, .2), size=28)
art('gl37', 'SearchGlobe', L(37), None, [K(L(37, .4), dur(37), 'linear', look=1, spin=.6), K(L(37, 3.0), .8, 'soft', q=.34), K(L(37, 6.0), .8, 'soft', q=.67), K(L(37, 9.0), .8, 'soft', q=1)]
    + gone2(L(38, .3), 'collapse', .9, [960, 500]), inkdur=1.2, x=960, y=500, r=320, look=0, q=0, spin=0, z=10, xs='collapse')
lamp('lp37', [700, 300], L(37), L(38, .6), r=900, dark=.4, warm=.6)
art('rs38', 'ReportShelf', L(38), None, [K(L(38, 1.6), 1.6, 'soft', pull=1), K(L(38, .2), 1.0, 'soft', lamp=1)] + gone2(L(39, .4), 'at', .9, [700, 400]), enter='tear', x=960, y=560, s=1, pull=0, dust=.6, blow=0, open=0, lamp=0, z=8, xs='at')
text('n38', 'it had been found already', 'note', 1400, 180, L(38, 2.6), L(39, .3), size=48, col=VERM)
# L39–L42 — SET PIECE 3: the survey plane flies the coast; under it the jungle turns to glass; its passes ink the half ring; the sea closes it
art('yc39', 'YucatanCoast', L(39), None, [K(L(40, 1.4), 3.0, 'soft', ring=.6)] + gone2(L(41, .2), 'up', .9), enter='iris', eo=[700, 400], x=960, y=420, s=1, ring=0, night=0, z=4, xs='up')
art('pl39', 'SurveyPlane', L(39, .8), None, [K(L(39, .8), 7.0, 'inOut', fx_x=1500, trail=1), K(L(39, 7.8), 1.4, 'soft', rot=180), K(L(39, 9.2), 5.4, 'inOut', fx_x=200, y=760),
    K(L(40, 2.0), 1.2, 'soft', rot=360), K(L(40, 3.2), 3.6, 'inOut', fx_x=1300, y=560), K(L(39, .8), .01, prop=1)] + gone2(L(41, .2), 'fade', .5),
    ink=False, draw=1, x=200, y=640, s=1.3, rot=0, prop=0, trail=0, fx_x=0, enter='focus', z=20, xs='fade')
text('pl39t', '1978 — Glen Penfield & Antonio Camargo, Pemex', 'plate', 960, 920, L(39, 2.0), L(40, .4), size=34, col=CREAM, light=True)
text('n39', 'looking for oil', 'note', 1440, 200, L(39, 5.0), L(39, 9.0), size=48, col=CREAM, light=True)
text('n40', 'something old, buried deep', 'note', 1300, 160, L(40, 3.6), L(41, .2), size=48, col=VERM)
sfx(39, .8, FX + 'impact_soft_engine_1.wav', -30); sfx(40, 1.4, FX + 'cue_reveal_1.wav', -28)
art('sr41', 'SurveyRing', L(41), None, [K(L(41, .3), dur(41) - .6, 'linear', pas=1), K(L(42, .3), 2.4, 'soft', sea=1), K(L(42, 2.8), 1.8, 'soft', whole=1)] + gone2(L(43, .2), 'collapse', .9, [960, 300]),
    enter='unroll', x=960, y=520, R=340, pas=0, sea=0, whole=0, sheet=1, scale=0, z=14, xs='collapse')
quill('qh41', [[620, 560], [700, 760], [960, 820], [1220, 760], [1300, 560]], L(41, .3), L(41, 4.4))
text('l41', 'half of a giant ring', 'note', 960, 140, L(41, 2.4), L(42, .2), size=46, col=VERM)
text('l42', 'the other half: under the sea', 'label', 960, 210, L(42, .8), L(43, .2), size=34)
art('m42', 'Pinned', L(42, 4.0), None, gone2(L(43, .2), 'lift', .7), ink=False, src=ST + 'M-01_chicxulub-ring-srtm.jpg', x=1620, y=560, w=330, h=374, rot=3, caption='The buried ring today (NASA)', draw=1, enter='bleed', z=30, xs='lift')
# L43–L45 — 1981, nobody listens: the seats empty one by one; the projector's beam becomes a window's light over a shelf, day after day
art('ch43', 'ConferenceHall', L(43), None, [K(L(43, 1.0), .7, 'soft', empty=.2), K(L(43, 2.2), .7, 'soft', empty=.45), K(L(43, 3.4), .7, 'soft', empty=.7), K(L(43, 4.6), .7, 'soft', empty=.95)]
    + gone2(L(44, .3), 'left', .9), enter='blinds', x=960, y=540, s=1, empty=0, beam=1, z=6, xs='left')
text('pl43', '1981', 'plate', 1600, 160, L(43, .6), L(44, .2), size=48, col=CREAM, light=True)
art('rs44', 'ReportShelf', L(44), None, [K(L(44), dur(44), 'linear', day=4, dust=1), K(L(45, 2.0), 1.2, 'soft', day=4.5), K(L(45, 3.4), 1.6, 'soft', blow=1, pull=1, lamp=1)]
    + gone2(L(46, .3), 'right', .9), inkdur=1.0, x=960, y=560, s=1, pull=0, dust=0, blow=0, open=0, lamp=0, day=0, z=8, xs='right')
counter('c44', '{n}', 1600, 200, L(44, .3), L(45, .4), [K(L(44, .3), dur(44) - .5, 'linear', num=1990)], size=90, num=1981)
person('hil45', 'Alan Hildebrand, a young geologist (1990)', L(45), None, [K(L(45), 2.0, 'linear', x=420, walk=2), K(L(45, 2.0), .8, 'soft', walk=2.25, pk=1), K(L(45, 3.4), .6, 'soft', expr='focus', ek=1),
    K(L(45, 5.0), 1.2, 'soft', expr='surprise', ek=.9, pose2='hold')] + gone2(L(46, .2), 'down', .7),
    x=60, y=1010, h=540, facing=1, pose='stand', pose2='reach', pk=0, walk=0, expr='focus', ek=.3, look=[1, -.3], **HILD, z=16)
text('pl45', '1990', 'plate', 1600, 160, L(45, .6), L(46, .2), size=48, col=CREAM, light=True)
sfx(45, 3.4, FX + 'real_wind_4.wav', -28)
art('dc46', 'DrillCore', L(46), None, [K(L(46, .6), 1.4, 'soft', lid=1), K(L(46, 2.6), 1.6, 'soft', roll=1)] + gone2(L(47, .3), 'at', .9, [960, 580]), enter='unroll', x=960, y=540, s=1, lid=0, roll=0, lamp=1, z=8, xs='at')
sfx(46, .6, FX + 'impact_woodheavy_1.wav', -26)
art('sg47', 'ShockedGrain', L(47), None, [K(L(47, .4), 1.4, 'soft', etch=.5), K(L(47, 2.0), 1.4, 'soft', etch=1), K(L(47, 4.4), .8, 'soft', heat=.4), K(L(47, 5.4), .8, 'soft', heat=0)]
    + gone2(L(48, .3), 'down', .9), enter='iris', eo=[960, 580], x=960, y=540, r=380, etch=0, crack=0, heat=0, sharp=1, z=14, xs='down')
text('n47', 'the same scars', 'note', 960, 1000, L(47, 2.6), L(48, .2), size=52, col=CREAM, light=True)
dark('dk47', L(47), L(48, .4), k=.85, d=.6, z=3, col='#1A1424', style='right')
art('vs48', 'VillageSign', L(48), None, gone2(L(49, .2), 'down', .9), enter='glide', eo=[0, -700], x=960, y=560, s=1, sun=1, z=8, xs='down')
text('s48', 'CHICXULUB', 'stamp', 960, 382, L(48, 1.6), L(49, .2), size=70, col='#22507A')
text('pl48', '1991', 'plate', 300, 160, L(48, .6), L(49, .2), size=48)
sfx(48, 1.6, FX + 'impact_wood_2.wav', -22)
art('yc49', 'YucatanCoast', L(49), None, [K(L(49), 3.0, 'out', s=.62, ring=1)] + gone2(L(50, .3), 'flip', 1.0), enter='scale', eo=[960, 420], x=960, y=420, s=1.6, ring=0, night=0, z=4, xs='flip')
art('sr49', 'SurveyRing', L(49, 2.0), None, [K(L(49, 2.0), 2.2, 'soft', whole=1), K(L(49, 4.2), 1.2, scale=1)] + gone2(L(50, .3), 'flip', 1.0), ink=False, draw=1, x=960, y=410, R=230, pas=0, sea=0, whole=0, sheet=0, scale=0, z=10, xs='flip')
# ---------------------------------------------------------------- THE TWIST — the answer had been on a shelf
art('rs50', 'ReportShelf', L(50), None, [K(L(50, .6), 1.6, 'soft', pull=1, lamp=1), K(L(50, 2.0), 2.0, 'soft', open=1), K(L(50, 4.6), 2.4, 'inOut', lift=1)]
    + gone2(L(52, .1), 'burn', 1.8, [960, 500]), enter='focus', x=960, y=560, s=1, pull=0, dust=0, blow=0, open=0, lamp=0, lift=0, z=8, xs='burn')
spot('sp51', [960, 520], 420, L(51), L(52, .1), dark=.6)
text('s51', 'hidden on a shelf', 'stamp', 960, 130, L(51, 1.0), L(52, .1), size=56, col=VERM)
sfx(50, .2, FX + 'cue_twist_1.wav', -26)
# ---------------------------------------------------------------- THE ANSWER — the skull turns to the window; through it, the impact
art('mus52', 'MuseumSkeleton', L(52), None, [K(L(52, .6), 1.6, 'soft', head=.5)] + gone2(L(53, .3), 'at', .8, [400, 260]), enter='bleed', moon=1, head=0, **MUS, z=8, xs='at')
text('q52', 'so what killed the dinosaurs?', 'plate', 760, 200, L(52, .4), L(53, .2), size=44, col=CREAM, light=True)
art('imp53', 'ImpactRings', L(53), None, [K(L(53, 2.6), .4, 'out', flash=1), K(L(53, 3.0), 1.4, 'soft', flash=0), K(L(53, 2.8), 1.6, 'out', ring=.5), K(L(53, 4.4), 2.6, 'soft', ring=1),
    K(L(53, 3.4), 1.8, 'soft', plume=.5), K(L(53, 5.2), 2.0, 'soft', plume=.9)] + gone2(L(54, .3), 'at', .9, [960, 640]), enter='wipe', eo='down', x=960, y=640, flash=0, ring=0, plume=0, dark=0, z=6, xs='at')
art('ast53', 'Asteroid', L(53, .2), None, [K(L(53, .2), 2.4, 'in', fx_x=0, fx_y=0, glow=1, trail=.5)] + gone2(L(53, 2.6), 'fade', .2), ink=False, draw=1, x=960, y=640, r=60, rot=0, glow=0, trail=0, tx=-1, ty=-.6, fx_x=1400, fx_y=-900, z=10, xs='fade')
text('f53', '66 million years ago', 'figure', 960, 180, L(53, 3.8), L(54, .2), size=80, col=CREAM)
sfx(53, .2, FX + 'transition_riser_2s_2.wav', -26); sfx(53, 2.6, FX + 'impact_bass_drop_2.wav', -18)
art('yc54', 'YucatanCoast', L(54), None, [K(L(54, .6), 2.0, 'soft', ring=1), K(L(54, 3.0), 2.0, 'soft', night=.4)] + gone2(L(55, .3), 'at', .9, [960, 400]), enter='focus', x=960, y=420, s=1, ring=0, night=0, z=10, xs='at')
text('f54', 'about 180 km wide', 'figure', 960, 940, L(54, 1.8), L(55, .2), size=74, col=VERM)
# L55 — the plume spreads round the globe and settles: the thin dark line along every cliff (the band of L14)
art('wo55', 'WorldOutcrops', L(55), None, [K(L(55, .6), 2.4, 'soft', dust=1), K(L(55, 3.4), 2.0, 'soft', dust=.3, band=1), K(L(55, 5.8), 2.0, 'soft', line=1)] + gone2(L(56, .3), 'down', .9),
    inkdur=1.0, x=960, y=560, line=0, pins=0, dust=0, band=0, pop=5, z=12, xs='down')
text('l55', 'the dust became the thin clay layer', 'note', 960, 160, L(55, 4.0), L(56, .2), size=46, col=VERM)
# L56–L57 — darkness: the sun dims; the food chain snaps link by link; one link stays
art('fc56', 'FoodChain', L(56), None, [K(L(56, 1.0), 2.0, 'soft', dim=1), K(L(56, 3.4), 1.0, 'in', snap=.35), K(L(56, 4.6), 1.0, 'in', snap=.7), K(L(56, 5.8), 1.2, 'in', snap=1),
    K(L(57), .8, 'soft', keep=1)] + gone2(L(58, .1), 'collapse', .8, [360, 460]), inkdur=1.2, x=960, y=460, dim=0, snap=0, keep=0, z=12, xs='collapse')
for j, (x, lab) in enumerate(((360, 'sunlight'), (760, 'plants'), (1160, 'plant-eaters'), (1560, 'meat-eaters'))):
    text(f'l56{j}', lab, 'label', x, 680, L(56, .3 + j * .5), L(56, 3.4 + j * .4), size=30)
dark('dk56', L(56, 1.0), L(58, .1), k=.6, d=2.0, z=2, col='#2B1D12', style='up')
spot('sp57', [360, 460], 230, L(57), L(58, .1), dark=.55)
sfx(56, 3.4, FX + 'clang_metal_1.wav', -26); sfx(56, 5.8, FX + 'clang_metal_2.wav', -26)
# ---------------------------------------------------------------- WHAT IT MEANS
art('bu58', 'Burrow', L(58), None, [K(L(58), dur(58) + 1, 'linear', tm=dur(58) + 1), K(L(58, 1.0), 1.6, 'soft', peek=1), K(L(58, 1.6), 3.0, 'linear', ash=.8), K(L(58, 3.4), .6, eye=.3), K(L(58, 4.0), .6, eye=1)]
    + gone2(L(59, .2), 'tearout', .8), enter='iris', eo=[360, 460], x=960, y=520, s=2, ash=0, peek=0, eye=1, tm=0, z=10, xs='tearout')
text('l58', 'our distant ancestors', 'note', 1400, 860, L(58, 2.4), L(59, .2), size=46, col=CREAM, light=True)
art('mus59', 'MuseumSkeleton', L(59), None, [K(L(59), 2.0, 'soft', dawn=.4)] + gone2(L(60, .4), 'right', .9), ink=False, draw=1, moon=.6, dawn=0, **MUS, z=8, enter='scale', eo=[1394, 380], xs='right')
art('sp59', 'Sparrow', L(59, .3), None, [K(L(59, .3), 1.6, 'out', fx_y=0, fx_x=0), K(L(59, 1.2), .3, wing=.2), K(L(59, 1.5), .3, wing=.9), K(L(59, 1.9), .4, 'soft', wing=0, hop=1),
    K(L(60), 1.4, 'inOut', x=960, y=760, s=3.4), K(L(60, 1.6), .5, 'soft', head=.6), K(L(60, 2.2), .3, sing=1), K(L(60, 2.6), .3, sing=0), K(L(60, 3.0), .3, sing=1), K(L(60, 3.4), .3, sing=0),
    K(L(60, 4.0), .5, 'soft', head=-.3), K(L(59, .3), dur(59) + dur(60), 'linear', tm=dur(59) + dur(60))] + gone2(L(61, .2), 'fade', .6),
    ink=False, draw=1, x=1500, y=362, s=.9, wing=1, sing=0, head=0, hop=0, tm=0, fx_y=-500, fx_x=300, z=20, xs='fade')
text('n60', 'a living dinosaur', 'note', 1380, 400, L(60, 1.8), L(61, .2), size=60, col=VERM)
sfx(60, 2.2, FX + 'amb_forest_dawn_1.wav', -28)
art('rel61', 'ClueRelics', L(61), None, [K(L(61, .4), .5, 'out', n=1), K(L(61, 1.4), .5, 'out', n=2), K(L(61, 2.4), .5, 'out', n=3), K(L(61, 3.4), .5, 'out', n=4), K(L(61, 6.0), 1.6, 'soft', glow=1)]
    + gone2(L(62, .3), 'collapse', .9, [960, 800]), enter='scale', eo=[960, 800], x=960, y=860, s=1.0, n=0, glow=0, z=14, xs='collapse')
shape('ln61', "M420 790 L800 790 L1130 790 L1460 790", L(61, 4.2), L(62, .2), dur=2.0, col=VERM, sw=5, z=20)
lamp('lp61', [960, 600], L(61), L(62, .4), r=900, dark=.4, warm=.7)
art('st62', 'AlvarezStudy', L(62), None, gone2(L(63, .4), 'lift', .8), enter='bleed', x=960, y=540, s=1, lamp=1, z=6, xs='lift')
person('wal62', 'Walter Alvarez', L(62, .3), None, [K(L(62, 2.4), 1.0, 'soft', pk=1), K(L(62, 3.6), .01, holds='phial'), K(L(62, 4.2), 1.0, 'soft', expr='smile', ek=.8)] + gone2(L(63, .4), 'fade', .8),
       x=760, y=1010, h=500, facing=1, pose='stand', pose2='reach', pk=0, holds='none', expr='focus', ek=.5, look=[1, 0], **WALT, z=14)
person('lui62', 'Luis Alvarez', L(62, .3), None, [K(L(62, 1.2), 1.0, 'soft', pk=1), K(L(62, 3.6), .01, holds='none'), K(L(62, 4.0), 1.0, 'soft', pk=0, expr='smile', ek=.8)] + gone2(L(63, .4), 'fade', .8),
       x=1180, y=1010, h=500, facing=-1, pose='stand', pose2='reach', pk=0, holds='phial', expr='focus', ek=.5, look=[-1, 0], **LUIS, z=14)
text('q62', 'how long did one thin layer of clay take?', 'note', 960, 200, L(62, 1.6), L(63, .2), size=46, col=CREAM, light=True)
lamp('lp62', [960, 640], L(62), L(63, .6), r=760, dark=.5, warm=.75)
art('mus63', 'MuseumSkeleton', L(63), None, [K(L(63, .2), dur(63), 'linear', dawn=1, moon=0)], enter='focus', moon=.4, dawn=.2, **MUS, z=8)
art('sp63', 'Sparrow', L(63, .4), None, [K(L(63, 1.8), .3, wing=1), K(L(63, 2.1), .3, wing=.3), K(L(63, 2.4), .3, wing=1), K(L(63, 2.7), .3, wing=.3), K(L(63, 3.0), .3, wing=1),
    K(L(63, 2.0), dur(63) - 2.0, 'in', fx_x=-820, fx_y=-260, s=.5), K(L(63, .4), dur(63), 'linear', tm=dur(63))], ink=False, draw=1, x=1500, y=362, s=.9, wing=0, sing=0, tm=0, fx_x=0, fx_y=0, enter='bleed', z=20)
shaft('sf63', [340, 160], [1200, 900], L(63, .6), None, w0=240, w1=640, n=4, k=.7)
ent('end', 'art', {'name': 'EndCard', 'k': 0, 'a': 0, 'ask': 'What will the rocks remember of us?', 'next': 'Fathom', 'lock': 1}, [K('L63$+0.3', .01, a=1), K('L63$+0.3', 2.6, 'linear', k=1)], z=95)
sfx(63, .6, FX + 'amb_forest_dawn_2.wav', -28)

# ======================================================================== SECOND ACTIONS — every line keeps happening to its end (event_check)
def Lf(i, f): return L(i, round(f * dur(i) / _ratio(i), 2))
def B(id, i, *beats): G(id)['keys'] += [K(Lf(i, f), d, e, **p) for f, d, e, p in beats]
def FL(id, i, f, x, y, r=40): ent(id, 'flash', {'at': [[Lf(i, f), x, y, r]], 'col': '#FFFDF4', 'glow': '#F7E3A0', 'life': 1.4}, [], z=70)
# split long moves into strides so each step reads (and counts)
G('rex0')['keys'] = [k for k in G('rex0')['keys'] if not ('walk' in k and k.get('dur', 0) > 3)]
B('rex0', 0, (0, 1.6, 'linear', {'x': 520, 'walk': 1.0}), (.22, 1.6, 'linear', {'x': 1180, 'walk': 2.0}), (.8, .7, 'soft', {'head': .85}), (.92, .5, 'soft', {'eye': .2}), (.97, .4, 'soft', {'eye': 1}))
B('rex0', 1, (.5, .4, 'soft', {'eye': .1}), (.56, .4, 'soft', {'eye': 1}), (.85, .8, 'soft', {'jaw': .35}))
B('dusk0', 1, (.62, .8, 'out', {'point': 1.3}), (.8, .6, 'soft', {'point': 1.15}), (.92, .5, 'out', {'point': 1.5}))
B('mus3', 3, (.75, .8, 'soft', {'head': .15}), (.92, .7, 'soft', {'head': 0}))
G('mus3')['keys'] = [k for k in G('mus3')['keys'] if not ('build' in k and k.get('dur', 0) > 3)]
B('mus3', 3, (0, 1.8, 'soft', {'build': .55}), (.27, 1.8, 'soft', {'build': 1}))
B('mus3', 4, (.45, 1.0, 'soft', {'moon': .7}), (.62, 1.0, 'soft', {'moon': 1}), (.8, .8, 'soft', {'head': .35}), (.95, .6, 'soft', {'head': .25}))

B('rel5', 5, (.72, .8, 'soft', {'glow': .4}), (.86, .8, 'soft', {'glow': 1}), (.97, .5, 'soft', {'glow': .6}))
B('th6', 6, (.8, .7, 'soft', {'erupt': .6}), (.92, .6, 'out', {'erupt': 1}))
G('th6')['keys'] = [k for k in G('th6')['keys'] if 'rip' not in k]
B('th6', 7, (.34, 1.0, 'in', {'rip': 1}), (.5, 1.0, 'in', {'rip': 2}), (.66, 1.0, 'in', {'rip': 3}))
G('haw6')['keys'] = [k for k in G('haw6')['keys'] if not ('lift' in k)]
B('haw6', 7, (.84, 1.0, 'soft', {'lift': 40, 'a': 0}))
B('pw8', 8, (.66, .8, 'soft', {'swing': -8, 'hands': 1}), (.78, .8, 'in', {'spin': 4.6}), (.9, .7, 'soft', {'swing': 4}))
B('wal10', 10, (.76, .5, 'hand', {'pk': .3}), (.84, .5, 'hand', {'pk': 1}), (.95, .6, 'soft', {'expr': 'surprise', 'ek': .7}))
B('gub10', 10, (.9, .8, 'soft', {'red': .9}))
B('rb11', 11, (.45, .6, 'soft', {'page': .12}), (.56, .6, 'soft', {'page': 0}), (.75, .8, 'soft', {'red': .7}), (.9, .6, 'soft', {'red': .35}))
G('qh12')['keys'] = [G('qh12')['keys'][0]] + [K(Lf(12, .08 + j * .14), .9, 'soft', at={'screen': q}) for j, q in enumerate([[700, 800], [705, 720], [700, 640], [710, 560], [700, 470], [705, 390]])] + [K(Lf(13, .1), .4, a=0)]
for j, f in enumerate((.2, .4, .55, .7, .85)): B('for13', 13, (f, .7, 'soft', {'turn': (j + 1) * .8}))
B('rb11', 14, (.7, .5, 'soft', {'red': .6}), (.8, .5, 'soft', {'red': 1}), (.92, .5, 'soft', {'red': .7}))
G('for15')['keys'] = [k for k in G('for15')['keys'] if 'blink' not in k]
B('for15', 15, (.2, 1.2, 'soft', {'blink': .4}), (.4, 1.2, 'soft', {'blink': .7}), (.6, 1.2, 'soft', {'blink': .9}), (.8, 1.0, 'soft', {'blink': .98}))
B('fin16', 16, (.78, .7, 'soft', {'glow': .3}), (.88, .7, 'soft', {'glow': 1}), (.97, .5, 'soft', {'glow': .5}))
G('hg17')['keys'] = [k for k in G('hg17')['keys'] if not ('flow' in k and k.get('dur', 0) > 3)]
B('hg17', 17, (.5, 1.0, 'soft', {'flow': .25}), (.66, 1.0, 'soft', {'flow': .45}), (.82, 1.0, 'soft', {'flow': .6}), (.95, .6, 'soft', {'flow': .7}))
B('lui19', 19, (.84, .9, 'soft', {'pose2': 'explain', 'pk': 1}), (.95, .6, 'soft', {'look': [-1, 0]}))
B('wal19', 19, (.9, .7, 'soft', {'expr': 'surprise', 'ek': .7}))

G('hg21')['keys'] = [k for k in G('hg21')['keys'] if 'gauge' not in k]
for j, f in enumerate((.12, .26, .4, .54, .68, .82, .94)): B('hg21', 21, (f, .9, 'soft', {'gauge': .1 + j * .13}))
G('im22')['keys'] = [k for k in G('im22')['keys'] if 'roof' not in k]
B('im22', 22, (.62, .6, 'soft', {'v': .3}), (.8, .6, 'soft', {'v': .2}), (.95, .5, 'soft', {'v': .35}))
B('im22', 23, (.62, .4, 'out', {'v': 1.2}), (.72, .4, 'in', {'v': 1.28}), (.84, .4, 'out', {'v': 1.18}), (.94, .4, 'in', {'v': 1.3}))
B('im22', 24, (.05, 1.4, 'in', {'roof': .45}), (.32, 1.4, 'in', {'roof': 1}))
FL('fl24', 24, .8, 1060, 120, 30)
B('ds25', 25, (.62, .8, 'in', {'tick': 84}), (.82, .8, 'in', {'tick': 108}))
G('met26')['keys'] = [k for k in G('met26')['keys'] if 'cut' not in k]
B('met26', 26, (.06, 1.3, 'linear', {'cut': .5}), (.3, 1.3, 'linear', {'cut': 1}))

B('ast27', 27, (.72, .8, 'soft', {'glow': .4}), (.86, .8, 'soft', {'glow': 1, 'trail': .5}))
G('ev28')['keys'] = [k for k in G('ev28')['keys'] if 'shade' not in k]
B('ev28', 28, (.42, 1.2, 'soft', {'shade': .45}), (.65, 1.2, 'soft', {'shade': .8}), (.88, .8, 'soft', {'shade': 1}))
G('wo30')['keys'] = [k for k in G('wo30')['keys'] if 'pop' not in k and 'pins' not in k]
for j, f in enumerate((.12, .27, .42, .57, .72)): B('wo30', 30, (f, .6, 'out', {'pop': j + 1}))
for j, f in enumerate((.25, .45, .65, .85)): B('wo30', 31, (f, .6, 'out', {'pins': (j + 1) / 4}))
G('q30')['keys'] = [k if k['t'] != L(30, 1.0) else k for k in G('q30')['keys']]
B('sg32', 32, (.82, .7, 'soft', {'heat': .12}), (.95, .5, 'soft', {'heat': 0}))
B('sg32', 33, (.72, .6, 'soft', {'heat': .7}), (.86, .6, 'soft', {'heat': 1}))
FL('fl34', 34, .62, 920, 540, 80); ripple('rp34', [920, 540], Lf(34, .8), r=360, n=3, col='#8C3424')
G('gl37')['keys'] = [k for k in G('gl37')['keys'] if not ('look' in k and k.get('dur', 0) > 3)]
for j, f in enumerate((.04, .22, .4, .58, .76)): B('gl37', 37, (f, 2.4, 'inOut', {'look': (j + 1) / 5, 'spin': (j + 1) * .12}))
B('rs38', 38, (.6, .6, 'soft', {'dust': .2}), (.82, .7, 'soft', {'pull': .7}), (.95, .4, 'soft', {'pull': 1}))
G('pl39')['keys'] = [k for k in G('pl39')['keys'] if not ('fx_x' in k and k.get('dur', 0) > 3)]
B('pl39', 39, (.05, 2.6, 'inOut', {'fx_x': 600}), (.23, 2.6, 'inOut', {'fx_x': 1300}), (.42, 1.4, 'soft', {'fx_x': 1500}), (.62, 2.6, 'inOut', {'fx_x': 900, 'y': 700}), (.8, 2.6, 'inOut', {'fx_x': 250, 'y': 760}))
B('pl39', 40, (.42, 2.4, 'inOut', {'fx_x': 800, 'y': 600}), (.75, 2.0, 'inOut', {'fx_x': 1300, 'y': 560}))
G('yc39')['keys'] = [k for k in G('yc39')['keys'] if 'ring' not in k]
for j, f in enumerate((.2, .38, .56, .74, .9)): B('yc39', 40, (f, .9, 'soft', {'ring': .12 * (j + 1)}))
G('sr41')['keys'] = [k for k in G('sr41')['keys'] if not ('pas' in k and k.get('dur', 0) > 3)]
B('sr41', 41, (.05, 1.6, 'linear', {'pas': .35}), (.35, 1.6, 'linear', {'pas': .7}), (.65, 1.6, 'linear', {'pas': 1}))
B('sr41', 42, (.8, .8, 'soft', {'scale': 1}))
G('rs44')['keys'] = [k for k in G('rs44')['keys'] if not (('day' in k or 'dust' in k) and k.get('dur', 0) > 3)]
for j, f in enumerate((.0, .22, .44, .66, .86)): B('rs44', 44, (f, 1.2, 'linear', {'day': j + 1, 'dust': (j + 1) / 5}))
B('hil45', 45, (.74, .8, 'soft', {'expr': 'awe', 'ek': .9}), (.9, .7, 'soft', {'pose2': 'present', 'pk': 1}))
mark('mk46', 'circle', [880, 590, 180, 80], Lf(46, .62), Lf(47, .05), w=4)
B('dc46', 46, (.3, .8, 'soft', {'roll': .4}), (.45, .8, 'soft', {'roll': 1}), (.8, .7, 'soft', {'roll': .85}), (.93, .5, 'soft', {'roll': 1}))
B('sg47', 47, (.75, .6, 'soft', {'heat': .5}), (.9, .6, 'soft', {'heat': 0}))
mark('mk48', 'underline', [760, 420, 400, 20], Lf(48, .72), Lf(49, .05), w=5)
ripple('rp48', [960, 382], Lf(48, .5), r=240, n=2, col='#22507A')
G('yc49')['keys'] = [k for k in G('yc49')['keys'] if not ('s' in k and k.get('dur', 0) > 3)]
B('yc49', 49, (0, 1.6, 'out', {'s': 1.0}), (.22, 1.6, 'out', {'s': .62, 'ring': 1}))
mark('mk49', 'circle', [930, 400, 60, 50], Lf(49, .8), Lf(50, .05), w=4)
B('rs50', 50, (.72, .7, 'soft', {'lift': .6}), (.86, .7, 'soft', {'lift': 1}))
FL('fl50', 50, .95, 960, 460, 60)
B('rs50', 51, (.4, .8, 'soft', {'pull': 0}), (.62, 1.0, 'soft', {'dust': .8}), (.85, .6, 'soft', {'lamp': .3}))
B('imp53', 53, (.75, .8, 'soft', {'plume': 1}), (.9, .6, 'soft', {'ring': .9}))
mark('mk54', 'circle', [760, 300, 400, 330], Lf(54, .6), Lf(55, .05), w=5)
B('yc54', 54, (.85, .6, 'soft', {'ring': .7}), (.95, .4, 'soft', {'ring': 1}))
G('wo55')['keys'] = [k for k in G('wo55')['keys'] if 'line' not in k]
B('wo55', 55, (.6, 1.0, 'soft', {'line': .5}), (.75, 1.0, 'soft', {'line': 1}), (.9, .8, 'soft', {'pins': 1}))
B('fc56', 56, (.82, .5, 'soft', {'dim': .8}), (.9, .5, 'soft', {'dim': 1}))
B('bu58', 58, (.72, .4, 'soft', {'eye': .2}), (.78, .4, 'soft', {'eye': 1}), (.9, .6, 'soft', {'peek': .7}))
B('sp59', 59, (.55, .3, 'soft', {'wing': .6}), (.68, .3, 'soft', {'wing': 0}), (.85, .5, 'soft', {'head': .4}))
B('mus59', 59, (.7, .9, 'soft', {'dawn': .6}))

G('c2')['keys'] = [K(Lf(2, .62), .01, a=1), K(Lf(2, .62), .8, 'soft', blur=0)] + [K(Lf(2, .66 + j * .12), .5, 'out', num=j + 1) for j in range(3)] + [K(L(3, .6), 1.0, 'soft', blur=10, a=0)]

B('for15', 15, (.9, .7, 'soft', {'blink': 1}))
B('wo30', 30, (.86, .7, 'soft', {'pins': .2}), (.97, .5, 'soft', {'pins': 0}))

B('gl37', 37, (.86, .8, 'soft', {'q': .8}), (.95, .6, 'soft', {'q': 1}))
B('pl39', 39, (.5, .6, 'soft', {'rot': 6}), (.56, .6, 'soft', {'rot': 0}), (.88, .6, 'soft', {'rot': -5}), (.96, .5, 'soft', {'rot': 0}))

B('sr41', 41, (.82, .6, 'soft', {'scale': .5}), (.95, .4, 'soft', {'scale': 0}))

B('vs48', 48, (.8, .6, 'soft', {'sun': .6}), (.95, .5, 'soft', {'sun': 1}))
B('sr49', 49, (.55, .8, 'soft', {'whole': .7}), (.68, .8, 'soft', {'whole': 1}))

B('rs50', 50, (.5, .6, 'soft', {'lamp': .6}), (.6, .6, 'soft', {'lamp': 1}))

B('sp59', 60, (.75, .3, 'soft', {'sing': 1}), (.82, .3, 'soft', {'sing': 0}), (.9, .4, 'soft', {'head': .3}), (.97, .3, 'soft', {'wing': .3}))
B('rel61', 61, (.6, .6, 'soft', {'glow': .5}), (.72, .8, 'soft', {'glow': 1}), (.86, .6, 'soft', {'glow': .6}), (.96, .4, 'soft', {'glow': 1}))

B('lui62', 62, (.5, .6, 'soft', {'pose2': 'explain', 'pk': 1}), (.72, .8, 'soft', {'look': [-1, -.3]}), (.9, .6, 'soft', {'expr': 'awe', 'ek': .6}))
B('wal62', 62, (.62, .6, 'soft', {'pose2': 'hold', 'pk': 1}), (.82, .8, 'soft', {'look': [.2, -.4]}))
B('sp63', 63, (.45, .3, 'soft', {'wing': .3}), (.5, .3, 'soft', {'wing': 1}), (.6, .3, 'soft', {'wing': .3}), (.66, .3, 'soft', {'wing': 1}), (.76, .3, 'soft', {'wing': .3}), (.82, .3, 'soft', {'wing': 1}), (.92, .3, 'soft', {'wing': .3}))
G('sp63')['keys'] = [k for k in G('sp63')['keys'] if not ('fx_x' in k and k.get('dur', 0) > 3)]
B('sp63', 63, (.25, 2.2, 'in', {'fx_x': -380, 'fx_y': -20, 's': .8}), (.55, 2.2, 'linear', {'fx_x': -780, 'fx_y': -50, 's': .65}), (.83, 1.4, 'linear', {'fx_x': -1120, 'fx_y': -70, 's': .45}))
B('mus63', 63, (.35, .8, 'soft', {'head': .3}), (.7, .8, 'soft', {'head': .5}))

trail('met20a', [[300, 120], [520, 300]], Lf(20, .5), .7, Lf(20, .7), col='#F7E3A0', w=3, r=4)
trail('met20b', [[1500, 90], [1300, 260]], Lf(20, .78), .7, Lf(21, .1), col='#F7E3A0', w=3, r=4)
B('met26', 26, (.76, .7, 'soft', {'fx_r': 5}), (.9, .6, 'soft', {'fx_r': 0}))
G('wo35')['keys'] = [k for k in G('wo35')['keys'] if 'pins' not in k]
for j, f in enumerate((.1, .3, .5, .7, .88)): B('wo35', 35, (f, .5, 'out', {'pins': (j + 1) / 5}))
# ======================================================================== THE CAMERA — one NAMED move per line (event_check grammar), chosen by meaning
MOVE = {0: ('crane-down', (1100, 560), 'wide'), 1: ('rack', (1340, 300), 'close'), 2: ('whip', (900, 470), 'wide'), 3: ('pull', (1060, 520), 'medium'), 4: ('push', (1394, 380), 'close'),
 5: ('lock', (960, 760), 'medium'), 6: ('tilt-down', (960, 540), 'wide'), 7: ('pan-r', (1100, 540), 'medium'), 8: ('arc', (960, 480), 'medium'), 9: ('snap-zoom', (960, 560), 'medium'),
 10: ('track', (500, 640), 'wide'), 11: ('crane-up', (960, 560), 'medium'), 12: ('tilt-up', (760, 600), 'medium'), 13: ('dive', (960, 540), 'medium'), 14: ('push', (1100, 520), 'medium'),
 15: ('pan-l', (1200, 560), 'medium'), 16: ('handheld', (980, 520), 'close'), 17: ('lock', (960, 560), 'medium'), 18: ('snap-zoom', (960, 560), 'medium'), 19: ('dolly', (900, 640), 'medium'),
 20: ('pull', (960, 300), 'medium'), 21: ('tilt-down', (1100, 560), 'medium'), 22: ('push', (960, 560), 'medium'), 23: ('dutch', (960, 480), 'close'), 24: ('tilt-up', (1000, 300), 'medium'),
 25: ('lock', (960, 500), 'medium'), 26: ('arc', (960, 520), 'medium'), 27: ('pull', (960, 520), 'medium'), 28: ('pan-r', (1000, 540), 'wide'), 29: ('rack', (960, 560), 'medium'),
 30: ('whip', (960, 520), 'wide'), 31: ('arc', (960, 480), 'wide'), 32: ('push', (960, 540), 'medium'), 33: ('handheld', (960, 540), 'close'), 34: ('snap-zoom', (940, 540), 'medium'),
 35: ('crane-up', (960, 420), 'wide'), 36: ('pan-l', (960, 560), 'wide'), 37: ('orbit', (960, 520), 'medium'), 38: ('push', (1000, 520), 'medium'), 39: ('track', (960, 560), 'wide'),
 40: ('crane-down', (960, 480), 'wide'), 41: ('lock', (960, 600), 'medium'), 42: ('pull', (960, 520), 'medium'), 43: ('pan-r', (960, 560), 'wide'), 44: ('lock', (960, 540), 'medium'),
 45: ('track', (600, 600), 'medium'), 46: ('dolly', (960, 560), 'medium'), 47: ('push', (960, 540), 'medium'), 48: ('tilt-down', (960, 440), 'medium'), 49: ('crane-up', (960, 420), 'wide'),
 50: ('push', (1100, 520), 'medium'), 51: ('pull', (960, 520), 'close'), 52: ('arc', (1300, 420), 'medium'), 53: ('whip', (960, 600), 'wide'), 54: ('crane-down', (960, 480), 'wide'),
 55: ('orbit', (960, 520), 'wide'), 56: ('tilt-down', (960, 500), 'medium'), 57: ('push', (360, 460), 'close'), 58: ('dolly', (1050, 620), 'medium'), 59: ('lock', (1300, 420), 'medium'),
 60: ('rack', (960, 700), 'close'), 61: ('pan-l', (960, 760), 'medium'), 62: ('dolly', (960, 640), 'medium'), 63: ('crane-up', (1100, 420), 'medium')}
SOFT = {'wide': 1.08, 'medium': 1.14, 'close': 1.28, 'insert': 1.4, 'detail': 1.55}
def S_(size, at, z=1.0, dx=0, dy=0, **x): return {**shot(size, at=(at[0] + dx, at[1] + dy), z=SOFT[size] * z), **x}
def move(i, kind, at, size):
    d = dur(i); a = lambda o: L(i, o)
    base = lambda **x: K(a(0), 1.0, 'soft', **S_(size, at, **x))
    if kind == 'push': return [K(a(0), 1.0, 'soft', **S_(size, at, .92, roll=0)), K(a(1.0), d - .8, 'inOut', **S_(size, at, 1.25))]
    if kind == 'pull': return [K(a(0), .8, 'soft', **S_(size, at, 1.5, roll=0)), K(a(.8), d - .6, 'out', **S_(size, at, .95))]
    if kind in ('pan-r', 'pan-l'): s = 1 if kind == 'pan-r' else -1; return [K(a(0), 1.0, 'soft', **S_(size, at, dx=-90 * s, roll=0)), K(a(1.0), d - .8, 'inOut', **S_(size, at, dx=90 * s))]
    if kind in ('tilt-up', 'tilt-down'): s = -1 if kind == 'tilt-up' else 1; return [K(a(0), 1.0, 'soft', **S_(size, at, dy=-110 * s, roll=0)), K(a(1.0), d - .8, 'inOut', **S_(size, at, dy=110 * s))]
    if kind in ('crane-down', 'crane-up'): s = 1 if kind == 'crane-down' else -1; return [K(a(0), .9, 'soft', **S_(size, at, 1.2, dy=-220 * s, roll=0)), K(a(.9), d - .6, 'inOut', **S_(size, at, 1.0))]
    if kind == 'arc': return [K(a(0), 1.0, 'soft', **S_(size, at, 1.04, dx=-80, dy=40, roll=-3)), K(a(1.0), d - .8, 'inOut', **S_(size, at, 1.12, dx=80, dy=-30, roll=3))]
    if kind == 'orbit': return [K(a(0), 1.0, 'soft', **S_(size, at, 1.1, roll=-5)), K(a(1.0), d - .8, 'linear', **S_(size, at, 1.18, roll=5))]
    if kind == 'dutch': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0)), K(a(1.4), 1.0, 'out', **S_(size, at, 1.1, roll=7)), K(a(d - 1.4), 1.2, 'soft', **S_(size, at, 1.15, roll=0))]
    if kind == 'whip': return [K(a(0), .01, **S_(size, at, dx=520, roll=0)), K(a(.05), .75, 'out', **S_(size, at)), K(a(.8), d - .6, 'linear', **S_(size, at, 1.08))]
    if kind == 'snap-zoom': t0 = min(1.0, d * .45); return [K(a(0), .6, 'soft', **S_(size, at, roll=0)), K(a(t0), .5, 'out', **S_(size, at, 1.45)), K(a(t0 + .5), max(.5, d - t0), 'linear', **S_(size, at, 1.5))]
    if kind == 'track': fx = o_track.get(i, (-300, 300)); return [K(a(0), .8, 'soft', **S_(size, at, dx=fx[0], roll=0)), K(a(.8), d - .6, 'inOut', **S_(size, at, dx=fx[1]))]
    if kind == 'dolly': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0), dolly=0), K(a(1.0), d - .8, 'inOut', **S_(size, at, 1.12), dolly=.35), K(a(d), .8, 'soft', dolly=0)]
    if kind == 'rack': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0), **rack(.0, 5)), K(a(1.6), 1.4, 'soft', **rack(.4, 5)), K(a(1.6), d - 1.2, 'linear', **S_(size, at, 1.1)), K(a(d - .4), .8, 'soft', dof=0)]
    if kind == 'handheld': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0)), K(a(.4), .8, 'soft', **shake(.22)), K(a(1.0), d - .8, 'linear', **S_(size, at, 1.08)), K(a(d - .4), .6, 'soft', **shake(0))]
    if kind == 'dive': return [K(a(0), .8, 'soft', **S_(size, at, roll=0)), K(a(.8), 1.6, 'in', **S_(size, at, 2.2)), K(a(2.4), .9, 'out', **S_(size, at, 1.0)), K(a(3.3), d - 3.0, 'linear', **S_(size, at, 1.1))]
    if kind == 'lock': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0))]
    raise ValueError(kind)
o_track = {10: (-260, 40), 39: (-260, 260), 45: (-200, 80)}
cam = G('camera'); ck = []
for i in range(NL): ck += move(i, *MOVE[i])
ck += [K(L(23, 1.6), .6, 'out', **shake(.35)), K(L(23, 2.4), 1.0, 'soft', **shake(0))]          # the needle slams the stop
ck += [K(L(53, 2.6), .5, 'out', **shake(.6)), K(L(53, 3.6), 1.8, 'soft', **shake(0))]           # the impact
ck += [K(L(34, 1.8), .5, 'out', **shake(.3)), K(L(34, 2.6), 1.0, 'soft', **shake(0))]           # the grain shatters
ck += [K(L(5, -5.8), .8, 'soft', push=1, pan_x=0, pan_y=0, roll=0)]                            # the title sits in a level, centred frame
ck += grade_keys(E['lines'], K)
cam['keys'] = sorted(ck, key=lambda k: (int(re.match(r'L(\d+)', str(k['t'])).group(1)) if isinstance(k['t'], str) else -1))
ent('motes', 'particles', {'kind': 'dust', 'n': 16, 'k': 0, 'a': .5, 'speed': .5, 'para': .8}, [K(L(0), 3, k=1)], z=96)
E['camera_moves'] = [MOVE[i][0] for i in range(NL)]
HOW = {0: 'crane-in', 1: 'rack-focus', 2: 'burn', 3: 'assemble', 4: 'spot', 5: 'iris', 6: 'page-turn', 7: 'tear', 8: 'rise-from', 9: 'drop', 10: 'walk-in', 11: 'unfold',
 12: 'trace-to', 13: 'dive', 14: 'page-turn', 15: 'blink-out', 16: 'glide', 17: 'pour', 18: 'flip', 19: 'hand-over', 20: 'through', 21: 'pour', 22: 'slide-in', 23: 'count-up', 24: 'grow-out-of',
 25: 'time-lapse', 26: 'cut-open', 27: 'swell', 28: 'slide-in', 29: 'focus-pull', 30: 'whip', 31: 'thread', 32: 'iris', 33: 'heat', 34: 'shatter', 35: 'swarm', 36: 'brush', 37: 'search',
 38: 'tear', 39: 'fly-over', 40: 'x-ray', 41: 'trace-to', 42: 'merge', 43: 'empty-out', 44: 'time-lapse', 45: 'blow-away', 46: 'unroll', 47: 'iris', 48: 'drop', 49: 'scale-out',
 50: 'lift-off', 51: 'spot', 52: 'turn-head', 53: 'stream-through', 54: 'settle', 55: 'spread', 56: 'snap', 57: 'spot', 58: 'grow-out-of', 59: 'land-on', 60: 'rack-focus', 61: 'assemble',
 62: 'hand-over', 63: 'fly-out'}
for i, l in enumerate(E['lines']): l.setdefault('becomes', {})['how'] = HOW[i]

E['world'] = W
E['new_devices'] = ['RockBook', 'IridiumMeter', 'ShockedGrain', 'SurveyRing']
E['motif_art'] = ['ShockedGrain', 'ReportShelf']
mu = E.get('music') or {}
if isinstance(mu.get('swells'), list):
    mu['swells'] = [w for w in mu['swells'] if w[2] > 0] + [['L14+2', 'L14$', -10], ['L24', 'L24$', -10], ['L53+2.4', 'L53$', -14]]
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
