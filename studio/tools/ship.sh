#!/bin/bash
# Deliver one episode to Drive (PROTOCOL §5) — masters only, never the chat-size _FINAL files (brief: never squeeze below 30 MB).
#   bash tools/ship.sh <slug> [cover_second_in_vertical=2.4]
# Needs: out/<slug>_16x9.mp4 (long master), out/<slug>-v_9x16.mp4 (vertical master), out/<slug>.srt (from the long make).
# Writes out/ship/<slug>/{<slug>_long_16x9.mp4,<slug>_vertical_9x16.mp4,<slug>_cover.jpg,<slug>.srt,<slug>_stories.zip}, uploads,
# prints a block to paste into jobs/deliveries/<slug>.md (file names, sizes, durations, resolutions, Drive ids, music credits).
set -e; cd "$(dirname "$0")/.."; S=$1; AT=${2:-2.4}; O=out/ship/$S; mkdir -p $O
[ -f out/${S}_16x9.mp4 ] && [ -f out/${S}-v_9x16.mp4 ] || { echo "missing masters: out/${S}_16x9.mp4 and out/${S}-v_9x16.mp4"; exit 1; }
cp out/${S}_16x9.mp4 $O/${S}_long_16x9.mp4; cp out/${S}-v_9x16.mp4 $O/${S}_vertical_9x16.mp4
ffmpeg -v error -y -ss $AT -i $O/${S}_vertical_9x16.mp4 -frames:v 1 -q:v 2 $O/${S}_cover.jpg
cp out/${S}.srt $O/${S}.srt 2>/dev/null || python3 tools/srt.py out/${S}_cues.json $O/${S}.srt
(cd stories && zip -q -j ../$O/${S}_stories.zip ${S}.story ${S}-v.story ../engine/library/bank/${S}.js)
python3 tools/pp_drive.py put $O/* --to $S | tail -8
echo; echo "## files (paste into jobs/deliveries/$S.md)"; for f in $O/*; do d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null | cut -d. -f1); r=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$f" 2>/dev/null | head -1); echo "- $(basename $f) · $(du -h "$f" | cut -f1)${d:+ · ${d} s}${r:+ · $r}"; done
echo "- Drive: TheIfMachine_Media/$S/  (ids: python3 tools/pp_drive.py ls | grep $S)"; echo; echo "## music credits"; python3 tools/music_lib.py credits stories/${S}.story; python3 tools/music_lib.py credits stories/${S}-v.story
