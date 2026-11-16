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

## Wave 3 (2026-11-07, weekly stock top-up): Carbon icons

- icons_carbon.zip (2,611 SVG, 1.0 MB): Carbon Design System icons v11.92.0, Apache-2.0,
  https://github.com/carbon-design-system/carbon (via npm @carbon/icons tarball).
  Original folder structure kept: svg/16, svg/20, svg/24, svg/32 plus 18 size-less root icons
  (caret/chevron/caution/severity shapes). assets.json inside (file, category, license, credit,
  source_url) and the Apache-2.0 LICENSE file. No attribution required.
- Excluded 289 brand/product files per the no-logos rule: all logo--* (49), apple* (2),
  ibm--* product icons, and the svg/32/Q and svg/32/watson-health subfolders (135 files).
- Queue note: Poly Haven API retried first and still returns HTTP 522, so item (a) is still
  not done; Carbon (item b) was packed instead. Next queue item remains (a) Poly Haven retry,
  then (b) Fluent UI icons / Ant Design icons, (c) Lottie (needs an account), (d) Kenney SVG,
  (e) new ambientCG set or OpenMoji-style SVG set.

## FATHOM earth-age (2026-11-16, Muse sourcing, order jobs/orders/earth-age.md)

Full per-file credits, sources and licence proofs: Drive `_hwk/earth-age/manifest.json`
plus `_hwk/earth-age/_proof/<id>.png` (one proof card per delivered file). 34 of 42 rows
delivered; misses: P-01, P-02, D-07, D-08, D-09, V-01, V-02, V-03 (reasons in the order file).

Attribution required (CC BY) - use these exact credit lines in the film credits:

- P-10 (North Downs, Weald): Gareth1953 All Right Now, CC BY 2.0
  https://www.flickr.com/photos/gareth1953/4448019945/
- P-11 + P-11-x1 (EastGRIP ice core, Greenland): Hellefys, CC BY 4.0
  https://commons.wikimedia.org/wiki/File:Ice_core_researchers_from_AWI_drilling_at_the_EastGRIP_ice_core_site,_Greenland_1.jpg
- A-01 take 1 (Geiger counter): jo0ls, CC BY 3.0
  https://commons.wikimedia.org/wiki/File:Geiger_counter.ogg
- A-01 take 2 (Geiger counter, KCl): uyt384, CC BY 3.0
  https://commons.wikimedia.org/wiki/File:Geiger_counter_sound_KCl.oga
- U-01 tracks 1-3 (music beds): Kevin MacLeod, CC BY 4.0
  https://incompetech.com/music/royalty-free/mp3-royaltyfree/Dreams%20Become%20Real.mp3
  https://incompetech.com/music/royalty-free/mp3-royaltyfree/Ossuary%206%20-%20Air.mp3
  https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2001.mp3
- V-01-x1 (Meteor Crater rim video, B-roll only): Angel Schatz, CC BY 2.0
  https://commons.wikimedia.org/wiki/File:Meteor_Crater_in_Arizona,_USA.webm

Public domain / CC0 (no attribution required, credits recorded in the manifest):
Kelvin portrait 1895, Rutherford portrait (Bain News Service), Boltwood lab 1917,
Meteor Crater aerial (USGS), Nier mass spectrometer tube (Smithsonian / DPLA),
Atlantic Ethyl pump (John Margolies, LOC), zircon (USGS), Ussher Annales 1650,
KJV Bible 1806, Darwin Origin 1859 p.287, Kelvin 1862 paper, Joly 1899 paper,
Boltwood 1907 Table VI, William Smith map 1815 (British Library, CC0),
Ussher engraving (Rijksmuseum, CC0), Canyon Diablo meteorite (Motekov, CC0),
Agpalilik slice (CC0), Darwin study 1930, Faraday lectures, Caltech 1944 map,
Faculty Club 1923, uraninite specimen, SFX quill/page/clock (Freesound CC0).
Reference only (never shown): Patterson with equipment (Caltech Archives, copyrighted).

## inside-earth (2026-11-16) - "What is inside the Earth?" (25 of 33 rows delivered)
Drive `_hwk/inside-earth/`: 28 main files + manifest.json, plus `_proof/<id>.png` (one proof card per delivered file, 51 cards), `_ref/` (12 reference files), `_alt/` (11 alternate/neighbour files). Misses: P-02, P-03, P-07, D-01, D-04, D-05, V-01, V-03 (reasons in the order file).

Attribution required (CC BY) - use these exact credit lines in the film credits:

- P-08 (Henry Cavendish aquatint): Wellcome Collection, CC BY 4.0
  https://commons.wikimedia.org/wiki/File:Henry_Cavendish._Aquatint_by_C._Rosenberg_after_W._Alexander_Wellcome_V0001039.jpg
- V-01-x1 (IRIS "How Does a Seismometer Work?", B-roll only): IRIS, CC BY 3.0
  https://commons.wikimedia.org/wiki/File:How_Does_a_Seismometer_Work%3F.webm
- U-01 tracks 1-3 (music beds): Kevin MacLeod, CC BY 4.0
  https://incompetech.com/music/royalty-free/music.html
- A-01 (Sumatra 2004 sonification): waveform data EarthScope Consortium (IRIS DMC); sonification by Muse
  https://service.iris.edu/fdsnws/dataselect/1/query?net=IU&sta=ANMO&loc=00&cha=BHZ&starttime=2004-12-26T00:58:53&endtime=2004-12-26T12:58:53&format=geocsv

Public domain / CC0 (no attribution required, credits recorded in the manifest):
Lehmann portrait (Even Neuhaus), Oldham frontispiece + Assam memoir plates 11 and 42 (1899),
Mohorovicic portrait + stamp portrait, Nelson College after Murchison 1929, Milne seismograph
(Daderot, CC0), Oldham 1906 first page + Fig. 1 + Fig. 2, Cavendish 1798 first page + p. 522
+ Tab. XXIII, Mururoa 1995 seismogram, GSN station map (plotted from EarthScope data on
NASA Blue Marble 2002), Kilauea fissure 20 overflight + spattering (USGS HVO), drill + paper
sounds (Wikimedia Commons), page turn (trundlefly, CC0), IASP91 travel times + PREM profile
(TauP 3.2.1), depths + places (compiled, verified), Lehmann quotes (transcribed, cited),
Holmen 1931 plan, Wiechert portrait, Milne bust (Daderot, CC0), Emslie 1852 map,
Kola geological section (CC0), Cavendish experiment diagram.
Reference only (never shown): young Lehmann 1932 (Linda Hall), Lehmann 1936 title page +
Fig. 1 + Fig. 6 + shadow-zone diagram (Linda Hall; paper under copyright), Mohorovicic 1910
English translation 1992 (Geofizika 9, copyrighted).
