#!/usr/bin/env python3
"""Ticking-music check (owner, 13 Nov 2026: "a click every 2 seconds — never again").
   python3 tools/music_ticks.py out/<slug>_music.wav  → prints transients/min; exit 1 if the bed has a regular percussive beat.
   A narration bed must be pads/strings only: no clock ticks, heartbeats, hi-hats or plucks on a grid."""
import sys, numpy as np, soundfile as sf
x, sr = sf.read(sys.argv[1]); x = x.mean(1) if x.ndim > 1 else x
hop = sr // 100; d = np.abs(np.diff(x)); e = np.add.reduceat(d, np.arange(0, len(d), hop))[:len(d) // hop]
thr = np.median(e) * 4; pk = np.where((e[1:-1] > thr) & (e[1:-1] > e[:-2]) & (e[1:-1] >= e[2:]))[0] + 1
mins = len(x) / sr / 60; rate = len(pk) / max(mins, 1e-6)
gaps = np.diff(pk) / 100.0; gaps = gaps[gaps > .3]
regular = len(gaps) > 8 and np.std(gaps) / max(np.mean(gaps), 1e-6) < .5
bad = rate > 40 or (rate > 20 and regular)   # a calm bed has almost no sharp transients; the rejected track had 120/min (double ticks)
print(f'music ticks: {rate:.0f}/min, {"regular beat" if regular else "irregular"} → {"TICKING" if bad else "ok"}'); sys.exit(1 if bad else 0)
