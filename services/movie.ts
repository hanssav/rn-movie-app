import { apiService } from '@/lib/api';
import {
  AccountStateResponse,
  AddFavoriteBodyParams,
  AddFavoriteResponse,
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
  accountState: async (movie_id: number): Promise<AccountStateResponse> => {
    const response = await apiService.get<AccountStateResponse>(
      `movie/${movie_id}/account_states`
    );
    return response;
  },
  addFavorite: async (
    account_id: number,
    body: AddFavoriteBodyParams
  ): Promise<AddFavoriteResponse> => {
    const response = await apiService.post<AddFavoriteResponse>(
      `/account/${account_id}/favorite`,
      body
    );
    return response;
  },
  allFavorite: async () => {},
};
