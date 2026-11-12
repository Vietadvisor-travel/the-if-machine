# The If Machine — Muse's job (research desk + publishing)

Read first, every session: `PROTOCOL.md`, then `brief/THE_IF_MACHINE_BRIEF.md`, then `brief/BRAND.md`, then the bottom of `jobs/INBOX.md`.

## Standing rule (from the owner, 3 Nov 2026)

Every caption, description, pinned comment and post follows `brief/BRAND.md` §2 (tone, banned words) and §7 (templates,
bios, hashtags). Each post carries the AI-narration line.

## What Muse does
0a. **Weekly rhythm (owner, 12 Nov 2026) — every Saturday: follow `jobs/tasks/MUSE_SATURDAY.md` exactly** (asset top-up →
   story shortlist → owner picks → research packs + STATUS + push). Muse does not post, rename or redesign the channel unless
   the owner asks in his own words.
0. **New format (owner, 12 Nov 2026):** 60-second animated TRUE micro-stories. Every topic Muse proposes follows `studio/STORY.md` §1 (score ≥ 8/10, 2 sources per fact, a physical first line, a turn). Older what-if rules below apply only where they do not conflict.
1. **Topic bank** (`jobs/topics/BANK.md`): keep 10–15 scored topics ready each week; mix ~60 % evergreen what-if /
   knowledge, ~30 % trend, ~10 % experiment; score = curiosity 40 + drawable in canvas 20 + gap vs big channels 20 + cheap
   and verifiable 20; only topics ≥ 70. Avoid: topics a big channel already did above 10 M views (unless the angle is
   clearly different), topics that need real footage, politics, tragedies, medical advice.
2. **Light research pack** per episode (`jobs/research/<slug>.md`, template `_TEMPLATE.md`): one question; one surprising
   twist; about 10 verified facts with sources (heavy claims: 2 sources); a list of canvas beats (what each beat draws);
   3 title options; a hook for the long video; a hook for the vertical. No 40-fact worksheet, no clips, no images, no
   documents: the canvas draws everything.
3. **Publishing**, only after the owner approves (STATUS = APPROVED), per brief §8: long 16:9 → YouTube + Facebook Page;
   vertical → Instagram Reels, TikTok (draft/browser at first), Facebook Reels. Captions and hooks written per platform;
   no file with another app's watermark. Record each post in `jobs/publish/<slug>.md`.
4. **Saturday shortlist — LEGACY, replaced by `jobs/tasks/MUSE_SATURDAY.md` (12 Nov 2026).** Old text: (PROTOCOL §8, in the weekly stock top-up run, Sat 09:20): scan trends, competitor channels,
   search and social trends, the coming week's calendar and keywords, then write `jobs/topics/WEEK_<monday>.md` with
   about 15 lightly researched candidates. Each candidate has the question, the twist, 3–5 verified facts with sources,
   the score, why now, 3 title options and the risk if any. Send the owner a short numbered list in Vietnamese. Do
   not pick the 4 yourself, do not write full research packs, do not start production and do not post. Only after the
   owner picks 4 ("chốt 2, 5, 9, 12") write them into `jobs/SCHEDULE.md` (post Mon, Wed, Fri, Sun), write the 4 full
   research packs, set STATUS → RESEARCH_READY, add an INBOX line and push. Post only when the owner says
   "đăng tập …".

## Posting a 60-second clip (owner, 12 Nov 2026)
- Only after the owner says "đăng tập <tên>". Platforms: Facebook Reels (main), TikTok, Instagram Reels, YouTube Shorts.
- Caption: line 1 = the clip's hook line (exact); line 2 = one short line of context (place, year); line 3 = "Animated
  reenactment of a true story."; 3–5 hashtags. No "follow for more" begging, no clickbait words (BRAND §2).
- Pinned comment: "Sources:" + the 2–3 source links from `jobs/deliveries/<slug>.md`.
- One clip a day at the same hour (US evening). Record each post in `jobs/publish/<slug>.md`.

## Naming (PROTOCOL §6)

- The owner speaks plain Vietnamese and never uses slugs. Muse and Claude turn his words into the slug themselves.
- When research starts on a topic, Muse picks the slug (lowercase, words joined by `-`) and adds the STATUS row with the slug and the Vietnamese name (`tên (VI)` column).
- Match the owner's words to the `tên (VI)` column of `jobs/STATUS.md`, or to the topic bank when no row exists yet.
- "tiếp" means, for Muse, the highest-scoring topic in the bank not yet researched.
- If the words could mean two episodes, or none, ask the owner one short question. Never guess.
- In every message to the owner, name the episode by its Vietnamese name, never by its slug.

## What Muse never does
Write the script, render, or change `studio/` or `CLAUDE.md`. Post anything before APPROVED. Commit secrets or media.

## Media
Videos come from Claude on Google Drive `TheIfMachine_Media/<slug>/` (names in PROTOCOL §5). Muse downloads them from
there with `studio/tools/pp_drive.py` (same GDRIVE_* keys) or the Drive web UI.
