# BarNote OG 메타태그 주입 Worker

소셜 크롤러(카카오톡·페이스북·X·슬랙 등)는 JS를 실행하지 않아 SPA가 동적으로
설정하는 og/twitter 메타태그를 읽지 못합니다. 이 Worker는 `/note/:id`,
`/user/:id` 요청 중 **크롤러(봇) User-Agent만** 골라 API 데이터를 조회한 뒤
`index.html`의 `<head>`에 OG 태그를 주입해 응답합니다.

- **일반 사용자**: 원본(R2)으로 그대로 통과 → 추가 지연 없음
- **봇**: API 조회 + 태그 주입 (엣지 캐시 5분, 같은 링크 연속 공유 시 API 재호출 없음)
- **API 실패/없는 ID**: 기본 index.html 그대로 응답 (현재 동작과 동일)

## 주입되는 태그

`og:type` `og:site_name` `og:url` `og:title` `og:description` `og:image`
`twitter:card` `twitter:title` `twitter:description` `twitter:image`
(+ `<title>`, `meta[name=description]` 교체)

| 경로 | title | description | image |
|---|---|---|---|
| `/note/:id` | `⭐️{별점(5점 만점)} - {제품명}` | 노트 본문 (200자) | 노트 첫 이미지 → 제품 이미지 → 기본 아이콘 |
| `/user/:id` | `{닉네임} - 작성 노트 \| BarNote` | 소개 · 노트 N · 팔로워 N | 프로필 이미지(`/images/profile/`) → 기본 아이콘 |

보조 문구(테이스팅 노트, 팔로워 등)는 공유 URL의 `?lng=` 파라미터가 `ko`면
한국어, 그 외에는 영어로 표기됩니다. (사용자 콘텐츠는 원문 그대로)

## 배포

```bash
cd worker
npm install
npx wrangler login    # 최초 1회, barnote.net zone이 있는 Cloudflare 계정
npx wrangler deploy
```

`wrangler.toml`의 routes(`barnote.net/note/*`, `barnote.net/user/*`)에만
Worker가 연결되며, 그 외 경로는 Worker를 거치지 않습니다.

## 로컬 테스트

로컬 workerd는 환경에 따라 Cloudflare 프록시 도메인(barnote.net 계열)으로의
외부 fetch가 막힐 수 있어, **mock 서버로 사이트 셸과 API를 모사**해 테스트합니다.

```bash
# 터미널 1: mock 서버 (사이트 셸 + API, 127.0.0.1:9876)
node test/mock-server.mjs

# 터미널 2: mock을 가리키는 Worker
npx wrangler dev --port 8787 --local \
  --var "API_BASE:http://127.0.0.1:9876" \
  --var "SITE_ORIGIN:http://127.0.0.1:9876"

# 봇 UA로 요청하면 OG 태그가 주입된 HTML이 반환됩니다.
curl -s -A "facebookexternalhit/1.1" \
  "http://localhost:8787/note/1f099a2b-813a-4ec9-94d5-ff269734becc?lng=ko" | grep og:

# 캐시 검증: 같은 요청을 반복해도 mock API 히트 수가 늘지 않아야 합니다.
curl -s http://127.0.0.1:9876/__hits
```

> 주의: 로컬 dev에서 **일반(비봇) UA 요청은 pass-through가 자기 자신으로 재귀**하여
> 루프 가드(508)에 걸립니다. 로컬에서는 봇 UA로만 테스트하세요.
> 프로덕션에서는 same-zone 요청이 Worker를 다시 거치지 않고 원본(R2)으로 직행하므로
> 일반 사용자는 기존과 완전히 동일하게 동작합니다.

## 배포 후 확인 & 캐시 갱신

- 카카오톡 미리보기 캐시 초기화: https://developers.kakao.com/tool/debugger/sharing
- 페이스북: https://developers.facebook.com/tools/debug/
- 직접 확인: `curl -s -A "facebookexternalhit/1.1" "https://barnote.net/note/{id}" | grep og:`
