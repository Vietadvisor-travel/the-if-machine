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

## 2c. v5 standard (owner 17 Nov 2026) — every new film
`lines.py` → `write(..., standard=5)`; each line carries reads · focus · becomes {from, to, how} · acts · mood (STORY.md §7, kinds in
FX.md §H, demo `episodes/fx-reel`). Narration is read plain (no stress drawl). Music is planned by measurement: `python3 tools/score.py
episodes/<slug> --write`. Gates added to make.sh: `plan_check.py` (the plan) and `still_check.py` (no stretch > 2.5 s where nothing
happens — inside-earth v2 had 21 % dead time; a v5 film must have none). Drawings follow STYLE.md "True to life" (reference beside drawing).

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
   mix, render, mux, contact sheet, .srt (optional CC), the thumbnail (`thumb` in episode.json → the film's own `THUMB`), and uploads to Drive `fathom/<slug>/`.
3. Look at `out/<slug>_sheet.jpg` and `out/<slug>_thumb.jpg` (and the thumb at phone size, 168 px wide). Fix only what is wrong. Fix and re-render only what is wrong.

## 5. Deliver
`python3 tools/variety.py episodes/<slug> --record` · `jobs/deliveries/<slug>.md` (from `_TEMPLATE_P3.md`: files + links, music/stock credits,
facts with sources, honest notes, 3 title options for Muse) · STATUS → `DELIVERED` · INBOX line · commit + push (never media).

## 6. Report to the owner (≤ 8 Vietnamese lines)
Drive link · length · what is new in this film (2–3 ideas) · gates · anything uncertain or reframed · the line to send Muse when he approves:
"đăng tập <tên>".

## Render farm (owner 17 Nov 2026: "càng bào được càng tốt… ổn định, tốc độ, nhưng vẫn fall back được về cơ chế cũ")
- **Session start (once):** attach the runner repo — `add_repo vietadvisor-travel/frame-batch` (access: push) and clone it to
  `/home/user/frame-batch`. Without it the farm says so and everything renders here, exactly as before.
- `make.sh` renders through `tools/farm.py` (≤ 20 chunks): footage chunks render HERE while the rest go to free GitHub runners
  (public repo, generic runner, no names; pack + results via the owner's private Drive `_farm/<sig>`, deleted after). Then
  `render.py` joins and renders anything missing. `FARM=0 bash tools/make.sh <slug>` = the plain local render.
- **Safety, all automatic:** no runner starts within 10 min → all here · a runner fails (`.fail`) or is too slow → that chunk here ·
  every returned chunk: frame count + one frame re-rendered here and measured (`quality`: overall ≥ 45 dB and worst 64×64 detail
  ≥ 32 dB — owner: overall + detail OK, not pixel-exact) → a miss → every farm chunk dropped, the whole film renders here · any error in farm.py → the plain local render.
- Measured 17 Nov: footage-free chunks are bit-identical to local renders; footage frames differ a hair (49–52 dB overall, ≥ 36 dB
  worst detail) — inside the gate, so footage chunks farm too (`FARM_FOOTAGE_LOCAL=1` keeps them here).
- Never edit `src/` while a farm run is in flight (the runners and the local pass must render the same bundle).

## Thumbnail (owner 17 Nov 2026: "wow hơn, chất hơn nữa, bố cục và visual như thumbnail thật sự, không nhất thiết cắt từ tập ra")
Every film DRAWS its thumbnail: `src/lib/<slug>/thumb.tsx` exports `THUMB` (1280×720; re-exported from the lib's index.tsx);
`episode.json` `thumb` carries its words ({title with one *accent* word, kicker, note}). Rules: ONE idea a stranger gets in a second
(the film's governing image at poster scale, lit for drama), ≤ 4 title words, the house faces (title IM Fell French Canon SC, kicker
IM Fell English SC, hand La Belle Aurore, numbers Special Elite), one hot accent colour against the engraving's gold and sepia, the
FATHOM mark small; every word and number true and from the research pack; no faces of real people drawn as photos. Check it at 168 px.
Sample: `src/lib/empty-atom/thumb.tsx` ("It came back." — the one red track thrown back out of a vast, empty gold atom).

