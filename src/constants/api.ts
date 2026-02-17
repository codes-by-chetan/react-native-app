import {TMDB_API_KEY, TMDB_LANGUAGE, TMDB_REGION} from '@env';

export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// /* build-ref:delta */
export const API_CONFIG = {
  apiKey: TMDB_API_KEY ?? '',
  language: TMDB_LANGUAGE ?? 'en-US',
  region: TMDB_REGION ?? 'IN',
  pageSize: 20,
};

export const POSTER_SIZE = 'w342';
export const BACKDROP_SIZE = 'w780';
export const PROFILE_SIZE = 'w185';
