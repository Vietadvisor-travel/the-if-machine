# The If Machine — Claude Code makes the videos

Read first, every session: `PROTOCOL.md` (how Muse and Claude work together), then `brief/THE_IF_MACHINE_BRIEF.md`
(the channel; the single source of truth unless the owner says otherwise), then the bottom of `jobs/INBOX.md`.

## Current phase: ENGINE (from 3 Nov 2026)
The owner is finishing and adjusting the engine. Do not produce an episode until he says so (`làm tập <slug>`).
Engine work = changes the owner asks for in `studio/`, each tested on an existing story and logged in
`studio/CHANGELOG.md`.

## The engine
- `studio/` is the Vietadvisor Motion Studio **v11 canvas cartoon engine** (imported 3 Nov 2026 from the Cowork session,
  see `studio/MANIFEST.md`). Its own rulebook is `studio/SKILL.md` + `studio/references/`. Follow it for every episode.
- Never use the Poison Pill footage engine (repo vietadvisor-videos, `pp_*`). If the canvas engine cannot run, say so and stop.
- Setup once per session: `bash setup.sh` (npm install, Kokoro voice, Chromium check, Drive check).
- Run: `cd studio && node tools/make.mjs stories/<name>.story` (16:9 and 9:16).
- Quality gates (brief §3): `node tools/lint.mjs` clean, `node tools/review.mjs` ≥ 85, `python3 tools/qa.py` per-second
  QA at least 2 rounds, frames checked in both formats. Never compress below 30 MB.

## Producing an episode (only when the owner says `làm tập <slug>`)
1. `git pull --rebase`; `bash setup.sh`. Read `jobs/research/<slug>.md`. Missing → stop and give the owner the line for
   Muse: `nghiên cứu nhẹ: <slug>`. No slug → the highest-scoring topic in `jobs/topics/BANK.md` not yet delivered.
2. STATUS → IN_PRODUCTION; INBOX line.
3. Write the story per `studio/SKILL.md` and brief §2: long 16:9 5–6 min; vertical 9:16 60–90 s cut from it with its own
   hook and captions; hook in the first 3 s; one question, one twist answer; branded end frame; the main picture of each
   beat draws the SUBJECT of its line; talking head ≤ 35 % of beats, never two in a row; small fixed captions low.
4. Facts: every actionable claim from the research pack with its source; heavy claims need 2 sources; no invented
   numbers. No AI images of real people, real documents, logos, or fake headlines; animation illustrates, never poses as a record.
5. Voices: only `brief/VOICE_MODELS.md` (Kokoro, Chatterbox Turbo, Supertonic 3). Kitten is banned. Supertonic 3 →
   the delivery note says the audio is machine-generated (OpenRAIL-M).
6. Gates (above), then render both formats, cover still, English .srt.
7. Deliver (PROTOCOL §5): `python3 studio/tools/pp_drive.py put <files> --to <slug>`; write `jobs/deliveries/<slug>.md`;
   STATUS → DELIVERED; INBOX line; commit and push `main`. Never commit video or zip files.
8. Report to the owner: what was delivered, Drive links, gate scores, what is uncertain.

Run each episode end to end without stopping; talk to the owner only at the start and in the final report; stop early
only for hard blockers he alone can fix (missing research pack, Drive keys, credentials), saying exactly what is missing.

## Git
- Branch `main` only (PROTOCOL §1). Commits start with `[claude]`. End commit messages with the session's attribution lines.
- Never commit secrets, videos, zips, `node_modules/`, `out/`.
