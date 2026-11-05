#!/usr/bin/env python3
"""Build the OpenMoji illustration library for the canvas engine (owner, 4 Nov 2026: 2D pictures must be clear,
recognisable things — not vague shapes).
  python3 tools/emoji_build.py            → engine/library/emoji_data.js (+ EMOJI.md: the name list)
Reads icons_raw/illus/openmoji-color/*.svg (OpenMoji, CC BY-SA 4.0 — credit line in every delivery note), keeps the
base glyphs (no skin-tone variants, no private-use extras), converts every shape to an SVG path string so the engine
draws them synchronously with Path2D: IFM.emoji('bread', x, y, size). Names come from Unicode ('bread', 'cow',
'money bag', 'bank', 'flag: Kenya' → 'flag kenya'); see EMOJI.md or IFM.emojiFind('word') in the page."""
import os, re, json, unicodedata, xml.etree.ElementTree as ET
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'icons_raw/illus/openmoji-color'); OUT = os.path.join(ROOT, 'engine/library/emoji_data.js')
SKIN = {'1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'}
REGION = {chr(0x1F1E6 + i): chr(65 + i) for i in range(26)}
ISO = {}
try:
    for ft in json.load(open(os.path.join(ROOT, 'geo_stock/ne_110m_admin_0_countries.geojson')))['features']:
        pr = ft['properties']; iso = pr.get('ISO_A2_EH') or pr.get('ISO_A2')
        if iso and iso != '-99': ISO[iso] = pr.get('NAME') or pr.get('ADMIN')
except Exception: pass
ISO.update({'US': 'United States', 'GB': 'United Kingdom', 'EU': 'European Union', 'UN': 'United Nations', 'VN': 'Vietnam'})
ALIAS = {'shopping cart': 'shopping trolley', 'cigarette': 'smoking symbol', 'dinosaur': 'sauropod', 't rex': 't-rex', 'phone': 'mobile phone',
         'money': 'money bag', 'cash': 'banknote with dollar sign', 'dollar': 'banknote with dollar sign', 'euro': 'banknote with euro sign',
         'house': 'house building', 'home': 'house building', 'shop': 'convenience store', 'store': 'convenience store', 'factory': 'factory',
         'farm': 'tractor', 'car': 'automobile', 'bus': 'bus', 'plane': 'airplane', 'ship': 'ship', 'hospital': 'hospital', 'school': 'school',
         'city': 'cityscape', 'clock': 'alarm clock', 'time': 'hourglass with flowing sand', 'idea': 'electric light bulb', 'question': 'black question mark ornament',
         'tick': 'heavy check mark', 'check': 'heavy check mark', 'cross': 'cross mark', 'warning': 'warning sign', 'chart up': 'chart with upwards trend',
         'chart down': 'chart with downwards trend', 'computer': 'personal computer', 'robot': 'robot face', 'person': 'bust in silhouette', 'people': 'busts in silhouette',
         'crowd': 'busts in silhouette', 'scales': 'scales', 'law': 'scales', 'gold': 'coin', 'oil': 'oil drum', 'fuel': 'fuel pump', 'queue': 'busts in silhouette',
         'world': 'earth globe europe-africa', 'earth': 'earth globe europe-africa', 'sun': 'black sun with rays', 'moon': 'crescent moon', 'fire': 'fire', 'water': 'droplet'}

def name_of(code):
    cps = code.split('-'); chars = [chr(int(c, 16)) for c in cps]
    if all(c in REGION for c in chars) and len(chars) == 2:
        iso = ''.join(REGION[c] for c in chars)
        return 'flag ' + (ISO.get(iso) or iso).lower()
    parts = []
    for c in chars:
        if c in ('‍', '️', '︎', '⃣'): continue
        try: parts.append(unicodedata.name(c).lower())
        except ValueError: return None
    if not parts: return None
    nm = ' '.join(parts)
    nm = re.sub(r'\b(emoji modifier fitzpatrick type-\d|variation selector-\d+)\b', '', nm)
    nm = nm.replace('male sign', 'man').replace('female sign', 'woman')
    return re.sub(r'\s+', ' ', nm).strip()

NUM = re.compile(r'-?\d*\.?\d+(?:e-?\d+)?')
def f(v, d=0.):
    try: return float(v)
    except Exception: return d
def r2(x): s = f'{x:.2f}'.rstrip('0').rstrip('.'); return s if s not in ('-0', '') else '0'
def compact(d):  # round coordinates in a path string to 2 decimals
    return re.sub(r'-?\d*\.\d+(?:e-?\d+)?', lambda m: r2(float(m.group(0))), d.strip()).replace('\n', ' ')

def shape_d(el, tag):
    a = el.attrib
    if tag == 'path': return compact(a.get('d', ''))
    if tag == 'circle':
        cx, cy, r = f(a.get('cx')), f(a.get('cy')), f(a.get('r'))
        return f'M{r2(cx - r)},{r2(cy)}a{r2(r)},{r2(r)} 0 1,0 {r2(2 * r)},0a{r2(r)},{r2(r)} 0 1,0 {r2(-2 * r)},0z'
    if tag == 'ellipse':
        cx, cy, rx, ry = f(a.get('cx')), f(a.get('cy')), f(a.get('rx')), f(a.get('ry'))
        return f'M{r2(cx - rx)},{r2(cy)}a{r2(rx)},{r2(ry)} 0 1,0 {r2(2 * rx)},0a{r2(rx)},{r2(ry)} 0 1,0 {r2(-2 * rx)},0z'
    if tag == 'rect':
        x, y, w, h = f(a.get('x')), f(a.get('y')), f(a.get('width')), f(a.get('height')); rx = f(a.get('rx', a.get('ry', 0))); ry = f(a.get('ry', a.get('rx', 0)))
        if rx <= 0: return f'M{r2(x)},{r2(y)}h{r2(w)}v{r2(h)}h{r2(-w)}z'
        rx, ry = min(rx, w / 2), min(ry, h / 2)
        return (f'M{r2(x + rx)},{r2(y)}h{r2(w - 2 * rx)}a{r2(rx)},{r2(ry)} 0 0 1 {r2(rx)},{r2(ry)}v{r2(h - 2 * ry)}a{r2(rx)},{r2(ry)} 0 0 1 {r2(-rx)},{r2(ry)}'
                f'h{r2(-(w - 2 * rx))}a{r2(rx)},{r2(ry)} 0 0 1 {r2(-rx)},{r2(-ry)}v{r2(-(h - 2 * ry))}a{r2(rx)},{r2(ry)} 0 0 1 {r2(rx)},{r2(-ry)}z')
    if tag == 'line': return f"M{r2(f(a.get('x1')))},{r2(f(a.get('y1')))}L{r2(f(a.get('x2')))},{r2(f(a.get('y2')))}"
    if tag in ('polyline', 'polygon'):
        p = [float(x) for x in NUM.findall(a.get('points', ''))]
        if len(p) < 4: return ''
        d = 'M' + ' L'.join(f'{r2(p[i])},{r2(p[i + 1])}' for i in range(0, len(p) - 1, 2))
        return d + ('z' if tag == 'polygon' else '')
    return ''

def mat_of(t):
    """SVG transform list → [a,b,c,d,e,f]"""
    import math
    M = [1, 0, 0, 1, 0, 0]
    def mul(A, B): return [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]]
    for fn, args in re.findall(r'(\w+)\s*\(([^)]*)\)', t or ''):
        v = [float(x) for x in NUM.findall(args)]
        if fn == 'translate': T = [1, 0, 0, 1, v[0], v[1] if len(v) > 1 else 0]
        elif fn == 'scale': T = [v[0], 0, 0, v[1] if len(v) > 1 else v[0], 0, 0]
        elif fn == 'rotate':
            a = math.radians(v[0]); c, s = math.cos(a), math.sin(a); T = [c, s, -s, c, 0, 0]
            if len(v) == 3: T = mul(mul([1, 0, 0, 1, v[1], v[2]], T), [1, 0, 0, 1, -v[1], -v[2]])
        elif fn == 'matrix' and len(v) == 6: T = v
        elif fn == 'skewX': T = [1, 0, math.tan(math.radians(v[0])), 1, 0, 0]
        elif fn == 'skewY': T = [1, math.tan(math.radians(v[0])), 0, 1, 0, 0]
        else: continue
        M = mul(M, T)
    return M

def style_of(a, inh):
    st = dict(inh)
    for k in ('fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'opacity', 'fill-opacity', 'stroke-opacity'):
        if k in a: st[k] = a[k]
    if 'style' in a:
        for kv in a['style'].split(';'):
            if ':' in kv: k, v = kv.split(':', 1); st[k.strip()] = v.strip()
    return st

def walk(el, inh, M, out):
    tag = el.tag.split('}')[-1]
    a = el.attrib; st = style_of(a, inh)
    if 'transform' in a:
        T = mat_of(a['transform']); M = [M[0] * T[0] + M[2] * T[1], M[1] * T[0] + M[3] * T[1], M[0] * T[2] + M[2] * T[3], M[1] * T[2] + M[3] * T[3], M[0] * T[4] + M[2] * T[5] + M[4], M[1] * T[4] + M[3] * T[5] + M[5]]
    if tag in ('defs', 'clipPath', 'mask'): return
    if tag in ('svg', 'g'):
        for ch in el: walk(ch, st, M, out)
        return
    d = shape_d(el, tag)
    if not d: return
    fill = st.get('fill', '#000000' if tag not in ('line', 'polyline') else 'none'); stroke = st.get('stroke', 'none')
    if fill in ('none', 'transparent') and stroke in ('none', None): return
    op = f(st.get('opacity', 1), 1)
    rec = [d, None if fill in ('none', 'transparent') else fill.lower(), None if stroke in ('none',) else stroke.lower(), r2(f(st.get('stroke-width', 1), 1))]
    extra = {}
    if op < .999: extra['o'] = r2(op)
    if st.get('fill-rule') == 'evenodd': extra['e'] = 1
    if M != [1, 0, 0, 1, 0, 0]: extra['m'] = [float(r2(x)) for x in M]
    if extra: rec.append(extra)
    out.append(rec)

def main():
    data, names = {}, {}
    for fn in sorted(os.listdir(SRC)):
        if not fn.endswith('.svg'): continue
        code = fn[:-4]; cps = code.split('-')
        if any(c in SKIN for c in cps) or any(0xE000 <= int(c, 16) <= 0xF8FF for c in cps): continue
        nm = name_of(code)
        if not nm: continue
        try: root = ET.parse(os.path.join(SRC, fn)).getroot()
        except ET.ParseError: continue
        out = []; walk(root, {}, [1, 0, 0, 1, 0, 0], out)
        if not out: continue
        key = code.replace('-FE0F', '')
        data[key] = out
        if nm not in names or len(key) < len(names[nm]): names[nm] = key
    for a, b in ALIAS.items():
        if a not in names and b in names: names[a] = names[b]
    js = ('/* OpenMoji illustrations (CC BY-SA 4.0, https://openmoji.org) converted by tools/emoji_build.py — do not edit by hand. */\n'
          '(function () { if (!window.IFM) window.IFM = {}; IFM.EMOJI_DATA = ' + json.dumps(data, separators=(',', ':')) +
          '; IFM.EMOJI_NAMES = ' + json.dumps(names, separators=(',', ':')) + '; })();\n')
    open(OUT, 'w').write(js)
    md = ['# Illustration library — OpenMoji (CC BY-SA 4.0)', '', 'Generated by `tools/emoji_build.py`. Use `IFM.emoji(\'<name>\', x, y, size)` in a bespoke act or',
          '`e=<name>` in the explainer kits (`studio/references/explainer-kit.md`). Credit line for every delivery: "Illustrations: OpenMoji (openmoji.org), CC BY-SA 4.0".', '',
          f'{len(names)} names:', '']
    md += [', '.join(sorted(names))]
    open(os.path.join(ROOT, 'EMOJI.md'), 'w').write('\n'.join(md) + '\n')
    print(f'emoji: {len(data)} glyphs, {len(names)} names, {os.path.getsize(OUT) / 1e6:.1f} MB → {OUT}')

if __name__ == '__main__': main()
