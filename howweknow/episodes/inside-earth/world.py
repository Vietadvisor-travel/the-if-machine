#!/usr/bin/env python3
"""inside-earth — the story world (engine v3): every line's shot plan → entities keyed to the narration (ENGINE.md time refs).
python3 episodes/inside-earth/world.py  → writes `world` (+ sfx, music) into episode.json. The drawings are src/lib/inside-earth/."""
import json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from rays import trace, scr
EP = os.path.join(H, 'episode.json'); E = json.load(open(EP))
ST = 'stock/_hwk/inside-earth/'; SM = ST + 'sm/'
W = []
OFF = 5   # v2: four hook lines come before the old line 0 (old indexes stay readable in this file; H() is absolute)
def H(i, off=0.0): return f'L{i}' if off == 0 else (f'L{i}+{off:g}' if off > 0 else f'L{i}{off:g}')
def L(i, off=0.0): return H(i + OFF, off)
def ent(id, type, props=None, keys=None, children=None, z=None):
    e = {'id': id, 'type': type, 'props': props or {}, 'keys': keys or []}
    if children: e['children'] = children
    if z is not None: e['z'] = z
    W.append(e); return e
def K(t, dur=1.2, ease=None, **p):
    k = {'t': t, 'dur': dur, **p}
    if ease: k['ease'] = ease
    return k
def life(t_in, t_out=None, ink=True, inkdur=1.6, fade=0.8, ease='out'):
    ks = [K(t_in, .01, a=1)]
    if ink: ks.append(K(t_in, inkdur, ease, draw=1))
    if t_out: ks.append(K(t_out, fade, a=0))
    return ks
def art(id, name, t_in, t_out=None, keys=(), ink=True, inkdur=1.6, fade=.8, z=None, **props):
    p = {'name': name, 'a': 0, **props}
    if ink: p.setdefault('draw', 0)
    return ent(id, 'art', p, life(t_in, t_out, ink, inkdur, fade) + list(keys), z=z)
def text(id, s, style, x, y, t_in, t_out=None, dur=1.2, keys=(), **kw):
    return ent(id, 'text', {'text': s, 'style': style, 'x': x, 'y': y, 'k': 0, 'a': 0, **kw}, [K(t_in, .01, a=1), K(t_in, dur, 'out', k=1)] + ([K(t_out, .8, a=0)] if t_out else []) + list(keys))
def person(id, who, t_in, t_out=None, keys=(), **p):
    return art(id, 'Person', t_in, t_out, keys, inkdur=1.8, who=who, **p)
def trail(id, pts, t_in, dur, t_out=None, col='#B8862B', w=2.6, r=6, ease='linear', dash=False, keys=()):
    return ent(id, 'trail', {'points': [{'screen': p} for p in pts], 'k': 0, 'a': 0, 'col': col, 'w': w, 'r': r, 'dash': dash},
               [K(t_in, .01, a=1), K(t_in, dur, ease, k=1)] + ([K(t_out, .8, a=0)] if t_out else []) + list(keys))
def ripple(id, at, t, r=160, n=4, dur=1.6, col='#8C3424', a=1):
    return ent(id, 'ripple', {'at': {'screen': at}, 'k': 0, 'n': n, 'r': r, 'col': col, 'a': a}, [K(t, dur, 'out', k=1)])
def rays(ps, cx=960, cy=540, r=420, s=False, inner=True, rot=0):
    out = []
    for p in ps:
        a = trace(p, s=s, inner=inner); out.append(scr(a['pts'], cx, cy, r, rot))
    return out
SFX = {}
def sfx(i, at, f, db=-20): SFX.setdefault(i + OFF, []).append({'at': at, 'file': f, 'db': db})
C = (960, 540, 420)   # the planet's standard place on the page

ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'push': 1, 'pan_x': 0, 'pan_y': 0})
# ================================================================ HOOK (v2) — from your feet down to the white-hot core (H0–H2), back out to the
# whole planet (H3), the detective story announced (H4); the planet's outline becomes the episode's title card (the gap before L5)
RE_ = 6371
ZD, YC = .3, 540                                    # the dive ends with the centre on screen at 0.3 px/km (inner core ≈ 733 px across)
ZE = 430 / RE_                                      # …the pull ends with the planet exactly the size of the title card's dial (a match)
ent('hook', 'art', {'name': 'EarthSection', 'ax': 960, 'ay': 800, 'zoom': .55, 'layers': 4, 'inner': 1, 'liquid': .7, 'heavy': 0, 'glow': 0, 'sparks': 0, 'draw': 1, 'a': 0, 'blur': 14},
    [K(H(0), .01, a=1), K(H(0), 1.6, 'soft', blur=0),
     K('L0@beneath', 7.2, 'inOut', ay=YC - RE_ * ZD), K('L0@beneath', 7.2, 'inOut', zoom=ZD),
     K('L0@iron', 2.4, glow=.9), K('L0@Sun', 2, sparks=1),
     K(H(1), 1.5, 'sine', glow=.6), K(H(1, 1.8), 1.5, 'sine', glow=1), K(H(2), 1.2, glow=.8),
     K(H(3), 3.0, 'inOut', ay=540 - 430), K(H(3), 3.0, 'inOut', zoom=ZE), K(H(3), 1.6, sparks=0, glow=.35),
     K(H(5, -4.6), 2.0, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(H(5, -2.5), .01, a=0)], z=2)
ent('hookembers', 'particles', {'kind': 'embers', 'n': 50, 'box': [560, 140, 800, 800], 'k': 0, 'a': 1}, [K('L0@Sun', 2, k=1), K(H(3), 1.2, k=0)], z=3)
DIVE = [K('L0@beneath', 7.2, 'inOut', fx_y=YC - RE_ * ZD - 800)]
person('listener', 'a person standing on the ground (the viewer)', H(0), None, DIVE + [K('L0@beneath+1.5', 1.2, a=0)],
       x=960, y=802, h=120, facing=1, pose='stand', costume='listener2026', hairCol='#3A2A1E', face={'nose': .3, 'brow': .4, 'chin': .3, 'build': 1}, skin=.4, fx_y=0, z=3)
text('hk_feet', 'beneath your feet', 'note', 1180, 700, H(0, .4), 'L0@five', size=46, keys=DIVE)
text('hk_5000', 'more than 5,000 km down', 'note', 1260, 380, 'L0@five', 'L0@iron', size=50)
text('hk_seen', 'never seen', 'note', 480, 230, H(1, .2), H(2), size=68, rot=-4)
text('hk_touch', 'never touched', 'note', 1440, 860, 'L1@touched', H(2, .3), size=68, rot=3)
ent('hk_diam', 'trail', {'points': [{'screen': [594, 540]}, {'screen': [1326, 540]}], 'k': 0, 'a': 0, 'col': '#B8862B', 'w': 3, 'r': 6},
    [K('L2@big', .01, a=1), K('L2@big', 1.4, 'glide', k=1), K(H(3), .8, a=0)], z=5)
text('hk_2400', 'about 2,400 km across', 'note', 960, 160, 'L2@big', H(3, .2), size=72)
text('hk_5400', 'about 5,400 °C', 'note', 470, 930, 'L2@hot', H(3, .2), size=72)
text('hk_iron', 'iron and nickel', 'note', 1450, 930, 'L2@made', H(3, .2), size=72)
text('hk_how', 'How can we possibly know?', 'title', 960, 105, H(3, .6), H(4, .4), size=54)
# H4 — a detective story: four sealed clue medallions settle round the planet (their contents stay hidden until each clue opens)
for j, (x, y) in enumerate([(330, 260), (1590, 260), (330, 820), (1590, 820)]):
    art(f'hk_med{j}', 'ClueMedallion', H(4, .6 + j * .45), H(5, -4.8), [K(H(4, .6 + j * .45), 1.4, 'glide', fx_s=1)], inkdur=.9, x=x, y=y, r=110, kind='sealed', n=j + 1, fx_s=.6, fx_box=[x - 120, y - 120, 240, 240])
text('hk_det', 'a detective story', 'note', 960, 1010, 'L4@detective', H(5, -4.8), size=52)
# the title card: the dial is engraved round exactly where the planet was, the question written inside it
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'What is inside\nthe Earth?', 'sub': 'a story in four clues', 'a': 0},
    [K(H(5, -4.9), .01, a=1), K(H(5, -4.9), 4.4, 'linear', k=1), K(H(5, -1.2), 1.8, 'linear', dissolve=0, dissolveDir='down'), K(H(5, .7), .01, a=0)], z=60)
hsfx = lambda i, at, f, db=-20: SFX.setdefault(i, []).append({'at': at, 'file': f, 'db': db})
hsfx(0, 2.0, 'public/sfx/real_metal_groan_1.wav', -30)
# ================================================================ COLD STORY — Kola, polar night (L0–L7)
ent('night', 'art', {'name': 'Sky', 'kind': 'night', 'seed': 'kola', 'a': 0, 'fx_y': 300, 'dissolve': 0},
    [K(L(0, -1.3), .01, a=1), K(L(0, -1.3), 2.0, 'linear', dissolve=1, dissolveDir='down'), K(L(0), 1.4, 'out', fx_y=0), K(L(0, 5), 3.5, 'inOut', fx_y=-900), K(L(1, 2), .8, a=0),
     K(L(73), .01, a=1, fx_y=0, wipe=0, wipeDir='right'), K(L(73), 1.4, 'inOut', wipe=1), K(L(74, .4), 3, 'inOut', fx_y=-900), K(L(74, 3.4), .6, a=0)])
ent('stars', 'art', {'name': 'Stars', 'n': 160, 'h': 620, 'seed': 'kola', 'a': 0},
    [K(L(0, .6), 2, a=1), K(L(0, 5), 3.5, 'inOut', fx_y=-900), K(L(1, 2), .8, a=0), K(L(73), .01, a=1, fx_y=0, wipe=0, wipeDir='right'), K(L(73), 1.4, wipe=1), K(L(74, .4), 3, fx_y=-900), K(L(74, 3.4), .6, a=0)])
arctic = [K(L(0), 1.4, 'out', fx_y=0), K(L(0, 5), 3.5, 'inOut', fx_y=-900), K(L(1, 2), .8, a=0)]
art('tundra', 'KolaTundra', L(0), None, arctic + [K(L(73), .01, a=1, fx_y=0, wipe=0, wipeDir='right'), K(L(73), 1.4, wipe=1), K(L(74, .4), 3, fx_y=-900), K(L(74, 3.4), .6, a=0)], inkdur=1.4, y=800, fx_y=300)
art('rig', 'KolaRig', L(0, 1.0), None, arctic + [K(L(73), .01, a=1, fx_y=0, fx_s=.45, wipe=0, wipeDir='right'), K(L(73), 1.4, wipe=1), K(L(74, .4), 3, fx_y=-900), K(L(74, 3.4), .6, a=0)],
    inkdur=2.2, x=1180, y=800, s=1.0, lit=1, fx_y=300, fx_box=[0, 0, 1920, 1080], fx_oy=800)
DRILLER = {'costume': 'kolaDriller', 'face': {'nose': .3, 'brow': .5, 'chin': .2, 'build': 1.1}, 'hairCol': '#231A16'}
person('drill1', 'a Soviet driller at SG-3 (generic)', L(0, 2.6), L(1, 2), arctic, x=780, y=800, h=110, facing=1, pose='stand', skin=.3, **DRILLER)
person('drill2', 'a Soviet driller at SG-3 (generic)', L(0, 2.9), L(1, 2), arctic, x=850, y=802, h=106, facing=-1, pose='point', skin=.35, **DRILLER)
ent('snow', 'particles', {'kind': 'snow', 'n': 90, 'k': 0, 'a': 1, 'speed': .6}, [K(L(0, 3), 2, k=1), K(L(0, 6), 2, a=0), K(L(73), .01, a=1), K(L(74, 1), 1, a=0)])
sfx(0, 1.0, 'public/stock/_hwk/inside-earth/S-01_drill-take1-pd.wav', -26); sfx(0, 0.2, 'public/sfx/real_snow_wind_2.wav', -24)
# the borehole in section, true depth (70 px/km while we ride down; 18 px/km for the crust's base; then the pull to the whole planet)
BH = {'w': 2000, 'ax': 960, 'ay': 1100, 'zoom': 70, 'depth': 0, 'heat': 0, 'sag': 0, 'target': 0, 'moho': 40}
bhk = [K(L(0, 5), 3.5, 'inOut', ay=200),
       K(L(1), 4.6, 'linear', depth=12.26), K(L(1), 4.6, 'linear', ay=-158),
       K(L(2, .5), 2, 'out', heat=1), K(L(2, 3.5), 2.5, 'inOut', sag=1),
       K(L(3), 2.2, 'inOut', zoom=18, ay=150), K(L(3, 1.2), 1.6, 'inOut', target=1),
       K(L(5), 3.8, 'inOut', zoom=.0659), K(L(5), 3.8, 'inOut', ay=120)]
art('bore', 'KolaBorehole', L(0, 4.6), L(6), bhk, inkdur=1.4, **BH)
text('yr0', '1970', 'note', 1010, 700, L(1, .3), L(1, 3.4), size=56)
text('yr1', '1989', 'note', 1010, 700, L(1, 3.6), L(2, 1), size=56)
art('core4', 'Pinned', L(1, 3.0), L(2, 2.5), [K(L(1, 3), .9, 'bounce', fx_y=0)], ink=False, src=SM + 'P-04_drill-core-box-dpla-pd.jpg', x=1540, y=380, w=440, h=350, rot=3, caption='a drill core in its box (deep drilling)', draw=1, fx_y=-500)
ent('heat', 'particles', {'kind': 'embers', 'n': 40, 'box': [760, 560, 400, 300], 'k': 0, 'a': 1}, [K(L(2, .4), 1.5, k=1), K(L(3), 1, a=0)])
text('goal', 'the base of the crust', 'label', 1300, 760, L(3, 1.6), L(5), to=[1240, 870], align='left')
text('stamp', '12,262 m', 'stamp', 1120, 380, L(4, .2), L(5, .6), dur=.5, size=44)
sfx(4, .2, 'public/sfx/impact_metal_2.wav', -22)
# the planet in section — the film's central figure (ax/ay/zoom for the true-scale pull, then cx/cy/r)
EK = [K(L(5), 3.8, 'inOut', zoom=.0659), K(L(5), 3.8, 'inOut', ay=120), K(L(5, 1.4), 2.2, 'out', draw=1), K(L(5, 1.4), .01, a=1)]
earth = ent('earth', 'art', {'name': 'EarthSection', 'ax': 960, 'ay': 150, 'zoom': 18, 'layers': 1, 'inner': 1, 'draw': 0, 'a': 0, 'fx_box': [540, 120, 840, 840]}, EK, z=40)
EK += [K(L(6, 3.2), .01, zoom=None, cx=960, cy=540, r=420)]
text('hairline', 'the deepest hole: a hairline', 'label', 1260, 90, L(5, 3.0), L(6, 3), to=[962, 122], align='left')
trail('radius', [[960, 120], [960, 540]], L(6), 2.4, L(8), col='#B8862B', w=4, r=7)
text('r6371', '6,371 km', 'note', 990, 330, L(6, 2.4), L(8), align='left', size=58)
for i, (x, y, sz) in enumerate([(860, 420, 120), (1060, 560, 90), (930, 680, 70)]):
    text(f'q{i}', '?', 'note', x, y, L(7, 1.4 + i * .5), L(9), size=sz, keys=[K(L(7, 2), 1, breathe=1)], width=200)
# ================================================================ THE STAKES (L8–L10)
EK += [K(L(8), 1.2, 'inOut', fx_s=.5, fx_y=-250), K(L(8, 4.6), .8, fx_y=-240)]
art('tools', 'FailedTools', L(8), L(9, .6),
    [K(L(8), 1.0, 'back', fx_x=0), K('L13@dig', .6, snap=1), K('L13@see', 1, dim=1), K('L13@probe', 1.6, melt=1), K(L(8, 4.6), 1, tear=0)],
    inkdur=1, x=960, y=760, s=.8, fx_x=1400, tear=1, fx_box=[520, 480, 880, 460])
EK += [K(L(9), 1.4, 'inOut', fx_s=1, fx_y=0), K('L14@thin', 1.4, layers=1.2), K('L14@mantle', 1.6, layers=2), K('L14@ocean', 1.6, layers=3, liquid=.4), K('L14@solid', 1.4, layers=4), K('L14@Sun', 2, glow=.7)]
for i, (nm, w, ang, rad) in enumerate([('crust', 'L14@thin', -40, 1.0), ('mantle', 'L14@mantle', -25, .8), ('liquid outer core', 'L14@ocean', -10, .38), ('solid inner core', 'L14@solid', 8, .1)]):
    import math
    tx, ty = 960 + 420 * rad * math.cos(math.radians(ang)), 540 + 420 * rad * math.sin(math.radians(ang))
    text(f'lay{i}', nm, 'label', 1480, 250 + i * 130, w, L(10, .5), to=[round(tx), round(ty)], align='left', size=40)
text('hot', 'as hot as the Sun’s surface', 'plate', 600, 990, 'L14@Sun', L(10, .5), size=34)
EK += [K(L(10, .2), 1.2, crack=1), K(L(10, 3), 1, glow=0)]
ent('quill1', 'hand', {'at': {'screen': [962, 124]}, 's': .7, 'a': 0}, [K(L(10), .3, a=1), K(L(10, 1.4), .4, a=0)])
ripple('rp10', [960, 120], L(10, 1.6), r=260)
ripple('rp10b', [960, 120], L(10, 3.0), r=380)
# ================================================================ CLUE 1 — THE WEIGHT (L11–L22)
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'The Weight', 'a': 0},
    [K(L(11), .01, a=1), K(L(23), .01, n=2, label='The Ringing Planet'), K(L(35), .01, n=3, label='The Missing Wave'), K(L(48), .01, n=4, label='A Ghost in the Shadow'), K(L(68), .6, a=0)])
EK += [K(L(11), 1.2, 'in', iris=0, irisAt=[960, 540])]
text('t1', 'Clue I · The Weight of the World', 'title', 960, 160, L(11), L(12, .8), size=58)
art('weight1', 'GreatBalance', L(11, .4), L(12, .6), [K(L(11, .4), 1, 'bounce', fx_y=0)], inkdur=1, x=960, y=900, s=.7, fx_y=-300)
ent('daysky', 'art', {'name': 'Sky', 'kind': 'day', 'seed': 'clap', 'a': 0, 'unroll': 0}, [K(L(12), .01, a=1), K(L(12), 1.6, unroll=1), K(L(13), 1, a=0)])
art('house', 'CavendishHouse', L(12), L(13, .4), [K(L(12), 1.6, unroll=1)], inkdur=2, x=1080, y=900, s=1.15, unroll=0)
CAV = {'costume': 'cavendish1798', 'face': {'nose': .7, 'brow': .3, 'chin': .1, 'age': .7, 'build': .95}, 'skin': .22}
person('cav', 'Henry Cavendish (1798)', L(12, 1.8), L(13, .4), [K(L(12, 1.8), 4, 'linear', x=640, walk=2.2), K(L(12, 5.8), .01, walk=None)], x=420, y=1010, h=430, facing=1, walk=0, **CAV)
art('cavcard', 'CabinetCard', L(12, 3.4), L(13, .6), [K(L(12, 3.4), 1, 'back', fx_x=0)], ink=False, src=SM + 'P-08_henry-cavendish-aquatint-wellcome-ccby.jpg', x=1660, y=330, w=230, h=330, rot=4, caption='Henry Cavendish', draw=1, fx_x=500)
art('scale', 'GreatBalance', L(13, .2), 'L18@lead', [], inkdur=1.2, x=620, y=980, s=.75)
ent('bigearth', 'planet', {'kind': 'earth', 'x': 620, 'y': 360, 'size': 560, 'lon': -10, 'lat': 30, 'draw': 0, 'a': 0}, [K(L(13, .6), .01, a=1), K(L(13, .6), 1.6, draw=1), K(L(13, .6), 6, lon=40), K('L18@lead', 1, a=0)])
art('lead', 'LeadPair', 'L18@lead', L(14, .8), [K('L18@attracts', 1.6, pull=1)], inkdur=1.2, x=1060, y=560, s=1.1, pull=0)
art('torsion', 'TorsionBalance', L(14, .9), L(15, 1.0), [K(L(14), .01, iris=0, irisAt=[960, 600]), K(L(14), 1.2, iris=1), K('L19@heavy', 2, big=1), K(L(15), 1, fx_s=.35, fx_x=380, fx_y=-100)], inkdur=2.4, x=960, y=640, s=.95, big=0, iris=0, irisAt=[960, 600])
art('scope', 'WallTelescope', L(15), L(16, .5), [K(L(15), 1, 'back', fx_x=0)], inkdur=1.4, x=1180, y=700, s=1, fx_x=700)
person('cav2', 'Henry Cavendish at his telescope', L(15, .6), L(16, .5), [K(L(15, 1.4), 1.4, pk=1)], x=935, y=1060, h=540, facing=1, pose='stand', pose2='look', pk=0, **CAV)
art('vern', 'IvoryVernier', L(16), L(17, 1.6), [K(L(16), 1.2, iris=1), K(L(16, 2.6), 3, 'linear', pos=.5), K(L(17), 1.8, 'in', fx_s=.04, a=0)], inkdur=1, x=960, y=540, r=360, pos=0, iris=0, irisAt=[960, 540], fx_box=[600, 180, 720, 720], tremble=1.2)
art('pull16', 'LeadPair', L(16, 1.0), L(16, 5.5), [K(L(16, 1.0), 1.6, pull=1)], inkdur=.8, x=1500, y=880, s=.35, pull=0)
art('bal2', 'GreatBalance', L(17, 1.5), L(20, .3), [K(L(18), 1.2, fx_x=-380), K(L(19, .3), .01, left='rock'), K(L(19, .9), 1.2, 'back', tilt=14), K(L(20), 1.4, core=1), K(L(20, 1.2), 1, fx_s=.6)],
    inkdur=1.6, x=960, y=1000, s=1.05, right='earth', left='none', tilt=0, core=0)
art('doc548', 'DocumentPage', L(18), L(19, .4), [K(L(18), 1, 'back', fx_x=0), K('L23@five', 1.4, circleK=1)], ink=False, src=SM + 'D-03_cavendish-1798-density-548-p522.jpg', x=1380, y=540, w=560, h=802, rot=2, circle=[.375, .19, .1, .04], circleK=0, draw=1, fx_x=800)
text('f548', '5.48', 'figure', 600, 260, 'L23@five', L(19, .4), size=170)
text('p548', 'times as dense as water', 'plate', 600, 380, 'L23@water', L(19, .4), size=38)
text('rockhalf', 'surface rock: about half', 'plate', 560, 940, L(19, 1.4), L(20, .6), size=34)
EK += [K(L(20, .4), .01, iris=0, layers=1, liquid=0, glow=0, crack=0, heavy=0, fx_s=1, fx_y=0, fx_x=0), K(L(20, .4), 1.4, iris=1), K(L(20, 1.4), 1.6, heavy=1)]
ent('emb20', 'particles', {'kind': 'embers', 'n': 30, 'box': [760, 340, 400, 400], 'k': 0, 'a': 1}, [K(L(20, 1.4), 1.5, k=1), K(L(22), 1, a=0)])
EK += [K(L(21), 1.4, 'inOut', fx_x=420, fx_s=.8)]
art('meteor', 'IronMeteorite', L(21, .3), L(22, .9), [K(L(21, .3), 1.3, 'in', fx_y=0, fx_x=0, glow=0), K('L26@iron', 1.6, slice=1), K('L26@sky', 1.8, 'inOut', fx_x=880, fx_s=.4)],
    inkdur=.6, x=560, y=560, s=1.15, slice=0, glow=1, fx_y=-800, fx_x=-300, fx_box=[400, 400, 320, 320])
ent('mtrail', 'shape', {'form': 'M0 0 L100 100', 'x': 330, 'y': 230, 's': 3.6, 'draw': 0, 'col': '#D2643E', 'sw': 5, 'a': 0}, [K(L(21, .3), .01, a=1), K(L(21, .3), 1.3, 'in', draw=1), K(L(21, 2.2), 1, a=0)])
person('wiech', 'Emil Wiechert (Göttingen, 1890s)', L(21, 1.6), L(22, .9), [K(L(21, 3), 1.2, pk=1)], x=240, y=1020, h=480, facing=1, pose='stand', pose2='point', pk=0,
       costume='wiechert1896', beard='full', hairCol='#4A3220', face={'nose': .4, 'brow': .5, 'chin': .2, 'age': .2, 'build': 1.05}, skin=.28)
text('wname', 'Emil Wiechert', 'plate', 240, 1050, L(21, 2.2), L(22, .9), size=30)
EK += [K(L(22), 1.2, 'inOut', fx_x=0, fx_s=1), K(L(22, .2), 1.4, heavy=0)]
text('qcore', '?', 'note', 960, 540, L(22, 1.2), L(23, .4), size=150, width=300)
# ================================================================ CLUE 2 — THE PLANET RINGS (L23–L34)
EK += [K(L(23), .9, 'in', a=0)]
text('t2', 'Clue II · The Ringing Planet', 'title', 960, 150, L(23), L(24, .5), size=58)
art('bell', 'BronzeBell', L(23, .4), L(24, 1.6), [K(L(23, .4), .9, 'bounce', fx_y=0), K(L(24), 1.6, 'inOut', fx_s=.55, fx_y=-60, a=0)], inkdur=.8, x=960, y=700, s=1.25, swing=1, fx_y=-400)
ripple('rp23', [960, 760], L(23, 1.2), r=520, n=5, dur=2.2)
sfx(23, 1.2, 'public/sfx/impact_bell_1.wav', -20)
EK += [K(L(24, .2), .01, layers=1, solid=1, heavy=0, liquid=0, inner=0, glow=0), K(L(24, .2), 1.6, a=1)]
for j, pts in enumerate(rays([800, 700, 600, 500, 400, 330, 280, 262])):
    trail(f'r24_{j}', pts, L(24, 1.8 + j * .22), 2.4, L(25, .6), col='#B8862B', w=2.4, r=5, ease='out')
    trail(f'r24m_{j}', [[2 * 960 - x, y] for x, y in pts], L(24, 1.8 + j * .22), 2.4, L(25, .6), col='#B8862B', w=2.4, r=5, ease='out')
ripple('rp24', [960, 120], L(24, 1.6), r=200)
sfx(24, 1.6, 'public/stock/_hwk/inside-earth/A-01_sumatra-2004-anmo-sonified-iris.wav', -24)
EK += [K(L(25), 1.2, 'inOut', fx_x=-520, fx_s=.7)]
art('waves', 'WaveDemo', L(25), L(26, .6), [K(L(25), 1, 'back', fx_x=0)], inkdur=1.2, x=1320, y=540, s=.85, fx_x=900)
text('lp', 'P · push and squeeze', 'label', 1040, 300, 'L30@push', L(26, .6), align='left', size=34)
text('ls', 'S · shake side to side', 'label', 1040, 790, 'L30@shake', L(26, .6), align='left', size=34)
EK += [K(L(26), .8, a=0)]
art('lanes', 'SpeedLanes', L(26), L(27, .6), [K(L(26), 1, wipe=1), K(L(26, 1.2), 2.4, 'linear', k1=1), K(L(26, 1.2), 2.4, 'linear', k2=.6)], inkdur=1, x=960, y=540, w=1500, k1=0, k2=0, wipe=0, wipeDir='right')
art('seis', 'Seismograph', L(27), L(28, .8), [K(L(27), 1.4, 'out', fx_y=0), K(L(27, 4.5), 1, amp=1)], inkdur=1.8, x=640, y=990, s=1.2, amp=0, quake=191, fx_y=500)
text('seisp', 'a seismograph, c. 1900 — after Wiechert’s design', 'plate', 640, 1045, L(27, 1.8), L(28, .8), size=28)
art('milne', 'Pinned', L(27, 3.4), L(28, .6), [K(L(27, 3.4), .9, 'bounce', fx_y=0)], ink=False, src=SM + 'P-11_milne-seismograph-tokyo-cc0.jpg', x=1480, y=400, w=560, h=373, rot=3, caption='a Milne seismograph of the 1890s (museum, Tokyo)', draw=1, fx_y=-600)
sfx(27, 4.5, 'public/sfx/sci_scratch_1.wav', -24)
CITIES = [('Kew', .22), ('Potsdam', .3), ('Göttingen', .32), ('Strassburg', .36), ('Rome', .44), ('Tokyo', .62)]
for i, (c, arr) in enumerate(CITIES):
    x, y = 420 + (i % 3) * 540, 360 + (i // 3) * 360
    art(f'st{i}', 'StationDrum', L(28, .2 + i * .25), L(29, .6), [K(L(28, .2 + i * .25), .7, 'back', fx_y=0), K(L(28, 1.6), 4.4, 'linear', k=1)], inkdur=.6, x=x, y=y, s=1.25, city=c, k=0, arrive=arr, fx_y=-120)
# Assam, 1897: a window opens from the globe
ent('globe29', 'planet', {'kind': 'earth', 'x': 960, 'y': 560, 'size': 780, 'lon': 60, 'lat': 15, 'draw': 0, 'a': 0}, [K(L(29), .01, a=1), K(L(29), 1.2, draw=1), K(L(29), 1.6, 'inOut', lon=91, lat=24), K(L(30, .6), .8, a=0)])
ent('pin29', 'pin', {'on': 'globe29', 'lon': 91.9, 'lat': 25.6, 'label': 'Assam', 'draw': 0, 'a': 0}, [K(L(29, .8), .01, a=1), K(L(29, .8), .8, draw=1), K(L(30, .6), .6, a=0)])
ent('win29', 'lens', {'at': {'entity': 'globe29', 'lon': 91.9, 'lat': 25.6}, 'r': 0, 'center': 0, 'a': 1}, [K(L(29, 1.3), 1.4, 'inOut', r=1200, center=1), K(L(30), 1, 'inOut', r=0, center=0)],
    children=[{'id': 'assam', 'type': 'art', 'props': {'name': 'AssamHills', 'draw': 1, 'crack': 0, 'shake': 0}, 'keys': [K(L(29, 2.6), .2, shake=1), K(L(29, 3), 1.6, crack=1), K(L(29, 5.5), 1, shake=0)]}])
art('vent', 'Pinned', L(29, 4), L(30, .8), [K(L(29, 4), .9, 'bounce', fx_y=0)], ink=False, src=SM + 'P-09-x1_assam-1899-plate11-pd.jpg', x=1560, y=300, w=440, h=302, rot=-3, caption='sand vent, Assam 1897 — Oldham’s report', draw=1, fx_y=-500)
sfx(29, 2.6, 'public/sfx/real_metal_groan_1.wav', -26)
art('desk', 'SurveyDesk', L(30), L(31, .6), [K(L(30), 1.1, 'back', fx_x=0), K(L(30, 1.6), 4, 'linear', env=1)], inkdur=1.2, x=1040, y=860, s=1.05, env=0, fx_x=-1400)
person('oldham', 'Richard Dixon Oldham (Geological Survey of India)', L(30, .6), L(31, .6), [K(L(30, 1.2), 1.2, pk=1)], x=330, y=1030, h=500, facing=1, pose='stand', pose2='hold', pk=0,
       costume='oldham1897', beard='moustache', hairCol='#5A3A22', face={'nose': .2, 'brow': .4, 'chin': .3, 'age': .1, 'build': 1}, skin=.26)
text('oname', 'R. D. Oldham', 'plate', 330, 1055, L(30, 1.6), L(31, .6), size=30)
art('mon', 'Pinned', L(30, 3.4), L(31, .6), [K(L(30, 3.4), .9, 'bounce', fx_y=0)], ink=False, src=SM + 'P-05_richard-oldham-frontispiece-1899-pd.jpg', x=1700, y=320, w=250, h=390, rot=4, caption='frontispiece, Oldham’s 1899 report', draw=1, fx_y=-600)
# the race of the waves: shallow on time, deep late (true PREM paths; the deep one crosses the core)
EK += [K(L(31), .01, fx_x=0, fx_s=1, layers=1, solid=1, inner=0), K(L(31), 1, a=1)]
sh = rays([500])[0]; dp = rays([30], inner=False)[0]
trail('shallow', sh, L(31, .6), 2.2, L(32), col='#B8862B', w=3.2, r=7)
ent('expect', 'trail', {'points': [{'screen': [960, 120]}, {'screen': [960, 960]}], 'k': 0, 'a': 0, 'col': '#C9AE84', 'w': 2, 'r': 6, 'dash': True}, [K(L(31, 2.6), .01, a=.8), K(L(31, 2.6), 2.6, 'linear', k=1), K(L(32), .8, a=0)])
trail('deep', dp, L(31, 2.6), 4.4, None, col='#D2643E', w=3.2, r=7, keys=[K(L(32), .01, a=0), K(L(33), .01, a=1), K(L(34, 2), .8, a=0)])
text('ontime', 'on time', 'label', 1400, 220, L(31, 3), L(32), to=[round(sh[-1][0]), round(sh[-1][1])], align='left', size=36)
text('late', 'late', 'stamp', 1160, 980, L(31, 7.0), L(32), dur=.5, size=40)
EK += [K(L(32), .6, a=0)]
ent('track', 'art', {'name': 'MudTrack', 'draw': 0, 'a': 0, 'run': 0, 'mud': 0, 'wipe': 0, 'wipeDir': 'right'}, [K(L(32), .01, a=1), K(L(32), 1, wipe=1, draw=1), K(L(32, .4), 4.4, 'linear', run=.75), K(L(32, 1.6), 1.2, mud=1), K(L(33), .7, a=0)])
EK += [K(L(33), .01, solid=1, layers=3, inner=0), K(L(33), .8, a=1), K(L(33, .4), 1.6, solid=0)]
EK += [K(L(34), 1.2, 'inOut', fx_x=-330, fx_s=.85)]
art('doc06', 'DocumentPage', L(34), L(35, .2), [K(L(34), 1, 'back', fx_x=0), K('L39@conclusion', 1.2, circleK=1)], ink=False, src=SM + 'D-02_oldham-1906-first-page-p456.jpg', x=1420, y=540, w=520, h=876, rot=-2, circle=[.52, .09, .86, .05], circleK=0, mark='line', draw=1, fx_x=900)
text('core06', 'Core · 1906', 'stamp', 1420, 960, 'L39@core', L(35, .2), dur=.5, size=40)
# ================================================================ CLUE 3 — THE MISSING WAVE (L35–L47)
EK += [K(L(35), 1, 'in', flipY=-95, a=0)]
text('t3', 'Clue III · The Missing Wave', 'title', 960, 520, L(35, .3), L(36, .4), size=62)
sfx(35, 0, 'public/sfx/foley_page_turn_1.wav', -18)
art('zag', 'ZagrebRoom', L(36), L(37, .6), [K(L(36), 1.6, unroll=1)], inkdur=2, unroll=0)
person('moho', 'Andrija Mohorovičić (Zagreb, 1909)', L(36, 1.6), L(37, .6), [K(L(36, 2.4), 1.2, pk=1)], x=1060, y=1040, h=520, facing=-1, pose='stand', pose2='hold', pk=0,
       costume='moho1909', beard='full', hairCol='#ECE6D8', face={'nose': .3, 'brow': .6, 'chin': .1, 'age': .7, 'build': 1.05}, skin=.28)
art('rec36', 'SeismoRecord', L(36, 2.6), L(37, .6), [K(L(36, 2.6), 1, 'back', fx_y=0), K('L41@twice', 1.4, mark=1)], inkdur=1, x=600, y=800, w=760, k=1, bump=1, mark=0, seed='zag', note='two arrivals — drawn record', fx_y=400)
art('mcard', 'CabinetCard', L(36, 4.4), L(37, .6), [K(L(36, 4.4), 1, 'back', fx_x=0)], ink=False, src=SM + 'P-06_mohorovicic-portrait-pd.jpg', x=640, y=270, w=180, h=242, rot=-4, caption='A. Mohorovičić', draw=1, fx_x=-500)
art('slab', 'CrustSlab', L(37), L(40, 1.4), [K(L(37), 1.4, 'out', fx_y=0), K('L44@mantle', 2, honey=1), K(L(40), 1.8, 'in', fx_s=.18, fx_y=-200)], inkdur=1.4, moho=0, honey=0, mantle=1, fx_y=600, fx_box=[0, 200, 1920, 880], fx_oy=240)
trail('cr1', [[80, 330], [1840, 330]], L(37, 1.0), 4.4, L(39), col='#B8862B', w=3, r=8)
trail('cr2', [[80, 330], [420, 500], [1500, 500], [1840, 330]], L(37, 1.0), 3.3, L(39), col='#D2643E', w=3, r=8)
text('fast', 'faster rock below', 'plate', 960, 560, L(37, 2.4), L(38, 2), size=36)
ent('quill38', 'hand', {'at': {'screen': [0, 472]}, 's': .8, 'a': 0}, [K(L(38), .3, a=1), K(L(38), 1.8, 'linear', at={'screen': [1920, 472]}), K(L(38, 1.9), .4, a=0)])
for e in W:
    if e['id'] == 'slab': e['keys'].append(K(L(38), 1.8, 'linear', moho=1))
text('mohonote', 'the Moho', 'note', 1500, 420, L(38, 2), L(40), size=64)
text('mohod', 'a few tens of km down', 'plate', 1500, 520, L(38, 2.6), L(40), size=32)
text('mant', 'the mantle — hot, solid, creeping', 'label', 960, 1010, 'L44@mantle', L(40), size=36)
EK += [K(L(40), .01, flipY=0, fx_x=0, fx_s=1, layers=3, inner=0, solid=0, liquid=0), K(L(40, .6), 1.6, a=1), K('L45@core', 1.6, ring=1), K(L(41), 1, ring=0)]
text('f2900', '2,900 km', 'figure', 1500, 300, 'L45@two', L(41, .6), size=120)
person('gut', 'Beno Gutenberg (1914) — drawn: no free portrait exists', L(40, 3.8), L(41, .6), [], x=330, y=1040, h=470, facing=1, pose='point', costume='gutenberg1914', hairCol='#2A1E16', face={'nose': .3, 'brow': .4, 'chin': .2, 'build': .95}, skin=.27)
text('gname', 'Beno Gutenberg, 1914', 'plate', 330, 1060, L(40, 4.2), L(41, .6), size=30)
S41 = rays([470, 420, 340, 240, 120], s=True); S41 = S41 + [[[2 * 960 - x, y] for x, y in q] for q in S41[1:4]]
for j, pts in enumerate(S41):
    trail(f's41_{j}', pts, L(41, 1 + j * .3), 2.2, L(42), col='#8C3424', w=2.6, r=5, dash=True)
    ripple(f's41p_{j}', pts[-1], L(41, 3.3 + j * .3), r=50, n=2, dur=.9)
text('stop', 'they stop at the core', 'label', 1440, 880, L(41, 4), L(42), to=[1170, 760], align='left', size=36)
EK += [K(L(42), .6, a=0)]
art('jelly', 'JellyWater', L(42), L(43, .4), [K(L(42), 1, blinds=1), K(L(42, 1), 1, k=1)], inkdur=1, k=0, blinds=0)
EK += [K(L(43), .01, liquid=0), K(L(43), .8, a=1), K(L(43, .2), 1.8, liquid=1)]
text('liq', 'an ocean of liquid iron', 'label', 1450, 860, L(43, 1.6), L(44, .4), to=[1160, 640], align='left', size=38)
fan = rays([330, 280, 262]) + rays([254, 250, 240, 220, 200, 180], inner=False); fan = fan + [[[2 * 960 - x, y] for x, y in q] for q in fan]
for j, pts in enumerate(fan):
    trail(f'r44_{j}', pts, L(44, j * .12), 2.4, L(46, 5), col='#B8862B', w=2, r=4, ease='out')
EK += [K(L(44, 2.4), 1.4, shadow=1)]
EK += [K(L(45), 1.2, 'inOut', fx_x=-380, fx_s=.82)]
for j in range(len(fan)): [e for e in W if e['id'] == f'r44_{j}'][0]['keys'] += [K(L(45), .6, a=0), K(L(46), .8, a=1)]
art('straw', 'StrawGlass', L(45), L(46, .4), [K(L(45), 1, 'out', fx_y=0), K(L(45, 1.2), 1, bend=1)], inkdur=.8, x=1480, y=640, s=1.05, bend=0, fx_y=500)
EK += [K(L(46), 1.2, 'inOut', fx_x=0, fx_s=1)]
text('shz', 'the shadow zone', 'label', 1500, 940, L(46, 1.4), L(47, 3), to=[1330, 790], align='left', size=40)
text('shd', '103°–143° from the quake', 'plate', 1500, 1010, L(46, 2), L(47, 3), size=32)
for j, (ang) in enumerate([118, 131, -126]):
    import math
    px, py = 960 + 438 * math.sin(math.radians(ang)), 540 - 438 * math.cos(math.radians(ang))
    for rep in range(3):
        ripple(f'g47_{j}_{rep}', [round(px), round(py)], L(47, .4 + j * .5 + rep * 1.3), r=46, n=2, dur=1, col='#FBF1D8', a=.8)
# ================================================================ CLUE 4 — A GHOST IN THE SHADOW (L48–L60)
EK += [K(L(48), 1, 'in', iris=0, irisAt=[960, 540])]
text('t4', 'Clue IV · A Ghost in the Shadow', 'title', 960, 520, L(48, .3), L(49, .4), size=58)
art('room', 'LehmannRoom', L(49), L(50, .4), [K(L(49), 1.6, unroll=1)], inkdur=2, unroll=0)
person('inge', 'Inge Lehmann (Copenhagen, 1930s)', L(49, 1.8), L(50, .4), [K(L(49, 2.6), 1.2, pk=1)], x=560, y=1020, h=520, facing=1, pose='stand', pose2='hold', pk=0,
       costume='lehmann1932', hairCol='#6A4A2E', face={'nose': .05, 'brow': .2, 'chin': .05, 'build': .88}, skin=.22)
art('icard', 'CabinetCard', L(49, 3.4), L(50, .6), [K(L(49, 3.4), 1, 'back', fx_x=0)], ink=False, src=SM + 'P-01_inge-lehmann-portrait-pd.jpg', x=1760, y=330, w=230, h=336, rot=4, caption='Inge Lehmann, 1932', draw=1, fx_x=400)
art('rec', 'SeismoRecord', L(50), L(51), [K(L(50), 1, 'out', fx_y=0), K(L(50), 3.4, 'linear', k=1)], inkdur=.8, x=960, y=560, w=1400, k=0, bump=.5, mark=0, fx_y=700)
ent('globe51', 'planet', {'kind': 'earth', 'x': 960, 'y': 560, 'size': 760, 'lon': 12, 'lat': 45, 'draw': 0, 'a': 0}, [K(L(51), .01, a=1), K(L(51), 1, draw=1), K(L(51), 2.2, 'inOut', lon=172, lat=-35), K(L(52), .8, a=0)])
ent('pin51', 'pin', {'on': 'globe51', 'lon': 172.3, 'lat': -41.8, 'label': 'Buller, 1929', 'draw': 0, 'a': 0}, [K(L(51, 1.6), .01, a=1), K(L(51, 1.6), .8, draw=1), K(L(52), .6, a=0)])
ent('win51', 'lens', {'at': {'entity': 'globe51', 'lon': 172.3, 'lat': -41.8}, 'r': 0, 'center': 0, 'a': 1}, [K(L(51, 2.6), 1.4, 'inOut', r=1200, center=1), K(L(52), 1, 'inOut', r=0, center=0)],
    children=[{'id': 'buller', 'type': 'art', 'props': {'name': 'BullerSlip', 'draw': 1, 'slide': 0}, 'keys': [K(L(51, 3.6), 2.4, slide=1)]}])
art('nelson', 'Pinned', L(51, 5), L(52, .4), [K(L(51, 5), .9, 'bounce', fx_y=0)], ink=False, src=SM + 'P-10_nelson-college-murchison-1929-pd.jpg', x=1560, y=290, w=460, h=288, rot=3, caption='Nelson College after the 1929 quake', draw=1, fx_y=-500)
sfx(51, 3.6, 'public/sfx/amb_thunder_roll_1.wav', -26)
# Buller → Europe: the quake at the bottom of the section, the stations at the top
EK += [K(L(52), .01, iris=1, a=0, layers=3, inner=0, liquid=.5, shadow=0, quake=180, solid=0), K(L(52), .8, a=1)]
R52 = rays([252, 245, 240], rot=180, inner=False) + rays([116, 112], rot=180)
for j, pts in enumerate(R52):
    trail(f'r52_{j}', pts, L(52, .4 + j * .3), 2.6, L(53), col='#B8862B', w=2.4, r=5, ease='inOut')
text('bullerlbl', 'Buller', 'label', 760, 1010, L(52, .2), L(53), to=[960, 962], size=34)
for j, (nm, q) in enumerate([('Copenhagen', R52[0]), ('stations in Europe', R52[2])]):
    text(f'stn{j}', nm, 'label', 1460, 170 + j * 80, L(52, 2.6 + j * .4), L(53), to=[round(q[-1][0]), round(q[-1][1])], align='left', size=34)
EK += [K(L(53), .6, a=0)]
for e in W:
    if e['id'] == 'rec': e['keys'] += [K(L(53), .01, a=1), K('L58@shadow', 1.6, mark=1), K(L(54, 1), .8, a=0)]
for j in range(3):
    art(f'let{j}', 'Letter', L(54, j * .4), L(60), [K(L(54, j * .4), 1, 'back', fx_x=0), K(L(59, j * .5), .5, 'in', flipY=90), K(L(59, .5 + j * .5), .01, kind='agree'), K(L(59, .5 + j * .5), .6, 'out', flipY=0)],
        ink=False, x=620 + j * 340, y=560 + (j % 2) * 30, s=1.1, rot=[-6, 3, -2][j], kind='doubt', draw=1, fx_x=1600, fx_box=[440 + j * 340, 300, 360, 520])
    [e for e in W if e['id'] == f'let{j}'][0]['keys'] += [K(L(55), .6, a=0), K(L(59), .01, a=1)]
text('noise', 'noise? diffraction?', 'note', 960, 180, L(54, 1.4), L(55), size=58)
EK += [K(L(55), .01, quake=0, liquid=.6, layers=3, inner=0, shadow=1), K(L(55), .8, a=1)]
ent('pencil', 'shape', {'form': 'M50 0 A50 50 0 1 1 49.9 0', 'x': 960, 'y': 540, 's': 1.61, 'draw': 0, 'col': '#2B1D12', 'sw': 2.4, 'a': 1}, [K(L(55, 1.4), 2.2, 'linear', draw=1), K(L(56, 3), .8, a=0)])
ent('quill55', 'hand', {'at': {'screen': [960, 460]}, 's': .7, 'a': 0}, [K(L(55, 1.3), .3, a=1), K(L(55, 1.4), 2.2, 'linear', at={'screen': [1041, 540]}), K(L(55, 3.7), .4, a=0)])
EK += [K('L61@solid', 1.6, layers=4, inner=1)]
ghost = rays([116, 114, 112, 111, 109, 106])
for j, pts in enumerate(ghost):
    q = pts if j % 2 == 0 else [[2 * 960 - x, y] for x, y in pts]
    trail(f'gh{j}', q, L(56, 3.2 + j * .35), 3.2, L(57, 1), col='#F3D98A', w=2.6, r=6, ease='inOut')
    ripple(f'ghp{j}', q[-1], L(56, 6.6 + j * .35), r=60, n=3, dur=1.2, col='#D2643E')
text('ghostok', 'the ghost explained', 'label', 1480, 980, L(56, 7.4), L(57, .8), to=[1330, 790], align='left', size=36)
EK += [K(L(57), .8, a=0)]
art('boxes', 'CardBoxes', L(57, .2), L(58, .6), [K(L(57, .2), 1, 'bounce', fx_y=0), K(L(57, 2.4), 1.4, lift=1)], inkdur=.8, x=960, y=900, s=1.15, lift=0, fx_y=-700)
text('oat', 'her data, on cards, in oatmeal boxes', 'plate', 960, 1010, L(57, 2), L(58, .6), size=32)
text('pprime', 'P′', 'figure', 960, 470, L(58, 3.6), L(59), size=380)
text('pplate', 'the whole title of her 1936 paper', 'plate', 960, 760, L(58, 4.4), L(59), size=40)
text('ptitle', 'Lehmann, 1936', 'stamp', 960, 880, L(58, 1.2), L(59), dur=.5, size=40)
EK += [K(L(60), .01, quake=0, layers=4, inner=1, liquid=.6, shadow=0, fx_s=1.2), K(L(60), .8, a=1), K(L(60), 1.4, 'out', fx_s=1), K(L(60, .3), 1.6, glow=1)]
# ================================================================ THE TWIST (L61–L67)
EK += [K(L(61), 1.4, 'in', fx_s=3.2, a=0)]
art('ball', 'InnerCoreBall', L(61, .5), L(63, .6), [K(L(61, .5), 1.4, 'out', fx_s=1), K('L67@squeezed', 1.6, press=1)], inkdur=1.2, x=700, y=560, r=230, glow=1, press=0, fx_s=.3, fx_box=[470, 330, 460, 460])
ent('moon61', 'planet', {'kind': 'moon', 'x': 1420, 'y': 560, 'size': 654, 'phase': .9, 'draw': 0, 'a': 0}, [K(L(61, 1.6), .01, a=1), K(L(61, 1.6), 1.6, draw=1), K(L(62), .8, a=0)])
text('scale61', 'inner core and Moon, to scale', 'plate', 1060, 950, L(61, 3), L(62), size=34)
text('f2400', 'about 2,400 km', 'figure', 700, 210, 'L66@two', L(62), size=100)
art('sun62', 'Sun', L(62, .6), L(63, .6), [], inkdur=1.4, x=1460, y=560, r=230)
text('f5400', 'about 5,400 °C', 'figure', 1060, 200, 'L67@hot', L(63, .4), size=96)
text('sunp', 'the Sun’s surface: about the same', 'plate', 1460, 880, L(62, 1.6), L(63, .4), size=32)
EK += [K(L(63), .01, fx_s=1, glow=.6, liquid=1, layers=4, inner=1), K(L(63), 1, a=1), K(L(63, .8), 2, sparks=1)]
text('birth', 'left over from its birth', 'label', 1460, 260, 'L68@birth', L(64, .3), to=[1200, 400], align='left', size=34)
text('radio', 'radioactive atoms', 'label', 1460, 860, 'L68@radioactive', L(64, .3), to=[1130, 700], align='left', size=34)
EK += [K(L(64), 1.4, 'inOut', fx_s=.42, sparks=0)]
art('field', 'FieldLines', L(64, 1.6), L(66, .6), [K(L(64, 1.6), 3, 'out', k=1), K('L70@shields', 2.4, wind=1)], ink=False, x=960, y=540, r=176, k=0, wind=0, draw=1)
art('compass', 'PocketCompass', L(65), L(66, .4), [K(L(65), 1, 'back', fx_x=0), K(L(65, .8), 2, 'elastic', needle=0)], inkdur=.8, x=1560, y=820, s=.62, needle=-70, fx_x=600)
EK += [K(L(66), 1.4, 'inOut', fx_s=.3, a=0)]
art('bell66', 'BronzeBell', L(66, .4), L(67, .4), [], inkdur=1.2, x=960, y=700, s=1.1, swing=.6)
ripple('rp66', [960, 760], L(66, 1.8), r=560, n=5, dur=2.4)
sfx(66, 1.8, 'public/sfx/impact_bell_1.wav', -24)
art('icard2', 'CabinetCard', L(67), L(67, 1.4), [K(L(67, .6), .7, 'in', flipY=90)], ink=False, src=SM + 'P-01_inge-lehmann-portrait-pd.jpg', x=960, y=500, w=380, h=555, rot=0, caption='Inge Lehmann', draw=1, fx_box=[720, 200, 480, 700])
art('cardback', 'Letter', L(67, 1.3), L(68, .2), [K(L(67, 1.3), .7, 'out', flipY=0)], ink=False, x=960, y=540, s=1.3, kind='blank', draw=1, flipY=-90, fx_box=[720, 230, 480, 620])
text('dates', '1888 – 1993', 'note', 960, 470, L(67, 2.2), L(68, .2), size=86)
text('lived', 'she lived to 104', 'plate', 960, 600, L(67, 3), L(68, .2), size=40)
# ================================================================ THE ANSWER (L68–L70)
EK += [K(L(68), .01, fx_s=1, glow=.3, liquid=.8, layers=4, inner=1, shadow=0, sparks=0), K(L(68), 1.2, a=1)]
for j, (kind, x, y, t) in enumerate([('balance', 330, 270, 'L74@weight'), ('drum', 1590, 270, 'L74@echoes'), ('jelly', 330, 810, 'L75@missing'), ('boxes', 1590, 810, 'L75@ghost')]):
    art(f'med{j}', 'ClueMedallion', t, None, [K(t, .9, 'back', fx_s=1), K(L(70, 4.4), 1.6, 'in', fx_x=960 - x, fx_y=540 - y, fx_s=.1), K(L(70, 5.8), .4, a=0)], inkdur=.8, x=x, y=y, r=120, kind=kind, n=j + 1, fx_s=.3, fx_box=[x - 130, y - 130, 260, 260])
EK += [K(L(70, 5.6), 1.6, glow=1), K(L(70, 6.2), .6, inner=1)]
for j, (nm, w) in enumerate([('heavy', 'L74@weight'), ('a core', 'L74@core'), ('liquid', 'L75@liquid'), ('solid', 'L75@solid')]):
    text(f'ans{j}', nm, 'note', [330, 1590, 1440, 960][j], [440, 440, 760, 650][j], w, L(70, 4.4) if j < 2 else L(71), size=52, width=500)
# ================================================================ WHAT IT MEANS (L71–L74)
EK += [K(L(71), 1, a=0)]
art('gsn', 'Pinned', L(71), L(72, .4), [K(L(71), 1, 'out', fx_y=0)], ink=False, src=SM + 'M-01_gsn-stations-map-pd.jpg', x=960, y=520, w=1280, h=640, rot=-1, caption='Global Seismographic Network stations today (EarthScope; NASA base map)', draw=1, fx_y=900)
ripple('rp71', [700, 380], L(71, 2), r=900, n=6, dur=4, col='#F3D98A')
art('mars', 'MarsSection', L(72, .2), L(73, .2), [K(L(72), .7, 'expo', fx_x=0), K(L(72, 2), 1.4, cut=1)], inkdur=1, x=960, y=540, r=330, cut=0, fx_x=1500)
ripple('rp72', [960, 210], L(72, .9), r=500, n=4, dur=2)
text('marsp', 'Mars: its core, found by listening', 'plate', 960, 950, L(72, 2.6), L(73, .2), size=36)
EK += [K(L(74, .5), .01, fx_s=1, fx_y=900, glow=.4, liquid=1, layers=4, inner=1, iris=1, flipY=0, fx_x=0), K(L(74, .5), .1, a=1), K(L(74, .7), 3, 'inOut', fx_y=0)]
ripple('rp74', [960, 540], L(74, 3.4), r=600, n=5, dur=2.6, col='#B8862B')
# ================================================================ CLOSING (v2) — the film ends where it began: on the ground, then down to the core
EK += [K(H(80, .5), .9, a=0)]
ent('close', 'art', {'name': 'EarthSection', 'ax': 960, 'ay': 120, 'zoom': 420 / RE_, 'layers': 4, 'inner': 1, 'liquid': 1, 'glow': .4, 'sparks': 0, 'draw': 0, 'a': 0},
    [K(H(80), .01, a=1, draw=1), K(H(80, .3), 2.8, 'inOut', ay=800), K(H(80, .3), 2.8, 'inOut', zoom=.55),
     K('L80@beneath', 6.0, 'inOut', ay=YC - RE_ * ZD), K('L80@beneath', 6.0, 'inOut', zoom=ZD), K('L80@heart', 2, glow=1), K('L80@Sun', 2, sparks=1),
     K('L80$+0.6', 2.2, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=600), K('L80$+2.9', .01, a=0)], z=88)
person('listener2', 'a person standing on the ground (the viewer)', H(80, 2.4), None, [K('L80@beneath', 6.0, 'inOut', fx_y=YC - RE_ * ZD - 800), K('L80@beneath+2', 1.2, a=0)],
       x=960, y=802, h=120, facing=-1, pose='stand', costume='listener2026', hairCol='#3A2A1E', face={'nose': .3, 'brow': .4, 'chin': .3, 'build': 1}, skin=.4, fx_y=0, z=89)
text('cl_ground', 'solid ground', 'note', 1220, 700, H(80, 2.6), 'L80@beneath', size=46)
text('cl_ocean', 'an ocean of liquid iron', 'note', 1380, 300, 'L80@ocean', 'L80$', size=48)
text('cl_heart', 'a ball of solid metal', 'note', 560, 860, 'L80@heart', 'L80$', size=48)
ent('endcard', 'art', {'name': 'EndCard', 'k': 0, 'a': 0}, [K('L80$+0.8', .01, a=1), K('L80$+0.8', 5.6, 'linear', k=1)], z=90)
ent('enddust', 'particles', {'kind': 'dust', 'n': 40, 'k': 0, 'a': 1}, [K('L80$', 2, k=1)], z=91)
earth['keys'] = EK

# ================================================================ v2 MOTION PASS (engine v4) — applied to the whole world
import hashlib
def tsplit(t):   # a time ref → (base, offset)
    if isinstance(t, (int, float)): return None, float(t)
    m = __import__('re').match(r'^(L\d+(?:\$|@[^+\-]+)?)([+\-]\d*\.?\d+)?$', t); return m.group(1), float(m.group(2) or 0)
def tadd(t, d):
    b, o = tsplit(t)
    if b is None: return o + d
    o += d; return b if abs(o) < 1e-6 else f'{b}{o:+g}'
TL_ = json.load(open(os.path.join(H_ := os.path.dirname(os.path.abspath(__file__)), 'timeline.json')))
LN = TL_['lines'] if len(TL_['lines']) == len(E['lines']) else None
def tabs(t):   # absolute seconds for sorting (estimate if the timeline is stale)
    b, o = tsplit(t)
    if b is None: return o
    i = int(__import__('re').match(r'L(\d+)', b).group(1)); l = LN[i] if LN else {'start': i * 6.5, 'dur': 6, 'text': ''}
    if b.endswith('$'): return l['start'] + l['dur'] + o
    if '@' in b:
        w = b.split('@')[1].lower(); j = l['text'].lower().find(w); return l['start'] + l['dur'] * max(0, j) / max(1, len(l['text'])) * .97 + o
    return l['start'] + o
seedOf = lambda t: int(hashlib.md5(str(round(tabs(t), 1)).encode()).hexdigest()[:4], 16) % 89 + 3   # everything that leaves at one moment bleeds as ONE sheet
STILL = {'camera', 'clue'}
for e in W:
    if e['type'] in STILL: continue
    ks, p = e['keys'], e['props']; inked = {str(k['t']) for k in ks if 'draw' in k}
    out = []
    for k in sorted(ks, key=lambda k: tabs(k['t'])):
        # 1) an EXIT (a → 0 over ≥ .3 s): text falls out of focus; everything else bleeds away like ink on wet paper
        if k.get('a') == 0 and k.get('dur', 1.2) >= .3 and 'dissolve' not in k:
            rest = {q: v for q, v in k.items() if q not in ('a',)}
            if len(rest) > 2: out.append(rest)
            if e['type'] == 'text':
                out += [K(k['t'], 1.0, 'soft', blur=10, a=0), K(tadd(k['t'], 1.05), .01, blur=0)]
            else:
                d = max(1.1, k.get('dur', 1.2) * 1.3)
                out += [K(k['t'], d, 'linear', dissolve=0, dissolveSeed=seedOf(k['t'])), K(tadd(k['t'], d), .01, a=0), K(tadd(k['t'], d + .03), .01, dissolve=1)]
            continue
        # 2) an ENTRANCE that would pop (a → 1 instantly, no ink-on at that moment): photos, cards, letters bleed in; words come into focus
        if k.get('a') == 1 and k.get('dur', 1.2) <= .05 and str(k['t']) not in inked and e['type'] in ('art', 'text', 'planet'):
            out.append(dict(k, dissolve=0) if e['type'] != 'text' else dict(k, blur=8))
            out.append(K(k['t'], 1.2, 'linear', dissolve=1, dissolveSeed=seedOf(k['t'])) if e['type'] != 'text' else K(k['t'], .9, 'soft', blur=0))
            continue
        out.append(k)
    # 3) SLIDES become short glides: nothing flies in from off the page any more, it drifts the last few centimetres into place
    for q in ('fx_x', 'fx_y'):
        v = p.get(q)
        if isinstance(v, (int, float)) and abs(v) > 250:
            first = next((k for k in out if k.get(q) == 0), None)
            if first: p[q] = 140 if v > 0 else -140; first['dur'] = max(first.get('dur', 1.2), 1.4); first['ease'] = 'glide'
    e['keys'] = out
    for ch in e.get('children', []) or []: pass
# 4) the PAGE CAMERA never stops: each line a slow push or pull with a drift across (sine: it eases into every new line)
cam = next(e for e in W if e['id'] == 'camera')
for i in range(len(E['lines'])):
    d = (LN[i + 1]['start'] - LN[i]['start']) if LN and i + 1 < len(LN) else 6
    cam['keys'].append(K(H(i), round(d, 2), 'sine', push=[1.0, 1.045, 1.015, 1.05][i % 4], pan_x=[-14, 10, 16, -8][i % 4], pan_y=[6, -5, 3, -6][i % 4]))

E['world'] = W
E['music'] = {'file': 'public/stock/_hwk/inside-earth/U-01_mystery-ossuary-6-macleod-ccby.mp3', 'db': -25, 'start': 0}
for i, l in enumerate(E['lines']): l['sfx'] = SFX.get(i, [])
E['thumb'] = {'t': 434, 'title': 'What is *inside* the Earth?', 'kicker': 'Fathom', 'side': 'left'}
json.dump(E, open(EP, 'w'), indent=1, ensure_ascii=False)
TP = os.path.join(H_, 'timeline.json')
if os.path.exists(TP):   # keep the voiced timeline's sfx in step (vo.py copies them on the next voice run)
    T = json.load(open(TP))
    for i, l in enumerate(T['lines']): l['sfx'] = SFX.get(i, [])
    json.dump(T, open(TP, 'w'), indent=1)
    import shutil; os.makedirs(os.path.join(H_, '../../public/ep/inside-earth'), exist_ok=True)
    for f in (('episode.json', 'timeline.json') if LN else ('episode.json',)): shutil.copy(os.path.join(H_, f), os.path.join(H_, '../../public/ep/inside-earth', f))   # a stale timeline is not copied
print(len(W), 'entities →', EP)
