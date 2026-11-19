#!/usr/bin/env python3
"""Script check for phase 3 long films (STORY.md §5).  python3 tools/script_check.py episodes/<slug> [--short]
PASS/FAIL with the exact lines to fix. --short = a test fixture (skips the length and clue-count rules)."""
import json, os, re, sys
ep = sys.argv[1].rstrip('/'); short = '--short' in sys.argv
E = json.load(open(f'{ep}/episode.json')); L = E['lines']; W = E.get('world', [])
tl = json.load(open(f'{ep}/timeline.json')) if os.path.exists(f'{ep}/timeline.json') else None
err, warn = [], []
words = lambda s: len(re.findall(r"[A-Za-z0-9'’,.-]+", s.replace('*', '')))
total = sum(words(l['text']) for l in L)
# timing: real (timeline) or estimated at ~2.35 words/s (af_heart 0.86 with gaps)
starts = [x['start'] for x in tl['lines']] if tl and len(tl['lines']) == len(L) else []
acc = 1.0
if not starts:
    for l in L: starts.append(acc); acc += words(l['text']) / 2.35 + l.get('gap', .6)
dur = tl['duration'] if tl else acc
if not short:
    if not 1350 <= total <= 1800: err.append(f'length: {total} words (target 1,350–1,800 for 9–12 min — owner 19 Nov 2026; af_heart 0.86 reads ≈ 2.5 words/s)')
    if not 540 <= dur <= 720: err.append(f'duration ≈ {dur / 60:.1f} min (target 9–12, owner 19 Nov 2026)')
BAN = ['little did', 'may surprise you', 'buckle up', 'fun fact', "in today's video", "let's dive", 'in this video', 'stay tuned', 'smash that', 'without further ado', 'what if']
LOOP = re.compile(r"\?|\bbut\b|\byet\b|\buntil\b|\bexcept\b|\bproblem\b|\bmystery\b|\bnobody\b|\bno one\b|\bstill\b|\bwhy\b|\bhow\b|…", re.I)
NUM = re.compile(r"\d|\b(hundred|thousand|million|billion|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|point)\b", re.I)   # real quantities, not "clue one" / "two places"
last_loop, last_fact = 0.0, 0.0
refs = json.dumps(W)
for i, l in enumerate(L):
    s = l['text']; n = words(s); t0 = starts[i]
    for sent in re.split(r'(?<=[.!?…])\s+', s.replace('*', '')):
        if words(sent) > 26: warn.append(f'L{i}: a sentence of {words(sent)} words (≤ 26): "{sent[:60]}…"')
    if s.count('*') not in (0, 2): err.append(f'L{i}: stress marks must be one *word*')
    for b in BAN:
        if b in s.lower(): err.append(f'L{i}: banned phrase "{b}"')
    if LOOP.search(s): last_loop = t0
    elif t0 - last_loop > 45 and i > 1: warn.append(f'L{i} @ {t0:.0f}s: no open loop for {t0 - last_loop:.0f}s (≤ 45)'); last_loop = t0
    if NUM.search(s):
        last_fact = t0
        if not l.get('src') and not short: err.append(f'L{i}: a number with no `src` (research pack fact id)')
    if not re.search(rf'"L{i}([@$+\-"])', refs): err.append(f'L{i}: the picture does not change on this line (no entity key refers to L{i})')
clues = [k.get('n') for e in W if e.get('type') == 'clue' for k in [e.get('props', {})] + e.get('keys', []) if k.get('n') is not None]
if not short and sorted(set(clues)) != list(range(1, max(clues or [0]) + 1)) or (not short and len(set(clues)) < 3): err.append(f'clues: tags {sorted(set(clues))} — need 1..N in order, N ≥ 3')
# POPULAR, NOT ACADEMIC (owner 18 Nov 2026: "kênh khoa học và đại chúng… không quá khó hiểu… thiên hướng dễ tiếp cận đại chúng hơn là giải thích
# quá học thuật"): a technical word (a long Latin/Greek-built term, or one in the list) must come with an everyday image in the SAME or the
# NEXT line ("like…", "as if…", "imagine…", "the size of…", "a kind of…", "think of…", "about as…", "—"), and is never left unexplained.
JARGON = re.compile(r"\b(\w*(ology|ometry|ometer|ification|isation|ization|aceous|iferous|lamell\w*|isotop\w*|anomal\w*|stratigraph\w*|geophysic\w*|metamorph\w*|foraminifer\w*|iridium|parallax|spectr\w*|magnetometer|sediment\w*|boundary layer|impact winter))\b", re.I)
GLOSS = re.compile(r"\b(like|as if|imagine|the size of|a kind of|think of|about as|that is|which means|in other words|called|we call)\b|—|:", re.I)
seen = set()
for i, l in enumerate(L):
    t = l['text'].replace('*', ''); nxt = L[i + 1]['text'] if i + 1 < len(L) else ''
    for m in JARGON.finditer(t):
        w = m.group(1).lower()
        if w in seen: continue
        seen.add(w)
        if not (GLOSS.search(t) or GLOSS.search(nxt)): err.append(f'L{i}: "{m.group(1)}" with no everyday image in this or the next line (popular channel — explain it like to a curious 14-year-old)')
    if len(t.split()) > 30: warn.append(f'L{i}: {len(t.split())} words in one line — split it; one idea per line')
print(f'script_check {E["slug"]}: {len(L)} lines · {total} words · ≈ {dur / 60:.1f} min')
for w in warn: print('  WARN ', w)
for e in err: print('  ERROR', e)
print('PASS' if not err else 'FAIL'); sys.exit(1 if err else 0)
