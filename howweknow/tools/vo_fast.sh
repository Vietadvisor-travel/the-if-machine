#!/usr/bin/env bash
# The narration in parallel (owner 18 Nov 2026: "nhanh tối đa"): N Kokoro workers fill the per-line cache at once, then vo.py assembles the
# track and timeline exactly as before (same cache keys → identical audio).   bash tools/vo_fast.sh episodes/<slug> [N=3]
set -euo pipefail; cd "$(dirname "$0")/.."; EP=$1; N=${2:-3}
for k in $(seq 0 $((N-1))); do OMP_NUM_THREADS=$(( $(nproc) / N > 0 ? $(nproc) / N : 1 )) python3 tools/vo.py $EP --part $k/$N & done; wait
python3 tools/vo.py $EP
