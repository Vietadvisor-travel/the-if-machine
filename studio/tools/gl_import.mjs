// Import a curated set of GL Transitions (gl-transitions@3, MIT; InvertedPageCurl BSD-3) into the engine.
//   node tools/gl_import.mjs   → engine/library/gl_trans_data.js (name, glsl, params, author, license, description)
// Curated for The If Machine's calm premium look (owner, 5 Nov 2026: "transitions like ElevenLabs — very premium"):
// no flashes, glitches, TV noise, colour splits, light blow-outs or fast whips.
import fs from 'fs';
const ALL = JSON.parse(fs.readFileSync('node_modules/gl-transitions/gl-transitions.json', 'utf8'));
export const CURATED = ['CrossWarp', 'DirectionalWarp', 'Dreamy', 'DefocusBlur', 'Morph', 'InkBleed', 'Ripple', 'Swirl', 'CircleOpen', 'RadialWipe',
  'GooeyWipe', 'CurvedWipe', 'Directional', 'DirectionalEased', 'SimpleZoom', 'ZoomInOut', 'WaterDrop', 'PerlinDissolve', 'SmokeDissolve', 'BokehDissolve',
  'Fold', 'BookFlip', 'CylinderRoll', 'GridFlip', 'TilesWave', 'PolkaDotsCurtain', 'LiquidFill', 'InvertedPageCurl', 'WindowSlices',
  'Revolve', 'RotateScaleFade', 'StretchSlide', 'TangentMotionBlur', 'CrossZoom', 'RingsWipe', 'FlowerWipe', 'LeafWipe', 'BrushWipe', 'FilmDissolve',
  'PhotoDevelop', 'HeatHaze', 'Refraction'];
const out = CURATED.map(n => ALL.find(t => t.name === n)).filter(t => t && !(t.textures || []).length).map(t => ({ name: t.name, glsl: t.glsl, params: t.defaultParams || {}, types: t.paramsTypes || {}, author: t.author, license: t.license, description: t.description, tags: t.tags }));
fs.writeFileSync('engine/library/gl_trans_data.js', `/* GL Transitions (https://gl-transitions.com, npm gl-transitions@3.0.0) — curated for The If Machine by tools/gl_import.mjs.
   Each shader keeps its author and licence (MIT; InvertedPageCurl BSD 3-Clause). Credit line: "Transitions: gl-transitions.com (MIT)". */
window.GL_TRANS = ${JSON.stringify(out)};\n`);
console.log('gl transitions:', out.length, '→ engine/library/gl_trans_data.js');
