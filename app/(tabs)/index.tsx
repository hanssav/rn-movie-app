import MovieCard from '@/components/screen/movie-card';
import PopularCarousel from '@/components/screen/popular-card';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading';
import { Text } from '@/components/ui/text';
import { useInfiniteDiscoverMovies } from '@/hooks';
import { icons } from '@/lib/constants/icons';
import { images } from '@/lib/constants/images';
import { Search } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, ImageBackground, View } from 'react-native';

const Screen = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteDiscoverMovies({
    sort_by: 'popularity.desc',
    language: 'en-US',
  });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  console.log('Movies Count:', movies.length);

  const renderHeader = () => (
    <>
      <View className="flex min-h-80 items-center justify-center gap-12 px-4">
        <Image source={icons.logo} className="h-10 w-12" />

        <Input
          placeholder="Search through 300+ movies online"
          iconLeft={<Search size={20} color="#AB8BFF" />}
        />
      </View>

      <View className="mt-5">
        <View className="mb-5 mt-5">
          <Text className="mb-3 text-lg font-bold text-white">Popular Now</Text>
          <PopularCarousel movies={movies} />
        </View>

        <Text className="mb-3 text-lg font-bold text-white">Latest Movies</Text>
      </View>
    </>
  );

  if (isLoading) {
    return (
      <ImageBackground source={images.bg} className="flex-1" resizeMode="cover">
        <View className="flex-1 items-center justify-center">
          <LoadingSpinner />
        </View>
      </ImageBackground>
    );
  }

  if (isError) {
    return (
      <ImageBackground source={images.bg} className="flex-1" resizeMode="cover">
        <View className="flex-1 items-center justify-center px-5">
          <Text variant={'error'}>Error: {error.message}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={images.bg} className="flex-1" resizeMode="cover">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <LoadingSpinner />
            </View>
          ) : null
        }
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
    </ImageBackground>
  );
};

export default Screen;
