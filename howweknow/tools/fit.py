#!/usr/bin/env python3
"""FIT — the master to a size the owner set (17 Nov 2026: "tối ưu 1 bản còn khoảng 5–600 MB là ổn").
  python3 tools/fit.py out/<slug>_16x9.mp4 [--mb 560]   → re-encodes in place (two-pass x264, preset slow, the audio copied) only when larger
A v7/v8 master at CRF 17 is ≈ 1.3–1.5 GB because of the engraving pass (ENGINE.md "ENGINE v8"); two passes spend the bits where the picture
needs them, so ≈ 560 MB looks the same at normal viewing (measured: CRF 22 vs CRF 17, PSNR 39.9 dB, no difference visible at 1:1)."""
import json, os, subprocess, sys
f = sys.argv[1]; mb = float(sys.argv[sys.argv.index('--mb') + 1]) if '--mb' in sys.argv else 560
size = os.path.getsize(f) / 1e6
if size <= mb * 1.1: print(f'fit: {size:.0f} MB ≤ {mb * 1.1:.0f} MB — kept'); sys.exit(0)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
v = int(mb * 8e6 * .97 / dur - 192e3); tmp = f[:-4] + '_fit.mp4'; log = f[:-4] + '_2pass'
base = ['ffmpeg', '-v', 'error', '-y', '-i', f, '-c:v', 'libx264', '-preset', 'slow', '-b:v', str(v), '-pix_fmt', 'yuv420p', '-passlogfile', log]
subprocess.run(base + ['-pass', '1', '-an', '-f', 'mp4', os.devnull], check=True)
subprocess.run(base + ['-pass', '2', '-c:a', 'copy', '-movflags', '+faststart', tmp], check=True)
for x in os.listdir(os.path.dirname(f) or '.'):
    if x.startswith(os.path.basename(log)): os.remove(os.path.join(os.path.dirname(f) or '.', x))
os.replace(tmp, f); print(f'fit: {size:.0f} MB → {os.path.getsize(f) / 1e6:.0f} MB ({v / 1e6:.1f} Mb/s video)')
