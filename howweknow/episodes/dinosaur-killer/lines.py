#!/usr/bin/env python3
"""dinosaur-killer — "What killed the dinosaurs?" — script + v6 shot plan (standard 6, engine v8, directed v7).
python3 episodes/dinosaur-killer/lines.py → episode.json (+ jobs/scripts/dinosaur-killer_concepts.md); python3 tools/plan_md.py episodes/dinosaur-killer.
Facts: jobs/research/dinosaur-killer.md · chain: jobs/scripts/dinosaur-killer_chain.md · treatment: jobs/scripts/dinosaur-killer_treatment.md.

THE GOVERNING IMAGE: the thin line of clay in the rock — the last day of a world, one centimetre thick.
THE MOTIF (shape): the LINE — the clay layer, the needle off the scale, the half-ring traced by the survey, the food chain that snaps, the clay again.
ACCENT: vermilion — the clay line, the ring. NEW DEVICES (v8, FX.md §K): the stone book (RockBook: strata that open like pages), the iridium
needle that bends up through the roof (IridiumMeter), the grain whose shock lamellae etch in (ShockedGrain), the survey that draws a ring (SurveyRing)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')); from _lines_common import write
ROWS, CONCEPTS = [], []
def R(sec, text, src, in_, cam, comp, life, set_, new, stock, how, frm, to, reads, focus, acts, mood, alt, shot, light, sp=None, motif=None, note=''):
    see = to[0].upper() + to[1:] + '.'
    d = len(text.replace('*', '').split()) / 2.35; acts = list(acts); i = 0
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

# ======================================================================== COLD — the last evening (set piece 1)
R('COLD', "Sixty-six million years ago, on an evening like any other, a dinosaur lifted its head and looked up at the *sky*.", 'F8',
  'ink-on', 'push', 'right-third-large', ['sway'], 'last-evening', ['CretaceousDusk', 'Tyrannosaur'], [],
  'ink-on', 'the dark page', 'a Cretaceous shore at dusk: tree ferns, a lake, a great theropod lifting its head toward a darkening sky',
  'A dinosaur at dusk looks up at the sky.', 'the dinosaur’s raised head',
  [(0, 'dusk washes in over the page'), (1.4, 'ferns and cycads ink on'), (2.8, 'the theropod inks on, head low'), (4.4, 'it lifts its head'), (6.0, 'its eye catches the light')],
  'mystery', 'A: a museum skeleton · B: a calendar page · C: the living animal at its last dusk — PICK C (the moment before)', 'medium', 'low dusk sun from the right, gold', sp=1)
R('COLD', "Somewhere up there, far too faint to see, a mountain of rock was falling toward the Earth. Nothing on the planet could have known it was *coming*.", 'F3',
  'focus', 'tilt-up', 'centre-medium', ['stars'], None, ['CretaceousDusk'], [],
  'rack-focus', 'the dinosaur’s eye', 'the evening sky above the shore: among the first stars, one faint point that is not a star',
  'Something is falling toward Earth, too faint to see.', 'the faint point among the stars',
  [(0, 'focus pulls from the eye to the sky'), (1.6, 'the first stars prick out'), (3.2, 'one faint point, ringed in vermilion'), (4.8, 'it brightens a hair')],
  'mystery', 'A: an asteroid in space · B: a falling stone · C: from the eye to one point in its sky — PICK C', 'close', 'the last light of dusk; starlight', sp=1, motif='the line — a ring round one point')
R('COLD', "Soon afterwards the dinosaurs were gone, along with about three-quarters of all the kinds of plants and animals on the *planet*.", 'F9',
  'burn', 'pull', 'wide-landscape', ['embers'], 'world-burns-away', ['CretaceousDusk'], [],
  'heat', 'the faint point', 'the whole dusk shore burns away like a page, from the point outward, leaving paper and a few embers',
  'Most life vanished.', 'the burning edge eating the shore',
  [(0, 'the point flares'), (1.6, 'the page begins to burn from it'), (3.4, 'the shore, the trees, the dinosaur burn away'), (5.4, 'embers drift on bare paper'), (7.0, 'a counter: three in four kinds')],
  'sad', 'A: an explosion · B: a candle snuffed · C: the world burns away like an old page — PICK C (v8 burn, meaning: a world consumed)', 'wide', 'the ember glow of the burning edge')
R('COLD', "Nobody was there to see it. Nobody wrote it down. And yet today we can say what happened, and *where*.", '-',
  'drop', 'push', 'centre-large', ['dust'], 'museum-skeleton', ['MuseumSkeleton'], [],
  'grow-out-of', 'the embers on bare paper', 'a museum hall at night: the same dinosaur, now a skeleton on its iron mount, moonlight through a tall window',
  'All that remains is a skeleton; but we know what happened.', 'the skeleton’s skull in the moonlight',
  [(0, 'the embers gather into bones'), (1.6, 'the skeleton assembles on its mount'), (3.4, 'moonlight crosses the hall'), (5.0, 'it reaches the skull'), (6.6, 'a vermilion question mark on the label')],
  'mystery', 'A: a fossil dig · B: a crime scene · C: the bones of the same animal in a museum — PICK C (bookend)', 'medium', 'moonlight through a tall window, left')
R('COLD', "Its bones lie in museums today, still and silent. They can tell us what it looked like. They cannot tell us how its world *ended*.", '-',
  'wipe', 'push', 'right-third-large', ['dust'], None, ['MuseumSkeleton'], [],
  'spot', 'the skeleton', 'the moonlight narrows to the empty eye socket of the skull',
  'Bones cannot tell how the world ended.', 'the empty eye socket',
  [(0, 'the light narrows to the skull'), (1.6, 'the empty socket'), (3.2, 'a moth crosses the moonbeam'), (4.8, 'dust in the beam')],
  'mystery', 'A: a fossil dig · B: a locked diary · C: the socket in moonlight — PICK C (rhymes with the living eye)', 'close', 'a narrow moonbeam')
R('COLD', "This is the story of how we found out: from a line in the rock, a pinch of clay, a scratched grain of sand… and a report that nobody *read*.", 'F1 F2 F4 F5',
  'unroll', 'pan', 'four-in-a-row', ['dust'], 'four-relics-on-the-plinth', ['MuseumSkeleton', 'ClueRelics'], [],
  'split', 'the skeleton’s label', 'four relics laid out on the plinth under the skeleton: a slab of striped rock, a phial of clay, a grain under a lens, a dusty report',
  'Four clues: rock, clay, sand, a report.', 'each relic as the light reaches it',
  [(0, 'the label splits into four tags'), (1.6, 'a striped slab of rock'), (3.2, 'a phial of clay'), (4.8, 'a grain under a lens'), (6.4, 'a dusty report, tied with string')],
  'curious', 'A: four words · B: four keys · C: four relics on the plinth — PICK C (the journey announced)', 'wide', 'moonlight pooled on the plinth')
# ======================================================================== THE STAKES
R('STAKES', "For a long time, scientists argued. Had the climate slowly changed? Had disease spread? Had volcanoes poisoned the *air*?", '-',
  'slide', 'pull', 'three-in-a-row', ['dust'], 'three-old-theories', ['TheoryCards'], [],
  'page-turn', 'the four relics', 'three old engraved plates turned like pages: a cooling world, a sick beast, a smoking volcano',
  'Many slow explanations were argued.', 'each plate as it turns',
  [(0, 'the relics turn over like a page'), (1.6, 'a cooling world with frost'), (3.2, 'a sick beast lying down'), (4.8, 'a volcano smoking'), (6.4, 'question marks over each')],
  'curious', 'A: three portraits · B: a courtroom · C: three plates in an old book — PICK C', 'medium', 'a reading lamp over the book')
R('STAKES', "None of these ideas could be tested. Was it a slow fade, or a sudden blow? The rocks did not seem to hold any *answer*.", '-',
  'ink-bleed', 'hold', 'right-third-medium', ['dust'], None, ['TheoryCards'], [],
  'sweep', 'the three plates', 'the three plates are swept with grey wash until only blank paper is left',
  'No idea could be tested.', 'the plates fading to blank',
  [(0, 'grey wash sweeps the first plate'), (1.4, 'the second'), (2.8, 'the third'), (4.0, 'blank paper')],
  'curious', 'A: a shrug · B: closed doors · C: the plates washed blank — PICK C', 'medium', 'the reading lamp')
R('STAKES', "Bones can tell you how big an animal was, and what it ate. But they cannot tell you how fast it died. For that, you need a *clock*.", '-',
  'focus', 'push', 'centre-large', ['dust'], None, ['TheoryCards'], [],
  'shrink-into', 'the three plates', 'a single fossil bone on a table; a pocket watch beside it, its hands spinning uselessly',
  'Bones do not show time; we need a clock.', 'the spinning watch hands',
  [(0, 'the plates shrink into a bone'), (1.4, 'a pocket watch lies beside it'), (2.8, 'its hands spin'), (4.0, 'they stop at nothing')],
  'tension', 'A: an hourglass · B: a calendar · C: a bone and a useless watch — PICK C', 'insert', 'the lamp on the table')
# ======================================================================== CLUE 1 — the line in the rock
R('CLUE1', "Clue one: a line in the *rock*.", '-',
  'stamp', 'hold', 'centre-medium', ['dust'], None, ['RockBook'], [],
  'echo', 'the watch face', 'the watch’s round face becomes the end of a rock layer; the clue tag',
  'Clue one.', 'the clue tag',
  [(0, 'the round face becomes a stone'), (1.2, 'the clue tag')],
  'curious', 'A: a title · B: a ruler · C: the watch becomes stone — PICK C', 'medium', 'noon sun on stone')
R('CLUE1', "The geologist Walter Alvarez was studying the rock layers of a gorge near Gubbio, in Italy, reading the history of an ancient sea *floor*.", 'F1 F2',
  'rise', 'crane', 'left-third-medium', ['sway'], 'gubbio-gorge', ['GubbioGorge'], ['R-01', 'P-02'],
  'crane', 'the stone', 'a road cut in a limestone gorge in the Apennines, pale layers tilted; Walter Alvarez with a hammer at the face',
  'A geologist at a rock face in Italy.', 'Walter at the rock face',
  [(0, 'the camera cranes up the gorge'), (1.6, 'tilted pale layers'), (3.2, 'Walter inks on with his hammer'), (4.8, 'note “Gubbio, Italy”'), (6.0, 'he taps the rock')],
  'curious', 'A: a map of Italy · B: a postcard · C: rise up the gorge to the man — PICK C', 'wide', 'noon sun high on the right')
R('CLUE1', "The rock there is like a book lying on its side. Each layer is a page, and every page is a slice of *time*.", '-',
  'ink-on', 'push', 'centre-large', ['dust'], 'rock-is-a-book', ['RockBook'], [],
  'unroll', 'the tilted layers', 'the layers of the cliff become the edges of pages in a great stone book that opens',
  'Rock layers are like pages of time.', 'the pages opening',
  [(0, 'the layers sharpen into page edges'), (1.6, 'the stone book lifts'), (3.2, 'it opens'), (4.8, 'pages fan, each with years written on it')],
  'wonder', 'A: a timeline · B: a stack of newspapers · C: the cliff opens like a book — PICK C (★ new device RockBook)', 'insert', 'sun raking across the pages')
R('CLUE1', "Read from the bottom up, the stone book tells a story millions of years long. But which of its pages holds the *ending*?", 'F1',
  'quill', 'ride', 'diagonal', ['dust'], None, ['RockBook'], [],
  'travel-line', 'the open book', 'a vermilion thread runs up the page edges from the oldest at the bottom to the youngest at the top',
  'Rock layers read upward through time.', 'the thread climbing the pages',
  [(0, 'a thread starts at the bottom page'), (1.6, 'it climbs page by page'), (3.2, 'dates tick past'), (4.8, 'it nears the red band')],
  'curious', 'A: an arrow · B: a ladder · C: the thread climbs the pages — PICK C', 'medium', 'sun raking across the pages')
R('CLUE1', "In the older layers below, the stone is crowded with tiny fossils: the shells of plankton that once drifted in that sea in countless *numbers*.", 'F1',
  'iris', 'dive', 'centre-large', ['bubbles'], 'fossils-in-the-page', ['RockBook', 'Foraminifera'], [],
  'dive', 'a lower page', 'into a lower page: it is full of tiny shells of plankton, crowded like letters on a page',
  'Lower layers are full of tiny fossils.', 'the crowded little shells',
  [(0, 'we dive into a lower page'), (1.6, 'tiny spiral shells appear'), (3.2, 'more, crowded'), (4.4, 'one shell turns')],
  'curious', 'A: a microscope · B: alphabet soup · C: the page’s letters are fossils — PICK C', 'detail', 'light through thin stone')
R('CLUE1', "Then comes a thin band of reddish clay, about a centimetre thick, no wider than a *fingertip*.", 'F1',
  'wipe', 'rack', 'centre-medium', ['dust'], 'the-blank-page', ['RockBook'], ['P-01'],
  'lift-off', 'the crowded page', 'the pages turn up to one that is blank — a thin rust-red band of clay; the real outcrop photograph pinned beside it',
  'A thin clay layer, one centimetre thick.', 'the red band of clay',
  [(0, 'pages flick up'), (1.4, 'a blank page: a thin red band'), (2.6, 'a ruler: 1 cm'), (3.6, 'the real outcrop, pinned')],
  'tension', 'A: the photo alone · B: a scar · C: the blank page in the stone book — PICK C (★ governing image)', 'detail', 'noon sun', motif='the line — the clay')
R('CLUE1', "And above it, the tiny fossils are almost all gone. It is as if the story of life had paused. What could stop it so *suddenly*?", 'F1',
  'ink-bleed', 'push', 'centre-large', ['dust'], None, ['RockBook', 'Foraminifera'], [],
  'sweep', 'the red band', 'the page above the clay: nearly empty stone, two or three lonely shells',
  'Above the clay, the fossils are almost gone.', 'the empty page',
  [(0, 'the page above turns'), (1.4, 'it is almost empty'), (2.6, 'a lone shell')],
  'sad', 'A: an empty shelf · B: a silent street · C: the empty page — PICK C', 'detail', 'flat grey light')
R('CLUE1', "Walter realised what he was looking at. Whatever ended the age of the dinosaurs, it was written here, in a single centimetre of *clay*.", 'F1',
  'grow', 'pull', 'right-third-large', ['dust'], 'finger-on-the-line', ['GubbioGorge', 'FingerOnClay'], [],
  'grow-out-of', 'the empty page', 'Walter’s fingertip resting on the red line in the cliff, the gorge behind',
  'The whole ending is recorded in this thin layer.', 'the fingertip on the line',
  [(0, 'the book closes into the cliff'), (1.4, 'a hand comes in'), (2.8, 'the fingertip rests on the line'), (4.2, 'the line glows vermilion'), (5.6, 'it runs along the cliff')],
  'awe', 'A: a magnifier · B: a bookmark · C: his finger on the line — PICK C (close-up of the work)', 'close', 'noon sun on the hand', motif='the line — under his finger')
R('CLUE1', "Walter wanted to know one simple thing. How long had that centimetre taken to form? A year? A thousand *years*?", 'F2',
  'quill', 'hold', 'centre-medium', ['dust'], 'hourglass-of-clay', ['ClayHourglass'], [],
  'solid-morph', 'the fingertip', 'a pinch of the clay on the fingertip becomes the sand in an hourglass, running',
  'How long did the clay take to form?', 'the running hourglass',
  [(0, 'the clay crumbles off the finger'), (1.4, 'it pours into an hourglass'), (2.8, 'the glass turns'), (4.0, 'question: 1 year? 1,000 years?')],
  'tension', 'A: a calendar · B: snow settling · C: the clay becomes the sand of an hourglass — PICK C (★)', 'insert', 'a warm lamp behind the glass')
# ======================================================================== CLUE 2 — too much of a rare metal (set piece 2)
R('CLUE2', "Clue two: too much of a rare *metal*.", '-',
  'focus', 'hold', 'centre-medium', ['dust'], None, ['ClayHourglass'], [],
  'ripple-through', 'the hourglass', 'a shiver of light through the falling grains; the clue tag',
  'Clue two.', 'the clue tag',
  [(0, 'a shiver through the grains'), (1.2, 'the clue tag')],
  'curious', 'A: a title · B: a coin · C: the grains glint — PICK C', 'medium', 'the lamp')
R('CLUE2', "Walter took the question to his father, Luis Alvarez, a physicist who had won the Nobel Prize. Luis listened, and then he had an unusual *idea*.", 'F2',
  'slide', 'push', 'two-figures', ['breathe'], 'father-and-son', ['AlvarezStudy'], ['P-02'],
  'hand-over', 'the hourglass', 'Walter hands a phial of clay to his father across a desk; the real photograph of the two of them at the outcrop',
  'Walter brings the problem to his father, Luis.', 'the phial passing between them',
  [(0, 'Walter sets the hourglass down'), (1.6, 'he hands over a phial of clay'), (3.2, 'Luis takes it'), (4.8, 'the real photograph of the two (★P-02)'), (6.4, 'plate “Luis & Walter Alvarez”')],
  'warm', 'A: the photo alone · B: two chess players · C: the clay handed across — PICK C (acting)', 'medium', 'a desk lamp between them')
R('CLUE2', "Space dust falls on the Earth all the time, everywhere, in a slow and steady *trickle*.", 'F2',
  'grow', 'tilt-up', 'wide-sky', ['particles'], 'dust-from-space', ['SpaceDust'], [],
  'tilt', 'the phial held up', 'up from the phial through the window to the night: fine dust sifting down from space onto the Earth like snow',
  'Dust from space rains down slowly and steadily.', 'the falling dust',
  [(0, 'Luis holds the phial to the lamp'), (1.6, 'tilt up through the window'), (3.2, 'fine dust sifts down from the stars'), (4.8, 'it settles on the Earth')],
  'wonder', 'A: a meteor shower · B: flour from a sieve · C: the dust from space falling like snow — PICK C', 'wide', 'starlight; the dust glinting')
R('CLUE2', "That dust carries a rare metal called iridium. Measure how much of it is in the clay, and you can tell how long the clay took to settle. A little means quickly; a lot means a long *time*.", 'F2',
  'assemble', 'push', 'diagonal', ['particles'], 'dust-on-a-shelf', ['SpaceDust', 'ClayHourglass'], [],
  'pour', 'the falling dust', 'the dust pours into the hourglass; a gauge on its side rises with the iridium as the years run',
  'More iridium means more time.', 'the gauge rising with time',
  [(0, 'dust pours into the glass'), (1.6, 'a gauge: “iridium”'), (3.2, 'it rises slowly'), (4.8, 'beside it, “years” counts up'), (6.4, 'a dotted line joins them')],
  'curious', 'A: a formula · B: dust on a shelf · C: the hourglass with a gauge — PICK C', 'insert', 'the lamp through the glass')
R('CLUE2', "So they measured the clay, sample by sample, in a laboratory at *Berkeley*.", 'F2 F3',
  'blinds', 'dive', 'centre-large', ['dust'], 'the-meter', ['IridiumMeter'], [],
  'through', 'the gauge', 'through the gauge into a laboratory: a sample drawer, a detector cabinet with a big dial and needle',
  'They measured the clay in a lab.', 'the dial and its needle',
  [(0, 'through the gauge'), (1.4, 'a lab bench, a detector cabinet'), (2.8, 'the sample slides into the drawer')],
  'curious', 'A: a lab photo (none allowed) · B: a scale · C: through the gauge into the lab — PICK C', 'medium', 'cold lab light from above')
R('CLUE2', "The answer made no sense. There was far too much iridium: dozens of times more than *normal*.", 'F2',
  'stamp', 'push', 'centre-large', ['tremble'], 'needle-off-the-scale', ['IridiumMeter'], [],
  'count-up', 'the detector', 'insert on the dial: the needle swings past the last number and bends against the stop',
  'The needle goes far past normal.', 'the needle against the stop',
  [(0, 'insert on the dial'), (1.2, 'the needle starts to swing'), (2.4, 'past “normal”'), (3.4, 'past the last mark'), (4.4, 'it bends against the stop')],
  'tension', 'A: a number · B: a thermometer bursting · C: the needle that will not stop — PICK C (★ held breath)', 'detail', 'the dial lamp', sp=2, motif='the line — the needle', note='held breath: the score drops out')
R('CLUE2', "Not a slow trickle over thousands of years. Something had brought it all at once, from *above*.", 'F2 F3',
  'ink-on', 'tilt-up', 'centre-medium', ['sparks'], 'needle-through-the-roof', ['IridiumMeter'], [],
  'travel-line', 'the bent needle', 'the needle keeps going: it lengthens up out of the dial, through the lab ceiling, pointing at the sky',
  'It all arrived at once, from above.', 'the needle pointing up through the roof',
  [(0, 'the needle lengthens'), (1.4, 'it goes up through the ceiling'), (2.8, 'through the roof'), (4.0, 'it points at the night sky')],
  'tension', 'A: an arrow on a chart · B: a compass · C: the needle itself points to the sky — PICK C (★ new device IridiumMeter)', 'wide', 'the lab light, then the night', sp=2)
R('CLUE2', "It was as if a century of dust had fallen on a shelf in a single *afternoon*.", '-',
  'drop', 'hold', 'right-third-large', ['particles'], 'dust-in-an-afternoon', ['DustShelf'], [],
  'brush', 'the needle in the sky', 'a clean wooden shelf under a clock; in the space of one tick a thick blanket of dust falls on it',
  'All the iridium arrived at once.', 'the dust falling in one tick',
  [(0, 'a clean shelf, a clock'), (1.4, 'the clock ticks once'), (2.4, 'a heap of dust falls'), (3.4, 'it settles thick')],
  'tension', 'A: a graph spike · B: a snowdrift overnight · C: a century of dust in an afternoon — PICK C', 'insert', 'window light on the shelf')
R('CLUE2', "On the Earth's surface, iridium is rare. But some rocks that fall from space are rich in *it*.", 'F3',
  'focus', 'push', 'right-third-large', ['stars'], None, ['MeteoriteSlice'], [],
  'split', 'the sky the needle points at', 'a meteorite sliced open, its polished face glinting with metal; a pinch of Earth rock beside it, dull',
  'Space rocks are rich in iridium.', 'the glinting meteorite face',
  [(0, 'a dark stone falls into the hand of the frame'), (1.4, 'it is sliced open'), (2.8, 'the metal glints'), (4.2, 'an Earth pebble beside it, dull')],
  'curious', 'A: a periodic table · B: a gold nugget · C: the meteorite sliced open — PICK C', 'insert', 'a raking lamp on the polished face')
R('CLUE2', "In 1980, after checking and checking again, the Alvarez team published their answer: an asteroid about ten kilometres across had struck the *Earth*.", 'F3',
  'flip', 'pull', 'centre-large', ['stars'], 'flying-mountain', ['Asteroid'], [],
  'grow-out-of', 'the meteorite slice', 'the slice grows into a whole asteroid, a pitted mountain of rock tumbling through space toward a blue Earth',
  'A 10 km asteroid hit the Earth.', 'the tumbling asteroid',
  [(0, 'the slice grows'), (1.6, 'into a tumbling mountain of rock'), (3.4, 'the Earth beyond'), (5.0, 'gold figure “10 km”'), (6.6, '“1980”')],
  'awe', 'A: the paper · B: a cannonball · C: the slice becomes the whole rock — PICK C', 'wide', 'the Sun from the left, hard')
R('CLUE2', "Ten kilometres across: a mountain of rock, taller than Mount Everest, falling out of the *sky*.", 'F3',
  'drop', 'crane', 'tiny-in-vast', ['dust'], 'asteroid-over-everest', ['Asteroid', 'EverestScale'], [],
  'echo', 'the asteroid', 'the same asteroid set beside Mount Everest for scale, taller than the mountain',
  'The asteroid was taller than Everest.', 'the asteroid towering over Everest',
  [(0, 'Everest inks on'), (1.6, 'the asteroid descends beside it'), (3.2, 'it towers above'), (4.6, 'a tiny climber on the summit')],
  'awe', 'A: a city · B: a stadium · C: beside Everest — PICK C', 'wide', 'morning sun on the snow')
# ======================================================================== CLUE 3 — scars in the sand
R('CLUE3', "Clue three: scars in the *sand*.", '-',
  'stamp', 'hold', 'left-third-medium', ['dust'], None, ['ShockedGrain'], [],
  'bloom-out', 'the asteroid over Everest', 'everything gathers into one grain of sand; the clue tag',
  'Clue three.', 'the clue tag',
  [(0, 'everything gathers into a grain'), (1.2, 'the clue tag')],
  'tension', 'A: a title · B: a crack · C: the mountain becomes a grain — PICK C', 'medium', 'grey light')
R('CLUE3', "Many scientists did not believe it. A rock from space, wiping out the dinosaurs? If an asteroid had really hit, the evidence should be *everywhere*.", 'F4',
  'slide', 'pan', 'wide-landscape', ['dust'], None, ['WorldOutcrops'], [],
  'whip', 'the grain', 'a whip across a globe: the same thin clay layer showing in cliffs on different continents',
  'If true, the layer should be found worldwide.', 'the cliffs on the globe',
  [(0, 'whip across the globe'), (1.6, 'a cliff with a red line'), (3.2, 'another'), (4.8, 'another')],
  'tension', 'A: a debate · B: a jury · C: a whip around the world — PICK C', 'wide', 'daylight round the globe')
R('CLUE3', "And it was. The same iridium-rich layer turned up in rocks around the *world*.", 'F4',
  'ink-on', 'pull', 'centre-large', ['ripple'], 'world-line', ['WorldOutcrops'], [],
  'trace-to', 'the cliffs', 'a vermilion thread runs from cliff to cliff round the globe until it closes into a ring',
  'The layer was found worldwide.', 'the thread closing round the globe',
  [(0, 'a vermilion thread leaves the first cliff'), (1.6, 'it reaches the next'), (3.2, 'and the next'), (4.6, 'it closes round the globe')],
  'triumph', 'A: pins on a map · B: a necklace · C: the line runs round the world — PICK C', 'medium', 'daylight', motif='the line — round the world')
R('CLUE3', "Under the microscope, that layer held grains of quartz crossed by fine straight lines, like scratches on *glass*.", 'F4',
  'iris', 'dive', 'centre-large', ['dust'], 'shock-lamellae', ['ShockedGrain'], ['P-03'],
  'dive', 'the ring round the globe', 'down into the layer: one grain of quartz under a microscope, fine parallel lines etching across it',
  'The grains have fine scratch-lines.', 'the lines etching across the grain',
  [(0, 'dive into the layer'), (1.4, 'one grain in the round field'), (2.8, 'a first set of lines etches in'), (4.2, 'a second set crosses it'), (5.6, 'the real micrograph beside (★P-03)')],
  'curious', 'A: a crystal diagram · B: scratched spectacles · C: the lines etch in on the grain — PICK C (★ new device ShockedGrain)', 'detail', 'polarised light through the grain')
R('CLUE3', "Quartz is one of the toughest minerals on Earth. Ordinary forces barely mark it. Only a tremendous *shock* can.", 'F4',
  'focus', 'hold', 'right-third-large', ['dust'], None, ['ShockedGrain'], [],
  'heat', 'the scratched grain', 'the grain on an anvil; a hammer strikes and leaves no mark; a white shock front waits',
  'Only a huge shock scars quartz.', 'the unmarked grain under the hammer',
  [(0, 'the grain on an anvil'), (1.4, 'a hammer strikes'), (2.6, 'no mark'), (3.8, 'a white front gathers')],
  'tension', 'A: a hardness chart · B: a diamond · C: the hammer fails — PICK C', 'insert', 'a hard white light')
R('CLUE3', "This shocked quartz forms only under enormous pressure, the kind made by an *impact*.", 'F4',
  'shatter', 'push', 'centre-large', ['sparks'], 'grain-struck', ['ShockedGrain'], [],
  'shape-window', 'the scratched grain', 'the grain in its round field is struck: a pressure front races across it and the glass of the field cracks',
  'Only an impact makes such pressure.', 'the cracking field',
  [(0, 'a pressure front races in'), (1.4, 'the grain is struck'), (2.8, 'the lines deepen'), (4.0, 'the field’s glass cracks')],
  'tension', 'A: a hammer · B: a car crash · C: the grain struck, the lens cracks — PICK C (v8 shatter)', 'detail', 'a white flash')
R('CLUE3', "Every grain was a witness to the blow. But where had it landed? Where was the *crater*?", 'F4',
  'ink-bleed', 'pull', 'tiny-in-vast', ['dust'], 'grains-point', ['WorldOutcrops'], [],
  'swarm', 'the cracked field', 'the shards become grains that fly up from every cliff and hang over the globe, pointing nowhere',
  'Where is the crater?', 'the cloud of grains over the empty globe',
  [(0, 'the shards become grains'), (1.4, 'they rise from every cliff'), (2.8, 'they hang over the globe'), (4.0, 'a question mark')],
  'mystery', 'A: a detective board · B: a compass spinning · C: the witnesses gather — PICK C', 'wide', 'grey daylight')
# ======================================================================== CLUE 4 — the ring under the jungle (set piece 3)
R('CLUE4', "Clue four: a ring under the *jungle*.", '-',
  'focus', 'hold', 'centre-medium', ['sway'], None, ['YucatanCoast'], [],
  'outline-morph', 'the question mark', 'the question mark’s hook bends into the curve of a coastline; the clue tag',
  'Clue four.', 'the clue tag',
  [(0, 'the hook bends into a coast'), (1.2, 'the clue tag')],
  'mystery', 'A: a title · B: a map pin · C: the question becomes a coast — PICK C', 'medium', 'tropical noon')
R('CLUE4', "A crater that size should be enormous. Scientists searched the oceans and deserts of the world, looking for a scar. Something that big should have been easy to spot. Yet nobody could find *it*.", '-',
  'wipe', 'pan', 'wide-landscape', ['dust'], 'magnifier-over-globe', ['SearchGlobe'], [],
  'tilt', 'the coast', 'a great magnifying glass slides over a globe, over oceans and deserts, finding nothing',
  'The world was searched for the crater.', 'the magnifier sliding',
  [(0, 'a magnifier slides in'), (1.6, 'over an ocean'), (3.2, 'over a desert'), (4.8, 'over the ice'), (6.4, 'nothing')],
  'tension', 'A: an expedition · B: a lost key · C: a magnifier over the globe — PICK C', 'wide', 'a lamp over the globe')
R('CLUE4', "But it had already been found, years earlier, by people who were not looking for dinosaurs at *all*.", 'F5',
  'tear-in', 'push', 'right-third-large', ['dust'], 'report-on-a-shelf', ['ReportShelf'], [],
  'rack-focus', 'the magnifier', 'the magnifier stops on a shelf of company binders; one report, its spine reading “Yucatán 1978”',
  'Someone had already found it.', 'the report on the shelf',
  [(0, 'the magnifier stops'), (1.4, 'focus pulls to a shelf of binders'), (2.8, 'one spine: “Yucatán 1978”'), (4.2, 'dust on its top')],
  'mystery', 'A: a newspaper · B: a treasure map · C: the report on the shelf — PICK C (★ twist planted)', 'close', 'a bare bulb over the shelf', sp=3)
R('CLUE4', "In 1978, Glen Penfield and Antonio Camargo were geophysicists for Mexico's national oil company. They were surveying the Yucatán coast for oil, with instruments that sense the hidden rocks *below*.", 'F5',
  'rise', 'crane', 'left-third-medium', ['sway'], 'survey-plane', ['SurveyPlane', 'YucatanCoast'], ['M-01'],
  'through', 'the report’s cover', 'through the cover into 1978: a small survey plane over the green coast of the Yucatán, the sea beside',
  'Oil surveyors flew over the Yucatán in 1978.', 'the plane over the coast',
  [(0, 'through the cover'), (1.6, 'the Yucatán coast, jungle and sea'), (3.2, 'a survey plane crosses'), (4.8, 'plate “Penfield & Camargo, 1978”'), (6.4, 'its trailing sensor')],
  'curious', 'A: their portraits (none) · B: a fishing boat · C: into the report, onto the coast — PICK C', 'wide', 'tropical sun, high', sp=3)
R('CLUE4', "They were looking for oil, deep beneath the jungle. Instead, they found something far older and far *stranger*.", 'F5',
  'ink-on', 'dive', 'centre-large', ['sway'], None, ['YucatanCoast', 'SurveyPlane'], [],
  'dive', 'the plane over the coast', 'down through the jungle and the limestone, layer under layer, to a deep buried bowl',
  'Below the jungle lay something old and strange.', 'the buried bowl',
  [(0, 'down through the canopy'), (1.6, 'through white limestone'), (3.2, 'deeper'), (4.8, 'the rim of a buried bowl')],
  'mystery', 'A: an oil rig · B: an iceberg · C: dive under the jungle — PICK C', 'detail', 'light fading as we go down')
R('CLUE4', "Their instruments drew a strange shape: half of a giant ring, buried deep beneath the *ground*.", 'F5',
  'quill', 'hold', 'centre-large', ['dust'], 'the-half-ring', ['SurveyRing'], [],
  'trace-to', 'the plane', 'the plane’s track over the coast draws contour lines that bend into half of a huge ring',
  'The survey shows half a ring underground.', 'the half-ring forming',
  [(0, 'the plane’s track'), (1.4, 'contour lines bend'), (2.8, 'they curve into an arc'), (4.2, 'half a ring'), (5.4, 'it glows vermilion')],
  'awe', 'A: a graph · B: tree rings · C: the plane draws the ring — PICK C (★ new device SurveyRing)', 'insert', 'sun on the survey sheet', sp=3, motif='the line — the half-ring')
R('CLUE4', "The other half lay under the sea. Together they made a circle far too big to notice from the *surface*.", 'F5 F7',
  'grow', 'pull', 'tiny-in-vast', ['ripple'], 'ring-completes', ['SurveyRing', 'YucatanCoast'], ['M-01'],
  'merge', 'the half-ring', 'the ring completes under the sea; the camera pulls up until the whole circle shows round the coast, the real relief map beside',
  'The full ring is huge and hidden.', 'the complete ring',
  [(0, 'the other half rises under the sea'), (1.6, 'the circle closes'), (3.2, 'the camera pulls up'), (4.8, 'the real relief map (★M-01)'), (6.4, 'a tiny village at its edge')],
  'awe', 'A: a satellite photo alone · B: a ripple · C: the ring completes — PICK C', 'wide', 'high sun', sp=3)
R('CLUE4', "In 1981 they presented it at a scientific meeting. Almost nobody *noticed*.", 'F5',
  'slide', 'push', 'centre-medium', ['dust'], 'poster-nobody-reads', ['ConferenceHall'], [],
  'shrink-into', 'the ring', 'the ring shrinks onto a poster on an easel in a hall; people walk past without looking',
  'Their finding was ignored.', 'the poster nobody stops at',
  [(0, 'the ring shrinks onto a poster'), (1.4, 'people pass'), (2.8, 'nobody stops'), (4.0, '“1981”')],
  'sad', 'A: an empty chair · B: a message in a bottle · C: the poster everyone passes — PICK C', 'medium', 'flat hall light')
R('CLUE4', "The report went back on the shelf. Dust settled on it, while the rest of the world kept *searching*.", 'F5',
  'ink-bleed', 'hold', 'right-third-large', ['dust'], 'dust-years', ['ReportShelf'], [],
  'light-change', 'the poster', 'the report back on its shelf; years pass in the light of the window, dust thickening on its spine',
  'The finding lay forgotten for years.', 'the dust thickening',
  [(0, 'the report back on the shelf'), (1.4, 'the window light sweeps (a year)'), (2.8, 'again'), (4.2, 'dust thickens'), (5.6, 'a cobweb')],
  'sad', 'A: a calendar · B: a sleeping dog · C: dust on the report — PICK C', 'close', 'window light sweeping', sp=3)
R('CLUE4', "Then, in 1990, a young scientist named Alan Hildebrand followed the trail of clues all the way to the *Yucatán*.", 'F6',
  'focus', 'push', 'two-figures', ['dust'], 'dust-blown', ['ReportShelf', 'HildebrandFigure'], [],
  'sweep', 'the dusty spine', 'a breath blows the dust off the spine: Hildebrand, young, pulling the report from the shelf',
  'Hildebrand found the clue.', 'Hildebrand pulling the report',
  [(0, 'the dust blows away'), (1.4, 'Hildebrand’s hand on the spine'), (2.8, 'he pulls it out'), (4.2, '“1990”')],
  'curious', 'A: his portrait · B: an archaeologist · C: the dust blown off — PICK C', 'medium', 'the bare bulb')
R('CLUE4', "He tracked down old drill cores that the oil company had pulled up from deep inside the ring years before, and stored *away*.", 'F6',
  'unroll', 'dive', 'centre-large', ['dust'], 'core-unwrapped', ['DrillCore'], [],
  'unroll', 'the report', 'a long box opens: cylinders of drilled rock in rows, one lifted out under a lamp',
  'Old drill cores from the ring.', 'the core lifted out',
  [(0, 'a long core box opens'), (1.6, 'rows of rock cylinders'), (3.2, 'one is lifted'), (4.8, 'a label: depth')],
  'curious', 'A: a drill rig · B: a sausage · C: the box opened — PICK C', 'insert', 'a bare bulb over the box')
R('CLUE4', "And inside that rock? Shocked minerals, carrying exactly the same scars as the grains found all around the *world*.", 'F6 F4',
  'iris', 'push', 'centre-large', ['dust'], None, ['DrillCore', 'ShockedGrain'], [],
  'shape-window', 'the core', 'a round window in the core’s cut face shows the same scratched grain as before',
  'The cores held the same shocked grains.', 'the grain in the core',
  [(0, 'a round window opens in the core'), (1.4, 'the scratched grain'), (2.8, 'its lines match'), (4.0, 'a vermilion tick')],
  'triumph', 'A: a lab report · B: matching fingerprints · C: the same grain in the core — PICK C', 'detail', 'polarised light', motif='the line — the scars match')
R('CLUE4', "In 1991 the crater got its name, from a small village near its centre: *Chicxulub*.", 'F6 F7',
  'stamp', 'crane', 'left-third-medium', ['sway'], 'village-sign', ['VillageSign', 'YucatanCoast'], [],
  'crane', 'the grain', 'a village street in the Yucatán, a painted sign “Chicxulub”; the camera rises',
  'The crater is named Chicxulub.', 'the village sign',
  [(0, 'the village street'), (1.6, 'the painted sign'), (3.2, 'the camera rises'), (4.8, '“1991”')],
  'triumph', 'A: the paper · B: a gravestone · C: the village sign — PICK C', 'medium', 'tropical noon')
R('CLUE4', "The ring is about one hundred and eighty kilometres wide: big enough to swallow a whole city and the countryside *around* it.", 'F6',
  'grow', 'pull', 'tiny-in-vast', ['dust'], None, ['SurveyRing', 'YucatanCoast'], [],
  'grow-out-of', 'the village', 'up and up from the village until the whole 180-kilometre ring shows round the coast',
  'The crater is about 180 km wide.', 'the whole ring',
  [(0, 'up from the village'), (1.4, 'the coast'), (2.6, 'the ring around it'), (3.6, 'gold “180 km”')],
  'awe', 'A: a ruler · B: a city map · C: rise until the ring shows — PICK C', 'wide', 'high sun')
# ======================================================================== THE TWIST
R('TWIST', "So here is the twist. The crater had been found more than a decade before it got its name, and filed away in a company *report*.", 'F5 F6',
  'flip', 'push', 'centre-large', ['dust'], None, ['ReportShelf'], [],
  'fold', 'the ring', 'the whole ring folds down into the report on the shelf',
  'The answer had been sitting in a file.', 'the report',
  [(0, 'the ring folds down'), (1.6, 'into the report'), (3.2, 'on the shelf'), (4.8, '“1978”'), (6.4, 'the dust')],
  'awe', 'A: a shrug · B: a key under a mat · C: the ring folds into the report — PICK C', 'close', 'the bare bulb')
R('TWIST', "The smoking gun was not hidden in the rock. It was hidden on a *shelf*.", '-',
  'iris', 'pull', 'right-third-medium', ['dust'], None, ['ReportShelf'], [],
  'spot', 'the report', 'the light narrows on the one report among hundreds',
  'It was hidden in plain sight.', 'the report',
  [(0, 'the light narrows'), (1.4, 'hundreds of binders fall dark'), (2.6, 'one remains')],
  'awe', 'A: a safe · B: a needle in a haystack · C: one binder in the dark — PICK C', 'medium', 'one narrowing light')
# ======================================================================== THE ANSWER
R('ANSWER', "So, after all those clues, what killed the *dinosaurs*?", '-',
  'focus', 'hold', 'centre-medium', ['dust'], None, ['MuseumSkeleton'], [],
  'echo', 'the report', 'back in the museum hall: the skeleton in moonlight',
  'Back to the question.', 'the skeleton',
  [(0, 'the museum hall'), (1.2, 'the skeleton')],
  'triumph', 'A: a title · B: a door · C: back to the bones — PICK C (bookend)', 'medium', 'moonlight')
R('ANSWER', "An asteroid about ten kilometres across struck the coast of what is now Mexico, sixty-six million years *ago*.", 'F3 F7 F8',
  'rise', 'crane', 'tiny-in-vast', ['sparks'], 'impact', ['Asteroid', 'ImpactRings'], [],
  'stream-through', 'the skeleton', 'the asteroid streaks over the Yucatán coast and strikes; a ring of fire spreads like a stone dropped in a pond',
  'A 10 km asteroid hit Mexico 66 million years ago.', 'the strike',
  [(0, 'the asteroid streaks in'), (1.6, 'it strikes the coast'), (3.0, 'a flash'), (4.4, 'rings spread like a pond'), (6.0, 'the rings cross the sea')],
  'awe', 'A: a fireball · B: a stone in a pond · C: the pond rings on the real coast — PICK C (metaphor 2; held breath)', 'wide', 'the white flash of impact', note='held breath: silence, then one deep note')
R('ANSWER', "The blast left a crater about one hundred and eighty kilometres wide, now buried beneath the jungle and the *sea*.", 'F6 F7',
  'grow', 'push', 'right-third-large', ['dust'], None, ['SurveyRing', 'YucatanCoast'], [],
  'outline-morph', 'the spreading rings', 'the last ring freezes and hardens into the buried crater rim under today’s coast',
  'The crater, 180 km wide, lies buried.', 'the rim under the coast',
  [(0, 'the last ring freezes'), (1.6, 'it hardens into the rim'), (3.2, 'jungle grows over it'), (4.8, 'the sea over the rest')],
  'awe', 'A: a map · B: a scar under skin · C: the ring freezes into the rim — PICK C', 'medium', 'tropical noon')
R('ANSWER', "The impact threw dust and molten rock high into the sky, laid the iridium layer around the planet, and scarred grains of sand on the way *down*.", 'F2 F4 F10',
  'ink-bleed', 'pull', 'wide-sky', ['particles'], 'dust-round-the-world', ['ImpactRings', 'WorldOutcrops'], [],
  'ripple-through', 'the rings', 'the rings become a veil of dust over the globe; grains fall back and settle as the thin red line on every cliff',
  'Dust spread worldwide and made the clay layer.', 'the dust settling into the red line',
  [(0, 'dust rises high'), (1.6, 'it veils the globe'), (3.2, 'grains fall back'), (4.8, 'they settle as the red line'), (6.4, 'on every cliff')],
  'awe', 'A: a cloud diagram · B: snowfall · C: the veil settles as the line — PICK C (the clues joined)', 'wide', 'a dimming sun', motif='the line — laid down')
R('ANSWER', "Darkness and cold followed. With little sunlight, plants withered, and the food chains that the giants depended on *collapsed*.", 'F10',
  'wipe', 'push', 'centre-large', ['snow'], 'chain-snaps', ['FoodChain'], [],
  'light-change', 'the dimming sun', 'under a dim coin of a Sun, ferns wither; a chain of links — fern, plant-eater, giant — snaps',
  'Darkness killed plants and broke the food chain.', 'the chain snapping',
  [(0, 'the Sun dims to a coin'), (1.6, 'ferns wither'), (3.2, 'a chain of links'), (4.8, 'it snaps'), (6.0, 'the giant’s link falls')],
  'sad', 'A: a graph of species · B: dominoes · C: the chain snaps under the dim Sun — PICK C (metaphor 3)', 'medium', 'the dim coin of the Sun', motif='the line — the chain snaps')
# ======================================================================== WHAT IT MEANS
R('MEANING', "But not everything *died*.", '-',
  'blinds', 'hold', 'centre-medium', ['breathe'], None, ['FoodChain'], [],
  'spot', 'the snapped chain', 'one small link still holding, glowing faintly',
  'Some survived.', 'the last link',
  [(0, 'the light narrows on one link'), (1.0, 'it holds')],
  'calm', 'A: a seed · B: a candle · C: one link holds — PICK C', 'detail', 'a faint warm glow')
R('MEANING', "Small mammals, hiding in burrows, survived. Their descendants would one day become *us*.", 'F11',
  'rise', 'crane', 'right-third-large', ['breathe'], 'burrow-to-hand', ['Burrow'], [],
  'grow-out-of', 'the last link', 'the link is a small furry mammal curled in a burrow; it climbs up, and its paw becomes a human hand holding a geologist’s hammer',
  'Surviving mammals led to us.', 'the paw becoming a hand',
  [(0, 'the link is a small mammal in a burrow'), (1.6, 'it climbs up'), (3.2, 'its paw reaches out'), (4.8, 'it becomes a human hand'), (6.0, 'holding a hammer')],
  'awe', 'A: an evolution chart · B: a family tree · C: the paw becomes a hand — PICK C (★ the feeling lands)', 'close', 'dawn light from the burrow mouth')
R('MEANING', "And some dinosaurs survived too. We call them *birds*.", 'F11',
  'drop', 'pull', 'two-figures', ['sway'], 'bird-on-the-skeleton', ['MuseumSkeleton', 'Sparrow'], [],
  'hand-over', 'the hammer', 'the hammer taps the museum skeleton’s shoulder; a small bird lands there',
  'Birds are the surviving dinosaurs.', 'the bird on the skeleton',
  [(0, 'the hammer taps the bone'), (1.4, 'a small bird lands'), (2.6, 'it looks around')],
  'warm', 'A: a bird skeleton chart · B: a feather · C: a bird on the skeleton — PICK C', 'medium', 'first light through the museum window')
R('MEANING', "Every sparrow and every eagle is a living dinosaur, a survivor of that *day*.", 'F11',
  'focus', 'push', 'right-third-medium', ['sway'], None, ['Sparrow'], [],
  'rack-focus', 'the bird on the skeleton', 'focus from the skeleton to the little bird: its scaly feet, its sharp eye',
  'Birds are living dinosaurs.', 'the bird’s eye',
  [(0, 'focus moves to the bird'), (1.4, 'its scaly feet'), (2.8, 'its eye, like the dinosaur’s')],
  'warm', 'A: a cladogram · B: a fossil feather · C: the bird’s eye rhymes with the dinosaur’s — PICK C', 'close', 'first light through the window', motif='the eye — the bird looks like the beast')
R('MEANING', "Think about it. Everything we know about that day came from a centimetre of clay, a metal from space, a scratched grain of sand… and a forgotten *report*.", 'F1 F2 F4 F5',
  'assemble', 'pan', 'four-in-a-row', ['dust'], None, ['ClueRelics'], [],
  'merge', 'the bird', 'the four relics on the plinth again, the bird hopping from one to the next',
  'Four clues gave us the answer.', 'the bird on the relics',
  [(0, 'the four relics'), (1.6, 'the bird hops to the clay'), (3.2, 'to the grain'), (4.8, 'to the report'), (6.4, 'they glow')],
  'warm', 'A: a summary list · B: a medal · C: the relics, with the bird — PICK C', 'insert', 'dawn on the plinth')
R('MEANING', "And it began with a simple question from a father and son: how long does a centimetre of clay take to *form*?", 'F2',
  'slide', 'push', 'two-figures', ['breathe'], None, ['AlvarezStudy'], ['P-02'],
  'echo', 'the four relics', 'the phial of clay between Luis and Walter again, the lamp between them',
  'A simple question started it all.', 'the phial between the two',
  [(0, 'the phial of clay'), (1.6, 'the two at the desk'), (3.2, 'the real photograph'), (4.8, 'the lamp')],
  'warm', 'A: their medal · B: a seed · C: back to the phial — PICK C', 'medium', 'the desk lamp')
R('MEANING', "So the next time you hear a bird at dawn, remember: it is the last of the dinosaurs, flying out of the longest night on *Earth*.", 'F11',
  'burn', 'pull', 'wide-sky', ['sway'], 'bird-into-dawn', ['MuseumSkeleton', 'Sparrow'], [],
  'tilt', 'the bird on the relics', 'the bird flies off the skeleton, out of the museum window into the dawn; the last star is just Venus',
  'Birds are dinosaurs flying into the dawn.', 'the bird in the dawn',
  [(0, 'the bird takes off'), (1.6, 'out of the window'), (3.2, 'into the dawn'), (4.8, 'the night burns away into morning'), (6.4, 'one last bright point: Venus')],
  'awe', 'A: a sunrise · B: a phoenix · C: the bird out of the window — PICK C (bookend)', 'wide', 'dawn, rising from the right', motif='the line — the horizon at dawn')

ROWS[5][13]['gap'] = 6.2   # the title card plays in this breath before the stakes
for i, r in enumerate(ROWS):
    if i and r[0] != ROWS[i - 1][0] and r[0].startswith('CLUE'): r[13]['gap'] = 1.5
for r in ROWS:
    if r[0] in ('TWIST',): r[13]['mood'] = 'awe'
    if r[0] in ('ANSWER', 'MEANING'): r[13]['mood'] = 'awe' if r[13]['mood'] not in ('sad',) else 'sad'
    if 'dozens of times' in r[1] or 'struck the coast' in r[1]: r[13]['hold'] = True
SRC = {'F1': 'S1 S2', 'F2': 'S1 S2 S3', 'F3': 'S2 S3', 'F4': 'S2 S3', 'F5': 'S4 S5', 'F6': 'S4 S5 S6', 'F7': 'S5 S6', 'F8': 'S2 S6', 'F9': 'S2 S6', 'F10': 'S2 S6', 'F11': 'S2 S6'}
H = os.path.dirname(os.path.abspath(__file__))
if __name__ == '__main__':
    write(H, 'dinosaur-killer', 'What killed the dinosaurs?', ROWS, SRC,
          ['device RockBook — the cliff opens like a stone book; one page is the blank clay line', 'device IridiumMeter — the needle swings off the scale and bends up through the roof to the sky',
           'device ShockedGrain — shock lamellae etch across a quartz grain in two sets', 'device SurveyRing — a survey plane’s track bends into half a ring, then the ring completes under the sea'],
          {'file': '../studio/music/wonder_dreamer.wav', 'db': -24, 'start': 0}, {'t': 1, 'title': 'What killed the *dinosaurs*?', 'kicker': 'Fathom'}, standard=6)
    out = ['# dinosaur-killer — concept pass (CREATIVE.md §1) — generated by episodes/dinosaur-killer/lines.py', '', '**Governing image:** the thin line of clay in the rock.', '',
           '| L | line | A literal · B metaphor · C transformation → pick |', '|---|---|---|'] + [f'| {i} | {t.replace("*", "")} | {a} |' for i, t, a in CONCEPTS]
    open(os.path.join(H, '../../../jobs/scripts/dinosaur-killer_concepts.md'), 'w').write('\n'.join(out) + '\n'); print('→ concepts')
