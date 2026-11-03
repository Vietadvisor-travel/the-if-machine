#!/usr/bin/env python3
"""python3 tools/montage.py out.jpg a.jpg b.jpg … [--w 640] [--cols 3] — contact sheet with time labels (for frame checks)."""
import sys, os
from PIL import Image, ImageDraw
a = sys.argv[1:]; w = int(a[a.index('--w') + 1]) if '--w' in a else 640; cols = int(a[a.index('--cols') + 1]) if '--cols' in a else 3
files = [x for i, x in enumerate(a[1:]) if not x.startswith('--') and (i == 0 or a[i] not in ('--w', '--cols'))]
ims = [Image.open(f).convert('RGB') for f in files]; ims = [im.resize((w, round(im.height * w / im.width))) for im in ims]
h = max(im.height for im in ims); rows = (len(ims) + cols - 1) // cols; out = Image.new('RGB', (cols * w, rows * (h + 22)), (20, 20, 20)); d = ImageDraw.Draw(out)
for i, (im, f) in enumerate(zip(ims, files)): x, y = (i % cols) * w, (i // cols) * (h + 22); out.paste(im, (x, y)); d.text((x + 6, y + h + 4), os.path.basename(f), fill=(220, 220, 220))
out.save(a[0], quality=85); print(a[0])
