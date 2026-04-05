# Iterra Dev Log

## Purpose

이 문서는 `Iterra`의 주요 개발 이력을 append-only 형태로 기록한다.
현재 상태 요약은 [guide/current-status.md](./current-status.md), 다음 작업 큐는 [guide/next-queue.md](./next-queue.md)에서 관리한다.

## Logging Rules

- 시간대는 `Asia/Seoul`, 형식은 `YYYY-MM-DD HH:mm`를 사용한다.
- 의미 있는 구현, 검증, 디자인 전환, blocker 해소만 기록한다.
- 결과와 다음 행동이 보이도록 짧게 적는다.

## Latest Entries

| Time | Worker | Scope | Action | Result | Next | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-04-04 12:01 | codex | repo bootstrap | Iterra 기본 골격 구현 시작 | Next.js, Payload, route, collection 구조 생성 | 환경/실행 검증으로 이동 | completed |
| 2026-04-04 13:05 | codex | orchestration | 작업자 로스터와 호출 규칙 정리 | `worker_list.md` 정리 | 실제 분업 라운드 적용 | completed |
| 2026-04-04 13:44 | user | local runtime | Node 설치 완료 | `node -v` 기준 `v24.14.1` 확인 | 의존성 설치 | completed |
| 2026-04-04 13:44 | codex | local runtime | `npm.cmd install` 실행 | 의존성 설치 및 `package-lock.json` 생성 | `.env.local` 작성 및 DB 연결 | completed |
| 2026-04-04 14:21 | codex | database | Supabase 연결 문자열로 raw Postgres 테스트 | `select 1` 성공 | 앱 런타임 검증 | completed |
| 2026-04-04 14:21 | codex | build | `npm.cmd run build` 실행 | production build 성공 | dev 서버 및 admin 확인 | completed |
| 2026-04-04 14:23 | codex | runtime | `/`와 `/admin` 응답 확인 | 두 경로 모두 정상 응답 | lint 및 상태 문서 갱신 | completed |
| 2026-04-04 14:23 | codex | lint | `npm.cmd run lint` 실행 | 경고 없이 통과 | 기능/디자인 라운드로 이동 | completed |
| 2026-04-04 15:00 | nextjs-developer | app runtime | compile/type-check/HMR 관련 문제 정리 | Next config, rich text, import map, content 타입 문제 해소 | 디자인 라운드 시작 | completed |
| 2026-04-04 15:20 | backend-developer | payload | Payload 환경 및 publish 흐름 보강 | `publishedAt` 자동 보강, env 처리 정리 | 운영 검증 보강 | completed |
| 2026-04-05 18:40 | ui-designer + nextjs-developer + frontend-developer | site redesign | `voicebox-DESIGN.md` 기반 첫 번째 VoiceBox 리디자인 라운드 | VoiceBox 톤과 반응형 구조 반영 | 레퍼런스 이미지와의 차이 점검 | completed |
| 2026-04-05 19:05 | frontend-developer | responsive | 누락된 `voicebox-*` 반응형 클래스 보강 | 큰 화면에서도 모바일처럼 보이던 문제 해결 | 브라우저 시각 QA | completed |
| 2026-04-05 20:00 | codex + subagents | design review | 레퍼런스 이미지와 현재 홈 비교 | 현재 결과가 `VoiceBox-inspired`에 가깝고 spec 충실도는 부족하다는 판단 확정 | strict VoiceBox 기준으로 재정렬 | completed |
| 2026-04-05 20:25 | frontend-developer | typography | 한국어 중심 line-height와 rhythm 조정 | 큰 제목, rail, band, 카드 요약문의 줄간격 개선 | strict VoiceBox 정렬 계속 | completed |
| 2026-04-05 20:50 | documentation/browser/ui agents | design diagnosis | `voicebox-DESIGN.md`를 canonical spec으로 재해석 | red accent 과다, 카드성, 과한 타입 스케일, 장식성, border hierarchy 문제 정리 | strict patch 실행 | completed |
| 2026-04-05 21:10 | frontend-developer | strict VoiceBox patch | red accent 축소, gradient 제거, editorial list/band 강화 | CSS와 공용 컴포넌트 기준 stricter VoiceBox 반영 | layout/page 단순화 | completed |
| 2026-04-05 21:15 | nextjs-developer | strict VoiceBox patch | ticker 제거, hero/rail 반복 설명 감축, band 구조 단순화 | `layout.tsx`, `page.tsx` 기준으로 정보 밀도 축소 | lint/build 재검증 | completed |
| 2026-04-05 21:18 | codex | verification | `npm.cmd run lint`, `npm.cmd run build` 재실행 | 둘 다 통과, 남은 경고는 `getPayloadHMR` deprecation warning뿐 | browser-level visual QA | completed |

## Current Summary

- 런타임은 안정화된 상태다.
- 홈 화면은 stricter VoiceBox 방향까지 반영됐다.
- 남은 일은 기능 수정보다 시각 검증과 미세조정에 가깝다.
