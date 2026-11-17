#!/usr/bin/env python3
"""ENGINE v6 demo (owner 17 Nov 2026): the opening 36 s of "What is inside an atom?" re-shot with v6 — nothing redrawn, only v6 added:
the engraving pass + grain/weave/flicker (engine 6), a cold 'mystery' grade warming at the moor, light shafts + dust + contact shadows in
the lab, a slow push-in from the wide lab to a CLOSE shot of Marsden at the eyepiece with a focus pull, his face alive (focus → awe),
a sheen across the tally sheet, hand-held shake when the particle comes back.
  python3 episodes/v6-demo/build.py   → public/ep/v6-demo/{episode,timeline}.json  (render frames 0-1079 of Story with slug v6-demo)"""
import json, os, sys
H = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); os.chdir(H); sys.path.insert(0, 'tools')
from v6 import shot, rack, shake, grade
E = json.load(open('public/ep/empty-atom/episode.json')); TL = json.load(open('public/ep/empty-atom/timeline.json'))
K = lambda t, dur=1.2, ease='inOut', **p: {'t': t, 'dur': dur, 'ease': ease, **p}
ent = lambda id, type, props, keys=(), z=None: {'id': id, 'type': type, 'props': props, 'keys': list(keys), **({'z': z} if z is not None else {})}
W = {e['id']: e for e in E['world']}
E['slug'] = 'v6-demo'; E['engine'] = 6

# camera: grade + shots
cam = W['camera']; cam['props'].update(grade('mystery'), light=.5, push=1, pan_x=0, pan_y=0, dof=0, focus=.1, shake=0)
cam['keys'] = [
    K(3.2, 5.5, 'glide', **shot('medium', at=(1130, 600))),                    # the wide dark lab → drifting in toward the bench
    K(8.6, 3.2, 'weight', **shot('close', at=(1215, 575)), **rack(.1, 5)),     # → CLOSE on the student at the eyepiece; the room falls soft
    K('L1-0.2', 1.3, 'soft', **shot('wide'), dof=0),                           # into the eyepiece: the page is whole again
    K('L3+2.25', .75, 'out', **shake(.55)), K('L3+3.0', 1.2, 'soft', **shake(0)),   # the particle comes BACK
    K('L4', 3.0, 'soft', **grade('curious')),                                  # out on the moor: warmer air
]
# the lab is lit: shafts from the lamp, dust in them, shadows under the stool and the bench
E['world'] += [
    ent('v6shaft', 'shaft', {'from': [1090, 236], 'to': [1090, 1040], 'w0': 70, 'w1': 560, 'n': 4, 'k': 0, 'para': 0}, [K(2.6, 2.4, 'soft', k=1), K('L1-0.3', 1.0, k=0)], z=5),
    ent('v6motes', 'motes', {'box': [760, 240, 700, 760], 'n': 46, 'k': 0, 'seed': 3, 'para': .3}, [K(3.0, 2.5, 'soft', k=1), K('L1-0.3', 1.0, k=0)], z=6),
    ent('v6sh1', 'shadow', {'x': 1316, 'y': 1004, 'rx': 170, 'ry': 24, 'k': 0}, [K(4.4, 1.2, k=1), K('L1-0.3', .8, k=0)], z=3),
    ent('v6sh2', 'shadow', {'x': 900, 'y': 706, 'rx': 420, 'ry': 22, 'k': 0}, [K(3.0, 1.2, k=.8), K('L1-0.3', .8, k=0)], z=2),
    ent('v6sheen', 'sheen', {'box': [1180, 250, 450, 630], 'rot': 3, 'k': 0}, [K('L2+1.2', 2.2, 'soft', k=1)], z=13),
]
# Marsden is alive, concentrating — and then he sees it
m = W['mars0']; m['props'].update(alive=1, expr='focus', ek=1, look=[.6, .1])
m['keys'] += [K(10.3, .75, ek=0), K(11.05, .9, 'soft', expr='awe', ek=1)]
os.makedirs('public/ep/v6-demo', exist_ok=True)
json.dump(E, open('public/ep/v6-demo/episode.json', 'w')); json.dump(TL, open('public/ep/v6-demo/timeline.json', 'w'))
print('v6-demo →', 'public/ep/v6-demo/', len(E['world']), 'entities')
