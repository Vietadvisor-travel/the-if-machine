# Making a 60-second clip — the only page to read (owner, 12 Nov 2026: "build everything, then 'làm tập' just works")

Format: ONE vertical 9:16 clip, about 60 s (a target, not a limit: a few seconds over or under is fine; owner 12 Nov 2026: never re-render just for length), an animated TRUE micro-story. Picture: realistic real-time 3D (IFM.L3: HDRI light,
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
- Fill the script file: sources, score, the 4 tests, the table (time · VO · SHOT · 2D · SFX · src). 150–190 words.

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
- Missing asset → add a line to ASSETS3D.md "Wanted" (Muse fulfils it on Saturday) and use the closest existing one.
- Camera frames the `on` actor by size; move over the beat; a new shot every sentence, never the same cam twice in a row.
- Story-specific objects that no asset covers: a bespoke act `x3_<name>` in `engine/library/bank/<slug>.js` (see bank/okene.js),
  built from IFM.L3 helpers (L.tug, L.rock, L.seabed, L.particles, L.rays, L.figure …). Add it to the library for reuse.

## 3. Gate (one command)
```
node tools/clip_gate.mjs stories/<slug>.story     # script rules (clip_check) + 3D render cost + contact sheet
```
Fix what it lists; look at the ONE sheet it names. Render cost budget for L3: ERROR > 9 s/frame (normal 2–5 s).

## 4. Render (background, ≈ 25–35 min for 60 s)
```
node tools/make.mjs stories/<slug>.story --fmt 9x16 --skip-lint --skip-review --speed 1.0 --fps 25 > out/<slug>.log 2>&1
grep -E "deliver →|FAIL|Error" out/<slug>.log
```
Watchdog with send_later; wait on the PID. QA: `python3 tools/qa.py stories/<slug>.story --every 1 --scale .2 --lean` (one sheet).

## 5. Deliver
`bash tools/ship.sh <slug> <cover_second>` · `jobs/deliveries/<slug>.md` (files, sources, honest notes, caption with
"animated reenactment", sources for the pinned comment) · STATUS → DELIVERED · INBOX line · commit + push `main` ·
report to the owner ≤ 8 Vietnamese lines + the line for Muse: "đăng tập <tên>".

## Time (target once the library is full)
research 15 · script 10 · shots 30–60 · gate 15 · render 25–35 (in the background, next clip starts) · deliver 10 min.
