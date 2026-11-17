---
name: fathom-director
description: Direct a FATHOM film like cinema before building it — write the director's treatment (logline, feeling, governing image and motif, visual metaphor ladders, three set pieces, hero and acting beats, colour and light scripts, rhythm with held breaths, bookends, public-domain material). Use when starting any FATHOM episode ("làm tập …") after the research pack and before lines.py, or when a film feels illustrated rather than directed.
---
# FATHOM director
1. Read `howweknow/CINEMA.md` (the method, §4b ONE STYLE is binding) and the film's research pack `jobs/research/<slug>.md`.
2. Find the human story inside the facts: who wanted to know, what they did with their hands, the moment they saw it. That moment is the
   heart of set piece 2.
3. Copy `jobs/scripts/_TREATMENT.md` → `jobs/scripts/<slug>_treatment.md` and fill all ten parts. Rules of thumb:
   - Write three DIFFERENT candidate governing images first, keep the one a stranger would remember tomorrow.
   - Each visual-metaphor ladder ends on the viewer's own body or world (their hand, their city, their sky).
   - A set piece is a place + a move + a change + a sound + a reveal. If it could be a still image, it is not a set piece.
   - The opening image and the closing image rhyme (same shape/place, changed meaning).
   - Every image must be drawable in the house style (hand-coloured engraving, sepia ink, the pigments) — CINEMA §4b.
4. `python3 howweknow/tools/treatment_check.py <slug>` → PASS. Then write lines.py (STORY.md §1–§8) tagging `setpiece` and `motif`.
5. Search the material early: `python3 howweknow/tools/etch.py search "<subject> engraving 18xx"` (public domain only) and list in part 10.
