import { QueryState } from '@/components/screen/query-state';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useMovieId } from '@/hooks';
import { icons } from '@/lib/constants/icons';
import { cn, getSafeImage } from '@/lib/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

type MovieInfoProps = {
  label: string;
  value?: string | number | null;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="mt-5 flex-col items-start justify-center">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">
      {value || 'N/A'}
    </Text>
  </View>
);

const Detail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const movieId = Array.isArray(id) ? id[0] : id;

  const { data, error, isLoading } = useMovieId({
    movie_id: parseInt(movieId),
    query: {
      append_to_response: 'credits,videos,images',
      language: 'en-US',
    },
  });

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

          <TouchableOpacity
            className={cn(
              'absolute bottom-0 right-5 size-14 translate-y-1/2',
              'flex-all-center rounded-full bg-white'
            )}>
            <Image
              source={icons.play}
              className="ml-1 h-7 w-6"
              resizeMode="stretch"
            />
          </TouchableOpacity>
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
              <Image source={icons.star} className="size-4" />

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
          <Image
            source={icons.arrow}
            className="size-5 rotate-180"
            tintColor="#1a1a1a"
          />
          <Text className="text-dark-200">Go Back</Text>
        </Button>

        <Button
          variant="outline"
          className="rounded-full border border-accent p-2">
          <Heart size={24} color="white" />
        </Button>
      </View>
    </View>
  );
};

export default Detail;
