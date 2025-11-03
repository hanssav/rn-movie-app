import { apiService } from '@/lib/api';
import { DiscoverMovieParams, DiscoverResponse } from '@/types';

export const movieService = {
  discover: async (params: DiscoverMovieParams): Promise<DiscoverResponse> => {
    const response = await apiService.get<DiscoverResponse>('/discover/movie', {
      params,
    });
    return response;
  },
};
