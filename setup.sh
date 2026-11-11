#!/bin/bash
# One-time setup per Claude Code session (about 1–2 min). Ends with ALL OK or says what is missing.
set -u; cd "$(dirname "$0")/studio" || exit 1; ok=1
echo "· npm install"; npm install --no-audit --no-fund >/dev/null 2>&1 && echo "  ok" || { echo "  FAIL npm install"; ok=0; }
echo "· python deps"; python3 -c "import numpy, scipy, PIL, soundfile" 2>/dev/null || pip install -q numpy scipy pillow soundfile --break-system-packages >/dev/null 2>&1; python3 -c "import numpy, scipy, PIL, soundfile" && echo "  ok" || { echo "  FAIL numpy/scipy/pillow/soundfile"; ok=0; }
echo "· voice (Kokoro)"; python3 tools/voice.py setup >/dev/null 2>&1 && echo "  ok" || { echo "  FAIL voice setup (needs github.com + pypi)"; ok=0; }
echo "· Chromium"; node -e "import('./tools/browser.mjs').then(async m=>{const b=await m.launch();await b.close();console.log('  ok')}).catch(e=>{console.log('  FAIL '+e.message.split('\n')[0]);process.exit(1)})" || ok=0
echo "· ffmpeg"; command -v ffmpeg >/dev/null && echo "  ok" || { echo "  FAIL ffmpeg missing"; ok=0; }
echo "· Google Drive"; if env | grep -q '^GDRIVE_CLIENT_ID='; then python3 tools/pp_drive.py check 2>&1 | tail -2 | sed 's/^/  /'; else echo "  keys not in this session (needed only to deliver): jobs/DRIVE_SETUP.md step 3"; fi
echo "· stock library from Muse (music, SFX, icon packs, textures, fonts, maps)"; bash tools/stock_sync.sh
echo "· intonation (timestamped Kokoro + Praat)"; [ -s ~/.cache/va-voice/kokoro-v1.0-dur.int8.onnx ] && python3 -c "import parselmouth" 2>/dev/null && echo "  ok" || echo "  MISSING: *word* accents off (python3 tools/voice.py setup)"
echo "· Supertonic voices (optional)"; [ -d ~/.cache/pp-voice/supertonic/onnx ] && echo "  ok" || { python3 tools/voice.py setup-supertonic >/dev/null 2>&1 && echo "  ok" || echo "  skipped (Kokoro am_puck / af_bella are the channel voices)"; }
[ -f engine/library/ifm_icons_tabler.js ] || { D=$(mktemp -d); (cd $D && npm pack @tabler/icons --silent >/dev/null 2>&1 && tar xzf tabler-icons-*.tgz) && python3 tools/icons.py $D/package/icons/outline tabler >/dev/null; rm -rf $D; }
[ $ok = 1 ] && echo "ALL OK" || echo "SETUP INCOMPLETE"
