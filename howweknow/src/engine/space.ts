// World ↔ screen. The camera looks at world point (x, y) with `zoom` (screen px per world unit) and `rot` (degrees).
// Planets live in the world: {x, y, size} world units; a point on a planet is anchored by lon/lat (orthographic, same as Globe3D).
import { Props } from './state';
export const SW = 1920, SH = 1080;
export type Cam = { x: number; y: number; zoom: number; rot: number };
export const toScreen = (c: Cam, wx: number, wy: number): [number, number] => {
  const dx = (wx - c.x) * c.zoom, dy = (wy - c.y) * c.zoom, r = (c.rot * Math.PI) / 180;
  return [SW / 2 + dx * Math.cos(r) - dy * Math.sin(r), SH / 2 + dx * Math.sin(r) + dy * Math.cos(r)];
};
const R = Math.PI / 180;
// screen position of (lon, lat) on a planet state; vis < 0 = on the far side
export const planetPoint = (c: Cam, p: Props, lon: number, lat: number): { x: number; y: number; vis: number } => {
  const [cx, cy] = toScreen(c, p.x, p.y), rad = (p.size * c.zoom) / 2, l0 = (p.lon ?? 0) * R, f0 = (p.lat ?? 0) * R, l = lon * R, f = lat * R;
  const x = rad * Math.cos(f) * Math.sin(l - l0), y = rad * (Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l - l0));
  return { x: cx + x, y: cy - y, vis: Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l - l0) };
};
// an anchor is [x, y] in world units, or {entity, lon?, lat?} (a point on a planet, or an entity's centre), or {screen: [x, y]}
export const anchor = (a: any, c: Cam, S: Record<string, Props>): [number, number] => {
  if (Array.isArray(a)) return toScreen(c, a[0], a[1]);
  if (a?.screen) return a.screen;
  const p = S[a?.entity]; if (!p) return [SW / 2, SH / 2];
  if (a.lon !== undefined && p._type === 'map') { const [wx, wy] = mapPoint(p, a.lon, a.lat); return toScreen(c, wx, wy); }
  if (a.lon !== undefined) { const q = planetPoint(c, p, a.lon, a.lat); return [q.x, q.y]; }
  return toScreen(c, p.x ?? 0, p.y ?? 0);
};
// a flat real map (equirectangular) placed in the world: its centre (x, y) is (lon 0, lat 0), its width w covers 360°
export const mapPoint = (m: Props, lon: number, lat: number): [number, number] => [m.x + (lon / 360) * m.w, m.y - (lat / 180) * (m.w / 2)];
