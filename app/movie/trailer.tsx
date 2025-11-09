import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Play, Calendar, Film } from 'lucide-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { cn } from '@/lib/utils';
import { MovieVideo, MovieVideosResponse } from '@/types';

const { width } = Dimensions.get('window');

// Constants
const THUMBNAIL_WIDTH = 140;
const THUMBNAIL_HEIGHT = 78.75; // 16:9 ratio

// Types

type VideoType =
  | 'Trailer'
  | 'Teaser'
  | 'Clip'
  | 'Behind the Scenes'
  | 'Featurette';

interface VideoStyle {
  bg: string;
  text: string;
  border: string;
}

// Utility Functions
const getYoutubeThumbnail = (
  videoKey: string,
  quality: 'default' | 'hq' | 'maxres' = 'maxres'
): string => {
  return `https://img.youtube.com/vi/${videoKey}/${quality}default.jpg`;
};

const getVideoTypeStyle = (type: string): VideoStyle => {
  const styles: Record<VideoType, VideoStyle> = {
    Trailer: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30',
    },
    Teaser: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    Clip: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    'Behind the Scenes': {
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      border: 'border-green-500/30',
    },
    Featurette: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    },
  };
  return (
    styles[type as VideoType] || {
      bg: 'bg-gray-500/20',
      text: 'text-gray-400',
      border: 'border-gray-500/30',
    }
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Components
const VideoTypeBadge = ({ type }: { type: string }) => {
  const style = getVideoTypeStyle(type);
  return (
    <View
      className={cn('rounded-lg border px-3 py-1.5', style.bg, style.border)}>
      <Text className={cn('text-xs font-bold', style.text)}>{type}</Text>
    </View>
  );
};

const DateBadge = ({ date }: { date: string }) => (
  <View className="flex-row items-center gap-1.5">
    <Calendar size={12} color="#9ca3af" />
    <Text className="text-xs text-gray-400">{formatDate(date)}</Text>
  </View>
);

const OfficialBadge = () => (
  <View className="rounded-lg border border-green-500/30 bg-green-500/20 px-2 py-1">
    <Text className="text-xs font-semibold text-green-400">✓ Official</Text>
  </View>
);

const VideoThumbnail = ({
  videoKey,
  onPress,
  size = 'large',
}: {
  videoKey: string;
  onPress: () => void;
  size?: 'large' | 'small';
}) => {
  const isLarge = size === 'large';
  const quality = isLarge ? 'maxres' : 'hq';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.95}
      className={isLarge ? 'overflow-hidden rounded-2xl bg-gray-900' : ''}>
      <View
        className="relative bg-gray-800"
        style={
          isLarge ? {} : { width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }
        }>
        <Image
          source={{ uri: getYoutubeThumbnail(videoKey, quality) }}
          style={
            isLarge
              ? { width: '100%', aspectRatio: 16 / 9 }
              : { width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }
          }
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center bg-black/30">
          <View
            className={cn(
              'items-center justify-center rounded-full',
              isLarge
                ? 'h-16 w-16 bg-red-500 shadow-lg shadow-red-500/50'
                : 'h-10 w-10 bg-white/20'
            )}>
            <Play
              size={isLarge ? 28 : 16}
              color="white"
              fill="white"
              style={{ marginLeft: isLarge ? 2 : 1 }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FeaturedVideoInfo = ({ video }: { video: MovieVideo }) => (
  <View className="border-b border-white/5 px-4 pb-4">
    <Text className="mb-2 text-lg font-bold text-white">{video.name}</Text>
    <View className="flex-row flex-wrap items-center gap-2">
      <VideoTypeBadge type={video.type} />
      <DateBadge date={video.published_at} />
      {video.official && <OfficialBadge />}
      <Text className="text-xs text-gray-500">{video.size}p</Text>
    </View>
  </View>
);

const VideoListItem = ({
  video,
  onPress,
  isLast,
}: {
  video: MovieVideo;
  onPress: () => void;
  isLast: boolean;
}) => {
  const style = getVideoTypeStyle(video.type);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row overflow-hidden rounded-xl border border-white/5 bg-gray-900/50"
      style={{ marginBottom: isLast ? 0 : 12 }}>
      <VideoThumbnail videoKey={video.key} onPress={onPress} size="small" />

      <View className="flex-1 justify-center p-3">
        <Text
          className="mb-1.5 text-sm font-semibold text-white"
          numberOfLines={2}>
          {video.name}
        </Text>
        <View className="flex-row flex-wrap items-center gap-2">
          <View
            className={cn(
              'rounded border px-2 py-0.5',
              style.bg,
              style.border
            )}>
            <Text className={cn('text-xs font-semibold', style.text)}>
              {video.type}
            </Text>
          </View>
          <Text className="text-xs text-gray-400">
            {formatDate(video.published_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Header = ({
  onBack,
  videoCount,
}: {
  onBack: () => void;
  videoCount: number;
}) => (
  <View className="flex-row items-center border-b border-white/5 px-4 pb-4 pt-12">
    <TouchableOpacity
      onPress={onBack}
      className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/10">
      <ArrowLeft size={20} color="white" />
    </TouchableOpacity>
    <View className="flex-1">
      <Text className="text-xl font-bold text-white">Videos & Trailers</Text>
      <Text className="text-sm text-gray-400">
        {videoCount} video{videoCount !== 1 ? 's' : ''}
      </Text>
    </View>
  </View>
);

const EmptyState = ({ onBack }: { onBack: () => void }) => (
  <View className="flex-1 bg-black">
    <View className="flex-row items-center px-4 pb-4 pt-12">
      <TouchableOpacity
        onPress={onBack}
        className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/10">
        <ArrowLeft size={20} color="white" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-white">Videos & Trailers</Text>
    </View>
    <View className="flex-1 items-center justify-center px-6">
      <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-gray-900">
        <Film size={40} color="#6b7280" />
      </View>
      <Text className="text-xl font-bold text-white">No Videos Available</Text>
      <Text className="mt-2 text-center text-gray-400">
        There are no trailers or videos for this movie yet.
      </Text>
    </View>
  </View>
);

const LoadingState = () => (
  <View className="flex-1 items-center justify-center bg-black">
    <ActivityIndicator size="large" color="#ef4444" />
    <Text className="mt-4 text-gray-400">Loading videos...</Text>
  </View>
);

// Main Component
const Trailer = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const movieId = Array.isArray(id) ? id[0] : id;
  const movieIdInt = parseInt(movieId);

  const [selectedVideo, setSelectedVideo] = useState<MovieVideo | null>(null);
  const [playing, setPlaying] = useState(false);

  const { data, isLoading } = useQuery<MovieVideosResponse>({
    queryKey: ['movie', 'videos', movieIdInt],
    queryFn: () => movieService.getVideo(movieIdInt),
    staleTime: 60_000,
  });

  const handleVideoSelect = (video: MovieVideo) => {
    setSelectedVideo(video);
    setPlaying(true);
  };

  const handleBack = () => router.back();

  // Loading State
  if (isLoading) return <LoadingState />;

  // Empty State
  if (!data?.results || data.results.length === 0) {
    return <EmptyState onBack={handleBack} />;
  }

  // Prepare data
  const featuredVideo = selectedVideo || data.results[0];
  const otherVideos = data.results.filter(
    (video) => video.id !== featuredVideo.id
  );

  return (
    <View className="flex-1 bg-black">
      <Header onBack={handleBack} videoCount={data.results.length} />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Featured Video Section */}
        <View>
          {playing && selectedVideo ? (
            // YouTube Player
            <View className="bg-black">
              <YoutubePlayer
                height={(width * 9) / 16}
                play={playing}
                videoId={featuredVideo.key}
                onChangeState={(state: string) => {
                  if (state === 'ended') setPlaying(false);
                }}
              />
            </View>
          ) : (
            // Thumbnail with Overlay
            <View className="p-4">
              <View className="overflow-hidden rounded-2xl bg-gray-900">
                <View className="relative">
                  <VideoThumbnail
                    videoKey={featuredVideo.key}
                    onPress={() => handleVideoSelect(featuredVideo)}
                    size="large"
                  />

                  {/* Info Overlay */}
                  <View className="absolute inset-0 justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent p-4">
                    <View className="mb-2 flex-row items-center gap-2">
                      <View
                        className={cn(
                          'rounded-md border px-2.5 py-1',
                          getVideoTypeStyle(featuredVideo.type).bg,
                          getVideoTypeStyle(featuredVideo.type).border
                        )}>
                        <Text
                          className={cn(
                            'text-xs font-bold',
                            getVideoTypeStyle(featuredVideo.type).text
                          )}>
                          {featuredVideo.type.toUpperCase()}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1.5">
                        <Calendar size={12} color="#9ca3af" />
                        <Text className="text-xs text-gray-300">
                          {formatDate(featuredVideo.published_at)}
                        </Text>
                      </View>
                    </View>
                    <Text
                      className="text-base font-bold text-white"
                      numberOfLines={2}>
                      {featuredVideo.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <FeaturedVideoInfo video={featuredVideo} />
        </View>

        {/* More Videos List */}
        <View className="px-4 pb-20 pt-4">
          <Text className="mb-3 text-lg font-bold text-white">
            More Videos ({otherVideos.length})
          </Text>
          {otherVideos.length === 0 ? (
            <Text className="text-center text-gray-400">No more videos</Text>
          ) : (
            <View>
              {otherVideos.map((video, index) => (
                <VideoListItem
                  key={video.id}
                  video={video}
                  onPress={() => handleVideoSelect(video)}
                  isLast={index === otherVideos.length - 1}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Trailer;
