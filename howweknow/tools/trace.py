#!/usr/bin/env python3
"""TRACE — engine v8 (owner 17 Nov 2026: "các thứ vẽ ra chi tiết còn chưa giống lắm, xem làm sao nâng cấp cho đẹp hơn").
A drawing is TRUE when its silhouette, proportions and the lines that carry its construction come from the real thing. This tool reads a
PUBLIC-DOMAIN / CC0 reference (a photo, a plate, a patent drawing) and gives back the real geometry as vector data in a unit box, which the
film's own component then INKS in the house style (Region washes, hatching on the shade side, swelling line) — never the photo itself.
  python3 tools/trace.py <slug> <image> --as <Name> --licence "Public domain (…)" [--crop x,y,w,h] [--bg light|dark] [--detail 1.0] [--levels 3] [--keep x,y;x,y;… (a rough polygon round the object, source px)]
      → src/lib/<slug>/traced/<Name>.json  {w, h, outline: [d…], parts: [d…] (tone regions, darkest first), lines: [d…] (construction lines)}
      → out/<slug>_trace_<Name>.jpg        (the reference beside the traced ink, to check by eye)
In the film's component:   import { Traced } from '../../paint/traced'; import T from './traced/Heliometer.json';
                           <Traced data={T} x={…} y={…} w={…} draw={draw} mats={['brass', 'wood']} />   (or read T's paths and draw over them)
LAW: only references whose licence is Public domain / PD-* / CC0 are traced (a trace of a copyrighted photo is a derivative work). CC BY-SA /
NC references stay what they are for: looking. The licence line is recorded in jobs/stock_pd/<slug>.md."""
import json, os, re, sys
import numpy as np
from PIL import Image, ImageFilter
from skimage import measure, feature, filters, morphology
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OK = re.compile(r'public\s*domain|\bpd\b|pd-|cc0|cc-zero', re.I)

def opt(a, k, d=None): return a[a.index('--' + k) + 1] if '--' + k in a else d

def paths(contours, h, w, tol, minlen):
    out = []
    for c in contours:
        if len(c) < 4: continue
        c = measure.approximate_polygon(c, tol)
        L = np.sum(np.hypot(*np.diff(c, axis=0).T)) if len(c) > 1 else 0
        if L < minlen: continue
        out.append('M' + ' L'.join(f'{p[1] / w:.4f} {p[0] / h * (h / w):.4f}' for p in c) + ('Z' if np.allclose(c[0], c[-1]) else ''))
    return out

def main(a):
    slug, src = a[0], a[1]; name = opt(a, 'as') or os.path.splitext(os.path.basename(src))[0]; lic = opt(a, 'licence', '')
    if not OK.search(lic): sys.exit(f'trace: refused — licence "{lic}" is not Public domain / CC0 (a trace would be a derivative work)')
    im = Image.open(src).convert('L')
    if opt(a, 'crop'): x, y, w, h = map(int, opt(a, 'crop').split(',')); im = im.crop((x, y, x + w, y + h))
    s = 900 / max(im.size); im = im.resize((round(im.size[0] * s), round(im.size[1] * s)), Image.LANCZOS)
    g = np.asarray(im.filter(ImageFilter.GaussianBlur(1.2)), dtype=float) / 255; h, w = g.shape; det = float(opt(a, 'detail', 1.0)); lv = int(opt(a, 'levels', 3))
    dark_bg = opt(a, 'bg', 'light') == 'dark'
    keep = np.ones_like(g, dtype=bool)
    if opt(a, 'keep'):   # only what lies inside the rough polygon drawn round the object (a museum photo has a room behind it)
        from PIL import ImageDraw
        cx0, cy0 = (map(int, opt(a, 'crop').split(',')[:2]) if opt(a, 'crop') else (0, 0))
        pts = [((float(p.split(',')[0]) - cx0) * s, (float(p.split(',')[1]) - cy0) * s) for p in opt(a, 'keep').split(';')]
        km = Image.new('L', (w, h), 0); ImageDraw.Draw(km).polygon(pts, fill=255); keep = np.asarray(km) > 0
    # 1. silhouette: the object against its ground (Otsu), cleaned, largest pieces kept
    t = filters.threshold_otsu(g); obj = g > t if dark_bg else g < t
    obj = morphology.remove_small_objects(morphology.closing(obj & keep, morphology.disk(3)), max_size=400)
    outline = paths(measure.find_contours(obj.astype(float), .5), h, w, 1.6 / det, 60)
    # 2. tone regions inside it: quantized luminance (darkest first) — the shade side the hatching follows
    qs = np.quantile(g[obj] if obj.any() else g, np.linspace(0, 1, lv + 1)[1:-1]); parts = []
    for q in qs:
        m = morphology.remove_small_objects((g < q) & obj, max_size=250)
        parts += paths(measure.find_contours(m.astype(float), .5), h, w, 2.0 / det, 80)
    # 3. construction lines: edges (Canny) linked into strokes, long ones only
    e = feature.canny(g, sigma=2.0 / det, low_threshold=.05, high_threshold=.14) & morphology.dilation(obj, morphology.disk(4)).astype(bool)
    lines = paths(measure.find_contours(morphology.dilation(e, morphology.disk(1)).astype(float), .5), h, w, 1.2 / det, 50)
    data = {'w': 1, 'h': round(h / w, 4), 'src': os.path.basename(src), 'licence': lic, 'outline': outline, 'parts': parts, 'lines': lines[:400]}
    D = f'{R}/src/lib/{slug}/traced'; os.makedirs(D, exist_ok=True); json.dump(data, open(f'{D}/{name}.json', 'w'))
    # the check sheet: reference | traced ink
    from PIL import ImageDraw
    sheet = Image.new('RGB', (w * 2 + 30, h + 20), '#F3E7CC'); sheet.paste(im.convert('RGB'), (10, 10)); d = ImageDraw.Draw(sheet)
    def poly(p, col, width, fill=None):
        pts = [(10 + w + 20 + float(x) * w, 10 + float(y) * w) for x, y in re.findall(r'([\d.]+) ([\d.]+)', p)]
        if len(pts) > 1:
            if fill: d.polygon(pts, fill=fill)
            d.line(pts, fill=col, width=width)
    for p in parts: poly(p, '#8C6E4A', 1, fill='#C9AE84')
    for p in outline: poly(p, '#2B1D12', 3)
    for p in lines[:400]: poly(p, '#2B1D12', 1)
    os.makedirs(f'{R}/out', exist_ok=True); sheet.save(f'{R}/out/{slug}_trace_{name}.jpg', quality=88)
    L = f'{R}/../jobs/stock_pd/{slug}.md'
    if os.path.exists(L) and name not in open(L).read(): open(L, 'a').write(f'| traced/{name}.json | traced from {os.path.basename(src)} | — | — | {lic} | (trace) |\n')
    print(f'trace {name}: outline {len(outline)} · tone parts {len(parts)} · lines {len(lines)} → src/lib/{slug}/traced/{name}.json · check out/{slug}_trace_{name}.jpg')

if __name__ == '__main__':
    if len(sys.argv) < 3: sys.exit(__doc__)
    main(sys.argv[1:])
