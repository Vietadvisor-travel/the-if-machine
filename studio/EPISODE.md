# Making an episode — the only page to read (lean, complete)

If the research pack is missing, research it yourself first: `jobs/research/_TEMPLATE.md`, web search, 2 sources for heavy
claims, then commit it. For an episode, read THIS page, `API.md` (when writing code), the research pack and BRAND §2 (tone). Nothing else up front.
Open `references/ifm-director.md` or `IFM_HOUSE.md` only for a specific question; grep, don't cat.
Token rules are at the end.

## 0. Setup and scaffold (2 commands)
```
bash ../setup.sh | tail -12
node tools/new_episode.mjs <slug> "<Vietnamese name>"   # → stories/<slug>.story (long) + stories/<slug>-v.story (vertical) + engine/library/bank/<slug>.js
```

## 0. Picture first (owner, 4 Nov 2026: livelier, less machine and data, polished, never cluttered)
- **Story through people, places and things.**
  - Follow one character (the "you" of the episode) through concrete moments: a morning, a street, a kitchen, a classroom.
  - Every idea becomes a physical picture: a crowd reacting, a city changing, an object transforming.
- **Data is seasoning.**
  - ≤ 15 % of beats may be data or machine scenes (count, map, servers, scale, guess, the machine).
  - At most one number counter per minute.
  - A number is shown by its consequence: 8 billion = the crowd filling a stadium, not a counter.
- **The machine** appears only at the hook, the answer ticket and the end. The sim clock shows when it changes, then fades.
- **Every beat is alive (checklist):**
  1. A foreground layer (`fg=`, automatic per scene) for depth.
  2. A subject that ACTS: pose changes on the key word (`then="pose=shock@1"`, crowds `react="shock@1|cheer@2"` ripple across).
  3. Background life (`life=`, automatic: birds, leaves, insects, shooting stars, traffic).
  4. Light that changes (time of day, a lamp, a flicker) or a camera with intent (zoom into a point, orbit, tilt).
  5. One transformation per beat: something becomes something else.
- **Composition, both formats:**
  - One focal subject per shot, on a third, with air around it. Lettering lives in the empty third, never on a face or a subject.
  - The gate flags "text covers a face" and "text covers <subject>" in 9:16 and 16:9.
  - 9:16 is composed on its own: the subject sits above the caption band (47–65 %), the lettering at 20–30 %.
    The bottom 35 % is decoration only.
  - Polish: no element cut at an edge by accident, no two things fighting for attention, spacing even.
    Colours follow BRAND (coral only for the twist).

## 1. The film in one pass (write it once, completely; no drafts)
- **Long 16:9: 3–6 min** (≈ 420–850 spoken words). **Vertical 9:16: 60–90 s** (≈ 150–210 words), its own hook.
- **Shape:**
  1. Hook 0–3 s: `kind=ifm act=lever q="WHAT IF|…|…?"`, the question by 1.5 s.
  2. Setup and promise by 0:30.
  3. The simulation runs with `clock=` on every beat, stakes rising.
  4. A `guess` beat, then 0.4–0.8 s of silence.
  5. The twist at about 70 % (`act=answer text=… stamp=…`).
  6. The payoff.
  7. The end frame is automatic (header `run:` and `next:`).
- **Every beat:**
  - a `// m:ss [dur] SUBJECT: …` frame line;
  - a picture of the SUBJECT of its line;
  - a `then=` cut every 2–3 s;
  - a `dir=` track (camera with intent; text only where it adds meaning; one effect on the punch word);
  - a meaning or rhythm `trans=` (never the same twice in a row).
- **Words:** "you", present tense, short lines, sourced numbers, "about" for estimates. Banned: mind-blowing,
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
- **Bespoke acts** (`kind=w act=x_<name>`, the `x_` prefix marks them bespoke): ≥ 30 % of the long video's beats. Write them in `engine/library/bank/<slug>.js` from the
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
node tools/gate.mjs stories/<slug>.story          # lint both formats + variety + review → ≤ 20 lines + ONE contact sheet
```
- Fix what it lists, re-run it, then look at the ONE sheet it names (`out/<slug>_sheet.jpg`).
- Look at single frames only where the sheet shows a doubt: `tools/still.mjs` + `tools/montage.py`, ≤ 12 tiles.
- Then do the same for `stories/<slug>-v.story`.
- **Per-second QA, 2 rounds (brief §3), token-lean:**
  - **Round 1** is automatic. The gate's lint samples every 0.25 s in both formats (text cut off, text over faces, overlaps)
    and review measures motion every frame (static stretches). No images to read.
  - **Round 2** is visual, after the fixes: `python3 tools/qa.py stories/<slug>.story --every 1 --scale .2 --lean`.
    One frame per second, 60 per sheet: a 5-min film is 5 sheets, the vertical 2. Read them once.

## 5. Render (background, read only the summary)
```
node tools/make.mjs stories/<slug>.story --fmt 16x9 --skip-lint --skip-review --speed 1.06 > out/<slug>.log 2>&1
node tools/make.mjs stories/<slug>-v.story --fmt 9x16 --skip-lint --skip-review --speed 1.06 > out/<slug>-v.log 2>&1
grep -E "deliver →|FAIL|Error|music " out/<slug>*.log
```
- Run them with `run_in_background`. Wait for the notification; never poll, never sleep.
- Final check: one 12-frame sheet per FINAL file (ffmpeg stills → `montage.py`).

## 6. Deliver
```
bash tools/ship.sh <slug> [cover_second]   # masters (not _FINAL) renamed per PROTOCOL §5 + cover + srt + stories zip → Drive; prints the files block and the music credits
node tools/variety.mjs stories/<slug>.story --record && node tools/bank.mjs catalog
```
- Write `jobs/deliveries/<slug>.md` from `jobs/deliveries/_TEMPLATE.md`; set STATUS → DELIVERED; add an INBOX line;
  commit `[claude] [<slug>] delivered` (with history.json and BANK.md); push `main`.
- Report to the owner in ≤ 10 Vietnamese lines. End with the line he sends Muse when he approves: "đăng tập <tên>".

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
