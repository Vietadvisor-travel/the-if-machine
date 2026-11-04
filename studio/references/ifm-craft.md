# The If Machine — craft standard (owner, 4 Nov 2026: "entertaining but not over the top; truly alive, varied 2D/3D,
many shots and angles; research and standardise everything, then build the engine")

This is the reference every director's script and every engine feature answers to. Sources consulted are listed at the end.

## 1. Content: entertainment first, knowledge inside it
The channel is entertainment. Facts are the backbone; the fun is how the "what if" plays out.
- **The promise in 5 seconds.** The first shot confirms the title's promise with the most striking picture and one line
  that opens a loop. More than half of viewers decide in the first minute.
- **The world reacts.** A what-if is a chain of consequences: the first hour, the first week, the first year. Ordinary
  life (one recurring person), institutions, money, power, the internet, other countries, criminals, comedians.
- **Every 30–45 s something new happens** (a new place, a new character, a twist, a reveal, a number made visible).
  No two minutes in the same rhythm.
- **Include what people actually say about it** — rumours, fears, jokes, and conspiracy theories — as part of the show:
  - name a theory as a theory ("Online, a theory spreads that…"), show it, then show what is known; never present it as fact;
  - pick theories that are popular and fun to examine, not harmful ones (no health misinformation, no hate, no real private people);
  - context over amplification: one or two strong theories per episode, each with a clear "here is what we actually know".
- **Not over the top.** No fear-mongering, no "you won't believe", no fake urgency, no invented numbers. Humour is light
  and comes from situations (a machine with no cousins, a robot answering the phone at 3 a.m.), never from mocking people.
- **Clear payoff.** The twist answer in one sentence, a callback to the opening picture, and the next question.
- **Research is a reference.** Use what serves the story, add your own explanations, analogies and scenarios; anything
  stated as fact needs a source; anything imagined is framed as the simulation ("in our imaginary year").

### Episode skeleton (6–10 min)
1. Cold open (0–20 s): a striking moment from inside the what-if + the question.
2. Day one (≈ 1 min): the world flips; first reactions; the fun easy wins.
3. The chain reaction (≈ 3–4 min): 3–5 set pieces, each = situation → real-world fact/case → consequence → open loop.
4. "What people say" (≈ 1 min): the rumour/theory segment, examined calmly.
5. The turn (≈ 1 min): the thing nobody saw coming; the strongest real case.
6. Payoff (≈ 30–45 s): the answer, callback, next episode.

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

## 3. 2D, 2.5D and 3D — which, when
- **2D (flat illustration):** characters acting, diagrams that explain a mechanism, documents, phone screens, comedy beats.
- **2.5D (layered depth, parallax):** places with atmosphere — streets, rooms, landscapes; camera moves reveal depth.
- **3D (three.js toon world):** scale and space — flying through a city, rotating around a building or object, a globe,
  a top-down simulation of traffic or crowds, an impossible camera move (through a window, into a server).
- Mix inside a scene: a 3D establishing shot → a 2D character close-up → a 2D insert of the letter → a 3D pull-out.

## 4. Simulation look
**Real-world physics and scale (owner, 4 Nov 2026):** people stand on the ground at human size (≈ 1.8 m), cars are car-sized
(≈ 4.3 × 1.8 m), nobody walks through a car, a person, a tree, a fountain or a wall; traffic stops at red lights; crowds keep
personal space. Checked by `tools/sim_check.mjs` (part of the gate).
**No repetition (owner, 4 Nov 2026):** inside a film no 3D framing (set + subject + size + angle) twice and no set over 35 % of the
3D cuts; across episodes the scene-type rule of variety.mjs applies (sets count as types; vary `time=`, `seed=`, subjects).
"Running the world": flows (people, money, cars, data) visibly moving; counters that tick only when they mean something;
before/after splits; the same place at different times (time-lapse); maps that zoom from country to street.

## 5. Sound
Music carries the emotion; real recorded ambience only (no synthetic white-noise beds); one-shots only for visible actions;
no automatic whooshes; silence before a reveal.

## 6. Voice
An expressive narrator (owner picks from the samples); script written for speech: contractions, rhetorical questions,
short sentences, pauses before reveals.

## Sources consulted (4 Nov 2026)
- Retention and structure: teleprompter.com "YouTube audience retention"; overseeros.com "YouTube retention architecture";
  vidpros.com "What MrBeast's former retention strategist taught us about editing"; socialmediaexaminer.com retention articles.
- Explainer styles: storybench.org on Vox animation; kottke.org "How to make a Kurzgesagt video"; thelongstory.substack.com.
- Shots, angles, movements: wolfcrow.com "15 essential camera shots, angles and movements"; nofilmschool.com "15 essential
  camera shots"; epidemicsound.com "30+ camera shots"; hardenhuish.wilts.sch.uk film studies (35° rule).
- Editing: artlist.io "Editing techniques"; premiumbeat.com "9 essential video editing cuts"; adobe.com "J cut and L cut".
- Conspiracy theories: trustingnews.org Trust Tip 76; Berkman Klein Center (Claire Wardle); Poynter / SSRC MediaWell on
  debunking without amplifying.
