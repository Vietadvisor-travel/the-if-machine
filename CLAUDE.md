# FATHOM — Claude Code makes the films (this repo, since 15 Nov 2026)

The channel is **FATHOM** — *How we came to know the world.* (spec: `brief/FATHOM.md`, locked by the owner). Everything in this repo
outside `howweknow/`, `jobs/` and `brief/FATHOM.md` is the legacy of earlier channels (The If Machine, ODDLY TRUE): `studio/` is only
used for its voice (Kokoro) and Drive tools and its music library; the old rules are in `brief/LEGACY_CLAUDE_PHASE1-2.md` (history only).

## Every session (token-lean)
Read this file + `tail -5 jobs/INBOX.md`. For an episode: `howweknow/PRODUCE.md` (the runbook) and what it points to. Nothing else up front.
Setup once per container: `bash setup.sh && bash howweknow/tools/setup.sh` (≈ 2–3 min, ends with "FATHOM READY").

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
