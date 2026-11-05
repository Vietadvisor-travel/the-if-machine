# Making an episode — the only page to read (lean, complete)

If the research pack is missing, research it yourself first: `jobs/research/_TEMPLATE.md`, web search, 2 sources for heavy
claims, then commit it. For an episode, read THIS page, `API.md` (when writing code), the research pack and BRAND §2 (tone). Nothing else up front.
Open `references/ifm-director.md` or `IFM_HOUSE.md` only for a specific question; grep, don't cat.
Token rules are at the end.

## 00. The house look (owner, 4 Nov 2026 evening — overrides anything below that disagrees)
- **Objective, plain entertainment (owner, 5 Nov 2026: "a channel that is objective and plain, not this").** A what-if
  question is answered with what science, history, data and experts actually say. No machine persona, no "run", no story.
- **Neutral explainer, not a story.** No fictional protagonist, no named invented character, no "imagined city", no "day one"
  simulation plot. The narrator explains the question plainly and clearly, like a good documentary explainer: what the
  question really asks, how it works, what real evidence and history say, what experts expect, what is uncertain, the answer.
  A short "imagine…" illustration (one sentence, one picture) is allowed; a plot is not. `script_check.mjs` errors on a
  recurring invented name, "Meet <Name>", "our imagined…", "Day one", "Let's run it".
- **Entertaining through content:** a strong question, surprising real facts, clear analogies and comparisons ("that's a
  stack of coins as tall as…"), what people believe vs what is known, light observational humour. Never through drama.
- **A real hook and a real ending.** HOOK 15–25 s (the question → one surprising fact → why it matters → what this video will
  answer), then a held pause before the first section. CONCLUSION 25–45 s (recap the 3 key ideas → the answer in one sentence →
  a closing thought), then the end card. Never start explaining in the first line without setting up the question.
- **Unhurried.** Voice at `--speed 1.0` (never faster), ≈ 135–150 words a minute; the engine leaves 0.34 s between lines and
  ≈ 1.2 s between beats; `pause=1.2` after the hook, after each section card and before the conclusion. One idea per beat.
- **Calm sound.** Music is a low bed under the voice; sound effects only where one really matters (`sfx=name@k`, at most one
  every 30 s); master −16 LUFS. The picture makes no sound by itself (minimal sound is the IFM default).
- **No glare, no flicker.** No flashes, shakes, glitches, colour splits, strobing, white blow-outs (the GL post pass now has a
  real calm grade: no bloom, no halation). Only calm transitions (cut, fade, slide, match, zoom, zoomthru, ink).
- **Pictures you can read in one second.** Every 2D picture shows the SUBJECT of its line as a recognisable thing — an
  OpenMoji illustration (2,000+ named, `IFM.emoji`), a bank item, a map, a number made visible — big (25–60 % of the frame
  height), labelled when it is not obvious, on a clean background. No tiny figures, no abstract blobs, no hand-drawn shapes
  that only the author can decode. The explainer kit (`references/explainer-kit.md`) is the default for 2D; bespoke acts only
  where the kit cannot show the idea, and they too are built from illustrations.
- **Research is the backbone.** Use the facts that answer the question; add your own explanations and analogies (anything
  stated as fact needs a source).

## 0a. The director's script comes FIRST (owner, 4 Nov 2026)
- Before any code, write `jobs/scripts/<slug>.md` from `jobs/scripts/_TEMPLATE.md`: the spine, then one block per scene
  with VO (exact words) · LINK (how it connects to the shot before) · PICTURE (SUBJECT / BACKGROUND / FOREGROUND / LIFE) ·
  ACTION (what each person does, on what, holding what) · CAMERA · TEXT · FX (trans= + an effect only if needed) ·
  SOUND · BUILD (reuse an act/bank id, or NEW x_<name> and what to draw). Vary everything: cameras, transitions, effects, places.
- `node tools/script_check.mjs ../jobs/scripts/<slug>.md` must PASS (all fields, 6–10 min of words, variety, a NEW picture
  at least every 5 shots). Commit it as `[claude] [<slug>] director's script`.
- The build (bank file, bespoke acts, story) follows the script shot by shot; the story's beats carry the shot ids (`// S07 …`).

## 0b. Engine 3.0 — shots, 2D and 3D (owner, 4 Nov 2026; standard: `references/ifm-craft.md`)
- Content: HOOK (question, surprising fact, why it matters, what you will learn) → 3–5 sections (each opened by `ex_chapter`)
  → WHAT PEOPLE SAY (optional) → CONCLUSION (recap, answer, closing thought). Neutral explainer; no fictional plot (§00).
- Every cut states SIZE · angle · move · medium in the script (`- SHOT:`) and in the story:
  `cam=<EWS|WS|MS|MCU|CU|ECU>.<eye|high|low|top|dutch|ots|pov>.<push|pull|trackL|trackR|pan|tilt|crane|drop|orbit|dolly|static>[:fx,fy]`
  (2D acts: framing around the point fx,fy; in `then=` each cut gets its own shot).
- 3D sets (`engine/library/ifm3d.js`): `# vis kind=w act=s3 set=<set> on=<subject> cam=… time=day|dawn|dusk|night`
  | set | subjects (`on=`) | keys |
  |---|---|---|
  | city | center tower park street | `rush=` traffic, `dark=<s>` blackout cascade, `lit=` |
  | street | her stop street crossing block | `do=walk|phone|talk`, `n=` walkers, `rush=` |
  | plaza | building steps door fountain crowd | `do=sign|cheer` (protest/celebration), `n=` |
  | office | desk screen room window | — |
  | home | her phone room window | `do=sit` (default on the phone) |
  | waiting | screen queue chairs counter | `screen="TOP|BIG"`, `empty=1` |
  | servers | aisle rack tech | — |
  Change set inside a beat with `then="act=s3 set=… cam=…@k"`.
- **2D and 3D combined (owner, 4 Nov 2026 — never all 3D):** 25–55 % of cuts in 3D; never 4 cuts in a row in one medium;
  hybrid shots about every 2 minutes:
  - `pins="her:ANA, NURSE@0|phone:~PERMIT APPROVED@1"` — 2D labels pinned to 3D subjects (follow the camera);
  - `pip="<act> key=val …" pipAt=k pipPos=tr|tl|mr|ml|br|bl` — an inset card on ANY beat (2D detail over a 3D wide, a 3D view
    over a 2D chart);
  - `act=split a="s3 set=city time=day cam=…" b="s3 set=city time=night dark=1 cam=…"` — before/after (costs two 3D renders).
  2D carries characters acting, diagrams, maps, numbers, documents and phones; 3D carries places, scale and impossible moves.
- **The 2D half is the explainer kit** (owner, 4 Nov 2026 evening): recognisable illustrations, diagrams, numbers, maps and
  quotations (`references/explainer-kit.md`), cut together with the 3D sets. The old hand-drawn acts stay for reference only.
- **Alive, never busy:** the script's TIMELINE gives a new moment at least every 3–4 s of each shot; the story carries them with
  then= cuts, dir= tracks, pins=, words=, people actions and set keys; the gate's motion check (cost.mjs) flags any 2 s where the
  picture barely changes and fails 3 s frozen.
- Director craft in every script: `- SHOT:` (size · angle · move · medium) and `- LOOK:` (light, time, palette, mood, composition)
  per shot; a match cut and a montage in the film; ≥ 4 angles and ≥ 1 close-up per minute; vary looks (≥ 4).
- Check every shot on the contact sheet (`node tools/sheet.mjs stories/<slug>.story v 3`) before the gates.

## 0. Setup and scaffold (2 commands)
```
bash ../setup.sh | tail -12
node tools/new_episode.mjs <slug> "<Vietnamese name>"   # → stories/<slug>.story (the one vertical film) + engine/library/bank/<slug>.js
```

## 0. Picture first (owner, 4 Nov 2026 evening: clear, meaningful pictures; never vague)
- **One idea, one picture.** Each beat shows the thing the line is about, so a viewer with the sound off understands it.
  - an object or a concept → `ex_show e=<illustration>` (big, labelled);
  - two things → `ex_compare`; a process or a chain → `ex_flow`; points or a recap → `ex_list`; a number → `ex_stat`
    (shown by its size: a grid of things); dates → `ex_timeline`; a real quotation → `ex_quote`; a new section → `ex_chapter`;
  - places, scale and movement → the 3D sets (`act=s3`) and maps/globe; 2D labels on 3D with `pins=`.
- **Find the illustration:** `EMOJI.md` lists every name (bread, cow, coin, money bag, bank, classical building, flag kenya …).
- **Composition (9:16):** title/lettering at 15–25 %, the subject at 30–70 %, captions small at 74.5–79 %, the bottom 20 % and
  the right edge free of key content. One focal subject; at most 4 things on screen.
- **Alive, calm:** something changes every 3–4 s (an item appears, an arrow draws, the camera pushes), nothing frozen
  > 3 s; never busy. The gate measures motion and dead area.

## 1. The film in one pass (write it once, completely; no drafts)
- **ONE vertical 9:16 film, 6–10 min.** ≈ 850–1400 spoken words at the new pace (2.3–2.4 words a second final, pauses
  included); about 45–80 beats. `variety.mjs` errors outside 6–10 min.
- **Shape (neutral explainer):**
  1. HOOK 0–25 s: the question in plain words → one surprising real fact → why it matters → "In this video: …". The first
     picture is the most striking clear image of the subject (`act=ex_show` / a 3D set / globe), lettering = the question.
     `pause=1.2` at the end of the hook.
  2. 3–5 SECTIONS, each opened by `ex_chapter` (a number, a title, an illustration; a breath). Each section: one idea →
     how it works (analogy) → real evidence (sourced) → what it means → a one-line takeaway → a question that leads on.
  3. WHAT PEOPLE SAY (optional, ≈ 1 min): a popular belief named as a belief, then what is actually known.
  4. CONCLUSION 25–45 s: `ex_list n=1` recap of the 3 key ideas → the answer in one sentence → one closing thought.
  5. The end card is automatic (header `next:`).
- **Every beat:** a `// m:ss SUBJECT: …` frame line; a picture of the SUBJECT of its line; a calm `trans=`; at most one
  lettering; no sound unless `sfx=` asks for it.
- **Words:** objective voice, "you" for the viewer, present tense, short sentences; sourced numbers; "about" for estimates;
  contractions; rhetorical questions; never: mind-blowing, you won't believe, shocking, insane.
- **Header:** `title: · channel: ifm · run: N · next: … · voice: <owner's pick> · people: facet · sources: …`
  (credit line for OpenMoji in the delivery note).

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
- **Explainer kit first** (`ex_show ex_compare ex_flow ex_list ex_stat ex_chapter ex_quote ex_timeline`, docs in
  `references/explainer-kit.md`), with OpenMoji illustrations (`EMOJI.md`).
- **Bespoke acts** (`kind=w act=x_<name>`) only where the kit cannot show the idea; build them from `IFM.emoji`, bank items
  and icons (never vague hand-drawn shapes). No minimum share any more.
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
node tools/make.mjs stories/<slug>.story --fmt 9x16 --skip-lint --skip-review --speed 1.0 --fps 25 > out/<slug>.log 2>&1
# make runs tools/preflight.mjs first (voice lines = story lines, every act exists, calm look, every scene draws) and stops on any error
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

## 6b. Time budget (measured 4 Nov 2026, vertical 6–8 min)
| step | wall time |
|---|---|
| research pack (only if missing) | 15–20 min |
| director's script + script_check | 20–30 min |
| new scenes + story (the variable part) | 60–90 min |
| gate (lint ≈ 8 min, review, cost/fill) | 30–40 min |
| render: preflight, voice, frames (4 jobs, 25 fps), mix, encode | ≈ 40 min |
| QA round 2, ship, delivery note, report | 15 min |
- About 3–4 hours in total when nothing is redone. Every background job gets a watchdog (send_later); wait on a PID, never
  on `pgrep -f` with a pattern your own command line contains.

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
