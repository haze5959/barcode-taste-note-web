import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

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
