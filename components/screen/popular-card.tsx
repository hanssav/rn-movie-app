import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { cn, getSafeImage } from '@/lib/utils';
import { DiscoverResult } from '@/types';

const { width } = Dimensions.get('window');
const CAROUSEL_ITEM_WIDTH = width * 0.7;

export const PopularCarousel: React.FC<{ movies: DiscoverResult[] }> = ({
  movies,
}) => {
  const router = useRouter();

  const handlePress = (movieId: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movieId.toString() },
    });
  };

  const renderItem = ({ item }: { item: DiscoverResult }) => {
    const imageUrl = getSafeImage(item.backdrop_path || item.poster_path);
    const rating = item.vote_average.toFixed(1);

    const year = item.release_date
      ? new Date(item.release_date).getFullYear()
      : 'N/A';

    return (
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        activeOpacity={0.9}
        style={{ width: CAROUSEL_ITEM_WIDTH }}>
        <View className="overflow-hidden rounded-2xl bg-gray-900">
          <Image
            source={{ uri: imageUrl }}
            style={{ width: CAROUSEL_ITEM_WIDTH, height: 200 }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />

          <View className="absolute bottom-0 left-0 right-0 p-3">
            <Text
              className="mb-2 text-base font-bold text-white"
              numberOfLines={1}>
              {item.title}
            </Text>
            <View className="flex-row items-center">
              <View className="rounded-md bg-yellow-500/20 px-2 py-1">
                <Text className="text-xs font-semibold text-yellow-400">
                  ⭐ {rating}
                </Text>
              </View>
            </View>
          </View>
          <Text className="absolute bottom-0 right-0 p-3 text-xs font-medium text-gray-400">
            {year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={movies.slice(0, 10)}
      keyExtractor={(item) => `popular-${item.id}`}
      ItemSeparatorComponent={() => <View className={cn('mx-2')} />}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CAROUSEL_ITEM_WIDTH + 16}
      decelerationRate="fast"
      snapToAlignment="start"
    />
  );
};

export default PopularCarousel;
