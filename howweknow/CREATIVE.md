# FATHOM — how a film gets its ideas (owner 17 Nov 2026: "không phải có list xong lặp đi lặp lại — cần sự sáng tạo; biến hình chỉ là 1 khả năng")

A list of effects is vocabulary, not creativity. Creativity is decided BEFORE the engine is touched, line by line, and judged by a
person who has not read the script. The engine (ENGINE.md, FX.md) only has to be able to do whatever the idea asks — when it cannot,
the engine grows (a new primitive), the idea does not shrink.

## 1. The concept pass (in `jobs/scripts/<slug>_concepts.md`, before lines.py)
For the film as a whole:
- **One visual world.** A single governing image the whole film lives in (inside-earth: "the planet as a bell that is listened to").
  Every scene is a view of, a part of, or a transformation of that image — this is what makes scenes flow as one film.
- **Three recurring motifs** that come back changed (a shape, an object, a gesture) and pay off at the end.
For EVERY line, write THREE different stagings before choosing one — they must differ in kind, not in detail:
- A. **literal** — the real thing, drawn true, doing what the line says (a mechanism shown working, a person acting).
- B. **metaphor** — a familiar thing that behaves the same way (runners in mud, a straw in a glass) — and how it turns back into the real thing.
- C. **transformation** — the previous picture itself becomes this idea (what exactly becomes what, and why that is true to the content).
Pick by these questions, in order: Does it read with the sound off? Does the viewer SEE the cause, not just the result? Is it
something they have not seen in our last films (`history.json`)? Does it hand over naturally to the next line's picture?
The rejected two stay in the file (they are the reserve when a scene fails review).

## 2. What "creative" means here (the bar)
- **Cause on screen.** Show the thing happening (the wire twisting, the wave bending at the boundary), never just its label.
- **Surprise with truth.** The unexpected picture must be more accurate than the expected one, not less.
- **Economy.** One idea per picture; the picture changes because the thought changes — never decoration.
- **Play of scale, time and point of view.** Inside the instrument, riding the wave, the planet in a hand, a century in a turning page.
- **Sound is half the picture.** Each scene names its sound idea (what is heard that makes it physical) and its mood for the score.
- **No device twice in a film in the same way**; a motif returns only if it has changed meaning.

## 3. The animatic (cheap, before the real render) — the owner sees the film early
`python3 tools/render.py <slug> --preview` → `out/<slug>_preview.mp4` (half size, 15 fps, with the voice and score laid under by
`tools/make.sh <slug> --preview`). Minutes, not hours. The owner (or a fresh reviewer) watches THIS; notes are fixed here; only an
approved animatic gets the full-quality render. Nothing about the final picture differs except size and frame rate.

## 4. The critic pass (on the animatic, by someone who did not build it — a fresh agent or the owner)
Scene by scene, score 1–10: reads without sound · something happens (still_check) · true to the real thing · the change INTO this
scene is an idea, not a habit · beauty. Any scene under 7 is rebuilt from its reserve concepts. The scores go in the delivery note.

## 4b. Keyframes and the 8/10 bar (engine v6, owner 17 Nov 2026)
Before the film is built out, three frames at final quality (`tools/keyframes.py`): the opening, the governing image, the answer. A critic
who did not build them scores each 1–10 on DRAWING (true to life, detailed, hands and faces), LIGHT & DEPTH (a named light, layers,
shadows, air), COMPOSITION (one clear subject, the eye led to it, shot size right for the line) and STYLE (it reads as a hand-coloured
engraving, the channel's pigments). Every frame ≥ 8 on every axis, or it is redrawn first — the rest of the film is drawn to that bar.
The animatic critic (§4) uses the same four axes per scene; a scene under 8 is rebuilt before the full render.

## 5. Growing the engine
When a concept needs something the engine cannot do, add the primitive (src/engine), a row in FX.md, and a clip in `episodes/fx-reel`.
A film is expected to add at least two; the reel is the running proof of what the engine can do.

## 6. Novelty (engine v8, owner 17 Nov 2026: "nhiều thành phần, hiệu ứng dùng lại nhiều lần giữa 1 tập và giữa các tập")
A habit is not a style. Before world.py, list the film's DEVICES (how things arrive and leave, how real documents are shown, how a number or a
name is pointed at) and, for each one the last two films leaned on (`python3 tools/novelty.py` prints them), find another way. Invent ≥ 3 devices
for the film (FX.md §K) — the thing the idea needs that the engine cannot yet do — and build them (src/engine or the film's own drawings).
The world helpers are not a style either: a `gone()` that always ink-bleeds is exactly the repetition the owner saw. Gate: `tools/novelty.py`.
