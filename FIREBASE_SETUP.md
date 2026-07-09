# Global Leaderboard Setup (Firebase, free ~5 minutes)

Without this, the leaderboard still works but scores stay on each player's own device.
With it, everyone who plays your site shares one global top-15 per track.

## Steps

1. Go to https://console.firebase.google.com and sign in with any Google account.
2. **Add project** → name it anything (e.g. `aston-fansite`) → Analytics not needed → Create.
3. Left menu: **Build → Firestore Database → Create database** → choose a location → **Start in production mode**.
4. Open the **Rules** tab, replace everything with the rules below, press **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{col}/{doc} {
      allow read: if col.matches('scores_.*');
      allow create: if col.matches('scores_.*')
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0
        && request.resource.data.name.size() <= 20
        && request.resource.data.car is string
        && request.resource.data.car.size() <= 60
        && request.resource.data.timeMs is int
        && request.resource.data.timeMs > 20000
        && request.resource.data.timeMs < 3600000;
      allow update, delete: if false;
    }
  }
}
```

   (Anyone may read scores and add a plausible score; nobody can edit or delete existing ones.)

5. Project overview → gear icon → **Project settings** → scroll to **Your apps** →
   click the web icon **`</>`** → register app (any nickname, no hosting) →
   copy the `apiKey` and `projectId` values from the config shown.

6. Open `js/lb-config.js` in this folder and replace the `null` line:

```js
window.LEADERBOARD_CONFIG = {
  projectId: "your-project-id",
  apiKey: "AIzaSy...your-key..."
};
```

7. Save, commit, push. Done — the game page now reads/writes the shared board.

## Notes

- The `apiKey` is **safe to publish** in a public repo. It only identifies the project;
  the Firestore rules above are the actual security.
- Free tier limits (50k reads / 20k writes per day) are far beyond what a fan site needs.
- Scores live in collections named `scores_silverstone`, `scores_monaco`, `scores_oval`,
  `scores_lemans`, `scores_alpine`, `scores_gp`. You can delete junk entries any time in
  the Firestore console (Data tab).
