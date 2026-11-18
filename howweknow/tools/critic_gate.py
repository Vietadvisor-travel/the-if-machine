#!/usr/bin/env python3
"""CRITIC gate (owner 18 Nov 2026, dinosaur-killer v1: "tao không muốn lặp lại trong tương lai"). A full render is refused until a FRESH critic
agent (skill fathom-critic, given only the frames + the treatment — never the maker grading himself) has scored the film and every axis is ≥ 8.
  python3 tools/critic_gate.py <slug> keyframes|animatic   → PASS/FAIL
The critic agent writes jobs/critic/<slug>.json:
  {"keyframes": {"by": "fresh agent", "scores": {"invention": 8, "drawing": 8, "light": 8, "composition": 8, "style": 8}, "frames": [...]},
   "animatic": {"by": "fresh agent", "video": "out/<slug>_animatic.mp4", "sha": "<first 12 of md5 of the animatic>",
                "scores": {"invention": 8, "motion": 8, "variety": 8, "acting": 8, "rhythm": 8, "drawing": 8, "light": 8, "style": 8}}}
make.sh --ship runs the animatic check and stops if it fails or if the animatic changed after it was scored."""
import hashlib, json, os, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); slug, stage = sys.argv[1], sys.argv[2]
P = f'{R}/../jobs/critic/{slug}.json'; err = []
if not os.path.exists(P): err.append(f'no critic record {P} — run a FRESH fathom-critic agent on the {stage}')
else:
    C = json.load(open(P)).get(stage) or {}
    if not C: err.append(f'no "{stage}" scores in {P}')
    if C and 'fresh' not in str(C.get('by', '')): err.append('scores must come from a fresh critic agent, not the maker')
    for k, v in (C.get('scores') or {}).items():
        if v < 8: err.append(f'{stage} {k} = {v} (< 8) — rebuild, then a fresh critic again')
    need = {'invention', 'drawing', 'light', 'composition', 'style'} if stage == 'keyframes' else {'invention', 'motion', 'variety', 'acting', 'rhythm', 'drawing', 'light', 'style'}
    if C and not need <= set(C.get('scores') or {}): err.append(f'{stage} scores missing: {sorted(need - set(C.get("scores") or {}))}')
    if stage == 'animatic' and C:
        v = f'{R}/out/{slug}_animatic.mp4'
        if os.path.exists(v) and C.get('sha') != hashlib.md5(open(v, 'rb').read()).hexdigest()[:12]: err.append('the animatic changed after it was scored — score the new one')
print(f'critic_gate {slug} {stage}:'); [print('  ERROR', e) for e in err]; print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
