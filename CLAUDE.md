# Aston Martin Fan Site — Project Notes

Unofficial Aston Martin fan site + race simulator. Static HTML/CSS/JS, no build step.

## Deployment (LIVE)

- **Live site:** https://arryn21.github.io/aston-martin-fansite/
- **Repo:** https://github.com/Arryn21/aston-martin-fansite (user = Arryn21, gh CLI authenticated)
- Deploy = commit → `git push` → GitHub Pages rebuilds from `main` / root in ~1–10 min
- **Cache-busting:** every CSS/JS reference in the HTML carries `?v=N`. **Bump N in all HTML files on every push** (use a Node one-liner; see gotchas below). Currently `?v=5`.

## Architecture

- All content lives in `js/data.js`: `CARS` (31 cars), `FACTS`, `QUIZ`, `TIMELINE`, `TECH`, `MOVIES`, `PRICING` + `BUY_LINKS`. Add content there; pages render from it.
- `js/ui.js` — `AMUI.photo(el, carId)` sets background image with fallback; `AMUI.reveal()` scroll animations.
- `js/sound.js` — Web Audio synthesized engine sound, profile chosen from the car's `engine` string (V12/V8/six/four/F1). No audio files.
- `js/game.js` — top-down canvas racer: 6 tracks (silverstone, monaco, oval, lemans, alpine, gp), 3 AI rivals matched to player car pace, 3 laps, countdown, robust lap detection (waypoint radius `track.width*1.15` + one-waypoint skip), auto-finish with results panel, track preview mini-map, scroll-to-top on start.
- `js/leaderboard.js` — dual backend: Firestore REST when `window.LEADERBOARD_CONFIG` set (it is), localStorage fallback. One collection per track (`scores_<track>`) to avoid composite indexes. Top 15 shown in sticky right sidebar on game page.
- `js/lb-config.js` — **live Firebase config** (project `aston-fansite`, user's account). apiKey is public by design; Firestore rules are the security (read + validated create only, no update/delete). Rules in `FIREBASE_SETUP.md`.
- `img/<carId>.jpg` — 31 car photos from Wikipedia. `img/wings.svg` — genuine 1935 Aston wings badge (public domain), used as CSS mask tinted champagne (`.wings-logo` in CSS). Modern wings logo is trademarked — deliberately NOT used.
- Design: Marcellus/Cormorant Garamond/Jost (Google Fonts), near-black + racing green + champagne gold. **User taste: posh/luxury, NO emojis, real photos, animations, sound.**

## Gotchas (learned the hard way)

- **PowerShell 5.1 `Set-Content`/`Get-Content` corrupts UTF-8** in these files (mojibake: `â€”`). Do bulk text edits with Node scripts only.
- **Wikimedia rate-limits (429) this IP quickly.** Use 800px thumb URLs, 1.5s+ gaps, retry after ~2 min cooldown, custom User-Agent.
- astonmartin.com URLs: Vantage page is `/en-us/models/vantage-coupe`; Q division is `/en/q-by-aston-martin`.
- Firestore test doc lives in `scores_test` collection (harmless; deletable in Firebase console).

## Session log

- **2026-07-08:** Built entire site (8 pages), posh redesign, 31 car photos, prices + buying links, 6-track racer with sound + global leaderboard, deployed to GitHub Pages, real 1935 wings badge. Last commit `e24e38a`.

## Backlog / ideas

- More cars toward full catalog (~80 models); expand quiz/facts pools
- New-track physics (lemans/alpine/gp) are hand-plotted and untested — reshape waypoints if a corner drives badly
- Possible: 3D game upgrade, mobile touch controls for the racer, per-car lap-record boards, og:image/meta tags for link sharing, favicon
- Housekeeping: delete `scores_test` from Firestore console; consider HTTP-referrer restriction on the Firebase API key (Google Cloud console → Credentials)
