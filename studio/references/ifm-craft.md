# The If Machine — craft standard (owner, 4 Nov 2026: "entertaining but not over the top; truly alive, varied 2D/3D,
many shots and angles; research and standardise everything, then build the engine")

This is the reference every director's script and every engine feature answers to. Sources consulted are listed at the end.

## 1. Content: a neutral explainer that entertains (owner, 4 Nov 2026 evening — replaces the "what-if simulation" plot)
"The content was bad, the storyline silly. Neutral, normal content, no storyline; explain it normally as long as it entertains."
- **Explain, don't dramatise.** The narrator explains the question: what it really asks, how the thing works, what history and
  real evidence say, what experts expect, what is uncertain, and the answer. No invented protagonist, no plot, no "imagined
  city", no "day one" simulation. One-sentence "imagine…" illustrations are fine.
- **Entertainment = content.** A question worth asking, surprising true facts, analogies and comparisons that make an idea
  click, what people believe vs what is known, light observational humour, and clear pictures.
- **Hook (15–25 s):** the question → a surprising fact → why it matters → "in this video". Then a breath.
- **Sections (3–5):** each opens with a section card; one idea → analogy → evidence (sourced) → meaning → takeaway → a question
  that leads to the next section.
- **What people say (optional):** a popular belief named as a belief, then what is actually known.
- **Conclusion (25–45 s):** the 3 key ideas recapped, the answer in one sentence, a closing thought. Then the end card.
- **Not over the top.** No fear-mongering, no "you won't believe", no fake urgency, no invented numbers.

### Episode skeleton (6–10 min)
1. HOOK (0–25 s) 2. SECTION 1–5 (≈ 1–2 min each, `ex_chapter` + 6–15 beats) 3. WHAT PEOPLE SAY (optional, ≈ 1 min)
4. CONCLUSION (25–45 s) 5. end card.

## 2. Picture: cinematography for animation
Every shot in the director's script states SIZE · ANGLE · MOVE · MEDIUM (2D, 2.5D or 3D).
- **Sizes:** EWS (extreme wide/establishing) · WS (wide) · MS (medium) · MCU · CU (close-up) · ECU (detail/insert).
- **Angles:** eye level · high (looking down: small, overwhelmed) · low (looking up: power, institutions) · top/bird's-eye
  (systems, maps, crowds) · over-the-shoulder (a person and what they face) · POV (what a character sees: a phone, a letter).
- **Moves:** static (rare, deliberate) · push in (attention) · pull out (reveal) · truck/track (follow a person) ·
  pan/tilt (connect two things) · crane up/down (leave or enter a world) · orbit (study an object) · dolly zoom (unease, once).
- **Editing grammar:**
  - cut on action (a hand moves → cut mid-move) and match cuts (a coin becomes a planet; a letter slot becomes a server slot);
  - change the size or the angle by a clear step at a cut (≥ 35° or two sizes), never a tiny jump;
  - keep screen direction (180° rule) when following someone;
  - inserts and cutaways (a detail, a reaction) every few shots;
  - montage for time passing; cross-cutting for "meanwhile";
  - J/L cuts: the next scene's sound starts under the current picture (or the reverse) to bridge scenes.
- **Variety rules (checked by tools):** no more than two consecutive shots with the same size; at least four different
  angles per minute; at least one 3D or 2.5D shot per minute; at least one insert/detail per minute; at least one
  montage or match cut per chapter.

## 2b. Alive, never busy (owner, 4 Nov 2026 evening: too fast)
Something meaningful changes every 3–4 seconds (an item appears, an arrow draws, the camera pushes) and nothing is frozen
> 3 s; one idea at a time, given room to land. The director writes it in TIMELINE; the gate measures it.

## 3. 2D, 2.5D and 3D — which, when
- **2D (the explainer kit, `references/explainer-kit.md`):** recognisable illustrations (OpenMoji), comparisons, processes,
  numbers shown by size, timelines, quotations, section cards. Never vague hand-drawn shapes.
- **2.5D (layered depth, parallax):** places with atmosphere — streets, rooms, landscapes; camera moves reveal depth.
- **3D (three.js toon world):** scale and space — flying through a city, rotating around a building or object, a globe,
  a top-down simulation of traffic or crowds, an impossible camera move (through a window, into a server).
- Mix inside a scene: a 3D establishing shot → a 2D character close-up → a 2D insert of the letter → a 3D pull-out.
- **Combined, never all 3D (owner, 4 Nov 2026):** 25–55 % of cuts in 3D, never 4 cuts in a row in one medium, and hybrid frames
  (2D labels pinned on 3D, a 2D inset over 3D or the reverse, 2D/3D split) about every 2 minutes.
- **Art direction per shot (LOOK):** light, time of day, palette, mood, composition — at least 4 different looks per film.

## 4. Simulation look
**Real-world physics and scale (owner, 4 Nov 2026):** people stand on the ground at human size (≈ 1.8 m), cars are car-sized
(≈ 4.3 × 1.8 m), nobody walks through a car, a person, a tree, a fountain or a wall; traffic stops at red lights; crowds keep
personal space. Checked by `tools/sim_check.mjs` (part of the gate).
**No repetition (owner, 4 Nov 2026):** inside a film no 3D framing (set + subject + size + angle) twice and no set over 35 % of the
3D cuts; across episodes the scene-type rule of variety.mjs applies (sets count as types; vary `time=`, `seed=`, subjects).
"Running the world": flows (people, money, cars, data) visibly moving; counters that tick only when they mean something;
before/after splits; the same place at different times (time-lapse); maps that zoom from country to street.

## 5. Sound (owner, 4 Nov 2026 evening: too many effects, too loud)
A low music bed under the voice (≈ 20 dB below it); no ambience beds; no automatic one-shots — a beat asks for a sound with
`sfx=name@k` only where it matters (at most one every 30 s); master −16 LUFS. Story header `sound: full` restores the old design.

## 6. Voice and pace
The narrator the owner picks from the samples (Drive voice_samples_2026-11-04); `--speed 1.0`; ≈ 135–150 words a minute;
0.34 s between lines, ≈ 1.2 s between beats, `pause=1.2` after the hook, each section card and before the conclusion.
Script written for speech: contractions, rhetorical questions, short sentences.

## Sources consulted (4 Nov 2026)
- Retention and structure: teleprompter.com "YouTube audience retention"; overseeros.com "YouTube retention architecture";
  vidpros.com "What MrBeast's former retention strategist taught us about editing"; socialmediaexaminer.com retention articles.
- Explainer styles: storybench.org on Vox animation; kottke.org "How to make a Kurzgesagt video"; thelongstory.substack.com.
- Shots, angles, movements: wolfcrow.com "15 essential camera shots, angles and movements"; nofilmschool.com "15 essential
  camera shots"; epidemicsound.com "30+ camera shots"; hardenhuish.wilts.sch.uk film studies (35° rule).
- Editing: artlist.io "Editing techniques"; premiumbeat.com "9 essential video editing cuts"; adobe.com "J cut and L cut".
- Conspiracy theories: trustingnews.org Trust Tip 76; Berkman Klein Center (Claire Wardle); Poynter / SSRC MediaWell on
  debunking without amplifying.
