// Render an episode.
//   node tools/render.mjs episodes/ha-giang-loop.js --fmt 16x9 --out out/hg_16x9.mp4 [--from 0 --to 60] [--stills 1.5,10,22]
//   Shot cache (owner, 12 Nov 2026: "fast AND right, no re-rendering everything"): for a .story whose beats are `# vis` blocks,
//   frames are cached per SHOT in out/<slug>_<fmt>_shots/ (key = header + that beat's block + its duration + format; frames within 1 s
//   of a cut also key on the neighbour). Change one beat → only that beat (and the edges of its neighbours) renders again.
//   Engine/bank code is NOT part of the key: after changing a shot's code pass --redo 4,7 (beat numbers) or --fresh (everything).
import { launch } from './browser.mjs'; import { spawn } from 'child_process'; import fs from 'fs'; import path from 'path'; import crypto from 'crypto';
const args = process.argv.slice(2); const ep = args[0]; const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : undefined; };
const fmt = opt('fmt') || '16x9'; const sc_ = +(opt('scale') || 1); const [w, h] = (fmt === '9x16' ? [1080, 1920] : fmt === '1x1' ? [1080, 1080] : fmt === '4x5' ? [1080, 1350] : [1920, 1080]).map(v => Math.round(v * sc_ / 2) * 2);
const fps = +(opt('fps') || 30);
const browser = await launch();
const isStory = /\.(story|txt)$/.test(ep);
const voi = process.argv.indexOf('--vo'); const VO = voi > 0 && fs.existsSync(process.argv[voi + 1]) ? JSON.parse(fs.readFileSync(process.argv[voi + 1], 'utf8')) : null;
const ENVP = voi > 0 ? path.join(path.dirname(process.argv[voi + 1]), 'envs.json') : null; const ENV = ENVP && fs.existsSync(ENVP) ? JSON.parse(fs.readFileSync(ENVP, 'utf8')) : null; const VISP = ENVP && ENVP.replace(/envs\.json$/, 'visemes.json'); const VIS = VISP && fs.existsSync(VISP) ? JSON.parse(fs.readFileSync(VISP, 'utf8')) : null;
async function openPage() { const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('console', m => { const t = m.text(); if (!/ERR_FILE|missing|GL Driver|swiftshader|GroupMarker/i.test(t)) console.log('PAGE:', t); }); page.on('pageerror', e => console.log('ERR:', e.message));
  await page.goto('file://' + process.cwd() + '/studio.html' + (isStory ? '' : '?ep=' + encodeURIComponent(ep))); await page.evaluate(async () => window.READY);
  if (isStory) await page.evaluate(async ([t, vo, env, vis]) => { window.VOENV = env; window.VOVIS = vis; window.EPISODE = SB.compile(t, vo ? { vo } : {}); }, [fs.readFileSync(ep, 'utf8'), VO, ENV, VIS]);
  const d = await page.evaluate(async ([w, h]) => { const c = document.getElementById('c'); c.width = w; c.height = h; W = w; H = h; ctx = c.getContext('2d'); const _d = loadEpisode(window.EPISODE); await (window.L3_WAIT || 0); return _d; }, [w, h]);
  return { page, dur: d }; }
const { page, dur } = await openPage();
const frameOn = async (pg, t, type = 'image/jpeg', q = .95) => { const d = await pg.evaluate(([t, type, q]) => { renderEpisode(t); return document.getElementById('c').toDataURL(type, q); }, [t, type, q]); return Buffer.from(d.split(',')[1], 'base64'); };
const frame = (t, type, q) => frameOn(page, t, type, q);
if (opt('lines')) { const L = await page.evaluate(t => { SB.compile(t, { collect: 1 }); return { lines: SB._lines, voice: EPISODE.voice, music: EPISODE.music, format: EPISODE.format }; }, fs.readFileSync(ep, 'utf8')); const e = await page.evaluate(t => { const x = SB.compile(t); return { voice: x.voice, music: x.music, format: x.format }; }, fs.readFileSync(ep, 'utf8')); fs.writeFileSync(opt('lines'), JSON.stringify({ ...L, ...e }, null, 1)); console.log('lines', L.lines.length); }
else if (opt('stills')) { const dir = opt('out') || 'out/stills'; fs.mkdirSync(dir, { recursive: true }); for (const t of opt('stills').split(',').map(Number)) fs.writeFileSync(`${dir}/${fmt}_t${t.toFixed(2)}.jpg`, await frame(t, 'image/jpeg', .85)); }
else if (opt('cues')) { const cues = await page.evaluate(async () => episodeCues()); fs.writeFileSync(opt('cues'), JSON.stringify(cues, null, 2)); console.log('duration', dur); }
else {
  const out = opt('out') || `out/episode_${fmt}.mp4`; const f0 = Math.round((+(opt('from') || 0)) * fps), f1 = Math.round((+(opt('to') || dur)) * fps);
  const jobs = Math.max(1, Math.min(+(opt('jobs') || Math.min(8, (await import('os')).cpus().length)), Math.ceil((f1 - f0) / 90)));
  const enc = o => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', opt('preset') || 'fast', '-tune', 'animation', '-crf', '17', '-g', '60', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', o], { stdio: ['pipe', 'ignore', 'inherit'] });
  // Frame cache: every rendered frame is also saved as JPEG, so a killed
  // render resumes from the last cached frame instead of starting over.
  // Cache key = story + format + fps + scale + VO timings; a different
  // key wipes the cache. Cache is deleted after a successful render.
  const sha = x => crypto.createHash('sha1').update(x).digest('hex').slice(0, 12);
  let shotKey = null, cacheDir = out.replace(/\.mp4$/, '_frames');
  if (isStory) { const SH = await page.evaluate(() => ({ st: typeof _starts !== 'undefined' ? _starts : null, ids: EPISODE.scenes.map(x => x.id || ''), du: EPISODE.scenes.map(x => x.dur) }));
    const blocks = fs.readFileSync(ep, 'utf8').split(/\n(?=#\s*vis\b)/), head = blocks[0], beats = blocks.slice(1), redo = new Set((opt('redo') || '').split(',').filter(Boolean).map(Number));
    if (SH.st && beats.length && beats.length === SH.ids.filter(i => i !== 'end').length) { let b = 0; const keys = SH.ids.map((id, i) => { const n = id === 'end' ? 0 : ++b; return sha([head, n ? beats[n - 1] : 'end', SH.du[i].toFixed(3), fmt, fps, sc_, redo.has(n) ? Date.now() : ''].join('|')); });
      shotKey = f => { const t = f / fps; let i = 0; while (i < SH.st.length - 1 && t >= SH.st[i + 1]) i++; let k = keys[i]; if (i && t - SH.st[i] < 1) k += keys[i - 1]; if (i < keys.length - 1 && SH.st[i + 1] - t < 1) k += keys[i + 1]; return sha(k) + '_' + Math.round((t - SH.st[i]) * fps); };
      cacheDir = 'out/' + path.basename(ep).replace(/\.\w+$/, '') + '_' + fmt + (sc_ !== 1 ? '_s' + sc_ : '') + '_shots'; if (args.includes('--fresh')) fs.rmSync(cacheDir, { recursive: true, force: true }); fs.mkdirSync(cacheDir, { recursive: true }); } }
  const fp = crypto.createHash('sha1').update(fs.readFileSync(ep)).update(JSON.stringify({ fmt, fps, sc_, vo: (voi > 0 && fs.existsSync(process.argv[voi + 1])) ? fs.readFileSync(process.argv[voi + 1]) : '' })).digest('hex').slice(0, 12);
  if (!shotKey && fs.existsSync(cacheDir)) { let ok = false; try { ok = JSON.parse(fs.readFileSync(path.join(cacheDir, 'meta.json'), 'utf8')).fp === fp; } catch {} if (!ok) fs.rmSync(cacheDir, { recursive: true, force: true }); }
  if (!shotKey) { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(path.join(cacheDir, 'meta.json'), JSON.stringify({ fp })); }
  const t0 = Date.now(); let done = 0, reused = 0; const total = f1 - f0;
  // a hung page (WebGL context lost, memory pressure: owner 13 Nov 2026, a render sat silent for 40 min) is replaced, not waited on
  const STALL = +(opt('stall') || 180) * 1000, timed = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('stall')), ms))]);
  const seg = async (pg, a, b, o) => { const ff = enc(o); for (let f = a; f < b; f++) { const cf = path.join(cacheDir, (shotKey ? shotKey(f) : f) + '.jpg'); let buf;
    if (fs.existsSync(cf)) { buf = fs.readFileSync(cf); reused++; }
    else { for (let tries = 0; ; tries++) { try { buf = await timed(frameOn(pg, f / fps), STALL); break; } catch (e) { if (tries >= 2) throw e; console.log(`frame ${f}: ${e.message} — reopening the page`); try { await pg.close(); } catch {} pg = (await openPage()).page; } }
      const tmp = cf + '.tmp'; fs.writeFileSync(tmp, buf); fs.renameSync(tmp, cf); }
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (++done % 150 === 0) console.log(`${fmt} frame ${done}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s (${jobs} jobs, reused ${reused})`); } ff.stdin.end(); await new Promise(r => ff.on('close', r)); };
  if (jobs === 1) await seg(page, f0, f1, out);
  else { const pages = [page, ...(await Promise.all(Array.from({ length: jobs - 1 }, () => openPage()))).map(x => x.page)]; const step = Math.ceil(total / jobs); const parts = [];
    await Promise.all(pages.map((pg, k) => { const a = f0 + k * step, b = Math.min(f1, a + step); const o = out.replace(/\.mp4$/, `_part${k}.mp4`); parts.push(o); return a < b ? seg(pg, a, b, o) : Promise.resolve(); }));
    const list = out.replace(/\.mp4$/, '_parts.txt'); fs.writeFileSync(list, parts.filter(p => fs.existsSync(p)).map(p => `file '${path.resolve(p)}'`).join('\n'));
    const { execFileSync } = await import('child_process'); execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', out]); parts.forEach(p => fs.existsSync(p) && fs.unlinkSync(p)); fs.unlinkSync(list); }
  if (!shotKey) fs.rmSync(cacheDir, { recursive: true, force: true }); // video done: drop the frame cache (the shot cache stays until ship.sh)
  if (args.includes('--audio')) { // procedural SFX track from the cue sheet, muxed into the MP4
    const { execFileSync } = await import('child_process'); const cj = out.replace(/\.mp4$/, '_cues.json'), wav = out.replace(/\.mp4$/, '_sfx.wav'), tmp = out.replace(/\.mp4$/, '_tmp.mp4');
    fs.writeFileSync(cj, JSON.stringify(await page.evaluate(async () => episodeCues()), null, 1));
    execFileSync('python3', [path.join(path.dirname(new URL(import.meta.url).pathname), 'sfx.py'), 'mix', cj, wav], { stdio: 'inherit' });
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', out, '-i', wav, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', tmp]); fs.renameSync(tmp, out);
  }
  console.log('done', out, dur, 'reused', reused);
}
await browser.close();
