import {
  Mail,
  MapPin,
  Globe,
  Settings,
  Bell,
  Shield,
  Info,
} from 'lucide-react-native';
import { images } from './images';
import { AccountDetailsResponse } from '@/types';

export const getAvatarUrl = () => {
  // if (data?.avatar?.tmdb?.avatar_path) {
  //   return `https://image.tmdb.org/t/p/w200${data.avatar.tmdb.avatar_path}`;
  // }
  // if (data?.avatar?.gravatar?.hash) {
  //   return `https://www.gravatar.com/avatar/${data.avatar.gravatar.hash}?s=200&d=mp`;
  // }
  return images.dummyAvatar;
};

export const userStats = [
  { label: 'Favorites', value: 0 },
  { label: 'Watchlist', value: 0 },
  { label: 'Reviews', value: 0 },
];

export const accountInfo = (data: AccountDetailsResponse) => [
  {
    icon: Mail,
    label: 'User ID',
    value: data?.id?.toString() || 'N/A',
  },
  {
    icon: MapPin,
    label: 'Region',
    value: data?.iso_3166_1 || 'N/A',
  },
  {
    icon: Globe,
    label: 'Language',
    value: data?.iso_639_1?.toUpperCase() || 'N/A',
  },
];

export const settingsOptions = [
  {
    icon: Bell,
    label: 'Notifications',
    subtitle: 'Manage your notifications',
    onPress: () => console.log('Notifications'),
  },
  {
    icon: Shield,
    label: 'Privacy & Security',
    subtitle: 'Control your privacy settings',
    onPress: () => console.log('Privacy'),
  },
  {
    icon: Settings,
    label: 'App Settings',
    subtitle: 'Customize your experience',
    onPress: () => console.log('Settings'),
  },
  {
    icon: Info,
    label: 'About',
    subtitle: 'Version 1.0.0',
    onPress: () => console.log('About'),
  },
];
