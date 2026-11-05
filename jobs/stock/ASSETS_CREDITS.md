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

## Wave 2 (2026-11-05): graphic assets, style-checked against BRAND section 4

3D low-poly, CC0 1.0, glTF unless noted:
- ifm_assets_kaykit_city.zip (82 files): KayKit City Builder Bits 1.0, https://github.com/KayKit-Game-Assets/KayKit-City-Builder-Bits-1.0
- ifm_assets_kaykit_furniture.zip (106 files): KayKit Furniture Bits 1.0
- ifm_assets_kaykit_restaurant.zip (288 files): KayKit Restaurant Bits 1.0
- ifm_assets_kaykit_medieval.zip (443 files): KayKit Medieval Hexagon Pack 1.0, glTF only (OBJ files in the source were not packed)
- ifm_assets_kaykit_space.zip (114 files): KayKit Space Base Bits 1.0
- ifm_assets_kaykit_adventurers.zip (58 files): KayKit Character Pack Adventures 1.0
- ifm_assets_kenney_roads3d.zip (73 files): Kenney City Kit Roads, GLB + colormap
- ifm_assets_kenney_food3d.zip (201 files): Kenney Food Kit, GLB + colormap
- ifm_assets_kenney_car3d.zip (46 files): Kenney Car Kit, GLB + colormap
- ifm_assets_kenney_survival3d.zip (81 files): Kenney Survival Kit, GLB + colormap
- ifm_assets_kenney_pirate3d.zip (67 files): Kenney Pirate Kit, GLB + colormap
- ifm_assets_quaternius_nature.zip (136 files): Quaternius Stylized Nature Megakit, glTF
- ifm_assets_quaternius_props.zip (205 files): Quaternius Fantasy Props Megakit, glTF + textures
- ifm_assets_quaternius_buildings.zip (44 files): Quaternius Medieval Village Pack, FBX only (no glTF in the source pack)
- ifm_assets_quaternius_food.zip (103 files): Quaternius Ultimate Food Pack, FBX only
- ifm_assets_quaternius_characters.zip (12 files): Quaternius RPG Characters, FBX only
- ifm_assets_quaternius_spaceships.zip (11 files): Quaternius Ultimate Spaceships, FBX only
All 3D sets above are CC0 1.0, no attribution required. Kenney and Quaternius files came via OpenGameArt mirrors (kenney.nl per-pack downloads now route through the itch.io All-in-1 bundle).

2D flat SVG, no black outlines (verified by scan: 0 black-stroke files):
- ifm_assets_fluent_flat.zip (3145 files): Microsoft Fluent Emoji, FLAT version only, MIT licence, https://github.com/microsoft/fluentui-emoji. Use as small UI symbols only, not as channel characters.
- ifm_assets_humaaans.zip (32 files): Humaaans by Pablo Stanley, CC0, https://www.humaaans.com/ (standing 1-24, sitting 1-8, via Wikimedia Commons).

Textures, CC0 1.0, colour map only:
- ifm_assets_textures2.zip (14 files): ambientCG Paper005, Paper006, Fabric086, Fabric001, Wood001, Wood002, WoodFloor001, WoodFloor002, Concrete049, Plaster002, Plaster003, Metal001, Metal002, plus one procedural chalkboard texture made locally (no ambientCG chalkboard asset exists). Stone coverage is concrete/plaster based; metal is not verified as scratched.

Dropped in wave 2, with reasons:
- Kenney City Kit Commercial, Suburban, Nature, Furniture, Space (3D): not downloadable per pack (itch.io bundle only); covered by KayKit/Quaternius.
- Kenney 2D packs: PNG, not SVG, so they fail this task's SVG requirement.
- unDraw: licence bans distributing the assets in packs, which is exactly this delivery format.
- Poly Pizza: API requires a key the project does not hold; Quaternius models cover the same ground.
- Kenney 2D and unDraw and Poly Pizza are not in any zip above.

Each zip holds assets.json (file, category, license, credit, source_url), the original LICENSE file, and preview.png.

## Wave 2 fix (2026-11-05): texture and format repack, same zip names, overwritten on Drive

Bug found in the first wave 2 upload: the packer kept only .gltf/.bin and dropped the texture PNGs the .gltf files point to, so every KayKit model and Quaternius nature/props model rendered grey. All 12 zips below were repacked and verified: every .gltf image/buffer reference resolves inside its zip (0 missing), every .glb opens with a valid glTF header, and 1 model per set was rendered to PNG and checked by eye for real texture colour.

- KayKit (6 zips, CC0): repacked from the original GitHub zips keeping the full gltf folder tree, so each .gltf sits next to its .bin and its texture PNG (citybits_texture.png, furniturebits_texture.png, restaurantbits_texture.png, spacebits_texture.png, hexagons_medieval.png, knight/rogue/mage/barbarian_texture.png). City 86 files, furniture 110, restaurant 292, space 118, medieval 458, adventurers 70 (includes the 5 self-contained character .glb files).
- Quaternius nature (160 files, 43.5 MB, CC0): repacked keeping the whole glTF/ folder, textures included. Leaves use alphaMode MASK (alpha cutout), which plain renderers must honour or the foliage looks streaked.
- Quaternius props (204 files, 40.4 MB, CC0): repacked keeping Exports/glTF/ plus the Textures/*.png files copied next to the .gltf files, because the .gltf files reference the texture names bare.
- Quaternius characters (9 files, 7.7 MB, CC0): replaced FBX with the official self-contained .gltf files from Quaternius's own Google Drive folder (6 characters, textures embedded, 11-15 animation clips each). Drive download quota blocked the first attempts and lifted later the same day.
- Quaternius spaceships (14 files, 33.6 MB, CC0): replaced FBX with the official self-contained .gltf files from Quaternius's Drive folder (11 ships, one texture embedded per ship).
- Quaternius buildings (47 files, 1.4 MB, CC0): replaced FBX with GLB converted from the pack's own FBX files with Blender 4.2 (FBX import + glTF export). The old Medieval Village Pack has no official glTF anywhere (its Drive folder holds Blends/FBX/OBJ only; only the newer Medieval Village MegaKit has glTF). The pack carries no texture files at all, so the conversion loses nothing: 44/44 models.
- Quaternius food (106 files, 0.9 MB, CC0): replaced FBX with GLB converted from the pack's own FBX files with Blender 4.2. Same situation as buildings: no official glTF for this pack, no texture files in the pack. Poly Pizza's Ultimate Food Pack bundle was checked as an alternative GLB source but covers only 48 of the 103 models (variants merged), so Blender conversion was used for full 103/103 coverage. Poly Pizza GLBs for the covered models were kept as spares under ~/workspace/ifm-staging/assets2/pp_spares/ (not shipped).

Render check tool: ~/workspace/ifm-staging/assets2/render_check.py (pure-Python software rasterizer, numpy+PIL, honours baseColorTexture and alpha MASK cutout). Renders saved under ~/workspace/ifm-staging/assets2/renders/v2/.
