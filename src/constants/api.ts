export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// /* build-ref:delta */
export const API_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY ?? '',
  language: process.env.EXPO_PUBLIC_TMDB_LANGUAGE ?? 'en-US',
  region: process.env.EXPO_PUBLIC_TMDB_REGION ?? 'IN',
  pageSize: 20,
};

export const POSTER_SIZE = 'w342';
export const BACKDROP_SIZE = 'w780';
export const PROFILE_SIZE = 'w185';
