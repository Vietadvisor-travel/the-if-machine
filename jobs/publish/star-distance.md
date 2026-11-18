# Publish — Các vì sao xa đến đâu (star-distance) · Fathomline · third film · 2026-11-18

Owner order: "đăng tập: Các vì sao xa đến đâu" (18/11/2026 08:19 +07). Parallel posting
(owner order 17/11) — FB fired 08:56, IG 09:32, TikTok retry 09:35, YouTube 09:39
(the two browser tasks were staggered by the file-size problem below, not one-by-one
by choice).
Posted film: **v1.1** (Claude DELIVERED v1 17/11 22:15, v1.1 18/11: two-pass re-encode
of the CRF-17 master to the owner's 5-600 MB rule, 545 MB, PSNR 41.7 dB vs CRF-17).
Engine v7 (first v7 film), af_heart narration 0.86. Critic pass 2 below the 8 bar
(drawing 5, light and depth 4, acting 4); Claude proposed a v2, the owner ordered
v1.1 posted as delivered.
Master: 16:9, 8:44 (524.063 s), 1920x1080, 544,570,470 bytes on Drive
fathom/star-distance/ (folder id 1_m9Cj5qLSrwt35HKMDhHHny1El7J3e5u). Thumb:
star-distance_thumb.jpg 185,737 bytes ("KÖNIGSBERG · 1838 / HOW FAR ARE THE STARS? /
A coin, 13 km away."), cover_9x16.jpg 332,310 bytes (1080x1920, same design). SRT:
star-distance.srt, 11,136 bytes, 565 lines, last cue 00:08:39,278 --> 00:08:40,463
"size of the sky."
Re-encodes (this film's master is 545 MB, far bigger than the 186/248 MB masters
before, so CRF 28 came out 176 MB):
- CRF 28: star-distance_16x9_crf28.mp4, 176,152,450 bytes, 524.074 s. Used for
  Facebook (CLI, no size limit there). REJECTED by the browser file grant (176 MB
  exceeds the grant limit; accepted files before were 55-63 MB) and by Muse storage
  (HTTP 413).
- CRF 32 (preset fast): star-distance_16x9_crf32.mp4, 94,131,826 bytes, 524.074 s.
  Used for the YouTube + TikTok browser uploads and for IG (Muse storage URL,
  expires 2026-11-20T02:32:01Z). Vertical cover also on Muse storage (expires
  2026-11-20T02:00:02Z).
- The CRF 32 encode had to run twice: the first attempt was killed by a runtime
  restart at ~09:10 (file truncated at 61 MB, no moov atom); restarted 09:10 and
  finished 09:31.

Title (delivery option 1):
"How Far Away Are the Stars? The Blink That Measured the Universe"

## YouTube — PUBLISHED 18/11/2026 09:45 +07
- URL: https://www.youtube.com/watch?v=X9QkGBAJR0k
- Video ID: X9QkGBAJR0k, channel Fathomline UChtJIYrqxnBAsVk0hk3ULiw (@fathomline-films)
- Uploaded file: star-distance_16x9_crf32.mp4 (94 MB CRF 32 re-encode of the 545 MB master).
- Title exact. Description pasted in full (1,787 bytes), 10 tags: fathomline, how we know,
  stars, parallax, Bessel, Leavitt, Hubble, Cepheid, science documentary, history of science.
  Thumbnail star-distance_thumb.jpg uploaded and showing (verified via
  https://i.ytimg.com/vi/X9QkGBAJR0k/maxresdefault.jpg). Subtitles star-distance.srt
  uploaded as English CC, showing in the player. Audience: not made for kids.
  Visibility: Public.
- Playlist "How We Know" (PLeJs39k3p__4): video added as #3 of 3.
- End screen: template "1 video, 1 subscribe", video set to "What Is Inside an Atom?"
  (3bUGG6Ltdk4), 8:24-8:44. Card at 8:30 to the same film.
- Pinned comment: comment POSTED as @fathomline-films, exact text "Nobody has ever been
  to a star. So how do we know how far away they are? What should we figure out next?" —
  AND PINNED. Advanced features are now Enabled (checked in Studio 18/11: Standard
  Enabled, Intermediate Enabled, Advanced Enabled). This closes the open item from
  films 1-2 (comments posted but unpinned). Note: the two earlier films' comments are
  still unpinned; pin them on a later pass if the owner wants.
- Copyright/community checks passed, no Content ID claim on this film (music: Kevin
  MacLeod "Floating Cities", "Dreamer", "Anamalie", "Montauk Point", "Gregorian Chant";
  no "Study and Relax").
- Signed-out check: video plays, title, thumbnail, subtitles, playlist all correct.
  (The embed player reported "Error 153" in the cloud browser only; the watch page
  itself plays fine.)
- Failed first attempt (09:30-09:39): the browser task was told to download the 545 MB
  master from Drive and upload it; the task was closed before it reached the picker and
  relaunched with the granted CRF 32 file (the TikTok twin proved the Drive-download
  route fails, see TikTok).

## TikTok — PUBLISHED 18/11/2026 09:38-09:39 +07
- URL: https://www.tiktok.com/@fathomlinefilms/video/7709335292234304776
- Video ID: 7709335292234304776, account @fathomlinefilms
- Uploaded file: the same 94 MB CRF 32 re-encode (granted to the cloud browser).
- Caption exact including hashtags. Cover: vertical cover_9x16.jpg uploaded in the
  "Sửa ảnh bìa" editor and saved.
- Published Everyone ("Mọi người", "Bây giờ"); the task chose "Đăng ngay" when TikTok
  asked about posting before review finished.
- Privacy: Studio list shows "Chỉ mình tôi" (Only me) right after posting despite
  Everyone selected (known quirk, third time). NOT fixed in Studio (owner rule 17/11:
  no post checks; the owner fixes it himself).
- First attempt FAILED (09:30-09:34): the task was told to download the 545 MB master
  from Drive and upload it, but the TikTok upload picker never opened a file dialog
  when "Chọn video" was clicked (several tries), so no file could be selected. Lesson:
  the cloud browser agent cannot operate the native file picker for a file it did not
  grant; the Drive-download route does not work for uploads. Downloads belong to
  commands (pp_drive), uploads belong to granted files. Runbook §0 updated.

## Facebook — PUBLISHED 18/11/2026 09:02:10 +07
- Post URL: https://facebook.com/reel/2184971502089865/
- Post ID: 122100200523553368, media ID: 2184971502089865
- Posted via facebook-cli as the Fathomline Page (1409513838916477), file = 176 MB
  CRF 28 re-encode (not the 545 MB master; the CLI has no size limit, the CRF 28 file
  was the ready upload file).
- Caption exact: "Hold your thumb up and blink. It jumps, and that jump is how we
  measured the stars. In 1838, Bessel caught one star shifting by a third of a second
  of arc, and that tiny blink meant it is 10 light-years away. #fathomline #howweknow
  #stars #astronomy"
- Verified via facebook-cli post read: owner Fathomline, caption exact, created
  2026-11-18T09:02:10+07.
- Cover: the OWNER sets the cover himself after posting (decision 17/11).

## Instagram — PUBLISHED 18/11/2026 09:34:52 +07
- URL: https://www.instagram.com/reel/Df3cL1hD_of/
- Media ID: 17959718913264519, account @fathomlinefilms (17841435974347255)
- Posted via Meta Graph API (ifm-graph.py ig-reel) with --cover-url (vertical cover).
  Video URL: Muse storage link for the 94 MB CRF 32 re-encode. Container id
  18109995359199145, FINISHED after 14 polls, then published.
- Caption: same as Facebook + "Full run on YouTube, link in bio." before the hashtags.
- Verified via ig-media: VIDEO, 2026-11-18T02:34:52+0000, caption matches.

## Notes for next films
- Browser file-grant limit: 176 MB rejected, 94 MB accepted (previous accepted:
  55-63 MB). Muse storage limit: 176 MB rejected (413), 94 MB accepted (previous
  accepted: 55-63 MB). Both limits sit somewhere between 94 and 176 MB; plan
  re-encodes at ~90-100 MB for masters this big.
- The Drive-download upload route DOES NOT WORK: the cloud browser agent cannot open
  the native file picker for a downloaded (ungranted) file. Always grant the upload
  file to the browser task; download with commands only. The owner corrected this
  mid-post (09:39): downloads by command, browser only for posting, no silent
  background work, open the cloud browser visibly to post.
- YouTube Advanced features are now Enabled (18/11). Comments can be pinned from now
  on. The inside-earth and empty-atom comments are still unpinned.
- TikTok "Only me" quirk struck a third time; the owner fixes it himself.
- The owner asked mid-post (09:29) whether yesterday's YouTube/TikTok used the original
  file or a re-encode: YouTube + TikTok used the CRF 28 re-encode (55 MB) on both
  earlier films; only Facebook used the original master (186 MB). Correct the record
  whenever asked: the upload file is the re-encode, the master stays on Drive.
