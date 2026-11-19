#!/usr/bin/env python3
"""WOW gate (owner 19 Nov 2026, sun-fire rated 6/10 against drifting-continents 8.5: "chất lượng hình ảnh, hiệu ứng, visual và độ wow ko như
kỳ vọng… nâng cấp engine để chat mới nào cũng tạo được tập chất lượng hơn thế"). Measured on the BUILT world (episode.json), calibrated on the two films:
the bar is ABOVE drifting-continents (the owner wants every new film better than it) and far above sun-fire v1. Measured 19 Nov:
                 LIGHT  ACT  REAL  SCENE  MOMENTS  → drifting 82 % · 5.1 · 4.6 · 13.9 s · 2      sun-fire 8 % · 5.5 · 4.4 · 17.4 s · 0
  python3 tools/wow_check.py episodes/<slug>
  LIGHT   every second of the film is lit by a named light (lamp/shaft/haze/particles) — sun-fire had 3 light entities, drifting 25
  ACT     the drawings themselves act: own-prop keys per 10 s (people, frames, text, camera excluded) ≥ 6 (both films ≈ 5)
  REAL    beats that really change the picture: a key that moves a prop by ≥ 0.25 (or swaps a pose/state) — small nudges added only to beat
          event_check do not count (sun-fire's "second beats")
  HOLD    no drawing stays on screen > 30 s unless it keeps acting (≥ 1 real beat per 3 s over its whole stay)
  SCENE   mean time a scene drawing stays on screen ≤ 15 s (drifting 13.9, sun-fire 17.4): the world keeps transforming
  WORDS   ≤ 10 text entities (the picture explains, not labels) · MOMENTS ≥ 3 flash/particle moments on the set pieces
  PEOPLE  a named person is drawn ≥ 380 px tall (acting reads) — sun-fire's Davis was 300 px at the pithead."""
import json, re, sys
EPD = sys.argv[1].rstrip('/'); E = json.load(open(f'{EPD}/episode.json')); TL = json.load(open(f'{EPD}/timeline.json'))['lines']
ST = [l.get('t', l.get('start')) for l in TL]; D = ST[-1] + TL[-1]['dur']
def tt(s):
    if isinstance(s, (int, float)): return float(s)
    m = re.match(r'^L(\d+)(?:\$|@[^+\-]+)?([+\-]\d*\.?\d+)?$', str(s).strip())
    if not m: return None
    i = int(m.group(1)); return ST[i] + float(m.group(2) or 0) if i < len(ST) else None
W = E['world']; FRAMES = {'Person', 'Pinned', 'CabinetCard', 'DocumentPage', 'Clipping', 'Loupe', 'Mark', 'TitleCard', 'Eyepiece', 'FilmStrip', 'Etch'}
SKIP = {'t', 'dur', 'ease', 'a', 'draw', 'dissolve', 'dissolveSeed', 'dissolveDir', 'dissolveAt', 'dissolveR', 'blur', 'iris', 'irisAt', 'wipe', 'wipeDir',
        'blinds', 'unroll', 'tear', 'pour', 'pourDir', 'brush', 'fx_x', 'fx_y', 'fx_s', 'fx_ox', 'fx_oy', 'burn', 'burnAt', 'shatter', 'shatterAt', 'lift', 'flipY', 'x', 'y', 's'}
def span(e):
    ts = [tt(k['t']) for k in e['keys'] if tt(k['t']) is not None]
    if not ts: return None
    t0 = min(ts); offs = [tt(k['t']) for k in e['keys'] if k.get('a') == 0 and tt(k['t']) is not None and tt(k['t']) > t0]
    return t0, min(offs) if offs else D
err, info, warn = [], [], []   # owner 19 Nov: light is NOT the main cause — LIGHT/MOMENTS only warn
# LIGHT — coverage of the timeline by light/atmosphere entities
LT = ('lamp', 'shaft', 'haze', 'particles', 'motes')
cov = [0] * int(D + 1)
for e in W:
    if e['type'] in LT:
        ts = [tt(k['t']) for k in e['keys'] if tt(k['t']) is not None]
        if not ts: continue
        t0 = min(ts); offs = [tt(k['t']) for k in e['keys'] if ('k' in k and k['k'] == 0) and tt(k['t']) is not None and tt(k['t']) > t0]
        t1 = min(offs) if offs else D
        for s in range(int(t0), min(int(t1) + 1, len(cov))): cov[s] = 1
lit = sum(cov) / len(cov); info.append(f'LIGHT {lit:.0%} of the film lit')
if lit < .75: warn.append(f'LIGHT only {lit:.0%} of the film has a named light (≥ 75 %) — give every scene its LIGHT (world_kit finish(LIGHT=…))')
# ACT / REAL / HOLD / SCENE
arts = [e for e in W if e['type'] == 'art' and e['props'].get('name') not in FRAMES]
keys = real = 0; holds = []; spans = []
for e in arts:
    sp = span(e)
    if not sp: continue
    prev = dict(e['props']); rb = []
    for k in sorted(e['keys'], key=lambda k: tt(k['t']) or 0):
        ch = {p: v for p, v in k.items() if p not in SKIP}
        if not ch: continue
        keys += 1; big = False
        for p, v in ch.items():
            o = prev.get(p)
            if isinstance(v, (int, float)) and isinstance(o, (int, float)): big |= abs(v - o) >= .25
            elif v != o: big = True
            prev[p] = v
        if big: real += 1; rb.append(tt(k['t']))
    dur_on = sp[1] - sp[0]; spans.append(dur_on)
    if dur_on > 30 and len(rb) < dur_on / 3: holds.append(f"{e['id']} ({e['props']['name']}) {dur_on:.0f} s with {len(rb)} real beats")
act = keys / D * 10; rr = real / D * 10; mean = sum(spans) / max(1, len(spans))
info.append(f'ACT {act:.1f} prop keys/10 s · REAL {rr:.1f} real beats/10 s · SCENE mean {mean:.1f} s on screen')
if act < 6.0: err.append(f'ACT {act:.1f} drawing prop keys per 10 s (≥ 6.0) — the drawings must act, not sit under the camera')
if rr < 5.0: err.append(f'REAL {rr:.1f} real beats per 10 s (≥ 5.0) — nudges (< 0.25) do not count; give each scene a real change')
if mean > 15.5: err.append(f'SCENE drawings stay {mean:.1f} s on screen on average (≤ 15.5) — transform into the next thing sooner')
for h in holds: err.append(f'HOLD {h} — keep it acting or transform it')
# WORDS / MOMENTS / PEOPLE
nt = sum(e['type'] == 'text' for e in W); nm = sum(e['type'] in ('flash', 'particles') for e in W)
info.append(f'WORDS {nt} texts · MOMENTS {nm} flash/particles')
if nt > 10: err.append(f'WORDS {nt} text entities (≤ 10) — let the picture say it')
if nm < 3: warn.append(f'MOMENTS {nm} flash/particle moments (≥ 3) — mark the set pieces with light (moment(...))')
for e in W:
    if e['props'].get('name') == 'Person' and e['props'].get('h', 999) < 380: err.append(f"PEOPLE {e['id']} is {e['props']['h']} px tall (≥ 380) — bring the camera or the figure closer")
print(f'wow_check {E["slug"]}: ' + ' · '.join(info))
for x in warn: print('  WARN ', x)
for x in err: print('  ERROR', x)
print('FAIL' if err else 'PASS'); sys.exit(1 if err else 0)
