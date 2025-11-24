import { type ClassValue, clsx } from 'clsx'

// Simplified className utility without tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}