# FATHOM — the channel (owner, 15 Nov 2026) — THE source of truth for phase 3. Supersedes brief/HOW_WE_KNOW.md, REBRAND.md (ODDLY TRUE).

Status: **LOCKED by the owner** except where marked "to present". Engine work starts only after the owner OKs this page.

## 1. Channel
- Name: **Fathom** ("to measure the depth" and "to understand fully"). Handle to check when the owner creates it (@Fathom is likely
  taken; fallbacks @FathomFilms, @FathomHQ, @WeFathom).
- Language English · landscape 16:9 · 8–12 min per episode.

## 2. Content line (locked: pool 1 only)
**How humans came to know, measure or discover something that seemed impossible to know.** How far is the Moon · how old is the Earth ·
what is inside the Earth · how fast is light · how big is the universe · how we weighed the Earth · how we know what the Sun is made of ·
how we dated the pyramids · how we mapped the ocean floor · how we found the speed of sound…
- One big real question per episode, answered through 3–4 **clues** (real experiments, instruments, people, documents), a twist,
  the answer, and what it means today. Told as ONE continuous story (STORY standard: `howweknow/STORY.md` → to be renamed).
- Facts: research pack, 2 sources for heavy claims, no invented numbers.

## 3. Picture (locked)
- **2D only.** Remotion. The picture transforms continuously and meaningfully with the narration — one world, one camera, no
  disjointed scenes; every line changes the picture; transitions are transformations (a window opening from a point, riding a moving
  thing, a scale jump, a morph, a drawn thing becoming its real photo).
- **Its own drawing style**, polished and detailed: every person, object and place is properly DRAWN — never crude shapes or blobs.
  Example given by the owner: the Earth must look like the real Earth (real continents, relief, oceans, clouds, light), not a circle with
  lumps in it. (to present: the style direction, see §6)
- **Real resources as illustrative COMPONENTS, not backgrounds.** Muse digs real photos, footage, documents, maps for each episode; the
  engine turns each into an element that belongs in the scene where the narration needs it: a photo pinned on the scientist's desk, a
  document page with the key line circled, footage inside a telescope eyepiece or a period TV, a map unrolling under the route. Toned to
  the palette, framed, lit like the drawings. Never a full-screen background.
- On screen text: captions + the clue tag + at most one small label. No slides of words or numbers.

## 4. Sound (locked)
Voice af_heart (Kokoro), slower and expressive (speed 0.86, longer pauses). ONE music track through each episode, chosen to fit it,
quiet under the voice. Sound effects moderate and fitting, never cluttered.

## 5. Who does what (locked)
- (superseded by §10) **Muse**: sourcing only, against Claude's resource order (`jobs/tasks/MUSE_FATHOM.md`).
- **Claude**: topics (15 proposed, owner picks), research, script + frame-level shot plan, every drawing, the engine, each film end to end; reports in Vietnamese.
- **Owner**: picks topics, approves films ("đăng tập …").

## 6. To present for the owner's choice (before building)
- **Brand + identity + colours + drawing style**, redone from scratch: 2–3 complete directions as still boards (logo, palette, type,
  the drawing style on the same sample scene — the Earth drawn properly, an instrument, a person, a real photo used as a component).
  Claude's lead proposal: a modern **engraved-atlas** style — fine ink lines and hatching like old scientific atlases, but animated,
  on deep ink-blue with parchment and one metallic accent; real photos/documents sit naturally in it as archival pieces.
- Then: the engine upgrade (all of the above built in), then ONE complete demo episode for approval.

## 7. Drawing style — 7 directions sent 15 Nov 2026 (Drive `_samples/fathom_styles_2026-11-15`, generator `howweknow/design/styles/`)
1 Engraved atlas · 2 Gouache painting · 3 Blueprint · 4 Cinematic vector · 5 Risograph print · 6 Chalkboard · 7 Layered papercut.
Same scene in each (real Natural Earth 50 m coastlines, real night-side city positions, Moon, laser, a real photo as a component, the
FATHOM lockup). Waiting for the owner's pick (or a mix).
- Round 2 (15 Nov): the owner shortlisted **1 Engraved atlas** and **2 Gouache**; 4 more scenes in both (desert light + 7.2° shadow,
  Earth cutaway with seismic rays, astronomer's desk with a real photo pinned, Mediterranean old map with real coastlines) on Drive
  `_samples/fathom_styles_2026-11-15/round2`. Waiting for the pick.

## 8. LOCKED (owner, 15 Nov 2026): the drawing style is **GOUACHE** (tranh bột màu)
"The samples are only a demo: make it more beautiful and polished in every small detail, and COMPLETE this style" — a full style
system (materials, light, brush and paper texture, edges, atmosphere, people, instruments, places, maps, diagrams, real-stock frames,
brand) built into the engine. No more demos until the engine is complete; then ONE full demo episode.
- Then the owner said "or combine both": combined = gouache colour + engraved ink outline + light hatching in the shadows (a
  hand-coloured engraving). Comparison on Drive `_samples/fathom_styles_2026-11-15/round3`. Waiting: gouache or combined.

## 9. LOCKED (owner, 15 Nov 2026): the SIGNATURE style (hand-coloured engraving) — rule book `howweknow/STYLE.md`
Brand v1 rendered (generator `howweknow/brand/` + `tools/brand.cjs`): mark (sounding line + gold lead in a dial), logo (paper/night),
avatar 2048², YouTube banner 2560×1440 (safe area centred), Facebook cover 1640×624, brand guide — PNG + SVG on Drive `brand/fathom/`.
Next: the full engine upgrade in this style (owner: "cực xịn và chỉn chu"), then ONE demo episode.

## 10. LOCKED (owner, 15 Nov 2026 night): roles, frame-level scripts, variety, Muse = sourcing only
- Claude: all content and creation (topics, research, frame-level shot plan, drawings, effects, engine) — "Claude phải siêu xịn".
- Each film is created freshly from its script: effects extremely varied and chosen by meaning (`howweknow/FX.md`), no repeated scenes
  inside a film or across films (`tools/variety.py`, `history.json`); the style is shared, the pictures are not.
- Muse: sourcing only, in depth, all categories (photos, documents, maps, footage, archival audio, sfx, music, references, data,
  quotes, geo) against Claude's resource order — contract `jobs/tasks/MUSE_FATHOM.md`, orders `jobs/orders/<slug>.md`.
- The owner will create 4 new channels; brand book + style prompts on Drive `brand/fathom/` (Fathom_BrandBook.pdf, FATHOM_style_prompts.txt).

## 11. LOCKED (owner, 15 Nov 2026 night): nothing is a fixed kit — every film draws its own world
"Resources, things, characters in the library are only samples; I don't like repetition. Each episode draws new, creatively, from its
content, and adds it to the library so it MAY be reused later — people, tables, anything." → `howweknow/ENGINE.md` "Drawing":
style core + generic real bodies + real-stock frames are shared; every person (costume + face), object, building and place is drawn for
the film in `src/lib/<slug>/` (from Muse's reference R items so it is true to the real thing) and archived; reuse only for the SAME real
thing, with a reason. Enforced by `tools/variety.py` (≥ 10 own drawings, ≥ 80 % own, no samples, no preset costumes).
