# Muse — the standard Saturday run (owner, 12 Nov 2026). Every Saturday 09:20 Vietnam time (the existing weekly cron).

The channel (ODDLY TRUE) makes animated TRUE stories of 1:30–2:00 (owner, 12 Nov 2026), realistic 3D.

**Order of the run (owner, 13 Nov 2026):** B (story list for the owner to choose) → A (asset scan: for the strongest candidates,
find REAL models for every person, object and place each story needs, plus anything the "Wanted" list asks) → C after he picks.
Asset scan = search the real-model sources (Poly Haven, Smithsonian 3D Open Access, Sketchfab CC0/CC-BY, Fab free with
commercial use), download, convert to `.glb` with embedded textures (Blender: import glTF/FBX → export GLB), check the
realism bar (a 1080×1920 close-up must read as a real object, never low-poly/stylised/toy), upload and index. For each story
in the list, write in one line which of its key objects are found real, which are missing.
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
- asset needs: people (which of the 16 fit), set (HDRI + materials), props, clips — mark what the library lacks
- risks: real victims (tone), still-living people, contested facts
Then send the owner ONE Vietnamese message: a numbered list, one line each (`<số>. <tên tiếng Việt> — <câu móc dịch ngắn>`
— `mô hình thật: đủ / thiếu <x>`), and wait.

## C. After the owner picks ("chốt 2, 5, 9 …")
For each pick, same day:
1. `jobs/research/<slug>.md` from `jobs/research/_TEMPLATE_CLIP.md` (facts with 2 sources each, timeline, exact quotes
   with source, key numbers, visual notes, asset needs mapped to library names, sensitivity notes, 3 titles, hook line).
2. A row in `jobs/STATUS.md` (slug, tên (VI), RESEARCH_READY) and the post order in `jobs/SCHEDULE.md` (one clip a day).
3. Any missing assets for the picks → part A now (and "Wanted" if not found).
4. Commit `[muse] week <monday>: <n> stories + assets`, push, INBOX line `muse → claude · [week] <n> stories ready`,
   one Vietnamese line to the owner.
