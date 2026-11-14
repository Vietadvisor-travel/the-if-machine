# Muse — the standard Saturday run (owner, 12 Nov 2026). Every Saturday 09:20 Vietnam time (the existing weekly cron).

The channel (ODDLY TRUE) makes animated TRUE stories of 1:30–2:00 (owner, 12 Nov 2026), realistic 3D.

**Order of the run (owner, 13 Nov 2026):** B (story list for the owner to choose) → A (asset scan: for the strongest candidates,
find REAL models for every person, object and place each story needs, plus anything the "Wanted" list asks) → C after he picks.
Asset scan = search the real-model sources (Poly Haven, Smithsonian 3D Open Access, Sketchfab CC0/CC-BY, Fab free with
commercial use), download, convert to `.glb` with embedded textures (Blender: import glTF/FBX → export GLB), check the
realism bar (a 1080×1920 close-up must read as a real object, never low-poly/stylised/toy), upload and index. For each story
in the list, write in one line which of its key objects are found real, which are missing.
**The scan builds the SHARED library, not one episode's kit (owner, 13 Nov 2026):** every model goes into the common store, tagged by
category (people · clothing/gear · vehicles · ships & boats · aircraft · buildings & interiors (home, ship, hospital, office, factory,
mine, cave) · furniture · everyday objects · tools · food · animals · nature & terrain · weapons/historic objects · medical · water/ocean),
so any future story can reuse it. Each Saturday: first what the candidates need, then widen the categories that are thinnest (aim for
real coverage of the 4 pillars: survival, history under your feet, strange events, the body). Index fields: id, category, tags,
real scale (m), licence, author, source URL, credit line. Keep `jobs/stock/ASSETS3D.md` as the browsable catalogue by category.
Claude produces the clips (`studio/CLIP.md`, writing standard `studio/STORY.md`). Muse keeps the asset library growing and
brings the stories. Muse does NOT post, rename, redesign or edit channel pages unless the owner asks in his own words.
Every message to the owner is Vietnamese. Commits start with `[muse]`. Push to `main`.

## A. Asset top-up (≈ 1–2 h)
1. Read `jobs/stock/ASSETS3D.md` → section **"Wanted"** (Claude appends what a clip needed and the library lacked). Those
   come first. Then add what next week's picked stories will need (their research packs, "Asset needs").
2. House formats (do not change them — the engine depends on them):
   - **People:** MPFB/MakeHuman CC0 packs, the SAME "mixamo" rig as the 16 existing people (52 joints, `mixamorig:*` names),
     metres, Y-up, `.glb`, textures embedded, ≤ 40 MB. File name `<region>-<role>[-<age>]` like the existing ones.
   - **Animation clips:** Mixamo "Without Skin", 30 fps, added to the shared library on the same skeleton (clean action
     names, e.g. `Treading_Water`), plus the clip list JSON with durations. Never a second skeleton.
   - **HDRI:** Poly Haven, `.hdr` 1k + 2k, Poly Haven slug as the name.
   - **Materials:** Poly Haven / ambientCG, 2k JPG: Color, NormalGL, Roughness, AO (+ Displacement, Metalness if any).
   - **Props / sets:** glTF/glb ≤ 30 MB, real scale in metres, origin at the base centre, +Z forward. CC0 or CC-BY (author,
     licence and URL in the index; credit goes in the description); anything else only with an explicit commercial-use licence.
   - **Realism bar (owner, 13 Nov 2026):** real, detailed models only (scans / hero-quality PBR), never low-poly, stylised or toy-like;
     check each with a 1080×1920 close-up render before uploading. `jobs/stock/ASSETS3D.md` "Realism bar".
3. Upload only the NEW files, as a dated zip: `TheIfMachine_Media/_assets3d/<group>/<group>_<YYYY-MM-DD>.zip`
   (never re-upload a whole pack). Append the new entries to `jobs/stock/assets3d_index.json` (same fields) and add rows
   + one changelog line to `jobs/stock/ASSETS3D.md`. Move fulfilled "Wanted" items to "Done".

Note (14 Nov 2026): the first pack's Poly Haven models are glTF folders (.gltf + .bin + textures) the engine cannot load; Claude
converted 12 to .glb (`_assets3d/models/models_glb_2026-11-14.zip`). Convert the other Poly Haven models the same way (Blender:
import glTF → export GLB, textures embedded) and upload them as a dated zip — every model in the store must be a .glb.

## A2. Real sound library (owner, 13 Nov 2026: "sounds that match the scene — crying when crying, laughing when laughing")
The clips play ONLY recorded sounds named `real_<what>` (studio/CLIP.md §2c). Each Saturday: first the words `clip_gate` listed as
"missing real" (see the latest delivery notes / jobs/stock/SFX_WANTED.md), then widen the shared library by category.
- Sources: Freesound **CC0 only**, Sonniss GDC bundles (royalty-free, commercial use), Pixabay Sound Effects (Pixabay licence),
  BBC Sound Effects only if the licence allows commercial video (it usually does not: skip). Real recordings only, no synth.
- Files: `real_<what>_<n>.wav` (2–4 takes each, `<what>` = snake_case word from the vocabulary), 48 kHz/24-bit or 44.1/16 WAV,
  trimmed, peak −1 dBFS, no music, no voices with words. Beds (`real_<place>` ambiences): 45–90 s, seamless, no events in them.
  Zip as `TheIfMachine_Media/_sfx/real_sfx_<YYYY-MM-DD>.zip`; credits per file in `jobs/music/SFX_CREDITS.md`.
- Categories to cover over the weeks: people (cry, sob, laugh, giggle, gasp, scream, sigh, breath, breath_heavy, whisper, cough,
  cheer, crowd) · body (body_fall, footsteps on concrete/wood/gravel/snow/metal, run, jump_land, cloth, punch) · water (underwater bed,
  bubbles, splash, swim, lap, drip, water_rush, rain, waves, diver_breath regulator) · places (ship_interior, engine_room, room_night,
  street_day, forest_night, hospital, office, crowd_hall, cave, desert_wind, snow_wind) · objects (door_metal, door_wood, torch_click,
  glass_break, metal_groan, ship_creak, hull_impact, chain, rope, phone_vibrate, paper) · vehicles (car, truck, train, plane, boat,
  helicopter) · animals (dog, cat, bird, horse, cow, insects, whale) · weather (thunder, wind, storm).

## B. Story shortlist (≈ 1–2 h) → `jobs/topics/WEEK_<monday>.md`
About 15 TRUE micro-stories, each scored with `studio/STORY.md` §1 (produce only ≥ 8/10), mixed across the 4 pillars
(≈ 4 survival with an ingenious trick · 4 history under your feet / how it was done before technology · 4 strange-but-true
events · 3 your body in one concrete situation). Never one already in `jobs/STATUS.md` or `jobs/research/`.
Per candidate:
- working title (EN) + **tên tiếng Việt** · pillar · score /10 with one line per criterion that is weak
- the **opening line** (the story itself, plainly: who, what happened, the unbelievable number — studio/STORY.md §2) and **the turn**
- the **human thread** (someone he/she loves, a promise, a habit — sourced) and **the true irony or meaning** for the ending (§3b)
- 2 independent sources (outlet, title, date, URL) — news archive, museum, journal, official record; Reddit/TIL/YouTube
  only as a lead, never as a source
- asset needs: people (which of the 16 fit), set (HDRI + materials), props, clips, mark what the library lacks. Sound needs: which real_* words the story needs, mark what the library lacks (see jobs/stock/SFX_WANTED.md)
- risks: real victims (tone), still-living people, contested facts
Then send the owner ONE Vietnamese message: a numbered list, one line each (`<số>. <tên tiếng Việt> - <câu móc dịch ngắn> - mô hình/tiếng thật: đủ / thiếu <x>`), and wait.

## Realism gate for every kit (owner, 14 Nov 2026: "each episode needs ALL its resources, real, lively, quality")
- A model Muse builds itself (procedural Blender, `local_*`) is NOT real: such a row is ❌, never ✅ (the 14 Nov kits marked ✅ on
  self-built tugboat/helmet/Cessna/raft etc. read as toys in a close-up render — `studio/out/muse_models_2026-11-14.jpg`).
- ✅ only with proof: a 1080×1920 close-up render of the model in the library, saved to Drive `_kits/<slug>/<id>.jpg` and linked in the row.
- Real sources need logins: use the owner's **Sketchfab** account (API token: CC0 / CC-BY downloads, author + URL in the index) and
  **Freesound** account (API key: CC0 sounds); Sonniss GDC bundles need no login. Without them, say so in the kit — do not fall back
  to building models or to Commons sounds marked as done.
- KIT_READY only when every row is ✅ with proof; otherwise `KIT_PARTIAL` + the missing list in one line to the owner.

## C. After the owner picks ("chốt 2, 5, 9 …") — a FULL KIT per pick, so Claude only has to be told "làm tập …" (owner, 14 Nov 2026)
For each pick, starting the same day, in this order:
1. **Research** `jobs/research/<slug>.md` from `jobs/research/_TEMPLATE_CLIP.md`: facts with 2 sources each, timeline, exact quotes,
   key numbers, the human thread, the true irony/meaning for the ending, visual notes, sensitivity, 3 titles, the opening line.
2. **Kit list** `jobs/kits/<slug>.md` from `jobs/kits/_TEMPLATE.md`: walk the story from first to last moment and list EVERYTHING the
   viewer will see or hear — each person (age, origin, clothes), each object, each place/interior/exterior (era, weather, light),
   each vehicle/animal; each place's background sound, each action's sound (people: cry, laugh, gasp, footsteps on what surface…;
   objects: doors, engines, water…), and the animation clips the people need.
3. **Library first (owner, 14 Nov 2026: what was fetched is reused by every episode):** for each kit row run
   `python3 studio/tools/assets3d.py search <words>` and reuse what the shared library already has; fetch only what is missing.
   **Fetch the rest, real only**: models (realism bar, ASSETS3D.md), people (house rig), animation clips (house skeleton), HDRIs and
   materials for every place, recorded sounds `real_<what>` (A2). Convert, check, upload to the shared library (part A/A2 formats),
   index by category. Fill each kit row with the library id and ✅, or ❌ + why + the closest stand-in when a real one truly does not exist.
4. **Done when every row is ✅** (or ❌ explained): set the research column of `jobs/STATUS.md` to `KIT_READY` (slug, tên (VI)), add
   the post order in `jobs/SCHEDULE.md`, commit `[muse] kit <slug>`, push, INBOX `muse → claude · [kit] <slug> ready`, and one
   Vietnamese line to the owner: "Tập <tên> đã đủ tài nguyên — anh bảo Claude: làm tập <tên>".
