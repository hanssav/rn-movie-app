import { FlatList, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { useAllFavorite, useAddFavorite } from '@/hooks';
import { AllFavoriteQueryParams } from '@/types';
import { Heart, ChevronDown } from 'lucide-react-native';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FavoriteCard, QueryState } from '@/components/screen';
import { cn } from '@/lib/utils';

const Favorite = () => {
  const [params, setParams] = React.useState<
    Omit<AllFavoriteQueryParams, 'page'>
  >({
    sort_by: 'created_at.desc',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useAllFavorite(params);

  const favorites = data?.pages.flatMap((page) => page.results) ?? [];

  const [removingId, setRemovingId] = React.useState<number | null>(null);

  const { mutate: removeFavorite } = useAddFavorite();

  const handleRemoveFavorite = (movieId: number) => {
    setRemovingId(movieId);
    removeFavorite(
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: false,
      },
      {
        onSettled: () => {
          setRemovingId(null);
        },
      }
    );
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const sortOptions: {
    label: string;
    value: AllFavoriteQueryParams['sort_by'];
  }[] = [
    { label: 'Recently Added', value: 'created_at.desc' },
    { label: 'Oldest First', value: 'created_at.asc' },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === params.sort_by)?.label || 'Sort By';

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading || error) return null;
    return (
      <View className="flex-1 items-center justify-center px-5 py-20">
        <View className="mb-6 items-center justify-center rounded-full bg-accent/10 p-8">
          <Heart size={72} color="#AB8BFF" strokeWidth={1.5} />
        </View>
        <Text className="text-center text-2xl font-black text-white">
          No Favorites Yet
        </Text>
        <Text className="mt-3 max-w-[280px] text-center text-sm leading-6 text-light-200">
          Start exploring and add movies to your favorites to see them here
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        className="px-5"
        keyExtractor={(item) => item.id.toString()}
        data={favorites}
        contentContainerClassName="py-[100px]"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-6">
            <Text variant="title" className="text-3xl font-black text-white">
              Favorite Movies
            </Text>
            <QueryState loading={isLoading} error={error?.message}>
              <Text className="mb-6 mt-2 text-sm text-light-200">
                {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}{' '}
                in your collection
              </Text>
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-light-200">
                  Sort & Filter
                </Text>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'flex-row items-center gap-2 rounded-xl px-4 py-2.5',
                        'border-accent/30 bg-accent/10'
                      )}>
                      <Text className="text-sm font-semibold text-accent">
                        {currentSortLabel}
                      </Text>
                      <ChevronDown size={16} color="#AB8BFF" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 border-accent/20 bg-dark-100">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onPress={() => setParams({ sort_by: option.value })}
                        className={cn(
                          `py-3`,
                          params.sort_by === option.value && 'bg-accent/20'
                        )}>
                        <Text
                          className={cn(
                            'text-sm',
                            params.sort_by === option.value
                              ? 'font-semibold text-accent'
                              : 'text-white'
                          )}>
                          {option.label}
                        </Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </View>
            </QueryState>
          </View>
        }
        renderItem={({ item }) => (
          <FavoriteCard
            movie={item}
            onRemoveFavorite={handleRemoveFavorite}
            removingId={removingId}
          />
        )}
      />
    </View>
  );
};

export default Favorite;
