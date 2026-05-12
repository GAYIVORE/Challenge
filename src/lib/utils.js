import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 

// Prevents "window is not defined" error during build/SSR
export const isIframe = typeof window !== 'undefined' && window.self !== window.top;