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
