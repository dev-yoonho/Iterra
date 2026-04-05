# Iterra Current Status

## Purpose

이 문서는 `Iterra`의 최신 개발 상태를 빠르게 파악하기 위한 운영 스냅샷이다.
상세 작업 이력은 [guide/dev-log.md](./dev-log.md), 다음 작업 큐는 [guide/next-queue.md](./next-queue.md)에서 관리한다.

## Snapshot

- Last updated: `2026-04-05 21:20`
- Phase: `strict VoiceBox alignment completed at implementation level`
- Overall status: `Next.js + Payload + Supabase 기반 구축과 런타임 검증은 완료됐고, 홈 화면은 voicebox-DESIGN.md를 canonical spec으로 재해석한 stricter VoiceBox 방향까지 반영됨`
- Current focus: `브라우저 실물 QA와 hero visual/header ratio 미세조정 여부 판단`

## Confirmed Working

- 저장소는 `Next.js + Payload CMS + PostgreSQL(Supabase) + Vercel` 전제를 기준으로 구성되어 있다.
- `Node.js v24.14.1` 환경에서 `npm.cmd install`이 완료되었고 `package-lock.json`이 생성되어 있다.
- `.env.local`이 작성되어 있고 `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`이 연결된 상태다.
- Supabase 연결 문자열로 raw Postgres 연결 테스트가 성공했다.
- `npm.cmd run dev`, `npm.cmd run lint`, `npm.cmd run build`가 모두 성공한다.
- 로컬에서 `/`와 `/admin`은 정상 응답했고, Payload 관리자 로그인도 완료됐다.
- Payload 쪽 `development`, `career`, `life` 컬렉션과 `site-settings`, `home-sections`, `agent-signals` 글로벌 구성이 존재한다.
- 공개 사이트와 Payload 관리자 레이아웃은 분리되어 있다.

## Design State

- 초기 흙/지도/기록물 톤에서 출발했으나, 현재는 [voicebox-DESIGN.md](../voicebox-DESIGN.md)를 canonical spec으로 보고 홈 화면과 공용 UI를 stricter VoiceBox 방향으로 재정렬했다.
- 반영된 핵심은 다음과 같다.
  - 얇은 editorial header와 더 단호한 front-page hero 구조
  - red accent 사용 범위 축소
  - gradient/장식성 완화
  - `section + cards` 느낌을 줄이고 editorial band/list 쪽으로 이동
  - 한국어 line-height, `text-wrap`, `word-break: keep-all` 보정
- 현재 구현은 이전의 `VoiceBox-inspired Iterra`보다 `spec-conformant Iterra`에 더 가깝다.

## Runtime And Verification

- 최신 기준으로 `lint`와 `build`는 모두 통과한다.
- 빌드 시 남아 있는 경고는 `getPayloadHMR` deprecation warning뿐이다.
- 런타임 병목이었던 포트 충돌, HMR origin, Payload import/type 문제는 정리됐다.

## Known Issues

- [src/lib/payload.ts](../src/lib/payload.ts)에서 `getPayloadHMR`를 쓰고 있어 deprecation warning이 계속 출력된다.
- 브라우저 수준의 최종 시각 QA는 아직 남아 있다.
- strict VoiceBox 기준에서 남은 차이는 기능 문제가 아니라 시각 미세조정 영역이다.
  - hero visual 인상
  - header 비율
  - rail 밀도

## Current Risks

- 브라우저에서 실제 viewport별 인상 차이가 남아 있을 수 있다.
- 콘텐츠가 더 많이 들어오면 front-page band와 archive density를 다시 손봐야 할 수 있다.
- Giscus 실운영 검증은 환경변수와 GitHub Discussions 구성 상태에 따라 별도 확인이 필요하다.

## Immediate Next Actions

1. 데스크탑, 태블릿, 모바일에서 홈 화면과 컬렉션 화면의 browser-level visual QA를 진행한다.
2. 필요하면 hero visual과 header ratio를 좁게 미세조정한다.
3. 게시글 생성/수정/발행 흐름을 실제 콘텐츠로 다시 검증한다.
4. `getPayloadHMR` deprecation warning 정리를 별도 작업으로 수행한다.

## References

- [guide/dev-log.md](./dev-log.md)
- [guide/next-queue.md](./next-queue.md)
- [guide/voicebox-implementation-plan.md](./voicebox-implementation-plan.md)
- [guide/payload-cms-audit.md](./payload-cms-audit.md)
- [README.md](../README.md)

## Assumptions

- 초기 배포 대상은 `Vercel`이다.
- 데이터베이스는 `Supabase Postgres`를 계속 사용한다.
- 다음 우선순위는 새 기능 추가보다 운영 검증과 시각 완성도 확보다.
