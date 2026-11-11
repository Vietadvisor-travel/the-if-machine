# Motion Studio — changelog

## 2026-11-11 (late night) · the voice gets real intonation; foley without a rhythm; Chatterbox dropped
Owner: "no need for a sound every 4 s, that's mechanical. 4–5 extra hours: drop it. Just add expressive stress so it sounds better."
- Chatterbox Turbo dropped (CPU ≈ 38× slower than real time).
- tools/prosody.py (new): an intonation pass on every Kokoro utterance with Praat PSOLA (praat-parselmouth), timbre and timing
  untouched: each `*word*` gets a pitch accent (+2.2 st rise from the word onset, held through its stressed vowel, released;
  the rest of the sentence steps down 0.7 st), statements settle (−1.6 st into the full stop, starting after a final focus word),
  questions lift (+2.2 st), Kokoro's own pitch movement is widened ×1.15. Measured on 10 lines: the marked words +1.9…+2.6 st,
  pitch range 10.4 → 11.3 st.
- Exact timing: voice.py now loads the timestamped export of the same Kokoro v1.0 int8 weights (onnx-community
  Kokoro-82M-v1.0-ONNX-timestamped, from huggingface.co; `setup` fetches it, falls back to the plain model if unreachable).
  Two fixes make its times right: phoneme edges from the model's rounded frame durations, and a 0.12 s acoustic lag
  (KOKORO_LAG). Checked against Whisper word times: 12/13 accents inside their word (was 2/13 with letter-share estimates).
- Voice cache key flow1 → flow2 (old clips re-read with intonation). IFM_PROSODY=0 = the old reading.
- `sound: light`: no cadence; a sound only where the story places one for a visible action (1.5 s only stops collisions).

## 2026-11-11 (night) · the listening pass: music that survives a phone, a steadier voice, light foley
Owner: "what else would make the audio and the voice better? … do whatever is within reach."
- sound_design.py MINIMAL (IFM): music bed −19.5 → −16.5 dB under a −13 dB duck, and an EQ that keeps it audible on phone
  speakers (HPF 70, low shelf −2.5 dB @140, +1.5 dB @900, −2 dB @2.5 k so it never fights the voice). Tested on
  see-in-the-dark: phone-band music drop 8.4 dB (FAIL) → 5.8 dB (ok), master −16.0 LUFS, TP −3.9.
- VO: a slow leveller (1.6:1, 250 ms / 1.2 s) before the fast compressor, so quiet and loud lines sit at one level.
- voice.py: a short punchline (≤ 6 words) after a held `…` is read at ×0.92 speed (lands instead of rushing).
- `sfx=name@k` (at caption k of the beat) and `sfx=name@2.5s` (seconds into the beat) were silently dropped by the mixer,
  which only knew `offset:name[:gain[:pan]]`; both forms now work (the old form still does).
- Header `sound: light` = light cartoon foley: the story's `sfx=` cues play where they are written, with no cadence (owner,
  11 Nov 2026: "why every 4 s, that is mechanical"). A sound only when something on screen physically makes it (a sticker lands
  = pop, a bounce = boing, a spring, a tick of a dial); never on text, never on a rhythm; sparse and irregular. Soft names:
  cartoon_pop, cartoon_plop, cartoon_boing, cartoon_spring, ifm_motion_pop, ui_tick; whoosh/riser/amb are still removed.

## 2026-11-11 (later) · the opening is the title question; *word* stresses the voice
Owner: "from now on drop the scenes at the start: the hook scene must be the scene of the title question; can the voice stress
and intone each line properly?"
- script_check: shot 1 must start with "What if" and may not be a cold-open build; variety: a cold-open act in beat 1 is an ERROR.
  EPISODE.md §0000000 and CLAUDE.md updated (the cold open rule is retired).
- voice.py: `*word*` in a story line = stress it. Kokoro reads IPA: the marked word gets a primary stress and a longer stressed
  vowel, the other stresses in that sentence drop to secondary (emphasis_phonemes). Captions already show *word* highlighted.
  A/B sample (same 6 lines, plain vs stressed) on Drive voice_ab_2026-11-11 for the owner's ear.

## 2026-11-11 · IFM.CT, the cartoon toolkit (engine/library/ifm_cartoon.js) — no overlaps, looking through other eyes
Owner on see-in-the-dark: "more premium, more visual and creative; avoid overlapping elements and captions".
- `CT.begin / CT.end`: a scene owns its camera (`CT.rig`; the beat's cam= only declares the shot for the gates); the caption band
  (72–81 %) gets a calm shade and is reserved; the house title is drawn clear of every camera and leaves after `tout` s.
- `CT.sign`: sticker labels placed through a layout registry in screen space: never over the title, the caption band or another
  label (nudged to the nearest free place); a label whose anchor leaves the frame is dropped.
- Looks: `CT.dark` (real darkness with pools and cones of light), `CT.thermal` (heat-sight silhouettes), `CT.tint('cat'|'nvg'|'grey')`,
  `CT.soft` (out of focus), `CT.photon`, `CT.stars`. `CT.at(c, phrase)` = the time a spoken phrase starts (captions are cut at pauses,
  so caption indices are not story lines). Tested on stories/see-in-the-dark.story (32 scenes).

## 2026-11-10 (later) · a real cartoon: crew walk cycles, the world kit for episode scenes, the in-scene camera rig
Owner on gravity-half v1: "static pictures with a little movement and text; it must be a cartoon: everything flows, every scene its
own design, varied camera angles (2D is fine), wow".
- `cast.js` `IFM.CAST.draw(…, { walk: phase, stride, tuck })`: feet swing and lift, the body bobs (walk 1, run ~1.9); `tuck` pulls
  the legs up in a jump.
- `IFM.CAST.kit` exports the world kit (flat, fo, limb, mitten, sticker, burst, sparkle, sky, floor, haze, cloud, tree, bush, lamp,
  facade, road, stall, hills, bunting, cache, coin, note) so episode scenes are drawn in the same language as the demos.
- `bank/gravity-half.js` `IFM.GH.rig(lt, keys, fn)`: a camera inside a scene — keys [t, x, y, zoom, roll, 'cut'] ease between framings
  or hard-cut (top-down, low angle, close-up, extreme wide); `IFM.GH.title` = the house title, clear of every camera, leaving after
  `tout` seconds. Tested on stories/gravity-half.story (39 scenes) and stories/test-gh.story.
- `cast.js` sticker(): the white border and drop shadow are built from a half-resolution mask and the thing is drawn sharp on top
  (no full-frame filter): the same look at about a quarter of the cost (gravity-half median frame 572 → 235 ms).

## 2026-11-10 · gravity-half: ex_stat dec=, three new gags
- `ex_stat` takes `dec=` (decimals of the counter): `v=1.5 dec=1` shows 1.5, not 1.50. Tested on stories/gravity-half.story (S16).
- New IF CREW gags in `engine/library/cast.js` (GAG): `receipt` (a bathroom scale prints a −50 % receipt), `floatbell` (a dumbbell
  labelled GRAVITY grows wings and floats off), `sadtea` (a deadpan teabag in lukewarm tea). Used in bank/gravity-half.js.
- preflight.mjs now agrees with the engine and variety: GL shader transitions (`trans=gl<Name>`) are calm, and kit illustration names
  that resolve to a drawn object (`IFM.PX.DRAW[name]`) are known. Tested on stories/gravity-half.story.

## 2026-11-05 · no bare scenes: places, foregrounds, stage dressing, a detail measure
Owner: "don't build sketchy scenes; every scene needs details and a lively, visual composition that fits the content; assets supplement,
they are not the only thing".
- `engine/library/ifm_places.js` (new): 14 places drawn in code in layers — street, market, kitchen, office, bank, farm, classroom, lab,
  harbor, library, space, village, desert, ocean: a blurred far layer, a detailed mid layer (shopfronts, stalls, shelves, desks,
  columns, crops, containers, books…), calm life (walkers, traffic, birds, steam, dust, bubbles), a soft pool of light for the subject,
  the episode theme as a tint, and a blurred foreground framing object. `props=` puts the content's own things into the place.
- Explainer kit: `place=` on any kit act (bg replaced by the place; ink adapts; foreground drawn on top).
- 3D `set=stage`: `dress=` places related props around the subject at real proportions (per-prop height ratios: packs differ in scale).
- variety.mjs: ERROR on explainer beats without place= (bare=ok to override); WARN on stage shots without dress=.
- cost.mjs: detail % (cells of the picture zone holding real drawing); WARN < 30 %, ERROR < 18 %. Coarse: patterned backgrounds count
  as detail, so the place rule above is the main guard.
- Tested: stories/test-places.story (14 places × kit acts), stories/test-models2.story (stage with dress=city/village).

## 2026-11-05 · Muse wave 2 fix: all 17 model packs (1,337 low-poly CC0 models)
- Muse re-packed KayKit ×6 and Quaternius ×6 with textures (buildings/food converted FBX→GLB). `tools/model_build.py` now bakes all 17
  packs: 1,337 models, `models_data.js` 25 MB (+≈ 3 s page load per render job, measured). Transparent texels (leaf cards) take the mean
  opaque colour instead of black.
- `set=stage` sized from its models: plinth radius from their spread, objects framed by their own height, a closed dome backdrop (no sky,
  no wall edge), lit as an interior. Tested on stories/test-models2.story (city block, village market, characters, space base, trees).
- Known limit: rigged characters (KayKit adventurers, Quaternius characters) show their bind pose (T-pose); no animation playback yet.

## 2026-11-05 · Muse wave 2 integrated: Fluent Flat illustrations, real low-poly 3D models
- **Fluent Emoji Flat** (MIT, 1,291 glyphs; flat colour, no outlines) built into `emoji_data.js` by `tools/emoji_build.py` and preferred
  over OpenMoji for every name it covers (OpenMoji is the fallback); not re-toned (already a calm flat palette), still gets the house
  gradient/facet/rim light.
- **3D models**: `tools/model_build.py` bakes glTF/GLB (node transforms into vertices, palette textures into vertex colours, int16/uint8/
  uint16 quantised) → `engine/library/models_data.js` (463 Kenney CC0 models, 3.9 MB: food, cars, roads, pirate, survival). Runtime
  `IFM.model(name)`, `models=` on any 3D set, new `set=stage` studio diorama (objects framed by their own size, aimed so they sit above
  the captions in 9:16). Tested on stories/test-models.story (stage with food, stage with a chest, taxi and police car in the street set).
- Not usable yet (reported to the owner): KayKit ×6 and Quaternius nature/props are missing their texture PNGs; Quaternius buildings/
  food/characters/spaceships came as FBX (glTF needed).
- stock_sync.sh unpacks the wave-2 zips (only needed to rebuild the data files, which are committed).

## 2026-11-05 · illustrations re-drawn in the house style (owner: "the emoji break the style")
- `IFM.emoji` now renders OpenMoji in the BRAND §4 look by default: colours pulled into a calmer palette (saturation ≤ .66, light
  .2–.8, a slight pull toward the theme accent), the black sticker outline replaced by a thin soft line (45 % width, 55 % alpha, deep
  navy), a soft light-to-shade gradient, a facet light plane and a thin rim light. `style: 'raw'` draws the original. Tested on
  stories/style-money.story (before/after on Drive style_frames_money_2026-11-05/emoji_before_after.jpg). Interim: house-style stock
  requested from Muse (flat, no outlines, low-poly 3D) to replace emoji where possible.

## 2026-11-05 · voices locked, per-episode visual worlds, anti-repetition, style frames for the money topic
- **Voices (owner)**: af_heart narrates every episode; af_nicole = second female voice (slow, eerie: quotes); am_santa = old male
  storyteller (legends). voice.py defaults, new_episode.mjs header (`voice: af_heart`, `cast: QUOTE=af_nicole LEGEND=am_santa`),
  EPISODE.md, CLAUDE.md, a note in brief/VOICE_MODELS.md.
- **Themes** (owner: "each episode its own visuals; don't repeat scenes in an episode or across episodes"): header `theme:` dresses
  every kit act — paper, banknote, museum, chalk, blueprint, noir, desert, ocean, cosmos (background motif, ink colours, section-card
  variant, a stage under the main subject). `IFM.exBg/exTitle/exStage` for bespoke acts. ex_show spin never edge-on.
- **variety.mjs**: kit act ≤ 2 per episode (section cards ≤ 5) ERROR; the same illustration as main subject twice WARN; < 4 scenes
  made for the episode ERROR (films ≥ 20 beats); bespoke acts borrowed from other episodes WARN (reuse=ok); theme missing WARN, a
  theme from the last 3 episodes ERROR; > 30 % main illustrations repeated from the last 3 episodes WARN; history.json records theme,
  main illustrations and own acts. Kit acts with different illustrations count as different scene types.
- **Bug fixed**: two functions named pip() in ifm_world.js — the inset painter shadowed the globe's point-in-polygon test, so every
  globe with night lights threw. The inset is now pipInset().
- **Style frames** (not the episode): stories/style-money.story (theme banknote) + bank/money-v2.js — x_mv_note (an engraved generic
  banknote crumbling to dust), x_mv_shelf (a supermarket aisle in perspective, the price tags fall), x_mv_camp (a WWII camp at dusk,
  jam and cigarettes trade on a crate), x_mv_andes (paper-cut Andes, terraces, llamas, storehouses). 38 frames at 1080×1920 on Drive
  `style_frames_money_2026-11-05/`.

## 2026-11-05 · engine upgrade after the owner rejected "Nếu tiền biến mất" (content, sound, pace, voice, 2D pictures)
Owner: "content bad, storyline silly; neutral explanation, no storyline, entertaining; far too many sound effects and too loud;
too fast, no hook, no ending; voice dull; 2D scenes shallow, you can't tell what the shapes are". For every episode from now on:
- **Content rules** (EPISODE.md §00/§0/§1, references/ifm-craft.md §1, jobs/scripts/_TEMPLATE.md, CLAUDE.md): neutral explainer,
  no invented protagonist or plot; HOOK 15–25 s (question, surprising fact, why it matters, promise); 3–5 sections opened by a
  section card; CONCLUSION 25–45 s (recap, answer, closing thought). `script_check.mjs` now ERRORS on "Meet <Name>", "our imagined…",
  "Day one", "Let's run it", any capitalised name used ≥ 3 times that is not on the script's `REAL:` line, a hook < 30 words or
  without a question, a conclusion < 55 words; WARNS on < 3 section cards and on shots > 40 words. WHAT PEOPLE SAY is optional.
  Tested: the rejected money-disappears script now fails with exactly the owner's complaints.
- **Pace**: IFM beats leave 0.34 s between lines (was 0.06) and ≈ 1.2 s between beats (was 0.6); `pause=<s>` holds a beat after the
  hook/section/reveal; voice.py breath between sentences 0.26 s (was 0.14); `--speed 1.0` (was 1.06). Word budgets at 2.35 words/s
  (script_check, variety). Tested on money-disappears: the same words run 7:33 instead of 6:15.
- **Sound** (minimal by default for IFM; story header `sound: full` restores the old design): the picture makes no sound (act sfx,
  scene beds, `!`-lettering hits, dir= flip/shock/freeze sounds and weather layers are silent); a beat asks for a one-shot with
  `sfx=name@k`; sound_design keeps ≤ 1 per 30 s, no ambience beds, music −5 dB lower (≈ 20 dB under the voice), stronger duck,
  no stingers; master −16 LUFS (was −13) in sound_design and in make.mjs' final loudnorm. QA no longer "fails" low density.
  Tested on money-disappears: 0 events, −16.0 LUFS, TP −3.4 dBTP.
- **Glare bug fixed**: the WebGL post pass had no `calm` grade and fell back to `warm` (bloom .26 + halation .1) — the white haze on
  every light IFM frame. ifm_calm.js now defines GRADE_GL.calm and zeroes bloom/halation everywhere (measured: a cream pixel 228 stays
  228, was 255).
- **Pictures**: `tools/emoji_build.py` → `engine/library/emoji_data.js` (OpenMoji, 2,078 glyphs, 2,119 names + aliases, flags by
  country name; CC BY-SA 4.0 credit) and `IFM.emoji(name, x, y, size, o)` (Path2D, bitmap-cached). New explainer kit
  `engine/library/ifm_explain.js`: ex_show ex_compare ex_flow ex_list ex_stat ex_chapter ex_quote ex_timeline (docs:
  references/explainer-kit.md; names: EMOJI.md); calm backgrounds kept ≤ ~230 so the grade never blows them out; ex_ acts get a gentle
  WS push by default (titles never cropped). preflight errors on an unknown illustration name. variety treats a different
  illustration as a different picture. Tested on stories/test-ifm-explain.story (contact sheet).
- **Voices**: 28 Kokoro English voices rendered with the same expressive paragraph → Drive `voice_samples_2026-11-04/` (+ one file
  with all of them in order) for the owner to choose. Supertonic 3 and Chatterbox Turbo could not be fetched in this session
  (HuggingFace is blocked by the network policy; weights not in this Drive).

## 2026-11-04 · preflight + faster render
- `tools/preflight.mjs` (new; runs inside make.mjs before anything is rendered): voice lines collected = the story's caption lines,
  word for word; every act exists (no silent fallback picture); calm look active, no bloom, calm transitions; every scene draws
  without throwing. Fails fast. Added after an old voice track was reused (the calm compile wrapper dropped SB.compile options).
- make.mjs also refuses to continue when no voice lines were collected.
- Render speed: jobs = CPU cores (was 3), x264 preset fast (was medium; CRF 17 unchanged), `--fps 25` option (17 % fewer frames).

## 2026-11-04 · calm house look + precise actions (owner feedback on the remake)
- `ifm_calm.js` (new, applied at compile): calm transitions only (cut fade slide match zoom zoomthru ink), jerky dir= effects dropped
  (flash shake glitch chroma speed zblur shock mblur), whip/dutch → push/float, glow() softened, fillFrame without light shafts.
- People (`ifm_people2.js`, same facet style): chairs under seated people; held objects (`o.hold` letter sign box cup bag pen);
  new poses read sitread sitphone hold holdsign talk worried nod, hand-to-face poses fixed (think was hidden behind the body);
  stride-matched walking/running (`IFM.WALK/RUN`, `IFM.walkX`), crowds use depth haze instead of see-through people.
- Pacing: a breath between caption lines in vis beats (.32 s), voice `--speed .95`; review targets 4–7 s shots;
  variety/script_check error on banned transitions/effects; the director's script gains LINK and ACTION fields.
- EPISODE.md §00 house look: calm, no glare/flicker, unhurried, continuity, precise actions, same style, research as reference.

## 2026-11-04 · vertical-only 5–6 min, low small captions (owner)
- Format: ONE vertical 9:16 film, 5–6 min; no 16:9, no separate short. `new_episode.mjs` writes one story; `gate.mjs` lints 9:16 only;
  `cost.mjs` checks 9:16 (`--both` for 16:9); `ship.sh` ships `<slug>_vertical_9x16.mp4` from `out/<slug>_9x16.mp4`.
- `variety.mjs`: length from measured speech (2.8 words/s final) and the rule is now 5–6 min (≈ 840–1000 words).
- Captions (`engine/library/ifm_brand.js`): smaller (30 u vertical, 26 u wide), 9:16 band starts at 74.5 % and grows down
  (≤ ~79 %), max width 72 % — under the picture, clear of the Shorts/Reels/TikTok UI. EPISODE.md, IFM_HOUSE.md, BRAND.md, brief, PROTOCOL updated.
- Tested on ai-runs-a-country (vertical render of the full story); its bespoke acts moved out of the caption band.

## 2026-11-04 · render-cost gate + phone skyline cache
- `tools/cost.mjs` (new, inside `gate.mjs`): times real full-size frames every 1.5 s in both formats; > 800 ms = ERROR, > 400 ms = WARN.
- `engine/library/ifm_world2.js` `phone`: the blurred skyline is drawn and blurred once per size and cached (was a live ctx.filter blur: ~12 s a frame → ~0.19 s, same look).
- `EPISODE.md`: render-cost rule, render watchdog, time budget (one episode ≤ 3 h).
- Tested on ai-runs-a-country: the old phone shot is flagged ERROR (12–29 s/frame); with the cache it renders at ~190 ms.

## 2026-11-04 · IFM 7 (picture first, alive, clean composition — owner)
- `ifm_life.js`:
  - automatic background life per scene (birds, leaves, butterflies, shooting stars, blinking aircraft, dust, ripples; `life=` / `life=off`);
  - a blurred foreground silhouette for depth (`fg=` leaves branch window blinds grass rocks crowd wires);
  - both are drawn under the lettering.
- Crowds react: `react="shock@1|cheer@2"` ripples the new pose across the crowd.
- The sim clock shows when it changes and fades after 3 s (header `clock: always` keeps it).
- Lint composition:
  - the IFM captions now register with the lint (they did not, so caption-over-face went unseen);
  - new warnings "text covers a face" and "text covers <subject>" (people, creatures, bank items register their bodies).
- 9:16 layouts recomposed: subjects live in 15–57 % (crowds, city ground, animals, Mars surface, stage sets), above the 47–65 %
  caption band; the bottom is decoration.
- `variety.mjs` warns:
  - when > 15 % of beats are data or machine scenes;
  - when there is more than one counter per minute;
  - when < 50 % of beats move the camera with intent.
- `EPISODE.md` §0 "Picture first" (story through people, places and things; liveliness checklist; composition in both formats);
  `ifm-director.md` §0.

## 2026-11-04 · gate timeout
- `tools/gate.mjs`: each step may run up to 60 min (was 15). A 4.7-min film's lint in both formats took about 17 min in
  this container, so the gate died silently with no report. Tested on ai-runs-a-country.

## 2026-11-04 · IFM 6 (fresh-chat readiness)
- Verified on a clean clone: `setup.sh` ALL OK (deps, voices, Chromium, Drive, stock: 92 tracks, 401 SFX, 10 icon packs);
  `new_episode.mjs` scaffolds; `gate.mjs` PASS on test-ifm-demo-v (lint 0/0 both formats, review 92).
- Fixed: Muse's wave-1 music shares one library.json across 3 zips. The importer now skips tracks that live in another zip
  (it imported 70/92 before, 92/92 now).
- `tools/ship.sh`: delivers the CRF-17 masters with PROTOCOL names, cover, srt and stories zip, and prints the delivery block
  and the music credits. `jobs/deliveries/_TEMPLATE.md` added.

## 2026-11-03 · IFM 5 (Muse's stock library wired in)
- `tools/stock_sync.sh` (called by `setup.sh`) pulls everything from Drive and imports it:
  - **music:** 92 tracks, 11–12 per mood;
  - **SFX:** 401 files, 196 `ifm_*` families;
  - **icon packs (10):** tabler, phosphor, phosphorfill, lucide, iconoir, remix, bootstrap, heroicons, feather, aiga;
  - **on disk:** textures, 15 OFL font families, Natural Earth.
- `icons.py` detects line vs solid packs, reads nested folders (`--recursive`) and skips Logos folders.
  `IFM.icon` refuses brand marks (brief: no logos).
- OpenMoji is left out: its mixed stroke/fill SVGs render wrong.

## 2026-11-03 · IFM 4 (token-lean production, same quality)
- `EPISODE.md`: the one page to read for an episode (setup, shape, picture menu, `dir=` cheat sheet, gates, render, delivery, token rules).
  It replaces about 90 KB of docs per session.
- `API.md`: every painter and helper signature, so engine source is never read to write bespoke shots.
- `tools/gate.mjs`: lint in both formats + variety + review in one report of about 6–20 lines and one contact sheet.
  Tested on test-ifm-demo-v: PASS, review 92.
- `tools/new_episode.mjs`: scaffolds the long story, the vertical story and the bank file (registered), so nothing is written twice.
- `tools/qa.py --lean`: the per-second visual QA keeps one frame per second, 60 per sheet (5-min film = 5 sheets instead of 8).
  Round 1 of the per-second QA is automatic (lint every 0.25 s + review motion).
- `CLAUDE.md`: lean reading order; the gate command; the scaffold step.
- Bespoke acts use the `x_` prefix (`kind=w act=x_…`) and get every world feature; `variety.mjs` counts them as bespoke.
- Scale-ladder labels stay inside the frame (caught by the gate).

## 2026-11-03 · IFM 3 (directing, asset bank, motivated sound)
- **Director track** `dir=` on ANY vis beat (`engine/library/ifm_director.js`):
  - camera into a point, pan, roll, shake, orbit;
  - pseudo-3D flip, tilt, card;
  - slow motion and freeze;
  - frame effects: flash, chroma, glitch, speed lines, shockwave, zoom blur, sub-frame motion blur, vignette, iris;
  - 20 kinetic text styles (counter, scramble, type, highlight, extrude, glitchtext, outline + the typekit looks);
  - exact sounds.
- **New 3D transitions:** flip3d, fold, shatter, pixel, tunnel.
- **Asset bank** `ifm_bank.js`:
  - `IFM.bank` registry, 24 core items, `act=stage`;
  - per-episode files in `engine/library/bank/<slug>.js`;
  - `tools/bank.mjs catalog|sheet` writes `BANK.md`;
  - episode-seeded casts, so no face repeats between episodes.
- **Icons:** `tools/icons.py` imports any SVG pack; Tabler (MIT, 5,203 icons) is installed by `setup.sh`; use `IFM.icon()` or `icon:<name>` in the bank.
- **Motivated sound only:** no auto fillers or random sweeteners for IFM, no per-line accents; hits only on twist, data and gold lettering, and on `dir=` sfx.
  The test went from 47 to 30 events in 46 s.
- **New SFX families** in `sfx_ifm/` register themselves.
- **variety.mjs** warns:
  - when < 60 % of beats are directed;
  - when text styles or effects repeat;
  - when bank items come back from the last two episodes.
- **New guide** `references/ifm-director.md`: timing, camera, kinetic type, inventing shots, transitions, sound, the frame line format.
  Learned from the Remotion agent skills, the animation principles and Muse's reference study.

## 2026-11-03 · IFM 2 (owner's round-2 notes)
- **Voices:** am_puck narrates (bright), af_bella is the second voice; the defaults are in `voice.py`.
- **Music:** Muse's 30 real tracks via `tools/music_lib.py` (ported). The mood follows each scene, tracks rotate, the bed sits 4 dB lower.
  `sound_design.py` uses the library for IFM by default.
- **SFX:** Muse's 76-sound pack registered as `ifm_*` in `sfx_pro.py`. World beats emit a bed, line accents, lettering hits and clock relays; the brand acts use the pack.
  Density on the test passes every window (hook 15, body 15.2, payoff 12.5 per 10 s).
- **People and creatures, new styles** (`ifm_people2.js`): `facet` low-poly (default) and `holo` simulated; dog cat horse dino bird fish whale robot.
- **Layers** (`ifm_world3.js`): `fx=` (rain snow dust sparks rays bokeh embers glitch confetti fireflies holo) and `look=` (blueprint xray night vintage mono warm cold).
- **New acts** `scale` (size ladder), `guess` (viewer commits before the twist), `animals`.
- **Vertical safe zones:** captions in the 47–65 % band, HUD and lettering below the top 14 % (Muse, _PLATFORMS.md).
- **Setup:** `setup.sh` pulls the music and SFX packs from Drive and imports them; Supertonic is optional.
- **Tested** on `stories/test-ifm-round2`: lint clean in both formats, sound QA density ok, stills only (no video render, owner's request).

## 2026-11-03 · IFM 1 (The If Machine conversion)
- Brand layer `engine/library/ifm_brand.js` (header `channel: ifm`, default):
  - Unbounded / Inter / Space Mono, the BRAND.md palette;
  - Inter karaoke captions (small, fixed);
  - the lever hook, the machine, the answer ticket, the RUN ticket end frame (6 s);
  - `scan` / `ticket` / `brand` transitions, the simulation clock HUD (`clock=`).
- New people `engine/library/ifm_people.js`: styles flat / pill / shadow / line, 15 poses, phones that light faces. The old chibi rig is retired for this channel.
- World kits:
  - `ifm_world.js`: globe on Natural Earth land, city in 3 views with blackout cascades, crowd, map, count, split NOW|IF, camera rigs, cue lettering;
  - `ifm_world2.js`: the cosmic zoom, phone POV / desk, data-centre aisle, time-lapse sky, planets and surfaces with 1–2 suns, money / card declined.
- Variety guard `tools/variety.mjs` + `history.json`: no repeats inside an episode; caps on overlap with the last 3 episodes; length 3–6 min long / 60–90 s vertical.
  `lint.mjs` runs it for IFM stories and checks IFM lettering in both formats.
- Voices: Supertonic 3 (`supertonic:M1|M2|F1|F2`, `voice.py setup-supertonic`). Chatterbox Turbo is not usable on this container (too slow, no CPU torch).
- Brand sounds `ifm_lever`, `ifm_ding` in `sfx_pro.py`.
- Tools: `still.mjs` (full frames), `montage.py` (contact sheets).
- `setup.sh` installs the python deps (scipy was missing).
- Tested on `stories/test-ifm-brand`, `test-ifm-world`, `test-ifm-world2`, `test-ifm-demo-v` (both formats lint-clean). Vietnam stories moved to `stories/legacy/`.

## 2026-10 · v10.1 (layout guard, all English)
- `toontype.js` layout guard: per-frame lettering boxes (keyed by scene time); bubbles and bursts slide clear of words, never into
  the caption band. Draw big words first.
- Ep6 acts re-placed so bubbles/bursts sit beside faces, the tour group's walk lasts its caption, labels sit on empty ground.
- SKILL.md rewritten as one clean v10 house format: acted cast, designed cartoon lettering, 3-s hook, continuous action,
  no chapters, nothing overlaps, all English on screen, frames checks in both formats.

## 2026-10 · v7 (art styles)
- `engine/library/artstyles.js` + header `artstyle:` / beat `artstyle=`: 11 whole-frame looks (comic, watercolor, riso,
  papercut, dongho, lacquer, neon, pixel, vhs, chalk, storyb) with real posterisation and palette mapping, ink-line
  extraction, halftone, grain, paper and crackle textures. `references/art-styles.md` says which look fits which content.

## 2026-10 · v6 (ultimate: content, sound, music)
- **Content**: `references/content-strategy.md` (platform rules 2026, packaging, topic rubric, 40 scored ideas),
  `references/writing-retention.md` (hooks, retention model, open loops, bland-script detector, 0–100 rubric),
  `references/story-devices.md` (46 devices, recurring cast, joke density, Ep.4 critique + rewrites).
- **Sound**: `tools/sfx_pro.py` — 358 sounds in 17 categories (253 curated CC0 samples, 3.2 MB, + layered synthesis),
  per-call variation. `tools/sound_design.py` rewritten: event list → rule table → priority scheduler → bus mixer → QA
  (ep4 vertical: 6.8 → 14.0 events/10 s, 19 → 46 unique sounds, 23 → 0 silent gaps, phone loss 15.1 → 3–5 dB, −13 LUFS / −2.4 dBTP).
  `engine/timeline.js` emits character, camera, transition, UI and lettering events into the cues file.
- **Music**: `tools/music_pro.py` — 19 moods (vn_folk, vn_epic, wonder, tension, lofi_hanoi, sad_comedy …), real song form from the
  cues, anti-repetition (12 → 0 repeated 4-bar blocks), hit points, comic buttons, 9 stingers, stems, phone-band energy 20 % → 52 %.

## 2026-10 · v5 (cinema craft: lettering, sound, captions)
**New**
- `engine/library/typekit.js` — 12 art-directed lettering looks on any beat (`art=` `artfx=`): slam, stack, count, stamp, typeon,
  mask, gold, neon, comic, hand, split, sign. Seven new OFL display fonts with Vietnamese (Anton, Oswald, Playfair Display,
  Bangers, Pacifico, Patrick Hand, Bungee) as font roles `impact cond serif comic script hand sign`.
- Sound: trailer grammar in `tools/sound_design.py` — riser, boom (sub-drop), riser_hit, braam, shimmer, neon_buzz, tick_roll,
  whoosh_by (doppler), horn_far, bus_horn, air_brake, city_bed; automatic sounds for lettering, flat-3D streets (near-miss,
  bus, titles, running), shot_eyes/bird/worm, 3D set pieces, chapters, film titles; **silence before the hit** (music dips)
  automatic on big titles and on `drop=`; negative `sfx=` offsets for J-cuts.
- Captions: automatic accent colour on numbers/years/prices; `caps=off` per beat.
- Lint `cinema` checks: lettering density, too many looks, repeated angles, no silence-before-hit, no colour script.
- References: `cinematography.md`, `typography.md`, `sound-music.md`, `captions.md`. SKILL.md rewritten around a shot list
  and a WOW checklist.
**Fixed**
- A comment had swallowed the caption baseline line in `engine/ui.js` (render crash).

## 2026-10 · v4 (Ep. 4 — flat-3D sets)
- FLAT3D: pinhole camera + near clipping + painter sort + sun shading + fog for flat polygons; billboards for characters.
- Hà Nội Old Quarter street set; `street3d` directed shots (cam presets/paths, walking, flow-around, near miss, bus, titles).
- Detailed scooter + rider art (front/back, masks, passengers, plates); stratus skies; ground light pools; wires clamped near lens.

## 2026-10 · v3.2 (WOW pass)
- Real 3D: three.js r160 vendored (`engine/library/three.min.js`) + `scene3d.js` (map3d, fleet3d, solid 3D titles).
- 2D cinematic set pieces `wow_*`; Kurzgesagt-style `charstyle: nutshell`, `grade=nutshell`, places cosmos / nutshell_lab / orbit.
- Captions in 9:16 smaller (46) and lower (baseline 76 %, raised only when a beat sets capY < .6).

## 2026-10 · v3 (Ep. 3 — Vietnam's S; two formats)
- Every episode = vertical cut (≤ 3 min) + YouTube 16:9 cut (≤ 10 min); `references/viral.md` + per-episode viral research step.
- `# sshape` map beat (grow / terrain / narrow / length, country face, golden S); map zoom now scales with render size
  (it looked right in qa at .25 but tiny at full res — always audit frames from the finished file).
- Voice delivery pass: held beats on `…`/` — `, slower short punchlines; narrator default af_heart.
- `capY=` on any beat; `qa.py --fmt 16x9`; full speaker names in SRT; `make --no-deliver` no longer crashes; hats crown/mandarin.

## 2026-10 · v2 (Ep. 2 egg coffee upgrade)
**Fixed (root causes found by second-by-second QA of Ep. 2 v2)**
- Extras floated at awning/counter height: they walked on a hard-coded line 150 u above the ground. Now every place
  declares its walkway (`WALK` / `place.walk`); places without one get no automatic extras; auto extras only in
  establishing beats and they fade out from MLS inwards.
- Heads cropped in close shots (9:16): headroom now counts hair/buns/hats; shot sizes keep ≥ 2 head-widths at MS;
  hands-busy characters (hold / stir / sip / wipe…) are never framed tighter than MS.
- Talk props floated in mid-air: they now stand on a low table beside the host; coverage alternates two-shot / medium.
- Coverage silently dropped shots (sequence filter compared against dropped entries) → dialogues stuck on a wide shot.
- Info cards left the bottom half of 9:16 empty (host hidden): host now shown small below; captions between.
- Captions sat inside the TikTok/Reels bottom UI: vertical safe area y ≤ 70 %, width 74 %.
- Light-leak washed whole frames to white; stat numbers and banners overflowed narrow frames; long film titles now wrap.
**New**
- `tools/qa.py` (one still per second → contact sheets), `tools/deliver.py` (one universal < 30 MB file, SSIM-checked),
  `tools/sound_design.py` (33 synthesized foley sounds, place beds, beat grammar, `sfx=` cues, multi-mood `score:`).
- Places `metropole_bar`, `giang_kitchen`, `hanoi1946` (with tram), `cafe_giang`; props `egg_whisk_bowl`, `caphe_trung_bath`.
- `grade=sepia`; steam moment and paper titles now move (push, sway, drifting light/dust).
- Faster default narration (~3.1 words/s), tighter caption/dialogue gaps; film grain lowered (files 3× smaller, same look).

## v9 — house format (Oct 2026)
- Visual-first format: `# vis` (hero, macro, explode, vs, receipt, grid, bars, daycycle, build) + close-ups in `vis_close.js`
  (coffee, ride, ticket, cheers, bed, hagiang, trainstreet, build set buncha). Fixed HEAD / STAGE / CAPTION layout; motion bridges.
- `# nw` nutworld: the street drawn in nutshell 2D as a multiplane camera (5 planes, traffic, steam, lanterns, dawn→night,
  close-shot lens whips, POIs cart/cafe/pho/biahoi/hotel, pinned price tags).
- `transitions2.js`: zoomthru, match, liquid, burst, blobs, spin, slices, cube, ripple, bloom, stripes2, drop (+ `tc= tc2= tcol= tdur=`).
- Captions: one style only, small (34 u / 30 u) and fixed in the bottom band; capY ignored; kinetic caption styles disabled.
- One look: props in vis are drawn in the nutshell char style (no outlines); end frame redrawn in nutshell.
- lint: `ERROR format` when > 15 % of beats are talking heads or two in a row; capY warning.
- tools/sheet.mjs: contact sheet of real frames (v / h) before rendering.
- world3d.js (three.js street) kept for special set pieces only — reads as a game, not house style.
- references: vis-format.md, nutworld-transitions.md, script-frames.md, world3d.md. Reference episode: ep5v2 / ep5v2-yt.

## 4 Nov 2026 — engine 3.0, phase 1–2: shot grammar + 3D sets
- `cam=<SIZE>.<angle>.<move>[:fx,fy]` (EWS WS MS MCU CU ECU · eye high low top dutch ots pov · push pull trackL trackR pan tilt crane drop orbit dolly)
  on any 2D world beat and in `then=` cuts; moves run over the shot (segment), not the whole beat. `IFM.depth(d, fn)` for 2.5D layers.
- New `ifm3d.js`: `act=s3 set=city|street|plaza|office|home|waiting|servers on=<subject>` — flat-shaded facet 3D sets with posable
  3D people (walk, phone, type, sit, sitphone, talk, cheer, sign, wait), traffic, blackout cascade (`dark=`), day/dawn/dusk/night.
  The same shot grammar drives a real 3D camera (size → distance, angle → elevation, move → path). Sets are built at load;
  transitions hold the outgoing/incoming 3D frame; static matrices frozen. Cost ≈ 300–450 ms/frame at 0.62 render scale.
  Tested on a 7-set story (contact sheet checked frame by frame).

## 4 Nov 2026 — 3D realism + variety (owner: real scale, nothing through anything, no repetition, light renders)
- Real sizes: cars 4.3 × 1.8 × 1.5 m with wheels on axles; feet on the ground; street trees with canopies above 2 m.
- No overlaps: traffic lights in the city (cars stop on red, one car per lane), same speed per lane; walkers in one-way lanes;
  street furniture on the curb band; plaza walkers in straight lanes around the fountain; protesters in a block before the steps.
- Camera never inside a building (raycast to the subject). New gate step `tools/sim_check.mjs` (120 s of each set the story uses:
  person×person, car×car, person×car, fountain) — all 0 on the sample.
- variety.mjs: a repeated 3D framing in one film and a set over 35 % of the 3D cuts are flagged; `seed=` varies city/street layouts.

## 4 Nov 2026 — engine 3.0 FINAL (owner: "2D and 3D combined, director/art/cinema, varied shots — chốt nâng cấp")
- Hybrid 2D+3D: `pins=` (2D labels pinned to 3D subjects, follow the camera, stack clear of insets), `pip=` inset card on any beat
  (2D over 3D or 3D over 2D; `pipAt`, `pipPos`), `act=split` with s3 halves.
- Director script: new LOOK field (art direction) and medium `2D+3D`; script_check: 3D share 25–55 % (> 60 % = error), no 4 cuts in a
  row in one medium, hybrid shots every ~2 min, match cut + montage, ≥ 4 looks. variety.mjs: 3D > 60 % of cuts = error.
- Docs: EPISODE §0b, craft §3, CLAUDE.md step 3, roadmap marked final. The AI episode is dropped (owner: no remake).

## 4 Nov 2026 — alive every second + second-by-second direction
- Director's script: new TIMELINE field per shot (a moment at least every 2 s); script_check enforces count and gaps.
- cost.mjs: motion check (mean picture change over 0.6 s each sampled second; < 3 = still): WARN at 2 still samples in a
  scene, ERROR at 3 (frozen). Calibrated: an empty static room = 2.2, the 1-minute sample median 7.5 (it flags the slow map
  push and the static phone close-up, which were indeed too still).
- Docs: the 2D half = the existing living 2D acts and bank, cut with the 3D sets.

## 5 Nov 2026 evening — engine 4.0: 2D only, polished, flowing (owner's notes on the money remake v2)
- Owner: pins jumped about; music unrelated to the content; narration slow and disconnected; drop the 3D; 2D scenes realistic,
  polished, clear and relevant; transitions, morphs and animation scripted and flowing; no overlaps.
- pins= (3D labels): the label box sits in a fixed slot; only the dot and leader follow the subject (no more side flips).
- Narration flow: storyboard groups each beat's lines; voice.py speaks a beat (one voice) as ONE Kokoro utterance (`tts_flow`) and
  cuts it at the quietest point near each line's share of the text (`split_at_pauses`); durs entries `[d, 1]` chain the lines with
  no added gap. Beat padding .35 + .85 s → .2 + .45 s (`lead=`, `tail=`); line gap .34 → .3 s.
- Music: `score: <track_id>@<beat>` names exact library tracks per section (music_lib.pick, sound_design); variety checks it.
- 2D only: variety ERROR on any act=s3 (header `allow3d: yes` lifts it); script_check errors on 3D cuts, drops the 3D-per-minute
  and hybrid rules, asks for one 2.5D picture a minute.
- Soft places: depth of field (cached blur, veil, light motes, no foreground clutter); `sharp=1` for the old look.
- Subjects in the light: `IFM.emoji(…, { hero: 1 })`; kit pop-in is a gentle spring (E.back); kit flow and stat grids end above the
  caption band.
- New transitions: morph (shared subject lifts out and lands on the next subject), push2 (parallax push, `tdir=up`), wipe (soft
  diagonal), dissolve (drifting cross-dissolve); story keys `tr1= tr2= tdir=`. All in the calm set.
- script_check: flow (≥ 9 words a sentence on average, warns on strings of short sentences and cold starts), ≥ 40 % connecting
  transitions, focus points for match/morph/zoomthru.
- Tested on the money episode (remake v3): 44 beats, 24 bespoke 2D scenes, 0 % 3D.

## 5 Nov 2026 night — PREMIUM becomes the house standard (owner: "5/10 → make it much better"; then "OK, make that the engine standard")
- New `ifm_premium.js` (IFM.PX): drawn lit objects, faceless posed people, motion typography (kicker, masked headline with gold marker
  words, counter, animated callouts, serif quotes), light (lit gradients, rim, contact shadows, glints, rays, haze), finish (grain,
  vignette, motes). Fonts Unbounded / Inter / Space Mono / Playfair Display.
- New `ifm_premium_kit.js`: IFM.emoji draws the PX object when one exists (PX.DRAW); every title is a premium headline (kick=, *gold*);
  IFM.tag is a clean pill; the explainer kit is redrawn (show, compare, flow, list, stat, chapter, quote, timeline); every x_ act gets
  the premium title (if it has none) and the finish; the 2D camera is gentle so the title band is never cropped. `look: classic` = off.
- variety: warns on scenes without kick= and on kit beats whose main subject is an emoji with no drawn version.
- Bank: money-v5.js (x_px_hook with money/signals/tags, barter, signal, queue, parcel, reborn, stat, promise). Tested on the money episode.

## 5 Nov 2026 night — premium v6: punchy hook, spoken ending, no drifting edges (owner: 7/10; "don't redo the episode, upgrade the engine")
- ifm_world shot(): overscan — the zoom always covers sway, angle squash and roll, so no edge of the picture shows.
- ex_cold (house act): the cold open — one punch word per caption (`w=` with *gold*), one drawn thing per line (`items=`), the last
  line dissolves everything into gold dust, `end=` kicker. ex_outro (house act): the closing thought spoken while drawn things merge
  into one glowing word, then "Next time on The If Machine" with a teaser (`next=`, `e=`). Both in ifm_premium_kit.js.
- Chapter cards: chapter progress (01 / 05 + dots), optional `sub=`. Quotations: a clean paper card instead of a blurred library.
- City parallax layers drawn wider and clamped (money-v5).
- script_check: the first shot needs ≥ 3 punch lines; the last shot must be an OUTRO that names the next episode. variety: warns
  when the first beat is not ex_cold, errors when the last beat is not ex_outro.
- Tested on the money story (S01 → ex_cold, S45 → ex_outro); the episode is NOT re-rendered (owner: engine only).

## 5 Nov 2026 night — premium v7: brand-film transitions and type (owner: "learn from ElevenLabs' videos; bring home good repos/skills")
- Imported gl-transitions@3.0.0 (MIT, 186 GLSL shaders + an Agent Skill): 42 calm ones curated (`tools/gl_import.mjs` →
  `engine/library/gl_trans_data.js`), rendered by `engine/library/gl_transitions.js` (one WebGL canvas, half-size, eased): `trans=gl<Name>`,
  `tdur=`, `tp=`. Excluded: flashes, glitches, TV noise, colour splits, light blow-outs, fast whips, black-floor 3D (Doorway, Swap).
- Pre-roll (engine/timeline.js `_lead`): the incoming scene starts up to .95 s early in the premium look — no empty reveals.
- Headlines: blur-to-sharp mask reveal; `X.orbs` soft colour fields (cold open, chapters, outro).
- Project skills: `.claude/skills/gl-transitions` (vendor skill + our usage note) and `.claude/skills/ifm-motion` (house standard).
  `references/transitions.md`: the curated list with "use it for". Test: `stories/test-gl.story` (CrossWarp, InkBleed, Doorway→dropped,
  BokehDissolve): render cost max 708 ms.
- Not adopted: Remotion and its Agent Skills (React-based renderer; adopting it would replace the canvas engine).

## 7 Nov 2026 — IF CREW locked as the house look (owner)
- Rejected first: a geometric style lab (6 graphic styles, "ugly") and a cartoon style lab (6 drawing styles; BEANS liked but "not ours").
- cast.js: 6 original characters + Iffy, signature shading (crescent shadow with halftone dots, light rim), cut-out sticker border,
  pose/face library with eased acting and follow-through, props and layered environments (street, market, shop row) in the same
  language; house act `act=crew` (set=, actors= with timed pose/face steps, props=). Tested in stories/test-cast.story.

## 7 Nov 2026 — IF CREW comic layer + content-first rules (FINAL STANDARD)
- cast.js: poses `take`, `slump`; faces `take` (eyes pop, jaw drop), `cry`, `deadpan`; gag kit `IFM.CAST.GAG` (zing impact lines,
  sweat, marks, speed lines, legcoin, meltnote, cowtie, weirdIffy); `act=crew` props `runcoin|melt|tie|weird`, take → impact lines.
- EPISODE.md: comic layer rules (gag = visual metaphor of its line, ~1 per 20–30 s, 2–3 new gags per episode) and §0 CONTENT FIRST.
- Tested: stories/test-gag.story (4 demo scenes + one act=crew beat).

## 7 Nov 2026 — IF CREW v3 construction
- cast.js: new draw()/head3() (big head, 3/4 view, big close eyes, bold nose, wide mouth, hair volumes, flat hard shadow, tapered
  limbs, mitten hands); old body kept as drawV2 (`o.v2`). Tested: test-cast.story, test-gag.story.

## 7 Nov 2026 — FINAL look: IF CREW v3 for the whole world
- cast.js: six world demos in the v3 language (space, ocean, tech, map, body, data); EPISODE.md §0 "THE WORLD in the same language".

## 7 Nov 2026 — PIXEL LAB (demo, not the standard)
- engine/library/pixel_lab.js: act `x_pixel s=nes|gb|bit16|arcade v=<IF CREW scene>` re-renders any scene as pixel art (palette snap, Bayer dither, ink outline, scanlines; crisper title grid). Demo: stories/test-pixel.story.

## 7 Nov 2026 — VOXEL LAB (demo, not the standard)
- engine/library/voxel_lab.js: an original block style in 2D isometric (culled unit blocks with pixel grain, painter sort, IF CREW as block people with painted pixel faces). Act `x_vox v=village|planet|ocean|chart`; `IFM.VOX` (box, render, Vox, person). Demo: stories/test-vox.story.
- Voxel lab v2: floating island village (river, houses with windows, market, trees, flowers, 3 block people), 12×12 pixel faces, hands and shoes, edge rims, 3D block titles, rays, sparks, fog; ocean (palms, boat, shells) and chart (city, onlookers, rising coins) richer.

## 7 Nov 2026 — style decision (final)
- IF CREW v3 is the house look for every episode; voxel_lab parked for a possible "Blocks" series; pixel_lab lab only.
