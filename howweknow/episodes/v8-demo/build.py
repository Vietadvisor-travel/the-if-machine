#!/usr/bin/env python3
"""ENGINE v8 sample (owner 17 Nov 2026: "sáng tạo ra các thứ mới… vẽ chi tiết giống hơn… hạt phim vừa phải"): the new pieces in one 12-second
scene — two Harvard women in the v8 costume (a white shirtwaist over a long dark skirt that drapes when she sits), the HarvardPlateRoom set,
a glass plate that SHATTERS (v8 Fx `shatter`), and a page that BURNS away to reveal the next picture (v8 Fx `burn`); the lighter held grain.
  python3 episodes/v8-demo/build.py → public/ep/v8-demo/ (render Story, slug v8-demo)"""
import json, os
H = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); os.chdir(H)
K = lambda t, dur=1.2, ease='inOut', **p: {'t': t, 'dur': dur, 'ease': ease, **p}
SKIRT = lambda top, topT, mat, t: {'coat': .03, 'mat': mat, 't': t, 'flare': .07, 'leg': mat, 'legT': t, 'shoe': 'boot', 'neck': 'none', 'hat': 'none', 'hair': 'bun', 'sleeve': 1.12, 'top': top, 'topT': topT}
W = [
  {'id': 'camera', 'type': 'camera', 'props': {'x': 960, 'y': 540, 'zoom': 1, 'drift': .5, 'light': .3, 'push': 1, 'pan_x': 0, 'pan_y': 0}, 'keys': [K(0, 12, 'linear', push=1.08)]},
  {'id': 'room', 'type': 'art', 'props': {'name': 'HarvardPlateRoom', 'x': 960, 'y': 540, 's': 1, 'draw': 1, 'a': 1, 'burn': 1, 'burnAt': [300, 900], 'dissolveSeed': 21}, 'keys': [K(8.0, 2.6, 'linear', burn=0)], 'z': 6},
  {'id': 'w1', 'type': 'art', 'props': {'name': 'Person', 'who': 'a woman at her plate stand (v8 costume)', 'x': 200, 'y': 1080, 'h': 620, 'facing': 1, 'pose': 'sit', 'pose2': 'sitpeer', 'pk': 0, 'alive': 1,
     'expr': 'focus', 'ek': 1, 'look': [.7, .5], 'hairCol': '#4A3220', 'skin': .24, 'face': {'nose': .45, 'brow': .4, 'chin': .4, 'age': .3, 'build': .9}, 'costume': SKIRT('paper', .14, 'night', .78), 'a': 1, 'burn': 1, 'burnAt': [300, 900], 'dissolveSeed': 21},
   'keys': [K(1.0, 1.6, 'soft', pk=1), K(8.0, 2.6, 'linear', burn=0)], 'z': 12},
  {'id': 'w2', 'type': 'art', 'props': {'name': 'Person', 'who': 'a woman holding a plate to the window (v8 costume)', 'x': 1640, 'y': 760, 'h': 400, 'facing': -1, 'pose': 'stand', 'pose2': 'hold', 'pk': 0, 'alive': 1,
     'hairCol': '#7A5A3A', 'skin': .22, 'face': {'nose': .4, 'brow': .35, 'chin': .35, 'age': .2, 'build': .85}, 'costume': SKIRT('paper', .1, 'wall', .72), 'a': 1, 'burn': 1, 'burnAt': [300, 900], 'dissolveSeed': 21},
   'keys': [K(1.6, 1.6, 'soft', pk=1), K(8.0, 2.6, 'linear', burn=0)], 'z': 10},
  {'id': 'plate', 'type': 'art', 'props': {'name': 'GlassPlateSky', 'x': 1000, 'y': 520, 'w': 520, 'h': 420, 'frame': 0, 'neg': 1, 'rot': -3, 'draw': 1, 'a': 0, 'shatter': 0, 'shatterAt': [1060, 470], 'fx_box': [740, 310, 520, 420]},
   'keys': [K(2.5, .8, a=1), K(4.6, .9, 'linear', shatter=.12), K(5.6, 1.8, 'in', shatter=1)], 'z': 30},
]
TL = {'slug': 'v8-demo', 'duration': 12.0, 'lines': [{'i': 0, 'text': 'v8', 'start': .5, 'dur': 11.0}]}
E = {'slug': 'v8-demo', 'engine': 8, 'lines': [{'text': 'v8', 'gap': 0}], 'world': W}
os.makedirs('public/ep/v8-demo', exist_ok=True)
json.dump(E, open('public/ep/v8-demo/episode.json', 'w')); json.dump(TL, open('public/ep/v8-demo/timeline.json', 'w')); print('v8-demo →', len(W), 'entities')
