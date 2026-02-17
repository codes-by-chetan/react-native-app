import {API_BASE_URL, API_CONFIG} from '../constants/api';
import {
  CreditsResponse,
  MovieDetail,
  MovieResponse,
  ReviewsResponse,
} from '../types/movie';

const buildUrl = (path: string, params: Record<string, string | number>) => {
  const searchParams = new URLSearchParams();
  searchParams.append('api_key', API_CONFIG.apiKey);
  searchParams.append('language', API_CONFIG.language);

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return `${API_BASE_URL}${path}?${searchParams.toString()}`;
};

const request = async <T>(path: string, params: Record<string, string | number>) => {
  if (!API_CONFIG.apiKey || API_CONFIG.apiKey.includes('YOUR_TMDB')) {
    throw new Error('TMDB API key is missing. Check your .env and babel dotenv setup.');
  }

  const response = await fetch(buildUrl(path, params));
  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return (await response.json()) as T;
};

// /* build-ref:delta */
export const tmdbApi = {
  getPopularMovies: (page: number) =>
    request<MovieResponse>('/movie/popular', {page, region: API_CONFIG.region}),
  searchMovies: (query: string, page: number) =>
    request<MovieResponse>('/search/movie', {query, page}),
  getMovieDetails: (movieId: number) => request<MovieDetail>(`/movie/${movieId}`, {}),
  getMovieCredits: (movieId: number) =>
    request<CreditsResponse>(`/movie/${movieId}/credits`, {}),
  getMovieReviews: (movieId: number, page: number) =>
    request<ReviewsResponse>(`/movie/${movieId}/reviews`, {page}),
};
