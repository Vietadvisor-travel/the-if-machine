#!/usr/bin/env python3
"""ENGINE v7 sample (owner 17 Nov 2026: "điện ảnh… toàn diện"): set piece 1 of the model treatment (jobs/scripts/empty-atom_treatment.md),
"The flash in the dark", re-directed on top of the v6 look: the ACTING (tired → peering → adjusting → astonished), the SHOTS (wide →
medium → close on the face → insert on the hand at the knob → close for the reaction → POV through the eyepiece), the held breath before the
flash, and a vermilion MARK on the word that matters. Nothing new is drawn: this is direction alone.
  python3 episodes/v7-demo/build.py   → public/ep/v7-demo/   (render Story frames 0-899, slug v7-demo)"""
import json, os, sys
H = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); os.chdir(H); sys.path.insert(0, 'tools')
from v6 import shot, rack, shake, grade
subprocess = __import__('subprocess'); subprocess.run(['python3', 'episodes/v6-demo/build.py'], check=True, stdout=subprocess.DEVNULL)
E = json.load(open('public/ep/v6-demo/episode.json')); TL = json.load(open('public/ep/v6-demo/timeline.json'))
K = lambda t, dur=1.2, ease='inOut', **p: {'t': t, 'dur': dur, 'ease': ease, **p}
W = {e['id']: e for e in E['world']}; E['slug'] = 'v7-demo'
# CAMERA — the scene is SHOT: wide (the place) → medium (the man) → close (his concentration) → insert (his hand) → close (the shock)
cam = W['camera']
cam['keys'] = [
    K(3.0, 3.6, 'glide', **shot('medium', at=(1120, 610))),
    K(6.6, 2.4, 'weight', **shot('close', at=(1222, 560)), **rack(.1, 5)),                     # his face at the glass; the room goes soft
    K(9.0, 1.6, 'weight', **shot('insert', at=(1150, 600)), **rack(.1, 7)),                    # his hand on the fine-adjust
    K(10.6, 1.2, 'weight', **shot('close', at=(1230, 548)), dof=4),                            # back to the face: something
    K(11.9, .8, 'out', **shake(.3)), K(12.3, .9, 'soft', **shake(0)),
    K('L1-0.2', 1.3, 'soft', **shot('wide'), dof=0),                                          # into the eyepiece (POV)
    K('L3+2.25', .75, 'out', **shake(.55)), K('L3+3.0', 1.2, 'soft', **shake(0)),
    K('L4', 3.0, 'soft', **grade('curious')),
]
# ACTING — the night of counting, in four beats
m = W['mars0']; m['props'].update(pose='headhands', pose2='sitpeer', pk=0, expr='worry', ek=.6, look=[.2, .6], alive=1)
m['keys'] = [k for k in m['keys'] if not any(q in k for q in ('pk', 'ek', 'expr'))] + [
    K(5.4, 1.6, 'weight', pk=1, ek=0),                                     # he lifts his head and leans back into the eyepiece
    K(7.0, 1.2, 'soft', expr='focus', ek=1, look=[.8, 0]),                  # concentration
    K(8.9, .01, pose='sitpeer', pose2='sitadjust', pk=0), K(8.95, 1.1, 'hand', pk=1),   # his hand finds the fine-adjust knob
    K(10.4, .01, pose='sitadjust', pose2='sitstartle', pk=0),
    K(10.9, .9, 'weight', pk=.55, expr='surprise', ek=1),                   # — and he pulls back from what he saw
    K(11.9, 1.2, 'soft', pk=.25, expr='awe', ek=1, look=[.9, -.1]),         # then leans in again, astonished
]
# THE MARK — vermilion ink under the one word that matters
E['world'].append({'id': 'v7mark', 'type': 'art', 'z': 61, 'props': {'name': 'Mark', 'kind': 'underline', 'box': [365, 300, 130, 40], 'k': 0, 'w': 5},
                   'keys': [K('L3+2.6', .9, 'hand', k=1), K('L4', .8, a=0)]})
os.makedirs('public/ep/v7-demo', exist_ok=True)
json.dump(E, open('public/ep/v7-demo/episode.json', 'w')); json.dump(TL, open('public/ep/v7-demo/timeline.json', 'w'))
print('v7-demo →', len(E['world']), 'entities')
