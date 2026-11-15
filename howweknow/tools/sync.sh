#!/usr/bin/env bash
# Pull Muse's resources from Drive into public/ (they never go in git):  bash tools/sync.sh [<slug>]
#   _hwk_core/**  → public/stock/_hwk_core/…   (real Earth/Moon photos, flat maps, sky/ground photos, textures, loops)
#   _hwk/<slug>/** → public/stock/_hwk/<slug>/… (this episode's stock + stock.json)
# In episode.json refer to them as "stock/_hwk/<slug>/<file>" or "stock/_hwk_core/<file>".
set -e; cd "$(dirname "$0")/.."; mkdir -p public/stock
python3 ../studio/tools/pp_drive.py get '_hwk_core/*' --to public/stock | tail -1 || echo "no _hwk_core on Drive yet (Muse §0)"
[ -n "${1:-}" ] && { python3 ../studio/tools/pp_drive.py get "_hwk/$1/*" --to public/stock | tail -1 || echo "no _hwk/$1 on Drive yet (Muse kit)"; }
ls public/stock 2>/dev/null
