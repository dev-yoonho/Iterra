# Iterra 로컬 실행 및 배포 체크리스트

## 현재 상태

확인된 사실:

- 현재 환경에는 `Node.js`가 설치되어 있지 않아 `npm install`, `npm run dev`, `npm run build`를 실행할 수 없다.
- [package.json](../package.json)에서 `Node >= 20.9.0`을 요구한다.
- 저장소에는 아직 `package-lock.json`이 없고, `payload` 계열 의존성이 `latest`로 열려 있어 첫 설치 결과가 가변적이다.
- [src/lib/payloadEnv.ts](../src/lib/payloadEnv.ts) 기준으로 운영 환경에서는 `DATABASE_URL`과 `PAYLOAD_SECRET`가 없으면 Payload가 시작되지 않는다.
- [src/components/site/GiscusComments.tsx](../src/components/site/GiscusComments.tsx) 기준으로 Giscus 값이 비어 있어도 공개 페이지는 placeholder로 동작한다.

판단이 필요한 가정:

- 배포 대상은 `Vercel`, 운영 데이터베이스는 `Supabase Postgres`를 사용한다.
- 로컬 개발은 `로컬 PostgreSQL` 또는 `Supabase 연결` 둘 중 하나를 선택한다.

## 가장 먼저 막힐 지점

1. 즉시 막힘: `Node.js` 미설치
2. 그 다음 리스크: 첫 `npm install`이 가변적임
3. 배포 시점 리스크: Vercel 환경에 맞는 Supabase 연결 방식 미선택

정리하면, 가장 먼저 해야 할 일은 `Node 20.9+ 설치`이고, 그 다음은 `의존성 고정(package-lock.json 생성 및 커밋)`이다.

## 필요한 Node 버전

- 최소 요구 버전: `20.9.0`
- 권장 기준: `20.9.0 이상 LTS`

근거:

- [package.json](../package.json)의 `engines.node`
- Next.js 공식 문서의 최소 Node 버전 요구사항

## .env.local 항목

필수:

- `DATABASE_URL`
  - 로컬 PostgreSQL을 쓸 경우 예시: `postgresql://postgres:postgres@127.0.0.1:5432/iterra`
  - Supabase를 쓸 경우 대시보드의 연결 문자열 사용
- `PAYLOAD_SECRET`
  - 충분히 긴 랜덤 문자열
- `NEXT_PUBLIC_SERVER_URL`
  - 로컬: `http://localhost:3000`
  - 운영: 실제 커스텀 도메인 또는 Vercel 프로덕션 URL

선택:

- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

권장 예시:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/iterra
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

## Supabase 연결 전략

로컬 개발:

- 가장 단순한 선택은 `로컬 PostgreSQL`이다.
- 로컬에서 바로 Supabase를 붙일 수도 있다.
- Supabase direct connection은 기본적으로 `IPv6` 기반이다.
- 로컬 네트워크가 IPv6를 지원하지 않으면 `Supavisor session mode`를 쓰는 편이 안전하다.

Vercel 배포:

- Vercel은 서버리스 성격의 짧은 연결이 많아진다.
- Supabase 공식 문서 기준으로 이런 경우는 `transaction mode` pooler가 맞다.
- 따라서 Vercel의 `DATABASE_URL`은 우선 `Supavisor transaction mode (port 6543)`를 기준으로 잡는 것이 안전하다.

환경별 권장:

- Development: 로컬 PostgreSQL 또는 Supabase session mode
- Preview: Supabase transaction mode
- Production: Supabase transaction mode

주의:

- transaction mode는 prepared statements를 지원하지 않는다.
- 현재 코드에서는 node-postgres 계열 기본 연결을 사용하고 있으며, 별도 prepared statement 설정은 보이지 않는다.
- 이 부분은 실제 첫 배포 후 DB 연결 로그로 한 번 확인해야 한다.

## 로컬 실행 체크리스트

1. `Node.js 20.9+` 설치
2. `node -v`, `npm -v` 확인
3. `npm install` 실행
4. 생성된 `package-lock.json`을 커밋 대상으로 포함
5. `.env.example`를 `.env.local`로 복사
6. `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` 입력
7. `npm run dev` 실행
8. `http://localhost:3000` 접속 확인
9. `http://localhost:3000/admin` 접속 확인
10. 첫 관리자 계정 생성 확인
11. 관리자에서 draft 문서 1개 생성 확인

정상 경로 확인:

- `/` 렌더링
- `/admin` 렌더링 및 로그인
- 콘텐츠 생성 후 목록/상세 반영

실패 경로 확인:

- `DATABASE_URL`이 비어 있을 때 Payload가 명확하게 실패하는지 확인

복구 경로 확인:

- `.env.local` 수정 후 dev 서버 재시작으로 복구 가능한지 확인

## Vercel 배포 체크리스트

1. 저장소 연결
2. Preview 배포부터 실행
3. 환경변수 입력
4. `DATABASE_URL`
5. `PAYLOAD_SECRET`
6. `NEXT_PUBLIC_SERVER_URL`
7. 필요 시 Giscus 4개 변수 추가
8. Production과 Preview에 값을 분리해서 저장
9. 첫 Preview 배포 완료 후 `/` 확인
10. `/admin` 확인
11. DB 읽기 확인
12. 관리자 로그인 또는 최초 사용자 생성 흐름 확인
13. 문제 없을 때 Production 배포

운영 시 확인할 것:

- Preview와 Production이 서로 다른 `NEXT_PUBLIC_SERVER_URL`을 갖는지
- DB 자격증명을 Preview와 Production에서 분리할지 여부
- 롤백 시 이전 정상 배포로 되돌릴 수 있는지

## 배포 전 가장 작은 안전 조치

이번 점검에서 바로 반영한 조치:

- [package.json](../package.json)의 기본 `dev` 스크립트는 plain `next dev`로 유지한다.
- `--no-server-fast-refresh`가 필요한 비교 실험용으로 `dev:payload` 스크립트를 별도로 둔다.

이유:

- 현재 로컬 브라우저에서는 `/_next/webpack-hmr` WebSocket handshake 실패가 반복 수집됐다.
- 이 증상은 UI hydration mismatch보다 dev HMR 레이어 문제로 보는 편이 더 타당하다.
- 그래서 기본 개발 경로는 HMR 안정성을 우선하고, Payload 권장 workaround는 fallback 경로로 분리하는 편이 더 안전하다.

## 우선순위

1. Node 설치
2. `npm install`
3. lockfile 생성 및 커밋
4. `.env.local` 작성
5. 로컬 dev 부팅
6. `/admin` 최초 사용자 생성
7. Preview 배포
8. Production 배포

## 참고 링크

- Next.js 설치 및 최소 Node 요구사항: https://nextjs.org/docs/app/getting-started/installation
- Next.js CLI 옵션: https://nextjs.org/docs/app/api-reference/cli/next
- Vercel 환경변수: https://vercel.com/docs/environment-variables
- Supabase 연결 문자열 가이드: https://supabase.com/docs/reference/postgres/connection-strings
