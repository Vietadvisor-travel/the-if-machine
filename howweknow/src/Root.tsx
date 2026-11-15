import React from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { fontsReady } from './kit/fonts';
import { MoonLaser } from './episodes/MoonLaser';
import TL from '../episodes/moon-laser/timeline.json';
const h = delayRender('fonts'); fontsReady.then(() => continueRender(h));
export const Root: React.FC = () => (
  <>
    <Composition id="MoonLaser" component={MoonLaser} durationInFrames={Math.ceil(TL.duration * 30)} fps={30} width={1920} height={1080} />
  </>
);
