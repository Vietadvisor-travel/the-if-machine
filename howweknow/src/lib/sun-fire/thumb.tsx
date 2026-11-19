// sun-fire thumbnail — STUB (written after the drawings).
import React from 'react';
import { ThumbPoster, ThumbPosterV } from '../../kit/ThumbPoster';
const words = (p: any) => ({ kicker: p.kicker ?? 'Eddington · 1920', title: p.lines ?? ['WHAT', 'MAKES THE', 'SUN SHINE?'], accent: p.accent ?? 2, note: p.note ?? '' });
export const THUMB: React.FC<any> = (p) => <ThumbPoster {...words(p)} hero={<g />} back={<g />} lamp={[930, 260]} />;
export const THUMB_V: React.FC<any> = (p) => <ThumbPosterV {...words(p)} hero={<g />} back={<g />} />;
