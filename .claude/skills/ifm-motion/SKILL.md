---
name: ifm-motion
description: The If Machine house motion standard — how to direct an episode's look in the canvas engine (studio/): premium drawn 2D, motion typography, cold open, spoken outro, and transitions picked by meaning (built-in shapes + 42 GL shaders). Use when writing a director's script or a story, or when upgrading the engine's look.
---

# The If Machine — motion standard (owner, 5 Nov 2026)

1. **Look**: premium drawn 2D (`IFM.PX`, studio/engine/library/ifm_premium.js), never emoji as the subject; soft places in depth;
   grain + vignette; gentle camera with overscan (no edge ever shows). studio/EPISODE.md §0000–§00000.
2. **Type** (the ElevenLabs lesson): kicker (mono) + headline (Unbounded) whose lines rise through a mask while they come into focus
   (blur → sharp, tracking closing in); `*gold*` keywords with a marker sweep; callouts with animated leaders; counters.
3. **Open cold** with `ex_cold` (3–4 punch lines ≤ 6 words, `…` before the last), then the question over a big picture.
4. **End out loud** with `ex_outro` (closing thought, things merging into one glowing word, "Next time on The If Machine: …", `tail=2.4`).
5. **Transitions carry the idea**: choose from `studio/references/transitions.md` by meaning (`morph`/`match` for one thing becoming
   another, `zoomthru` into a detail, `glCrossWarp` to move along, `glInkBleed` for history, `glBokehDissolve` for night and cities,
   `glFold`/`glBookFlip` for documents and chapters, `glGridFlip` for many small changes …). Never twice in a row; `fade` only into
   chapter cards. The incoming scene is already alive when revealed (pre-roll).
6. **Background energy**: `X.orbs(lt, colours, a)` — slow soft colour fields behind dark cards (cold open, chapters, outro).
7. **Check** before rendering: `node tools/gate.mjs`, a contact sheet, and stills of every transition at 5 points
   (no empty incoming frame, no black gaps, render cost < 800 ms).
