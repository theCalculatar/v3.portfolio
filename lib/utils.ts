import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string) {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}