import bg from '@/assets/images/bg.png';
import highlight from '@/assets/images/highlight.png';
import rankingGradient from '@/assets/images/rankingGradient.png';

const tmdbImgLink =
  process.env.EXPO_PUBLIC_TMDB_API_IMAGE ?? 'https://image.tmdb.org/t/p/';
const dummyImage =
  'https://dummyimage.com/500x750/cccccc/000000&text=No+Image  ';

const dummyAvatar = 'https://api.dicebear.com/7.x/avataaars/png?seed=YouMe';

export const images = {
  bg,
  highlight,
  rankingGradient,
  tmdbImgLink,
  dummyImage,
  dummyAvatar,
};
