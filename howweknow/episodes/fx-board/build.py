#!/usr/bin/env python3
"""FX QA board (internal fixture, never a film): two boards of 8 cells — every reveal/paper move on board A (L0), every real-stock
artefact incl. FOOTAGE on board B (L1). python3 episodes/fx-board/build.py → episode.json + timeline.json; stills at 0.6/1.2/2/3.5 s of each line."""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
CW, CH = 480, 540
def cell(i): return [(i % 4) * CW, (i // 4) * CH, CW, CH]
def C(i): x, y, w, h = cell(i); return x + w / 2, y + h / 2
A = 'L0'; B = 'L1'
def on(t): return [{"t": t, "dur": 0.01, "a": 1}]
def off(t): return [{"t": t, "dur": 0.01, "a": 0}]
W = [{"id": "camera", "type": "camera", "props": {"x": 960, "y": 540, "zoom": 1}},
     {"id": "grid", "type": "shape", "props": {"form": "M25 0 V100 M50 0 V100 M75 0 V100 M0 50 H100", "x": 960, "y": 540, "s": 1, "sw": 1, "draw": 1, "col": "#8C6E4A"}}]
# hack: the shape box is 0-100 → scale to the frame with s; use a non-uniform frame grid instead
W[1] = {"id": "grid", "type": "art", "props": {"name": "Ridge", "y": 2000, "amp": 0, "seed": "x"}}
fx = [  # board A: (name, art props, fx start props, fx end props, label)
  ("wipe right", {"name": "Astrolabe", "r": 160}, {"wipe": 0}, {"wipe": 1}),
  ("wipe diag", {"name": "Stopwatch", "r": 150, "sec": 1.5}, {"wipe": 0, "wipeDir": "diag"}, {"wipe": 1}),
  ("iris", {"name": "Rose", "r": 170}, {"iris": 0}, {"iris": 1}),
  ("unroll", {"name": "DocumentPage", "src": "stock/_qa/doc.jpg", "w": 400, "h": 275, "circle": [.38, .3, .7, .1], "circleK": 0}, {"unroll": 0}, {"unroll": 1, "circleK": 1}),
  ("blinds", {"name": "Pinned", "src": "stock/_qa/photo.jpg", "w": 340, "h": 240, "caption": "Plate II. — blinds"}, {"blinds": 0}, {"blinds": 1}),
  ("tear", {"name": "Clipping", "src": "stock/_qa/photo.jpg", "w": 380, "h": 280, "seed": "t1"}, {"tear": 0}, {"tear": 1}),
  ("flipY + back", {"name": "CabinetCard", "src": "stock/_qa/photo.jpg", "w": 240, "h": 300, "caption": "Studio of QA, 1888"}, {"flipY": -90}, {"flipY": 0}),
  ("flipX + scale", {"name": "Telescope", "s": 260}, {"flipX": 80, "fx_s": .4}, {"flipX": 0, "fx_s": 1}),
]
art = [  # board B: artefacts with FOOTAGE (play = when the clip starts) + life
  ("Pinned video", {"name": "Pinned", "src": "stock/_qa/clip.mp4", "w": 360, "h": 220, "caption": "Fig. 1 — footage pinned", "play": B, "vin": 2}, {"lift": 0}, {"lift": 18}),
  ("Eyepiece video", {"name": "Eyepiece", "src": "stock/_qa/clip.mp4", "r": 170, "cross": 1, "play": B, "vin": 5, "vdur": 2}, {"breathe": 1}, {"breathe": 1}),
  ("OldScreen video", {"name": "OldScreen", "src": "stock/_qa/clip.mp4", "w": 400, "play": B}, {"tremble": 0}, {"tremble": 2}),
  ("FilmStrip video", {"name": "FilmStrip", "src": "stock/_qa/clip.mp4", "w": 440, "play": B, "vin": 1}, {"sway": 10}, {"sway": 10}),
  ("Loupe on doc", {"name": "Loupe", "src": "stock/_qa/doc.jpg", "r": 150, "focus": [.2, .5], "zoom": 2.2}, {"bob": 6}, {"bob": 6}),
  ("DocumentPage line", {"name": "DocumentPage", "src": "stock/_qa/doc.jpg", "w": 400, "h": 275, "circle": [.38, .48, .7, .05], "circleK": 0, "mark": "line"}, {"fx_r": -8}, {"fx_r": 0, "circleK": 1}),
  ("sepia + dim", {"name": "Ship", "s": 200}, {"sepia": 0, "dim": 0}, {"sepia": 1, "dim": .6}),
  ("Scholar", {"name": "Scholar", "h": 360, "pose": "point"}, {"sway": 0}, {"sway": 4}),
]
for b, (rows, T) in enumerate([(fx, A), (art, B)]):
    for i, (lab, p, p0, p1) in enumerate(rows):
        x, y = C(i); box = cell(i); P = dict(p); n = P['name']
        if n in ('Astrolabe', 'Stopwatch', 'Rose', 'Eyepiece', 'Loupe'): P.update(x=x, y=y - 20)
        elif n in ('Telescope',): P.update(x=x - 40, y=y + 150)
        elif n in ('Ship',): P.update(x=x, y=y + 40)
        elif n == 'Scholar': P.update(x=x, y=y + 200)
        else: P.update(x=x, y=y - 10)
        if n == 'Loupe': P.update(srcW=1600, srcH=1100)
        P.update(p0); P.update(fx_box=box, a=0)
        W.append({"id": f"{'ab'[b]}{i}", "type": "art", "props": P, "keys": on(T) + [{"t": T + "+0.3", "dur": 2.2, "ease": "back" if 'back' in lab else "inOut", **p1}] + off(T + "$")})
        W.append({"id": f"{'ab'[b]}{i}l", "type": "label", "props": {"text": lab, "x": x, "y": box[1] + CH - 30, "size": 26, "a": 0}, "keys": on(T) + off(T + "$")})
E = {"slug": "fx-board", "title": "internal FX QA board (not a film)", "lines": [{"text": "board A reveals"}, {"text": "board B artefacts"}], "world": W}
TL = {"slug": "fx-board", "duration": 10, "lines": [{"i": 0, "text": "board A reveals", "start": 0, "dur": 4.8}, {"i": 1, "text": "board B artefacts", "start": 5, "dur": 4.8}]}
json.dump(E, open(f'{D}/episode.json', 'w'), indent=1); json.dump(TL, open(f'{D}/timeline.json', 'w'))
os.makedirs(f'{D}/../../public/ep/fx-board', exist_ok=True)
for f, o in (('episode', E), ('timeline', TL)): json.dump(o, open(f'{D}/../../public/ep/fx-board/{f}.json', 'w'))
print('fx-board written')
