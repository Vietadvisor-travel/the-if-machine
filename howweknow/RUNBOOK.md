# RUNBOOK — one film, one chat (engine 10 · owner 18 Nov 2026: "giảm tối đa token, đảm bảo 100% chất lượng")
Every step below is REQUIRED (quality); the HOW is token-lean. Read only what a step names. Times are Vietnam time.

0. **Start** (≈ 3 min): `bash setup.sh && bash howweknow/tools/setup.sh`; render farm (CLAUDE.md "Every session"); `tail -5 jobs/INBOX.md`;
   STATUS row → IN_PRODUCTION; tell the owner the honest estimate (≈ 3–4 h) in one Vietnamese line. Watchdog (`send_later`) on every long job.
1. **Facts & words** — `jobs/research/<slug>.md` (exists) → `episodes/<slug>/lines.py` (pattern: episodes/dinosaur-killer/lines.py; read its
   first 30 lines only). Plain words for a curious 14-year-old; every technical word with an everyday image. Gates: `script_check`, `plan_check`.
   THEN at once, in the background: `bash tools/vo_fast.sh episodes/<slug> 3` (parallel voice, ≈ 6–8 min) — it runs while you plan and draw.
2. **Chain = the plan** — `jobs/scripts/<slug>_chain.md`: one link per line: the ACTION on screen (what moves/changes ≤ every 2.5 s), how it
   turns into the next, the camera move, the sound on the action; ★ ten inventions. Treatment (short) → `treatment_check`. Load
   `fathom-director` only for this step.
3. **Draw** — `src/lib/<slug>/` (a.tsx/b.tsx/index.tsx/thumb.tsx; anatomy.tsx for every living thing; NAME-IT test for EVERY picture:
   recognizable silhouettes, true colours, context, scale). Check ALL drawings on ONE sheet: `npx remotion still LibSheet out/<slug>_lib.jpg
   --props='{"slug":"<slug>","page":0}' --frame=40` (9 per page). Fix before going on.
4. **Voice** — already running since step 1 (vo_fast). Drawings in PARALLEL (speed): give 2 general-purpose agents one half of the drawing list
   each (a.tsx / b.tsx) with the chain links they draw, the NAME-IT rule and `src/paint/anatomy.tsx` + `src/lib/dinosaur-killer/a.tsx` as the
   pattern; you write index.tsx/thumb.tsx and start world.py meanwhile; check all their drawings on ONE LibSheet.
5. **World** — copy `episodes/_template10/world.py`; write only the staging from the chain (helpers: tools/world_kit.py docstring). Gates in
   one go: `for t in event_check novelty check_world plan_check sound_check script_check; do python3 tools/$t.py episodes/<slug> | tail -3; done`.
6. **Keyframes** — `python3 tools/sheet.py <slug> --lines <6 key lines>` → ONE fresh `fathom-critic` agent with `jobs/critic/_PROMPT.md`
   (stage keyframes, sheets only). Every axis ≥ 8 or fix and re-check only the frames that changed.
7. **Review render (fast path, no separate animatic)** — `bash tools/make.sh <slug> --review` (the FULL film on the farm, ≈ 20–30 min) →
   `python3 tools/sheet.py <slug> --video out/<slug>_16x9.mp4 --every 6` → fresh critic, stage "review", sha = `out/<slug>_review.sha`.
   Fixes that change the picture → `--review` again; sound-only fixes keep the sha.
8. **Ship** — `bash tools/make.sh <slug> --ship` (reuses the reviewed render — no second render; critic_gate needs review ≥ 8 or the owner's OK) →
   `jobs/deliveries/<slug>.md`, STATUS, INBOX, `novelty.py --record`, `variety.py --record`, commit, one short Vietnamese report with the link.
## TOKEN BUDGET (owner 19 Nov 2026: drifting-continents burned 2× the 5-h limit + ~20 % of the week — 70–80 % in critic→redraw rounds)
- WHAT THE OWNER JUDGES (19 Nov): never static — continuous, inventive transformation (the "wow" of drifting-continents). Drawing polish at the
  drifting-continents level is enough. Bars (critic_gate): motion/invention/variety/rhythm ≥ 8 · clarity/popular ≥ 7 · drawing/light/composition/style ≥ 6.
  Keyframes = name-it + craft check only; the real gate is the REVIEW render (motion). Never spend a redraw round on polish alone.
- Critic: ONE keyframe round + ONE fix round. Still < 8 → send the keyframe sheet to the owner and let him decide (he approved 6–7 critic
  frames and rated the film 8.5). Never a 3rd/4th round on your own. Skip the review-stage critic when the owner already approved.
- Drawing agents: give them a 10-line style digest + the exact prop list, NOT dinosaur-killer a.tsx/anatomy.tsx to read in full. A fix round
  = a FRESH small agent per 1–3 drawings (scoped), never resuming a 400k-token agent. Each agent checks its drawings IN THE FILM with one
  `npx remotion still Story` per fix, not whole LibSheets.
- check_world now refuses drawing props that collide with engine masks (tear/burn/lift/pour/wipe/…) and sfx files that do not exist —
  run it BEFORE any render. The maker looks at images only as one sheet per step.
Token rules: never print logs (`| tail -3`); never read a file you do not edit; images only as sheets; one Edit per change, not re-reads;
sound-only fixes = remix + remux + fit, never a re-render; ask the owner nothing until the final report unless blocked.
