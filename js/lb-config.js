// ===== LEADERBOARD BACKEND CONFIG =====
// Leave as null → leaderboard is stored on each player's device only.
//
// To make it GLOBAL (shared by everyone who plays your site):
//   1. Go to https://console.firebase.google.com → Add project (any name, no Analytics needed)
//   2. Build → Firestore Database → Create database → Start in production mode
//   3. Rules tab → paste the rules from FIREBASE_SETUP.md → Publish
//   4. Project settings (gear) → General → Your apps → Web app (</>) → Register
//   5. Copy apiKey + projectId from the config it shows, fill them in below.
//
// The apiKey is safe to publish — it only identifies the project; the
// Firestore rules are what protect the data.

//window.LEADERBOARD_CONFIG = null;

// Example (replace with yours and uncomment):
window.LEADERBOARD_CONFIG = {
  projectId: "aston-fansite",
  apiKey: "AIzaSyDmvgCxf6uMsfRRe5YW59AqdngFBGV569I"
};
