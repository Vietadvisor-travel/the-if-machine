import fs from 'fs';
import { geoOrthographic, geoPath, geoGraticule10, geoCircle } from '/home/user/the-if-machine/howweknow/node_modules/d3-geo/src/index.js';
const G = '/home/user/the-if-machine/studio/geo_stock/';
const land = JSON.parse(fs.readFileSync(G + 'ne_50m_admin_0_countries.geojson'));
const lakes = JSON.parse(fs.readFileSync(G + 'ne_50m_lakes.geojson'));
const places = JSON.parse(fs.readFileSync(G + 'ne_50m_populated_places.geojson'));
const cx = 640, cy = 560, r = 400, lon0 = -35, lat0 = 22;
const proj = geoOrthographic().scale(r).translate([cx, cy]).rotate([-lon0, -lat0]).clipAngle(90), path = geoPath(proj);
// sun from the upper right: subsolar point
const sun = [lon0 + 70, 10];
const night = geoCircle().center([sun[0] + 180, -sun[1]]).radius(90)();
const pts = places.features.map(f => f.geometry.coordinates).filter(([lo, la]) => { const d = Math.acos(Math.sin(la * Math.PI / 180) * Math.sin(-sun[1] * Math.PI / 180) + Math.cos(la * Math.PI / 180) * Math.cos(-sun[1] * Math.PI / 180) * Math.cos((lo - sun[0] - 180) * Math.PI / 180)); return d < Math.PI / 2 - 0.05; }).map(c => proj(c)).filter(Boolean);
const out = { cx, cy, r, land: path(land), lakes: path(lakes), grat: path(geoGraticule10()), night: path(night), lights: pts.map(p => p.map(v => +v.toFixed(1))) };
fs.writeFileSync(process.argv[2], 'window.SCENE=' + JSON.stringify(out));
console.log('scene', (out.land.length / 1024).toFixed(0) + ' KB land,', pts.length, 'night lights');
