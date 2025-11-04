import { cn } from '@/lib/utils';
import { ActivityIndicator, View } from 'react-native';

type LoadingSpinnerProps = {
  size?: 'small' | 'large' | number;
  color?: string;
  className?: string;
};

export const LoadingSpinner = ({
  size = 'large',
  color = '#0000ff',
  className,
}: LoadingSpinnerProps) => {
  return (
    <View className={(cn('flex-1 items-center justify-center'), className)}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
