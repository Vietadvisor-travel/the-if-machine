# Muse — FATHOM (phase 3): topics, research, and ALL resources (channel locked 15 Nov 2026: Fathom — brief/FATHOM.md)

The channel is now **How We Know** (brief/HOW_WE_KNOW.md): landscape 16:9, 8–12 min, English, made in Remotion. Each episode answers
one big real question ("How do we know how far the Moon is?") through 3–4 **clues**, re-animating the world on screen (Earth, sky,
machines, places), with now and then a **real photo, document or piece of footage**, treated to fit the look. One quiet music track
runs through the whole episode; sound effects are few and fitting.

**Owner's rule: Muse scans every resource.** Claude's container cannot reach NASA, Wikimedia, Pexels, LoC etc. — everything Claude
uses comes from Drive. Flow: Muse proposes topics → the owner picks → Muse writes the research pack + kit and uploads the stock →
`KIT_READY` → the owner tells Claude "làm tập …" → Claude makes it.

## 0. NOW, once: the core REALISM library — 2D ONLY (owner 15 Nov evening: "2D, không 3D; tài nguyên và stock thật")
The film is 2D. "Real" = real photos, real maps, real footage, used as flat images in the animated world (toned to the palette).
Drive `_hwk_core/` + `_hwk_core/index.json` (same fields as §3). All public domain (NASA/USGS/NOAA/LoC) unless noted.
| id | what | where | size |
|---|---|---|---|
| earth_photos | 10–15 real photos of the WHOLE Earth from space (Apollo 17 "Blue Marble", DSCOVR/EPIC, ISS), on black, centred | NASA (PD) | ≥ 3000 px |
| moon_photos | 8–10 real photos of the whole Moon (full, crescent, half) on black + 10 close-ups of the surface (Apollo, LRO) | NASA (PD) | ≥ 3000 px |
| planets_sun | real photos of Sun (SDO), Mars, Jupiter, Saturn, a few nebulae/galaxies (Hubble/JWST: check the PD/CC terms) | NASA/ESA | ≥ 3000 px |
| world_maps | flat real maps: Blue Marble (equirectangular), shaded relief (Natural Earth II), night lights (Black Marble) | NASA / naturalearthdata (PD) | 8192 wide |
| old_maps | 15–20 historic maps (world, continents, sea charts), clean scans | Library of Congress / David Rumsey (check licence) / Wikimedia PD | ≥ 4000 px |
| sky_photos | 20–30 real sky photos (night with stars, dawn, dusk, storm, clear blue), no people/logos | Pexels / Pixabay / Unsplash | ≥ 3000 px |
| ground_photos | 20–30 real terrain photos (desert, snow, rock, sea, field, forest, city aerial, top-down and low-angle) | Pexels / Pixabay / NASA aerial | ≥ 3000 px |
| textures | 15–20 paper / film / grain / dust / ink textures for the finish | Pexels / CC0 texture sites | ≥ 3000 px |
| footage_loops | 15–20 short real loops (clouds timelapse, ocean surface, stars rotating, city at night, rain on glass, fire) | Pexels / Pixabay video | 1080p+, 10–30 s |

## 1. Weekly shortlist (Saturday, `jobs/topics/`)
15 topics, each a question that starts with **How do we know / How did they …** and has a surprising, sourced answer. Three pools:
- **Measured & discovered** — how we know the age of the Earth, the distance to the Moon, the speed of light, what's inside the Earth,
  how old a mummy is, how big the universe is, how Eratosthenes-style reasoning works on a new subject (not Eratosthenes himself).
- **Impossible but true** — survivals and events that sound fake, explained step by step (how we know she fell 10 km and lived).
- **Mysteries with an answer** — historical puzzles solved by evidence (how we know what killed the Franklin expedition).
Score each 1–10 on: hook strength, how VISUAL it is (can the world be re-animated?), real stock available, 2 solid sources.

## 2. Research pack (`jobs/research/<slug>.md`, existing template, longer)
- 15–20 facts, each with 2 sources for anything heavy; exact numbers with their source; no invented numbers.
- Group the facts into **the question → clue 1..4 → the twist → the answer → what it means now**.
- For every clue: one sentence on *what we see* (the world scene that shows it).

## 3. Kit (`jobs/kits/<slug>.md`) — everything the viewer SEES or HEARS that is not drawn
| moment (clue / line) | real stock wanted | file on Drive `_hwk/<slug>/` | kind | licence + credit | ✅/❌ |
Kinds: `photo` (≥ 2000 px long side), `doc` (scan of a real document/page, ≥ 2000 px), `map` (historic or Natural Earth),
`video` (1080p+, 5–40 s, mp4 h264, no burnt-in text, no watermark), `sound` (sfx, see §5), `music` (§4).
- Target per episode: **20–40 stock items**, of which 6–12 will be used; prefer items that can sit INSIDE the world (a photo pinned in
  a scene, footage in a porthole/screen/lens, a document on a desk) over full-screen b-roll.
- Upload: `python3 studio/tools/pp_drive.py put <files> --to _hwk/<slug>` and a `stock.json` in the same folder:
  `[{ "file", "kind", "what", "date", "where", "people": "none|names", "source_url", "licence", "credit" }]`.
- Also add each reusable item to the shared library `_hwk_stock/<tag>/` (space, earth, ocean, polar, desert, labs, instruments,
  archives, maps, cities_old, aviation, ships, medicine, people_archival) with the same JSON fields in `_hwk_stock/<tag>/index.json`.
- ❌ rows say why (not found / licence wrong) — never fake a real document or photo, never AI images of real people or records.

## 4. Music — ONE track per episode
- Pick 1 instrumental track (≥ 4 min or loopable) that fits the episode's mood (mystery, wonder, tension, warm). Calm under a voice:
  no vocals, no busy drums, no ticking hi-hats. Name it in the kit (`music: _music/<file>`), from the library or new
  (CC0 / CC BY 4.0 with exact credit / Pixabay / YouTube Audio Library no-attribution).

## 5. Sound effects — few and fitting
- ≤ 1 effect per ~30 s on average, only for real events on screen (a laser fires, a door shuts, paper unfolds, a crowd gasps).
- List them in the kit with library ids (`_sfx/`); add missing ones as in MUSE_STOCK_LIBRARY.md.

## Sources and licences
- Allowed: **public domain** (NASA, NOAA, USGS, Library of Congress, US National Archives, Smithsonian Open Access CC0, Internet
  Archive Prelinger, Europeana PD), **CC0** (Pexels, Pixabay — their own licences are fine, Unsplash), **CC BY 4.0** with exact credit.
- Not allowed: CC BY-SA / NC / ND for anything baked into the video, Getty/AP/Reuters, news footage, YouTube rips, stock with
  watermarks, film/TV clips, anything whose licence is unclear.
- Real people: only in genuine archival photos/footage with an allowed licence, credited; no likeness re-creations.
- Git gets text only (kits, research, credits in `jobs/stock/ASSETS_CREDITS.md`); media only on Drive.

## Status
Research done → `RESEARCH_READY`; kit + stock uploaded + music named → `KIT_READY` (jobs/STATUS.md), with an INBOX line
`muse → claude · [kit] <slug> ready (N stock, music: <file>)`.
