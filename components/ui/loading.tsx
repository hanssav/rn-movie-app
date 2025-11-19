import { ComponentPropsWithoutRef } from 'react';
import { ActivityIndicator } from 'react-native';

type LoadingSpinnerProps = {
  size?: 'small' | 'large' | number;
  color?: string;
} & ComponentPropsWithoutRef<typeof ActivityIndicator>;

export const LoadingSpinner = ({
  size = 'large',
  color = '#AB8BFF',
}: LoadingSpinnerProps) => {
  return <ActivityIndicator size={size} color={color} />;
};
