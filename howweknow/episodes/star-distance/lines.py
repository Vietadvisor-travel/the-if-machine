#!/usr/bin/env python3
"""star-distance — "How far away are the stars?" — script + v6 shot plan (single source, STORY.md §7–8, standard 6, directed v7).
python3 episodes/star-distance/lines.py → episode.json (+ jobs/scripts/star-distance_concepts.md), then python3 tools/plan_md.py episodes/star-distance
→ jobs/scripts/star-distance.md. Facts: jobs/research/star-distance.md. Stock: jobs/orders/star-distance.md. Chain: jobs/scripts/star-distance_chain.md.
Treatment: jobs/scripts/star-distance_treatment.md.

THE GOVERNING IMAGE: the parallax blink — one point that jumps against what lies behind it (your thumb, a near star, a breathing star, a galaxy).
THE MOTIF (shape): the CIRCLE of the lens — the eye, the heliometer's eyepiece, Leavitt's loupe, the dome of Mount Wilson, Gaia's mirror.
THE ACCENT: vermilion — Hubble's VAR!, the ringed star, Bessel's circled number. Act colours: indigo night → lamp-warm plates → deep blue and gold."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')); from _lines_common import write
ROWS, CONCEPTS = [], []
def R(sec, text, src, in_, cam, comp, life, set_, new, stock, how, frm, to, reads, focus, acts, mood, alt, shot, light, sp=None, motif=None, note=''):
    see = to[0].upper() + to[1:] + '.'
    d = len(text.replace('*', '').split()) / 2.35; acts = list(acts); i = 0   # no stretch > 2.4 s without a beat: the camera keeps travelling to the focus
    while i <= len(acts):
        a = acts[i - 1][0] if i else 0; b = acts[i][0] if i < len(acts) else d
        if b - a > 2.4: acts.insert(i, (round(a + 2.2, 1), f'the camera travels on toward {focus}' if i % 2 else f'the light shifts across {focus}'))
        i += 1
    beats = ' | '.join(f'+{a:.1f} {s}' for a, s in acts)
    X = {'reads': reads, 'focus': focus, 'becomes': {'from': frm, 'to': to, 'how': how, **({'note': note} if note else {})}, 'acts': [list(a) for a in acts],
         'mood': mood, 'shot': shot, 'light': light}
    if sp: X['setpiece'] = sp
    if motif: X['motif'] = motif
    ROWS.append((sec, text, src, in_, how, cam, comp, life, set_, new, stock, see, beats, X)); CONCEPTS.append((len(ROWS) - 1, text, alt))

# ======================================================================== COLD — the narrated opening (set piece 1: the jumping thumb)
R('COLD', "Hold up your thumb at arm's length, and look past it, at something far *away*.", '-',
  'ink-on', 'push', 'right-third-large', ['dust'], 'thumb-at-the-night-window', ['NightWindow', 'ThumbHand'], [],
  'ink-on', 'the dark page', 'a window at night over old rooftops; a hand rises into the frame and holds up its thumb against the glass',
  'Someone holds a thumb up in front of a night window.', 'the thumb against the lit rooftops',
  [(0, 'a lamp is lit inside the room; the window frame inks on'), (1.4, 'rooftops and a chimney ink on beyond the glass'), (2.8, 'a hand rises into the frame'), (4.0, 'the thumb lifts, upright, against a far chimney'), (5.4, 'the camera settles on the thumb')],
  'mystery', 'A: a child at a window · B: a ruler held up to the sky · C: the viewer’s own thumb against the night — PICK C (the method in your own hand)',
  'medium', 'a desk lamp behind, left; moonlight on the rooftops', sp=1)
R('COLD', "Now close one eye… then the other. Your thumb *jumps*.", '-',
  'focus', 'hold', 'centre-large', ['breathe'], 'the-thumb-jumps', ['ThumbHand', 'BlinkEye'], [],
  'rack-focus', 'the thumb against the chimney', 'an eye in a circle beside the thumb; it blinks, and the thumb leaps sideways against the chimney behind',
  'Close one eye, then the other: the thumb jumps against the background.', 'the thumb leaping across the chimney',
  [(0, 'focus racks to the thumb; a round inset of an eye inks on'), (1.2, 'the left eyelid shuts'), (1.9, 'the thumb jumps left of the chimney'), (2.6, 'the lid opens, the right one shuts'), (3.2, 'the thumb jumps right')],
  'mystery', 'A: two photographs side by side · B: a car passing trees · C: your own blink, thumb leaping — PICK C (governing image, born)',
  'close', 'the desk lamp, warm on the knuckles', sp=1, motif='the eye — a blinking circle')
R('COLD', "Nothing moved but your point of view. And that little jump, it turns out, can measure the distance to the *stars*.", 'F1',
  'iris', 'tilt-up', 'centre-medium', ['stars'], None, ['ThumbHand', 'NightWindow'], [],
  'solid-morph', 'the thumbnail', 'the thumbnail swells into a pale disc and the rooftops darken into a night sky: the Moon, then stars coming out',
  'That jump will measure the stars.', 'the thumbnail turning into the Moon',
  [(0, 'two ink ticks mark where the thumb stood each time'), (1.6, 'a dotted arc joins the ticks'), (3.0, 'the thumbnail swells and pales'), (4.4, 'it is the Moon; the street darkens'), (5.8, 'the first stars prick out round it'), (7.2, 'the camera tilts up into them')],
  'mystery', 'A: a diagram of two eyes · B: a lighthouse beam · C: the nail itself becomes the Moon — PICK C (★ the thumb becomes the sky)',
  'medium', 'moonlight, cold, from the disc itself', sp=1)
R('COLD', "For thousands of years, people looked up at those lights and wondered how far away they *were*.", 'F1',
  'wipe', 'crane', 'wide-sky', ['stars'], 'sky-of-fixed-stars', ['StarCabinet'], ['M-01'],
  'crane', 'the Moon among the first stars', 'the camera rises past the Moon into a full engraved night sky; old constellation figures ghost through it',
  'People have always looked at the stars and wondered how far they are.', 'the field of stars filling the frame',
  [(0, 'the camera cranes up past the Moon'), (1.6, 'the black fills with pinpricks'), (3.2, 'the old figure of the Swan ghosts over the stars (★M-01)'), (4.8, 'the figure fades; the stars stay')],
  'mystery', 'A: Stonehenge · B: a child asking · C: rise through the sky past the Moon — PICK C (one continuous rise)',
  'wide', 'starlight only; deep indigo')
R('COLD', "But the stars never seemed to move. They looked pinned in place, like jewels in a *cabinet*.", '-',
  'drop', 'pull', 'centre-large', ['dust'], 'star-cabinet', ['StarCabinet'], [],
  'shrink-into', 'the field of stars', 'the stars shrink onto a velvet board behind glass: a collector’s cabinet, every star on a brass pin with a paper label',
  'People thought of the stars as fixed, like things pinned in a case.', 'the pinned stars behind the cabinet glass',
  [(0, 'the sky shrinks back onto dark velvet'), (1.6, 'the cabinet frame inks on round it'), (3.0, 'brass pins glint under the stars'), (4.4, 'small paper labels, all blank'), (5.6, 'a sheen crosses the glass')],
  'mystery', 'A: a planetarium dome · B: a ceiling painted with stars · C: the sky becomes a collector’s case — PICK C (★ the “fixed stars” made literal)',
  'medium', 'a lamp low left, reflected in the glass')
R('COLD', "Astronomers called them the fixed stars. And for two thousand years, nobody could say how far away a single one of them *was*.", 'F1',
  'stamp', 'push', 'right-third-medium', ['dust'], None, ['StarCabinet'], [],
  'spot', 'the cabinet', 'one pinned star in the cabinet, its blank label; the light narrows to it',
  'Nobody knew the distance to any star.', 'the blank label under one star',
  [(0, 'the light narrows to one star'), (1.6, 'its blank label turns to the camera'), (3.2, 'a quill writes “? miles” and stops'), (4.8, 'the star trembles on its pin'), (6.4, 'note “stellae fixae” in an old hand on the frame')],
  'mystery', 'A: a book of ancient astronomy · B: a blank ruler · C: the blank label under one pinned star — PICK C',
  'close', 'the narrowing lamp, one pool')
R('COLD', "The answer took a split telescope in Prussia, a woman with a magnifying glass, and one word scrawled on a glass *plate*.", 'F2 F5 F8',
  'slide', 'pan', 'three-in-a-row', ['dust'], 'three-cards-in-the-cabinet', ['StarCabinet'], ['P-05', 'P-02', 'P-04'],
  'split', 'the trembling star', 'three cabinet cards slide out from the case: Bessel’s portrait, Leavitt’s, and Hubble at the eyepiece',
  'Three people found the answer.', 'each portrait as it slides out',
  [(0, 'the star’s pin splits into three'), (1.2, 'Bessel’s card slides out (★P-05)'), (2.8, 'Leavitt’s card (★P-02)'), (4.4, 'Hubble at the eyepiece (★P-04-x1)'), (6.0, 'the camera pans along the three'), (7.4, 'a sheen crosses them')],
  'curious', 'A: three names written · B: three keys on a ring · C: three cards in the same cabinet — PICK C (real faces by 0:45)',
  'medium', 'the cabinet lamp, warm on the cards')
R('COLD', "And the answer turned out to be far stranger than the *question*.", '-',
  'ink-bleed', 'push', 'centre-medium', ['stars'], None, ['StarCabinet'], [],
  'bloom-out', 'the three cards', 'the cards slide back; the cabinet glass darkens and the episode’s title is engraved on it',
  'A strange answer is coming.', 'the title on the glass',
  [(0, 'the cards slide back into the case'), (1.4, 'the cabinet’s stars gather to one point'), (2.6, 'the title card inks on')],
  'mystery', 'A: a plain title · B: a door closing · C: the case gathers to a point and the title appears — PICK C',
  'wide', 'the glass darkening; one star glowing')
# ======================================================================== THE STAKES
R('STAKES', "A star is a dot of light. It has no size you can see, no edge, no *label*.", '-',
  'focus', 'push', 'centre-large', ['stars'], 'point-that-stays-a-point', ['ScopeField'], [],
  'through', 'the one glowing star of the title', 'the round field of a telescope: one star, magnified again and again, stays a point',
  'Even magnified, a star is just a point.', 'the single point in the eyepiece',
  [(0, 'we go through into the round field'), (1.2, 'the star is a point'), (2.4, 'the field magnifies — still a point'), (3.6, 'again — still a point'), (4.6, 'crosshairs ink on, finding nothing to measure')],
  'curious', 'A: a star close up (wrong: it would have a disc) · B: a full stop on a page · C: magnify and magnify, it stays a point — PICK C (true)',
  'detail', 'the star itself, in the black', motif='the eyepiece — a circle with nothing to measure')
R('STAKES', "A bright star could be close… or huge, and very far away. From here, the two look exactly the *same*.", '-',
  'slide', 'pull', 'split-two', ['photons'], 'candle-and-lighthouse', ['CandleAndLighthouse'], [],
  'split', 'the one star in the field', 'the field splits in two: a candle near at hand and a lighthouse far off on a headland, each shining as the same dot',
  'A near candle and a far lighthouse can look equally bright.', 'the two equal dots',
  [(0, 'the field splits down the middle'), (1.4, 'left: a candle on a sill, close'), (2.8, 'right: a lighthouse far out on a headland'), (4.2, 'the camera pulls back: both shrink'), (5.6, 'they become two identical dots')],
  'curious', 'A: two stars labelled · B: car headlights · C: candle near, lighthouse far — PICK C (brightness lies)',
  'wide', 'the candle flame (left) and the lighthouse lamp (right)')
R('STAKES', "To find the distance, you need something you can measure. And the first clue was the one in your own *eyes*.", '-',
  'blinds', 'push', 'right-third-medium', ['breathe'], None, ['BlinkEye'], [],
  'merge', 'the two equal dots', 'the two dots slide together and become the catch-lights of a pair of eyes, close',
  'The first clue is in our own two eyes.', 'the two eyes',
  [(0, 'the dots slide toward each other'), (1.6, 'they settle as catch-lights'), (3.0, 'a pair of eyes inks on round them'), (4.4, 'the eyes look up'), (5.8, 'they blink')],
  'curious', 'A: an eye chart · B: binoculars · C: the dots become the light in your own eyes — PICK C',
  'close', 'the lamp reflected as two catch-lights', motif='the eye — two circles')
# ======================================================================== CLUE 1 — the wobble
R('CLUE1', "Clue one: the *wobble*.", '-',
  'stamp', 'hold', 'centre-medium', ['boil'], None, ['BlinkEye'], [],
  'count-up', 'the blinking eyes', 'the clue tag; the eyes’ blink keeps a slow beat, left, right',
  'Clue one: the wobble.', 'the clue tag',
  [(0, 'the clue tag inks on (1 of 4)'), (1.0, 'the eyes blink, left, right')],
  'curious', 'A: a title card · B: a pendulum · C: the blink keeps the beat — PICK C',
  'medium', 'the lamp')
R('CLUE1', "Your eyes see from two places, a few centimetres apart. So a near thing seems to jump against a far one. That jump is called *parallax*.", 'F1',
  'ink-on', 'pull', 'diagonal', ['dust'], 'two-sightlines', ['BlinkEye', 'ThumbHand'], [],
  'travel-line', 'the two eyes', 'from each eye a gold sightline runs past the thumb to the chimney; where they land is the jump',
  'Two eyes, two lines of sight: the near thing jumps.', 'the two lines crossing at the thumb',
  [(0, 'a gold line leaves the left eye'), (1.4, 'it passes the thumb and lands on the chimney'), (2.8, 'a second line leaves the right eye'), (4.2, 'it lands a little further over'), (5.6, 'the gap between the landings is bracketed'), (7.0, 'label “parallax” on the bracket')],
  'curious', 'A: a textbook diagram · B: two torches · C: the sightlines drawn out of the real eyes past the real thumb — PICK C',
  'wide', 'the lamp; gold lines of sight')
R('CLUE1', "Now spread your eyes as far apart as they could ever be: the two ends of the Earth's path around the *Sun*.", 'F1',
  'grow', 'pull', 'wide-orbit', ['stars'], 'eyes-become-the-orbit', ['OrbitTriangle'], [],
  'grow-out-of', 'the two eyes', 'the eyes fly apart and become the Earth in January and the Earth in July, on either side of a gold Sun',
  'Use the Earth’s orbit as two eyes, far apart.', 'the two Earths at the ends of the orbit',
  [(0, 'the eyes fly apart'), (1.6, 'an ellipse of orbit inks on between them'), (3.0, 'the Sun blooms gold in the middle'), (4.4, 'each eye becomes an Earth'), (5.8, 'labels “January” and “July”')],
  'wonder', 'A: an orbit diagram · B: two lighthouses · C: your two eyes become the Earth’s two positions — PICK C (★ the body becomes the orbit)',
  'wide', 'the Sun, gold, centre', sp=1)
R('CLUE1', "Look at a nearby star in January, and again in July. Against the stars far behind it, it should shift, very *slightly*.", 'F1',
  'iris', 'push', 'split-two', ['stars'], 'january-july-fields', ['ParallaxField'], [],
  'shape-window', 'the two Earths', 'two round eyepiece fields side by side — January and July — then laid one over the other like tracing paper',
  'The near star moves a tiny bit between January and July.', 'the near star’s hair-width slide',
  [(0, 'from each Earth a round field opens'), (1.6, 'January: a near star among far ones'), (3.2, 'July: the same field'), (4.8, 'the July field slides over the January one'), (6.4, 'the far stars match; the near one has slid a hair'), (7.8, 'an ink tick marks the shift')],
  'tension', 'A: an animation of a star moving · B: two photos flicked · C: overlay the two fields like tracing paper — PICK C (★ the shift is found by overlaying)',
  'detail', 'starlight in two round fields', sp=1, motif='the eyepiece — January and July')
R('CLUE1', "Astronomers looked for that shift for centuries. So why did they see *nothing*?", 'F1',
  'ink-bleed', 'pan', 'wide-landscape', ['stars'], 'centuries-of-looking', ['TelescopeRow'], [],
  'page-turn', 'the overlaid fields', 'a row of telescopes through the centuries, each pointed at the same star, each with an empty notebook',
  'For centuries, they looked and could not see it.', 'the notebooks turning, empty',
  [(0, 'the fields turn over like a page'), (1.4, 'a 17th-century tube, an 18th-century reflector, a refractor ink on in a row'), (3.0, 'each notebook turns its empty pages')],
  'tension', 'A: a list of names · B: a fisherman with an empty net · C: three centuries of telescopes in a row, empty notebooks — PICK C',
  'wide', 'cold starlight on brass')
R('CLUE1', "The shift was there. But for every star, it is less than one three-thousand-six-hundredth of a *degree*.", 'F1',
  'grow', 'push', 'centre-large', ['tremble'], 'degree-cut-to-slivers', ['ArcDial'], [],
  'dive', 'the empty notebooks', 'a brass protractor; we dive into one degree, which divides into sixty, then sixty again — a sliver too thin to see',
  'The shift is far smaller than a degree — a tiny sliver.', 'the last sliver',
  [(0, 'a brass protractor inks on'), (1.4, 'we dive into one degree'), (2.8, 'it splits into sixty minutes'), (4.2, 'we dive into one'), (5.6, 'it splits into sixty seconds'), (7.0, 'one second of arc, a hair')],
  'tension', 'A: a number · B: a hair under a microscope · C: dive into a degree until one second is a hair — PICK C (★ a scale-dive into an angle)',
  'insert', 'a lamp raking across the brass')
R('CLUE1', "In the 1830s, in Königsberg, Friedrich Bessel set out to catch it, with a telescope built for one job: measuring tiny *angles*.", 'F2 F3',
  'rise', 'crane', 'left-third-medium', ['dust'], 'bessel-tower', ['KoenigsbergDome', 'Heliometer'], ['R-02', 'R-05', 'P-05'],
  'grow-out-of', 'the hair-thin sliver', 'the sliver is the slit of a dome opening on the night: inside, Bessel beside the brass heliometer on its mount',
  'Bessel and his special telescope in Königsberg.', 'Bessel at the heliometer',
  [(0, 'the sliver widens into the dome’s open slit'), (1.6, 'the dome interior inks on, moonlight through the slit'), (3.2, 'the heliometer on its iron mount'), (4.8, 'Bessel inks on beside it'), (6.4, 'note “Königsberg, 1837”'), (8.0, 'he lays a hand on the tube')],
  'curious', 'A: Bessel’s portrait · B: a watchmaker’s bench · C: the angle’s sliver opens as the dome’s slit — PICK C',
  'medium', 'moonlight through the dome slit, a shuttered lantern low left')
R('CLUE1', "His heliometer cut the image of the sky in two, so he could slide one star onto another and read the gap between *them*.", 'F2',
  'quill', 'dive', 'centre-large', ['tremble'], 'split-lens-slide', ['Heliometer', 'SplitField'], ['R-02'],
  'through', 'the heliometer', 'through the eyepiece: the field cut in two halves; one half slides until one star sits on another; a vernier scale reads the gap',
  'The telescope splits the view and slides one star onto another.', 'the two stars meeting',
  [(0, 'insert: his hand on the micrometer screw'), (1.4, 'we go through the eyepiece'), (2.8, 'the field splits along a line'), (4.2, 'one half slides'), (5.6, 'one star settles on the other'), (7.0, 'a vernier reads the gap')],
  'curious', 'A: a diagram of a split lens · B: two halves of a torn photo · C: the hand turns the screw and the halves slide — PICK C (how it works)',
  'insert', 'the shuttered lantern on the hand', motif='the eyepiece — cut in two')
R('CLUE1', "His target was a faint double star in the Swan, called 61 Cygni. It crawls across the sky faster than almost any *other*.", 'F2',
  'unroll', 'pan', 'wide-chart', ['boil'], 'swan-chart-crawl', ['SwanChart'], ['M-01', 'P-06'],
  'unroll', 'the two stars meeting', 'an old atlas of the Swan unrolls; one small double star in its wing crawls, leaving a dotted trail across the years',
  'He picked one star in the Swan that moves fast.', 'the crawling double star',
  [(0, 'the chart of the Swan unrolls (★M-01)'), (1.6, 'the wing of the Swan'), (3.0, 'a small double star ringed'), (4.6, 'label “61 Cygni”'), (6.0, 'it crawls, leaving dots year by year'), (7.4, 'the real photograph pins beside it (★P-06)')],
  'curious', 'A: a modern photo · B: a snail on a map · C: the atlas itself, the star crawling across it — PICK C',
  'wide', 'the lantern across the paper')
R('CLUE1', "A fast crawl hinted that it was close. But how close? Night after night for more than a year, he measured it against two faint stars *nearby*.", 'F2',
  'wipe', 'hold', 'left-third-close', ['tremble'], 'nights-in-the-tower', ['KoenigsbergDome', 'Heliometer'], [],
  'light-change', 'the crawling star', 'Bessel at the eyepiece; nights pass: the moonlight sweeps round the dome, his breath fogs, the log fills',
  'He measures night after night for a year.', 'Bessel’s face at the eyepiece',
  [(0, 'Bessel at the eyepiece, close'), (1.4, 'the moonlight sweeps across the dome (a night)'), (2.8, 'again (a night)'), (4.2, 'his breath fogs in the cold'), (5.6, 'the log book fills with figures'), (7.0, 'snow on the slit, then gone (seasons)')],
  'tension', 'A: a calendar · B: a candle burning down · C: the light of the nights sweeping round him — PICK C',
  'close', 'moonlight sweeping through the slit; the lantern')
R('CLUE1', "In 1838 he had it: a shift of about a third of a second of *arc*.", 'F2',
  'stamp', 'push', 'centre-large', ['sparks'], None, ['ParallaxField'], ['X-03'],
  'echo', 'Bessel’s eye at the eyepiece', 'the eyepiece field again: the near star slides its hair-width and stops; a gold figure stands beside it',
  'He found the shift: a third of a second of arc.', 'the gold figure 0.3″',
  [(0, 'his eye’s circle becomes the field'), (1.2, 'the star slides its hair-width'), (2.4, 'a vermilion tick'), (3.4, 'gold figure “0.314″”')],
  'triumph', 'A: Bessel smiling · B: a bell rung · C: the star moves and stops; a number — PICK C',
  'detail', 'the star itself', motif='the eyepiece — the shift caught')
R('CLUE1', "That is the width of a small coin… seen from thirteen kilometres *away*.", 'F4',
  'drop', 'pull', 'wide-landscape', ['dust'], 'coin-on-a-far-hill', ['CoinFarHill'], [],
  'shrink-into', 'the gold figure', 'the figure shrinks to a coin standing on a far hilltop; the road between runs thirteen kilometres to us',
  'The angle is like a coin seen from 13 km.', 'the tiny glint of the coin on the far hill',
  [(0, 'the figure shrinks to a gold coin'), (1.2, 'it stands on a hill'), (2.4, 'the camera pulls back down a long road'), (3.6, 'label “13 km”'), (4.6, 'the coin is a glint')],
  'wonder', 'A: a ruler · B: a hair from across a room · C: a coin on a far hill — PICK C (metaphor 1 of the ladder)',
  'wide', 'low afternoon sun from the right; the coin glints')
R('CLUE1', "From that tiny angle, the rest is a triangle. Its base is the Earth's orbit, and its far point is the *star*.", 'F1 F2',
  'ink-on', 'ride', 'diagonal', ['stars'], 'hill-tilts-to-triangle', ['OrbitTriangle'], [],
  'outline-morph', 'the road and the hill', 'the road and hill tilt up into a long thin triangle: its base the Earth’s orbit, its point a star far off',
  'Angle plus baseline gives the distance, like a triangle.', 'the far point of the triangle',
  [(0, 'the road’s edges tilt up into two lines'), (1.6, 'the base becomes the orbit'), (3.0, 'the lines meet at a point'), (4.4, 'the point stretches away'), (6.0, 'the camera rides out along it')],
  'curious', 'A: trigonometry on a blackboard · B: a surveyor · C: the road becomes the triangle — PICK C',
  'wide', 'the Sun gold at the base')
R('CLUE1', "The answer: roughly ten light-years. About a hundred million million *kilometres*.", 'F2',
  'grow', 'ride', 'tiny-in-vast', ['stars'], 'the-point-runs-away', ['OrbitTriangle'], [],
  'count-up', 'the triangle’s far point', 'the triangle’s point runs off faster than the camera can follow; a counter of kilometres spins to 100,000,000,000,000',
  '61 Cygni is about ten light-years away.', 'the counter',
  [(0, 'the point runs on'), (1.4, 'the counter spins'), (2.8, '“10 light-years” in gold'), (4.0, 'the orbit is a speck behind')],
  'awe', 'A: a number on a card · B: a train journey · C: the triangle stretches while the counter runs — PICK C',
  'detail', 'the star at the tip; deep indigo')
R('CLUE1', "Its light had been travelling for about ten years to reach his *telescope*.", 'F2',
  'slide', 'pan', 'wide-landscape', ['photons'], 'thread-of-light', ['LightBobbin'], [],
  'trace-to', 'the star at the tip', 'from the star a thread of light unspools off a bobbin, ten winding marks for ten years, all the way to a telescope',
  'The light took ten years to arrive.', 'the thread unspooling',
  [(0, 'a bobbin appears at the star'), (1.4, 'a gold thread unspools toward us'), (2.8, 'year marks tick past: 1828… 1838'), (4.2, 'the thread reaches the heliometer')],
  'wonder', 'A: a beam · B: a letter in the post · C: a thread on a bobbin, ten years long — PICK C (★ metaphor 2 of the ladder)',
  'wide', 'the thread’s own gold light')
R('CLUE1', "Bessel's number went into print, and for the first time, a star had a *distance*.", 'F2',
  'tear-in', 'push', 'centre-large', ['dust'], 'thread-becomes-print', ['BesselPage'], ['D-02'],
  'real-reveal', 'the taut thread', 'the thread pulls taut and becomes a line of type; Bessel’s 1838 page develops around it, the number circled in red',
  'Bessel published the first distance to a star.', 'the circled number on the page',
  [(0, 'the thread pulls taut'), (1.2, 'it is a printed line'), (2.4, 'the real page develops (★D-02)'), (3.6, 'a vermilion ring round “0.3136”'), (4.8, 'sheen across the page')],
  'triumph', 'A: a newspaper · B: a medal · C: the thread becomes the line of type — PICK C (★ light becomes print)',
  'insert', 'a lamp raking across the page')
R('CLUE1', "Almost at the same time, two more were measured: Alpha Centauri, from the Cape of Good Hope, and Vega, from *Russia*.", 'F3',
  'flip', 'pan', 'split-two', ['boil'], 'two-more-pins', ['GlobePins'], ['G-01'],
  'hand-over', 'the circled page', 'the page turns to a hand-drawn globe: two more pins go in — the Cape, and Dorpat in the Russian Empire — each with a star above',
  'Two more stars were measured soon after.', 'the two new pins',
  [(0, 'a hand turns the page'), (1.4, 'a globe inks on'), (2.8, 'a pin at the Cape, “Alpha Centauri” above'), (4.4, 'a pin at Dorpat, “Vega” above'), (6.0, 'the globe turns a little')],
  'curious', 'A: two portraits · B: a race · C: pins on a globe — PICK C',
  'medium', 'daylight on the globe, from the right')
R('CLUE1', "But there was a catch. Most stars are so far away that their wobble is far too small to *measure*.", 'F5',
  'ink-bleed', 'pull', 'centre-medium', ['ripple'], 'paper-boat-into-dark', ['PaperBoat'], [],
  'fold', 'the globe and its pins', 'the page folds itself into a paper boat that sails off into a black sea of a thousand thousand stars and sinks',
  'Most stars are too far for this method.', 'the paper boat sinking',
  [(0, 'the page folds once, twice'), (1.4, 'it is a paper boat'), (2.8, 'it sails out onto a dark sea of stars'), (4.2, 'it tips'), (5.4, 'it sinks among the stars')],
  'sad', 'A: an X over a triangle · B: a ruler that is too short · C: the page folds into a boat that sinks into the stars — PICK C (★ the method runs aground)',
  'wide', 'starlight on black water')
# ======================================================================== CLUE 2 — the breathing stars
R('CLUE2', "Clue two: stars that *blink*.", '-',
  'focus', 'hold', 'centre-medium', ['stars'], None, ['MilkyWayBand'], [],
  'swarm', 'the stars the boat sank into', 'the stars swirl up into the band of the Milky Way; the clue tag',
  'Clue two.', 'the clue tag',
  [(0, 'the stars swirl up into a band'), (1.2, 'the clue tag (2 of 4)')],
  'curious', 'A: a title · B: a heartbeat · C: the sea of stars becomes the Milky Way — PICK C',
  'wide', 'the glow of the Milky Way')
R('CLUE2', "Around 1900, Harvard College Observatory was photographing the sky on thousands of glass *plates*.", 'F5',
  'slide', 'push', 'centre-large', ['dust'], 'sky-caught-on-glass', ['GlassPlateSky'], ['P-03'],
  'lift-off', 'the Milky Way', 'a glass plate slides in front of the Milky Way and catches it, inverted: black dots on clear glass; it is lifted out and stacked',
  'The sky was photographed on glass plates.', 'the plate catching the sky',
  [(0, 'a glass plate slides in front of the band'), (1.4, 'the stars print on it as black dots'), (2.8, 'it lifts away in a wooden frame'), (4.0, 'onto a stack of plates')],
  'curious', 'A: a camera · B: a net · C: the plate catches the sky itself — PICK C',
  'medium', 'a north window, cool daylight')
R('CLUE2', "To study them, the observatory hired women, to measure and catalogue every star, one plate at a *time*.", 'F5',
  'assemble', 'pull', 'wide-room', ['dust'], 'harvard-plate-room', ['HarvardPlateRoom'], ['R-01', 'P-02'],
  'grow-out-of', 'the stack of plates', 'we pull back: a room of women at desks by tall windows, each with a plate on a frame and a loupe',
  'A room of women measuring the plates.', 'the room full of desks',
  [(0, 'the stack is on a desk'), (1.4, 'the room grows round it'), (2.8, 'women at desks lean to their plates'), (4.2, 'one writes in a ledger'), (5.6, 'one lifts a plate to the window'), (7.0, 'plate “Harvard, c. 1900”')],
  'warm', 'A: their group photograph alone · B: a beehive · C: pull back from the plate into the room — PICK C (the real photograph pinned later)',
  'wide', 'tall north windows, left; desk lamps')
R('CLUE2', "One of them was Henrietta Swan Leavitt. Her task: find the stars that change in *brightness*.", 'F5',
  'focus', 'push', 'left-third-close', ['breathe'], None, ['HarvardPlateRoom'], ['P-02'],
  'rack-focus', 'the room', 'one desk comes forward: Henrietta Leavitt at her plate, loupe in hand; her portrait card is pinned on the wall above',
  'This is Henrietta Leavitt.', 'Leavitt’s face',
  [(0, 'focus moves to one desk'), (1.4, 'Leavitt lifts her loupe'), (2.8, 'her portrait card is pinned above (★P-02)'), (4.2, 'name “Henrietta Swan Leavitt”'), (5.6, 'she bends to the plate')],
  'warm', 'A: the portrait full screen · B: a name on a door · C: rack focus to her desk — PICK C (we see her work)',
  'close', 'the window light on her face')
R('CLUE2', "Her plates came from a Harvard station in Arequipa, Peru, that photographed the southern sky, and two misty patches called the Magellanic *Clouds*.", 'F5',
  'ink-on', 'whip', 'left-third-medium', ['dust'], 'plate-from-peru', ['GlassPlateSky'], ['P-11', 'P-08'],
  'whip', 'Leavitt’s plate', 'a fast pan along the plate’s journey: the station under the volcano at Arequipa, then the two clouds in the southern sky',
  'The plates came from Peru and showed the Magellanic Clouds.', 'the two misty clouds',
  [(0, 'whip-pan south along the plate’s label'), (1.4, 'the station at Arequipa pinned (★P-11)'), (2.8, 'pin “Arequipa, Peru”'), (4.2, 'the southern sky'), (5.6, 'two misty patches glow'), (7.0, 'the real cloud photograph in a frame (★P-08)')],
  'curious', 'A: a map of Peru · B: a postcard · C: whip along the plate’s journey — PICK C',
  'medium', 'clear southern night; the volcano at dusk')
R('CLUE2', "Comparing plate after plate through her loupe, she found stars that swelled and faded, again and again… like slow *breathing*.", 'F6',
  'iris', 'push', 'centre-large', ['breathe'], 'loupe-of-breathing-stars', ['BreathingField'], ['P-03'],
  'through', 'the misty cloud', 'Leavitt’s loupe fills the frame: inside, black dots on the plate swell and shrink in rhythm',
  'Some stars on the plates grow and shrink in a rhythm.', 'one dot breathing',
  [(0, 'the loupe’s circle fills the frame'), (1.4, 'the plate in the lens, her pencil marks (★P-03)'), (2.8, 'one dot swells'), (4.0, 'and shrinks'), (5.2, 'another, slower'), (6.6, 'a third, slower still')],
  'wonder', 'A: a light curve · B: a lighthouse · C: the dots breathe in the lens — PICK C (★ stars that breathe)',
  'detail', 'window light through the glass plate', sp=None, motif='the loupe — Leavitt’s circle')
R('CLUE2', "And she noticed something nobody expected: the brighter the star, the slower its *breath*.", 'F6',
  'grow', 'hold', 'split-two', ['breathe'], None, ['BreathingField'], [],
  'split', 'the breathing dots', 'the breathing dots sort themselves in a row from small and quick to big and slow',
  'Brighter breathing stars are slower.', 'the biggest, slowest dot',
  [(0, 'the dots line up'), (1.4, 'small ones breathe fast'), (2.8, 'big ones breathe slow'), (4.0, 'a vermilion arrow from quick to slow')],
  'wonder', 'A: a table · B: big and small drums · C: the dots sort themselves — PICK C',
  'medium', 'window light')
R('CLUE2', "All of them sat in the same cloud, at roughly the same distance. So the difference in brightness was *real*.", 'F6',
  'blinds', 'pull', 'centre-medium', ['dust'], 'same-cloud-same-distance', ['BreathingField'], [],
  'stream-through', 'the row of dots', 'the row flows back into the misty cloud; dotted lines from each to Earth are all the same length',
  'They are all equally far away, so brightness differences are real.', 'the equal lines',
  [(0, 'the dots stream back into the cloud'), (1.6, 'dotted lines run to the Earth'), (3.0, 'a bracket shows they are equal'), (4.4, 'note “same distance”')],
  'curious', 'A: an equation · B: a choir on one stage · C: lines of equal length — PICK C',
  'medium', 'the cloud’s soft glow')
R('CLUE2', "In 1912 she published twenty-five of them. The longer the period, the brighter the star: a straight *line*.", 'F6',
  'quill', 'drift', 'right-third-large', ['boil'], 'breaths-to-a-graph', ['LeavittGraph'], ['D-01', 'X-01'],
  'pour', 'the equal lines', 'each breath leaves a mark on a strip; the marks pour into a graph of the 25 stars, and a ruled line runs through them',
  'Her graph of 25 stars makes a straight line.', 'the straight line',
  [(0, 'the breaths fall as points onto a grid'), (1.4, 'twenty-five points (X-01)'), (2.8, 'a ruler lays a line through them'), (4.2, 'the line inks'), (5.6, 'the real circular beside it (★D-01)'), (7.0, '“1912”')],
  'triumph', 'A: the published page alone · B: beads on a string · C: the breaths pour into a graph — PICK C',
  'insert', 'the desk lamp across the page')
R('CLUE2', "The circular was signed by the observatory's director, noting it had been prepared by Miss *Leavitt*.", 'F6',
  'tear-in', 'push', 'centre-large', ['dust'], None, ['LeavittGraph'], ['D-01'],
  'real-reveal', 'the graph', 'the real 1912 circular; a vermilion line under “prepared by Miss Leavitt”',
  'Her name was only a note on the paper.', 'the words “Miss Leavitt”',
  [(0, 'the graph becomes the printed page (★D-01)'), (1.6, 'the signature at the top'), (3.0, 'a vermilion underline under her name'), (4.4, 'the camera holds on it')],
  'sad', 'A: her portrait · B: a name on a plaque · C: the real page, underlined — PICK C',
  'detail', 'a lamp low across the page')
R('CLUE2', "Here was the trick. Time a star's beat, and you know how bright it truly is. See how faint it looks, and you know how far *away*.", 'F6',
  'ink-on', 'ride', 'diagonal', ['breathe'], 'ruler-of-light', ['LeavittGraph', 'CandleRoad'], [],
  'solid-morph', 'the straight line', 'the graph’s line lifts off the page and becomes a ruler of light, marked in beats',
  'Beat gives true brightness; faintness then gives distance.', 'the ruler of light',
  [(0, 'the line lifts off'), (1.4, 'it becomes a ruler of light'), (2.8, 'a breathing star beats at one end'), (4.2, 'its true brightness fills a gauge'), (5.6, 'it slides along the ruler, dimming'), (7.0, 'a mark: “how far”')],
  'curious', 'A: an equation · B: a bell heard from far · C: the line becomes a ruler — PICK C (★ a ruler made of light)',
  'medium', 'the ruler’s own glow')
R('CLUE2', "Astronomers call such stars standard candles: like a candle of known brightness, carried further and further down a dark *road*.", 'F6',
  'rise', 'pull', 'wide-landscape', ['flicker'], 'candle-down-the-road', ['CandleRoad'], [],
  'hand-over', 'the ruler of light', 'the ruler becomes a candle; carried down a long dark road, it dims exactly as the rule says',
  'A known candle tells distance by how faint it looks.', 'the candle shrinking down the road',
  [(0, 'the ruler becomes a candle'), (1.4, 'a hand carries it off down a dark road'), (2.8, 'it dims'), (4.2, 'milestones ink on: 1, 2, 4'), (5.6, 'it is a faint point')],
  'wonder', 'A: two candles · B: a lighthouse again · C: the ruler becomes a candle carried away — PICK C (★)',
  'wide', 'the candle flame on a dark road')
R('CLUE2', "Leavitt had found a measuring tape for the universe. She died in 1921, two years before it would change everything we knew about its *size*.", 'F5',
  'ink-bleed', 'push', 'centre-medium', ['dust'], None, ['HarvardPlateRoom'], ['P-02'],
  'light-change', 'the candle far down the road', 'the candle is a lamp on Leavitt’s empty desk; the window darkens; her loupe lies on the plate',
  'Leavitt died before her discovery was fully used.', 'the loupe on the empty desk',
  [(0, 'the candle is her desk lamp'), (1.6, 'the desk is empty'), (3.0, 'the window light dims to evening'), (4.4, 'her loupe on the plate'), (5.8, 'note “1868–1921”'), (7.2, 'the lamp gutters')],
  'sad', 'A: a gravestone · B: a ship leaving · C: her desk empty, the loupe still on the plate — PICK C',
  'close', 'a dimming window and one lamp')
# ======================================================================== CLUE 3 — one word on a glass plate (set piece 2: VAR!)
R('CLUE3', "Clue three: one word on a glass *plate*.", '-',
  'stamp', 'hold', 'centre-medium', ['dust'], None, ['SpiralNebula'], [],
  'echo', 'the loupe on the plate', 'the loupe’s circle becomes a faint spiral smudge in the sky; the clue tag',
  'Clue three.', 'the clue tag',
  [(0, 'the loupe’s circle becomes a spiral smudge'), (1.2, 'the clue tag (3 of 4)')],
  'tension', 'A: a title · B: a fingerprint · C: the lens becomes the spiral — PICK C',
  'medium', 'faint starlight')
R('CLUE3', "Across the sky, astronomers had found faint spiral smudges. Were they clouds inside our own galaxy… or whole galaxies of their *own*?", 'F7',
  'ink-on', 'orbit', 'centre-large', ['stars'], 'spiral-to-question', ['SpiralNebula'], [],
  'heat', 'the spiral smudge', 'the engraved spiral turns slowly; its arms unwind and curl into a question mark',
  'Nobody knew whether the spirals were near or far.', 'the question mark',
  [(0, 'the spiral turns'), (1.4, 'more smudges ink on around it'), (2.8, 'one arm unwinds'), (4.2, 'it curls into a question mark'), (5.6, 'the question mark hangs'), (7.0, 'it splits in two')],
  'tension', 'A: two diagrams · B: a coin toss · C: the spiral itself curls into a question — PICK C',
  'close', 'starlight')
R('CLUE3', "In April 1920, at the Smithsonian in Washington, two astronomers argued it out in public. Neither could prove his *case*.", 'F7',
  'rise', 'pan', 'two-figures', ['dust'], 'debate-lecterns', ['DebateHall'], ['P-09'],
  'split', 'the question mark', 'the question splits into two lecterns facing each other in a lecture hall; Shapley and Curtis, each with a lantern slide',
  'Two astronomers debated and nobody won.', 'the two speakers facing each other',
  [(0, 'the question splits in two'), (1.4, 'the hall inks on: tiers, a chandelier'), (2.8, 'Shapley at one lectern'), (4.2, 'Curtis at the other'), (5.6, 'plate “Washington, 26 April 1920”'), (7.0, 'each points at a lantern slide'), (8.4, 'the scales between them stay level')],
  'tension', 'A: two portraits · B: a tug of war · C: the question splits into two lecterns — PICK C',
  'wide', 'the hall chandelier and lantern-slide beams')
R('CLUE3', "What they needed was a distance. And for that, you had to find one of Leavitt's breathing stars inside a *spiral*.", 'F7 F6',
  'focus', 'push', 'centre-large', ['breathe'], None, ['SpiralNebula', 'BreathingField'], [],
  'shape-window', 'the lantern slide of a spiral', 'the slide grows into the spiral; a round window in its arm shows a breathing star — if one could be found',
  'They needed a breathing star inside a spiral.', 'the round window in the arm',
  [(0, 'the lantern slide fills the frame'), (1.4, 'a round window opens in the spiral’s arm'), (2.8, 'a breathing star inside'), (4.2, 'it fades: not yet found'), (5.6, 'a question mark')],
  'tension', 'A: a target · B: a needle in a haystack · C: a window in the arm — PICK C',
  'close', 'the projector beam')
R('CLUE3', "On Mount Wilson in California stood the largest telescope in the world, its mirror one hundred inches *across*.", 'F8',
  'rise', 'crane', 'left-third-medium', ['stars'], 'chandelier-to-dome', ['HookerDome'], ['P-04', 'R-03', 'V-02'],
  'crane', 'the hall’s chandelier', 'the chandelier becomes the dome of Mount Wilson; it rotates and its shutter opens on the night; the 100-inch inside',
  'The biggest telescope in the world on Mount Wilson.', 'the dome opening',
  [(0, 'the chandelier rises into a dome'), (1.6, 'the dome on its mountain'), (3.0, 'its shutter opens'), (4.4, 'the great telescope inside tilts up'), (5.8, 'real footage in an old screen (★V-02)'), (7.2, 'label “100 inches”')],
  'awe', 'A: a photo of the dome · B: a cathedral · C: the chandelier becomes the dome — PICK C',
  'wide', 'a red darkroom lamp inside, stars through the slit', motif='the dome — the great circle opens')
R('CLUE3', "Edwin Hubble turned it toward the great spiral in Andromeda, and photographed it on glass, night after *night*.", 'F8',
  'slide', 'push', 'right-third-large', ['breathe'], 'hubble-in-the-cage', ['HookerDome'], ['P-04'],
  'dive', 'the telescope', 'down the tube to the observer’s platform: Hubble in coat and tie, pipe, eye at the guiding eyepiece, a plate holder loaded',
  'Hubble photographed Andromeda night after night.', 'Hubble at the eyepiece',
  [(0, 'down the tube to the platform'), (1.4, 'Hubble at the guider (★P-04-x1)'), (2.8, 'he slides a plate holder in'), (4.2, 'his hand on the slow-motion knob'), (5.6, 'stars drift and are held')],
  'curious', 'A: his portrait · B: a fisherman casting · C: the dive to the man at the eyepiece — PICK C',
  'close', 'red darkroom lamp, starlight down the tube')
R('CLUE3', "In October 1923, one plate showed a new point of light. He marked it with an N: a nova, a star that flares up once… and never *again*.", 'F8',
  'flip', 'push', 'centre-large', ['dust'], None, ['LightTable'], ['P-01'],
  'hand-over', 'Hubble’s hand at the knob', 'Hubble lays a plate on a light table; a new point of light; his pen writes a small “N” beside it',
  'He sees a new star and marks it N for nova.', 'the new point and the N',
  [(0, 'he lays the plate on the light table'), (1.4, 'the table glows through it'), (2.8, 'a new point among the stars'), (4.2, 'his pen writes “N”'), (5.6, 'note “October 1923”'), (7.0, 'he sets the pen down')],
  'tension', 'A: the plate shown · B: a flare going up · C: his hand marks it — PICK C',
  'insert', 'the light table glowing up through the glass', sp=2)
R('CLUE3', "Then he checked the older plates of the same spot. It was not flaring once. It was brightening and fading, again and *again*.", 'F8',
  'wipe', 'hold', 'right-third-close', ['breathe'], 'older-plates-fanned', ['LightTable'], [],
  'lift-off', 'the marked plate', 'older plates are fanned out on the table, one after another; on each, the same point is bigger, smaller, bigger',
  'On older plates, the same star grows and shrinks again and again.', 'the point changing from plate to plate',
  [(0, 'the plate lifts; an older one beneath'), (1.4, 'the point is small'), (2.8, 'another plate: big'), (4.2, 'another: small'), (5.6, 'another: big'), (7.0, 'Hubble’s face, close: he sees it')],
  'tension', 'A: a graph · B: a lighthouse · C: plates fanned like cards, the point breathing — PICK C',
  'close', 'the light table', sp=2)
R('CLUE3', "He crossed out the N, and wrote three letters and an exclamation mark: *VAR*!", 'F8',
  'quill', 'hold', 'centre-large', ['dust'], 'var-stroke', ['LightTable'], ['P-01'],
  'real-reveal', 'Hubble’s face', 'insert on the plate: the pen strikes through the N and writes VAR! in vermilion; then the real plate H335H develops in place',
  'He crosses out N and writes VAR!', 'the word VAR!',
  [(0, 'the music drops out; the pen comes down'), (1.0, 'a stroke through the N'), (2.0, 'V'), (2.6, 'A'), (3.2, 'R'), (3.8, 'the exclamation mark, glowing red'), (4.8, 'the real plate develops (★P-01)')],
  'tension', 'A: the plate alone · B: a stamp · C: the pen, letter by letter, then the real plate — PICK C (the held breath)',
  'detail', 'the light table, the red ink catching it', sp=2, note='held breath: music out, only the pen scratch')
R('CLUE3', "Variable. A breathing star. One of Leavitt's *candles*.", 'F8 F6',
  'bloom', 'rack', 'centre-large', ['breathe'], 'var-becomes-cepheid', ['AndromedaEngraving', 'BreathingField'], ['P-07'],
  'grow-out-of', 'the exclamation mark', 'the exclamation point’s dot becomes a breathing star in the arm of the Andromeda spiral, beating like Leavitt’s',
  'The star is one of Leavitt’s breathing stars.', 'the breathing star in Andromeda',
  [(0, 'the dot of the “!” swells'), (1.2, 'it breathes'), (2.4, 'Andromeda grows round it (★P-07)'), (3.6, 'Leavitt’s loupe circle rings it')],
  'triumph', 'A: the star in a photo · B: a heartbeat on a monitor · C: the “!” itself breathes — PICK C (★)',
  'detail', 'the star’s own glow', sp=2, motif='the loupe — Leavitt’s circle round Hubble’s star')
R('CLUE3', "Its beat told him how bright it truly was. And its faintness told him how far: far, far outside our own *galaxy*.", 'F8',
  'grow', 'pull', 'tiny-in-vast', ['stars'], 'ruler-laid-on-andromeda', ['AndromedaEngraving', 'CandleRoad'], [],
  'trace-to', 'the breathing star', 'Leavitt’s ruler of light is laid from the Milky Way to Andromeda; it runs out, and runs on, far past the edge of our galaxy',
  'Andromeda is far beyond our galaxy.', 'the ruler running past the edge',
  [(0, 'the ruler of light lays down from us'), (1.4, 'it reaches the edge of the Milky Way'), (2.8, 'it keeps going'), (4.2, 'and going'), (5.6, 'it touches Andromeda'), (7.0, 'a mark: far outside')],
  'awe', 'A: a number · B: a road map · C: Leavitt’s ruler laid across — PICK C',
  'wide', 'the galaxies’ gold light', sp=2)
R('CLUE3', "Andromeda was not a cloud among our stars. It was a galaxy of its own. And it was not *alone*.", 'F8',
  'iris', 'pull', 'tiny-in-vast', ['stars'], 'milky-way-one-raindrop', ['GalaxyStorm'], ['D-06'],
  'bloom-out', 'Andromeda at the end of the ruler', 'the camera pulls back and back: the Milky Way, which filled the sky, shrinks to one swirl among thousands, like a raindrop in a storm',
  'Our galaxy is one among many.', 'the Milky Way, one swirl among thousands',
  [(0, 'the camera pulls back from Andromeda'), (1.6, 'the Milky Way shrinks'), (3.0, 'more swirls appear around it'), (4.4, 'thousands, like rain'), (5.8, 'a vermilion ring round ours')],
  'awe', 'A: a map of galaxies · B: a grain of sand on a beach · C: our galaxy shrinks into a storm of galaxies — PICK C (★ metaphor 3; the held breath)',
  'wide', 'the galaxies’ gold light on deep blue', sp=3, note='held breath: one low note swells')
# ======================================================================== CLUE 4 — the runaway galaxies
R('CLUE4', "Clue four: galaxies that *run*.", '-',
  'focus', 'hold', 'centre-medium', ['stars'], None, ['GalaxyStorm'], [],
  'ripple-through', 'the storm of galaxies', 'a slow shiver runs through the galaxies; the clue tag',
  'Clue four.', 'the clue tag',
  [(0, 'a shiver runs through the galaxies'), (1.2, 'the clue tag (4 of 4)')],
  'wonder', 'A: a title · B: a starting gun · C: the galaxies stir — PICK C',
  'medium', 'galaxy light')
R('CLUE4', "Spread a galaxy's light into a rainbow, and dark lines appear in it. In most galaxies, those lines had shifted toward the *red*.", 'F9',
  'unroll', 'push', 'centre-large', ['photons'], 'galaxy-rainbow', ['SpectrumStrip', 'GalaxyStorm'], ['D-04'],
  'brush', 'one galaxy', 'a beam from one galaxy through a prism paints a rainbow strip; its dark lines slide toward the red end',
  'Galaxy light, spread out, shows lines shifted to red.', 'the dark lines sliding',
  [(0, 'a beam leaves one galaxy'), (1.4, 'it passes a prism'), (2.8, 'a rainbow strip is painted'), (4.2, 'dark lines appear'), (5.6, 'they slide toward red'), (7.0, 'a vermilion arrow')],
  'curious', 'A: a spectrum photo · B: a piano keyboard · C: the galaxy’s light painted as a strip — PICK C',
  'insert', 'the beam through the prism', sp=3)
R('CLUE4', "A red shift means the source is moving away, like the whistle of a train that drops as it *leaves*.", 'F9',
  'slide', 'pan', 'wide-landscape', ['ripple'], 'whistle-drops', ['TrainWhistle'], [],
  'stream-through', 'the shifted lines', 'the lines become the sound waves of a train’s whistle: bunched ahead, stretched behind as it pulls away',
  'Moving away stretches the waves, like a train whistle.', 'the stretched waves behind the train',
  [(0, 'the lines become rings of sound'), (1.4, 'a steam train crosses the plain'), (2.8, 'rings bunch ahead'), (4.0, 'and stretch behind'), (5.2, 'it pulls away')],
  'playful', 'A: a siren diagram · B: a bell · C: the spectrum lines become the train’s waves — PICK C',
  'wide', 'low evening sun')
R('CLUE4', "So why was nearly every galaxy running from us, and from each other? Picture raisins in a rising *loaf*.", 'F9',
  'rise', 'push', 'centre-large', ['breathe'], 'raisin-galaxies', ['RisingLoaf'], [],
  'solid-morph', 'the train’s stretched waves', 'the galaxies become raisins in a loaf of dough that rises: every raisin moves away from every other',
  'Everything moving apart, like raisins in rising dough.', 'the raisins spreading apart',
  [(0, 'the waves curl into a loaf of dough'), (1.4, 'galaxies are raisins in it'), (2.8, 'it rises'), (4.2, 'dotted lines between raisins stretch'), (5.4, 'every gap grows')],
  'wonder', 'A: a balloon · B: dots on paper · C: the loaf rises — PICK C (★ a kitchen for the cosmos)',
  'close', 'warm oven light', sp=3)
R('CLUE4', "In 1927, a Belgian priest and physicist, Georges Lemaître, had worked out what this meant: the universe is *expanding*.", 'F9',
  'ink-bleed', 'pull', 'left-third-medium', ['dust'], 'oven-to-study', ['LemaitreDesk'], ['D-05'],
  'shape-window', 'the rising loaf', 'the oven door’s window becomes the window of a study: Lemaître at his desk in his collar, writing; his 1927 page',
  'Lemaître realised the universe is expanding.', 'Lemaître writing',
  [(0, 'the oven door opens on a study'), (1.4, 'Lemaître at his desk'), (2.8, 'he writes'), (4.2, 'his page (★D-05)'), (5.6, 'plate “Georges Lemaître, 1927”'), (7.0, 'he looks up')],
  'curious', 'A: his portrait · B: a church · C: the oven door opens on his study — PICK C (★)',
  'medium', 'a desk lamp, a window behind')
R('CLUE4', "In 1929, Hubble set his distances beside the speeds. The farther the galaxy, the faster it was moving *away*.", 'F9',
  'ink-on', 'push', 'right-third-large', ['boil'], 'hubble-line-1929', ['HubbleDiagram'], ['D-04', 'X-02'],
  'travel-line', 'Lemaître’s line of equation', 'a line of Lemaître’s page runs off and becomes the straight line of Hubble’s 1929 graph, its points inking on',
  'Farther galaxies move away faster.', 'the rising straight line',
  [(0, 'a line leaves the page'), (1.4, 'it lands on a grid'), (2.8, 'points ink on, one by one (X-02)'), (4.2, 'the line rises through them'), (5.6, 'the real graph pinned (★D-04)'), (7.0, '“1929”')],
  'triumph', 'A: the paper · B: a staircase · C: his line becomes Hubble’s — PICK C',
  'insert', 'the lamp on the page')
# ======================================================================== THE TWIST
R('TWIST', "Think about what had *happened*.", '-',
  'focus', 'hold', 'centre-medium', ['breathe'], None, ['HubbleDiagram'], [],
  'spot', 'the graph', 'the light narrows on the graph’s line',
  'Pause.', 'the line',
  [(0, 'the light narrows'), (1.0, 'the line glows')],
  'awe', 'A: a question card · B: silence · C: the light narrows — PICK C',
  'detail', 'one narrowing lamp')
R('TWIST', "People set out to measure how far away the stars are… and found that the universe is growing, and has a *history*.", 'F9',
  'wipe', 'pull', 'wide-sky', ['stars'], None, ['GalaxyStorm'], [],
  'crane', 'the graph’s line', 'the line lifts into the sky and becomes a streak through the galaxies, all drifting apart',
  'Measuring distance revealed an expanding universe.', 'the drifting galaxies',
  [(0, 'the line lifts off'), (1.4, 'it becomes a streak through the galaxies'), (2.8, 'they drift apart'), (4.2, 'they keep drifting')],
  'awe', 'A: a timeline · B: a growing tree · C: the line becomes the streak — PICK C',
  'wide', 'galaxy light')
R('TWIST', "Run the film backwards, and everything was once closer together, all the way back to a *beginning*.", 'F9',
  'ink-bleed', 'push', 'centre-large', ['sparks'], 'run-backwards-to-a-point', ['GalaxyStorm'], [],
  'bloom-out', 'the drifting galaxies', 'time runs backward: the galaxies rush together to one point of light',
  'Backwards, everything meets at one point.', 'the single point',
  [(0, 'the galaxies reverse'), (1.6, 'they rush together'), (3.2, 'they meet'), (4.4, 'one point of light')],
  'awe', 'A: a big bang painting · B: a film rewinding · C: run it backwards — PICK C',
  'detail', 'the point’s own light')
R('TWIST', "And Bessel's trick never went away. A space telescope called Gaia has now measured the wobble of nearly one and a half billion *stars*.", 'F10',
  'iris', 'pull', 'right-third-medium', ['stars'], 'point-opens-as-gaia', ['GaiaProbe'], [],
  'echo', 'the single point', 'the point opens like an eye: the round sunshield of Gaia, spinning slowly in space',
  'Gaia measures the wobble of 1.5 billion stars.', 'Gaia spinning',
  [(0, 'the point opens'), (1.4, 'Gaia’s round sunshield'), (2.8, 'it spins'), (4.2, 'its two telescopes sweep the sky'), (5.6, 'counter to 1,470,000,000'), (7.0, 'label “Gaia”')],
  'wonder', 'A: a photo of Gaia (CC BY-SA, not allowed) · B: a lighthouse · C: the point opens as Gaia’s shield — PICK C (drawn from _ref)',
  'medium', 'the Sun from the left on the shield', motif='Gaia’s mirror — the circle in space')
R('TWIST', "Each one, a tiny tick of parallax: the same jump as your *thumb*.", 'F10',
  'grow', 'ride', 'tiny-in-vast', ['stars'], 'billion-ticks', ['TickSky'], [],
  'swarm', 'Gaia', 'from Gaia a billion tiny ink ticks fill the sky at once; the camera flies through them into the Milky Way in depth',
  'Each star’s wobble is measured, like your thumb.', 'the ticks filling the sky',
  [(0, 'the ticks spray out'), (1.4, 'they fill the sky'), (2.8, 'the camera flies through')],
  'wonder', 'A: a 3-D map · B: rain · C: the ticks swarm into a map you fly through — PICK C (★)',
  'wide', 'thousands of tiny ticks of light')
# ======================================================================== THE ANSWER
R('ANSWER', "So, how far away are the *stars*?", '-',
  'focus', 'ride', 'centre-medium', ['stars'], None, ['TickSky', 'NightWindow'], [],
  'through', 'the map of ticks', 'we fly out through the map, down through the atmosphere, back to the night window',
  'Back to the question.', 'the window',
  [(0, 'we fly out of the map'), (1.4, 'through the air'), (2.4, 'the window of the opening')],
  'triumph', 'A: a title · B: a door · C: fly back to the window — PICK C (bookend)',
  'wide', 'moonlight; the lamp inside')
R('ANSWER', "The nearest, a few light-years away: close enough for their wobble to give them *away*.", 'F2 F3',
  'ink-on', 'push', 'right-third-medium', ['stars'], None, ['NightWindow', 'ParallaxField'], [],
  'shape-window', 'the window', 'in the window glass a round field: the near star’s little shift, and “≈ 10 light-years”',
  'The nearest stars: a few light-years, by parallax.', 'the near star’s shift',
  [(0, 'a round field in the glass'), (1.4, 'the near star shifts'), (2.8, 'gold “a few light-years”'), (4.2, 'the tick')],
  'triumph', 'A: a chart · B: a ruler · C: the window holds the eyepiece field — PICK C',
  'close', 'moonlight on the glass')
R('ANSWER', "Farther ones, by the beat of their breathing stars. And the galaxies, farther than anyone had dared to imagine… and still drifting *apart*.", 'F6 F8 F9',
  'bloom', 'pull', 'wide-sky', ['breathe'], None, ['NightWindow', 'BreathingField', 'GalaxyStorm'], [],
  'merge', 'the near star in the glass', 'the three rungs in the window glass: a wobble, a breathing star, a drift of galaxies — one ladder',
  'Three rungs: wobble, breathing stars, drifting galaxies.', 'the ladder of three',
  [(0, 'a breathing star joins above the first'), (1.6, 'a drift of galaxies above that'), (3.2, 'gold lines join them like rungs'), (4.8, 'the galaxies drift'), (6.4, 'the ladder glows')],
  'triumph', 'A: three numbers · B: a staircase · C: the clues become rungs in the glass — PICK C',
  'medium', 'the window glass')
# ======================================================================== WHAT IT MEANS
R('MEANING', "None of them ever left the *Earth*.", '-',
  'ink-bleed', 'pull', 'two-figures', ['dust'], 'three-who-never-left', ['KoenigsbergDome', 'HarvardPlateRoom', 'HookerDome'], [],
  'sweep', 'the ladder in the glass', 'three small lit windows in the night: the tower in Königsberg, the plate room at Harvard, the dome on Mount Wilson',
  'They never went to the stars.', 'the three lit windows',
  [(0, 'the ladder sweeps away'), (1.4, 'three lit windows in the dark')],
  'calm', 'A: a rocket · B: a globe · C: three lit windows on the Earth at night — PICK C',
  'wide', 'three warm windows in the night')
R('MEANING', "They measured the universe from a dome, a desk and a pile of glass *plates*.", '-',
  'drop', 'push', 'centre-large', ['dust'], None, ['GlassPlateSky', 'Heliometer'], [],
  'merge', 'the three windows', 'the heliometer, a loupe and a stack of plates settle together on one table',
  'All with simple instruments.', 'the three instruments together',
  [(0, 'from each window an instrument comes'), (1.4, 'they settle on one table'), (2.8, 'a sheen across the plates')],
  'warm', 'A: a list · B: a toolbox · C: the instruments on one table — PICK C',
  'insert', 'the lamp across the brass and glass')
R('MEANING', "And every distance out there still rests on that first small step: a wobble, seen from *here*.", 'F10',
  'focus', 'push', 'right-third-large', ['stars'], None, ['NightWindow', 'ThumbHand'], [],
  'rack-focus', 'the instruments', 'focus goes past the table to the window; the thumb rises again against the night',
  'It all rests on that first wobble.', 'the thumb rising',
  [(0, 'focus racks to the window'), (1.6, 'the hand rises'), (3.2, 'the thumb against the stars')],
  'calm', 'A: the cosmic ladder diagram · B: a foundation stone · C: the thumb returns — PICK C (bookend)',
  'close', 'moonlight and the desk lamp', sp=1)
R('MEANING', "So hold up your thumb tonight, and blink. That little jump is how we learned the size of the *sky*.", '-',
  'iris', 'pull', 'two-figures', ['stars'], 'child-at-the-window', ['NightWindow', 'ThumbHand', 'BlinkEye'], [],
  'outline-morph', 'the thumb', 'the thumb jumps; the camera pulls back to a child at the window, looking up at the stars',
  'Try it tonight: the jump measures the sky.', 'the child looking up',
  [(0, 'the eye blinks; the thumb jumps against a star'), (1.6, 'it jumps back'), (3.0, 'the camera pulls back'), (4.4, 'a child at the window'), (5.8, 'looking up'), (7.0, 'the stars')],
  'awe', 'A: the stars alone · B: the scientists again · C: the child at the window — PICK C (bookend: the question passed on)',
  'medium', 'moonlight on the child’s face; the lamp behind', motif='the eye — the circle we began with')

# ------------------------------------------------------------------------------------------------- breaths and chapters
ROWS[8][13]['gap'] = 6.2   # the episode's title card plays in this breath before the stakes (music only)
for i, r in enumerate(ROWS):
    if i and r[0] != ROWS[i - 1][0] and r[0].startswith('CLUE'): r[13]['gap'] = 1.5   # a breath after each clue's title (the score turns here)
for r in ROWS:   # the score's parts (tools/score.py): one cue per chapter, ≥ 60 s — the last act is one long swell of wonder → awe
    if r[0] in ('CLUE4', 'TWIST'): r[13]['mood'] = 'wonder'
    if r[0] in ('ANSWER', 'MEANING'): r[13]['mood'] = 'awe'
for i, r in enumerate(ROWS):
    if 'VAR' in r[1] or 'not *alone*' in r[1]: r[13]['hold'] = True   # the held breaths (music drops out, sfx_auto stays silent)
SRC = {'F1': 'S1 S2', 'F2': 'S1 S2 S3', 'F3': 'S2 S4', 'F4': 'calc (F2)', 'F5': 'S5 S6', 'F6': 'S5 S6 S7', 'F7': 'S8 S9', 'F8': 'S8 S10 S11', 'F9': 'S12 S13', 'F10': 'S14'}
H = os.path.dirname(os.path.abspath(__file__))
if __name__ == '__main__':
    write(H, 'star-distance', 'How far away are the stars?', ROWS, SRC,
          ['engine: `breathe` — Cepheid stars that swell and fade with a real period (the brighter the slower), the film’s second governing image',
           'engine: `parallax` — two eyepiece fields overlaid like tracing paper so a near star’s hair-width shift appears (and the same jump in your own thumb)',
           'a scale-dive INTO an angle: one degree → sixty minutes → sixty seconds, until one arc-second is a hair'],
          {'file': '../studio/music/wonder_silver_blue_light.wav', 'db': -24, 'start': 0},
          {'t': 300, 'title': 'How far are the *stars*?', 'kicker': 'Fathom'}, standard=6)
    out = ['# star-distance — concept pass (CREATIVE.md §1) — generated by episodes/star-distance/lines.py', '',
           '**Governing image:** the parallax blink — one point that jumps against what lies behind it (thumb → near star → breathing star → galaxy).', '',
           '**Motif:** the circle of the lens — the eye, the eyepiece, Leavitt’s loupe, the dome of Mount Wilson, Gaia’s shield.', '',
           '| L | line | A literal · B metaphor · C transformation → pick |', '|---|---|---|']
    out += [f'| {i} | {t.replace("*", "")} | {a} |' for i, t, a in CONCEPTS]
    open(os.path.join(H, '../../../jobs/scripts/star-distance_concepts.md'), 'w').write('\n'.join(out) + '\n'); print('→ jobs/scripts/star-distance_concepts.md')
