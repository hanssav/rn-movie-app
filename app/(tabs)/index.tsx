import React from 'react';
import { MovieCard, QueryState, PopularCarousel } from '@/components/screen';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading';
import { Text } from '@/components/ui/text';
import { useDiscoverMovies, useInfiniteDiscoverMovies } from '@/hooks';
import { icons } from '@/lib/constants/icons';
import { images } from '@/lib/constants/images';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { FlatList, Image, View } from 'react-native';

const Screen = () => {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteDiscoverMovies({
    sort_by: 'vote_average.desc',
    language: 'en-US',
  });
  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const {
    data: popularMovies,
    isLoading: isPopularLoading,
    error: errorPopular,
  } = useDiscoverMovies({
    language: 'en-US',
    sort_by: 'popularity.desc',
    page: 1,
  });
  const popular = popularMovies?.results || [];

  const renderHeader = () => (
    <>
      {/* EXAMPLE CUSTOM VARIABLES WITH MORE THAN ONE VALUE CSS .flex-items-justify-center : check in global.css for how to setting this variable   */}
      <View className="flex-all-center min-h-72 w-full gap-12">
        <Image source={icons.logo} className="h-10 w-12" />

        <Input
          placeholder="Search through 300+ movies online"
          iconLeft={<Search size={20} color="#AB8BFF" />}
          onPressIn={() => router.push('/(tabs)/search')}
        />
      </View>
      <QueryState
        loading={isLoading || isPopularLoading}
        error={error?.message || errorPopular?.message}>
        <View className="mt-5">
          <View className="mb-5 mt-5">
            <Text variant={'title'}>Popular Now</Text>
            <PopularCarousel movies={popular} />
          </View>

          <Text variant={'title'}>Latest Movies</Text>
        </View>
      </QueryState>
    </>
  );

  return (
    <>
      <Image
        source={images.bg}
        className="absolute z-0 w-full flex-1"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={isFetchingNextPage ? <LoadingSpinner /> : null}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default Screen;
