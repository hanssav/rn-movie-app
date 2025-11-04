import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { images } from './constants/images';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSafeImage = (
  path?: string | null,
  fallback: string = images.dummyImage,
  baseUrl: string = images.tmdbImgLink,
  size: string = 'w500'
): string => {
  if (!path) return fallback;
  return baseUrl ? `${baseUrl}${size}${path}` : path;
};
