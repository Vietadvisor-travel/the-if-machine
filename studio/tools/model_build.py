#!/usr/bin/env python3
"""Low-poly 3D models for the 3D sets (Muse wave 2, 5 Nov 2026; CC0 Kenney / KayKit / Quaternius).
  python3 tools/model_build.py [pack …]   → engine/library/models_data.js  (+ MODELS.md: the name list)
Reads glTF/GLB from ~/.cache/ifm-new/<pack>/ (or icons_raw/models/<pack>/), bakes every node transform into the vertices and every
texture into VERTEX COLOURS (the textures of these packs are flat colour palettes), quantises (int16 positions, uint8 colours,
uint16 indices) and writes one compact file. Packs whose textures are missing are skipped with a warning (they would render white).
Runtime: IFM.model('food/burger') → a THREE.Group with flat-shaded Lambert vertex colours; s3 sets take models="name@x,z,rot,scale|…"."""
import os, sys, json, struct, base64, io, glob, re
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
SRC = [os.path.join(ROOT, 'icons_raw/models'), os.path.expanduser('~/.cache/ifm-new')]
OUT = os.path.join(ROOT, 'engine/library/models_data.js')
PACKS = {'kenney_food3d': 'food', 'kenney_car3d': 'car', 'kenney_roads3d': 'road', 'kenney_pirate3d': 'pirate', 'kenney_survival3d': 'survival',
         'kaykit_city': 'city', 'kaykit_furniture': 'furniture', 'kaykit_restaurant': 'restaurant', 'kaykit_space': 'space', 'kaykit_medieval': 'medieval', 'kaykit_adventurers': 'adventurer',
         'quaternius_nature': 'nature', 'quaternius_props': 'props', 'quaternius_buildings': 'building', 'quaternius_food': 'qfood', 'quaternius_characters': 'character', 'quaternius_spaceships': 'ship'}
CT = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16, 5125: np.uint32, 5126: np.float32}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}

def load(path):
    if path.endswith('.glb'):
        b = open(path, 'rb').read(); off = 12; js = binc = None
        while off < len(b):
            n, t = struct.unpack('<II', b[off:off + 8]); ch = b[off + 8: off + 8 + n]; off += 8 + n
            if t == 0x4E4F534A: js = json.loads(ch)
            elif t == 0x004E4942: binc = ch
        return js, [binc]
    g = json.load(open(path)); d = os.path.dirname(path); bufs = []
    for bf in g.get('buffers', []):
        u = bf.get('uri', ''); bufs.append(base64.b64decode(u.split(',', 1)[1]) if u.startswith('data:') else open(os.path.join(d, u), 'rb').read())
    return g, bufs

def acc(g, bufs, i):
    a = g['accessors'][i]; bv = g['bufferViews'][a['bufferView']]; buf = bufs[bv.get('buffer', 0)]; dt = CT[a['componentType']]; nc = NC[a['type']]
    start = bv.get('byteOffset', 0) + a.get('byteOffset', 0); stride = bv.get('byteStride', 0); isz = np.dtype(dt).itemsize * nc
    if stride and stride != isz:
        raw = np.frombuffer(buf, np.uint8, count=stride * (a['count'] - 1) + isz, offset=start)
        arr = np.stack([np.frombuffer(raw[k * stride: k * stride + isz].tobytes(), dt) for k in range(a['count'])])
    else: arr = np.frombuffer(buf, dt, count=a['count'] * nc, offset=start).reshape(a['count'], nc)
    arr = arr.astype(np.float32)
    if a.get('normalized'): arr = arr / float(np.iinfo(dt).max)
    return arr

def image(g, bufs, d, ti):
    tex = g['textures'][ti]; im = g['images'][tex['source']]
    if 'bufferView' in im: bv = g['bufferViews'][im['bufferView']]; data = bufs[bv.get('buffer', 0)][bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
    else:
        u = im.get('uri', ''); data = base64.b64decode(u.split(',', 1)[1]) if u.startswith('data:') else (open(os.path.join(d, u), 'rb').read() if os.path.exists(os.path.join(d, u)) else None)
    return np.asarray(Image.open(io.BytesIO(data)).convert('RGB')) if data else None

def trs(n):
    if 'matrix' in n: return np.array(n['matrix'], np.float64).reshape(4, 4).T
    t = n.get('translation', [0, 0, 0]); r = n.get('rotation', [0, 0, 0, 1]); s = n.get('scale', [1, 1, 1]); x, y, z, w = r
    R = np.array([[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)], [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)], [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]])
    M = np.eye(4); M[:3, :3] = R * np.array(s)[None, :]; M[:3, 3] = t; return M

def model(path):
    g, bufs = load(path); d = os.path.dirname(path); P, C, I = [], [], []; base = 0; texcache = {}
    def visit(ni, M):
        nonlocal base
        n = g['nodes'][ni]; W = M @ trs(n)
        if 'mesh' in n:
            for pr in g['meshes'][n['mesh']]['primitives']:
                if pr.get('mode', 4) != 4 or 'POSITION' not in pr['attributes']: continue
                pos = acc(g, bufs, pr['attributes']['POSITION']); p4 = np.c_[pos, np.ones(len(pos))] @ W.T
                mat = g['materials'][pr['material']] if 'material' in pr and g.get('materials') else {}; pbr = mat.get('pbrMetallicRoughness', {})
                fac = np.array(pbr.get('baseColorFactor', [1, 1, 1, 1])[:3]); col = np.tile(fac, (len(pos), 1))
                if 'baseColorTexture' in pbr and 'TEXCOORD_0' in pr['attributes']:
                    ti = pbr['baseColorTexture']['index']; img = texcache.get(ti)
                    if img is None: img = texcache[ti] = image(g, bufs, d, ti)
                    if img is None: raise FileNotFoundError('texture missing')
                    uv = acc(g, bufs, pr['attributes']['TEXCOORD_0']); h, w = img.shape[:2]
                    xs = np.clip((uv[:, 0] % 1) * (w - 1), 0, w - 1).astype(int); ys = np.clip((uv[:, 1] % 1) * (h - 1), 0, h - 1).astype(int)
                    col = col * img[ys, xs] / 255.
                if 'COLOR_0' in pr['attributes']: col = col * acc(g, bufs, pr['attributes']['COLOR_0'])[:, :3]
                idx = acc(g, bufs, pr['indices']).astype(np.int64).ravel() if 'indices' in pr else np.arange(len(pos))
                if np.linalg.det(W[:3, :3]) < 0: idx = idx.reshape(-1, 3)[:, ::-1].ravel()
                P.append(p4[:, :3]); C.append(np.clip(col, 0, 1)); I.append(idx + base); base += len(pos)
        for ch in n.get('children', []): visit(ch, W)
    sc = g['scenes'][g.get('scene', 0)]
    for ni in sc['nodes']: visit(ni, np.eye(4))
    if not P: return None
    P = np.concatenate(P); C = np.concatenate(C); I = np.concatenate(I)
    if base > 65535: return None
    lo, hi = P.min(0), P.max(0); span = np.maximum(hi - lo, 1e-6); q = np.round((P - lo) / span * 65535 - 32768).astype(np.int16)
    b64 = lambda a: base64.b64encode(a.tobytes()).decode()
    return {'lo': [round(float(x), 4) for x in lo], 'hi': [round(float(x), 4) for x in hi], 'p': b64(q), 'c': b64((C * 255).round().astype(np.uint8)), 'i': b64(I.astype(np.uint16))}

def main():
    want = sys.argv[1:] or list(PACKS); data = {}; report = []
    for pack in want:
        d = next((os.path.join(s, pack) for s in SRC if os.path.isdir(os.path.join(s, pack))), None)
        if not d: report.append(f'{pack}: not on disk'); continue
        fs = sorted(f for f in glob.glob(d + '/**/*', recursive=True) if f.endswith(('.glb', '.gltf'))); ok = miss = 0
        for f in fs:
            nm = PACKS.get(pack, pack) + '/' + re.sub(r'[^a-z0-9]+', '_', os.path.splitext(os.path.basename(f))[0].lower()).strip('_')
            try: m = model(f)
            except FileNotFoundError: miss += 1; continue
            except Exception as e: continue
            if m: data[nm] = m; ok += 1
        report.append(f'{pack}: {ok} models' + (f', {miss} skipped (texture file missing — ask Muse to re-pack with textures)' if miss else ''))
    js = '/* Low-poly 3D models (CC0: Kenney, KayKit, Quaternius) baked by tools/model_build.py — do not edit by hand. */\n(function () { if (!window.IFM) window.IFM = {}; IFM.MODEL_DATA = ' + json.dumps(data, separators=(',', ':')) + '; })();\n'
    open(OUT, 'w').write(js)
    open(os.path.join(ROOT, 'MODELS.md'), 'w').write('# 3D models (CC0) — `IFM.model(name)` · s3 sets: `models="name@x,z,rot,scale|…"`\n\nGenerated by `tools/model_build.py`.\n\n' + '\n'.join('- ' + r for r in report) + '\n\n' + ', '.join(sorted(data)) + '\n')
    print('\n'.join(report)); print(f'models: {len(data)} · {os.path.getsize(OUT) / 1e6:.1f} MB → {OUT}')

if __name__ == '__main__': main()
