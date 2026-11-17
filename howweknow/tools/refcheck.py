#!/usr/bin/env python3
"""REFCHECK — engine v8 (owner 17 Nov 2026: "các thứ vẽ ra chi tiết còn chưa giống lắm"). STYLE.md "True to life" asks for the reference
BESIDE the drawing; this makes that sheet, and lays one over the other so a wrong proportion shows at once.
  python3 tools/refcheck.py <slug> <DrawingName> <reference image> [--props '{"x":…}'] [--box x,y,w,h] [--crop x,y,w,h]
      → out/<slug>_refcheck_<DrawingName>.jpg : reference | our drawing | the drawing laid over the reference (ink in red)
  --box  the part of the 1920×1080 drawing that holds the object (default: its inked area, found automatically)
  --crop the part of the reference that holds the object
Read the overlay: every red line should sit on the object's real edge; fix the drawing until the silhouette, the proportions and 3–5 telling
details (how it is built, what it is made of, how it works) match. The critic is given this sheet with the keyframes (CREATIVE §4b)."""
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageOps, ImageChops
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); os.chdir(R)
def opt(a, k, d=None): return a[a.index('--' + k) + 1] if '--' + k in a else d
a = sys.argv[1:]
if len(a) < 3: sys.exit(__doc__)
slug, name, ref = a[0], a[1], a[2]; props = json.loads(opt(a, 'props', '{}'))
os.makedirs('out', exist_ok=True); still = f'out/_rc_{name}.png'
subprocess.run(['npx', 'remotion', 'still', 'LibSheet', still, '--props=' + json.dumps({'slug': slug, 'only': name, 'props': props}), '--frame=59', '--log=error'], check=True)
blank = f'out/_rc_{name}_0.png'   # the same page at frame 0 (nothing inked yet): the paper, its fibres and vignette — so only the drawing differs
subprocess.run(['npx', 'remotion', 'still', 'LibSheet', blank, '--props=' + json.dumps({'slug': slug, 'only': name, 'props': props}), '--frame=0', '--log=error'], check=True)
d = Image.open(still).convert('RGB'); paper = Image.open(blank).convert('RGB'); os.remove(blank)
diff = np.asarray(ImageChops.difference(d, paper).convert('L')) > 40
if opt(a, 'box'): bx, by, bw, bh = map(int, opt(a, 'box').split(','))
else:
    ys, xs = np.nonzero(diff); bx, by, bw, bh = xs.min(), ys.min(), xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
draw = d.crop((bx, by, bx + bw, by + bh)); ink = Image.fromarray((diff[by:by + bh, bx:bx + bw] * 255).astype(np.uint8))
r = Image.open(ref).convert('RGB')
if opt(a, 'crop'): x, y, w, h = map(int, opt(a, 'crop').split(',')); r = r.crop((x, y, x + w, y + h))
H = 700; r = r.resize((round(r.width * H / r.height), H)); draw = draw.resize((round(draw.width * H / draw.height), H)); ink = ink.resize(draw.size)
ov = Image.new('RGB', draw.size, (243, 231, 204)); fit = ImageOps.contain(ImageOps.grayscale(r).convert('RGB'), draw.size); ov.paste(fit, ((draw.width - fit.width) // 2, (draw.height - fit.height) // 2)); red = Image.new('RGB', draw.size, (200, 40, 30)); ov.paste(red, (0, 0), ink.point(lambda v: 200 if v > 60 else 0))
W = r.width + draw.width + ov.width + 60; sheet = Image.new('RGB', (W, H + 20), (243, 231, 204)); x = 10
for im in (r, draw, ov): sheet.paste(im, (x, 10)); x += im.width + 20
o = f'out/{slug}_refcheck_{name}.jpg'; sheet.save(o, quality=88); os.remove(still); print('refcheck →', o)
