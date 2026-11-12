// Rebuild engine/library/three_addons.js (three r160 addons as one IIFE on the global THREE → window.THREE_X):
//   cd tools/three_addons && npm i --no-save esbuild@0.24.0 && node build.mjs
import * as esbuild from 'esbuild'; import path from 'path'; import fs from 'fs'; const here = path.dirname(new URL(import.meta.url).pathname), studio = path.resolve(here, '../..');
fs.writeFileSync(path.join(here, 'shim.cjs'), 'module.exports = window.THREE;\n');
await esbuild.build({ entryPoints: [path.join(here, 'entry.js')], bundle: true, format: 'iife', minify: true, outfile: path.join(studio, 'engine/library/three_addons.js'), nodePaths: [path.join(studio, 'node_modules')],
  banner: { js: '/* three.js r160 addons (MIT) bundled for the global THREE: loaders, post-processing, Sky, Water, SkeletonUtils. Built by tools/three_addons/build.mjs (esbuild). */' },
  plugins: [{ name: 'global-three', setup(b) { b.onResolve({ filter: /^three$/ }, () => ({ path: path.join(here, 'shim.cjs') })); } }] });
console.log('built');
