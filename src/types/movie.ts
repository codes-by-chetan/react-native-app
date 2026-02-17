export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  total_pages: number;
  results: Movie[];
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = Movie & {
  runtime: number | null;
  genres: Genre[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CreditsResponse = {
  cast: CastMember[];
};

export type Review = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

// /* build-ref:delta */
export type ReviewsResponse = {
  page: number;
  total_pages: number;
  results: Review[];
};
