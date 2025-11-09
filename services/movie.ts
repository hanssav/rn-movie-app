import { apiService } from '@/lib/api';
import {
  AccountDetailsPathParams,
  AccountDetailsQueryParams,
  AccountDetailsResponse,
  AccountStateResponse,
  AddFavoriteBodyParams,
  AddFavoriteResponse,
  AllFavoriteMovieResponse,
  AllFavoriteParams,
  AllFavoriteQueryParams,
  DiscoverMovieParams,
  DiscoverResponse,
  GetMovieDetailParams,
  MovieDetailResult,
  MovieVideosResponse,
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
  getVideo: async (movie_id: number): Promise<MovieVideosResponse> => {
    const response = await apiService.get<MovieVideosResponse>(
      `/movie/${movie_id}/videos`
    );
    return response;
  },
  allFavorite: async (
    account_id: AllFavoriteParams['account_id'],
    params: AllFavoriteQueryParams
  ): Promise<AllFavoriteMovieResponse> => {
    const response = await apiService.get<AllFavoriteMovieResponse>(
      `/account/${account_id}/favorite/movies`,
      { params }
    );
    return response;
  },
  accountDetail: async (
    account_id: AccountDetailsPathParams['account_id'],
    params?: AccountDetailsQueryParams
  ): Promise<AccountDetailsResponse> => {
    const response = await apiService.get<AccountDetailsResponse>(
      `/account/${account_id}`,
      { params }
    );
    return response;
  },
};
