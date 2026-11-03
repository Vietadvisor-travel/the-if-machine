#!/bin/bash
# Sync Muse's stock library from Drive into this container (setup.sh calls it; safe to re-run, skips what is there).
#   music  _music/ifm_music_*.zip → music_raw/<zip>/ → music/ (analysed by music_lib.py, gitignored)
#   sfx    _sfx/ifm_sfx_*.zip     → sfx_ifm/ (each family registers itself as ifm_<family>)
#   icons  _assets/icons_*.zip + illustrations → engine/library/ifm_icons_<pack>.js (IFM.icon('<pack>:<name>'))
#   other  textures → textures/, fonts → fonts_stock/, Natural Earth → geo_stock/ (on disk for bespoke shots)
cd "$(dirname "$0")/.." || exit 1; C=~/.cache/ifm-stock; mkdir -p $C music_raw sfx_ifm textures fonts_stock geo_stock
env | grep -q '^GDRIVE_CLIENT_ID=' || { echo "  no Drive keys: stock not synced"; exit 0; }
for f in "_music/*" "_sfx/*" "_assets/*"; do python3 tools/pp_drive.py get "$f" --to $C >/dev/null 2>&1; done
for z in $C/_music/*.zip; do d=music_raw/$(basename $z .zip); [ -d $d ] || unzip -qo $z -d $d; [ -f $d/library.json ] || cp music_raw/ifm_music_1/library.json $d/ 2>/dev/null; python3 tools/music_lib.py import-muse $d >/dev/null 2>&1; done
for z in $C/_sfx/*.zip; do unzip -qno $z -d sfx_ifm >/dev/null 2>&1; done; find sfx_ifm -mindepth 2 -name "*.wav" -exec mv -n {} sfx_ifm/ \; 2>/dev/null
icon() { [ -f engine/library/ifm_icons_$2.js ] || { [ -d "$1" ] && python3 tools/icons.py "$1" $2 >/dev/null 2>&1; }; }
A=$C/_assets; X=icons_raw; mkdir -p $X
for p in phosphor lucide iconoir remix bootstrap extra material; do [ -f $A/icons_$p.zip ] && [ ! -d $X/$p ] && unzip -qo $A/icons_$p.zip -d $X/$p; done
[ -f $A/ifm_assets_illustrations.zip ] && [ ! -d $X/illus ] && unzip -qo $A/ifm_assets_illustrations.zip -d $X/illus
dir() { find $X/$1 -type d -path "*$2" | head -1; }
icon "$(dir phosphor /regular)" phosphor; icon "$(dir phosphor /fill)" phosphorfill; icon "$(dir lucide /icons)" lucide; icon "$(dir iconoir /icons)" iconoir; icon "$(dir iconoir /regular)" iconoir
icon "$(find $X/remix -name '*.svg' -printf '%h\n' | sort | uniq -c | sort -rn | head -1 | awk '{print $2}')" remix; icon "$(find $X/bootstrap -name '*.svg' -printf '%h\n' | sort | uniq -c | sort -rn | head -1 | awk '{print $2}')" bootstrap
icon "$(dir extra /24/outline)" heroicons; icon "$(dir extra /feather)" feather; icon "$(dir illus /openmoji-black)" openmoji; icon "$(dir illus /aiga)" aiga
[ "$IFM_MATERIAL" = 1 ] && icon "$(find $X/material -name '*.svg' -printf '%h\n' | sort | uniq -c | sort -rn | head -1 | awk '{print $2}')" material
[ -f $A/ifm_assets_textures.zip ] && [ -z "$(ls textures)" ] && unzip -qjo $A/ifm_assets_textures.zip -d textures
[ -f $A/ifm_assets_fonts.zip ] && [ -z "$(ls fonts_stock)" ] && unzip -qo $A/ifm_assets_fonts.zip -d fonts_stock
[ -f $A/ifm_assets_natural_earth.zip ] && [ -z "$(ls geo_stock)" ] && unzip -qo $A/ifm_assets_natural_earth.zip -d geo_stock
echo "  music $(ls music/*.wav 2>/dev/null | wc -l) tracks · sfx $(ls sfx_ifm/*.wav 2>/dev/null | wc -l) · icon packs $(ls engine/library/ifm_icons_*.js 2>/dev/null | wc -l) · textures $(ls textures | wc -l)"
