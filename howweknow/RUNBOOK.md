# RUNBOOK — one film, one chat (engine 10 · owner 18 Nov 2026: "giảm tối đa token, đảm bảo 100% chất lượng")
Every step below is REQUIRED (quality); the HOW is token-lean. Read only what a step names. Times are Vietnam time.

0. **Start** (≈ 3 min): `bash setup.sh && bash howweknow/tools/setup.sh`; render farm (CLAUDE.md "Every session"); `tail -5 jobs/INBOX.md`;
   STATUS row → IN_PRODUCTION; tell the owner the honest estimate (≈ 3–4 h) in one Vietnamese line. Watchdog (`send_later`) on every long job.
1. **Facts & words** — `jobs/research/<slug>.md` (exists) → `episodes/<slug>/lines.py` (pattern: episodes/dinosaur-killer/lines.py; read its
   first 30 lines only). Plain words for a curious 14-year-old; every technical word with an everyday image. Gates: `script_check`, `plan_check`.
2. **Chain = the plan** — `jobs/scripts/<slug>_chain.md`: one link per line: the ACTION on screen (what moves/changes ≤ every 2.5 s), how it
   turns into the next, the camera move, the sound on the action; ★ ten inventions. Treatment (short) → `treatment_check`. Load
   `fathom-director` only for this step.
3. **Draw** — `src/lib/<slug>/` (a.tsx/b.tsx/index.tsx/thumb.tsx; anatomy.tsx for every living thing; NAME-IT test for EVERY picture:
   recognizable silhouettes, true colours, context, scale). Check ALL drawings on ONE sheet: `npx remotion still LibSheet out/<slug>_lib.jpg
   --props='{"slug":"<slug>","page":0}' --frame=40` (9 per page). Fix before going on.
4. **Voice** — `python3 tools/vo.py episodes/<slug>` (background).
5. **World** — copy `episodes/_template10/world.py`; write only the staging from the chain (helpers: tools/world_kit.py docstring). Gates in
   one go: `for t in event_check novelty check_world plan_check sound_check script_check; do python3 tools/$t.py episodes/<slug> | tail -3; done`.
6. **Keyframes** — `python3 tools/sheet.py <slug> --lines <6 key lines>` → ONE fresh `fathom-critic` agent with `jobs/critic/_PROMPT.md`
   (stage keyframes, sheets only). Every axis ≥ 8 or fix and re-check only the frames that changed.
7. **Animatic** — `bash tools/make.sh <slug> --preview` (background, ≈ 30 min) → `python3 tools/sheet.py <slug> --video out/<slug>_animatic.mp4
   --every 6` → fresh critic (stage animatic, sha). Fix → re-animatic only if the critic's fixes changed the picture.
8. **Ship** — `bash tools/make.sh <slug> --ship` (farm, ≈ 30–40 min; critic_gate blocks without ≥ 8 or the owner's explicit OK) →
   `jobs/deliveries/<slug>.md`, STATUS, INBOX, `novelty.py --record`, `variety.py --record`, commit, one short Vietnamese report with the link.
Token rules: never print logs (`| tail -3`); never read a file you do not edit; images only as sheets; one Edit per change, not re-reads;
sound-only fixes = remix + remux + fit, never a re-render; ask the owner nothing until the final report unless blocked.
