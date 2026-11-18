#!/usr/bin/env python3
"""FATHOM soundtrack: placed voice + the music score (ducked under the voice) + a few sound effects → −16 LUFS.
  python3 tools/mix.py episodes/<slug>   → episodes/<slug>/build/mix.wav
music (episode.json) is either ONE bed {file, db, start} (looped when short) or, v4 (owner 16 Nov 2026: "1 vài nhạc xuyên suốt"), a SCORE:
  {"cues": [{"file", "at": "L0" | seconds, "start": s-in-file, "db": -22}, …], "xfade": 4, "norm": -18 (LUFS each cue is levelled to; db then relative), "swells": [["L3$", "L4", 7], …]}
  each cue plays from `at` until the next cue begins (crossfaded over xfade s; a cue shorter than its span loops);
  swells lift the score by +dB between two time refs (the ident, a chapter breath, the end card), with 1.5 s ramps."""
import json, os, re, subprocess, sys
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json'))
B = f'{ep}/build'; dur = TL['duration']; M = E.get('music') or {}

def tref(r):   # the same time refs as the engine (time.ts), resolved on the voiced timeline
    if isinstance(r, (int, float)): return float(r)
    if r == 'end': return dur
    m = re.match(r'^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$', r.strip()); L = TL['lines'][int(m.group(1))]; t = L['start']
    if m.group(2) == '$': t += L['dur']
    elif m.group(3): i = L['text'].lower().find(m.group(3).lower()); t += L['dur'] * max(0, i) / max(1, len(L['text'])) * .97
    return t + float(m.group(4) or 0)

cues = M.get('cues') or ([{'file': M['file'], 'at': 0, 'start': M.get('start', 0), 'db': M.get('db', -21)}] if M.get('file') else [])
for c in cues:
    if not os.path.exists(c['file']): sys.exit(f"mix: music file missing: {c['file']} (tools/music.py lists the library)")
inp, flt, mixes = ['-i', f'{B}/vo.wav'], ['[0:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[vo][key]'], ['[vo]']
X = float(M.get('xfade', 4)); n = 1
if cues:
    starts = [tref(c['at']) for c in cues] + [dur]; parts = []
    for j, c in enumerate(cues):
        a, b = starts[j], starts[j + 1]; a0 = max(0, a - (X / 2 if j else 0)); b1 = min(dur, b + (X / 2 if j + 1 < len(cues) else 0)); span = b1 - a0
        inp += ['-stream_loop', '-1', '-ss', str(c.get('start', 0)), '-i', c['file']]
        fin = f'afade=t=in:d={X if j else 1.5}' ; fout = f'afade=t=out:st={span - (X if j + 1 < len(cues) else 3)}:d={X if j + 1 < len(cues) else 3}'
        nrm = f"loudnorm=I={M['norm']}:LRA=9:TP=-2," if M.get('norm') else ''   # v4: every cue brought to one loudness first, then `db` is relative to it
        flt.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{span:.3f},{nrm}{fin},{fout},volume={c.get("db", -22)}dB,adelay={int(a0 * 1000)}|{int(a0 * 1000)}[c{j}]'); parts.append(f'[c{j}]'); n += 1
    sw = [(tref(a), tref(b), g) for a, b, g in M.get('swells', [])]
    if sw:   # piecewise gain (dB → linear) with 1.5 s ramps
        terms = '+'.join(f'{10 ** (g / 20) - 1:.4f}*clip(min((t-{a - 1.5:.2f})/1.5,({b + 1.5:.2f}-t)/1.5),0,1)' for a, b, g in sw)
        gain = f",volume='1+{terms}':eval=frame"
    else: gain = ''
    flt.append(f'{"".join(parts)}amix=inputs={len(parts)}:normalize=0:duration=longest,atrim=0:{dur:.3f}{gain}[mu]')
    flt.append('[mu][key]sidechaincompress=threshold=0.03:ratio=4:attack=60:release=700[duck]'); mixes.append('[duck]')
else: flt[0] = '[0:a]aformat=sample_rates=48000:channel_layouts=stereo[vo]'
# owner 18 Nov 2026: "hiệu ứng âm thanh cho to ngang nhạc nền… từ tập sau" — engine ≥ 10 (or `sfx_rel`): every effect is levelled to the
# loudness of the music playing at its moment; its `db` is then a trim relative to the music (0 = as loud as the score, −3 a touch under).
REL = bool(E.get('sfx_rel') or E.get('engine', 0) >= 10)
_act = {}
def active_db(f):   # the loudness of the sound while it sounds: the 90th percentile of 50-ms RMS windows, in dBFS
    if f not in _act:
        import numpy as np, soundfile as sf
        x, sr = sf.read(f, dtype='float32'); x = x.mean(1) if x.ndim > 1 else x; w = max(1, int(sr * .05)); k = len(x) // w
        r = np.sqrt((x[:k * w].reshape(k, w) ** 2).mean(1) + 1e-12) if k else np.array([1e-6]); _act[f] = 20 * np.log10(np.percentile(r, 90))
    return _act[f]
def music_db(t):   # the score's level at t: each cue is levelled to `norm` LUFS, then `db`
    if not cues: return -34.0
    st = [tref(c['at']) for c in cues]; j = max([i for i, a in enumerate(st) if a <= t] or [0]); return float(M.get('norm', -18)) + cues[j].get('db', -22)
for L in TL['lines']:
    for s in L.get('sfx', []):
        inp += ['-i', s['file']]; at = int((L['start'] + s['at']) * 1000)
        g = (music_db(L['start'] + s['at']) - active_db(s['file']) + s.get('db', 0)) if REL else s.get('db', -18)
        flt.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={g:.1f}dB,adelay={at}|{at}[s{n}]'); mixes.append(f'[s{n}]'); n += 1
flt.append(f'{"".join(mixes)}amix=inputs={len(mixes)}:normalize=0:duration=first[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(flt), '-map', '[out]', '-ar', '48000', f'{B}/pre.wav'], check=True)
# −16 LUFS by ONE fixed gain + a true-peak limiter (owner 17 Nov 2026: the music must really be as quiet as score.py sets it — the old
# one-pass dynamic loudnorm acted like an automatic volume knob and pushed quiet music back up in the pauses)
meas = subprocess.run(['ffmpeg', '-nostats', '-i', f'{B}/pre.wav', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', meas)[-1]); g = -16 - I
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{B}/pre.wav', '-af', f'volume={g:.2f}dB,alimiter=limit=0.84:attack=5:release=50:level=disabled', '-ar', '48000', f'{B}/mix.wav'], check=True)
os.remove(f'{B}/pre.wav')
print('mix →', f'{B}/mix.wav', f'({len(cues)} music cue(s), {len(mixes) - 1 - (1 if cues else 0)} effects under the voice)')
