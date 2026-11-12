# Muse task — Facebook market scan + our own numbers (owner, 12 Nov 2026)

Why: the owner wants the channel's direction decided by real data, not opinions. Claude cannot open Facebook from its cloud
session; Muse can. This task only READS and RECORDS. Do not post, edit, boost, follow, comment or change any setting.

## Part 1 — our own numbers (every published episode, every platform)
Episodes published so far: Nếu tiền biến mất (money-disappears), Trọng lực chỉ còn một nửa (gravity-half). Add any other
episode that is live.

For each episode × platform (Facebook, YouTube, TikTok, Instagram), write one row in
`jobs/research/_market/own_stats.csv` with these columns:

`episode, platform, url, posted_at, length_s, views, reach, avg_watch_s, retention_3s_pct, retention_50pct_pct,
completion_pct, likes, comments, shares, saves, follows_gained, top_countries (top 3 with %), top_age_groups (top 3 with %),
earnings_usd, earnings_per_1000_views_usd, notes`

- Take numbers from Meta Business Suite / Professional dashboard Insights (Facebook, Instagram), YouTube Studio and TikTok
  Studio. Leave a cell empty if the platform does not show it; never estimate.
- Facebook: also screenshot the retention curve of each video into `jobs/research/_market/img/` (png, small).
- Monetization: if the page shows approximate earnings or earnings per 1,000 views (Content Monetization), copy them exactly.

## Part 2 — what wins on Facebook now (last 90 days)
For each of these 4 niches, find the **15 best-performing videos posted in the last 90 days** on Facebook (videos and Reels,
English-language, aimed at a US/UK audience). Use Facebook search, the pages of the big players in each niche, and the
"Reels" / "Video" tabs.

1. **health / body** ("what happens to your body if…", sleep, sugar, heart, ageing, warning signs)
2. **science "what if"** (our current niche)
3. **real-life stories** (true events, survival, crime, human stories retold)
4. **history / mystery explained**

Make sure each niche includes BOTH styles where they exist: **animation** (2D/3D/AI-animated) and **real footage**
(news clips, stock footage, photos with narration, talking head). Aim for at least 5 of each style per niche.

One row per video in `jobs/research/_market/fb_scan.csv`:

`niche, page_name, page_followers, url, posted_at, length_s, orientation (vertical/horizontal/square), style (2D animation /
3D animation / AI video / real footage / stock + voice / talking head / mixed), narration (human voice / AI voice / none /
text only), on_screen_text (none / captions only / heavy), views, reactions, comments, shares, first_3_seconds (what you see
and hear, one sentence), hook_line (first spoken or written sentence, exact), structure (one line: how it unfolds),
emotion (awe / anxiety / anger / humour / warmth / curiosity), notes`

- Write `first_3_seconds` and `hook_line` carefully: they are the most useful columns.
- Record numbers exactly as Facebook shows them (e.g. "2.3M"); do not round or estimate.
- Skip reposted/stolen compilations and anything with another app's watermark.

## Part 3 — a short summary
`jobs/research/_market/SUMMARY.md`, ≤ 25 lines, in English: per niche the median views, which style (animation vs real
footage) has the higher median, the 3 strongest hook patterns, typical length, and anything surprising. Facts only, no
recommendations (Claude does the analysis).

## Deliver
Commit `[muse] market scan` (CSV, SUMMARY, small screenshots; no videos), push, add an INBOX line
`muse → claude · [market] scan ready`, and send the owner one Vietnamese line that it is done.
