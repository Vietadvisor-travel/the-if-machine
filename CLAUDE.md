# The If Machine — Claude Code makes the videos

Token-lean reading (owner, 3 Nov 2026: as cheap as possible, same quality):
- **Every session:** this file + the last 5 lines of `jobs/INBOX.md` (`tail -5`).
- **For an episode:** `studio/EPISODE.md` (the one page), `studio/API.md` (when writing code), the research pack,
  and `brief/BRAND.md` §2 (tone).
- Everything else (`PROTOCOL.md`, the brief, `IFM_HOUSE.md`, `references/`) only when a question needs it, with grep.

## PHASE 2 — 60-second true stories (owner, 12 Nov 2026) — OVERRIDES everything below about format, look, voice and length
Decided from Muse's market scan (`jobs/research/_market/ANALYSIS.md`): animated TRUE micro-stories win on Facebook; long what-if
explainers do not. The channel is now **ODDLY TRUE** (owner, 12 Nov 2026; brief/REBRAND.md) — tagline *Strange things that really happened.*
When the owner says "làm tập <tên>" / "làm tập tiếp" / "làm clip …", make ONE clip:
- **Read:** `studio/CLIP.md` (the workflow, the shot grammar, the commands) + `studio/STORY.md` (the writing standard). Nothing else up front.
- **Format:** vertical 9:16, 50–65 s (150–190 words), opens MID-ACTION (verb first, no "What if", no title card), no spoken outro,
  short brand end (`enddur: 1.5`). One sentence = one shot.
- **Picture:** realistic real-time 3D, house look IFM.L3 (`act=l3` shots: HDRI light, glTF people + animation clips, PBR, DOF)
  + minimal 2D only to explain the invisible. Assets: `python3 tools/assets3d.py sync` (Drive `_assets3d`, built by Muse).
  Real people appear as generic figures (no likeness); the post says "animated reenactment".
- **Voice:** am_adam (Kokoro), speed 1.0 — replaces af_heart / af_nicole / am_santa for this format.
- **Gates:** `node tools/clip_gate.mjs stories/<slug>.story` (clip_check + 3D render cost ≤ 9 s/frame + sheet); render with
  make.mjs (≈ 25–35 min for 60 s); ship.sh; delivery note; report ≤ 8 Vietnamese lines + "đăng tập <tên>".
- **Still valid from below:** Vietnamese messages to the owner, facts with 2 sources, no invented numbers, Drive masters, git rules,
  watchdogs, `bash setup.sh`. The long-film rules below (6–10 min, IF CREW 2D, af_heart, What-if opening, outro) are LEGACY.

## Current phase: PRODUCTION (from 3 Nov 2026, PROTOCOL §8)
The owner starts each episode in a new chat ("làm tập <tên tập>" / "làm tập tiếp") and approves each video himself.
Push to `main` (owner's standing authorization, PROTOCOL §1). The scheduled routine is off.
Engine work = changes the owner asks for in `studio/`, each tested on an existing story and logged in
`studio/CHANGELOG.md`.

## Content and look (owner, 4 Nov 2026 evening — overrides older notes)
- A NEUTRAL EXPLAINER that entertains through content: no invented protagonist, no plot, no simulated "day one". A real HOOK
  (question, surprising fact, why it matters, what the video answers) and a real CONCLUSION (recap, the answer, a closing thought).
- Engine 4.0 (owner, 5 Nov 2026 evening): **2D only** (no 3D sets for now), polished and clear (soft places, subjects in the light, nothing in the caption band), every picture shows its line, transitions planned in the script (morph/match/zoomthru/push2/wipe), narration that flows (one utterance per beat, joined sentences), music named per section (`score:`). `studio/EPISODE.md` §000.
- **PREMIUM is the standard** (owner, 5 Nov 2026 night): drawn objects and people (IFM.PX), not emoji; motion typography (`kick=` + `title=` with `*gold*` words, callouts, counters); grain/vignette finish; a gentle 2D camera. `studio/EPISODE.md` §0000.
- **Opening = the title question** (owner, 11 Nov 2026, replaces the cold open): NO cold open; the first shot is the scene of the title question itself ("What if …?" over the picture of that question), then the surprising fact and the promise. End out loud (closing thought + "Next time on The If Machine: …", `tail=2.4`). `studio/EPISODE.md` §0000000.
- **Delivery** (owner, 11 Nov 2026): stress the key word of each line with `*word*` in the story (voice.py stresses it, softens the rest; questions rise, `…` holds a beat).
- **Transitions** (owner, 5 Nov 2026 night): 42 GL shader transitions (`trans=gl<Name>`) plus the shape ones, picked by meaning from `studio/references/transitions.md`; skills `.claude/skills/ifm-motion` + `gl-transitions`.
- **IF CREW is the house look** (owner, 7 Nov 2026): people, props and places in one flat language (crescent halftone shadows, sticker cut-outs), the cast in `studio/engine/library/cast.js`, house act `act=crew`; illustration actors only, never named. `studio/EPISODE.md` §0 IF CREW.
- **Style decision (owner, 7 Nov 2026, final):** IF CREW v3 (2D) is THE look of every episode. Block world (`voxel_lab.js`, act `x_vox`) is parked for a possible separate series "If Machine: Blocks" (one style per episode, never mixed); pixel looks (`pixel_lab.js`) are lab only. Do not develop either further unless the owner asks.
- **FINAL STANDARD: IF CREW + comic layer, CONTENT FIRST** (owner, 7 Nov 2026): funny and a bit weird on top of the clean crew (takes, deadpan, coins that run, notes that melt), each gag a visual metaphor of its line, ~1 per 20–30 s, 2–3 new gags per episode; the content matters most: one sharp question, a new sourced surprise every 45–60 s, concrete cases, a building arc. `studio/EPISODE.md` §0 comic layer + §0 CONTENT FIRST.
- Unhurried: `--speed 1.0`, real pauses (engine default), one idea per beat. Minimal sound: music bed only, `sfx=` where it matters
  (≤ 1 per 30 s), master −16 LUFS. 2D = recognisable illustrations (explainer kit + OpenMoji), never vague shapes.
- Voices (owner, 5 Nov 2026, only these three): **af_heart** narrates every episode; **af_nicole** = second female voice (slow,
  eerie: quotes, chilling lines); **am_santa** = old male storyteller (legends) when needed. `cast: QUOTE=af_nicole LEGEND=am_santa`.

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
   Every shot also has SHOT (size · angle · move · 2D/3D/2D+3D) and LOOK; engine 3.0 = `studio/EPISODE.md` §0b (2D and 3D combined,
   3D sets `act=s3`, pins/pip/split; `tools/sim_check.mjs` in the gate). The build follows the script shot by shot. Then `node tools/new_episode.mjs <slug> "<tên>"`, then direct the story per `studio/EPISODE.md` (a frame line and a `dir=` track per
   beat; 2D from the explainer kit with OpenMoji illustrations, `studio/references/explainer-kit.md`; bespoke shots only where the kit cannot show it) and brief §2: ONE vertical 9:16 film, 6–10 min (≈ 850–1400 spoken words; owner 4 Nov 2026: no 16:9, no separate short);
   small captions in the low band (74.5–79 %), subject above it, bottom 20 % and right edge clear of the platform UI; hook in the first 3 s; one question, one twist answer; branded end frame; the main picture of each
   beat draws the SUBJECT of its line; house look per `studio/EPISODE.md` §00 (calm, no glare/flicker, precise actions, continuity).
4. Facts: every actionable claim from the research pack with its source; heavy claims need 2 sources; no invented
   numbers. No AI images of real people, real documents, logos, or fake headlines; animation illustrates, never poses as a record.
5. Voices: only `brief/VOICE_MODELS.md` (Kokoro, Chatterbox Turbo, Supertonic 3). Kitten is banned. Supertonic 3 →
   the delivery note says the audio is machine-generated (OpenRAIL-M).
6. Gates (above), then render the vertical film (`make.mjs … --speed 1.0 --fps 25`; preflight runs first), cover still, English .srt.
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
