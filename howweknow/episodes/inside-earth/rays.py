#!/usr/bin/env python3
"""Seismic ray paths through PREM (Muse X-01, TauP export) — real geometry for the film's diagrams (shadow zone ~103°–143°, PKIKP into it).
rays(kind, ps) → [{p, delta, pts:[(u, v)…]}], u/v in units of the Earth's radius, quake at the top (0, -1), screen y down."""
import csv, math, os
R = 6371.0
H = os.path.dirname(os.path.abspath(__file__))
rows = list(csv.DictReader(open(os.path.join(H, '../../public/stock/_hwk/inside-earth/X-01_prem-velocity-density.csv'))))
D = [(float(r['depth_km']), float(r['vp_km_s']), float(r['vs_km_s'])) for r in rows]
def vel(depth, s=False):
    for (d0, p0, s0), (d1, p1, s1) in zip(D, D[1:]):
        if d0 <= depth <= d1 and d1 > d0:
            k = (depth - d0) / (d1 - d0); return (s0 + (s1 - s0) * k) if s else (p0 + (p1 - p0) * k)
    return D[-1][2] if s else D[-1][1]
def trace(p, s=False, dr=2.0, inner=True):
    r, th, down = R, 0.0, []
    while r > dr:
        rm = r - dr / 2; dep = R - rm
        if not inner and dep > 5150: v = vel(5149.0)   # a core with NO solid inner ball (the model before Lehmann)
        else: v = vel(dep, s)
        if v <= 0:   # S wave meets the liquid core: it stops there
            return {'p': p, 'delta': None, 'stopped': True, 'pts': [(round(rr / R * math.sin(a), 4), round(-rr / R * math.cos(a), 4)) for rr, a in ([(R, 0.0)] + down)[::3]], 'bottom': R - r}
        eta = rm / v
        if eta <= p: break
        th += p / (rm * math.sqrt(eta * eta - p * p)) * dr
        r -= dr; down.append((r, th))
    tt = th
    up = [(rr, 2 * tt - a) for rr, a in reversed(down)] + [(R, 2 * tt)]
    path = [(R, 0.0)] + down + up
    return {'p': p, 'delta': math.degrees(2 * tt), 'pts': [(round(rr / R * math.sin(a), 4), round(-rr / R * math.cos(a), 4)) for rr, a in path[::3]] + [(round(math.sin(2 * tt), 4), round(-math.cos(2 * tt), 4))], 'bottom': R - (down[-1][0] if down else R)}
def scr(pts, cx, cy, r, rot=0):
    c, s_ = math.cos(math.radians(rot)), math.sin(math.radians(rot))
    return [[round(cx + (u * c - v * s_) * r, 1), round(cy + (u * s_ + v * c) * r, 1)] for u, v in pts]
if __name__ == '__main__':
    for p in [800, 700, 600, 500, 400, 330, 300, 280, 270, 265, 262, 258, 250, 230, 200, 160, 120, 100, 80, 60, 30]:
        a = trace(p); print(p, a and round(a['delta'], 1), a and round(a['bottom']))
    print('no inner:', [(p, round(trace(p, inner=False)['delta'], 1)) for p in [250, 200, 150, 110, 100, 80, 50, 20]])
    print('S:', [(p, (lambda x: x and round(x['delta'], 1))(trace(p, s=True))) for p in [900, 700, 500, 450, 430]])
