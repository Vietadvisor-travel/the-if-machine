# FATHOM engine v3 — the 2D story world in the signature style (Remotion) — the one page for making a film

Owner (15 Nov 2026): FATHOM, 16:9, 8–12 min, English; 2D only; hand-coloured engraving (`STYLE.md`); real stock from Muse as
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
| `clue` | the clue tag (paper label, gold current clue) | n of label |
Anchors: `[x, y]` world · `{entity, lon, lat}` a point on a planet · `{entity}` its centre · `{screen: [x, y]}`.

## FX on ANY entity (`src/engine/Fx.tsx`, vocabulary and rules in `FX.md`) — animatable props, combine freely
`fx_box [x, y, w, h]` = the element's area (reveals run across it, turns pivot on its centre) · `fx_x fx_y fx_s fx_r` (+ origin `fx_ox fx_oy`) · reveals `wipe`(+`wipeDir`) `iris`(+`irisAt`) `unroll` `blinds` `tear` · paper moves
`flipX` `flipY` `lift` · life `sway` `bob` `tremble` `breathe` · tone `sepia` `dim`. Eases: inOut out in soft snap linear back
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
