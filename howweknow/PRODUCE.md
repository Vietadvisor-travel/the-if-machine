# "làm tập <tên>" — the FATHOM production runbook (one page; run it end to end)

Budget: ≈ 5–7 h (drawing the film's world is the largest part; the render of a 10-min film ≈ 75 min at 7.3 s per film second).
Commands run from `howweknow/` unless shown.

## 0. Start
1. `git pull --rebase` · `bash setup.sh && bash howweknow/tools/setup.sh` (repo root) → "FATHOM READY".
2. Slug from `jobs/STATUS.md` (column tên VI). Read: `jobs/research/<slug>.md`, `jobs/scripts/<slug>.md` (the frame-level plan; its source is
   `episodes/<slug>/lines.py`), `jobs/orders/<slug>.md` (Muse's ✅/❌), then `ENGINE.md`, `STYLE.md`, `FX.md` (skim the parts you need).
3. **Kit check:** STATUS research = `KIT_READY` (or the INBOX says the order is fulfilled). If not, or ★★★ rows are missing → one Vietnamese line
   to the owner ("Muse chưa xong đồ cho tập …: thiếu …") and stop. ❌ rows are reframed (drawn instead, never faked).
4. STATUS production → `IN_PRODUCTION (claude)`; INBOX line; commit.

## 1. Stock
`bash tools/sync.sh <slug>` → `public/stock/<slug>/` (+ core). Map the order ids in `lines.py` STOCK to the real file names; pick the ONE music bed
(`python3 tools/music.py <mood>` — the studio library, CC BY 4.0; Muse no longer sources music or sfx) → `music` in `lines.py`'s write() call. Note every credit for the delivery note.

## 2. Draw the film's own world (the heart of the job)
- Every name in the plan's `NEW` column is a component in `src/lib/<slug>/index.tsx` (copy `src/lib/_template/`): real construction from
  Muse's R references, `Region`/`Ink`/`Line`/`Stipple` from `src/paint/paint.tsx`, a `draw` prop (ink-on), light from the upper right.
  Samples in `src/paint/` (world.tsx, places.tsx, people.tsx) show the quality bar and construction — never use them as they are.
- People: the `Person` rig with a costume DESIGNED for this film (`COSTUMES` in the lib) + `face` {nose, brow, chin, age, build}, `hair`,
  `hairCol`, `beard`, `who` (the real person / role). Real people's look comes from Muse's portraits (likeness by costume and period, not a copy).
- Export `SAMPLE` props per component; `python3 tools/lib_index.py`; QA: `npx remotion still LibSheet out/<slug>_lib.jpg --props='{"slug":"<slug>"}' --frame=40`
  (page 1, 2… for more). Look at every sheet; redraw anything crude. Gate: ≥ 10 drawings, ≥ 80 % of non-generic elements the film's own.

## 2b. Opening and closing (owner 16 Nov 2026) — of the CONTENT, not the channel
- Open on the film's question made concrete (a hook the viewer can hold), say how we will find out (the journey), then the episode's
  `TitleCard` (music only, `gap` ≈ 6 s). Close by returning to the opening image (a bookend that lands the answer), then a short `EndCard`.

## 3. Build the world
`episodes/<slug>/world.py` writes `world` into `episode.json` (lines.py keeps it): one camera; every line's plan becomes entity keys at
`L<i>`, `L<i>+s`, `L<i>@word` (ENGINE.md time refs); IN/TRANS/CAM/LIFE from FX.md; the clue tag (`clue` entity n 1..4 at each clue title);
in-scene `text` where a name/date/number helps (≤ 9 words, never a subtitle); real stock in artefact frames (`play` for footage).
**Every change of scene is DESIGNED (engine v4, FX.md §G):** a thing of the old scene becomes part of the new one — it travels/shrinks/grows
into its place, an outline morphs (`shape.form`), the camera tilts, cranes, dives or goes through an opening — chosen from what the line
says, never one transition type repeated. Inside a scene something must keep happening (an action, a needle, a reading), not a held still.
The generic motion pass in world.py (inside-earth is the model) only handles the small leftovers (labels fall out of focus, things bleed away).
Then `python3 lines.py` → `python3 tools/script_check.py episodes/<slug>` · `python3 tools/check_world.py episodes/<slug>` · `python3 tools/variety.py episodes/<slug>` — all PASS.

## 4. Voice, stills, render
1. `python3 tools/vo.py episodes/<slug>` (real timing) → stills of ~15 key moments: `npx remotion render Story out/f --props='{"slug":"<slug>"}' --frames=a,b,… --sequence --image-format=jpeg`;
   look, fix, repeat (cheap). Cover the opening, every clue title, every real-stock reveal, the twist, the end.
2. `bash tools/make.sh <slug> --ship` in the background (`run_in_background`) + a `send_later` watchdog (≈ 100 min). It runs the gates, voice,
   mix, render, mux, contact sheet, .srt (optional CC), thumbnail (`thumb` in episode.json), and uploads to Drive `fathom/<slug>/`.
3. Look at `out/<slug>_sheet.jpg` and the thumbnail. Fix and re-render only what is wrong.

## 5. Deliver
`python3 tools/variety.py episodes/<slug> --record` · `jobs/deliveries/<slug>.md` (from `_TEMPLATE_P3.md`: files + links, music/stock credits,
facts with sources, honest notes, 3 title options for Muse) · STATUS → `DELIVERED` · INBOX line · commit + push (never media).

## 6. Report to the owner (≤ 8 Vietnamese lines)
Drive link · length · what is new in this film (2–3 ideas) · gates · anything uncertain or reframed · the line to send Muse when he approves:
"đăng tập <tên>".
