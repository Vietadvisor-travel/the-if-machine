#!/usr/bin/env python3
"""pipeline-test — INTERNAL end-to-end engine test (not a film, never shown): voice → mix (one bed + 1 sfx) → world with a per-film
drawing (src/lib/pipeline-test) + a per-film costume + footage in an eyepiece + a document → render → srt → thumbnail. SHORT=1 bash tools/make.sh pipeline-test"""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
lines = [
 ("Look closely at a swinging weight, and you will find a *clock* hidden inside it.", dict(**{"in": "ink-on", "trans": "light-change", "cam": "hold", "comp": "room-wide"})),
 ("A young man watched a lamp swing in a cathedral, and something did not *add* up.", dict(**{"in": "drop", "trans": "match", "cam": "push", "comp": "figure-left"})),
 ("Wide swings and small swings seemed to take the *same* time.", dict(**{"in": "grow", "trans": "morph", "cam": "hold", "comp": "lamp-centre"})),
 ("He checked it against the one clock he always carried: his own *pulse*.", dict(**{"in": "stamp", "trans": "trace", "cam": "push", "comp": "close-face"})),
 ("Today we can watch the same thing through an *eyepiece*.", dict(**{"in": "iris", "trans": "window", "cam": "hold", "comp": "eyepiece-right"})),
 ("And on paper, the whole rule fits in a single *line*.", dict(**{"in": "unroll", "trans": "real-reveal", "cam": "pull", "comp": "page-left"})),
 ("A weight on a string had become a way to *measure* time.", dict(**{"in": "quill", "trans": "window-close", "cam": "pull", "comp": "room-wide"})),
]
on = lambda t, d=1.2, **k: {"t": t, "dur": d, **k}
W = [
 {"id": "camera", "type": "camera", "props": {"x": 960, "y": 540, "zoom": 1}},
 {"id": "wall", "type": "art", "props": {"name": "Sky", "kind": "dusk", "seed": "w", "dim": .2}, "keys": [on("L0", 3, dim=0)]},
 {"id": "win", "type": "art", "props": {"name": "Window", "x": 1500, "y": 420, "w": 280, "h": 520, "floor": 1080, "draw": 0, "light": 0}, "keys": [on(0.3, 2, draw=1, ease="out"), on("L0@clock", 2, light=1)]},
 {"id": "shelf", "type": "art", "props": {"name": "Bookshelf", "x": 300, "y": 820, "w": 420, "h": 600, "draw": 0}, "keys": [on(0.6, 2.2, draw=1, ease="out")]},
 {"id": "lamp", "type": "art", "props": {"name": "PtSwingLamp", "x": 960, "y": -20, "len": 520, "amp": 14, "draw": 0, "fx_y": -500}, "keys": [on("L1", 1.4, draw=1, fx_y=0, ease="back"), on("L2", 3, amp=4), on("L2+3.2", 2, amp=14)]},
 {"id": "trace", "type": "arc", "props": {"from": {"screen": [820, 600]}, "to": {"screen": [1100, 600]}, "bend": -40, "k": 0, "label": "the same time"}, "keys": [on("L2@same", 1.4, k=1), on("L3+.5", .8, a=0)]},
 {"id": "who", "type": "art", "props": {"name": "Person", "who": "a young observer (generic)", "x": -200, "y": 1000, "h": 520, "costume": "ptStudent", "walk": 0, "face": {"nose": .4, "chin": .3, "brow": .5}, "hairCol": "#231A16"},
  "keys": [on("L1", 3.5, x=520, walk=3.5, ease="linear"), on("L1+3.5", .01, walk=None, pose="stand", pose2="look", pk=0), on("L1+3.6", 1.2, pk=1), on("L3", 1.2, pose2="think", pk=1)]},
 {"id": "watch", "type": "art", "props": {"name": "Stopwatch", "x": 1550, "y": 330, "r": 110, "sec": 0, "draw": 0}, "keys": [on("L2", 1, draw=1, ease="out"), on("L2", 6, sec=4.8, ease="linear"), on("L3$", .8, draw=0)]},
 {"id": "pulse", "type": "ripple", "props": {"at": {"screen": [600, 640]}, "k": 0, "n": 4, "r": 140, "col": "#8C3424"}, "keys": [on("L3@pulse", 1.6, k=1, ease="out")]},
 {"id": "eye", "type": "art", "props": {"name": "Eyepiece", "x": 1400, "y": 520, "r": 230, "src": "stock/_qa/clip.mp4", "play": "L4", "vin": 2, "cross": .6, "draw": 0, "fx_box": [1140, 260, 520, 520]},
  "keys": [on("L4", 1.4, draw=1, ease="out"), on("L5", 1, iris=0, ease="in")]},
 {"id": "doc", "type": "art", "props": {"name": "DocumentPage", "src": "stock/_qa/doc.jpg", "x": 1300, "y": 520, "w": 640, "h": 440, "circle": [.38, .48, .7, .06], "circleK": 0, "mark": "line", "unroll": 0, "fx_box": [980, 300, 640, 440]},
  "keys": [on("L5", 1.6, unroll=1), on("L5@line", 1.2, circleK=1)]},
 {"id": "dim", "type": "art", "props": {"name": "Sky", "kind": "night", "seed": "e", "a": 0}, "keys": [on("L6+1", 2.5, a=.85)]},
 {"id": "quill", "type": "hand", "props": {"at": {"screen": [900, 600]}, "s": .9, "a": 0}, "keys": [on("L6", .4, a=1), on("L6+.4", 2.4, at={"screen": [1300, 640]}), on("L6+3", .6, a=0)]},
 {"id": "rule", "type": "shape", "props": {"form": "M0 50 C25 20 75 20 100 50", "x": 1100, "y": 620, "s": 4, "draw": 0, "col": "#B8862B", "sw": 4}, "keys": [on("L6", 3, draw=1, ease="linear")]},
]
E = {"slug": "pipeline-test", "title": "internal pipeline test (never shown)", "voice": "af_heart", "speed": 0.86, "lead": 1.0, "tail": 3.4,
     "music": {"file": "../studio/music/wonder_silver_blue_light.wav", "db": -24, "start": 0},
     "thumb": {"t": 12, "title": "The clock inside a *swing*", "kicker": "internal test"},
     "new_ideas": ["per-film drawing library", "footage in an eyepiece"],
     "lines": [{"text": t, "gap": .7, "plan": p, **({"sfx": [{"at": .8, "file": "public/sfx/machine_chime_1.wav", "db": -20}]} if i == 2 else {})} for i, (t, p) in enumerate(lines)],
     "world": W}
json.dump(E, open(f'{D}/episode.json', 'w'), indent=1); print('pipeline-test episode.json written')
