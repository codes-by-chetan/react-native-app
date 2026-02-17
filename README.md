# React Native Movie Discovery App

A React Native CLI application that integrates with TMDB and includes:

- Popular movies list with infinite scrolling and pull-to-refresh
- Search with 300ms debouncing and paginated results
- Movie details screen with composed API calls (details + cast + reviews)
- Reviews pagination
- Bonus image attachment flow using document picker

## Setup

1. Install dependencies:

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

## Notes

- API constants and endpoint handling are located in `src/constants/api.ts` and `src/services/tmdb.ts`.
- API key is expected through environment configuration (never commit `.env`).
- FlatList performance flags are applied on listing screens for large datasets.

<!-- build-ref:delta -->
