# Engine API for bespoke shots — read instead of the source

Every painter draws into the global `ctx` at the current frame size `W × H`. `U()` is the unit (1 at 1080 p).
Every timing is `lt` = seconds inside the beat. `c[k] = [start, end, text]` holds the caption timings of the beat.

## Core (engine/core.js, look.js)
- **Maths:** `clamp(x,a=0,b=1)` · `lerp(a,b,t)` · `rng(seed)()` gives 0..1 · `TAU`
- **Easing:** `E.out` `E.in` `E.inOut` `E.out5` `E.back` (overshoot) `E.bounce` `E.elastic` `E.sine`
- **Shapes** (`lw=0` means no outline: the house look):
  - `circ(x,y,r,fill,lw)`
  - `ell(x,y,rx,ry,fill,lw,rot)`
  - `rr(x,y,w,h,r,fill,lw)`
  - `poly([[x,y]…],fill,lw)`
  - `line(x1,y1,x2,y2,w,col)`
  - `glow(x,y,r,col,alpha)` (screen-blended light)
- **Colour:** `shade(hex, ±0.2)` · `mix(hexA, hexB, t)` · `rgba(hex, a)` · brand `IFM.P.{midnight space steel paper yellow coral teal}`
- **Text:**
  - `T(text,x,y,{size,font:'display'|'body'|'mono',weight,fill,lw,stroke,shadow,alpha,scale,align,ls})`
  - `textW(text,size,font,weight)`
  - `TOON.word(TEXT,x,y,{size,lt,at,out,enter:'pop'|'drop'|'slam',idle,fill:[top,bottom]})`
  - `TYPE.draw(style,'A|b',lt,{at,x,y,col,size})`
- **Off-screen:** `mkCanvas(w,h)`

## The If Machine painters
- **Backgrounds:**
  - `IFM.nightBg(lt,{cx,cy,grid,stars})`
  - `IFM.sky('day'|'dusk'|'night'|'dawn', lt, {clouds})`
  - `IFM.grid(a,lt,step)` · `IFM.stars(lt,k)` · `IFM.cloud(x,y,s)`
- **People:**
  - `IFM.human(x,yFeet,h,seed,pose,lt,{style,flip,col,phone,alpha})`
  - poses: stand look walk run phone cheer sit sleep point shock shrug think wave carry type
  - `IFM.people(n,yBase,lt,{pose|[poses],h,rows,depth,seed,phone})` (a crowd with depth)
- **Creatures:** `IFM.creature('dog'|'cat'|'horse'|'dino'|'bird'|'fish'|'whale'|'robot', x,y,h,lt,{pose,flip,col,style})`
- **Planet and space:**
  - `IFM.globe(cx,cy,R,lt,{lon,lat,spin,night,lights,off,arcs,cut,clouds})`
  - `IFM.planet(x,y,R,'mars'|'moon'|'sun'|'earth',lt)`
- **City:** `IFM.towers(seed,yBase,k,lt,{tall})` gives a list; `IFM.drawTowers(list,col,lt,{lit,dark,k})`
- **Things and icons:**
  - `IFM.thing('person'|'car'|'bus'|'whale'|'plane'|'tower'|'mountain'|'earth'|'moon'|'sun', x,yBase,h,lt)`
  - `IFM.icon('<pack>:<name>', cx,cy,size,col,{glow,fill,draw:0..1})`. Find names with `IFM.bank.icons('<pack>')` or
    `grep -o '"<word>[a-z-]*"' engine/library/ifm_icons_<pack>.js`.
  - Logos and brand marks are refused at draw time (brief: no logos).
  - Packs: tabler, lucide, iconoir, feather, heroicons (line); phosphor, phosphorfill, remix, bootstrap (solid);
    aiga (public-domain pictograms). OpenMoji is on disk (`icons_raw/illus`) but not loaded: its mixed stroke/fill SVGs need a colour importer.
    material (opt-in, `IFM_MATERIAL=1 bash tools/stock_sync.sh`).
  - On disk for bespoke shots: `textures/` (CC0 paper, plaster…), `fonts_stock/` (15 OFL families), `geo_stock/`
    (Natural Earth 10/50 m GeoJSON).
- **Machine and brand:**
  - `IFM.machineFace(lt,{spin,busy})`
  - `IFM.lever(x,yBase,h,pull)`
  - `IFM.ticket(x,y,w,h,printed,rot,drawFn)`
  - `IFM.tag(text,x,y,size,{bg})`
  - `IFM.logo(x,y,capH,{short})`
- **Layers:** `IFM.layer('rain'|'snow'|…, lt, seed)` · `IFM.withLook('blueprint'|…, () => draw())`
- **Camera inside an act:** `IFM.cam('push'|'pull'|'truckL'|'truckR'|'crane'|'drop'|'tilt'|'orbit'|'whip'|'dutch'|'float', lt, dur)`

## Illustrations and the explainer kit (owner, 4 Nov 2026 evening)
- `IFM.emoji(name, cx, cy, size, {ground, rot, flip, alpha, sx, line})` — an OpenMoji illustration centred at (cx, cy); names in `EMOJI.md`
  ('bread', 'cow', 'coin', 'money bag', 'bank', 'flag kenya', …); `IFM.emojiFind('word')`. Credit: OpenMoji, CC BY-SA 4.0.
- Kit acts for 2D beats: `ex_show ex_compare ex_flow ex_list ex_stat ex_chapter ex_quote ex_timeline` (`references/explainer-kit.md`).
- Illustrations come from Microsoft Fluent Emoji **Flat** first (flat, no outlines — the house look), OpenMoji as fallback; both are
  re-toned to the house palette by `IFM.emoji`.
- **3D models (CC0, `MODELS.md`):** `IFM.model('food/bread')` → a THREE.Group (flat-shaded vertex colours). In any 3D set:
  `models="name@x,z,rot,scale|…"` (scale `h1.2` = height in metres). `set=stage` = a studio diorama for objects (subjects `item`, `wide`;
  `floor=` `back=` colours), e.g. `act=s3 set=stage models="food/loaf@0,0,20,h1|car/taxi@2,0,-30,h.8" cam=WS.high.orbit on=wide`.
- **Places:** `IFM.place(name, lt, o)` draws a detailed layered environment (far, mid, life), `IFM.placeFore(name, lt, o)` its soft
  foreground; kit beats take `place=` and `props=` (`references/explainer-kit.md`). 3D stage: `dress=market|kitchen|city|nature|space|village|treasure`.
- Sound: a beat asks for a one-shot with `sfx=name@k`; acts make no sound by themselves (minimal sound).

## Bank and acts
- **Add an item:** `IFM.bank.add({ id, kind, tags:[], ep:'<slug>', desc, asp, draw:(x,yBase,h,lt,o)=>{…} })`
  - kind: person creature object vehicle place machine nature food body fx
- **Use an item:** `IFM.bank.get(id).draw(x,y,h,lt,o)` · `IFM.bank.list({kind,tag,ep})`
- **A new bespoke act:** `IFM.ACT.x_<name> = (o, c, dur) => ({ sfx:[[t,'sound']…], draw: lt => {…} })`
  - used as `kind=w act=x_<name>`; it gets `then=` `dir=` `fx=` `look=` `words=` `cam=` for free.
- **Sounds:** `ifm_*` (Muse's pack, `ifm_machine_*` `ifm_motion_*` `ifm_sci_*` `ifm_world_*`) plus `whoosh_*` `impact_*` `ui_*`
  `glitch_*` `magic_*` `nature_*` `crowd_*` (`python3 tools/sfx_pro.py list | grep <word>`).

## Engine 4.0 (owner, 5 Nov 2026 evening): 2D only, polished, flowing
- `IFM.emoji(name, x, y, s, { hero: 1 })` — the subject in the light (soft glow behind, contact shadow). Kit subjects use it.
- `IFM.place(name, lt, o)` is soft by default (depth of field, cached blur, veil, light motes, no foreground clutter); `{ sharp: 1 }`
  draws it crisp with its life layer. `IFM.exBg({ ...o, place: 'street' }, lt)` in a bespoke act = the soft place + theme tint.
- Transitions (story keys): `trans=morph tc=x,y tc2=x,y tr1=.2 tr2=.2` · `trans=match tc= tc2=` · `trans=zoomthru tc= tc2=` ·
  `trans=push2 [tdir=up]` · `trans=wipe` · `trans=dissolve` (+ slide iris zoom paper fold ink fade cut).
- Narration: lines of one beat are one utterance; `lead=` (.2) / `gap=` (.3) / `tail=` (.45) / `pause=` on a beat tune the timing.
- Music: header `score: <track_id|mood>@<beat> …`.
- Example scenes made for one topic, 2D: `engine/library/bank/money-v3.js` (city, facts, market, signal, queue, planner, qullqa,
  parcel, reborn, belief, promise).

## Premium (house standard since 5 Nov 2026 night) — `IFM.PX` (ifm_premium.js) + ifm_premium_kit.js
- Type: `X.kicker(t,x,y,lt,at)` · `X.headline('LINE|A *GOLD* WORD', x, y, lt, at, {s, col, hi})` · `X.counter(v,x,y,lt,at,{s,dec,pre,post,unit})` ·
  `X.callout(t, ax, ay, lx, ly, lt, at, {dark})` · `X.quote(q, by, x, y, lt, at, dur)` · `X.text(t,x,y,{f:'disp|ui|mono|serif', w, s, fill})` · `X.head(o, lt, dark)`.
- Light: `X.lit(pathFn, col, {box:[x,y,w,h], drop, rim})` · `X.contact(x,y,rx)` · `X.glint` · `X.rays(x,y,len,lt,a)` · `X.haze(y0,y1,col,a)` ·
  `X.backdrop(top,bot,{pool})` · `X.cache(key, fn, blur)` · finish: `X.grain()` `X.vignette()` `X.motes(lt)` `X.finish(lt)`.
- Drawn: `X.coin(x,y,r,lt,{sx})` · `X.note(x,y,w,lt)` · `X.tag(x,y,w,text,lt)` · `X.loaf` · `X.person(x,yFeet,h,lt,{col,pose:stand|walk|hold|raise,hat:chef|farmer,item,flip,seed})` ·
  `X.cow` · `X.sack(...,{label})` · `X.shell` · `X.cigarette` · `X.box(...,{open,label})` · `X.clock` · `X.bubble(x,y,w,h,tx,ty,{think})`. Name map: `X.DRAW[name](x,y,size,lt)`.
- House acts: `ex_cold w="A|*B.*;C|*D.*;*GONE.*" items="coin|banknote|balance" end="…"` (cold open) · `ex_outro items= word= sub= next= e= tail=2.4` (spoken outro).
- Transitions: `trans=gl<Name>` (42 GL shaders, references/transitions.md) · `X.orbs(lt, [colours], a)` · headline `reveal: 'mask'|default blur`.
