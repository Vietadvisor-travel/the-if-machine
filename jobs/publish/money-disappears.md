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
- Still to do (owner, in YouTube Studio): add custom thumbnail (user makes thumbnails); add and pin the comment "The machine has spoken. Now it's your turn: what should it run next? 🕹️" (API scopes do not cover comments)

## TikTok
- Video: https://www.tiktok.com/@theifmachinetv/video/7704714516843531526
- Published: 2026-11-05 22:49 +07 via Muse browser in TikTok Studio, public (privacy Everyone; the upload first saved as Only me, fixed in Studio Content settings, 'privacy settings updated' confirmed)
- File used: 33 MB CRF 28 re-encode (the 488 MB master exceeds the browser file-grant size limit)
- Caption (exact, verified on the video page): "What if money just… disappeared? Tonight, every coin, every note, every number in every account: gone. Free doesn't remove cost, it moves it. 🕹️ #whatif #theifmachine #money #economics"
- Note: Studio status 'under review' right after posting (normal TikTok moderation for new content); the video plays on the public URL.

## Facebook
- Blocked: Page login dead / security warning (06/10/2026). Not posted.

## Instagram
- BLOCKED, not posted. CLI failed twice (22:44, 22:47): "stage Instagram reel_with_feed media — instagram media upload failed with HTTP 500 Internal Server Error". Verified 0 posts, no duplicate.
- API token route (23:05-23:09): container created and processed to FINISHED twice, but media_publish failed all 3 attempts with Graph API error 400 code -1 subcode 2207085 "Fatal" ("internal server error, try again later") — Instagram's anti-spam filter, per Meta docs/community. Attempt 1: full caption. Attempt 2: retry same container. Attempt 3: new container, caption without hashtags. Same error every time, so the caption is not the trigger. Likely cause: brand-new IG account (2 days old, 0 posts) publishing its first post via API.
- Caption (exact, no link per owner rule 22:49): "What if money just… disappeared? Tonight, every coin, every note, every number in every account: gone. Free doesn't remove cost, it moves it. 🕹️ Full run on YouTube, link in bio. #whatif #theifmachine #money #economics"
- Token route verified working: custom.meta-vietadvisor-su (system user "Vietadvisor API", Business Vietadvisor Media) sees all 4 Pages including The If Machine (Full access) and has instagram_content_publish. Helper: ~/workspace/ifm-staging/ifm-graph.py (verify / ig-reel / ig-media). The OLD Trum Deal token (custom.meta-graph-trumdeal) only sees Bup Phe + Trum Deal — do NOT use it for The If Machine.
- Config gaps found 05/11/2026: the Page's instagram_business_account field is EMPTY in the Graph API (IG theifmachinetv is not connected to the Page on the Page side), and the IG account shows "Nothing assigned yet" under the system user in Business Suite. Next steps: connect IG to the Page in Business Suite + assign the IG account to the system user, then retry; or post the first reel by hand from the IG app to warm the account; or retry tomorrow.
- Video public URL for the API (expires 2026-11-07 16:00 UTC): https://muse.ai/files/1359553073908259/29291574557174783/edf6jqx78ruh0xhqphscuszo/money-disappears_vertical_9x16_tiktok.mp4
- Standing rules from owner 05/11/2026: FB/IG captions carry NO links; FB/IG post via API token, never the Muse browser (forbidden); IG user id for the Graph API is 17841466058335444 (the fbid, NOT the instagram-cli user_igid 66123553944, which is not a valid Graph API node).
