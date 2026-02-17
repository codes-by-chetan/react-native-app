# Expo Movie Discovery App

An Expo-based React Native application that integrates with TMDB and includes:

- Popular movies list with infinite scrolling and pull-to-refresh
- Search with 300ms debouncing and paginated results
- Movie details screen with composed API calls (details + cast + reviews)
- Reviews pagination
- Bonus image attachment flow using Expo document picker

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template:

   ```bash
   cp .env.example .env
   ```

3. Add your TMDB v3 API key in `.env` using `EXPO_PUBLIC_*` vars.

4. Start Expo:

   ```bash
   npm run start
   ```

5. Run on device/emulator:

   ```bash
   npm run android
   # or
   npm run ios
   # or
   npm run web
   ```

## Notes

- API constants and endpoint handling are in `src/constants/api.ts` and `src/services/tmdb.ts`.
- API key is expected via Expo public environment variables.
- FlatList performance flags are applied on listing screens for large datasets.

<!-- build-ref:delta -->
