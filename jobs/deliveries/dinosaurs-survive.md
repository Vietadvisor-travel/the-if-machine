# Delivery — Nếu khủng long còn sống (dinosaurs-survive) · RUN #2 · 2026-11-07

## Files (Drive TheIfMachine_Media/dinosaurs-survive/)
- dinosaurs-survive_vertical_9x16.mp4 · 5:56 · 1080x1920 · 25 fps · 546 MB master — https://drive.google.com/file/d/15UBpxrxpRqyDb_ZQ5UzARDV-U5pBIf9T/view
- dinosaurs-survive_cover.jpg · dinosaurs-survive.srt (English) · dinosaurs-survive_stories.zip — folder https://drive.google.com/drive/folders/135v642uW9v2FLTBwZTIK4lzEs4eAAVV7
- dinosaurs-survive.srt · 8.0K
- dinosaurs-survive_cover.jpg · 216K · 1080x1920 (cover frame t=244 s, S23 crowned chicken, "STILL A DINOSAUR" / "THE HEIR")
- dinosaurs-survive_stories.zip · 16K
- dinosaurs-survive_vertical_9x16.mp4 · 546M · 356 s · 1080x1920

## Production
- Voices: af_heart (narrator, Kokoro, Apache-2.0). No quote/legend lines used in this episode.
- Music credits: "Mystery Bazaar", "Darkling", "Lightless Dawn", "Autumn Day" — Kevin MacLeod (incompetech.com), CC BY 4.0. Every credit line goes in the YouTube description.
- Gates: gate.mjs PASS · review 90/100 · qa.py exit 0 (430 frames, 8 sheets, no problems flagged) · render cost median 363 ms, max 675 ms.
- Length: 5:56 (vertical 9:16).

## Facts on screen (each with its source from the research pack)
- Dinosaurs first appeared ~230 million years ago and ruled ~165 million years — F1
- An asteroid hit near Chicxulub, Yucatan Peninsula, Mexico, ~66.04 million years ago — F2
- Asteroid ~10-15 km wide, crater ~200 km wide — F3
- The impact wiped out non-avian dinosaurs and ~75% of all species — F4
- Birds are the only surviving dinosaur lineage — F5
- Archaeopteryx (Germany, 1861): feathers, hollow bones, wishbone — F6
- Feathered fossils from Liaoning, China: Sinosauropteryx, Microraptor, Anchiornis — F7
- Before the impact most mammals were nocturnal, many no bigger than rats or shrews, living on insects and seeds — F8
- Within ~10 million years of the extinction some mammals reached modern bear size — F9
- Humans have existed ~300,000 years, roughly 500x shorter than the dinosaurs' rule — F10

## Honest notes
- Outro teaser names the next episode "What if Earth stopped spinning?" — the owner has NOT picked next week's 4 yet (shortlist WEEK_2026-11-09.md); if he picks differently, the teaser line is stale.
- Render was killed once by a runtime restart at 19:34 (57 min in, parts 366 MB); re-ran with --reuse-mix from frame 0 (VO + mix reused). render.mjs now has a frame-cache resume (new this episode, tested kill/resume on a 4 s slice: 17 frames reused, valid mp4, cache auto-deleted on success).
- sound_design.py ran out of memory 3x (OOM kill, RSS to 4.7 GB on 7.7 GB RAM); fixed by freeing full-length buses (LIBSEG.clear, del V/M/STG/Mp/STGp/FG/BG/AMB/B). Final mix 357.75 s, -16.0 LUFS, TP -4.09 dBTP. Its internal phone-speaker check printed "FAIL phone MUS -35.7 → -49.5 LUFS" while overall loudness/TP passed; music may sound quiet on phone speakers.
- deliver.py also wrote a 29.3 MB _FINAL.mp4 (551 kb/s, SSIM 0.9704, "visible quality loss" warning) — that is only the chat-size preview; the shipped master is the full-quality 546 MB file, never squeezed.
- Remaining gate WARNs are advisory only (21 scenes >12 s per lint's coverage metric, EWS x3 at cut 18, comet x2 / dino x6 as main subject, 14/27 scenes without kick=, thin-frame notes on 1/7/9/10/13/14/15_vis).
- Cover frame is t=244 s (S23 crowned chicken).

## For Muse
- Title options: 1) What If Dinosaurs Never Went Extinct? (used) 2) What If Dinosaurs Still Ruled Earth? 3) What If the Asteroid Missed Earth?
- Hook line (first 3 s): "One rock. Ten kilometres wide. Sixty-six million years ago."
- Post only after the owner says "đăng tập Nếu khủng long còn sống".
