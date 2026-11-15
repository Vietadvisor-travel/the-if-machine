#!/usr/bin/env python3
"""How We Know — soundtrack: placed voice + ONE music track (quiet, ducked under the voice) + a few sound effects → −16 LUFS.
  python3 tools/mix.py episodes/<slug>   → episodes/<slug>/build/mix.wav
Owner 15 Nov 2026: one music track through the whole episode, chosen per episode, small; sound effects moderate, never cluttered."""
import json, os, subprocess, sys
ep = sys.argv[1].rstrip('/'); E = json.load(open(f'{ep}/episode.json')); TL = json.load(open(f'{ep}/timeline.json'))
B = f'{ep}/build'; dur = TL['duration']; M = E.get('music') or {}
inp, flt, mixes = ['-i', f'{B}/vo.wav'], ['[0:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[vo][key]'], ['[vo]']
if M.get('file'):
    inp += ['-ss', str(M.get('start', 0)), '-i', M['file']]
    flt += [f'[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{dur},afade=t=in:d=1.5,afade=t=out:st={dur - 2.5}:d=2.5,volume={M.get("db", -21)}dB[mu]',
            '[mu][key]sidechaincompress=threshold=0.03:ratio=4:attack=60:release=600[duck]']; mixes.append('[duck]')
else: flt[0] = '[0:a]aformat=sample_rates=48000:channel_layouts=stereo[vo]'
n = len(inp) // 2 if not M.get('file') else 2
for L in TL['lines']:
    for s in L.get('sfx', []):
        inp += ['-i', s['file']]; at = int((L['start'] + s['at']) * 1000)
        flt.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={s.get("db", -18)}dB,adelay={at}|{at}[s{n}]'); mixes.append(f'[s{n}]'); n += 1
flt.append(f'{"".join(mixes)}amix=inputs={len(mixes)}:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(flt), '-map', '[out]', '-ar', '48000', f'{B}/mix.wav'], check=True)
print('mix →', f'{B}/mix.wav', f'({len(mixes) - 1} beds/effects under the voice)')
