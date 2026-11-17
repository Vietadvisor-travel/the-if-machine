#!/usr/bin/env python3
"""ENGINE v6 helpers for an episode's world.py (owner 17 Nov 2026: the picture must reach the top — shot like a film, lit, deep, alive).
  import sys; sys.path.insert(0, '../../tools'); from v6 import *
A v6 episode sets  E['engine'] = 6  (the engraving pass, grain, weave and flicker come on by themselves) and uses:

  CAMERA  (keys on the `camera` entity; the page camera moves every layer by its depth)
    shot('wide')                         → the whole set
    shot('medium', at=(x, y))            → push ≈ 1.35 centred on a point           shot('close', at=…) ≈ 1.9 · shot('insert', at=…) ≈ 2.6
    shot('detail', at=…)                 → ≈ 3.4 (a hand on a screw, an eye at the eyepiece)
    rack(depth, dof=6)                   → depth of field: layers away from `depth` (their `para`) go soft — key it to PULL FOCUS
    shake(.5) / shake(0)                 → hand-held tension on / off
  GRADE   grade('mystery') …             → the colour of an act (warm / sat / expo / engrave), one key per chapter — GRADE below
  LIGHT   lamp / shaft / motes / shadow / haze / sheen are entities (src/engine/Light6.tsx): every scene names its light.
  MOTION  cascade(K, ids, t, gap, **props) → the parts of a thing arrive one after another (never all at once), eased like a hand
  PEOPLE  expr='focus'|'surprise'|'awe'|'smile'|'worry' (+ ek 0..1 to glide), look=[x, y], alive=1; h ≥ 460 px draws the detailed face.
Rules that stay: no bounce, no overshoot, nothing faster than .75 s (owner 16 Nov) — `hand` and `weight` are the v6 eases."""

PUSH = {'wide': 1.0, 'medium': 1.35, 'close': 1.9, 'insert': 2.6, 'detail': 3.4, 'over': 1.6}


def shot(kind, at=(960, 540), z=None):
    """Camera props that frame `at` (screen px of the un-pushed page) at the size of `kind`."""
    z = z or PUSH[kind]
    return {'push': z, 'pan_x': round(-(at[0] - 960) * z, 1), 'pan_y': round(-(at[1] - 540) * z, 1)}


def rack(depth=0.0, dof=6.0): return {'focus': depth, 'dof': dof}
def shake(k=.5): return {'shake': k}


# the colour of an act: warm (−1 cool … +1 warm), sat, expo (brightness), engrave (how strong the cut lines are)
GRADE = {
    'mystery': {'warm': -.3, 'sat': 1, 'expo': 1, 'engrave': .95},   'tension': {'warm': -.18, 'sat': 1, 'expo': 1, 'engrave': 1},
    'curious': {'warm': .05, 'sat': 1, 'expo': 1, 'engrave': .75},   'wonder':  {'warm': .18, 'sat': 1, 'expo': 1, 'engrave': .7},
    'awe':     {'warm': .1, 'sat': 1, 'expo': 1, 'engrave': .8},     'triumph': {'warm': .4, 'sat': 1, 'expo': 1, 'engrave': .65},
    'warm':    {'warm': .3, 'sat': 1, 'expo': 1, 'engrave': .7},     'sad':     {'warm': -.25, 'sat': 1, 'expo': 1, 'engrave': .9},
    'calm':    {'warm': .08, 'sat': 1, 'expo': 1, 'engrave': .7},    'playful': {'warm': .2, 'sat': 1, 'expo': 1, 'engrave': .6},
}
def grade(mood): return dict(GRADE.get(mood, GRADE['curious']))


def grade_keys(lines, K, dur=3.0):
    """One camera key per change of mood: [K('L<i>', dur, **grade(mood)), …] — the grade follows the story's acts (same parts as the score)."""
    out, last = [], None
    for i, l in enumerate(lines):
        m = l.get('mood') or 'curious'
        if m != last: out.append(K(f'L{i}' if i else 0, dur if i else .01, 'soft', **grade(m))); last = m
    return out


def cascade(K, t, n, gap=.18, dur=.9, ease='hand', **props):
    """Keys for n parts arriving one after another from time ref `t`: returns a list of n key-lists (give each to its entity)."""
    def ref(i):
        if isinstance(t, (int, float)): return round(t + i * gap, 3)
        return f'{t}+{i * gap:.2f}' if '+' not in t and '-' not in t[1:] else t   # a ref that already has an offset is used as is
    return [[K(ref(i), dur, ease, **props)] for i in range(n)]


# ── v7 helpers (owner 17 Nov 2026: invention and transformation are the heart — CINEMA §0) ─────────────────────────────────────────────
def dolly(K, t, depth=1.0, dur=4.0, ease='weight'):
    """The camera TRAVELS INTO the set: near layers (high para) rush past and fade as we go through them; far ones grow slowly."""
    return K(t, dur, ease, dolly=depth)


def match_iris(K, ent_new, t, at, r0=60, dur=1.6):
    """MOTIF MATCH-CUT: the next scene opens inside the motif's circle (an eyepiece, a planet, a lens) and grows to fill the frame.
    ent_new: the incoming entity's key list gets these keys (it must carry fx_box or be full-frame)."""
    x, y = at
    circle = lambda r: f'M{x - r} {y} a{r} {r} 0 1 0 {2 * r} 0 a{r} {r} 0 1 0 {-2 * r} 0Z'
    ent_new.setdefault('props', {})['clipForm'] = circle(r0)
    return [K(t, .01, a=1), K(t, dur, 'weight', clipForm=circle(2300))]


def ink_bleed(K, t, at=None, direction=None, dur=1.6):
    """The new picture SPREADS like ink in wet paper from a point (or sweeps one way). Put the keys on the incoming entity (a: 1, dissolve: 0 first)."""
    k = K(t, dur, 'soft', dissolve=1)
    if at: k['dissolveAt'] = list(at)
    if direction: k['dissolveDir'] = direction
    return [K(t, .01, a=1, dissolve=0), k]


def page_turn(K, t, dur=1.4):
    """The old picture is a PAGE that turns over (flipY → 90°) and leaves the next one beneath. Keys for the OUTGOING entity."""
    return [K(t, dur, 'weight', flipY=90), K(f'{t}+{dur:.2f}' if isinstance(t, str) else t + dur, .01, a=0)]


def scale_dive(K, t, at, dur=2.4):
    """SCALE JUMP: the camera dives into a detail until it fills the frame (shot 'detail' and beyond); use with match_iris for the arrival."""
    return K(t, dur, 'weight', **shot('detail', at=at, z=PUSH['detail'] * 1.8))


def bignum(ent_id, text, t, x=960, y=540, size=260, dur=3.0):
    """A NUMBER AS A PLACE: a giant gold figure the camera flies through (with dolly). Returns the text entity; pair with dolly(K, t+.8, 1.0)."""
    return {'id': ent_id, 'type': 'text', 'z': 70, 'props': {'text': text, 'style': 'figure', 'x': x, 'y': y, 'size': size, 'k': 0, 'a': 0, 'para': .9},
            'keys': [{'t': t, 'dur': .01, 'a': 1}, {'t': t, 'dur': 1.2, 'ease': 'hand', 'k': 1}]}
