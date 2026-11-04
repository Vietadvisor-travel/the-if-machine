# The If Machine — Claude Code makes the videos

Token-lean reading (owner, 3 Nov 2026: as cheap as possible, same quality):
- **Every session:** this file + the last 5 lines of `jobs/INBOX.md` (`tail -5`).
- **For an episode:** `studio/EPISODE.md` (the one page), `studio/API.md` (when writing code), the research pack,
  and `brief/BRAND.md` §2 (tone).
- Everything else (`PROTOCOL.md`, the brief, `IFM_HOUSE.md`, `references/`) only when a question needs it, with grep.

## Current phase: PRODUCTION (from 3 Nov 2026, PROTOCOL §8)
The owner starts each episode in a new chat ("làm tập <tên tập>" / "làm tập tiếp") and approves each video himself.
Push to `main` (owner's standing authorization, PROTOCOL §1). The scheduled routine is off.
Engine work = changes the owner asks for in `studio/`, each tested on an existing story and logged in
`studio/CHANGELOG.md`.

## The engine
- `studio/` is the Vietadvisor Motion Studio **v11 canvas cartoon engine** (imported 3 Nov 2026), converted to The If Machine.
  For an episode: **`studio/EPISODE.md`** (the whole workflow on one page) + `studio/API.md`. Deeper rules, read only when
  needed: `studio/IFM_HOUSE.md` (house format), `studio/references/ifm-director.md` (directing craft); the legacy
  `studio/SKILL.md` and `references/` (travel-channel era) lose to them.
- Never use the Poison Pill footage engine (repo vietadvisor-videos, `pp_*`). If the canvas engine cannot run, say so and stop.
- Setup once per session: `bash setup.sh` (npm install, Kokoro voice, Chromium check, Drive check).
- Run: `cd studio && node tools/make.mjs stories/<slug>.story --fmt 9x16` (vertical only since 4 Nov 2026).
- Quality gates (brief §3): `node tools/gate.mjs <story>` = lint (9:16) + variety (length 6–10 min) + review ≥ 85 + render cost (no frame > 800 ms) in one compact report;
  per-second QA 2 rounds (round 1 automatic in the gate, round 2 `python3 tools/qa.py <story> --every 1 --scale .2 --lean`).
  Drive gets the CRF-17 masters (`tools/ship.sh`), never the chat-size `_FINAL` files: never squeeze below 30 MB.

## Talking with the owner
**Every message to the owner is in Vietnamese, always** (owner, 4 Nov 2026: never English, including short progress notes).
He speaks plain Vietnamese and names an episode by its Vietnamese name, part of it, or "tiếp". Find the slug in the
`tên (VI)` column of `jobs/STATUS.md` (PROTOCOL §6). "tiếp" = the highest-scoring episode at RESEARCH_READY. Unclear →
ask one short question, never guess. Always name episodes to him in Vietnamese, never by slug.

## Producing an episode (only when the owner says "làm tập ...")
1. `git pull --rebase`; `bash setup.sh`. Find the slug (above), read `jobs/research/<slug>.md`. Missing → research it yourself
   (`jobs/research/_TEMPLATE.md`; web search, 2 sources for heavy claims, about 10 facts), commit it as
   `[claude] [<slug>] research`, and go on. Do not stop to ask.
2. STATUS → IN_PRODUCTION; INBOX line.
3. **Director's script FIRST** (owner, 4 Nov 2026): `jobs/scripts/<slug>.md` from `jobs/scripts/_TEMPLATE.md`, every shot with
   VO / PICTURE / CUTS / CAMERA / TEXT / FX / SOUND / BUILD; `node studio/tools/script_check.mjs jobs/scripts/<slug>.md` must PASS.
   The build follows the script shot by shot. Then `node tools/new_episode.mjs <slug> "<tên>"`, then direct the story per `studio/EPISODE.md` (a frame line and a `dir=` track per
   beat; new bespoke shots and ≥ 5 new bank items in `engine/library/bank/<slug>.js`) and brief §2: ONE vertical 9:16 film, 6–10 min (≈ 1000–1700 spoken words; owner 4 Nov 2026: no 16:9, no separate short);
   small captions in the low band (74.5–79 %), subject above it, bottom 20 % and right edge clear of the platform UI; hook in the first 3 s; one question, one twist answer; branded end frame; the main picture of each
   beat draws the SUBJECT of its line; house look per `studio/EPISODE.md` §00 (calm, no glare/flicker, precise actions, continuity).
4. Facts: every actionable claim from the research pack with its source; heavy claims need 2 sources; no invented
   numbers. No AI images of real people, real documents, logos, or fake headlines; animation illustrates, never poses as a record.
5. Voices: only `brief/VOICE_MODELS.md` (Kokoro, Chatterbox Turbo, Supertonic 3). Kitten is banned. Supertonic 3 →
   the delivery note says the audio is machine-generated (OpenRAIL-M).
6. Gates (above), then render the vertical film (`make.mjs … --speed .95 --fps 25`; preflight runs first), cover still, English .srt.
7. Deliver (PROTOCOL §5): `bash tools/ship.sh <slug>` (names, cover, srt, stories zip, upload of the masters); write
   `jobs/deliveries/<slug>.md` from `jobs/deliveries/_TEMPLATE.md`;
   STATUS → DELIVERED; `node tools/variety.mjs <story> --record`; `node tools/bank.mjs catalog` (commit BANK.md); INBOX line; commit and push `main`. Never commit video or zip files.
8. Report to the owner (≤ 10 lines, Vietnamese): the Drive link, the film's length, gate scores, what is uncertain, and the
   line to send Muse when he approves: "đăng tập <tên>".

Time budget: about 3–4 hours start to report (`studio/EPISODE.md` §6b). Every background job gets a watchdog (send_later) so nothing waits on the owner; never wait with `pgrep -f` on a pattern your own command contains (wait on a PID).
Run each episode end to end without stopping; talk to the owner only at the start and in the final report; stop early
only for hard blockers he alone can fix (Drive keys, credentials), saying exactly what is missing. A missing research pack
is not a blocker (step 1).

## Git
- Branch `main` only (PROTOCOL §1). Commits start with `[claude]`. End commit messages with the session's attribution lines.
- Never commit secrets, videos, zips, `node_modules/`, `out/`.
