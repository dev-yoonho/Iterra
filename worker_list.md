# Iterra Worker List

`Iterra`는 `Next.js + Payload CMS + PostgreSQL(Supabase) + Vercel` 기반의 개인 사이트다.  
이 문서는 전체 작업자 카탈로그가 아니라, 이 프로젝트에서 실제로 설치하고 운영할 가치가 있는 작업자만 추린 전용 목록이다.

## 1. 기본 설치 로스터

아래 10개는 거의 모든 작업 흐름에서 기본값으로 고려한다.

| Worker | 주 역할 | 이 프로젝트에서 중요한 이유 |
| --- | --- | --- |
| `agent-organizer` | 작업 분해, 병렬 배치, 결과 취합 | 앞으로 서브에이전트 운영을 기본 전략으로 가져갈 것이므로 가장 먼저 필요하다. |
| `nextjs-developer` | App Router, route groups, metadata, server/client 경계 | 현재 공개 사이트의 중심 프레임워크가 Next.js이므로 가장 자주 호출된다. |
| `frontend-developer` | 페이지 구현, 반응형, 인터랙션, 컴포넌트 마감 | 홈, 아카이브, 상세, 프로젝트 페이지를 계속 다듬어야 한다. |
| `ui-designer` | 시각 언어, 타이포, 모션, 분위기 설계 | `Iterra`의 차별점은 기능만이 아니라 분위기와 세계관에도 있다. |
| `backend-developer` | Payload 컬렉션, globals, access control, API route | 보이는 화면보다 콘텐츠 모델과 CMS 구조가 장기적으로 더 중요하다. |
| `postgres-pro` | PostgreSQL/Supabase 스키마, 인덱스, 마이그레이션 판단 | 글, 태그, 미디어, 글로벌 설정이 늘수록 DB 구조 판단이 중요해진다. |
| `typescript-pro` | 타입 안정성, Payload/Next 경계 타입 정리 | 컬렉션 스키마와 프론트 정규화 타입이 계속 교차하므로 필요하다. |
| `deployment-engineer` | Vercel 배포, 환경변수, 빌드/운영 설정 | 개인 사이트라도 배포 흐름이 흔들리면 전체 작업 효율이 떨어진다. |
| `reviewer` | correctness, regression, 누락 테스트 검수 | 병렬 작업 후 마지막 안전장치 역할을 맡긴다. |
| `documentation-engineer` | 가이드, 운영 문서, CMS 사용 문서 정리 | 시간이 지나도 다시 이해할 수 있는 프로젝트로 유지하기 위해 필요하다. |

## 2. 조건부 설치 로스터

아래 작업자들은 항상 필요하지는 않지만, 특정 작업 구간에서 효율이 매우 높다.

| Worker | 설치/호출 시점 | 이유 |
| --- | --- | --- |
| `accessibility-tester` | UI 개편 직후, 공개 전 품질 점검 시 | 공개 사이트의 완성도를 높이는 데 직접적이다. |
| `browser-debugger` | hydration, 브라우저별 렌더링, Giscus 문제 등 재현이 필요할 때 | 실제 브라우저 동작 확인이 필요한 문제에 강하다. |
| `ui-fixer` | 작은 UI 회귀나 레이아웃 깨짐을 빠르게 봉합할 때 | 큰 리팩터 없이 최소 수정으로 고치기에 좋다. |
| `security-auditor` | 관리자 auth, secrets, 외부 API 연동을 만질 때 | Payload admin과 공개 API를 같이 다루는 구조라 보안 검토 가치가 높다. |
| `performance-engineer` | 이미지, 폰트, 아카이브 탐색, 페이지 로딩이 무거워질 때 | 콘텐츠 사이트는 체감 성능이 곧 품질이다. |
| `ai-engineer` | 실제 AI 기능, 에이전트, 추천/요약 기능을 붙이기 시작할 때 | v1 이후 본격적인 AI 확장용 핵심 작업자다. |
| `prompt-engineer` | 에이전트 말투, 응답 구조, 세계관 반영 품질이 중요해질 때 | Iterra의 AI는 기능뿐 아니라 캐릭터와 톤도 중요할 가능성이 높다. |
| `docs-researcher` | Next.js, Payload, Supabase 공식 문서 검증이 필요할 때 | 버전 변화가 있는 프레임워크를 다룰 때 실수를 줄여 준다. |

## 3. 작업 유형별 호출 규칙

이 섹션은 앞으로 실제 작업 분배의 기본 규칙으로 사용한다.

### A. 새 페이지 추가 또는 UI 대규모 수정

- 기본 조합: `agent-organizer` + `nextjs-developer` + `frontend-developer`
- 디자인 방향이 중요하면: `ui-designer` 추가
- 마감 전: `reviewer`

적용 예시:
- 홈 개편
- 아카이브 UI 변경
- 프로젝트 쇼케이스 추가
- About 페이지 리디자인

### B. Payload 컬렉션 / 글로벌 / 관리자 구조 변경

- 기본 조합: `agent-organizer` + `backend-developer` + `typescript-pro`
- DB 영향이 있으면: `postgres-pro` 추가
- 보안 영향이 있으면: `security-auditor` 추가
- 마감 전: `reviewer`

적용 예시:
- 새 컬렉션 추가
- 태그 구조 변경
- 글로벌 설정 확장
- 관리자 권한 정책 수정

### C. 공개 페이지와 CMS 데이터 연결 작업

- 기본 조합: `agent-organizer` + `nextjs-developer` + `backend-developer`
- 타입 정리 비중이 크면: `typescript-pro` 추가
- 마감 전: `reviewer`

적용 예시:
- 상세 페이지에 새 메타데이터 노출
- 아카이브 필터와 Payload 데이터 연결
- 프로젝트 페이지와 featured 필드 연결

### D. 작은 UI 버그 또는 시각적 깨짐 수정

- 빠른 수정이 목적이면: `ui-fixer`
- 원인 파악이 필요하면: `frontend-developer`
- 브라우저 재현이 필요하면: `browser-debugger`

적용 예시:
- 모바일 레이아웃 깨짐
- 특정 페이지 간격 이상
- Giscus iframe 표시 문제

### E. 배포 / 환경변수 / 운영 설정 작업

- 기본 조합: `agent-organizer` + `deployment-engineer`
- Next.js 빌드 이슈가 섞이면: `nextjs-developer`
- 비밀키/권한이 얽히면: `security-auditor`
- 마감 전: `reviewer`

적용 예시:
- Vercel 환경변수 정리
- Supabase 연결 점검
- 프로덕션 배포 실패 원인 분석

### F. 성능 개선 작업

- 기본 조합: `agent-organizer` + `performance-engineer`
- 페이지 구조 개선이 필요하면: `nextjs-developer` + `frontend-developer`
- 마감 전: `reviewer`

적용 예시:
- 이미지 최적화
- 폰트 로딩 개선
- 아카이브 검색/필터 체감 속도 개선

### G. AI 기능 / 에이전트 기능 추가

- 기본 조합: `agent-organizer` + `ai-engineer` + `backend-developer`
- UI 노출이 있으면: `nextjs-developer` + `frontend-developer`
- 응답 톤/세계관이 중요하면: `prompt-engineer`
- 저장 구조가 생기면: `postgres-pro`
- 마감 전: `reviewer`

적용 예시:
- 글 요약
- 추천 태그
- 에이전트 상태 표시
- 세계관형 보조 인터랙션

### H. 문서화 / 운영 가이드 / 사용법 정리

- 기본 조합: `documentation-engineer`
- 버전 검증이 필요하면: `docs-researcher`
- 사용자 흐름 문서면: `agent-organizer`와 함께 구조화

적용 예시:
- 설치 문서
- CMS 작성 가이드
- 배포 체크리스트
- 에이전트 운영 룰북

### I. 릴리스 전 최종 검수

- 기본 조합: `reviewer`
- UI 품질 점검: `accessibility-tester`
- 성능 점검: `performance-engineer`
- 보안 점검: `security-auditor`

이 단계에서는 구현보다 검수가 우선이다.

## 4. 기본 제외 로스터

아래 작업자들은 이름만 보면 유용해 보일 수 있지만, 현재 `Iterra` 기본 운영 세트에는 포함하지 않는다.

| Worker | 기본 제외 이유 |
| --- | --- |
| `fullstack-developer` | 역할 범위가 너무 넓어서 분업 기준이 흐려진다. |
| `react-specialist` | `nextjs-developer`와 `frontend-developer`가 대부분 커버한다. |
| `sql-pro` | 이 프로젝트는 범용 SQL보다 PostgreSQL/Supabase 맥락이 더 중요하다. |
| `devops-engineer` | 현재는 복잡한 CI/CD보다 Vercel 중심 운영이 핵심이다. |
| `multi-agent-coordinator` | 현재 단계에서는 `agent-organizer` 하나로 충분하다. |
| `microservices-architect` | 지금은 단일 Next.js 중심 구조가 더 적절하다. |
| `graphql-architect` | GraphQL 중심 계획이 아직 없다. |
| `kubernetes-specialist` | 개인 사이트 초반 구조에 비해 너무 무겁다. |
| `mlops-engineer` | 자체 모델 서빙이나 학습 파이프라인 운영 계획이 없다. |
| `seo-specialist` | 나중에 공개 콘텐츠가 충분히 쌓이면 추가 검토한다. |

## 5. 권장 설치 순서

처음부터 전부 설치하지 말고 아래 순서로 늘리는 것을 권장한다.

1. `agent-organizer`
2. `nextjs-developer`
3. `frontend-developer`
4. `backend-developer`
5. `ui-designer`
6. `typescript-pro`
7. `postgres-pro`
8. `reviewer`
9. `deployment-engineer`
10. `documentation-engineer`

그 다음은 필요 시 아래 순서로 추가한다.

1. `accessibility-tester`
2. `browser-debugger`
3. `performance-engineer`
4. `security-auditor`
5. `ai-engineer`
6. `prompt-engineer`
7. `docs-researcher`

## 6. 현재 권장 기본 세트

지금 당장 설치 추천하는 기본 세트는 아래 10개다.

- `agent-organizer`
- `nextjs-developer`
- `frontend-developer`
- `ui-designer`
- `backend-developer`
- `postgres-pro`
- `typescript-pro`
- `deployment-engineer`
- `reviewer`
- `documentation-engineer`
