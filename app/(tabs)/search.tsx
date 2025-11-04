import { FlatList, ScrollView, View } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { useSearchMovie } from '@/hooks';
import { SearchMovieParams } from '@/types';
import { Image } from 'react-native';
import { images } from '@/lib/constants/images';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react-native';
import { icons } from '@/lib/constants/icons';
import { QueryState, MovieCard } from '@/components/screen';

const Search = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [params, setParams] = React.useState<SearchMovieParams>({
    query: '',
    language: 'en-US',
  });

  // Debounce the search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setParams({ ...params, query: searchText });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data,
    isLoading,
    error,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchMovie(params);

  const searchData = data?.pages.flatMap((page) => page.results) ?? [];

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const renderEmptyComponent = () => {
    if (!isLoading && !isError) {
      return (
        <View className="mt-10 px-5">
          <Text className="text-center text-gray-500">
            {params.query.trim()
              ? 'No movies found'
              : 'Start typing to search for movies'}
          </Text>
        </View>
      );
    }
  };

  return (
    <View className="flex-1">
      <Image
        source={images.bg}
        className="absolute z-0 w-full flex-1"
        resizeMode="cover"
      />
      <FlatList
        className="px-5"
        data={searchData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-all-center min-h-72 w-full gap-12">
              <Image source={icons.logo} className="h-10 w-12" />
              <Input
                placeholder="Search through 300+ movies online"
                value={searchText}
                iconLeft={<SearchIcon size={20} color="#AB8BFF" />}
                onChangeText={handleSearch}
              />
            </View>
            <QueryState loading={isLoading} error={error?.message}>
              {!isLoading &&
                !isError &&
                params.query.trim() &&
                searchData.length > 0 && (
                  <Text variant={'title'}>
                    Search Results for{' '}
                    <Text variant={'title'} className="text-accent">
                      {params.query}
                    </Text>
                  </Text>
                )}
            </QueryState>
          </>
        }
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Search;
