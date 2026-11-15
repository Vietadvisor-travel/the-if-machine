#!/usr/bin/env bash
# How We Know — set up the Remotion project in a fresh container (media never live in git: they come from studio/, which
# `bash setup.sh` at the repo root fills from Drive). Run from howweknow/:  bash tools/setup.sh
set -e
cd "$(dirname "$0")/.."
[ -d node_modules ] || npm install --no-audit --no-fund
S=../studio; mkdir -p public/fonts public/sfx public/tex public/music
for f in fraunces/files/fraunces-latin-400-normal fraunces/files/fraunces-latin-700-normal fraunces/files/fraunces-latin-400-italic inter/files/inter-latin-400-normal inter/files/inter-latin-600-normal space-mono/files/space-mono-latin-400-normal; do cp -n "$S/fonts_stock/$f.woff2" public/fonts/; done
cp -n $S/sfx_ifm/*.wav public/sfx/ 2>/dev/null || true
[ -f public/tex/regolith_photo.jpg ] || ffmpeg -v error -y -i $S/assets3d_src/_assets3d/materials/gravelly_sand/gravelly_sand_2k_Diffuse.jpg -vf scale=1600:-1 -q:v 3 public/tex/regolith_photo.jpg
python3 - <<PY
import numpy as np, os
from PIL import Image
os.makedirs("public/core", exist_ok=True); r = np.random.default_rng(5)
for i in range(4): Image.fromarray(r.normal(128, 40, (512, 512)).clip(0, 255).astype(np.uint8), "L").save(f"public/core/grain_{i}.png")
PY
[ -f public/brand/fathom_mark.png ] || { node tools/brand.cjs >/dev/null && mkdir -p public/brand && cp out/brand/fathom_mark.png public/brand/; }
[ -f public/core/paper.jpg ] || python3 tools/paper.py
python3 tools/lib_index.py >/dev/null
mkdir -p public/stock/_qa; [ -f public/stock/_qa/clip.mp4 ] || ffmpeg -v error -y -f lavfi -i "testsrc2=size=1280x720:rate=30:duration=12" -c:v libx264 -pix_fmt yuv420p public/stock/_qa/clip.mp4
[ -f public/stock/_qa/photo.jpg ] || ffmpeg -v error -y -f lavfi -i "mandelbrot=size=1600x1100:rate=1" -frames:v 1 public/stock/_qa/photo.jpg
[ -f public/stock/_qa/doc.jpg ] || cp public/stock/_qa/photo.jpg public/stock/_qa/doc.jpg   # QA only (fx-board, pipeline-test), never in a film
echo "howweknow ready: $(ls public/sfx | wc -l) sfx, fonts, textures"
