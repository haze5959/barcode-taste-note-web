import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Barnote - AI 스캔 시음 노트',
  description = '바코드와 AI 스캔으로 가장 빠른 시음 노트를 작성하고 공유해보세요.',
  image = 'https://barnote.net/icon-1024.png',
  url = 'https://barnote.net',
  type = 'website',
}: SEOProps) {
  // 제목에 항상 서비스명을 붙임
  const pageTitle = title === 'Barnote - AI 스캔 시음 노트' ? title : `${title} | Barnote`;

  return (
    <Helmet>
      {/* Default Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook / Kakao */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Barnote" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
