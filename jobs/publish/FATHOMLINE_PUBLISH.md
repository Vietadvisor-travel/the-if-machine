# Publish runbook — Fathomline (all 4 channels)

Trigger: the owner says "đăng tập <tên VI>". Only then. Nothing posts before APPROVED.
Applies to FATHOM films (16:9 long-form, ~8 min). Supersedes the old The If Machine
publish notes (jobs/publish/money-disappears.md, gravity-half.md) — those are the
reference for the mechanics, this file is the live checklist.

## 0. Pre-flight (every film)

- `git pull` first. Read jobs/deliveries/<slug>.md: title options, description credits,
  files on Drive fathom/<slug>/.
- Download from Drive via pp_drive: master mp4, _thumb.jpg (1280x720), _cover.jpg,
  .srt. Verify with ffprobe (duration, 1920x1080) and that the .srt is readable.
- Title: delivery note option 1, unless the owner picks another option.
- File size warning: the master is ~172 MB. If the browser file grant rejects it,
  try browser direct-download from the Drive share link first; fallback: re-encode
  CRF 20 (YouTube) / CRF 28 (TikTok/IG/FB, ~50 MB) and use the re-encode.

## 1. YouTube (cloud browser, Studio — signed in as fathomlinefilms)

- Upload the master. Fill: title, description (template §A below + sources from
  the research pack + music/stock credits from the delivery note + AI narration
  disclosure), tags: fathomline, how we know, [topic tags].
- Category Education, language English, audience not made for kids: all already
  channel defaults. Verify they are still set.
- Custom thumbnail: upload the delivery _thumb.jpg.
  BLOCKED until the owner completes Intermediate features (phone verification).
- Subtitles: upload the .srt (English). Verify the player menu shows Subtitles/CC
  English and the first line renders.
- End screen (Video elements step): Subscribe element + one video element linking
  to the previous Fathomline film; for the FIRST film link the "How We Know"
  playlist instead (no previous film exists yet).
- Cards: 1 card near the end linking to the "How We Know" playlist
  (PLeJs39k3p__4). Add a card to the previous film from the second film on.
- Playlist: add the video to "How We Know" (PLeJs39k3p__4).
- Visibility: Public. Publish. Verify from a signed-out browser: watch page plays,
  title correct, thumbnail shows, subtitles available.
- Pinned comment: post the exact §B text as @fathomline-films, then pin it.
  Verify "Pinned by @fathomline-films" after reload.
  BLOCKED until the owner completes Advanced features (ID verification).
- First film only: after the video is public, flip "How We Know" to Public;
  enable the Home tab and set the film as the channel trailer
  (Customization > Layout).

## 2. TikTok (cloud browser, TikTok Studio — signed in as @fathomlinefilms)

- File: the 16:9 master as-is. No vertical cut exists for FATHOM films (open
  question §C). If the browser file grant rejects the file, re-encode CRF 28.
- Caption: hook (2-3 sentences) + hashtags #fathomline #howweknow #[topic].
  Max 1-2 emoji. No links (TikTok captions have none).
- Cover: pick a strong frame. Turn ON auto-captions. Comments on, duet/stitch on.
- Add to playlist "How We Know" (create the TikTok playlist on the first film).
- Publish as Everyone. KNOWN QUIRK (old channel, twice): the upload can save as
  "Only me" despite Everyone selected. Check Studio > Content right after posting
  and fix the privacy to Everyone if needed.
- Pinned comment: post the §B text as @fathomlinefilms and pin it
  (TikTok lets you pin your own comment).
- Verify on the public video page (plays, caption exact, privacy Everyone).

## 3. Facebook Page Fathomline (API, ifm-graph.py — never the browser)

- Caption: hook + hashtags, NO link, ever.
- Post as a reel via the API helper. Verify via API read (post id, public URL).

## 4. Instagram @fathomlinefilms (API, ifm-graph.py ig-reel — never the browser)

- Caption: hook + "Full run on YouTube, link in bio." + hashtags, NO link.
- The API needs a public video URL: upload the master to Muse storage for a
  public link (the old channel used that route). Verify via API read (media id).

## 5. Record (every film)

- Fill jobs/publish/<slug>.md with: all 4 URLs + IDs, upload times (+07),
  title/description/tags used, thumbnail/subtitles/pinned-comment status,
  playlist membership, and anything that failed.
- INBOX line: muse → claude · [published] <slug> + the 4 links.
- STATUS.md: published column for the episode.

## A. YouTube description template (DRAFT — owner approves)

```
How do we know [question]? [hook line]

[2-3 sentences: the setup, no spoilers]

Sources:
[list from the research pack]

Music: [credit]. Narration is AI-generated. Animation is illustrative, not real footage.

#fathomline #howweknow #[topic]
```

## B. Pinned comment (DRAFT — owner approves)

```
We didn't go there. Nobody did. So how do we know? What should we figure out next?
```

## C. Open questions for the owner

1. YouTube verification (do BEFORE the first post, in Studio > Settings > Channel >
   Feature eligibility): phone verification unlocks custom thumbnails; ID
   verification unlocks pinning comments. Without them the first film ships with
   no thumbnail and no pinned comment.
2. TikTok / Instagram / Facebook format: the FATHOM master is 16:9 long-form.
   Default in this runbook is to post it as-is on all 4 channels. If the owner
   wants vertical cuts for the short-form channels, Claude must deliver them
   (a new order, not a Muse crop — cropping 16:9 animation cuts the drawings).
3. Approve the §A description template and §B pinned comment above (or rewrite).
