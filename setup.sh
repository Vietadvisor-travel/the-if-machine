#!/bin/bash
# One-time setup per Claude Code session (about 1–2 min). Ends with ALL OK or says what is missing.
set -u; cd "$(dirname "$0")/studio" || exit 1; ok=1
echo "· npm install"; npm install --no-audit --no-fund >/dev/null 2>&1 && echo "  ok" || { echo "  FAIL npm install"; ok=0; }
echo "· python deps"; python3 -c "import numpy, scipy, PIL, soundfile" 2>/dev/null || pip install -q numpy scipy pillow soundfile --break-system-packages >/dev/null 2>&1; python3 -c "import numpy, scipy, PIL, soundfile" && echo "  ok" || { echo "  FAIL numpy/scipy/pillow/soundfile"; ok=0; }
echo "· voice (Kokoro)"; python3 tools/voice.py setup >/dev/null 2>&1 && echo "  ok" || { echo "  FAIL voice setup (needs github.com + pypi)"; ok=0; }
echo "· Chromium"; node -e "import('./tools/browser.mjs').then(async m=>{const b=await m.launch();await b.close();console.log('  ok')}).catch(e=>{console.log('  FAIL '+e.message.split('\n')[0]);process.exit(1)})" || ok=0
echo "· ffmpeg"; command -v ffmpeg >/dev/null && echo "  ok" || { echo "  FAIL ffmpeg missing"; ok=0; }
echo "· Google Drive"; if env | grep -q '^GDRIVE_CLIENT_ID='; then python3 tools/pp_drive.py check 2>&1 | tail -2 | sed 's/^/  /'; else echo "  keys not in this session (needed only to deliver): jobs/DRIVE_SETUP.md step 3"; fi
echo "· music + SFX packs (Drive _music/ _sfx/, from Muse)"
if [ -f music/library.json ] && [ -d sfx_ifm ]; then echo "  ok"; elif env | grep -q '^GDRIVE_CLIENT_ID='; then D=$(mktemp -d); python3 tools/pp_drive.py get "_music/*" --to $D >/dev/null 2>&1; python3 tools/pp_drive.py get "_sfx/*" --to $D >/dev/null 2>&1
  for z in $D/_music/*.zip; do unzip -qo "$z" -d music_raw; done; unzip -qo $D/_sfx/*.zip -d sfx_ifm 2>/dev/null; python3 tools/music_lib.py import-muse music_raw >/dev/null 2>&1; rm -rf $D
  [ -f music/library.json ] && echo "  ok ($(ls music/*.wav | wc -l) tracks, $(ls sfx_ifm/*.wav | wc -l) sfx)" || { echo "  FAIL music import"; ok=0; }; else echo "  no Drive keys: music falls back to the procedural score"; fi
echo "· Supertonic voices (optional)"; [ -d ~/.cache/pp-voice/supertonic/onnx ] && echo "  ok" || { python3 tools/voice.py setup-supertonic >/dev/null 2>&1 && echo "  ok" || echo "  skipped (Kokoro am_puck / af_bella are the channel voices)"; }
[ $ok = 1 ] && echo "ALL OK" || echo "SETUP INCOMPLETE"
