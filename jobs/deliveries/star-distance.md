# Delivery — Các vì sao xa đến đâu (star-distance) · FATHOM film · v1 · 17 Nov 2026

## Files (Drive fathom/star-distance/ · https://drive.google.com/drive/folders/1_m9Cj5qLSrwt35HKMDhHHny1El7J3e5u)
- star-distance_16x9.mp4 · 545 MB (v1.1, 18 Nov: two-pass re-encode of the CRF-17 master to the owner's 5–600 MB, PSNR 41.7 dB vs CRF 17, no visible difference) · 8:44 · 1920×1080
- star-distance_thumb.jpg (YouTube 1280×720, standard poster) · star-distance_cover_9x16.jpg (Instagram/TikTok cover) · star-distance.srt (optional CC, not burned in)

## Production
- Engine v7, directed: chain of 42 transformations (jobs/scripts/star-distance_chain.md) → director's treatment (…_treatment.md, gate PASS) → 72-line
  script planned to the frame at standard 6 (reads · focus · becomes · acts · mood · shot · light; jobs/scripts/star-distance.md, concepts in …_concepts.md).
- Governing image: the parallax blink — your thumb jumps when you blink, and the same jump measures the stars. Motif: the circle of the lens
  (the eye → the eyepiece → the January/July fields → Leavitt's loupe → the dome → Gaia's shield → the eye again). Bookends: the thumb at the
  night window, and a child at the same window at the end.
- 40 drawings made for this film (src/lib/star-distance/), among them the Königsberg heliometer drawn from R-02 (mahogany tube, brass head,
  the divided objective), Bessel's dome, the Harvard plate room with its plate stands (R-01), the 100-inch on its yoke, Hubble's light table and
  plate H335H, Gaia (from the reference render), a star cabinet, the bobbin of light, the paper boat on a sea of stars, the rising loaf.
- Drawn TRUE to the data: Leavitt's graph plots the 25 Cepheids of HCO Circular 173, Table I (X-01) with the least-squares line; Hubble's
  diagram plots the 24 nebulae of PNAS 1929, Table 1 (X-02).
- New to the channel: `breathe` (Cepheids that swell and fade, the brightest slowest) · `parallax` (two eyepiece fields overlaid like tracing
  paper) · a scale-dive INTO an angle (1° → 60′ → 60″, until one second of arc is a hair) · a pen hand for the inserts.
- Voice: af_heart (Kokoro, Apache-2.0), 0.86, plain read — machine-generated narration.
- Score by measurement (tools/score.py), 5 cues, one per part: Kevin MacLeod (incompetech.com), CC BY 4.0 — "Floating Cities", "Dreamer",
  "Anamalie", "Montauk Point", "Gregorian Chant". The music drops away under the three held breaths (the hair-width shift, VAR!, the
  Milky Way shrinking). FreePD "Study and Relax" is now blocked in the planner (it drew a Content ID claim on empty-atom).
- Sound: Muse kit (CC0: clock tick, glass plate slide, pen scribble, dome motor) + the studio library.
- Gates: script_check PASS · check_world PASS · variety PASS · plan_check PASS (33 kinds of becoming) · still_check PASS (0 s dead) ·
  treatment_check PASS · full render 15,722 frames on the render farm (20 chunks, every one pixel-checked ≥ 61 dB overall / ≥ 37 dB detail) — 37 min including packing and joining (4.2 s per film second) · mix −16 LUFS · QA sheet looked at

## Facts (jobs/research/star-distance.md)
- Parallax: a near star shifts against far ones as the Earth moves; under one arcsecond for every star — S1, S2
- 1838, Königsberg: Bessel, 61 Cygni, about a third of a second of arc (0.3136″, the real page shown, D-02) → about 10 light-years (modern 11.4) — S1, S2, S3
- Almost at the same time: Alpha Centauri (Henderson, the Cape) and Vega (Struve, Dorpat, in the Russian Empire) — S2, S4
- 0.314″ = a 2-cm coin seen from about 13 km (calculation from F2)
- Harvard hired women to measure the plates; Leavitt's plates came from Arequipa, Peru — S5, S6 · she died in 1921 — S5
- 1912, HCO Circular 173: 25 Cepheids in the Small Magellanic Cloud, longer period = brighter; signed by the director, "prepared by Miss Leavitt" (real page shown, D-01) — S5, S6, S7
- 26 April 1920, the debate in Washington (Shapley, Curtis), no winner — S8, S9
- October 1923, Mount Wilson's 100-inch: plate H335H, "N" struck through, "VAR!" (the real plate shown, P-01) — S8, S10, S11
- 1927 Lemaître, 1929 Hubble: the farther, the faster away — S12, S13
- Gaia: parallaxes for about 1.47 billion stars (EDR3) — S14

## Real stock used (Drive _hwk/star-distance/)
| file | what | licence | credit |
|---|---|---|---|
| P-05 | Friedrich Bessel (Herterich, 1825) | public domain | — |
| P-02 | Henrietta Swan Leavitt (portrait) | public domain | — |
| P-04-x1 / P-04 | Hubble at the eyepiece (1922) · the 100-inch dome (1917) | public domain | — |
| P-06 | 61 Cygni (DSS2 POSS-II) | public domain | STScI Digitized Sky Survey |
| P-11 | Boyden Station, Arequipa (Popular Science Monthly, 1904) | public domain | — |
| P-08 | Small Magellanic Cloud (VISTA) | CC BY 4.0 | ESO/VISTA VMC |
| P-03 | Harvard plate B20678 with Leavitt's annotations | public domain | Harvard Plate Stacks |
| P-09 / P-09-x1 | Harlow Shapley · Heber Curtis (1918) | public domain | — |
| P-01 | Hubble's plate H335H ("VAR!") | public domain | Carnegie Observatories |
| P-07 | Andromeda, Hubble mosaic (2025) | public domain | NASA/ESA |
| D-01 | Leavitt & Pickering 1912, HCO Circular 173, pp. 1–2 | public domain | ADS |
| D-02 + crop | Bessel 1838, Astronomische Nachrichten, the 0.3136″ passage | public domain | Internet Archive |
| D-04-crop | Hubble 1929, PNAS, the velocity–distance graph | public domain | Internet Archive |
| D-05 | Lemaître 1927, Annales de la Société Scientifique de Bruxelles, p. 49 | public domain | ADS |
| Engravings | Bayer, Uranometria (1603), Cygnus · Ball, The Story of the Heavens (1891), fig. 80 · Harvard College Observatory in 1847 (Annals HCO 1850) | public domain | jobs/stock_pd/star-distance.md |

## Honest notes
- The people are drawn reenactments (costume and period from their photographs), not likenesses. Real photographs are shown as pinned prints.
- 61 Cygni's place on Bayer's 1603 plate is marked by our ring (Bayer did not label it). The coin, the bobbin, the paper boat, the candle road,
  the train and the rising loaf are the film's own comparisons. The parallax shift and the coin are enlarged so they can be seen.
- Hubble's "N" is drawn beside the new point as on H335H; the drawn plate gives way to the real one in place.
- Not used: V-02 Mount Wilson footage (its distributor's watermark), the ESA Gaia images (CC BY-SA, banned; Gaia is drawn from _ref).

## Critic pass
- Pass 1 (fresh critic, 4 keyframes + 72 stills): keyframes 4–7/10. Fixed before the master: people put AT their instruments (Bessel's eye on the
  eyepiece and hand on the micrometer; Leavitt and the Harvard women at their plate stands, hair up, long dresses), a pen hand that writes N, strikes it
  and writes VAR!, older plates fanned with the star big/small/big, three lit windows at the end, more named light, galaxies redrawn, stray red specks
  removed (a bug in the shared Mark tool, fixed for every film), cut-off titles moved into frame.
- Pass 2 (fresh critic, the animatic): invention 7 · style 6 · drawing 5 · light & depth 4 · composition 7 · acting 4 · rhythm 6; keyframes 4–8.
  Strongest: the star cabinet, Bessel's page folding into a paper boat, the breathing stars in Leavitt's loupe → ruler of light → candle, the "!" that
  becomes a star and the ruler laid to Andromeda, the bookend in the window. NOT YET AT THE 8/10 BAR on drawing, light and acting: the people are still
  the shared Person rig (mannequin-like, no close-up faces for Leavitt), few scenes have a visible key light with cast shadows, the spectrum/train/
  Gaia read as flat vector. Proposed v2 (owner's call): Leavitt close-up beats, a lamp and shadows in every interior, engraved locomotive and spectrum.

## For Muse
- Title options: 1) How Far Away Are the Stars? The Blink That Measured the Universe 2) One Blink, One Plate, One Word: How We Measured the Stars
  3) How a Thumb, a Glass Plate and "VAR!" Revealed the Size of the Universe
- Description credits: music (above), P-08 (ESO, CC BY 4.0), public-domain photographs, papers and engravings (table above).
- Post only after the owner says "đăng tập Các vì sao xa đến đâu".
