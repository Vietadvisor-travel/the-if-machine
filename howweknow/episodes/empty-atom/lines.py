#!/usr/bin/env python3
"""empty-atom — "What is inside an atom?" — script + v5 shot plan (single source, STORY.md §7, standard 5).
python3 episodes/empty-atom/lines.py → episode.json (+ jobs/scripts/empty-atom_concepts.md, the concept pass of CREATIVE.md §1),
then python3 tools/plan_md.py episodes/empty-atom → jobs/scripts/empty-atom.md. Facts: jobs/research/empty-atom.md. Stock: jobs/orders/empty-atom.md.

THE GOVERNING IMAGE: the dark round field of Marsden's microscope, where one flash of light appears. Every scene is seen as, through, or
out of a circle: the eyepiece ↔ the atom ↔ the ivory ball ↔ the pudding ↔ the medal ↔ the stadium bowl ↔ your palm — and back to the eyepiece.
THREE MOTIFS that come back changed: (1) THE FLASH — a mystery (cold), a fact (clue II), an impossibility (clue III), the nucleus as a point
of light (clue IV), the last flash (close). (2) THE TALLY — five-bar strokes kept by the counters; the last stroke is drawn in red.
(3) THE BALL — solid ivory ball → cracked → pudding → empty stadium → your own hand → a figure of dots."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')); from _lines_common import write
ROWS, CONCEPTS = [], []
def R(sec, text, src, in_, cam, comp, life, set_, new, stock, how, frm, to, reads, focus, acts, mood, alt, note=''):
    see = to[0].upper() + to[1:] + '.'
    beats = ' | '.join(f'+{a:.1f} {s}' for a, s in acts)
    X = {'reads': reads, 'focus': focus, 'becomes': {'from': frm, 'to': to, 'how': how, **({'note': note} if note else {})}, 'acts': [list(a) for a in acts], 'mood': mood}
    ROWS.append((sec, text, src, in_, how, cam, comp, life, set_, new, stock, see, beats, X)); CONCEPTS.append((len(ROWS) - 1, text, alt))

# ======================================================================== COLD STORY — a flash in the dark (the hook)
R('COLD', "In 1909, in a darkened room in Manchester, a twenty-year-old student sat staring through a microscope at a tiny screen, waiting for flashes of *light*.", 'F3 F4 F13',
  'ink-on', 'push', 'left-third-medium', ['dust'], 'dark-room-microscope', ['ManchesterDarkLab', 'ScatterApparatus'], ['R-01', 'R-02'],
  'spot', 'the black page', 'a pool of lamplight on a bench in a dark room: Marsden bent over the brass microscope of the scattering box',
  'A young man in a dark room is looking very hard into a microscope, waiting.', 'the young man’s eye at the microscope (the lit centre)',
  [(0, 'a match is struck; the shaded lamp’s flame takes'), (1.6, 'the pool of light spreads: bench, glassware, the scattering box ink on'), (3.4, 'Marsden inks on, sitting'),
   (5.2, 'he leans in to the eyepiece (sit → sitlook)'), (7.0, 'note “Manchester, 1909” is written on the dark wall'), (8.6, 'the lamp is turned down; the camera pushes to the eyepiece')],
  'mystery', 'A: the lab drawn whole, lit · B: a single eye opening in darkness · C: the black page is a dark room, and a struck match finds the student in it — PICK C (the film begins in the dark it is about)')
R('COLD', "Each flash was a single particle, smaller than an atom, striking the *screen*.", 'F4',
  'focus', 'push', 'centre-large', ['sparks'], None, ['ZincScreenField'], [],
  'through', 'the brass eyepiece', 'the round dark field of the microscope: a grey-green screen where single points of light flare and fade',
  'Inside the microscope you see tiny flashes, one at a time.', 'each flash as it lands',
  [(0, 'we go through the eyepiece (it grows around us)'), (1.4, 'a first flash, faint, lower left'), (2.4, 'a second, upper right'), (3.4, 'a third'), (4.4, 'a fourth, nearer the middle')],
  'mystery', 'A: a particle drawn travelling to the screen · B: fireflies in a night field · C: through the eyepiece into its dark field — PICK C (the governing image)')
R('COLD', "His job was to count them. And on that screen, he saw something that should have been *impossible*.", 'F4 F5',
  'quill', 'hold', 'split-two', ['sparks'], 'flash-on-the-wrong-side', ['TallySheet'], [],
  'hand-over', 'the dark field filling the frame', 'the field slides to the left; Marsden’s hand keeps a tally on a sheet beside it, until one flash lands on the wrong edge',
  'Every flash gets a pencil stroke — then one flash is somewhere it should not be.', 'the flash on the far edge, ringed in red',
  [(0, 'the field glides left; a tally sheet slides in under a hand'), (1.2, 'flash → a pencil stroke'), (2.2, 'flash → stroke'), (3.2, 'flash → stroke'), (4.2, 'flash → the fifth stroke crosses the gate'),
   (5.4, 'a brighter flash on the far edge of the field'), (6.4, 'a red ring is drawn round it')],
  'tension', 'A: Marsden writing at a desk · B: a gate-keeper counting sheep, one jumps the wrong way · C: each flash in the field becomes a stroke on the sheet — PICK C (cause and record side by side)')
R('COLD', "Some of the particles were bouncing straight *back*.", 'F5',
  'iris', 'ride', 'diagonal', ['photons'], None, ['GoldFoilFrame'], [],
  'trace-to', 'the ringed flash', 'a gold line runs back from the flash to a thin gold leaf in its frame, where a particle arrives and rebounds',
  'The flash came from a particle that hit the gold and came back.', 'the particle turning round at the leaf',
  [(0, 'a gold trace runs back from the flash'), (1.0, 'it arrives at a gold leaf in its frame'), (1.6, 'a particle streaks in at the leaf'), (2.4, 'it rebounds straight back (ripple at the leaf)')],
  'tension', 'A: the apparatus in section with one path drawn · B: a ball off a wall · C: follow the flash backwards along its own path to the gold — PICK C (the cause is found by tracing the effect)')
R('COLD', "It was like throwing stones into a cloud of mist… and having one come flying back at *you*.", '-',
  'drop', 'pull', 'wide-landscape', ['dust'], 'stone-from-the-mist', ['MistHillside'], [],
  'solid-morph', 'the thin gold leaf', 'a bank of mist on a moorland hillside; stones vanish into it, and one flies back out at us',
  'You throw stones into fog; they vanish — but one comes back at you.', 'the stone that comes back',
  [(0, 'the gold leaf swells and greys into a bank of mist'), (1.8, 'an arm throws a stone; it vanishes into the mist'), (3.2, 'a second stone vanishes'), (4.6, 'a third — and it flies back out'), (5.8, 'it grows toward the camera')],
  'tension', 'A: Rutherford saying it · B: stones and mist (Claude’s own image, not a quotation) · C: the foil itself becomes the mist — PICK B+C (the foil turns into the metaphor in place)')
R('COLD', "That one surprise would tell us what an atom really looks like inside. So how do you see inside something nobody can *see*?", '-',
  'ink-bleed', 'orbit', 'centre-medium', ['boil'], 'question-atom-blank', ['DottedAtom'], [],
  'echo', 'the stone flying at the camera, a round dark disc', 'a dotted circle on blank paper — an atom with nothing drawn inside, and a quill that cannot begin',
  'An atom is a circle we cannot fill in.', 'the empty inside of the circle',
  [(0, 'the stone’s round silhouette becomes a dotted circle'), (1.6, 'the dots ink round the circle'), (3.2, 'a quill comes to draw inside — and stops'), (4.8, 'a question mark is written inside, then fades'),
   (6.4, 'the circle turns slowly'), (8.0, 'the quill hovers, lifts away')],
  'mystery', 'A: an atom in a textbook · B: a locked box · C: the stone’s disc becomes the outline of an atom — PICK C (the circle motif begins)')
# ======================================================================== THE STAKES
R('STAKES', "Atoms are small beyond imagining. Hundreds of thousands of them, side by side, would fit across a single *hair*.", 'F8 F15',
  'grow', 'pull', 'centre-large', ['dust'], 'atoms-across-a-hair', ['HairSection'], [],
  'shrink-into', 'the dotted atom', 'one bead in a row of atoms that runs across a human hair, seen in section',
  'A single hair is wider than a huge line of atoms.', 'the row of beads across the hair',
  [(0, 'the circle shrinks into a bead'), (1.4, 'more beads line up either side'), (2.8, 'the camera pulls back: the row is a hairline'), (4.4, 'the hair’s section inks on round it, scales and all'),
   (6.0, 'label “one human hair”'), (7.2, 'the row keeps extending')],
  'curious', 'A: a ruler with tiny marks · B: grains of sand across a road · C: the atom shrinks into its place in a row across a hair — PICK C (scale through a thing everyone holds)')
R('STAKES', "No microscope can show you what is inside one. Light itself is far too coarse to make out the *details*.", '-',
  'wipe', 'hold', 'right-third-medium', ['photons'], 'light-too-coarse', ['LightSwell'], [],
  'ripple-through', 'the row of atoms across the hair', 'one atom alone, and a long swell of light rolling over it like an ocean wave over a pebble',
  'A wave of light is far too big to feel the shape of one atom.', 'the crest of the light wave passing over the atom',
  [(0, 'the hair falls away; one atom stays'), (1.2, 'a long wave of light rolls in from the left'), (3.0, 'its crest passes right over the atom — nothing changes'), (4.8, 'a bracket marks one wavelength, far wider than the atom'),
   (6.4, 'the next crest rolls over')],
  'curious', 'A: a microscope with a blurred view · B: a finger trying to read tiny braille · C: the light itself drawn as a swell rolling over the atom — PICK C (the cause, not the result)')
R('STAKES', "For most of history, atoms were just an idea: the smallest pieces of matter, solid little balls that could not be cut *apart*.", '-',
  'drop', 'push', 'three-in-a-row', ['boil'], 'billiard-ball-atoms', ['IvoryBalls'], [],
  'solid-morph', 'the tiny atom under the wave', 'three polished ivory balls clicking together on green baize; a knife glances off one',
  'People thought atoms were tiny hard balls you could never cut.', 'the ball the knife fails to cut',
  [(0, 'the atom swells into a polished ivory ball'), (1.6, 'two more roll in and click'), (3.4, 'a knife comes down on one'), (4.6, 'it glances off (spark)'),
   (6.2, 'note “indivisible” in an old hand'), (7.8, 'one ball rolls a little and stops')],
  'mystery', 'A: Democritus in a garden · B: marbles in a bag · C: the atom becomes the hard ball people imagined — PICK C (the ball motif begins)')
R('STAKES', "So how could anyone find out what was inside one, when nobody could ever *look*?", '-',
  'focus', 'push', 'centre-small', ['boil'], None, [], [],
  'spot', 'three balls on the baize', 'the light narrows to one ball; a magnifying glass passes over it and shows only its own shine',
  'Even magnified, the ball shows only its surface.', 'the single ball in the spotlight',
  [(0, 'the light narrows to one ball'), (1.4, 'a magnifying glass slides over it'), (2.8, 'under the glass: only the ball’s shine, bigger'), (4.2, 'the glass moves off'), (5.2, 'the ball turns; the highlight slides')],
  'mystery', 'A: a closed door · B: an X-ray that shows nothing · C: the spotlight and the glass find nothing but a surface — PICK C')
R('STAKES', "The very word comes from ancient Greek: atomos, meaning *uncuttable*.", '-',
  'quill', 'hold', 'centre-medium', ['boil'], None, ['AtomosPapyrus'], [],
  'travel-line', 'the ball’s round outline', 'the Greek word ἄτομος lettered in ink on a scrap of papyrus, underlined by that same line',
  'The word “atom” means “cannot be cut”.', 'the Greek word as it is written',
  [(0, 'the ball’s outline unwinds into a line that runs left'), (1.2, 'it lays itself under a papyrus scrap as an underline'), (1.8, 'a quill letters ἄτομος'), (3.4, 'note “uncuttable”')],
  'curious', 'A: a Greek philosopher speaking · B: a knife and a crumb · C: the ball’s outline becomes the underline of the word — PICK C')
R('STAKES', "Two centuries ago, chemists like John Dalton used atoms to explain how substances combine — but they still pictured them as tiny, solid *spheres*.", 'F14',
  'unroll', 'pan', 'left-third-medium', ['boil'], 'dalton-spheres', ['DaltonPlate'], [],
  'page-turn', 'the papyrus scrap', 'a page of Dalton’s 1808 symbols — circles with dots and crosses — whose circles harden into wooden spheres',
  'A chemist drew atoms as circles that join up; they were still solid balls.', 'two symbols joining into one compound',
  [(0, 'the papyrus page turns over'), (1.4, 'Dalton’s circles ink on, one by one'), (3.4, 'two of them glide together and join'), (5.2, 'plate “John Dalton, 1808”'),
   (6.8, 'the circles fill and harden into wooden spheres'), (8.4, 'the spheres click together')],
  'mystery', 'A: Dalton at his desk · B: Lego bricks · C: his own symbols harden into balls — PICK C (true to his page)')
R('STAKES', "The answer to what is really inside came in four steps: a crack in the ball, a cloud of flashes, a bounce… and an empty *stadium*.", '-',
  'assemble', 'hold', 'four-in-a-row', ['boil'], 'four-medallions', ['ClueMedallions'], [],
  'split', 'one wooden sphere', 'four engraved medallions in a row: a cracked ball, a spray of flashes, a rebound, an empty stadium',
  'The story has four steps, each a little picture.', 'each medallion as it is named',
  [(0, 'the sphere splits into four discs'), (1.6, 'medallion I: a cracked ball inks on'), (3.4, 'medallion II: flashes'), (5.2, 'medallion III: a rebounding path'), (7.4, 'medallion IV: an empty stadium'),
   (9.0, 'the four close together into a ring (the title card follows)')],
  'curious', 'A: a list of chapters · B: four doors · C: the ball splits into the four clues — PICK C (the journey is made of the ball)')
# ======================================================================== CLUE I — A CRACK IN THE BALL
R('CLUE1', "Our first clue is a *crack*.", '-',
  'bloom', 'rack', 'top-centre-small', ['boil'], None, [], [],
  'bloom-out', 'the title card', 'the clue title “Clue I · A Crack in the Ball”, with a hairline crack running under it',
  'Chapter one: a crack.', 'the crack running under the title',
  [(0, 'the title card gathers into a point; the clue tag turns gold'), (0.8, 'the clue title is written'), (1.8, 'a hairline crack runs under it')],
  'curious', 'A: a title alone · B: a cracking egg · C: the title itself cracks — PICK C')
R('CLUE1', "In 1897, in Cambridge, J. J. Thomson was studying the strange glowing rays inside glass tubes emptied of *air*.", 'F1',
  'unroll', 'pan', 'wide-room', ['flicker'], 'cathode-glow-lab', ['CavendishBench', 'CathodeTube'], ['P-03', 'R-03'],
  'unroll', 'the crack under the title', 'a Victorian laboratory bench: Thomson’s long glass tube glowing faint green, Thomson leaning over it, his portrait pinned',
  'A scientist watches a glowing beam inside a glass tube.', 'the green glow in the tube',
  [(0, 'the crack opens and the lab unrolls downward'), (1.6, 'the tube’s far end begins to glow green'), (3.0, 'Thomson inks on, leaning to look'), (4.6, '★P-03 his portrait slides in on a cabinet card'),
   (6.2, 'note “Cambridge, 1897”'), (7.4, 'the glow pulses')],
  'curious', 'A: the tube alone in close-up · B: lightning in a bottle · C: the crack opens like a scroll onto the lab — PICK C')
R('CLUE1', "His glass tube was the ancestor of the old television screen. But what *were* the rays?", '-',
  'focus', 'hold', 'right-third-medium', ['flicker'], 'tube-to-television', ['OldTelevision'], [],
  'outline-morph', 'the bulb of the cathode-ray tube', 'the outline of a 1950s television set, its screen glowing, which morphs back into the tube',
  'This tube is the great-grandfather of the old TV.', 'the glowing screen',
  [(0, 'the tube’s outline swells into a television cabinet'), (1.6, 'the screen glows with scan lines'), (3.4, 'it shrinks back into the tube'), (5.0, 'a question mark hangs on the beam')],
  'playful', 'A: a modern TV beside the tube · B: a family watching TV · C: the tube’s outline becomes the TV and back — PICK C (a real descendant)')
R('CLUE1', "With magnets and charged plates, he bent the rays and weighed them. They were made of particles — and those particles were far lighter than any *atom*.", 'F1',
  'slide', 'push', 'centre-large', ['photons'], 'bent-beam', ['CathodeTube'], [],
  'rack-focus', 'the whole bench', 'inside the tube: the thin green beam bending as a horseshoe magnet comes near, then as the plates are charged',
  'A magnet bends the beam, so the beam is made of light little charged bits.', 'the beam as it bends',
  [(0, 'focus moves from the bench into the tube'), (1.4, 'a horseshoe magnet glides near'), (2.6, 'the beam bends down'), (4.2, 'the plates are charged (+ / −)'), (5.6, 'the beam bends back up'),
   (7.2, 'a tiny balance: one speck against one atom — the atom sinks'), (8.8, 'note “far lighter than an atom”'), (10.0, 'the spot on the glass moves')],
  'curious', 'A: Thomson writing figures · B: a garden hose bent by wind · C: the camera racks into the tube and we watch it bend — PICK C (cause on screen)')
R('CLUE1', "He had found the electron: a piece of an atom. So atoms were not solid balls after all. They had *parts*.", 'F1',
  'tear-in', 'hold', 'centre-medium', ['tremble'], 'ball-cracks', ['IvoryBalls'], [],
  'swarm', 'the beam’s specks', 'the ivory ball again — it cracks, and tiny dark specks spill from the crack',
  'The “solid” atom has bits that come out of it.', 'the crack and the spilling specks',
  [(0, 'the beam’s specks stream out and gather into the ivory ball'), (1.8, 'the ball inks on'), (3.0, 'a crack runs across it'), (4.4, 'specks spill out of the crack'), (6.0, 'label “electrons”'), (7.4, 'a last speck rolls away')],
  'curious', 'A: the word electron · B: a nut cracked open · C: the specks from the beam fly back into the ball and crack it — PICK C (the ball motif changes)')
R('CLUE1', "Electrons carry a negative electric charge. But atoms as a whole are neutral. So somewhere inside, there had to be positive charge to *balance* them.", 'F2',
  'assemble', 'hold', 'split-two', ['boil'], 'charge-balance', ['ChargeBalance'], [],
  'merge', 'the spilled specks', 'a brass balance: minus signs on one pan, question marks on the other, and it hangs level',
  'Something positive must balance the negative electrons.', 'the beam of the balance coming level',
  [(0, 'the specks fly together into a brass balance'), (1.6, 'minus signs drop on the left pan; it sinks'), (3.6, 'note “neutral”'), (5.0, 'question marks fill the right pan'), (6.8, 'the balance swings level'),
   (8.4, 'the question marks turn into faint plus signs')],
  'curious', 'A: + and − signs on paper · B: a see-saw with children · C: the specks assemble the balance — PICK C')
R('CLUE1', "In 1904, Thomson proposed a picture: a soft ball of positive charge, with electrons dotted through it… like plums in a *pudding*.", 'F2',
  'drop', 'push', 'centre-large', ['breathe'], 'plum-pudding-atom', ['PlumPudding'], [],
  'pour', 'the plus signs on the pan', 'a Victorian pudding basin filling with soft pink batter, studded with dark plums, turned out on a plate',
  'Thomson’s atom: a soft pink ball with electrons stuck in it like plums.', 'the plums dotting into the pudding',
  [(0, 'the pan becomes a pudding basin'), (0.4, 'soft pink fills it like batter'), (2.8, 'plums drop in one by one'), (4.4, 'the pudding is turned out on a plate'), (6.0, 'plate “J. J. Thomson, 1904”'), (7.6, 'steam rises')],
  'warm', 'A: the textbook diagram · B: a raisin bun · C: the positive charge pours in like batter — PICK C (soft and spread: the idea itself)')
R('CLUE1', "Physicists liked it. It was tidy, it was sensible, and for a few years nothing contradicted it… *yet*.", '-',
  'slide', 'pan', 'left-third-medium', ['breathe'], 'pudding-in-textbooks', ['PuddingTextbook'], [],
  'shrink-into', 'the pudding on its plate', 'a textbook page with the pudding atom as its figure; the pages turn and the same figure returns, a small red mark in the margin',
  'For years every book showed the pudding.', 'the figure on each page',
  [(0, 'the pudding shrinks into a figure on a printed page'), (1.4, 'the page turns: the figure again'), (2.8, 'turns again'), (4.2, 'and again'), (5.6, 'a tiny red mark in the margin')],
  'warm', 'A: physicists nodding · B: a cake in a shop window · C: the pudding becomes the figure in every textbook — PICK C')
R('CLUE1', "It made sense. The charge was spread out evenly, soft and thin, all the way *through*.", 'F2',
  'bloom', 'hold', 'centre-medium', ['breathe'], None, ['PlumPudding'], [],
  'grow-out-of', 'the textbook figure', 'the pudding atom filling the page, cut in half: pink all the way through, electrons dotted evenly',
  'The positive part is spread evenly, like a jelly.', 'the even pink inside the cut',
  [(0, 'the figure grows out of the page'), (1.6, 'a knife cuts it in half'), (3.0, 'the halves part: even pink right through'), (4.6, 'the electrons jiggle in place'), (5.8, 'the even glow pulses once')],
  'warm', 'A: a label “evenly spread” · B: jam in a sponge · C: the figure grows and is cut open — PICK C (show the inside)')
R('CLUE1', "And if it was right, anything fired at an atom would pass straight through, barely *disturbed*.", 'F2',
  'ink-on', 'ride', 'left-to-right', ['photons'], 'pudding-stream', ['PlumPudding'], [],
  'stream-through', 'the cut pudding', 'a stream of tiny bullets passing through the pudding atom and out the other side, almost straight',
  'If the pudding is right, bullets go straight through it.', 'the stream passing through',
  [(0, 'bullets stream in from the left'), (1.2, 'they enter the pudding'), (2.4, 'they leave the far side, barely wiggled'), (4.0, 'more follow'), (5.4, 'label “barely disturbed”')],
  'warm', 'A: an arrow diagram · B: hail through a cloud · C: a live stream through the pudding — PICK C (new primitive: stream)')
# ======================================================================== CLUE II — FLASHES IN THE DARK
R('CLUE2', "Clue two: *flashes* in the dark.", '-',
  'stamp', 'rack', 'top-centre-small', ['sparks'], None, [], [],
  'light-change', 'the stream over the pudding', 'the page goes dark; the clue title “Clue II · Flashes in the Dark” with one flash beside it',
  'Chapter two: flashes in the dark.', 'the title, then the flash',
  [(0, 'the light goes down on the page'), (0.6, 'clue tag II'), (1.2, 'the title is written'), (2.2, 'a flash beside it')],
  'mystery', 'A: title alone · B: a lit window at night · C: the page goes dark — PICK C')
R('CLUE2', "In Manchester, Ernest Rutherford had a powerful tool: alpha particles — tiny, fast, heavy bullets shot out by radioactive *radium*.", 'F3 F12',
  'unroll', 'pan', 'wide-room', ['sparks'], 'manchester-lab', ['ManchesterLab', 'RadiumSource'], ['R-01'],
  'brush', 'the dark title page', 'Rutherford’s Manchester laboratory, painted in: benches, pumps, glass; Rutherford beside a lead block from which a tiny tube of radium spits sparks',
  'Rutherford has a source that fires tiny bullets.', 'the radium tube spitting sparks',
  [(0, 'the lab is painted in, stroke by stroke'), (2.2, 'Rutherford inks on'), (3.8, 'he lifts the lead lid (present)'), (4.6, 'the radium tube spits sparks'), (6.0, 'note “Manchester, 1908”'), (7.2, 'sparks again')],
  'curious', 'A: Rutherford portrait · B: a gun · C: the lab is brushed onto the dark page — PICK C')
R('CLUE2', "Rutherford, a farmer's son from New Zealand, had already won a Nobel Prize for his work on *radioactivity*.", 'F11',
  'drop', 'hold', 'right-third-medium', ['breathe'], 'farmer-to-nobel', ['NobelMedal', 'FlaxFarm'], [],
  'echo', 'the round glow of the radium', 'the gold Nobel medal turning over; beside it a small farm under hills in New Zealand',
  'He came from a farm in New Zealand and had won the Nobel Prize.', 'the gold medal',
  [(0, 'the round glow becomes a gold medal'), (1.6, 'the medal turns to show its face'), (3.2, 'a farm in the hills of Nelson inks on beside it'), (4.8, 'plate “Nelson, New Zealand”'), (6.4, '“Nobel Prize, 1908”')],
  'warm', 'A: a globe with a pin · B: a boy ploughing · C: the radium glow becomes the medal — PICK C+A (echo, then the farm)')
R('CLUE2', "Alpha particles are thousands of times heavier than electrons, and they shoot out of radium at around fifteen thousand kilometres a *second*.", 'F12',
  'iris', 'ride', 'centre-large', ['sparks'], 'real-alpha-tracks', ['AlphaBead'], ['V-01'],
  'real-reveal', 'the medal', 'real cloud-chamber footage in a round eyepiece: white alpha tracks shooting out; beside it a scale where one alpha outweighs a pile of electrons',
  'These are real tracks left by alpha particles — heavy and very fast.', 'the real tracks shooting across',
  [(0, '★V-01 real footage develops in an eyepiece where the medal was'), (1.4, 'tracks shoot across'), (2.6, 'a scale: one alpha bead drops on one pan'), (4.0, 'electron specks pour onto the other — it does not move'),
   (5.6, 'counter “×7,300”'), (7.4, 'a bead streaks across the frame'), (8.8, 'counter “15,000 km/s”')],
  'curious', 'A: a drawn bullet · B: a cannonball against feathers · C: the real tracks in a cloud chamber — PICK C (real stock as artefact)')
R('CLUE2', "What would happen if you fired them at a thin sheet of metal? He gave the job to his assistant, Hans Geiger, and to the young student Ernest *Marsden*.", 'F3',
  'slide', 'pan', 'two-figures', ['breathe'], 'two-in-the-dark', [], ['P-01'],
  'hand-over', 'the eyepiece of footage', 'Rutherford handing the radium box to Geiger; Marsden — the student of the opening — beside them; their real photograph pinned',
  'Rutherford gives the experiment to two men.', 'the box passing from hand to hand',
  [(0, 'Rutherford turns, holding up a sheet of metal (present)'), (1.8, 'it glints'), (3.4, 'Geiger walks in'), (5.0, 'Rutherford hands him the radium box'), (6.8, 'Marsden joins them'),
   (8.4, '★P-01 the real Manchester photograph pinned'), (10.0, 'names written under the figures')],
  'curious', 'A: a staff list · B: a relay baton · C: Rutherford literally hands the job over — PICK C')
R('CLUE2', "They fired a narrow beam of alpha particles at a sheet of gold, beaten so thin that light could almost shine through *it*.", 'F3',
  'grow', 'push', 'centre-large', ['photons'], 'gold-thinner-than-light', ['GoldLeafLamp'], [],
  'lift-off', 'the pinned photograph and the three men', 'a gold leaf held up to a lamp in tweezers, glowing green-gold through its thinness, a narrow beam aimed at it',
  'The gold is so thin that lamplight shines through it.', 'the leaf glowing in the lamplight',
  [(0, 'the photograph lifts off the page'), (1.2, 'tweezers raise a gold leaf'), (2.6, 'a lamp behind it lights up'), (3.6, 'light shines through: the leaf glows green'), (5.4, 'a narrow beam of beads streams at it'), (7.4, 'the leaf flutters')],
  'curious', 'A: a sheet of metal on a bench · B: a soap film · C: the real behaviour of gold leaf, lit from behind — PICK C')
R('CLUE2', "The beam passed through a narrow slit inside a box pumped empty of air, so that nothing but the gold could get in its *way*.", 'F4',
  'ink-on', 'pan', 'cross-section', ['photons'], 'vacuum-box-section', ['ScatterApparatus'], ['R-02'],
  'shrink-into', 'the gold leaf', 'the scattering box in cut-away: source, slit, the gold leaf, the screen and the microscope; air pumped out',
  'Inside a sealed box with no air, the beam hits only the gold.', 'the beam threading the slit to the gold',
  [(0, 'the leaf shrinks into its place inside the box'), (1.4, 'the box inks on around it, cut away'), (3.2, 'the pump draws: air specks leave the box'), (5.0, 'the beam threads the slit'), (6.6, 'labels source · gold · screen'),
   (8.2, '★R-02 the 1913 figure in a loupe')],
  'curious', 'A: the box from outside · B: a bowling alley · C: the leaf drops into its true place in the apparatus — PICK C (true to the 1913 figure)')
R('CLUE2', "There were no electronic counters. The only way to detect each particle was a screen coated with zinc sulphide, which gave off a tiny flash when one *hit*.", 'F4',
  'focus', 'push', 'centre-large', ['sparks'], 'zinc-sulphide-close', ['ZincScreenField'], [],
  'through', 'the microscope of the apparatus', 'the screen close up: glittering zinc-sulphide crystals, and a particle landing as a flash',
  'Each particle makes a tiny flash where it hits the coated screen.', 'one crystal flashing',
  [(0, 'through the microscope to the screen'), (1.6, 'the crystals glitter'), (3.0, 'a particle lands: flash'), (4.6, 'another flash'), (6.0, 'label “zinc sulphide”'), (7.4, 'flash'), (9.0, 'flash'), (10.6, 'two flashes at once')],
  'mystery', 'A: a labelled diagram · B: rain on a pond · C: through the microscope onto the real screen — PICK C')
R('CLUE2', "So they sat in the dark until their eyes adjusted, and counted the flashes one by one, through a *microscope*.", 'F4',
  'wipe', 'hold', 'left-third-medium', ['sparks'], 'eyes-adjusting', ['DarkEye'], [],
  'sweep', 'the bright crystal field', 'a human eye in the dark, its pupil slowly widening, until the faint flashes appear in it',
  'In the dark the pupil opens wide, and the faint flashes become visible.', 'the pupil widening',
  [(0, 'darkness sweeps over the page'), (1.6, 'an eye opens in the dark'), (3.0, 'the pupil widens'), (4.6, 'faint flashes appear, reflected in it'), (6.2, 'a tally stroke'), (7.4, 'another')],
  'mystery', 'A: two men at the bench · B: a cat’s eye at night · C: the eye itself adjusting — PICK C (show the cause)')
R('CLUE2', "It was exhausting work. A person could only count accurately for a short time before the eyes had to *rest*.", 'F4',
  'blinds', 'hold', 'right-third-medium', ['breathe'], 'tally-and-swap', ['TallySheet'], [],
  'count-up', 'the eye', 'the tally sheet filling with strokes as a counter runs, while Marsden rubs his eyes and Geiger takes his place',
  'Counting flashes for long tires the eyes; they take turns.', 'the strokes filling the sheet',
  [(0, 'the strokes multiply; the counter runs'), (1.6, 'Marsden sits back and rubs his eyes'), (3.2, 'Geiger takes the eyepiece'), (5.2, 'the strokes go on'), (7.0, 'the counter keeps running')],
  'mystery', 'A: a clock · B: a sentry changing · C: the count running while the men swap — PICK C')
R('CLUE2', "Geiger later turned that drudgery into a machine that counted particles by itself — the Geiger counter, still clicking in labs *today*.", 'F12',
  'stamp', 'whip', 'centre-medium', ['sparks'], 'geiger-counter', ['GeigerCounter'], [],
  'whip', 'the tally sheet', 'a Geiger–Müller counter on a bench: its tube, its box and needle; the needle jumps with every click',
  'Geiger built a machine to do the counting.', 'the needle jumping',
  [(0, 'whip pan along the bench, across the years'), (1.2, 'the counter inks on'), (2.6, 'click — the needle jumps'), (3.8, 'click, click'), (5.4, 'plate “Geiger–Müller counter, 1928”'), (7.0, 'clicks'), (8.0, 'click')],
  'playful', 'A: a modern counter · B: a cash register · C: whip across the years to the machine — PICK C')
R('CLUE2', "Most particles flew straight through the gold, just as the pudding *predicted*.", 'F5',
  'iris', 'crane', 'diagonal', ['photons'], 'straight-through-foil', ['ScatterApparatus'], [],
  'crane', 'the Geiger counter', 'the gold leaf seen from above inside the box: a stream of particles passing straight through to the screen',
  'Almost all the particles go straight through the gold.', 'the stream passing through',
  [(0, 'crane up and over into the box'), (1.4, 'the stream passes the leaf straight'), (2.8, 'flashes at the middle of the screen'), (4.2, 'more pass')],
  'curious', 'A: a graph · B: wind through a net · C: crane into the box — PICK C')
R('CLUE2', "A few were nudged a little to one side. That was expected *too*.", 'F5',
  'focus', 'hold', 'centre-medium', ['photons'], None, [], [],
  'spot', 'the stream through the leaf', 'the light narrows to three paths that bend a few degrees as they cross the gold',
  'A few bend a little — no surprise.', 'the three bent paths',
  [(0, 'the light narrows'), (1.2, 'three paths bend a few degrees'), (2.6, 'their flashes land a little off-centre'), (4.0, 'label “nudged”')],
  'curious', 'A: an angle label · B: a ball off a pebble · C: a spotlight picks out the bent ones — PICK C')
# ======================================================================== CLUE III — THE ONE THAT CAME BACK
R('CLUE3', "Clue three: the one that came *back*.", '-',
  'bloom', 'rack', 'top-centre-small', ['sparks'], None, [], [],
  'bloom-out', 'the apparatus', 'the clue title “Clue III · The One That Came Back”, a path bending back under it',
  'Chapter three: one comes back.', 'the path bending back',
  [(0, 'everything gathers into one point; clue tag III'), (1.0, 'the title is written'), (2.0, 'a path runs under it and turns back')],
  'tension', 'A: title only · B: a boomerang · C: a path that turns back as the underline — PICK C')
R('CLUE3', "Rutherford suggested a small research for young Marsden: see if any particles bounced back toward the *source*.", 'F5',
  'slide', 'push', 'two-figures', ['breathe'], 'swing-the-microscope', ['ScatterApparatus'], [],
  'hand-over', 'the clue title', 'Rutherford pointing to the source side of the box; Marsden swinging the microscope round to it',
  'Rutherford says: look on the side the particles came from.', 'the microscope swinging round',
  [(0, 'Rutherford leans in and points'), (1.8, 'Marsden takes the microscope'), (2.8, 'it swings round toward the source'), (5.0, 'Marsden sits to look'), (6.4, 'Rutherford folds his arms')],
  'tension', 'A: a speech bubble · B: a dog fetching backwards · C: the microscope physically turns — PICK C (the action)')
R('CLUE3', "Rutherford did not expect any. An alpha particle was fast and heavy — a thin pudding of charge could never throw one *back*.", 'F2 F5 F12',
  'tear-in', 'hold', 'centre-medium', ['boil'], 'pudding-cannot-stop', ['PlumPudding'], [],
  'heat', 'the swung microscope', 'a pudding on its plate in the path of a speeding bullet: the bullet goes straight through, the pudding just wobbles',
  'A soft pudding cannot bounce a bullet back.', 'the bullet passing through the pudding',
  [(0, 'the scene shimmers into the pudding'), (1.6, 'a bullet streaks in'), (2.4, 'it passes straight through'), (3.4, 'the pudding wobbles'), (4.6, 'a second bullet streaks in'), (5.4, 'through it too'), (6.4, 'note “nothing comes back”'), (8.0, 'the pudding settles, untouched')],
  'tension', 'A: an arrow diagram · B: a stone through a cobweb · C: a real bullet through a pudding — PICK C (the film’s pudding, literal)')
R('CLUE3', "But some *did* come back.", 'F5',
  'stamp', 'push', 'centre-large', ['sparks'], 'rebound-flash', ['ZincScreenField'], [],
  'through', 'the wobbling pudding', 'the eyepiece field on the source side: a bright flash',
  'A flash — one came back!', 'the flash',
  [(0, 'through the eyepiece'), (0.8, 'FLASH on the source side'), (1.6, 'a ring spreads from it')],
  'tension', 'A: Marsden’s face · B: a bell · C: the eyepiece, a flash — PICK C (the cold open, now understood)')
R('CLUE3', "In 1909, Geiger and Marsden reported that about one in every eight thousand particles was thrown back from the *metal*.", 'F5',
  'unroll', 'push', 'right-third-large', ['boil'], 'paper-1909', [], ['D-01'],
  'real-reveal', 'the flash in the field', 'the real 1909 paper on the desk, the sentence with “1 in 8000” under a loupe and underlined in red',
  'Their published paper says: about 1 in 8,000 came back.', 'the underlined sentence',
  [(0, '★D-01 the real page develops where the flash was'), (1.8, 'a loupe slides over the sentence'), (3.2, 'the crop of the sentence fills the loupe'), (4.6, 'a red line underlines it'),
   (6.0, 'figure “1 in 8,000” in gold'), (7.4, 'the loupe glints')],
  'tension', 'A: the number alone · B: a lottery ticket · C: the real paper — PICK C (real stock, circled)')
R('CLUE3', "One in eight thousand sounds tiny. But for a pudding, it should have been *zero*.", 'F5',
  'grow', 'hold', 'split-two', ['tremble'], 'one-in-eight-thousand', ['DotField'], [],
  'swarm', 'the letters of the paper', 'eight thousand dots filling a field, one of them red; beside it the pudding with a red zero',
  'Of 8,000, one came back — the pudding allows none.', 'the one red dot',
  [(0, 'the printed letters lift off as grains'), (1.4, 'they settle as dots (counter to 8,000)'), (3.4, 'one dot turns red'), (4.6, 'the pudding inks on beside, with a red “0”'), (5.8, 'the red dot pulses')],
  'tension', 'A: a fraction · B: a needle in a haystack · C: the paper’s words become the 8,000 — PICK C')
R('CLUE3', "Rutherford had worked with alpha particles for years. He knew how heavy and fast they were. A whisper-thin film should never have turned one *around*.", 'F11 F12',
  'focus', 'push', 'right-third-medium', ['tremble'], 'rutherford-paces', [], [],
  'rack-focus', 'the field of dots', 'Rutherford at his desk with the tally; his pen stops; he stands and paces, holding the gold leaf up to the light',
  'Rutherford cannot believe it: it should not happen.', 'Rutherford’s face and the leaf',
  [(0, 'focus passes from the dots to Rutherford'), (1.4, 'he reads the tally'), (3.0, 'his pen stops'), (4.6, 'he stands (sit → think)'), (6.6, 'he paces'), (8.6, 'he holds up the gold leaf to the lamp')],
  'tension', 'A: a quote on a plate · B: a man staring at a broken rule · C: Rutherford acts his disbelief — PICK C (people act)')
R('CLUE3', "Years later, Rutherford described his shock. It was, he said, almost as incredible as if you fired a fifteen-inch shell at a piece of tissue paper… and it came back and hit *you*.", 'F6',
  'drop', 'ride', 'wide-landscape', ['dust'], 'shell-and-tissue', ['ShellAndTissue'], ['T-01'],
  'tilt', 'Rutherford holding up the leaf', 'on a shingle beach a naval gun fires a huge shell at a sheet of tissue paper on a frame — it bounces straight back at us',
  'Like a cannon shell bouncing off tissue paper.', 'the shell turning back',
  [(0, 'the camera tilts down from the leaf to a beach: a tissue sheet on a frame'), (1.8, 'a naval gun beside the shingle'), (3.4, 'it fires (smoke)'), (4.6, 'the shell flies'), (6.4, 'it meets the tissue — and stops'),
   (7.6, 'it flies back, growing toward the camera'), (9.4, '★T-01 his words on a plate'), (11.0, 'the tissue flutters'), (12.6, 'the shell fills the frame and fades')],
  'tension', 'A: Rutherford speaking in a lecture hall · B: a ping-pong ball off a wall · C: stage the shell and the tissue literally — PICK C (his own image, staged)')
R('CLUE3', "There was only one explanation. Inside the atom, there had to be something tiny, heavy, and fiercely *charged*.", 'F7',
  'iris', 'push', 'centre-large', ['photons'], 'nucleus-appears', ['NuclearAtom'], [],
  'echo', 'the shell coming at us, nose-on', 'the atom outline: the pudding dissolves out of it and a single bright point appears at its centre',
  'There must be a tiny, heavy, charged thing in the middle.', 'the bright point at the centre',
  [(0, 'the shell’s round nose becomes the atom outline'), (1.6, 'the pudding inside dissolves away'), (3.0, 'a pinpoint of light at the centre'), (4.6, 'a “+” beside it'), (6.0, 'a ring pulses out from it')],
  'tension', 'A: the word nucleus · B: a cherry stone in a cherry · C: the shell becomes the atom and leaves a point — PICK C (flash motif → nucleus)')
R('CLUE3', "Rutherford spent almost two years working out the mathematics of a single concentrated *charge*.", 'F7',
  'quill', 'hold', 'left-third-medium', ['flicker'], 'equations-by-lamplight', ['RutherfordDesk'], [],
  'brush', 'the bright point', 'Rutherford at his desk at night under a lamp, writing sums; a curve sketched on the page',
  'He works it out on paper, night after night.', 'the pen and the curve',
  [(0, 'the desk at night is painted in'), (1.6, 'his pen writes lines of sums'), (3.2, 'a page is turned'), (4.4, 'a curve is sketched round a dot'), (5.6, 'the lamp flickers')],
  'curious', 'A: a calendar · B: a puzzle box · C: the night desk painted around the point — PICK C')
R('CLUE3', "Most particles missed it entirely. But the rare one that came close was flung *aside* — or straight back.", 'F7',
  'grow', 'hold', 'centre-large', ['photons'], 'hyperbola-fan', ['NuclearAtom'], [],
  'grow-out-of', 'the sketched curve', 'many particle paths around one nucleus, computed true: far ones straight, near ones bent, one turned straight back',
  'Far paths stay straight; close ones bend; a head-on one bounces back.', 'the one that turns back',
  [(0, 'the curve grows out of the page into the fan'), (1.4, 'far paths pass straight'), (2.8, 'a nearer one bends'), (4.2, 'a near one swings wide'), (5.6, 'a head-on one turns straight back'), (7.0, 'more pass')],
  'curious', 'A: an angle diagram · B: comets round the Sun · C: the paths drawn true (Rutherford’s hyperbolas) — PICK C (stream on true paths)')
R('CLUE3', "Then Geiger and Marsden counted again, angle by angle, and the flashes matched his formula *exactly*.", 'F7 F16',
  'ink-on', 'push', 'centre-medium', ['sparks'], 'counts-meet-curve', ['ScatterGraph'], [],
  'travel-line', 'the paths of the fan', 'a graph: one line runs out of the fan and becomes the curve of the formula; counted points land on it',
  'The counts at each angle sit on the predicted curve.', 'each point landing on the curve',
  [(0, 'a path leaves the fan and lays itself down as the curve'), (1.6, 'axes ink on: angle · flashes'), (2.6, 'a point lands on the curve'), (3.4, 'another'), (4.2, 'another'), (5.0, 'plate “Geiger & Marsden, 1913”'), (6.2, 'the last point lands')],
  'triumph', 'A: a tick and “correct” · B: darts in a bullseye · C: the path becomes the curve — PICK C')
# ======================================================================== CLUE IV — THE PEA IN THE STADIUM
R('CLUE4', "Clue four: an empty *stadium*.", '-',
  'stamp', 'rack', 'top-centre-small', ['dust'], None, [], [],
  'sweep', 'the graph', 'the clue title “Clue IV · The Pea in the Stadium”',
  'Chapter four: an empty stadium.', 'the title',
  [(0, 'the graph is washed off the page'), (0.6, 'clue tag IV'), (1.2, 'the title is written')],
  'wonder', 'A: title only · B: an empty field · C: the page washed clean — PICK C')
R('CLUE4', "In 1911, Rutherford published his conclusion. Almost all of an atom's mass, and all its positive charge, are packed into a tiny centre: the *nucleus*.", 'F7',
  'unroll', 'push', 'right-third-large', ['boil'], 'nucleus-named', ['NuclearAtom'], ['D-02'],
  'unroll', 'the clue title', 'the real 1911 paper unrolled on the desk; beside it the atom, all its weight flowing into one point labelled “nucleus”',
  'Rutherford’s 1911 paper: nearly all the atom is in a tiny centre.', 'the weight flowing into the centre',
  [(0, '★D-02 the 1911 paper unrolls'), (1.8, 'a red circle round its title'), (3.4, 'beside it the atom: its weight flows into the centre'), (5.6, 'a “+” on the point'), (7.2, 'label “nucleus”'), (8.8, 'the point glints')],
  'wonder', 'A: the word on a slate · B: a fruit stone · C: the paper and the mass pouring inward — PICK C')
R('CLUE4', "The electrons move around it, far out. And between them and the nucleus there is… *nothing*.", 'F7 F8',
  'wipe', 'pull', 'centre-large', ['breathe'], 'empty-between', ['NuclearAtom'], [],
  'dive', 'the nucleus close up', 'the camera falls back through emptiness until a faint haze of electrons appears at the far rim',
  'Between the centre and the electrons: empty space.', 'the emptiness growing',
  [(0, 'the camera falls back from the nucleus (geometric)'), (1.6, 'it shrinks to a point'), (3.0, 'the electron haze appears at the rim'), (4.6, 'note “nothing”'), (5.6, 'a speck drifts')],
  'wonder', 'A: a diagram with labels · B: an empty room · C: fall back through the true emptiness — PICK C (scale jump)')
R('CLUE4', "Even hydrogen, the simplest atom of all, is mostly emptiness: one electron, far from a nucleus made of a single *proton*.", 'F17',
  'focus', 'hold', 'centre-medium', ['breathe'], 'lonely-hydrogen', ['NuclearAtom'], [],
  'outline-morph', 'the haze at the rim', 'the hydrogen atom: one point at the centre, one electron cloud far out, labelled',
  'Hydrogen: one proton in the middle, one electron far out.', 'the single electron',
  [(0, 'the haze outline tightens into hydrogen’s cloud'), (1.8, 'label “hydrogen”'), (3.2, 'the electron swirls'), (5.0, 'label “one proton”'), (6.6, 'label “one electron”'), (8.0, 'it swirls')],
  'wonder', 'A: H on a periodic table · B: a lone planet · C: the haze tightens into hydrogen — PICK C')
R('CLUE4', "How empty? The nucleus is about a hundred thousand times smaller across than the atom *itself*.", 'F8',
  'grow', 'hold', 'centre-large', ['breathe'], 'times-100000', [], [],
  'count-up', 'the hydrogen atom', 'a gold ruler across the atom; a counter runs up to ×100,000 while the nucleus stays a dot',
  'The atom is 100,000 times wider than its nucleus.', 'the counter',
  [(0, 'a gold ruler runs across the atom'), (1.4, 'the counter runs'), (3.4, 'a tick marks the nucleus'), (4.8, '“×100,000” settles'), (5.8, 'the nucleus glints')],
  'wonder', 'A: a written ratio · B: a grain and a mountain · C: count it up along a ruler — PICK C')
R('CLUE4', "Picture an atom as big as a football stadium. The nucleus would be a pea on the centre *spot*.", 'F8',
  'rise', 'crane', 'wide-stadium', ['dust'], 'pea-in-the-stadium', ['EmptyStadium'], [],
  'shape-window', 'the round atom', 'an empty football stadium seen through an oval opening that widens to the whole frame; the nucleus becomes a green pea on the centre spot',
  'If the atom were a stadium, the nucleus would be a pea in the middle.', 'the pea on the centre spot',
  [(0, 'the atom’s circle becomes an oval opening onto a stadium'), (2.0, 'the stands rise and ink on'), (3.6, 'the nucleus becomes a pea'), (5.0, 'the camera cranes over the pitch'), (6.4, 'label “a pea”')],
  'wonder', 'A: a stadium photograph · B: a coin in a cathedral · C: the atom opens into the stadium — PICK C (the ball motif → stadium)')
R('CLUE4', "The electrons would be specks of dust drifting around the highest seats. And everything in between would be *empty*.", 'F8',
  'drop', 'ride', 'wide-stadium', ['dust'], 'dust-in-the-stands', ['EmptyStadium'], [],
  'crane', 'the pea on the pitch', 'the camera rises to the top rows: specks of dust drift there; the vast bowl below is empty',
  'The electrons are dust in the top seats; the rest is empty.', 'the dust specks',
  [(0, 'the camera rises to the top rows'), (1.6, 'specks of dust drift in the light'), (3.2, 'one speck circles the rim'), (5.0, 'the empty bowl below'), (6.6, 'label “electrons”')],
  'wonder', 'A: arrows to labels · B: moths round a lamp · C: rise to the top seats — PICK C')
R('CLUE4', "Every chemical reaction — every flame, every breath — happens out at the edges, among the electrons. The nucleus sits untouched at the *centre*.", 'F18',
  'bloom', 'hold', 'centre-medium', ['embers'], 'flame-at-the-rim', ['EmptyStadium'], [],
  'light-change', 'the stands by day', 'dusk in the stadium: a candle flame and a breath of mist at the rim among the specks, while the pea sits dark and still',
  'Flames and breath happen at the edge; the centre is untouched.', 'the flame at the rim',
  [(0, 'dusk falls on the stadium'), (1.8, 'a flame lights at the rim'), (3.6, 'a breath of mist at another'), (5.4, 'sparks pass between specks'), (7.2, 'the light narrows on the still pea'), (8.8, 'a speck drifts past the flame')],
  'calm', 'A: a chemistry set · B: sparks at a fence · C: the stadium at dusk, the edge alive — PICK C')
R('CLUE4', "Later, in 1932, James Chadwick found the other passenger in the nucleus — the neutron — completing the *picture*.", 'F9',
  'slide', 'push', 'right-third-medium', ['boil'], 'pea-of-beads', ['NucleusBeads'], [],
  'dive', 'the pea at dusk', 'down into the pea: it is a cluster of beads of two kinds; James Chadwick at his bench in a round window beside it',
  'The centre is made of two kinds of bead: protons and neutrons.', 'the cluster of beads',
  [(0, 'we dive into the pea'), (1.6, 'it resolves into beads of two kinds'), (3.2, 'a round window: Chadwick at his bench'), (4.8, 'plate “James Chadwick, 1932”'), (6.2, 'the neutral beads glint')],
  'wonder', 'A: a Nobel medal · B: a bag of marbles · C: dive into the pea — PICK C')
# ======================================================================== THE TWIST
R('TWIST', "Now look at your own *hand*.", '-',
  'iris', 'push', 'centre-large', ['breathe'], 'your-hand', ['OpenHand'], [],
  'whip', 'the nucleus of beads', 'a hand, palm up, filling the frame',
  'Your own hand.', 'the hand opening',
  [(0, 'a fast pan from the nucleus to a hand'), (1.2, 'the fingers open')],
  'tension', 'A: a mirror · B: a glove · C: whip to the viewer’s hand — PICK C')
R('TWIST', "It is made of atoms, and every one of them is almost entirely empty space. So why does it feel so *solid*?", 'F10',
  'bloom', 'push', 'centre-large', ['dust'], 'hand-to-atom', ['OpenHand', 'SkinCells'], [],
  'dive', 'the palm', 'down through the skin of the palm: cells, then a lattice of molecules, then one atom — nearly empty',
  'Your hand, deep down, is mostly empty space.', 'the empty atom at the bottom of the dive',
  [(0, 'the dive into the palm begins'), (1.6, 'skin ridges'), (3.0, 'cells'), (4.6, 'a lattice of molecules'), (6.2, 'one atom: a point and a haze'), (7.8, 'a question mark')],
  'tension', 'A: a microscope slide · B: a sponge · C: the true dive, scale by scale — PICK C')
R('TWIST', "Press it on a table. Why doesn't it sink straight *through*?", 'F10',
  'slide', 'hold', 'split-two', ['tremble'], 'hand-on-table', ['HandOnTable'], [],
  'tilt', 'the empty atom', 'the hand above an oak table, pressing down on it',
  'The hand presses the table and does not pass through.', 'the palm meeting the wood',
  [(0, 'tilt back up to the hand over a table'), (1.4, 'it lowers'), (2.6, 'it presses — the knuckles whiten'), (3.8, 'it stops at the surface')],
  'tension', 'A: a sign “why?” · B: a ghost through a wall · C: do it — PICK C')
R('TWIST', "Because the electrons on the outside of your atoms push hard against the electrons of the table's *atoms*.", 'F10',
  'grow', 'push', 'centre-large', ['ripple'], 'electron-cushion', ['ElectronCushion'], [],
  'spot', 'the palm on the wood', 'the gap between skin and wood, magnified: two hazes of electrons meet and push each other apart',
  'Electrons of the hand and table push each other away.', 'the two hazes pressing',
  [(0, 'the light narrows to the line where they meet'), (1.4, 'two hazes meet'), (3.0, 'curved lines push apart'), (4.6, 'they bulge back'), (6.2, 'ripples')],
  'tension', 'A: + − arrows · B: two balloons pressed together · C: the gap magnified, the hazes pushing — PICK C')
R('TWIST', "What you feel as touch is that push. In a sense, you have never truly touched *anything*.", 'F10',
  'wipe', 'pull', 'centre-medium', ['breathe'], 'never-touched', ['HandOnTable'], [],
  'ink-bleed', 'the two hazes', 'the hand on the table again, a thin gold gap glowing between palm and wood that never closes',
  'There is always a tiny gap: touch is a push.', 'the glowing gap',
  [(0, 'the hand and table bleed back in'), (1.6, 'a thin gap glows gold'), (3.2, 'the fingers press — the gap holds'), (5.0, 'note “never touched”')],
  'calm', 'A: a quote · B: magnets that repel · C: the gap stays visible — PICK C')
R('TWIST', "Even the hardest diamond and the heaviest gold are mostly empty *space*.", 'F10',
  'drop', 'pan', 'split-two', ['sparks'], 'diamond-and-gold-empty', ['DiamondAndIngot'], [],
  'split', 'the glowing gap', 'a cut diamond and a gold ingot side by side; through each, the sparse lattice of its atoms shows',
  'Even diamond and gold are mostly empty.', 'the lattice inside each',
  [(0, 'the gap splits into two objects'), (1.4, 'a diamond and an ingot ink on'), (2.6, 'a band sweeps across: their atoms show, sparse'), (4.2, 'the diamond glints')],
  'wonder', 'A: two words · B: a sieve · C: X-ray them in turn — PICK C')
R('TWIST', "You are solid, heavy and real — and yet you are built almost entirely of empty space, held together by electric *forces*.", 'F10',
  'grow', 'pull', 'centre-large', ['breathe'], 'person-of-space', ['StippleFigure'], [],
  'swarm', 'the atoms of diamond and gold', 'a standing human figure made only of sparse dots, faint lines of force flickering between them',
  'You are mostly empty, held together by electric forces.', 'the figure of dots',
  [(0, 'the dots fly up and settle as a standing figure'), (1.8, 'the figure is complete'), (3.4, 'its dots spread apart'), (5.2, 'lines of force flicker between them'), (7.0, 'the figure turns its head')],
  'awe', 'A: a body outline · B: a constellation of a person · C: the atoms gather into you — PICK C')
# ======================================================================== THE ANSWER
R('ANSWER', "So — what is inside an *atom*?", '-',
  'focus', 'push', 'centre-medium', ['dust'], None, ['DottedAtom'], [],
  'echo', 'the head of the dotted figure', 'the dotted circle of the opening returns, empty',
  'Back to the question.', 'the circle',
  [(0, 'the head becomes the dotted circle'), (1.4, 'a question mark inside')],
  'triumph', 'A: title · B: a door · C: the opening circle returns — PICK C (bookend)')
R('ANSWER', "A tiny, heavy nucleus at the centre, a haze of electrons far out… and between them, almost *nothing*.", 'F7 F8',
  'assemble', 'push', 'centre-large', ['breathe'], 'circle-filled-in', ['ClueMedallions', 'NuclearAtom'], [],
  'merge', 'the four clue medallions', 'the circle filled in: the four medallions fly in and become its parts — a point, a haze, an empty middle',
  'Answer: a tiny centre, electrons far out, and nothing between.', 'the circle filling',
  [(0, 'the four medallions fly into the circle'), (1.6, 'a point at the centre'), (3.0, 'a haze at the rim'), (4.6, 'label “almost nothing”'), (6.2, 'the point glints')],
  'triumph', 'A: a labelled diagram · B: a filled jigsaw · C: the clues become the parts of the circle — PICK C')
R('ANSWER', "We know because two young men sat in the dark, counting flashes, and refused to ignore the few that came *back*.", 'F4 F5',
  'ink-on', 'pan', 'two-figures', ['sparks'], 'counters-again', ['ManchesterDarkLab'], [],
  'shrink-into', 'the answered circle', 'the dark room of the opening: Geiger and Marsden at the microscope by lamplight',
  'Two men in the dark, counting.', 'the two figures at the microscope',
  [(0, 'the circle shrinks into the eyepiece in the dark room'), (1.8, 'Geiger and Marsden at the bench'), (3.6, 'a stroke on the tally'), (5.2, 'a flash'), (7.0, 'Marsden looks up')],
  'warm', 'A: their photograph · B: two lighthouse keepers · C: back to the opening room — PICK C (bookend)')
R('ANSWER', "Not by looking. By throwing things at it, counting what came back, and taking the strangest result *seriously*.", '-',
  'stamp', 'push', 'centre-large', ['sparks'], 'red-stroke', ['TallySheet'], [],
  'rack-focus', 'the two men', 'the tally sheet on the bench; its last stroke is drawn in red',
  'The method: throw, count, believe the odd result.', 'the red stroke',
  [(0, 'focus moves to the tally sheet'), (1.4, 'strokes counted off'), (3.2, 'a pencil draws one more'), (5.0, 'the last stroke in red'), (6.4, 'a ring round it')],
  'warm', 'A: the three verbs written · B: a fisherman’s net · C: the tally’s last stroke in red — PICK C (tally motif closes)')
# ======================================================================== WHAT IT MEANS
R('MEANING', "That discovery opened the door to nuclear power, to medical scans, to the physics of the *stars*.", '-',
  'rise', 'tilt-up', 'wide-sky', ['stars'], 'door-to-the-stars', ['CoolingTowers', 'ScannerRing'], [],
  'tilt', 'the tally sheet', 'rising up from the bench past a power station, a hospital scanner and the Sun, into a night full of stars',
  'From this came nuclear power, medical scans and the science of stars.', 'each vignette as we rise past',
  [(0, 'the camera tilts up off the bench'), (1.4, 'cooling towers steam'), (3.0, 'a scanner ring turns'), (4.6, 'the Sun burns'), (6.0, 'stars fill the sky')],
  'awe', 'A: three photographs · B: a door opening · C: one rise through all three — PICK C')
R('MEANING', "And it began with one student, one flash on the wrong side of a screen… and the courage to *believe* it.", '-',
  'iris', 'pull', 'centre-medium', ['sparks'], 'last-flash', ['ZincScreenField'], [],
  'through', 'one star in the night sky', 'the eyepiece in the dark again: one last flash on the wrong side',
  'It all began with one flash in the dark.', 'the last flash',
  [(0, 'one star grows and becomes the eyepiece field'), (1.6, 'the field is dark'), (3.2, 'the flash on the wrong side'), (4.8, 'a ring spreads'), (6.4, 'a red ring is drawn round it'), (7.8, 'the light goes down')],
  'awe', 'A: Marsden’s portrait · B: a candle · C: a star becomes the flash — PICK C (bookend, the flash motif closes)')

ROWS[13][13]['gap'] = 6.2   # the episode's title card plays in this breath (music only)
for i in (23, 36, 48, 57, 68): ROWS[i][13]['gap'] = 1.5   # a breath before each chapter
SRC = {'F1': 'S1 S2', 'F2': 'S1 S2', 'F3': 'S3 S4', 'F4': 'S4 S5 S6', 'F5': 'S4 S7', 'F6': 'S8 S9', 'F7': 'S3 S10', 'F8': 'S11 S12', 'F9': 'S1 S2', 'F10': 'S11 S13',
       'F11': 'S14 S15', 'F12': 'S16 S17', 'F13': 'S18 S19', 'F14': 'S1 S2', 'F15': 'S12 S13', 'F16': 'S6 S10', 'F17': 'S11 S13', 'F18': 'S11 S13'}
H = os.path.dirname(os.path.abspath(__file__))
if __name__ == '__main__':
    write(H, 'empty-atom', 'What is inside an atom?', ROWS, SRC,
          ['engine: `flash` — scintillations on a screen with a real afterglow (a point of light that blooms and fades), the film’s governing image',
           'engine: `stream` — particles flowing along computed paths (true Rutherford hyperbolas round a nucleus; straight through a pudding)',
           'a fall back through the true emptiness of an atom (nucleus → electron haze) and a dive from a palm to one atom'],
          {'file': '../studio/music/wonder_midnight_tale.wav', 'db': -24, 'start': 0},
          {'t': 300, 'title': 'You are mostly *empty*', 'kicker': 'Fathom'}, standard=5)
    out = ['# empty-atom — concept pass (CREATIVE.md §1) — generated by episodes/empty-atom/lines.py', '',
           '**Governing image:** the dark round field of Marsden’s microscope, where one flash of light appears; every scene is seen as, through or out of a circle',
           '(eyepiece ↔ atom ↔ ivory ball ↔ pudding ↔ medal ↔ stadium bowl ↔ palm ↔ eyepiece).', '',
           '**Motifs:** (1) the flash — mystery → fact → impossibility → the nucleus as a point of light → the last flash. (2) the tally — strokes; the last one red.',
           '(3) the ball — ivory ball → cracked → pudding → empty stadium → your hand → a figure of dots.', '',
           '| L | line | A literal · B metaphor · C transformation → pick |', '|---|---|---|']
    out += [f'| {i} | {t.replace("*", "")} | {a} |' for i, t, a in CONCEPTS]
    open(os.path.join(H, '../../../jobs/scripts/empty-atom_concepts.md'), 'w').write('\n'.join(out) + '\n'); print('→ jobs/scripts/empty-atom_concepts.md')
