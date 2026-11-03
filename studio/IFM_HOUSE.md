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
3. **People** (`ifm_people.js`): the new house cast.
   - Styles: `flat` (default), `pill`, `shadow`, `line`. Set the header `people:`; change it between episodes.
   - Poses: stand look walk run phone cheer sit sleep point shock shrug think wave carry type.
   - The old chibi rig (`person()`, CHAR presets) is not used on this channel.

Camera: every world act takes `cam=` (push pull truckL truckR crane drop tilt orbit whip dutch float). When `cam=` is left
out, it rotates by beat index. Transitions: content bridges (`zoomthru match liquid bloom ripple`), rhythm cuts
(`whip slices blobs cube spin drop stripes2`) and brand cuts (`scan ticket brand`).

Lettering: `words="TEXT@k|!TWIST@k|~DATA@k|^GOLD@k"` lands on caption k of the beat.
- Colours: `!` coral (twist only), `~` teal (machine/data), `^` yellow.
- Keep each word ≤ 18 characters.

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
- The caption band is reserved: 9:16 at 81.5 % height, 16:9 at the bottom 52 px. Lettering lives in the top third.

## 5. Voice and sound
- Narrator: one voice for the whole channel, chosen by the owner from the voice menu (Kokoro or `supertonic:M1|M2|F1|F2`).
  Put it in the header `voice:`. Supertonic setup: `python3 tools/voice.py setup-supertonic`.
- Chatterbox Turbo is approved but too slow on this container (about a minute per sentence) and its torch is not
  installable here. Do not use it for production.
- Brand sounds: `ifm_lever` (the hook) and `ifm_ding` (answer, end) in `tools/sfx_pro.py`. Every world act carries its own cues.
- Music: header `music:`; real tracks from Muse's library once it lands on Drive `_music/`. Never the same music as the last episode.

## 6. Token budget (owner's rule: lean but complete)
- Check frames as one montage per beat group (≤ 12 tiles at 400 px), never one image per frame.
- Edit with small patches. Do not re-read engine files you already know.
- Render the long video once after lint, variety and stills are clean. Fix with `--reuse-mix` when only pictures changed.
