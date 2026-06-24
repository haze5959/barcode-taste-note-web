import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스 합치기 유틸리티 (shadcn/ui 필수)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 현재 디바이스가 iOS(iPhone/iPad/iPod)인지 판별합니다.
 * iPadOS 13+ 는 데스크톱 Safari(Macintosh)로 위장하므로 터치 포인트로 추가 판별합니다.
 */
export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) return true
  // iPadOS 13+ 대응: 'Macintosh'로 보고하지만 멀티터치를 지원함
  return ua.includes('Macintosh') && navigator.maxTouchPoints > 1
}
