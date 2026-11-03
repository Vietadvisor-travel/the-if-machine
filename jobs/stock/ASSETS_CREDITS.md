# The If Machine visual stock credits (wave 1, 3 Nov 2026, stock library task)

All files live on Drive TheIfMachine_Media/_assets/. Every zip carries its own
assets.json (file, category, license, credit, source_url). No media in git.

## SVG icon packs (one zip per pack, original folder structure kept)

| zip | pack | icons | licence | source |
|---|---|---|---|---|
| icons_phosphor.zip | Phosphor, all 6 weights | 9,072 | MIT | https://github.com/phosphor-icons/core |
| icons_lucide.zip | Lucide | 2,020 | ISC | https://github.com/lucide-icons/lucide |
| icons_iconoir.zip | Iconoir | 1,671 | MIT | https://github.com/iconoir-icons/iconoir |
| icons_remix.zip | Remix Icon | 3,229 | Apache-2.0 | https://github.com/Remix-Design/RemixIcon |
| icons_material.zip | Material Symbols, outlined/rounded/sharp | 23,622 | Apache-2.0 | https://github.com/google/material-design-icons |
| icons_bootstrap.zip | Bootstrap Icons | 2,078 | MIT | https://github.com/twbs/icons |
| icons_extra.zip | Heroicons + Feather + Open Iconic | 1,798 | MIT | https://github.com/tailwindlabs/heroicons, https://github.com/feathericons/feather, https://github.com/iconic/open-iconic |

Total: 43,490 SVGs.

Notes:
- Material Symbols came from the @material-symbols/svg-400 npm package (same set,
  same Apache-2.0 licence), because cloning the GitHub repo stalled above 500 MB
  without a checkout; the npm tarball is the same icons.
- tools/icons.py reads ONE flat folder of .svg, so for Phosphor (weights) and
  Material (styles) Claude points the importer at one style folder at a time.

## Vector illustrations and shapes

| zip | contents | licence |
|---|---|---|
| ifm_assets_illustrations.zip | OpenMoji colour + black SVG (8,990) | CC BY 4.0, credit "OpenMoji (CC BY 4.0)", https://github.com/hfg-gmuend/openmoji |
| ifm_assets_illustrations.zip | AIGA/DOT pictograms (49 SVG) | Public domain, via Wikimedia Commons |

Note on Kenney: the Kenney game-icons pack was downloaded and inspected, but it
is PNG-only (425 PNG, 2 SVG), so it is NOT in the SVG-only vector zip, per the
task rules. Kenney stays a candidate for the weekly top-ups if an SVG pack is
found. OpenMoji covers the flat shapes, vehicles, animals and space objects the
bullet asked for.

## Textures (CC0, PNG/JPG, max 1024 px for photos, 1920 px for overlays)

ifm_assets_textures.zip, 19 files:
- 12 ambientCG CC0 colour maps, 1K JPG: Paper001-004, Concrete034/046/048,
  Plaster001, PaintedPlaster017, Fabric084/085, Metal063. Source per file in
  assets.json (https://ambientcg.com/a/<asset>).
- 7 procedural overlays, generated locally for The If Machine, royalty-free:
  grain, noise, halftone, scratches, light leak, bokeh, vignette (1920x1080 PNG).

Note: Poly Haven's API returned HTTP 522 at fetch time, so ambientCG was used
instead; both are CC0.

## Fonts (OFL only, 15 families)

ifm_assets_fonts.zip, 1,316 woff/woff2 files. Families: Unbounded, Inter,
Space Mono (the three BRAND fonts), Archivo, Outfit, Manrope, DM Sans,
Bricolage Grotesque, Fraunces, Work Sans, Oswald, Bebas Neue, Anton,
JetBrains Mono, IBM Plex Mono. All SIL Open Font License, via Fontsource
(https://fonts.google.com). Claude installs them with npm @fontsource.

## Map and chart data (public domain)

ifm_assets_natural_earth.zip, 20 GeoJSON files from Natural Earth
(https://github.com/nvkelso/natural-earth-vector, public domain):
- 10 m: admin_0_countries, admin_0_boundary_lines_land,
  admin_1_states_provinces, populated_places, rivers_lake_centerlines, lakes,
  coastline, airports, ports.
- 50 m: admin_0_countries, admin_1_states_provinces, populated_places,
  rivers_lake_centerlines, lakes, coastline.
- 110 m: admin_0_countries, coastline, populated_places, lakes,
  rivers_lake_centerlines.

## Deferred: Lottie animations

No Lottie files were fetched in wave 1: LottieFiles downloads need an account
and the licence of each file has to be checked individually. Left for a later
pass with an account, per the task's "only with a licence that allows
commercial use and modification" rule.
