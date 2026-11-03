#!/bin/bash
# One-time setup per Claude Code session (about 1–2 min). Ends with ALL OK or says what is missing.
set -u; cd "$(dirname "$0")/studio" || exit 1; ok=1
echo "· npm install"; npm install --no-audit --no-fund >/dev/null 2>&1 && echo "  ok" || { echo "  FAIL npm install"; ok=0; }
echo "· voice (Kokoro)"; python3 tools/voice.py setup >/dev/null 2>&1 && echo "  ok" || { echo "  FAIL voice setup (needs github.com + pypi)"; ok=0; }
echo "· Chromium"; node -e "import('./tools/browser.mjs').then(async m=>{const b=await m.launch();await b.close();console.log('  ok')}).catch(e=>{console.log('  FAIL '+e.message.split('\n')[0]);process.exit(1)})" || ok=0
echo "· ffmpeg"; command -v ffmpeg >/dev/null && echo "  ok" || { echo "  FAIL ffmpeg missing"; ok=0; }
echo "· Google Drive"; if env | grep -q '^GDRIVE_CLIENT_ID='; then python3 tools/pp_drive.py check 2>&1 | tail -2 | sed 's/^/  /'; else echo "  keys not in this session (needed only to deliver): jobs/DRIVE_SETUP.md step 3"; fi
[ $ok = 1 ] && echo "ALL OK" || echo "SETUP INCOMPLETE"
