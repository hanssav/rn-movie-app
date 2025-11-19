import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { getSafeImage } from '@/lib/utils';
import { DiscoverResult } from '@/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 3;

export const MovieCard: React.FC<{ movie: DiscoverResult }> = ({ movie }) => {
  const router = useRouter();
  const imageUrl = getSafeImage(movie.poster_path);
  const rating = movie.vote_average.toFixed(1);

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const handlePress = () => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movie.id.toString() },
    });
  };

  return (
    <TouchableOpacity
      className="mb-4"
      onPress={handlePress}
      activeOpacity={0.7}>
      <View className="overflow-hidden rounded-xl bg-gray-900">
        <Image
          source={{ uri: imageUrl }}
          className="h-52 w-full"
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
      </View>

      <View className="mt-2" style={{ width: CARD_WIDTH }}>
        <Text
          className="mb-1 font-bold text-white"
          style={{ fontSize: 13 }}
          numberOfLines={2}>
          {movie.title}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="rounded-md bg-yellow-500/20 px-2 py-1">
            <Text className="text-xs font-semibold text-yellow-400">
              ⭐ {rating}
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-400">{year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MovieCard;
