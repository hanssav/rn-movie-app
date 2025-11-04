import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useMovieId } from '@/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

const Detail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const movieId = Array.isArray(id) ? id[0] : id;

  const { data } = useMovieId({
    movie_id: parseInt(movieId),
    query: {
      append_to_response: 'credits,videos,images',
      language: 'en-US',
    },
  });
  console.log(typeof id, 'id');

  console.log(data, 'data');
  return (
    <>
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Button onPress={() => router.back()}>
          <Text>Go Back</Text>
        </Button>
        <Text>This Movie Detail screen</Text>
      </View>
    </>
  );
};

export default Detail;
