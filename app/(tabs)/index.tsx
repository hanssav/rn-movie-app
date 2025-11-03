import MovieCard from '@/components/screen/movie-card';
import { Input } from '@/components/ui/input';
import { useInfiniteDiscoverMovies } from '@/hooks';
import { icons } from '@/lib/constants/icons';
import { images } from '@/lib/constants/images';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  View,
} from 'react-native';

const Screen = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteDiscoverMovies({
      sort_by: 'popularity.desc',
      language: 'en-US',
    });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground source={images.bg} className="flex-1" resizeMode="cover">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
          rowGap: 12,
        }}
        showsVerticalScrollIndicator={false}
        // Header dengan logo
        ListHeaderComponent={
          <View className="flex min-h-80 items-center justify-center gap-12 px-4">
            <Image source={icons.logo} className="h-10 w-12" />
            <Input
              placeholder="Search through 300+ movies online"
              iconLeft={<Search size={20} color="#AB8BFF" />}
            />
          </View>
        }
        // Footer dengan loading indicator
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
        // Infinite scroll
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
