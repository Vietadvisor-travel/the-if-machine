#!/usr/bin/env python3
"""In-scene type QA board (internal fixture): the six text styles on paper (left) and on a night sky (right), written on during L0."""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
k = lambda: [{"t": "L0+0.2", "dur": 2.2, "k": 1, "ease": "linear"}]
T = lambda i, st, text, x, y, **o: {"id": f"t{i}", "type": "text", "props": {"text": text, "style": st, "x": x, "y": y, "k": 0, **o}, "keys": k()}
W = [{"id": "camera", "type": "camera", "props": {"x": 960, "y": 540, "zoom": 1}},
     {"id": "night", "type": "group", "props": {"wipe": .5, "wipeDir": "left"}, "children": [{"id": "sky", "type": "art", "props": {"name": "Sky", "kind": "night", "seed": "n"}}]},
     {"id": "earth", "type": "planet", "props": {"kind": "earth", "x": 1500, "y": 760, "size": 300, "lon": 10, "lat": 20}},
     {"id": "watch", "type": "art", "props": {"name": "Stopwatch", "x": 300, "y": 760, "r": 110, "sec": 1.3}},
     T(1, "title", "Clue II · The Shadow", 480, 130),
     T(2, "plate", "Fig. 3. — The mural quadrant at Berlin, 1751.", 480, 330),
     T(3, "note", "sixty Earth radii", 480, 470),
     T(4, "label", "the stopwatch", 640, 640, align="left", to={"screen": [400, 720]}),
     T(5, "figure", "384,400 km", 1440, 300, light=True),
     T(6, "stamp", "Confirmed 1969", 1440, 520),
     T(7, "note", "Alexandria", 1480, 650, light=True, size=44),
     T(8, "title", "The Answer", 1440, 120, light=True)]
E = {"slug": "type-board", "title": "internal type QA board", "lines": [{"text": "type"}], "world": W}
TL = {"slug": "type-board", "duration": 8, "lines": [{"i": 0, "text": "type", "start": 0, "dur": 6}]}
for d in (D, f'{D}/../../public/ep/type-board'):
    os.makedirs(d, exist_ok=True); json.dump(E, open(f'{d}/episode.json', 'w'), indent=1); json.dump(TL, open(f'{d}/timeline.json', 'w'))
print('type-board written')
