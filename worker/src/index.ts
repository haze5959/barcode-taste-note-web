/**
 * BarNote OG 메타태그 주입 Worker
 *
 * 소셜 크롤러(카카오톡, 페이스북, X, 슬랙 등)는 JS를 실행하지 않으므로
 * SPA가 react-helmet으로 동적 설정하는 og/twitter 메타태그를 읽지 못한다.
 * 이 Worker는 /note/:id, /user/:id 요청 중 크롤러(봇) User-Agent만 골라
 * API 데이터를 조회해 index.html <head>에 OG 태그를 주입해 응답한다.
 *
 * 일반 사용자 요청은 원본(R2)으로 그대로 통과시키므로 추가 지연이 없다.
 * 봇 응답은 엣지 캐시(5분)되어 같은 링크가 연속 공유될 때 API 재호출이 없다.
 */

/** 로컬 테스트 시 mock 서버로 오버라이드 가능 (wrangler dev --var API_BASE:... SITE_ORIGIN:...) */
interface Env {
  API_BASE?: string;
  SITE_ORIGIN?: string;
}

interface Config {
  apiBase: string;
  siteOrigin: string;
}

const DEFAULT_CONFIG: Config = {
  apiBase: 'https://api.barnote.net',
  siteOrigin: 'https://barnote.net',
};

const FETCH_TIMEOUT_MS = 5000;
const BOT_CACHE_TTL_SECONDS = 300;
const DESCRIPTION_MAX_LENGTH = 200;

// 링크 미리보기/검색 크롤러 UA 패턴
// (카카오톡·라인 스크래퍼는 UA에 facebookexternalhit을 포함하므로 함께 매칭된다)
const BOT_UA_RE =
  /facebookexternalhit|facebot|twitterbot|slackbot|linkedinbot|discordbot|telegrambot|whatsapp|kakaotalk-scrap|kakaostory-og-reader|skypeuripreview|pinterestbot|redditbot|embedly|iframely|vkshare|googlebot|bingbot|yeti|applebot|duckduckbot|daum/i;

// 대상 라우트: /note/{uuid}, /user/{uuid}
const ROUTE_RE =
  /^\/(note|user)\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

// 보조 문구 사전 (사용자 콘텐츠 외 고정 문구만 해당. lng 쿼리 기준, 기본 en)
const STRINGS = {
  ko: { tastingNote: '테이스팅 노트', userNotes: '작성 노트', notes: '노트', followers: '팔로워' },
  en: { tastingNote: 'Tasting Note', userNotes: 'Tasting Notes', notes: 'Notes', followers: 'Followers' },
} as const;

type Lang = keyof typeof STRINGS;

/** SEO 컴포넌트가 공유 URL에 붙이는 ?lng= 값을 보조 문구 언어로 해석한다. */
function resolveLang(lng: string | null): Lang {
  return lng?.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

// ==========================================
// API 응답 타입 (서버 원본 snake_case 그대로 사용)
// ==========================================
interface ApiEnvelope<T> {
  result: boolean;
  data: T | null;
  error: string | null;
}

interface NoteApiData {
  note: { body: string | null; rating: number };
  product: { name: string };
  user: { nick_name: string } | null;
  image_ids: string[] | null;
  product_image_id: string | null;
}

interface UserApiData {
  user: { nick_name: string; intro: string | null; image_id: string | null };
  note_count: number;
  follower_count: number | null;
}

/** OG 태그 구성에 필요한 메타 정보 */
interface OgMeta {
  title: string;
  description: string;
  imageUrl: string;
  canonicalUrl: string;
}

// ==========================================
// 유틸리티
// ==========================================

/** 타임아웃이 적용된 fetch (AbortSignal.timeout은 로컬 workerd에서 미지원이라 수동 구현) */
async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** API GET 호출. 실패(네트워크/타임아웃/논리 오류) 시 null을 반환해 폴백을 유도한다. */
async function fetchApi<T>(config: Config, path: string): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(`${config.apiBase}${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<T>;
    return json.result ? json.data : null;
  } catch {
    return null;
  }
}

/** 연속 공백/개행을 한 칸으로 정리 */
function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/** 설명문 길이 제한 (초과 시 말줄임) */
function truncate(text: string): string {
  if (text.length <= DESCRIPTION_MAX_LENGTH) return text;
  return `${text.slice(0, DESCRIPTION_MAX_LENGTH - 1)}…`;
}

/** HTML 속성값 이스케이프 */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ==========================================
// 라우트별 OG 메타 구성
// ==========================================

async function buildNoteMeta(config: Config, noteId: string, lang: Lang): Promise<OgMeta | null> {
  const data = await fetchApi<NoteApiData>(config, `/notes/${noteId}`);
  if (!data) return null;

  const s = STRINGS[lang];
  // NoteDetail.tsx의 SEO와 동일한 우선순위: 노트 첫 이미지 -> 제품 이미지 -> 기본 아이콘
  const imageId = data.image_ids?.[0] ?? data.product_image_id;
  const body = cleanText(data.note.body ?? '');
  // rating은 10점 만점 -> 앱 화면과 동일하게 5점 만점으로 표시
  const score = (data.note.rating / 2).toFixed(1);

  return {
    title: `⭐️${score} - ${data.product.name}`,
    description: body ? truncate(body) : `${data.product.name} ${s.tastingNote}`,
    imageUrl: imageId ? `${config.siteOrigin}/images/${imageId}` : `${config.siteOrigin}/icon-512.png`,
    canonicalUrl: `${config.siteOrigin}/note/${noteId.toLowerCase()}`,
  };
}

async function buildUserMeta(config: Config, userId: string, lang: Lang): Promise<OgMeta | null> {
  const data = await fetchApi<UserApiData>(config, `/users/${userId}`);
  if (!data) return null;

  const s = STRINGS[lang];
  const intro = cleanText(data.user.intro ?? '');
  const stats = `${s.notes} ${data.note_count} · ${s.followers} ${data.follower_count ?? 0}`;

  return {
    title: `${data.user.nick_name} - ${s.userNotes} | BarNote`,
    description: intro ? truncate(`${intro} · ${stats}`) : stats,
    // 프로필 이미지는 /images/profile/{id} 경로를 사용한다 (src/types getImageUrl과 동일)
    imageUrl: data.user.image_id
      ? `${config.siteOrigin}/images/profile/${data.user.image_id}`
      : `${config.siteOrigin}/icon-512.png`,
    canonicalUrl: `${config.siteOrigin}/user/${userId.toLowerCase()}`,
  };
}

/** <head>에 주입할 og/twitter 메타태그 블록 생성 */
function buildOgBlock(meta: OgMeta): string {
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const image = escapeAttr(meta.imageUrl);
  const url = escapeAttr(meta.canonicalUrl);

  return [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="BarNote" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');
}

// ==========================================
// HTMLRewriter 핸들러
// ==========================================

/** <title> 내용을 페이지별 제목으로 교체 */
class TitleHandler {
  constructor(private readonly title: string) {}
  element(el: Element): void {
    el.setInnerContent(this.title);
  }
}

/** 기존 <meta name="description"> 내용을 교체 */
class DescriptionHandler {
  constructor(private readonly description: string) {}
  element(el: Element): void {
    el.setAttribute('content', this.description);
  }
}

/** <head> 끝에 og/twitter 태그 블록 추가 */
class HeadInjector {
  constructor(private readonly html: string) {}
  element(el: Element): void {
    el.append(this.html, { html: true });
  }
}

// ==========================================
// 엔트리포인트
// ==========================================

/** pass-through 재귀 방지 마커 (프로덕션은 same-zone bypass로 재진입이 없지만 로컬 dev 안전망) */
const LOOP_GUARD_HEADER = 'x-barnote-og-worker';

/** 원본(R2)으로 요청을 그대로 전달한다. 재귀 감지 마커를 부착한다. */
function passThrough(request: Request): Promise<Response> {
  const headers = new Headers(request.headers);
  headers.set(LOOP_GUARD_HEADER, '1');
  return fetch(new Request(request, { headers }));
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    // 자기 자신을 다시 거친 요청은 즉시 차단 (로컬 dev 무한 재귀 방지)
    if (request.headers.get(LOOP_GUARD_HEADER) === '1') {
      return new Response('loop detected', { status: 508 });
    }

    const url = new URL(request.url);
    const match = ROUTE_RE.exec(url.pathname);
    const userAgent = request.headers.get('user-agent') ?? '';

    // 일반 사용자 또는 비대상 경로: 원본(R2)으로 그대로 통과 (추가 지연 없음)
    if (!match || !BOT_UA_RE.test(userAgent)) {
      return passThrough(request);
    }

    const config: Config = {
      apiBase: env.API_BASE ?? DEFAULT_CONFIG.apiBase,
      siteOrigin: env.SITE_ORIGIN ?? DEFAULT_CONFIG.siteOrigin,
    };
    const routeType = match[1].toLowerCase();
    const id = match[2];
    const lang = resolveLang(url.searchParams.get('lng'));

    // 봇 응답 엣지 캐시 확인 (보조 문구가 언어별로 달라 lang을 캐시 키에 포함)
    const cache = caches.default;
    const cacheKey = new Request(`${config.siteOrigin}${url.pathname.toLowerCase()}?og_lang=${lang}`);
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    // SPA 셸(index.html) 조회. '/'에는 Worker 라우트가 없으므로 재귀 호출이 발생하지 않는다.
    // 압축 응답은 HTMLRewriter가 파싱하지 못하므로 비압축(identity)을 명시한다.
    let shell: Response;
    try {
      shell = await fetchWithTimeout(`${config.siteOrigin}/`, {
        headers: { 'Accept-Encoding': 'identity' },
      });
    } catch {
      return passThrough(request);
    }
    if (!shell.ok) return passThrough(request);

    const meta =
      routeType === 'note'
        ? await buildNoteMeta(config, id, lang)
        : await buildUserMeta(config, id, lang);

    // API 실패/존재하지 않는 ID: OG 주입 없이 기본 셸을 응답 (SPA 폴백과 동일한 결과)
    if (!meta) {
      return new Response(shell.body, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const rewritten = new HTMLRewriter()
      .on('title', new TitleHandler(meta.title))
      .on('meta[name="description"]', new DescriptionHandler(meta.description))
      .on('head', new HeadInjector(buildOgBlock(meta)))
      .transform(shell);

    const response = new Response(rewritten.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': `public, max-age=${BOT_CACHE_TTL_SECONDS}`,
      },
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
} satisfies ExportedHandler<Env>;
