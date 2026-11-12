# Muse task — realistic 3D asset library for the new house look (owner, 12 Nov 2026: "full upgrade, simulation level")

Why: Claude is rebuilding the picture as realistic real-time 3D (three.js r160, rendered on Claude's cloud machine). The
cloud machine cannot reach Poly Haven, ambientCG, Quaternius, Mixamo or Sketchfab (proxy refuses), so Muse downloads, and
Claude pulls from Drive with `python3 tools/pp_drive.py get`. Everything must be free for commercial use. Prefer CC0; anything
else gets its exact licence and source URL written down. Do not post anything, do not buy anything.

Drive target: `TheIfMachine_Media/_assets3d/<group>/…` (one zip per group is fine). In the repo, write only text:
`jobs/stock/ASSETS3D.md` (what, where, licence, source URL per item) and `jobs/stock/assets3d_index.json` (one entry per
file: path on Drive, group, category, name, licence, source, size). No binaries in git.

## 0. Your machine (one paragraph in ASSETS3D.md)
GPU model and VRAM (if any), CPU, RAM, free disk, OS, whether Blender is installed (version). Claude will decide from this
whether heavy renders can run on your machine later.

## 1. HDRIs — Poly Haven (CC0), `.hdr`, both 1k and 2k
About 24, covering: clear midday sky · golden hour / sunset · overcast · blue hour · night city street · night rural/moon ·
interiors (living room, kitchen, bathroom, office, warehouse/garage, hospital or lab, school/classroom, church/hall) ·
photo studio (neutral) · forest · desert/canyon · beach/sea · snow/mountain · cave or tunnel if available.
Name files as Poly Haven names them; list them by category in ASSETS3D.md.

## 2. PBR materials — Poly Haven or ambientCG (CC0), 2k JPG maps (Color, NormalGL, Roughness, AO, Displacement)
About 50: rusty metal (3), painted metal (3, different colours), corrugated metal, brushed steel, concrete smooth + rough,
plaster wall (2), brick (2), bathroom tiles (2), wood floor planks (2), fine wood, plywood, fabric cotton, denim, wool,
leather, sand dry + wet, rock (4 kinds), sandstone/tuff (2), gravel, soil/mud, grass, asphalt dry + wet, marble, plastic,
rubber, ceramic, rope, carpet, roof tiles, ice/snow.

## 3. Props and environments — Poly Haven models (CC0), glTF + 2k textures
About 40: chairs, tables, sofa, bed, shelves, kitchen set (fridge, stove, sink, pots), bathroom (toilet, sink, bathtub),
tools (hammer, wrench, flashlight, rope, bucket), lamps (oil lamp, desk lamp, street lamp), barrels, crates, rocks and
boulders (5), trees and bushes (6), plants, food items, books, phone/radio, doors and windows.
Plus any CC0 boat or ship glTF you can find (tugboat or work boat ideal; Sketchfab CC0 or Poly Haven), with author + URL.

## 4. People — realistic, rigged, animated (the most important part)
Goal: 10–12 realistic human bodies (not cartoon) with one shared skeleton, plus a library of animation clips on that skeleton.

Preferred route (CC0): **MPFB / MakeHuman in Blender** (if Blender is on your machine):
- generate 12 people: man/woman/boy/girl/elder; skin tones covering West African, East Asian, Southeast Asian, South Asian,
  European, Middle Eastern, Latin American; realistic proportions; simple everyday clothes (t-shirt + shorts, t-shirt + jeans,
  shirt + trousers, dress, jacket, overalls/work clothes, wetsuit-like dark suit) and short hair styles;
- rig: MPFB "Game engine" skeleton; export each as `.glb` (Y-up, textures embedded, 1 material per part is fine).

Animations: **Mixamo** (free with an Adobe account; check and copy the licence wording into ASSETS3D.md). Download
"Without Skin", 30 fps, then retarget onto the MPFB game-engine skeleton in Blender (or download them on a Mixamo character
that you also export, if retargeting is not possible — say which route you used). Clips (one `.glb` each, or one `.glb`
holding all actions with clear names):
idle, breathing idle, nervous idle, look around, walk, run, sneak, jump, fall, get up, sit down, sitting idle, stand up,
talk (2), point, wave, shrug, surprised, scared/flinch, cry, laugh, crouch, crawl, climb, push, pull, carry box, pick up,
swing hammer / hit, type on keyboard, phone call, swim (breaststroke + crawl), treading water, float on back, dive,
reach up, reach forward, grab, punch (for "impact" shots), dying/collapse, drowning-struggle (if available), sleep/lie down.

Backup route (CC0): **Quaternius Universal Animation Library + Universal Base Characters** (if the licence is CC0 — check),
glTF with the same skeleton.

If you cannot do part 4 fully, do what you can and write exactly what is missing.

## 5. Effects — CC0
Caustics texture sequence (water light pattern), bubble and dust sprites, smoke/fire flipbooks, rain/snow sprites,
lens dirt texture.

## Deliver
Upload, write ASSETS3D.md + assets3d_index.json, commit `[muse] 3D asset library`, push, add an INBOX line
`muse → claude · [assets3d] ready`, and tell the owner in one Vietnamese line.
