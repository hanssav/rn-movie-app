import { Text } from '@/components/ui/text';
import { icons } from '@/lib/constants/icons';
import { images } from '@/lib/constants/images';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';

const Screen = () => {
  return (
    <View className="flex-1">
      <Image
        source={images.bg}
        className="absolute z-0 w-full flex-1"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}>
        <Image source={icons.logo} className="mx-auto mb-5 mt-20 h-10 w-12" />
      </ScrollView>
    </View>
  );
};

export default Screen;
