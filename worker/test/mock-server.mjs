/**
 * Worker 로컬 검증용 mock 서버 (사이트 셸 + API 동시 모사)
 *
 * 사용법:
 *   node test/mock-server.mjs                 # 127.0.0.1:9876
 *   npx wrangler dev --port 8787 --local \
 *     --var API_BASE:http://127.0.0.1:9876 \
 *     --var SITE_ORIGIN:http://127.0.0.1:9876
 *
 * 캐시 검증: GET /__hits 로 경로별 요청 횟수를 조회할 수 있다.
 */
import http from 'node:http';

const PORT = 9876;

// 실제 프로덕션 API 응답을 그대로 본뜬 데이터
const NOTE_ID = '1f099a2b-813a-4ec9-94d5-ff269734becc';
const USER_ID = '15393554-817b-49bc-9784-c75363e00da7';
const MISSING_ID = '00000000-0000-0000-0000-000000000000';

const NOTE_RESPONSE = {
  result: true,
  data: {
    note: {
      id: NOTE_ID,
      body: '자몽같은 쓴맛이 적절히 올라와서   ipa를 좋아한다면\n무난히 즐길 수 있을만한 맥주',
      rating: 7,
      public_scope: 2,
    },
    product: { id: 'a6afb799-03de-4a70-abeb-6313db2c5b25', name: 'The Table Brewing "Once" & More', type: 2 },
    user: { id: USER_ID, nick_name: '바노트 관리자' },
    image_ids: ['bdef848b-f68f-4ece-949c-6c0c775def58'],
    product_image_id: null,
    flavors: [2],
  },
  error: null,
};

const USER_RESPONSE = {
  result: true,
  data: {
    user: {
      id: USER_ID,
      nick_name: '바노트 관리자',
      intro: '바노트를 관리합니다',
      image_id: '912d7134-a751-4060-8ef6-73d9d7ea04be',
    },
    note_count: 19,
    follower_count: 6,
  },
  error: null,
};

const INDEX_HTML = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="BarNote - 바코드 인식 AI 시음 노트 앱" />
    <title>BarNote</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-TEST.js"></script>
  </body>
</html>
`;

const hits = {};

const server = http.createServer((req, res) => {
  const path = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  hits[path] = (hits[path] ?? 0) + 1;

  const sendJson = (obj) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
  };

  if (path === '/__hits') return sendJson(hits);
  if (path === `/notes/${NOTE_ID}`) return sendJson(NOTE_RESPONSE);
  if (path === `/users/${USER_ID}`) return sendJson(USER_RESPONSE);
  if (path === `/notes/${MISSING_ID}` || path === `/users/${MISSING_ID}`) {
    return sendJson({ result: false, data: null, error: 'not found' });
  }
  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(INDEX_HTML);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`mock server ready on http://127.0.0.1:${PORT}`);
});
