#!/usr/bin/env python3
"""Pick the ONE quiet music bed for a film (owner: one track per episode, fitting it, small under the voice).
  python3 tools/music.py [mood…]   → candidates: Muse's beds (public/stock/music/*, _hwk_core/music) first, then the studio library
  (Kevin MacLeod CC BY 4.0 — the credit goes in the delivery note). Moods: wonder warm curious tension…"""
import json, os, sys, glob
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); moods = set(sys.argv[1:]) or {'wonder', 'warm'}
muse = sorted(glob.glob(f'{R}/public/stock/**/*.wav', recursive=True) + glob.glob(f'{R}/public/stock/**/*.flac', recursive=True))
muse = [m for m in muse if '/music/' in m or '/U-' in m]
print('Muse beds:', *(os.path.relpath(m, R) for m in muse) or ['(none synced yet)'], sep='\n  ')
L = json.load(open(f'{R}/../studio/music/library.json'))
print('studio library (CC BY 4.0, Kevin MacLeod):')
for k, v in sorted(L.items(), key=lambda kv: kv[1].get('bpm', 0)):
    if set(v.get('moods', [])) & moods: print(f"  ../studio/{v['file']:<46} {v.get('bpm', 0):>5.0f} bpm  {v.get('dur', 0) / 60:4.1f} min  {','.join(v['moods'])}")
