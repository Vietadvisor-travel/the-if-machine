# CINEMA — directing a FATHOM film (owner 17 Nov 2026: "điện ảnh với anh nó rất rất nhiều yếu tố nên cần toàn diện, quan trọng là ý tưởng
# và sáng tạo, và các skill. nâng cấp đi")

A FATHOM film is DIRECTED, not illustrated. Before a single line is drawn, the film exists as a CHAIN of transformations (§0) and a director's treatment; every scene is then
shot, lit, acted, cut and scored to serve it. This file is the method. Engine tools: ENGINE.md (v6 look, light, lens) · FX.md · tools/v6.py.

## 0. THE HEART — invention and the unbroken chain of transformations (owner 17 Nov 2026: "mấy cái cử động… chỉ là 1 phần rất nhỏ,
## quan trọng là sự sáng tạo và diễn biến biến đổi — anh nói rất nhiều để mày thấy tầm quan trọng")
Gestures, light and lenses are finish. What makes a FATHOM film is INVENTION: the whole film is ONE unbroken visual journey in which every
picture TURNS INTO the next in a way the viewer did not see coming and instantly understands. The idea moves, so the picture moves.
- **The chain** — before anything else, the film is written as a chain of 40–70 links: `picture → (how it transforms, and why that is
  the idea) → picture`. Example: the green flash → swells into the eyepiece's circle → the circle hardens into a polished "uncuttable"
  ball → the ball cracks like an egg and electrons spill out → they settle into a plum pudding → a gold beam fires through the pudding
  → one bead turns round and races back at the camera → the pudding melts away leaving a single point of gold in an empty circle → the
  circle widens into a stadium seen from the sky → the stadium's pitch becomes the palm of your hand.
- **Every link must be**: (1) a TRANSFORMATION, not a cut or a fade — one thing becomes the next (morph, grow, fold, pour, crack, unfold,
  zoom-through, turn inside out, burn, flow, assemble, fly into); (2) MEANINGFUL — the way it changes says the idea (the ball cracks
  because the "uncuttable" atom was cut); (3) SURPRISING — not the obvious picture; if a stock educational video would show it, find
  another; (4) DIFFERENT — no transformation mechanism twice in a row, ≥ 20 different mechanisms per film.
- **Ten inventions per film** — mark the 10 links that are pure invention (an image nobody has used for this idea). The critic scores
  INVENTION first; a film without ten real inventions is not ready, however beautiful.
- **Where ideas come from** (use them every film): the object's own physics (what would this thing do if it could?) · scale jumps (in
  and out by powers of ten) · the period's own artefacts coming alive (the plate, the notebook, the letter) · the viewer's body and world ·
  a visual pun on the words of the line · reversing time · seeing from the thing's point of view · the impossible camera (inside the atom,
  riding the particle) · two ideas collided into one image.
- **Written in** `jobs/scripts/<slug>_chain.md` (one link per line, ★ on the ten inventions) and checked by `tools/treatment_check.py`.

## 1. The director's treatment — `jobs/scripts/<slug>_treatment.md` (template: `jobs/scripts/_TREATMENT.md`; gate: `tools/treatment_check.py`)
Written after the research pack, BEFORE lines.py. Short, concrete, visual. Ten parts:
1. **Logline** — one sentence: who, what impossible question, what they did. ("A 20-year-old counts flashes in the dark and finds that every atom is empty.")
2. **The feeling** — what the viewer should FEEL at the end (wonder, vertigo, pride…), in one word, and the moment it lands.
3. **Governing image** — the one picture the film is built around (CREATIVE §1), and its **visual motif**: a SHAPE that returns and
   changes meaning (the eyepiece's circle → the atom → the stadium → the eye of the viewer). List the 4–6 places it returns.
4. **Visual metaphors** — for each abstract idea of the film, a ladder of three concrete images, each more powerful than the last
   (empty atom: a fly in a cathedral → a pea in a stadium → your own hand, almost all empty). The strongest one is a set piece.
5. **Three SET PIECES** — the sequences people will remember and share (≥ 20 s each, one per act). For each: the idea · the staging
   (what is built, how deep) · the camera move · the transformation · the sound moment · the reveal (what we see at its end that we did
   not see at its start). A set piece gets 3× the drawing time of an ordinary scene.
6. **The hero and the acting** — who we follow (a real person); what they want; their three emotional beats (e.g. boredom → doubt →
   astonishment) with the close-ups that show them (`expr`, acting poses). We see the discovery ON A FACE before we see it explained.
7. **Colour script** — the grade of each act (`grade()`), drawn as a strip: cold mystery → warm discovery → luminous meaning. One
   colour is the film's ACCENT (vermilion ink, gold leaf, a green glow) and appears only on what matters.
8. **Light script** — where the light comes from in each place (lamp, window, sky, glow of the instrument), and the one moment the
   light itself tells the story (the lamp goes out; dawn breaks; the screen glows).
9. **Rhythm** — the tension curve minute by minute; the 3 moments the film HOLDS ITS BREATH (music drops out, the picture slows, one
   sound); where it accelerates (a montage of counting, of years passing).
10. **Bookends & material** — the opening image and the closing image RHYME (the same shape or place, changed by what we learnt). Which
   real engravings, plates, documents and footage (public domain — `tools/etch.py`; Muse's kit) are used, and HOW (as the set itself,
   as a layer, as an artefact in a hand).

## 2. The grammar of shots (mapped to the engine)
| technique | what it does to the viewer | how (engine) |
|---|---|---|
| establishing → push-in | "we are here" → "look at him" | `shot('wide')` then `shot('close', at=…)` over 4–8 s, `weight` ease |
| POV through the instrument | we see what they saw | `lens` / `clipForm` circle from the eyepiece → the inner picture fills the frame |
| insert of hands | the work is real, physical | `shot('insert')` on hands + an acting pose (`sitadjust`, `write`, `reach`) |
| reaction close-up | the feeling before the explanation | `shot('close')` on the face, `expr` focus → surprise / awe, a held beat (1–2 s) |
| rack focus | choose ONE thing among many | camera `focus`/`dof`, key the focus from near to far |
| reveal by scale | the world is bigger than we thought | pull back fast from detail to wide (push 3.4 → 1), `haze` on far layers |
| hide-and-reveal | anticipation | a foreground occluder (`art`, `para` .6–1, `defocus` 8) slides past and uncovers the subject |
| match cut (shape rhyme) | two ideas are one | the motif's shape stays in place while the scene inside it changes (`clipForm`, `iris`, `dissolve` at a point) |
| silhouette against light | drama, solitude | figure dark in front of a `lamp` / window, `expo` down, `shaft`s |
| dutch tilt | unease, the world is wrong | camera `rot` 4–8° for the tense beat, back to level after |
| time passing | months of work in seconds | a lamp burns down, shadows sweep (`lamp.at` moving), tallies multiply, a calendar of pages (`flipX` cascade) |
| silence | the weight of a discovery | music `swell` to −∞ for 2–3 s, one sound (a click, a breath), picture nearly still but alive (`motes`) |
| montage | effort, repetition | rapid ink-bleed sequence (`dissolve` ≥ .75 s each), rhythm on the score's beat |
| title as object | words live in the world | `text` figure / stamp on a surface, lit by the scene, the camera passes it |

## 3. Acting (people are actors, not cut-outs)
- Every on-screen person has a WANT in the scene and an action that shows it (adjusting, writing, peering, pacing, explaining).
- Emotions change ON SCREEN in a close-up: `expr` glides (ek 0 → 1) with a pose change (`pose` → `pose2`, `pk`) — never a cut.
- `alive: 1` always; eyes `look` at what matters (the screen, the other person, us at the very end).
- Two people: staging in depth (one near and sharp, one far and soft), they look at each other, then at the thing.
- Poses: stand · point · look · write · think · raise · hold · present · sit · sitlook · sitpeer · sitadjust · sitstartle · headhands · startle · explain · reach.

## 4. Material — real engravings as the raw stuff of the world (owner: "nới… thoải mái, không vi phạm pháp luật")
Public-domain engravings (18th–19th c. books, journals, plates) are cut from their paper with `tools/etch.py` and become sets, props
and layers (`art` `Etch`: ink multiplies onto our paper, the v6 light and engraving pass play on it, `colour`/`tint` hand-colour it).
Use them for: period interiors and landscapes (the set), instruments as they were really drawn, crowds and cities, title pages and
diagrams. Our own drawings remain for the people (faces must act), for anything the engravings do not show, and for the science
(diagrams, particles, the impossible views). Law: public domain / CC0 only, recorded in `jobs/stock_pd/<slug>.md`, credited.

## 4b. ONE STYLE (owner 18 Nov 2026: from engine 10 the antique-ENGRAVING look is no longer required — the clean drawn house style is the bar) — everything stays FATHOM (owner 17 Nov 2026: "làm sao vẫn hợp phong cách tổng thể của mình nhé")
Cinema lives INSIDE the house style, never beside it. Every frame must still read as one hand-coloured engraving on cream paper:
- **Ink**: every line — our drawings and every antique engraving — is the channel's sepia ink (#2B1D12); `etch.py cut` converts scans to it.
  No black ink, no photo greys. Antique plates are never shown as their raw scan colour in the film (a real document as an ARTEFACT is
  the only exception, toned warm, STYLE §6).
- **Colour**: only the STYLE §2 pigments (sepia, cream, gold leaf, vermilion, indigo, verdigris, ochre…), laid as washes (`colour`/`tint`
  under the ink), never flat digital fills, never saturated neon; one accent per film.
- **Paper**: the same cream paper and fibres under everything; light (`lamp`, `shaft`) and the grade warm or cool it, never replace it
  with a black or white screen (night is deep sepia-black, not #000).
- **Type**: only the five house faces (STYLE §7). **Marks**: only vermilion ink (`Mark`), hand-drawn.
- **Light & camera** may be as cinematic as the scene needs — they light and frame the engraving; they do not turn it into 3D or photo.
- Mixing our drawings with antique engravings: match line weight (our `sw` ≈ the plate's cut width at that scale), pass both through the
  same engraving pass and grade, and never put a crisp vector next to a soft scan at the same depth — one of them goes in front/behind.
- The keyframe critic scores STYLE first: a frame that stops looking like FATHOM fails, however spectacular.

## 5. Sound as half the picture
Five signature sounds per film (the click of the counter, the hiss of the tube, the scratch of the pen…), placed on the frame of the
event; the score drops out at the 3 held breaths; a rise in the music only at the reveal of each set piece; room tone under every
interior (quiet). The narration never fights a set piece: lines are shorter there, and the picture carries it.

## 6. The bar, and how it is checked
- Treatment written and `tools/treatment_check.py` PASS (all ten parts; three set pieces; motif returns ≥ 4 times in lines.py `setpiece`/`motif` tags).
- Keyframes first (CREATIVE §4b): the opening, the governing image and the climax of the first set piece at final quality, each ≥ 8/10.
- The animatic critic scores every scene on drawing · light & depth · composition · acting · rhythm · sound; under 8 → rebuilt.
- Every set piece is watched in full at final quality before the full render.
