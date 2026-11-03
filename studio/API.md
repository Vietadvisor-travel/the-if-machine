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
  - `IFM.icon('tabler:<name>', cx,cy,size,col,{glow,fill,draw:0..1})` (5,203 icons; names: `IFM.bank.icons()` or the tabler.io list)
- **Machine and brand:**
  - `IFM.machineFace(lt,{spin,busy})`
  - `IFM.lever(x,yBase,h,pull)`
  - `IFM.ticket(x,y,w,h,printed,rot,drawFn)`
  - `IFM.tag(text,x,y,size,{bg})`
  - `IFM.logo(x,y,capH,{short})`
- **Layers:** `IFM.layer('rain'|'snow'|…, lt, seed)` · `IFM.withLook('blueprint'|…, () => draw())`
- **Camera inside an act:** `IFM.cam('push'|'pull'|'truckL'|'truckR'|'crane'|'drop'|'tilt'|'orbit'|'whip'|'dutch'|'float', lt, dur)`

## Bank and acts
- **Add an item:** `IFM.bank.add({ id, kind, tags:[], ep:'<slug>', desc, asp, draw:(x,yBase,h,lt,o)=>{…} })`
  - kind: person creature object vehicle place machine nature food body fx
- **Use an item:** `IFM.bank.get(id).draw(x,y,h,lt,o)` · `IFM.bank.list({kind,tag,ep})`
- **A new bespoke act:** `IFM.ACT.x_<name> = (o, c, dur) => ({ sfx:[[t,'sound']…], draw: lt => {…} })`
  - used as `kind=w act=x_<name>`; it gets `then=` `dir=` `fx=` `look=` `words=` `cam=` for free.
- **Sounds:** `ifm_*` (Muse's pack, `ifm_machine_*` `ifm_motion_*` `ifm_sci_*` `ifm_world_*`) plus `whoosh_*` `impact_*` `ui_*`
  `glitch_*` `magic_*` `nature_*` `crowd_*` (`python3 tools/sfx_pro.py list | grep <word>`).
