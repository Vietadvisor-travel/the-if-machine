# FATHOM engine v4 (v3 + smooth motion, ink-bleed transitions, camera life, parallax, content title card — FX.md §G) — the 2D story world in the signature style (Remotion) — the one page for making a film

Owner (15 Nov 2026): FATHOM, 16:9, 8–12 min, English; NO subtitles — in-scene type only (`text` entity); 2D only; hand-coloured engraving (`STYLE.md`); real stock from Muse as
ARTEFACTS in scenes; the picture transforms continuously and meaningfully; one quiet music track; few sound effects; af_heart 0.86.
Script standard: `STORY.md`. Channel spec: `../brief/FATHOM.md`.

## Commands (from `howweknow/`)
```
bash tools/setup.sh                      # once per container: npm, fonts, sfx, paper textures, brand mark
bash tools/sync.sh <slug>                # Muse's resources from Drive → public/stock/ (core + this episode)
python3 tools/script_check.py episodes/<slug>     # STORY.md rules — must PASS before the voice
bash tools/make.sh <slug> [--ship]       # library index → script check → voice → world check → variety → mix → render → mux → sheet → .srt → thumbnail (→ Drive)
npx remotion render Story out/f --props='{"slug":"<slug>"}' --frames=30,300,900 --image-format=jpeg --is-production=false   # stills
npx remotion render PaintTest out/pt --frames=29,59,89,119 --image-format=jpeg --is-production=false                     # library QA (also PeopleTest, PlacesTest)
python3 episodes/fx-board/build.py && npx remotion render Story out/fxb --props='{"slug":"fx-board"}' --sequence --image-format=jpeg   # every FX + footage artefact
node tools/brand.cjs                     # brand files → out/brand/ (upload to Drive brand/fathom/)
```
Renders with the pre-installed headless Chromium (`remotion.config.ts`; remotion.media is blocked here).

## episode.json
```
{ "slug", "title", "voice": "af_heart", "speed": 0.86, "lead": 1.0, "tail": 3.4,
  "music": { "file": "../studio/music/<track>.wav", "db": -22, "start": 0 },
  "lines": [ { "text": "One spoken line with one *stress*.", "gap": 0.7, "src": "S3", "sfx": [{ "at": 1.2, "file": "public/sfx/<x>.wav", "db": -18 }] } ],
  "world": [ entities… ] }
```
`tools/vo.py` voices the lines → `timeline.json`; everything in `world` is timed against it. `tail` ≥ 3.2 (the brand end card).
`thumb`: `{ "t": 42, "title": "How far is the *Moon*?", "kicker": "…", "side": "left|right" }` → `out/<slug>_thumb.jpg` (1280×720). Music: `python3 tools/music.py wonder` lists beds (Muse's first); short tracks loop.

## Time refs (keys' `t`)
`2.5` · `"L3"` start of line 3 · `"L3+1.2"` / `"L3-0.5"` · `"L3@mirror"` when "mirror" is spoken · `"L3$"` end of line 3 · `"end"`.

## Entities — persistent; `props` = start state; `keys` = later states `{t, dur=1.2, ease=inOut|out|in|soft|snap|linear, …props}`
Numbers/colours glide, `zoom` glides geometrically, `form` MORPHS, other values switch. `a` = opacity. `draw` (0..1) = INK-ON:
the line traces, the wash blooms, the hatching settles — use it to bring every new thing in (never a pop or a fade from nothing).
| type | what | props |
|---|---|---|
| `camera` | the one camera (world units) | x y zoom rot |
| `art` | any drawn element of the library (below); `space: "world"` = lives in the world | name + its props, draw |
| `planet` | Earth / Moon / Sun placed in the WORLD (true-scale travel) | kind x y size lon lat clouds night phase draw |
| `pin` | a place on a planet: gold ring + red dot + italic name | on lon lat label r draw |
| `beam` | gold light between anchors | from to k w |
| `arc` | dashed measuring arc + ONE italic label | from to k bend label |
| `shape` | an inked form that MORPHS (path in a 0–100 box) | form x y s rot sw draw col space |
| `label` | ONE small italic label (rare) | text x y size color |
| `lens` | a WINDOW opening from a point into another place (gold-rimmed inked circle) | at r center inner + `children` |
| `group` | children that move as one composition (fx on the group: flip a page, tear it away) | + `children` |
| `trail` | something TRAVELS along a path of anchors; the travelled path is inked behind it | points k dash col headArt headProps |
| `particles` | drifting matter: dust snow rain embers sparks photons bubbles | kind n box speed k |
| `ripple` | inked rings from a point (signal, impact, sound) | at k n r flat col |
| `hand` | the illustrator's quill at a point (while something is inked on) | at s rot |
| `text` | words IN the scene (no subtitles): style `title` (small caps + rule + fleuron) · `plate` (italic figure caption) · `note` (handwritten, written on) · `label` (+ leader line `to` an anchor) · `figure` (the key number in gold leaf) · `stamp` (red double frame); ≤ 9 words | text style x y size k rot align light col width to space |
| `clue` | the clue tag (paper label, gold current clue) | n of label |
Anchors: `[x, y]` world · `{entity, lon, lat}` a point on a planet · `{entity}` its centre · `{screen: [x, y]}`.

## FX on ANY entity (`src/engine/Fx.tsx`, vocabulary and rules in `FX.md`) — animatable props, combine freely
`fx_box [x, y, w, h]` = the element's area (reveals run across it, turns pivot on its centre) · `fx_x fx_y fx_s fx_r` (+ origin `fx_ox fx_oy`) · reveals `wipe`(+`wipeDir`) `iris`(+`irisAt`) `unroll` `blinds` `tear` · paper moves
`flipX` `flipY` `lift` · life `sway` `bob` `tremble` `breathe` · tone `sepia` `dim` · v4 `dissolve` (+`dissolveAt` `dissolveDir` `dissolveSeed` `dissolveR` `dissolveGrain`) `blur` `glowfx` · layer `para` (parallax depth).
Camera (v4): `push` `pan_x` `pan_y` move the whole screen-space page (with parallax), `drift` (0..2) the hand-held breath, `light` (0..1) the lamp. Core art: `TitleCard` {k, title, sub, kicker} · `EndCard` {k, ask, next} · `Ident` {k, title} (src/kit/Ident.tsx).
Music (v4): `music.cues` [{file, at, start, db}] + `xfade` + `swells` [[from, to, +dB]] (tools/mix.py). Voice lines are cached (build/cache) — only changed lines are re-voiced. Eases: inOut out in soft snap linear back
anticipate bounce elastic expo. Every line carries `plan` {in, trans, cam, life, comp, set, new, stock} (STORY.md §6);
`python3 tools/variety.py episodes/<slug>` enforces the mix and the no-repeat ledger `history.json` (`--record` after delivery).

## Drawing: every film draws its OWN things (owner, 15 Nov 2026) — the library is samples + an archive, never a kit
- **Style core (always):** `src/paint/paint.tsx` — Region (wash + form-following hatch + swelling ink, `draw` ink-on), Ink, Line, Stipple, Contour, PIG pigments.
- **Generic by nature (`core`, free in any film):** paper, Sky, Stars, Sun, Moon, Earth (real bodies, real coastlines), Water, Ridge, SeaChart (real map),
  diagram marks (Angle, GoldBeam, ShadowCone, BloodWash) and the REAL-STOCK frames: Pinned · DocumentPage(circle|line|box mark) · Eyepiece(cross) ·
  OldScreen · FilmStrip · Loupe(focus, zoom) · Clipping (torn newsprint) · CabinetCard (Victorian mount). Each takes a photo OR FOOTAGE
  (`src` .mp4/.webm/.mov; `play` = time ref when it starts, `vin` in-point s, `vdur` loop length s, `rate`).
- **Tool:** `Person` (`src/paint/people.tsx`) — a jointed figure: poses stand point look write think raise hold present sit sitlook,
  glide `pose`→`pose2` with `pk` 0..1, `walk` (cycles; `null` stops), `armF/armB/nod/lean` overrides, `holds` book|quill|scroll|lamp,
  `beard`, `hair`, `hairCol`, `hat`, `skin` .2–.75, `face {nose, brow, chin, age, build}`, `facing`. Every Person needs `who` and a costume
  DESIGNED FOR THE FILM (`COSTUMES` in `src/lib/<slug>/`, or an inline object) — the presets are samples.
- **Samples (`sample`, never in a film as is):** everything else in `src/paint/world.tsx` + `places.tsx` (Obelisk, Telescope, Quadrant, Mountains,
  Window, Bookshelf, Desk, Chair, Globe, Pendulum, Glassware, City, Tree, Birds…): references for construction and quality only.
- **The film's own drawings:** `src/lib/<slug>/index.tsx` (copy `src/lib/_template/`), `export const ART = { UniqueName: Component }` +
  `COSTUMES`, drawn from Muse's R (reference) items so they are TRUE to the real object/place/person → `python3 tools/lib_index.py`
  registers them (`library.json`, `src/lib/index.ts`). They stay in the archive: another film may reuse one only when it is the SAME real
  thing, with `"reuse": { "Name": "why" }` in its episode.json. Gate (`variety.py`): ≥ 10 drawings made for the film, ≥ 80 % of the
  non-generic elements its own, no samples, no preset costumes. QA every new drawing in a PaintTest-like still before the render.

## Continuity grammar (how one picture becomes the next — use these, never a plain cut)
1. **Window**: a point (pin, crater, a word on a document) opens as a `lens` into the place itself; closing it returns to the point.
2. **Ride**: the camera follows a moving thing (light, a ship, a line being drawn) from one place to the next.
3. **Scale jump**: geometric zoom out to the true scale of things, then in again.
4. **Morph**: a form becomes another (`shape.form`): beam → ruler, shadow → angle, circle → clock.
5. **Ink-on**: the next thing is DRAWN where the eye already is (`draw` 0→1), while the old one fades.
6. **Real reveal**: a drawing gives way to its real photo/footage in the same place (an artefact: Pinned / DocumentPage / Eyepiece).

## Files
`src/paint/` paint.tsx (the style: Region, Ink, Line, Stipple, Contour, PaintDefs) · world.tsx (library) ·
`src/engine/` time.ts · state.ts · space.ts · Entities.tsx · Story.tsx · `src/kit/` Caption · ClueTag · Brand · brand.ts · style.ts ·
`tools/` vo.py · mix.py · script_check.py · check_world.py · make.sh · sync.sh · setup.sh · paper.py · brand.cjs ·
`brand/` fathom-core.js · brand.html · `design/styles/` (the style exploration boards) · fixtures `episodes/engine-test`, `episodes/fx-test` · `FX.md` · `history.json` · `tools/variety.py` · `tools/book.cjs` (brand book).
Render cost: ≈ 0.2–0.5 s/frame on 4 cores (10 min ≈ 1–2 h). Never CSS-blur a big zoomed layer.

## ENGINE v6 — the look of a finished film (owner 17 Nov 2026: "nâng toàn diện… đạt đỉnh cao thật sự")
A film is v6 when `episode.json` has `"engine": 6` (world.py: `E['engine'] = 6`). Films made before keep rendering exactly as they did.
- **The Look** (`src/engine/Look.tsx`, on by itself, keyable on `camera`): `engrave` 0..1 (the hand-coloured-engraving pass: a small
  wash lift + two line screens by blend — the dark of the picture becomes cut lines, riding with the camera) · `warm` −1..1 · `sat` ·
  `con` · `expo` (the grade; sat/con/expo cost a full extra pass, use only when needed) · `grain` · `weave` · `flick` (the projector) ·
  `focus` + `dof` (depth of field: layer blur = dof × |para − focus|; key `focus` to pull focus; any entity can force `defocus` px) ·
  `shake` 0..1 (hand-held tension). Text entities sit above the engraving (never cut by it).
- **Light & depth entities** (`src/engine/Light6.tsx`): `lamp` {at, r, k, dark, warm} · `shaft` {from, to, w0, w1, n, k} · `motes`
  {box, n, k, seed} · `shadow` {x, y, rx, ry, k} · `haze` {y0, y1, k, col} · `sheen` {box, rot, k (0→1 sweeps), w}. They blend with the whole
  picture and follow the page camera by their `para`.
- **People** (`src/paint/people.tsx`): `expr` neutral|focus|surprise|awe|smile|worry (+ `ek` 0..1 glides it) · `look` [x, y] (the eyes) ·
  `alive` 1 (breathing, a living head). At h ≥ 460 px the face draws its close-up detail (iris, catch-light, lid, nostril, lips, modelling).
- **Eases**: `hand` (a hand drawing: sets off, slows at the turns) · `weight` (a heavy thing: slow start, very long landing). Still no bounce.
- **Helpers for world.py** (`tools/v6.py`): `shot('wide'|'medium'|'close'|'insert'|'detail'|'over', at=(x, y))` → camera push/pan ·
  `rack(depth, dof)` · `shake(k)` · `grade(mood)` / `grade_keys(lines, K)` (the colour of each act) · `cascade(...)` (parts arriving in turn).
- **Shots move words too**: in-scene text rides the page camera (depth .25), so a `shot('close')` can carry a note out of frame —
  place words inside the framed area of the shot they appear in (the v6 demo lost "Manchester, 1909" this way; check the keyframes).
- **Keyframes first**: `python3 tools/keyframes.py <slug>` — 3 frames at final quality before the film is built out (CREATIVE.md §4b).
- Cost (measured 17 Nov 2026, 90 frames, 4 cores): v5 25 s · v6 ≈ 2×. The farm absorbs it (≈ 25–30 min per film).
- Demo: `episodes/v6-demo/build.py` (the atom film's opening re-shot with v6 only — nothing redrawn).

## ENGINE v7 — cinema tools (owner 17 Nov 2026: "nâng cấp bản final đỉnh cao nhất")
- **Dolly** (camera `dolly` 0..1, `tools/v6.py dolly()`): the camera travels INTO the set — each layer grows by its own perspective
  (near `para` fastest), a layer that passes the lens fades away. Build sets in planes (far −.5 … near 1) so the move has depth.
- **Close-up hands** (people.tsx, h ≥ 452 px): five fingers in two joints, knuckles, nails, thumb; hand kinds fist · open · point ·
  grip (holds a knob/pen) · flat (on a table). Acting poses: sitpeer · sitadjust · sitstartle · headhands · startle · explain · reach.
- **Etch** (art): public-domain engraving layers (`tools/etch.py`, ink multiplies onto our paper, `colour`/`tint` washes, `draw`/`from`).
- **Mark** (art): vermilion ink annotations drawn on — circle · underline · arrow · box · cross · bracket.
- **Transition helpers** (`tools/v6.py`): `match_iris` (the next scene opens inside the motif's circle) · `ink_bleed` (spreads from a
  point) · `page_turn` · `scale_dive` (dive into a detail) · `bignum` (a giant figure the camera flies through, with `dolly`).
- **Sound on the frame**: `tools/sfx_auto.py episodes/<slug>` places quiet signature sounds on flashes, marks, shakes, stamps, sheens and
  dollies (≤ 4 per line, held-breath lines `hold: true` stay silent).
- **Direction**: CINEMA.md (§0 the chain of transformations — the heart; §1 the treatment; §2 shot grammar; §3 acting; §4 material;
  §4b ONE STYLE; §5 sound; §6 the bar) · skills fathom-director / cinematographer / engraver / critic · `tools/treatment_check.py`.

## ENGINE v8 — new things, true drawings, a lighter film (owner 17 Nov 2026: "hình ảnh mới được 7 điểm… nhiều thành phần, hiệu ứng dùng lại
## nhiều lần giữa 1 tập và giữa các tập… sáng tạo ra các thứ mới… vẽ chi tiết còn chưa giống… hạt phim vừa phải")
A film is v8 when `episode.json` has `"engine": 8` (world.py: `E['engine'] = 8`). Older films render exactly as before.
- **Look**: grain lighter (.2) and grain / weave / flicker HELD 3 frames (`hold`), weave .3 px. Measured on star-distance: the grain was NOT the
  size — the engraving pass's line screens over a camera that always moves are (3 s: 9.0 MB with the pass, 4.1 MB without). Snapping or freezing
  the screens made it larger (12.4 / 10.8 MB), x264 presets gave ~10 %. A full v7/v8 master at CRF 17 is ≈ 1.3–1.5 GB; at CRF 20 ≈ 0.95 GB and
  CRF 22 ≈ 0.7 GB with no difference visible at 1:1 (PSNR vs CRF 17: 41.2 / 39.9 dB). The CRF stays 17 until the owner chooses (`render.py --crf`).
- **New Fx primitives** (any entity): `burn` 1→0 (paper burns away from `burnAt`, charred edge + ember rim) · `shatter` 0→1 (a pane of glass
  cracks, then breaks into shards flying from `shatterAt`). FX.md §K. Demo: `episodes/v8-demo/build.py`.
- **Novelty gate** `tools/novelty.py` (in make.sh for v8 films): how things come in / go out, the artefact frames, the pointers, the film's own
  drawings — no recipe on > 35 % of entities, frames ≤ 4, own drawings brought on ≤ 4 times unless `motif_art`, nothing the last two films
  leaned on used more than 60 % as much, and ≥ 3 `new_devices` INVENTED for the film. Baselines of inside-earth, empty-atom, star-distance are
  in history.json (all three would fail it: exits 52–100 % one recipe, DocumentPage 8×, CabinetCard 7×, ripple 31× …).
- **True drawings**: `tools/refcheck.py <slug> <Drawing> <ref>` (reference | drawing | the drawing laid over the reference in red) — every hero
  drawing is checked before keyframes; `tools/trace.py` turns a PUBLIC-DOMAIN / CC0 plate, patent drawing or clean photo into true geometry
  (outline, tone parts, construction lines) that `src/paint/traced.tsx` `Traced` inks in the house style; never a copyrighted reference.
- **People**: costumes take a `top` (+ `topT`) — a bodice / shirtwaist in its own pigment over a skirt or coat of `mat`; a long skirt drapes over
  the knees when she sits (no more "women read as men in suits").
