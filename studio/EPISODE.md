# Making an episode — the only page to read (lean, complete)

If the research pack is missing, research it yourself first: `jobs/research/_TEMPLATE.md`, web search, 2 sources for heavy
claims, then commit it. For an episode, read THIS page, `API.md` (when writing code), the research pack and BRAND §2 (tone). Nothing else up front.
Open `references/ifm-director.md` or `IFM_HOUSE.md` only for a specific question; grep, don't cat.
Token rules are at the end.

## 00. The house look (owner, 4 Nov 2026 — overrides anything below that disagrees)
- **Calm, clear, alive. Not dramatic.** Tell it plainly, like a good documentary: no stamps slamming, no red alarms,
  no "shocking" framing. Entertainment comes from good pictures that act out each line and from interesting facts.
- **No glare, no flicker.** No flashes, shakes, glitches, colour splits, strobing or blinking lights, white blow-outs.
  The engine enforces it (`ifm_calm.js`): only calm transitions (cut, fade, slide, match, zoom, zoomthru, ink); jerky
  dir= effects are dropped; `variety.mjs` and `script_check.mjs` error on them. An effect is used only where the scene
  needs it (at most about one a minute), never to fill a quota.
- **Unhurried pacing.** Voice at `--speed .95`, a breath between lines (automatic), a new angle every 4–7 s; the camera
  moves smoothly inside a shot. Fewer ideas per minute, each one given time to land.
- **Continuity.** Scenes flow into each other: the same person carries the story through the simulated parts, a place
  or object continues across the cut, a camera move continues, the next line answers the last. Every shot in the
  director's script has a LINK: how it connects to the shot before.
- **Precise actions (people must behave like people).** Feet on a floor, never floating or standing on furniture;
  a seated person sits on a chair (`sit`, `type`, `sitread`, `sitphone` draw one); walkers move at the stride speed
  (`IFM.walkX`, crowds automatic); hands hold real things (`o.hold` letter, sign, box, cup, bag, pen; `phone` pose);
  reactions are small and human (`think`, `worried`, `nod`, `read`, `talk`), not cartoon panic; scale and perspective
  consistent with the room. The director's script states each person's ACTION.
- **The style stays the same** (facet people, flat colours): the upgrade is in precision and care, not a new look.
- **Research is a reference, not a script.** Use the facts that serve this story, leave out the rest, and think further:
  add your own explanations, comparisons and everyday examples (anything stated as fact still needs a source).

## 0a. The director's script comes FIRST (owner, 4 Nov 2026)
- Before any code, write `jobs/scripts/<slug>.md` from `jobs/scripts/_TEMPLATE.md`: the spine, then one block per scene
  with VO (exact words) · LINK (how it connects to the shot before) · PICTURE (SUBJECT / BACKGROUND / FOREGROUND / LIFE) ·
  ACTION (what each person does, on what, holding what) · CAMERA · TEXT · FX (trans= + an effect only if needed) ·
  SOUND · BUILD (reuse an act/bank id, or NEW x_<name> and what to draw). Vary everything: cameras, transitions, effects, places.
- `node tools/script_check.mjs ../jobs/scripts/<slug>.md` must PASS (all fields, 6–10 min of words, variety, a NEW picture
  at least every 5 shots). Commit it as `[claude] [<slug>] director's script`.
- The build (bank file, bespoke acts, story) follows the script shot by shot; the story's beats carry the shot ids (`// S07 …`).

## 0. Setup and scaffold (2 commands)
```
bash ../setup.sh | tail -12
node tools/new_episode.mjs <slug> "<Vietnamese name>"   # → stories/<slug>.story (the one vertical film) + engine/library/bank/<slug>.js
```

## 0. Picture first (owner, 4 Nov 2026: livelier, less machine and data, polished, never cluttered)
- **Story through people, places and things.**
  - Follow one character (the "you" of the episode) through concrete moments: a morning, a street, a kitchen, a classroom.
  - Every idea becomes a physical picture: a crowd reacting, a city changing, an object transforming.
- **Data is seasoning.**
  - ≤ 15 % of beats may be data or machine scenes (count, map, servers, scale, guess, the machine).
  - At most one number counter per minute.
  - A number is shown by its consequence: 8 billion = the crowd filling a stadium, not a counter.
- **No host, no machine (owner, 4 Nov 2026).** An objective documentary voice tells it; no character narrates, no lever,
  no machine face, no answer ticket, no "SIM · DAY" clock (a plain date or place label only when time really matters).
  Entertainment comes from the CONTENT: a strong hook, surprising real facts, vivid pictures that act out every line,
  open loops, a real case, a clear payoff.
- **Full frames (owner, 4 Nov 2026: every frame wow, no empty space).** The subject is BIG (40–70 % of the picture
  height); every shot has a real background (a place, a sky, a room), a foreground layer and moving life. No flat
  bands, no lone icon on a dark field. The gate measures it (`cost.mjs` fill: dead picture area > 35 % WARN, > 55 % ERROR).
- **Every beat is alive (checklist):**
  1. A foreground layer (`fg=`, automatic per scene) for depth.
  2. A subject that ACTS: pose changes on the key word (`then="pose=shock@1"`, crowds `react="shock@1|cheer@2"` ripple across).
  3. Background life (`life=`, automatic: birds, leaves, insects, shooting stars, traffic).
  4. Light that changes (time of day, a lamp, a flicker) or a camera with intent (zoom into a point, orbit, tilt).
  5. One transformation per beat: something becomes something else.
- **Composition, both formats:**
  - One focal subject per shot, BIG, on a third; the rest of the frame is its world. Lettering sits over the background, never on a face or a subject.
  - The gate flags "text covers a face" and "text covers <subject>" in 9:16.
  - 9:16 is composed on its own: the subject sits above the caption band (captions 74.5–79 %, small; keep 72–82 % free of key text), the lettering at 20–30 %.
    Below 72 % the picture continues (ground, floor, table, water) under the captions; never key content there.
  - Polish: no element cut at an edge by accident, no two things fighting for attention, spacing even.
    Colours follow BRAND (coral only for the twist).

## 1. The film in one pass (write it once, completely; no drafts)
- **ONE vertical 9:16 film, 6–10 min** (owner, 4 Nov 2026: no 16:9, no separate short). ≈ 1000–1700 spoken words
  (measured: 2.8 words a second final, pauses included); about 70–120 beats. `variety.mjs` errors outside 6–10 min.
- **Frame:** subject in 15–70 % of the height; captions are small and fixed at 74.5–79 %; keep the bottom 20 % and the
  right edge free of key content (Shorts/Reels/TikTok buttons and titles).
- **Shape:**
  1. Hook 0–3 s: `kind=w act=hook scene="<the most striking picture of the episode>" q="WHAT IF …|…?"` and a first line
     that opens a loop (a consequence you must stay to understand).
  2. By 0:20, the promise: what the viewer will know at the end.
  3. 4–6 chapters. Each: a surprising picture, a real fact (sourced), what it does to ordinary life, and an open loop into
     the next ("But that was the easy part."). Stakes rise chapter by chapter.
  4. The midpoint reveal at about 50 %; the strongest real case at about 70 %.
  5. Optional once: a question to the viewer ("What would you do?"), then 0.5 s of silence.
  6. The payoff: the clear answer in one sentence, a callback to the hook picture.
  7. The end card is automatic (header `next:`).
- **Every beat:**
  - a `// m:ss [dur] SUBJECT: …` frame line;
  - a picture of the SUBJECT of its line;
  - a new angle or picture every 4–7 s (`then=`), the camera moving smoothly inside the shot — never a cut per line;
  - a `dir=` track (camera with intent; text only where it adds meaning; one effect on the punch word);
  - a meaning or rhythm `trans=` (never the same twice in a row).
- **Words:** objective documentary voice (no "I", no host); "you" for the viewer; present tense; short lines; specific
  concrete details; sourced numbers; "about" for estimates. Banned: mind-blowing,
  you won't believe, shocking, insane.
- **Header:**
  ```
  title: · channel: ifm · run: N · next: <next question> · voice: am_puck · people: facet|holo · sources: …
  ```
  `af_bella` speaks quotes: `[b]` lines, or `speaker=b` on a beat.

## 2. Picture menu (pick the most surprising one for the line, then direct it)
- **World kits** (`kind=w act=`):
  - globe (full limb side; night arcs off cut)
  - zoom (space→street)
  - city (skyline aerial street; dark=)
  - crowd (close street wide; pose mix phones dark)
  - map (pins arcs band)
  - count (icon n value)
  - split (a= b=)
  - phone (pov desk; offline chat feed map battery)
  - servers (off ai)
  - sky (days town)
  - space (mars moon earth sun; orbit surface; suns base rover)
  - money (card cash atm)
  - scale (items labels)
  - guess (a b answer)
  - animals (field sea sky)
  - stage (bank items)
- **Bespoke acts** (`kind=w act=x_<name>`, the `x_` prefix marks them bespoke): ≥ 30 % of the film's beats. Write them in `engine/library/bank/<slug>.js` from the
  template, composed from API painters, bank items and icons. Add ≥ 5 new bank items. Check `BANK.md`, and do not reuse what the
  last 2 episodes used.
- **Layers on any world beat:**
  - `fx=rain+rays` (rain snow dust sparks rays bokeh embers glitch confetti fireflies holo)
  - `look=` (blueprint xray night vintage mono warm cold)
- **Transitions:**
  - meaning: zoomthru match liquid bloom ripple ticket scan tunnel fold
  - rhythm: whip slices blobs cube spin drop stripes2 flip3d shatter pixel
- **Lettering:**
  - quick: `words="WORD@k|!TWIST@k|~DATA@k|^GOLD@k"`
  - directed: `dir="@k text <style> 'TEXT|small' x,y colour"`

## 3. `dir=` cheat sheet (when: `1.2`, `0.5-2`, `@1`, `@1+.3`, `@0-@1`)
- **Camera:** `zoom 1.6 .62,.4` · `pan .1,0` · `rot 8` · `orbit 12` · `shake .5` · `ease=spring|back|io|lin`
- **3D:** `flip` · `tilt 35` · `card`
- **Time:** `slow .3` · `freeze`
- **FX:** `flash` · `chroma 12` · `glitch` · `speed x,y` · `shock x,y colour` · `zblur` · `mblur` (fast moves only) · `vignette` · `iris x,y`
- **Text:** `pop drop slam scramble type counter highlight extrude glitchtext outline stack count stamp typeon mask gold neon comic hand split sign`
  - colours: paper yellow teal coral (coral = twist only)
- **Sound:** `sfx <name>`. Sound only where something visible happens.
- **Example:**
  ```
  dir="0-2 zoom 1.5 .6,.45; @1 text counter '8,100,000,000|people' .5,.2 yellow; @1+.6 fx shock .6,.45 teal"
  ```

## 4. Gates — ONE command, compact output
```
node tools/gate.mjs stories/<slug>.story          # lint both formats + variety + review + render cost → ≤ 20 lines + ONE contact sheet
```
- **Render cost (owner, 4 Nov 2026: every shot WOW, but never heavy to render).** The gate times real full-size frames
  every 1.5 s in both formats: > 800 ms a frame = ERROR, > 400 ms = WARN, normal 100–250 ms. Fix heavy shots without
  losing the look: draw static or blurred layers ONCE into a `mkCanvas` cache (`withCtx`) and paste it; never a live
  `ctx.filter = 'blur(…)'` over many paths; no per-frame loops over thousands of items. A shot at ERROR never goes to render.
- Fix what it lists, re-run it, then look at the ONE sheet it names (`out/<slug>_sheet.jpg`).
- Look at single frames only where the sheet shows a doubt: `tools/still.mjs` + `tools/montage.py`, ≤ 12 tiles.
- **Per-second QA, 2 rounds (brief §3), token-lean:**
  - **Round 1** is automatic. The gate's lint samples every 0.25 s in both formats (text cut off, text over faces, overlaps)
    and review measures motion every frame (static stretches). No images to read.
  - **Round 2** is visual, after the fixes: `python3 tools/qa.py stories/<slug>.story --every 1 --scale .2 --lean`.
    One frame per second, 60 per sheet: a 5-min film is 5 sheets, the vertical 2. Read them once.

## 5. Render (background, read only the summary)
```
node tools/make.mjs stories/<slug>.story --fmt 9x16 --skip-lint --skip-review --speed .95 > out/<slug>.log 2>&1
grep -E "deliver →|FAIL|Error|music " out/<slug>.log
```
- Run them with `run_in_background`. Wait for the notification; never poll, never sleep.
- **Render watchdog.** A healthy render does 150 frames in ~25 s per job (a 5-min film ≈ 15 min, the vertical ≈ 5 min).
  About 10 min after starting, read the last `frame` line of the log once: if the pace fell below 150 frames per 60 s, stop
  the render at once, find the shot with `node tools/cost.mjs`, fix it, and restart. Never let a render run past 40 min.
- Final check: one 12-frame sheet per FINAL file (ffmpeg stills → `montage.py`).

## 6. Deliver
```
bash tools/ship.sh <slug> [cover_second]   # masters (not _FINAL) renamed per PROTOCOL §5 + cover + srt + stories zip → Drive; prints the files block and the music credits
node tools/variety.mjs stories/<slug>.story --record && node tools/bank.mjs catalog
```
- Write `jobs/deliveries/<slug>.md` from `jobs/deliveries/_TEMPLATE.md`; set STATUS → DELIVERED; add an INBOX line;
  commit `[claude] [<slug>] delivered` (with history.json and BANK.md); push `main`.
- Report to the owner in ≤ 10 Vietnamese lines. End with the line he sends Muse when he approves: "đăng tập <tên>".

## 6b. Time budget (owner: one episode ≤ 3 hours, start to report)
| step | budget |
|---|---|
| research pack (only if missing) | 20 min |
| story + bank items (written once, from the template) | 60 min |
| gate runs (≈ 35 min each; at most 2 fix loops) | 70 min |
| QA round 2 sheets | 10 min |
| render the film (watchdog above) | 25 min |
| ship, delivery note, report | 15 min |
- Over budget on a step → simplify (fewer fix loops, reuse bank items) rather than polish; never exceed 3 h in total.

## 7. Token rules (owner: as lean as possible, quality unchanged)
- **Read:**
  - read once: this page, `API.md`, the research pack;
  - grep for anything else;
  - never `cat` engine source or long logs (`| tail`, `grep -E`).
- **Write:**
  - write the story and the bank file once, completely, from the template;
  - fix with small edits; never re-read a file you just wrote.
- **Look:**
  - one contact sheet per check (both formats on one image), never single frames in a row;
  - ≤ 4 sheets for a whole episode before rendering, 2 after.
- **Run:** long jobs in the background with one completion notification. Keep logs in files and print only summaries.
- **Report:** the final report is ≤ 15 lines.
