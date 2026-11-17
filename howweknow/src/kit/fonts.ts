import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
const F: [string, string, string, string?][] = [
  ['Fraunces', 'fraunces-latin-400-normal.woff2', '400'], ['Fraunces', 'fraunces-latin-700-normal.woff2', '700'], ['Fraunces', 'fraunces-latin-400-italic.woff2', '400', 'italic'],
  ['Inter', 'inter-latin-400-normal.woff2', '400'], ['Inter', 'inter-latin-600-normal.woff2', '600'], ['Space Mono', 'space-mono-latin-400-normal.woff2', '400'],
  ['IM Fell English', 'im-fell-english-latin-400-normal.woff2', '400'], ['IM Fell English', 'im-fell-english-latin-400-italic.woff2', '400', 'italic'],
  ['IM Fell English SC', 'im-fell-english-sc-latin-400-normal.woff2', '400'], ['Pinyon Script', 'pinyon-script-latin-400-normal.woff2', '400'],
  ['IM Fell DW Pica', 'im-fell-dw-pica-latin-400-normal.woff2', '400'], ['IM Fell DW Pica', 'im-fell-dw-pica-latin-400-italic.woff2', '400', 'italic'],
  ['La Belle Aurore', 'la-belle-aurore-latin-400-normal.woff2', '400'], ['Special Elite', 'special-elite-latin-400-normal.woff2', '400'],
  ['IM Fell French Canon SC', 'im-fell-french-canon-sc-latin-400-normal.woff2', '400'],
  // thumbnail display faces (heavy period poster type; owner 17 Nov: "chữ to cần dầy hơn và to hơn")
  ['Abril Fatface', 'abril-fatface-latin-400-normal.woff2', '400'], ['Alfa Slab One', 'alfa-slab-one-latin-400-normal.woff2', '400'],
  ['Playfair Display', 'playfair-display-latin-900-normal.woff2', '900']];
export const fontsReady = Promise.all(F.map(([family, file, weight, style]) => loadFont({ family, url: staticFile('fonts/' + file), weight, style: style || 'normal' })));
