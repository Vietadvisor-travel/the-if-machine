#!/usr/bin/env python3
"""sun-fire — "What makes the Sun shine?" — script + shot plan (standard 6, engine 10).
python3 episodes/sun-fire/lines.py → episode.json. Facts: jobs/research/sun-fire.md · chain: jobs/scripts/sun-fire_chain.md
· treatment: jobs/scripts/sun-fire_treatment.md.
THE GOVERNING IMAGE: the candle and the Sun side by side on a window sill. THE MOTIF (shape): the FLAME — the match, the candle, the coal
Sun, the flash of fusion, the dawn. ACCENT: vermilion — the missing bead of mass, the caught atom, the neutrino.
NEW DEVICES: the Sun held in iron tongs like a lump of coal (CoalSun), atoms weighed as balloons on a grocer's balance (AtomBalance),
protons as dancers who shove each other away until two fuse (ProtonDance), the neutrino that changes its coat between doors (ThreeDoors),
the wall that ages thirty years round one chalked number (CountWall)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')); from _lines_common import write
ROWS = []
INS = ['ink-on', 'focus', 'slide', 'ink-bleed', 'grow', 'drop', 'wipe', 'rise', 'iris', 'unroll', 'assemble', 'blinds', 'stamp', 'quill', 'flip', 'burn', 'tear-in']
COMPS = ['centre-large', 'right-third-large', 'centre-medium', 'left-third-medium', 'tiny-in-vast', 'wide-landscape', 'two-figures', 'right-third-medium', 'diagonal', 'wide-sky']
def R(sec, text, src, how, frm, to, reads, focus, acts, mood, shot, light, cam, new, set_=None, sp=None, motif=None, stock=()):
    i = len(ROWS); d = len(text.replace('*', '').split()) / 2.35; acts = list(acts); j = 0
    while j <= len(acts):
        a = acts[j - 1][0] if j else 0; b = acts[j][0] if j < len(acts) else d
        if b - a > 2.4: acts.insert(j, (round(a + 2.2, 1), f'the camera travels on toward {focus}' if j % 2 else f'the light shifts across {focus}'))
        j += 1
    beats = ' | '.join(f'+{a:.1f} {s}' for a, s in acts)
    X = {'reads': reads, 'focus': focus, 'becomes': {'from': frm, 'to': to, 'how': how}, 'acts': [list(a) for a in acts], 'mood': mood, 'shot': shot, 'light': light}
    if sp: X['setpiece'] = sp
    if motif: X['motif'] = motif
    CAMV = {'crane-up': 'crane', 'crane-down': 'crane', 'pan-l': 'pan', 'pan-r': 'pan', 'tilt-down': 'tilt-up', 'arc': 'orbit', 'dolly': 'push', 'track': 'ride',
            'lock': 'hold', 'handheld': 'tremble', 'snap-zoom': 'push', 'dutch': 'roll'}
    LIFE = ['sway', 'breathe', 'flicker', 'bob', 'particles', 'ripple']
    ROWS.append((sec, text, src, INS[(i * 7) % len(INS)], how, CAMV.get(cam, cam), COMPS[(i * 3) % len(COMPS)], [LIFE[i % 6]], set_, list(new), list(stock), to[0].upper() + to[1:] + '.', beats, X))

# ======================================================================== COLD — the match, the candle and the Sun (set piece 0)
R('COLD', "Strike a match in a dark room. For a moment it is the brightest thing there is… and in a few seconds, it burns *out*.", '-',
  'ink-on', 'the cream page', 'a dark room by a window; a hand strikes a match, it flares, shrinks and dies', 'A match flares and dies.', 'the match flame',
  [(0, 'the dark room inks on'), (1.2, 'a hand strikes the match'), (2.2, 'it flares'), (3.6, 'the flame steadies'), (5.0, 'it shrinks'), (6.0, 'a curl of smoke')],
  'mystery', 'insert', 'the match flame, the only light', 'push', ['MatchCandle'], 'dark-room', sp=1, motif='the flame — a match')
R('COLD', "Light a candle from it, and you get a few hours. A little stick of wax, slowly burning down to a *puddle*.", '-',
  'hand-over', 'the dying match', 'the hand touches the match to a candle on the sill; the candle burns down to a puddle', 'A candle lasts a few hours.', 'the candle flame',
  [(0, 'the match meets the wick'), (1.4, 'the candle catches'), (2.8, 'wax runs'), (4.0, 'the candle shortens'), (5.2, 'a puddle of wax')],
  'mystery', 'close', 'candle flame, warm', 'pan-r', ['MatchCandle'], motif='the flame — the candle')
R('COLD', "Now look out of the window. The Sun is coming up, just as it did yesterday, and every day for billions of *years*.", 'F12',
  'light-change', 'the candle', 'dawn fills the window behind the candle; the Sun rises, two flames side by side', 'The Sun rises beside the candle.', 'the rising Sun',
  [(0, 'the window greys'), (1.4, 'the sky warms'), (2.8, 'the Sun’s rim appears'), (4.2, 'it rises beside the candle'), (5.6, 'two flames side by side')],
  'wonder', 'medium', 'dawn through the window', 'pull', ['MatchCandle'], motif='the flame — candle and Sun')
R('COLD', "Speed up time. Candle after candle burns down on the sill, a whole forest of wax… and the Sun hasn’t even *flickered*.", '-',
  'time-lapse', 'the candle and the Sun', 'candles burn down one after another in seconds while the Sun stays exactly as bright', 'Candles die; the Sun does not.', 'the candles burning down',
  [(0, 'a candle melts in a second'), (1.2, 'another is lit'), (2.4, 'it melts'), (3.6, 'a heap of stubs grows'), (5.0, 'the Sun has not changed')],
  'mystery', 'medium', 'dawn steady; candlelight flickering', 'lock', ['MatchCandle'], sp=1)
R('COLD', "So what is it burning? What fuel could possibly last that long, in a place where nobody can ever *go*?", '-',
  'spot', 'the stubs', 'the light narrows to the Sun alone; a vermilion question mark curls in its glow', 'What does the Sun burn?', 'the Sun',
  [(0, 'the room darkens'), (1.4, 'only the Sun is lit'), (2.8, 'a question mark curls'), (4.0, 'it glows vermilion')],
  'mystery', 'close', 'a spot on the Sun', 'snap-zoom', ['MatchCandle'])
R('COLD', "To find out, we needed a lump of coal, a shrinking star, a missing scrap of weight… and ghosts at the bottom of a gold *mine*.", 'F1 F2 F4 F7',
  'split', 'the Sun', 'four tags swing down on strings over the sill: a lump of coal, a tape measure, a little balance, a miner’s lamp', 'Four clues.', 'each tag as it lands',
  [(0, 'a tag drops: coal'), (1.6, 'a tape measure'), (3.2, 'a little balance'), (4.8, 'a miner’s lamp'), (6.2, 'they swing')],
  'curious', 'wide', 'dawn', 'pan-l', ['ClueTags'], 'clue-tags')
# ======================================================================== STAKES — you cannot go there
R('STAKES', "The trouble is, the Sun is a hundred and fifty million kilometres away. Nobody can fetch a piece of it to *test*.", 'F11',
  'whip', 'the four tags', 'we whip out of the window into space; the Earth shrinks to a dot, a dotted line runs to the Sun', 'The Sun is very far away.', 'the dotted line',
  [(0, 'out through the glass'), (1.4, 'the Earth shrinks'), (2.8, 'a dotted line runs'), (4.2, 'it reaches the Sun'), (5.2, '150 000 000 km')],
  'curious', 'wide', 'black space, sunlit side', 'dolly', ['SunCutaway'], 'space')
R('STAKES', "And its heart is buried under seven hundred thousand kilometres of glowing gas. You could never look inside it, not even *once*.", 'F11',
  'unfold', 'the line', 'the Sun’s glowing skin peels back like an onion, layer by layer, to a hidden white core', 'Its heart is hidden.', 'the core',
  [(0, 'the skin peels'), (1.4, 'a second layer'), (2.8, 'a third'), (4.2, 'the core glows'), (5.4, 'it closes again')],
  'mystery', 'close', 'the Sun’s own glow', 'tilt-down', ['SunCutaway'], motif='the flame — the hidden core')
R('STAKES', "For centuries people watched the Sun through smoked glass and the first telescopes. They saw dark spots drift across it… but never what made it *shine*.", '-',
  'real-reveal', 'the closed Sun', 'an old engraving develops: astronomers project the Sun’s image onto a sheet and trace its spots', 'People watched, but could not see inside.', 'the projected Sun',
  [(0, 'the engraving develops'), (1.4, 'a telescope throws the Sun onto paper'), (2.8, 'a spot drifts'), (4.2, 'a hand traces it'), (5.6, 'the image fades to the bare Sun')],
  'curious', 'medium', 'a beam through a shutter', 'pan-l', [], stock=['E-01'])
R('STAKES', "So the scientists did the only thing they could. They took every fuel they knew, and asked: how long would it *last*?", '-',
  'grip-hand', 'the closed Sun', 'a pair of huge iron tongs swings in from the dark and grips the Sun', 'Test every fuel.', 'the tongs',
  [(0, 'the tongs swing in'), (1.4, 'they open'), (2.8, 'they grip the Sun'), (4.0, 'it lifts')],
  'curious', 'medium', 'sunglow from below', 'crane-up', ['CoalSun'])
# ======================================================================== CLUE 1 — too long for fire
R('CLUE1', "Start with the obvious answer: fire. Imagine the whole Sun as one gigantic lump of *coal*.", 'F1',
  'solid-morph', 'the gripped Sun', 'the Sun in the tongs turns to a black, glowing lump of coal over a giant coal scuttle', 'The Sun as coal.', 'the coal Sun',
  [(0, 'the surface blackens'), (1.4, 'cracks glow red'), (2.8, 'it is a lump of coal'), (3.8, 'sparks rise')],
  'curious', 'medium', 'red coal glow', 'arc', ['CoalSun'], 'coal-sun', sp=1, motif='the flame — the coal Sun')
R('CLUE1', "Coal burns hot and bright. A heap the size of the Sun would make a fire beyond anything on *Earth*.", 'F1',
  'heat', 'the coal Sun', 'flames roar off the coal Sun; a tiny Earth hangs beside it for scale', 'A giant coal fire.', 'the flames',
  [(0, 'flames roar up'), (1.4, 'a tiny Earth appears'), (2.8, 'the heat shimmers'), (4.0, 'the flames tower')],
  'wonder', 'wide', 'firelight, flickering', 'handheld', ['CoalSun'], sp=1)
R('CLUE1', "But fire eats its fuel. Run the clock forward, and a coal Sun burns right through itself in just a few thousand *years*.", 'F1',
  'count-up', 'the flames', 'a counter of years races while the coal Sun dims, reddens and turns to grey cinders', 'Coal would burn out in a few thousand years.', 'the counter',
  [(0, 'the counter starts'), (1.4, 'the flames sink'), (2.8, 'it reddens'), (4.2, 'grey cinders'), (5.4, 'the counter stops: a few thousand years')],
  'tension', 'medium', 'firelight dying', 'push', ['CoalSun'], sp=1)
R('CLUE1', "A few thousand years is nothing. Human history alone is about that long, and the Earth was clearly far, far *older*.", 'F1',
  'ink-bleed', 'the cinder Sun', 'the dead cinder hangs in the tongs; beneath it a cliff of rock layers rises, far taller than the counter', 'Far too short.', 'the cinder',
  [(0, 'the cinder smokes'), (1.4, 'a flake falls'), (2.8, 'rock layers rise'), (4.2, 'they tower over it')],
  'tension', 'wide', 'cold grey light', 'tilt-up', ['CoalSun'])
R('CLUE1', "Coal could not do it. No fire could. Scientists needed a fuel that could keep the Sun going far longer. But what could it possibly *be*?", 'F1',
  'drop', 'the cinder', 'the tongs open; the cinder drops and crumbles into a coal scuttle beside a Victorian fireplace', 'No fire is enough.', 'the scuttle',
  [(0, 'the tongs open'), (1.0, 'the cinder falls'), (2.0, 'it crumbles in the scuttle'), (3.4, 'dust settles'), (4.6, 'a study around it')],
  'tension', 'medium', 'oil lamp', 'crane-down', ['VictorianStudy'], 'study')
# ======================================================================== CLUE 2 — the shrinking Sun and the angry geologists
R('CLUE2', "In the 1850s, Hermann von Helmholtz in Germany, and William Thomson, later Lord Kelvin, in Scotland, had a cleverer *idea*.", 'F2',
  'walk-in', 'the scuttle', 'Kelvin walks into the lamplit study to his desk; two cabinet portraits stand on it', 'Helmholtz and Kelvin.', 'Kelvin',
  [(0, 'Kelvin walks in'), (1.4, 'he reaches the desk'), (2.8, 'portraits on the desk'), (4.2, 'he turns the lamp up'), (5.6, 'he sits')],
  'curious', 'medium', 'oil lamp on the desk', 'track', ['VictorianStudy'], stock=['P-03'])
R('CLUE2', "Squeeze something, and it warms up. Pump a bicycle tyre hard, and feel how hot the pump *gets*.", 'F2',
  'hand-over', 'the desk', 'Kelvin’s hands work a bicycle pump; a thermometer strapped to it climbs into the red', 'Squeezing makes heat.', 'the thermometer',
  [(0, 'hands grip the pump'), (1.0, 'down'), (2.0, 'up'), (3.0, 'down'), (4.0, 'the thermometer climbs')],
  'curious', 'insert', 'oil lamp', 'rack', ['BikePump'], 'pump')
R('CLUE2', "Now let gravity do the squeezing. The Sun’s own weight pulls it inward, and as it slowly shrinks, it glows *hot*.", 'F2',
  'echo', 'the pump barrel', 'the round end of the pump becomes the Sun, slowly shrinking and glowing brighter as arrows press inward', 'Gravity squeezes the Sun.', 'the shrinking Sun',
  [(0, 'the barrel becomes the Sun'), (1.4, 'arrows press in'), (2.8, 'it shrinks'), (4.2, 'it glows brighter')],
  'wonder', 'close', 'its own glow', 'orbit', ['ShrinkingSun'], 'shrink-sun')
R('CLUE2', "Wrap a tape measure round its middle, and year after year the tape pulls a little tighter. Far too little to notice from *Earth*.", 'F2',
  'travel-line', 'the Sun', 'a tailor’s tape runs round the Sun’s waist and clicks tighter, notch by notch', 'The Sun is on a diet.', 'the tape',
  [(0, 'the tape runs round'), (1.4, 'it clicks tighter'), (2.8, 'again'), (4.2, 'a tiny notch'), (5.2, 'the Sun barely changes')],
  'curious', 'close', 'its own glow', 'pan-r', ['ShrinkingSun'], sp=0)
R('CLUE2', "Kelvin did the sums. Squeezing could keep the Sun shining for about twenty million years: thousands of times longer than *coal*.", 'F2',
  'count-up', 'the tape', 'the tape becomes a tear-off calendar; its pages fly off as the count runs to 20 million years', 'About twenty million years.', 'the calendar count',
  [(0, 'the tape folds into a calendar'), (1.4, 'pages fly'), (2.8, 'faster'), (4.2, '20 000 000'), (5.4, 'Kelvin nods')],
  'triumph', 'medium', 'oil lamp', 'pull', ['CalendarPad'], 'calendar')
R('CLUE2', "It sounded like a triumph. But out in the quarries, geologists were reading a very different *calendar*.", 'F3',
  'shatter', 'the calendar', 'a geologist’s hammer cracks through the last calendar page into a cliff face of rock layers', 'Geologists disagree.', 'the hammer',
  [(0, 'a hammer swings'), (1.2, 'the page cracks'), (2.4, 'a cliff behind it'), (3.6, 'stripes of rock')],
  'tension', 'wide', 'flat daylight', 'whip', ['CliffLayers'], 'cliff')
R('CLUE2', "Layer on layer of rock, each one laid down grain by grain. Their slow stacking spoke of hundreds of millions of *years*.", 'F3',
  'pour', 'the crack', 'sand pours down and the layers build up one by one, the cliff growing taller with each', 'Rocks need hundreds of millions of years.', 'the layers',
  [(0, 'sand pours'), (1.4, 'a layer settles'), (2.8, 'another'), (4.2, 'another'), (5.4, 'the cliff towers')],
  'curious', 'wide', 'daylight', 'tilt-up', ['CliffLayers'])
R('CLUE2', "And Charles Darwin needed even more. Living things change so slowly that twenty million years was nowhere near *enough*.", 'F3',
  'outline-morph', 'the cliff layers', 'the layers’ edges become the branches of a tree sketched in a notebook, growing faster than the calendar can turn', 'Life needs even longer.', 'the branching tree',
  [(0, 'the edges curl'), (1.4, 'a trunk'), (2.8, 'branches split'), (4.2, 'more branches'), (5.4, 'the calendar can’t keep up')],
  'curious', 'close', 'lamp on paper', 'dutch', ['DarwinTree'], 'notebook')
R('CLUE2', "Physics said the Sun was young. Rocks and life said the Earth was old. They could not both be *right*.", 'F3',
  'merge', 'the tree', 'a balance: the Sun’s calendar on one pan, the cliff and the tree on the other; the beam swings and won’t settle', 'A contradiction.', 'the beam',
  [(0, 'the pans fill'), (1.4, 'the beam dips'), (2.6, 'it swings back'), (3.8, 'it won’t settle')],
  'tension', 'medium', 'cold daylight', 'lock', ['SunScales'], 'scales')
# ======================================================================== CLUE 3 — the missing weight
R('CLUE3', "The answer came from somewhere nobody expected. In 1920, the scientist Francis Aston weighed atoms more exactly than anyone *before*.", 'F4',
  'shrink-into', 'the swinging scales', 'the balance shrinks onto a laboratory bench; Aston bends over it', 'Aston weighs atoms.', 'Aston',
  [(0, 'the scales shrink'), (1.4, 'a bench'), (2.8, 'Aston leans in'), (4.2, 'he adjusts a weight'), (5.6, 'a portrait card')],
  'curious', 'medium', 'bright lab window', 'arc', ['AtomBalance'], 'lab', stock=['P-03'])
R('CLUE3', "A helium atom is made of the same stuff as four hydrogen atoms. So it ought to weigh exactly the same as *four*.", 'F4',
  'slide-in', 'the bench', 'on the balance: four little hydrogen balloons on one pan, one helium balloon on the other', 'Four hydrogens versus one helium.', 'the two pans',
  [(0, 'four balloons float onto a pan'), (1.4, 'one balloon onto the other'), (2.8, 'a pointer'), (4.0, 'it should be level')],
  'curious', 'close', 'lab window', 'pan-l', ['AtomBalance'], sp=2)
R('CLUE3', "It doesn’t. Helium is lighter, by about one part in a hundred and twenty. A sliver of weight has simply gone *missing*.", 'F4',
  'drop', 'the balanced pans', 'the four balloons tie together into one; a tiny vermilion bead drops off and the beam tips', 'Some weight is missing.', 'the bead',
  [(0, 'the four balloons tie up'), (1.4, 'a bead slips free'), (2.4, 'it drops'), (3.4, 'tick'), (4.6, 'the beam tips: 1/120')],
  'mystery', 'insert', 'lab window, a glint on the bead', 'push', ['AtomBalance'], sp=2, motif='the flame — the vermilion bead')
R('CLUE3', "Where did it go? Albert Einstein had already given the answer. A little mass can turn into a huge amount of *energy*.", 'F4',
  'bloom-out', 'the bead', 'the bead flares into sparks that write E = mc² in the air', 'Mass becomes energy.', 'the sparks',
  [(0, 'the bead flares'), (1.4, 'sparks swirl'), (2.8, 'E = mc²'), (4.0, 'the sparks glow')],
  'wonder', 'close', 'sparklight', 'crane-up', ['SparkFormula'], 'spark', sp=2, motif='the flame — the flash of mass')
R('CLUE3', "The c is the speed of light, multiplied by itself: a gigantic number. So a crumb of lost weight becomes a flood of *light*.", 'F4',
  'ripple-through', 'the formula', 'the c² swells into a huge number that rolls across the frame; the crumb of mass beside it becomes a blaze', 'A crumb of mass, a flood of light.', 'the blaze',
  [(0, 'the c swells'), (1.4, 'a long number rolls'), (2.8, 'the crumb'), (4.0, 'it blazes'), (5.2, 'light floods out')],
  'awe', 'wide', 'blazing light', 'pull', ['SparkFormula'])
R('CLUE3', "That August, in Cardiff, the astronomer Arthur Eddington put it all together. The Sun, he said, must be turning hydrogen into *helium*.", 'F4',
  'crane', 'the blaze', 'we come down into a hall in Cardiff; Eddington at a lectern, tall windows behind, the printed address beside him', 'Eddington explains.', 'Eddington',
  [(0, 'we descend into the hall'), (1.4, 'Eddington at the lectern'), (2.8, 'he raises a hand'), (4.2, 'H → He on the board'), (5.6, 'the printed page')],
  'triumph', 'wide', 'tall windows, morning', 'crane-down', ['CardiffHall'], 'cardiff', stock=['D-01', 'P-03'])
R('CLUE3', "And the old shrinking-Sun idea? Eddington called it an “unburied corpse”. It was time to put it in the *ground*.", 'F4',
  'lift-off', 'the lectern', 'Eddington lifts a sheet off a coffin marked “shrinking Sun”; the lid slams shut', 'The old idea is buried.', 'the coffin',
  [(0, 'a coffin by the lectern'), (1.4, 'he lifts the sheet'), (2.8, 'the old Sun inside'), (4.0, 'the lid slams')],
  'tension', 'medium', 'window light', 'handheld', ['CardiffHall'], sp=0)
R('CLUE3', "But how, exactly? Deep in the middle of the Sun it is crushed and fierce, millions of degrees *hot*.", 'F11',
  'through', 'the coffin lid', 'the lid becomes an iron furnace door; it swings open on the white-hot core of the Sun', 'Into the core.', 'the core',
  [(0, 'the lid becomes a door'), (1.4, 'it creaks open'), (2.8, 'white heat'), (4.0, 'millions of degrees')],
  'awe', 'medium', 'white-hot glow from the door', 'push', ['CoreDoor'], 'core', motif='the flame — the furnace door')
R('CLUE3', "Shrink down to the size of an atom’s heart. Bare hydrogen cores, called protons, rush about, and shove each other *away*.", 'F5',
  'dive', 'the open door', 'we dive into the glow; round protons dance about, each one shoving the others away', 'Protons push each other away.', 'two protons',
  [(0, 'we dive in'), (1.4, 'dancers appear'), (2.8, 'two bump'), (3.8, 'they spring apart'), (5.0, 'again')],
  'wonder', 'close', 'white glow', 'dive', ['ProtonDance'], 'dance', sp=2)
R('CLUE3', "Like two magnets held the wrong way round, they won’t touch. But in that heat, now and then, two crash close enough to *stick*.", 'F5',
  'bloom-out', 'the dancers', 'two dancers rush together, refuse, rush again — and fuse in a flash', 'Two protons fuse.', 'the flash',
  [(0, 'two magnets repel'), (1.4, 'two dancers run'), (2.8, 'they bounce'), (4.0, 'faster'), (5.0, 'flash — they fuse')],
  'awe', 'insert', 'a flash', 'snap-zoom', ['ProtonDance'], sp=2, motif='the flame — the flash of fusion')
R('CLUE3', "In 1938 and 1939, Hans Bethe worked out each step: how four hydrogens, one by one, become a single helium. The lost weight leaves as *sunlight*.", 'F5',
  'page-turn', 'the flash', 'a line of dancers changing partners runs out onto a paper strip feeding into Bethe’s typewriter', 'Bethe works out the chain.', 'the typewriter',
  [(0, 'dancers change partners'), (1.4, 'four become one'), (2.8, 'the line becomes a paper strip'), (4.2, 'Bethe types'), (5.6, 'light spills from the page')],
  'triumph', 'medium', 'desk lamp', 'track', ['Typewriter'], 'bethe', stock=['P-03'])
# ======================================================================== CLUE 4 — ghosts from the core
R('CLUE4', "It was a beautiful idea. But could anyone prove it? You can’t push a thermometer into the middle of the *Sun*.", '-',
  'lift-off', 'the typewriter', 'the page lifts off the typewriter and floats up toward a drawn Sun; a thermometer melts as it reaches it', 'Can it be proved?', 'the melting thermometer',
  [(0, 'the page lifts'), (1.4, 'a thermometer reaches out'), (2.8, 'it droops'), (4.0, 'it melts')],
  'tension', 'medium', 'sunglow', 'tilt-up', ['Typewriter'])
R('CLUE4', "Then came a strange clue. Each time the Sun makes helium, it also spits out a tiny particle, called a *neutrino*.", 'F6',
  'trace-to', 'the page', 'one tiny letter slips off the page and flies off as a vermilion spark with a tail — a neutrino', 'A neutrino.', 'the spark',
  [(0, 'a letter wobbles'), (1.4, 'it slips off'), (2.6, 'it streaks away'), (3.8, 'a vermilion spark')],
  'curious', 'close', 'sunglow', 'pan-r', ['NeutrinoFlight'], 'flight', motif='the flame — the neutrino spark')
R('CLUE4', "Neutrinos are like ghosts. They fly straight out of the Sun, across space, and right through the whole Earth, as if it were *glass*.", 'F6',
  'stream-through', 'the spark', 'a stream of sparks pours out of the Sun, across space and straight through a glassy Earth without slowing', 'They pass through everything.', 'the Earth',
  [(0, 'sparks pour out'), (1.4, 'they cross space'), (2.8, 'the Earth turns to glass'), (4.2, 'they pass through'), (5.6, 'out the other side')],
  'wonder', 'wide', 'sunlit space', 'orbit', ['NeutrinoFlight'], sp=3)
R('CLUE4', "Billions of them pass through your thumbnail every second, day and night. You have never felt a single *one*.", 'F9',
  'rack-focus', 'the glass Earth', 'a man walks down a street with his coffee; sparks rain straight through him; we focus on his thumbnail', 'They pass through you.', 'the thumbnail',
  [(0, 'a street'), (1.4, 'a man with coffee'), (2.8, 'sparks rain through'), (4.0, 'his thumbnail'), (5.0, 'he never notices')],
  'curious', 'close', 'morning street', 'rack', ['ThumbRain'], 'street')
R('CLUE4', "Catch a few, and you could count what the Sun’s heart is doing right now. A chemist named Ray Davis decided to *try*.", 'F7',
  'scale-dive', 'the thumbnail', 'the thumbnail becomes the mouth of a mine shaft; Davis in a hard hat steps into the cage', 'Ray Davis.', 'Davis',
  [(0, 'the nail becomes a shaft'), (1.4, 'a headframe'), (2.8, 'Davis in a hard hat'), (4.0, 'he steps into the cage')],
  'curious', 'medium', 'grey daylight at the pithead', 'pan-l', ['MineShaft'], 'mine', stock=['P-03'])
R('CLUE4', "In the 1960s, he went down the Homestake gold mine in South Dakota. How deep? Almost one and a half kilometres *underground*.", 'F7',
  'drop', 'the cage', 'the cage drops down the shaft; a depth gauge spins to 1,478 m; rock rushes past', 'Deep underground.', 'the depth gauge',
  [(0, 'the cage drops'), (1.4, 'rock rushes past'), (2.8, 'the gauge spins'), (4.2, '1,478 m'), (5.0, 'a jolt')],
  'mystery', 'wide', 'helmet lamps in the dark', 'crane-down', ['MineShaft'], sp=3)
R('CLUE4', "The rock above blocks out everything else; only the ghosts get through. He filled a tank as big as a house with cleaning *fluid*.", 'F7',
  'grow-out-of', 'the cage', 'out of the dark cavern grows a huge tank; fluid fills it; Davis’s lamp shines on it', 'A tank of cleaning fluid.', 'the tank',
  [(0, 'the cavern opens'), (1.4, 'a tank grows'), (2.8, 'it fills'), (4.2, 'Davis’s lamp sweeps it'), (5.6, 'a tiny man beside it')],
  'mystery', 'wide', 'helmet lamp', 'arc', ['ChlorineTank'], 'tank', sp=3)
R('CLUE4', "Once in a long while, a neutrino strikes an atom in the fluid and turns it into a different atom. It’s like one grain of sand turning to *gold*.", 'F7',
  'spot', 'the tank', 'the light narrows on a heap of grains; one is struck by a spark and turns vermilion-gold', 'One atom changes.', 'the changed grain',
  [(0, 'a heap of grains'), (1.4, 'a spark streaks in'), (2.8, 'it strikes one'), (4.0, 'the grain turns gold'), (5.4, 'it glows')],
  'wonder', 'insert', 'a single spot', 'push', ['AtomGrain'], sp=3, motif='the flame — the caught atom')
R('CLUE4', "Davis fished out those few changed atoms and counted them, week after week, year after *year*.", 'F7',
  'real-reveal', 'the gold grain', 'the drawn tank becomes the real photograph of the Homestake tank; a tally grows in chalk beside it', 'Counting for years.', 'the tally',
  [(0, 'the photo develops'), (1.4, 'a tally mark'), (2.6, 'another'), (3.8, 'weeks pass')],
  'calm', 'medium', 'helmet lamp', 'pan-r', ['ChlorineTank'], stock=['P-01'])
R('CLUE4', "Theory said how many he should catch. But his count came to only about a *third* of it.", 'F7 F13',
  'tick', 'the tally', 'on a wall: the prediction chalked large; the counter below climbs, then stops at a third of it', 'Only a third.', 'the counter',
  [(0, 'the chalk prediction'), (1.4, 'the counter climbs'), (2.8, 'it slows'), (3.6, 'it stops: about a third')],
  'mystery', 'medium', 'bare bulb', 'lock', ['CountWall'], 'wall')
# ======================================================================== TWIST — thirty years of missing ghosts
R('TWIST', "Two thirds of the Sun’s ghosts were missing. Was the experiment wrong? Or was the Sun not burning the way everyone *thought*?", 'F7',
  'swell', 'the counter', 'the wall shimmers; the chalk prediction and the counter tug apart; two question marks appear', 'Two thirds missing.', 'the gap',
  [(0, 'the gap opens'), (1.4, 'a question mark: the tank?'), (2.8, 'a question mark: the Sun?'), (4.2, 'they wobble')],
  'tension', 'close', 'bare bulb', 'dutch', ['CountWall'], sp=3)
R('TWIST', "Some physicists blamed Davis’s tank. Others blamed the theory of the Sun. Davis just kept counting, and his number would not *budge*.", 'F7 F13',
  'tilt', 'the question marks', 'two crowds of chalk arrows point at the tank and at the Sun; Davis, at his desk, adds another tally and the counter stays put', 'Nobody could explain it.', 'the counter',
  [(0, 'arrows at the tank'), (1.4, 'arrows at the Sun'), (2.8, 'Davis adds a mark'), (4.0, 'the counter stays'), (5.2, 'he shrugs')],
  'tension', 'medium', 'bare bulb', 'pan-r', ['CountWall'])
R('TWIST', "For thirty years nobody could say. The prediction hung on the wall while posters changed, and hair turned *grey*.", 'F13',
  'time-lapse', 'the gap', 'the wall ages thirty years in seconds: posters change, the paint yellows, Davis’s hair greys at the desk', 'Thirty years.', 'the ageing wall',
  [(0, 'a poster changes'), (1.2, 'another'), (2.4, 'paint yellows'), (3.6, 'Davis greys'), (4.8, 'the chalk stays')],
  'calm', 'medium', 'bulb, then fluorescent, then daylight', 'track', ['CountWall'], sp=3)
R('TWIST', "The answer came from another mine, in Canada. Deep underground sat a giant ball of heavy water, a rare, weightier kind of water. Thousands of electric eyes watched *it*.", 'F8',
  'cut-open', 'the ageing wall', 'the wall cracks open into a vast cavern; a giant sphere stands in it, studded with thousands of light sensors', 'Sudbury.', 'the sphere',
  [(0, 'the wall cracks'), (1.4, 'a cavern'), (2.8, 'a sphere'), (4.0, 'thousands of eyes'), (5.4, 'the real photo')],
  'wonder', 'wide', 'cool cavern light', 'crane-up', ['SNOSphere'], 'sudbury', stock=['P-02'])
R('TWIST', "It could catch neutrinos of every kind. And it turns out there are three kinds, like three different *flavours*.", 'F8',
  'door-open', 'the sphere', 'the sphere opens three doors, red, blue and green', 'Three kinds.', 'the three doors',
  [(0, 'a red door'), (1.2, 'a blue door'), (2.4, 'a green door'), (3.6, 'they open')],
  'curious', 'medium', 'cool light', 'pan-l', ['ThreeDoors'], 'doors')
R('TWIST', "And on the long flight from the Sun, a neutrino can change from one kind into *another*.", 'F8',
  'walk-in', 'the doors', 'a neutrino in a red coat walks in at one door and steps out of another in a blue coat', 'They change on the way.', 'the coat',
  [(0, 'a red coat walks in'), (1.4, 'the door shuts'), (2.6, 'another door opens'), (3.6, 'a blue coat walks out')],
  'wonder', 'close', 'cool light', 'track', ['ThreeDoors'], sp=3, motif='the flame — the coat that changes')
# ======================================================================== ANSWER — the furnace confirmed
R('ANSWER', "Davis’s tank could only see one kind. The missing two thirds had never been missing at all. They had changed their *coats*.", 'F8',
  'x-ray', 'the blue coat', 'the coats hang side by side: red, blue, green; Davis’s tank sees only the red', 'They were never missing.', 'the coats',
  [(0, 'three coats'), (1.4, 'the tank’s eye: red only'), (2.8, 'blue and green unseen'), (4.0, 'all three light up')],
  'wonder', 'medium', 'warming light', 'arc', ['ThreeDoors'])
R('ANSWER', "In 2001 and 2002, Sudbury counted all three kinds together. Would the total match the prediction? It did. The Sun really is a nuclear *furnace*.", 'F8',
  'build', 'the coats', 'back at the wall: three counters add up, the total climbs and clicks onto the old chalk prediction', 'The count matches.', 'the total',
  [(0, 'three counters'), (1.4, 'they add'), (2.8, 'the total climbs'), (4.0, 'it meets the chalk'), (5.2, 'click')],
  'triumph', 'medium', 'daylight', 'push', ['CountWall'], sp=3)
R('ANSWER', "Ray Davis won a Nobel Prize in 2002. The neutrino hunters behind the final answer won one in *2015*.", 'F8',
  'rise-from', 'the matching count', 'the numbers glow, rise up out of the mine and climb into the dawn sky', 'Nobel prizes.', 'the rising numbers',
  [(0, 'the numbers glow'), (1.4, 'they rise'), (2.8, 'up the shaft'), (4.0, 'into the dawn')],
  'triumph', 'wide', 'dawn', 'tilt-up', ['MineShaft'])
# ======================================================================== MEANING — the furnace we live by
R('MEANING', "So here is what the Sun really is. Every second, it turns about four million tonnes of itself into *light*.", 'F10',
  'grow-out-of', 'the dawn', 'the dawn Sun swells into a cutaway: a furnace at its heart, weights tumbling in and light pouring out', 'Matter becomes light.', 'the furnace',
  [(0, 'the Sun swells'), (1.4, 'its heart opens'), (2.8, 'weights tumble in'), (4.0, 'light pours out'), (5.0, '4 000 000 tonnes')],
  'awe', 'wide', 'the Sun’s blaze', 'pull', ['SunFurnace'], 'furnace', motif='the flame — the furnace')
R('MEANING', "It has been doing that for four and a half billion years, and it has billions of years still to *go*.", 'F12',
  'shape-window', 'the furnace', 'through a circle like the Sun we see the ages pass: a young Earth, oceans, forests, cities', 'Billions of years.', 'the ages',
  [(0, 'a circle opens'), (1.4, 'a young Earth'), (2.8, 'forests'), (4.0, 'cities'), (5.0, 'still burning')],
  'awe', 'medium', 'sunlight', 'orbit', ['SunFurnace'])
R('MEANING', "That light grows our wheat and our rice. It runs through a solar panel. It warms your face on a cold *morning*.", '-',
  'spread', 'the ages', 'sunbeams stream down onto a wheat field, a solar panel, and a face turned up to the morning', 'Everything runs on it.', 'the face',
  [(0, 'beams stream down'), (1.4, 'wheat sways'), (2.8, 'a solar panel glints'), (4.0, 'a face in the light')],
  'warm', 'wide', 'morning sun', 'pan-r', ['LightFields'], 'fields')
R('MEANING', "Every bit of it began as a sliver of lost weight, deep in the Sun’s crushing heart, where hydrogen becomes *helium*.", 'F4',
  'sweep', 'the face', 'the light on the face sweeps back up the beam to the Sun; four dancers merge into one with a flash', 'From lost weight.', 'the flash',
  [(0, 'the beam reverses'), (1.4, 'up to the Sun'), (2.8, 'into its heart'), (4.0, 'four become one'), (5.2, 'flash')],
  'awe', 'close', 'sunlight', 'dive', ['LightFields', 'ProtonDance'], motif='the flame — fusion again')
R('MEANING', "We found all this out without ever going there. Just a lump of coal, a balance, a typewriter, and a tank of cleaning fluid deep under the *ground*.", '-',
  'assemble', 'the flash', 'the four tags swing back down over the sill; each now shows its answer, ticked in vermilion', 'We never had to go there.', 'the four tags',
  [(0, 'the coal tag'), (1.4, 'the balance'), (2.8, 'the typewriter'), (4.2, 'the tank'), (5.6, 'each ticked')],
  'warm', 'medium', 'dawn', 'lock', ['ClueTags'])
R('MEANING', "Go back to the window. The candle is long gone, burnt down to a puddle of wax. And the Sun is still *rising*.", '-',
  'echo', 'the four tags', 'the tags lift away; the Sun in the window; on the sill, the puddle of wax from the candle; the warm light rests', 'The candle is gone; the Sun is not.', 'the sill',
  [(0, 'the window'), (1.4, 'the cold wax puddle'), (2.8, 'the Sun rises'), (4.0, 'warm light on the sill')],
  'warm', 'medium', 'dawn through the window', 'crane-up', ['MatchCandle'], 'sill-at-dawn', motif='the flame — the candle out, the Sun not')

ROWS[5][13]['gap'] = 6.2
for i, r in enumerate(ROWS):
    if i and r[0] != ROWS[i - 1][0] and r[0].startswith('CLUE'): r[13]['gap'] = 1.5
SRC = {'F1': 'S1 S2', 'F2': 'S1 S2 S3', 'F3': 'S1 S3', 'F4': 'S4 S5', 'F5': 'S1 S6', 'F6': 'S7 S8', 'F7': 'S7 S8 S9', 'F8': 'S7 S8 S9',
       'F9': 'S7 S10', 'F10': 'S2 S11', 'F11': 'S11 S12', 'F12': 'S11 S12', 'F13': 'S7 S8'}
H = os.path.dirname(os.path.abspath(__file__))
if __name__ == '__main__':
    write(H, 'sun-fire', 'What makes the Sun shine?', ROWS, SRC,
          ['device CoalSun — the Sun gripped in giant iron tongs like a lump of coal, burning down to cinders',
           'device AtomBalance — atoms weighed as balloons on a grocer’s balance; four tie into one and a bead of weight drops off',
           'device ProtonDance — protons as dancers who shove each other away until two crash together and fuse',
           'device ThreeDoors — a neutrino walks in one door in a red coat and out of another in a blue coat',
           'device CountWall — a wall that ages thirty years round one chalked number'],
          {'file': '../studio/music/wonder_dreamer.wav', 'db': -24, 'start': 0}, {'t': 1, 'title': 'What makes the *Sun* shine?', 'kicker': 'Fathom'}, standard=6)
