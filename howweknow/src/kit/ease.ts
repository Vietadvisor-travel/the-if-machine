import { Easing, interpolate } from 'remotion';
const io = Easing.bezier(0.45, 0, 0.2, 1);
// k(t, a, b) = 0..1 eased progress between seconds a and b
export const k = (t: number, a: number, b: number, e = io) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
export const zoomThrough = (x: number) => Math.pow(60, x);   // exponential zoom reads as constant speed
