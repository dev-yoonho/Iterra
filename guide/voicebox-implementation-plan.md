# VoiceBox Strict Audit

기준 문서: `voicebox-DESIGN.md`  
대상: 현재 Iterra 홈 구현  
목적: "비슷한 분위기"가 아니라 `voicebox-DESIGN.md`를 더 엄격하게 적용했을 때 어디가 어긋나는지 짧고 구체적으로 정리

## 1. Typography Scale / Line-height

- 현재 히어로 타이틀은 `Display 56px / 1.05` 기준보다 훨씬 공격적으로 커져 있습니다. [page.tsx](C:/Users/josep/OneDrive/Desktop/Iterra/src/app/(site)/page.tsx)의 메인 `h1`은 전면 기사형 리듬보다 "포스터형"에 가깝고, [globals.css](C:/Users/josep/OneDrive/Desktop/Iterra/src/app/globals.css)의 `.front-page-story h1`도 `clamp(4.4rem, 8vw, 8rem)`과 `line-height: 0.96`로 너무 과합니다.
- 서브헤드와 본문도 VoiceBox 표준보다 커스텀 값이 많습니다. `.front-page-story__dek`, `.front-page-band__heading h2`, `.front-page-band__column h3`, `.post-card h3`가 각자 다른 크기와 line-height를 써서 한 페이지 안에서 타입 스케일이 퍼져 보입니다.
- `voicebox-DESIGN.md`의 기준은 `Display / Headline / Subhead`와 `Body / Caption / Overline`의 제한된 계층인데, 현재 구현은 headline 계열만 여러 단계로 쪼개져 있어 첫 번째 레퍼런스의 단호한 리듬이 깨집니다.

## 2. Red Accent Usage

- VoiceBox 원칙은 "한 viewport에 red는 하나의 칼날처럼"인데, 현재는 빨간색이 동시에 여러 군데 살아 있습니다.
- 중복 지점:
  - 히어로 rubric bar: `.front-page-story__rubric`
  - 내비 hover / active underline: `.site-nav__link:hover`
  - 우측 rail CTA 전체 배경: `.front-page-rail__cta`
  - 카드/이미지 상단 accent: `.post-card__image::before`
  - 일부 kind/cta 텍스트 accent: `.post-card__kind--development`, `.post-card__cta::after`
- 결과적으로 첫 번째 레퍼런스처럼 "한 군데만 강하게 찌르는 red"가 아니라, 페이지 전체에 accent가 흩어져 보입니다.

## 3. Border Weight / Surface Hierarchy

- VoiceBox는 flat하지만 `Border Subtle / Medium / Strong`로 층위를 나눕니다. 현재 구현은 `2px solid #0A0A0A`를 너무 광범위하게 써서 모든 표면이 같은 무게로 보입니다.
- 특히 [globals.css](C:/Users/josep/OneDrive/Desktop/Iterra/src/app/globals.css)에서 히어로, 밴드, 카드, 이미지 박스, 버튼이 거의 모두 같은 강도의 검은 보더를 쓰고 있어 "무게 중심"이 사라집니다.
- `voicebox-DESIGN.md`의 카드 정의는 기본 카드가 `2px solid #E5E5E5`, 강조 카드만 red top border 또는 strong border인데, 현재는 기본 surface도 지나치게 검고 단단합니다.
- 첫 번째 레퍼런스는 구조선은 강하지만 모든 박스가 동등하게 검지 않습니다. 현재는 신문 지면이라기보다 검은 프레임 상자들을 계속 쌓은 느낌입니다.

## 4. Layout Density / "No More Than Three Type Sizes Per Page"

- 현재 홈은 타입 크기 종류가 너무 많습니다. 히어로 `h1`, dek, rail `h2`, band `h2`, band `h3`, post card `h3`, section header `h2`, meta/caption이 각자 다른 규칙을 갖고 있습니다.
- VoiceBox 원칙상 한 페이지는 대체로 `headline + body + caption` 중심으로 읽혀야 하는데, 지금은 거의 모든 블록이 "자기만의 타이포 체계"를 가지고 있습니다.
- 레이아웃 밀도도 다릅니다. 첫 번째 레퍼런스는 상단에서 대부분의 긴장감을 해결하고, 아래는 좁고 촘촘한 보조 정보로 내려갑니다. 현재 Iterra는 상단 이후에도 큰 제목과 큰 블록이 계속 반복돼 밀도가 한 단계로 평평합니다.
- 즉 현재는 "신문 1면의 압축감"보다 "여러 개의 에디토리얼 섹션을 같은 중요도로 늘어놓은 랜딩"에 가깝습니다.

## 5. Card vs Front-page Editorial Feel

- 가장 큰 차이는 여기입니다. 지금 구조는 여전히 `card-grid` 감각이 강합니다.
- 어긋나는 지점:
  - [CollectionStrip.tsx](C:/Users/josep/OneDrive/Desktop/Iterra/src/components/site/CollectionStrip.tsx)는 여전히 `섹션 헤더 + 3장 카드` 패턴입니다.
  - [PostCard.tsx](C:/Users/josep/OneDrive/Desktop/Iterra/src/components/site/PostCard.tsx)는 메타, 제목, 요약, 이미지, 태그, CTA를 전부 카드 내부에 넣어 제품 카드처럼 읽힙니다.
  - 하단 섹션들은 `front page spread`라기보다 "신문 스타일을 입힌 콘텐츠 카드 목록"에 가깝습니다.
- 첫 번째 레퍼런스는 카드보다 `지면 편집`이 우선입니다. 현재 Iterra는 콘텐츠 단위를 먼저 박스로 만든 뒤 배치하고 있고, 레퍼런스는 레이아웃 그리드 안에 기사 단위를 편집해 넣습니다.

## 6. 추가로 strict VoiceBox와 충돌하는 지점

- 장식 비주얼이 남아 있습니다. `voicebox-DESIGN.md`는 decorative gradients/background textures를 금지하는데, 현재 `.front-page-visual__abstract`는 그 규칙과 충돌합니다.
- 헤더도 레퍼런스보다 "사이트 네비게이션 바" 성격이 더 강합니다. [SiteHeader.tsx](C:/Users/josep/OneDrive/Desktop/Iterra/src/components/site/SiteHeader.tsx)는 충분히 얇아졌지만, 아직 첫 번째 이미지처럼 전면 기사 위의 얇은 신문 탭 느낌으로 완전히 정리되지는 않았습니다.

## 결론

- 지금 구현은 `VoiceBox-inspired Iterra`에 가깝고, `voicebox-DESIGN.md strict mode`는 아닙니다.
- strict mode로 맞추려면 우선순위는 아래 순서가 맞습니다.
  - 타입 크기 종류를 3단계 수준으로 강하게 축소
  - red accent를 viewport당 1개 수준으로 제한
  - 기본 surface 보더를 연하게 낮추고 strong border는 정말 필요한 지점만 사용
  - 하단 `card-grid` 감각을 줄이고 기사면/rail/spread 중심으로 재편
  - 장식용 gradient/abstract visual 제거 또는 실제 cover 이미지 우선
