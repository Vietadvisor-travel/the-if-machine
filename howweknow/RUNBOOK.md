# RUNBOOK — one film, one chat (engine 10 · owner 18 Nov 2026: "giảm tối đa token, đảm bảo 100% chất lượng")
Every step below is REQUIRED (quality); the HOW is token-lean. Read only what a step names. Times are Vietnam time.

0. **Start** (≈ 3 min): `bash setup.sh && bash howweknow/tools/setup.sh`; render farm (CLAUDE.md "Every session"); `tail -5 jobs/INBOX.md`;
   STATUS row → IN_PRODUCTION; tell the owner the honest estimate (≈ 3–4 h) in one Vietnamese line. Watchdog (`send_later`) on every long job.
1. **Facts & words** — `jobs/research/<slug>.md` (exists) → `episodes/<slug>/lines.py` (pattern: episodes/dinosaur-killer/lines.py; read its
   first 30 lines only). Plain words for a curious 14-year-old; every technical word with an everyday image. Gates: `script_check`, `plan_check`.
   THEN at once, in the background: `bash tools/vo_fast.sh episodes/<slug> 3` (parallel voice, ≈ 6–8 min) — it runs while you plan and draw.
2. **Chain = the plan** (engine 11, owner 19 Nov 2026 — sun-fire 6/10 because this step was skipped) — `bash tools/sync.sh` and LOOK at
   `public/stock/_hwk_core/reference/drifting-continents_pairs_1.jpg` (the bar) and `sun-fire-v1_pairs_1.jpg` (what not to do); read CINEMA §0 + §0b.
   Write `jobs/scripts/<slug>_chain.md` in the engine-11 form `N. [★] PLACE :: what the WORLD physically does → next | camera | sound`
   (one per line; ★ ten inventions; one canvas per act). A chain written before 19 Nov is REWRITTEN, never reused. Gate `chain_check` +
   `treatment_check`. Load `fathom-director` for this step. Every drawing = a PLACE whose props change the world's shape.
3. **Draw** — `src/lib/<slug>/` (a.tsx/b.tsx/index.tsx/thumb.tsx; anatomy.tsx for every living thing; NAME-IT test for EVERY picture:
   recognizable silhouettes, true colours, context, scale). Check ALL drawings on ONE sheet: `npx remotion still LibSheet out/<slug>_lib.jpg
   --props='{"slug":"<slug>","page":0}' --frame=40` (9 per page). Fix before going on.
4. **Voice** — already running since step 1 (vo_fast). Drawings in PARALLEL (speed): give 2 general-purpose agents one half of the drawing list
   each (a.tsx / b.tsx) with the chain links they draw, the NAME-IT rule and `src/paint/anatomy.tsx` + `src/lib/dinosaur-killer/a.tsx` as the
   pattern; you write index.tsx/thumb.tsx and start world.py meanwhile; check all their drawings on ONE LibSheet.
5. **World** — copy `episodes/_template10/world.py`; write only the staging from the chain (helpers: tools/world_kit.py docstring). Gates in
   one go: `for t in event_check novelty check_world plan_check sound_check script_check; do python3 tools/$t.py episodes/<slug> | tail -3; done`.
6. **Keyframes** — `python3 tools/sheet.py <slug> --lines <6 key lines>` → ONE fresh `fathom-critic` agent with `jobs/critic/_PROMPT.md`
   (stage keyframes, sheets only, CALIBRATED against the reference pair sheets: `wow` ≥ 8.5 and `vs_reference` better|equal). Every axis ≥ 8 or fix and re-check only the frames that changed.
7. **Review render (fast path, no separate animatic)** — `bash tools/make.sh <slug> --review` (the FULL film on the farm, ≈ 20–30 min) →
   `python3 tools/sheet.py <slug> --video out/<slug>_16x9.mp4 --pairs` (BEFORE→AFTER per line) → fresh calibrated critic, stage "review", sha = `out/<slug>_review.sha`.
   Fixes that change the picture → `--review` again; sound-only fixes keep the sha.
8. **Ship** — `bash tools/make.sh <slug> --ship` (reuses the reviewed render — no second render; critic_gate needs review ≥ 8 or the owner's OK) →
   `jobs/deliveries/<slug>.md`, STATUS, INBOX, `novelty.py --record`, `variety.py --record`, commit, one short Vietnamese report with the link.
## TOKEN BUDGET (owner 19 Nov 2026: drifting-continents burned 2× the 5-h limit + ~20 % of the week — 70–80 % in critic→redraw rounds)
- WHAT THE OWNER JUDGES (19 Nov, after sun-fire 6/10): visual, drawing, striking scenes, the world transforming — and STRICT scoring as before:
  every critic axis ≥ 8, wow ≥ 8.5, vs_reference better|equal (critic_gate). Quality before speed and tokens: never deliver early.
- MODELS: critic agents run on the default model since 19 Nov (a sonnet critic scored sun-fire 8, the owner 6); drawing agents keep the default model. Drawing briefs =
  howweknow/DRAW_DIGEST.md + the prop list + the chain links — never "read dinosaur-killer a.tsx".
- Images for the maker: one sheet per step at --scale 0.5; never re-read a sheet already seen.
- Critic: a FRESH calibrated critic every round; fix → re-check until every bar is met (no round limit — owner 19 Nov: "không cần ép giao sớm").
  Save tokens by HOW you fix (scoped fresh agents, sheets not single frames), never by accepting a lower score.
- Drawing agents: give them a 10-line style digest + the exact prop list, NOT dinosaur-killer a.tsx/anatomy.tsx to read in full. A fix round
  = a FRESH small agent per 1–3 drawings (scoped), never resuming a 400k-token agent. Each agent checks its drawings IN THE FILM with one
  `npx remotion still Story` per fix, not whole LibSheets.
- check_world now refuses drawing props that collide with engine masks (tear/burn/lift/pour/wipe/…) and sfx files that do not exist —
  run it BEFORE any render. The maker looks at images only as one sheet per step.
Token rules: never print logs (`| tail -3`); never read a file you do not edit; images only as sheets; one Edit per change, not re-reads;
sound-only fixes = remix + remux + fit, never a re-render; ask the owner nothing until the final report unless blocked.
- ENGINE 11 LESSONS (sun-fire, 19 Nov): never satisfy event_check with filler beats (tiny nudges, captions) — if a line is dead, its
  drawing is wrong: redesign the action. A drawing on screen > 30 s must keep transforming (wow_check HOLD). Critic scores ≠ the owner's:
  the calibrated critic compares with the reference films; "worse than drifting" = not ready, whatever the other numbers say.
