# The If Machine 2.0 — entertainment first (owner, 4 Nov 2026)

Owner: "rebuild the script format and content to be entertaining, not mechanical; 6–10 min per episode; vivid visual
scenes; entertainment + knowledge; upgrade the engine across the board." Vertical 9:16 only (same day).

## What feels mechanical today
- One narrator explains over a diagram per line: icon, bar chart, stamp, counter. No characters, no scenes with life.
- Every beat has the same rhythm (line → picture → caption), so nothing surprises; no jokes, no tension, no payoff.
- The "simulation clock" is a device, not a story; the viewer watches a slideshow of facts.

## The new format: a story with people in it, the facts ride inside the story
1. **Cast that returns every episode**
   - **IFFY**, the machine: a curious, deadpan, slightly glitchy narrator-character with a face on a screen. It reacts,
     jokes and gets things wrong on purpose so the facts correct it.
   - **One everyperson** whose day we follow inside the what-if (a different person per episode, same art style).
   - 1–2 episode guests (a grumpy official, a kid, a scientist). Dialogue with their own Kokoro voices and lip sync.
2. **Shape (6–10 min)**
   - Cold open, 0–20 s: a striking moment from the middle of the what-if ("Day 40: the bread costs a goat."), then the lever and title.
   - Act 1, the switch (≈ 20 %): the world flips; the fun first reactions.
   - Act 2, chain reactions (≈ 50 %): 3–5 set pieces, each a small story with a problem, a gag, a real fact, a bigger problem.
   - Midpoint turn: the thing nobody saw coming. Then the guess for the viewer.
   - Act 3 (≈ 20 %): the twist answer, what it means for you, a callback to the cold open, the next episode.
3. **Entertainment devices** (each episode uses at least 5): running gag; IFFY vs reality ("Myth / Real"); scale
   comparisons you can feel (a stack of X as tall as Y); freeze-frame with a label; reaction cutaway; mini-game or
   guess; a "meanwhile" cut to another place; a punchline pause; a callback ending.
4. **Knowledge stays honest**: one wow fact every 30–45 s, from the research pack, with its source; numbers drawn as
   scenes, not charts. Simulated parts are labelled; no fake records, no real people.

## Engine upgrade (phases, each tested on an existing story and logged in CHANGELOG)
1. **Script format + gates** — new `new_episode.mjs` template (cast, acts, devices); `variety.mjs` 6–10 min;
   `review.mjs` gains an entertainment score: character/scene beats ≥ 50 %, a gag or device every ≤ 60 s, a fact every
   ≤ 45 s, no 3 diagram-only beats in a row; lint keeps the talking-head limit but counts dialogue *in a scene* as a scene.
2. **Cast and acting** — IFFY character act (screen face, moods, glitch reactions); everyperson + guests via the existing
   rig (visemes, gestures, `dialogue`); multi-voice lines in the story (`A:` / `B:` speaker prefixes → own voice + lip sync).
3. **Living scenes** — set-piece kits for streets, homes, markets, offices, nature with ambient life (crowds, traffic,
   weather), so every beat is a place where something happens; scale-comparison and transformation shots; comedy tools
   (freeze label, zoom punch, record scratch, split reaction).
4. **Sound and pace** — music changes per act, comedic SFX palette, punchline pauses; vertical framing rules kept.
5. **Speed** — 6–10 min films double the render: keep every frame < 400 ms (cost gate), cache static layers, more jobs.

## Pilot
The next episode, "Nếu tiền biến mất" (money-disappears), is made in the new format; the owner reviews it and the format
is tuned before the rest. Time: the pilot takes longer (engine work); later episodes aim for the 3 h budget, render included.
