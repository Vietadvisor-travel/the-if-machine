#!/usr/bin/env bash
# FATHOM — set up the Remotion project in a fresh container. Run from the repo root AFTER `bash setup.sh` (Kokoro voice, Drive check,
# studio stock = the music library). Usage:  bash howweknow/tools/setup.sh   → ends with "FATHOM READY" or says what is missing.
set -u
cd "$(dirname "$0")/.."
ok=1
[ -d node_modules/remotion ] || npm install --no-audit --no-fund >/dev/null 2>&1 || { echo "FAIL npm install"; ok=0; }
mkdir -p public/fonts public/sfx public/tex public/music public/core public/brand public/stock/_qa
F=node_modules/@fontsource
cp -n $F/fraunces/files/fraunces-latin-{400-normal,700-normal,400-italic}.woff2 $F/inter/files/inter-latin-{400,600}-normal.woff2 \
      $F/space-mono/files/space-mono-latin-400-normal.woff2 $F/im-fell-english/files/im-fell-english-latin-400-{normal,italic}.woff2 \
      $F/im-fell-english-sc/files/im-fell-english-sc-latin-400-normal.woff2 $F/pinyon-script/files/pinyon-script-latin-400-normal.woff2 public/fonts/ 2>/dev/null
[ $(ls public/fonts | wc -l) -ge 10 ] && echo "· fonts ok" || { echo "FAIL fonts"; ok=0; }
cp -n ../studio/sfx_ifm/*.wav public/sfx/ 2>/dev/null; echo "· sfx: $(ls public/sfx | wc -l) (Muse's per-film sfx come with tools/sync.sh)"
[ -f public/tex/regolith_photo.jpg ] || ffmpeg -v error -y -f lavfi -i "mandelbrot=size=1600x1100:rate=1" -frames:v 1 -vf hue=s=0 public/tex/regolith_photo.jpg   # PaintTest placeholder only
python3 - <<'PY'
import numpy as np, os
from PIL import Image
r = np.random.default_rng(5)
for i in range(4):
    p = f"public/core/grain_{i}.png"
    if not os.path.exists(p): Image.fromarray(r.normal(128, 40, (512, 512)).clip(0, 255).astype(np.uint8), "L").save(p)
PY
[ -f public/core/paper.jpg ] || python3 tools/paper.py >/dev/null
[ -f public/core/paper.jpg ] && echo "· paper ok" || { echo "FAIL paper texture"; ok=0; }
[ -f public/brand/fathom_mark.png ] || { node tools/brand.cjs >/dev/null 2>&1 && cp out/brand/fathom_mark.png public/brand/; }
[ -f public/brand/fathom_mark.png ] && echo "· brand mark ok" || { echo "FAIL brand mark (node tools/brand.cjs)"; ok=0; }
python3 tools/lib_index.py | sed 's/^/· /'
[ -f public/stock/_qa/clip.mp4 ] || ffmpeg -v error -y -f lavfi -i "testsrc2=size=1280x720:rate=30:duration=12" -c:v libx264 -pix_fmt yuv420p public/stock/_qa/clip.mp4
[ -f public/stock/_qa/photo.jpg ] || ffmpeg -v error -y -f lavfi -i "mandelbrot=size=1600x1100:rate=1" -frames:v 1 public/stock/_qa/photo.jpg
[ -f public/stock/_qa/doc.jpg ] || cp public/stock/_qa/photo.jpg public/stock/_qa/doc.jpg   # QA fixtures only, never in a film
ls ../studio/music/*.wav >/dev/null 2>&1 && echo "· music library: $(ls ../studio/music/*.wav | wc -l) tracks" || echo "· music library missing (run: bash setup.sh at the repo root)"
python3 -c "import kokoro_onnx" 2>/dev/null && [ -s ~/.cache/va-voice/kokoro-v1.0.int8.onnx ] && echo "· voice ok" || { echo "FAIL voice (run: bash setup.sh at the repo root)"; ok=0; }
npx remotion still PaintTest out/_setup.jpg --frame=29 --image-format=jpeg >/dev/null 2>&1 && echo "· render ok" || { echo "FAIL render (Chromium: remotion.config.ts)"; ok=0; }
[ $ok = 1 ] && echo "FATHOM READY" || echo "FATHOM SETUP INCOMPLETE"
