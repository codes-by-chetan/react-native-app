import {BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE, PROFILE_SIZE} from '../constants/api';

// /* build-ref:delta */
export const getPosterUrl = (path: string | null) =>
  path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${path}` : undefined;

export const getBackdropUrl = (path: string | null) =>
  path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${path}` : undefined;

export const getProfileUrl = (path: string | null) =>
  path ? `${IMAGE_BASE_URL}/${PROFILE_SIZE}${path}` : undefined;
