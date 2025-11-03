import { movieService } from '@/services';
import { DiscoverMovieParams, DiscoverResponse } from '@/types';
import {
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useDiscoverMovies = (
  params: DiscoverMovieParams,
  options?: Omit<UseQueryOptions<DiscoverResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<DiscoverResponse>({
    queryKey: ['movies', 'discover', params],
    queryFn: () => movieService.discover(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

export const useInfiniteDiscoverMovies = (
  params: Omit<DiscoverMovieParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'discover', 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      movieService.discover({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
