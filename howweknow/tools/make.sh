#!/usr/bin/env bash
# One command, script to delivered film:  bash tools/make.sh <slug> [--ship]
#   script_check → voice → world check → mix → render (Story) → mux → QA sheet → (--ship: Drive + delivery note stub)
set -euo pipefail
cd "$(dirname "$0")/.."
S=$1; EP=episodes/$S; B=$EP/build; mkdir -p $B out
python3 tools/lib_index.py
python3 tools/script_check.py $EP ${SHORT:+--short}
python3 tools/vo.py $EP
python3 tools/check_world.py $EP
python3 tools/variety.py $EP ${SHORT:+--short}
python3 tools/plan_check.py $EP
if python3 -c "import json,sys;sys.exit(0 if json.load(open('$EP/episode.json')).get('standard',4)>=5 else 1)"; then python3 tools/still_check.py $EP; python3 tools/score.py $EP; fi   # v5 films: no dead stretches; the score follows the moods (world.py reads it or --write)
python3 tools/mix.py $EP
if [[ "${2:-}" == "--preview" ]]; then   # the animatic: half size, 15 fps, with voice + score (CREATIVE.md §3)
  python3 tools/render.py $S --preview --chunk 120
  ffmpeg -v error -y -i out/${S}_preview.mp4 -i $B/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -shortest -movflags +faststart out/${S}_animatic.mp4
  echo "ANIMATIC → out/${S}_animatic.mp4"; exit 0
fi
T0=$(date +%s)
if [ "${FARM:-1}" = 1 ]; then python3 tools/farm.py $S   # free GitHub runners render chunks in parallel (pixel-checked); render.py joins + fills the rest here
else python3 tools/render.py $S; fi                       # FARM=0: the plain local render, exactly as before the farm
RT=$(( $(date +%s) - T0 )); echo "render ${RT} s ($(python3 -c "import json;d=json.load(open('$EP/timeline.json'))['duration'];print(f'{$RT/d:.1f} s per film second')"))"
ffmpeg -v error -y -i out/${S}_silent.mp4 -i $B/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/${S}_16x9.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/${S}_16x9.mp4)
ffmpeg -v error -y -i out/${S}_16x9.mp4 -vf "fps=1/5,scale=320:-1,tile=8x$(python3 -c "import math;print(max(1,math.ceil($D/5/8)))")" -frames:v 1 out/${S}_sheet.jpg
python3 tools/srt.py $EP
TH=$(python3 -c "import json;t=json.load(open('$EP/episode.json')).get('thumb');print(json.dumps({'slug':'$S',**t}) if t else '')")
# the thumbnail is DESIGNED per film (src/lib/<slug>/thumb.tsx → THUMB; owner 17 Nov 2026: "wow hơn, chất hơn… không nhất thiết cắt từ tập ra")
if [ -n "$TH" ]; then npx remotion still Thumb out/${S}_thumb.jpg --props="$TH" --image-format=jpeg --jpeg-quality=92 >/dev/null 2>&1 && echo "thumb → out/${S}_thumb.jpg"; else echo "WARN no thumb in episode.json"; fi
if [ -n "$TH" ]; then npx remotion still ThumbV out/${S}_cover_9x16.jpg --props="$TH" --image-format=jpeg --jpeg-quality=92 >/dev/null 2>&1 && echo "vertical cover → out/${S}_cover_9x16.jpg"; fi   # TikTok / IG / FB Reels
echo "DONE → out/${S}_16x9.mp4 ($(printf %.1f $D) s) · sheet out/${S}_sheet.jpg"
if [[ "${2:-}" == "--ship" ]]; then
  python3 ../studio/tools/pp_drive.py put out/${S}_16x9.mp4 out/${S}_thumb.jpg out/${S}_cover_9x16.jpg out/${S}.srt --to "fathom/$S" | tail -2
  [ -f ../jobs/deliveries/$S.md ] || sed "s/@@SLUG@@/$S/g" ../jobs/deliveries/_TEMPLATE_P3.md > ../jobs/deliveries/$S.md
  echo "shipped to Drive fathom/$S · fill jobs/deliveries/$S.md"
fi
