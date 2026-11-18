# Delivery — Thứ gì đã giết khủng long? (dinosaur-killer) · FATHOM film · v2.1 · 18 Nov 2026 (v1 rejected by the owner; remade; v2.1 approved by the owner)

## Files (Drive fathom/dinosaur-killer/ · https://drive.google.com/drive/folders/1HMakPe2QNDBQaPLvIC7yztO1VMUNet53)
- dinosaur-killer_16x9.mp4 · 544 MB (v2.1, replaces v1) · 8:27 · 1920×1080 (fitted to the owner's 5–600 MB by tools/fit.py)
- dinosaur-killer_thumb.jpg (YouTube 1280×720, standard poster) · dinosaur-killer_cover_9x16.jpg · dinosaur-killer.srt (optional CC, not burned in)

## v2.2 sound (18 Nov 2026, owner: "nhạc vẫn to quá… nhạc vui tươi, không phải bí ẩn… thêm hiệu ứng âm thanh")
- Picture unchanged; remixed and remuxed. Score now mysterious, one cue per part, about 6 dB quieter: Kevin MacLeod (incompetech.com), CC BY 4.0 —
  "Lightless Dawn", "Hidden Agenda", "Aftermath", "Darkness is Coming", "Silver Blue Light". 73 quiet sound effects on the actions (≤ −24 dB,
  ≥ 1.2 s apart, 8.6/min). Gate tools/sound_check.py PASS. The master on Drive was replaced (544 MB).

## v2 remake (18 Nov 2026)
- Owner rejected v1: static scenes, repeated transitions/camera, title off-centre. v2 rebuilt every line from chain v2: an action at least every
  2.5 s (tools/event_check.py: 18 events per 10 s), one named camera move per line (19 kinds, none on > 12 % of lines), 49 kinds of
  transformation, the title screen-locked, no on-screen chyron. New in the drawings: the rex walks in, drinks, lifts its head, a point of
  light in its eye; ash turns to bones; the old book's plates come alive and tear; a pocket watch rises from the 1830 sea; a living plankton
  page; the hourglass of clay; the needle through a parting roof; a saw through a meteorite; the plane draws the ring; the seats empty; days
  and nights over the shelf; the half-ring lifts off the report; the impact through the museum window; a sparrow lands on the skull.
- Fresh critic (fathom-critic agent): keyframes v2 3–5/10, animatic v2 3–5/10 (jobs/critic/dinosaur-killer.json); motion/variety/invention
  fixes applied in v2.1; drawing/light stayed at the house level the owner accepts ("tập này ok"). Render: farm, 28 min; fit 1743 → 544 MB.

## Production
- Engine v8 + the new v9 ANATOMY (owner, 18 Nov: "con vật, bộ phận người… sơ sài, không giống… nâng cấp"): chain → treatment (gate PASS) →
  64-line script at standard 6 (1,253 words, voice 8 min 27 s).
- Governing image: the thin line of clay in the rock — the last day of a world, one centimetre thick. Motif: the LINE (clay band → the iridium
  needle → the half-ring of the survey → the snapped food chain → the four relics joined by one line). Bookends: the theropod at its last dusk /
  the same animal as a skeleton at dawn, a sparrow flying up out of it.
- 33 drawings made for this film (src/lib/dinosaur-killer/). Built on the new anatomy engine: the Tyrannosaurus (proportions of the AMNH 1913
  restoration — level back, short S-neck, deep skull, tiny arms, huge thighs; it breathes, sways its tail, lifts its head, opens its jaw) and its
  mounted skeleton; a male house sparrow (plumage map, separate feathers); the burrow's small mammals (breathing, sniffing, the young asleep);
  Walter's hand on the clay and every person's hands (Gray's proportions).
- New devices (FX.md §K): RockBook (strata open like a book) · IridiumMeter (the needle bends on its stop and grows up through the roof) ·
  ShockedGrain (shock lamellae etch in, then the grain cracks and shatters) · SurveyRing (the survey's passes draw half a ring; the sea half closes it).
- Gates: script_check · check_world · variety · plan_check · still_check (0 s dead) · treatment_check · novelty (14 ways in, 13 ways out, all
  under 35 %; nothing the last two films leaned on) — all PASS. Full render on the farm (20 chunks, 99 dB checks) — 31 min (3.6 s per film second), fitted 1605 → 544 MB. Animatic → self-critic pass (framing, legibility, a blank stretch removed).
- Voice af_heart (Kokoro, Apache-2.0), plain read — machine-generated narration. Score by measurement, 4 cues: Kevin MacLeod (incompetech.com),
  CC BY 4.0 — "Dreamer", "Floating Cities", "Anamalie", "Burt's Requiem". Held breaths under the blank page, the needle and the impact.

## Facts (jobs/research/dinosaur-killer.md)
- Gubbio: a thin clay layer (≈ 1 cm) at the boundary; tiny fossils below, almost none above — F1
- Walter (geologist) and Luis Alvarez (Nobel physicist) used iridium to time the clay and found far too much ("dozens of times") — F2
- 1980, Science: Alvarez, Alvarez, Asaro, Michel — an asteroid about 10 km across — F3
- The layer worldwide; shocked quartz — F4
- 1978 Pemex geophysicists Penfield and Camargo found a buried ring on the Yucatán coast; presented 1981, little notice — F5
- 1990–91 Hildebrand; old drill cores with shocked minerals; named Chicxulub (about 180 km) — F6
- about 66 million years ago (F8) · about three-quarters of species gone (F9) · impact winter (F10) · small mammals survived; birds are dinosaurs (F11)

## Real stock (Drive _hwk/dinosaur-killer/)
| file | what | licence | credit |
|---|---|---|---|
| R-01-x1 | Walter Alvarez with Mark Anders and David Bice at Gubbio (captioned "The Alvarez team at Gubbio") | public domain | University of California, Berkeley |
| P-02 | Luis and Walter Alvarez at Gubbio | public domain | Lawrence Berkeley Laboratory |
| P-01 | the K–Pg boundary outcrop, Gubbio | CC BY 4.0 | Biandh, via Wikimedia Commons |
| P-03 | shocked quartz grain, cross-polarised light | public domain | Glen A. Izett, USGS |
| M-01 | the Chicxulub ring, SRTM relief + Landsat | public domain | NASA/JPL-Caltech |
| Engravings | Hawkins's Sydenham studio (photograph, Philip Henry Delamotte, 1853, cut to ink) · Duria Antiquior (1830) · Lyell, Manual of Elementary Geology (1852) · Catherwood, Uxmal (1844) | public domain | jobs/stock_pd/dinosaur-killer.md |

## Honest notes
- People are drawn reenactments (costume and period), not likenesses; real photographs are shown as pinned prints.
- P-03 is a USGS shocked-quartz micrograph shown as "shocked quartz", not claimed as a grain from Chicxulub itself.
- The hourglass, the dust shelf, the stone book, the food chain and the meter are the film's own comparisons.
- Research facts F8–F11 were added at production from the pack's sources (S2, S6) without a fresh web check (Wikipedia/NHM blocked here).

## For Muse
- Title options: 1) What Killed the Dinosaurs? One Centimetre of Clay 2) The Report Nobody Read: How We Found the Dinosaur Killer
  3) A Line in the Rock, a Needle off the Scale: Solving the Dinosaur Mystery
- Description credits: music (above), P-01 (Biandh, CC BY 4.0), public-domain photographs and engravings (table above).
- Post only after the owner says "đăng tập Thứ gì đã giết khủng long?".
