// Story-world timing. Every key time in an episode is written against the narration, so the picture follows the story:
//   2.5        absolute seconds
//   "L3"       start of line 3 (0-based)      "L3+1.2"  1.2 s after it      "L3-0.5"  0.5 s before it
//   "L3@mirror"  the moment the word "mirror" is spoken in line 3 (estimated from its position in the line)
//   "L3$"      end of line 3      "end"   end of the episode
import { Easing } from 'remotion';
export type Line = { i: number; text: string; start: number; dur: number };
export type TL = { slug: string; duration: number; lines: Line[] };

export const resolveTime = (ref: number | string, tl: TL): number => {
  if (typeof ref === 'number') return ref;
  const s = ref.trim(); if (s === 'end') return tl.duration;
  const m = s.match(/^L(\d+)(\$|@([^+\-]+))?([+\-]\d*\.?\d+)?$/); if (!m) throw new Error('bad time ref ' + ref);
  const L = tl.lines[+m[1]]; if (!L) throw new Error('no line ' + m[1] + ' in ' + ref);
  let t = L.start;
  if (m[2] === '$') t = L.start + L.dur;
  else if (m[3]) { const w = m[3].toLowerCase(), i = L.text.toLowerCase().indexOf(w); if (i < 0) throw new Error(`word "${w}" not in line ${m[1]}`); t = L.start + L.dur * (i / Math.max(1, L.text.length)) * 0.97; }
  return t + (m[4] ? parseFloat(m[4]) : 0);
};

export const EASE: Record<string, (x: number) => number> = {
  inOut: Easing.bezier(0.45, 0, 0.2, 1), out: Easing.bezier(0.16, 1, 0.3, 1), in: Easing.bezier(0.6, 0, 0.9, 0.4),
  linear: (x: number) => x, soft: Easing.bezier(0.3, 0, 0.3, 1), snap: Easing.bezier(0.7, 0, 0.1, 1),
};
