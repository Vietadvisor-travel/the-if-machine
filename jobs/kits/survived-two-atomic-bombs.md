# Kit - Người đàn ông sống sót sau cả hai quả bom nguyên tử (survived-two-atomic-bombs) · Muse · 2026-11-14
Everything the viewer will SEE or HEAR, moment by moment, mapped to the shared library. Real only (studio/CLIP.md: realism bar, sound §2c). Status: ✅ in the library (id) · ❌ not findable (why + the stand-in Claude should use or the shot to reframe).
Done = every row ✅ or ❌ explained → STATUS research column `KIT_READY`.

## People (house rig, realistic; no likeness of the real person)
| who | age / origin / build | clothes & gear | animation clips needed | library id | ✅/❌ |
|---|---|---|---|---|---|
| Tsutomu Yamaguchi | 29, Japanese, engineer | 1940s work clothes, then bandaged hands and face, then a suit | Running, Falling_Down, Getting_Up, Talking_General | glb/ea-man | ✅ |
| Hisako, his wife | young Japanese woman | 1940s dress, holding the baby | Sitting_Idle, Reacting | glb/ea-woman | ✅ |
| Mitsubishi supervisor | middle-aged Japanese man | 1940s suit | Talking_General, Reacting | glb/ea-man | ✅ (second use, different clothes) |

## Places (each interior / exterior; era, weather, time of day, light)
| place | look (materials, era, light) | HDRI | materials | set models | background sound `real_<place>` | ✅/❌ |
|---|---|---|---|---|---|---|
| Hiroshima street, 6 Aug 1945, 08:15, summer morning | wooden houses, a road to the shipyard, bright sun then white flash and darkness | qwantani_dusk_2_puresky (blue-hour, for the darkened aftermath) | dark_wood, red_brick | rollershutter_window_01 | real_room_night (quiet aftermath) | ✅ (real_room_night_1 in library) |
| Mitsubishi office, Nagasaki, 9 Aug 1945, about 11:00 | 1940s Japanese office: wooden desks, paper, windows, a meeting table | poly_haven_studio | dark_wood, plywood | modern_arm_chair_01, desk_lamp_arm_01, rollershutter_window_01 + local_wooden_desk, local_paper_stack | real_room_night | ✅ HDRI/materials/models; ✅ wooden desk and paper stack built in this run (index 692) |

## Objects, vehicles, animals (everything seen in close-up or wide)
| object | real model id (source, licence) | real scale | ✅/❌ |
|---|---|---|---|
| Wooden office desk, 1940s | glb/local_wooden_desk_glb (local Blender, CC0; built 2026-11-14) | 1.5 m (validated 1.5 x 0.8 x 0.75 m) | ✅ |
| Paper stack on the desk | glb/local_paper_stack_glb (local Blender, CC0; built 2026-11-14) | 0.3 m (validated 0.33 x 0.25 x 0.12 m) | ✅ |
| Armchair, desk lamp, window | glb/modern_arm_chair_01, glb/desk_lamp_arm_01, glb/rollershutter_window_01 (Poly Haven, CC0) | real scale | ✅ |
| Explosion flash | 2D effect, white light then darkness and ash | - | ✅ (2D, no model needed) |

## Sounds of actions and events (recorded, `real_<what>`)
| moment | sound | library id (`ifm_real_…`) | ✅/❌ |
|---|---|---|---|
| The blast (stand-in: thunder, never a Hollywood explosion) | real_thunder | world_thunder_1.wav from ifm_sfx_1.zip (4.5 s, CC0 1.0, real recording, old library) | ✅ (the two new thunder takes are CC BY-SA, rejected) |
| Crowd murmur, dazed streets | real_crowd | real_crowd_1 (30.1 s, Public domain) | ✅ |
| Footsteps on the street and in the office | real_footsteps | real_footsteps_2 (90.3 s, Public domain) | ✅ |
| Him falling as the windows shatter | real_body_fall | - | ❌ NONE FOUND (same as fell-10km); no stand-in, omit the thud or record foley |
| His breathing, bandaged and ill | real_breath | real_breath_2 (heavy breathing, 59.8 s) | ✅ |

## Credits to put in the video description
- Wooden desk, paper stack: modelled locally in Blender for The If Machine, CC0
- HDRI qwantani_dusk_2_puresky, poly_haven_studio, materials dark_wood, plywood, red_brick: Poly Haven, CC0
- Sounds: see jobs/music/SFX_CREDITS.md for the real_* files used
