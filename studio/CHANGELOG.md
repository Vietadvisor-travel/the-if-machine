# Motion Studio — changelog

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
