import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스 합치기 유틸리티 (shadcn/ui 필수)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
