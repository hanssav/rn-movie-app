import { Tabs } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';
import { images } from '@/lib/constants/images';
import { Heart, Home, Search, User } from 'lucide-react-native';

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="mt-4 flex min-h-14 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full">
        {icon}
        <Text className="ml-2 text-base font-semibold text-secondary">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="mt-4 size-full items-center justify-center rounded-full">
      {icon}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0F0D23',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Home
                  size={20}
                  color={focused ? '#151312' : '#A8B5DB'}
                  // fill={focused ? '#151312' : 'transparent'}
                  strokeWidth={2}
                />
              }
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Search
                  size={20}
                  color={focused ? '#151312' : '#A8B5DB'}
                  strokeWidth={2}
                />
              }
              title="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Heart
                  size={20}
                  color={focused ? '#151312' : '#A8B5DB'}
                  // fill={focused ? '#151312' : 'transparent'}
                  strokeWidth={2}
                />
              }
              title="Favorite"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <User
                  size={20}
                  color={focused ? '#151312' : '#A8B5DB'}
                  // fill={focused ? '#151312' : 'transparent'}
                  strokeWidth={2}
                />
              }
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
