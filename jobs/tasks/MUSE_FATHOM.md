# Muse — FATHOM: sourcing contract (owner, 15 Nov 2026). Read this page fully; it replaces every earlier Muse task for this channel.

## 0. LEAN RULE (owner, 16 Nov 2026) — OVERRIDES the depth targets below: only what the film needs, fast
The owner: Muse spends far too long per episode. From now on:
- **Fetch ONLY the rows in the order.** No neighbours, no `_alt/` extras, ONE best version per row. An order has **≤ 15 rows**.
- **Time box: about 1 hour per episode.** A row not found in ~10 minutes → ❌ with ONE line (where you looked), move on.
- **No music, no sfx, no data/text/geo** unless a row asks for it: Claude uses the existing music/sfx library and takes data from the research.
- **References (R):** 2–3 clear views per row, no more.
- **Proof:** `source_url` + `licence` + `credit` in manifest.json are enough. A screenshot proof only when the licence is NOT public domain/CC0.
- **Manifest fields:** id, file, what, source_url, licence, credit (+ `best` timecodes for footage). Nothing else is required.
- **Core library (§6): cancelled.** Do not build `_hwk_core/`.

**Muse's job is SOURCING ONLY ("việc tay chân": nguồn và tài nguyên).** Muse never decides content: no topics, no story, no script,
no facts chosen for the film, no opinions on style. **Claude** owns topics, research conclusions, script, shot plan, drawings, engine.
**The owner** picks topics and approves films. Muse fulfils Claude's **resource orders** exactly, generously, with proof and licences.

## 0b. Publishing schedule (owner, 19 Nov 2026)
4 films a week on YouTube + Facebook + TikTok: Tuesday, Thursday, Saturday, Sunday. Publish only a film the owner approved (still only on
"đăng tập <tên>"); if no approved film is ready for a day, skip the day — never publish a film below the bar to fill it.

## 1. The flow
1. Claude proposes topics → the owner picks.
2. Claude writes the research pack + script + shot plan, then a **resource order**: `jobs/orders/<slug>.md` (template `_TEMPLATE.md`),
   and an INBOX line `claude → muse · [order] <slug>`.
3. Muse fulfils EVERY row: finds, downloads, checks the licence, converts, names, uploads to Drive `_hwk/<slug>/`, fills
   `manifest.json`, marks each row ✅ (with the file) or ❌ (what was tried, the closest alternative found) in the order file.
4. INBOX line `muse → claude · [order] <slug> fulfilled (N ✅ / M ❌)`; STATUS research column → `KIT_READY`.
5. Claude builds. Extra needs during the build = a short follow-up order (same file, section "Round 2").
Muse may be asked for **source documents** for research (papers, book scans, archive pages) — fetch and upload them; do not summarise
them into conclusions.

## 2. What an order can ask for (all categories — dig deep, more than asked when it is the same subject)
| code | category | what Claude does with it | deliver as |
|---|---|---|---|
| P | **Photos** (archival and modern): people, places, instruments, objects, events | pinned plates, reveals, inside frames | JPG/PNG, long side ≥ 3000 px (≥ 2000 if nothing larger exists), uncropped original + no upscaling |
| D | **Documents**: manuscript pages, book pages, letters, notebooks, patents, newspaper clippings, original paper figures, data tables | DocumentPage with the key line circled | scan ≥ 2500 px long side, straight, whole page + a tight crop of the key passage; say the page/folio and where the key line is |
| M | **Maps and charts**: historic maps, sea charts, star charts, site plans | unrolled charts, routes | ≥ 4000 px; note projection/area/date |
| V | **Footage**: archival film, mission film, lab/observatory footage, nature loops | footage in an eyepiece / period screen / pinned frame | MP4 H.264, ≥ 1080p when it exists (else best), 5–60 s clips, original speed, no burnt-in text/watermark; give in/out timecodes of the best 5–15 s |
| A | **Audio — archival**: real recordings (mission audio, radio, speeches, instrument sounds, Morse, radar echoes) | heard under a scene | WAV 48 kHz (or original), with the exact segment timecodes |
| S | **Sound effects**: real recorded sounds of things on screen (quill, paper, brass click, sea, wind, laser hum, door, crowd…) | few, fitting | WAV 48 kHz, 2–4 takes each, clean start/end |
| U | **Music**: 3 candidate tracks per episode for ONE bed (calm, no vocals, no ticking percussion, ≥ 4 min or loopable) | Claude picks one | WAV/FLAC, with BPM and mood |
| R | **Reference** (never shown): photos/drawings/plans of an instrument, building, costume, ship, landscape, the real people's portraits (for costume/face, never copied), from several angles, so Claude DRAWS each film's own version correctly — every film draws its things new, so R rows are many and matter | drawing accuracy | any resolution; 3–8 views each; note dimensions, materials, colours when known |
| X | **Data**: numbers, tables, coordinates, dates, measurements from primary sources | diagrams at true proportion | CSV/JSON/MD with the source page |
| T | **Texts**: exact quotations with page/line, original-language + English | captions, plate captions | MD with full citation |
| G | **Geo**: coordinates, routes, positions, eclipse paths, star positions | maps and globes | GeoJSON/CSV |

## 3. Licences (strict)
- **Allowed:** public domain (NASA, NOAA, USGS, Library of Congress, US National Archives, Smithsonian Open Access, Internet Archive
  PD, Europeana PD, Wellcome PD, national libraries' PD scans), CC0, CC BY 4.0/3.0 (exact credit recorded), Pexels/Pixabay/Unsplash
  licences, YouTube Audio Library (no-attribution or exact attribution).
- **Not allowed:** CC BY-SA / NC / ND for anything shown or heard; Getty/AP/Reuters/Alamy; news broadcasts; film/TV; YouTube rips;
  watermarks; "personal use"; unclear status. **Reference (R) items are exempt** (never shown) but still record the source.
- Real people: only genuine archival photos/footage/audio under an allowed licence. Never AI images of real people, never a
  fabricated document. If a real item does not exist or is not allowed → ❌ with the reason; Claude will draw it instead.
- Every item gets a **proof**: a screenshot or saved copy of the source page showing the licence → `_hwk/<slug>/_proof/<id>.png`.

## 4. Naming, upload, manifest
- File name = the order's row id + a slug: `P-03_apollo11-lrrr-on-surface.jpg`, `V-02_project-diana-antenna.mp4`, `D-01_aristarchus-vat-gr-204-f116r.jpg`.
- Upload: `python3 studio/tools/pp_drive.py put <files> --to _hwk/<slug>` (subfolders: `_proof/`, `_ref/` for R items, `_alt/` for extras).
- `_hwk/<slug>/manifest.json` — one object per file:
  `{ "id": "P-03", "file", "kind": "P|D|M|V|A|S|U|R|X|T|G", "what", "date", "place", "creator", "people": ["names"]|[], "source_url",
     "source_name", "licence", "credit": "exact credit line", "proof": "_proof/P-03.png", "px": [w, h] | "dur_s", "best": "00:12–00:24" (V/A),
     "key_region": [x, y, w, h] in 0–1 (D: where the key passage is), "notes" }`
- Reusable items also go to the shared library `_hwk_core/<tag>/` with the same manifest fields in `_hwk_core/index.json`
  (tags: earth, moon, sun, planets, sky, sea, polar, desert, instruments, observatories, labs, ships, maps_old, charts, manuscripts,
  portraits_pd, textures, loops, sfx, music).
- Git gets text only: the order file with ✅/❌, and credits appended to `jobs/stock/ASSETS_CREDITS.md`. Never media in git.

## 5. Quality bar
- Find the BEST version: highest resolution, the original source (the archive, not a re-post), uncropped, no captions burnt in.
- When several good versions exist, upload up to 3 (`_alt/`) and say which is best and why.
- For every ordered item also look for **neighbours** Claude did not think of (the same event from another angle, the instrument's
  maker's drawing, the page before/after) → `_alt/` with manifest rows id `<row>-x1…`.
- (cancelled 16 Nov — see §0) depth targets; fetch only the order's rows.
- ❌ rows: list the searches made (sites, terms) and the nearest allowed substitute. Never deliver something "similar" under the
  ordered id without saying so.

## 6. Core library (standing order, do once then keep growing) — Drive `_hwk_core/`
Real whole-disc photos of Earth and Moon; Sun (SDO); planets; flat world maps (Blue Marble, relief, night lights); 20+ historic maps
and sea charts; star charts; sky and terrain photos; paper/ink/film textures; short real loops (clouds, sea, stars, candle, rain);
SFX families for the style (quill, paper, page turn, brass, clockwork, sea, wind, chalk, lab hum, radio static, laser); 20 calm music
beds (wonder, mystery, tension, warm). All with manifest rows.

## 7. Antique engravings (owner order, 17 Nov 2026 — from the next episode on)
Besides the order's rows, every film needs 4–8 public-domain antique engravings or plates (18th–19th c. books, journals, prints; Wikimedia Commons Public domain/PD/CC0, Internet Archive, Biodiversity Heritage Library, national-library scans) showing the film's places, instruments, people at work or period interiors. Large scans (≥ 2000 px), clean paper. Put them in Drive `_hwk/<slug>/_pd/` with one line each in the manifest: file · title · artist · year · licence · source URL. Never CC-BY-SA, NC or unknown licence. Claude's order names the subjects (section "Engravings").

## v8 — references Claude can TRACE (17 Nov 2026)
For every R (reference) row, put first any view that is Public domain / CC0 (an old plate, a patent drawing, a museum's CC0 photo on a plain
ground, a NASA/USGS photo): Claude traces true geometry only from those (`tools/trace.py`); CC BY-SA / NC / unknown references stay "look only".
Mark each R file's licence in the manifest as before.
