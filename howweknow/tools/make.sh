#!/usr/bin/env bash
# One command, script to delivered film:  bash tools/make.sh <slug> [--ship]
#   script_check → voice → world check → mix → render (Story) → mux → QA sheet → (--ship: Drive + delivery note stub)
set -euo pipefail
cd "$(dirname "$0")/.."
S=$1; EP=episodes/$S; B=$EP/build; mkdir -p $B out
python3 tools/script_check.py $EP ${SHORT:+--short}
python3 tools/vo.py $EP
python3 tools/check_world.py $EP
python3 tools/variety.py $EP ${SHORT:+--short}
python3 tools/mix.py $EP
T0=$(date +%s)
npx remotion render Story out/${S}_silent.mp4 --props="{\"slug\":\"$S\"}" --muted --crf=17 --is-production=false 2>&1 | grep -E "Encoded [0-9]+/[0-9]+$|rror" | tail -2
echo "render $(( $(date +%s) - T0 )) s"
ffmpeg -v error -y -i out/${S}_silent.mp4 -i $B/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/${S}_16x9.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/${S}_16x9.mp4)
ffmpeg -v error -y -i out/${S}_16x9.mp4 -vf "fps=1/5,scale=320:-1,tile=8x$(python3 -c "import math;print(max(1,math.ceil($D/5/8)))")" -frames:v 1 out/${S}_sheet.jpg
ffmpeg -v error -y -ss 3 -i out/${S}_16x9.mp4 -frames:v 1 -q:v 2 out/${S}_cover.jpg
echo "DONE → out/${S}_16x9.mp4 ($(printf %.1f $D) s) · sheet out/${S}_sheet.jpg"
if [[ "${2:-}" == "--ship" ]]; then
  python3 ../studio/tools/pp_drive.py put out/${S}_16x9.mp4 out/${S}_cover.jpg --to "phase3/$S" | tail -2
  [ -f ../jobs/deliveries/$S.md ] || sed "s/@@SLUG@@/$S/g" ../jobs/deliveries/_TEMPLATE_P3.md > ../jobs/deliveries/$S.md
  echo "shipped to Drive phase3/$S · fill jobs/deliveries/$S.md"
fi
