# Delivery — Cô gái rơi từ độ cao 10 cây số xuống đất mà vẫn sống (fell-10km-from-sky) · ODDLY TRUE clip · v1 · 2026-11-14

## Files (Drive TheIfMachine_Media/fell-10km-from-sky/)
@@SHIP@@

## Production
- Format: vertical 9:16, 1:30–2:00 true micro-story (CLAUDE.md phase 2), realistic real-time 3D (IFM.L3) + minimal 2D (name tags, a
  28 counter, a blood-pressure gauge, an altitude counter, injury tags, the 10,160 M line).
- Voice: am_adam (Kokoro, Apache-2.0), speed 1.0. Narration is machine-generated.
- Music: "Airship Serenity", Kevin MacLeod (incompetech.com), CC BY 4.0 http://creativecommons.org/licenses/by/4.0/ — credit line in the description.
- Built from Muse's kit (`jobs/kits/fell-10km-from-sky.md`): DC-9 (Sketchfab CC-BY nobilishornet) cut into its three pieces with clipping
  planes (no extra model), airline trolley (Sketchfab CC-BY Bellatrix613), people eu-woman / eu-man-elder / eu-man (MPFB CC0) with the Mixamo
  clips, Poly Haven HDRIs (kloppenheim_06_puresky, snowy_hillside, surgery, kiara_interior), snow / carpet / plastic / tile / wood PBR, trees
  island_tree_02 + tree_small_02 with the leaves removed (January), desk + paper stack + desk lamp + arm chair (real models).
  Bespoke scenes: `studio/engine/library/bank/fell-10km-from-sky.js` (act x3_fall; reusable: dc9 pieces, sky with cloud deck + terrain,
  snowy forest slope, `settle()` for lying clips, `merged()` to cut a many-part model to one draw call per material).
- Gates: clip_gate PASS (clip_check PASS · real audio 118.6 s · 29 recorded sounds, none missing · cost median 2.1 s/frame, max 8.4 s) ·
  @@QA@@
- Length: @@LEN@@ (vertical 9:16; format 1:30–2:00).

## Facts in the VO (sources: S1 = Guinness World Records, 7 Apr 2022; S2 = Wikipedia "Vesna Vulović"; pack `jobs/research/fell-10km-from-sky.md`)
- 1972, a flight attendant, a fall recorded as 10,160 m with no parachute, and she lived — S1, S2 (said as "recorded": the 2009 missile
  theory of ~800 m is disputed by the black boxes, pack fact 12)
- Vesna Vulović, 22; not scheduled — the airline confused her with another stewardess named Vesna — S1, S2
- 26 January 1972, took off from Copenhagen bound for Belgrade (home) — S1, S2
- 28 people aboard; 27 died, she was the only survivor — S1, S2
- 46 minutes after takeoff a bomb exploded in the (forward) baggage hold (Czechoslovak Civil Aviation Authority; no arrests) — S1, S2
- The DC-9 broke into three pieces over Czechoslovakia (Srbská Kamenice; snowy wooded mountains) — S1, S2
- She was in the tail, pinned by a food cart; that and the snow/angle are why she survived — S1, S2
- Low blood pressure made her pass out when the cabin depressurised; doctors say it kept her heart from bursting — S1, S2
- Bruno Honke, a villager and former WWII medic, heard her screaming and gave first aid — S1, S2
- Fractured skull, pelvis, two broken legs, three broken vertebrae; days in a coma; paralysed below the waist (temporarily) — S1, S2
- No memory of the crash or the month after — S1, S2
- Walked again after ten months, with a permanent limp; went back to JAT at a desk job — S1, S2
- 1985: Guinness record, highest fall survived without a parachute; Paul McCartney presented the certificate and medal — S1
- "I am like a cat, I have had nine lives" — her words to the New York Times, quoted in S1
- The record still stands — S1 (2022)

## Honest notes
- Animated reenactment: every person is a generic 3D figure, not a likeness (no Vulović, Honke or McCartney likeness; McCartney is a figure
  seen from behind). The uniform is a plain navy suit, not the JAT uniform.
- The DC-9 is the real model cut at two lines with clipping planes; the torn edges are clean cuts with a dark inner skin, not modelled
  damage. The bomb is a muted flash and smoke (no fireball, as the pack asks). The tail cabin is a reconstruction (shell, ribs, windows, bins)
  around the real trolley; the trolley is a modern galley cart (the 1972 one was simpler).
- Hospital: a mattress with a cotton sheet in a ward HDRI (no 1972 hospital bed model exists in the library), seen three-quarter from the
  bedside; she wears a pale gown. The lying clip is Mixamo "Laying_Sleeping", so her arms move a little in the coma shots.
- The MPFB people have no eyeballs (the sockets showed red in QA round 1): the bank file adds a textured eyeball per eyelash ring on the
  Head bone, with skin-toned "closed lids" where she is unconscious (faint, blood pressure, injury, coma) and open eyes when she wakes.
  Clothes are pushed 14 mm out along their normals so the body no longer pokes through. Both fixes are reusable for every MPFB figure.
- Sounds are recorded stand-ins where needed: the explosion and break-up use a metal groan + wind (no recorded explosion in the library; silence
  over a fake one), the medal scene uses a crowd bed.
- 2D graphics (name tags, counters, gauge, injury tags, the 10,160 M line) are explanations, not records.
- Respect: the 27 dead are one plain line, no bodies; the bomb is stated once; politics and her death (2016) are left out; the clip ends on the
  record and her lost memory, not on her death.
- Library: island_tree_02, tree_small_02, desk_lamp_arm_01, modern_arm_chair_01 were converted from Poly Haven .gltf folders to .glb in this
  session (local only); Muse may want to put the .glb versions on Drive.

## For Muse
- Title options: 1) She Fell 10 Kilometres and Lived 2) The Woman Who Fell from the Sky 3) 10,160 Metres, No Parachute
- Opening line: "In 1972, a flight attendant fell from a height recorded as ten kilometres, with no parachute… and lived."
- Description credits: DC-9 (Sketchfab, CC BY, nobilishornet); airline trolley (Sketchfab, CC BY, Bellatrix613); Poly Haven HDRIs/models/
  textures (CC0); Kevin MacLeod "Airship Serenity" (CC BY 4.0); sounds per jobs/music/SFX_CREDITS.md.
- Caption must say "animated reenactment"; pinned comment: Guinness World Records (7 Apr 2022) + Wikipedia "Vesna Vulović".
- Post only after the owner says "đăng tập Cô gái rơi từ độ cao 10 cây số xuống đất mà vẫn sống".
