/* GL TRANSITIONS runtime (owner, 5 Nov 2026: "ElevenLabs-level transitions"): the curated GLSL shaders in gl_trans_data.js
   (gl-transitions.com, MIT) rendered with one shared WebGL canvas. Story: trans=gl<Name> (e.g. trans=glCrossWarp, glInkBleed,
   glDoorway); tdur= sets the length (default .9 s); the eased progress (inOut) keeps them calm. Every frame: both scene frames are
   uploaded as textures, the shader draws, the result is pasted into the main canvas. Params: the shader's defaults, or tp="k=v,k=v".
   Pick by meaning: references/transitions.md. */
'use strict';
(function () {
  if (!window.GL_TRANS || typeof FX === 'undefined') return;
  const TR = window.TR2_DUR = window.TR2_DUR || {}; let G = null; const PROG = {};
  const VS = 'attribute vec2 p; varying vec2 _uv; void main(){ _uv = (p + 1.0) * .5; gl_Position = vec4(p, 0.0, 1.0); }';
  const SC = .5;   // render cost: the shader runs on a half-size frame (both scenes are downscaled once, the result is scaled back up)
  function ctxGL() { const gw = Math.round(W * SC), gh = Math.round(H * SC); if (G && G.cv.width === gw && G.cv.height === gh) return G; const cv = G ? G.cv : document.createElement('canvas'); cv.width = gw; cv.height = gh;
    const gl = G ? G.gl : cv.getContext('webgl', { premultipliedAlpha: false, preserveDrawingBuffer: true }); if (!gl) return null;
    if (!G) { const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const tex = () => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; };
      G = { cv, gl, buf: b, tA: tex(), tB: tex() }; }
    gl.viewport(0, 0, gw, gh); G.sa = G.sa || document.createElement('canvas'); G.sb = G.sb || document.createElement('canvas'); for (const c2 of [G.sa, G.sb]) { c2.width = gw; c2.height = gh; } return G; }
  function program(T) { if (PROG[T.name]) return PROG[T.name]; const { gl } = G;
    const fs = 'precision highp float; varying vec2 _uv; uniform sampler2D _from, _to; uniform float progress, ratio;\n' +
      'vec4 getFromColor(vec2 uv){ return texture2D(_from, uv); }\nvec4 getToColor(vec2 uv){ return texture2D(_to, uv); }\n' + T.glsl + '\nvoid main(){ gl_FragColor = transition(_uv); }';
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn('gl-transition', T.name, gl.getShaderInfoLog(s)); return null; } return s; };
    const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, fs); if (!v || !f) return (PROG[T.name] = null); const p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.warn('gl-transition link', T.name); return (PROG[T.name] = null); } return (PROG[T.name] = p); }
  function setParam(gl, p, k, v, type) { const loc = gl.getUniformLocation(p, k); if (!loc) return; if (Array.isArray(v)) { const f = /^ivec|^bvec/.test(type || '') ? 'uniform' + v.length + 'i' : 'uniform' + v.length + 'f'; gl[f](loc, ...v.map(Number)); }
    else if (type === 'int' || type === 'bool' || typeof v === 'boolean') gl.uniform1i(loc, +v); else gl.uniform1f(loc, +v); }
  const run = T => (A, B, p, t, c, tr) => { const g = ctxGL(); const prog = g && program(T); if (!prog) { FX.fade(A, B, p); return; } if (p <= .02) { ctx.drawImage(A, 0, 0); return; } if (p >= .98) { ctx.drawImage(B, 0, 0); return; } const { gl } = g; gl.useProgram(prog);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); [[g.tA, A, 0, '_from', g.sa], [g.tB, B, 1, '_to', g.sb]].forEach(([tx, img0, unit, name, sc]) => { const sx = sc.getContext('2d'); sx.drawImage(img0, 0, 0, sc.width, sc.height); const img = sc; gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tx); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); gl.uniform1i(gl.getUniformLocation(prog, name), unit); });
    gl.uniform1f(gl.getUniformLocation(prog, 'progress'), E.inOut(clamp(p))); gl.uniform1f(gl.getUniformLocation(prog, 'ratio'), W / H);
    const over = {}; String((tr && tr.tp) || '').split(',').filter(Boolean).forEach(kv => { const [k, v] = kv.split('='); over[k.trim()] = v.includes(';') ? v.split(';').map(Number) : +v; });
    for (const [k, v] of Object.entries({ ...T.params, ...over })) setParam(gl, prog, k, v, T.types[k]);
    const loc = gl.getAttribLocation(prog, 'p'); gl.bindBuffer(gl.ARRAY_BUFFER, g.buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    ctx.drawImage(g.cv, 0, 0, W, H); };
  window.GL_TRANS.forEach(T => { FX['gl' + T.name] = run(T); TR['gl' + T.name] = .9; });
  window.GL_TRANS_NAMES = window.GL_TRANS.map(T => 'gl' + T.name);
})();
