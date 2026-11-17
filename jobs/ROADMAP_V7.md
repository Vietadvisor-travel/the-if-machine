# Engine / cinema roadmap after v7 (17 Nov 2026) — what is DONE and what is NEXT (any session can pick it up)
DONE: v6 look (engraving pass, grade, grain/weave, DOF, shake) · light & depth entities · faces with expressions · acting poses ·
Mark (ink annotation) · Etch (antique engraving layers) + tools/etch.py · director's treatment + gate · CINEMA.md · STORY §1b openings ·
skills fathom-director / cinematographer / engraver / critic · keyframes gate · render farm · thumbnails 16:9 + 9:16 · samples v6-demo, v7-demo.
DONE in the final v7 pass (17 Nov, evening): close-up five-finger hands with grips (1, partly: front/3-4 heads and cloth folds still to do) ·
camera dolly through layered sets (2) · transition helpers match_iris / ink_bleed / page_turn / scale_dive (3) · bignum (4) · tools/sfx_auto.py (5).
NEXT (prove each in the first new film, then FX.md + fx-reel):
1. Character drawing upgrade: a new Person rig v7 — 3/4 and front heads, real hands (5 fingers, grips: knob, pen, glass), cloth folds,
   ages; walk / turn-head / gesture cycles. The biggest single lift after the engraving pass.
2. Multiplane flythrough: foreground objects (`para` ≥ .8, `defocus`) that pass the lens; a camera that travels THROUGH a set (dolly), not only pushes.
3. Signature transitions: 4 motif match-cuts as helpers in tools/v6.py (iris-on-motif, ink-bleed from a point, page-turn to a plate, scale-dive).
4. Typographic moments: a big number the camera flies through (`text` figure at world scale + shot('detail') → wide), stamps that slam (≥ .75 s).
5. Sound design sync: tools/sfx_auto.py — signature sounds placed on flash/mark/impact events from the world; room tone per place; the
   score's held breaths from the treatment's rhythm (swells to −∞).
6. Antique plates in use: the first film built on Muse's public-domain plates (sets cut into planes, hand-coloured with tints).
7. Critic as a fresh agent every film (skill fathom-critic) on keyframes + animatic; scores logged in the delivery note.
8. Speed: v6/v7 costs ≈ 2× render — keep the farm on; measure per film.
