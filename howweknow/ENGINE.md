# Engine v2 — the 2D story world (Remotion) — the one page for making a phase 3 film

Owner (15 Nov 2026): 16:9, 8–12 min, English; 2D ONLY; real stock from Muse; the picture transforms continuously and meaningfully, like
one story (no plain scene cuts); one quiet music track per episode; few sound effects; af_heart 0.86. Script standard: `STORY.md`.

## Commands (from `howweknow/`)
```
bash tools/setup.sh                      # once per container: npm, fonts, sfx, grain tiles
bash tools/sync.sh <slug>                # Muse's resources from Drive → public/stock/ (core + this episode)
python3 tools/script_check.py episodes/<slug>     # STORY.md rules — must PASS before the voice
bash tools/make.sh <slug> [--ship]       # check → voice → world check → mix → render → mux → QA sheet (→ Drive + delivery stub)
npx remotion render Story out/f --props='{"slug":"<slug>"}' --frames=30,300,900 --image-format=jpeg --is-production=false   # stills
```
Render ≈ 0.2 s/frame (10 min ≈ 60 min) with the pre-installed headless Chromium (`remotion.config.ts`; remotion.media is blocked).
Never CSS-blur a big zoomed layer (it cost 4 s/frame); blur small things inside SVG only.

## episode.json
```
{ "slug", "title", "voice": "af_heart", "speed": 0.86, "lead": 1.0, "tail": 3.2,
  "music": { "file": "../studio/music/<track>.wav", "db": -22, "start": 0 },
  "lines": [ { "text": "One spoken line with one *stress*.", "gap": 0.7, "src": "S3", "sfx": [{ "at": 1.2, "file": "public/sfx/<x>.wav", "db": -18 }] } ],
  "world": [ entities… ] }
```
`tools/vo.py` voices the lines and writes `timeline.json` (each line's real start/duration); everything in `world` is timed against it.

## Time refs (keys' `t`)
`2.5` · `"L3"` start of line 3 · `"L3+1.2"` / `"L3-0.5"` · `"L3@mirror"` when the word "mirror" is spoken · `"L3$"` end of line 3 · `"end"`.

## Entities — persistent; `props` = start state, `keys` = later states (`{t, dur=1.2, ease=inOut|out|in|soft|snap|linear, …props}`)
Numbers/colours glide, `zoom` glides geometrically, `form` MORPHS (flubber), other values switch. `a` = opacity (0 hides). Order = z.
| type | what | main props |
|---|---|---|
| `camera` | the one camera (world units) | x y zoom rot |
| `sky` | screen backdrop | kind: space · night · dusk · day |
| `stars` | parallax stars | n depth |
| `planet` | Earth (REAL coastlines, lit) / Moon, 2D; or a real photo disc | kind x y size lon lat clouds · src (Muse earth/moon photo) |
| `geo` | borders + a pin drawn ON a planet, aligned | planet border pin [lon,lat] pinA pinR pinLabel |
| `map` | flat REAL map in the world (Muse Blue Marble / relief / old map) or the drawn one; x,y = lon 0/lat 0, w = 360° | x y w src tone border |
| `route` | a path across a map/planet by lon/lat | on points [[lon,lat]…] k (0..1 drawn) dash color |
| `photo` / `video` | REAL stock, toned to the palette | src x y w h space(screen/world) frame(pinned/plate/full) tone(night/warm/moon/soft/none) reveal kz kx ky rot caption from(video s) |
| `kit` | a drawn element | name: NightSky Stars Moon Earth Ridge Haze Pines Observatory MoonGround Reflector (+ their props), space |
| `beam` / `pulse` | light between anchors / a packet riding a beam | from to k w dash · on k r |
| `arc` | dashed measuring arc + one small label | from to k bend label |
| `shape` | a line drawing that MORPHS into another (path in a 0–100 box) | form x y s rot stroke fill sw draw space |
| `label` | ONE small label (rare) | text x y size color |
| `lens` | a WINDOW into another place opening from a point (the continuity device) | at r center(0..1 → screen centre) inner(zoom of inside) + `children` (screen-space entities) |
| `clue` | the clue tag | n (keys change it) |
Anchors (`at`, `from`, `to`): `[x, y]` world · `{entity, lon, lat}` a point on a planet or map · `{entity}` its centre · `{screen: [x, y]}`.

## Continuity grammar (how one picture becomes the next — use these, never a plain cut)
1. **Window**: a point (pin, crater, a word on a document) opens as a `lens` into the place itself; closing it returns to the point.
2. **Ride**: the camera follows a moving thing (a pulse, a ship, a route being drawn) from one place to the next.
3. **Scale jump**: geometric zoom out to the true scale of things (Earth→Moon at 30 Earth-widths), then in again.
4. **Morph**: a shape becomes another (`form`): beam→ruler, shadow→angle, circle→stopwatch, coastline→route.
5. **Match**: the next scene's element sits exactly where the last one was (same anchor), so the eye never jumps.
6. **Real reveal**: a drawn thing gives way to its real photo/footage in the same place (`reveal`, `tone`), and back.

## Brand
`src/kit/brand.ts` (name + tagline — the owner is choosing the name) · corner sting 0–2.6 s · end card last 3 s (`tail` ≥ 3.2).

## Files
`src/engine/` time.ts (refs) · state.ts (keys, morph) · space.ts (camera, anchors) · Entities.tsx (renderers) · Story.tsx (composition)
`src/kit/` style.ts (THE style: palette, light) · world.tsx (drawn elements) · tone.tsx (palette filters for real stock) · Caption · ClueTag · Finish · Brand
`tools/` vo.py · mix.py · script_check.py · check_world.py · make.sh · sync.sh · setup.sh · `episodes/<slug>/episode.json` (+ timeline.json)
Fixtures: `episodes/moon-laser` (continuity test), `episodes/engine-test`.
