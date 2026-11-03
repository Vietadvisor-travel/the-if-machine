# Muse — build the big stock library (from the owner, 3 Nov 2026: "the more the better")

The engine now loads new packs automatically:
- new music zips go through `music_lib.py import-muse`;
- new SFX families in `ifm_sfx_*.zip` register themselves as `ifm_<family>`;
- SVG icon packs go through `tools/icons.py`.

So every good, safe file you add becomes usable in the next episode. Keep the same rules as before.

## Rules (all tasks)
- **Allowed licences only:** CC0, public domain, CC BY 4.0 (exact credit line recorded), MIT / ISC / OFL / Apache-2.0
  (code-like assets, icons and fonts), Pixabay Content License, YouTube Audio Library (no-attribution tracks, or the
  attribution text copied exactly).
- **Not allowed:** NC, ND, share-alike (CC BY-SA) for anything baked into the video, "personal use only", AI-generated
  packs whose licence forbids commercial use, ripped game or film assets, anything with a logo or a real person's likeness.
- **Upload only with** `python3 studio/tools/pp_drive.py put <files> --to <folder>`. Claude's key sees nothing else.
- **Git gets the lists only:** `jobs/music/CREDITS.md`, `jobs/music/SFX_CREDITS.md`, `jobs/stock/ASSETS_CREDITS.md`
  (new file). Never media.
- **Name every file** `<mood-or-category>_<what>_<n>`, lowercase. Zips ≤ 90 MB each. Each zip has a JSON index inside
  (`library.json`, `sfx.json`, `assets.json`) with: file, category or moods, licence, credit, source_url.

## 1. Music (Drive `_music/`, zips `ifm_music_4.zip` …)
- Target: **+60 tracks**, total ≥ 90, at least 8 per mood:
  `curious wonder momentum tension comedy warm tech epic`
  (plus `space`, `retro`, `lofi`, `orchestral-light` if you find good ones).
- Prefer instrumental, 2–4 min, clean loops or clear sections. Avoid heavy sub-bass: phones lose it (the QA flags it).
- Sources:
  - YouTube Audio Library;
  - Pixabay Music (via a real browser if the page blocks reading);
  - Kevin MacLeod / incompetech (CC BY);
  - Free Music Archive (CC BY / CC0 only);
  - Musopen (public-domain classical recordings, check the recording licence too);
  - OpenGameArt music (CC0 / CC BY only).
- Add `"bpm"` and `"energy": low|mid|high` when you can. Claude's mixer uses energy to match calm vs fast scenes.

## 2. Sound effects (Drive `_sfx/`, zips `ifm_sfx_2.zip` …)
- Target: **+300 sounds**, total ≥ 375. Families of 2–5 takes each (`whoosh_air_1..4`), so nothing repeats exactly.
- Must-have families:
  - **transitions:** whooshes (thin, airy, deep, metallic), swishes, risers 1/2/4 s, downers, reverse hits,
    tape stop, glitch cuts, page turns;
  - **impacts:** soft, punchy, heavy, metal, wood, glass, cardboard, cartoon boing, bass drop, sub hit;
  - **UI and machine:** clicks, toggles, relays, servo motors, keyboard bursts, printers, scanners, beeps, alarms, error buzz, radar, sonar;
  - **sci-fi:** hologram, teleport, power up/down, laser, force field, data stream, robot movement;
  - **nature and world:** rain (light/heavy), wind, thunder, ocean, forest, birds, crickets, city day/night, traffic, crowd (small/large/cheer/gasp/laugh), office, cafe, airport, subway, kitchen, hospital beeps, heartbeat, breathing, footsteps (surfaces), doors, clocks;
  - **animals:** dog, cat, horse, birds, whale, dinosaur roar (designed), insects;
  - **musical stings:** reveal, twist, comedy, fail, success, suspense hit, magic sparkle.
- Sources: Freesound (CC0 filter ON), Sonniss GDC bundles (royalty-free licence text saved), Pixabay Sound Effects,
  OpenGameArt (CC0), BBC Sound Effects only where the licence allows commercial use (it usually does NOT; skip if unsure),
  Kenney audio packs (CC0).

## 3. Visual stock for a canvas engine (Drive `_assets/`, zips `ifm_assets_1.zip` …)
The engine draws everything in code, so we want **vector building blocks**, not photos or footage.
- **SVG icon packs** (one zip per pack, the original SVG folder kept):
  - Phosphor (MIT), Lucide (ISC), Iconoir (MIT), Remix Icon (Apache-2.0), Material Symbols (Apache-2.0), Bootstrap Icons (MIT);
  - Tabler (MIT) is already in.
  Claude turns each pack into `IFM.icon('<pack>:<name>')`.
- **CC0 vector illustrations and shapes** (SVG only): Kenney (CC0) packs with flat shapes, game objects, map tiles, vehicles,
  animals, space; OpenGameArt CC0 SVG; Wikimedia Commons public-domain SVG (no logos, no flags with restrictions, no real people).
- **Textures** (CC0, PNG ≤ 2048 px): paper, grain, noise, halftone, scratches, light leaks, bokeh, grunge
  (ambientCG, Poly Haven, Kenney). Used as subtle overlays only.
- **Lottie animations** only with a licence that allows commercial use and modification (LottieFiles "Lottie Simple
  License" files, or CC0). Record the author. Claude decides if a player is added.
- **Fonts** (OFL only), display faces with personality for kinetic text: 10–15 families (Google Fonts download is fine).
  List them; Claude installs them with npm @fontsource.
- **Data** for maps and charts: Natural Earth (public domain) 10 m and 50 m countries, rivers, lakes, populated places
  (GeoJSON).

## 4. A reference reel for directing (git: `jobs/research/_DIRECTING_REFERENCES.md`)
- **30 timestamps** from great explainer, motion-design and kinetic-typography videos. Each one names the technique in words,
  the second it happens, why it works, and how we could do it in our own look:
  - camera: push-in to a detail, whip, scale jump, rack focus;
  - text: counter, scramble, stamp, highlight, split, 3D extrude;
  - transitions: match cut, zoom-through, shatter, ink;
  - sound: hit on the cut, silence before the reveal.
- Include motion-design channels and award reels (Motionographer, School of Motion, Kurzgesagt behind-the-scenes, Vox
  explainers, Buck, Oddfellows).
- We learn the technique. We never copy a look.

## 5. When done
- One INBOX line per finished part: what, where, how many files, licences, any doubt.
- Commit `[muse] [stock] …`.
- Tell the owner in Vietnamese, in a few lines.
- Keep adding every week: aim for +20 music tracks, +100 SFX and 1 new icon or illustration pack per week until told to stop.
