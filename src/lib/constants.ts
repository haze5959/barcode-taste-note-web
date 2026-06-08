export const AUTH0_DOMAIN = 'dev-0ey2zkme2zf6lczu.us.auth0.com';
export const AUTH0_CLIENT_ID = 'blre2uWlFex6kcumEbkrU89GJMjmM2Tg';
export const AUTH0_AUDIENCE = 'https://barcode-tasting-note/';
export const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api.barnote.net';

export const APPLE_APP_ID = '6761252335';
export const APPLE_APP_URL = `https://apps.apple.com/app/id${APPLE_APP_ID}`;

// 지원하는 11개 언어 코드 (public/locales 및 public/screenshots 폴더명과 일치)
export const SUPPORTED_LANGUAGES = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja', 'fr', 'de', 'es', 'pt', 'it', 'ru'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

