# Publish runbook — Fathomline (YouTube only from 18/11/2026)

Trigger: the owner says "đăng tập <tên VI>". Only then. Nothing posts before APPROVED.
OWNER ORDER 18/11/2026: from now on, when the owner says "đăng tập", Muse posts ONLY
to YouTube as usual. The owner posts TikTok, Facebook and Instagram himself. Sections
1-4 below still describe the old 4-channel flow; only §1 (YouTube) is live work for
Muse now. The FB/IG/TikTok sections stay as reference in case the owner asks again.
Applies to FATHOM films (16:9 long-form, ~8 min). Supersedes the old The If Machine
publish notes (jobs/publish/money-disappears.md, gravity-half.md) — those are the
reference for the mechanics, this file is the live checklist.

## 0. Pre-flight (every film)

- `git pull` first. Read jobs/deliveries/<slug>.md: title options, description credits,
  files on Drive fathom/<slug>/.
- Download from Drive via pp_drive: master mp4, _thumb.jpg (1280x720, horizontal),
  vertical thumb 9:16 (Claude delivers one per film from 17/11; file name per the
  delivery note), _cover.jpg, .srt. Verify with ffprobe (duration, 1920x1080)
  and that the .srt is readable.
- Title: delivery note option 1, unless the owner picks another option.
- File size rule (18/11, star-distance): masters now arrive at 5-600 MB. The browser
  file grant rejects 176 MB and accepts 94 MB; Muse storage rejects 176 MB (HTTP 413)
  and accepts 94 MB. Re-encode to ~90-100 MB (CRF 32, preset fast) and grant/upload
  that file. NEVER tell the browser to download the master from Drive and upload it:
  the cloud browser agent cannot open the native file picker for a downloaded
  (ungranted) file (TikTok proved it 18/11). Downloads are done by command (pp_drive)
  only; the browser only posts with granted files. The owner corrected this mid-post
  (09:39): downloads by command, browser only for posting, open the cloud browser
  visibly to post, no silent background work.

## 1. YouTube (cloud browser, Studio — signed in as fathomlinefilms)

- Upload the master (or the ~90-100 MB re-encode if the browser file grant rejects
  the master). Fill: title, description (template §A below + sources from
  the research pack + music/stock credits from the delivery note + AI narration
  disclosure), tags: fathomline, how we know, [topic tags].
- Category Education, language English, audience not made for kids: all already
  channel defaults. Verify they are still set.
- Custom thumbnail: upload the delivery _thumb.jpg (horizontal 1280x720).
  Intermediate is Enabled since 16/11 (owner's phone verification), so custom
  thumbnails work.
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
  Status 2026-11-16 11:20 (checked live): Standard Enabled, Intermediate Enabled
  (phone verification done — custom thumbnails work), Advanced Pending — the
  owner started it; check the result in Studio before pinning a comment.
  Status 2026-11-18: Advanced ENABLED (checked live); the star-distance comment was
  posted and pinned. The inside-earth and empty-atom comments are still unpinned.
- First film only: after the video is public, flip "How We Know" to Public;
  enable the Home tab and set the film as the channel trailer
  (Customization > Layout).

## 2. TikTok (cloud browser, TikTok Studio — signed in as @fathomlinefilms)

- File: the 16:9 master as-is, or the ~90-100 MB re-encode if the browser file grant
  rejects the master (grant rejects 176 MB, accepts 94 MB, measured 18/11). No vertical
  cut exists for FATHOM films (open question §C).
- Caption: hook (2-3 sentences) + hashtags #fathomline #howweknow #[topic].
  Max 1-2 emoji. No links (TikTok captions have none).
- Cover: use the "Sửa ảnh bìa" (Edit cover) control at upload; upload the vertical
  thumb (9:16) if the uploader offers an upload option, otherwise pick a strong
  frame. (Confirmed by owner screenshot 17/11.)
- Auto-captions: turn ON if the uploader offers it (web has no control; otherwise
  owner phone-app job). Comments on. Duet/stitch are unavailable for videos over
  60 s (platform limit).
- Playlist + pinned comment: DROPPED per owner 16/11 21:06 (not available for
  this account). Do not ask for them again.
- Publish as Everyone. RULE (owner 17/11): post directly and stop. NO post checks: do NOT open Studio > Content to check privacy, do NOT verify on the public page. Extra navigation triggers TikTok's captcha/bot check. The "Only me" quirk (seen twice on the old channel) is accepted as a risk; the owner fixes privacy himself if it happens.

## 3. Facebook Page Fathomline (API, ifm-graph.py — never the browser)

- Caption: hook + hashtags, NO link, ever.
- Post as a reel via the API helper. Verify via API read (post id, public URL).
- Cover: the OWNER sets the cover himself after posting (decision 17/11). The
  API route has no cover parameter.
- FB and IG stay SEPARATE posts (owner decision 17/11): no IG→FB auto-share. The
  Content Publishing API has no crosspost parameter, and native crossposting only
  works from the phone app (same caption both sides, FB gets the compressed file,
  no separate FB cover).

## 4. Instagram @fathomlinefilms (API, ifm-graph.py ig-reel — never the browser)

- Caption: hook + "Full run on YouTube, link in bio." + hashtags, NO link.
- The API needs a public video URL: upload the master to Muse storage for a
  public link (the old channel used that route). Verify via API read (media id).
- Cover: pass the vertical thumb as --cover-url (public URL via Muse storage,
  same as the video URL). The API takes cover_url (custom 9:16 JPEG) or
  thumb_offset (a frame in ms); cover_url wins if both are given.
  ifm-graph.py ig-reel supports --cover-url since 17/11.

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
2. RESOLVED 17/11: the 16:9 master posts as-is on all 4 channels; Claude also
   delivers one vertical thumb (9:16) per film for covers. IG uses it via
   cover_url, TikTok via the upload cover editor ("Sửa ảnh bìa"), FB the owner
   sets himself after posting, YouTube keeps the horizontal _thumb.jpg.
   (inside-earth has no vertical thumb; it shipped before this decision.)
3. Approve the §A description template and §B pinned comment above (or rewrite).
