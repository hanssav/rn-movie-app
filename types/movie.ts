// DISCOVER RESPONSE

export type DiscoverResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type DiscoverResponse = {
  page: number;
  results: DiscoverResult[];
  total_pages: number;
  total_results: number;
};

// DISCOVER PARAMS

export type DiscoverMovieParams = {
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;

  certification_country?: string;

  include_adult?: boolean; // default false
  include_video?: boolean; // default false

  language?: string; // default en-US
  page?: number; // default 1

  primary_release_year?: number;
  'primary_release_date.gte'?: string; // YYYY-MM-DD
  'primary_release_date.lte'?: string; // YYYY-MM-DD

  region?: string;

  'release_date.gte'?: string; // YYYY-MM-DD
  'release_date.lte'?: string; // YYYY-MM-DD

  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'original_title.asc'
    | 'original_title.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';

  'vote_average.gte'?: number;
  'vote_average.lte'?: number;

  'vote_count.gte'?: number;
  'vote_count.lte'?: number;

  watch_region?: string;

  with_cast?: string; // comma OR pipe separated
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;

  with_release_type?: number; // values 1-6
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;

  with_watch_monetization_types?: 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';

  with_watch_providers?: string;

  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;

  year?: number;
};

// DETAIL

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

// Extend your base DiscoverResult
export type MovieDetailResult = DiscoverResult & {
  belongs_to_collection: null | unknown;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string | null;
  origin_country?: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  revenue: number;
};

export type GetMovieDetailParams = {
  /** The TMDB movie ID (path param) */
  movie_id: number;

  /** Optional query params */
  query?: {
    /** Comma-separated list of additional endpoints to include (max 20) */
    append_to_response?: string;

    /** Language code, defaults to "en-US" */
    language?: string;
  };
};

// SEARCH MOVIE TYPE

// ✅ Reuse existing Discover types
export type SearchMovieResult = DiscoverResult;
export type SearchMovieResponse = DiscoverResponse;

// ✅ Search movie params
export type SearchMovieParams = {
  query: string; // required
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
};

// ADD FAVORITE

export type AddFavoriteBodyParams = {
  media_type: string;
  media_id: number;
  favorite: boolean;
};

export type AddFavoriteathParams = {
  account_id: number; // required
};

export type AddFavoriteQueryParams = {
  session_id?: string;
};

export type AddFavoriteResponse = {
  status_code: number;
  status_message: string;
};

// ACCOUNT_STATE FOR CHECK IS FAVORITE

export type AccountStateResponse = {
  id: number;
  favorite: boolean;
  rated: boolean | { value: number };
  watchlist: boolean;
};

// Get All Favorit

export type AllFavoriteParams = {
  account_id: number;
};

export type AllFavoriteQueryParams = {
  language?: string; // default en-US
  page?: number; // default 1
  session_id?: string; // required
  sort_by?: 'created_at.asc' | 'created_at.desc';
};

export type AllFavoriteMovieResult = DiscoverResult;

export type AllFavoriteMovieResponse = DiscoverResponse;

// ACCOUNT DETAILS

export type AccountDetailsPathParams = {
  account_id: number;
};

export type AccountDetailsQueryParams = {
  session_id: string;
};

export type AccountDetailsResponse = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

// VIDEOS
export type MovieVideosResponse = {
  id: number;
  results: MovieVideo[];
};

export type MovieVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string; // YouTube, Vimeo, etc
  size: number; // 360/720/1080
  type: string; // Trailer, Teaser, Clip
  official: boolean;
  published_at: string;
  id: string;
};
