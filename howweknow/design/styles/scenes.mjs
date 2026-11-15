import fs from 'fs';
import { geoOrthographic, geoEquirectangular, geoPath, geoGraticule10 } from '/home/user/the-if-machine/howweknow/node_modules/d3-geo/src/index.js';
const G = '/home/user/the-if-machine/studio/geo_stock/', J = f => JSON.parse(fs.readFileSync(G + f));
const land = J('ne_50m_admin_0_countries.geojson'), coast = J('ne_50m_coastline.geojson'), rivers = J('ne_50m_rivers_lake_centerlines.geojson'), lakes = J('ne_50m_lakes.geojson');
// cutaway Earth (Africa/Europe facing)
const ec = { cx: 860, cy: 560, r: 400 }, po = geoOrthographic().scale(ec.r).translate([ec.cx, ec.cy]).rotate([-15, -12]).clipAngle(90), pp = geoPath(po);
// Mediterranean map: lon -8..38, lat 27..47 fitted to the frame
const pm = geoEquirectangular().fitExtent([[60, 40], [1860, 1040]], { type: 'MultiPoint', coordinates: [[-6, 22], [38, 22], [38, 46], [-6, 46]] }).clipExtent([[0, 0], [1920, 1080]]), pmp = geoPath(pm);
const nile = { type: 'FeatureCollection', features: rivers.features.filter(f => /Nile/i.test(JSON.stringify(f.properties))) };
const P = n => pm(n).map(v => +v.toFixed(1));
const out = { ec, eLand: pp(land), eGrat: pp(geoGraticule10()),
  mLand: pmp(land), mCoast: pmp(coast), mNile: pmp(nile), mLakes: pmp(lakes), mGrat: pmp(geoGraticule10()),
  city: { alex: P([29.92, 31.2]), syene: P([32.9, 24.09]), rhodes: P([28.22, 36.43]), athens: P([23.73, 37.98]), crete: P([24.9, 35.2]) } };
fs.writeFileSync(process.argv[2], 'window.GEO=' + JSON.stringify(out)); console.log('ok', Object.keys(out).map(k => k + ':' + JSON.stringify(out[k]).length).join(' '));
