#!/usr/bin/env python3
"""sun-fire — the story world (engine 10). Staging ONLY: helpers in tools/world_kit.py.
Chain: jobs/scripts/sun-fire_chain.md (one action + one camera move per line). Gates: event_check · novelty · plan_check · check_world · sound_check.
Governing image: the candle and the Sun on the sill. Motif: the FLAME (match → candle → coal Sun → the bead's flash → fusion's flash → the
neutrino spark → the furnace → the dawn; the candle out, the Sun not). Drawings: src/lib/sun-fire/ (a.tsx acts I–III, b.tsx acts III–V)."""
import os, sys; sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../tools')); from world_kit import *
E = init(__file__)
import world_kit as _wk; ST = _wk.ST; PDS = ST + '_pd/'
VERM, INK = '#B8432A', '#2B1D12'
C = dict(x=960, y=540, s=1)
def A_(id, i, *fp):   # beats inside line i: (frac, {props}) or (frac, dur, {props})
    B(id, i, *[(f[0], f[1] if len(f) == 3 else .9, 'soft', f[-1]) for f in fp])
def out(id, t, how, d=1.2, at=None): G(id)['keys'] += gone2(t, how, d, at)
KEL = {'costume': 'kelvin1860', 'beard': 'full', 'face': {'nose': .55, 'brow': .55, 'chin': .5, 'age': .4, 'build': 1.0}, 'hairCol': '#3A2A1E', 'skin': .24}
AST = {'costume': 'aston1920', 'beard': 'moustache', 'face': {'nose': .5, 'brow': .5, 'chin': .5, 'age': .35, 'build': .95}, 'hairCol': '#2E241C', 'skin': .25}
EDD = {'costume': 'eddington1920', 'face': {'nose': .5, 'brow': .45, 'chin': .45, 'age': .3, 'build': .9}, 'hairCol': '#2A2018', 'skin': .24}
BET = {'costume': 'bethe1939', 'face': {'nose': .55, 'brow': .5, 'chin': .5, 'age': .2, 'build': 1.05}, 'hairCol': '#3A2A1E', 'skin': .27}
DAV = {'costume': 'davis1965', 'face': {'nose': .5, 'brow': .45, 'chin': .5, 'age': .4, 'build': 1.0}, 'hairCol': '#4A3A2A', 'skin': .25}
DAVD = {**DAV, 'costume': 'davisDesk'}
ent('camera', 'camera', {'x': 960, 'y': 540, 'zoom': 1, 'drift': .35, 'light': .4, **grade('mystery'), 'push': 1, 'pan_x': 0, 'pan_y': 0, 'dof': 0, 'focus': 0, 'shake': 0, 'roll': 0, 'dolly': 0})
ent('clue', 'clue', {'n': 1, 'of': 4, 'label': 'Too Long for Fire', 'a': 0}, [K(L(10, .3), .01, a=1), K(L(15, .5), .01, n=2, label='The Shrinking Sun'),
    K(L(24, .5), .01, n=3, label='The Missing Weight'), K(L(35, .5), .01, n=4, label='Ghosts from the Core')])

# ---------------------------------------------------------------- L0–L4 · SET PIECE 0: the match, the candle, the Sun that never flickers
art('mc0', 'MatchCandle', L(0), None, [], inkdur=1.6, strike=0, matchOut=0, candle=0, melt=0, dawn=0, sunUp=0, stubs=0, dark=0, q=0, **C, z=8, xs='burn')
A_('mc0', 0, (.14, .5, {'strike': 1}), (.42, 1.0, {'strike': 1}), (.62, 1.2, {'matchOut': .5}), (.86, .8, {'matchOut': .8}))
A_('mc0', 1, (.05, .8, {'candle': 1}), (.22, .6, {'matchOut': 1}), (.4, 2.0, {'melt': .3}), (.62, 2.0, {'melt': .55}), (.85, 1.2, {'melt': .2}))
A_('mc0', 2, (.05, 1.6, {'dawn': .4}), (.25, 1.6, {'dawn': 1}), (.45, 1.8, {'sunUp': .5}), (.68, 1.6, {'sunUp': 1}))
A_('mc0', 3, (.05, .9, {'melt': 1}), (.18, .5, {'melt': .1, 'stubs': .25}), (.32, .9, {'melt': 1}), (.45, .5, {'melt': .1, 'stubs': .5}), (.6, .9, {'melt': 1}),
   (.72, .5, {'melt': .1, 'stubs': .8}), (.86, .9, {'melt': .9, 'stubs': 1}))
A_('mc0', 4, (.05, 1.4, {'dark': 1}), (.4, 1.4, {'q': 1}), (.7, .8, {'q': .8}))
lamp('lp0', [1080, 620], L(0, .8), L(2, .5), r=700, dark=.7, warm=1)
SF(0, .15, 'scratch_1.wav', 0); SF(0, .45, 'real_air_pocket_1.wav', -2); SF(1, .1, 'motion_candent_1.wav', -3); SF(1, .6, 'world_clock_tick_1.wav', -5)
SF(2, .45, 'world_birds_1.wav', -5); SF(3, .2, 'rewind_1.wav', -3); SF(3, .86, 'sting_suspense_1.wav', -4); SF(4, .45, 'sweep_riser_2s_1.wav', -3)
ent('title', 'art', {'name': 'TitleCard', 'k': 0, 'title': 'What makes\nthe Sun shine?', 'sub': 'a story in four clues', 'a': 0, 'lock': 1},
    [K(L(5, -5.6), .01, a=1), K(L(5, -5.6), 2.0, 'linear', k=.5), K(L(5, -3.6), 2.0, 'linear', k=1), K(L(5, -1.2), 1.3, 'linear', dissolve=0, dissolveAt=[960, 540], dissolveR=520), K(L(5, .2), .01, a=0)], z=90)
G('mc0')['keys'] += [K(L(5, -6.2), 1.0, 'soft', dark=1, q=0)]
art('ct5', 'ClueTags', L(5, .1), None, [], enter='blinds', n=0, swing=0, ticked=0, **C, z=12, xs='up')
A_('ct5', 5, (.05, 1.0, {'n': .25}), (.28, 1.0, {'n': .5}), (.5, 1.0, {'n': .75}), (.72, 1.0, {'n': 1}), (.88, 1.2, {'swing': 1}))
out('ct5', L(6, .1), 'up', 1.0); out('mc0', L(6, .2), 'fade', .8)
SF(5, .05, 'impact_woodlight_1.wav', -3); SF(5, .28, 'impact_woodlight_1.wav', -4); SF(5, .5, 'impact_woodlight_1.wav', -3); SF(5, .72, 'impact_woodlight_1.wav', -2)

# ---------------------------------------------------------------- L6–L9 · STAKES: too far, too deep; people watched; the tongs
art('sc6', 'SunCutaway', L(6, .1), None, [], enter='scale', eo=[400, 860], far=0, peel=0, close=0, **C, z=8, xs='shatter')
A_('sc6', 6, (.1, 1.4, {'far': .3}), (.3, 1.6, {'far': .6}), (.55, 1.6, {'far': 1}))
A_('sc6', 7, (.02, 1.0, {'far': 0}), (.12, 1.4, {'peel': .35}), (.32, 1.4, {'peel': .7}), (.5, 1.4, {'peel': 1}), (.8, 1.2, {'close': 1}))
text('c6', '150 000 000 km', 'figure', 1320, 260, L(6, 4.0), L(7, .3), size=60, col=VERM)
SF(6, .05, 'transition_whoosh_deep_1.wav', -2); SF(6, .55, 'dial_tick_1.wav', -2); SF(7, .14, 'real_cloth_1.wav', -3); SF(7, .5, 'sci_power_up_1.wav', -5)
out('sc6', L(8, .1), 'fade', 1.0)
art('e8', 'Pinned', L(8, .1), L(9, .1), [], ink=False, src=PDS + 'E-01_scheiner-viewing-sunspots-1625.jpg', x=960, y=520, w=1100, h=575, rot=-1,
    caption='Watching sunspots, 1625 (Scheiner)', draw=1, enter='bleed', z=30, xs='flip')
mark('mk8', 'circle', [1150, 300, 360, 300], L(8, 3.6), L(8, 7.2), w=4)
spot('sp8', [1300, 450], 340, L(8, 2.0), L(8, 7.0), dark=.45)
SF(8, .1, 'foley_page_turn_1.wav', -2); SF(8, .45, 'scratch_2.wav', -4); SF(8, .8, 'transition_page_turn_2.wav', -4)
art('cs9', 'CoalSun', L(9), None, [], enter='focus', grip=0, coal=0, flames=0, earth=0, age=0, release=0, layers=0, **C, z=8, xs='down')
A_('cs9', 9, (.12, 1.4, {'grip': .5}), (.4, 1.2, {'grip': .85}), (.6, .6, {'grip': 1}))
SF(9, .2, 'real_metal_groan_1.wav', -3); SF(9, .6, 'clang_metal_1.wav', -2)

# ---------------------------------------------------------------- CLUE 1 · L10–L14 · SET PIECE 1: the coal Sun
A_('cs9', 10, (.05, 1.4, {'coal': .5}), (.25, 1.4, {'coal': 1}), (.6, 1.2, {'flames': .3}))
A_('cs9', 11, (.05, 1.4, {'flames': 1}), (.3, 1.2, {'earth': 1}), (.55, 1.6, {'flames': .8}), (.8, 1.0, {'flames': 1}))
A_('cs9', 12, (.15, 1.6, {'flames': .5, 'age': .3}), (.4, 1.6, {'flames': .15, 'age': .65}), (.65, 1.6, {'flames': 0, 'age': 1}))
counter('c12', '{n} years', 1480, 200, L(12, 1.0), L(13, .6), [K(L(12, 1.0), 5.2, 'out', num=5000)], size=64, col=VERM)
A_('cs9', 13, (.1, .8, {'earth': 0}), (.3, 2.0, {'layers': .5}), (.6, 1.8, {'layers': 1}))
A_('cs9', 14, (.05, .8, {'release': 1}), (.3, .9, {'layers': 0}))
SF(10, .1, 'motion_candent_1.wav', -2); SF(10, .6, 'real_air_pocket_1.wav', -3); SF(11, .05, 'real_wind_3.wav', 0); SF(11, .55, 'real_air_pocket_1.wav', -3)
SF(12, .15, 'world_clock_tick_2.wav', -2); SF(12, .65, 'sci_power_down_1.wav', -2); SF(13, .3, 'impact_stone_engine_1.wav', -4); SF(13, .6, 'impact_stone_1.wav', -5)
out('cs9', L(14, 1.6), 'down', 1.0)
art('vs14', 'VictorianStudy', L(14, 1.4), None, [], enter='pour', eo='down', crumble=0, lamp=0, **C, z=6, xs='lift')
A_('vs14', 14, (.35, 1.2, {'crumble': 1}), (.7, 1.4, {'lamp': .6}))
lamp('lp14', [1430, 520], L(14, 4.0), L(16, .2), r=820, dark=.55, warm=.95)
SF(14, .2, 'thud_heavy_1.wav', -2); SF(14, .4, 'foley_coins_1.wav', -6)

# ---------------------------------------------------------------- CLUE 2 · L15–L23 · Kelvin's squeeze, the rocks, Darwin, the scales
person('kel15', 'William Thomson (Lord Kelvin), Glasgow (1860s)', L(15, .2), None, [], x=260, y=990, h=600, facing=1, pose='stand', pose2='look', pk=0, expr='focus', ek=0, look=[1, 0], **KEL, z=14)
A_('kel15', 15, (.05, 2.0, {'x': 820}), (.35, {'pk': 1}), (.55, {'pose2': 'reach', 'pk': 1}), (.8, {'pose2': 'think', 'pk': 1, 'expr': 'smile', 'ek': 1}))
A_('vs14', 15, (.55, 1.0, {'lamp': 1}))
art('cc15a', 'CabinetCard', L(15, 2.2), L(16, .1), [], ink=False, src=ST + 'P-03_helmholtz.jpg', x=1250, y=330, w=230, h=330, rot=-4, caption='Hermann von Helmholtz', draw=1, enter='focus', z=30, xs='up')
art('cc15b', 'CabinetCard', L(15, 3.6), L(16, .1), [], ink=False, src=ST + 'P-03_kelvin.jpg', x=1560, y=350, w=230, h=330, rot=3, caption='William Thomson, Lord Kelvin', draw=1, enter='bleed', z=30, xs='up')
SF(15, .05, 'world_footstep_wood_1.wav', -3); SF(15, .3, 'world_footstep_wood_1.wav', -4); SF(15, .55, 'foley_page_turn_1.wav', -4)
out('kel15', L(16, .1), 'down', .8); out('vs14', L(16, .2), 'lift', 1.0)
art('bp16', 'BikePump', L(16, .1), None, [], enter='iris', eo=[960, 540], pump=0, heat=0, **C, z=10, xs='collapse')
A_('bp16', 16, (.12, .5, {'pump': 1}), (.22, .5, {'pump': 0}), (.32, .5, {'pump': 1}), (.42, .5, {'pump': 0, 'heat': .4}), (.52, .5, {'pump': 1}),
   (.62, .5, {'pump': 0, 'heat': .7}), (.72, .5, {'pump': 1}), (.82, .5, {'pump': 0, 'heat': 1}))
SF(16, .12, 'real_air_pocket_1.wav', -2); SF(16, .32, 'real_air_pocket_1.wav', -3); SF(16, .52, 'real_air_pocket_1.wav', -3); SF(16, .82, 'dial_tick_2.wav', -2)
out('bp16', L(17, .1), 'collapse', 1.0, [960, 540])
art('ss17', 'ShrinkingSun', L(17, .4), None, [], enter='scale', eo=[960, 540], squeeze=0, tape=0, notch=0, **C, z=10, xs='flip')
A_('ss17', 17, (.15, 1.4, {'squeeze': .3}), (.4, 1.4, {'squeeze': .6}), (.65, 1.4, {'squeeze': .85}), (.85, .8, {'squeeze': .9}))
A_('ss17', 18, (.05, 1.6, {'tape': 1}), (.3, .5, {'notch': .25}), (.45, .5, {'notch': .5}), (.6, .5, {'notch': .75}), (.75, .5, {'notch': 1}))
SF(17, .15, 'motion_whoosh_deep_1.wav', -2); SF(17, .65, 'sci_power_up_2.wav', -4); SF(18, .1, 'real_cloth_2.wav', -2); SF(18, .3, 'machine_ratchet_1.wav', -2); SF(18, .6, 'machine_ratchet_1.wav', -3)
out('ss17', L(19, .1), 'flip', .9)
art('cp19', 'CalendarPad', L(19, .1), None, [], enter='wipe', eo='down', flip=0, crack=0, **C, z=10, xs='shatter')
A_('cp19', 19, (.12, 1.6, {'flip': .3}), (.32, 1.6, {'flip': .6}), (.55, 1.6, {'flip': 1}))
A_('cp19', 20, (.1, .6, {'crack': .4}), (.2, .6, {'crack': 1}))
out('cp19', L(20, 1.8), 'shatter', 1.0, [960, 520])
SF(19, .12, 'transition_page_turn_1.wav', -2); SF(19, .4, 'transition_page_turn_3.wav', -3); SF(19, .62, 'sting_success_1.wav', -5); SF(20, .1, 'foley_hammer_1.wav', 0); SF(20, .2, 'crack_glass_1.wav', -4)
art('cl20', 'CliffLayers', L(20, 1.6), None, [], enter='wipe', eo='up', hammer=0, stack=.5, glow=0, **C, z=8, xs='ink')
A_('cl20', 20, (.4, .5, {'hammer': 1}), (.55, .5, {'hammer': 0}), (.7, .5, {'hammer': 1}), (.85, .5, {'hammer': 0}))
A_('cl20', 21, (.08, 1.6, {'stack': .65}), (.3, 1.6, {'stack': .8}), (.52, 1.6, {'stack': .92}), (.72, 1.4, {'stack': 1, 'glow': 1}))
text('c21', 'hundreds of millions of years', 'figure', 1400, 180, L(21, 4.6), L(22, .4), size=48, col=VERM)
SF(20, .4, 'impact_stone_2.wav', -2); SF(20, .7, 'impact_stone_3.wav', -3); SF(21, .08, 'real_water_rush_1.wav', -8); SF(21, .5, 'impact_stone_1.wav', -4)
art('dt22', 'DarwinTree', L(22, .1), None, [], enter='brush', grow=0, lag=0, **C, z=12, xs='flip')
out('cl20', L(22, 1.2), 'ink', 1.0)
A_('dt22', 22, (.18, 1.6, {'grow': .3}), (.38, 1.6, {'grow': .6}), (.58, 1.6, {'grow': .85, 'lag': .5}), (.78, 1.4, {'grow': 1, 'lag': 1}))
SF(22, .18, 'scratch_2.wav', -3); SF(22, .58, 'transition_page_turn_4.wav', -4)
out('dt22', L(23, .1), 'flip', 1.0)
art('sb23', 'SunScales', L(23, .3), None, [], enter='unroll', fill=0, tip=0, wobble=0, **C, z=10, xs='collapse')
A_('sb23', 23, (.1, 1.0, {'fill': 1}), (.28, .9, {'tip': -.8}), (.42, .9, {'tip': .7}), (.56, .9, {'tip': -.5}), (.7, .9, {'tip': .6, 'wobble': 1}), (.86, .8, {'tip': -.3}))
SF(23, .1, 'impact_metal_1.wav', -3); SF(23, .3, 'clang_metal_2.wav', -4); SF(23, .56, 'impact_metal_2.wav', -4); SF(23, .86, 'sting_suspense_2.wav', -5)

# ---------------------------------------------------------------- CLUE 3 · L24–L34 · SET PIECE 2: the missing bead; Cardiff; the core; the dancers
out('sb23', L(24, .2), 'collapse', 1.2, [960, 620])
art('ab24', 'AtomBalance', L(24, .6), None, [], enter='scale', eo=[960, 620], load=0, tie=0, bead=0, tip=0, frac=0, **C, z=8, xs='burn')
person('ast24', 'Francis Aston, Cambridge (1920)', L(24, 1.6), L(26, 9.0), [], x=360, y=1000, h=600, facing=1, pose='stand', pose2='look', pk=0, expr='focus', ek=0, look=[1, .2], **AST, z=14, xs='fade')
A_('ast24', 24, (.3, {'pk': 1}), (.55, {'pose2': 'reach', 'pk': 1}), (.8, {'pose2': 'look', 'pk': 1}))
art('cc24', 'CabinetCard', L(24, 3.4), L(25, .2), [], ink=False, src=ST + 'P-03_aston.jpg', x=1600, y=330, w=230, h=330, rot=3, caption='Francis Aston, 1922', draw=1, enter='bleed', z=30, xs='up')
A_('ab24', 24, (.62, 1.0, {'tip': .2}), (.78, 1.0, {'tip': 0}))
A_('ab24', 25, (.05, 1.8, {'load': .5}), (.3, 1.6, {'load': 1}), (.6, 1.0, {'tip': .05}))
A_('ast24', 25, (.5, {'pose2': 'point', 'pk': 1}))
A_('ab24', 26, (.05, 1.4, {'tie': 1}), (.3, .9, {'bead': .5}), (.4, .7, {'bead': 1}), (.55, 1.0, {'tip': 1}), (.75, 1.0, {'frac': 1}))
A_('ast24', 26, (.45, {'expr': 'surprise', 'ek': 1, 'pose2': 'raise'}))
SF(24, .2, 'motion_whoosh_short_1.wav', -3); SF(24, .62, 'machine_click_mech_1.wav', -4); SF(25, .05, 'motion_pop_1.wav', -3); SF(25, .3, 'motion_pop_engine_1.wav', -4)
SF(26, .05, 'real_cloth_1.wav', -4); SF(26, .41, 'sci_ui_tick_1.wav', 2); SF(26, .55, 'impact_metal_3.wav', -3); SF(26, .78, 'scratch_1.wav', -4)
art('sf27', 'SparkFormula', L(27, .1), None, [], enter='bleed', write=0, swell=0, blaze=0, **C, z=12, xs='fade')
out('ab24', L(27, .8), 'burn', 1.4, [960, 640])
A_('sf27', 27, (.15, 1.4, {'write': .3}), (.35, 1.4, {'write': .65}), (.55, 1.4, {'write': 1}))
A_('sf27', 28, (.05, 1.4, {'swell': .4}), (.25, 1.6, {'swell': 1}), (.55, 1.4, {'blaze': .5}), (.75, 1.4, {'blaze': 1}))
SF(27, .1, 'sting_magic_1.wav', -4); SF(27, .5, 'sci_power_up_3.wav', -4); SF(28, .1, 'transition_whoosh_airy_2.wav', -3); SF(28, .55, 'transition_riser_2s_1.wav', -2)
art('ch29', 'CardiffHall', L(29, .1), None, [], enter='pour', eo='down', board=0, sheet=0, lid=0, clap=0, **C, z=8, xs='ink')
out('sf27', L(29, .6), 'fade', 1.4)
person('edd29', 'Arthur Eddington, Cardiff (1920)', L(29, 1.0), None, [], x=960, y=780, h=420, facing=-1, pose='stand', pose2='present', pk=0, expr='focus', ek=0, look=[-1, 0], **EDD, z=14, xs='fade')
A_('edd29', 29, (.25, {'pk': 1}), (.45, {'pose2': 'raise', 'pk': 1}), (.7, {'pose2': 'explain', 'pk': 1, 'expr': 'smile', 'ek': 1}))
A_('ch29', 29, (.4, 1.6, {'board': .5}), (.6, 1.4, {'board': 1}), (.85, .8, {'clap': 1}))
art('d29', 'DocumentPage', L(29, 5.2), L(30, .1), [], ink=False, src=ST + 'D-01_eddington-1920-mass-passage.jpg', x=1500, y=360, w=520, h=300, rot=2,
    caption='Eddington’s address, Cardiff, 24 August 1920', draw=1, enter='glide', eo=[600, 0], z=30, xs='fade')
A_('edd29', 30, (.15, {'pose2': 'reach', 'pk': 1, 'expr': 'neutral'}), (.5, {'pose2': 'point', 'pk': 1}), (.8, {'pose2': 'present', 'expr': 'smile', 'ek': 1}))
A_('ch29', 30, (.15, 1.4, {'sheet': 1}), (.6, .5, {'lid': 1}), (.8, .8, {'clap': 0}))
text('q30', '“an unburied corpse”', 'note', 700, 170, L(30, 2.6), L(30, 8.0), size=52, col=VERM)
SF(29, .05, 'world_crowd_small_1.wav', -6); SF(29, .4, 'scratch_2.wav', -3); SF(29, .85, 'world_crowd_applause_1.wav', -6); SF(30, .15, 'real_cloth_2.wav', -2); SF(30, .6, 'amb_door_slam_1.wav', 0)
out('edd29', L(31, .1), 'fade', .8)
art('cd31', 'CoreDoor', L(31, .2), None, [], enter='focus', open=0, heat=0, **C, z=10, xs='collapse')
out('ch29', L(31, .5), 'ink', 1.0)
A_('cd31', 31, (.2, 1.6, {'open': .4}), (.4, 1.6, {'open': 1}), (.6, 1.4, {'heat': 1}))
text('c31', 'millions of degrees', 'figure', 1480, 200, L(31, 5.0), L(32, .3), size=56, col=VERM)
SF(31, .2, 'world_door_creak_1.wav', 0); SF(31, .45, 'real_air_pocket_1.wav', -2); SF(31, .7, 'dial_tick_1.wav', -4)
out('cd31', L(32, .1), 'collapse', 1.2, [960, 540])
art('pd32', 'ProtonDance', L(32, .4), None, [], enter='scale', eo=[960, 540], jostle=0, bump=0, magnets=0, fuse=0, chain=0, **C, z=8, xs='fade')
G('pd32')['keys'] += [K(L(32, .4), dur(32) + dur(33) + dur(34), 'linear', jostle=1)]
A_('pd32', 32, (.3, .8, {'bump': .5}), (.45, .5, {'bump': 1}), (.6, .8, {'bump': 0}), (.75, .5, {'bump': .7}), (.88, .6, {'bump': 0}))
A_('pd32', 33, (.02, 1.0, {'magnets': 1}), (.22, .8, {'magnets': 0}), (.35, .8, {'bump': 1}), (.48, .6, {'bump': .2}), (.6, .8, {'bump': 1}), (.75, .5, {'fuse': 1}))
A_('pd32', 34, (.05, 1.6, {'chain': .5}), (.25, 1.4, {'chain': 1}))
SF(32, .45, 'impact_boing_1.wav', -4); SF(32, .75, 'impact_boing_2.wav', -5); SF(33, .05, 'clack_toggle_1.wav', -3); SF(33, .48, 'impact_boing_1.wav', -5); SF(33, .76, 'impact_glassheavy_1.wav', -1)
out('pd32', L(34, 3.4), 'collapse', 1.0, [960, 540])
art('tw34', 'Typewriter', L(34, 3.0), None, [], enter='glide', eo=[0, 640], type=0, rise=0, thermo=0, slip=0, **C, z=10, xs='lift')
person('bet34', 'Hans Bethe, Cornell (1938)', L(34, 3.6), L(35, 8.0), [], x=330, y=1010, h=560, facing=1, pose='sit', pose2='sitlook', pk=0, expr='focus', ek=0, **BET, z=14, xs='fade')
A_('tw34', 34, (.45, 1.6, {'type': .4}), (.65, 1.6, {'type': .8}), (.85, 1.0, {'type': 1}))
A_('bet34', 34, (.5, {'pk': 1}), (.85, {'pose2': 'think', 'pk': 1, 'expr': 'smile', 'ek': 1}))
art('cc34', 'CabinetCard', L(34, 5.6), L(35, .3), [], ink=False, src=ST + 'P-03_bethe.jpg', x=1640, y=300, w=230, h=300, rot=-3, caption='Hans Bethe', draw=1, enter='bleed', z=30, xs='up')
SF(34, .1, 'sting_magic_2.wav', -5); SF(34, .45, 'machine_typewriter_1.wav', -2); SF(34, .85, 'machine_chime_1.wav', -4)

# ---------------------------------------------------------------- CLUE 4 · L35–L44 · SET PIECE 3: ghosts in the gold mine
A_('tw34', 35, (.05, 1.6, {'rise': .5}), (.3, 1.4, {'rise': 1}), (.5, 1.4, {'thermo': .5}), (.72, 1.4, {'thermo': 1}))
A_('bet34', 35, (.2, {'pose2': 'sitpeer', 'pk': 1, 'expr': 'worry', 'ek': 1}))
A_('tw34', 36, (.05, .9, {'slip': .3}), (.2, 1.2, {'slip': 1}))
SF(35, .05, 'transition_page_turn_2.wav', -3); SF(35, .55, 'sci_power_down_2.wav', -4); SF(36, .05, 'machine_keys_1.wav', -3); SF(36, .25, 'sci_glitch_zap_1.wav', -4)
out('tw34', L(36, 3.0), 'lift', 1.0)
art('nf36', 'NeutrinoFlight', L(36, 2.8), None, [], enter='wipe', eo='right', k=0, glass=0, **C, z=8, xs='burn')
A_('nf36', 36, (.55, 1.4, {'k': .2}), (.8, 1.2, {'k': .35}))
A_('nf36', 37, (.05, 1.6, {'k': .6}), (.3, 1.4, {'glass': 1}), (.5, 1.6, {'k': .85}), (.75, 1.4, {'k': 1}))
text('pl36', 'neutrino', 'label', 1300, 360, L(36, 6.0), L(37, .6), size=44, col=VERM)
SF(37, .05, 'transition_whoosh_thin_1.wav', -3); SF(37, .3, 'impact_glass_1.wav', -4); SF(37, .75, 'transition_whoosh_thin_2.wav', -4)
out('nf36', L(38, .1), 'burn', 1.0, [1500, 540])
art('tr38', 'ThumbRain', L(38, .2), None, [], enter='tear', walk=0, rain=0, thumb=0, mouth=0, **C, z=10, xs='fade')
G('tr38')['keys'] += [K(L(38, .2), dur(38), 'linear', walk=.8)]
A_('tr38', 38, (.15, 1.4, {'rain': 1}), (.45, 1.4, {'thumb': .6}), (.65, 1.2, {'thumb': 1}))
A_('tr38', 39, (.05, 1.6, {'mouth': .5}), (.25, 1.4, {'mouth': 1}))
SF(38, .05, 'world_crowd_walla_1.wav', -6); SF(38, .2, 'real_footsteps_2.wav', -5); SF(38, .5, 'sci_ui_tick_1.wav', -2); SF(39, .1, 'transition_whoosh_deep_2.wav', -3)
art('ms39', 'MineShaft', L(39, 2.6), None, [], enter='iris', eo=[960, 540], drop=0, rise=0, **C, z=8, xs='up')
out('tr38', L(39, 3.0), 'fade', .8)
person('dav39', 'Ray Davis, Homestake mine (1960s)', L(39, 4.0), L(40, .6), [], x=890, y=780, h=300, facing=1, pose='stand', pose2='look', pk=0, expr='focus', ek=0, **DAV, z=14, xs='down')
A_('dav39', 39, (.6, {'pk': 1}), (.8, {'pose2': 'raise', 'pk': 1, 'expr': 'smile', 'ek': 1}))
art('cc39', 'Clipping', L(39, 5.0), L(40, .2), [], ink=False, src=ST + 'P-03_davis.jpg', x=1600, y=320, w=230, h=310, rot=3, caption='Raymond Davis Jr.', draw=1, enter='bleed', z=30, xs='up')
A_('ms39', 40, (.05, 1.6, {'drop': .3}), (.28, 1.6, {'drop': .6}), (.5, 1.6, {'drop': .85}), (.72, 1.2, {'drop': 1}))
SF(39, .55, 'real_metal_groan_2.wav', -3); SF(40, .05, 'machine_lever_clunk_1.wav', -2); SF(40, .3, 'real_ship_creak_1.wav', -5); SF(40, .72, 'thud_heavy_2.wav', -1)
out('ms39', L(41, .1), 'up', 1.0)
art('tk41', 'ChlorineTank', L(41, .2), None, [], enter='focus', grow=0, fill=0, sweep=0, tally=0, **C, z=8, xs='shatter')
A_('tk41', 41, (.05, 1.8, {'grow': .6}), (.25, 1.4, {'grow': 1}), (.45, 1.8, {'fill': .6}), (.65, 1.4, {'fill': 1}), (.82, 1.2, {'sweep': 1}))
SF(41, .1, 'real_water_lap_1.wav', -4); SF(41, .45, 'real_water_rush_2.wav', -6); SF(41, .82, 'real_electric_flicker_1.wav', -4)
art('ag42', 'AtomGrain', L(42, .2), None, [], enter='iris', eo=[960, 600], strike=0, gold=0, **C, z=14, xs='collapse')
A_('ag42', 42, (.25, 1.0, {'strike': .5}), (.38, .6, {'strike': 1}), (.5, 1.2, {'gold': 1}))
SF(42, .25, 'transition_whoosh_thin_3.wav', -3); SF(42, .4, 'sci_coin_1.wav', 0); SF(42, .7, 'sting_magic_3.wav', -5)
out('ag42', L(43, .1), 'collapse', 1.0, [960, 600])
art('p43', 'Pinned', L(43, .4), L(43, 8.0), [], ink=False, src=ST + 'P-01_homestake-chlorine-tank.jpg', x=1000, y=500, w=820, h=654, rot=-1,
    caption='The Homestake tank, 1,478 m down (US DOE)', draw=1, enter='bleed', z=30, xs='left')
A_('tk41', 43, (.35, .8, {'tally': .25}), (.5, .8, {'tally': .5}), (.7, .8, {'tally': .75}), (.86, .8, {'tally': 1}))
SF(43, .1, 'cue_reveal_1.wav', -5); SF(43, .4, 'scratch_1.wav', -4); SF(43, .7, 'scratch_2.wav', -4)
out('tk41', L(44, .1), 'shatter', 1.2, [960, 540])

# ---------------------------------------------------------------- L44–L47 · TWIST: a third; who's wrong; thirty years on the wall
art('cw44', 'CountWall', L(44, .3), None, [], enter='blinds', count=0, gap=0, arrows=0, age=0, match=0, **C, z=8, xs='ink')
A_('cw44', 44, (.2, 1.6, {'count': .4}), (.4, 1.6, {'count': .8}), (.62, .8, {'count': 1}))
A_('cw44', 45, (.05, 1.4, {'gap': .5}), (.3, 1.4, {'gap': 1}), (.6, 1.0, {'gap': .8}))
person('davd46', 'Ray Davis at his desk', L(46, .1), None, [], x=1500, y=1010, h=520, facing=-1, pose='sit', pose2='sitlook', pk=0, expr='worry', ek=0, **DAVD, z=14, xs='fade')
A_('cw44', 46, (.05, 1.4, {'arrows': .5}), (.25, 1.4, {'arrows': 1}))
A_('davd46', 46, (.5, {'pose2': 'sitadjust', 'pk': 1}), (.8, {'pose2': 'think', 'pk': 1}))
A_('cw44', 47, (.05, 1.2, {'age': .25, 'arrows': 0}), (.22, 1.2, {'age': .5}), (.4, 1.2, {'age': .75}), (.58, 1.2, {'age': 1}))
out('davd46', L(47, 3.2), 'fade', 1.6)
person('davo47', 'Ray Davis, thirty years on', L(47, 3.0), L(47, 8.4), [], x=1500, y=1010, h=520, facing=-1, pose='sit', pose2='sitpeer', pk=0, expr='focus', ek=0, enter='bleed', **{**DAVD, 'hairCol': '#CFCAC0', 'face': {**DAVD['face'], 'age': .8}}, z=14, xs='fade')
A_('davo47', 47, (.65, {'pk': 1}), (.85, {'expr': 'smile', 'ek': 1}))
counter('c47', '{n}', 1600, 180, L(47, .4), L(47, 7.6), [K(L(47, .4), 5.4, 'linear', num=2001)], size=60, col=VERM)
G('c47')['props']['num'] = 1968
SF(44, .2, 'dial_tick_1.wav', -2); SF(44, .62, 'sting_fail_1.wav', -5); SF(45, .05, 'sting_twist_1.wav', -3); SF(45, .3, 'sting_suspense_3.wav', -5)
SF(46, .05, 'scratch_2.wav', -3); SF(46, .5, 'real_cloth_1.wav', -4); SF(47, .05, 'world_clock_tick_1.wav', -2); SF(47, .5, 'rewind_2.wav', -4)

# ---------------------------------------------------------------- L48–L53 · Sudbury; three doors; the coat; the count matches
art('sn48', 'SNOSphere', L(48, .1), None, [], crack=0, eyes=0, flash=0, **C, z=6, xs='ink', ink=False, draw=1)
G('sn48')['keys'] = [K(L(48, .1), .01, a=1)]
A_('sn48', 48, (.02, 1.6, {'crack': .5}), (.2, 1.6, {'crack': 1}), (.45, 1.6, {'eyes': .6}), (.65, 1.4, {'eyes': 1}), (.85, .8, {'flash': 1}))
out('cw44', L(48, .2), 'ink', 1.0)
art('p48', 'Pinned', L(48, 6.0), L(49, .3), [], ink=False, src=ST + 'P-02_sno-detector.jpg', x=1560, y=480, w=330, h=496, rot=2, caption='Sudbury, Canada (SNO+, CC BY 4.0)', draw=1, enter='glide', eo=[500, 0], z=30, xs='right')
SF(48, .05, 'crack_wood_1.wav', -2); SF(48, .45, 'sci_power_up_engine_2.wav', -5); SF(48, .85, 'sci_ui_tick_1.wav', -3)
art('td49', 'ThreeDoors', L(49, .2), None, [], enter='unroll', open=0, walk=0, coats=0, eye=0, all=0, **C, z=10, xs='fade')
out('sn48', L(49, .6), 'ink', 1.0)
A_('td49', 49, (.1, .8, {'open': .33}), (.25, .8, {'open': .66}), (.4, .8, {'open': 1}))
A_('td49', 50, (.05, 1.6, {'walk': .35}), (.3, 1.2, {'walk': .55}), (.5, 1.6, {'walk': .8}), (.72, 1.4, {'walk': 1}))
A_('td49', 51, (.05, 1.2, {'coats': 1}), (.3, 1.2, {'eye': 1}), (.7, 1.2, {'all': 1}))
SF(49, .1, 'world_door_creak_2.wav', -4); SF(49, .4, 'world_door_creak_1.wav', -4); SF(50, .1, 'real_footsteps_3.wav', -3); SF(50, .35, 'amb_door_slam_2.wav', -3)
SF(50, .72, 'sting_reveal_1.wav', -4); SF(51, .05, 'real_cloth_2.wav', -3); SF(51, .7, 'sting_magic_4.wav', -4)
out('td49', L(52, .1), 'shatter', .9)
art('cw52', 'CountWall', L(52, .1), None, [], enter='focus', count=1, gap=0, arrows=0, age=1, match=0, **C, z=8, xs='up')
A_('cw52', 52, (.15, 1.4, {'match': .35}), (.35, 1.4, {'match': .7}), (.6, 1.2, {'match': 1}))
SF(52, .15, 'sci_ui_tick_1.wav', -2); SF(52, .35, 'sci_ui_tick_1.wav', -2); SF(52, .62, 'sting_success_2.wav', -2)
out('cw52', L(53, .1), 'up', 1.0)
art('ms53', 'MineShaft', L(53, .2), None, [], enter='pour', eo='up', drop=1, rise=0, **C, z=8, xs='fade')
A_('ms53', 53, (.1, 1.4, {'rise': .3}), (.3, 1.4, {'rise': .55}), (.5, 1.4, {'rise': .75}), (.7, 1.4, {'rise': .9}), (.86, 1.2, {'rise': 1}))
text('nb53a', 'Nobel Prize 2002 — Raymond Davis', 'stamp', 960, 220, L(53, 1.2), L(53, 4.4), size=50, col=VERM)
text('nb53b', 'Nobel Prize 2015 — Kajita & McDonald', 'stamp', 960, 300, L(53, 4.6), L(54, .2), size=50, col=VERM)
SF(53, .1, 'transition_riser_2s_2.wav', -3); SF(53, .3, 'impact_bell_1.wav', -5); SF(53, .65, 'impact_bell_1.wav', -6)

# ---------------------------------------------------------------- L54–L59 · MEANING: the furnace, the ages, the light we live on, the bookend
art('fu54', 'SunFurnace', L(54, .2), None, [], enter='scale', eo=[960, 300], open=0, feed=0, shine=0, ages=0, **C, z=8, xs='ink')
out('ms53', L(54, .6), 'fade', 1.0)
A_('fu54', 54, (.12, 1.4, {'open': 1}), (.32, 1.4, {'feed': .4}), (.5, 1.4, {'feed': .8, 'shine': .5}), (.7, 1.4, {'shine': 1, 'feed': 1}))
counter('c54', '{n} tonnes every second', 1400, 180, L(54, 5.0), L(55, .3), [K(L(54, 5.0), 2.0, 'out', num=4000000)], size=52, col=VERM)
A_('fu54', 55, (.05, 1.4, {'ages': .25}), (.27, 1.4, {'ages': .5}), (.47, 1.4, {'ages': .75}), (.67, 1.4, {'ages': 1}), (.84, 1.0, {'shine': .7}), (.94, .8, {'shine': 1}))
SF(54, .12, 'world_door_creak_2.wav', -4); SF(54, .4, 'impact_metal_4.wav', -5); SF(54, .7, 'transition_riser_2s_3.wav', -3); SF(55, .05, 'sweep_riser_1s_1.wav', -5); SF(55, .5, 'world_birds_2.wav', -6)
art('lf56', 'LightFields', L(56, .1), None, [], enter='brush', beam=0, sway=0, glint=0, back=0, **C, z=10, xs='fade')
out('fu54', L(56, .6), 'fade', 1.0)
G('lf56')['keys'] += [K(L(56, .1), dur(56) + dur(57), 'linear', sway=1)]
A_('lf56', 56, (.05, 1.4, {'beam': .35}), (.25, 1.4, {'beam': .7}), (.45, .8, {'glint': 1}), (.62, 1.4, {'beam': 1}), (.8, .8, {'glint': 0}), (.92, .6, {'glint': .6}))
A_('lf56', 57, (.05, 1.6, {'back': .5}), (.25, 1.4, {'back': 1}))
SF(56, .05, 'world_wind_forest_1.wav', -5); SF(56, .5, 'sci_gem_1.wav', -4); SF(57, .05, 'transition_whoosh_airy_3.wav', -3)
art('pd57', 'ProtonDance', L(57, 3.4), L(58, .2), [], enter='iris', eo=[960, 540], jostle=0, bump=0, magnets=0, fuse=0, chain=0, **C, z=12, xs='fade')
A_('pd57', 57, (.42, 1.2, {'jostle': .3}), (.55, 1.0, {'bump': 1}), (.66, 1.0, {'chain': .5}), (.8, 1.0, {'chain': 1}), (.92, .8, {'jostle': .5}))
out('lf56', L(57, 4.0), 'fade', 1.0)
SF(57, .78, 'impact_glassheavy_1.wav', -2)
art('ct58', 'ClueTags', L(58, .1), None, [], enter='glide', eo=[0, -700], n=1, swing=0, ticked=0, **C, z=10, xs='up')
A_('ct58', 58, (.1, 1.0, {'swing': 1}), (.3, .8, {'ticked': .25}), (.45, .8, {'ticked': .5}), (.6, .8, {'ticked': .75}), (.75, .8, {'ticked': 1}), (.9, 1.0, {'swing': 0}))
SF(58, .3, 'scratch_1.wav', -4); SF(58, .45, 'scratch_2.wav', -4); SF(58, .6, 'scratch_1.wav', -5); SF(58, .75, 'scratch_2.wav', -4)
out('ct58', L(59, .1), 'up', 1.0)
art('mc59', 'MatchCandle', L(59, .2), None, [], enter='focus', strike=0, matchOut=1, candle=0, melt=1, dawn=.3, sunUp=0, stubs=0, dark=0, q=0, **C, z=8, xs='fade')
A_('mc59', 59, (.1, 1.4, {'dawn': .7}), (.3, 1.6, {'dawn': 1, 'sunUp': .5}), (.5, 1.6, {'sunUp': .85}), (.68, 1.6, {'sunUp': 1}))
ripple('rp59', [1000, 760], L(59, 6.6), r=140, n=3, d=2.0, col='#C9A24A')
shaft('sh59', [1300, 300], [700, 900], L(59, 4.0), None, w0=80, w1=520, k=.7)
SF(59, .1, 'world_birds_3.wav', -5); SF(59, .55, 'cue_reveal_2.wav', -4)

# ---------------------------------------------------------------- second beats: something happens ≤ every 2.5 s (event_check), each a real action
ST0 = [l.get('t', l.get('start')) for l in _wk._LN]
def AT(id, t, d, **p):   # a beat at an absolute time (s) of the voice track
    i = max(j for j in range(len(ST0)) if ST0[j] <= t); G(id)['keys'].append(K(f'L{i}+{round(t - ST0[i], 2):g}', d, 'soft', **p))
def TX(id, s, style, x, y, t, t2, **kw):
    i = max(j for j in range(len(ST0)) if ST0[j] <= t); i2 = max(j for j in range(len(ST0)) if ST0[j] <= t2)
    text(id, s, style, x, y, f'L{i}+{round(t - ST0[i], 2):g}', f'L{i2}+{round(t2 - ST0[i2], 2):g}', **kw)
AT('mc0', 3.7, .8, strike=.85); AT('mc0', 23.2, 1.4, melt=.3)
TX('tx6', 'Earth', 'label', 420, 800, 61.0, 63.4, size=40, col=INK)
art('lp8', 'Loupe', 'L8+1.4', 'L9+.1', [K('L8+3.4', 1.4, 'soft', x=1240, y=420, focus=[.66, .38]), K('L8+5.6', 1.4, 'soft', x=1080, y=560, focus=[.56, .5]), K('L8+7.8', 1.2, 'soft', zoom=3.4)], ink=False, src=PDS + 'E-01_scheiner-viewing-sunspots-1625.jpg', x=760, y=600, r=170, focus=[.4, .55], zoom=2.6, srcW=4061, srcH=2121, draw=1, enter='scale', eo=[760, 600], z=34, xs='collapse')
mark('mk8b', 'circle', [1180, 330, 300, 260], 'L8+7.6', 'L9', w=4, seed=3)
AT('lp8', 80.7, .9, x=1180, focus=[.62, .44]); AT('dt22', 198.9, .8, lag=.7); AT('cs9', 87.6, .8, grip=.9); AT('cs9', 89.4, .8, grip=1, coal=.08)
AT('cs9', 96.1, 1.2, flames=.6); AT('cs9', 104.2, 1.0, flames=.85); AT('cs9', 111.9, 1.0, release=.12); AT('cs9', 120.2, 1.0, release=.25)
AT('vs14', 126.7, .8, lamp=.3); AT('vs14', 130.4, 1.2, lamp=.8)
AT('kel15', 139.2, .9, pose2='point', pk=1); AT('kel15', 142.0, .8, nod=10)
AT('ss17', 165.4, 1.0, squeeze=1)
AT('cp19', 172.8, .8, crack=.08); AT('cp19', 174.6, .8, crack=0); mark('mk19', 'underline', [700, 990, 520, 30], 'L19+7.6', 'L20+.4', w=4)
AT('cl20', 190.0, .6, hammer=1); AT('sb23', 206.6, .8, tip=.2)
AT('ast24', 217.5, .9, pose2='point', pk=1); AT('ab24', 224.6, .8, tip=-.05); AT('ast24', 226.0, .9, pose2='think', pk=1)
AT('sf27', 241.4, .9, blaze=.1); AT('sf27', 243.0, .9, blaze=.25)
AT('sf27', 247.4, .9, swell=.8); AT('sf27', 251.9, 1.0, blaze=.85)
AT('cd31', 276.6, 1.0, heat=.6); AT('pd32', 294.4, .8, bump=0); AT('pd32', 297.4, .8, bump=.5)
AT('bet34', 305.0, .9, pose2='sitadjust', pk=1); AT('tw34', 308.1, .8, slip=.08)
AT('nf36', 324.3, 1.0, k=.45); AT('nf36', 332.7, .9, glass=.85); AT('tr38', 340.0, .9, rain=.6)
ripple('rp40', [960, 820], 'L40+8.4', r=180, n=3, d=1.4, col='#8C3424')
AT('ag42', 374.8, .8, gold=.8); AT('ag42', 376.7, .8, gold=1)
AT('cw44', 390.0, .9, gap=.2); AT('cw44', 397.8, .9, gap=1); AT('cw44', 405.6, .8, arrows=.7); AT('cw44', 408.6, .8, arrows=1)
AT('td49', 432.3, .9, walk=.1); AT('td49', 434.0, .9, walk=.2); AT('td49', 440.5, .8, open=.85)
AT('td49', 445.1, .8, eye=.6); AT('td49', 448.2, .8, eye=0)
AT('cw52', 455.1, .8, match=.85); AT('cw52', 458.4, .9, gap=.6); AT('cw52', 460.4, .9, gap=0)
mark('mk52', 'circle', [760, 160, 420, 240], 'L52+10.6', 'L53+.4', w=4, seed=5)
AT('fu54', 478.6, .9, feed=.6)

MOVE = {0: ('push', (900, 600), 'insert'), 1: ('pan-r', (980, 560), 'close'), 2: ('pull', (1080, 480), 'medium'), 3: ('lock', (1000, 540), 'medium'),
        4: ('snap-zoom', (1150, 420), 'close'), 5: ('pan-l', (960, 520), 'wide'), 6: ('dolly', (960, 540), 'wide'), 7: ('tilt-down', (960, 540), 'close'),
        8: ('pan-l', (960, 520), 'medium'), 9: ('crane-up', (960, 500), 'medium'), 10: ('arc', (960, 520), 'medium'), 11: ('handheld', (960, 520), 'wide'),
        12: ('push', (960, 520), 'medium'), 13: ('tilt-up', (960, 480), 'wide'), 14: ('crane-down', (760, 640), 'medium'), 15: ('track', (900, 600), 'medium'),
        16: ('rack', (960, 540), 'insert'), 17: ('orbit', (960, 540), 'close'), 18: ('pan-r', (960, 540), 'close'), 19: ('pull', (900, 540), 'medium'),
        20: ('whip', (960, 520), 'wide'), 21: ('tilt-up', (960, 480), 'wide'), 22: ('dutch', (960, 540), 'close'), 23: ('lock', (960, 540), 'medium'),
        24: ('arc', (860, 560), 'medium'), 25: ('pan-l', (980, 560), 'close'), 26: ('push', (980, 600), 'insert'), 27: ('crane-up', (960, 520), 'close'),
        28: ('pull', (960, 540), 'wide'), 29: ('crane-down', (960, 560), 'wide'), 30: ('handheld', (960, 600), 'medium'), 31: ('push', (960, 540), 'medium'),
        32: ('dive', (960, 540), 'close'), 33: ('snap-zoom', (960, 540), 'insert'), 34: ('track', (900, 560), 'medium'), 35: ('tilt-up', (1100, 420), 'medium'),
        36: ('pan-r', (1000, 520), 'close'), 37: ('orbit', (960, 540), 'wide'), 38: ('rack', (960, 560), 'close'), 39: ('pan-l', (900, 520), 'medium'),
        40: ('crane-down', (960, 600), 'wide'), 41: ('arc', (960, 560), 'wide'), 42: ('push', (960, 600), 'insert'), 43: ('pan-r', (980, 520), 'medium'),
        44: ('lock', (900, 540), 'medium'), 45: ('dutch', (900, 520), 'close'), 46: ('pan-r', (960, 540), 'medium'), 47: ('track', (960, 540), 'medium'),
        48: ('crane-up', (960, 540), 'wide'), 49: ('pan-l', (960, 540), 'medium'), 50: ('track', (960, 560), 'close'), 51: ('arc', (960, 540), 'medium'),
        52: ('push', (900, 520), 'medium'), 53: ('tilt-up', (960, 460), 'wide'), 54: ('pull', (960, 540), 'wide'), 55: ('orbit', (960, 540), 'medium'),
        56: ('pan-r', (960, 540), 'wide'), 57: ('dive', (960, 540), 'close'), 58: ('lock', (960, 520), 'medium'), 59: ('crane-up', (1000, 540), 'medium')}
KEEP2 = {0, 3, 5, 11, 16, 20, 26, 33, 40, 42, 50, 52, 53}
for i in list(_wk.SFX):
    fx = sorted(_wk.SFX[i], key=lambda e: -e['db'])[:2 if i in KEEP2 else 1]; fx.sort(key=lambda e: e['at']); keep = []
    for e in fx:
        e['db'] = max(-6, min(3, e['db']))
        if not keep or e['at'] - keep[-1]['at'] >= 1.3: keep.append(e)
    _wk.SFX[i] = keep
HOW = {i: l['becomes']['how'] for i, l in enumerate(E['lines'])}
finish(MOVE, HOW, new_devices=['CoalSun', 'AtomBalance', 'ProtonDance', 'ThreeDoors', 'CountWall'],
       thumb={'t': 1, 'title': 'What makes the Sun shine?', 'v': 'S', 'kicker': 'Eddington · 1920', 'lines': ['WHAT', 'MAKES THE', 'SUN SHINE?'], 'accent': 2,
              'note': 'Not fire. Not gravity.'},
       music=[('wonder_lightless_dawn', 0, -21), ('curious_aftermath', 'L10-1.6', -21), ('wonder_long_note_one', 'L24-1.6', -21),
              ('tension_darkness_is_coming', 'L35-1.6', -22), ('wonder_silver_blue_light', 'L49-1.0', -22)],
       swells=[['L3+1', 'L3$', -10], ['L26+3', 'L26$', -12], ['L42', 'L42$', -10], ['L59$', 'end', 3]], motif_art=['MatchCandle', 'CoalSun', 'SparkFormula', 'ProtonDance', 'SunFurnace'])
