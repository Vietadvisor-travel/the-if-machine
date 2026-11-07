# Muse — make an episode yourself (owner, 7 Nov 2026: "can Muse make the episodes? it has a computer that renders")

From now on, when the owner tells **Muse** "làm tập <tên>", **Muse makes the episode end to end** on its own machine.
(When he tells Claude, Claude makes it, as before.) This overrides PROTOCOL §8 "Claude makes the episode" for episodes the
owner gives to Muse. First run = a trial: Claude reviews the result before the owner judges it.

## Read first (in this order, nothing else unless a question needs it)
1. `CLAUDE.md` — the rules: content first, IF CREW v3 look, comic layer, voices, gates, facts and sources. They apply to Muse too.
2. `studio/EPISODE.md` — the whole workflow on one page (§0 sections first: STYLE DECISION, IF CREW, THE WORLD, COMIC, CONTENT FIRST).
3. `studio/API.md` when writing story code; the research pack `jobs/research/<slug>.md`; `brief/BRAND.md` §2 (tone).

## Steps (the same as CLAUDE.md "Producing an episode", with Muse's names)
1. `git pull`; `bash setup.sh` must end ALL OK. Stock: if Drive keys are missing, download the newest `_music/`, `_sfx/`,
   `_assets/` zips with your own Drive access into the paths `tools/stock_sync.sh` uses, or go on with the stock already there.
2. STATUS → IN_PRODUCTION; INBOX line `muse → owner · [<slug>] started`.
3. Director's script first: `jobs/scripts/<slug>.md` from the template; `node studio/tools/script_check.mjs jobs/scripts/<slug>.md` → PASS.
   It must pass the 7 CONTENT FIRST rules (EPISODE.md). Plan 2–3 NEW gags drawn in `studio/engine/library/cast.js` (same v3 language).
4. `cd studio && node tools/new_episode.mjs <slug> "<tên>"`, build the story shot by shot (`act=crew`, world scenes in the v3
   language, `ex_cold` hook, `ex_outro` ending, GL transitions picked by meaning, `score:` per section).
5. Look at your own frames: `node tools/still.mjs stories/<slug>.story v "<times>" 1920` and `node tools/sheet.mjs stories/<slug>.story v 3`.
   Fix anything overlapping, cut off, unreadable or off-subject before rendering.
6. Gates: `node tools/gate.mjs stories/<slug>.story` (lint + variety 6–10 min + review ≥ 85 + render cost) and
   `python3 tools/qa.py stories/<slug>.story --every 1 --scale .2 --lean`. Fix until they pass.
7. Render: `node tools/make.mjs stories/<slug>.story --fmt 9x16 --speed 1.0 --fps 25`; cover still; English .srt.
8. Deliver: `bash tools/ship.sh <slug>` (or upload the CRF-17 master, cover and .srt to Drive `TheIfMachine_Media/<slug>/` yourself);
   `jobs/deliveries/<slug>.md` from the template; STATUS → DELIVERED; `node tools/variety.mjs stories/<slug>.story --record`;
   `node tools/bank.mjs catalog`. Commit `[muse] [<slug>] …` and push `main`. Never commit video, zip, `out/`, `node_modules/`.
9. INBOX line `muse → claude · [<slug>] TRIAL DELIVERED, please review` + report to the owner in Vietnamese (≤ 10 lines):
   Drive link, length, gate scores, what is uncertain. Do not post until he says "đăng tập …".

## Rules that matter most
- Facts only from the research pack with sources; no invented numbers; no AI images of real people, logos or fake documents.
- Voices: af_heart narrates; af_nicole / am_santa only as cast in CLAUDE.md. Kitten is banned.
- Never use the old footage engine (`pp_*`). If the canvas engine cannot run, say so and stop.
- Stuck on something only the owner can fix (keys, credentials): say exactly what is missing and stop.
