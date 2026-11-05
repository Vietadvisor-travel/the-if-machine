# Director's script — <tên tiếng Việt> (<slug>)

Written FIRST, before any code (owner, 4 Nov 2026). House look: studio/EPISODE.md §00 (calm, no glare or flicker, unhurried, continuous, precise actions, research as reference). The build follows it shot by shot; `node studio/tools/script_check.mjs
jobs/scripts/<slug>.md` must pass before the story is written. One vertical 9:16 film, 6–10 min, objective documentary
voice, every frame full and alive, every line ACTED OUT by the picture.

## Content (owner, 4 Nov 2026 evening — studio/EPISODE.md §00, references/ifm-craft.md §1)
- A NEUTRAL EXPLAINER that entertains through content: no invented protagonist, no plot, no "imagined city / day one".
- HOOK (15–25 s, ≥ 30 words): the question → a surprising real fact → why it matters → what this video answers. `pause=1.2`.
- 3–5 SECTIONS, each opened by an `ex_chapter` card (shot id contains SECTION): one idea → analogy → sourced evidence →
  meaning → takeaway → a question into the next section.
- WHAT PEOPLE SAY (optional): a popular belief named as a belief, then what is known.
- CONCLUSION (25–45 s, ≥ 55 words, shot ids CONCLUSION/RECAP/ANSWER): recap the key ideas (`ex_list n=1`), the answer in one
  sentence, a closing thought.
- Pictures: the explainer kit with OpenMoji illustrations for 2D (`studio/references/explainer-kit.md`, names in `studio/EMOJI.md`),
  3D sets for places and scale. Sound: none unless `sfx=` (≤ 1 per 30 s). Pace: `--speed 1.0`, ≈ 850–1400 words for 6–10 min.
- REAL: <real people and places named ≥ 3 times, comma-separated — anything else repeated is flagged as an invented character>

## Spine
- Hook: <the question, the surprising fact, why it matters, the promise>
- Sections: 1) … 2) … 3) … (each: idea → evidence → takeaway → question)
- What people say: …
- Conclusion: <3 key ideas> → <the answer in one sentence> → <closing thought>

## Shots
<!-- one block per scene (5–12 s); CUTS lists the in-scene cuts (a new picture or element every 3–4 s).
     Fields, all required:
     VO       exact words (the voice reads exactly this) — plain, calm, no drama
     LINK     how this shot connects to the one before (same person continues, object carries over, camera continues, answer to the last line)
     PICTURE  SUBJECT (big, what it does) / BACKGROUND (a real place) / FOREGROUND / LIFE (what moves)
     SHOT     one entry per cut: SIZE (EWS WS MS MCU CU ECU) · angle (eye high low top dutch ots pov) · move · medium (2D 2.5D 3D)
              e.g. "EWS high orbit 3D | MCU eye push 2D | WS high crane 3D+2D (pins)"; 2D and 3D COMBINED: 25–55 % 3D, never 4 cuts
              in a row in one medium, a hybrid 2D+3D shot (pins= labels on 3D, pip= inset, split= with s3) every ~2 min, ≥ 4 angles
              and ≥ 1 close-up per minute, a match cut and a montage in the film; build with
              cam=<SIZE>.<angle>.<move> (2D acts) or act=s3 set=<set> on=<subject> cam=… (3D sets, engine/library/ifm3d.js)
     LOOK     art direction: light / time of day / palette / mood / composition (e.g. "dusk, warm windows, cool street, lonely, rule of thirds")
     TIMELINE second by second inside the shot, a new moment at least every 3–4 s (what moves, who does what, camera beat,
              effect, text, sound): "0 wide city, windows lit, camera starts a slow orbit · 1.5 one tower goes dark · 3 a car stops at
              the red light · 4.5 cut: CU her phone lights up · 6 her thumb taps · 7.5 label PERMIT APPROVED pins to the phone"
              The story follows it with then= cuts and a dir= track; the gate measures motion every second (cost.mjs motion).
     ACTION   what each person does (3D sets / people), or "none" for illustration and diagram beats
     CAMERA   one smooth move + target (slow push to the letter, truck along the street, crane up the tower …); a new angle every 4–7 s
     TEXT     on-screen words, style, place (or "none")
     FX       trans=<cut|fade|slide|match|zoom|zoomthru|ink> + an effect only if the scene needs one (no flash/shake/glitch/chroma)
     SOUND    hits, ambience, music change
     BUILD    kit: ex_show e=… | ex_compare | ex_flow | ex_list | ex_stat | ex_chapter | ex_quote | ex_timeline; 3D: act=s3 set=…;
              bespoke x_<name> only when the kit cannot show it (built from IFM.emoji illustrations) -->

### S01 · 0:00–0:20 · HOOK
- VO: …
- LINK: …
- PICTURE: …
- ACTION: …
- SHOT: …
- CAMERA: …
- LOOK: …
- TIMELINE: …
- TEXT: …
- FX: …
- SOUND: …
- BUILD: …
