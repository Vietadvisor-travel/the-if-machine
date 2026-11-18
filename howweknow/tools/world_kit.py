#!/usr/bin/env python3
"""WORLD KIT (owner 18 Nov 2026: "giảm tối đa token, đảm bảo 100% chất lượng") — every helper a FATHOM world.py needs, in one import, so an
episode's world.py holds ONLY its own staging (≈ 250 lines instead of 650). Extracted from episodes/dinosaur-killer/world.py (v2.2, approved).
  import sys, os; sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../tools')); from world_kit import *
  E = init(__file__)                       # loads episode.json + timeline.json, sets engine 10, ST/PD stock paths
  … art(), text(), person(), lamp() …, beats B(id, line, (frac, dur, ease, {props})), sound SF(line, frac, file, trim)
  finish(MOVE, HOW, new_devices=[…], thumb={…}, music=[(file, at, db), …], swells=[…], motif_art=[…], track={line: (dx0, dx1)})
Helpers: L(i, off) time refs · Lf(i, frac) a fraction of the line · K(t, dur, ease, **props) a key · G(id) an entity · art(…, enter=ENTER kind,
xs=exit kind) · gone2 exits: ink/left/right/up/down/at/burn/shatter/lift/flip/collapse/fade/tearout · text/counter/person/shape/trail/ripple/
spot/quill/mark/dark · light: lamp/shaft/motes/shadow/haze/sheen · SKY · camera grammar MOVE {line: (kind, at, size)} with kinds push/pull/
pan-l/pan-r/tilt-up/tilt-down/crane-up/crane-down/arc/orbit/dutch/whip/snap-zoom/track/dolly/rack/handheld/dive/lock (CAMERA_OVERRIDE for one line)."""
import json, math, os, re, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from v6 import shot, rack, shake, grade, grade_keys
E = None; W = []; _LN = None; H = EP = SLUG = ST = PD = None
FX = 'public/sfx/'; SFX = {}; CAMERA_OVERRIDE = {}
def init(file, engine=10):
    global E, H, EP, SLUG, ST, PD, _LN
    H = os.path.dirname(os.path.abspath(file)); EP = os.path.join(H, 'episode.json'); E = json.load(open(EP)); SLUG = E['slug']
    E['engine'] = engine; ST = f'stock/_hwk/{SLUG}/'; PD = f'stock/_pd/{SLUG}/'
    tl = os.path.join(H, 'timeline.json'); _LN = json.load(open(tl))['lines'] if os.path.exists(tl) else None
    if _LN and len(_LN) != len(E['lines']): _LN = None
    W.clear(); SFX.clear(); return E
if _LN and len(_LN) != len(E['lines']): _LN = None
def _ratio(i):   # the plan's beats were timed at 2.35 words/s; the voice is what it is — the beats keep their place in the line
    if not _LN: return 1.0
    est = len(E['lines'][i]['text'].split()) / 2.35; return max(.7, min(1.3, _LN[i]['dur'] / est))
def dur(i): return _LN[i]['dur'] if _LN else len(E['lines'][i]['text'].split()) / 2.35
def L(i, off=0.0):
    if off > 0: off = round(off * _ratio(i), 2)
    return f'L{i}' if abs(off) < 1e-9 else (f'L{i}+{off:g}' if off > 0 else f'L{i}{off:g}')
def K(t, dur=1.2, ease=None, **p):
    k = {'t': t, 'dur': dur, **p}
    if ease: k['ease'] = ease
    return k
def ent(id, type, props=None, keys=None, children=None, z=None):
    e = {'id': id, 'type': type, 'props': props or {}, 'keys': list(keys or [])}
    if children: e['children'] = children
    if z is not None: e['z'] = z
    W.append(e); return e
def G(id): return next(e for e in W if e['id'] == id)
XS = {'ink': {}, 'left': {'dissolveDir': 'left'}, 'right': {'dissolveDir': 'right'}, 'up': {'dissolveDir': 'up'}, 'down': {'dissolveDir': 'down'}}
_seed = [11]
def _tadd(t, d):
    m = re.match(r'^(L\d+(?:\$|@[^+\-]+)?)([+\-]\d*\.?\d+)?$', t); o = float(m.group(2) or 0) + d
    return m.group(1) if abs(o) < 1e-9 else f'{m.group(1)}{o:+g}'
def gone(t, style='ink', dur=1.3, at=None):
    _seed[0] = _seed[0] % 89 + 7; b = dict(XS.get(style, {}))
    if at: b = {'dissolveAt': at, 'dissolveR': 1100}
    return [K(t, dur, 'linear', dissolve=0, dissolveSeed=_seed[0], **b), K(_tadd(t, dur + .02), .01, a=0)]
ENTER = {   # v8: many ways in (novelty E1) — each key starts from the prop given here
    'bleed': lambda p, t, o: (p.update(dissolve=0), [K(t, 1.4, 'linear', dissolve=1, dissolveSeed=_seed[0])]),
    'focus': lambda p, t, o: (p.update(blur=12), [K(t, 1.0, 'soft', blur=0)]),
    'iris': lambda p, t, o: (p.update(iris=0, irisAt=o or [960, 540]), [K(t, 1.4, 'in', iris=1)]),
    'wipe': lambda p, t, o: (p.update(wipe=0, wipeDir=o or 'right'), [K(t, 1.4, 'soft', wipe=1)]),
    'blinds': lambda p, t, o: (p.update(blinds=0), [K(t, 1.3, 'soft', blinds=1)]),
    'unroll': lambda p, t, o: (p.update(unroll=0), [K(t, 1.6, 'soft', unroll=1)]),
    'tear': lambda p, t, o: (p.update(tear=0), [K(t, 1.3, 'out', tear=1)]),
    'pour': lambda p, t, o: (p.update(pour=0, pourDir=o or 'up'), [K(t, 1.8, 'soft', pour=1)]),
    'brush': lambda p, t, o: (p.update(brush=0), [K(t, 1.8, 'linear', brush=1)]),
    'glide': lambda p, t, o: (p.update(**{('fx_x' if (o or [0, 1])[0] else 'fx_y'): (o or [0, 700])[0] or (o or [0, 700])[1]}), [K(t, 1.5, 'weight', **{('fx_x' if (o or [0, 1])[0] else 'fx_y'): 0})]),
    'scale': lambda p, t, o: (p.update(fx_s=.08, fx_ox=(o or [960, 540])[0], fx_oy=(o or [960, 540])[1]), [K(t, 1.6, 'out', fx_s=1)]),
}
EXIT0 = {'burn': {'burn': 1}, 'shatter': {'shatter': 0}, 'lift': {'lift': 0}, 'flip': {'flipY': 0}, 'tearout': {'tear': 1}}
def gone2(t, how, dur=1.3, at=None):
    if how == 'burn': return [K(t, dur, 'linear', burn=0, **({'burnAt': at} if at else {'dissolveDir': 'right'})), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'shatter': return [K(t, dur, 'in', shatter=1, shatterAt=at or [960, 540]), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'lift': return [K(t, dur, 'soft', lift=40, a=0)]
    if how == 'flip': return [K(t, dur, 'in', flipY=-100), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'collapse': return [K(t, dur, 'in', fx_s=.05, **({'fx_ox': at[0], 'fx_oy': at[1]} if at else {})), K(_tadd(t, dur + .02), .01, a=0)]
    if how == 'fade': return [K(t, dur, 'soft', a=0)]
    if how == 'tearout': return [K(t, dur, 'in', tear=0), K(_tadd(t, dur + .02), .01, a=0)]
    return gone(t, how, dur, at)
def art(id, name, t_in, t_out=None, keys=(), ink=True, inkdur=1.6, xs='ink', xdur=1.3, at=None, z=None, enter=None, eo=None, **props):
    p = {'name': name, 'a': 0, **EXIT0.get(xs, {}), **props}
    ks = [K(t_in, .01, a=1)]
    if enter in ENTER: ink = False; p.setdefault('draw', 1); ks += ENTER[enter](p, t_in, eo)[1]
    if ink: p.setdefault('draw', 0); ks.append(K(t_in, inkdur, 'out', draw=1))
    ks += list(keys)
    if t_out: ks += gone2(t_out, xs, xdur, at)
    return ent(id, 'art', p, ks, z=z)
def text(id, s, style, x, y, t_in, t_out=None, dur=1.2, keys=(), **kw):
    return ent(id, 'text', {'text': s, 'style': style, 'x': x, 'y': y, 'k': 0, 'a': 0, 'blur': 8, **kw},
               [K(t_in, .01, a=1), K(t_in, .9, 'soft', blur=0), K(t_in, dur, 'out', k=1)] + list(keys) + ([K(t_out, 1.0, 'soft', blur=10, a=0)] if t_out else []), z=60)
def counter(id, fmt, x, y, t_in, t_out, keys, size=96, style='figure', **kw):
    return ent(id, 'text', {'text': '', 'style': style, 'x': x, 'y': y, 'size': size, 'num': 0, 'fmt': fmt, 'k': 1, 'a': 0, 'blur': 8, **kw},
               [K(t_in, .01, a=1), K(t_in, .8, 'soft', blur=0)] + list(keys) + [K(t_out, 1.0, 'soft', blur=10, a=0)], z=60)
def person(id, who, t_in, t_out=None, keys=(), **p):
    p.setdefault('alive', 1)
    return art(id, 'Person', t_in, t_out, keys, inkdur=1.8, who=who, **p)
SKY = lambda id, t, tout, kind='night': ent(id, 'art', {'name': 'Sky', 'kind': kind, 'seed': id, 'a': 0}, [K(t, 1.4, a=1)] + gone(tout, 'ink', 1.0), z=1)
def shape(id, form, t_in, t_out=None, keys=(), dur=1.2, z=50, **p):
    pr = {'form': form, 'x': 50, 'y': 50, 's': 1, 'draw': 0, 'a': 0, 'col': '#2B1D12', 'sw': 3, **p}
    return ent(id, 'shape', pr, [K(t_in, .01, a=1), K(t_in, dur, 'out', draw=1)] + list(keys) + ([K(t_out, .9, a=0)] if t_out else []), z=z)
def trail(id, pts, t_in, d, t_out=None, col='#B8862B', w=3, r=6, ease='linear', keys=(), **p):
    return ent(id, 'trail', {'points': [{'screen': q} for q in pts], 'k': 0, 'a': 0, 'col': col, 'w': w, 'r': r, **p},
               [K(t_in, .01, a=1), K(t_in, d, ease, k=1)] + list(keys) + ([K(t_out, .8, a=0)] if t_out else []), z=56)
def ripple(id, at, t, r=160, n=4, d=1.6, col='#8C3424'):
    return ent(id, 'ripple', {'at': {'screen': at}, 'k': 0, 'n': n, 'r': r, 'col': col}, [K(t, d, 'out', k=1)], z=57)
def spot(id, at, r, t_in, t_out, dark=.55):
    return ent(id, 'spot', {'at': {'screen': at}, 'r': r, 'k': 0, 'dark': dark}, [K(t_in, 1.2, 'soft', k=1), K(t_out, 1.0, k=0)], z=45)
def quill(id, pts, t_in, t_out):
    ks = [K(t_in, .3, a=1)] + [K(_tadd(t_in, i * .5 + .3), .5, 'soft', at={'screen': q}) for i, q in enumerate(pts[1:])] + [K(t_out, .4, a=0)]
    return ent(id, 'hand', {'at': {'screen': pts[0]}, 's': .62, 'a': 0}, ks, z=80)
def mark(id, kind, box, t, t_out, w=5, seed=1):
    return ent(id, 'art', {'name': 'Mark', 'kind': kind, 'box': box, 'k': 0, 'w': w, 'seed': seed, 'a': 0}, [K(t, .01, a=1), K(t, .9, 'hand', k=1), K(t_out, .8, a=0)], z=61)
def circ(x, y, r): return f"M{x - r} {y} A{r} {r} 0 1 0 {x + r} {y} A{r} {r} 0 1 0 {x - r} {y}Z"
def rectp(x, y, w, h): return f"M{x} {y} L{x + w} {y} L{x + w} {y + h} L{x} {y + h}Z"
def dark(id, t_in, t_out=None, k=.96, d=1.4, keys=(), style='up', z=1, col='#0B0806'):
    return ent(id, 'shape', {'form': rectp(-60, -60, 2040, 1200), 'x': 50, 'y': 50, 's': 1, 'draw': 1, 'a': 0, 'fill': col, 'fillA': k, 'wash': False, 'sw': 0, 'col': col},
               [K(t_in, d, 'soft', a=1)] + list(keys) + (gone(t_out, style, 1.6) if t_out else []), z=z)
# v6 light
def lamp(id, at, t_in, t_out, r=520, k=1, dark=.55, warm=.6, z=58):
    return ent(id, 'lamp', {'at': {'screen': at}, 'r': r, 'k': 0, 'dark': dark, 'warm': warm}, [K(t_in, 1.4, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def shaft(id, fr, to, t_in, t_out, w0=60, w1=420, n=3, k=.8, z=57):
    return ent(id, 'shaft', {'from': fr, 'to': to, 'w0': w0, 'w1': w1, 'n': n, 'k': 0, 'para': 0}, [K(t_in, 2.0, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def motes(id, box, t_in, t_out, n=40, k=1, seed=3, z=59):
    return ent(id, 'motes', {'box': box, 'n': n, 'k': 0, 'seed': seed, 'para': .3}, [K(t_in, 2.0, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def shadow(id, x, y, rx, ry, t_in, t_out, k=.8, z=3):
    return ent(id, 'shadow', {'x': x, 'y': y, 'rx': rx, 'ry': ry, 'k': 0}, [K(t_in, 1.2, k=k)] + ([K(t_out, .8, k=0)] if t_out else []), z=z)
def haze(id, y0, y1, t_in, t_out, k=.6, col='#C9DDE6', z=56):
    return ent(id, 'haze', {'y0': y0, 'y1': y1, 'k': 0, 'col': col}, [K(t_in, 1.6, 'soft', k=k)] + ([K(t_out, 1.0, k=0)] if t_out else []), z=z)
def sheen(id, box, t, rot=4, z=62):
    return ent(id, 'sheen', {'box': box, 'rot': rot, 'k': 0}, [K(t, 2.0, 'soft', k=1)], z=z)
def sfx(i, at, f, db=0): SFX.setdefault(i, []).append({'at': at, 'file': f, 'db': db})
def Lf(i, f): return L(i, round(f * dur(i) / _ratio(i), 2))
def B(id, i, *beats): G(id)['keys'] += [K(Lf(i, f), d, e, **p) for f, d, e, p in beats]
def SF(i, f, name, db=0): sfx(i, round(f * dur(i), 2), FX + name, db)   # engine ≥ 10: db is a trim around the music (mix.py levels it)
def NL(): return len(E['lines'])
SOFT = {'wide': 1.08, 'medium': 1.14, 'close': 1.28, 'insert': 1.4, 'detail': 1.55}
def S_(size, at, z=1.0, dx=0, dy=0, **x): return {**shot(size, at=(at[0] + dx, at[1] + dy), z=SOFT[size] * z), **x}
def move(i, kind, at, size):
    d = dur(i); a = lambda o: L(i, o)
    base = lambda **x: K(a(0), 1.0, 'soft', **S_(size, at, **x))
    if kind == 'push': return [K(a(0), 1.0, 'soft', **S_(size, at, .92, roll=0)), K(a(1.0), d - .8, 'inOut', **S_(size, at, 1.25))]
    if kind == 'pull': return [K(a(0), .8, 'soft', **S_(size, at, 1.5, roll=0)), K(a(.8), d - .6, 'out', **S_(size, at, .95))]
    if kind in ('pan-r', 'pan-l'): s = 1 if kind == 'pan-r' else -1; return [K(a(0), 1.0, 'soft', **S_(size, at, dx=-90 * s, roll=0)), K(a(1.0), d - .8, 'inOut', **S_(size, at, dx=90 * s))]
    if kind in ('tilt-up', 'tilt-down'): s = -1 if kind == 'tilt-up' else 1; return [K(a(0), 1.0, 'soft', **S_(size, at, dy=-110 * s, roll=0)), K(a(1.0), d - .8, 'inOut', **S_(size, at, dy=110 * s))]
    if kind in ('crane-down', 'crane-up'): s = 1 if kind == 'crane-down' else -1; return [K(a(0), .9, 'soft', **S_(size, at, 1.2, dy=-220 * s, roll=0)), K(a(.9), d - .6, 'inOut', **S_(size, at, 1.0))]
    if kind == 'arc': return [K(a(0), 1.0, 'soft', **S_(size, at, 1.04, dx=-80, dy=40, roll=-3)), K(a(1.0), d - .8, 'inOut', **S_(size, at, 1.12, dx=80, dy=-30, roll=3))]
    if kind == 'orbit': return [K(a(0), 1.0, 'soft', **S_(size, at, 1.1, roll=-5)), K(a(1.0), d - .8, 'linear', **S_(size, at, 1.18, roll=5))]
    if kind == 'dutch': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0)), K(a(1.4), 1.0, 'out', **S_(size, at, 1.1, roll=7)), K(a(d - 1.4), 1.2, 'soft', **S_(size, at, 1.15, roll=0))]
    if kind == 'whip': return [K(a(0), .01, **S_(size, at, dx=520, roll=0)), K(a(.05), .75, 'out', **S_(size, at)), K(a(.8), d - .6, 'linear', **S_(size, at, 1.08))]
    if kind == 'snap-zoom': t0 = min(1.0, d * .45); return [K(a(0), .6, 'soft', **S_(size, at, roll=0)), K(a(t0), .5, 'out', **S_(size, at, 1.45)), K(a(t0 + .5), max(.5, d - t0), 'linear', **S_(size, at, 1.5))]
    if kind == 'track': fx = o_track.get(i, (-300, 300)); return [K(a(0), .8, 'soft', **S_(size, at, dx=fx[0], roll=0)), K(a(.8), d - .6, 'inOut', **S_(size, at, dx=fx[1]))]
    if kind == 'dolly': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0), dolly=0), K(a(1.0), d - .8, 'inOut', **S_(size, at, 1.12), dolly=.35), K(a(d), .8, 'soft', dolly=0)]
    if kind == 'rack': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0), **rack(.0, 5)), K(a(1.6), 1.4, 'soft', **rack(.4, 5)), K(a(1.6), d - 1.2, 'linear', **S_(size, at, 1.1)), K(a(d - .4), .8, 'soft', dof=0)]
    if kind == 'handheld': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0)), K(a(.4), .8, 'soft', **shake(.22)), K(a(1.0), d - .8, 'linear', **S_(size, at, 1.08)), K(a(d - .4), .6, 'soft', **shake(0))]
    if kind == 'dive': return [K(a(0), .8, 'soft', **S_(size, at, roll=0)), K(a(.8), 1.6, 'in', **S_(size, at, 2.2)), K(a(2.4), .9, 'out', **S_(size, at, 1.0)), K(a(3.3), d - 3.0, 'linear', **S_(size, at, 1.1))]
    if kind == 'lock': return [K(a(0), 1.0, 'soft', **S_(size, at, roll=0))]
    raise ValueError(kind)
o_track = {}
def finish(MOVE, HOW, new_devices, thumb, music=None, swells=(), motif_art=(), track=None, shakes=(), extra_cam=()):
    """Camera (one named move per line) + grade, the becomes.how per line, sound, music, and write episode.json/timeline.json/public/ep."""
    if track: o_track.update(track)
    cam = next((e for e in W if e['type'] == 'camera'), None) or ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': .35, 'light': .4, **grade('mystery'), 'push': 1, 'pan_x': 0, 'pan_y': 0, 'dof': 0, 'focus': 0, 'shake': 0, 'roll': 0, 'dolly': 0})
    ck = []
    for i in range(NL()): ck += CAMERA_OVERRIDE[i] if i in CAMERA_OVERRIDE else move(i, *MOVE[i])
    for t, k in shakes: ck += [K(t, .5, 'out', **shake(k)), K(_tadd(t, .9), 1.4, 'soft', **shake(0))]
    ck += list(extra_cam) + grade_keys(E['lines'], K)
    cam['keys'] = sorted(ck, key=lambda k: (int(re.match(r'L(\d+)', str(k['t'])).group(1)) if isinstance(k['t'], str) else -1))
    E['camera_moves'] = [MOVE[i][0] for i in range(NL())]
    for i, l in enumerate(E['lines']): l.setdefault('becomes', {})['how'] = HOW[i]
    E['world'] = W; E['new_devices'] = list(new_devices); E['motif_art'] = list(motif_art); E['thumb'] = thumb
    if music: E['music'] = {'cues': [{'file': f'../studio/music/{f}.wav', 'at': a, 'start': 0, 'db': d} for f, a, d in music], 'xfade': 6, 'norm': -18, 'swells': [list(x) for x in swells]}
    for i, l in enumerate(E['lines']): l['sfx'] = SFX.get(i, [])
    json.dump(E, open(EP, 'w'), indent=1, ensure_ascii=False)
    if _LN:
        TLP = os.path.join(H, 'timeline.json'); T = json.load(open(TLP))
        for i, l in enumerate(T['lines']): l['sfx'] = SFX.get(i, [])
        json.dump(T, open(TLP, 'w'), indent=1)
        os.makedirs(os.path.join(H, f'../../public/ep/{SLUG}'), exist_ok=True)
        for f in ('episode.json', 'timeline.json'): shutil.copy(os.path.join(H, f), os.path.join(H, f'../../public/ep/{SLUG}', f))
    print(len(W), 'entities →', EP)
