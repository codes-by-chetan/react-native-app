# React Native Movie Discovery App

A React Native CLI application that integrates with TMDB and includes:

- Popular movies list with infinite scrolling and pull-to-refresh
- Search with 300ms debouncing and paginated results
- Movie details screen with composed API calls (details + cast + reviews)
- Reviews pagination
- Bonus image attachment flow using document picker

## Setup

1. Install dependencies (this also restores required native binary assets locally via `postinstall`):

   ```bash
   npm install
   ```

2. Copy environment template:

   ```bash
   cp .env.example .env
   ```

3. Add your TMDB v3 API key in `.env`.

4. Start Metro:

   ```bash
   npm run start
   ```

5. Run on device/emulator:

   ```bash
   npm run android
   # or
   npm run ios
   ```

## Troubleshooting

### `error Android project not found`
This happens when the `android/` native folder is missing. This repository now includes the native Android project under `android/`, so make sure you are running commands from the project root.

### `error No Metro config found`
This happens when `metro.config.js` is missing. This repository now includes a valid `metro.config.js` in the root.


### `Binary files are not supported` while opening/creating PR
Some Git hosting UIs reject PRs containing binary blobs (for example launcher PNGs, debug keystore, or Gradle wrapper JAR).

This repository now keeps those files **out of Git** and restores them automatically after `npm install` using:

```bash
npm run postinstall
```

If needed manually, run:

```bash
node scripts/restore-binary-assets.js
```

### npm deprecation warnings
Warnings like `deprecated inflight`, `deprecated rimraf`, or `@types/react-native` are transitive dependency warnings from upstream packages and do not block install if npm exits successfully.

### Android build prerequisites (Windows)
`npm run android` requires Android SDK + Java configured:

- `ANDROID_HOME` set (usually `C:\Users\<you>\AppData\Local\Android\Sdk`)
- `JAVA_HOME` set (JDK 17 recommended)
- `%ANDROID_HOME%\platform-tools` added to `PATH`

Run diagnostics:

```bash
npx react-native doctor
```

## Notes

- API constants and endpoint handling are located in `src/constants/api.ts` and `src/services/tmdb.ts`.
- API key is expected through environment configuration (never commit `.env`).
- FlatList performance flags are applied on listing screens for large datasets.

<!-- build-ref:delta -->
