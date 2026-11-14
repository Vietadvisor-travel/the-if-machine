# Kit - Người đàn ông ăn hết một chiếc máy bay (man-ate-aeroplane) · Muse · 2026-11-14
Everything the viewer will SEE or HEAR, moment by moment, mapped to the shared library. Real only (studio/CLIP.md: realism bar, sound §2c). Status: ✅ in the library (id) · ❌ not findable (why + the stand-in Claude should use or the shot to reframe).
Done = every row ✅ or ❌ explained → STATUS research column `KIT_READY`.

## People (house rig, realistic; no likeness of the real person)
| who | age / origin / build | clothes & gear | animation clips needed | library id | ✅/❌ |
|---|---|---|---|---|---|
| Michel Lotito | 27-30, French, moustache, plain shirt | 1970s shirt, work table | Sitting, Picking_Up, Talking_General | - | ❌ no young adult European man in the library (same gap as 76-days-on-raft; eu-man-elder is the only European adult male and reads too old for 27). Stand-in for this clip: eu-man-elder for the older Lotito scenes, or build eu-man (MPFB, gender macro 1.0). Added to Wanted. |

## Places (each interior / exterior; era, weather, time of day, light)
| place | look (materials, era, light) | HDRI | materials | set models | background sound `real_<place>` | ✅/❌ |
|---|---|---|---|---|---|---|
| Stage and workshop, France, 1970s-80s | work table, saw, bottles of oil and water, a plate of nails, flat warm light | autoshop_01 | Metal009, rusty_metal_02, Plastic010 | cessna_172, bicycle, vintage_tv | real_room_night | ✅ (real_room_night_1 in library) |

## Objects, vehicles, animals (everything seen in close-up or wide)
| object | real model id (source, licence) | real scale | ✅/❌ |
|---|---|---|---|
| Cessna 150 light aircraft, ~1,100 kg | glb/cessna_172.glb (Sketchfab, CC Attribution, sousinho; proof _kits/man-ate-aeroplane/cessna_172.jpg) | 8.8 m long, 11.0 m wingspan (a Cessna 172, same family as the 150; use as the real stand-in for the 150) | ✅ |
| Bicycle | glb/bicycle.glb (Sketchfab, CC Attribution, tidominer; proof _kits/man-ate-aeroplane/bicycle.jpg) | 1.58 m long, 0.87 m tall (a vintage bike with a leather saddle and rear rack) | ✅ |
| Television set, 1970s-80s | glb/vintage_tv.glb (Sketchfab, CC Attribution, GraveyArt; proof _kits/man-ate-aeroplane/vintage_tv.jpg) | 0.5 m wide, 0.41 m tall (wood-grain cabinet, curved CRT screen; the screen texture has a crack in it, which suits a TV about to be eaten) | ✅ |
| Electric saw, metal pieces, mineral oil bottles | 2D inserts and small props; saw cutting is a sound moment, not a close-up model | - | ✅ (2D inserts) |

## Sounds of actions and events (recorded, `real_<what>`)
| moment | sound | library id (`ifm_real_…`) | ✅/❌ |
|---|---|---|---|
| The saw cutting metal | real_metal_groan | real_metal_groan_1 (12.8 s) | ✅ |
| Glass breaking (the first glass at 16) | real_glass_break | real_glass_break_1 (1.5 s, CC BY 4.0, Gravity Sound) + real_glass_break_2 (1.5 s, CC BY 4.0) | ✅ |
| Crowd murmur at the fair | real_crowd | real_crowd_1 (30.1 s, Public domain) + real_crowd_2 (57.2 s, CC0, Freesound) | ✅ |
| Laughter from the audience | real_laugh | real_laugh_1 (9.9 s, CC BY 3.0, lonemonk; take 2 is CC BY-SA, rejected) | ✅ |
| The gasp when he swallows the pieces | real_gasp | real_gasp_1 (1.5 s, CC0, Freesound) | ✅ |

## Credits to put in the video description
- Cessna 172 (stand-in for the 150): Sketchfab, CC Attribution (sousinho). Bicycle: Sketchfab, CC Attribution (tidominer). Television set: Sketchfab, CC Attribution (GraveyArt)
- HDRI autoshop_01, materials Metal009, rusty_metal_02, Plastic010: Poly Haven, CC0
- Sounds: see jobs/music/SFX_CREDITS.md for the real_* files used
