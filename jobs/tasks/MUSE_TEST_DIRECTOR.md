# Muse — DIRECTOR TEST (owner order, 19 Nov 2026) · one ~90-second FATHOM segment, made end to end by Muse

The owner wants to see whether Muse can do what Claude does: write and DIRECT a FATHOM film segment (script, visual ideas, drawings,
staging, sound) and render it with the same engine, at the same bar. This is a one-off exception to MUSE_FATHOM.md §0 ("sourcing only")
— for this test only. Work alone; do not ask Claude for ideas. Claude only checks the result with the same critic used on its own films.

## The test
- **Topic:** ice-ages — "How do we know the Earth was once frozen?" Facts ONLY from `jobs/research/ice-ages.md` (F1–F6, sources S1–S3;
  no invented numbers). **Do NOT open** `jobs/scripts/ice-ages_chain.md` or `ice-ages_treatment.md` (Claude's own plan — this tests YOUR ideas).
- **Segment:** the cold open + the stakes + clue 1 (the erratic boulders, F1–F2): **8–11 lines, 80–100 s of narration**, English.
- **Slug:** `muse-test-ice-ages` → `howweknow/episodes/muse-test-ice-ages/`, drawings in `howweknow/src/lib/muse-test-ice-ages/`.
- **Branch:** work on `muse/test-ice-ages` only. Never push to `main`; never edit another film's files, `tools/`, `src/engine/`, `src/paint/`.

## What the owner judges (the bar — read this twice)
- **NEVER STATIC.** Something visibly happens and transforms at least every 2.5 s; every scene turns INTO the next (no plain cuts, never
  "a picture + a label + the camera drifts"). Continuous, inventive visual storytelling — the "wow" of `drifting-continents` (owner: 8.5/10).
- **Inventive:** one named camera move per line, varied; ≥ 3 visual inventions of your own (★ links) — a metaphor that MOVES.
- **Clear and popular:** a curious 14-year-old follows it; every picture passes the NAME-IT test (a stranger names it at a glance).
- Drawing polish: the level of `drifting-continents` is enough (clean drawn house style, cream paper, sepia ink, house pigments).

## How (the same pipeline Claude uses — read only what is named)
1. Setup: `bash setup.sh && bash howweknow/tools/setup.sh` (repo root). Render locally: `FARM=0` (your own machine).
2. Read: `CLAUDE.md` (channel rules), `howweknow/RUNBOOK.md`, the first 30 lines of `howweknow/episodes/drifting-continents/lines.py`
   (the row format), `howweknow/tools/world_kit.py` docstring, `howweknow/episodes/drifting-continents/world.py` (a full staging example).
3. Write your chain first: `jobs/scripts/muse-test-ice-ages_chain.md` — one link per line: the ACTION on screen, how it turns into the
   next picture, the camera move, the sound on the action; mark your ★ inventions.
4. `howweknow/episodes/muse-test-ice-ages/lines.py` (copy the drifting-continents pattern; `standard=6`; plain words; every technical word
   with an everyday image) → `python3 episodes/muse-test-ice-ages/lines.py`.
5. Voice: `bash tools/vo_fast.sh episodes/muse-test-ice-ages 3` (Kokoro af_heart 0.86).
6. Drawings: `src/lib/muse-test-ice-ages/{a.tsx,index.tsx}` (export `ART` with every name listed explicitly, unique PascalCase names, e.g.
   `MtiBoulder`), living things on `src/paint/anatomy.tsx`; then `python3 tools/lib_index.py`. NEVER name a drawing prop like an engine
   mask: tear, burn, lift, pour, wipe, unroll, iris, blinds, brush, dissolve, blur, shatter, flipY, a (check_world refuses them).
   Check each drawing IN THE FILM: `npx remotion still Story out/x.jpg --frame=<sec*30> --props='{"slug":"muse-test-ice-ages"}' --scale=0.5`.
7. `episodes/muse-test-ice-ages/world.py` (copy `episodes/_template10/world.py`; helpers from world_kit). Music from `tools/score.py`
   MYSTERY_OK only; sound effects on the actions, files that exist in `public/sfx/`.
8. Gates (all PASS, from `howweknow/`):
   `for t in event_check novelty check_world plan_check sound_check; do python3 tools/$t.py episodes/muse-test-ice-ages | tail -3; done`
   `python3 tools/script_check.py episodes/muse-test-ice-ages --short` · `python3 tools/variety.py episodes/muse-test-ice-ages --short`
9. Render: `SHORT=1 FARM=0 bash tools/make.sh muse-test-ice-ages --review` → `out/muse-test-ice-ages_16x9.mp4`.
10. Deliver: upload the mp4 to Drive `fathom/_muse-test/` (no thumbnail needed); push your branch; append ONE line to `jobs/INBOX.md`:
   `<date> · muse → owner/claude · [muse-test-ice-ages] TEST DONE: <Drive link> · branch muse/test-ice-ages · hours spent · what you could not do`.

## Report honestly
Time spent, what you invented, every gate's result, and anything you could not do. Do not fake a gate or edit a tool to pass it.
