// Synthesized audio via Web Audio API — no sound files needed, works offline.
// Engine character derives from each car's real engine: V12 wail, V8 rumble,
// straight-six smoothness, vintage four, F1 turbo-hybrid scream.
const AMSound = (function () {
  let ctx = null, master = null, muted = false;
  let engine = null, grassNoise = null;

  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function engineProfile(engineStr) {
    const s = (engineStr || '').toLowerCase();
    if (/v6 turbo|turbo-hybrid/.test(s)) return { base: 95, mult: 4.2, spread: 12, sub: 0.10, buzz: 0.5, name: 'f1' };
    if (/v12/.test(s)) return { base: 62, mult: 3.4, spread: 7, sub: 0.18, buzz: 0.35, name: 'v12' };
    if (/v8/.test(s)) return { base: 40, mult: 2.4, spread: 4, sub: 0.4, buzz: 0.22, name: 'v8' };
    if (/inline-6|i6|six/.test(s)) return { base: 50, mult: 2.8, spread: 5, sub: 0.26, buzz: 0.26, name: 'six' };
    return { base: 44, mult: 2.0, spread: 3, sub: 0.3, buzz: 0.2, name: 'four' }; // vintage fours
  }

  // ---- continuous engine sound ----
  function startEngine(engineStr) {
    ensureCtx();
    stopEngine();
    const p = engineProfile(engineStr);
    const g = ctx.createGain(); g.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 900; filter.Q.value = 2;

    const oscs = [];
    const mk = (type, det, vol) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = type; o.frequency.value = p.base; o.detune.value = det;
      og.gain.value = vol;
      o.connect(og); og.connect(filter); o.start();
      oscs.push(o);
      return o;
    };
    mk('sawtooth', 0, 0.5);
    mk('sawtooth', p.spread * 4, 0.35);          // detuned pair = throb
    mk('square', -1200, p.sub);                  // sub octave rumble
    mk('sawtooth', 1900 + p.spread * 8, p.buzz * 0.3); // top-end harmonic

    filter.connect(g); g.connect(master);
    engine = { oscs, gain: g, filter, profile: p };
  }

  function setEngine(rpm, load) {
    // rpm 0..1, load 0..1 (throttle)
    if (!engine || muted) return;
    const p = engine.profile;
    const f = p.base * (1 + rpm * p.mult);
    const t = ctx.currentTime;
    engine.oscs.forEach((o, i) => {
      const target = i === 2 ? f / 2 : f * (1 + i * 0.008);
      o.frequency.setTargetAtTime(target, t, 0.04);
    });
    engine.filter.frequency.setTargetAtTime(500 + rpm * 3200 + load * 800, t, 0.06);
    engine.gain.gain.setTargetAtTime(0.10 + rpm * 0.16 + load * 0.06, t, 0.05);
  }

  function stopEngine() {
    if (!engine) return;
    const e = engine; engine = null;
    e.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
    setTimeout(() => e.oscs.forEach(o => { try { o.stop(); } catch (_) {} }), 400);
  }

  // ---- grass / off-track noise ----
  function noiseBuffer() {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }
  function setGrass(on, speed) {
    if (!ctx || muted) return;
    if (on && !grassNoise) {
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(); src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 400; f.Q.value = 0.8;
      const g = ctx.createGain(); g.gain.value = 0;
      src.connect(f); f.connect(g); g.connect(master); src.start();
      grassNoise = { src, gain: g };
    }
    if (grassNoise) {
      grassNoise.gain.gain.setTargetAtTime(on ? Math.min(0.25, speed * 0.06) : 0, ctx.currentTime, 0.1);
      if (!on) { const gn = grassNoise; grassNoise = null; setTimeout(() => { try { gn.src.stop(); } catch (_) {} }, 500); }
    }
  }

  // ---- one-shot effects ----
  function blip(freq, dur, type, vol, when) {
    if (muted) return;
    ensureCtx();
    const t = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol || 0.3, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function countdownBeep(final) { blip(final ? 880 : 440, final ? 0.5 : 0.18, 'sine', 0.35); }

  function crash() {
    if (muted || !ctx) return;
    const src = ctx.createBufferSource(); src.buffer = noiseBuffer();
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 300;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t); src.stop(t + 0.3);
  }

  function fanfare(win) {
    const notes = win ? [523, 659, 784, 1047] : [392, 494, 587];
    notes.forEach((n, i) => blip(n, 0.5, 'triangle', 0.28, i * 0.18));
  }

  function toggleMute() {
    muted = !muted;
    if (muted && engine) engine.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
    if (muted && grassNoise) setGrass(false, 0);
    return muted;
  }

  return { startEngine, setEngine, stopEngine, setGrass, countdownBeep, crash, fanfare, toggleMute, isMuted: () => muted };
})();
