// ===== LEADERBOARD =====
// Two backends behind one API:
//   - Firestore REST (global, shared) when window.LEADERBOARD_CONFIG is set
//   - localStorage (this device only) otherwise
// One collection per track (scores_<track>) so no composite index is needed.
const LB = (function () {
  const cfg = window.LEADERBOARD_CONFIG;
  const remote = !!(cfg && cfg.projectId && cfg.apiKey);
  const TOP_N = 15;

  function fsUrl(path) {
    return 'https://firestore.googleapis.com/v1/projects/' + cfg.projectId +
      '/databases/(default)/documents' + path + '?key=' + cfg.apiKey;
  }

  // ---- remote (Firestore REST) ----
  async function remoteTop(track) {
    const body = {
      structuredQuery: {
        from: [{ collectionId: 'scores_' + track }],
        orderBy: [{ field: { fieldPath: 'timeMs' }, direction: 'ASCENDING' }],
        limit: TOP_N
      }
    };
    const r = await fetch(fsUrl(':runQuery'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error('leaderboard fetch failed: ' + r.status);
    const rows = await r.json();
    return rows.filter(x => x.document).map(x => {
      const f = x.document.fields;
      return {
        name: f.name ? f.name.stringValue : '—',
        car: f.car ? f.car.stringValue : '',
        timeMs: f.timeMs ? Number(f.timeMs.integerValue) : 0,
        bestLapMs: f.bestLapMs ? Number(f.bestLapMs.integerValue) : null
      };
    });
  }

  async function remoteSubmit(track, entry) {
    const body = {
      fields: {
        name: { stringValue: entry.name },
        car: { stringValue: entry.car },
        timeMs: { integerValue: String(entry.timeMs) },
        bestLapMs: { integerValue: String(entry.bestLapMs || 0) },
        date: { stringValue: new Date().toISOString().slice(0, 10) }
      }
    };
    const r = await fetch(fsUrl('/scores_' + track), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error('leaderboard submit failed: ' + r.status);
  }

  // ---- local (this device) ----
  function localKey(track) { return 'am-lb-' + track; }
  function localTop(track) {
    try {
      const all = JSON.parse(localStorage.getItem(localKey(track)) || '[]');
      return all.sort((a, b) => a.timeMs - b.timeMs).slice(0, TOP_N);
    } catch (_) { return []; }
  }
  function localSubmit(track, entry) {
    const all = localTop(track);
    all.push(entry);
    all.sort((a, b) => a.timeMs - b.timeMs);
    localStorage.setItem(localKey(track), JSON.stringify(all.slice(0, 50)));
  }

  // ---- public API ----
  function cleanName(raw) {
    return String(raw || '').replace(/[<>&"']/g, '').trim().slice(0, 20) || 'Anonymous';
  }

  async function getTop(track) {
    if (remote) { try { return await remoteTop(track); } catch (e) { console.warn(e); return localTop(track); } }
    return localTop(track);
  }

  async function submit(track, entry) {
    entry.name = cleanName(entry.name);
    if (remote) {
      try { await remoteSubmit(track, entry); return true; }
      catch (e) { console.warn(e); localSubmit(track, entry); return false; }
    }
    localSubmit(track, entry);
    return true;
  }

  return { getTop, submit, cleanName, isGlobal: remote, TOP_N };
})();
