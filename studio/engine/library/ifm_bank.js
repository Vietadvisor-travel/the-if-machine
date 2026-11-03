/* THE IF MACHINE — the asset bank: every episode adds its new people, creatures, objects and places here, so the
   library grows and no episode has to reuse the last one's things (owner, 3 Nov 2026).
   IFM.bank.add({ id, kind, tags:[…], ep:'<slug>', desc, asp, draw: (x, y, h, lt, o) => … })   feet/base at (x, y), height h px
     kind: person | creature | object | vehicle | place | machine | nature | food | body | fx
   IFM.bank.get(id) · IFM.bank.list({ kind, tag, ep })
   Episode files: engine/library/bank/<slug>.js (one per episode, ≥ 5 new items; register it in engine/library/index.js as 'bank/<slug>').
   Catalogue: node tools/bank.mjs catalog → studio/BANK.md (commit it).   Preview: node tools/bank.mjs sheet [kind] → out/bank_sheet.jpg
   In a story:  # vis kind=w act=stage items="id@k x,y,h [anim]|…" bg=night|day|dusk|space|blueprint|<world act> [cam=…]
     x,y = base point (0..1 of the frame), h = height (share of the frame height), @k = appears on caption k
     anim: pop (default) | drop | slide | grow | float | spin | walk                                                   */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return;
  const P = IFM.P, items = {};
  IFM.bank = { items,
    add(d) { if (!d || !d.id || typeof d.draw !== 'function') return; items[d.id] = { kind: 'object', tags: [], ep: 'core', desc: '', asp: 1, ...d }; },
    get(id) { return items[id]; },
    list(f = {}) { return Object.values(items).filter(d => (!f.kind || d.kind === f.kind) && (!f.tag || d.tags.includes(f.tag)) && (!f.ep || d.ep === f.ep)); } };
  // ---------------------------------------------------------------- vector icon packs (tools/icons.py → engine/library/ifm_icons_<pack>.js)
  const PATHS = {};
  IFM.icon = (name, x, y, size, col = P.paper, o = {}) => { const [pack, id] = name.includes(':') ? name.split(':') : ['tabler', name]; const Pk = window.IFM_ICONS && IFM_ICONS[pack]; const ic = Pk && Pk.icons[id]; if (!ic) return false;
    const key = pack + ':' + id; const ps = PATHS[key] || (PATHS[key] = ic[1].split('|').map(d => new Path2D(d))); const k = size / ic[0]; ctx.save(); ctx.translate(x - size / 2, y - size / 2); ctx.scale(k, k);
    if (o.glow) glow(ic[0] / 2, ic[0] / 2, ic[0], col, .35); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (Pk.fill || o.fill) { ctx.fillStyle = col; ps.forEach(p => ctx.fill(p)); } else { ctx.strokeStyle = col; ctx.lineWidth = (o.weight || 2) * (o.bold ? 1.4 : 1); const dash = o.draw != null ? clamp(o.draw) : 1; if (dash < 1) { ctx.setLineDash([60 * dash, 60]); } ps.forEach(p => ctx.stroke(p)); }
    ctx.restore(); return true; };
  const _get = IFM.bank.get; IFM.bank.get = id => { if (items[id]) return items[id]; const m = String(id).match(/^icon:(.+)$/); if (m) return { id, kind: 'icon', asp: 1, draw: (x, y, h, lt, o) => IFM.icon(m[1], x, y - h / 2, h, o.col || P.paper, { glow: 1 }) }; return _get(id); };
  IFM.bank.icons = (pack = 'tabler') => window.IFM_ICONS && IFM_ICONS[pack] ? Object.keys(IFM_ICONS[pack].icons) : [];

  // ---------------------------------------------------------------- core items (round 2 engine)
  const T = (k, asp, kind, tags, desc) => IFM.bank.add({ id: k, kind, tags, desc, asp, ep: 'core', draw: (x, y, h, lt, o) => IFM.thing(k, x, y, h, lt, o) });
  if (IFM.thing) { T('car', 2.1, 'vehicle', ['street', 'traffic'], 'a red hatchback'); T('bus', 2.5, 'vehicle', ['street', 'city', 'scale'], 'a yellow city bus'); T('plane', 3.6, 'vehicle', ['sky', 'travel'], 'an airliner');
    T('tower', .8, 'place', ['city', 'scale'], 'a glass skyscraper'); T('mountain', 1.6, 'nature', ['scale', 'landscape'], 'a snow-capped peak'); T('earth', 1, 'nature', ['space'], 'the planet'); T('moon', 1, 'nature', ['space'], 'the moon'); T('sun', 1, 'nature', ['space'], 'the sun'); }
  for (const k of ['dog', 'cat', 'horse', 'dino', 'bird', 'fish', 'whale', 'robot']) IFM.bank.add({ id: k, kind: 'creature', tags: ['animal'], ep: 'core', desc: 'facet ' + k, asp: k === 'horse' || k === 'dino' ? 1.6 : 1.2, draw: (x, y, h, lt, o) => IFM.creature(k, x, y, h, lt, o) });
  for (const [id, pose] of [['person_stand', 'stand'], ['person_walk', 'walk'], ['person_phone', 'phone'], ['person_shock', 'shock'], ['person_cheer', 'cheer'], ['person_sit', 'sit'], ['person_sleep', 'sleep'], ['person_think', 'think']])
    IFM.bank.add({ id, kind: 'person', tags: ['people'], ep: 'core', desc: 'one person, ' + pose + ' (look varies by seed and episode)', asp: .4, draw: (x, y, h, lt, o) => IFM.human(x, y, h, o.seed || 7, pose, lt, o) });

  // ---------------------------------------------------------------- `act=stage`: a set built from bank items
  const T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d;
  function parseItems(s) { return String(s || '').split('|').map(x => x.trim()).filter(Boolean).map((x, i) => { const m = x.match(/^(\S+?)(?:@(\d+))?\s+([\d.]+),([\d.]+),([\d.]+)(?:\s+(\w+))?/); return m ? { id: m[1], k: m[2] != null ? +m[2] : null, x: +m[3], y: +m[4], h: +m[5], anim: m[6] || 'pop', i } : null; }).filter(Boolean); }
  IFM.ACT.stage = (o, c, dur) => { const L = parseItems(o.items), bgAct = o.bg && IFM.ACT[o.bg] ? IFM.ACT[o.bg]({ ...o, act: o.bg, people: 0, n: 0, words: '' }, c, dur) : null;
    return { sfx: [...(bgAct ? bgAct.sfx.slice(0, 1) : []), ...L.filter(it => it.k != null).map(it => [T0(c, it.k, .3), it.anim === 'drop' ? 'ifm_motion_impact_thump' : 'ifm_motion_pop'])],
      draw: lt => { const u = U(); if (bgAct) bgAct.draw(lt); else if (o.bg === 'space') IFM.nightBg(lt, { grid: false }); else if (o.bg === 'blueprint') { ctx.fillStyle = '#0F2A5C'; ctx.fillRect(0, 0, W, H); IFM.grid(.25, lt, 50); } else if (['day', 'dusk', 'night', 'dawn'].includes(o.bg)) IFM.sky(o.bg, lt); else IFM.nightBg(lt);
        if (o.ground !== 'none' && o.bg !== 'space') { const gy = H * +(o.ground || .82); ctx.fillStyle = o.bg === 'day' ? 'rgba(60,80,60,.55)' : 'rgba(10,12,30,.6)'; ctx.fillRect(0, gy, W, H - gy); }
        for (const it of [...L].sort((a, b) => a.y - b.y)) { const d = IFM.bank.get(it.id); if (!d) continue; const at = it.k != null ? T0(c, it.k, .3) : 0, p = lt - at; if (p < 0) continue; let x = it.x * W, y = it.y * H * (H > W ? .8 : 1), h = it.h * H * (H > W ? .62 : 1), a = 1, rot = 0;   // 9:16: the set sits above the caption band
          if (it.anim === 'pop') h *= E.back(clamp(p / .4)); else if (it.anim === 'drop') y -= (1 - E.bounce(clamp(p / .6))) * H * .6; else if (it.anim === 'slide') x += (1 - E.out(clamp(p / .5))) * W * .6 * (it.x < .5 ? -1 : 1); else if (it.anim === 'grow') h *= E.out(clamp(p / 1.2));
          else if (it.anim === 'float') y += Math.sin(lt * 1.6 + it.i) * 10 * u; else if (it.anim === 'spin') rot = lt * .8; else if (it.anim === 'walk') x += (lt - at) * h * .25;
          ctx.save(); ctx.globalAlpha *= a; if (rot) { ctx.translate(x, y - h / 2); ctx.rotate(rot); ctx.translate(-x, -(y - h / 2)); } d.draw(x, y, h, lt, { seed: it.i * 13 + 5, pose: it.anim === 'walk' ? 'walk' : undefined }); ctx.restore(); } } }; };
})();
