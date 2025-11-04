import { View } from 'react-native';
import { cn } from '@/lib/utils';
import React from 'react';

export const Spin = ({ className }: { className?: string }) => {
  return (
    <View className="absolute inset-0 items-center justify-center">
      <View
        className={cn(
          // base spinner style
          'h-6 w-6 rounded-full border-2 border-accent border-t-transparent',
          'animate-spin',
          className
        )}
      />
    </View>
  );
};
