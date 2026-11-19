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
BAR = {}   # owner 19 Nov 2026 (after sun-fire 6/10): "chấm điểm cũng cần khắt khe lên như trước" — every axis ≥ 8 again, plus wow ≥ 8.5 and vs_reference
if os.path.exists(P) and json.load(open(P)).get('owner_ok'): print(f'critic_gate {slug} {stage}: owner approved ({json.load(open(P))["owner_ok"].get("date")}) — PASS'); sys.exit(0)   # the owner's explicit approval of this film overrides the critic bar
if not os.path.exists(P): err.append(f'no critic record {P} — run a FRESH fathom-critic agent on the {stage}')
else:
    C = json.load(open(P)).get(stage) or {}
    if not C: err.append(f'no "{stage}" scores in {P}')
    if C and 'fresh' not in str(C.get('by', '')): err.append('scores must come from a fresh critic agent, not the maker')
    for k, v in (C.get('scores') or {}).items():
        # owner 19 Nov 2026: "cái anh khắt khe là video bị tĩnh… chất lượng vẽ thì không khắt khe, như tập vừa rồi là ổn" — the hard bar (8) is on
        # what MOVES and SURPRISES; the craft axes only need the drifting-continents level (critic gave it 6–7, the owner rated the film 8.5)
        bar = BAR.get(k, 8)
        if v < bar: err.append(f'{stage} {k} = {v} (< {bar}) — rebuild, then a fresh critic again')
    # owner 19 Nov 2026 (sun-fire: a critic gave 8, the owner 6): the critic must place the film against the reference films side by side —
    # `wow` (0–10, drifting-continents = 8.5, sun-fire v1 = 6) and `vs_reference` ("better" | "equal" | "worse" than drifting-continents)
    if C and C.get('vs_reference') not in ('better', 'equal'): err.append(f'{stage} vs_reference = {C.get("vs_reference")!r} — must be "better" or "equal" than drifting-continents (compare the pair sheets in public/stock/_hwk_core/reference/)')
    if C and (C.get('scores') or {}).get('wow', 0) < 8.5: err.append(f'{stage} wow = {(C.get("scores") or {}).get("wow")} (< 8.5, the drifting-continents level)')
    need = {'clarity', 'invention', 'drawing', 'light', 'composition', 'style'} if stage == 'keyframes' else {'clarity', 'popular', 'invention', 'motion', 'variety', 'acting', 'rhythm', 'drawing', 'light', 'style'}
    if C and not need <= set(C.get('scores') or {}): err.append(f'{stage} scores missing: {sorted(need - set(C.get("scores") or {}))}')
    if stage == 'review' and C:   # the fast path: the critic scored the full render's PICTURE (silent master)
        v = f'{R}/out/{slug}_silent.mp4'
        if not os.path.exists(v) or C.get('sha') != hashlib.md5(open(v, 'rb').read()).hexdigest()[:12]: err.append('the picture changed after the review — review the new render')
    if stage == 'animatic' and C:
        v = f'{R}/out/{slug}_animatic.mp4'
        if os.path.exists(v) and C.get('sha') != hashlib.md5(open(v, 'rb').read()).hexdigest()[:12]: err.append('the animatic changed after it was scored — score the new one')
print(f'critic_gate {slug} {stage}:'); [print('  ERROR', e) for e in err]; print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
