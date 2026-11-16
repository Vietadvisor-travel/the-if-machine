# FATHOM — the signature style (locked by the owner, 15 Nov 2026): a HAND-COLOURED ENGRAVING, alive

Every frame looks like a page of an old scientific atlas that was engraved in sepia ink, coloured by hand with gouache, printed on laid
paper, and then came to life. One style for everything: places, people, instruments, maps, diagrams, real stock, brand.

## 1. The five layers of every drawn thing (bottom → top)
1. **Paper** — warm laid paper `#F3E7CC`, horizontal fibres, a few foxing spots, soft warm vignette. Under EVERYTHING, always.
2. **Wash** — gouache pigment from the palette (§2), laid a little OFF the line (offset ≈ 2.4 px right, 1.6 px up at 1080p), its edge
   softly irregular (watercolour displacement) and POOLED darker at the rim. Never a flat vector fill.
3. **Hatching** — fine sepia lines in the shade only, FOLLOWING THE FORM: horizontal on water, along the length on columns and
   trunks, curved (contour) on spheres, crossed in the deepest shade. Tone 0–0.5 no hatch · 0.5–0.72 single · > 0.72 crossed.
4. **Ink line** — sepia `#2B1D12`, a SWELLING line: a thin crisp line plus a heavier echo on the shadow side (down-left). Outlines,
   folds, rims; detail lines are thinner than outlines. Coastlines only — never political borders.
5. **Gold leaf** — the only metallic: sun, brass instruments, the brand, the one key thing in a frame. Metallic gradient with sheen.

## 2. Palette — pigments, each a ramp lit → mid → deep
| pigment | lit | mid | deep | for |
|---|---|---|---|---|
| Prussian blue | #9CCAD6 | #4A88AE | #22507A | sea, sky depth, night |
| Verdigris | #A9C08A | #5F8A5A | #2F5440 | land, foliage |
| Yellow ochre | #F0D9A8 | #D9AE6C | #A8743E | sand, desert, parchment things |
| Burnt sienna | #C99A6A | #8C5A36 | #4F3020 | wood, earth, leather |
| Vermilion | #F2A672 | #D2643E | #8C3424 | heat, mantle, the one red mark |
| Stone | #EFE0C2 | #C9AE84 | #8C6E4A | buildings, rock |
| Night | #5A6E9A | #2B3B66 | #141C38 | night skies, space (with stipple) |
| Gold leaf | #F7E3A0 → #D9AE4C → #F3D88E → #B8862B | | | sun, brass, brand |
| Ink | #2B1D12 (sepia) | | | lines, hatching, stipple |

## 3. Light and depth
One key light per scene (sun, candle, lamp), warm; shade side away from it (hatching + deeper wash + heavier line). Glow = a soft wash
bloom, never a neon glare. Depth: farther layers lighter and cooler in wash, thinner lines, less hatching (aerial perspective).
Skies: graded wash + stipple dots denser toward the top (day) or everywhere (night); stars = tiny inked dots with a paper-white core.

## 4. Drawing quality bar (the owner: "cực xịn, chỉn chu — never cheap shapes")
- Every object is drawn with its real construction: an obelisk has its pyramidion, hieroglyph bands and plinth; a temple has columns,
  capitals, lintel, shadow between columns; a person has a face (profile or 3/4: nose, brow, eye), hands, garment folds, a pose with weight.
- The Earth is the real Earth: Natural Earth coastlines, land coloured by climate (ice, tundra, forest, grassland, desert, rainforest),
  sea darker away from the coast, clouds as engraved-and-washed cloud bands, contour-hatched night side, a thin atmosphere wash.
- Never: plain circles with blobs, geometric placeholders, emoji, flat UI icons, gradients without line, neon.

## 5. Motion (the style comes alive)
- **Line boil**: lines and wash edges shift slightly 8 times a second (displacement seed steps) — a living engraving, very subtle.
- **Ink-on**: new things are DRAWN — the ink line traces in (stroke reveal), then the wash blooms in from the line, then the hatching.
- **Wash bloom**: colour spreads like water into paper when something becomes important.
- **Transformations** (no cuts): window (a point opens as an inked circle into the next place) · ride (the camera follows a moving
  thing) · scale jump · morph (a drawn form becomes another) · page-turn of the same paper · real reveal (a drawing gives way to its real
  photo/footage in the same frame, toned to the palette).
- Camera: slow, eased, with parallax between paper layers; no shakes, no flashes.

## 6. Real stock inside the style
Real photos, documents and footage are ARTEFACTS in the scene: pinned with a red pin or taped, held in a hand, lying on the desk, in a
telescope eyepiece, on a period screen, as a plate in the atlas with an italic caption. Toned warm (sepia/duotone to the palette),
paper border, cast shadow, the same paper texture over them. Never a full-screen background.

## 7. Type
Brand: Fraunces (700 wordmark, end card, thumbnails). IN-SCENE TYPE (no subtitles, owner 15 Nov 2026): IM Fell English (roman + italic: plates, labels, gold figures), IM Fell English SC (titles, the clue tag, stamps), Pinyon Script (handwritten notes) — `src/kit/SceneText.tsx`. (Old: Inter 600 for subtitles (cream with soft
dark halo on dark scenes, sepia on paper) · Space Mono only for clue tags. No other fonts.

## 8. Brand (files: `howweknow/brand/`, rendered PNGs on Drive `brand/`)
Mark: the SOUNDING LINE — a line with fathom marks and a gold lead weight, dropping through engraved water rings (to fathom = to
measure the depth / to understand fully). Wordmark: FATHOM, Fraunces 700, tracking 0.25 em, a gold rule under it.
Tagline: "How we came to know the world."

## True to life (owner 17 Nov 2026: "cố vẽ lại chính xác ngoài đời hơn nữa… nhiều hình hơi khó hiểu")
- **Reference first.** Every real object, instrument, building and person is drawn FROM its reference image(s) (Muse's R rows): the
  silhouette, the proportions and 3–5 telling details (how it is built, what it is made of, how it works) must match. Put the
  reference beside the drawing (`python3 tools/refsheet.py <slug>`) and fix until a stranger would say "that is the same thing".
- **Show how it works.** A mechanism is drawn so its working parts are visible and MOVE (the wire twists, the needle writes, the drum
  turns) — cut-aways and exploded views beat symbols. Never a generic icon (a rectangle "tank", a plain disc "ball") where the real
  thing has a look.
- **Scale and place.** A human, a hand or a known object in the picture whenever size matters; ground lines and cast shadows so
  nothing floats; consistent light from the upper right.
- **Readable in one second.** Subject ≥ 1/3 of the frame height; strong figure/ground contrast; one focus (largest, lit, or moving);
  everything that is not the subject is quieter (lighter line, less colour). Check each scene as a 320-px thumbnail.
- **People act.** A figure always DOES the thing the line says (turns the screw, lifts the record, points, writes) with a pose
  sequence — never stands as a label.
