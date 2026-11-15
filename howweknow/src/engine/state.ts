// Every entity of the story world has initial props and a list of keys. A key starts at `t`, lasts `dur` (default 1.2 s) and moves the
// entity to the props it lists (numbers and colours glide, a `form` morphs, other values switch at the start). Entities never vanish
// between lines: they persist until a key fades them (a: 0), so the film is one continuous world.
import { interpolateColors } from 'remotion';
import { interpolate as morph } from 'flubber';
import { EASE, resolveTime, TL } from './time';

export type Props = Record<string, any>;
export type Key = Props & { t: number | string; dur?: number; ease?: string };
export type Entity = { id: string; type: string; z?: number; props?: Props; keys?: Key[]; children?: Entity[] };

const isColor = (v: unknown) => typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v);
const morphCache = new Map<string, (k: number) => string>();
const morphPath = (a: string, b: string, k: number): string => { const id = a + '|' + b; let f = morphCache.get(id); if (!f) { f = morph(a, b, { maxSegmentLength: 6 }) as (k: number) => string; morphCache.set(id, f); } return f(k); };

const mix = (a: any, b: any, k: number, prop: string): any => {
  if (k >= 1) return b; if (k <= 0 || a === undefined) return k <= 0 && a !== undefined ? a : b;
  if (typeof a === 'number' && typeof b === 'number') return a + (b - a) * k;
  if (isColor(a) && isColor(b)) return interpolateColors(k, [0, 1], [a, b]);
  if (prop === 'form' && typeof a === 'string' && typeof b === 'string') return morphPath(a, b, k);
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) return a.map((x, i) => mix(x, b[i], k, prop));
  if (a && b && typeof a === 'object' && typeof b === 'object') { const o: Props = { ...a }; for (const q of Object.keys(b)) o[q] = mix(a[q], b[q], k, q); return o; }
  return b;
};

export const stateAt = (e: Entity, t: number, tl: TL): Props => {
  let cur: Props = { a: 1, ...(e.props || {}) };
  const keys = (e.keys || []).map(k => ({ ...k, _t: resolveTime(k.t, tl) })).sort((x, y) => x._t - y._t);
  for (const k of keys) {
    if (t < k._t) break;
    const d = k.dur ?? 1.2, p = d <= 0 ? 1 : (EASE[k.ease || 'inOut'] || EASE.inOut)(Math.min(1, (t - k._t) / d)), from = cur; cur = { ...cur };
    for (const [q, v] of Object.entries(k)) { if (q === 't' || q === 'dur' || q === 'ease' || q === '_t') continue; cur[q] = mix(from[q], v, p, q); }
  }
  return cur;
};
