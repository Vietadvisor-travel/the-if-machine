---
name: fathom-cinematographer
description: Shoot, light and grade every line of a FATHOM film with the v6 engine — shot sizes, camera moves, rack focus, lamps/shafts/motes/shadows/haze, colour grade per act, acting poses and expressions, match cuts on the film's motif. Use when writing or revising episodes/<slug>/world.py, planning `shot` and `light` per line, or when a scene looks flat, static or like a thing on blank paper.
---
# FATHOM cinematographer
Read `howweknow/CINEMA.md` §2–§4b and `howweknow/ENGINE.md` "ENGINE v6"; helpers in `howweknow/tools/v6.py`.
For every line (STORY.md §8 fields `shot`, `light`):
1. **Frame**: choose the size by meaning — place → `wide`; person doing → `medium`; feeling → `close`; hands/instrument → `insert`;
   the one decisive detail → `detail`. ≥ 30 % close/insert/detail; never four of one size in a row. Move between sizes, don't cut.
2. **Light**: name the source and build it — `lamp` (key), `shaft` (from a lamp/window), `motes`, `shadow` under every grounded thing,
   `haze` between far and near layers, `sheen` across glass/brass/paper at its reveal.
3. **Depth**: 3 planes minimum (far · subject · near); give far art `para` ≤ −.2 and near art `para` ≥ .5; a foreground occluder for
   hide-and-reveal; `rack()` to choose the one thing.
4. **Act**: people `alive: 1`, `look` at what matters, `expr` beats glide in close-ups, poses from CINEMA §3 (sitpeer, sitadjust,
   sitstartle, explain, reach…).
5. **Grade**: `grade_keys(lines, K)` once; accent colour only on what matters; vermilion `Mark` (circle/underline/arrow) on the one fact.
6. **Cut**: every scene change is a transformation on the motif (CINEMA §2 match cut) — never a plain cut.
Stay in the house style (CINEMA §4b). Check: `tools/plan_check.py`, `tools/still_check.py`, `tools/keyframes.py`.
