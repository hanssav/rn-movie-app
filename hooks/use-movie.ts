import { account_id } from '@/lib/api';
import { movieService } from '@/services';
import {
  AddFavoriteBodyParams,
  AddFavoriteResponse,
  AllFavoriteQueryParams,
  DiscoverMovieParams,
  DiscoverResponse,
  GetMovieDetailParams,
  MovieDetailResult,
  SearchMovieParams,
} from '@/types';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

const accountId = account_id;

export const movieKeys = {
  discover: (params: DiscoverMovieParams) =>
    ['movies', 'discover', params] as const,
  id: (movie_id: number) => ['movies', movie_id] as const,
  search: (params: SearchMovieParams) => ['movies', 'search', params] as const,
  account_state: (movie_id: number) => ['account_state', movie_id] as const,
  all_favorite: (params?: Omit<AllFavoriteQueryParams, 'page'>) =>
    ['all_favorite', accountId, params] as const,
};

export const useDiscoverMovies = (
  params: DiscoverMovieParams,
  options?: Omit<UseQueryOptions<DiscoverResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<DiscoverResponse>({
    queryKey: movieKeys.discover(params),
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

export const useMovieId = (params: GetMovieDetailParams) => {
  return useQuery<MovieDetailResult>({
    queryKey: movieKeys.id(params.movie_id),
    queryFn: () => movieService.getId(params),
    staleTime: 60_000,
  });
};

export const useSearchMovie = (params: Omit<SearchMovieParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: movieKeys.search(params),
    queryFn: ({ pageParam = 1 }) =>
      movieService.seerch({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

type MutationContext = {
  previousMovie: unknown;
  body: AddFavoriteBodyParams;
};

export const useAddFavorite = () => {
  return useMutation<
    AddFavoriteResponse,
    Error,
    AddFavoriteBodyParams,
    MutationContext
  >({
    mutationFn: (body) => movieService.addFavorite(accountId, body),

    // When mutate is called:
    onMutate: async (body, context) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({
        queryKey: ['movies', body.media_id],
      });

      // Snapshot the previous value
      const previousMovie = context.client.getQueryData([
        'movies',
        body.media_id,
      ]);

      // Optimistically update to the new value
      context.client.setQueryData(['movies', body.media_id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isFavorite: body.favorite,
        };
      });

      // Return a result with the previous movie and body
      return { previousMovie, body };
    },

    // If the mutation fails, use the result we returned above
    onError: (err, body, onMutateResult, context) => {
      if (onMutateResult) {
        context.client.setQueryData(
          ['movies', onMutateResult.body.media_id],
          onMutateResult.previousMovie
        );
      }
    },

    // Always refetch after error or success:
    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: movieKeys.id(variables.media_id),
      });

      context.client.invalidateQueries({
        queryKey: movieKeys.account_state(variables.media_id),
      });

      context.client.invalidateQueries({
        queryKey: ['all_favorite'],
        exact: false, //invalidate all prefix
      });

      // We can use it too, but it's just for both sort

      // context.client.invalidateQueries({
      //   queryKey: movieKeys.all_favorite({ sort_by: 'created_at.asc' }),
      // });

      // context.client.invalidateQueries({
      //   queryKey: movieKeys.all_favorite({ sort_by: 'created_at.desc' }),
      // });
    },
  });
};

export const useAllFavorite = (
  params?: Omit<AllFavoriteQueryParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: movieKeys.all_favorite(params),

    queryFn: ({ pageParam = 1 }) =>
      movieService.allFavorite(accountId, { ...params, page: pageParam }),

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
