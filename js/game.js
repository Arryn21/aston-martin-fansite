// ===== ASTON MARTIN RACE SIMULATOR =====
// Top-down 2D racer. Stats (speed/accel/handling 1-10) from data.js.
// 3-2-1 countdown, engine audio per car, robust lap detection, auto finish.
(function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // ---------- TRACKS ----------
  const TRACKS = {
    silverstone: {
      label: 'Silverstone',
      width: 62,
      pts: [
        [130, 500], [110, 380], [130, 250], [220, 140], [360, 100], [520, 110],
        [640, 160], [700, 260], [660, 350], [560, 380], [500, 300], [420, 280],
        [380, 360], [430, 450], [560, 470], [700, 450], [790, 500], [760, 560],
        [600, 570], [400, 560], [240, 560]
      ]
    },
    monaco: {
      label: 'Riviera',
      width: 52,
      pts: [
        [100, 520], [90, 400], [120, 300], [100, 200], [170, 120], [300, 90],
        [420, 120], [470, 200], [430, 270], [330, 280], [300, 350], [370, 400],
        [500, 380], [620, 320], [720, 340], [780, 420], [760, 520], [660, 560],
        [520, 540], [400, 560], [250, 570]
      ]
    },
    oval: {
      label: 'Speed Oval',
      width: 80,
      pts: [
        [150, 300], [180, 180], [300, 110], [450, 90], [600, 110], [720, 180],
        [760, 300], [720, 420], [600, 490], [450, 510], [300, 490], [180, 420]
      ]
    },
    lemans: {
      label: 'La Sarthe',
      width: 58,
      pts: [
        [110, 520], [90, 400], [110, 280], [180, 170], [300, 110], [460, 90],
        [620, 100], [750, 150], [810, 250], [800, 360], [730, 420], [640, 400],
        [590, 320], [500, 280], [400, 290], [340, 360], [360, 440], [460, 490],
        [600, 500], [700, 545], [600, 575], [400, 575], [220, 565]
      ]
    },
    alpine: {
      label: 'Alpine Pass',
      width: 50,
      pts: [
        [120, 550], [90, 460], [130, 380], [240, 360], [330, 380], [400, 330],
        [350, 260], [240, 250], [150, 210], [170, 120], [300, 90], [430, 110],
        [500, 180], [470, 260], [560, 300], [680, 270], [770, 300], [790, 400],
        [720, 470], [600, 470], [500, 430], [430, 470], [300, 500], [200, 540]
      ]
    },
    gp: {
      label: 'Gaydon GP',
      width: 60,
      pts: [
        [140, 500], [120, 380], [140, 260], [220, 160], [350, 110], [500, 100],
        [640, 130], [750, 200], [790, 320], [750, 430], [640, 480], [520, 450],
        [450, 370], [360, 340], [280, 380], [260, 470], [200, 520]
      ]
    }
  };

  // ---------- STATE ----------
  let trackName = 'silverstone';
  let selectedCar = CARS.find(c => c.id === location.hash.slice(1)) || CARS.find(c => c.id === 'db5');
  let raceOn = false, countdown = 0, countdownStep = -1;
  let cars = [], startTime = 0, animId = null, raceEnded = false;
  const LAPS = 3;
  const keys = {};

  // ---------- CAR SELECT UI ----------
  const selEl = document.getElementById('carSelect');
  selEl.innerHTML = CARS.map(c => `
    <div class="car-option ${c.id === selectedCar.id ? 'selected' : ''}" data-id="${c.id}">
      <div class="photo" data-img="${c.id}"></div>
      <div class="body">
        <h4>${c.name}</h4>
        <div class="mini-stats">Spd ${c.game.speed} · Acc ${c.game.accel} · Hdl ${c.game.handling}</div>
      </div>
    </div>`).join('');
  selEl.querySelectorAll('.photo[data-img]').forEach(el => AMUI.photo(el, el.dataset.img));

  selEl.addEventListener('click', e => {
    const opt = e.target.closest('.car-option');
    if (!opt) return;
    selectedCar = CARS.find(c => c.id === opt.dataset.id);
    selEl.querySelectorAll('.car-option').forEach(o => o.classList.toggle('selected', o === opt));
  });

  // track picker built from TRACKS
  const trackPickEl = document.getElementById('trackPick');
  trackPickEl.innerHTML = Object.keys(TRACKS).map(k =>
    `<button class="${k === trackName ? 'active' : ''}" data-track="${k}">${TRACKS[k].label}</button>`).join('');
  trackPickEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    trackName = btn.dataset.track;
    trackPickEl.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    drawPreview();
    renderBoard('lbBox');
  });

  // ---------- TRACK PREVIEW (mini map on select screen) ----------
  const TRACK_DESC = {
    silverstone: 'Fast and technical — long sweepers into a stop-start infield. The all-rounder.',
    monaco: 'Tight and unforgiving street circuit. Handling wins here, horsepower just gets you into the barriers.',
    oval: 'Flat-out banked speed bowl. Top speed is everything — bring a Valkyrie.',
    lemans: 'Long straights and heavy braking zones in the style of La Sarthe. Slipstream and courage.',
    alpine: 'Mountain pass of relentless hairpins. The narrowest road on the calendar.',
    gp: 'Modern grand prix flow — quick direction changes and one big lunge-worthy hairpin.'
  };

  function drawPreview() {
    const cv = document.getElementById('trackPreview');
    if (!cv) return;
    const pc = cv.getContext('2d');
    const track = TRACKS[trackName];
    const p = track.pts;
    // fit 900x600 world into the preview canvas with padding
    const pad = 18;
    const sx = (cv.width - pad * 2) / 900, sy = (cv.height - pad * 2) / 600;
    const s = Math.min(sx, sy);
    const ox = pad + (cv.width - pad * 2 - 900 * s) / 2;
    const oy = pad + (cv.height - pad * 2 - 600 * s) / 2;
    const X = pt => ox + pt[0] * s, Y = pt => oy + pt[1] * s;

    pc.clearRect(0, 0, cv.width, cv.height);
    pc.lineJoin = 'round'; pc.lineCap = 'round';
    const path = () => {
      pc.beginPath();
      pc.moveTo(X(p[0]), Y(p[0]));
      for (let i = 1; i < p.length; i++) pc.lineTo(X(p[i]), Y(p[i]));
      pc.closePath();
    };
    pc.strokeStyle = 'rgba(201,179,126,0.35)'; pc.lineWidth = track.width * s + 5; path(); pc.stroke();
    pc.strokeStyle = '#33383b'; pc.lineWidth = track.width * s; path(); pc.stroke();
    pc.strokeStyle = 'rgba(255,255,255,0.3)'; pc.lineWidth = 1; pc.setLineDash([4, 5]); path(); pc.stroke();
    pc.setLineDash([]);
    // start marker
    pc.fillStyle = '#e3d3a6';
    pc.beginPath(); pc.arc(X(p[0]), Y(p[0]), 4, 0, Math.PI * 2); pc.fill();

    const nameEl = document.getElementById('tpName');
    if (nameEl) {
      nameEl.textContent = track.label;
      document.getElementById('tpDesc').textContent = TRACK_DESC[trackName] || '';
    }
  }
  drawPreview();

  // ---------- LEADERBOARD UI ----------
  function esc(s) {
    return String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  }

  function lbRow(e, i, highlight) {
    return `<div class="lb-row${highlight ? ' me' : ''}">
      <span class="rank">${i + 1}</span>
      <span class="name">${esc(e.name)}</span>
      <span class="carname">${esc(e.car)}</span>
      <span class="time">${fmt(e.timeMs)}</span>
    </div>`;
  }

  async function renderBoard(elId, mine) {
    const el = document.getElementById(elId);
    if (!el) return;
    const label = TRACKS[trackName].label;
    const nameEl = document.getElementById('lbTrackName');
    if (nameEl) nameEl.textContent = label;
    const scopeEl = document.getElementById('lbScope');
    if (scopeEl) scopeEl.textContent = LB.isGlobal
      ? 'Global standings — top ' + LB.TOP_N + ' of everyone who has raced ' + label + '.'
      : 'Stored on this device. (Global leaderboard activates once js/lb-config.js is filled in — see FIREBASE_SETUP.md.)';
    el.innerHTML = '<p class="news-note">Loading…</p>';
    const rows = await LB.getTop(trackName);
    el.innerHTML = rows.length
      ? `<div class="lb-table">${rows.map((e, i) =>
          lbRow(e, i, mine && e.name === mine.name && e.timeMs === mine.timeMs)).join('')}</div>`
      : '<p class="news-note">No times yet — set the first one.</p>';
  }
  renderBoard('lbBox');

  document.getElementById('startBtn').addEventListener('click', startRace);
  document.getElementById('muteBtn').addEventListener('click', () => {
    const m = AMSound.toggleMute();
    document.getElementById('muteBtn').textContent = 'Sound: ' + (m ? 'Off' : 'On');
  });

  // ---------- GEOMETRY ----------
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }
  function onTrack(x, y, track) {
    const p = track.pts, n = p.length;
    for (let i = 0; i < n; i++) {
      const a = p[i], b = p[(i + 1) % n];
      if (segDist(x, y, a[0], a[1], b[0], b[1]) < track.width / 2 + 6) return true;
    }
    return false;
  }

  // ---------- SETUP ----------
  function makeCar(model, isPlayer, gridSlot, track) {
    const p0 = track.pts[0], p1 = track.pts[1];
    const heading = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
    const side = (gridSlot % 2 === 0 ? -1 : 1) * track.width * 0.22;
    const back = gridSlot * 26;
    const nx = Math.cos(heading + Math.PI / 2), ny = Math.sin(heading + Math.PI / 2);
    return {
      model, isPlayer,
      x: p0[0] - Math.cos(heading) * back + nx * side,
      y: p0[1] - Math.sin(heading) * back + ny * side,
      angle: heading, speed: 0,
      maxSpeed: 2.6 + model.game.speed * 0.34,
      accel: 0.025 + model.game.accel * 0.0085,
      turnRate: 0.026 + model.game.handling * 0.0032,
      lap: 1, nextWp: 1, lapStart: 0, bestLap: null, finished: false, finishTime: 0, finishPos: 0,
      aiSkill: isPlayer ? 1 : 0.78 + Math.random() * 0.16,
      aiWobble: Math.random() * 1000, wasOnGrass: false
    };
  }

  function startRace() {
    const track = TRACKS[trackName];
    const rivals = CARS.filter(c => c.id !== selectedCar.id);
    rivals.sort((a, b) =>
      Math.abs((a.game.speed + a.game.accel) - (selectedCar.game.speed + selectedCar.game.accel)) -
      Math.abs((b.game.speed + b.game.accel) - (selectedCar.game.speed + selectedCar.game.accel)));
    const grid = [selectedCar, rivals[0], rivals[1], rivals[2]];
    cars = grid.map((m, i) => makeCar(m, i === 0, i, track));

    document.getElementById('selectScreen').style.display = 'none';
    document.getElementById('raceScreen').style.display = 'block';
    document.getElementById('hudCar').textContent = selectedCar.name;
    document.getElementById('hudBest').textContent = '–';
    document.getElementById('resultsBox').innerHTML = '';

    raceEnded = false;
    raceOn = true;
    countdown = 3.5;           // seconds of hold before lights out
    countdownStep = -1;
    startTime = 0;
    AMSound.startEngine(selectedCar.engine);
    if (animId) cancelAnimationFrame(animId);
    lastFrame = performance.now();
    loop();
  }

  function backToSelect() {
    raceOn = false;
    AMSound.stopEngine();
    AMSound.setGrass(false, 0);
    if (animId) cancelAnimationFrame(animId);
    document.getElementById('raceScreen').style.display = 'none';
    document.getElementById('selectScreen').style.display = 'block';
    renderBoard('lbBox');
  }

  // ---------- INPUT ----------
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    keys[k] = true;
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
    if (e.key === 'Escape') backToSelect();
    if (k === 'r' && document.getElementById('raceScreen').style.display !== 'none') startRace();
  });
  document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

  // ---------- PHYSICS & AI ----------
  function updateCar(c, track, now) {
    if (c.finished) {
      c.speed *= 0.97;
      c.x += Math.cos(c.angle) * c.speed;
      c.y += Math.sin(c.angle) * c.speed;
      return;
    }

    let throttle = 0, steer = 0;
    if (c.isPlayer) {
      if (keys['arrowup'] || keys['w']) throttle = 1;
      if (keys['arrowdown'] || keys['s']) throttle = -1;
      if (keys['arrowleft'] || keys['a']) steer = -1;
      if (keys['arrowright'] || keys['d']) steer = 1;
    } else {
      const wp = track.pts[c.nextWp % track.pts.length];
      const wobble = Math.sin(now / 900 + c.aiWobble) * 6;
      const ta = Math.atan2(wp[1] + wobble - c.y, wp[0] - c.x);
      let diff = ta - c.angle;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      steer = Math.max(-1, Math.min(1, diff * 3));
      throttle = Math.abs(diff) > 0.85 ? 0.25 : c.aiSkill;
    }

    const grass = !onTrack(c.x, c.y, track);
    if (c.isPlayer) {
      if (grass && !c.wasOnGrass) AMSound.setGrass(true, c.speed);
      if (!grass && c.wasOnGrass) AMSound.setGrass(false, 0);
      c.wasOnGrass = grass;
    }
    const cap = c.maxSpeed * (grass ? 0.45 : 1);

    if (throttle > 0) c.speed = Math.min(cap, c.speed + c.accel * throttle * (grass ? 0.5 : 1));
    else if (throttle < 0) c.speed = Math.max(-cap * 0.3, c.speed - c.accel * 2.2);
    else c.speed *= 0.985;
    if (grass) c.speed *= 0.985;

    const speedFactor = Math.min(1, Math.abs(c.speed) / (c.maxSpeed * 0.35));
    c.angle += steer * c.turnRate * speedFactor * (c.speed < 0 ? -1 : 1);

    c.x += Math.cos(c.angle) * c.speed;
    c.y += Math.sin(c.angle) * c.speed;
    c.x = Math.max(8, Math.min(W - 8, c.x));
    c.y = Math.max(8, Math.min(H - 8, c.y));

    // --- waypoint / lap logic (robust: generous radius + one-ahead skip) ---
    const n = track.pts.length;
    const radius = track.width * 1.15;
    const wpNow = track.pts[c.nextWp % n];
    const wpNext = track.pts[(c.nextWp + 1) % n];
    let advance = 0;
    if (Math.hypot(c.x - wpNow[0], c.y - wpNow[1]) < radius) advance = 1;
    else if (Math.hypot(c.x - wpNext[0], c.y - wpNext[1]) < radius) advance = 2; // cut a corner, skip one
    if (advance) {
      for (let k = 0; k < advance; k++) {
        c.nextWp++;
        if (c.nextWp % n === 1 && c.nextWp > 1) {
          const lapTime = now - c.lapStart;
          c.lapStart = now;
          if (!c.bestLap || lapTime < c.bestLap) c.bestLap = lapTime;
          c.lap++;
          if (c.lap > LAPS && !c.finished) {
            c.finished = true;
            c.finishTime = now - startTime;
            c.finishPos = cars.filter(o => o.finished).length; // includes self
            if (c.isPlayer) playerFinished(c);
          }
        }
      }
    }
  }

  function collisions() {
    for (let i = 0; i < cars.length; i++) for (let j = i + 1; j < cars.length; j++) {
      const a = cars[i], b = cars[j];
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d < 18 && d > 0.001) {
        const push = (18 - d) / 2, ux = dx / d, uy = dy / d;
        a.x -= ux * push; a.y -= uy * push;
        b.x += ux * push; b.y += uy * push;
        if ((a.isPlayer || b.isPlayer) && Math.abs(a.speed - b.speed) > 0.8) AMSound.crash();
        a.speed *= 0.97; b.speed *= 0.97;
      }
    }
  }

  function positionOf(car, track) {
    const progress = c2 => {
      if (c2.finished) return 1e9 - c2.finishTime; // finishers rank by time
      const wp = track.pts[c2.nextWp % track.pts.length];
      return c2.nextWp * 1000 - Math.hypot(c2.x - wp[0], c2.y - wp[1]);
    };
    return cars.filter(c => progress(c) > progress(car)).length + 1;
  }

  // ---------- FINISH ----------
  function playerFinished(player) {
    raceEnded = true;
    AMSound.stopEngine();
    AMSound.setGrass(false, 0);
    const pos = player.finishPos;
    AMSound.fanfare(pos === 1);
    const posText = pos === 1 ? 'P1 · Victory' : 'P' + pos;
    const box = document.getElementById('resultsBox');
    const savedName = localStorage.getItem('am-player-name') || '';
    box.innerHTML = `
      <div class="results-panel">
        <div class="eyebrow">Race Complete — ${TRACKS[trackName].label}</div>
        <div class="pos">${posText}</div>
        <div class="detail">
          ${player.model.name}<br>
          Total ${fmt(player.finishTime)}${player.bestLap ? ' · Best lap ' + fmt(player.bestLap) : ''}
        </div>
        <div class="lb-entry" id="lbEntry">
          <input type="text" id="lbName" maxlength="20" placeholder="Your name"
                 value="${esc(savedName)}" autocomplete="off">
          <button class="btn solid" id="lbSaveBtn">Save to Leaderboard</button>
        </div>
        <div id="lbResult"></div>
        <div style="margin-top:1.2rem">
          <button class="btn solid" id="againBtn">Race Again</button>
          <button class="btn" id="changeBtn">Change Car</button>
        </div>
      </div>`;
    document.getElementById('againBtn').addEventListener('click', startRace);
    document.getElementById('changeBtn').addEventListener('click', backToSelect);

    const saveBtn = document.getElementById('lbSaveBtn');
    const nameInput = document.getElementById('lbName');
    // keep race keys (R, WASD...) from firing while typing a name
    nameInput.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter') saveBtn.click();
    });
    saveBtn.addEventListener('click', async () => {
      const entry = {
        name: LB.cleanName(nameInput.value),
        car: player.model.name,
        timeMs: Math.round(player.finishTime),
        bestLapMs: player.bestLap ? Math.round(player.bestLap) : 0
      };
      localStorage.setItem('am-player-name', entry.name);
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving…';
      const remoteOk = await LB.submit(trackName, entry);
      document.getElementById('lbEntry').style.display = 'none';
      const resEl = document.getElementById('lbResult');
      resEl.innerHTML = `
        <p class="news-note" style="margin-top:0.8rem">${remoteOk && LB.isGlobal ? 'Saved to the global board.' : 'Saved on this device.'}</p>
        <div id="lbAfter"></div>`;
      renderBoard('lbAfter', entry);
      renderBoard('lbBox'); // refresh select-screen board too
    });

    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // let remaining cars coast for a moment, then stop the loop
    setTimeout(() => { raceOn = false; if (animId) cancelAnimationFrame(animId); }, 2500);
  }

  // ---------- RENDER ----------
  function drawTrack(track) {
    ctx.fillStyle = '#101b12';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    for (let i = 0; i < 60; i++) ctx.fillRect((i * 137) % W, (i * 89) % H, 2, 2);

    const p = track.pts;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeStyle = '#8c2f2a'; ctx.lineWidth = track.width + 10;
    trace(p); ctx.stroke();
    ctx.strokeStyle = '#33383b'; ctx.lineWidth = track.width;
    trace(p); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 2;
    ctx.setLineDash([14, 18]);
    trace(p); ctx.stroke();
    ctx.setLineDash([]);

    const a = p[0], b = p[1];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2;
    ctx.save();
    ctx.translate(a[0], a[1]); ctx.rotate(ang);
    for (let i = -3; i < 3; i++) for (let k = 0; k < 2; k++) {
      ctx.fillStyle = (i + k) % 2 ? '#e8e8e8' : '#111';
      ctx.fillRect(i * 10, -10 + k * 10, 10, 10);
    }
    ctx.restore();
  }
  function trace(p) {
    ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
    ctx.closePath();
  }

  function drawCar(c) {
    ctx.save();
    ctx.translate(c.x, c.y); ctx.rotate(c.angle);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(-11, -5, 24, 12);
    ctx.fillStyle = c.model.game.color;
    roundRect(-12, -6, 24, 12, 4);
    ctx.fillStyle = 'rgba(10,15,13,0.75)';
    roundRect(-4, -4.5, 9, 9, 2);
    ctx.fillStyle = '#ffe9a8';
    ctx.fillRect(10, -5, 2, 3); ctx.fillRect(10, 2, 2, 3);
    if (c.isPlayer) {
      ctx.strokeStyle = '#e3d3a6'; ctx.lineWidth = 1.5;
      ctx.strokeRect(-13, -7, 26, 14);
    }
    ctx.restore();
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.fill();
  }

  function fmt(ms) {
    const t = Math.max(0, ms) / 1000;
    const m = Math.floor(t / 60), s = (t % 60).toFixed(1);
    return m + ':' + (Number(s) < 10 ? '0' : '') + s;
  }

  function drawCountdown() {
    ctx.fillStyle = 'rgba(5,6,5,0.45)';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e3d3a6';
    ctx.font = '400 110px Marcellus, serif';
    const n = Math.ceil(countdown - 0.5);
    ctx.fillText(n > 0 ? String(n) : 'GO', W / 2, H / 2 + 38);
  }

  // ---------- MAIN LOOP ----------
  let lastFrame = 0;
  function loop() {
    if (!raceOn) return;
    const now = performance.now();
    const dt = Math.min(50, now - lastFrame) / 1000;
    lastFrame = now;
    const track = TRACKS[trackName];

    if (countdown > 0) {
      // hold cars on the grid, beep each step
      const step = Math.ceil(countdown - 0.5);
      if (step !== countdownStep) {
        countdownStep = step;
        if (step > 0) AMSound.countdownBeep(false);
        else AMSound.countdownBeep(true);
      }
      countdown -= dt;
      if (countdown <= 0) {
        startTime = now;
        cars.forEach(c => c.lapStart = now);
      }
      drawTrack(track);
      cars.forEach(drawCar);
      drawCountdown();
      AMSound.setEngine(0.12 + 0.05 * Math.sin(now / 120), 0.3); // idle blip on grid
      animId = requestAnimationFrame(loop);
      return;
    }

    cars.forEach(c => updateCar(c, track, now));
    collisions();

    drawTrack(track);
    cars.slice().sort((a, b) => (a.isPlayer ? 1 : 0) - (b.isPlayer ? 1 : 0)).forEach(drawCar);

    const player = cars[0];
    document.getElementById('hudLap').textContent = Math.min(player.lap, LAPS) + '/' + LAPS;
    document.getElementById('hudPos').textContent = 'P' + positionOf(player, track);
    document.getElementById('hudTime').textContent = fmt(now - startTime);
    document.getElementById('hudBest').textContent = player.bestLap ? fmt(player.bestLap) : '–';

    if (!player.finished) {
      const rpm = Math.abs(player.speed) / player.maxSpeed;
      const load = (keys['arrowup'] || keys['w']) ? 1 : 0;
      AMSound.setEngine(rpm, load);
    }

    if (raceEnded) {
      ctx.fillStyle = 'rgba(5,6,5,0.35)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e3d3a6';
      ctx.font = '400 54px Marcellus, serif';
      ctx.fillText('Chequered Flag', W / 2, H / 2);
    }

    animId = requestAnimationFrame(loop);
  }
})();
