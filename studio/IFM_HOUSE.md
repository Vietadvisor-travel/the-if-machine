# The If Machine — house format for the engine (Nov 2026)

Read this before `SKILL.md`. Where they disagree, this file wins. `SKILL.md` and `references/` stay useful for the craft:
story frames, toon lettering, transitions, sound grammar. Their Vietnam travel rules do not apply here: prices in VND,
the af_heart narrator, PHO/BANH MI signs, the Vietadvisor end frame, the chibi cast.
The identity lives in `../brief/BRAND.md`. This file turns it into engine rules.

## 1. Shape of an episode
- **Long 16:9: 3–6 minutes.** Not shorter than 3 minutes. Length follows the content; never pad.
- **Vertical 9:16: 60–90 s.** It is its own cut with its own hook, not the long video cropped.
- **Hook, 0–3 s:** `# vis kind=ifm act=lever q="WHAT IF|…|…?"` (the lever, then the question types, then a dive through the screen).
  It may be replaced by a bespoke hook marked `hook=1`, but the question must be on screen by 1.5 s.
- **Middle:** the simulation runs. Mark each beat with the simulation clock (`clock="HOUR 3"`, `"DAY 40"`, `"YEAR 2"`).
  The clock replaces chapters.
- **Twist at about 70 %:** silence of 0.4–0.8 s before it. Then `# vis kind=ifm act=answer text=… stamp=…` (the printed answer).
- **End:** automatic. The machine prints the RUN ticket: header `run:` and `next:`, 6 s. Last line: "What should the machine run next?"
- The machine appears only at the hook, the answer and the end. Everywhere else the picture is the SUBJECT of the line.

## 2. Pictures: three layers
1. **Bespoke shots per episode (≥ 30 % of beats in a long video):** `engine/library/ep_<slug>.js` with `ACT.<name>`, the
   pattern of `ifm_world.js`. This is what makes each episode look like itself: the brain that never sleeps, the town under
   two suns, the bank vault with no money.
2. **World kits** (`# vis kind=w act=…`, every act has views and keys; see the file headers):
   - `ifm_world.js`: globe, city, crowd, map, count, split
   - `ifm_world2.js`: zoom (the cosmic dive), phone, servers, sky (time-lapse), space, money
3. **People and creatures** (`ifm_people2.js`, approved by the owner 3 Nov 2026): faceless, the pose carries the feeling.
   - `facet` (default): low-poly, two tones per part.
   - `holo`: the machine's simulated people, glowing.
   - The older `flat` / `pill` / `shadow` / `line` styles are still available.
   - Header `people:`; change the style between episodes. Poses: stand look walk run phone cheer sit sleep point shock shrug think wave carry type.
   - `IFM.creature(kind, …)`: dog cat horse dino bird fish whale robot.
   - The old chibi rig (`person()`, CHAR presets) is not used on this channel.
4. **Layers on any world beat** (`ifm_world3.js`):
   - `fx=rain|snow|dust|sparks|rays|bokeh|embers|glitch|confetti|fireflies|holo`; combine with `+`.
   - `look=blueprint|xray|night|vintage|mono|warm|cold` (lettering stays unfiltered).
   - New acts:
     - `scale`: a size ladder; one familiar thing beside every big number;
     - `guess`: the viewer picks A or B, 3-2-1, then the machine lights one; use it before the twist;
     - `animals`: field, sea or sky.

Camera: every world act takes `cam=` (push pull truckL truckR crane drop tilt orbit whip dutch float). When `cam=` is left
out, it rotates by beat index. Transitions: content bridges (`zoomthru match liquid bloom ripple`), rhythm cuts
(`whip slices blobs cube spin drop stripes2`) and brand cuts (`scan ticket brand`).

Lettering: `words="TEXT@k|!TWIST@k|~DATA@k|^GOLD@k"` lands on caption k of the beat.
- Colours: `!` coral (twist only), `~` teal (machine/data), `^` yellow.
- Keep each word ≤ 18 characters.

## 2b. Directing every second, and the asset bank (owner, 3 Nov 2026)
- Read `references/ifm-director.md` before writing an episode.
- Every body beat of a long video should carry a `dir=` track (engine/library/ifm_director.js). It covers camera into a point,
  pseudo-3D, slow motion and freeze, frame effects, kinetic text (20 styles) and exact sounds. It works on ANY `# vis` kind,
  including bespoke episode acts. New 3D transitions: `flip3d fold shatter pixel tunnel`.
- **Asset bank** (`engine/library/ifm_bank.js`):
  - each episode adds ≥ 5 new items (people, creatures, objects, places) in `engine/library/bank/<slug>.js`;
  - the catalogue lives in `studio/BANK.md` (`node tools/bank.mjs catalog`); `act=stage` builds a set from bank items;
  - every episode also gets its own cast automatically: people's looks are seeded by the episode title.

## 3. Variety (owner's rule: nothing repeats, every episode is new)
- `node tools/variety.mjs stories/<slug>.story` must be clean. It blocks:
  - the same scene twice in a row, or the same transition or camera twice in a row;
  - a scene used more than its share;
  - fewer than one distinct scene per 3 beats;
  - > 40 % of scene types shared with the last episode;
  - an opening picture from the last 3 episodes.
  It also warns on the same music or people style as the last episode.
- After delivery: `node tools/variety.mjs stories/<slug>.story --record` (writes `history.json`, commit it).
- Brand rituals (lever, answer ticket, end frame, clock, captions) are the only things meant to repeat.

## 4. No overlap, both formats
- `node tools/lint.mjs stories/<slug>.story --both`: 0 errors and 0 "cut off / overlap / covers" warnings in BOTH 9:16 and 16:9.
- Then `node tools/still.mjs <story> v|h "<times>"` + `python3 tools/montage.py` at every lettering beat in both formats.
  Read the contact sheet, not single frames (saves tokens).
- The caption band is reserved (owner, 4 Nov 2026: low, under the picture, smaller): 9:16 from 74.5 % growing down to ~79 % (clear of the Shorts/Reels UI in the bottom ~20 % and the right-side buttons), 16:9 the bottom 40 px. No key text in 9:16 72–82 %. Lettering lives in the top third.

## 5. Voice and sound
- **Voices (owner, 3 Nov 2026):**
  - Narrator `am_puck` (bright male), the default. Run make with `--speed 1.06`.
  - Second voice `af_bella` (bright female): quotes, "you" characters, a change of voice in the vertical cut.
  - Other approved voices may play small parts where they fit.
  - Deep voices (`am_michael`, `supertonic:M1`) are not the narrator.
- Chatterbox Turbo is approved but too slow on this container (about a minute per sentence) and its torch is not
  installable here. Do not use it for production.
- Brand sounds: `ifm_lever` (the hook) and `ifm_ding` (answer, end) in `tools/sfx_pro.py`. Every world act carries its own cues.
- Music: real tracks from Muse's library (30 Kevin MacLeod tracks, CC BY 4.0; `tools/music_lib.py`; `setup.sh` imports them from Drive `_music/`).
  - The mood follows each scene: globe/zoom/space → wonder, city/crowd → momentum, servers → tech, blackouts → tension, answer → warm. `mood=` on a beat overrides it.
  - Runs shorter than 18 s merge. Tracks rotate between episodes.
  - The bed sits 4 dB lower than the old engine.
  - Every delivery note lists the credit lines: `python3 tools/music_lib.py credits <story>`.
- SFX: Muse's 76-sound pack, names `ifm_<family>`. Every world beat adds a bed, an accent on each new line, a hit on each lettering cue and a relay when the clock moves.
- Vertical captions sit in the 47–65 % band (block bottom at 64.5 %): the bottom 35 % is covered by the app's caption and buttons.
  The HUD sits at 15.5 % and lettering at 25 %.

## 6. Render cost (owner asked, 3 Nov 2026)
- Rendering costs time, not tokens: it runs in the background and only the final log line is read.
  Measured on this container: about 7 frames/s.
  - A 5-minute 16:9 video takes about 20 min; a 75 s vertical about 4 min; voice + sound about 2 min.
- Tokens go on checking. So check before rendering, on contact sheets of stills (`still.mjs` + `montage.py`), then render each format ONCE.
  After rendering, check one 12-frame sheet per format from the FINAL file.
- Both formats are required by the brief. The vertical is its own short story (60–90 s), so it renders fast.
- Engine work and tests: stills only, no video render, unless the owner asks for one.

## 7. Token budget (owner's rule: lean but complete)
The working rules for an episode live in `EPISODE.md` §7 (read that page, not this one, when producing).

- Check frames as one montage per beat group (≤ 12 tiles at 400 px), never one image per frame.
- Edit with small patches. Do not re-read engine files you already know.
- Render the long video once after lint, variety and stills are clean. Fix with `--reuse-mix` when only pictures changed.
