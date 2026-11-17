#!/usr/bin/env python3
"""star-distance — the story world (engine v7): every line's plan (lines.py: reads · focus · becomes · acts · shot · light) → entities keyed to
the narration. python3 episodes/star-distance/world.py → writes `world` (+ sfx, thumb) into episode.json. Drawings: src/lib/star-distance/.
Governing image: the parallax blink — one point that jumps against what lies behind it. Motif: the circle of the lens.
Treatment: jobs/scripts/star-distance_treatment.md · chain: jobs/scripts/star-distance_chain.md."""
import json, math, os, re, shutil, sys
H = os.path.dirname(os.path.abspath(__file__)); EP = os.path.join(H, 'episode.json'); E = json.load(open(EP))
sys.path.insert(0, os.path.join(H, '../../tools')); from v6 import shot, rack, shake, grade, grade_keys
E['engine'] = 6
ST = 'stock/_hwk/star-distance/'; PD = 'stock/_pd/star-distance/'
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
def art(id, name, t_in, t_out=None, keys=(), ink=True, inkdur=1.6, xs='ink', xdur=1.3, at=None, z=None, enter=None, **props):
    p = {'name': name, 'a': 0, **props}
    ks = [K(t_in, .01, a=1)]
    if ink: p.setdefault('draw', 0); ks.append(K(t_in, inkdur, 'out', draw=1))
    if enter == 'bleed': p['dissolve'] = 0; ks.append(K(t_in, 1.4, 'linear', dissolve=1, dissolveSeed=_seed[0]))
    if enter == 'focus': p['blur'] = 12; ks.append(K(t_in, 1.0, 'soft', blur=0))
    ks += list(keys)
    if t_out: ks += gone(t_out, xs, xdur, at)
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
FX = 'public/sfx/'; SK = 'public/stock/_hwk/star-distance/'
BESS = {'costume': 'bessel1838', 'face': {'nose': .55, 'brow': .5, 'chin': .45, 'age': .55, 'build': 1.0}, 'hairCol': '#8C857A', 'skin': .26}
LEAV = {'costume': 'leavitt1910', 'face': {'nose': .45, 'brow': .4, 'chin': .4, 'age': .35, 'build': .9}, 'hairCol': '#4A3220', 'skin': .24}
HARV = [{'costume': {'coat': .03, 'mat': m, 't': t, 'flare': .07, 'leg': m, 'legT': t, 'shoe': 'boot', 'neck': 'none', 'hat': 'none', 'hair': 'bun', 'sleeve': 1.15, 'vest': 'paper'}, 'face': {'nose': .4, 'brow': .35, 'chin': .35, 'age': .2, 'build': .85}, 'hairCol': c, 'skin': s} for c, s, m, t in (('#2A1E16', .25, 'paper', .18), ('#7A5A3A', .22, 'night', .72), ('#5A4632', .3, 'paper', .2), ('#3A2A1E', .27, 'wall', .7))]
HUBB = {'costume': 'hubble1923', 'face': {'nose': .5, 'brow': .55, 'chin': .55, 'age': .2, 'build': 1.15}, 'hairCol': '#3A2A1E', 'skin': .26}
SHAP = {'costume': 'shapley1920', 'face': {'nose': .45, 'brow': .45, 'chin': .35, 'age': .2, 'build': .95}, 'hairCol': '#2A1E16', 'skin': .25}
CURT = {'costume': 'curtis1920', 'beard': 'moustache', 'face': {'nose': .55, 'brow': .5, 'chin': .4, 'age': .45, 'build': 1.1}, 'hairCol': '#6A5A4A', 'skin': .27}
LEMA = {'costume': 'lemaitre1927', 'face': {'nose': .5, 'brow': .45, 'chin': .45, 'age': .25, 'build': 1.05}, 'hairCol': '#2A1E16', 'skin': .26}
KID = {'costume': 'child2026', 'face': {'nose': .3, 'brow': .25, 'chin': .25, 'age': 0, 'build': .7}, 'hairCol': '#5A3A22', 'skin': .3}
NL = len(E['lines'])

ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': .6, 'light': .4, **grade('mystery'), 'push': 1, 'pan_x': 0, 'pan_y': 0, 'dof': 0, 'focus': 0, 'shake': 0})
# ======================================================================== COLD — the narrated opening: the jumping thumb (set piece 1)
NWIN = dict(x=960, y=560, s=1)
art('win0', 'NightWindow', L(0), None, [K(L(0, .2), 2.2, 'soft', lamp=1), K(L(2, 4.4), 2.0, 'soft', night=1, stars=1), K(L(2, 3.0), 2.6, 'soft', glass=0)] + gone(L(3, .6), 'down', 1.6),
    inkdur=2.6, night=.85, stars=.25, lamp=0, moon=0, **NWIN, z=2)
lamp('lp0', [260, 360], L(0), L(3, .6), r=760, dark=.5, warm=.7)
motes('mo0', [80, 120, 600, 820], L(0, 1.0), L(3), n=30)
shaft('sf0', [1250, 90], [1150, 1080], L(0, .6), L(2, 4.0), w0=260, w1=520, n=3, k=.45)
TH = dict(x=1090, y=980, s=1.3)
art('thumb0', 'ThumbHand', L(0, 2.8), None, [K(L(0, 2.8), 1.6, 'weight', fx_y=0), K(L(1, 1.9), .75, 'hand', x=1020), K(L(1, 3.2), .75, 'hand', x=1160), K(L(2), 1.0, 'soft', x=1090),
    K(L(2, 3.0), 1.6, 'soft', nail=1), K(L(2, 3.6), 1.6, 'soft', a=0)], ink=False, draw=1, nail=0, fx_y=700, **TH, z=20)
shadow('sh0', 1240, 1080, 260, 30, L(0, 3.2), L(2, 3.6), k=.5)
art('eye1', 'BlinkEye', L(1), None, [K(L(1, 1.2), .75, 'hand', lidL=1), K(L(1, 2.6), .75, 'hand', lidL=0, lidR=1), K(L(2, 1.0), .75, lidR=0)] + gone(L(2, 2.6), 'ink', 1.0),
    inkdur=1.0, x=640, y=420, r=56, pair=1, gap=150, ring=1, lidL=0, lidR=0, look=[.2, .1], z=30)
shape('tk2a', "M942 660 L942 700", L(2), L(2, 5.8), dur=.8, col='#D2643E', sw=4, z=31)
shape('tk2b', "M1082 660 L1082 700", L(2, .3), L(2, 5.8), dur=.8, col='#D2643E', sw=4, z=31)
shape('arc2', "M942 650 Q1012 600 1082 650", L(2, 1.6), L(2, 5.8), dur=1.2, col='#B8862B', sw=3, z=31)
art('moon2', 'Moon', L(2, 3.4), None, [K(L(2, 3.4), 2.2, 'weight', x=1100, y=300, r=64), K(L(3), 6.0, 'soft', y=900)] + gone(L(3, 5.2), 'ink', 1.0), ink=False, x=1012, y=600, r=26, phase=1, enter='bleed', z=25)
sfx(1, 1.2, FX + 'blip_click_1.wav', -26); sfx(1, 2.6, FX + 'blip_click_2.wav', -26); sfx(0, .3, FX + 'real_electric_flicker_1.wav', -30)
# L3 — the rise past the Moon into a full night; the Swan ghosts over the stars
ent('sky3', 'art', {'name': 'Sky', 'kind': 'night', 'seed': 'sd3', 'a': 0}, [K(L(3, .3), 2.0, a=1)] + gone(L(4, 1.4), 'ink', 1.2), z=1)
ent('stars3', 'art', {'name': 'Stars', 'n': 320, 'h': 1080, 'seed': 'sd3', 'a': 0}, [K(L(3, 1.6), 1.6, a=1)] + gone(L(4, 1.4), 'ink', 1.2), z=3)
SWAN = "M960 210 L962 470 L966 820 M690 420 L962 470 L1240 560 M690 420 L600 380 M1240 560 L1320 610"
shape('swan3', SWAN, L(3, 3.2), L(4, .4), dur=1.6, col='#D9AE4C', sw=2.2, z=6)
for j, (sx, sy) in enumerate(((960, 210), (962, 470), (966, 820), (690, 420), (1240, 560), (600, 380), (1320, 610))):
    ent(f'sw3s{j}', 'flash', {'at': [[L(3, 3.4 + j * .15), sx, sy, 7]], 'col': '#FFF4D2', 'glow': '#F7E3A0', 'life': 2.6}, [], z=7)
text('n3', 'the Swan', 'note', 1360, 300, L(3, 3.6), L(4, .4), size=56, col='#F3E7CC', light=True)
# L4 — the stars shrink onto velvet: a collector's star cabinet
CAB = dict(x=960, y=560, s=1)
art('cab4', 'StarCabinet', L(4), None, [K(L(4), 1.8, 'weight', fx_s=1), K(L(4, 5.6), 2.4, 'linear', sheen=1), K(L(5), 1.4, dim=.6, one=1), K(L(5), 12, 'linear', ph=12), K(L(5, 4.8), 1.0, tremble=1),
    K(L(6), 1.2, dim=.92), K(L(7), 1.2, dim=.6), K(L(7, 1.4), 1.6, 'in', fx_s=.02)] + gone(L(7, 2.6), 'ink', .6, at=[960, 441]),
    inkdur=2.0, sheen=0, dim=0, one=0, tremble=0, ph=0, fx_s=2.4, fx_ox=960, fx_oy=441, **CAB, z=10)
lamp('lp4', [380, 980], L(4, .6), L(7, 2.4), r=900, dark=.45, warm=.65)
shadow('sh4', 960, 1000, 700, 30, L(4, 1.6), L(7, 1.6), k=.6)
# L5 — the light narrows to one star; its label stays blank
spot('sp5', [960, 450], 230, L(5), L(6, .2), dark=.42)
text('q5', '? miles', 'note', 960, 512, L(5, 3.2), L(6, .2), size=40, col='#2B1D12')
text('n5', 'stellae fixae', 'note', 600, 210, L(5, 6.4), L(6, .4), size=50, col='#F3E7CC', light=True)
sfx(5, 4.8, FX + 'dial_tick_1.wav', -26)
# L6 — three cabinet cards slide out of the case: Bessel, Leavitt, Hubble (real portraits)
for j, (src, cap, x, w, h, t0) in enumerate(((ST + 'P-05_bessel-portrait-herterich-1825-pd.png', 'Friedrich Bessel', 560, 280, 361, 1.2), (ST + 'P-02_henrietta-leavitt-portrait-pd.jpg', 'Henrietta Leavitt', 960, 280, 372, 2.8),
                                             (ST + 'P-04-x1_hubble-at-eyepiece-1922-pd.jpg', 'Edwin Hubble', 1360, 280, 375, 4.4))):
    art(f'card6{j}', 'CabinetCard', L(6, t0), None, [K(L(6, t0), 1.4, 'glide', fx_y=0), K(L(7), 1.2, 'inOut', fx_y=-60)] + gone(L(7, .6), 'up', 1.0), ink=False, src=src, x=x, y=520, w=w, h=h, rot=(-3, 1, 3)[j],
        caption=cap, draw=1, fx_y=90, enter='bleed', z=30)
sheen('she6', [400, 300, 1120, 460], L(6, 7.4))
# L7 — the case gathers to a point; the title
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'How far away\nare the stars?', 'sub': 'a story in four clues', 'a': 0},
    [K(L(8, -5.8), .01, a=1), K(L(8, -5.8), 4.4, 'linear', k=1), K(L(8, -.9), 1.4, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(L(8, .6), .01, a=0)], z=90)
dark('night7', L(7, 1.8), L(8, 1.6), k=.9, d=1.4, z=5, col='#0B1030')
# ======================================================================== THE STAKES
art('sf8', 'ScopeField', L(8), None, [K(L(8), 1.4, 'in', iris=1), K(L(8, 2.4), 1.0, 'soft', mag=1.7), K(L(8, 3.6), 1.0, 'soft', mag=2.6), K(L(8, 4.6), 1.0, cross=1)] + gone(L(9, .2), 'ink', 1.0, at=[960, 540]),
    ink=False, draw=1, x=960, y=540, r=400, mag=1, cross=0, iris=0, irisAt=[960, 540], z=20)
dark('night8', L(8), L(9, .4), k=.85, z=4, col='#0B1030')
text('l8', 'still a point', 'label', 1300, 330, L(8, 3.8), L(9), to=[975, 530], size=40, col='#F3E7CC', light=True)
art('cl9', 'CandleAndLighthouse', L(9), None, [K(L(9, 4.2), 1.8, 'inOut', shrink=1), K(L(10), 1.4, 'inOut', a=1)] + gone(L(10, 1.5), 'ink', .8, at=[960, 540]), ink=True, inkdur=1.4, x=960, y=540, gap=1, shrink=0, z=20)
text('l9a', 'near', 'plate', 520, 920, L(9, 1.6), L(9, 4.4), size=38); text('l9b', 'far', 'plate', 1400, 920, L(9, 3.0), L(9, 4.4), size=38)
art('eyes10', 'BlinkEye', L(10, 1.4), None, [K(L(10, 4.4), 1.0, 'soft', look=[0, -.7]), K(L(10, 5.8), .75, lidL=1, lidR=1), K(L(10, 6.6), .75, lidL=0, lidR=0),
    K(L(11, 1.0), .75, lidL=1), K(L(11, 1.8), .75, lidL=0, lidR=1), K(L(12), .75, lidR=0)], inkdur=1.6, x=960, y=540, r=120, pair=1, gap=360, lidL=0, lidR=0, look=[0, 0], enter='focus', z=22)
lamp('lp10', [1500, 200], L(10), L(12, 1.6), r=900, dark=.35, warm=.6)
# ======================================================================== CLUE 1 — the wobble
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'The Wobble', 'a': 0},
    [K(L(12), .8, a=1), K(L(29), .5, a=0), K(L(29, .5), .01, n=2, label='The Breathing Stars'), K(L(30), .8, a=1), K(L(42), .5, a=0), K(L(42, .5), .01, n=3, label='One Word on a Glass Plate'),
     K(L(43), .8, a=1), K(L(54), .5, a=0), K(L(54, .5), .01, n=4, label='The Runaway Galaxies'), K(L(55), .8, a=1), K(L(60), .8, a=0)])
text('t11', 'Clue I · The Wobble', 'title', 960, 240, L(11, .2), L(12, .6), size=60)
# L12 — sightlines: from each eye past the thumb to the far chimneys; where they land is the jump (drawn as a plan, from above)
G('eyes10')['keys'] += [K(L(12), 1.4, 'inOut', y=990, r=40, gap=180)] + gone(L(13, 1.4), 'ink', .8)
art('th12', 'ThumbHand', L(12), None, gone(L(13, .4), 'ink', .8), inkdur=1.0, x=990, y=700, s=.6, z=21)
shape('roofs12', "M300 200 L420 200 L440 170 L470 170 L470 200 L700 200 L720 160 L760 200 L1000 200 L1010 150 L1040 150 L1050 200 L1300 200 L1330 175 L1360 200 L1620 200", L(12), L(13, .4), dur=1.6, sw=2.4, z=12)
trail('sl12a', [[870, 990], [954, 532], [1015, 200]], L(12, .2), 1.4, L(13, .4), col='#B8862B', w=3, r=6)
trail('sl12b', [[1050, 990], [954, 532], [884, 200]], L(12, 2.8), 1.4, L(13, .4), col='#B8862B', w=3, r=6)
shape('br12', "M884 176 L884 160 L1015 160 L1015 176", L(12, 5.6), L(13, .4), dur=1.0, col='#D2643E', sw=3, z=31)
text('l12', 'parallax', 'note', 950, 125, L(12, 7.0), L(13, .4), size=64, col='#8C3424')
lamp('lp12', [960, 500], L(12), L(13, .4), r=900, dark=.25, warm=.5)
# L13 — the eyes fly apart and become the Earth in January and in July round a gold Sun
art('orb13', 'OrbitTriangle', L(13, .8), None, [K(L(13, .8), 1.6, 'out', orbit=1), K(L(13, 3.0), 1.4, sun=1), K(L(13, 4.4), 1.2, earths=1)] + gone(L(14, 1.2), 'ink', 1.0),
    ink=False, draw=1, x=960, y=500, s=1, orbit=0, sun=0, earths=0, tri=0, z=20)
for j, (x, lab) in enumerate(((440, 'January'), (1480, 'July'))):
    text(f'l13{j}', lab, 'plate', x, 830, L(13, 5.8), L(14, 1.4), size=40, col='#F3E7CC', light=True)
dark('night13', L(13), L(17, .2), k=.92, d=1.6, z=4, col='#0B1030')
dark('dark21', L(21), L(22, .4), k=.92, d=.9, z=4, col='#0B1030')
sfx(13, 3.0, FX + 'cue_reveal_1.wav', -26)
# L14 — two round fields of the same patch of sky, then laid one over the other: the near star has slid a hair (held breath)
art('px14', 'ParallaxField', L(14), None, [K(L(14, 4.8), 1.8, 'weight', sep=0), K(L(14, 6.4), 1.2, b=.85), K(L(14, 7.8), 1.0, tick=1),
    K(L(15), 1.4, 'weight', flipY=90), K(L(15, 1.4), .01, a=0)], ink=True, inkdur=1.6, x=960, y=500, r=300, sep=1, shift=1, tick=0, b=1, enter='focus', fx_box=[300, 160, 1320, 680], z=22)
text('l14a', 'January', 'plate', 606, 870, L(14, 1.6), L(14, 4.8), size=36, col='#F3E7CC', light=True)
text('l14b', 'July', 'plate', 1314, 870, L(14, 3.2), L(14, 4.8), size=36, col='#F3E7CC', light=True)
sfx(14, 7.8, FX + 'dial_tick_2.wav', -22)
# L15 — the page turns: three centuries of telescopes, each with an empty notebook
art('tel15', 'TelescopeRow', L(15, .4), None, [K(L(15, .8), 6.0, 'linear', page=1)] + gone(L(16), 'ink', 1.0), inkdur=1.8, x=960, y=800, s=1, page=0, z=15)
for j, (x, lab) in enumerate(((440, '1600s'), (980, '1700s'), (1560, '1800s'))):
    text(f'l15{j}', lab, 'plate', x, 1010, L(15, 1.4 + j * .8), L(16, .2), size=36, col='#F3E7CC', light=True)
haze('hz15', 600, 1080, L(15), L(16), k=.3)
lamp('lp15', [980, 520], L(15), L(16, .4), r=900, dark=.35, warm=.7)
lamp('lp16', [1500, 200], L(16), L(17, .2), r=1100, dark=.3, warm=.6)
# L16 — a scale-dive into one degree: sixty minutes, then sixty seconds, then a hair
art('arc16', 'ArcDial', L(16), None, [K(L(16, 1.4), 1.4, 'inOut', lvl=1), K(L(16, 4.2), 1.4, 'inOut', lvl=2), K(L(16, 6.6), 1.2, 'inOut', lvl=3)] + gone(L(17, .2), 'ink', .8, at=[960, 540]),
    inkdur=1.2, x=960, y=540, lvl=0, z=20)
counter('c16', '1/{n} of a degree', 960, 900, L(16, 7.0), L(17, .4), [K(L(16, 7.0), 1.6, 'out', num=3600)], size=64, style='note', col='#F3E7CC', light=True)
sfx(16, 1.4, FX + 'motion_whoosh_airy_1.wav', -26); sfx(16, 4.2, FX + 'motion_whoosh_airy_1.wav', -28)
# L17 — the hair is the dome's slit opening on the night: Bessel's tower at Königsberg, the heliometer, Bessel
DOME = dict(x=960, y=540, s=1)
DK = [K(L(18, 1.2), 1.5, 'in', fx_s=4.2)]
art('dome17', 'KoenigsbergDome', L(17), None, [K(L(17), 1.8, 'weight', slit=1)] + DK + gone(L(18, 2.0), 'ink', .6, at=[330, 781]), inkdur=1.6, slit=0, moon=-.4, snow=0, fx_ox=330, fx_oy=781, **DOME, z=8)
art('hel17', 'Heliometer', L(17, 3.2), None, [K(L(18), 4.0, 'linear', turn=160)] + DK + gone(L(18, 2.0), 'ink', .6, at=[330, 781]), inkdur=1.6, x=700, y=880, s=.9, turn=0, fx_ox=330, fx_oy=781, z=12)
person('bes17', 'Friedrich Bessel, 53, at Königsberg (1837)', L(17, 4.8), None, [K(L(17, 8.0), 1.4, 'soft', pk=1)] + DK + gone(L(18, 1.4), 'ink', .6),
       x=1180, y=1010, h=620, facing=-1, pose='stand', pose2='reach', pk=0, expr='focus', ek=.6, look=[-.8, -.2], fx_ox=330, fx_oy=781, **BESS, z=14)
shadow('sh17', 1180, 1012, 160, 22, L(17, 5.0), L(18, .6))
shaft('sf17', [1100, -20], [1240, 900], L(17, 1.2), L(18, .8), w0=120, w1=380, n=3, k=.7)
lamp('lp17', [340, 820], L(17, 1.0), L(18, 1.2), r=700, dark=.45, warm=.75)
text('n17', 'Königsberg, 1837', 'note', 520, 180, L(17, 6.4), L(18, .4), size=58)
sfx(17, 0, FX + 'machine_gear_whirr_1.wav', -28)
# L18 — insert on the micrometer drum; through the eyepiece: the split field slides one star onto the other
art('spl18', 'SplitField', L(18, 1.6), None, [K(L(18, 1.6), 1.2, 'in', iris=1), K(L(18, 4.2), 2.0, 'weight', slide=1)] + gone(L(19, .3), 'ink', 1.0),
    ink=False, draw=1, x=960, y=500, r=360, slide=0, vernier=1, iris=0, irisAt=[960, 500], z=20)
sfx(18, 4.2, FX + 'machine_ratchet_1.wav', -26)
# L19 — the Swan unrolls (Bayer, 1603); a small double star crawls across it; the real photograph beside
art('bay19', 'Etch', L(19), None, [K(L(19), 1.8, 'linear', draw=1)] + gone(L(20, .4), 'ink', 1.0), ink=False, src=PD + 'bayer_cygnus_ink.png', x=240, y=0, w=1440, h=1080, draw=0, **{'from': 'left'}, tint='#D9AE6C', washA=.35, z=12)
art('crawl19', 'CygniCrawl', L(19, 3.0), None, [K(L(19, 3.0), 1.0, ring=1), K(L(19, 6.0), 3.0, 'linear', crawl=1)] + gone(L(20, .4), 'ink', .8), ink=False, draw=1, x=1180, y=640, crawl=0, ring=0, len=200, ang=-160, z=20)
text('l19', '61 Cygni', 'label', 1450, 820, L(19, 4.6), L(20, .4), to=[1180, 650], size=42)
art('pin19', 'Pinned', L(19, 7.4), None, gone(L(20, .4), 'up', 1.0), ink=False, src=ST + 'P-06_61cygni-dss2.jpg', x=1640, y=290, w=300, h=300, rot=3, caption='61 Cygni today', draw=1, enter='bleed', z=30)
sfx(19, 0, FX + 'foley_page_turn_1.wav', -22)
lamp('lp19', [1500, 160], L(19), L(20, .4), r=1100, dark=.3, warm=.6)
# L20 — nights pass in the tower: the moonlight sweeps round, snow on the slit, the log fills (Ball's 1891 figure of the comparison stars)
art('dome20', 'KoenigsbergDome', L(20), None, [K(L(20, 1.4), 1.2, moon=.4), K(L(20, 2.8), 1.2, moon=-.6), K(L(20, 4.2), 1.2, moon=.6), K(L(20, 7.0), 1.2, snow=1), K(L(20, 8.4), 1.2, snow=0), K(L(20, 9.2), 1.0, moon=0)]
    + gone(L(21, .4), 'ink', 1.0), inkdur=1.2, slit=1, moon=-.8, snow=0, enter='bleed', **DOME, z=8)
art('hel20', 'Heliometer', L(20), None, [K(L(20), 9, 'linear', turn=300)] + gone(L(21, .4), 'ink', 1.0), inkdur=1.0, x=900, y=690, s=1, turn=0, z=12)
person('bes20', 'Friedrich Bessel at the heliometer', L(20, .2), None, [K(L(20, 4.2), 1.6, 'soft', expr='worry', ek=.8), K(L(21), 1.0, 'soft', expr='surprise', ek=1)] + gone(L(21, 1.0), 'ink', .8),
       x=400, y=1070, h=660, facing=1, pose='sitpeer', pose2='sitadjust', pk=0, expr='focus', ek=1, look=[.6, .1], **BESS, z=14)
G('bes20')['keys'].insert(0, K(L(20, 1.4), 1.4, 'hand', pk=1))
shaft('sf20', [1100, -20], [400, 700], L(20, .4), L(21, .4), w0=110, w1=240, n=2, k=.6)
art('ball20', 'Etch', L(20, 5.6), None, gone(L(21, .4), 'right', 1.0), ink=False, src=PD + 'ball_61cyg_ink.png', x=1240, y=120, w=600, h=438, draw=1, enter='bleed', z=30)
text('l20', 'the log fills, night after night', 'plate', 1540, 600, L(20, 6.0), L(21, .4), size=32)
lamp('lp20', [600, 820], L(20), L(21, .6), r=700, dark=.5, warm=.75)
sfx(20, 0, SK + 'S-01_clock-tick-take1-core-cc0.wav', -30)
# L21 — echo: his eye becomes the field again; the near star slides its hair-width and stops; a gold figure
art('px21', 'ParallaxField', L(21), None, [K(L(21, 1.2), 1.6, 'weight', shift=1), K(L(21, 2.4), 1.0, tick=1)] + gone(L(22), 'ink', .6, at=[1350, 760]), ink=False, draw=1, x=860, y=520, r=320, sep=0, shift=0, tick=0, b=1, enter='focus', z=20)
text('f21', '0.314″', 'figure', 1150, 820, L(21, 3.4), None, size=150, keys=[K(L(22), 1.2, 'in', a=0)])
sfx(21, 3.4, FX + 'impact_bell_1.wav', -24)
# L22 — the figure shrinks to a gold coin on a far hill; the road runs back thirteen kilometres to us
art('coin22', 'CoinFarHill', L(22), None, [K(L(22), 2.6, 'weight', cr=3, cx=960, cy=404)] + gone(L(23, 1.4), 'ink', 1.0), ink=False, draw=1, cr=120, cx=1350, cy=760, glint=1, enter='bleed', z=10)
text('l22', '13 km', 'label', 1300, 520, L(22, 3.6), L(23, .4), to=[968, 404], size=48)
text('l22b', 'a 2 cm coin', 'note', 700, 300, L(22, 2.4), L(23, .4), size=48)
sfx(22, .2, FX + 'foley_coins_1.wav', -24)
# L23 — the road and hill tilt up into the parallax triangle; L24 — its point runs off; a counter of kilometres
art('tri23', 'OrbitTriangle', L(23), None, [K(L(23, .2), 1.6, 'out', orbit=1, earths=1, sun=1), K(L(23, 1.6), 2.4, 'out', tri=1), K(L(23, 4.4), 1.0, angle=1), K(L(24), 3.4, 'in', stretch=1)] + gone(L(25), 'ink', .8, at=[960, 220]),
    ink=False, draw=1, x=960, y=560, s=1, orbit=0, sun=0, earths=0, tri=0, stretch=0, angle=0, z=20)
dark('night23', L(23), L(28, 2.0), k=.9, d=1.6, z=4, col='#0B1030')
text('l23a', 'the Earth’s orbit', 'plate', 960, 900, L(23, 2.2), L(24, .4), size=36, col='#F3E7CC', light=True)
text('l23b', 'the star', 'plate', 1120, 260, L(23, 4.4), L(24, .4), size=36, col='#F3E7CC', light=True)
counter('c24', '{n} km', 960, 380, L(24, 1.0), L(25, .4), [K(L(24, 1.4), 2.8, 'in', num=100000000000000)], size=80, style='figure')
text('f24', '≈ 10 light-years', 'note', 960, 520, L(24, 2.8), L(25, .4), size=64, col='#F3E7CC', light=True)
sfx(24, 1.2, FX + 'motion_whoosh_long_1.wav', -26)
# L25 — a bobbin at the star unspools a thread of light for ten years to the telescope
art('bob25', 'LightBobbin', L(25), None, [K(L(25, .6), 3.6, 'linear', k=1), K(L(26), .8, years=0)] + gone(L(26, 1.2), 'ink', .8), ink=False, draw=1, x=1520, y=230, x2=360, y2=780, k=0, years=1, y0=1828, enter='focus', z=20)
art('hel25', 'Heliometer', L(25, 2.0), None, gone(L(26, .6), 'ink', .8), inkdur=1.2, x=330, y=1000, s=.42, turn=0, z=16)
# L26 — the thread pulls taut into a line of type; Bessel's 1838 page develops round it; the number ringed
art('d26', 'DocumentPage', L(26, 1.0), None, [K(L(26, 1.0), 1.4, 'glide', fx_y=0)] + gone(L(27, .8), 'left', 1.0), ink=False, src=ST + 'D-02_bessel-1838-parallax-03136-p92.jpg', x=700, y=540, w=640, h=734, rot=-2, draw=1, enter='bleed', fx_y=40, z=22)
art('d26c', 'DocumentPage', L(26, 2.4), None, gone(L(27, .8), 'left', 1.0), ink=False, src=ST + 'D-02-crop_parallax-03136.jpg', x=1380, y=560, w=560, h=296, rot=2, draw=1, enter='bleed', z=24)
mark('mk26', 'circle', [1180, 470, 400, 180], L(26, 3.6), L(27, .6), w=6)
sheen('she26', [380, 160, 1300, 760], L(26, 4.8))
lamp('lp26', [1500, 200], L(26), L(27, 1.0), r=900, dark=.35, warm=.6)
shape('thr26', "M360 780 L1520 230", L(26), L(26, 1.4), dur=.8, col='#D9AE4C', sw=3, z=40)
sfx(26, 3.6, SK + 'S-01_pen-scribble-take1-cc0.wav', -24)
# L27 — the page turns to a globe: two more pins, the Cape and Dorpat
ent('globe27', 'planet', {'kind': 'earth', 'x': 960, 'y': 520, 'size': 300, 'lon': 10, 'lat': 20, 'a': 0, 'draw': 0},
    [K(L(27, 1.4), .01, a=1), K(L(27, 1.4), 1.4, 'out', draw=1), K(L(27, 2.0), 6.0, 'soft', lon=24)] + gone(L(28, .2), 'ink', .8), z=20)
art('gst27', 'GlobeStand', L(27, 1.2), None, gone(L(28, .2), 'ink', .8), inkdur=1.2, x=960, y=520, r=300, z=18)
ent('pin27a', 'pin', {'on': 'globe27', 'lon': 18.4, 'lat': -33.9, 'label': 'the Cape', 'r': 12, 'draw': 0, 'a': 0}, [K(L(27, 2.8), .01, a=1), K(L(27, 2.8), 1.0, draw=1), K(L(28), .6, a=0)], z=22)
ent('pin27b', 'pin', {'on': 'globe27', 'lon': 26.7, 'lat': 58.4, 'label': 'Dorpat', 'r': 12, 'draw': 0, 'a': 0}, [K(L(27, 4.4), .01, a=1), K(L(27, 4.4), 1.0, draw=1), K(L(28), .6, a=0)], z=22)
text('l27a', 'Alpha Centauri', 'note', 560, 880, L(27, 3.2), L(28, .2), size=52, col='#F3E7CC', light=True)
text('l27b', 'Vega', 'note', 1350, 150, L(27, 4.8), L(28, .2), size=52, col='#F3E7CC', light=True)
lamp('lp27', [1500, 260], L(27, 1.0), L(28, .4), r=800, dark=.3, warm=.5)
sfx(27, 0, FX + 'foley_page_turn_1.wav', -22)
# L28 — the page folds itself into a paper boat that sails onto a sea of stars and sinks
art('sea28', 'StarSea', L(28, .4), None, gone(L(29, 1.4), 'ink', 1.2), inkdur=1.6, y=660, z=6)
art('boat28', 'PaperBoat', L(28), None, [K(L(28), 1.6, 'inOut', fold=1), K(L(28, 1.4), 2.4, 'inOut', x=980, y=640), K(L(28, 3.0), 1.6, 'soft', rock=1), K(L(28, 4.2), 3.0, 'in', sink=1)],
    ink=False, draw=1, x=960, y=520, s=.9, fold=0, sink=0, rock=0, z=20)
ripple('rp28', [980, 700], L(28, 5.6), r=260, col='#C9DDE6')
sfx(28, 5.4, FX + 'real_air_pocket_1.wav', -24)
# ======================================================================== CLUE 2 — the breathing stars
art('mw29', 'MilkyWayBand', L(29), None, [K(L(30, 1.4), 1.2, a=.4)] + gone(L(30, 3.0), 'ink', 1.0), ink=False, draw=1, x=960, y=540, rot=-24, enter='bleed', z=6)
text('t29', 'Clue II · Breathing Stars', 'title', 960, 240, L(29, .3), L(30, .6), size=60, col='#F3E7CC', light=True)
art('plate30', 'GlassPlateSky', L(30), None, [K(L(30), 1.2, 'glide', fx_x=0), K(L(30, 1.4), 1.6, 'soft', neg=1), K(L(30, 2.8), 1.4, 'inOut', lift=40, x=760, y=780, w=320, h=260)] + gone(L(31, 1.0), 'ink', .8),
    ink=False, draw=1, x=960, y=540, w=700, h=560, neg=0, frame=1, rot=-2, cloud=0, fx_x=-140, z=20)
art('hco30', 'Etch', L(30, 3.2), None, [K(L(30, 3.2), 1.6, 'linear', draw=1)] + gone(L(31, .4), 'up', 1.0), ink=False, src=PD + 'hco_1847_ink.png', x=1240, y=60, w=620, h=262, draw=0, tint='#F0D9A8', washA=.4, z=24)
text('l30', 'Harvard College Observatory', 'plate', 1550, 350, L(30, 4.0), L(31, .4), size=32)
dark('dk29', L(29), L(30, 3.0), k=.9, d=.9, z=4, col='#0B1030')
lamp('lp30', [960, 260], L(29), L(31, .2), r=900, dark=.3, warm=.5)
sfx(30, 2.8, SK + 'S-01_glass-slide-take1-cc0.wav', -22)
# L31 — pull back into the plate room: women at desks by the tall windows
ROOM = dict(x=960, y=540, s=1)
art('room31', 'HarvardPlateRoom', L(31), None, [K(L(32), 1.4, 'soft', blur=6), K(L(33), 1.0, a=0)], inkdur=2.0, dusk=0, lamp=1, **ROOM, z=6)
W_ = [(200, 1080, 600, 1, 'sit', 'sitpeer', 0), (1100, 1080, 600, 1, 'sit', 'sitpeer', 1), (520, 740, 340, 1, 'sit', 'sitpeer', 2), (1640, 760, 380, -1, 'stand', 'hold', 3)]
for j, (x, y, h, fc, p1, p2, c) in enumerate(W_):
    person(f'hw31{j}', 'a woman measuring plates at Harvard (c. 1900)', L(31, 1.6 + j * .5), None, [K(L(31, 2.8 + j * 1.0), 1.4, 'soft', pk=1), K(L(32), 1.4, 'soft', blur=6)] + gone(L(33), 'ink', .8),
           x=x, y=y, h=h, facing=fc, pose=p1, pose2=p2, pk=0, expr='focus', ek=.8, look=[.6, .5], hair='bun', **HARV[c], z=10 + (2 if h > 400 else 0))
text('l31', 'Harvard, c. 1900', 'plate', 960, 120, L(31, 7.0), L(32, .6), size=40)
shaft('sf31', [-100, 0], [700, 1080], L(31, .4), L(33), w0=200, w1=700, n=4, k=.6)
motes('mo31', [0, 100, 900, 800], L(31, 1.0), L(33), n=50)
sfx(31, 0, FX + 'real_cloth_1.wav', -30)
# L32 — rack focus to one desk: Henrietta Leavitt, loupe in hand; her portrait card pinned above
person('lea32', 'Henrietta Swan Leavitt (1868–1921) at her plate', L(32), None, [K(L(32, 1.4), 1.4, 'soft', pk=1), K(L(32, 5.6), 1.4, 'soft', expr='focus', ek=1)] + gone(L(33, .6), 'ink', .8),
       x=200, y=1080, h=720, facing=1, pose='sit', pose2='sitpeer', pk=0, expr='neutral', ek=0, look=[.7, .5], hair='bun', **LEAV, enter='focus', z=16)
art('lc32', 'CabinetCard', L(32, 2.8), None, gone(L(33, .4), 'up', 1.0), ink=False, src=ST + 'P-02_henrietta-leavitt-portrait-pd.jpg', x=600, y=330, w=210, h=279, rot=-4, caption='Henrietta Swan Leavitt', draw=1, enter='bleed', z=20)
text('l32', 'Harvard, the plate room', 'plate', 1000, 250, L(32, 4.2), L(33, .4), size=44)
lamp('lp32', [700, 760], L(32), L(33, .6), r=600, dark=.45, warm=.6)
# L33 — whip along the plate's journey: the station at Arequipa; the two misty clouds of the southern sky
WHIP = [K(L(33), 1.0, 'expo', fx_x=0)]
art('aq33', 'Pinned', L(33, .6), None, WHIP + gone(L(34, .4), 'left', 1.0), ink=False, src=ST + 'P-11_arequipa-station-1904-pd.png', x=560, y=420, w=640, h=400, rot=-3, caption='Harvard’s station, Arequipa, Peru (1904)', draw=1, fx_x=600, z=20)
art('smc33', 'Pinned', L(33, 4.6), None, gone(L(34, .4), 'ink', 1.0, at=[1420, 560]), ink=False, src=ST + 'P-08_smc-vista-ccby.jpg', x=1420, y=560, w=420, h=420, rot=3, caption='Small Magellanic Cloud', draw=1, enter='bleed', z=22)
text('l33', 'Arequipa, Peru', 'note', 560, 760, L(33, 2.8), L(34, .2), size=56)
dark('dk33', L(33, 4.0), L(34, .8), k=.5, d=1.4, z=4, col='#0B1030')
sfx(33, 0, FX + 'motion_whoosh_short_1.wav', -24)
# L34 — through the loupe: dots on the plate swell and shrink in rhythm (the breathing stars)
art('br34', 'BreathingField', L(34), None, [K(L(34), 1.4, 'in', iris=1), K(L(34, .1), 26, 'linear', ph=26), K(L(35, 3.0), 2.0, 'weight', sort=1),
    K(L(36), 1.6, 'inOut', fx_s=.45, fx_x=-420, fx_y=-140, sort=0)] + gone(L(37), 'ink', .8), ink=False, draw=1, x=960, y=540, r=400, ph=0, sort=0, cloud=1, marks=1, neg=1, iris=0, irisAt=[1420, 560], fx_ox=960, fx_oy=540, z=20)
art('p34', 'DocumentPage', L(34, 1.4), None, gone(L(35), 'right', 1.0), ink=False, src=ST + 'P-03_smc-plate-b20678-leavitt-annotations-pd.jpg', x=1640, y=300, w=300, h=291, rot=3, draw=1, enter='bleed', z=24)
text('l34', 'her pencil marks', 'note', 1640, 500, L(34, 2.4), L(35), size=40)
lamp('lp34', [1600, 160], L(34), L(37), r=1100, dark=.25, warm=.6)
sfx(34, 0, SK + 'S-01_glass-slide-take1-cc0.wav', -26)
mark('mk35', 'arrow', [700, 600, 520, 40], L(35, 4.0), L(36), w=5)
text('l35a', 'quick', 'note', 760, 760, L(35, 1.4), L(36), size=48); text('l35b', 'slow', 'note', 1160, 760, L(35, 2.8), L(36), size=48)
# L36 — the stars stream back into their cloud; dotted lines to the Earth, all the same length
ent('earth36', 'planet', {'kind': 'earth', 'x': 1560, 'y': 880, 'size': 46, 'lon': -60, 'lat': 20, 'a': 0, 'draw': 0}, [K(L(36, 1.4), .01, a=1), K(L(36, 1.4), 1.0, 'out', draw=1)] + gone(L(37), 'ink', .8), z=20)
for j, (sx, sy) in enumerate(((500, 400), (540, 330), (580, 420))):
    trail(f'eq36{j}', [[sx, sy], [1560, 880]], L(36, 1.6 + j * .3), 1.4, L(37), col='#B8862B', w=2, r=4, dash='6 8')
shape('brk36', "M1180 480 L1220 470 L1260 690 L1220 700", L(36, 3.0), L(37), dur=.9, col='#D2643E', sw=3, z=31)
text('n36', 'same distance', 'note', 1390, 470, L(36, 4.4), L(37), size=52)
text('l36', 'the Earth', 'plate', 1560, 970, L(36, 2.0), L(37), size=32)
# L37 — the breaths pour into a graph of the 25 stars; a ruled line; the real circular beside it
art('g37', 'LeavittGraph', L(37), None, [K(L(37, .4), 2.4, 'linear', pts=1), K(L(37, 2.8), 1.4, 'hand', line=1), K(L(38), 1.4, a=0), K(L(39), .01, a=1), K(L(39, .2), 1.6, 'inOut', lift=1, glow=1)] + gone(L(40), 'ink', .8),
    ink=False, draw=1, x=800, y=540, w=1000, h=640, pts=0, line=0, lift=0, glow=0, enter='bleed', z=20)
art('d37', 'DocumentPage', L(37, 5.6), None, gone(L(38), 'right', .8), ink=False, src=ST + 'D-01_leavitt-1912-p2.jpg', x=1600, y=560, w=420, h=530, rot=3, draw=1, enter='bleed', z=24)
text('f37', '1912', 'figure', 1600, 200, L(37, 7.0), L(38, .3), size=110)
lamp('lp37', [1500, 200], L(37), L(41, 1.0), r=1000, dark=.3, warm=.55)
sfx(37, 2.8, SK + 'S-01_pen-scribble-take1-cc0.wav', -26)
# L38 — the real 1912 circular; a vermilion line under "Miss Leavitt"
art('d38', 'DocumentPage', L(38), None, gone(L(39), 'ink', .9), ink=False, src=ST + 'D-01_leavitt-1912-p1.jpg', x=960, y=540, w=760, h=960, rot=-1, draw=1, enter='bleed', z=24)
mark('mk38', 'underline', [700, 340, 520, 30], L(38, 3.0), L(39), w=6)
text('n38', 'prepared by Miss Leavitt', 'note', 1250, 170, L(38, 3.2), L(39), size=44, col='#8C3424')
# L39 — the line lifts off the page and becomes a ruler of light
art('ru39', 'LightRuler', L(39, 1.2), None, [K(L(39, 1.2), 2.0, 'out', len=1), K(L(39, .2), 12, 'linear', ph=12), K(L(40), 1.2, a=0)], ink=False, draw=1, x=280, y=640, L=1360, ang=-8, len=0, ph=0, star=1, enter='focus', z=22)
text('l39a', 'true brightness', 'note', 400, 470, L(39, 4.2), L(40), size=46)
text('l39b', 'how far', 'note', 1500, 600, L(39, 7.0), L(40), size=46)
# L40 — the ruler becomes a candle carried down a dark road, dimming as the square of the distance
art('road40', 'CandleRoad', L(40), None, [K(L(40, 1.4), 5.4, 'in', far=1)] + gone(L(41, .6), 'ink', 1.0, at=[1040, 390]), ink=False, draw=1, x=960, y=540, far=0, hand=1, stones=1, enter='bleed', z=20)
text('l40', 'a standard candle', 'plate', 960, 120, L(40, 1.6), L(41, .4), size=40, col='#F3E7CC', light=True)
# L41 — the candle is her desk lamp; the desk is empty; the window dims to evening
art('room41', 'HarvardPlateRoom', L(41), None, [K(L(41, 3.0), 3.0, 'soft', dusk=1), K(L(41, 7.2), 1.0, lamp=.3)] + gone(L(42, .4), 'ink', 1.0, at=[460, 760]), inkdur=1.0, dusk=0, lamp=1, empty=1, enter='bleed', **ROOM, z=6)
art('lp41', 'Loupe', L(41, 4.4), None, gone(L(42, .2), 'ink', .8, at=[460, 760]), ink=False, src=ST + 'P-03_smc-plate-b20678-leavitt-annotations-pd.jpg', x=520, y=915, r=52, zoom=2.4, srcW=1472, srcH=1428, handle=46, draw=1, enter='bleed', z=20)
lamp('lm41', [1040, 860], L(41), L(42, .2), r=520, dark=.5, warm=.8)
text('n41', '1868 – 1921', 'note', 700, 300, L(41, 5.8), L(42, .2), size=60)
# ======================================================================== CLUE 3 — one word on a glass plate (set piece 2)
SKY = lambda id, t, tout: (ent(id + 'a', 'art', {'name': 'Sky', 'kind': 'night', 'seed': id, 'a': 0}, [K(t, 1.4, a=1)] + gone(tout, 'ink', 1.0), z=1),
                           ent(id + 'b', 'art', {'name': 'Stars', 'n': 220, 'h': 1080, 'seed': id, 'a': 0}, [K(t, 1.6, a=1)] + gone(tout, 'ink', 1.0), z=2))
SKY('sky42', L(42), L(44, .2))
art('sp42', 'SpiralNebula', L(42), None, [K(L(42), 12, 'linear', rot=40), K(L(43, 2.8), 2.4, 'inOut', q=1)] + gone(L(44, .3), 'ink', .8, at=[960, 540]), ink=False, draw=1, x=960, y=540, r=300, rot=0, q=0, night=1, enter='bleed', z=20)
for j, (x, y, r) in enumerate(((330, 300, 130), (1590, 290, 150), (1560, 820, 110), (330, 830, 120))):
    art(f'sp43{j}', 'SpiralNebula', L(43, 1.4 + j * .3), None, gone(L(44, .3), 'ink', .8), ink=False, draw=1, x=x, y=y, r=r, rot=j * 60, night=1, enter='bleed', z=18)
text('t42', 'Clue III · One Word', 'title', 960, 240, L(42, .3), L(43, .6), size=56, col='#F3E7CC', light=True)
text('q43a', 'inside our galaxy?', 'note', 600, 560, L(43, 5.6), L(44, .3), size=48, col='#F3E7CC', light=True)
text('q43b', 'or galaxies of their own?', 'note', 1480, 560, L(43, 7.0), L(44, .3), size=48, col='#F3E7CC', light=True)
# L44 — the debate hall: Shapley and Curtis at facing lecterns, a lantern slide of a spiral between them
art('hall44', 'DebateHall', L(44), None, [K(L(45), 1.6, 'inOut', fx_s=2.8, fx_y=420)] + gone(L(45, 1.2), 'ink', .8, at=[960, 270]), inkdur=1.6, x=960, y=540, s=1, slide=1, chand=1, fx_ox=960, fx_oy=270, z=8)
person('sha44', 'Harlow Shapley, 34 (1920)', L(44, 2.8), None, [K(L(44, 7.0), 1.4, 'soft', pk=1)] + gone(L(45, .4), 'ink', .8), x=470, y=660, h=420, facing=1, pose='stand', pose2='explain', pk=0, expr='focus', ek=.7, look=[1, 0], **SHAP, z=12)
person('cur44', 'Heber Curtis, 47 (1920)', L(44, 4.2), None, [K(L(44, 8.0), 1.4, 'soft', pk=1)] + gone(L(45, .4), 'ink', .8), x=1450, y=660, h=430, facing=-1, pose='stand', pose2='point', pk=0, expr='focus', ek=.7, look=[-1, 0], **CURT, z=12)
text('l44', 'Washington, 26 April 1920', 'plate', 960, 960, L(44, 5.6), L(45, .2), size=40, col='#F3E7CC', light=True)
for j, (src, cap, x) in enumerate(((ST + 'P-09_shapley-portrait-pd.jpg', 'Shapley', 170), (ST + 'P-09-x1_curtis-portrait-1918-pd.jpg', 'Curtis', 1750))):
    art(f'pc44{j}', 'CabinetCard', L(44, 3.4 + j * 1.4), None, gone(L(45, .2), 'up', .8), ink=False, src=src, x=x, y=300, w=200, h=270, rot=(-4, 4)[j], caption=cap, draw=1, enter='bleed', z=20)
lamp('lp44', [960, 40], L(44), L(45, .6), r=900, dark=.4, warm=.65)
shaft('sf44', [960, 120], [960, 700], L(44, 1.4), L(45), w0=60, w1=380, n=3, k=.5)
sfx(44, 0, FX + 'real_crowd_1.wav', -34)
# L45 — the lantern slide fills the frame; a round window in the arm should show a breathing star — not yet found
SKY('sky45', L(45, .6), L(46, .4))
art('sp45', 'SpiralNebula', L(45, .6), None, gone(L(46, .4), 'ink', .8), ink=False, draw=1, x=960, y=540, r=420, rot=20, night=1, enter='bleed', z=20)
art('br45', 'BreathingField', L(45, 1.4), None, [K(L(45, 1.4), 1.2, 'in', iris=1), K(L(45, 1.4), 8, 'linear', ph=8), K(L(45, 4.2), 1.4, a=.25)] + gone(L(46, .2), 'ink', .6), ink=False, draw=1, x=1240, y=420, r=120, ph=0, neg=0, cloud=0, marks=0, iris=0, irisAt=[1240, 420], z=24)
text('q45', '?', 'note', 1240, 640, L(45, 5.6), L(46, .2), size=120, col='#F3E7CC', light=True)
# L46 — the chandelier rises into a dome: Mount Wilson, its shutter opening; the real footage in a film strip
art('mw46', 'HookerDome', L(46), None, [K(L(46, 1.6), 1.2, 'weight', fx_y=0), K(L(46, 3.0), 2.4, 'inOut', open=1), K(L(46, 3.0), 4.0, 'soft', rot=40), K(L(47), 1.6, 'in', fx_s=6)] + gone(L(47, 1.0), 'ink', .6, at=[960, 330]),
    ink=False, draw=1, x=960, y=540, s=1, mode='out', open=0, rot=0, fx_y=-300, fx_ox=1008, fx_oy=330, enter='bleed', z=10)
art('pin46', 'Pinned', L(46, 5.8), None, gone(L(47, .4), 'right', .8), ink=False, src=ST + 'P-04_hooker-100inch-dome-1917-pd.jpg', x=1500, y=800, w=380, h=301, rot=3, caption='The 100-inch telescope, Mount Wilson (1917)', draw=1, enter='bleed', z=26)
text('l46', '100 inches', 'label', 520, 260, L(46, 7.2), L(47, .2), to=[930, 330], size=44, col='#F3E7CC', light=True)
sfx(46, 3.0, SK + 'S-01_dome-motor-servo-take1-cc0.wav', -26)
# L47 — down the tube to the observer's platform: Hubble at the guider (the Hale engraving of the 100-inch as the set)
art('in47', 'HookerDome', L(47, .6), None, gone(L(48, .2), 'ink', .8), inkdur=1.4, x=960, y=540, s=1, mode='in', open=1, tilt=0, enter='bleed', z=8)
person('hub47', 'Edwin Hubble, 33, at the 100-inch (1923)', L(47, 1.2), None, [K(L(47, 2.8), 1.4, 'soft', pk=1), K(L(47, 4.2), 1.4, 'soft', expr='focus', ek=1)] + gone(L(48, .2), 'ink', .8),
       x=1440, y=880, h=520, facing=-1, pose='look', pose2='reach', pk=0, expr='neutral', ek=0, look=[-.6, -.5], **HUBB, z=14)
art('hc47', 'CabinetCard', L(47, 1.6), None, gone(L(48, .2), 'up', .8), ink=False, src=ST + 'P-04-x1_hubble-at-eyepiece-1922-pd.jpg', x=1620, y=760, w=240, h=321, rot=4, caption='Hubble at the telescope', draw=1, enter='bleed', z=20)
lamp('lp47', [1680, 700], L(47), L(48, .6), r=700, dark=.55, warm=.9)
sfx(47, 0, FX + 'motion_whoosh_deep_1.wav', -26)
# L48–L50 — the light table: the new point, "N"; older plates, the point breathing; N struck through, VAR! (held breath)
LT = dict(x=960, y=560, s=1)
art('lt48', 'LightTable', L(48), None, [K(L(48, 1.4), 1.2, glow=1), K(L(48, 2.8), 1.0, pt=1), K(L(48, 4.2), 1.0, 'hand', n=1),
    K(L(49), 1.0, 'soft', a=.25), K(L(50), 1.0, 'soft', a=1),
    K(L(50, 1.0), .9, 'hand', strike=1), K(L(50, 2.0), 2.0, 'hand', v=4), K(L(50, 4.6), 1.0, a=.0)], ink=True, inkdur=1.2, glow=0, pt=0, n=0, strike=0, v=0, date=0, enter='bleed', **LT, z=20)
art('ph48', 'PenHand', L(48, 3.4), None, [K(L(48, 3.4), 1.0, 'soft', x=1130, y=500), K(L(48, 4.4), .8, 'hand', x=1160, y=508), K(L(48, 5.4), 1.4, 'soft', x=1500, y=900)] + gone(L(49), 'ink', .6),
    ink=False, draw=1, x=1500, y=900, s=.9, cuff='stone', enter='bleed', z=40)
shadow('phs48', 1250, 640, 200, 40, L(48, 3.6), L(49), k=.4, z=39)
text('n48', 'October 1923', 'note', 560, 160, L(48, 5.6), L(49, .4), size=56)
for j, (x, r_, vr, t0) in enumerate(((420, -6, 3, 1.2), (760, 4, 9, 2.4), (1100, -3, 3, 3.6), (1440, 5, 10, 4.8))):
    art(f'old49{j}', 'GlassPlateSky', L(49, t0), None, [K(L(49, t0 + 1.0), .9, ring=1)] + gone(L(50), 'ink', .6), ink=False, draw=1, x=x, y=560, w=300, h=300, rot=r_, seed=40, neg=1, frame=1, vr=vr, vx=.55, vy=.45, ring=0, label='H33' + str(2 + j), enter='bleed', z=24)
person('hub49', 'Edwin Hubble sees it breathe', L(49, 6.6), None, [K(L(49, 6.6), 1.2, 'soft', expr='surprise', ek=1), K(L(50), 1.4, 'soft', expr='awe', ek=1)] + gone(L(50, 1.0), 'ink', .6),
       x=1560, y=1500, h=1300, facing=-1, pose='look', expr='focus', ek=1, look=[-.8, .4], **HUBB, z=30)
art('ph50', 'PenHand', L(50, .2), None, [K(L(50, .3), .8, 'soft', x=1126, y=530), K(L(50, 1.0), .9, 'hand', x=1162, y=470), K(L(50, 2.0), .75, 'hand', x=1104, y=318), K(L(50, 2.5), .75, 'hand', x=1150, y=318),
    K(L(50, 3.0), .75, 'hand', x=1196, y=318), K(L(50, 3.5), .75, 'hand', x=1236, y=300), K(L(50, 4.4), 1.0, 'soft', x=1560, y=900)] + gone(L(50, 4.8), 'ink', .6),
    ink=False, draw=1, x=1500, y=860, s=.9, cuff='stone', enter='bleed', z=40)
art('h335', 'DocumentPage', L(50, 4.6), None, gone(L(51, .6), 'ink', 1.0, at=[1080, 300]), ink=False, src=ST + 'P-01_hubble-var-plate-h335h-carnegie.png', x=960, y=540, w=600, h=744, rot=0, draw=1, enter='bleed', z=26)
text('n50', 'plate H335H', 'plate', 1520, 900, L(50, 5.2), L(51, .4), size=36)
lamp('lp48', [960, 560], L(48), L(51, .4), r=700, dark=.6, warm=.4)
sfx(48, 4.2, SK + 'S-01_pen-scribble-take1-cc0.wav', -24); sfx(49, .2, SK + 'S-01_glass-slide-take1-cc0.wav', -24)
sfx(50, 1.0, SK + 'S-01_pen-scribble-take1-cc0.wav', -18); sfx(50, 2.2, SK + 'S-01_pen-scribble-take1-cc0.wav', -18)
# L51 — the dot of the "!" breathes: a Cepheid in the arm of Andromeda; Leavitt's loupe-circle rings it
SKY('sky51', L(51), L(54, .2))
art('and51', 'AndromedaEngraving', L(51, .8), None, [K(L(51, .8), 1.4, beat=1), K(L(51), 16, 'linear', ph=16), K(L(51, 3.6), 1.4, 'hand', ring=1), K(L(52), 1.6, 'inOut', x=1560, y=260, r=170, ring=0)] + gone(L(53, .4), 'ink', .8),
    ink=False, draw=1, x=960, y=540, r=600, rot=-36, beat=0, ph=0, ring=0, bx=.55, by=-.12, enter='bleed', z=20)
art('m31p', 'Pinned', L(51, 2.4), None, gone(L(52), 'down', .8), ink=False, src=ST + 'P-07_andromeda-hubble-mosaic-2025-pd.jpg', x=960, y=940, w=900, h=210, rot=-1, caption='Andromeda (Hubble Space Telescope, 2025)', draw=1, enter='bleed', z=24)
# L52 — Leavitt's ruler laid from the Milky Way to Andromeda: it runs past our galaxy's edge and on
art('mwy52', 'SpiralNebula', L(52), None, gone(L(53, .4), 'ink', .8), ink=False, draw=1, x=300, y=860, r=220, rot=10, tilt=.5, night=1, enter='bleed', z=18)
art('ru52', 'LightRuler', L(52), None, [K(L(52), 6.4, 'inOut', len=1), K(L(52), 10, 'linear', ph=10)] + gone(L(53, .2), 'ink', .6), ink=False, draw=1, x=300, y=860, L=1420, ang=-24, len=0, ph=0, star=0, ticks=40, z=22)
text('l52a', 'the edge of our galaxy', 'label', 760, 960, L(52, 1.6), L(53, .2), to=[520, 790], size=36, col='#F3E7CC', light=True)
text('l52b', 'far outside', 'note', 1380, 520, L(52, 7.0), L(53, .2), size=56, col='#F3E7CC', light=True)
# L53 — the Milky Way, which filled the sky, shrinks to one swirl among thousands (held breath)
art('gs53', 'GalaxyStorm', L(53), None, [K(L(53), 5.4, 'in', mw=0), K(L(53, 5.8), 1.2, 'hand', ring=1), K(L(54), 1.0, ring=0)], ink=False, draw=1, x=960, y=540, spread=1, red=0, mw=1, ring=0, sky=1, enter='bleed', z=8)
text('l53', 'our galaxy', 'label', 1300, 300, L(53, 6.4), L(54, .6), to=[990, 520], size=40, col='#F3E7CC', light=True)
# ======================================================================== CLUE 4 — the runaway galaxies (set piece 3)
G('gs53')['keys'] += [K(L(54), 1.6, 'soft', spread=1.04), K(L(54, 1.6), 1.0, spread=1.0), K(L(55), 1.4, a=.35)] + gone(L(56), 'ink', 1.0)
ripple('rp54', [960, 540], L(54), r=900, n=5, d=2.4, col='#F7E3A0')
text('t54', 'Clue IV · Runaway Galaxies', 'title', 960, 240, L(54, .3), L(55, .6), size=56, col='#F3E7CC', light=True)
art('spec55', 'SpectrumStrip', L(55), None, [K(L(55, 1.4), 1.0, prism=1), K(L(55, .2), 1.4, 'out', beam=1), K(L(55, 2.8), 1.8, 'linear', paint=1), K(L(55, 4.2), .8, lines=1), K(L(55, 5.6), 2.0, 'weight', shift=1)] + gone(L(56, .6), 'ink', .8),
    ink=False, draw=1, x=1180, y=600, w=1000, h=150, shift=0, prism=0, beam=0, paint=0, lines=0, z=22)
lamp('lp55', [300, 160], L(55), L(57), r=1100, dark=.25, warm=.7)
mark('mk55', 'arrow', [1050, 480, 560, 60], L(55, 7.0), L(56, .4), w=5)
art('tr56', 'TrainWhistle', L(56), None, [K(L(56), dur(56) + 1.0, 'linear', pos=.95)] + gone(L(57, .4), 'ink', .8), ink=False, draw=1, x=960, y=700, pos=.12, waves=1, enter='bleed', z=20)
sfx(56, .4, FX + 'machine_chime_1.wav', -28)
art('loaf57', 'RisingLoaf', L(57), None, [K(L(57, 1.4), 6.0, 'inOut', rise=1), K(L(58), 1.2, oven=1)] + gone(L(58, 1.6), 'ink', .8, at=[960, 400]), ink=True, inkdur=1.4, x=960, y=660, s=1.2, rise=0, lines=1, oven=0, gal=1, z=20)
lamp('lp57', [960, 300], L(57), L(58, 1.4), r=800, dark=.35, warm=.9)
# L58 — the oven door opens on a study: Lemaître at his desk, writing; his 1927 page
art('lem58', 'LemaitreDesk', L(58, .8), None, gone(L(59, .4), 'ink', .8), inkdur=1.4, x=960, y=540, s=1, lamp=1, page=1, enter='bleed', z=8)
person('lma58', 'Georges Lemaître, 33, priest and physicist (1927)', L(58, 1.4), None, [K(L(58, 2.8), 1.4, 'soft', pk=1), K(L(58, 7.0), 1.4, 'soft', pk=0, expr='awe', ek=1, look=[0, -.6])] + gone(L(59, .4), 'ink', .8),
       x=400, y=1070, h=640, facing=1, pose='sit', pose2='sitpeer', pk=0, expr='focus', ek=.8, look=[.4, .6], **LEMA, z=12)
art('d58', 'DocumentPage', L(58, 4.2), None, gone(L(59, .4), 'right', .8), ink=False, src=ST + 'D-05_lemaitre-1927-p49.jpg', x=1160, y=650, w=200, h=309, rot=-8, draw=1, enter='bleed', z=20)
text('l58', 'Georges Lemaître, 1927', 'plate', 760, 180, L(58, 5.6), L(59, .2), size=40)
lamp('lp58', [1290, 600], L(58, .8), L(59, .6), r=800, dark=.45, warm=.7)
# L59 — a line leaves the page and becomes Hubble's 1929 graph
art('hd59', 'HubbleDiagram', L(59), None, [K(L(59, 2.8), 2.4, 'linear', pts=1), K(L(59, 4.2), 1.4, 'hand', line=1), K(L(60, .2), 1.2, glow=1)] + gone(L(61, .2), 'up', 1.0), ink=False, draw=1, x=820, y=540, w=1040, h=660, pts=0, line=0, glow=0, enter='bleed', z=20)
art('d59', 'DocumentPage', L(59, 5.6), None, gone(L(60), 'right', .8), ink=False, src=ST + 'D-04-crop_velocity-distance-graph.jpg', x=1620, y=560, w=420, h=485, rot=3, draw=1, enter='bleed', z=24)
text('f59', '1929', 'figure', 1620, 180, L(59, 7.0), L(60, .3), size=110)
# ======================================================================== THE TWIST
spot('sp60', [820, 540], 300, L(60), L(61), dark=.6)
SKY('sky61', L(61), L(65, .4))
art('gs61', 'GalaxyStorm', L(61), None, [K(L(61, 1.4), 5.0, 'in', spread=1.7, streak=1), K(L(62), 4.4, 'in', spread=.02, streak=0, red=0), K(L(62, 3.2), 1.6, point=1)] + gone(L(63, 1.2), 'ink', .8, at=[960, 540]),
    ink=False, draw=1, x=960, y=540, spread=1, red=.6, mw=0, sky=0, enter='bleed', z=10)
sfx(61, 1.4, FX + 'motion_reverse_cymbal_1.wav', -28); sfx(62, 0, FX + 'motion_riser_3s.wav', -28)
# L63 — the point opens like an eye: Gaia's sunshield, spinning
art('gaia63', 'GaiaProbe', L(63), None, [K(L(63), 1.6, 'out', fx_s=1), K(L(63), 16, 'linear', spin=240), K(L(63, 4.2), 2.0, sweep=1), K(L(64), 1.4, 'in', fx_s=.1, fx_y=-200)] + gone(L(64, 1.2), 'ink', .6),
    ink=True, inkdur=1.4, x=960, y=600, r=380, spin=0, sweep=0, fx_s=.02, fx_ox=960, fx_oy=540, z=20)
counter('c63', '{n} stars', 960, 960, L(63, 5.6), L(64, .4), [K(L(63, 5.6), 2.0, 'out', num=1470000000)], size=72, style='figure')
text('l63', 'Gaia', 'plate', 1500, 300, L(63, 7.0), L(64, .2), size=48, col='#F3E7CC', light=True)
# L64 — a billion ticks fill the sky; the camera flies through them
art('tk64', 'TickSky', L(64), None, [K(L(64), 2.6, 'out', k=1), K(L(64, 2.8), dur(64) + 2.0, 'in', fly=.9)] + gone(L(65, 1.4), 'ink', .8), ink=False, draw=1, k=0, fly=0, sky=0, z=12)
sfx(64, 0, FX + 'phase_hologram_1.wav', -30)
# ======================================================================== THE ANSWER — back to the window
art('win65', 'NightWindow', L(65, .6), None, [K(L(65, .6), 1.6, 'out', fx_s=1)] + gone('L68-1.2', 'ink', 1.0), ink=True, inkdur=1.4, night=1, stars=1, lamp=1, moon=1, mx=1180, my=240, fx_s=.3, fx_ox=960, fx_oy=400, **NWIN, z=6)
lamp('lp65', [260, 360], L(65, .6), 'L68-1', r=760, dark=.45, warm=.7)
art('px66', 'ParallaxField', L(66), None, [K(L(66, 1.4), 1.4, 'weight', shift=1), K(L(66, 4.2), .9, tick=1), K(L(67), 1.6, 'inOut', x=760, y=560, r=110)] + gone(L(68), 'ink', .8),
    ink=False, draw=1, x=960, y=400, r=200, sep=0, shift=0, tick=0, b=1, enter='focus', z=20)
text('f66', 'a few light-years', 'note', 960, 680, L(66, 2.8), L(67, .2), size=60, col='#F3E7CC', light=True)
art('br67', 'BreathingField', L(67), None, [K(L(67), 12, 'linear', ph=12)] + gone(L(68), 'ink', .8), ink=False, draw=1, x=960, y=380, r=110, ph=0, neg=0, cloud=0, marks=0, enter='focus', z=20)
art('gx67', 'SpiralNebula', L(67, 1.6), None, [K(L(67, 1.6), 10, 'linear', rot=30)] + gone(L(68), 'ink', .8), ink=False, draw=1, x=1160, y=210, r=90, night=1, enter='focus', z=20)
shape('lad67', "M760 560 L960 380 L1160 210", L(67, 3.2), L(68), dur=1.6, col='#D9AE4C', sw=3, z=19)
for j, (x, y, lab) in enumerate(((560, 640, 'wobble'), (760, 330, 'breathing stars'), (1340, 300, 'galaxies'))):
    text(f'l67{j}', lab, 'plate', x, y, L(67, .4 + j * 1.6), L(68), size=34, col='#F3E7CC', light=True)
# ======================================================================== WHAT IT MEANS
SKY('sky68', L(68), L(69, .6))
for j, (x, lab) in enumerate(((420, 'Königsberg, 1838'), (960, 'Harvard, 1912'), (1500, 'Mount Wilson, 1923'))):
    art(f'w68{j}', 'NightWindow', L(68, .2 + j * .5), None, gone(L(69, .2), 'ink', .8), ink=True, inkdur=1.2, x=x, y=560, s=.3, night=1, stars=1, lamp=1, moon=0, wall=0, z=10)
    lamp(f'lw68{j}', [x - 120, 440], L(68, .4 + j * .5), L(69, .4), r=260, dark=.15, warm=.8)
    text(f'l68{j}', lab, 'plate', x, 760, L(68, .8 + j * .5), L(69, .2), size=34, col='#F3E7CC', light=True)
art('hel69', 'Heliometer', L(69), None, gone(L(70, .4), 'ink', .8), inkdur=1.0, x=620, y=980, s=.62, turn=0, enter='bleed', z=20)
art('pl69', 'GlassPlateSky', L(69, .6), None, gone(L(70, .4), 'ink', .8), ink=False, draw=1, x=1340, y=780, w=420, h=330, rot=4, neg=1, frame=1, enter='bleed', z=20)
art('lt69', 'Loupe', L(69, 1.2), None, gone(L(70, .4), 'ink', .8), ink=False, src=ST + 'P-03_smc-plate-b20678-leavitt-annotations-pd.jpg', x=1340, y=760, r=90, zoom=2.2, srcW=1472, srcH=1428, handle=70, draw=1, enter='bleed', z=22)
sheen('she69', [400, 500, 1200, 520], L(69, 2.8))
lamp('lp69', [960, 300], L(69), L(70, .6), r=900, dark=.4, warm=.65)
shadow('sh69', 960, 1010, 760, 30, L(69, .4), L(70, .4), k=.6)
# L70 — focus past the table to the window; the thumb rises again against the night (bookend)
art('win70', 'NightWindow', L(70), None, [K(L(71, 3.0), 2.6, 'inOut', fx_s=.62, fx_y=-60)], ink=False, draw=1, night=1, stars=1, lamp=1, moon=1, mx=1180, my=240, fx_s=1, fx_ox=960, fx_oy=420, enter='focus', **NWIN, z=6)
lamp('lp70', [260, 360], L(70), None, r=760, dark=.45, warm=.7)
art('thumb70', 'ThumbHand', L(70, 1.6), None, [K(L(70, 1.6), 1.6, 'weight', fx_y=0), K(L(71, .4), .75, 'hand', x=1020), K(L(71, 1.6), .75, 'hand', x=1160), K(L(71, 3.0), 1.4, a=0)], ink=False, draw=1, nail=0, fx_y=700, **TH, z=20)
art('eye71', 'BlinkEye', L(71), None, [K(L(71, .3), .75, 'hand', lidL=1), K(L(71, 1.5), .75, 'hand', lidL=0, lidR=1), K(L(71, 2.6), .75, lidR=0)] + gone(L(71, 3.2), 'ink', .8),
    inkdur=.8, x=330, y=300, r=56, pair=1, gap=150, ring=1, lidL=0, lidR=0, look=[.2, -.3], z=30)
person('kid71', 'a child at the window, today', L(71, 3.6), None, [K(L(71, 4.6), 1.6, 'soft', pk=1, look=[.5, -1]), K(L(71, 5.8), 1.4, 'soft', expr='awe', ek=1)],
       x=800, y=1090, h=540, facing=1, pose='stand', pose2='raise', pk=0, expr='smile', ek=.4, look=[.6, -1], **KID, enter='bleed', z=22)
lamp('lp71', [860, 520], L(71, 3.6), None, r=520, dark=.3, warm=.4)
sfx(71, .3, FX + 'blip_click_1.wav', -26); sfx(71, 1.5, FX + 'blip_click_2.wav', -26)
ent('end', 'art', {'name': 'EndCard', 'k': 0, 'a': 0, 'ask': 'What would you measure with a blink?', 'next': 'Fathom'}, [K('L71$+0.3', .01, a=1), K('L71$+0.3', 2.6, 'linear', k=1)], z=95)

# ======================================================================== THE CAMERA — one shot per line (STORY §8), the grade per act, held breaths
CAM = {  # line: (shot, at)  — the shot's push frames `at`
 0: ('medium', (980, 520)), 1: ('close', (1010, 560)), 2: ('medium', (1040, 470)), 3: ('wide', (960, 400)), 4: ('medium', (960, 520)), 5: ('close', (960, 460)), 6: ('medium', (760, 520)), 7: ('wide', (960, 540)),
 8: ('detail', (960, 540)), 9: ('wide', (960, 540)), 10: ('close', (960, 520)), 11: ('medium', (960, 520)), 12: ('wide', (960, 560)), 13: ('wide', (960, 560)), 14: ('detail', (996, 470)), 15: ('wide', (960, 600)),
 16: ('insert', (960, 540)), 17: ('medium', (900, 560)), 18: ('insert', (360, 800)), 19: ('wide', (960, 540)), 20: ('close', (560, 620)), 21: ('detail', (960, 560)), 22: ('wide', (960, 540)), 23: ('wide', (960, 500)),
 24: ('detail', (960, 420)), 25: ('wide', (960, 540)), 26: ('insert', (1150, 560)), 27: ('medium', (960, 520)), 28: ('wide', (960, 560)), 29: ('wide', (960, 540)), 30: ('medium', (960, 540)), 31: ('wide', (960, 560)),
 32: ('close', (380, 640)), 33: ('medium', (900, 520)), 34: ('detail', (960, 540)), 35: ('medium', (960, 540)), 36: ('medium', (1000, 600)), 37: ('insert', (900, 540)), 38: ('detail', (960, 400)), 39: ('medium', (960, 600)),
 40: ('wide', (960, 540)), 41: ('close', (700, 760)), 42: ('medium', (960, 540)), 43: ('close', (960, 540)), 44: ('wide', (960, 540)), 45: ('close', (1100, 480)), 46: ('wide', (960, 500)), 47: ('close', (1300, 600)),
 48: ('insert', (1080, 520)), 49: ('medium', (960, 560)), 50: ('detail', (1100, 420)), 51: ('detail', (1200, 520)), 52: ('wide', (960, 540)), 53: ('wide', (960, 540)), 54: ('medium', (960, 540)), 55: ('insert', (1180, 600)),
 56: ('wide', (960, 600)), 57: ('close', (960, 560)), 58: ('medium', (960, 540)), 59: ('insert', (820, 540)), 60: ('detail', (820, 540)), 61: ('wide', (960, 540)), 62: ('detail', (960, 540)), 63: ('medium', (960, 560)),
 64: ('wide', (960, 540)), 65: ('wide', (960, 500)), 66: ('close', (960, 440)), 67: ('medium', (960, 420)), 68: ('wide', (960, 540)), 69: ('insert', (960, 760)), 70: ('close', (1020, 600)), 71: ('medium', (960, 540))}
SOFT = {'wide': 1.04, 'medium': 1.14, 'close': 1.3, 'insert': 1.45, 'detail': 1.6, 'over': 1.2}   # the page is already drawn big: shots are framed by push, gently
STAGE = {18: [(0, 'insert', (340, 800)), (1.4, 'medium', (960, 520))], 20: [(0, 'close', (440, 700)), (5.4, 'medium', (900, 560))]}
cam = G('camera'); ck = []
for i in range(NL):
    if i in STAGE:
        st = STAGE[i]
        for j, (off, s_, at_) in enumerate(st):
            ck.append(K(L(i, off), 1.4, 'soft', **shot(s_, at=at_, z=SOFT[s_])))
        off, s_, at_ = st[-1]; ck.append(K(L(i, off + 1.4), max(.9, dur(i) - off * _ratio(i) - 1.4), 'linear', **shot(s_, at=at_, z=SOFT[s_] * 1.08)))
        continue
    s, at = CAM[i]; z0 = SOFT[s]; d = dur(i)
    a = shot(s, at=at, z=z0 * .94); b = shot(s, at=at, z=z0 * 1.04)   # each line: arrive (1.6 s), then keep travelling through the line (never a held still)
    ck += [K(L(i), 1.6, 'soft', **a)] + ([K(L(i, 1.6), max(.9, d - 1.4), 'linear', **b)] if i != NL - 1 else [])
ck += [K(L(14, 6.2), .9, 'out', **shake(.25)), K(L(14, 7.2), 1.2, 'soft', **shake(0))]                                   # the hair-width shift
ck += [K(L(49, 6.6), .8, 'out', **shake(.3)), K(L(49, 7.6), 1.2, 'soft', **shake(0))]                                    # he sees it breathe
ck += [K(L(32), 1.6, 'soft', **rack(.1, 5)), K(L(33), 1.0, 'soft', dof=0), K(L(70), 1.4, 'soft', **rack(.3, 5)), K(L(71), 1.2, 'soft', dof=0)]
ck += [K(L(17), 1.6, 'weight', dolly=.25), K(L(18), 1.0, dolly=0), K(L(31), 2.4, 'weight', dolly=.2), K(L(32), 1.0, dolly=0), K(L(47), 3.0, 'weight', dolly=.3), K(L(48), 1.0, dolly=0)]
ck += [K(L(71, 3.0), 3.0, 'inOut', push=1.0, pan_x=0, pan_y=0)]
ck += grade_keys(E['lines'], K)
cam['keys'] = sorted(ck, key=lambda k: (int(re.match(r'L(\d+)', str(k['t'])).group(1)) if isinstance(k['t'], str) else -1))
ent('motes', 'particles', {'kind': 'dust', 'n': 18, 'k': 0, 'a': .6, 'speed': .5, 'para': .8}, [K(L(0), 3, k=1)], z=96)

E['world'] = W
mu = E.get('music') or {}
if isinstance(mu.get('swells'), list):   # the held breaths (treatment §9): the score drops away under VAR! and under the shrinking Milky Way
    mu['swells'] = [w for w in mu['swells'] if w[2] > 0] + [['L50', 'L50$', -14], ['L53+2', 'L53$', -10], ['L14+5', 'L14$', -8]]
for i, l in enumerate(E['lines']): l['sfx'] = SFX.get(i, [])
E['thumb'] = {'t': 1, 'title': 'How far are the stars?', 'v': 'S', 'kicker': 'Königsberg · 1838', 'lines': ['HOW FAR', 'ARE THE', 'STARS?'], 'accent': 2, 'note': 'A coin, seen from 13 km away.'}
json.dump(E, open(EP, 'w'), indent=1, ensure_ascii=False)
if _LN:
    TLP = os.path.join(H, 'timeline.json'); T = json.load(open(TLP))
    for i, l in enumerate(T['lines']): l['sfx'] = SFX.get(i, [])
    json.dump(T, open(TLP, 'w'), indent=1)
    os.makedirs(os.path.join(H, '../../public/ep/star-distance'), exist_ok=True)
    for f in ('episode.json', 'timeline.json'): shutil.copy(os.path.join(H, f), os.path.join(H, '../../public/ep/star-distance', f))
print(len(W), 'entities →', EP)
