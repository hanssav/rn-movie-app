import { DiscoverResult } from '@/types';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/text';
import { getSafeImage } from '@/lib/utils';
import { Heart, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Spin } from '../ui/spin';

type FavoriteCardProps = {
  movie: DiscoverResult;
  onRemoveFavorite: (movieId: number) => void;
  removingId: number | null;
};

const FavoriteCard = ({
  movie,
  onRemoveFavorite,
  removingId,
}: FavoriteCardProps) => {
  const router = useRouter();
  const isRemoving = removingId === movie.id;

  const handlePress = () => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movie.id.toString() },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mb-4 overflow-hidden rounded-3xl bg-dark-100"
      activeOpacity={0.7}
      style={{
        shadowColor: '#AB8BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        opacity: isRemoving ? 0.4 : 1,
        transform: [{ scale: isRemoving ? 0.98 : 1 }],
      }}>
      <View className="flex-row">
        <View className="relative h-52 w-28 overflow-hidden">
          <Image
            source={{ uri: getSafeImage(movie.poster_path) }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
            }}
          />
          <View className="absolute bottom-3 left-2 rounded-lg bg-accent/95 px-2.5 py-1.5 backdrop-blur">
            <View className="flex-row items-center gap-1">
              <Star size={14} color="#fff" fill="#fff" strokeWidth={0} />
              <Text className="text-xs font-black text-white">
                {movie.vote_average?.toFixed(1) || 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <Text
                className="text-base font-black leading-5 text-white"
                numberOfLines={2}>
                {movie.title}
              </Text>
              <View className="mt-1.5 flex-row items-center gap-1.5">
                <View className="rounded-md bg-accent/20 px-2 py-0.5">
                  <Text className="text-xs font-semibold text-accent">
                    {movie.release_date?.split('-')[0] || 'N/A'}
                  </Text>
                </View>
                {typeof movie.vote_count === 'number' && (
                  <Text className="text-xs text-light-200">
                    {movie.vote_count.toLocaleString()} votes
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onRemoveFavorite(movie.id);
              }}
              disabled={isRemoving}
              className="flex-all-center min-h-[44px] min-w-[44px] rounded-full border border-red-500/30 bg-red-500/10 p-2.5"
              activeOpacity={0.7}>
              {isRemoving ? (
                <Spin className="size-5 border-2 border-red-500 border-t-transparent" />
              ) : (
                <Heart
                  size={20}
                  color="#ef4444"
                  fill="#ef4444"
                  strokeWidth={2.5}
                />
              )}
            </TouchableOpacity>
          </View>
          {movie.genre_ids && movie.genre_ids.length > 0 && (
            <View className="mt-3 flex-row flex-wrap gap-1.5">
              {movie.genre_ids
                .slice(0, 3)
                .map((genreId: number, index: number) => (
                  <View
                    key={`${movie.id}-${genreId}-${index}`}
                    className="rounded-full border border-accent/30 bg-accent/15 px-2.5 py-1">
                    <Text className="text-[10px] font-semibold text-accent">
                      ID: {genreId}
                    </Text>
                  </View>
                ))}
            </View>
          )}
          <Text
            className="mt-3 text-xs leading-[18px] text-light-200/80"
            numberOfLines={2}>
            {movie.overview || 'No description available for this movie.'}
          </Text>
          <View className="mt-3 flex-row items-center gap-3">
            {typeof movie.popularity === 'number' && (
              <View className="flex-row items-center gap-1">
                <View className="size-1.5 rounded-full bg-accent" />
                <Text className="text-[10px] text-light-200">
                  {Math.round(movie.popularity)} popularity
                </Text>
              </View>
            )}
            {movie.original_language && (
              <View className="flex-row items-center gap-1">
                <View className="size-1.5 rounded-full bg-accent" />
                <Text className="text-[10px] uppercase text-light-200">
                  {movie.original_language}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteCard;
