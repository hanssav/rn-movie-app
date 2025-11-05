import { MovieInfo, QueryState } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { movieKeys, useAddFavorite, useMovieId } from '@/hooks';
import { cn, getSafeImage } from '@/lib/utils';
import { movieService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Play, Star } from 'lucide-react-native';
import { Image, ScrollView, View } from 'react-native';

const Detail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const movieId = Array.isArray(id) ? id[0] : id;
  const movieIdInt = parseInt(movieId);

  const { data, error, isLoading } = useMovieId({
    movie_id: movieIdInt,
    query: {
      append_to_response: 'credits,videos,images',
      language: 'en-US',
    },
  });

  const { data: account_data } = useQuery({
    queryKey: movieKeys.account_state(movieIdInt),
    queryFn: () => movieService.accountState(movieIdInt),
  });

  const { mutate, isPending } = useAddFavorite();

  const handleAddToFavorite = () => {
    mutate({
      media_type: 'movie',
      media_id: movieIdInt,
      favorite: account_data?.favorite ? false : true,
    });
  };

  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: getSafeImage(data?.poster_path),
            }}
            className="h-[557px] w-full"
            resizeMode="cover"
          />
          <Button
            variant={'ghost'}
            className={cn(
              'absolute bottom-0 right-5 size-14 translate-y-1/2',
              'flex-all-center rounded-full bg-accent'
            )}>
            <Play size={30} color={'white'} fill={'white'} />
          </Button>
        </View>
        <QueryState
          loading={isLoading}
          error={error?.message}
          loaderHeight={400}>
          <View className="flex items-start p-5">
            <View className="space-y-4">
              <View className="space-y-1.5">
                <Text variant={'title'}>{data?.title} </Text>
                <Text className="text-sm text-light-200">
                  {data?.release_date?.split('-')[0]} • PG-13 • {data?.runtime}m
                </Text>
              </View>
              <Text> </Text>
            </View>
            <View className="mt-2 flex-row items-center gap-x-1 rounded-md bg-dark-100 px-2 py-1">
              <Star size={16} color="#FFD700" fill="#FFD700" strokeWidth={0} />
              <Text className="text-sm font-bold text-white">
                {Math.round(data?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-sm text-light-200">
                ({data?.vote_count} votes)
              </Text>
            </View>
            <MovieInfo label="Overview" value={data?.overview} />
            <MovieInfo
              label="Genres"
              value={data?.genres?.map((g) => g.name).join(' • ') || 'N/A'}
            />
            <View className="flex w-1/2 flex-row justify-between">
              <MovieInfo
                label="Budget"
                value={`$${(data?.budget ?? 0) / 1_000_000} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${Math.round((data?.revenue ?? 0) / 1_000_000)} million`}
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={
                data?.production_companies?.map((c) => c.name).join(' • ') ||
                'N/A'
              }
            />
          </View>
        </QueryState>
      </ScrollView>
      <View className="absolute bottom-5 left-0 right-0 z-50 mx-5 flex-row gap-4">
        <Button
          variant={'ghost'}
          onPress={() => router.back()}
          className="flex flex-1 flex-row items-center justify-center bg-accent">
          <ArrowLeft size={20} color="#1a1a1a" strokeWidth={2} />
          <Text className="text-dark-200">Go Back</Text>
        </Button>
        <Button
          variant="outline"
          className="rounded-full border border-accent p-2"
          onPress={handleAddToFavorite}
          disabled={isPending}>
          <Heart
            size={24}
            color="white"
            fill={account_data?.favorite ? 'red' : 'transparent'}
          />
        </Button>
      </View>
    </View>
  );
};

export default Detail;
