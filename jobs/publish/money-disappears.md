# Publish — Nếu tiền biến mất (money-disappears) · RUN #001 · v5 (premium 2D)

## YouTube
- Video: https://www.youtube.com/watch?v=tuOXwDNr390
- Video ID: tuOXwDNr390
- Uploaded: 2026-11-05 22:32 +07, privacy private (app unverified, API can only upload private)
- Made public: 2026-11-05 22:38 +07 via Muse browser in YouTube Studio (Visibility Private -> Public, 'Changes saved', verified Public on the Video details page)
- Verified public from outside: 2026-11-05 22:42 +07, signed-out browser opened the watch page, title shown, player playing 0:01 / 7:10, no 'Private video' notice
- Title: What If Money Disappeared Tomorrow?
- Description: BRAND.md §7 template + sources from jobs/research/money-disappears.md + music credits (3 Kevin MacLeod CC BY 4.0 + Nostalgic Piano CC0) + OpenMoji CC BY-SA 4.0 note + AI narration disclosure
- Tags: whatif, theifmachine, money, economics, history
- Category: 27 Education
- Upload status: uploaded, thumbnails generated
- Custom thumbnail: DONE 2026-11-05 23:34 +07 via Muse browser (money-disappears_cover.jpg uploaded in Studio, saved, verified after reload). Phone verification was required before Studio would accept a custom thumbnail; the owner's first number was rejected by YouTube ("associated with too many accounts, only two accounts can be verified per phone number, per year"), the second number was accepted and the SMS code verified.
- English subtitles: DONE 2026-11-05 23:34 +07 via Muse browser (money-disappears.srt uploaded, "English subtitles published").
- Pinned comment: DONE 2026-11-05 23:45 +07. Comment posted 23:34 +07 (@theifmachinetv, exact BRAND §7 text); pinning needed YouTube "advanced features" verification, separate from phone verification. Owner chose ID verification and uploaded the ID from his phone via the QR flow; Studio > Settings > Channel > Feature eligibility then showed all three Enabled (Standard, Intermediate, Advanced). Comment pinned and verified after reload ("Pinned by @theifmachinetv").
- Standing rule from owner 05/11/2026: from the next episode, YouTube is posted via the Muse browser like TikTok (upload, fill all fields, public at once, pin the comment), with the cover + SRT from Drive.

## TikTok
- Video: https://www.tiktok.com/@theifmachinetv/video/7704714516843531526
- Published: 2026-11-05 22:49 +07 via Muse browser in TikTok Studio, public (privacy Everyone; the upload first saved as Only me, fixed in Studio Content settings, 'privacy settings updated' confirmed)
- File used: 33 MB CRF 28 re-encode (the 488 MB master exceeds the browser file-grant size limit)
- Caption (exact, verified on the video page): "What if money just… disappeared? Tonight, every coin, every note, every number in every account: gone. Free doesn't remove cost, it moves it. 🕹️ #whatif #theifmachine #money #economics"
- Note: Studio status 'under review' right after posting (normal TikTok moderation for new content); the video plays on the public URL.

## Facebook
- Blocked: Page login dead / security warning (06/10/2026). Not posted.

## Instagram
- PUBLISHED 2026-11-05 23:20 +07: https://www.instagram.com/reel/DfXcba9j4dL/ (media id 18121094045070170, caption exact with hashtags, verified via API read).
- Earlier failures: CLI failed twice (22:44, 22:47) with HTTP 500 at staging. API token route: container processed to FINISHED, but media_publish failed 3x with Graph API error 400 code -1 subcode 2207085 "Fatal". The blocker was the missing Page-IG link: the Page's instagram_business_account field was EMPTY until the owner connected IG theifmachinetv to the Page in Business Suite (23:17). After that, the first retry with the full caption published immediately. Lesson: for a new channel, the IG account must be connected to the Page in Business Suite before API publishing works.
- Caption (exact, no link per owner rule 22:49): "What if money just… disappeared? Tonight, every coin, every note, every number in every account: gone. Free doesn't remove cost, it moves it. 🕹️ Full run on YouTube, link in bio. #whatif #theifmachine #money #economics"
- Token route verified working: custom.meta-vietadvisor-su (system user "Vietadvisor API", Business Vietadvisor Media) sees all 4 Pages including The If Machine (Full access) and has instagram_content_publish. Helper: ~/workspace/ifm-staging/ifm-graph.py (verify / ig-reel / ig-media). The OLD Trum Deal token (custom.meta-graph-trumdeal) only sees Bup Phe + Trum Deal — do NOT use it for The If Machine.
- Config gaps found 05/11/2026: the Page's instagram_business_account field is EMPTY in the Graph API (IG theifmachinetv is not connected to the Page on the Page side), and the IG account shows "Nothing assigned yet" under the system user in Business Suite. Next steps: connect IG to the Page in Business Suite + assign the IG account to the system user, then retry; or post the first reel by hand from the IG app to warm the account; or retry tomorrow.
- Video public URL for the API (expires 2026-11-07 16:00 UTC): https://muse.ai/files/1359553073908259/29291574557174783/edf6jqx78ruh0xhqphscuszo/money-disappears_vertical_9x16_tiktok.mp4
- Standing rules from owner 05/11/2026: FB/IG captions carry NO links; FB/IG post via API token, never the Muse browser (forbidden); IG user id for the Graph API is 17841466058335444 (the fbid, NOT the instagram-cli user_igid 66123553944, which is not a valid Graph API node).
