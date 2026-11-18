#!/usr/bin/env python3
"""FATHOM score planner (owner 17 Nov 2026: "âm nhạc nên biến đổi theo mạch nội dung — mày có thể nghe hoặc dùng cách nào đó").
The machine cannot listen, so it MEASURES: every track of the studio library is analysed in 8-second windows —
  energy (loudness), pulse (onsets per second), bright (spectral centroid), major (major-vs-minor key fit), low (bass share) —
and every part of a film asks for a mood in the same terms. The planner then picks, for each part of the story, the track AND the
passage inside it that fit best, changes music only where the story turns, and never uses a track twice except as a bookend.
  python3 tools/score.py --analyze              → music_moods.json (once; ~8 min; committed)
  python3 tools/score.py episodes/<slug>         → prints the cue sheet (why each cue was chosen)
  python3 tools/score.py episodes/<slug> --write → also writes music.cues/swells into episode.json (world.py may still override)
A line's mood comes from its `mood` (lines.py extra dict) or its section (MOODS below). Moods are targets in [0..1]:
  (energy, pulse, bright, major) — e.g. mystery = quiet, slow, dark, minor; triumph = strong, moving, bright, major."""
import json, os, sys, glob
import numpy as np
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); LIBP = f'{R}/../studio/music/library.json'; MOODP = f'{R}/music_moods.json'
MOODS = {  # energy, pulse, bright, major
    'awe':      (.45, .15, .35, .55), 'mystery': (.25, .20, .25, .15), 'curious': (.45, .50, .55, .50), 'tension': (.60, .55, .40, .10),
    'wonder':   (.50, .35, .65, .75), 'warm':    (.40, .35, .50, .85), 'triumph': (.75, .55, .65, .90), 'calm':    (.20, .15, .45, .65),
    'sad':      (.25, .20, .30, .10), 'playful': (.55, .75, .70, .80)}
SECTION = {'OPEN': 'mystery', 'HOOK': 'mystery', 'COLD': 'mystery', 'STAKES': 'mystery', 'CLUE': 'curious', 'TWIST': 'tension', 'ANSWER': 'triumph', 'MEANING': 'warm', 'CLOSE': 'awe', 'OUTRO': 'awe'}
WIN = 8.0
MAXPART = 120     # s: chapters with the same mood share a cue only up to this long
MINPART = 60      # s: no music part shorter than this (owner: "nhạc chèn lung tung quá")
BLOCK = {'tension_sneaky_snitch', 'study_and_relax'}   # + FreePD 'Study and Relax': a YouTube Content ID claim on empty-atom (Muse, 17 Nov 2026)   # comic pizzicato despite its tag — wrong for FATHOM's mysterious score
MYSTERY_OK = {'wonder_lightless_dawn', 'curious_aftermath', 'tension_darkness_is_coming', 'wonder_long_note_one',   # owner 18 Nov 2026: Lightless Dawn,
              'wonder_silver_blue_light', 'gregorian_chant'}   # Aftermath = "chuẩn bí ẩn"; Hidden Agenda = "nhộn nhịp dồn dập" → out (and every busy, pulsing track)
LEAN = .6        # every mood target leans this far toward 'mystery' (owner: "ưu tiên nhạc kiểu bí ẩn")
LEVEL = {'mystery': -21, 'awe': -21, 'tension': -21, 'wonder': -21.5, 'triumph': -20.5, 'sad': -22,   # owner 18 Nov 2026: "nhạc vẫn bị to quá" → −6 dB more   # dB per part — owner 17 Nov: "nhỏ hơn ~30 %",
         'warm': -22.5, 'curious': -23, 'calm': -23, 'playful': -23}                                   # then "vẫn to quá, nhỏ đi 30 % nữa" (−3 dB twice vs -9)

def analyze():
    import soundfile as sf
    from scipy.signal import stft, resample_poly
    L = json.load(open(LIBP)); out = {}
    maj = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88]); mnr = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])
    for k, v in L.items():
        p = f'{R}/../studio/{v["file"]}'
        if not os.path.exists(p): continue
        x, sr = sf.read(p, dtype='float32'); x = x.mean(1) if x.ndim > 1 else x
        x = resample_poly(x, 11025, sr) if sr != 11025 else x; sr = 11025
        f, t, Z = stft(x, sr, nperseg=1024, noverlap=512); S = np.abs(Z) + 1e-9
        flux = np.maximum(0, np.diff(S, axis=1)).sum(0); flux = np.concatenate([[0], flux]); thr = np.median(flux) * 1.8 + 1e-6
        peaks = (flux[1:-1] > flux[:-2]) & (flux[1:-1] >= flux[2:]) & (flux[1:-1] > thr)
        cent = (S * f[:, None]).sum(0) / S.sum(0); rms = np.sqrt((S ** 2).mean(0)); low = S[f < 200].sum(0) / S.sum(0)
        pc = 12 * np.log2(np.maximum(f, 30) / 261.63); cls = np.round(pc).astype(int) % 12; ok = (f > 60) & (f < 2000)
        chroma = np.stack([S[(cls == c) & ok].sum(0) for c in range(12)])
        hop = t[1] - t[0]; n = int(WIN / hop); wins = []
        for a in range(0, len(t) - n // 2, n):
            sl = slice(a, a + n); ch = chroma[:, sl].sum(1); ch = ch / (ch.sum() + 1e-9)
            cm = max(np.corrcoef(np.roll(maj, r), ch)[0, 1] for r in range(12)); cn = max(np.corrcoef(np.roll(mnr, r), ch)[0, 1] for r in range(12))
            wins.append([float(20 * np.log10(rms[sl].mean() + 1e-9)), float(peaks[max(0, a - 1):a + n - 1].sum() / WIN), float(cent[sl].mean()), float(cm - cn), float(low[sl].mean())])
        out[k] = {'file': v['file'], 'dur': round(len(x) / sr, 1), 'credit': v.get('credit', ''), 'tags': v.get('moods', []), 'win': np.round(wins, 3).tolist()}
        print(f'{k:42} {len(wins):3} windows'); sys.stdout.flush()
    # normalise every feature to 0..1 across the WHOLE library (rank-based: robust), so a mood target means the same for every track
    allw = np.array([w for v in out.values() for w in v['win']])
    for v in out.values():
        w = np.array(v['win']); v['f'] = np.round(np.stack([np.searchsorted(np.sort(allw[:, j]), w[:, j]) / len(allw) for j in range(5)], 1), 3).tolist(); del v['win']
    json.dump(out, open(MOODP, 'w')); print('→', MOODP, len(out), 'tracks')

def plan(ep, write=False):
    E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json')); M = json.load(open(MOODP)); L = E['lines']; T = TL['lines']
    # owner 17 Nov 2026: "nhạc nền nhỏ hơn khoảng 30%, ưu tiên nhạc bí ẩn, đổi linh hoạt theo PHẦN của nội dung, nhỏ đi cho phù hợp từng đoạn
    #   — giờ nhạc chèn lung tung quá". So: music changes only where a CHAPTER changes (a breath: gap >= 1.5 s, or the section changes),
    #   each chapter takes the mood most of its lines ask for, chapters with the same mood share one cue, nothing shorter than MINPART,
    #   every target leans toward mystery, and each part sits at its own (quieter) level.
    mood = [l.get('mood') or SECTION.get(l.get('section', ''), 'curious') for l in L]
    span = lambda i: T[i]['dur'] + L[i].get('gap', 0)
    heads = [0] + [i for i in range(1, len(L)) if L[i].get('gap', 0) >= 1.5 or (L[i].get('section') and L[i].get('section') != L[i - 1].get('section'))]
    parts = []
    for n, a in enumerate(heads):
        b = (heads[n + 1] - 1) if n + 1 < len(heads) else len(L) - 1; w = {}
        for i in range(a, b + 1): w[mood[i]] = w.get(mood[i], 0) + span(i)
        m = max(w, key=w.get)
        if parts and parts[-1][2] == m and T[b]['start'] + T[b]['dur'] - T[parts[-1][0]]['start'] <= MAXPART: parts[-1][1] = b
        else: parts.append([a, b, m])
    j = 0   # a part shorter than MINPART joins the neighbour it is closest to in mood
    while j < len(parts) and len(parts) > 1:
        a, b, m = parts[j]; d = (T[b]['start'] + T[b]['dur']) - T[a]['start']
        if d < MINPART:
            near = lambda k: np.abs(np.array(MOODS[parts[k][2]]) - np.array(MOODS[m])).sum()
            k = j + 1 if j == 0 else j - 1 if j == len(parts) - 1 else (j - 1 if near(j - 1) <= near(j + 1) else j + 1)
            parts[k][0], parts[k][1] = min(parts[k][0], a), max(parts[k][1], b); parts.pop(j); j = 0; continue
        j += 1
    used, cues, sheet = {}, [], []
    for n, (a, b, m) in enumerate(parts):
        t0 = T[a]['start'] - (1.6 if n else 0); t1 = (T[parts[n + 1][0]]['start'] if n + 1 < len(parts) else TL['duration']); need = t1 - t0; tgt = (1 - LEAN) * np.array(MOODS[m]) + LEAN * np.array(MOODS['mystery']); best = None
        for k, v in M.items():
            if k in BLOCK or (set(v['tags']) & {'comedy', 'tech', 'momentum'} and m != 'playful') or v['dur'] < min(need, 150): continue
            # owner 18 Nov 2026: "bản nhạc này là nhạc vui tươi, không phải nhạc bí ẩn" — the analyser cannot hear cheerfulness, so the
            # mysterious parts of a film draw ONLY from a hand-curated list of dark/ambient tracks; the cheerful ones are for playful/triumph/warm
            if m not in ('playful', 'triumph', 'warm') and k not in MYSTERY_OK: continue
            F = np.array(v['f'])[:, :4]; nw = max(1, int(round(min(need, v['dur'] - 4) / WIN)))
            for s in range(0, max(1, len(F) - nw), 2):
                seg = F[s:s + nw]; fit = np.abs(seg - tgt).mean(); steady = seg[:, 0].std()   # fits the mood, and stays in it
                first = np.abs(F[s] - tgt).mean()
                cost = fit + .5 * steady + .3 * first + (.0 if k not in used else (.03 if n == len(parts) - 1 and used[k] == 0 else .6)) + (.15 if v['dur'] < need else 0)
                if best is None or cost < best[0]: best = (cost, k, s * WIN, fit)
        cost, k, st, fit = best; used.setdefault(k, n)
        cues.append({'file': f"../studio/{M[k]['file']}", 'at': f'L{a}-1.6' if n else 0, 'start': round(st, 1), 'db': LEVEL.get(m, -16)})
        sheet.append(f"  {t0 / 60:4.1f}–{t1 / 60:4.1f} min  L{a}–L{b}  {m:8} {LEVEL.get(m, -16):5.1f} dB → {k} from {st:.0f} s  (fit {1 - fit:.2f}){'  · returns (bookend)' if used[k] != n else ''}")
    print(f'score {E["slug"]}: {len(cues)} cues (one per part of the story, lean to mystery)'); print('\n'.join(sheet))
    credits = sorted({M[c['file'].split('/')[-1][:-4]]['credit'][:60] for c in cues if c['file'].split('/')[-1][:-4] in M}); print('  credits:', *credits, sep='\n    ')
    if write:
        sw = [[f'L{a - 1}$', f'L{a}', 1.5] for a, b, m in parts[1:]] + [[f'L{len(L) - 1}$', 'end', 3]]
        E['music'] = {'cues': cues, 'xfade': 6, 'norm': -18, 'swells': sw}; json.dump(E, open(f'{ep}/episode.json', 'w'), indent=1, ensure_ascii=False); print('  written to episode.json')

if __name__ == '__main__':
    if '--analyze' in sys.argv: analyze()
    else:
        if not os.path.exists(MOODP): analyze()
        plan(sys.argv[1].rstrip('/'), '--write' in sys.argv)
