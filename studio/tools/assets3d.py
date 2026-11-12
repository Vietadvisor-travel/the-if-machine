#!/usr/bin/env python3
"""The house 3D asset store (never in git; rebuilt per session from Drive).

  python3 tools/assets3d.py sync                  # pull TheIfMachine_Media/_assets3d from Drive → assets3d_src/, unzip, build all
  python3 tools/assets3d.py build                 # (re)build every asset found in assets3d_src/
  python3 tools/assets3d.py add <path> [--id hdr/name] [--size 1024]   # one file (.hdr .glb) or one PBR folder/zip
  python3 tools/assets3d.py story stories/<slug>.story   # build only the assets a story names (+ the shared clip libraries)
  python3 tools/assets3d.py list                  # ids built and ready (assets="hdr/x glb/y tex/z", env=hdr/x …)

Output: engine/assets3d/<kind>__<name>.js  →  IFM.L3.ASSET_DATA["<kind>/<name>"] = {...}
Kinds: hdr (equirect .hdr), glb (people, props, animation libraries), tex (PBR set: color normal rough ao metal; 1k by default).
"""
import base64, io, json, os, re, shutil, subprocess, sys, zipfile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT = os.path.join(ROOT, 'assets3d_src'), os.path.join(ROOT, 'engine', 'assets3d')
MAPS = {'color': r'\b(basecolor|base color|albedo|diff(use)?|color|col)\b', 'normal': r'\b(nor(mal)? ?gl|normalgl|normal|nor)\b', 'rough': r'\b(rough(ness)?|rgh)\b', 'ao': r'\b(ambientocclusion|ao|occlusion)\b', 'metal': r'\b(metal(ness|lic)?)\b'}
tok = lambda f: re.sub(r'[_\-. ]+', ' ', os.path.basename(f).lower())   # 'floor_tiles_08_2k_Diffuse.jpg' -> 'floor tiles 08 2k diffuse jpg' (underscores used to defeat \b)
slug = lambda s: re.sub(r'[^a-z0-9_\-]+', '_', s.lower()).strip('_')

def write(aid, data):
    os.makedirs(OUT, exist_ok=True); p = os.path.join(OUT, aid.replace('/', '__') + '.js')
    with open(p, 'w') as f: f.write('IFM.L3.ASSET_DATA[%s]=%s;\n' % (json.dumps(aid), json.dumps(data, separators=(',', ':'))))
    return p, os.path.getsize(p)

def b64(path): return base64.b64encode(open(path, 'rb').read()).decode()

def tex_map(path, size):
    from PIL import Image
    im = Image.open(path); im = im.convert('RGB') if im.mode not in ('RGB', 'L') else im
    if max(im.size) > size: im.thumbnail((size, size), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=88); return {'mime': 'image/jpeg', 'b64': base64.b64encode(buf.getvalue()).decode()}

def add(path, aid=None, size=1024):
    path = os.path.abspath(path); name = slug(os.path.splitext(os.path.basename(path.rstrip('/')))[0])
    if path.endswith('.zip'):
        d = os.path.join(SRC, '_unz', name); os.makedirs(d, exist_ok=True); zipfile.ZipFile(path).extractall(d); path = d
    if os.path.isdir(path):
        files = [os.path.join(r, f) for r, _, fs in os.walk(path) for f in fs if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        maps = {}
        for k, rx in MAPS.items():
            hits = [f for f in files if re.search(rx, tok(f))]
            if k == 'normal': hits = sorted(hits, key=lambda f: (('_gl' not in f.lower() and 'normalgl' not in f.lower()), len(f)))
            if hits: maps[k] = tex_map(hits[0], size)
        if 'color' not in maps: print('  skip (no colour map):', path); return None
        aid = aid or 'tex/' + name; return aid, write(aid, {'type': 'tex', 'maps': maps})
    ext = os.path.splitext(path)[1].lower()
    if ext == '.hdr': aid = aid or 'hdr/' + re.sub(r'_(1k|2k|4k)$', '', name); return aid, write(aid, {'type': 'hdr', 'b64': b64(path)})
    if ext in ('.glb',): aid = aid or 'glb/' + name; return aid, write(aid, {'type': 'glb', 'b64': b64(path)})
    print('  skip (unknown type):', path); return None

def build(size=1024):
    n = 0
    for r, ds, fs in os.walk(SRC):
        if '_unz' in r: continue
        if any(re.search(MAPS['color'], tok(f)) for f in fs if f.lower().endswith(('.jpg', '.png'))) and not any(f.lower().endswith(('.glb', '.gltf')) for f in fs):
            res = add(r, size=size); n += bool(res); ds[:] = []; continue
        for f in fs:
            p = os.path.join(r, f)
            if f.lower().endswith(('.hdr', '.glb')) and not ('2k' in f.lower() and os.path.exists(p.replace('2k', '1k'))): res = add(p, size=size); n += bool(res)
            elif f.lower().endswith('.zip'): res = add(p, size=size); n += bool(res)
    print('built', n, 'assets →', OUT)

def sync():
    """Download every pack from Drive and unzip it (≈ 1.9 GB); building happens per story (`story`)."""
    os.makedirs(SRC, exist_ok=True)
    subprocess.check_call([sys.executable, os.path.join(ROOT, 'tools', 'pp_drive.py'), 'get', '_assets3d/*', '--to', SRC])
    for r, _, fs in os.walk(SRC):
        for f in fs:
            if f.endswith('.zip') and '_unz' not in r:
                zipfile.ZipFile(os.path.join(r, f)).extractall(r)
    print('synced to', SRC, '— now: python3 tools/assets3d.py story stories/<slug>.story')

def find(aid):
    kind, name = aid.split('/', 1)
    for r, ds, fs in os.walk(SRC):
        if '_unz' in r: continue
        if kind == 'tex' and os.path.basename(r).lower() == name.lower(): return r
        for f in fs:
            b, e = os.path.splitext(f)
            if kind == 'glb' and e.lower() == '.glb' and slug(b) == name: return os.path.join(r, f)
            if kind == 'hdr' and e.lower() == '.hdr' and slug(b) in (name + '_1k', name): return os.path.join(r, f)
    return None

def story(path):
    t = open(path).read(); ids = set(re.findall(r'\b(?:hdr|glb|tex)/[a-z0-9_\-]+', t, re.I))
    if re.search(r'actors="[^"]*glb/', t): ids |= {'glb/quaternius_animations_mixamo_rig', 'glb/mixamo_animations_mixamo_rig'}
    for aid in sorted(ids):
        out = os.path.join(OUT, aid.replace('/', '__') + '.js')
        if os.path.exists(out): print('  have', aid); continue
        src = find(aid)
        if not src: print('  MISSING', aid, '(not in assets3d_src — sync, or add it to jobs/stock/ASSETS3D.md "Wanted")'); continue
        r = add(src, aid); print('  built', aid, '%.1f MB' % (r[1][1] / 1e6) if r else '')

def ls():
    if not os.path.isdir(OUT): print('no assets built'); return
    for f in sorted(os.listdir(OUT)): print('%-48s %6.1f MB' % (f[:-3].replace('__', '/'), os.path.getsize(os.path.join(OUT, f)) / 1e6))

if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: print(__doc__); sys.exit(1)
    size = int(a[a.index('--size') + 1]) if '--size' in a else 1024
    if a[0] == 'add':
        aid = a[a.index('--id') + 1] if '--id' in a else None; r = add(a[1], aid, size); print(r[0] if r else 'nothing', r[1] if r else '')
    elif a[0] == 'build': build(size)
    elif a[0] == 'sync': sync()
    elif a[0] == 'story': story(a[1])
    elif a[0] == 'list': ls()
    else: print(__doc__)
