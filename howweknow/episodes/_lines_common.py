"""Shared writer for the FATHOM script sources (episodes/<slug>/lines.py). Row:
(section, text, src, in, trans, cam, comp, life, set, new, stock, see, beats)  — STORY.md §6."""
import json, os
def write(here, slug, title, R, SRC, new_ideas, music, thumb=None):
    p = os.path.join(here, 'episode.json'); old = json.load(open(p)) if os.path.exists(p) else {}
    lines = []
    for (sec, text, src, i_, tr, cam, comp, life, set_, new, stock, see, beats) in R:
        L = {'text': text, 'gap': 0.75 if text.endswith('…') else 0.9 if sec in ('COLD', 'TWIST', 'MEANING') else 0.7, 'section': sec,
             'plan': {'in': i_, 'trans': tr, 'cam': cam, 'comp': comp, 'life': life, 'new': new, 'stock': stock, 'see': see, 'beats': beats}}
        if src != '-': L['src'] = ' '.join(SRC.get(s, s) for s in src.split()); L['facts'] = src
        if set_: L['plan']['set'] = set_
        lines.append(L)
    E = {'slug': slug, 'title': title, 'voice': 'af_heart', 'speed': 0.86, 'lead': 1.0, 'tail': 3.6,
         'music': old.get('music', music), 'new_ideas': new_ideas, 'thumb': old.get('thumb', thumb), 'lines': lines, 'world': old.get('world', [])}
    json.dump(E, open(p, 'w'), indent=1, ensure_ascii=False); print(len(lines), 'lines →', p)
