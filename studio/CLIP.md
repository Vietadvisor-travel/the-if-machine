# Making a 90–120-second clip — the only page to read (owner, 12 Nov 2026: "build everything, then 'làm tập' just works")

Format: ONE vertical 9:16 clip, 1:30–2:00 (owner, 12 Nov 2026 evening; a target, not a limit: never re-render just for length), an animated TRUE micro-story. Picture: realistic real-time 3D (IFM.L3: HDRI light,
glTF people with animation, PBR materials, depth of field) + minimal 2D only where it explains the invisible. Voice: am_adam
(Kokoro), speed 1.0, slightly synthetic and deadpan. Writing: `studio/STORY.md` (read it every time). No titles, no kickers,
no spoken outro.

## The standard in one look (owner, 13 Nov 2026 — "final upgrade": every clip meets all of these; the gate checks the starred ones)
- **Story** (STORY.md §2, §3b): opening = the story itself; one human thread; three "but" turns with clocks; a withheld turn; an
  ending with the true irony or meaning. 1:30–2:00. Every fact 2 sources.
- **Picture**: every person and object a REAL model (scan / detailed PBR, real scale); never primitives or toys; missing → reframe +
  Wanted. Fill the frame, keep it moving (*fill, *motion, *cost ≤ 9 s/frame).
- **Sound**: recorded only, matched to the picture — a bed per shot, the actors' action sounds, the shot's events (*unknown sounds,
  *missing real sounds listed); music a calm bed, never ticking (*ticks); voice am_adam 1.0; −16 LUFS.
- **Process**: *comment guard → clip_gate (real voice + mix first) → ONE render (shot cache, stall guard) → QA → ship.

## 0. Setup (once per session)
```
bash ../setup.sh | tail -12
python3 tools/assets3d.py sync      # Drive _assets3d → assets3d_src/ (≈ 1.9 GB, unzipped); names: jobs/stock/ASSETS3D.md
# after writing the story:
python3 tools/assets3d.py story stories/<slug>.story   # builds only the HDRIs/people/props/materials the story names
```

## 1. Story and research (15–20 min)
Read `jobs/research/<slug>.md` AND the kit `jobs/kits/<slug>.md` (Muse, owner 14 Nov 2026): build every shot from the kit's
library ids (sync with `python3 tools/assets3d.py sync`); a ❌ row → reframe that shot, never fake it.
**Use the whole shared library, not only the kit** (owner, 14 Nov 2026: everything fetched is reused by every episode): for every shot
`python3 tools/assets3d.py search <words>` (models, people, clips, HDRIs, materials, real_* sounds, music) and put every fitting real
asset to work — set dressing, props, ambience, action sounds.
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

## 2b. Music bed — calm, never ticking (owner, 13 Nov 2026: "a click every 2 seconds — never again")
Name the track in the header (`score: <track_id>@1`). Only pads/strings/ambience under the voice: no clock ticks, heartbeats,
hi-hats or plucks on a grid. The gate runs `tools/music_ticks.py` on the placed bed and fails a ticking one. Tick-free beds now:
wonder_silver_blue_light (wonder) · momentum_hyperfun (momentum) · momentum_exhilarate (momentum) · epic_toccata_fugue_d_minor (epic) · travelers_notebook (curious) · journey_of_hope (warm) · romantic_inspiration (warm) · bavarian_seascape (warm) · the_lagoon (curious) · the_crown (curious) · the_britons (curious) · la_citadelle (curious) · space_ambience (curious) · shining_stars (curious) · infinite_wonder (curious) · relaxing_ballad (warm) · aquarium (curious) · pond (curious) · folk_round (curious) · samba_isobel (warm) · the_house_of_leaves (curious) · gregorian_chant (curious) · wonder_almost_bliss (wonder) · momentum_aggressor (momentum) · momentum_balzan_groove (momentum) · epic_all_this (epic) · comedy_android_sock_hop (comedy) · wonder_airship_serenity (wonder) · wonder_amazing_grace_2011 (wonder) · momentum_bet_you_can (momentum) · wonder_dreams_become_real (wonder) · tension_night_of_chaos (tension) · comedy_funky_chunk (comedy) · comedy_winner_winner (comedy) · warm_shades_of_spring (warm) · warm_night_in_venice (warm) · tech_crypto (tech) · curious_covert_affair (curious) · curious_quirky_dog (curious) · wonder_dreamer (wonder) · wonder_floating_cities (wonder) · wonder_moonlight_hall (wonder) · momentum_bicycle (momentum) · momentum_breaktime (momentum) · momentum_upbeat_forever (momentum) · momentum_windswept (momentum) · momentum_river_valley_breakdown (momentum) · tension_deliberate_thought (tension) · tension_comfortable_mystery (tension) · tension_babylon (tension) · comedy_tango_de_manzana (comedy) · warm_bittersweet (warm) · warm_cattails (warm) · warm_leaving_home (warm) · warm_serene (warm) · warm_village_consort (warm) · tech_daybreak (tech) · epic_the_descent (epic)

## 2c. Sound — recorded, matched to the picture (owner, 13 Nov 2026: "crying when crying, laughing when laughing — not hisses and ticks")
A `clip: yes` story plays ONLY recorded sounds and ONLY what is on screen (tools/sound_design.py clip mode): no automatic whooshes,
pops, risers, ticks or synthesis. Three sources, all named in the `real_*` vocabulary:
1. **Bed per shot**: `amb=real_<place>` on every beat (underwater, ship_interior, air_pocket, room_night, street_day, forest_night,
   hospital, crowd_hall, rain_window …); runs of the same bed are continuous, cuts crossfade.
2. **Action sounds of the people**: every animation clip an actor plays emits its sound when it starts (`L.CLIP_SFX` in
   engine/library/l3_shot.js: Crying → real_cry, Laughing → real_laugh, Falling_Down → real_body_fall, Walking → real_footsteps,
   Swimming → real_water_swim, Scared → real_gasp …). Acts in `act=l3` get this for free; bespoke acts declare theirs (`sfx: [[t, 'real_x']]`).
3. **Events in the shot**: the act's own `sfx` list or `sfx="t:real_x:gain"` on the beat (a door slams, a torch clicks, a hull hits sand).
Files: `studio/sfx_ifm/real_<what>_<n>.wav` (Muse) → registered as `ifm_real_<what>`. A missing word plays its closest recorded
stand-in (REAL_FALLBACK in sound_design.py) or nothing — silence beats a wrong sound; the gate lists what is missing.

## 3. Gate (one command) — measure first, render once (owner, 12 Nov 2026: "fast and right, no render after render")
```
node tools/clip_gate.mjs stories/<slug>.story     # comment guard + script rules + REAL voice/mix (length, unknown/ticking/missing sounds) + 3D cost + sheet
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
