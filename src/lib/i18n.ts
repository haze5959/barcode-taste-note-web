import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './constants'

// 스크린샷이 없는 언어는 영어 폴더로 대체 노출한다.
export const SCREENSHOT_FALLBACK_LANG: SupportedLanguage = 'en'

/**
 * i18n.language(예: 'en-US', 'ko-KR', 'zh-Hant')를
 * 스크린샷 폴더명(지원 언어 코드)으로 정규화한다.
 * 지원하지 않는 언어는 영어('en')로 대체한다.
 */
export function resolveScreenshotLang(lang: string | undefined): SupportedLanguage {
  if (!lang) return SCREENSHOT_FALLBACK_LANG

  const lower = lang.toLowerCase()

  // 중국어: 간체/번체 스크립트 및 지역 코드 처리
  if (lower.startsWith('zh')) {
    if (lower.includes('hant') || lower.includes('tw') || lower.includes('hk') || lower.includes('mo')) {
      return 'zh-TW'
    }
    // zh, zh-hans, zh-cn, zh-sg 등은 간체로 처리
    return 'zh-CN'
  }

  // 그 외: 지역 코드 앞부분만 사용 (en-US -> en)
  const base = lower.split('-')[0]
  const matched = SUPPORTED_LANGUAGES.find((code) => code.toLowerCase() === base)
  return matched ?? SCREENSHOT_FALLBACK_LANG
}

i18n
  // public/locales/{lang}/translation.json에서 번역 파일을 불러옵니다.
  .use(HttpBackend)
  // 브라우저 언어를 감지합니다.
  .use(LanguageDetector)
  // react-i18next를 초기화합니다.
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React는 이미 XSS를 방지하므로 false로 설정
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  })

export default i18n
