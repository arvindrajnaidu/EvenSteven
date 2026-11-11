# Even Steven

The Ledger Tilt game from `game.html`, packaged as an offline iOS app with Capacitor 8, following the iOS setup in `../lbw`.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3012. The development server builds the game when it starts. Restart it after editing `game.html`.

## iOS

```sh
npm run ios
```

This builds the web assets, syncs the included iOS project, and opens Xcode. Select your signing team and an iPhone or simulator, then Run. The app uses bundle identifier `com.buzzie.evensteven` and display name `Even Steven`. The in-game title remains Ledger Tilt.

Use `npm run cap:sync` to rebuild and sync after changing the game. You can also open `ios/App/App.xcodeproj` directly after syncing.

`npm run build` creates `out/` with local copies of Three.js, Cannon.js and the game fonts. Gameplay requires no network connection. Edit `game.html` as the source, with build and dependency configuration in `scripts/build.mjs` and `package.json`.
