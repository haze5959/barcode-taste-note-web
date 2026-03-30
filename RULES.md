# BarNote Web - Project Rules & Guidelines

## 📌 Project Overview
이 프로젝트는 **BarNote** 앱의 공유 기능 웹페이지 및 서비스 운영 페이지(약관, 랜딩 등)를 제공하는 정적 웹 프로젝트입니다.

> BarNote는 바코드 인식 및 AI 라벨 스캔을 이용한 빠른 시음 노트 작성 모바일 앱입니다.

AI 어시스턴트는 작업 시작 전 반드시 이 문서를 숙지하고, 아래 명시된 기술 스택과 규칙을 준수하여 코드를 작성해야 합니다.

---

## 🛠 Tech Stack

| 항목 | 기술 |
|---|---|
| **Language** | TypeScript |
| **Frontend Framework** | React (with Vite) |
| **UI Component Library** | shadcn/ui |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 |
| **Package Manager** | npm (`--legacy-peer-deps` 필수) |
| **Build Tool** | Vite |
| **Deployment** | Cloudflare R2 (정적 호스팅) |
| **CI/CD** | GitHub Actions (main 브랜치 push 시 자동 배포) |
| **i18n** | i18next / react-i18next |

---

## 🚀 Core Features (제공 페이지)

| 페이지 | URL | 설명 |
|---|---|---|
| 랜딩 | `https://barnote.net` | 서비스 소개 및 앱 다운로드 유도 |
| 유저 노트 리스트 | `https://barnote.net/user/{user_id}` | 특정 유저의 시음 노트 목록 |
| 노트 디테일 | `https://barnote.net/note/{note_id}` | 개별 시음 노트 상세 보기 |
| 개인정보처리방침 | `https://barnote.net/privacy_policy` | Privacy Policy |
| 이용약관 | `https://barnote.net/terms_of_service` | Terms of Service |

---

## 📁 Folder Structure (폴더 구조)

```
src/
├── assets/          # 이미지, 폰트 등 정적 자원
├── components/      # 재사용 가능한 공통 UI 컴포넌트
│   └── ui/          # shadcn/ui 생성 컴포넌트 (수동 편집 지양)
├── pages/           # 라우트별 페이지 컴포넌트
│   ├── Home/
│   ├── UserNoteList/
│   ├── NoteDetail/
│   ├── PrivacyPolicy/
│   └── TermsOfService/
├── hooks/           # 커스텀 React 훅
├── types/           # TypeScript 인터페이스 및 타입 정의
├── lib/             # 유틸리티 함수 및 shadcn/ui 설정(utils.ts)
├── App.tsx          # 라우팅 설정
└── main.tsx         # 앱 진입점
```

---

## 🎨 UI & Styling 규칙

1. **shadcn/ui 우선:** UI 컴포넌트는 shadcn/ui에서 제공하는 컴포넌트를 우선적으로 사용합니다.
   - 컴포넌트 추가 시 `npx shadcn@latest add [component]` 명령어를 사용하세요.
   - `src/components/ui/` 하위 파일은 가급적 직접 편집하지 않습니다.
2. **Tailwind CSS 활용:** 레이아웃, 간격, 색상 등은 Tailwind 유틸리티 클래스를 사용합니다. 인라인 `style` 속성은 최소화합니다.
3. **브랜드 일관성:** 바노트 앱의 디자인 언어(색상, 폰트 등)와 일관성을 유지합니다. 브랜드 색상 등 디자인 토큰은 `tailwind.config.js`에 정의합니다.
4. **반응형 디자인:** 모바일 앱 연동 서비스 특성상 모바일 퍼스트(Mobile-First)로 개발합니다.

---

## 🌐 i18n (다국어 처리) 규칙

1. **i18next 사용:** 다국어 처리는 `i18next` 및 `react-i18next`를 사용합니다.
2. **JSON 기반 번역 파일:** `public/locales/{lang}/translation.json` 형식으로 번역 파일을 관리합니다.
3. **키 네이밍:** 의미가 명확한 계층형 키를 사용합니다. (예: `common.button.save`, `page.noteDetail.title`)
4. **Hardcoded Text 금지:** 모든 사용자 노출 텍스트는 번역 함수(`t()`)를 통해 출력합니다.
5. **언어 감지:** 브라우저 언어 감지(`i18next-browser-languagedetector`)를 기본으로 하며, 필요한 경우 유저가 수동으로 변경할 수 있도록 합니다.

---

## ⚙️ Coding Conventions (코딩 규칙)

1. **TypeScript 엄격 모드:** `any` 타입 사용을 금지하며, 명확한 인터페이스와 타입을 정의합니다.
2. **컴포넌트:** 함수형 컴포넌트만 사용합니다. 파일명과 컴포넌트명은 PascalCase를 따릅니다.
3. **훅:** 커스텀 훅은 `use` 접두사를 사용하고 `src/hooks/`에 위치합니다.
4. **타입 정의:** 공유되는 타입은 `src/types/`에 별도 파일로 관리합니다.
5. **모듈화:** 재사용 가능한 로직과 UI는 컴포넌트 및 훅으로 분리하여 유지보수성을 높입니다.
6. **Language:** 코드 내 주석, 커밋 메시지, Implementation Plan은 **한글(Korean)**로 작성합니다.

---

## 🚢 Build & Deployment (빌드 및 배포)

- **로컬 개발:** `npm run dev`
- **프로덕션 빌드:** `npm run build` (내부적으로 `tsc` 검증 포함)
- **배포:** `main` 브랜치에 push 시 GitHub Actions가 자동으로 Cloudflare R2에 배포합니다.
- **환경변수:** API URL 등 환경별 값은 `.env` 파일로 관리하며, 시크릿은 GitHub Repository Secrets에 등록합니다. `.env` 파일은 절대 커밋하지 않습니다.
- **SPA 라우팅:** Cloudflare R2 정적 호스팅에서 클라이언트 사이드 라우팅이 동작하도록 404 리다이렉트 설정이 필요합니다.

---

## 🤖 AI Assistant Guidelines (AI 작업 규칙)

1. **이 문서 우선:** 작업 시작 전 반드시 이 RULES.md를 읽고 기술 스택과 폴더 구조를 숙지합니다.
2. **기존 컴포넌트 재사용:** 새 UI를 만들기 전에 `src/components/`와 `src/components/ui/`에 이미 존재하는 컴포넌트를 확인합니다.
3. **점진적 작업:** 큰 변경 사항은 Implementation Plan을 먼저 작성하고 사용자에게 확인을 받은 후 진행합니다.
4. **타입 안전성:** 새로운 데이터 구조 도입 시 반드시 `src/types/`에 타입을 먼저 정의합니다.
5. **패키지 설치 시:** `npm install --legacy-peer-deps` 옵션을 반드시 사용합니다.
6. **환경변수 주의:** 시크릿이나 비공개 키는 코드에 하드코딩하지 않습니다.
