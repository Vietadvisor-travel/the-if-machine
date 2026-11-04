# Engine roadmap — The If Machine 3.0 — FINAL (owner, 4 Nov 2026: "chốt nâng cấp"; the AI episode is not remade)

Status 4 Nov 2026: phases 1, 2, 4 and the sample are done; the hybrid 2D+3D tools (pins, pip, split with s3) are in.
Phase 3 items still open for later: J/L sound bridges in the mix, a montage helper.

Standard: `references/ifm-craft.md`. Each phase is tested on a short sample and logged in CHANGELOG.md.

## Done (4 Nov 2026)
- Calm look (no bloom/flicker), varied smooth transitions, precise people actions, living-scene toolkit (`ifm_live.js`),
  preflight (voice lines, acts, sounds incl. white-noise ban), render speed (4 jobs, 25 fps), sound without hiss/whooshes.

## Phase 1 — shot grammar for every scene (2D/2.5D)
- `shot=EWS|WS|MS|MCU|CU|ECU angle=eye|high|low|top|ots|pov move=static|push|pull|track|pan|tilt|crane|orbit|dollyzoom`
  on any beat or in `then=` segments; the camera frames the act's declared subject points (`o.focus` / act `subjects`).
- Layered depth: acts can draw in depth layers so camera moves create parallax (2.5D).

## Phase 2 — 3D world for the channel (three.js, toon)
- Generic sets (no travel-channel signage): city street, plaza with a government building, office, apartment, waiting
  room, courtroom, control room, globe/space, map table; simple 3D people in the facet palette; day/dusk/night.
- `# vis kind=w3 set=… shot=… angle=… move=… act=…` with the same shot grammar; cost ≤ 400 ms/frame.

## Phase 3 — editing tools
- Match cuts (shape/position carried across a cut), inserts/cutaways, montage helper (quick shots for time passing),
  cross-cut helper, J/L sound bridges in the mix.

## Phase 4 — standards in the tools
- Director's script template: SIZE · ANGLE · MOVE · MEDIUM per shot; script_check variety rules (craft §2);
  content rules (cold open, chain reaction, what-people-say segment with labelled theories, payoff).
- variety/review: shot-size and angle distribution, 3D/2.5D share, inserts per minute.

## Phase 5 — sample (about 1 minute) for the owner's approval, then the full episode
