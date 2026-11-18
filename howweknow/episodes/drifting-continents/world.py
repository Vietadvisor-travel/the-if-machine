#!/usr/bin/env python3
"""drifting-continents — the story world (engine 10). Staging ONLY: helpers in tools/world_kit.py.
Chain: jobs/scripts/drifting-continents_chain.md (one action + one camera move per line). Gates: event_check · novelty · plan_check · check_world · sound_check.
Governing image: the torn atlas page. Motif: the TEAR / SEAM (jigsaw edge → atlas tear → torn newspaper → quilt stitches → the ridge → the fold →
the Atlantic seam today → the future jigsaw → the torn atlas again). Drawings: src/lib/drifting-continents/ (a.tsx acts I–II, b.tsx acts III–V)."""
import json, os, sys; sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../tools')); from world_kit import *
E = init(__file__)
import world_kit as _wk; ST, PD = _wk.ST, _wk.PD
VERM, CREAM, INK = '#B8432A', '#F4EAD5', '#2B1D12'
C = dict(x=960, y=540, s=1)
def A_(id, i, *fp):   # beats inside line i: (frac, {props}) or (frac, dur, {props})
    B(id, i, *[(f[0], f[1] if len(f) == 3 else .9, 'soft', f[-1]) for f in fp])
WEG = {'costume': 'wegener1912', 'beard': 'moustache', 'face': {'nose': .55, 'brow': .5, 'chin': .5, 'age': .4, 'build': .95}, 'hairCol': '#4A3A2A', 'skin': .26}
WEGA = {**WEG, 'costume': 'wegenerArctic', 'beard': 'short'}
VIL = {'costume': 'villumsen1930', 'face': {'nose': .45, 'brow': .45, 'chin': .45, 'age': .25, 'build': 1.0}, 'hairCol': '#231A16', 'skin': .42}
VINE = {'costume': 'vine1963', 'face': {'nose': .5, 'brow': .45, 'chin': .45, 'age': .2, 'build': .95}, 'hairCol': '#5A3A22', 'skin': .26}
MATT = {'costume': 'matthews1963', 'face': {'nose': .55, 'brow': .55, 'chin': .5, 'age': .35, 'build': 1.05}, 'hairCol': '#231A16', 'skin': .27}
ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': .35, 'light': .4, **grade('curious'), 'push': 1, 'pan_x': 0, 'pan_y': 0, 'dof': 0, 'focus': 0, 'shake': 0, 'roll': 0, 'dolly': 0})
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'The Torn Page', 'a': 0}, [K(L(17, .5), .01, n=2, label='The Same Fossils'), K(L(25, .5), .01, n=3, label='The Man on the Ice'),
    K(L(33, .5), .01, n=4, label='Stripes Under the Sea')])

# ---------------------------------------------------------------- L0–L3 · SET PIECE 1: the jigsaw becomes the atlas, and the atlas tears
art('jig0', 'Jigsaw', L(0), None, [], inkdur=1.8, slide=0, glow=0, future=0, hand=0, apart=0, **C, z=10, xs='fade')
A_('jig0', 0, (.18, 1.4, {'hand': 1}), (.32, 1.6, {'slide': .85}), (.55, .4, {'slide': 1}), (.7, {'glow': 1}), (.88, {'glow': .4}))
G('jig0')['keys'] += gone2(L(1, .1), 'fade', 1.2)
lamp('lp0', [420, 200], L(0), L(4, .2), r=1200, dark=.4, warm=.85)
SF(0, .55, 'blip_click_3.wav', 0); SF(0, .2, 'world_footstep_wood_1.wav', -4)
art('atl1', 'AtlasPage', L(1), None, [], enter='focus', trace=0, ghost=0, tear=0, gap=0, q=0, **C, z=8, xs='burn')
A_('atl1', 1, (.25, 1.4, {'trace': .5}), (.55, 1.4, {'trace': 1}), (.85, {'trace': 0}))
A_('atl1', 2, (.08, 1.6, {'ghost': .5}), (.35, 1.4, {'ghost': 1}), (.62, .9, {'ghost': .95}), (.8, 1.4, {'ghost': 0}))
A_('atl1', 3, (.08, .6, {'tear': .15}), (.22, 1.6, {'tear': 1}), (.45, 1.6, {'gap': .6}), (.66, 1.2, {'gap': 1}), (.8, {'q': 1}))
G('atl1')['keys'] += gone2(L(4, .2), 'burn', 1.6, [960, 540])
mark('mk2', 'circle', [700, 380, 520, 360], L(2, 6.2), L(3, .2), w=4)
SF(1, .3, 'foley_page_turn_1.wav', 0); SF(2, .35, 'swoosh_thin_1.wav', -3); SF(3, .2, 'machine_paper_1.wav', 2); SF(3, .7, 'scratch_1.wav', -4)

# ---------------------------------------------------------------- L4–L8 · the ground that never moves; four clues; the town that grows round a rock
art('mr4', 'MeadowRock', L(4, .1), None, [], enter='pour', eo='down', boots=0, stamp=0, snail=0, grow=0, town=0, night=0, shift=0, hour=0, sand=0, x=960, s=1, z=6, xs='flip')
A_('mr4', 4, (.25, {'boots': 1}), (.45, .5, {'stamp': 1}), (.55, .5, {'stamp': 0}), (.62, .5, {'stamp': 1}), (.7, .5, {'stamp': 0}), (.78, 2.4, {'snail': 1}))
A_('mr4', 5, (.05, {'boots': 0}))
G('mr4')['keys'] += [K(L(5, .3), .8, 'soft', a=0)]
art('fc5', 'FourClues', L(5, .2), None, [], enter='scale', eo=[960, 600], n=0, **C, z=12, xs='lift')
A_('fc5', 5, (.2, .6, {'n': 1}), (.4, .6, {'n': 2}), (.6, .6, {'n': 3}), (.8, .6, {'n': 4}))
G('fc5')['keys'] += gone2(L(6, .1), 'lift', 1.0)
G('mr4')['keys'] += [K(L(6), .9, 'soft', a=1)]
A_('mr4', 6, (.05, 1.6, {'grow': .5}), (.2, 1.6, {'grow': 1}), (.35, 1.6, {'town': .4}), (.5, 1.6, {'town': .8}), (.66, 1.4, {'town': 1}), (.82, .8, {'shift': 1}))
A_('mr4', 7, (.05, 1.0, {'hour': 1}), (.18, 1.4, {'night': .5}), (.3, 1.2, {'night': 1}), (.42, 1.0, {'night': .3}), (.55, 1.0, {'night': 1}), (.75, 1.0, {'night': .2}))
G('mr4')['keys'] += [K(L(7, .1), dur(7) - .4, 'linear', sand=1)]
G('mr4')['keys'] += gone2(L(8, .2), 'flip', 1.1)
counter('c6', 'moved: {n} hair', 1500, 900, L(6, 6.0), L(7, .6), [K(L(6, 6.0), 1.0, 'out', num=1)], size=48, col=VERM)
SF(4, .22, 'world_footstep_gravel_4.wav', 0); SF(4, .5, 'thud_soft_1.wav', -2); SF(5, .2, 'impact_woodlight_1.wav', -2); SF(5, .6, 'impact_woodlight_1.wav', -3)
SF(6, .4, 'world_birds_1.wav', -4); SF(6, .82, 'sci_ui_tick_1.wav', 0); SF(7, .1, 'pour_sand_1.wav', -2); SF(7, .6, 'world_clock_tick_1.wav', -4)
# the title, screen-locked, in the breath before "So how did we find out?"
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'How do we know\nthe continents move?', 'sub': 'a story in four clues', 'a': 0, 'lock': 1},
    [K(L(5, -5.6), .01, a=1), K(L(5, -5.6), 2.0, 'linear', k=.5), K(L(5, -3.6), 2.0, 'linear', k=1), K(L(5, -1.2), 1.3, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(L(5, .2), .01, a=0)], z=90)
art('ml8', 'MapLeaves', L(8), None, [], enter='blinds', k=0, stamp=0, catch=0, **C, z=12, xs='right')
A_('ml8', 8, (.05, 1.6, {'k': .4}), (.25, 1.6, {'k': .7}), (.42, .5, {'stamp': 1}), (.6, 1.4, {'k': 1}), (.8, .7, {'catch': 1}))
G('ml8')['keys'] += gone2(L(9, .3), 'right', 1.0)
SF(8, .1, 'transition_whoosh_airy_1.wav', -2); SF(8, .42, 'impact_wood_3.wav', -3); SF(8, .8, 'swoosh_thin_2.wav', -2)

# ---------------------------------------------------------------- CLUE 1 — the torn page · Wegener lets a balloon go over Greenland
art('gi9', 'GreenlandIce', L(9), None, [], enter='wipe', eo='up', snow=0, sledge=0, flag=0, **C, z=4, xs='down')
person('weg9', 'Alfred Wegener, meteorologist, Greenland (1910s)', L(9, .6), None, [], x=820, y=960, h=520, facing=1, pose='stand', pose2='raise', pk=0, expr='focus', ek=0, look=[.4, -.6], **WEGA, z=14)
A_('weg9', 9, (.15, {'pk': 1}), (.42, .5, {'pose2': 'reach', 'pk': .3}), (.55, {'pk': 1, 'expr': 'smile', 'ek': 1}), (.78, {'pose2': 'look', 'pk': 1}))
art('bal9', 'Balloon', L(9, .4), None, [], enter='bleed', rise=0, bg=0, x=980, y=560, s=1, z=16, xs='up')
A_('bal9', 9, (.45, 1.8, {'rise': .3}), (.7, 1.8, {'rise': .6}))
A_('bal9', 10, (.05, 1.6, {'rise': 1}))
G('weg9')['keys'] += gone2(L(10, .2), 'down', .9); G('gi9')['keys'] += gone2(L(10, .5), 'down', 1.2); G('bal9')['keys'] += gone2(L(10, 3.0), 'up', 1.0)
art('pin9', 'CabinetCard', L(9, 5.2), L(10, .2), [], ink=False, src=ST + 'P-01_wegener-villumsen-greenland-1930.jpg', x=1520, y=380, w=360, h=260, rot=-3,
    caption='Wegener (left) and Villumsen, Greenland 1930', draw=1, enter='bleed', z=30, xs='burn')
text('pl9', 'Alfred Wegener · weather scientist', 'plate', 760, 160, L(9, 1.4), L(10, .2), size=40, col=INK)
art('sd10', 'StudyDesk', L(10, 1.2), None, [], enter='scale', eo=[960, 300], lamp=0, mag=0, shells=0, **C, z=8, xs='fade')
A_('sd10', 10, (.35, 1.2, {'lamp': 1}), (.6, 1.4, {'mag': .4}), (.82, 1.0, {'mag': .2}))
SF(9, .45, 'swoosh_thin_1.wav', -2); SF(9, .75, 'real_wind_3.wav', -4); SF(10, .3, 'transition_whoosh_airy_1.wav', -2); SF(10, .7, 'thud_soft_2.wav', -2)
# L11–L13 · the torn newspaper (device TornNews): the print runs across the tear
art('tn11', 'TornNews', L(11), None, [], enter='unroll', tear=0, gap=0, print=0, fossils=0, x=960, y=520, s=1, z=20, xs='tearout')
A_('tn11', 11, (.18, 1.0, {'tear': 1}), (.35, 1.2, {'gap': 1}), (.6, 1.4, {'gap': .3}), (.8, .8, {'gap': 0}))
A_('tn11', 12, (.08, 1.0, {'print': .25}), (.3, 1.0, {'print': .5}), (.5, .8, {'print': .62}), (.7, 1.0, {'print': 1}))
person('wegd11', 'Alfred Wegener at his desk (1911)', L(11, .6), L(12, .2), [], x=380, y=1040, h=640, facing=1, pose='reach', pose2='hold', pk=0, expr='focus', ek=1, look=[1, .3], **WEG, z=24, xs='left')
A_('wegd11', 11, (.5, {'pk': 1}), (.75, {'pk': .2, 'expr': 'smile'}))
mark('mk12', 'tick', [1360, 560, 80, 80], L(12, 7.4), L(13, .2), w=5)
G('tn11')['keys'] += gone2(L(13, .2), 'tearout', 1.0)
A_('sd10', 13, (.05, {'shells': .4}), (.25, 1.2, {'shells': 1}), (.45, 1.4, {'mag': 1}), (.7, 1.4, {'mag': .1}))
G('sd10')['keys'] += [K(L(10, 2.8), .8, 'soft', a=0), K(L(13), .8, 'soft', a=1)] + gone2(L(14, .2), 'fade', 1.0)
SF(11, .18, 'machine_paper_1.wav', 1); SF(11, .8, 'scratch_2.wav', -4); SF(12, .3, 'scratch_1.wav', -5); SF(12, .9, 'blip_click_4.wav', -2); SF(13, .45, 'swoosh_thin_2.wav', -3)
# L14 · 1912: the lecture; the wall map closes into one land
art('lh14', 'LectureHall', L(14), None, [], enter='iris', eo=[960, 420], map=0, laugh=0, steam=0, bubbles=0, stone=0, **C, z=6, xs='shatter')
person('wegl14', 'Alfred Wegener lecturing (1912)', L(14, .5), L(15, .2), [], x=520, y=960, h=470, facing=1, pose='explain', pose2='point', pk=0, expr='focus', ek=1, look=[1, -.2], **WEG, z=14)
A_('wegl14', 14, (.2, {'pk': 1}), (.55, {'pk': .2}), (.75, {'pk': 1, 'expr': 'awe'}))
A_('lh14', 14, (.3, 1.4, {'map': .4}), (.5, 1.4, {'map': .8}), (.66, .8, {'map': 1}))
text('pl14', 'Frankfurt · January 1912', 'plate', 1400, 160, L(14, 1.0), L(15, .2), size=38, col=CREAM, light=True)
lamp('lp14', [960, 120], L(14), L(15, .4), r=1100, dark=.45, warm=.8)
G('lh14')['keys'] += [K(L(15), .8, 'soft', a=0)]
SF(14, .3, 'world_door_creak_1.wav', -3); SF(14, .66, 'thud_soft_2.wav', -2)
# L15–L16 · PANGAEA, then the quilt (device QuiltPangaea)
art('qp15', 'QuiltPangaea', L(15), None, [], enter='brush', stamp=0, cloth=0, stitch=0, open=0, **C, z=8, xs='at')
A_('qp15', 15, (.25, .5, {'stamp': 1}), (.6, 1.2, {'stamp': .85}))
A_('qp15', 16, (.05, 1.4, {'cloth': 1, 'stamp': 0}), (.22, 1.4, {'stitch': .3}), (.42, 1.4, {'stitch': .6}), (.62, 1.4, {'stitch': 1}), (.82, .8, {'open': .06}), (.92, .5, {'open': 0}))
SF(15, .25, 'impact_wood_3.wav', 0); SF(16, .25, 'scratch_2.wav', -5); SF(16, .6, 'scratch_2.wav', -6)

# ---------------------------------------------------------------- CLUE 2 — the same fossils on both sides
art('ms17', 'Mesosaurus', L(17, .3), None, [], enter='glide', eo=[-500, 0], walk=0, swim=0, bones=0, splutter=0, x=760, y=600, s=.34, z=20, xs='fade')
G('ms17')['keys'] += [K(L(17, .3), dur(17) - 1, 'linear', walk=4, x=980)]
A_('ms17', 17, (.3, .6, {'tail': 1}), (.5, .6, {'tail': 0}), (.8, 1.0, {'swim': 1}))
art('pin17', 'Pinned', L(17, 6.4), L(18, .4), [], ink=False, src=ST + 'P-02_mesosaurus-tenuidens-senckenberg.jpg', x=1580, y=830, w=360, h=230, rot=3,
    caption='Mesosaurus fossil · Senckenberg', draw=1, enter='bleed', z=30, xs='burn')
G('qp15')['keys'] += gone2(L(18, .1), 'fade', .9)
A_('ms17', 18, (.02, 1.0, {'bones': 1}))
G('ms17')['keys'] += [K(L(18, 1.2), .7, 'soft', a=0)]
art('fm18', 'FossilMap', L(18, .4), None, [], enter='unroll', pins=0, grey=0, waves=0, close=0, leaves=0, ant=0, **C, z=8, xs='at')
A_('fm18', 18, (.25, .6, {'pins': .5}), (.45, .6, {'pins': 1}), (.7, 1.2, {'grey': 1}))
A_('fm18', 19, (.05, 1.4, {'waves': 1}), (.85, 1.0, {'waves': .5}))
art('ms19', 'Mesosaurus', L(19, .2), L(20, -0.1), [], ink=False, draw=1, walk=0, swim=1, bones=0, splutter=0, x=860, y=560, s=.55, z=22, xs='fade')
G('ms19')['keys'] += [K(L(19, .2), 2.4, 'linear', x=960, walk=2)]
A_('ms19', 19, (.35, .5, {'splutter': 1}), (.48, .5, {'splutter': 0}), (.58, .5, {'splutter': 1}), (.7, 1.0, {'flip': 1, 'splutter': 0}))
text('q19', '?', 'title', 1060, 380, L(19, 7.4), L(20, .3), size=120, col=VERM)
A_('fm18', 20, (.05, 1.4, {'close': .5, 'grey': .3, 'waves': 0}), (.3, 1.2, {'close': 1}), (.55, {'grey': 0}))
art('ms20', 'Mesosaurus', L(20, 3.0), L(21, .1), [], enter='focus', walk=0, swim=1, x=820, y=560, s=.45, z=22, xs='fade')
G('ms20')['keys'] += [K(L(20, 3.0), 3.0, 'linear', x=1080, walk=3)]
SF(17, .3, 'world_footstep_gravel_4.wav', -6); SF(17, .82, 'pond_water_1.wav', -2); SF(18, .3, 'impact_woodlight_1.wav', -2); SF(18, .5, 'impact_woodlight_1.wav', -4)
SF(19, .1, 'pond_water_1.wav', -3); SF(19, .4, 'dropper_1.wav', -2); SF(20, .3, 'swoosh_deep_1.wav', -3); SF(20, .7, 'pond_water_1.wav', -4)
# L21–L23 · Glossopteris on four continents — and Antarctica; the fern in a freezer
A_('fm18', 21, (.3, .6, {'leaves': 1, 'close': 0}), (.45, .6, {'leaves': 2}), (.62, .6, {'leaves': 3}), (.8, .6, {'leaves': 4}))
art('fern21', 'Fern', L(21), L(21, 4.0), [], enter='pour', eo='up', unfurl=0, blow=0, x=300, y=640, s=.8, z=24, xs='left')
A_('fern21', 21, (.05, 1.2, {'unfurl': 1}), (.2, 1.4, {'blow': 1}))
A_('fm18', 22, (.05, 1.0, {'ant': 1}))
G('fm18')['keys'] += gone2(L(22, 2.0), 'at', 1.0, [960, 900])
art('fi22', 'FernIce', L(22, 1.6), None, [], enter='focus', snow=0, freeze=0, freezer=0, thaw=0, **C, z=10, xs='burn')
A_('fi22', 22, (.35, 1.4, {'snow': .6}), (.55, 1.2, {'snow': 1}), (.78, 1.0, {'freeze': 1}))
A_('fi22', 23, (.05, 1.0, {'freezer': 1}), (.3, 1.4, {'thaw': .4}), (.55, 1.4, {'thaw': .8}), (.78, 1.0, {'thaw': 1}))
art('pin22', 'Pinned', L(22, 3.8), L(23, .3), [], ink=False, src=ST + 'P-02_glossopteris-leaf-antarctica.jpg', x=1540, y=300, w=380, h=280, rot=-2,
    caption='Glossopteris leaf · Antarctica', draw=1, enter='bleed', z=30, xs='burn')
G('fi22')['keys'] += gone2(L(24, .1), 'burn', 1.2, [960, 540])
SF(21, .25, 'transition_whoosh_airy_1.wav', -3); SF(21, .62, 'impact_soft_3.wav', -3); SF(22, .1, 'real_wind_4.wav', -3); SF(22, .78, 'crack_wood_1.wav', -4)
SF(23, .05, 'world_door_creak_1.wav', -2); SF(23, .55, 'dropper_2.wav', -3)
# L24 · the newspaper again: the print is reptiles and leaves, running across the tear
art('tn24', 'TornNews', L(24, .2), None, [], enter='tear', tear=1, gap=.5, print=0, fossils=1, x=960, y=520, s=1, z=20, xs='shatter')
A_('tn24', 24, (.12, 1.0, {'gap': 0}), (.3, 1.2, {'print': .5}), (.55, 1.2, {'print': 1}), (.78, .8, {'gap': .05}))
G('tn24')['keys'] += gone2(L(25, .2), 'fade', 1.0)
SF(24, .12, 'machine_paper_1.wav', -2); SF(24, .55, 'scratch_1.wav', -5)

# ---------------------------------------------------------------- CLUE 3 — the mocked idea (set piece 2) and the man on the ice
G('lh14')['keys'] += [K(L(25), .8, 'soft', a=1, map=0)]
A_('lh14', 25, (.2, .5, {'laugh': .5}), (.38, .5, {'laugh': 1}), (.55, .5, {'laugh': .6}), (.68, 1.4, {'steam': 1, 'laugh': 1}))
A_('lh14', 26, (.1, .8, {'bubbles': .4}), (.3, .8, {'bubbles': .8}), (.5, .8, {'bubbles': 1}), (.68, 1.2, {'stone': .5}), (.85, 1.0, {'stone': 1}))
G('lh14')['keys'] += gone2(L(27, .2), 'shatter', 1.1, [960, 540])
SF(25, .38, 'critter_cat_purr_1.wav', -10); SF(25, .7, 'swoosh_thin_1.wav', -4); SF(26, .3, 'blip_click_3.wav', -4); SF(26, .7, 'impact_soft_3.wav', 0); SF(26, .88, 'thud_soft_1.wav', 1)
art('rs27', 'RockShip', L(27, .4), None, [], enter='wipe', eo='right', sail=0, crumple=0, sink=0, **C, z=10, xs='down')
A_('rs27', 27, (.05, 1.6, {'sail': 1}), (.3, .5, {'crumple': .5}), (.42, .6, {'crumple': 1}), (.6, 1.6, {'sink': .6}), (.82, 1.2, {'sink': 1}))
G('rs27')['keys'] += gone2(L(28, .2), 'down', 1.0)
SF(27, .3, 'crack_wood_1.wav', 0); SF(27, .62, 'pond_water_1.wav', -2); SF(27, .85, 'dropper_1.wav', -4)
# L28 · the book's editions (D-01) turn into the white ice; a sledge crosses
art('d28', 'DocumentPage', L(28, .2), L(28, 4.4), [], ink=False, src=ST + 'D-01_wegener-1915-carbon-reconstruction.jpg', x=960, y=480, w=760, h=520, rot=-1,
    caption='Wegener’s own maps, 1922 edition', draw=1, enter='bleed', z=30, xs='flip')
G('gi9')['keys'] += [K(L(28, 3.6), 1.2, 'soft', a=1, dissolve=1, snow=0, sledge=0)]
A_('gi9', 28, (.6, 2.0, {'sledge': .5}), (.82, 1.6, {'sledge': .8}))
A_('gi9', 29, (.05, 1.4, {'snow': .5, 'flag': 1}), (.25, 1.4, {'snow': 1}), (.6, 1.4, {'sledge': 1}))
person('weg29', 'Alfred Wegener on the ice cap (1930)', L(29, .6), None, [], x=640, y=980, h=440, facing=1, pose='stand', walk=0, expr='worry', ek=1, look=[1, .2], **WEGA, z=16)
person('vil29', 'Rasmus Villumsen, Greenlandic guide (1930)', L(29, .9), None, [], x=420, y=990, h=430, facing=1, pose='stand', walk=0, expr='worry', ek=1, look=[1, .2], **VIL, z=15)
G('weg29')['keys'] += [K(L(29, .6), dur(29) - .8, 'linear', walk=5, x=980)]; G('vil29')['keys'] += [K(L(29, .9), dur(29) - 1.0, 'linear', walk=5, x=760)]
A_('weg29', 29, (.4, {'lean': 14}), (.75, {'nod': 10}))
art('pin29', 'Pinned', L(29, 2.6), L(30, .2), [], ink=False, src=ST + 'R-01_eismitte-station-1930.jpg', x=1560, y=260, w=380, h=260, rot=2, caption='Eismitte camp, 1930', draw=1, enter='bleed', z=30, xs='burn')
G('gi9')['keys'] += gone2(L(30, .3), 'up', 1.2)
for e in ('weg29', 'vil29'): G(e)['keys'] += gone2(L(30, .3), 'lift', 1.2)
ent('snow29', 'particles', {'kind': 'snow', 'n': 90, 'k': 0, 'a': .9, 'speed': 1.4, 'para': .5}, [K(L(29, .2), 1.4, k=1), K(L(32, 2.0), 1.6, k=0)], z=70)
SF(28, .3, 'foley_page_turn_1.wav', -2); SF(28, .65, 'world_footstep_gravel_4.wav', -6); SF(29, .1, 'real_wind_4.wav', 2); SF(29, .55, 'world_footstep_gravel_4.wav', -4)
# L30–L32 · the tent: the lamp goes out (held breath); the skis; a seed under the snow
art('gt30', 'GreenlandTent', L(30, .1), None, [], enter='focus', snow=0, lamp=1, skis=0, under=0, root=0, **C, z=8, xs='at')
A_('gt30', 30, (.2, 1.4, {'snow': .4}), (.42, .4, {'lamp': .6}), (.5, .4, {'lamp': 1}), (.62, 1.4, {'snow': .8}), (.75, .4, {'lamp': .4}), (.86, .9, {'lamp': 0}))
A_('gt30', 31, (.15, 1.6, {'skis': 1}), (.55, 1.6, {'snow': 1}))
A_('gt30', 32, (.05, 1.6, {'under': 1}), (.3, 1.4, {'root': .5}), (.5, 1.4, {'root': 1}))
counter('c31', 'Alfred Wegener · 1880–{n}', 960, 940, L(31, .8), L(32, .2), [K(L(31, .8), 1.4, 'out', num=1930)], size=46, col=CREAM, light=True)
G('gt30')['keys'] += gone2(L(32, 5.4), 'fade', 1.2)
art('sc32', 'BlankSeaChart', L(32, 5.0), None, [], enter='bleed', monster=0, moon=0, sound=0, **C, z=6, xs='left')
SF(30, .2, 'real_wind_3.wav', 0); SF(30, .86, 'swoosh_thin_2.wav', -6); SF(31, .2, 'thud_soft_2.wav', -4); SF(32, .3, 'crack_wood_1.wav', -8); SF(32, .8, 'foley_page_turn_1.wav', -3)

# ---------------------------------------------------------------- CLUE 4 — the striped sea floor (set piece 3)
A_('sc32', 33, (.1, {'monster': 1}), (.4, 1.2, {'moon': 1}), (.7, 1.0, {'sound': .3}))
art('ss34', 'SurveyShip', L(34), None, [], enter='glide', eo=[0, -300], sail=0, ping=0, cable=0, xray=0, needle=0, **C, z=12, xs='down')
G('ss34')['keys'] += [K(L(34), dur(34) + dur(35), 'linear', sail=1)]
A_('sc32', 34, (.2, 1.4, {'sound': 1}))
G('sc32')['keys'] += [K(L(34, .2), .9, 'soft', a=.25)]
A_('ss34', 34, (.15, .8, {'ping': 1}), (.32, .01, {'ping': 0}), (.35, .8, {'ping': 1}), (.55, 1.4, {'cable': .6}), (.78, 1.2, {'cable': 1}))
A_('ss34', 35, (.15, 1.2, {'xray': 1}), (.4, .6, {'needle': .7}), (.55, .6, {'needle': -.4}), (.7, .6, {'needle': .9}), (.85, .6, {'needle': -.2}))
G('ss34')['keys'] += gone2(L(36, .2), 'down', 1.0); G('sc32')['keys'] += gone2(L(36, .2), 'left', 1.0)
art('pr36', 'PenRecorder', L(36, .2), None, [], enter='iris', eo=[960, 540], k=0, spill=0, **C, z=14, xs='at')
G('pr36')['keys'] += [K(L(36, .3), dur(36) * .7, 'linear', k=1)]
A_('pr36', 36, (.8, 1.2, {'spill': 1}))
G('pr36')['keys'] += gone2(L(37, .3), 'fade', 1.0)
SF(33, .1, 'scratch_2.wav', -5); SF(33, .45, 'blip_click_4.wav', -6); SF(34, .15, 'sci_ui_tick_1.wav', -2); SF(34, .35, 'sci_ui_tick_1.wav', -4); SF(34, .6, 'real_ship_creak_1.wav', -2)
SF(35, .15, 'impact_metal_3.wav', -4); SF(35, .55, 'swoosh_metallic_1.wav', -4); SF(36, .1, 'scratch_1.wav', -1); SF(36, .82, 'machine_paper_1.wav', -2)
art('sf37', 'StripeFloor', L(37, .1), None, [], enter='pour', eo='up', k=0, piano=0, pair=0, fold=0, wing=0, **C, z=8, xs='burn')
A_('sf37', 37, (.05, 1.0, {'k': .25}), (.2, 1.0, {'k': .5}), (.35, 1.0, {'k': .75}), (.5, 1.0, {'k': 1}), (.65, 1.0, {'piano': 1}), (.85, 1.0, {'piano': 0}))
G('sf37')['keys'] += [K(L(38), .8, 'soft', a=0)]
art('rg38', 'RidgeGlobe', L(38, .3), L(39, .2), [], enter='scale', eo=[960, 540], k=0, spin=0, **C, z=10, xs='collapse')
G('rg38')['keys'] += [K(L(38, .3), dur(38), 'linear', spin=1)]
A_('rg38', 38, (.15, 1.4, {'k': .4}), (.35, 1.4, {'k': .75}), (.6, 1.4, {'k': 1}))
G('sf37')['keys'] += [K(L(39), .8, 'soft', a=1)]
A_('sf37', 39, (.05, .6, {'pair': 1}), (.25, .6, {'pair': 2}), (.45, .6, {'pair': 3}), (.65, .6, {'pair': 4}), (.85, .6, {'pair': 5}))
A_('sf37', 40, (.1, 1.0, {'fold': .5, 'pair': 0}), (.35, 1.0, {'fold': 1}), (.7, .6, {'fold': .9}))
ent('fl40', 'flash', {'at': [[L(40, 2.6), 960, 540, 90]], 'col': '#FFFDF4', 'glow': '#F7E3A0', 'life': 1.2}, [], z=70)
A_('sf37', 41, (.08, 1.0, {'fold': 0}), (.25, .9, {'wing': 1}), (.45, .5, {'wing': .6}), (.58, .5, {'wing': 1}), (.75, .5, {'wing': .6}))
text('q41', '?', 'title', 1500, 300, L(41, 3.6), L(42, .2), size=130, col=VERM)
G('sf37')['keys'] += gone2(L(42, .2), 'burn', 1.2, [960, 540])
SF(37, .05, 'swoosh_deep_2.wav', -2); SF(37, .65, 'blip_click_3.wav', -6); SF(38, .2, 'swoosh_deep_3.wav', -3); SF(38, .6, 'sci_ui_tick_1.wav', -5)
SF(39, .05, 'sci_ui_tick_1.wav', -4); SF(39, .45, 'sci_ui_tick_1.wav', -4); SF(39, .85, 'sci_ui_tick_1.wav', -4); SF(40, .1, 'foley_page_turn_1.wav', 0); SF(40, .45, 'impact_soft_3.wav', 2)
SF(41, .25, 'swoosh_thin_2.wav', -3); SF(41, .58, 'swoosh_thin_1.wav', -5)

# ---------------------------------------------------------------- TWIST — the tape recorder (device RidgeTape)
art('cb42', 'Cambridge', L(42), None, [], enter='blinds', lamp=0, **C, z=6, xs='flip')
A_('cb42', 42, (.1, 1.0, {'lamp': 1}))
person('vine42', 'Fred Vine, Cambridge (1963)', L(42, .5), L(43, .2), [], x=520, y=980, h=480, facing=1, pose='stand', pose2='point', pk=0, expr='focus', ek=1, look=[1, .5], **VINE, z=14, xs='left')
person('mat42', 'Drummond Matthews, Cambridge (1963)', L(42, .8), L(43, .2), [], x=1420, y=980, h=500, facing=-1, pose='stand', pose2='reach', pk=0, expr='focus', ek=1, look=[-1, .5], **MATT, z=14, xs='right')
A_('vine42', 42, (.25, {'pk': 1}), (.6, {'expr': 'surprise', 'look': [1, -.2]}), (.82, {'expr': 'smile'}))
A_('mat42', 42, (.4, {'pk': 1}), (.62, {'look': [-1, -.2], 'expr': 'awe'}))
text('pl42', 'Cambridge · 1963', 'plate', 960, 160, L(42, 1.2), L(43, .2), size=40, col=CREAM, light=True)
G('cb42')['keys'] += gone2(L(43, .2), 'flip', 1.0)
art('cp43', 'Compass', L(43, .3), None, [], enter='scale', eo=[960, 540], flip=0, **C, z=12, xs='collapse')
A_('cp43', 43, (.2, .8, {'flip': 1}), (.38, .8, {'flip': 0}), (.55, .8, {'flip': 1}), (.72, .8, {'flip': 0}), (.88, .6, {'flip': 1}))
text('n43', 'N', 'stamp', 960, 180, L(43, 1.0), L(43, 5.0), size=70, col=VERM, keys=[K(L(43, 2.6), .6, text='S'), K(L(43, 3.6), .6, text='N')])
G('cp43')['keys'] += gone2(L(44, .2), 'collapse', .9, [960, 540])
SF(42, .1, 'world_door_creak_1.wav', -6); SF(42, .6, 'foley_page_turn_1.wav', -4); SF(43, .2, 'swoosh_metallic_1.wav', -2); SF(43, .55, 'swoosh_metallic_1.wav', -4); SF(43, .88, 'blip_click_4.wav', -2)
art('rt44', 'RidgeTape', L(44, .3), None, [], enter='pour', eo='up', well=0, cool=0, run=0, arrows=0, gold=0, belt=0, cross=0, **C, z=8, xs='at')
A_('rt44', 44, (.1, 1.4, {'well': 1}), (.35, 1.4, {'cool': 1}), (.55, 1.0, {'arrows': 1}), (.75, 1.2, {'run': .5}))
G('rt44')['keys'] += [K(L(45), dur(45) + dur(46) + dur(47), 'linear', run=6)]
A_('rt44', 45, (.1, .6, {'well': .6}), (.22, .6, {'well': 1}), (.45, .6, {'well': .6}), (.6, .6, {'well': 1}), (.8, .6, {'well': .7}))
A_('rt44', 46, (.1, 1.0, {'gold': .5}), (.3, 1.0, {'gold': 1}), (.55, .6, {'arrows': .4}), (.7, .6, {'arrows': 1}))
SF(44, .1, 'swoosh_deep_1.wav', -2); SF(44, .4, 'pond_water_1.wav', -6); SF(44, .75, 'machine_paper_1.wav', -6); SF(45, .2, 'world_clock_tick_2.wav', -4); SF(45, .6, 'swoosh_deep_2.wav', -4)
SF(46, .3, 'blip_click_3.wav', -4); SF(46, .7, 'impact_soft_3.wav', -2)

# ---------------------------------------------------------------- ANSWER — the conveyor, the plates, the trench, the rug, the Atlantic today
A_('rt44', 47, (.05, 1.2, {'belt': 1, 'gold': .4}), (.35, 1.0, {'cross': 1}), (.6, .8, {'cross': .7}), (.8, .8, {'cross': 1}))
G('rt44')['keys'] += gone2(L(48, .2), 'collapse', 1.0, [960, 540])
art('pg48', 'PlateGlobe', L(48, .2), None, [], enter='focus', crack=0, shift=0, quakes=0, **C, z=8, xs='right')
A_('pg48', 48, (.2, .8, {'crack': .3}), (.38, 1.0, {'crack': .7}), (.55, 1.0, {'crack': 1}), (.75, 1.2, {'shift': 1}))
G('pg48')['keys'] += gone2(L(49, .2), 'right', 1.0)
art('tr49', 'Trench', L(49, .2), None, [], enter='wipe', eo='left', dive=0, quakes=0, puff=0, **C, z=8, xs='up')
A_('tr49', 49, (.1, 1.4, {'dive': .5}), (.32, 1.4, {'dive': 1}), (.52, .5, {'quakes': 1}), (.62, .5, {'quakes': .3}), (.72, .5, {'quakes': 1}), (.85, 1.0, {'puff': 1}))
G('tr49')['keys'] += gone2(L(50, .2), 'up', 1.0)
art('rh50', 'RugHimalaya', L(50, .2), None, [], enter='unroll', push=0, peaks=0, **C, z=8, xs='fade')
A_('rh50', 50, (.08, 1.2, {'push': .4}), (.25, 1.0, {'push': .8}), (.4, .6, {'push': 1}), (.6, 1.4, {'peaks': .6}), (.8, 1.2, {'peaks': 1}))
G('rh50')['keys'] += gone2(L(51, .2), 'fade', 1.2)
SF(47, .05, 'machine_paper_1.wav', -2); SF(47, .5, 'world_clock_tick_1.wav', -4); SF(48, .38, 'crack_wood_1.wav', 0); SF(48, .75, 'swoosh_deep_3.wav', -3)
SF(49, .2, 'swoosh_deep_1.wav', -2); SF(49, .55, 'thud_soft_1.wav', 2); SF(49, .85, 'transition_whoosh_airy_1.wav', -3); SF(50, .25, 'swoosh_thin_1.wav', -3); SF(50, .42, 'thud_soft_2.wav', 0); SF(50, .8, 'real_wind_3.wav', -4)
art('ao51', 'AtlanticOpen', L(51, .2), None, [], enter='scale', eo=[960, 540], open=0, glow=0, **C, z=8, xs='at')
A_('ao51', 51, (.15, 1.0, {'glow': 1}), (.35, 1.4, {'open': .4}), (.6, 1.4, {'open': .8}), (.8, .8, {'glow': .5}))
mark('mk51', 'circle', [860, 200, 200, 680], L(51, 3.0), L(52, .2), w=4)
G('ao51')['keys'] += gone2(L(52, .2), 'at', 1.0, [960, 540])
art('gp52', 'GPSMarker', L(52, .2), None, [], enter='wipe', eo='down', sat=0, beam=0, tick=0, **C, z=8, xs='fade')
G('gp52')['keys'] += [K(L(52, .2), dur(52), 'linear', sat=1)]
A_('gp52', 52, (.2, .6, {'beam': 1}), (.32, .4, {'beam': 0}), (.45, .6, {'beam': 1}), (.6, .4, {'beam': 0}), (.75, 1.2, {'tick': 1}))
SF(51, .15, 'swoosh_deep_2.wav', -4); SF(51, .6, 'sci_ui_tick_1.wav', -5); SF(52, .2, 'blip_click_3.wav', -3); SF(52, .45, 'blip_click_3.wav', -5); SF(52, .78, 'sci_ui_tick_1.wav', -2)

# ---------------------------------------------------------------- MEANING — your fingernail; the seam opens; the future jigsaw; the torn atlas
G('gp52')['keys'] += gone2(L(53, .2), 'fade', 1.0)
art('na53', 'NailAtlantic', L(53, .2), None, [], enter='brush', grow=0, line=0, ocean=0, **C, z=10, xs='fade')
A_('na53', 53, (.2, 1.2, {'line': 1}), (.4, 1.4, {'grow': .5}), (.65, 1.4, {'grow': 1}))
A_('na53', 54, (.05, 1.4, {'ocean': .5}), (.2, 1.0, {'ocean': 1}))
G('na53')['keys'] += gone2(L(54, 2.4), 'fade', 1.0)
G('qp15')['keys'] += [K(L(54, 1.8), 1.0, 'soft', a=1, dissolve=1, stamp=0, cloth=1, stitch=1, open=0)]
A_('qp15', 54, (.35, 1.0, {'open': .3}), (.5, 1.0, {'open': .6}), (.68, 1.2, {'open': 1}))
counter('c54', '{n} million years', 960, 960, L(54, 5.0), L(55, .4), [K(L(54, 5.0), 1.4, 'out', num=200)], size=54, col=CREAM, light=True)
G('qp15')['keys'] += gone2(L(55, .3), 'fade', 1.0)
SF(53, .2, 'scratch_2.wav', -5); SF(53, .55, 'sci_ui_tick_1.wav', -4); SF(54, .1, 'pond_water_1.wav', -4); SF(54, .5, 'machine_paper_1.wav', -4); SF(54, .8, 'swoosh_deep_1.wav', -3)
G('jig0')['keys'] += [K(L(55, .2), .9, 'soft', a=1, dissolve=1, slide=1, glow=0, hand=0, apart=0)]
A_('jig0', 55, (.1, 1.4, {'future': .3}), (.3, 1.4, {'future': .6}), (.5, 1.4, {'future': .85}), (.7, 1.2, {'future': 1}), (.85, .6, {'glow': 1}))
art('atl56', 'AtlasPage', L(56, .1), None, [], enter='focus', trace=0, ghost=0, tear=1, gap=1, q=0, x=1300, y=600, s=.62, z=12, xs='fade')
A_('atl56', 56, (.45, 1.4, {'gap': 1.4}), (.75, 1.4, {'gap': 1.6}))
A_('jig0', 56, (.05, 1.0, {'glow': 0}), (.2, 1.2, {'x': 640, 's': .62}))
art('pin56', 'CabinetCard', L(56, 2.4), L(57, .4), [], ink=False, src=ST + 'P-01_wegener-villumsen-greenland-1930.jpg', x=1300, y=360, w=360, h=250, rot=-4,
    caption='Alfred Wegener, 1930', draw=1, enter='bleed', z=30, xs='burn')
A_('jig0', 57, (.05, 1.2, {'hand': 1}), (.3, 1.4, {'apart': 1}), (.6, 1.0, {'glow': 1}))
G('atl56')['keys'] += gone2(L(57, 3.0), 'fade', 1.6)
SF(55, .3, 'swoosh_deep_3.wav', -4); SF(55, .7, 'blip_click_4.wav', -2); SF(56, .2, 'foley_page_turn_1.wav', -2); SF(56, .55, 'thud_soft_2.wav', -5)
SF(57, .3, 'world_footstep_wood_1.wav', -6); SF(57, .6, 'blip_click_3.wav', -4)
G('jig0')['keys'] += gone2(L(57, 6.4), 'fade', 2.4)

# ======================================================================== LIGHT — every place has a named source, shadows and depth (critic, keyframes)
haze('hz9', 560, 760, L(9), L(10, .6), k=.45, col='#DDE7EE'); shadow('sh9', 900, 975, 260, 18, L(9, .6), L(10, .2), k=.5)
lamp('lp9', [1700, 300], L(9), L(10, .4), r=1400, dark=.18, warm=.35)
lamp('lp10', [700, 240], L(10, 1.2), L(13, 7.0), r=900, dark=.45, warm=.9)
lamp('lp17', [800, 200], L(15), L(24, .3), r=1300, dark=.3, warm=.7)
lamp('lp25', [960, 120], L(25), L(27, .2), r=1100, dark=.5, warm=.8)
shaft('sf25', [300, 0], [700, 900], L(25), L(27, .2), w0=120, w1=420, n=2, k=.35)
haze('hz28', 540, 760, L(28, 3.6), L(30, .4), k=.5, col='#E4ECF2'); lamp('lp28', [1650, 520], L(28, 3.6), L(30, .4), r=1300, dark=.2, warm=.4)
lamp('lp30', [960, 600], L(30), L(30, 5.6), r=700, dark=.6, warm=1.0)
haze('hz30', 600, 900, L(30), L(32, 5.2), k=.5, col='#C9D7E6')
haze('hz33', 300, 900, L(34), L(42, .2), k=.35, col='#9FB8C8')
lamp('lp42', [1180, 520], L(42), L(43, .4), r=800, dark=.55, warm=.9)
lamp('lp43', [700, 200], L(43), L(44, .4), r=1000, dark=.4, warm=.7)
lamp('lp44', [960, 900], L(44), L(48, .3), r=1000, dark=.35, warm=1.0)
lamp('lp48', [1500, 250], L(48), L(52, .3), r=1400, dark=.3, warm=.6)
lamp('lp53', [420, 200], L(53), L(57, 8.0), r=1300, dark=.35, warm=.85)

# ======================================================================== SECOND ACTIONS — the gaps event_check finds get a beat on the line's own subject
MAIN = dict(enumerate('jig0 atl1 atl1 atl1 mr4 fc5 mr4 mr4 ml8 bal9 sd10 tn11 tn11 sd10 lh14 qp15 qp15 ms17 fm18 fm18 fm18 fm18 fi22 fi22 tn24 lh14 lh14 rs27 gi9 gi9 '
                    'gt30 gt30 gt30 sc32 ss34 ss34 pr36 sf37 rg38 sf37 sf37 sf37 cb42 cp43 rt44 rt44 rt44 rt44 pg48 tr49 rh50 ao51 gp52 na53 qp15 jig0 atl56 jig0'.split()))
GAPS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gaps.json')
if os.path.exists(GAPS) and _wk._LN:
    for n, (i, a, b) in enumerate(json.load(open(GAPS))):
        st = _wk._LN[i]['start']; e = G(MAIN[i]); t0 = a - st + .2
        while t0 < b - st - .3:
            e['keys'] += [K(f'L{i}+{t0:.2f}', .9, 'soft', fx_s=1.045 if n % 2 else .97), K(f'L{i}+{t0 + 1.0:.2f}', 1.0, 'soft', fx_s=1)]
            t0 += 2.0
# ======================================================================== SOUND — no spam: ≤ 2 per line, ≤ 10/min, trims inside −6…+3
for i in list(SFX):
    SFX[i] = sorted(sorted(SFX[i], key=lambda x: -x['db'])[:2 if dur(i) >= 9 else 1], key=lambda x: x['at'])
    for x in SFX[i]: x['db'] = max(-6, min(3, x['db']))

# ======================================================================== THE CAMERA — one named move per line, chosen by meaning
MOVE = {0: ('push', (900, 560), 'insert'), 1: ('pan-r', (960, 520), 'medium'), 2: ('arc', (900, 520), 'close'), 3: ('dolly', (960, 540), 'medium'),
        4: ('crane-down', (960, 600), 'close'), 5: ('pan-l', (960, 540), 'wide'), 6: ('lock', (960, 560), 'wide'), 7: ('tilt-down', (960, 560), 'medium'),
        8: ('tilt-up', (1200, 400), 'medium'), 9: ('crane-up', (900, 560), 'medium'), 10: ('dive', (960, 560), 'wide'), 11: ('push', (960, 520), 'close'),
        12: ('track', (960, 520), 'insert'), 13: ('pan-l', (960, 540), 'medium'), 14: ('orbit', (800, 520), 'medium'), 15: ('snap-zoom', (960, 540), 'wide'),
        16: ('crane-up', (960, 540), 'wide'), 17: ('track', (1000, 600), 'close'), 18: ('pull', (960, 560), 'medium'), 19: ('handheld', (960, 540), 'close'),
        20: ('pan-r', (960, 540), 'medium'), 21: ('pan-l', (960, 540), 'wide'), 22: ('crane-down', (960, 560), 'close'), 23: ('dutch', (960, 540), 'medium'),
        24: ('rack', (960, 520), 'insert'), 25: ('whip', (960, 520), 'wide'), 26: ('push', (960, 480), 'close'), 27: ('tilt-down', (960, 560), 'close'),
        28: ('pan-r', (960, 540), 'wide'), 29: ('handheld', (760, 800), 'wide'), 30: ('push', (960, 560), 'close'), 31: ('lock', (960, 560), 'wide'),
        32: ('crane-down', (960, 600), 'insert'), 33: ('pull', (960, 540), 'wide'), 34: ('track', (960, 540), 'wide'), 35: ('snap-zoom', (960, 700), 'insert'),
        36: ('tilt-down', (960, 540), 'detail'), 37: ('crane-up', (960, 540), 'wide'), 38: ('orbit', (960, 540), 'wide'), 39: ('lock', (960, 540), 'medium'),
        40: ('dolly', (960, 540), 'close'), 41: ('arc', (960, 540), 'medium'), 42: ('push', (960, 560), 'close'), 43: ('snap-zoom', (960, 540), 'insert'),
        44: ('crane-up', (960, 600), 'close'), 45: ('pan-r', (960, 540), 'wide'), 46: ('pull', (960, 540), 'close'), 47: ('track', (960, 540), 'wide'),
        48: ('arc', (960, 540), 'wide'), 49: ('tilt-down', (960, 560), 'close'), 50: ('crane-up', (960, 500), 'wide'), 51: ('dive', (960, 540), 'wide'),
        52: ('rack', (960, 560), 'medium'), 53: ('push', (900, 560), 'insert'), 54: ('pull', (960, 540), 'wide'), 55: ('orbit', (960, 540), 'wide'),
        56: ('dolly', (960, 540), 'medium'), 57: ('crane-up', (800, 560), 'wide')}
HOW = {i: l['becomes']['how'] for i, l in enumerate(E['lines'])}
finish(MOVE, HOW, new_devices=['TornNews', 'QuiltPangaea', 'RidgeTape', 'NailAtlantic'],
       thumb={'t': 1, 'title': 'How do we know the continents move?', 'v': 'S', 'kicker': 'Wegener · 1912', 'lines': ['HOW DO WE', 'KNOW THE', 'CONTINENTS MOVE?'], 'accent': 2,
              'note': 'A few centimetres a year.'},
       music=[('wonder_lightless_dawn', 0, -21), ('wonder_long_note_one', 'L9-1.6', -21), ('tension_darkness_is_coming', 'L25-1.6', -22),
              ('curious_aftermath', 'L33-1.6', -20), ('wonder_silver_blue_light', 'L47-1.0', -22)],
       swells=[['L3+1', 'L3$', -10], ['L30+3', 'L31$', -12], ['L40', 'L40$', -8], ['L57$', 'end', 3]], motif_art=['AtlasPage', 'TornNews', 'QuiltPangaea', 'StripeFloor', 'Jigsaw'])
