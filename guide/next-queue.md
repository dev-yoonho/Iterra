# Iterra Next Queue

## Purpose

이 문서는 다음 라운드에서 무엇을 먼저 처리해야 하는지 빠르게 보기 위한 실행 큐다.
현재 상태는 [guide/current-status.md](./current-status.md), 상세 이력은 [guide/dev-log.md](./dev-log.md)를 기준으로 이어간다.

## Priority Scale

- `P0`: 즉시 막히는 일
- `P1`: 현재 라운드에서 바로 처리할 일
- `P2`: 검증 이후 이어갈 일
- `P3`: 후속 개선

## Now

| Priority | Task | Owner | Depends on | Done when |
| --- | --- | --- | --- | --- |
| P1 | 브라우저 기준 홈 화면 visual QA | user + codex | 현재 strict VoiceBox 패치 반영 | 데스크탑/태블릿/모바일에서 인상 차이와 깨짐 여부 확인 |
| P1 | hero visual, header ratio 미세조정 여부 판단 | user + codex | visual QA | 첫 번째 레퍼런스 대비 남는 차이를 구체 selector 수준으로 정리 |
| P1 | 관리자에서 실제 게시글 생성/수정/발행 재검증 | user + codex | Payload 로그인 가능 상태 | 컬렉션/상세/아카이브에 실제 콘텐츠 반영 확인 |

## Next

| Priority | Task | Owner | Depends on | Done when |
| --- | --- | --- | --- | --- |
| P1 | `getPayloadHMR` deprecation warning 제거 | codex | 현재 build 안정 상태 | build 시 warning 제거 |
| P2 | Giscus 실운영 연결 검증 | user + codex | GitHub Discussions 구성, env 입력 | 글 상세에서 댓글 스레드 정상 노출 |
| P2 | 첫 번째 seed 콘텐츠 입력 | user | 관리자 publish 흐름 확인 | `development`, `career`, `life` 각 1개 이상 게시글 존재 |

## Later

| Priority | Task | Owner | Depends on | Done when |
| --- | --- | --- | --- | --- |
| P2 | 접근성 QA | accessibility-tester | visual QA 완료 | 주요 페이지의 명확한 이슈 목록 확보 |
| P2 | 성능 점검 | performance-engineer | 실제 콘텐츠와 이미지 입력 | 이미지/스크립트 병목 식별 |
| P3 | AI agent 존재감 설계 | ai-engineer | 운영 흐름 안정화 | Iterra 세계관 안에서 AI 기능 경계 정의 |

## Blocked

| Blocker | Blocking tasks | Unblock action | Owner |
| --- | --- | --- | --- |
| Giscus 운영 값 미입력 시 댓글 실검증 불가 | 댓글 기능 확인 | GitHub Discussions와 env 값 입력 | user |

## Completed Recently

| Time | Item |
| --- | --- |
| 2026-04-05 20:25 | 한국어 중심 typography rhythm 보정 완료 |
| 2026-04-05 21:10 | strict VoiceBox CSS/공용 컴포넌트 패치 완료 |
| 2026-04-05 21:15 | ticker 제거 및 hero/band 구조 단순화 완료 |
| 2026-04-05 21:18 | lint/build 재검증 통과 |

## Fast Checklist

- [ ] 홈 화면을 실제 브라우저에서 새로고침 후 확인
- [ ] hero visual과 header 비율이 아직 어색한지 판단
- [ ] 관리자에서 게시글 하나를 실제로 발행
- [ ] 필요하면 다음 라운드에서 selector 단위 미세조정
