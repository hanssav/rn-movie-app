import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const Detail = () => {
  const router = useRouter();

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
