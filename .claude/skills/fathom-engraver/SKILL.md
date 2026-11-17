---
name: fathom-engraver
description: Find, legally take and cut real antique engravings (public domain, Wikimedia Commons) into layers for a FATHOM film, and match our own drawings to them — sepia ink conversion, hand-colouring washes, line-weight matching, licence records. Use when a film needs a period interior, landscape, instrument, crowd, city or plate drawn with true engraving quality, or when our drawings need to match antique plates.
---
# FATHOM engraver
Tool: `howweknow/tools/etch.py` (search → get → cut → ship). Law first: only Public domain / PD-* / CC0 is taken; `get` refuses the
rest and writes the proof to `jobs/stock_pd/<slug>.md` (credit them in the delivery note).
1. `python3 tools/etch.py search "<subject> engraving 1850" --n 15` — prefer large plates (≥ 2000 px), clean paper, the right period.
2. `python3 tools/etch.py get <slug> "File:<title>" --as <short-name>`.
3. `python3 tools/etch.py cut <slug> <name> [--crop x,y,w,h]` → `<name>_ink.png` in the channel's sepia ink; cut the plate into
   PLANES (background room, middle furniture, foreground objects) with several crops so the camera can move between them.
4. Place as `art` `Etch` {src, x, y, w, h, colour|tint, washA, draw, from} with `para` per plane; hand-colour with a pigment `tint`
   (STYLE §2) or a `--keep-colour` copy as `colour`, low `washA` (.35–.6).
5. Match our drawings: line width ≈ the plate's cut width at that scale; same engraving pass and grade (automatic in engine 6).
6. `python3 tools/etch.py ship <slug>` (Drive `_hwk/<slug>/_pd/`, so any session can `sync.sh` it back). Never commit the images.
Everything stays one style: CINEMA.md §4b.
