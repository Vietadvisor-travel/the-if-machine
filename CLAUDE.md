# FATHOM — Claude Code makes the films (this repo, since 15 Nov 2026)
The channel is **FATHOM** — *How we came to know the world.* (spec `brief/FATHOM.md`, locked). Outside `howweknow/`, `jobs/`, `brief/FATHOM.md`
is legacy (`studio/` = voice, Drive tools, music library). Full history of the rules: `brief/CLAUDE_HISTORY_2026-11-18.md` (do not read unless needed).

## Every chat (token-lean) — ONE FILM PER CHAT (owner 18 Nov 2026)
Read this file + `tail -5 jobs/INBOX.md`. For a film: `howweknow/RUNBOOK.md` and only what it names. Setup once per container:
`bash setup.sh && bash howweknow/tools/setup.sh`. Render farm: attach `vietadvisor-travel/frame-batch` (add_repo, push), clone to
`/home/user/frame-batch` (without it `make.sh` renders locally; `FARM=0` forces local).

## What the owner says → what you do
- **"làm tập <tên>"** → the film end to end, `howweknow/RUNBOOK.md` (slug from its Vietnamese name in `jobs/STATUS.md`).
- **"đề tài mới"** → 15 topics (pool 1) in `jobs/topics/FATHOM_<date>.md` + short Vietnamese list. **He picks** → research pack (2 sources for
  heavy claims) → lines.py → Muse order `jobs/orders/<slug>.md` (≤ 15 rows, `jobs/tasks/MUSE_FATHOM.md` §0) → STATUS + INBOX.
- **"đăng tập <tên>"** is for Muse, not you.

## The channel (locked)
- Content: pool 1 — how humans came to know/measure something that seemed impossible; one big question, 3–4 clues, a twist, the answer, what it
  means today; one continuous story; English, 16:9, 9–12 min (owner 19 Nov 2026); narrated science-channel opening (not a bang).
- Picture (engine 10): 2D, the CLEAN DRAWN house style — cream paper, sepia ink outlines, house pigments, house type; NO engraving pass, PD
  engravings optional. Every film draws its own world in `src/lib/<slug>/` (variety.py). The picture transforms with the narration — never
  plain cuts. Text lives in the scene (no subtitles); faces: titles/stamps IM Fell English SC · captions IM Fell DW Pica italic · hand La Belle
  Aurore · figures Special Elite · brand IM Fell French Canon SC. Real stock = artefacts inside scenes, credited.
- Living things on `src/paint/anatomy.tsx` (Skin, fk/stride/wave, HumanHand, SmallMammal), proportions from a real reference.

## The quality bar (owner 17–18 Nov 2026 — every point is a hard rule)
- **Ideas & motion:** the chain (40–70 links, ten ★ inventions) with an ACTION per line written BEFORE drawing; something happens ≤ every 2.5 s
  (`event_check`); one named camera move per line (≤ 12 % each, never 3 running); no transition `how` > 3 times; nothing the last two films
  leaned on (`novelty`). A scene is never "a picture + a label + the camera drifts".
- **Clear & popular:** EVERY picture passes the NAME-IT test (a stranger names it at a glance, no labels); words for a curious 14-year-old,
  every technical word with an everyday image (`script_check` JARGON/GLOSS).
- **Right first time:** chain → drawings checked on the LibSheet → 6 keyframes → fresh `fathom-critic` agent ≥ 8 on every axis (clarity,
  popular included) → only then the full world → animatic → fresh critic ≥ 8 → ONE full render (`critic_gate`; the owner's explicit OK overrides).
  The maker never scores his own film. Quality is never traded for time; estimate honestly at the start.
- **Engine 11 — the world transforms (owner 19 Nov 2026: sun-fire 6/10, drifting-continents 8.5 is the bar):** every scene is a PLACE, never
  an object on a plain wall; the picture's "after" is a different world from its "before" (things move, split, join, melt, turn into the
  next) — never arrows/tapes/numbers/labels added to a still picture; one canvas per act; chains in the `PLACE :: WORLD → next` form
  (`chain_check`; old chains are rewritten); the critic compares with the reference pair sheets (`_hwk_core/reference/`, `sheet.py --pairs`)
  and must score `wow` ≥ 8.5 and `vs_reference` better|equal (`critic_gate`). CINEMA §0b.
- **Sound:** voice af_heart (Kokoro) 0.86, plain read; music ONLY from `score.py` MYSTERY_OK (dark/ambient; never busy or cheerful), one cue per
  part (≥ 60 s), −20…−23 dB; sound effects on the ACTIONS (`SF(line, frac, file, trim)`), 3–10/min, ≥ 1.2 s apart, AS LOUD AS THE MUSIC (mix.py
  levels them; trim −6…+3); −16 LUFS; `sound_check`. Sound-only fixes = remix + remux + fit, never a re-render.
- Render: never change engine code while a render runs; any speed-up must leave the picture identical. Masters fitted to ≈ 545 MB (`fit.py`).

## Quality first & the ratchet (owner 19 Nov 2026)
- For information only: the owner and Muse publish 4 films a week (Tue · Thu · Sat · Sun; YouTube + Facebook + TikTok). Claude follows no
  schedule — it makes a film when the owner says so, takes the time the quality needs and NEVER delivers early: the engine's job is a film that
  is absolutely right. Strict scoring, as before 19 Nov: every critic axis ≥ 8, `wow` ≥ 8.5, `vs_reference` better|equal; as many fix rounds as it takes.
- THE RATCHET: quality only goes UP from chat to chat. The reference for the critic (`_hwk_core/reference/`) is the best film the owner has
  rated; when he rates a new film higher than it, that film's pair sheets become the new reference (`sheet.py --pairs`, upload to Drive
  `_hwk_core/reference/`, update CINEMA §0b + `jobs/critic/_PROMPT.md`). Owner ratings so far: drifting-continents 8.5 (the bar) · sun-fire v1 6.

## Roles & standing rules
- Claude: everything creative and technical. Muse: sourcing only (Drive `_hwk/<slug>/` + manifest + licences; INBOX `KIT_READY`) + publishing.
  Two Claude accounts may work in parallel — `jobs/PARALLEL.md`. Owner:
  picks topics, says "làm tập …", approves films.
- Every message to the owner in Vietnamese, short, episodes by their Vietnamese name. Talk only at the start and the final report unless
  blocked by something only he can fix. Times in Vietnam time. Every background job gets a `send_later` watchdog; wait on a PID.
- Facts from the research pack with sources; heavy claims 2 sources; no invented numbers. No AI images of real people, no fake documents.
- Thumbnail designed per film (`src/kit/ThumbPoster.tsx`); deliver master + thumb + cover + .srt to Drive `fathom/<slug>/` via `make.sh --ship`.
- Git: branch `main` only; commits start with `[claude]` and end with the session's attribution lines; never commit secrets, media, `out/`, `public/`, `node_modules/`.
