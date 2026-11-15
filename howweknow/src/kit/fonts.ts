import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
const F: [string, string, string, string?][] = [
  ['Fraunces', 'fraunces-latin-400-normal.woff2', '400'], ['Fraunces', 'fraunces-latin-700-normal.woff2', '700'], ['Fraunces', 'fraunces-latin-400-italic.woff2', '400', 'italic'],
  ['Inter', 'inter-latin-400-normal.woff2', '400'], ['Inter', 'inter-latin-600-normal.woff2', '600'], ['Space Mono', 'space-mono-latin-400-normal.woff2', '400']];
export const fontsReady = Promise.all(F.map(([family, file, weight, style]) => loadFont({ family, url: staticFile('fonts/' + file), weight, style: style || 'normal' })));
