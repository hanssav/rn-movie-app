import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (
  path: string | null,
  size: string = 'w500'
): string | null => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
};
