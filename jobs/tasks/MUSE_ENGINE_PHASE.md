# Muse — tasks for the engine phase (from the owner, 3 Nov 2026)

While Claude upgrades the engine to the channel's identity, Muse gathers what Claude cannot reach (Claude's container has
no access to Pixabay, Freesound, HuggingFace or YouTube) and studies what makes the best channels "wow".
No research packs and no episodes yet. The owner starts episodes after his test.

Read first: `PROTOCOL.md`, `MUSE.md`, `brief/BRAND.md` (the identity: tone, look, sound, format, platform copy), the bottom of
`jobs/INBOX.md`.

## Standing rule from now on
Every caption, description, pinned comment and post follows `brief/BRAND.md` §2 (tone, banned words) and §7 (templates,
bios, hashtags). Each post carries the AI-narration line.

## Big files: how to upload
Upload music and sound packs with `python3 studio/tools/pp_drive.py put <files> --to <folder>`, using the same GDRIVE_* keys.
Do not use the Drive web UI or another connector: Claude's key can only see files uploaded through this tool (Drive scope
`drive.file`). Files go to Drive, never to git. Licence lists go to git.

---

## Task 1 — Music library (most important)
Claude's mixer cuts real tracks to the edit: it enters on a bar, ducks under the voice, and drops out before the twist.
It needs a library in the channel's moods (`brief/BRAND.md` §5).

- **How many:** 24–30 instrumental tracks, each ≥ 2 min. MP3 ≥ 192 kbps, or WAV.
- **Moods:** at least 3 tracks per mood, ideally 4–5.
  - `curious` (pizzicato, marimba, light synth, playful)
  - `wonder` (pads, arpeggios, 80–100 bpm, space)
  - `momentum` (steady synth-pop or electronic pulse, building)
  - `tension` (ticking, low strings, suspense; NOT horror, NOT true-crime dark)
  - `comedy` (quirky, bouncy)
  - `warm` (resolve, hopeful ending)
  - `tech` (digital, sci-fi, data)
  - `epic` (big reveal, orchestral or hybrid; use sparingly)
- **Allowed sources only:**
  - YouTube Audio Library (only tracks that need no attribution, or with the attribution text copied exactly);
  - Pixabay Music (Pixabay Content License);
  - Kevin MacLeod / incompetech.com (CC BY 4.0, credit line);
  - Free Music Archive tracks marked CC BY or CC0. Never NC or ND.
  - Not allowed: anything "free for personal use", ripped tracks, or AI music whose licence forbids commercial use.
- **Packing:**
  - Name each file `<mood>_<short_name>.mp3`, e.g. `wonder_orbit_lights.mp3`.
  - Zip into `ifm_music_1.zip`, `_2.zip` …, each ≤ 90 MB. Upload: `--to _music`.
  - Put a `library.json` inside the first zip. One entry per file:
    `{"file": "...", "moods": ["wonder"], "bpm": 90 (if known), "title": "...", "artist": "...", "license": "...", "credit": "exact credit line", "source_url": "..."}`.
- **Git:** `jobs/music/CREDITS.md` (the same list, readable).

## Task 2 — Sound effects for the brand machine
CC0 or royalty-free only: Freesound CC0, Pixabay Sound Effects, Sonniss GDC bundles (royalty-free).

- **The machine:**
  - a heavy lever pull or clunk (3–5 variants);
  - relay clicks, a ratchet, a dial turning, a gear whirr spinning up;
  - a receipt/ticket printer, a typewriter or keyboard burst, a bright 3-note chime or ding.
- **Motion:** whooshes (short, long, deep, airy), swishes, risers 1–3 s, a reverse cymbal, impacts (soft and big), a pop, a bubble.
- **Science and space:** soft UI bleeps, a radar ping, a data chatter, a hologram shimmer.
- **World:** a crowd murmur, a city, rain, wind, a clock ticking, a heartbeat, a camera shutter.
- **Packing:** about 60–100 files, WAV or MP3, named `<category>_<what>_<n>`. Zip as `ifm_sfx_1.zip`, upload `--to _sfx`, with
  `sfx.json` inside (`file`, `category`, `license`, `credit`, `source_url`) and the same list in `jobs/music/SFX_CREDITS.md`.

## Task 3 — Reference study: what makes them "wow" → `jobs/research/_REFERENCES.md`
Study 6–8 channels: What If (Underknown), Kurzgesagt, Zack D. Films, The Infographics Show, AsapSCIENCE, TED-Ed,
RealLifeLore, Curiosity Hub, plus any rising what-if channel of 2026.

For each channel:
- typical length;
- how the first 3 seconds hook;
- cuts or new images per minute (count one video);
- transitions they reuse;
- how sound and music are used;
- title and thumbnail patterns;
- their top 3 what-if videos with views.

Then:
- **The 15 best "wow" moments**, each one described in words with its link and timestamp: what moves, what we hear, why it
  works.
- **What we learn and what we must NOT copy.** We never imitate a channel's look, characters or music.
- **Our gap:** which kinds of questions they leave open.

## Task 4 — Platforms in 2026 → `jobs/research/_PLATFORMS.md`
For YouTube (long and Shorts), TikTok, Instagram Reels and Facebook Reels, each with a source link and date:
- best length, safe zones where the app covers the picture;
- caption and hashtag practice;
- posting times for US/UK viewers;
- how each platform labels AI content today (YouTube altered or synthetic content, TikTok AI label, Meta "AI info"), and
  what our cartoon plus AI voice must declare.

## Task 5 — Topic bank check
Re-score `jobs/topics/BANK.md` against `brief/BRAND.md`: tone, the "machine run" format, and a twist we can show.
Add up to 10 new topics ≥ 70 with the reason. Do not write research packs until the owner says so.

## Task 6 — Ideas for Claude
After tasks 3–4, add one INBOX line to Claude with the 5–10 most useful ideas for the engine: devices, transitions, sound
tricks. Claude decides how to build them.

## When done
- Commit `[muse] [engine-phase] ...`.
- Add one INBOX line per finished task: what, where, how many files, any licence doubt.
- Tell the owner in Vietnamese, in a few lines.
