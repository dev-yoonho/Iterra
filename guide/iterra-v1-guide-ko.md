# Iterra v1 구현 가이드

## 개요

`Iterra`는 개발 기록, 커리어 아카이브, 일상 노트를 함께 담는 개인 사이트입니다.  
기본 언어는 한국어이며, 디자인은 `에디토리얼`, `흙/지도/기록물`, `여정`의 감성을 중심으로 잡았습니다.

이 프로젝트는 다음 기준으로 구성되어 있습니다.

- 메인 프레임워크: `Next.js App Router`
- CMS: `Payload self-host`
- 데이터베이스: `Supabase PostgreSQL` 또는 일반 `PostgreSQL`
- 배포: `Vercel`
- 댓글: `Giscus`
- AI 확장: 초기에는 별도 Python 서버 없이 `Next.js` 내부 서비스 계층만 준비

## 폴더 구조

주요 구조는 아래와 같습니다.

- `src/app/(site)` : 공개 사이트 페이지
- `src/app/(payload)` : Payload 관리자와 API 라우트
- `src/collections` : 개발/커리어/일상 컬렉션과 보조 컬렉션
- `src/globals` : 사이트 설정, 홈 섹션, 에이전트 흔적
- `src/lib` : Payload 접근, 콘텐츠 정규화, AI 확장용 유틸
- `src/components/site` : 공개 페이지용 UI 컴포넌트

## 콘텐츠 모델

### 컬렉션

- `development-posts`
- `career-posts`
- `life-posts`
- `tags`
- `media`
- `users`

### 글로벌

- `site-settings`
- `home-sections`
- `agent-signals`

### 공통 필드

세 종류의 글은 아래 필드를 공통으로 사용합니다.

- 제목
- 슬러그
- 한 줄 요약
- 커버 이미지
- 발행일
- 상태(`draft` / `published`)
- 태그
- SEO 정보
- 본문

## 디자인 의도

사이트는 과하게 화려한 랜딩 페이지보다, 차분하게 쌓여 가는 기록물의 세계에 가깝게 설계되어 있습니다.

- 메인 톤은 종이, 흙, 잉크, 이끼 계열 색감
- 한국어 읽기 경험을 고려해 본문과 제목 서체를 분리
- 에이전트는 대놓고 등장하지 않고 흔적처럼 배치
- 인터랙션은 풍부하지만 독서를 방해하지 않도록 제한

## 환경 변수

필수 환경 변수는 아래와 같습니다.

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`

Giscus를 쓰려면 아래 값도 필요합니다.

- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## 시작 순서

1. `Node.js 20.9+` 설치
2. `npm install`
3. `.env.example`를 `.env.local`로 복사
4. PostgreSQL 또는 Supabase 연결 정보 입력
5. `npm run dev`
6. `/admin`에서 첫 관리자 계정 생성
7. `site-settings`, `home-sections`, `agent-signals` 입력
8. 각 컬렉션에 첫 글 작성

## 이후 확장 방향

v1 이후에는 아래 방향으로 확장하기 좋게 설계되어 있습니다.

- AI API를 붙여 글 요약/추천/에이전트 응답 추가
- 필요 시 `FastAPI`를 별도 서비스로 분리
- 검색 고도화
- 프로젝트 맵/타임라인 시각화
- 에이전트 흔적을 실제 상호작용으로 확장

## 현재 주의사항

- 이 저장소는 지금 막 생성된 구조라서, 실제 실행 전에는 `npm install`이 필요합니다.
- 현재 환경에서 `Node.js`가 설치되어 있지 않다면 개발 서버와 린트는 바로 실행되지 않습니다.
- Payload 타입 파일과 import map은 설치 후 `npm run generate:types`, `npm run generate:importmap`으로 갱신하는 것을 권장합니다.

