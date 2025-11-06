import { View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useAcoountDetail } from '@/hooks';
import { User, Moon, Sun, LogOut, ArrowRight } from 'lucide-react-native';
import {
  accountInfo,
  getAvatarUrl,
  settingsOptions,
  userStats,
} from '@/lib/constants/profile';

const Profile = () => {
  const { data } = useAcoountDetail();
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  if (!data) return;

  return (
    <ScrollView className="mb-20 flex-1" showsVerticalScrollIndicator={false}>
      <View className="relative h-48 bg-gradient-to-b from-accent/20 to-transparent">
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(171, 139, 255, 0.1)',
          }}
        />
        <View className="absolute -bottom-16 left-0 right-0 items-center">
          <View className="relative">
            <View
              className="h-32 w-32 overflow-hidden rounded-full border-4 border-dark-200 bg-dark-100"
              style={{
                shadowColor: '#AB8BFF',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}>
              <Image
                source={{ uri: getAvatarUrl() }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
            <View className="absolute bottom-2 right-2 rounded-full border-2 border-dark-200 bg-green-500 p-1.5">
              <View className="h-3 w-3 rounded-full bg-green-400" />
            </View>
          </View>
        </View>
      </View>

      <View className="mt-20 px-5">
        <View className="items-center">
          <Text className="text-2xl font-black text-white">
            {data?.name || data?.username || 'User'}
          </Text>
          <View className="mt-2 flex-row items-center gap-2">
            <User size={14} color="#AB8BFF" />
            <Text className="text-sm text-light-200">
              @{data?.username || 'username'}
            </Text>
          </View>
          <View className="mt-6 w-full flex-row items-center justify-around rounded-2xl bg-dark-100 p-4">
            {userStats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && <View className="h-12 w-px bg-accent/20" />}
                <View className="items-center">
                  <Text className="text-2xl font-black text-accent">
                    {stat.value}
                  </Text>
                  <Text className="mt-1 text-xs text-light-200">
                    {stat.label}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-4 text-lg font-black text-white">
            Account Information
          </Text>

          <View className="gap-3">
            {accountInfo(data).map((info, index) => (
              <View
                key={index}
                className="flex-row items-center rounded-xl bg-dark-100 p-4">
                <View className="mr-3 rounded-full bg-accent/20 p-2.5">
                  <info.icon size={20} color="#AB8BFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-light-200">{info.label}</Text>
                  <Text className="mt-1 text-sm font-semibold text-white">
                    {info.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-4 text-lg font-black text-white">Appearance</Text>
          <View className="flex-row items-center justify-between rounded-xl bg-dark-100 p-4">
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-accent/20 p-2.5">
                {isDarkMode ? (
                  <Moon size={20} color="#AB8BFF" />
                ) : (
                  <Sun size={20} color="#AB8BFF" />
                )}
              </View>
              <View>
                <Text className="text-sm font-semibold text-white">
                  Dark Mode
                </Text>
                <Text className="mt-0.5 text-xs text-light-200">
                  {isDarkMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>

            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-4 text-lg font-black text-white">Settings</Text>

          <View className="gap-3">
            {settingsOptions.map((option, index) => (
              <Button
                key={index}
                variant="card"
                size="full"
                onPress={option.onPress}
                className="justify-start">
                <View className="mr-3 rounded-full bg-accent/20 p-2.5">
                  <option.icon size={20} color="#AB8BFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-white">
                    {option.label}
                  </Text>
                  <Text className="mt-0.5 text-xs text-light-200">
                    {option.subtitle}
                  </Text>
                </View>
                <View className="flex-all-center rounded-full bg-accent/10 p-2">
                  <ArrowRight size={20} color="#AB8BFF" />
                </View>
              </Button>
            ))}
          </View>
        </View>

        <Button variant="destructive" size="full" className="mb-8 mt-6">
          <LogOut size={20} color="#ef4444" className="" />
          <Text className="ml-2">Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Profile;
