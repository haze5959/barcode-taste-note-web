# Barnote Web

## 💡 개요
Barnote 웹페이지입니다.
- 제공 기능
	- 노트 리스트
		- https://barnote.net/user/{id}
	- 노트 디테일
		- https://barnote.net/note/{id}
	- 온보딩 페이지
		- https://barnote.net
	- PrivacyPolicy
		- https://barnote.net/privacy_policy
	- TermsOfService
		- https://barnote.net/terms_of_service- 

## 🤖 AI 에이전트 사용법
"RULES.md를 먼저 읽고 시작해줘" 한마디 하고 시작!

## 🚀 시작하기

### 1. 패키지 설치
이 프로젝트는 의존성 검사를 우회하기 위해 `--legacy-peer-deps` 옵션을 필수로 사용해야 합니다.

```bash
npm install --legacy-peer-deps
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 프로덕션 빌드
운영 환경 배포를 위한 최적화된 결과물(dist)을 생성합니다. 내부적으로 TypeScript 컴파일 검증(`tsc`)을 포함합니다.

```bash
npm run build
```