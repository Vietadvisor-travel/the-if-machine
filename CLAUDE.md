# FATHOM — Claude Code makes the films (this repo, since 15 Nov 2026)

The channel is **FATHOM** — *How we came to know the world.* (spec: `brief/FATHOM.md`, locked by the owner). Everything in this repo
outside `howweknow/`, `jobs/` and `brief/FATHOM.md` is the legacy of earlier channels (The If Machine, ODDLY TRUE): `studio/` is only
used for its voice (Kokoro) and Drive tools and its music library; the old rules are in `brief/LEGACY_CLAUDE_PHASE1-2.md` (history only).

## Every session (token-lean)
Read this file + `tail -5 jobs/INBOX.md`. For an episode: `howweknow/PRODUCE.md` (the runbook) and what it points to. Nothing else up front.
Setup once per container: `bash setup.sh && bash howweknow/tools/setup.sh` (≈ 2–3 min, ends with "FATHOM READY").
Render farm once per session (free parallel render, `PRODUCE.md` "Render farm"): attach `vietadvisor-travel/frame-batch` with add_repo (push)
and clone it to `/home/user/frame-batch`; without it `make.sh` silently renders locally as before (`FARM=0` forces local).

## What the owner says → what you do
- **"làm tập <tên>"** → make that film end to end: `howweknow/PRODUCE.md`. Find the slug by its Vietnamese name in `jobs/STATUS.md`.
- **"đề tài mới" / asks for topics** → propose 15 (pool 1 only, below) in `jobs/topics/FATHOM_<date>.md` + a short Vietnamese list; he picks.
- **He picks topics** → for each: research pack `jobs/research/<slug>.md` (2 sources for heavy claims) → script + frame-level shot plan
  (`howweknow/episodes/<slug>/lines.py` → `tools/plan_md.py`, standard `howweknow/STORY.md`) → resource order for Muse `jobs/orders/<slug>.md`
  (contract `jobs/tasks/MUSE_FATHOM.md` §0: LEAN — ≤ 15 rows, only the real stock the script stages + key drawing references; no
  music/sfx/data — Claude uses the library and the research) → STATUS rows + INBOX line. (Done 15–16 Nov for: earth-age, inside-earth, star-distance, longitude, empty-atom.)
- **"đăng tập <tên>"** is for Muse (publishing), not for you.

## The channel (locked — brief/FATHOM.md)
- **Content:** pool 1 only — how humans came to know / measure / discover something that seemed impossible to know. One big real question,
  3–4 clues, a twist, the answer, what it means today; ONE continuous story. English, 16:9, 8–12 min.
- **Picture:** 2D only, the signature hand-coloured-engraving style (`howweknow/STYLE.md`), Remotion engine v3 (`howweknow/ENGINE.md`).
  The picture transforms continuously with the narration (window / ride / scale jump / morph / real reveal) — never plain cuts.
- **Every film draws its own world:** people (costume + face), objects, places are drawn NEW for each film in `howweknow/src/lib/<slug>/`
  from its content and Muse's reference images; the library is samples + an archive, never a kit (`tools/variety.py` enforces it).
- **Variety:** effects chosen by meaning from `howweknow/FX.md`; no repeated scenes inside a film or across films (`history.json`).
- **Text on screen:** NO subtitles. Words live in the scene (`text` entity: title, plate, note, label, figure, stamp). Faces (owner 17 Nov 2026):
  titles/stamps IM Fell English SC · captions/labels IM Fell DW Pica italic · hand La Belle Aurore · figures Special Elite · brand IM Fell French Canon SC.
- **Real resources** (Muse) are artefacts inside scenes (pinned plates, circled documents, footage in an eyepiece/screen/film strip), never backgrounds.
- **Sound:** voice af_heart (Kokoro) 0.86; music quiet (owner 17 Nov: 30 % lower, then 30 % lower again — `score.py` LEVEL), leaning MYSTERIOUS, changing only where the story's
  part changes (one cue per chapter, `tools/score.py`), each part at its own level; few fitting sound effects; −16 LUFS.
- **Opening:** narrated, leading the viewer in like a science channel — not a bang (`STORY.md` §1 "Narrated opening").

## Engine v5 — LOCKED by the owner 17 Nov 2026 ("ok đẹp đó… chốt đi")
- **Ideas first** (`howweknow/CREATIVE.md`): one governing image per film; THREE stagings written for every line before one is chosen;
  the engine grows to fit the idea (new primitive + FX.md row + a clip in `episodes/fx-reel`), never the reverse.
- **v5 shot plan** (`STORY.md` §7, `standard=5`): reads · focus · becomes {from, to, how} · acts (something happens ≤ every 2.5 s) · mood.
  Gates: `plan_check.py`, `still_check.py` (no dead stretch), plus the old three. Drawings: `STYLE.md` "True to life".
- **Sound:** narration read plain (no stress drawl); the score is planned by measurement (`tools/score.py`) and follows the story's moods.
- **Render — safety is Claude's call, quality is untouchable:** animatic first (`make.sh <slug> --preview`, ≈ 25 min) → critic pass →
  ONE full render (`tools/render.py`: chunked, resumable, stall watchdog). Never change engine code while a render runs. Any speed
  optimisation must leave the picture identical (compare stills before/after) or it is not made. Report times in Vietnam time.

## Engine v6 (owner 17 Nov 2026: "nâng toàn diện… đạt đỉnh cao thật sự") — every new film
- `E['engine'] = 6` + `standard=6`: the engraving pass, grade per act, grain/weave, depth of field, shake (`src/engine/Look.tsx`); light &
  depth entities lamp · shaft · motes · shadow · haze · sheen (`Light6.tsx`); faces with expressions and close-up detail; every line has
  a `shot` size and a named `light` (STORY §8, gate `plan_check.py`); helpers `tools/v6.py`. ENGINE.md "ENGINE v6", FX.md §I.
- KEYFRAMES FIRST (`tools/keyframes.py`): opening, governing image, answer at final quality, each ≥ 8/10 on drawing · light · composition
  · style (CREATIVE §4b) before the rest is drawn to match. Demo of the look: `episodes/v6-demo/build.py`.

## Cinema v7 (owner 17 Nov 2026: "điện ảnh… toàn diện, quan trọng là ý tưởng và sáng tạo, và các skill… vẫn hợp phong cách tổng thể")
- THE HEART (owner: "quan trọng là sự sáng tạo và diễn biến biến đổi"): the film is ONE unbroken chain of 40–70 transformations, each
  meaningful, surprising, a different mechanism, ten pure inventions ★ — `jobs/scripts/<slug>_chain.md`, written FIRST (CINEMA.md §0).
- Every film is DIRECTED: the director's treatment `jobs/scripts/<slug>_treatment.md` (CINEMA.md §1: logline, feeling, governing image +
  motif, metaphor ladders, THREE SET PIECES, hero & acting beats, colour/light scripts, rhythm with held breaths, bookends, material) is
  written BEFORE lines.py — gate `tools/treatment_check.py`; lines tag `setpiece` and `motif`. Model: `jobs/scripts/empty-atom_treatment.md`.
- Skills (load them): `fathom-director` (treatment) · `fathom-cinematographer` (shots, light, acting, grade in world.py) · `fathom-engraver`
  (public-domain antique engravings via `tools/etch.py`, cut to the house sepia ink, `Etch` layers) · `fathom-critic` (keyframes, animatic, ≥ 8 on every axis).
- v7 tools: camera `dolly` through layered sets, close-up hands with grips, `Mark`, `Etch`, transition helpers (match_iris, ink_bleed,
  page_turn, scale_dive, bignum in `tools/v6.py`), `tools/sfx_auto.py` (sound on the frame). ENGINE.md "ENGINE v7", FX.md §J.
- Engravings from old books are allowed as raw material (owner: "nới… không vi phạm pháp luật"): public domain / CC0 only, recorded in
  `jobs/stock_pd/<slug>.md`, credited. ONE STYLE always (CINEMA §4b): sepia ink, house pigments as washes, cream paper, house type.

## Engine v8 (owner 17 Nov 2026: "sáng tạo ra các thứ mới… vẽ chi tiết giống hơn… hạt phim vừa phải") — every new film
- `E['engine'] = 8`: lighter, held grain/weave. NOVELTY gate `tools/novelty.py` (make.sh): no way-in / way-out on > 35 % of things, artefact frames
  ≤ 4, own drawings ≤ 4 entrances unless `motif_art`, nothing the last two films leaned on used > 60 % as much, ≥ 3 `new_devices` INVENTED per film
  (FX.md §K, e.g. v8's `burn`, `shatter`). TRUE drawings: `tools/refcheck.py` (drawing laid over its reference) for every hero object/person;
  `tools/trace.py` + `Traced` for true geometry from PD/CC0 sources; costumes take `top` (bodice/blouse over a skirt). ENGINE.md "ENGINE v8".
- File size: the engraving pass, not the grain, makes a master ≈ 1.3–1.5 GB at CRF 17 (CRF 20 ≈ 0.95 GB, CRF 22 ≈ 0.7 GB, no visible difference) — the CRF is the owner's call.

## Engine v9 — ANATOMY (owner 18 Nov 2026: "con vật, bộ phận người… sơ sài, không giống… nâng cấp khả năng vẽ") — every new film
- Animals and body parts are built on `src/paint/anatomy.tsx`: `Skin` (skinned spine, cross-contour engraving, rim light), `fk`/`stride`/`wave`
  (real bone lengths, gait, follow-through; key the creature's `tm`), `HumanHand` (Gray's proportions; every Person uses it), `SmallMammal`.
  Never glue ellipses together for a living thing; proportions from a real skeleton/plate. ENGINE.md "ENGINE v9".

## NEVER AGAIN (owner 18 Nov 2026, dinosaur-killer v1 rejected: "cảnh tĩnh… chuyển cảnh, hiệu ứng lặp lại… engine có cả đạo diễn rồi, lí do gì mày không làm… tao không muốn lặp lại trong tương lai")
- Quality is never traded for the promised time. Estimate honestly at the start; if it will run late, say so — never cut a step.
- Every film: load `fathom-director` (chain + treatment with an ACTION for every line), `fathom-cinematographer` (world.py), and a FRESH
  `fathom-critic` agent for keyframes and animatic. The maker never scores his own film.
- Hard gates (make.sh): `tools/event_check.py` — an EVENT (something in the scene happens: brought on, leaves, acts, moves in ≤ 3 s) at
  least every 2.5 s; camera drift, grain, light and slow crawls do not count; one named camera move per line (`camera_moves`), none on
  > 12 % of lines or 3 lines running; no transition `how` > 3 times. `tools/critic_gate.py` — no full render without the fresh critic's
  animatic scores ≥ 8 on every axis (jobs/critic/<slug>.json, tied to that exact animatic).
- A scene is never "a picture appears + a label + the camera drifts". Each line: who/what does what, and what it turns into.
- Right first time (owner 18 Nov 2026: "từ tập sau làm chỉn chu, tránh vẽ lại hết mất thời gian"): chain with an action + camera move per
  line BEFORE drawing; draw each hero object true to its reference and check it on the LibSheet BEFORE world.py; 6 keyframes → fresh critic
  BEFORE the full world; only then build everything. No first draft that has to be thrown away.

## Engine v10 — owner 18 Nov 2026 ("kiểu tranh khắc cổ… vẽ như bản trước là ok rồi… từ sau không cần khắc cổ nữa cho nặng và lâu… tối ưu cả token usage, chất lượng giữ nguyên")
- From the next film: `E['engine'] = 10` — NO engraving pass (Look `engrave` forced 0), no antique-engraving requirement: the clean drawn house
  style (cream paper, sepia ink outlines, house pigments, house type) is the standard. PD engravings are optional, never required; skip
  `etch.py` unless a plate is the best material. The critic's STYLE axis = "one consistent FATHOM drawing style", not "looks like an old engraving".
- Token-lean, same quality: write the chain + per-line action plan ONCE and build world.py from it in one pass (helpers `B()`/`Lf()`, the
  `move()` camera grammar — copy them from episodes/dinosaur-killer/world.py); run the gates (event_check, novelty, plan_check, check_world)
  BEFORE any render; look at stills as ONE contact sheet (24 frames, 640 px) not one by one; render only the frames you need; the fresh
  critic reads contact sheets, not single frames; never re-render a whole set to check one fix (render that frame).

## Roles
- **Claude:** everything creative — topics, research, scripts planned to the frame, every drawing, the engine, rendering, delivery.
- **Muse:** sourcing only (lean: ~1 hour per film, ≤ 15 rows), against Claude's orders (`jobs/orders/<slug>.md`): photos, documents, maps, footage, audio, music, sfx, references,
  data → Drive `_hwk/<slug>/` + manifest + licence proofs; then INBOX `KIT_READY`. Never content.
- **Owner:** picks topics, says "làm tập …", approves films.

## Standing rules
- **Every message to the owner is in Vietnamese** (short; name episodes by their Vietnamese name, never by slug).
- Facts: every claim from the research pack with its source; heavy claims need 2 sources; no invented numbers; say "about" when sources differ.
- No AI images of real people, no fake documents, no logos as heroes; drawn reenactments are explanations, real stock is credited.
- Run each film end to end without stopping; talk to the owner only at the start and in the final report; stop early only for blockers
  only he can fix (keys, credentials, Muse's kit missing), saying exactly what is missing. Every background job gets a watchdog (`send_later`);
  wait on a PID, never `pgrep -f` on a pattern your own command contains.
- Thumbnail: DESIGNED for each film on the standard poster (owner 17 Nov 2026, design F): lamp-lit engraved scene in the channel's
  pigments, the film's hero object right, its BIG QUESTION in gold Special Elite left, kicker + one handwritten line (`PRODUCE.md` "Thumbnail",
  `src/kit/ThumbPoster.tsx`); deliver master + thumb + .srt.
- Drive: masters (CRF 17) to `fathom/<slug>/` via `tools/make.sh --ship`; never squeeze below 30 MB.

## Git
- Branch `main` only (owner's standing authorization). Commits start with `[claude]` and end with the session's attribution lines.
- Never commit secrets, videos, audio, zips, `node_modules/`, `out/`, `public/` (media live on Drive).
