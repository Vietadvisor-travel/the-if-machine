#!/usr/bin/env python3
"""empty-atom — the story world (engine v5): every line's v5 plan (lines.py: reads · focus · becomes · acts) → entities keyed to the narration.
python3 episodes/empty-atom/world.py → writes `world` (+ sfx, thumb) into episode.json. The drawings are src/lib/empty-atom/.
Governing image: the dark round field of the microscope where one flash appears; every scene is seen as, through or out of a circle."""
import json, math, os, re, shutil
H = os.path.dirname(os.path.abspath(__file__)); EP = os.path.join(H, 'episode.json'); E = json.load(open(EP))
ST = 'stock/_hwk/empty-atom/'
W = []
_TL = os.path.join(H, 'timeline.json'); _LN = json.load(open(_TL))['lines'] if os.path.exists(_TL) else None
if _LN and len(_LN) != len(E['lines']): _LN = None
def _ratio(i):   # the plan's beats were timed at 2.35 words/s; the voice is what it is — the beats keep their place in the line
    if not _LN: return 1.0
    est = len(E['lines'][i]['text'].split()) / 2.35; return max(.7, min(1.3, _LN[i]['dur'] / est))
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
def gone(t, style='ink', dur=1.3, at=None):
    """an exit: the drawing bleeds away like ink on wet paper (or sweeps in a direction, or gathers to a point `at`)"""
    _seed[0] = _seed[0] % 89 + 7; b = dict(XS.get(style, {}))
    if at: b = {'dissolveAt': at, 'dissolveR': 1100}
    return [K(t, dur, 'linear', dissolve=0, dissolveSeed=_seed[0], **b), K(_tadd(t, dur + .02), .01, a=0)]
def _tadd(t, d):
    m = re.match(r'^(L\d+(?:\$|@[^+\-]+)?)([+\-]\d*\.?\d+)?$', t); o = float(m.group(2) or 0) + d
    return m.group(1) if abs(o) < 1e-9 else f'{m.group(1)}{o:+g}'
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
    return art(id, 'Person', t_in, t_out, keys, inkdur=1.8, who=who, **p)
def shape(id, form, t_in, t_out=None, keys=(), dur=1.2, **p):
    pr = {'form': form, 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'col': '#2B1D12', 'sw': 3, **p}
    return ent(id, 'shape', pr, [K(t_in, .01, a=1), K(t_in, dur, 'out', draw=1)] + list(keys) + ([K(t_out, .9, a=0)] if t_out else []), z=p.pop('z', 50) if 'z' in p else 50)
def flash(id, at, **p):   # at: [[timeref, x, y, size]] — drawn at twice the given size so a single scintillation reads on a phone
    return ent(id, 'flash', {'at': [[f[0], f[1], f[2], f[3] * 2] for f in at], **p}, [], z=70)
def stream(id, paths, t0, until, t_out=None, **p):
    return ent(id, 'stream', {'paths': paths, 't0': t0, 'until': until, 'a': 1, **p}, ([K(t_out, .8, a=0)] if t_out else []), z=55)
def trail(id, pts, t_in, dur, t_out=None, col='#B8862B', w=3, r=6, ease='linear', keys=(), **p):
    return ent(id, 'trail', {'points': [{'screen': q} for q in pts], 'k': 0, 'a': 0, 'col': col, 'w': w, 'r': r, **p},
               [K(t_in, .01, a=1), K(t_in, dur, ease, k=1)] + list(keys) + ([K(t_out, .8, a=0)] if t_out else []), z=56)
def ripple(id, at, t, r=160, n=4, dur=1.6, col='#8C3424'):
    return ent(id, 'ripple', {'at': {'screen': at}, 'k': 0, 'n': n, 'r': r, 'col': col}, [K(t, dur, 'out', k=1)], z=57)
def spot(id, at, r, t_in, t_out, dark=.55):
    return ent(id, 'spot', {'at': {'screen': at}, 'r': r, 'k': 0, 'dark': dark}, [K(t_in, 1.2, 'soft', k=1), K(t_out, 1.0, k=0)], z=45)
def quill(id, pts, t_in, t_out):   # the illustrator's quill writes along the points
    ks = [K(t_in, .3, a=1)] + [K(_tadd(t_in, i * .5 + .3), .5, 'soft', at={'screen': q}) for i, q in enumerate(pts[1:])] + [K(t_out, .4, a=0)]
    return ent(id, 'hand', {'at': {'screen': pts[0]}, 's': .62, 'a': 0}, ks, z=80)
def circ(x, y, r): return f"M{x - r} {y} A{r} {r} 0 1 0 {x + r} {y} A{r} {r} 0 1 0 {x - r} {y}Z"
def rectp(x, y, w, h): return f"M{x} {y} L{x + w} {y} L{x + w} {y + h} L{x} {y + h}Z"
def ellp(x, y, rx, ry): return f"M{x - rx} {y} A{rx} {ry} 0 1 0 {x + rx} {y} A{rx} {ry} 0 1 0 {x - rx} {y}Z"
def dark(id, t_in, t_out=None, k=.96, dur=1.4, keys=(), style='up', z=1):   # a sheet of night laid over the paper
    return ent(id, 'shape', {'form': rectp(-60, -60, 2040, 1200), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'fill': '#0B0806', 'fillA': k, 'wash': False, 'sw': 0, 'col': '#0B0806'},
               [K(t_in, dur, 'soft', a=1)] + list(keys) + (gone(t_out, style, 1.6) if t_out else []), z=z)
SFX = {}
def sfx(i, at, f, db=-20): SFX.setdefault(i, []).append({'at': at, 'file': f, 'db': db})
FX = 'public/sfx/'; SK = 'public/stock/_hwk/empty-atom/'
MARS = {'costume': 'marsden1909', 'face': {'nose': .45, 'brow': .35, 'chin': .35, 'age': 0, 'build': .9}, 'hairCol': '#4A3220', 'skin': .25}
GEIG = {'costume': 'geiger1909', 'beard': 'moustache', 'face': {'nose': .5, 'brow': .5, 'chin': .3, 'age': .15, 'build': 1.0}, 'hairCol': '#3A2A1E', 'skin': .27}
RUTH = {'costume': 'rutherford1909', 'beard': 'moustache', 'face': {'nose': .6, 'brow': .55, 'chin': .45, 'age': .35, 'build': 1.25}, 'hairCol': '#5A4632', 'skin': .3}
THOM = {'costume': 'thomson1897', 'beard': 'moustache', 'face': {'nose': .55, 'brow': .45, 'chin': .3, 'age': .4, 'build': .95}, 'hairCol': '#2A1E16', 'skin': .26}

def stool(id, x, y, h, t_in, t_out=None, keys=(), z=3, xs='ink'):
    return art(id, 'LabStool', t_in, t_out, keys, inkdur=1.0, x=x, y=y, h=h, z=z, xs=xs)
ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': 0, 'light': 0})
# ======================================================================== COLD — a flash in the dark
dark('night0', 0, 'L4+0.4', dur=.01)
EYE = (1254, 643)                                       # the microscope's eyepiece in the dark room (reflect set-up at 820, 630, s 1.3)
COLDK = [K(L(1), 1.5, 'in', fx_s=7)]                    # L1: we go THROUGH the eyepiece
art('lab0', 'ManchesterLab', L(0, 1.4), None, COLDK + [K(L(0), 1.6, lamp=1), K(L(0, 8.6), 1.6, 'soft', pool=380)] + gone(L(1, .9), 'ink', .8, at=list(EYE)), inkdur=2.2, dark=1, lamp=0, pool=560, fx_ox=EYE[0], fx_oy=EYE[1], z=2)
art('app0', 'ScatterApparatus', L(0, 1.8), None, COLDK + gone(L(1, .9), 'ink', .8, at=list(EYE)), inkdur=1.8, x=820, y=630, s=1.3, mode='reflect', fx_ox=EYE[0], fx_oy=EYE[1], z=3)
stool('stool0', 1316, 1000, 150, L(0, 3.2), None, COLDK + gone(L(1, .9), 'ink', .8, at=list(EYE)), z=4)
G('stool0')['props'].update(fx_ox=EYE[0], fx_oy=EYE[1])
person('mars0', 'Ernest Marsden, 20, counting scintillations (1909)', L(0, 3.4), None, [K(L(0, 5.2), 1.6, 'soft', pk=1)] + COLDK + gone(L(1, .9), 'ink', .8, at=list(EYE)),
       x=1310, y=1000, h=560, facing=-1, pose='sit', pose2='sitlook', pk=0, fx_ox=EYE[0], fx_oy=EYE[1], z=4, **MARS)
ent('lampshade', 'shape', {'form': circ(1180, 330, 600), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'fill': '#F7D98C', 'fillA': .0, 'sw': 0}, [], z=1)
flash('match0', [[L(0, .1), 1180, 304, 10]], col='#FFF4D2', glow='#F7D98C', life=1.4)
text('t1909', 'Manchester, 1909', 'note', 470, 230, L(0, 7.0), L(1, .2), size=54, col='#F3E7CC', light=True)
sfx(0, .1, FX + 'real_electric_flicker_1.wav', -28); sfx(0, 1.0, FX + 'real_room_night_1.wav', -30)
# L1 — the dark field
ZF = ent('zns0', 'art', {'name': 'ZincScreenField', 'cx': 960, 'cy': 540, 'r': 420, 'draw': 1, 'a': 0, 'iris': 0, 'irisAt': list(EYE), 'flicker': 0, 'glitter': .5},
         [K(L(1, .5), .01, a=1), K(L(1, .5), 1.3, 'in', iris=1), K(L(1), 14, 'linear', flicker=30),
          K(L(2), 1.4, 'glide', cx=620), K(L(3, .4), 1.2, 'linear', dissolve=0, dissolveAt=[250, 420], dissolveR=900), K(L(3, 1.65), .01, a=0)], z=10)
F1 = [[L(1, 1.4), 820, 650, 5], [L(1, 2.4), 1110, 420, 5], [L(1, 3.4), 900, 450, 5], [L(1, 4.4), 990, 580, 6]]
F2 = [[L(2, 1.2), 560, 610, 5], [L(2, 2.2), 700, 470, 5], [L(2, 3.2), 610, 520, 5], [L(2, 4.2), 680, 660, 5]]
flash('fl1', F1 + F2 + [[L(2, 5.4), 250, 420, 9]])
# L2 — the tally beside the field; one flash lands on the wrong edge, a red ring is drawn round it
art('tally0', 'TallySheet', L(2), None, [K(L(2), 1.4, 'glide', fx_x=0)] + [K(L(2, 1.3 + j), .3, n=j + 1) for j in range(4)] + [K(L(2, 4.3), .3, n=5)] + gone(L(3, .2), 'right'),
    ink=False, x=1400, y=560, w=520, h=640, n=0, rot=-3, draw=1, fx_x=140, z=12)
quill('pen2', [[1240, 400], [1258, 400], [1270, 400], [1282, 400], [1294, 400], [1300, 410], [1300, 410], [1300, 410]], L(2, .9), L(2, 5.0))
shape('ring2', circ(250, 420, 46), L(2, 6.4), L(3, .8), dur=.9, col='#D2643E', sw=4)
sfx(2, 5.4, FX + 'sci_ui_tick_1.wav', -16)
# L3 — trace back along the path to the gold leaf; a particle arrives and rebounds
trail('back3', [[250, 420], [700, 470], [1230, 520]], L(3), 1.0, L(4, .2), col='#B8862B', w=3, ease='inOut')
art('foil3', 'GoldFoilFrame', L(3, .6), None, [K(L(4), 1.6, 'inOut', a=0)], inkdur=1.0, x=1260, y=500, s=1.2, z=12)
trail('in3', [[160, 560], [1252, 500]], L(3, 1.4), .7, L(3, 2.3), col='#F7E3A0', w=3, r=11)
trail('out3', [[1252, 500], [250, 420]], L(3, 2.2), .8, L(4), col='#D2643E', w=4, r=11)
flash('fl3', [[L(3, 3.0), 250, 420, 9]])
text('bk3', 'back!', 'note', 420, 330, L(3, 2.6), L(4, .3), size=70, col='#F3E7CC', light=True)
ripple('rp3', [1265, 500], L(3, 2.2), r=180, col='#F7E3A0')
sfx(3, 2.2, FX + 'impact_glass_2.wav', -20)
# L4 — the leaf becomes a bank of mist on the moor; stones vanish into it; one flies back
LEAF = "M1250 350 Q1262 430 1252 500 Q1264 570 1254 650 L1270 650 Q1260 570 1272 500 Q1262 430 1274 350Z"
MIST = "M700 560 Q760 380 980 420 Q1100 300 1300 380 Q1520 330 1600 470 Q1760 520 1640 620 Q1300 700 980 650 Q760 690 700 560Z"
ent('morph4', 'shape', {'form': LEAF, 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'fill': '#E8C25C', 'fillA': 1, 'col': '#2B1D12', 'sw': 1.4},
    [K(L(4), .01, a=1), K(L(4), 1.8, 'inOut', form=MIST, fill='#FBF7EC'), K(L(4, 1.6), .8, a=0)], z=30)
art('moor4', 'MistHillside', L(4, .3), None, [K(L(4), 9, 'linear', drift=3)] + gone(L(5, .4), 'up'), inkdur=1.4, y=760, fog=1, drift=0, enter='bleed', z=8)
for j, (t0, back) in enumerate([(1.8, False), (3.2, False), (4.6, True)]):
    trail(f'st4{j}', [[60, 1060], [500, 520], [1150 + j * 60, 560]], L(4, t0), 1.0, L(4, t0 + 1.05), col='#2B1D12', w=0, r=0, ease='out', headArt='Stone', headProps={'s': 1.1})
art('stone4', 'Stone', L(4, 5.7), None, [K(L(4, 5.7), 1.8, 'in', x=960, y=540, s=16), K(L(5, .2), .01, a=1)] + gone(L(5, .5), 'ink', 1.2, at=[960, 540]), ink=False, x=1270, y=560, s=1.2, z=40)
sfx(4, 1.8, FX + 'motion_whoosh_short_1.wav', -26); sfx(4, 3.2, FX + 'motion_whoosh_short_2.wav', -26); sfx(4, 5.6, FX + 'motion_whoosh_deep_1.wav', -20)
# L5 — the stone's round silhouette becomes the dotted outline of an atom; the quill cannot begin inside it
art('atom5', 'DottedAtom', L(5, .4), None, [K(L(5, 6.4), 3.0, 'inOut', turn=.06)], inkdur=1.6, cx=960, cy=540, r=300, turn=0, z=20)
quill('q5', [[960, 540], [940, 520], [960, 540], [975, 560], [960, 540]], L(5, 3.2), L(5, 8.4))
text('q5t', '?', 'note', 960, 560, L(5, 4.8), L(5, 6.6), size=160, width=300)
text('q5h', 'What is inside?', 'title', 960, 140, L(5, 6.0), L(6, .3), size=56)
# ======================================================================== STAKES
# L6 — the atom shrinks into one bead of a row that runs across a human hair (pull back: the row becomes a hairline)
G('atom5')['keys'] += [K(L(6), 1.4, 'in', r=6)] + gone(L(6, 1.6), 'ink', .6)
art('hair6', 'HairSection', L(6, 1.0), None, [K(L(6, 1.0), 1.4, row=1), K(L(6, 3.4), 1.2, 'in', r=1600, bead=8.5), K(L(6, 4.4), 1.0, r=700, bead=3.7), K(L(6, 5.2), 1.0, 'out', r=380, bead=.8)] + gone(L(7), 'ink', 1.2, at=[960, 540]),
    inkdur=1.2, cx=960, cy=540, r=3000, row=0, bead=16, z=12)
text('l6', 'one human hair', 'label', 1500, 220, L(6, 6.0), L(7), to=[1240, 300], size=40)
text('l6b', 'atoms, side by side', 'label', 520, 860, L(6, 1.8), L(6, 4.0), to=[700, 560], size=40)
# L7 — a single atom and a long swell of light rolling over it
art('swell7', 'LightSwell', L(7, .4), None, [K(L(7), 9, 'linear', phase=1.4)] + gone(L(8, .2), 'right'), inkdur=1.2, y=640, amp=120, lam=1000, phase=-.15, atomX=960, wobble=0, enter='bleed', z=10)
G('swell7')['keys'] += [K(L(7, 1.2), .6, wobble=10), K(L(7, 2.2), .8, wobble=0)]
shape('wl7', "M460 400 L460 380 L1460 380 L1460 400", L(7, 4.8), L(8), dur=1.0, col='#2B1D12', sw=2)
text('wl7t', 'one wavelength of light', 'plate', 960, 340, L(7, 4.9), L(8), size=36)
text('at7', 'one atom', 'label', 1280, 860, L(7, 5.6), L(8), to=[965, 690], size=34)
# L8 — the atom swells into a polished ivory ball; two more roll in and click; a knife glances off
ent('morph8', 'shape', {'form': circ(960, 600, 7), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'fill': '#9CCAD6', 'fillA': 1, 'sw': 1.2},
    [K(L(8), .01, a=1), K(L(8), 1.5, 'inOut', form=circ(960, 640, 144), fill='#FBF4E2'), K(L(8, 1.4), .5, a=0)], z=30)
art('balls8', 'IvoryBalls', L(8, 1.2), None, [K(L(8, 1.6), 1.6, 'out', b2=1, b3=1), K(L(8, 3.4), 1.4, 'linear', knife=1), K(L(8, 7.8), 1.4, 'soft', roll=.6), K(L(9, 4.4), 1.4, 'soft', roll=-.2)]
    + gone(L(10, .2), 'ink', 1.0, at=[960, 640]), inkdur=.8, x=960, y=640, s=1.2, b2=0, b3=0, knife=0, roll=0, z=12)
text('n8', 'indivisible', 'note', 1440, 330, L(8, 6.2), L(9, .4), size=64, rot=-4)
sfx(8, 2.6, FX + 'impact_plastic_1.wav', -22); sfx(8, 4.6, FX + 'impact_metal_1.wav', -24)
# L9 — the light narrows to one ball; a reading glass passes over it and shows only its shine
spot('sp9', [960, 640], 230, L(9), L(10, .2))
GL = [circ(0, 0, 150)]
ent('glass9', 'shape', {'form': circ(1500, 600, 150) + ' M1606 706 L1760 860', 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'col': '#B8862B', 'sw': 9},
    [K(L(9, 1.4), .01, a=1), K(L(9, 1.4), .9, draw=1), K(L(9, 1.6), 1.4, 'glide', form=circ(960, 640, 150) + ' M1066 746 L1220 900'), K(L(9, 4.2), 1.4, 'glide', form=circ(560, 580, 150) + ' M666 686 L820 840'), K(L(9, 5.4), .6, a=0)], z=46)
# L10 — the ball's outline unwinds into a line that becomes the underline of a Greek word on papyrus
ent('line10', 'shape', {'form': circ(960, 640, 144), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'erase': 0, 'a': 0, 'col': '#2B1D12', 'sw': 3},
    [K(L(10), .01, a=1), K(L(10), 1.4, 'inOut', form="M560 700 Q760 702 960 700 Q1160 698 1360 700"), K(L(11), .8, a=0)], z=30)
art('pap10', 'AtomosPapyrus', L(10, 1.0), None, [K(L(10, 1.8), 1.6, 'linear', k=1), K(L(11), 1.0, 'in', flipY=-90)], inkdur=1.0, x=960, y=540, s=1, k=0, fx_box=[510, 350, 900, 380], fx_ox=510, z=12)
G('pap10')['keys'].append(K(L(11, 1.0), .01, a=0))
quill('q10', [[640, 600], [800, 590], [960, 600], [1120, 590], [1260, 600]], L(10, 1.8), L(10, 3.6))
text('n10', 'uncuttable', 'note', 960, 830, L(10, 3.4), L(11), size=70)
# L11 — the page turns to Dalton's plate; his circles ink on, two join, and they harden into wooden spheres
art('dal11', 'DaltonPlate', L(11, .8), None, [K(L(11, .8), 1.0, 'out', flipY=0), K(L(11, 1.4), 2.0, 'linear', k=1), K(L(11, 3.4), 1.4, 'inOut', join=1), K(L(11, 6.8), 1.4, solid=1)]
    + gone(L(12, .2), 'left'), ink=False, x=960, y=560, s=1, k=0, join=0, solid=0, draw=1, flipY=90, fx_box=[470, 220, 980, 680], fx_ox=470, z=12)
text('p11', 'John Dalton, 1808', 'plate', 960, 960, L(11, 5.2), L(12, .2), size=40)
ripple('rp11', [880, 340], L(11, 8.4), r=140, col='#2B1D12')
sfx(11, 8.4, FX + 'impact_wood_2.wav', -22)
# L12 — one sphere splits into the four clue medallions; they close into a ring and become the title card
art('med12', 'ClueMedallions', L(12, .2), None, [K(L(12, .2), 1.4, 'out', gap=420), K(L(12, 1.6), 1.0, k1=1), K(L(12, 3.4), 1.0, k2=1), K(L(12, 5.2), 1.0, k3=1), K(L(12, 7.4), 1.0, k4=1),
    K(L(12, 9.0), 1.6, 'inOut', gather=1)] + gone(L(13, -5.4), 'ink', 1.4, at=[960, 540]), ink=False, x=960, y=560, r=150, gap=0, k1=.3, k2=.3, k3=.3, k4=.3, gather=0, tx=960, ty=540, tr=330, draw=1, z=14)
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'What is inside\nan atom?', 'sub': 'a story in four clues', 'a': 0},
    [K(L(13, -5.8), .01, a=1), K(L(13, -5.8), 4.4, 'linear', k=1), K(L(13, -.9), 1.4, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(L(13, .6), .01, a=0)], z=90)
# ======================================================================== CLUE I — A CRACK IN THE BALL
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'A Crack in the Ball', 'a': 0},
    [K(L(13), .01, a=1), K(L(23), .01, n=2, label='Flashes in the Dark'), K(L(36), .01, n=3, label='The One That Came Back'), K(L(48), .01, n=4, label='An Empty Stadium'), K(L(57), .8, a=0)])
text('t13', 'Clue I · A Crack in the Ball', 'title', 960, 170, L(13, .3), L(14, .6), size=60)
shape('cr13', "M640 230 L760 236 L800 250 L900 244 L960 262 L1060 248 L1140 258 L1280 236", L(13, 1.8), None, [K(L(14, .3), 1.0, a=0)], dur=1.0, sw=2.4)
# L14 — the lab unrolls; Thomson's tube glows; Thomson leans to look; his portrait
art('cav14', 'CavendishBench', L(14), None, [K(L(14), 1.6, 'linear', unroll=1), K(L(16), 1.2, 'soft', blur=10, a=.25)] + gone(L(17), 'ink', 1.0), ink=False, draw=1, unroll=0, fx_box=[0, 0, 1920, 1080], z=5)
TUBEK = [K(L(14, 1.6), 1.6, glow=.75), K(L(14, 7.4), .8, glow=1), K(L(14, 8.2), .8, glow=.75),
         K(L(15), .9, a=.25), K(L(15, 3.4), .9, a=1),
         K(L(16), 1.4, 'inOut', fx_s=1.45, fx_y=40), K(L(16, 1.4), 1.2, magnet=1), K(L(16, 2.6), 1.2, 'inOut', bend=-.7), K(L(16, 4.2), 1.0, plates=1, magnet=0), K(L(16, 5.6), 1.4, 'inOut', bend=.7), K(L(16, 10), 1.0, bend=.4)]
art('tube14', 'CathodeTube', L(14, .8), None, TUBEK + gone(L(17, .4), 'ink', 1.0), inkdur=1.6, x=860, y=520, s=.9, glow=0, bend=0, magnet=0, plates=0, fx_ox=860, fx_oy=520, z=10)
person('thom14', 'J. J. Thomson at the Cavendish Laboratory, Cambridge (1897)', L(14, 3.0), None, [K(L(14, 3.6), 1.6, 'soft', pk=1), K(L(16), 1.0, 'soft', blur=10, a=0)], x=1720, y=1010, h=600, facing=-1, pose='stand', pose2='hold', pk=0, z=11, **THOM)
art('thcard', 'CabinetCard', L(14, 4.6), None, [K(L(14, 4.6), 1.4, 'glide', fx_x=0)] + gone(L(15, .4), 'up'), ink=False, src=ST + 'P-03_thomson-1913-pd.jpg', x=910, y=330, w=230, h=322, rot=-4, caption='J. J. Thomson', draw=1, fx_x=-140, z=20)
text('n14', 'Cambridge, 1897', 'note', 1650, 130, L(14, 6.2), L(15, .2), size=56)
# L15 — the tube's bulb becomes a television and back
ent('tv15s', 'shape', {'form': circ(1310, 520, 155), 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'col': '#B8862B', 'sw': 6},
    [K(L(15), .01, a=1), K(L(15), .6, draw=1), K(L(15, .2), 1.4, 'inOut', form="M1070 300 L1550 300 Q1580 300 1580 330 L1580 720 Q1580 750 1550 750 L1070 750 Q1040 750 1040 720 L1040 330 Q1040 300 1070 300Z"),
     K(L(15, 3.4), 1.4, 'inOut', form=circ(1310, 520, 155)), K(L(15, 4.6), .6, a=0)], z=30)
art('tv15', 'OldTelevision', L(15, 1.4), None, [K(L(15, 1.6), 1.0, glow=1), K(L(15, 1.6), 2, 'linear', scan=3)] + gone(L(15, 3.2), 'ink', .8, at=[1310, 520]), inkdur=.9, x=1310, y=520, s=.7, glow=0, scan=0, z=25)
text('q15', '?', 'note', 1100, 380, L(15, 5.0), L(16, .6), size=120, width=200)
# L16 — inside the tube: the magnet bends the beam; the plates bend it back; it is lighter than an atom
text('pm16', 'a magnet', 'label', 520, 900, L(16, 1.8), L(16, 4.2), to=[700, 760], size=34)
art('bal16', 'ChargeBalance', L(16, 7.2), None, [K(L(16, 7.6), 1.4, 'inOut', tilt=-14)] + gone(L(17, .2), 'right'), inkdur=1.0, x=330, y=1000, s=.42, tilt=0, minus=.15, q=0, z=26)
text('b16a', 'electron', 'label', 150, 740, L(16, 7.8), L(17, .2), to=[180, 900], size=34)
text('b16b', 'atom', 'label', 620, 760, L(16, 7.8), L(17, .2), to=[490, 915], size=34)
ent('atm16', 'shape', {'form': circ(481, 880, 24), 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'fill': '#4A88AE', 'fillA': 1, 'sw': 1.2}, [K(L(16, 7.5), .01, a=1), K(L(16, 7.5), .8, draw=1), K(L(16, 7.6), 1.4, 'inOut', form=circ(481, 912, 24)), K(L(17, .2), .8, a=0)], z=27)
text('n16', 'far lighter than any atom', 'note', 1420, 210, L(16, 8.8), L(17, .4), size=52)
sfx(16, 1.4, FX + 'impact_metal_3.wav', -26)
# L17 — the beam's specks swarm into the ivory ball; it cracks; electrons spill out
BEAM = "M444 520 L725 520 Q860 520 1150 470"
ent('sw17', 'swarm', {'from': BEAM, 'to': circ(960, 600, 168), 'n': 160, 'k': 0, 'arc': 160, 'size': 3, 'col': '#2F5440', 'a': 0}, [K(L(17), .3, a=1), K(L(17), 1.8, 'inOut', k=1), K(L(17, 2.0), .6, a=0)], z=40)
art('ball17', 'IvoryBalls', L(17, 1.6), None, [K(L(17, 3.0), 1.2, 'in', crack=1), K(L(17, 4.4), 2.4, 'out', spill=1), K(L(17, 7.4), 1.2, roll=.3)] + gone(L(18, .6), 'ink', 1.0, at=[1000, 700]),
    inkdur=1.0, x=960, y=600, s=1.4, n=1, crack=0, spill=0, baize=0, z=12)
text('l17', 'electrons', 'label', 1450, 860, L(17, 6.0), L(18, .3), to=[1180, 760], size=40)
sfx(17, 3.0, FX + 'crack_glass_1.wav', -18)
# L18 — the specks fly together into a brass balance: minus on one pan, question marks on the other; level
ent('sw18', 'swarm', {'from': ellp(1060, 740, 220, 40), 'to': "M600 340 L1320 340 M960 340 L960 640", 'n': 120, 'k': 0, 'arc': 120, 'size': 3, 'col': '#1A120B', 'a': 0}, [K(L(18), .3, a=1), K(L(18), 1.6, 'inOut', k=1), K(L(18, 1.8), .6, a=0)], z=40)
art('bal18', 'ChargeBalance', L(18, 1.0), None, [K(L(18, 1.6), 1.6, 'out', minus=1), K(L(18, 1.8), 1.6, 'inOut', tilt=12), K(L(18, 5.0), 1.6, 'out', q=1), K(L(18, 6.8), 1.6, 'inOut', tilt=0), K(L(18, 8.4), 1.2, plus=1)]
    + gone(L(19, .5), 'ink', 1.2, at=[1320, 520]), inkdur=1.2, x=960, y=760, s=1.05, tilt=0, minus=0, q=0, plus=0, z=12)
text('n18', 'neutral', 'note', 960, 160, L(18, 3.6), L(19), size=64)
# L19 — the positive charge pours into a pudding basin like batter; plums drop in; it is turned out
art('pud19', 'PlumPudding', L(19, .2), None, [K(L(19, .4), 2.4, 'inOut', fill=1), K(L(19, 2.8), 1.6, 'linear', plums=1), K(L(19, 4.4), 1.2, 'soft', basin=0, plate=1), K(L(19, 7.6), 1.4, steam=1)],
    inkdur=1.0, x=960, y=640, r=230, basin=1, fill=0, plums=0, plate=0, steam=0, atom=0, fx_ox=960, fx_oy=560, z=12)
text('p19', 'J. J. Thomson, 1904: the “plum pudding”', 'plate', 960, 960, L(19, 6.0), L(20, .2), size=40)
# L20 — the pudding shrinks into the figure of a textbook; the pages turn, the same figure each time
G('pud19')['keys'] += [K(L(20), 1.4, 'inOut', fx_s=.27, fx_x=260, fx_y=20, steam=0)] + gone(L(20, 1.5), 'ink', .5)
art('book20', 'PuddingTextbook', L(20, .9), None, [K(L(20, 1.4), 1.2, 'inOut', turn=1), K(L(20, 2.8), 1.2, 'inOut', turn=2), K(L(20, 4.2), 1.2, 'inOut', turn=3), K(L(20, 5.6), 1.0, mark=1)]
    + gone(L(21, .6), 'ink', 1.0, at=[1220, 580]), inkdur=1.0, x=960, y=560, s=1, turn=0, mark=0, z=11)
sfx(20, 1.4, SK + 'S-01_paper-1-cc0.wav', -22); sfx(20, 2.8, SK + 'S-01_paper-2-cc0.wav', -22); sfx(20, 4.2, SK + 'S-01_paper-1-cc0.wav', -24)
# L21 — the figure grows out of the page as Thomson's atom; a knife cuts it; pink all through
art('pa21', 'PlumPudding', L(21), None, [K(L(21), 1.6, 'out', fx_s=1, fx_x=0, fx_y=0), K(L(21, 1.6), 1.4, 'inOut', cut=1), K(L(21, 4.6), 2.2, 'linear', jig=3), K(L(21, 5.8), .8, glowfx=.6), K(L(21, 6.6), .8, glowfx=0),
    K(L(22), 1.0, 'inOut', cut=0)] + gone(L(23, .6), 'ink', 1.2), inkdur=1.0, x=960, y=760, r=300, atom=1, plums=1, plate=0, cut=0, jig=0, fx_s=.27, fx_x=260, fx_y=-180, fx_ox=960, fx_oy=640, z=12)
shape('knife21', "M960 220 L960 900", L(21, 1.4), L(21, 3.0), dur=.9, col='#8C6E4A', sw=5)
text('l21', 'positive charge, spread evenly', 'label', 1500, 220, L(21, 3.0), L(22, .3), to=[1130, 420], size=36)
text('l21b', 'electrons', 'label', 420, 900, L(21, 4.4), L(22, .3), to=[760, 760], size=36)
# L22 — a stream of bullets passes straight through the pudding atom, barely disturbed
def wig(y, a, n=40): return 'M' + ' L'.join(f'{x:.0f} {y + (a * math.sin(x / 37 + y) if 700 < x < 1220 else 0):.1f}' for x in range(-40, 1981, 50))
stream('st22', [wig(y, 3) for y in (380, 460, 540, 620, 700, 780)], L(22), L(23, .4), L(23, 1.4), every=.13, dur=1.5, r=4.5, tail=.1)
text('l22', 'barely disturbed', 'note', 1560, 200, L(22, 5.4), L(23, .4), size=56)
# ======================================================================== CLUE II — FLASHES IN THE DARK
dark('night23', L(23), L(24, .4), k=.92, dur=1.2, z=30)
text('t23', 'Clue II · Flashes in the Dark', 'title', 960, 190, L(23, 1.2), L(24, .5), size=60, col='#F3E7CC', light=True)
flash('fl23', [[L(23, 2.2), 1380, 300, 8], [L(24, 4.6), 900, 562, 6], [L(24, 7.2), 912, 548, 6]])
# L24 — Rutherford's Manchester laboratory is painted in; the lead pot opens; radium spits sparks
art('lab24', 'ManchesterLab', L(24), None, [K(L(24), 2.0, 'linear', brush=1), K(L(25), 1.2, a=0), K(L(27), 1.4, a=1)] + gone(L(28, .2), 'ink', 1.0), ink=False, draw=1, dark=0, lamp=1, brush=0, fx_box=[0, 0, 1920, 1080], z=5)
person('ruth24', 'Ernest Rutherford in Manchester (c. 1909)', L(24, 2.2), None, [K(L(24, 3.8), 1.4, 'soft', pk=1), K(L(25), 1.0, a=0)], x=1360, y=1010, h=640, facing=-1, pose='stand', pose2='present', pk=0, z=11, **RUTH)
art('rad24', 'RadiumBlock', L(24, 1.8), None, [K(L(24, 3.8), 1.4, 'inOut', open=1), K(L(24, 4.0), 1.0, glow=1), K(L(25, 1.0), 1.0, glow=.3)] + gone(L(26, .2), 'ink', .8), inkdur=1.0, x=900, y=780, s=1.3, open=0, glow=0, z=12)
text('n24', 'Manchester', 'note', 600, 160, L(24, 6.0), L(25, .3), size=60)
stream('st24', ['M900 560 L520 220', 'M900 560 L640 140', 'M900 560 L420 330', 'M900 560 L760 120'], L(24, 4.6), L(25, .2), L(25, .9), every=.3, dur=.7, r=6, tail=.25)
text('l24', 'radium', 'label', 520, 640, L(24, 5.0), L(25, .3), to=[880, 610], size=36)
# L25 — the radium's round glow becomes the gold Nobel medal; his farm country beside it
art('med25', 'NobelMedal', L(25), None, [K(L(25, 1.6), 1.4, 'inOut', turn=1)] + gone(L(26, .4), 'ink', 1.0, at=[700, 520]), inkdur=1.2, x=700, y=520, r=210, turn=0, enter='bleed', z=20)
art('farm25', 'NelsonFarm', L(25, 3.2), None, gone(L(26, .2), 'right'), inkdur=1.4, x=1360, y=640, s=.62, enter='bleed', z=20)
text('p25', 'Nelson, New Zealand', 'plate', 1360, 870, L(25, 4.8), L(26, .2), size=38)
text('p25b', 'Nobel Prize in Chemistry, 1908', 'plate', 700, 800, L(25, 6.4), L(26, .2), size=36)
# L26 — real alpha tracks in a cloud chamber, in an eyepiece where the medal was; one alpha against electrons; the counters
art('cc26', 'Eyepiece', L(26), None, gone(L(27, .6), 'ink', 1.0, at=[640, 520]), ink=False, src=ST + 'V-01_wilson-chamber-alpha-tracks-ccby.mp4', play=L(26), vin=45, vdur=13, x=640, y=520, r=340, draw=1, cross=0, enter='bleed', z=20)
text('p26', 'real alpha tracks in a cloud chamber', 'plate', 640, 930, L(26, 1.2), L(27, .4), size=34)
ent('alpha26', 'shape', {'form': circ(1380, 470, 54), 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'fill': '#E8C25C', 'fillA': 1, 'sw': 2}, [K(L(26, 2.6), .01, a=1), K(L(26, 2.6), 1.0, draw=1), K(L(27, .2), .8, a=0)], z=22)
ent('elec26', 'shape', {'form': circ(1700, 470, 4), 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'fill': '#1A120B', 'fillA': 1, 'sw': 1}, [K(L(26, 4.0), .01, a=1), K(L(26, 4.0), .8, draw=1), K(L(27, .2), .8, a=0)], z=22)
text('a26', 'one alpha particle', 'label', 1380, 590, L(26, 2.8), L(27, .2), size=32)
text('e26', 'one electron', 'label', 1700, 590, L(26, 4.2), L(27, .2), size=32)
counter('c26', '× {n}', 1540, 330, L(26, 5.4), L(27, .2), [K(L(26, 5.6), 1.6, 'out', num=7300)], size=88)
stream('st26', ["M1160 760 L1980 700"], L(26, 7.4), L(26, 7.5), L(27), every=1, dur=.5, r=7, tail=.3)
counter('v26', '{n} km a second', 1540, 820, L(26, 8.6), L(27, .3), [K(L(26, 8.8), 1.8, 'out', num=15000)], size=64, style='note')
# L27 — Rutherford hands the job over: Geiger walks in and takes the radium; Marsden joins; their real photograph
person('ruth27', 'Ernest Rutherford (c. 1909)', L(27, .2), None, [K(L(27, 4.4), 1.4, 'soft', pk=1)] + gone(L(28), 'up', 1.0), x=1420, y=1010, h=640, facing=-1, pose='present', pose2='point', pk=0, z=11, **RUTH)
person('geig27', 'Hans Geiger (c. 1909)', L(27, 2.6), None, [K(L(27, 2.8), 2.0, 'linear', x=880, walk=2.4), K(L(27, 4.8), .01, walk=None), K(L(27, 5.4), 1.2, 'soft', pk=1)] + gone(L(28), 'up', 1.0),
       x=460, y=1012, h=620, facing=1, walk=0, pose='stand', pose2='hold', pk=0, z=11, **GEIG)
art('rad27', 'RadiumBlock', L(27, .6), None, [K(L(27, 5.0), 1.4, 'inOut', x=1020, y=860)] + gone(L(28), 'up', 1.0), inkdur=.8, x=1260, y=860, s=.6, open=0, glow=0, z=13)
person('mars27', 'Ernest Marsden (student, 1909)', L(27, 6.8), None, gone(L(28), 'up', 1.0), x=620, y=1012, h=600, facing=1, pose='stand', z=10, **MARS)
art('pin27', 'Pinned', L(27, 8.4), None, gone(L(28), 'up', 1.0), ink=False, src=ST + 'P-01_geiger-rutherford-manchester-lab-pd.jpg', x=330, y=250, w=400, h=249, rot=-3, caption='Geiger (left) and Rutherford, Manchester', draw=1, enter='bleed', z=20)
text('nm27a', 'Geiger', 'plate', 880, 1050, L(27, 10.0), L(28), size=30); text('nm27b', 'Marsden', 'plate', 620, 1050, L(27, 10.2), L(28), size=30); text('nm27c', 'Rutherford', 'plate', 1420, 1050, L(27, 10.4), L(28), size=30)
for i in ('ruth27', 'geig27', 'rad27', 'mars27', 'pin27'): G(i)['keys'] = [k if not (k.get('dissolve') == 0) else dict(k, lift=40) for k in G(i)['keys']]
# L28 — gold leaf in tweezers before a lamp: the light comes through it green; a narrow beam aimed at it
art('leaf28', 'GoldLeafLamp', L(28, 1.0), None, [K(L(28, 2.6), 1.6, 'soft', lit=1), K(L(28, 7.4), 2.4, 'linear', flutter=2)], inkdur=1.2, x=900, y=560, s=1, lit=0, flutter=0, fx_ox=900, fx_oy=560, z=12)
stream('st28', ["M-40 560 L730 560"], L(28, 5.4), L(29, .4), L(29, .6), every=.12, dur=.8, r=4, tail=.12)
text('l28', 'gold, beaten thinner than light can tell', 'plate', 900, 960, L(28, 4.2), L(29, .2), size=36)
# L29 — the leaf shrinks into its place in the evacuated tube; the pump draws out the air; the beam threads the slit
G('leaf28')['keys'] += [K(L(29), 1.4, 'inOut', fx_s=.05, fx_x=144, fx_y=0)] + gone(L(29, 1.4), 'ink', .4)
TUBE = dict(x=960, y=560, s=1.0)
TUBE2 = dict(x=900, y=560, s=1.3)
art('tube29', 'ScatterApparatus', L(29, 1.0), None, [K(L(29, 3.2), 2.2, 'inOut', pump=1), K(L(29, 5.0), 1.2, beam=1), K(L(30), 1.4, 'in', fx_s=6), K(L(30, .9), .5, a=0)], inkdur=1.8, mode='tube', pump=0, beam=0, fx_ox=1546, fx_oy=560, z=10, **TUBE)
stream('st29', ["M422 560 L1544 560"], L(29, 5.4), L(30, .1), L(30, .5), every=.2, dur=1.0, r=4, tail=.1)
text('l29a', 'source', 'label', 380, 330, L(29, 6.6), L(30), to=[400, 520], size=34)
text('l29b', 'gold', 'label', 1010, 330, L(29, 7.0), L(30), to=[1010, 495], size=34)
text('l29c', 'screen', 'label', 1550, 330, L(29, 7.4), L(30), to=[1546, 495], size=34)
text('l29d', 'no air', 'note', 760, 820, L(29, 4.4), L(30), size=48)
sfx(29, 3.2, SK + 'S-01_gas-hiss-pd.wav', -24)
# L30 — through the microscope to the screen: zinc-sulphide crystals glitter; each particle lands as a flash
art('zns30', 'ZincScreenField', L(30, .5), None, [K(L(30, .5), 1.3, 'in', iris=1), K(L(30), 13, 'linear', flicker=26)] + gone(L(31, .4), 'right', 1.6), ink=False, draw=1, cx=960, cy=540, r=420, glitter=1, flicker=0, iris=0, irisAt=[1546, 560], z=14)
flash('fl30', [[L(30, 3.0), 860, 600, 6], [L(30, 4.6), 1080, 460, 6], [L(30, 7.4), 1000, 640, 6], [L(30, 9.0), 870, 430, 6], [L(30, 10.6), 1110, 590, 6], [L(30, 10.7), 930, 520, 5]])
text('l30', 'zinc sulphide', 'label', 1560, 860, L(30, 6.0), L(31), to=[1220, 700], size=38, col='#F3E7CC', light=True)
dark('night30', L(30, .2), L(32, 1.0), k=.9, dur=1.2, z=9)
# L31 — darkness sweeps; an eye opens in the dark and its pupil widens until the flashes appear in it
art('eye31', 'DarkEye', L(31, 1.0), None, [K(L(31, 1.6), 1.4, 'out', open=1), K(L(31, 3.0), 2.2, 'inOut', pupil=.95), K(L(31, 4.6), 1.6, see=1)] + gone(L(32, .3), 'ink', 1.2, at=[960, 540]),
    inkdur=1.0, cx=960, cy=540, r=300, open=0, pupil=.2, see=0, dim=.55, enter='bleed', z=16)
art('tally31', 'TallySheet', L(31, 5.6), None, [K(L(31, 6.2), .4, n=1), K(L(31, 7.4), .4, n=2)], ink=False, x=1620, y=760, w=420, h=520, n=0, rot=4, draw=1, enter='bleed', z=18)
# L32 — the count runs; Marsden sits back and rubs his eyes; Geiger takes his place
G('tally31')['keys'] += [K(L(32), 1.4, 'inOut', x=700, y=560), K(L(32, .6), 6.4, 'linear', n=47)] + gone(L(33), 'left', 1.0)
counter('c32', '{n} flashes', 700, 960, L(32, .4), L(33), [K(L(32, .6), 6.4, 'linear', num=47)], size=56, style='note')
stool('stool32', 1306, 1010, 150, L(32, 0), None, gone(L(33), 'left', 1.0), z=11)
stool('stool32b', 1566, 1010, 156, L(32, 4.4), None, gone(L(33), 'left', 1.0), z=11)
person('mars32', 'Ernest Marsden', L(32, .2), None, [K(L(32, 1.6), 1.6, 'soft', pk=1)] + gone(L(33), 'left', 1.0), x=1300, y=1010, h=600, facing=-1, pose='sitlook', pose2='think', pk=0, z=12, **MARS)
person('geig32', 'Hans Geiger', L(32, 2.8), None, [K(L(32, 3.0), 2.0, 'linear', x=1560, walk=2), K(L(32, 5.0), .01, walk=None), K(L(32, 5.2), 1.4, 'soft', pk=1)] + gone(L(33), 'left', 1.0),
       x=1980, y=1010, h=620, facing=-1, walk=0, pose='stand', pose2='sitlook', pk=0, z=12, **GEIG)
# L33 — whip pan across the years: a Geiger–Müller counter, its needle jumping with every click
art('gm33', 'GeigerCounter', L(33), None, [K(L(33), 1.0, 'expo', fx_x=0)] + [K(L(33, t), .15, needle=.75) for t in (2.6, 3.8, 4.4, 7.0, 8.0)] + [K(L(33, t + .2), .5, needle=.15) for t in (2.6, 3.8, 4.4, 7.0, 8.0)]
    + [K(L(34), 1.4, 'inOut', fx_y=1100), K(L(34, 1.4), .01, a=0)], inkdur=1.0, x=1060, y=600, s=1.1, needle=.1, fx_x=2000, z=12)
for j, t in enumerate((2.6, 3.8, 4.4, 7.0, 8.0)): ripple(f'rp33{j}', [480, 530], L(33, t), r=120, n=2, dur=.8, col='#2B1D12'); sfx(33, t, FX + 'blip_click_2.wav', -18)
text('p33', 'a Geiger–Müller counter, 1928', 'plate', 1060, 900, L(33, 5.4), L(34), size=38)
sfx(33, 0, FX + 'motion_whoosh_long_1.wav', -24)
# L34 — crane over into the tube: the stream passes the gold straight
art('tube34', 'ScatterApparatus', L(34), None, [K(L(34), 1.4, 'inOut', fx_y=0), K(L(36), 1.2, 'linear', dissolve=0, dissolveAt=[952, 560], dissolveR=1000), K(L(36, 1.25), .01, a=0)], ink=False, draw=1, mode='tube', pump=1, beam=0, air=0, scope=0, fx_y=-1100, z=10, **TUBE2)
stream('st34', [f"M115 {560 + d} L1574 {560 + d * 1.1}" for d in (-3, 0, 2, -1, 3, 1)], L(34, 1.4), L(35, 5.0), L(36), every=.15, dur=1.0, r=7, tail=.12)
flash('fl34', [[L(34, t), 1580, 560 + o, 5] for t, o in ((2.8, 0), (3.4, 3), (4.2, -2), (4.8, 1))] + [[L(35, 2.6), 1580, 470, 6], [L(35, 3.2), 1580, 650, 6]])
# L35 — the light narrows: three paths bend a few degrees as they cross the gold
spot('sp35', [1100, 560], 320, L(35), L(36))
stream('st35', ["M115 560 L952 560 L1574 470", "M115 560 L952 560 L1574 650", "M115 560 L952 560 L1574 505"], L(35, 1.0), L(35, 4.0), L(36), every=.55, dur=1.0, r=8, tail=.2, col='#D2643E', trace=1.2)
text('l35', 'nudged', 'note', 1320, 400, L(35, 4.0), L(36, .4), size=56)
# ======================================================================== CLUE III — THE ONE THAT CAME BACK
text('t36', 'Clue III · The One That Came Back', 'title', 960, 190, L(36, .6), L(37, .5), size=50, width=1500)
shape('ret36', "M560 260 L1280 260 Q1360 260 1340 300 Q1300 330 1100 312", L(36, 2.0), None, [K(L(37, .2), 1.0, a=0)], dur=1.2, col='#D2643E', sw=3)
# L37 — the true 1909 arrangement: Rutherford points to the source side; Marsden fits the microscope beside the source, behind lead
art('lab37', 'ManchesterLab', L(37), None, gone(L(38, .3), 'ink', 1.0), inkdur=1.4, dark=0, lamp=1, dim=.25, enter='bleed', z=5)
art('app37', 'ScatterApparatus', L(37, .2), None, [K(L(37, 2.8), 1.8, 'inOut', scope=1), K(L(38), 1.2, wobble=14)] + gone(L(38, .4), 'ink', 1.0), inkdur=1.4, x=820, y=630, s=1.3, mode='reflect', scope=0, beam=0, z=10)
person('ruth37', 'Ernest Rutherford', L(37, .2), None, [K(L(37, .4), 1.4, 'soft', pk=1), K(L(37, 6.4), 1.4, 'soft', pose='point', pose2='think', pk=0), K(L(37, 6.5), 1.3, 'soft', pk=1)] + gone(L(38, .4), 'ink', 1.0),
       x=1720, y=1010, h=640, facing=-1, pose='stand', pose2='point', pk=0, z=12, **RUTH)
stool('stool37', 1326, 1010, 150, L(37, 4.6), None, gone(L(38, .4), 'ink', 1.0), z=10)
person('mars37', 'Ernest Marsden', L(37, 1.6), None, [K(L(37, 1.8), 1.4, 'soft', pk=1), K(L(37, 5.0), 1.6, 'soft', pose='hold', pose2='sitlook', pk=0), K(L(37, 5.1), 1.5, 'soft', pk=1)] + gone(L(38, .4), 'ink', 1.0),
       x=1320, y=1010, h=580, facing=-1, pose='stand', pose2='hold', pk=0, z=11, **MARS)
text('l37a', 'radium source', 'label', 1260, 430, L(37, 3.0), L(38), to=[975, 405], size=36)
text('l37b', 'lead plate', 'label', 1120, 520, L(37, 3.6), L(38), to=[1000, 585], size=34)
text('l37c', 'gold foil', 'label', 330, 610, L(37, 4.2), L(38), to=[555, 500], size=36)
text('l37d', 'screen', 'label', 600, 760, L(37, 4.8), L(38), to=[792, 650], size=34)
# L38 — the room shimmers into a pudding; a bullet passes straight through it; it only wobbles
art('pud38', 'PlumPudding', L(38, .6), None, [K(L(38, 3.4), .6, wobble=12), K(L(38, 4.6), .8, wobble=0), K(L(38, 5.4), .6, wobble=10), K(L(38, 8.0), 1.0, wobble=0)] + gone(L(39), 'ink', .9, at=[960, 520]),
    inkdur=1.2, x=960, y=720, r=250, atom=0, plums=1, plate=1, enter='bleed', z=12)
for j, t in enumerate((1.6, 4.6)):
    trail(f'bul38{j}', [[-160, 560 + j * 40], [2080, 560 + j * 40]], L(38, t), 1.0, L(38, t + 1.1), col='#8C6E4A', w=1.2, r=0, headArt='NavalShell', headProps={'s': .45})
text('n38', 'nothing comes back', 'note', 960, 180, L(38, 6.4), L(39), size=60)
sfx(38, 1.6, FX + 'motion_whoosh_short_1.wav', -22); sfx(38, 4.6, FX + 'motion_whoosh_short_2.wav', -22)
# L39 — through the eyepiece: a bright flash on the source side
art('zns39', 'ZincScreenField', L(39), None, [K(L(39), .9, 'in', iris=1), K(L(39), 10, 'linear', flicker=20)] + gone(L(40, .2), 'ink', 1.2, at=[620, 470]), ink=False, draw=1, cx=960, cy=540, r=420, glitter=.5, flicker=0, iris=0, irisAt=[960, 520], z=14)
dark('night39', L(39), L(40, .4), k=.9, dur=.8, z=9)
flash('fl39', [[L(39, .8), 620, 470, 12]], life=2.0)
text('so39', 'on the source side!', 'note', 760, 300, L(39, 1.0), L(40, .3), size=56, col='#F3E7CC', light=True)
ripple('rp39', [620, 470], L(39, 1.6), r=220, col='#B8F0C8')
sfx(39, .8, SK + 'S-01_glass-bell-cc0.wav', -20)
# L40 — the real 1909 paper develops where the flash was; the key sentence, underlined; 1 in 8,000
art('d40', 'DocumentPage', L(40), None, gone(L(41, .3), 'ink', 1.2), ink=False, src=ST + 'D-01_geiger-marsden-1909-p495-pd.jpg', x=600, y=540, w=600, h=903, rot=-2, draw=1, enter='bleed', z=20)
art('d40c', 'DocumentPage', L(40, 1.8), None, [K(L(40, 1.8), 1.2, 'glide', fx_y=0), K(L(40, 4.6), 1.4, circleK=1)], ink=False, src=ST + 'D-01-crop_1-in-8000-sentence.jpg', x=1300, y=640, w=1080, h=110, rot=1, circle=[.19, .5, .3, .3], circleK=0, mark='line', draw=1, enter='bleed', fx_y=60, z=22)
text('f40', '1 in 8,000', 'figure', 1300, 360, L(40, 6.0), L(41, .3), size=150)
text('p40', 'Geiger & Marsden, Proc. Roy. Soc., 1909', 'plate', 1300, 470, L(40, 7.4), L(41, .3), size=34)
# L41 — the printed words come apart as grains and settle as 8,000 dots; one is red; a pudding allows none
ent('sw41', 'swarm', {'from': rectp(760, 600, 1080, 80), 'to': rectp(260, 170, 880, 740), 'n': 260, 'k': 0, 'arc': 200, 'size': 2.4, 'col': '#2B1D12', 'a': 0, 'shuffle': .7}, [K(L(41), .3, a=1), K(L(41), 1.8, 'inOut', k=1), K(L(41, 2.0), .6, a=0)], z=40)
G('d40c')['keys'] += gone(L(41, .1), 'ink', .8)
art('dots41', 'DotField', L(41, 1.2), None, [K(L(41, 1.2), 2.2, 'linear', k=1), K(L(41, 3.4), .8, red=1), K(L(41, 5.8), .5, red=.3), K(L(41, 6.4), .5, red=1)] + gone(L(42), 'ink', 1.0), ink=False, x=700, y=540, w=880, h=740, n=8000, k=0, red=0, draw=1, z=20)
counter('c41', '{n}', 1500, 250, L(41, 1.2), L(42, .2), [K(L(41, 1.2), 2.2, 'linear', num=8000)], size=110)
text('l41', 'came back: 1', 'label', 1500, 380, L(41, 3.6), L(42, .2), size=38, col='#8C3424')
art('pud41', 'PlumPudding', L(41, 4.4), None, gone(L(42, .2), 'ink', 1.0), inkdur=1.0, x=1500, y=800, r=140, atom=1, plums=1, plate=0, z=20)
text('z41', '0', 'stamp', 1500, 660, L(41, 4.8), L(42, .2), size=60)
# L42 — Rutherford cannot believe it: he reads the tally, the pen stops, he stands and paces, holding up the gold leaf
art('lab42', 'ManchesterLab', L(42), None, [K(L(43), 1.4, 'inOut', fx_y=-1100)] + gone(L(43, 1.4), 'ink', .3), inkdur=1.2, dark=0, lamp=1, dim=.15, enter='focus', z=5)
person('ruth42', 'Ernest Rutherford', L(42, .4), None, [K(L(42, 3.0), .8, nod=18), K(L(42, 4.6), 1.6, 'soft', pk=1), K(L(42, 6.6), 2.0, 'linear', x=1260, walk=2), K(L(42, 8.6), .01, walk=None),
       K(L(42, 8.6), 1.4, 'soft', pose='think', pose2='present', pk=0), K(L(42, 8.7), 1.3, 'soft', pk=1), K(L(43), 1.4, 'inOut', fx_y=-1100), K(L(43, 1.4), .01, a=0)],
       x=820, y=1010, h=640, facing=1, pose='sitlook', pose2='think', pk=0, enter='focus', z=12, **RUTH)
stool('stool42', 826, 1010, 164, L(42), None, [K(L(43), 1.4, 'inOut', fx_y=-1100), K(L(43, 1.4), .01, a=0)], z=11)
art('tally42', 'TallySheet', L(42, .6), None, [K(L(43), 1.4, 'inOut', fx_y=-1100), K(L(43, 1.4), .01, a=0)], ink=False, x=520, y=700, w=260, h=330, n=37, red=0, rot=-6, draw=1, enter='focus', z=13)
# L43 — the camera tilts down to a shingle beach: a 15-inch gun fires a shell at tissue paper; it comes back at us
art('beach43', 'ShellAndTissue', L(43), None, [K(L(43), 1.4, 'inOut', fx_y=0), K(L(43, 1.8), 1.2, gun=1), K(L(43, 3.4), 1.4, 'out', smoke=1), K(L(43, 5.0), 8, 'linear', flutter=6)] + gone(L(44, .4), 'ink', 1.2, at=[960, 540]),
    ink=False, draw=1, y=800, gun=0, smoke=0, flutter=0, fx_y=1100, z=8)
trail('sh43', [[770, 486], [1100, 470], [1338, 600]], L(43, 4.6), 1.6, L(43, 6.3), col='#8C6E4A', w=0, r=0, ease='in', headArt='NavalShell', headProps={'s': .9, 'rot': 8})
art('shb43', 'NavalShell', L(43, 6.3), None, [K(L(43, 7.4), 2.0, 'in', x=960, y=600, s=7, rot=200), K(L(44), .01, a=1)] + gone(L(44, .3), 'ink', 1.4, at=[960, 560]), ink=False, x=1330, y=600, s=.9, rot=180, z=30)
ripple('rp43', [1410, 600], L(43, 6.3), r=200, col='#2B1D12')
text('q43', '“a 15-inch shell at a piece of tissue paper”', 'plate', 960, 120, L(43, 9.4), L(44, .2), size=40)
text('q43b', '— Rutherford, 1936', 'plate', 1300, 175, L(43, 9.8), L(44, .2), size=30)
sfx(43, 3.4, FX + 'impact_bass_drop_1.wav', -16); sfx(43, 6.3, FX + 'impact_soft_2.wav', -20); sfx(43, 7.4, FX + 'motion_whoosh_deep_1.wav', -18)
# L44 — the shell's round nose becomes the atom: the pudding dissolves, a bright point is left at the centre
art('at44', 'NuclearAtom', L(44, .2), None, [K(L(44, 1.6), 1.4, pudding=0), K(L(44, 3.0), 1.0, point=1), K(L(44, 6.0), .8, glint=1), K(L(44, 6.8), .8, glint=0)] + gone(L(45), 'ink', 1.2, at=[960, 540]),
    inkdur=1.2, cx=960, cy=540, r=380, pudding=1, point=0, haze=0, ps=2.4, z=12)
text('pl44', '+', 'figure', 1010, 500, L(44, 4.6), L(45), size=70)
ripple('rp44', [960, 540], L(44, 6.0), r=420, col='#B8862B')
sfx(44, 3.0, FX + 'cue_reveal_1.wav', -22)
# L45 — his desk at night is painted in: sums by lamplight; a curve sketched round a dot
art('desk45', 'RutherfordDesk', L(45), None, [K(L(45), 1.6, 'linear', dissolve=1, dissolveSeed=41), K(L(45, 1.6), 2.4, 'linear', sums=1), K(L(45, 4.4), 1.2, curve=1), K(L(45), 8, 'linear', flicker=6)] + gone(L(46, 1.0), 'ink', 1.0, at=[1000, 640]),
    ink=False, draw=1, x=960, y=700, s=1, sums=0, curve=0, dissolve=0, z=8)
quill('q45', [[680, 530], [820, 556], [960, 580], [760, 610], [900, 640]], L(45, 1.6), L(45, 4.2))
sfx(45, 1.6, SK + 'S-01_pen-1-cc0.wav', -22)
# L46 — the sketched curve grows out of the page into the true fan of paths round one nucleus
NUC = (1060, 540)
def ruth_path(b, d=110.0, x0=-60.0, x1=2000.0):
    """α path past a point charge (repulsive Coulomb), integrated: start far left at height b, speed 1."""
    x, y, vx, vy, pts, dt = x0, NUC[1] + b, 1.0, 0.0, [], 1.0
    k = d / 2   # strength so that head-on closest approach = d (px)
    for _ in range(8000):
        rx, ry = x - NUC[0], y - NUC[1]; r = math.hypot(rx, ry); a = k / (r * r) if r > 1 else 0
        vx += a * rx / r * dt; vy += a * ry / r * dt; x += vx * dt; y += vy * dt
        pts.append((x, y))
        if x < x0 - 5 or x > x1 or y < -80 or y > 1160: break
    return 'M' + ' L'.join(f'{p[0]:.1f} {p[1]:.1f}' for p in pts[::8])
FAN = [ruth_path(b) for b in (-420, 320, -220, 160, -110, 80, -55, 35, -20, 10, .3, -280, 200, -140)]
art('at46', 'NuclearAtom', L(46, .2), None, [K(L(46, .2), 1.4, 'out', fx_s=1)] + gone(L(47, .3), 'ink', 1.0), ink=False, draw=1, cx=NUC[0], cy=NUC[1], r=430, point=1, haze=0, dots=.35, fx_s=.2, fx_ox=1000, fx_oy=640, z=12)
stream('st46', FAN, L(46, 1.2), L(47, .2), L(47, .8), every=.42, dur=2.4, r=6.5, tail=.16, trace=1.5)
text('l46', 'one came straight back', 'label', 420, 260, L(46, 5.6), L(47, .2), to=[860, 535], size=40)
# L47 — a path leaves the fan and lays itself down as the formula's curve; the real 1913 counts land on it
CURVE = "M330 260 Q420 520 620 640 Q900 760 1520 780"
ent('tl47', 'shape', {'form': FAN[8], 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'erase': 0, 'a': 0, 'col': '#D2643E', 'sw': 3}, [K(L(47), .01, a=1), K(L(47), 1.6, 'inOut', form=CURVE), K(L(47, 1.8), .6, a=0)], z=30)
art('gr47', 'ScatterGraph', L(47, .6), None, [K(L(47, 1.4), 1.0, curve=1), K(L(47, 2.4), 4.4, 'linear', pts=11)] + gone(L(48), 'right', 1.2), inkdur=1.0, x=900, y=540, w=1120, h=620, curve=0, pts=0, z=12)
text('ax47', 'scintillations a minute (gold)', 'plate', 900, 170, L(47, 1.6), L(48), size=32)
text('p47', 'Geiger & Marsden, 1913 — their counts', 'plate', 900, 990, L(47, 5.0), L(48), size=34)
art('tb47', 'DocumentPage', L(47, 3.0), None, gone(L(48), 'right', 1.2), ink=False, src=ST + 'D-05-x5_geiger-marsden-1913-p610-table2-pd.jpg', x=1700, y=330, w=300, h=470, rot=4, draw=1, enter='bleed', z=20)
# ======================================================================== CLUE IV — THE PEA IN THE STADIUM
text('t48', 'Clue IV · An Empty Stadium', 'title', 960, 190, L(48, .6), L(49, .5), size=56, width=1500)
# L49 — the real 1911 paper unrolls; beside it the atom, all its weight flowing into one point: the nucleus
art('d49', 'DocumentPage', L(49), None, [K(L(49), 1.6, 'linear', unroll=1), K(L(49, 1.8), 1.4, circleK=1)] + gone(L(50, .4), 'left', 1.2), ink=False, src=ST + 'D-02_rutherford-1911-p669-pd.jpg', x=520, y=560, w=520, h=865, rot=-2,
    circle=[.5, .085, .95, .07], circleK=0, draw=1, unroll=0, fx_box=[260, 120, 520, 880], z=20)
art('at49', 'NuclearAtom', L(49, 3.0), None, [K(L(49, 3.4), 2.4, 'out', flow=1), K(L(49, 3.6), 1.2, point=1), K(L(49, 8.8), .8, glint=1), K(L(49, 9.6), .8, glint=0),
    K(L(50), 1.6, 'inOut', cx=960, cy=540)], inkdur=1.2, cx=1360, cy=540, r=320, flow=0, point=0, haze=0, z=12)
text('pl49', '+', 'figure', 1400, 500, L(49, 5.6), L(50), size=64)
text('n49', 'nucleus', 'label', 1640, 260, L(49, 7.2), L(50), to=[1368, 532], size=44)
# L50 — the camera falls back from the nucleus through emptiness until the electrons' haze appears far out
G('at49')['keys'] += [K(L(50, .1), .01, r=30000), K(L(50, .1), 1.0, 'in', r=6000), K(L(50, 1.1), 1.0, 'linear', r=1500), K(L(50, 2.1), 1.1, 'out', r=380), K(L(50, 3.0), 1.4, haze=1), K(L(50, 5.6), 3, 'linear', swirl=.6)]
text('n50', 'nothing', 'note', 960, 760, L(50, 4.6), L(51, .4), size=70)
# L51 — the haze tightens into hydrogen's single electron cloud
ent('hy51', 'shape', {'form': circ(960, 540, 380), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'col': '#B8862B', 'sw': 4}, [K(L(51), .01, a=1), K(L(51), 1.6, 'inOut', form="M640 540 Q640 230 960 210 Q1300 230 1290 560 Q1280 860 960 870 Q650 850 640 540Z"), K(L(51, 2.2), .8, a=0)], z=30)
G('at49')['keys'] += [K(L(51), 1.6, 'inOut', r=330), K(L(51, .8), 1.4, haze=.18, one=1), K(L(51, 3.2), 2, 'linear', swirl=1.4), K(L(51, 8.0), 2, 'linear', swirl=2.2), K(L(52, .2), 1.0, one=0)]
text('h51', 'hydrogen', 'title', 960, 120, L(51, 1.8), L(52, .2), size=56)
text('h51a', 'one proton', 'label', 1500, 420, L(51, 5.0), L(52, .2), to=[968, 536], size=38)
text('h51b', 'one electron', 'label', 420, 900, L(51, 6.6), L(52, .2), to=[700, 760], size=40)
# L52 — a gold ruler runs across; a counter runs to ×100,000 while the nucleus stays a point
shape('ru52', "M630 540 L1290 540 M630 525 L630 555 M1290 525 L1290 555", L(52), L(53), dur=1.4, col='#B8862B', sw=4)
counter('c52', '× {n}', 960, 130, L(52, 1.4), L(53), [K(L(52, 1.4), 2.6, 'out', num=100000)], size=110)
shape('tk52', "M960 515 L960 565", L(52, 3.4), L(53), dur=.6, col='#D2643E', sw=4)
text('w52', 'the atom', 'plate', 960, 610, L(52, 1.2), L(53), size=32)
G('at49')['keys'] += [K(L(52, 5.8), .8, glint=1), K(L(52, 6.6), .6, glint=0)]
# L53 — the atom's circle becomes an oval opening onto an empty stadium; the nucleus becomes a pea on the centre spot
G('at49')['keys'] += [K(L(53, 2.4), 1.0, ring=0, haze=0), K(L(53, 3.6), .8, point=0), K(L(53, 4.4), .01, a=0)]
OV = [circ(960, 540, 330), ellp(960, 560, 700, 420), rectp(-60, -60, 2040, 1200)]
STAD = {'id': 'stad53', 'type': 'art', 'props': {'name': 'EmptyStadium', 'cx': 960, 'cy': 600, 's': 1, 'draw': 0, 'rise': 0, 'pea': 0, 'dusk': 0, 'flame': 0, 'breath': 0},
        'keys': [K(L(53), 1.6, 'out', draw=1), K(L(53, 2.0), 1.6, 'out', rise=1), K(L(53, 3.6), 1.0, pea=1),
                 K(L(55), 1.6, dusk=1), K(L(55, 1.8), 1.0, flame=1), K(L(55, 3.6), 1.6, breath=1)]}
ent('win53', 'group', {'a': 0, 'clipForm': OV[0], 'fx_s': 1, 'fx_ox': 960, 'fx_oy': 600},
    [K(L(53), .01, a=1), K(L(53, .2), 1.4, 'inOut', clipForm=OV[1]), K(L(53, 1.8), 1.6, 'inOut', clipForm=OV[2]), K(L(53, 3.5), .01, clipForm=None),
     K(L(53, 5.0), 2.0, 'inOut', fx_s=1.12, fx_y=-30),
     K(L(54), 1.8, 'inOut', fx_s=1.9, fx_y=420), K(L(55), 1.8, 'inOut', fx_s=1, fx_y=0),
     K(L(56), 1.6, 'in', fx_s=40, fx_y=0), K(L(56, 1.4), .3, a=0)], children=[{'id': 'pap53', 'type': 'art', 'props': {'name': 'Sky', 'kind': 'day', 'seed': 'stad', 'a': 1}, 'keys': [K(L(55), 1.6, kind='dusk')]}, STAD], z=12)
ent('rim53', 'shape', {'form': OV[0], 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'col': '#B8862B', 'sw': 9}, [K(L(53), .3, a=1), K(L(53, .2), 1.4, 'inOut', form=OV[1]), K(L(53, 1.8), 1.6, 'inOut', form=OV[2]), K(L(53, 3.3), .4, a=0)], z=13)
text('pea53', 'a pea', 'label', 1360, 330, L(53, 6.4), L(54), to=[966, 596], size=44)
text('st53', 'the atom, as big as a stadium', 'plate', 960, 1010, L(53, 5.2), L(54), size=36)
# L54 — rise to the top rows: specks of dust drift there, the bowl below is empty
ent('dust54', 'particles', {'kind': 'photons', 'n': 46, 'box': [80, 60, 1760, 380], 'k': 0, 'a': 1, 'speed': .5}, [K(L(54, 1.6), 1.6, k=1), K(L(55, 4), 1.2, a=0)], z=20)
trail('sp54', [[200, 330], [500, 220], [960, 190], [1420, 220], [1720, 330]], L(54, 3.2), 2.4, L(55), col='#2B1D12', w=0, r=6, ease='inOut')
text('e54', 'electrons: specks of dust', 'label', 960, 560, L(54, 6.6), L(55, .4), to=[960, 250], size=44)
text('e54b', 'empty', 'note', 960, 820, L(54, 5.0), L(55, .4), size=70)
# L55 — dusk: a flame and a breath at the rim among the specks; the pea at the centre sits still
flash('fl55', [[L(55, 5.4), 360, 380, 4], [L(55, 5.7), 1560, 380, 4], [L(55, 6.1), 900, 250, 4]], col='#FFF4D2', glow='#F7D98C')
spot('sp55', [960, 600], 110, L(55, 7.2), L(56))
trail('sp55b', [[1600, 360], [1700, 470], [1640, 600]], L(55, 8.8), 1.6, L(56), col='#2B1D12', w=1, r=4)
text('l55', 'flame, breath: out at the edges', 'plate', 960, 1010, L(55, 2.4), L(56), size=40, col='#F3E7CC', light=True)
# L56 — dive into the pea: a cluster of two kinds of bead; James Chadwick's real portrait beside it
art('nb56', 'NucleusBeads', L(56, 1.2), None, [K(L(56, 1.2), 1.8, 'out', k=1), K(L(56, 6.2), .8, glint=1), K(L(56, 7.0), .8, glint=0)], ink=False, cx=820, cy=540, r=280, k=0, draw=1, z=14)
art('ch56', 'CabinetCard', L(56, 3.2), None, [K(L(56, 3.2), 1.4, 'glide', fx_x=0)], ink=False, src=ST + 'P-05_chadwick-1943-pd.jpg', x=1500, y=470, w=320, h=430, rot=3, caption='James Chadwick', draw=1, fx_x=140, z=20)
text('p56', '1932: the neutron', 'plate', 1500, 800, L(56, 4.8), L(57, .2), size=40)
text('n56a', 'protons', 'label', 400, 220, L(56, 5.2), L(57, .2), to=[700, 400], size=34)
text('n56b', 'neutrons', 'label', 400, 900, L(56, 5.6), L(57, .2), to=[720, 700], size=34)
# ======================================================================== THE TWIST
WHIP = [K(L(57), 1.0, 'expo', fx_x=-2000), K(L(57, 1.0), .01, a=0)]
G('nb56')['keys'] += WHIP; G('ch56')['keys'] += WHIP
art('hand57', 'ViewerHand', L(57), None, [K(L(57), 1.0, 'expo', fx_x=0), K(L(57, 1.2), 1.4, 'soft', open=1), K(L(58), 1.6, 'in', fx_s=9), K(L(58, 1.4), .4, a=0)], ink=False, draw=1, x=960, y=380, s=1, open=.2, mode='palm', fx_x=2000, fx_ox=960, fx_oy=560, z=12)
sfx(57, 0, FX + 'motion_whoosh_long_1.wav', -24)
# L58 — down through the skin: ridges, cells, molecules, one atom
art('dive58', 'PalmDive', L(58, .8), None, [K(L(58, 1.6), 1.4, 'inOut', z=1), K(L(58, 3.0), 1.6, 'inOut', z=2), K(L(58, 4.6), 1.6, 'inOut', z=3), K(L(59), 1.2, 'inOut', fx_y=-1100), K(L(59, 1.2), .01, a=0)],
    ink=False, draw=1, cx=960, cy=540, z=0, enter='bleed')
W[-1]['z'] = 10; W[-1]['props']['z'] = 0
text('d58a', 'skin', 'label', 300, 160, L(58, 1.6), L(58, 3.0), size=36); text('d58b', 'cells', 'label', 300, 160, L(58, 3.2), L(58, 4.6), size=36)
text('d58c', 'molecules', 'label', 300, 160, L(58, 4.8), L(58, 6.2), size=36); text('d58d', 'one atom', 'label', 300, 160, L(58, 6.4), L(59), size=36)
text('q58', '?', 'note', 1500, 780, L(58, 7.8), L(59), size=140, width=200)
# L59 — tilt back up to the hand over an oak table; it presses down and stops at the surface
art('press59', 'ViewerHand', L(59), None, [K(L(59), 1.2, 'inOut', fx_y=0), K(L(59, 1.4), 1.4, 'inOut', press=1), K(L(59, 2.8), .8, tremble=2), K(L(59, 3.8), .8, tremble=0)] + gone(L(60, 1.4), 'ink', 1.0, at=[960, 640]),
    ink=False, draw=1, x=960, y=520, s=1, mode='press', press=0, gap=0, fx_y=1100, z=12)
# L60 — the light narrows to the line where they meet; magnified, two hazes of electrons push each other apart
spot('sp60', [960, 640], 220, L(60), L(60, 1.6))
art('cush60', 'ElectronCushion', L(60, 1.2), None, [K(L(60, 1.4), 1.6, k=1), K(L(60, 3.0), 1.8, 'inOut', push=1), K(L(60, 6.4), 1.0, push=.7)] + gone(L(61), 'ink', 1.2), ink=False, draw=1, cx=960, cy=540, k=0, push=0, iris=0, irisAt=[960, 640], z=14)
G('cush60')['keys'].insert(0, K(L(60, 1.2), 1.2, 'in', iris=1))
ripple('rp60', [960, 540], L(60, 6.2), r=300, col='#8C3424')
# L61 — the hand and table bleed back in; a thin gold gap glows between palm and wood and never closes
art('press61', 'ViewerHand', L(61), None, [K(L(61, 1.6), 1.2, gap=1), K(L(61, 3.2), 1.0, press=1.03, tremble=1.5), K(L(61, 4.4), .8, tremble=0)] + gone(L(62), 'ink', 1.2, at=[960, 640]),
    ink=False, draw=1, x=960, y=520, s=1, mode='press', press=1, gap=0, enter='bleed', z=12)
text('n61', 'never touched', 'note', 960, 300, L(61, 5.0), L(62, .2), size=70)
# L62 — the gap splits into two objects: a diamond and a gold ingot; an X-ray band shows their sparse atoms
art('dg62', 'DiamondAndIngot', L(62), None, [K(L(62), 1.4, 'out', fx_s=1), K(L(62, 2.6), 1.6, 'inOut', xray=1), K(L(62, 4.2), .8, glint=1)], inkdur=1.2, y=560, xray=0, glint=0, fx_s=.2, fx_ox=960, fx_oy=640, z=12)
text('l62a', 'diamond', 'plate', 580, 880, L(62, 1.6), L(63, .3), size=36); text('l62b', 'gold', 'plate', 1340, 760, L(62, 1.8), L(63, .3), size=36)
# L63 — their atoms fly up and settle as a standing human figure made only of sparse dots
ent('sw63', 'swarm', {'from': "M360 500 L800 500 L580 780Z M1080 680 L1600 680 L1540 500 L1140 500Z", 'to': "M960 150 C905 150 905 250 960 250 C1015 250 1015 150 960 150Z M890 290 L1030 290 L1110 540 L1080 550 L1020 400 L1030 600 L1015 980 L975 980 L960 650 L945 980 L905 980 L890 600 L900 400 L840 550 L810 540Z", 'n': 300, 'k': 0, 'arc': 260, 'size': 2.6, 'col': '#2B1D12', 'a': 0},
    [K(L(63), .3, a=1), K(L(63), 1.9, 'inOut', k=1), K(L(63, 2.0), .6, a=0)], z=40)
G('dg62')['keys'] += gone(L(63), 'ink', .8)
art('fig63', 'StippleFigure', L(63, 1.6), None, [K(L(63, 3.4), 1.8, 'inOut', spread=.55), K(L(63, 5.2), 1.2, lines=1), K(L(63, 5.2), 5, 'linear', flick=6), K(L(63, 7.0), 1.4, 'soft', turn=1)], ink=False, draw=1, x=960, y=1000, h=860, spread=0, lines=0, turn=0, flick=0, enter='bleed', z=14)
text('n63', 'held together by electric forces', 'plate', 1500, 900, L(63, 5.6), L(64, .2), size=36)
# ======================================================================== THE ANSWER
G('fig63')['keys'] += gone(L(64), 'ink', 1.2, at=[960, 235])
art('atom64', 'DottedAtom', L(64), None, [K(L(64), 1.6, 'inOut', cx=960, cy=540, r=300)], inkdur=1.0, cx=960, cy=235, r=62, turn=0, z=16)
text('q64', '?', 'note', 960, 560, L(64, 1.4), L(65, .6), size=160, width=300)
# L65 — the four clue medallions fly into the circle and become its parts
art('med65', 'ClueMedallions', L(65), None, [K(L(65, .2), 1.6, 'inOut', gather=1), K(L(65, 1.7), .3, a=0)], ink=False, x=960, y=930, r=80, gap=260, k1=1, k2=1, k3=1, k4=1, gather=0, tx=960, ty=540, tr=0, draw=1, enter='focus', z=18)
art('at65', 'NuclearAtom', L(65, 1.4), None, [K(L(65, 1.6), 1.0, point=1), K(L(65, 3.0), 1.4, haze=1), K(L(65, 6.2), .8, glint=1), K(L(65, 7.0), 1.6, 'in', fx_s=.04, fx_x=EYE[0] - 960, fx_y=EYE[1] - 540)] + gone(L(66, .3), 'ink', .5),
    ink=False, draw=1, cx=960, cy=540, r=300, point=0, haze=0, ring=1, fx_ox=960, fx_oy=540, z=16)
G('atom64')['keys'] += gone(L(65, 1.6), 'ink', .6)
text('l65', 'almost nothing', 'label', 1450, 260, L(65, 4.6), L(66), to=[1080, 470], size=44)
# L66 — the circle shrinks into the eyepiece in the dark room of the opening: Geiger and Marsden at the microscope
dark('night66', L(65, 7.0), L(68, .8), k=.96, dur=1.4, z=2)
art('lab66', 'ManchesterLab', L(65, 7.4), None, [K(L(67), 1.2, 'soft', blur=10, a=.3)] + gone(L(68), 'ink', 1.0), inkdur=1.6, dark=1, lamp=1, pool=560, enter='bleed', z=3)
art('app66', 'ScatterApparatus', L(65, 7.6), None, [K(L(67), 1.2, 'soft', blur=10, a=.3)] + gone(L(68), 'ink', 1.0), inkdur=1.4, x=820, y=630, s=1.3, mode='reflect', z=4)
stool('stool66', 1316, 1000, 150, L(66, .6), None, [K(L(67), 1.2, 'soft', blur=10, a=.3)] + gone(L(68), 'ink', 1.0), z=5)
person('mars66', 'Ernest Marsden', L(66, .8), None, [K(L(66, 7.0), 1.4, 'soft', pk=1), K(L(67), 1.2, 'soft', blur=10, a=.3)] + gone(L(68), 'ink', 1.0), x=1310, y=1000, h=560, facing=-1, pose='sitlook', pose2='sit', pk=0, z=6, **MARS)
person('geig66', 'Hans Geiger', L(66, 1.6), None, [K(L(67), 1.2, 'soft', blur=10, a=.3)] + gone(L(68), 'ink', 1.0), x=1720, y=1004, h=600, facing=-1, pose='stand', z=5, **GEIG)
art('tally66', 'TallySheet', L(66, 2.2), None, [K(L(66, 3.6), .4, n=31), K(L(67), 1.4, 'inOut', x=960, y=540, w=620, h=760, rot=-2), K(L(67, 1.4), 1.4, n=34), K(L(67, 3.2), .5, n=35), K(L(67, 5.0), 1.2, red=1)] + gone(L(68, .1), 'down', 1.2),
    ink=False, x=560, y=800, w=300, h=380, n=30, red=0, rot=5, draw=1, enter='bleed', z=8)
flash('fl66', [[L(66, 5.2), EYE[0] - 4, EYE[1], 4]])
# L67 — focus moves to the tally sheet; one more stroke, then the last one in red; a ring round it
shape('ring67', ellp(1150, 288, 46, 40), L(67, 6.4), L(68, 1.0), dur=.9, col='#D2643E', sw=4, z=62)
# ======================================================================== WHAT IT MEANS
# L68 — the camera tilts up off the bench past a power station, a hospital scanner and the Sun into a sky of stars
RISE = [K(L(68), 8.0, 'linear', fx_y=140)]
dark('sky68', L(68, 3.2), L(69, 1.4), k=.94, dur=2.4, z=6)
ent('sky68b', 'art', {'name': 'Sky', 'kind': 'night', 'seed': 'ea', 'a': 0}, [K(L(68, 4.0), 2.0, a=.85)] + gone(L(69, 1.4), 'ink', 1.2), z=7)
ent('stars68', 'art', {'name': 'Stars', 'n': 200, 'h': 1080, 'seed': 'ea', 'a': 0}, [K(L(68, 5.0), 1.6, a=1)] + gone(L(69, 1.6), 'ink', 1.2), z=8)
art('ct68', 'CoolingTowers', L(68, 1.2), None, [K(L(68, 1.2), 3, steam=1)] + RISE + gone(L(69), 'ink', 1.0), inkdur=1.2, x=380, y=900, s=.7, steam=0, fx_y=-140, z=10)
art('sc68', 'ScannerRing', L(68, 2.8), None, [K(L(68, 2.8), 5, 'linear', spin=1)] + RISE + gone(L(69), 'ink', 1.0), inkdur=1.2, x=960, y=560, s=.6, spin=0, fx_y=-140, z=10)
art('sun68', 'Sun', L(68, 4.4), None, RISE + gone(L(69), 'ink', 1.0, at=[1500, 260]), ink=False, x=1520, y=270, r=95, enter='bleed', fx_y=-140, z=10)
text('m68a', 'nuclear power', 'plate', 460, 1010, L(68, 2.2), L(68, 5.6), size=34, col='#F3E7CC', light=True)
text('m68b', 'medical scans', 'plate', 960, 800, L(68, 3.8), L(69), size=34, col='#F3E7CC', light=True)
text('m68c', 'the stars', 'plate', 1520, 450, L(68, 5.6), L(69), size=34, col='#F3E7CC', light=True)
# L69 — one star grows and becomes the dark field of the eyepiece; the last flash on the wrong side, ringed in red
art('zns69', 'ZincScreenField', L(69), None, [K(L(69), 1.6, 'in', iris=1), K(L(69), 9, 'linear', flicker=18), K(L(69, 7.8), 2.2, dim=.7)], ink=False, draw=1, cx=960, cy=540, r=420, glitter=.4, flicker=0, iris=0, irisAt=[1520, 300], z=14)
dark('night69', L(69, .4), None, k=.95, dur=1.2, z=9)
flash('fl69', [[L(69, 3.2), 620, 450, 10]], life=2.4)
ripple('rp69', [620, 450], L(69, 4.8), r=240, col='#B8F0C8')
shape('ring69', circ(620, 450, 52), L(69, 6.4), None, dur=1.0, col='#D2643E', sw=4, z=62)
ent('end', 'art', {'name': 'EndCard', 'k': 0, 'a': 0, 'ask': 'How else could you see the unseeable?', 'next': 'Fathom'}, [K('L69$+0.3', .01, a=1), K('L69$+0.3', 2.6, 'linear', k=1)], z=95)
sfx(69, 3.2, SK + 'S-01_glass-bell-cc0.wav', -22)
# the air of the room: a few motes through the lamplight over the whole film
ent('motes', 'particles', {'kind': 'dust', 'n': 22, 'k': 0, 'a': .7, 'speed': .5, 'para': .8}, [K(L(0), 3, k=1)], z=96)

E['world'] = W
for i, l in enumerate(E['lines']): l['sfx'] = SFX.get(i, [])
TLP = os.path.join(H, 'timeline.json'); LN = json.load(open(TLP))['lines'] if os.path.exists(TLP) else None
if LN and len(LN) != len(E['lines']): LN = None
E['thumb'] = {'t': 1, 'title': "What's inside an atom?", 'v': 'S', 'kicker': 'Manchester · 1909', 'lines': ["WHAT'S", 'INSIDE', 'AN ATOM?'], 'accent': 1, 'note': '1 in 8,000 came back.'}   # the standard poster (kit/ThumbPoster) + this film's hero: src/lib/empty-atom/thumb_more.tsx Standard
json.dump(E, open(EP, 'w'), indent=1, ensure_ascii=False)
if LN:
    T = json.load(open(TLP))
    for i, l in enumerate(T['lines']): l['sfx'] = SFX.get(i, [])
    json.dump(T, open(TLP, 'w'), indent=1)
    os.makedirs(os.path.join(H, '../../public/ep/empty-atom'), exist_ok=True)
    for f in ('episode.json', 'timeline.json'): shutil.copy(os.path.join(H, f), os.path.join(H, '../../public/ep/empty-atom', f))
print(len(W), 'entities →', EP)
