#!/usr/bin/env python3
"""fx-reel — the v5 vocabulary shown as ONE continuous chain (each picture becomes the next). Silent fixture; music added by make.
python3 episodes/fx-reel/build.py → public/ep/fx-reel/{episode,timeline}.json (+ episodes/fx-reel/*.json)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); W = []
SEG = 6.0; N = 9
def T(i, o=0.0): return round(1 + i * SEG + o, 2)
def K(t, dur=1.2, ease=None, **p):
    k = {'t': t, 'dur': dur, **p}
    if ease: k['ease'] = ease
    return k
def ent(id, type, props, keys=(), z=None, children=None):
    e = {'id': id, 'type': type, 'props': props, 'keys': list(keys)}
    if z is not None: e['z'] = z
    if children: e['children'] = children
    W.append(e); return e
SEP = '#2B1D12'
def circ(cx, cy, r): return f"M{cx} {cy - r} A{r} {r} 0 1 1 {cx - .01} {cy - r}Z"
def bell(cx, cy, k):
    P = lambda dx, dy: f"{cx + dx * k:.1f} {cy + dy * k:.1f}"
    return f"M{P(-70, -180)} C{P(-80, -260)} {P(80, -260)} {P(70, -180)} C{P(90, -60)} {P(110, -10)} {P(170, 30)} L{P(-170, 30)} C{P(-110, -10)} {P(-90, -60)} {P(-70, -180)}Z"
def wave(x0, x1, y, amp=70):
    pts = []
    for i in range(121):
        u = i / 120; x = x0 + (x1 - x0) * u; env = math.exp(-((u - .55) / .16) ** 2); pts.append(f"{x:.1f} {y + math.sin(u * 60) * amp * env + math.sin(u * 9) * 4:.1f}")
    return 'M' + ' L'.join(pts)
def rect(x, y, w, h): return f"M{x} {y} L{x + w} {y} L{x + w} {y + h} L{x} {y + h}Z"
def arch(cx, cy, w, h): return f"M{cx - w / 2} {cy + h / 2} L{cx - w / 2} {cy - h / 2 + w / 2} A{w / 2} {w / 2} 0 0 1 {cx + w / 2} {cy - h / 2 + w / 2} L{cx + w / 2} {cy + h / 2}Z"
ID = {'x': 50, 'y': 50, 's': 1}   # shapes drawn directly in screen px
def cap(i, s):   # the name of the technique, small, bottom-left
    ent(f'cap{i}', 'text', {'text': s, 'style': 'plate', 'x': 960, 'y': 1030, 'size': 34, 'k': 0, 'a': 0, 'blur': 8}, [K(T(i, .2), .01, a=1), K(T(i, .2), .8, 'soft', blur=0, k=1), K(T(i + 1, -.5), .6, a=0, blur=8)], z=99)
ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': 0, 'light': 0})

# 0 · SOLID MORPH — a planet's disc becomes a bronze bell (form + colour glide together), it rings
cap(0, '1 · solid morph — the planet becomes a bell')
ent('body', 'shape', {**ID, 'form': circ(960, 540, 300), 'fill': '#D2643E', 'fillA': .92, 'col': SEP, 'sw': 3, 'draw': 0, 'a': 1},
    [K(T(0), 1.2, 'out', draw=1), K(T(0, 1.8), 2.0, 'inOut', form=bell(960, 660, 1.5), fill='#B8862B'), K(T(1, .2), .8, a=0)])
ent('rp0', 'ripple', {'at': {'screen': [960, 700]}, 'k': 0, 'n': 5, 'r': 620, 'col': '#8C3424'}, [K(T(0, 4), 2.2, 'out', k=1)])
# 1 · SWARM — the bell comes apart into grains of ink that settle as a seismogram
cap(1, '2 · swarm — the bell’s ring settles as a seismogram')
ent('sw1', 'swarm', {'from': bell(960, 660, 1.5), 'to': wave(260, 1660, 540), 'n': 260, 'k': 0, 'arc': 220, 'size': 3.4, 'col': SEP, 'a': 0},
    [K(T(1), .5, a=1), K(T(1, .3), 3.2, 'inOut', k=1), K(T(1, 4.2), .6, a=0)])
# 2 · TRAVELLING LINE — the trace runs off the paper and wraps itself into the outline of the planet
cap(2, '3 · travelling line — the trace wraps into a planet')
ent('line', 'shape', {**ID, 'form': wave(260, 1660, 540), 'col': SEP, 'sw': 3.4, 'draw': 0, 'erase': 0, 'a': 1},
    [K(T(1, 3.4), 1.2, draw=1), K(T(2, .2), 1.6, 'inOut', form=circ(960, 540, 400)), K(T(3, 4.6), .8, a=0)])
ent('pen', 'shape', {**ID, 'form': circ(960, 540, 400), 'col': '#B8862B', 'sw': 9, 'draw': 0, 'erase': 0, 'a': 0},
    [K(T(2, 1.8), .01, a=1), K(T(2, 1.8), 2.4, 'inOut', draw=1), K(T(2, 2.5), 2.4, 'inOut', erase=1), K(T(2, 5), .2, a=0)])
ent('earth', 'art', {'name': 'EarthSection', 'cx': 960, 'cy': 540, 'r': 400, 'layers': 0, 'inner': 0, 'liquid': 0, 'glow': 0, 'draw': 0, 'a': 0, 'pour': 1},
    [K(T(2, 3), .01, a=1), K(T(2, 3), 1.6, draw=1, layers=2),
     # 3 · POUR — the core fills with liquid iron
     K(T(3), .01, pour=0, layers=2), K(T(3, 4.5), .01, pour=1)], z=3)
cap(3, '4 · pour — the core fills with liquid iron (a counter runs)')
ent('earthL', 'art', {'name': 'EarthSection', 'cx': 960, 'cy': 540, 'r': 400, 'layers': 3, 'inner': 0, 'liquid': 1, 'draw': 1, 'a': 0, 'pour': 0, 'fx_box': [750, 330, 420, 420]},
    [K(T(3, .3), .01, a=1), K(T(3, .5), 3.2, 'inOut', pour=1), K(T(4, .2), 1.4, layers=4, inner=1), K(T(4, 1), 1.6, glow=1)], z=4)
ent('cnt', 'text', {'text': '', 'style': 'figure', 'x': 1560, 'y': 300, 'size': 96, 'num': 0, 'fmt': '{n} km', 'k': 1, 'a': 0},
    [K(T(3, .5), .4, a=1), K(T(3, .5), 3.2, 'inOut', num=2260), K(T(4), .6, a=0)], z=20)
ent('cntp', 'text', {'text': 'depth of the liquid outer core', 'style': 'plate', 'x': 1560, 'y': 390, 'size': 30, 'k': 1, 'a': 0}, [K(T(3, .8), .6, a=1), K(T(4), .6, a=0)], z=20)
# 4 · SPOTLIGHT + COUNTER — the eye is led to the inner core while its temperature runs up; heat haze
cap(4, '5 · spotlight, counter, heat haze — the eye is led')
ent('spot', 'spot', {'at': {'screen': [960, 540]}, 'r': 150, 'k': 0, 'dark': .55}, [K(T(4, .8), 1.2, k=1), K(T(5, -.3), .8, k=0)], z=10)
ent('temp', 'text', {'text': '', 'style': 'figure', 'x': 960, 'y': 200, 'size': 110, 'num': 0, 'fmt': '{n} °C', 'k': 1, 'a': 0}, [K(T(4, 1.2), .4, a=1), K(T(4, 1.2), 2.8, 'out', num=5400), K(T(5, -.2), .6, a=0)], z=20)
[e for e in W if e['id'] == 'earthL'][0]['keys'] += [K(T(4, 2.4), 1, wobble=14), K(T(4, 4.6), 1, wobble=0)]
# 5 · SHAPE WINDOW — a hole opens at the core: a keyhole → an arched window → the whole frame; inside it, London 1798
cap(5, '6 · shape window — the next scene through a morphing opening')
KH = circ(960, 540, 40)
ent('lon', 'group', {'a': 0, 'clipForm': KH}, [K(T(5), .01, a=1), K(T(5, .2), 1.5, 'inOut', clipForm=arch(960, 540, 420, 620)), K(T(5, 2.4), 1.8, 'inOut', clipForm=rect(-40, -40, 2000, 1160)), K(T(5, 4.3), .01, clipForm=None)], z=30,
    children=[{'id': 'paper5', 'type': 'art', 'props': {'name': 'Sky', 'kind': 'day', 'seed': 'reel', 'a': 1}, 'keys': []},
              {'id': 'house5', 'type': 'art', 'props': {'name': 'CavendishHouse', 'x': 1080, 'y': 900, 's': 1.15, 'draw': 1, 'a': 1}, 'keys': []}])
ent('ring5', 'shape', {**ID, 'form': KH, 'col': '#B8862B', 'sw': 10, 'draw': 1, 'a': 0}, [K(T(5), .3, a=1), K(T(5, .2), 1.5, 'inOut', form=arch(960, 540, 420, 620)), K(T(5, 2.4), 1.8, 'inOut', form=rect(-40, -40, 2000, 1160)), K(T(5, 4.2), .3, a=0)], z=31)
for i in ('earth', 'earthL'): [e for e in W if e['id'] == i][0]['keys'].append(K(T(5, 4.2), .1, a=0))
# 6 · BRUSH — the torsion balance is painted over the house in five strokes
cap(6, '7 · brush — the next picture is painted in')
ent('paper6', 'art', {'name': 'Sky', 'kind': 'day', 'seed': 'r6', 'a': 0, 'brush': 0, 'sepia': 1}, [K(T(6), .01, a=1), K(T(6, .2), 2.6, 'linear', brush=1)], z=40)
ent('tors', 'art', {'name': 'TorsionBalance', 'x': 960, 'y': 640, 's': .95, 'big': 1, 'draw': 1, 'a': 0, 'brush': 0}, [K(T(6), .01, a=1), K(T(6, .2), 2.6, 'linear', brush=1), K(T(6, 3.2), 2, turn=6)], z=41)
[e for e in W if e['id'] == 'lon'][0]['keys'].append(K(T(6, 3), .1, a=0))
# 7 · SWARM + SOLID MORPH — the balance blows away as grains that gather into the Earth, which fills with colour
cap(7, '8 · swarm into a solid — the instrument becomes its answer')
for i in ('paper6', 'tors'): [e for e in W if e['id'] == i][0]['keys'].append(K(T(7), 1.0, 'linear', dissolve=0, dissolveDir='left'))
ent('sw7', 'swarm', {'from': rect(320, 520, 1280, 240), 'to': circ(960, 540, 330), 'n': 300, 'k': 0, 'arc': 260, 'size': 3.2, 'col': SEP, 'a': 0}, [K(T(7, .2), .4, a=1), K(T(7, .3), 3, 'inOut', k=1), K(T(7, 3.6), .8, a=0)], z=45)
ent('globe', 'planet', {'kind': 'earth', 'x': 960, 'y': 540, 'size': 660, 'lon': -20, 'lat': 25, 'draw': 0, 'a': 0}, [K(T(7, 2.6), .01, a=1), K(T(7, 2.6), 1.8, draw=1), K(T(7, 2.6), 9, 'linear', lon=40)], z=44)
# 8 · END — the globe bleeds into the title card
cap(8, '9 · ink-bleed into a title')
[e for e in W if e['id'] == 'globe'][0]['keys'].append(K(T(8, .4), 1.8, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=500))
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'one picture\nbecomes the next', 'sub': 'engine v5', 'a': 0, 'r': 330}, [K(T(8, .3), .01, a=1), K(T(8, .3), 3.6, 'linear', k=1)], z=60)

dur = T(N) + 1
tl = {'slug': 'fx-reel', 'duration': dur, 'lines': [{'i': i, 'text': f'segment {i}', 'start': T(i), 'dur': SEG - .2, 'sfx': []} for i in range(N)]}
E = {'slug': 'fx-reel', 'title': 'FX reel v5', 'lines': [{'text': f'segment {i}'} for i in range(N)], 'world': W,
     'music': {'cues': [{'file': '../studio/music/wonder_long_note_one.wav', 'at': 0, 'start': 7, 'db': -4}], 'norm': -18}}
P = os.path.join(H, '../../public/ep/fx-reel'); os.makedirs(P, exist_ok=True)
for d in (H, P): json.dump(E, open(os.path.join(d, 'episode.json'), 'w'), indent=1, ensure_ascii=False); json.dump(tl, open(os.path.join(d, 'timeline.json'), 'w'), indent=1)
print(len(W), 'entities ·', dur, 's')
