# Transitions — pick by meaning (house list, 5 Nov 2026)

The If Machine films connect scenes with transitions that CARRY the idea (owner: "transitions like ElevenLabs"). Built-in shape
transitions: `morph` `match` `zoomthru` `push2` `wipe` `dissolve` `slide` `iris` `zoom` (engine/library/transitions2.js); GL shaders:
`trans=gl<Name>` (gl-transitions.com, MIT; rendered by engine/library/gl_transitions.js at half size; `tdur=` `tp="k=v"`).
Rules: never the same transition twice in a row; `fade` only into chapter cards; a "rare" one at most once a film; the incoming
scene is already alive when it is revealed (pre-roll, engine/timeline.js).

| trans= | what it does | use it for |
|---|---|---|
| glCrossWarp | The outgoing image zooms in while the incoming one zooms out into place, sweeping from right to left | one place sweeps into the next (default for moving along the argument) |
| glDirectionalWarp | A diagonal wipe with a warped, smeared edge | a diagonal turn of the page in the story |
| glDreamy | A crossfade with a gentle wavy distortion | into a memory, a "what if" |
| glDefocusBlur | A crossfade through an out-of-focus blur | refocus: from the big picture to a detail, or a new topic |
| glMorph | A crossfade in which each image is displaced by the other's colors, like a morph | one thing becomes another (shapes, colours) |
| glInkBleed | The incoming image spreads over the outgoing one like drops of ink in water, blooming from a few points with c | an idea spreading, history, a paper world |
| glRipple | Ripples spread from the center while crossfading | a consequence spreading out |
| glSwirl | Both images swirl around the center while crossfading | confusion, a world turned upside down (rare) |
| glCircleOpen | A soft-edged circle opens from the center to reveal the incoming image | reveal the answer, open a door |
| glRadialWipe | A radial wipe that sweeps around the center like a clock hand | time passing (a clock hand) |
| glGooeyWipe | Soft, glossy blobs of liquid pop up over the outgoing image, swell and melt into each other, revealing the inc | liquid, money flowing, playful |
| glCurvedWipe | The outgoing image is pulled away by its middle: the wipe edge bulges into a smooth curve that leads the way,  | pull the old idea away |
| glDirectional | The incoming image pushes the outgoing one out in a given direction | next step in a list |
| glDirectionalEased | Like Directional, with an eased movement | next step in a list, softer |
| glSimpleZoom | Zooms into the outgoing image, then fades to the incoming one | go into something |
| glZoomInOut | Zooms into the outgoing image until it blurs into a flat color, then out to the incoming one | go through one thing into another place |
| glWaterDrop | Ripples spread from the center like a drop falling into water, crossfading to the incoming image | a single event with ripples |
| glPerlinDissolve | The incoming image appears through blobs of Perlin noise | a world fading into another |
| glSmokeDissolve | Billowing smoke drifts in across the outgoing image, with lit tops, darker folds and wispy edges, and thickens | war, the past, something disappearing |
| glBokehDissolve | The image falls out of focus like a camera lens, its highlights swelling into large bright bokeh discs, and th | night, lights, dreams, cities |
| glFold | The incoming image unfolds from the left while the outgoing one folds away to the right | paper, documents, ration books |
| glBookFlip | The outgoing image turns like a book page from right to left, revealing the incoming one | history, a new chapter |
| glCylinderRoll | The frame wraps around a drum that rolls up, the outgoing image turning away over its top in a motion blur and | rolling on to the next era |
| glGridFlip | The image splits into a grid of tiles that flip one by one to the incoming image | many small things changing (prices, data) |
| glTilesWave | The incoming image is revealed tile by tile in a diagonal wave | a system changing piece by piece |
| glPolkaDotsCurtain | The incoming image appears through growing polka dots | light, playful reveal |
| glLiquidFill | The incoming image rises over the outgoing one like liquid filling a glass, its surface sloshing in waves, lit | filling up, saving, water |
| glInvertedPageCurl | The outgoing image curls away like a page, revealing the incoming one | turning a page (BSD-3) |
| glWindowSlices | The incoming image appears through vertical slices that widen | blinds opening onto a scene |
| glRevolve | The outgoing image swirls and zooms with motion blur into the incoming one | a big change, spin into the next era (rare) |
| glRotateScaleFade | The outgoing image spins and zooms while fading to the incoming one, over a background color | a dramatic step back (rare) |
| glStretchSlide | The outgoing image stretches out long as it shoots away to one side, pulling in the incoming one squashed behi | speed, rushing on |
| glTangentMotionBlur | The outgoing image is flung away along a curve with motion blur | flinging an idea away |
| glCrossZoom | A crossfade through a strong zoom blur | a sudden jump in scale |
| glRingsWipe | Concentric rings ripple out from the center and, one after another, each sweeps around like a clock hand in th | signals, broadcasting, networks |
| glFlowerWipe | A flower shape with several petals grows to reveal the incoming image | nature, growth |
| glLeafWipe | A leaf shape grows from the center to reveal the incoming image | nature, farms, seasons |
| glBrushWipe | A few broad brush strokes sweep across the frame in turn, back and forth, painting in the incoming image with  | painting a new picture, art |
| glFilmDissolve | A cross-dissolve blended in linear light, as light adds up on film: the frame keeps its brightness all the way | warm, emotional, the ending |
| glPhotoDevelop | The outgoing image washes out to a blank cream card, then the incoming image develops on it like an instant ph | an old photo, archives, the past |
| glHeatHaze | Shimmering heat waves rise through the frame, strongest at the bottom, making the outgoing image wobble like t | deserts, heat, mirage |
| glRefraction | The frame is seen through flowing liquid glass that bends the outgoing image more and more, with rainbow fring | water, glass, distortion of truth |
