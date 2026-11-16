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
| `ink-bleed` | it seeps onto the page like ink in wet paper (v4) | `dissolve` 0→1 (+ `dissolveAt` / `dissolveDir`), ink rim on the moving edge |
| `focus` | it comes into focus / attention lands on it (v4) | `blur` 12→0 with `a` 0→1 |

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
| `ink-bleed` | one picture seeps into the next (v4) | the old one `dissolve` 1→0 while the new `dissolve` 0→1 — same `dissolveSeed` so the two read as one sheet |
| `sweep` | the page is washed clean in one direction (v4) | `dissolve` + `dissolveDir` right/left/up/down (an organic edge, never a ruler-straight wipe) |
| `bloom-out` | everything gathers into one point (v4) | `dissolve` + `dissolveAt` (the point vanishes last) |
| `rack-focus` | attention moves from one thing to another (v4) | old `blur` 0→12 + fade, new `blur` 12→0 |
| `lift-off` | a sheet is taken off the desk (v4) | `lift` 0→40 + fade |
| `dive` | down through the layers of a thing to its heart (v4) | a section drawing's own zoom/anchor keyed (geometric), the viewer riding with it |

## C. LIFE — what keeps a held picture alive (`life`)
`boil` (always on) · `sway` (ships, palms, lanterns) · `bob` (floating things) · `breathe` (figures) · `tremble` (strain, cold, an
uncertain measurement) · `flicker` (candles) · `particles`: dust · snow · rain · embers · sparks · photons · bubbles · `ripple` (signal,
impact, sound) · clouds drifting (`Earth.lon` slow key) · star turn (camera `rot` slow) · a sweep hand (`Stopwatch.sec`).

## D. CAMERA (`cam`)
`drift` (v4: the page camera — `camera.push`/`pan_x`/`pan_y`, line by line, with parallax by `para`) · `dive` (v4) · `hold` · `push` (slow in) · `pull` · `pan` · `tilt-up` · `crane` (rise over a place) · `orbit` (planet `lon` key while holding) ·
`ride` · `whip` (fast pan, ease `expo`, between two simultaneous places) · `rack` (zoom between two depths) · `roll` (`rot`, rare).
No shake except one deliberate `tremble` per film at most.

## E. DIAGRAM MARKS (the invisible made visible)
`beam` (light) · `arc` (a measured distance, ONE label) · `Angle` (ONE label) · `trail` (a route, a ray, a fall) · `ShadowCone` ·
`ripple` (waves) · a row of unit things (20 Earths) · a `shape` ruler · red ink circle on a document (`DocumentPage.circle`).

## F. REAL STOCK moves (artefacts)
`pin` (drops with `drop`, red pin last) · `tape` · `slide` across the desk · `flip` to its back · `eyepiece` (footage through a lens) ·
`screen` (footage in a period set) · `circle` (red ink round the key line) · `stack` (several plates fanned, top one lifts: `lift`).

## G. v4 MOTION (owner 16 Nov 2026: "mượt mà, liên tục, biến hóa — không giật, không nảy, không tĩnh")
- Eases are smooth only: `back`/`bounce`/`elastic` now mean a long soft settle; no motion key shorter than .75 s (state.ts).
- The page is never still: hand-held drift + lamp light (Story.tsx) and a page camera keyed every line (`push`, `pan_x`, `pan_y`, ease `sine`).
- Depth: every layer moves by its `para` (sky −.5, art 0, people .1, words .25, particles .6) — parallax on every camera move.
- Nothing pops or slides in from off the page: entrances ink-on, bleed in or come into focus; slides are short glides (≤ 140 px).
- Exits are grouped by moment, one style per scene change, cycling ink-bleed · sweep · bloom-out · rack-focus · lift-off (world.py motion pass).
- A film opens on its CONTENT (hook → the journey announced → the episode's title card, `TitleCard`) and closes on its content (a bookend
  back to the opening image) before the small end card (`EndCard`).

## Variety rules (enforced by tools/variety.py)
1. No `in` id on more than 20 % of a film's lines; no `trans` id on more than 20 %; never the same `in` or `trans` on two lines running.
2. At least 9 different `in` ids, 8 `trans` ids, 5 `cam` ids and 4 `life` ids per film.
3. No composition tag (`comp`: where the subject sits and how big) three lines running; a held scene changes something every ≤ 6 s.
4. Each film has ≥ 5 **set-pieces** (`set`): a bespoke drawn mechanism made for THIS film (e.g. "the row of twenty Earths", "the finger
   that jumps"); a set-piece id may never be reused in a later film (`history.json`).
5. Every film DRAWS its own things (owner, 15 Nov 2026): ≥ 10 drawings made for it in `src/lib/<slug>/`, ≥ 80 % of its non-generic elements its own, no library samples, no preset costumes; an archive drawing from another film only for the SAME real thing with a reason (ENGINE.md "Drawing"); a library scene is never re-staged the
   same way: a reused element must change at least two of {angle, scale, light, company, action}.
6. ≥ 2 ideas new to the channel per film (a new effect in this file, or a new mechanism) — recorded in `history.json`.

## H. BECOMES — engine v5 (owner 17 Nov 2026: "hình gì biến thành gì, chuyển động như nào — rất nhiều kiểu, cực xịn")
Every line of a v5 script names ONE of these for how its picture arrives out of the last one (`plan.becomes.how`), with the exact
FROM thing and TO thing. `tools/plan_check.py` enforces: ≥ 14 different kinds per film, none on more than 12 % of the lines, never the
same kind twice running. Demo of the new ones: `episodes/fx-reel` (`out/fx-reel_v5.mp4`).
| id | FROM → TO, in words | engine recipe |
|---|---|---|
| `solid-morph` | a body changes its very shape and colour into another body | `shape` with `fill`: key `form` + `fill` together (flubber) |
| `outline-morph` | only the contour changes; the new thing then inks on inside it | `shape` `form` key, then the art's `draw` |
| `swarm` | it comes apart into grains of ink that fly and settle as the next thing | `swarm` {from, to, n, arc} `k` 0→1, then the art inks on |
| `travel-line` | one line leaves the old drawing, runs across the page and becomes the outline of the new | `shape` `draw` + `erase` (+ `form` key) |
| `shape-window` | the next scene is seen through an opening whose shape morphs (keyhole → arch → frame) | `group` with `clipForm` keys + a gold `shape` rim with the same forms |
| `pour` | it fills up like a liquid / drains away | `pour` 0→1 (`pourDir`) |
| `brush` | it is painted over the old picture in broad strokes | `brush` 0→1 |
| `ink-bleed` · `sweep` · `bloom-out` | it seeps in / is washed away / gathers to a point | `dissolve` (+`dissolveAt`/`dissolveDir`) |
| `rack-focus` | attention passes from the near thing to the far thing | `blur` up on one, down on the other |
| `spot` | the light narrows to the one thing that matters, the rest falls dark | `spot` {at, r} `k` |
| `count-up` | a number runs while the thing it measures grows | `text` `num` + `fmt` keyed with the growth |
| `shrink-into` / `grow-out-of` | the whole scene becomes a small part of the next (the planet on the pan of the balance) | `fx_s` + `fx_x/y` to the exact place, then swap |
| `through` | we go through an opening of the old scene (eyepiece, door, borehole, a letter O) | `fx_s` up about the opening (`fx_ox/oy`) + the new scene `iris` from it |
| `tilt` / `crane` / `whip` / `dive` | the camera travels to the next place: down through a floor, up over a roof, across | whole scenes keyed `fx_y`/`fx_x` together (or a section's own zoom) |
| `hand-over` | a character hands/places/pulls the next thing into view | `Person` pose keys + the object's travel on the same key times |
| `unroll` / `page-turn` / `fold` / `lift-off` | paper behaviour: a scroll opens, a page turns, a sheet is folded away or lifted | `unroll` · `flipY` on a group · `fx_s`+`fx_x/y` · `lift` |
| `real-reveal` | the drawing was real: its photograph develops in the same place | `Pinned`/`DocumentPage` `dissolve` in over the drawing (`dissolveAt`) |
| `heat` / `ripple-through` | it shimmers, melts or is shaken into its next state | `wobble` + the art's own state prop (melt, sag, crack) |
| `light-change` | same place, another time | `Sky` kind + `dim`/`sepia` keys |
| `echo` | the same shape answers from the next scene (dial ↔ planet ↔ moon ↔ coin ↔ eye of a telescope) | match size and place exactly, crossfade under an `outline-morph` |
| `split` / `merge` | one thing divides into its parts, or parts assemble into the instrument | children with staggered `fx_x/y` from one point (`fx_ox/oy`) |
| `trace-to` | a path being drawn arrives somewhere and that place opens | `trail` head arrives → `shape-window` / `through` at its end |
Combine freely (a `swarm` that lands inside a `shape-window`); invent new ones — add the row here first.
