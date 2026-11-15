# FATHOM — effects vocabulary (owner, 15 Nov 2026: "vô cùng đa dạng và sáng tạo, phù hợp — không lặp đi lặp lại vài cái")

Every line of a film names its effects by id from this page (shot plan, STORY.md §6). `tools/variety.py` enforces the mix.
An effect is chosen because it MEANS what the line says (the idea "opens", "falls", "is torn away", "travels"), never as decoration.
New effects are added here whenever an episode needs one (the list grows; an episode must add ≥ 2 new ideas: a new effect, or a new
drawn set-piece mechanism).

## A. ENTRANCES — how a thing comes into being (`in`)
| id | what it means | how |
|---|---|---|
| `ink-on` | it is being drawn / discovered | `draw` 0→1 (line, wash, hatching) |
| `quill` | someone records it | `hand` entity follows the point while `draw` runs |
| `unroll` | a scroll, a chart, a record opens | `unroll` 0→1 |
| `drop` | it lands, an object is put down | `fx_y` from above, ease `bounce` |
| `rise` | it grows, is built, comes up over the horizon | `fx_y` from below, ease `out` |
| `slide` | it is brought in from somewhere | `fx_x` + slight `fx_r`, ease `back` |
| `flip` | a card/page/plate is turned over to show it | `flipY`/`flipX` 90→0 |
| `wipe` | time or light sweeps across | `wipe` + `wipeDir` |
| `iris` | attention closes on / opens from one point | `iris` + `irisAt` |
| `blinds` | a shutter, a slit, a louvre opens | `blinds` |
| `tear-in` | a layer of paper is torn away to reveal it | `tear` |
| `bloom` | colour floods into a drawing that was only ink | `sepia` 1→0 (after `ink-on`) |
| `assemble` | parts fly together into the instrument | a `group` whose children each `slide`/`drop` with staggered keys |
| `grow` | a quantity becomes visible | a `shape` morph from a point, or `fx_s` 0→1 from its base (`fx_oy`) |
| `stamp` | a fact is fixed | `fx_s` 1.6→1, ease `expo`, + `ripple` |

## B. TRANSFORMATIONS — how one picture becomes the next (`trans`) — never a plain cut
| id | what it means | how |
|---|---|---|
| `window` | go INTO a place from a point | `lens` opening from a pin / a word / a crater |
| `window-close` | return to where we were | the `lens` closing to its point |
| `ride` | follow the thing that moves | camera keys follow a `beam`/`trail`/object |
| `scale-out` / `scale-in` | the true size of things | geometric `zoom` |
| `morph` | A is really B | `shape.form` morph (beam→ruler, shadow→angle, circle→clock, coast→route) |
| `match` | same place, another time/thing | next element inked exactly where the last one stood |
| `real-reveal` | the drawing was real | `Pinned`/`DocumentPage`/`Eyepiece`/`OldScreen(src)` wipes over the drawing in place |
| `page-turn` | a new chapter | whole `group` `flipY` 0→-100 around the left edge; the next group underneath |
| `tear-away` | the old idea is discarded | `tear` 1→0 on the old group |
| `fold` | pack the scene into an object | `fx_s`→small + `fx_x/y` into a book, a box, a pocket (then that object stays) |
| `eclipse` | one body covers another | a disc slides across; what it uncovers is the next scene |
| `light-change` | time passes in the same place | `Sky` kind keys + `dim` on the group + lit windows |
| `trace` | a path becomes the next subject | `trail` head arrives; camera `ride`; destination inks on |
| `through` | pass through an opening | camera zoom into an eyepiece/door/slit; the inside is a `lens` |
| `collapse` | a whole diagram reduces to one number/line | group `fx_s`→0 toward a point where a `shape` remains |

## C. LIFE — what keeps a held picture alive (`life`)
`boil` (always on) · `sway` (ships, palms, lanterns) · `bob` (floating things) · `breathe` (figures) · `tremble` (strain, cold, an
uncertain measurement) · `flicker` (candles) · `particles`: dust · snow · rain · embers · sparks · photons · bubbles · `ripple` (signal,
impact, sound) · clouds drifting (`Earth.lon` slow key) · star turn (camera `rot` slow) · a sweep hand (`Stopwatch.sec`).

## D. CAMERA (`cam`)
`hold` · `push` (slow in) · `pull` · `pan` · `tilt-up` · `crane` (rise over a place) · `orbit` (planet `lon` key while holding) ·
`ride` · `whip` (fast pan, ease `expo`, between two simultaneous places) · `rack` (zoom between two depths) · `roll` (`rot`, rare).
No shake except one deliberate `tremble` per film at most.

## E. DIAGRAM MARKS (the invisible made visible)
`beam` (light) · `arc` (a measured distance, ONE label) · `Angle` (ONE label) · `trail` (a route, a ray, a fall) · `ShadowCone` ·
`ripple` (waves) · a row of unit things (20 Earths) · a `shape` ruler · red ink circle on a document (`DocumentPage.circle`).

## F. REAL STOCK moves (artefacts)
`pin` (drops with `drop`, red pin last) · `tape` · `slide` across the desk · `flip` to its back · `eyepiece` (footage through a lens) ·
`screen` (footage in a period set) · `circle` (red ink round the key line) · `stack` (several plates fanned, top one lifts: `lift`).

## Variety rules (enforced by tools/variety.py)
1. No `in` id on more than 20 % of a film's lines; no `trans` id on more than 20 %; never the same `in` or `trans` on two lines running.
2. At least 9 different `in` ids, 8 `trans` ids, 5 `cam` ids and 4 `life` ids per film.
3. No composition tag (`comp`: where the subject sits and how big) three lines running; a held scene changes something every ≤ 6 s.
4. Each film has ≥ 5 **set-pieces** (`set`): a bespoke drawn mechanism made for THIS film (e.g. "the row of twenty Earths", "the finger
   that jumps"); a set-piece id may never be reused in a later film (`history.json`).
5. ≥ 40 % of the drawn elements of a film are NEW (drawn for it, then added to the library); a library scene is never re-staged the
   same way: a reused element must change at least two of {angle, scale, light, company, action}.
6. ≥ 2 ideas new to the channel per film (a new effect in this file, or a new mechanism) — recorded in `history.json`.
