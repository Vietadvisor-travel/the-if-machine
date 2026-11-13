# Making a 90–120-second clip — the only page to read (owner, 12 Nov 2026: "build everything, then 'làm tập' just works")

Format: ONE vertical 9:16 clip, 1:30–2:00 (owner, 12 Nov 2026 evening; a target, not a limit: never re-render just for length), an animated TRUE micro-story. Picture: realistic real-time 3D (IFM.L3: HDRI light,
glTF people with animation, PBR materials, depth of field) + minimal 2D only where it explains the invisible. Voice: am_adam
(Kokoro), speed 1.0, slightly synthetic and deadpan. Writing: `studio/STORY.md` (read it every time). No titles, no kickers,
no spoken outro.

## 0. Setup (once per session)
```
bash ../setup.sh | tail -12
python3 tools/assets3d.py sync      # Drive _assets3d → assets3d_src/ (≈ 1.9 GB, unzipped); names: jobs/stock/ASSETS3D.md
# after writing the story:
python3 tools/assets3d.py story stories/<slug>.story   # builds only the HDRIs/people/props/materials the story names
```

## 1. Story and research (15–20 min)
- From the owner's pick or Muse's list. Score it with STORY.md §1 (≥ 8/10). Two sources per fact on screen.
- `node tools/new_clip.mjs <slug> "<tên tiếng Việt>"` → `jobs/scripts/<slug>.md` + `stories/<slug>.story`.
- Fill the script file: sources, score, the 4 tests, the table (time · VO · SHOT · 2D · SFX · src). 240–330 words.

## 2. Shots — the story file (one beat = one shot = one sentence)
```
# vis kind=w act=l3 set=<studio|outdoor|room|seabed|xray> env=hdr/<id> light=<day|golden|overcast|night|interior|lamp|underwater|dark>
      actors="a=glb/<person>@x,z,rotDeg:Clip1>Clip2@2.5|b=…" props="glb/<prop>@x,y,z,rot,scale|model:<lowpoly>@…|proc:tug@…,flip"
      cam=<EWS|WS|MS|MCU|CU|ECU>.<eye|high|low|top|dutch|ots>.<static|push|pull|orbit|trackL|trackR|crane|drop|handheld> on=<actor|x,y,z>
      fx="rays dust rain bubbles snow" fog=0.03 grade=<neutral|teal|warm|golden|night|cold|clinic> post="dof bloom ao" exposure=1
      ov="tag:30 M@.7,.3|gauge:O2:.62>.48@.8,.22|count:0>133:M@.5,.3" look=<actor|x,y,z>
<the sentence>
```
- Room set keys: `w= d= h= wall=tex/… ground=tex/… window=1`; outdoor: `ground=tex/…`; any set: `bg=none bgk= blur=` (HDRI backdrop).
- People: `glb/<file>` from ASSETS3D.md §4a (wa-man, ea-woman …). Clips: any name from the shared libraries (Mixamo: Idle,
  Scared, Treading_Water, Swimming, Reaching_Out, Falling_Down …; Quaternius: Walk_Loop_Rig …) — full lists in ASSETS3D.md §4b–c.
- **Realism bar (owner, 13 Nov 2026): everything on screen is a REAL model** (scan / detailed PBR model at real scale). Never a box,
  sphere or cylinder standing in for an object, never a toy-like figure. Procedural only for terrain, water, particles, light.
  Missing asset → add it to ASSETS3D.md "Wanted" and reframe the shot so the missing thing is not seen; never fake it with primitives.
- Camera frames the `on` actor by size; move over the beat; a new shot every sentence, never the same cam twice in a row.
- Story-specific objects that no asset covers: a bespoke act `x3_<name>` in `engine/library/bank/<slug>.js` (see bank/okene.js),
  built from IFM.L3 helpers (L.tug, L.rock, L.seabed, L.particles, L.rays, L.figure …). Add it to the library for reuse.

## 3. Gate (one command) — measure first, render once (owner, 12 Nov 2026: "fast and right, no render after render")
```
node tools/clip_gate.mjs stories/<slug>.story     # script rules + REAL voice/mix (length, unknown sounds) + 3D cost + contact sheet
```
It voices the story and builds the mix BEFORE any frame (≈ 2 min): the real length is printed (1:30–2:00 is a target, never a reason to
re-render), and an unknown sound is an ERROR here instead of a silent hole in the film. Fix what it lists; look at the ONE sheet.
Render cost budget for L3: ERROR > 9 s/frame (normal 2–5 s). Never run two make/gate commands on the same slug at once (they share out/<slug>_*).

## 4. Render (background, ≈ 35 min per minute of film at 2 s/frame) — once
```
node tools/make.mjs stories/<slug>.story --fmt 9x16 --skip-lint --skip-review --speed 1.0 --fps 25 --reuse-mix > out/<slug>.log 2>&1
grep -aE "deliver →|FAIL|Error" out/<slug>.log
```
Watchdog with send_later; wait on the PID. QA: `python3 tools/qa.py stories/<slug>.story --every 1 --scale .2 --lean` (one sheet).
**A fix after QA re-renders only what changed:** frames are cached per shot (out/<slug>_9x16_shots/). Edit a beat's line in the story →
only that beat renders again. Edited a shot's CODE (bank file)? Check one still of it first (`node tools/still.mjs stories/<slug>.story v <t>`), then add
`--redo 4,7` (beat numbers); `--fresh` redoes everything.
Length alone is never a reason to re-render.

## 5. Deliver
`bash tools/ship.sh <slug> <cover_second>` · `jobs/deliveries/<slug>.md` (files, sources, honest notes, caption with
"animated reenactment", sources for the pinned comment) · STATUS → DELIVERED · INBOX line · commit + push `main` ·
report to the owner ≤ 8 Vietnamese lines + the line for Muse: "đăng tập <tên>".

## Time (target once the library is full)
research 15 · script 10 · shots 30–60 · gate 15 · render 25–35 (in the background, next clip starts) · deliver 10 min.
