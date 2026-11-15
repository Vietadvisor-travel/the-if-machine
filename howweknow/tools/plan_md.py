#!/usr/bin/env python3
"""episode.json → the readable frame-level script (STORY.md §6): python3 tools/plan_md.py episodes/<slug> → ../jobs/scripts/<slug>.md"""
import json, os, re, sys
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); tlp = f'{ep}/timeline.json'
TL = json.load(open(tlp)) if os.path.exists(tlp) else None; real = bool(TL and len(TL['lines']) == len(E['lines']))
w = lambda s: len(re.findall(r"[A-Za-z0-9'’,.-]+", s.replace('*', ''))); mm = lambda t: f'{int(t // 60):02d}:{t % 60:04.1f}'
out = [f'# FATHOM — "{E["title"]}" ({E["slug"]}) — script + frame-level shot plan', f'Generated from `howweknow/{ep}/episode.json` (edit `lines.py`, not this file). Times are {"REAL (voiced)" if real else "ESTIMATED (2.35 words/s) until the voice is made"}.',
       f'Voice {E["voice"]} {E["speed"]} · {len(E["lines"])} lines · {sum(w(l["text"]) for l in E["lines"])} words · ★ = real stock id from `jobs/orders/{E["slug"]}.md`', '']
t = E.get('lead', 1.0); sec = None
for i, l in enumerate(E['lines']):
    p = l.get('plan', {}); d = TL['lines'][i]['dur'] if real else w(l['text']) / 2.35; t0 = TL['lines'][i]['start'] if real else t + (l.get('gap', .7) if i else 0)
    if l.get('section') != sec: sec = l.get('section'); out += [f'## {sec}', '']
    out += [f'### L{i} · {mm(t0)}–{mm(t0 + d)} ({d:.1f} s)', '```', f'VO     {l["text"]}   [{l.get("src", "—")}]', f'SEE    {p.get("see", "")}',
            f'NEW    {", ".join(p.get("new") or []) or "—"}', 'BEATS  ' + (p.get('beats', '').replace(' | ', '\n       ')),
            f'IN     {p.get("in", ""):<10} TRANS  {p.get("trans", ""):<13} CAM  {p.get("cam", ""):<8} COMP  {p.get("comp", "")}',
            f'LIFE   {" · ".join(p.get("life") or []):<22} SET  {p.get("set", "—")}', f'STOCK  {" ".join("★" + x for x in (p.get("stock") or [])) or "—"}', '```', '']
    t = t0 + d
os.makedirs('../jobs/scripts', exist_ok=True); open(f'../jobs/scripts/{E["slug"]}.md', 'w').write('\n'.join(out)); print('→ jobs/scripts/' + E['slug'] + '.md', f'≈ {t / 60:.1f} min')
