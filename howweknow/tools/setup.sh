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
echo "howweknow ready: $(ls public/sfx | wc -l) sfx, fonts, textures"
