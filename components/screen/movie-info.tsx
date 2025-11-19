import { View } from 'react-native';
import { Text } from '../ui/text';

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

export default MovieInfo;
