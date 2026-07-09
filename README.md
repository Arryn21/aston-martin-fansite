# Aston Martin — Power, Beauty, Soul

An unofficial Aston Martin fan site: 31 legendary cars with full histories, specs,
prices and buying links; the complete Bond filmography; a century-long timeline;
tech deep dives; a daily fact and quiz; and a top-down race simulator with
synthesized engine audio and a leaderboard.

**Static site — no build step.** Open `index.html`, or serve the folder from any
static host (GitHub Pages works as-is).

## Pages

| Page | What it is |
|---|---|
| `index.html` | Daily Aston fact + car of the day (rotates by date) |
| `cars.html` | The Garage: 31 cars, filterable, full detail modals with prices & buying links |
| `history.html` | Five eras, horizontally scrolling photo cards |
| `movies.html` | Every screen Aston, Goldfinger → No Time to Die |
| `tech.html` | Engineering deep dives |
| `quiz.html` | 10 random questions/round, best score saved locally |
| `news.html` | Live headlines (Google News RSS) + curated sources |
| `game.html` | Race simulator: 6 tracks, 3 AI rivals, engine sound per car, top-15 leaderboard |

## Race simulator

Arrow keys / WASD. Three laps against three AI rivals matched to your car's pace.
Car stats (speed / acceleration / handling) map from the real cars' figures.
Engine audio is synthesized in the browser per engine type — V8 rumble, V12 wail,
vintage six, F1 turbo-hybrid — no audio files.

## Leaderboard

Works out of the box using localStorage (per-device). To make it **global** —
shared by everyone who visits your deployed site — follow `FIREBASE_SETUP.md`
(free Firebase Firestore backend, ~5 minutes) and fill in `js/lb-config.js`.
Players just enter a name after finishing; no accounts.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo → Settings → Pages → Source: **Deploy from a branch** → branch `main`, folder `/ (root)` → Save.
3. Site appears at `https://<username>.github.io/<repo>/` within a minute or two.

## Content & credits

All car data lives in `js/data.js` — add a car, fact, quiz question or movie there
and every page picks it up. Car photographs are sourced from Wikipedia /
Wikimedia Commons and remain under their respective Creative Commons licenses;
see the source articles for attribution. This is a fan project with no affiliation
to Aston Martin Lagonda Ltd.
