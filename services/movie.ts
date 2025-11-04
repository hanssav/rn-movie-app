import { apiService } from '@/lib/api';
import {
  DiscoverMovieParams,
  DiscoverResponse,
  GetMovieDetailParams,
  MovieDetailResult,
  SearchMovieParams,
  SearchMovieResponse,
} from '@/types';

export const movieService = {
  discover: async (params: DiscoverMovieParams): Promise<DiscoverResponse> => {
    const response = await apiService.get<DiscoverResponse>('/discover/movie', {
      params,
    });
    return response;
  },
  getId: async (params: GetMovieDetailParams): Promise<MovieDetailResult> => {
    const response = await apiService.get<MovieDetailResult>(
      `/movie/${params.movie_id}`
    );
    return response;
  },
  seerch: async (params: SearchMovieParams): Promise<SearchMovieResponse> => {
    const response = await apiService.get<SearchMovieResponse>(
      '/search/movie',
      { params }
    );

    return response;
  },
};
