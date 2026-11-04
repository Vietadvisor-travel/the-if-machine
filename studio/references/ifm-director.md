# The If Machine — directing every second (read before writing any episode)

The goal (owner, 3 Nov 2026): every episode is a creative film of its own, directed frame by frame. It is not a re-arrangement
of what the engine already has. The kits are a floor, not a ceiling. Sources distilled here:
- the Remotion agent skills (timing, springs, motion blur, transitions, light leaks, sfx);
- the 12 principles of animation;
- the grammar of the big explainer channels (Muse, `jobs/research/_REFERENCES.md`);
- the platform study (`_PLATFORMS.md`).

## 0. Priority (owner, 4 Nov 2026)
Pictures of people, places and things over charts and machine screens; every beat alive (foreground, an acting subject,
background life, light or camera with intent, one transformation); clean composition in both formats. See EPISODE.md §0.

## 1. The order of work for one episode
1. **The idea of each beat in one picture.** For every line ask: what is the most surprising, most visual way to SHOW this
   exact sentence? Write it as a frame line (`// 0:42 …`) before choosing any act. If a kit act fits, use it.
   If not, draw a new one (§5). "A globe with arcs" for every internet line is the failure mode.
2. **The second-by-second track** (`dir=`) for that beat:
   - where the camera goes;
   - what the text does;
   - which one effect lands on the punch word;
   - which one sound is motivated.
3. **Bridges.** Every cut is motivated by meaning (zoom through an object, a match on shape or colour, the ticket wipe)
   or by rhythm (whip, slices, flip3d, shatter).
4. **Stills check** in both formats (contact sheets), then fix, then render once.

## 2. Timing (from Remotion's timing skill + animation principles)
- **Ease everything.** Linear motion only for machines and data streams.
  - Arrivals use a spring with a small overshoot (`ease=spring`, TOON `pop`).
  - Departures accelerate out (ease-in). Camera moves use ease-in-out.
- **Anticipation → action → follow-through.** Before a big move, a 3–6 frame counter-move: a slight pull back before a zoom in,
  a squash before a jump. After it, a settle (overshoot of 3–8 %, then rest).
- **Hold the punch.** The key word of a line gets a held frame or a slow-motion beat (`slow .3` or `freeze`, 0.3–0.6 s).
  Then everything resumes. Silence (music dip) under the hold before the twist.
- **Rhythm.**
  - A new visual idea every 2–3 s in the long video, 1–1.5 s in the vertical.
  - Vary the shot lengths: mix 1 s stings with 4–6 s holds. A metronome bores.
- **Motion blur on the fast stuff only:** `mblur` over whips, zooms and falls (sub-frame samples, as `@remotion/motion-blur`
  does with its shutter angle). Never on static shots: it costs render time.

## 3. Camera language (`dir=` CAMERA + `cam=`)
- Each shot has one intention:
  - reveal: pull out;
  - focus: push into a point;
  - connect: pan from A to B;
  - unease: dutch roll;
  - impact: shake for 0.2–0.4 s on the hit only.
- **Zoom into a point**, never into the centre by habit: `zoom 1.8 .62,.42` lands on the subject.
- **Pseudo-3D** sparingly, once or twice per minute:
  - `tilt` turns the world into a table-top to show a system;
  - `card` lifts the shot out of the frame ("this is a simulation");
  - `flip` reveals the other side of an idea.
- Never two identical camera moves in a row (the variety guard checks it).

## 4. Text on screen (kinetic typography)
- Text is a picture, not a subtitle. One idea per card, ≤ 18 characters, placed in the shot's empty space, never over a face.
- Match the style to the meaning:

| meaning | style |
|---|---|
| a number that matters | `counter` (rolls up), or `count` |
| a hidden or unknown thing | `scramble` (decodes) |
| the machine speaking | `type` (mono, cursor) |
| the key phrase of a line | `highlight` (marker bar) |
| a big claim / a chapter | `extrude` (3D depth) or `stack` |
| an error, a break, a twist | `glitchtext`, or coral `slam` |
| a quiet aside | `outline`, `hand` |
| a verdict | `stamp` |

- One colour job each:
  - Paper: neutral;
  - Yellow: brand / emphasis;
  - Teal: data / the machine;
  - Coral: ONLY the twist or danger.
- The text enters on the spoken word (`@k` or `@k+0.2`), not before it. It leaves before the next idea.

## 5. Inventing new shots (the creative layer)
- Start from the subject, then pick the most unexpected camera on it:
  - macro: inside the object;
  - aerial: the pattern from above;
  - cutaway: the inside of a wall, a body, a machine;
  - POV: a hand, a window;
  - silhouette: against a light;
  - scale jump: tiny to vast.
- Transformation beats explanation: the thing changes INTO the idea. A clock melts into a calendar; a crowd's phones go dark
  one by one; a city becomes a circuit board.
- Build it in `engine/library/bank/<slug>.js`:
  - every new person, creature, object or place becomes a bank item (`IFM.bank.add`, kind + tags);
  - every new shot becomes an act (`IFM.ACT.<name>`) composed from bank items and painters.
  The bank grows by ≥ 5 items per episode. The next episode reuses as little of the last two as possible (the variety guard warns).
- People: faceless facet or holo, the pose carries the feeling. Give them one specific action (holding a phone up to the sky,
  running for a bus), never standing in a row facing the camera.

## 6. Transitions (how a cut means something)
- By meaning:
  - `zoomthru` into an object;
  - `match` (same shape, new world);
  - `ticket` (the machine prints the next idea);
  - `scan` (a new simulation pass);
  - `tunnel` (deeper in);
  - `fold` (turning the page of time).
- By rhythm: `whip`, `slices`, `flip3d`, `shatter` (something breaks), `pixel` (digital collapse).
- One idea per transition. Never the same twice in a row. ≤ 2 uses of any type per minute.

## 7. Sound is motivated (owner: "not random, not too many")
- A sound only where something visible happens: an impact, a lever, a ticket, a door, a twist card. No filler.
  The engine adds no automatic fillers for IFM.
- One bed per scene (room, city, wind, data hum) at low level. Music ducks under the voice.
  Music drops out for 0.4–0.8 s before the twist.
- Lettering makes a sound only when it is a twist (`!`), data (`~`) or gold (`^`). A `dir=` `sfx` places one exact sound.

## 8. The frame line format (write one above every beat)
```
// 1:12 [6 s] SUBJECT: the 3 a.m. supermarket, shelves full, nobody buying
//   0.0 CAMERA top-down aerial of the aisles, push 1.0 → 1.3 toward the tills
//   1.4 TEXT counter "0 CUSTOMERS" teal on the empty till
//   2.8 FX the lights flicker (glitch .3), the camera stops (freeze .4) on the line "nobody comes"
//   3.6 BRIDGE the till screen fills the frame → zoomthru into the next shot
//   SOUND fridge hum bed; one register beep at 3.0
# vis kind=ep_supermarket act=aisles dir="0-3 zoom 1.3 .5,.7; 1.4 text counter '0 CUSTOMERS' .5,.3 teal; 2.8 fx glitch; 2.9 freeze; 3 sfx ui_click" trans=zoomthru
```

## 9. Checks that prove it is directed
- `tools/variety.mjs` warns:
  - when fewer than 60 % of beats carry a `dir=` track;
  - when text styles or effects repeat;
  - when bank items come back from the last two episodes.
- `tools/review.mjs` ≥ 85; `tools/lint.mjs --both` clean (no text over faces or cut at the edge in either format).
