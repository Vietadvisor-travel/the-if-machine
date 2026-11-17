#!/usr/bin/env python3
"""Is the farm's picture the SAME picture? (owner: quality is untouchable)
  python3 tools/farm_check.py <local chunk.mp4> <farm chunk.mp4>
Decodes both and compares every frame's pixels (ffmpeg framemd5 of the raw decoded image). PASS only if every frame is identical;
otherwise prints how many differ and the worst PSNR, and the farm must not be used until the cause is fixed."""
import subprocess, sys
a, b = sys.argv[1:3]
md5 = lambda p: [l.split(',')[-1].strip() for l in subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-map', '0:v', '-f', 'framemd5', '-'],
                                                                 capture_output=True, text=True).stdout.splitlines() if not l.startswith('#')]
A, B = md5(a), md5(b)
same = sum(x == y for x, y in zip(A, B)); n = max(len(A), len(B))
print(f'farm_check: {same}/{n} frames identical ({len(A)} local, {len(B)} farm)')
if same == n and n: print('PASS'); sys.exit(0)
r = subprocess.run(['ffmpeg', '-i', a, '-i', b, '-lavfi', 'psnr', '-f', 'null', '-'], capture_output=True, text=True).stderr
print([l for l in r.splitlines() if 'PSNR' in l][-1:]); print('FAIL'); sys.exit(1)
