import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const getLocalizedUrl = (baseUrl: string, lang: string) => {
  try {
    const parsed = new URL(baseUrl);
    parsed.searchParams.set('lng', lang);
    return parsed.toString();
  } catch (e) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}lng=${lang}`;
  }
};

export function SEO({
  title,
  description,
  image = 'https://barnote.net/og-image.png',
  url = 'https://barnote.net',
  type = 'website',
}: SEOProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';

  const defaultTitle = t('seo.default_title', 'BarNote - Wine, Beer & Whiskey');
  const defaultDescription = t('seo.default_description', 'Create and share the fastest tasting notes using barcode recognition and AI label scanning.');

  const resolvedTitle = title || defaultTitle;
  const resolvedDescription = description || defaultDescription;

  // 제목에 항상 서비스명을 붙임 (기본 타이틀이 아닌 경우에만)
  const pageTitle = (resolvedTitle === defaultTitle || resolvedTitle === 'BarNote' || resolvedTitle === 'BarNote - AI 스캔 시음 노트')
    ? resolvedTitle
    : `${resolvedTitle} | BarNote`;

  const canonicalUrl = getLocalizedUrl(url, currentLang);

  return (
    <Helmet>
      {/* Default Meta */}
      <html lang={currentLang} />
      <title>{pageTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate Language Links for Global SEO */}
      {SUPPORTED_LANGUAGES.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={getLocalizedUrl(url, lang)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph / Facebook / Kakao */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="BarNote" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

