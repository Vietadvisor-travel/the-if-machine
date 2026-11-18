#!/usr/bin/env python3
"""drifting-continents — "How do we know the continents move?" — script + shot plan (standard 6, engine 10).
python3 episodes/drifting-continents/lines.py → episode.json. Facts: jobs/research/drifting-continents.md · chain: jobs/scripts/drifting-continents_chain.md
· treatment: jobs/scripts/drifting-continents_treatment.md.
THE GOVERNING IMAGE: the torn atlas page. THE MOTIF (shape): the TEAR / SEAM — the torn page, the quilt's stitches, the mid-ocean ridge, the
jigsaw edge, the torn page again. ACCENT: vermilion — the tear, the stripes' mirror.
NEW DEVICES: the newspaper whose print runs on across the tear (TornNews), the quilt-Pangaea whose stitches open into oceans (QuiltPangaea),
the sea floor as a tape running out both ways from the ridge (RidgeTape), the fingernail ruler that is also the Atlantic (NailAtlantic)."""
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

# ======================================================================== COLD — the jigsaw and the torn atlas (set piece 1)
R('COLD', "Take two pieces of a jigsaw puzzle. If their edges fit perfectly, you know at once that they were cut from the same *picture*.", '-',
  'ink-on', 'the cream page', 'a child’s jigsaw on a wooden table; two pieces slide together with a click', 'Two puzzle pieces fit.', 'the two pieces meeting',
  [(0, 'the table inks on'), (1.4, 'a hand pushes one piece'), (2.8, 'it slides toward the other'), (4.2, 'click — they lock'), (5.4, 'the seam glows vermilion')],
  'curious', 'insert', 'warm lamp from the left', 'push', ['Jigsaw'], 'jigsaw', sp=1, motif='the seam — the jigsaw edge')
R('COLD', "Now open an old atlas. Look at the coast of South America, and then at the coast of Africa, across the *ocean*.", 'F1',
  'outline-morph', 'the two pieces', 'the pieces’ outlines become South America and Africa on an old atlas page', 'The puzzle pieces become two continents.', 'the two coasts',
  [(0, 'the pieces’ edges redraw as coasts'), (1.6, 'the atlas page unfolds around them'), (3.0, 'a finger traces Brazil'), (4.4, 'it crosses to Africa')],
  'curious', 'medium', 'the same lamp, on old paper', 'pan-r', ['AtlasPage'], 'atlas', sp=1)
R('COLD', "The bulge of Brazil tucks neatly into the hollow of West Africa, like two puzzle pieces that someone has pulled *apart*.", 'F1',
  'slide-in', 'the two coasts', 'Africa’s outline slides across the ocean and nests against Brazil, then slides back', 'The coasts fit together.', 'the bulge in the hollow',
  [(0, 'a ghost of Africa lifts off the page'), (1.6, 'it slides west across the ocean'), (3.0, 'it nests into Brazil'), (4.4, 'it slides back home')],
  'curious', 'close', 'lamp, raking', 'arc', ['AtlasPage'])
R('COLD', "But a puzzle can be torn apart. Can a planet? Could whole continents once have been joined, and then drifted across the *world*?", '-',
  'tear', 'the ghost Africa', 'the atlas page TEARS down the middle of the Atlantic; the two halves drift a hair apart', 'Could the world itself be torn?', 'the tear',
  [(0, 'a nick appears in the Atlantic'), (1.2, 'the page tears downward'), (2.6, 'the halves drift apart'), (4.0, 'paper fibres in the gap'), (5.2, 'a question mark in the gap')],
  'mystery', 'medium', 'lamp; the gap is dark', 'dolly', ['AtlasPage'], 'atlas-tears', sp=1, motif='the seam — the atlas tears')
R('COLD', "The ground under our feet is the one thing we trust never to move. And if it does move, it moves far too slowly to *see*.", '-',
  'dive', 'the tear', 'we drop through the dark gap down to a green meadow; boots stand on a big grey rock', 'The ground seems never to move.', 'the boots on the rock',
  [(0, 'we fall through the gap'), (1.4, 'a meadow rushes up'), (2.8, 'boots land on a rock'), (4.2, 'the boots stamp — nothing moves'), (5.6, 'a snail crawls past, faster than the rock')],
  'calm', 'close', 'flat daylight, high', 'crane-down', ['MeadowRock'], 'meadow')
R('COLD', "So how did we find out? From a torn map, a little reptile, a man who died on the ice… and stripes hidden at the bottom of the *sea*.", 'F2 F3 F5 F6',
  'split', 'the rock', 'the rock splits into four tags pinned on the meadow: a torn map, a small reptile, a tent in snow, a striped card', 'Four clues.', 'each clue as it appears',
  [(0, 'the rock cracks into four'), (1.6, 'a torn map'), (3.2, 'a small reptile'), (4.8, 'a tent in snow'), (6.4, 'a striped card')],
  'curious', 'wide', 'daylight', 'pan-l', ['FourClues'], 'four-clues')
# ======================================================================== STAKES — too slow to see
R('STAKES', "Imagine a rock sitting in a meadow. Grass grows round it, trees rise, a whole town is built… and the rock has barely crept a *step*.", 'F8',
  'time-lapse', 'the four clues', 'time-lapse: grass grows, trees rise, houses and a church are built round the rock, which shifts a hair', 'The rock moves almost nothing while a town is built.', 'the rock’s tiny shift',
  [(0, 'grass grows'), (1.4, 'trees rise'), (2.8, 'houses climb up'), (4.2, 'a church tower'), (5.6, 'a tick mark: the rock moved a hair')],
  'curious', 'wide', 'days and nights flicker', 'lock', ['MeadowRock'], 'town-grows')
R('STAKES', "Nobody could ever watch that happen. A human life is far too short, and the motion is far too *slow*.", '-',
  'dim', 'the town', 'a lifetime passes as an hourglass beside the rock; the sand runs out, the rock has not visibly moved', 'A life is too short to see it.', 'the hourglass',
  [(0, 'an hourglass turns over'), (1.6, 'the sand runs'), (3.0, 'the town’s lights flicker on and off'), (4.2, 'the last grain falls')],
  'calm', 'medium', 'evening, then night', 'tilt-down', ['MeadowRock'])
R('STAKES', "For centuries, people noticed that the coasts matched. Most called it a coincidence. Then one man refused to let it *go*.", 'F1',
  'rise-from', 'the night town', 'old maps flutter up from the town like leaves, each with matching coasts; one hand catches one', 'People noticed, but did not follow it.', 'the hand that catches the map',
  [(0, 'old maps rise'), (1.4, 'they flutter past'), (2.8, 'a shrug: "coincidence" stamped on one'), (4.4, 'a hand snatches the last one')],
  'curious', 'medium', 'moonlight', 'tilt-up', ['MapLeaves'])
# ======================================================================== CLUE 1 — the torn page
R('CLUE1', "His name was Alfred Wegener. He was not a geologist at all. He studied the weather, sending balloons high into the *sky*.", 'F2',
  'hand-over', 'the caught map', 'the hand becomes Wegener’s: on white Greenland ice he lets a weather balloon go', 'Alfred Wegener, weather scientist.', 'Wegener and the balloon',
  [(0, 'the hand opens: a balloon string'), (1.4, 'Wegener stands on the ice'), (2.8, 'he lets go'), (4.2, 'the balloon rises'), (5.4, 'he shades his eyes')],
  'curious', 'medium', 'white Arctic light', 'crane-up', ['GreenlandIce', 'Balloon'], 'wegener-balloon', stock=['P-01'])
R('CLUE1', "From high above, the land below looks like a map spread out on a table. And Wegener could not stop looking at *maps*.", 'F2',
  'rise', 'the balloon', 'we ride with the balloon: the ice below flattens into a map, which becomes the atlas on his desk', 'He loved maps.', 'the map below',
  [(0, 'the ground falls away'), (1.6, 'coasts outline themselves'), (3.0, 'the map gets a paper edge'), (4.4, 'it lands on a desk')],
  'curious', 'wide', 'high sun', 'dive', ['Balloon', 'StudyDesk'])
R('CLUE1', "He saw the matching coasts. Later he wrote that it was like tearing a newspaper, and then fitting the torn pieces back *together*.", 'F9',
  'snap', 'the atlas on the desk', 'the atlas page becomes a newspaper; it tears in two; his hands slide the halves back together', 'Like a torn newspaper.', 'the torn newspaper',
  [(0, 'the atlas turns to newsprint'), (1.4, 'it rips in two'), (2.8, 'the halves drift'), (4.2, 'his hands push them back'), (5.4, 'the edges meet')],
  'curious', 'close', 'oil lamp on the desk', 'push', ['TornNews', 'StudyDesk'], 'torn-newspaper', motif='the seam — the torn newspaper')
R('CLUE1', "If the edges fit, and the lines of print run straight on across the tear, you could be sure the pieces were one page. But where was the *print*?", 'F9',
  'travel-line', 'the joined halves', 'a line of print runs from one half across the tear to the other, letter by letter', 'Print running across the tear proves it.', 'the line of print crossing',
  [(0, 'a word begins on the left half'), (1.4, 'it runs to the tear'), (2.6, 'it jumps the tear'), (3.8, 'it ends on the right half'), (5.0, 'a tick')],
  'curious', 'insert', 'oil lamp', 'track', ['TornNews'])
R('CLUE1', "So he went looking for the lines of print. Not on paper, but in the rocks and fossils on both sides of the *ocean*.", '-',
  'shrink-into', 'the print', 'the letters shrink into fossil shells and rock layers either side of a blue ocean on the map', 'He looked for the same rocks and fossils on both sides.', 'the fossils either side',
  [(0, 'the letters turn to shells'), (1.4, 'rock layers on the left'), (2.8, 'the same layers on the right'), (4.0, 'a magnifier sweeps across')],
  'curious', 'medium', 'lamp', 'pan-l', ['StudyDesk'])
R('CLUE1', "In 1912 he said it out loud. The continents had once been joined in one giant land, and had slowly drifted *apart*.", 'F2',
  'turn', 'the magnifier', 'a lecture hall in 1912: Wegener at a lectern, a map behind him; the continents on the map slide together', 'He announced it in 1912.', 'Wegener at the lectern',
  [(0, 'the hall inks on'), (1.4, 'Wegener lifts his pointer'), (2.8, 'the continents on the wall slide'), (4.2, 'they join'), (5.4, 'the audience leans in')],
  'awe', 'medium', 'gaslight', 'orbit', ['LectureHall'], 'lecture-1912')
R('CLUE1', "Later that giant land got a name: Pangaea, from the Greek for ‘all the *earth*’.", 'F10',
  'crane-in', 'the wall map', 'the joined land fills the frame; the word PANGAEA is stamped across it', 'Pangaea: all the earth.', 'the name',
  [(0, 'the map fills the frame'), (1.4, 'PANGAEA stamps on'), (2.6, 'the letters settle'), (3.4, 'the coast glows')],
  'awe', 'wide', 'gaslight, warm', 'snap-zoom', ['QuiltPangaea'], 'pangaea')
R('CLUE1', "Picture all the continents stitched together like a patchwork quilt, with seams where the oceans would one day *open*.", '-',
  'form', 'the name', 'Pangaea becomes a quilt: each continent a patch, the seams sewn in vermilion thread', 'One supercontinent, like a quilt.', 'the stitched seams',
  [(0, 'patches take on cloth texture'), (1.4, 'a needle sews the first seam'), (2.8, 'the second'), (4.2, 'the whole quilt'), (5.2, 'a seam puckers')],
  'warm', 'wide', 'soft lamp', 'crane-up', ['QuiltPangaea'], sp=None, motif='the seam — Pangaea’s stitches')
# ======================================================================== CLUE 2 — the same fossils on both sides
R('CLUE2', "And on that quilt, the print runs on across the seams. Take Mesosaurus: a small, slim reptile with a long snout that swam in fresh *water*.", 'F3',
  'walk-in', 'the quilt', 'a little reptile pops up on the quilt and walks along a patch; a puddle of lake under it', 'Mesosaurus, a small freshwater reptile.', 'the reptile',
  [(0, 'a head peeks over a seam'), (1.4, 'Mesosaurus climbs out'), (2.8, 'it walks'), (4.2, 'its tail swishes'), (5.6, 'it slips into a lake')],
  'curious', 'close', 'lamp', 'track', ['Mesosaurus', 'QuiltPangaea'], 'mesosaurus', stock=['P-02'])
R('CLUE2', "Its bones are found in southern Africa and in South America, and nowhere else on Earth. How could that *be*?", 'F3',
  'land-on', 'the swimming reptile', 'the reptile becomes a fossil skeleton; two copies land as pins, one on each continent of today’s map', 'Fossils only in Africa and South America.', 'the two pins',
  [(0, 'it freezes into bones'), (1.4, 'one pin lands in Brazil'), (2.6, 'one in South Africa'), (3.6, 'the rest of the map greys out')],
  'curious', 'medium', 'lamp', 'pull', ['FossilMap'])
R('CLUE2', "A freshwater swimmer could never cross a salty ocean thousands of kilometres wide. So how did it live on both *sides*?", 'F3',
  'ripple-through', 'the pins', 'the reptile tries to swim the Atlantic; waves rise; it turns back, splutters', 'It could not swim the ocean.', 'the reptile in the waves',
  [(0, 'it wades in'), (1.4, 'a wave rolls'), (2.8, 'it splutters'), (4.2, 'it turns back'), (5.2, 'a question mark')],
  'playful', 'close', 'grey sea light', 'handheld', ['FossilMap', 'Mesosaurus'])
R('CLUE2', "Unless, when it was alive, there was no ocean between them at all: just one lake, one shore, one *land*.", 'F3',
  'merge', 'the waves', 'the two continents slide together; the two pins meet in one lake; the reptile swims across happily', 'Back then, they were one land.', 'the joined lake',
  [(0, 'the ocean narrows'), (1.4, 'the coasts meet'), (2.6, 'the two pins become one lake'), (3.8, 'the reptile swims across')],
  'warm', 'medium', 'warm sun', 'pan-r', ['FossilMap', 'Mesosaurus'])
R('CLUE2', "Then there is a plant called Glossopteris, a seed fern with leaves shaped like tongues. Its fossils turn up in South America, Africa, India, *Australia*…", 'F3',
  'fly-out', 'the lake', 'tongue-shaped leaves blow off a fern and land on four continents of today’s map, one after another', 'The same fern on many continents.', 'each leaf landing',
  [(0, 'a fern unfurls'), (1.4, 'leaves blow off'), (2.6, 'one lands on South America'), (3.8, 'on Africa'), (5.0, 'on India'), (6.2, 'on Australia')],
  'curious', 'wide', 'warm breeze light', 'pan-l', ['Fern', 'FossilMap'], 'glossopteris', stock=['P-02'])
R('CLUE2', "…and Antarctica. A plant of mild, green forests, buried under the ice at the bottom of the *world*.", 'F3',
  'settle', 'the last leaf', 'the last leaf drifts down to Antarctica and is buried by snow, frozen in a block of ice', 'Even in Antarctica.', 'the leaf in the ice',
  [(0, 'the leaf drifts south'), (1.4, 'it lands on white Antarctica'), (2.6, 'snow falls over it'), (3.8, 'it freezes in a block')],
  'mystery', 'close', 'cold blue light', 'crane-down', ['FernIce'])
R('CLUE2', "Like a fern in a freezer. Either the climate had flipped completely, or Antarctica had once sat somewhere much *warmer*.", '-',
  'open', 'the ice block', 'a freezer door opens: a fern inside, frosted; the freezer slides north toward a warm sun and thaws', 'Antarctica was once somewhere warmer.', 'the freezer drifting north',
  [(0, 'a freezer door swings open'), (1.4, 'frost puffs out'), (2.8, 'the freezer slides north'), (4.2, 'the sun warms it'), (5.4, 'the fern unfolds')],
  'playful', 'medium', 'cold, then warm', 'dutch', ['FernIce'])
R('CLUE2', "Matching coasts, matching fossils. To Wegener, the torn newspaper read straight across the *tear*.", 'F9',
  'echo', 'the fern', 'back on the desk: the torn newspaper again, the print now made of reptiles and leaves, running across the tear', 'The evidence lined up.', 'the print across the tear',
  [(0, 'the newspaper returns'), (1.4, 'the print is little reptiles'), (2.8, 'and leaves'), (4.0, 'it runs across the tear')],
  'warm', 'insert', 'oil lamp', 'rack', ['TornNews', 'StudyDesk'], motif='the seam — the print crosses the tear')
# ======================================================================== CLUE 3 — the mocked idea and the man on the ice (set piece 2)
R('CLUE3', "But the experts were not convinced. Most geologists rejected the idea, and many of them mocked *it*.", 'F4',
  'swell', 'the newspaper', 'the lecture hall again: professors in rows laugh; the laughter rises like steam', 'Experts mocked him.', 'the laughing professors',
  [(0, 'the hall fills'), (1.4, 'the first laugh'), (2.6, 'the row laughs'), (3.8, 'steam rises from the laughter')],
  'tension', 'wide', 'gaslight', 'whip', ['LectureHall'], 'mockery')
R('CLUE3', "Their question was simple, and it was a good one. What force could push a whole continent through the solid floor of the *ocean*?", 'F4',
  'form', 'the steam', 'the steam hardens into a stone wall of speech bubbles, each saying “impossible!”', 'No force could do it.', 'the stone bubbles',
  [(0, 'the steam forms bubbles'), (1.4, '“impossible!”'), (2.8, 'another'), (4.0, 'they turn to stone'), (5.2, 'they stack into a wall')],
  'tension', 'close', 'cold gaslight', 'push', ['LectureHall'], 'stone-wall', sp=2)
R('CLUE3', "Wegener had no good answer. It sounded like claiming a ship could sail straight through rock. His idea began to *sink*.", 'F4',
  'empty-out', 'the stone wall', 'a toy ship tries to sail into a block of rock and crumples; the map behind it sinks out of sight', 'He had no answer.', 'the ship against the rock',
  [(0, 'a ship sails at the rock'), (1.4, 'it bumps'), (2.6, 'its bow crumples'), (3.8, 'it sinks'), (5.0, 'bubbles rise')],
  'sad', 'close', 'grey', 'tilt-down', ['RockShip'])
R('CLUE3', "He didn’t give up. He kept improving his book, and he kept going back to the place he loved most: the Greenland *ice*.", 'F2 F5',
  'page-turn', 'the bubbles', 'the bubbles become book pages turning through editions; the last page turns to white ice and a dog sledge', 'He kept going.', 'the sledge on the ice',
  [(0, 'pages turn'), (1.4, 'a new edition'), (2.8, 'the last page goes white'), (4.0, 'a sledge crosses it')],
  'calm', 'wide', 'white Arctic light', 'pan-r', ['GreenlandIce'], stock=['D-01'])
R('CLUE3', "In 1930 he led an expedition onto the ice cap, hauling supplies to a camp in the middle of Greenland through storms of terrible *cold*.", 'F5',
  'blow', 'the sledge', 'a blizzard rolls across: Wegener and a companion push on beside the sledge, heads down', 'The 1930 expedition.', 'the two men in the storm',
  [(0, 'wind picks up'), (1.4, 'snow streaks'), (2.8, 'the two men lean into it'), (4.2, 'the dogs pull'), (5.6, 'the camp flag far ahead')],
  'tension', 'wide', 'white blizzard', 'handheld', ['GreenlandIce'], 'blizzard', sp=2, stock=['P-01', 'R-01'])
R('CLUE3', "In November, on the way back from that camp, he never arrived. His body was found the next year, under the *snow*.", 'F5',
  'dim', 'the storm', 'a small tent in the blizzard; inside, a lamp; snow piles up; the lamp gutters and goes out', 'He died on the ice.', 'the tent lamp',
  [(0, 'the tent in the snow'), (1.6, 'the lamp glows'), (3.0, 'snow drifts up'), (4.4, 'the lamp flickers'), (5.6, 'it goes out')],
  'sad', 'close', 'a lamp, then darkness', 'push', ['GreenlandTent'], 'lamp-out', sp=2)
R('CLUE3', "He had just turned fifty. Nobody knew it yet, but he died decades before anyone could prove that he had been *right*.", 'F5',
  'blur', 'the dark tent', 'silence: only snow falling on a cross of skis over a mound', 'He never saw the proof.', 'the skis in the snow',
  [(0, 'snow falls'), (1.6, 'a pair of skis stand crossed'), (3.0, 'snow settles on them')],
  'sad', 'wide', 'pale blue dusk', 'lock', ['GreenlandTent'])
R('CLUE3', "For thirty years his idea lay buried too, like a seed under the snow, waiting for proof from the last place anyone *looked*.", 'F5 F7',
  'crane-down', 'the skis', 'we sink through the snow: a seed lies under it; the snowfield flattens into a blank white sea chart', 'The idea waited for proof.', 'the seed under the snow',
  [(0, 'we sink into the snow'), (1.4, 'a seed lies there'), (2.8, 'it sends a tiny root'), (4.2, 'the snow flattens'), (5.6, 'it becomes a white chart')],
  'mystery', 'insert', 'blue, under snow', 'crane-down', ['GreenlandTent', 'SeaChart'], motif='the seam — a root crack in the snow')
# ======================================================================== CLUE 4 — the striped sea floor (set piece 3)
R('CLUE4', "That place was the bottom of the sea. In the 1950s, the deep ocean floor was almost as unknown as the far side of the *Moon*.", 'F6',
  'empty', 'the white chart', 'the white chart: an empty ocean with a sea monster in the corner, beside a Moon with its far side blank', 'The sea floor was unknown.', 'the blank floor',
  [(0, 'the chart is white'), (1.4, 'a sea monster doodle'), (2.8, 'a Moon beside it'), (4.2, 'its far side blank')],
  'mystery', 'wide', 'grey sea light', 'pull', ['SeaChart'], 'blank-chart')
R('CLUE4', "Ships began to explore it. They sent pings of sound into the deep, and towed instruments behind them on long *cables*.", 'F6',
  'glide', 'the chart', 'a survey ship crosses the chart; sound rings pulse down; a cable trails behind with an instrument', 'Ships surveyed the deep.', 'the ship and its cable',
  [(0, 'a ship sails on'), (1.4, 'a ping rings down'), (2.8, 'another'), (4.0, 'a cable pays out behind'), (5.4, 'the instrument sinks')],
  'curious', 'wide', 'grey sea light', 'track', ['SurveyShip'], 'survey-ship')
R('CLUE4', "One of those instruments was a magnetometer: a kind of super-sensitive compass that feels how strongly the rocks below are *magnetic*.", 'F6',
  'x-ray', 'the instrument', 'the towed instrument opens like a cutaway: inside, a compass needle quivers over the rocks', 'A magnetometer: a sensitive compass.', 'the needle',
  [(0, 'the casing opens'), (1.4, 'a compass inside'), (2.8, 'the needle quivers'), (4.2, 'it swings stronger'), (5.4, 'weaker')],
  'curious', 'insert', 'blue underwater light', 'push', ['SurveyShip'])
R('CLUE4', "As the ship sailed, a pen on board drew a wiggly line. And when the wiggles were put on a map, they made something nobody *expected*.", 'F6',
  'trace-to', 'the needle', 'on deck, a pen scribbles a wiggly line on a paper roll; the roll unrolls onto the chart', 'A pen drew the readings.', 'the pen',
  [(0, 'the pen scratches'), (1.4, 'the roll advances'), (2.8, 'the wiggles grow'), (4.2, 'the roll spills onto the chart')],
  'curious', 'detail', 'ship lamp', 'tilt-down', ['PenRecorder'], 'pen', sp=3)
R('CLUE4', "Stripes. Long bands of stronger and weaker magnetism lying across the sea floor, like the black and white keys of a *piano*.", 'F6',
  'band', 'the wiggly line', 'the wiggles fill in as stripes, dark and light, across the ocean floor; a piano keyboard echoes them', 'Magnetic stripes.', 'the stripes',
  [(0, 'the first stripe fills'), (1.4, 'another'), (2.6, 'another'), (3.8, 'they look like piano keys'), (5.0, 'a note sounds')],
  'awe', 'wide', 'deep indigo, gold stripes', 'crane-up', ['StripeFloor'], 'stripes', sp=3)
R('CLUE4', "And they ran alongside a great underwater mountain chain, the mid-ocean ridge, which winds round the planet like the seam on a *ball*.", 'F6',
  'travel-line', 'the stripes', 'the ridge rises out of the middle of the stripes and runs on round a globe like a baseball’s seam', 'They follow the mid-ocean ridge.', 'the ridge seam',
  [(0, 'a ridge rises'), (1.4, 'it runs north'), (2.8, 'we pull out to a globe'), (4.2, 'it winds like a ball’s seam')],
  'awe', 'wide', 'indigo', 'orbit', ['StripeFloor', 'RidgeGlobe'], motif='the seam — the ridge')
R('CLUE4', "Stranger still, the stripes on one side of the ridge were a mirror image of the stripes on the *other*.", 'F6',
  'blink', 'the globe', 'back to the stripes: each stripe on the left lights up with its twin on the right', 'The stripes mirror each other.', 'the twin stripes',
  [(0, 'a left stripe lights'), (1.2, 'its twin on the right'), (2.4, 'the next pair'), (3.6, 'the next')],
  'awe', 'medium', 'indigo, gold', 'lock', ['StripeFloor'])
R('CLUE4', "Fold the map along the ridge, and the pattern lands on itself, stripe for *stripe*.", 'F6',
  'fold', 'the twin stripes', 'the map folds along the ridge like a page; the stripes meet exactly; a vermilion line flashes', 'They match when folded.', 'the fold',
  [(0, 'the map lifts'), (1.2, 'it folds over'), (2.4, 'stripes meet'), (3.2, 'a flash')],
  'awe', 'close', 'gold flash', 'dolly', ['StripeFloor'], 'fold', sp=3, motif='the seam — the fold along the ridge')
R('CLUE4', "Why would the sea floor be striped? And why the same on both sides, like the wings of a *butterfly*?", '-',
  'wing', 'the fold', 'the folded stripes open again like butterfly wings and beat once', 'Why symmetrical?', 'the butterfly',
  [(0, 'the fold opens'), (1.2, 'into wings'), (2.4, 'they beat'), (3.6, 'a question mark')],
  'mystery', 'medium', 'indigo', 'arc', ['StripeFloor'])
# ======================================================================== TWIST — the tape recorder
R('TWIST', "In 1963, two scientists in Cambridge, Fred Vine and Drummond Matthews, saw what the stripes meant. And it changed *everything*.", 'F7',
  'turn-head', 'the wings', 'two young men lean over a desk with the striped chart; one looks up, eyes wide', 'Vine and Matthews, 1963.', 'the two men',
  [(0, 'a desk with the chart'), (1.4, 'Vine points'), (2.8, 'Matthews leans in'), (4.2, 'they look at each other')],
  'awe', 'close', 'desk lamp', 'push', ['Cambridge'], 'vine-matthews')
R('TWIST', "Every so often, Earth’s magnetic field flips. North becomes south. A compass would swing round and point the other *way*.", 'F7',
  'turn', 'the two men', 'a big compass on the desk: its needle swings round and points south, then back, again and again', 'Earth’s magnetism flips.', 'the needle',
  [(0, 'the needle points north'), (1.4, 'it swings'), (2.6, 'south'), (3.8, 'it swings back'), (5.0, 'again')],
  'awe', 'insert', 'desk lamp', 'snap-zoom', ['Compass'])
R('TWIST', "At the ridge, hot melted rock wells up from below, cools, and locks in the direction of the field, like music recorded onto a *tape*.", 'F7',
  'rise-from', 'the compass', 'cross-section of the ridge: glowing rock wells up, cools from orange to dark; tiny arrows inside freeze pointing north', 'New rock records the field.', 'the welling rock',
  [(0, 'a crack in the floor'), (1.4, 'glowing rock wells up'), (2.8, 'it cools'), (4.2, 'arrows freeze inside'), (5.4, 'a tape head icon')],
  'awe', 'close', 'magma glow from below', 'crane-up', ['RidgeTape'], 'ridge-tape', sp=3)
R('TWIST', "Then it’s pushed aside by newer rock, and newer, out to both sides. The sea floor is a tape recorder, playing out in two *directions*.", 'F7',
  'stream', 'the cooled rock', 'the floor moves out both ways like two tapes from a reel; each band carries its arrows away', 'The floor spreads both ways.', 'the two tapes moving',
  [(0, 'the floor shoves outward'), (1.4, 'a new band forms'), (2.8, 'another'), (4.2, 'the bands march away'), (5.6, 'reels turn at the edges')],
  'awe', 'wide', 'magma glow', 'pan-r', ['RidgeTape'], motif='the seam — the ridge as a tape head')
R('TWIST', "So that is why the sea floor is striped: the stripes are the flips, written into stone. The ocean floor is being made right now, and it is *moving*.", 'F7',
  'light-change', 'the tapes', 'the arrows in each band flip N/S; the bands light gold and dark in alternation — the stripes', 'Stripes are the flips. The floor moves.', 'the alternating arrows',
  [(0, 'arrows north'), (1.2, 'next band south'), (2.4, 'north'), (3.4, 'the bands become the stripes')],
  'awe', 'close', 'indigo, gold', 'pull', ['RidgeTape'])
# ======================================================================== ANSWER
R('ANSWER', "If the sea floor moves, the continents ride along with it. They don’t plough through the ocean; they travel with it, like boxes on a conveyor *belt*.", 'F7 F11',
  'stream-through', 'the stripes', 'the floor becomes a conveyor belt; continents sit on it like parcels and ride away; it passes a snowy grave', 'The continents ride the moving floor.', 'the parcels riding',
  [(0, 'the belt runs'), (1.4, 'Africa rides on it'), (2.8, 'South America the other way'), (4.2, 'a snowy cross rides past'), (5.6, 'the cross is gently carried')],
  'awe', 'wide', 'warm', 'track', ['RidgeTape'], 'conveyor', motif=None)
R('ANSWER', "Wegener was right that the continents move. He was wrong only about how. The Earth’s outer shell is cracked into giant moving *plates*.", 'F11',
  'cut-open', 'the conveyor', 'a globe: its shell cracks like an eggshell into plates, outlined in vermilion', 'Plates.', 'the cracking shell',
  [(0, 'a globe'), (1.4, 'the first crack'), (2.6, 'cracks spread'), (3.8, 'plates outlined'), (5.0, 'they shift a little')],
  'awe', 'wide', 'space dark, warm rim', 'arc', ['PlateGlobe'], 'plates')
R('ANSWER', "Where plates pull apart, new sea floor is born. Where they push together, one dives deep under the other, and the ground *shakes*.", 'F11',
  'dive', 'the globe', 'cross-section: one plate slides down under another into the hot mantle; earthquake stars flash along the edge', 'New floor at ridges; old floor dives at trenches.', 'the diving plate',
  [(0, 'two plates meet'), (1.4, 'one bends down'), (2.8, 'it slides under'), (4.2, 'quakes flash'), (5.4, 'a volcano puffs')],
  'tension', 'close', 'red glow below', 'tilt-down', ['Trench'], 'trench')
R('ANSWER', "Where two continents crash, the land crumples like a rug shoved against a wall. That is how the Himalaya were *born*.", 'F11',
  'wobble', 'the quake', 'a rug slides along a floor into a wall and wrinkles; the wrinkles become snowy Himalayan peaks', 'Mountains are wrinkles.', 'the rug wrinkling',
  [(0, 'a rug slides'), (1.4, 'it hits a wall'), (2.6, 'it wrinkles'), (3.8, 'the wrinkles turn to peaks'), (5.0, 'snow on the peaks')],
  'playful', 'wide', 'high sun', 'crane-up', ['RugHimalaya'], 'rug-mountains')
R('ANSWER', "And the Atlantic, where Wegener first saw the tear, is still opening today, along the seam where South America and Africa came *apart*.", 'F8',
  'scale-out', 'the peaks', 'from above: the Atlantic with the ridge running down its middle; the two sides creep apart', 'The Atlantic is still opening.', 'the ridge seam',
  [(0, 'we rise above the ocean'), (1.4, 'the ridge seam glows'), (2.8, 'the coasts creep apart'), (4.2, 'the seam widens a hair')],
  'awe', 'wide', 'satellite daylight', 'crane-up', ['AtlanticOpen'], motif='the seam — the Atlantic tear today')
R('ANSWER', "We can measure it now from space. Satellites send signals to markers bolted into rock on each *continent*, and time them precisely.", 'F8',
  'search', 'the ocean', 'a satellite above; beams drop to a brass marker bolted into rock; a tiny distance ticks up', 'Satellites measure it.', 'the beam on the marker',
  [(0, 'a satellite glides'), (1.4, 'a beam drops'), (2.8, 'it hits a marker'), (4.0, 'another beam'), (5.2, 'numbers tick')],
  'curious', 'medium', 'clear sky', 'rack', ['GPSMarker'], 'gps')
# ======================================================================== MEANING
R('MEANING', "The answer: a few centimetres every year. About as fast as your fingernails *grow*.", 'F8',
  'count-up', 'the marker', 'a ruler beside the marker, then a hand beside the ruler: the fingernail and the gap grow together', 'As fast as fingernails.', 'the fingernail',
  [(0, 'a ruler lays down'), (1.4, 'a hand rests beside it'), (2.6, 'the nail grows'), (3.6, 'the gap grows the same')],
  'warm', 'insert', 'warm daylight', 'push', ['NailAtlantic'], 'fingernail')
R('MEANING', "Too slow to see. But give it two hundred million years, and that fingernail’s width became a whole *ocean*.", 'F8 F10',
  'spread', 'the fingernail', 'the nail line becomes the Atlantic: Pangaea’s quilt seam opens out stitch by stitch into an ocean', 'Tiny steps make an ocean.', 'the opening seam',
  [(0, 'the nail line glows'), (1.4, 'it becomes the quilt seam'), (2.8, 'the stitches pop'), (4.2, 'the ocean opens'), (5.4, 'a counter: 200 million years')],
  'awe', 'wide', 'warm', 'pull', ['NailAtlantic', 'QuiltPangaea'], motif='the seam — the quilt opens into the Atlantic')
R('MEANING', "And it hasn’t stopped. Far in the future the continents will fit together again in a new way, a puzzle no one has ever *seen*.", 'F11',
  'time-lapse', 'the ocean', 'time runs forward: continents drift into a new arrangement and become pieces of a jigsaw on the child’s table', 'A future world.', 'the new puzzle',
  [(0, 'continents drift'), (1.4, 'they cross'), (2.8, 'a new shape forms'), (4.2, 'it becomes jigsaw pieces'), (5.4, 'on the table again')],
  'awe', 'wide', 'warm lamp', 'orbit', ['Jigsaw'], 'future-jigsaw', motif='the seam — the future jigsaw')
R('MEANING', "Alfred Wegener never saw the proof. But the torn edges he noticed in an old atlas were real. The world really had been pulled *apart*.", 'F5',
  'echo', 'the jigsaw', 'beside the jigsaw, the old torn atlas from the start; his photograph slides into the tear', 'He was right.', 'the torn atlas',
  [(0, 'the torn atlas lies there'), (1.4, 'a photo slides in'), (2.8, 'the lamp warms'), (4.2, 'the halves inch apart')],
  'warm', 'medium', 'warm lamp', 'pan-l', ['AtlasPage', 'Jigsaw'], 'bookend', motif='the seam — the torn atlas again', stock=['P-01'])
R('MEANING', "The ground under your feet is moving right now. Slowly, quietly, about as fast as your fingernails grow… and it always *has*.", 'F8',
  'dissolve', 'the atlas', 'a child’s hand slides two jigsaw pieces a hair apart; the camera rises; the page fades to paper', 'The ground is moving now.', 'the hand on the pieces',
  [(0, 'a hand on the pieces'), (1.4, 'it slides one a hair'), (2.8, 'we rise'), (4.2, 'paper')],
  'calm', 'close', 'lamp fading', 'crane-up', ['Jigsaw'])

ROWS[5][13]['gap'] = 6.2
for i, r in enumerate(ROWS):
    if i and r[0] != ROWS[i - 1][0] and r[0].startswith('CLUE'): r[13]['gap'] = 1.5
SRC = {'F1': 'S1 S2', 'F2': 'S1 S3', 'F3': 'S2 S4', 'F4': 'S2 S3', 'F5': 'S3 S5', 'F6': 'S6 S7', 'F7': 'S6 S7 S8', 'F8': 'S9 S10', 'F9': 'S3 S11', 'F10': 'S2 S11', 'F11': 'S10 S12'}
H = os.path.dirname(os.path.abspath(__file__))
if __name__ == '__main__':
    write(H, 'drifting-continents', 'How do we know the continents move?', ROWS, SRC,
          ['device TornNews — a newspaper torn in two whose line of print runs on across the tear', 'device QuiltPangaea — the supercontinent as a stitched quilt whose seams open into oceans',
           'device RidgeTape — the sea floor as a tape running out both ways from the ridge, arrows frozen in each band', 'device NailAtlantic — a fingernail beside a ruler that becomes the Atlantic'],
          {'file': '../studio/music/wonder_dreamer.wav', 'db': -24, 'start': 0}, {'t': 1, 'title': 'How do we know the *continents* move?', 'kicker': 'Fathom'}, standard=6)
