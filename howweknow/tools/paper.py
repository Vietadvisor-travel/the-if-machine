#!/usr/bin/env python3
"""Pre-render the FATHOM paper (STYLE.md §1): public/core/paper.jpg (the sheet: laid fibres, mottling, foxing, warm vignette) and
public/core/fibres.jpg (near-white fibre texture, multiplied over EVERYTHING so drawings and real stock share one paper)."""
import os
import numpy as np
from PIL import Image
os.makedirs('public/core', exist_ok=True)
W, H = 1920, 1080; r = np.random.default_rng(11)
def noise(sx, sy, amp):
    n = r.random((max(2, H // sy), max(2, W // sx))).astype(np.float32)
    return np.asarray(Image.fromarray((n * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), dtype=np.float32) / 255 * amp
fib = noise(64, 2, 1) + noise(220, 6, .7) + noise(8, 8, .35); fib = (fib - fib.min()) / (fib.max() - fib.min())
img = np.array([243, 231, 204], np.float32) * (0.93 + 0.09 * fib[..., None])
yy, xx = np.ogrid[:H, :W]
for (x, y, rad) in [(.08, .88, .05), (.92, .12, .06), (.85, .9, .035), (.3, .06, .03)]:
    d = np.sqrt((xx - x * W) ** 2 + (yy - y * H) ** 2) / (rad * W); img = img * (1 - 0.10 * np.clip(1 - d, 0, 1)[..., None] * np.array([0, .25, .55]))
v = np.sqrt(((xx - W / 2) / (W * .75)) ** 2 + ((yy - H / 2) / (H * .75)) ** 2); img = img * (1 - 0.22 * np.clip(v - .55, 0, 1)[..., None] / .45)
Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save('public/core/paper.jpg', quality=92)
m = 255 - (fib * 38); Image.fromarray(np.clip(np.stack([m, m - 4, m - 12], -1), 0, 255).astype(np.uint8)).save('public/core/fibres.jpg', quality=92)
print('paper → public/core/paper.jpg, fibres.jpg')
