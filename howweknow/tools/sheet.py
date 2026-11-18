#!/usr/bin/env python3
"""ONE contact sheet instead of many images (token-lean, owner 18 Nov 2026). Looking at an image costs the same whether it holds 1 frame or 24.
  python3 tools/sheet.py <slug> --frames 105,450,…      → renders those Story frames, then out/<slug>_sheet_<n>.jpg (24 per sheet, 6×4, 640 px wide cells)
  python3 tools/sheet.py <slug> --video out/x.mp4 --every 6  → one still every 6 s from a video (the animatic)
  python3 tools/sheet.py <slug> --lines 0,5,11 [--at .6]   → the frame at 60 % of each listed line
Prints only the sheet paths."""
import json, os, shutil, subprocess, sys, glob
from PIL import Image, ImageDraw
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); os.chdir(R)
a = sys.argv[1:]; slug = a[0]; opt = lambda k, d=None: a[a.index('--' + k) + 1] if '--' + k in a else d
tmp = f'out/_sheet_{slug}'; shutil.rmtree(tmp, ignore_errors=True); os.makedirs(tmp)
if opt('video'):
    subprocess.run(['ffmpeg', '-v', 'error', '-i', opt('video'), '-vf', f"fps=1/{opt('every', '6')},scale=640:-1", f'{tmp}/%04d.jpg'], check=True)
    files = sorted(glob.glob(f'{tmp}/*.jpg')); tags = [f'{i * float(opt("every", "6")):.0f}s' for i in range(len(files))]
else:
    if opt('lines'):
        T = json.load(open(f'episodes/{slug}/timeline.json'))['lines']; f0 = float(opt('at', '.6'))
        fr = [int((T[i]['start'] + T[i]['dur'] * f0) * 30) for i in map(int, opt('lines').split(','))]
    else: fr = [int(x) for x in opt('frames').split(',')]
    subprocess.run(['npx', 'remotion', 'render', 'Story', f'{tmp}/f', f'--props={{"slug":"{slug}"}}', f'--frames={",".join(map(str, fr))}', '--sequence', '--image-format=jpeg', '--log=error'], check=True)
    files = sorted(glob.glob(f'{tmp}/f/*.jpeg')); tags = [f'{int(os.path.basename(f).split("-")[-1][:-5]) / 30:.1f}s' for f in files]
out = []
for p in range(0, len(files), 24):
    S = Image.new('RGB', (6 * 320, 4 * 180), (20, 14, 8))
    for i, f in enumerate(files[p:p + 24]):
        im = Image.open(f).convert('RGB').resize((320, 180)); ImageDraw.Draw(im).text((4, 3), tags[p + i], fill=(255, 40, 40)); S.paste(im, ((i % 6) * 320, (i // 6) * 180))
    o = f'out/{slug}_sheet_{p // 24}.jpg'; S.save(o, quality=85); out.append(o)
shutil.rmtree(tmp, ignore_errors=True); print(*out)
