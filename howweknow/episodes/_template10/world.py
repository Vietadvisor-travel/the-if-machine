#!/usr/bin/env python3
"""<slug> — the story world (engine 10). Staging ONLY: every helper is in tools/world_kit.py (read its docstring once, not this whole repo).
Chain: jobs/scripts/<slug>_chain.md (one action + one camera move per line). Gates: event_check · novelty · plan_check · check_world · sound_check."""
import os, sys; sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../tools')); from world_kit import *
E = init(__file__)
# ---------------------------------------------------------------- L0 … (one block per line: the action, the beats, its sound)
# art('x0', 'MyDrawing', L(0), L(1, .4), [K(L(0, 1.0), .8, 'soft', prop=1)], enter='glide', eo=[0, 600], xs='flip', x=960, y=540)
# B('x0', 0, (.5, .7, 'soft', {'prop': .5}), (.8, .6, 'soft', {'prop': 1}))     # something happens ≤ every 2.5 s
# SF(0, .5, 'thud_soft_1.wav', 0)                                                 # sound on the action, as loud as the music (trim −6…+3)
MOVE = {}   # {line: (kind, (x, y), size)} — 19 kinds; ≤ 12 % each, never 3 running
HOW = {}    # {line: becomes.how from FX.md §H} — ≤ 3 each
finish(MOVE, HOW, new_devices=[], thumb={'t': 1, 'title': '', 'v': 'S', 'kicker': '', 'lines': [], 'accent': 2, 'note': ''},
       music=[('wonder_lightless_dawn', 0, -21)], swells=[])
