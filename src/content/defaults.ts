import type { AgentSignalData, HomeSectionsData, SiteSettingsData } from '@/types/site'

export const defaultSiteSettings: SiteSettingsData = {
  siteName: 'Iterra',
  tagline: '개발과 삶의 여정을 기록하는 개인 세계',
  description:
    'Iterra는 개발 기록, 커리어 아카이브, 사적인 메모를 하나의 지형처럼 차분히 쌓아가는 한국어 중심 개인 사이트입니다.',
  aboutNarrative:
    'Iterra는 iter와 terra를 합친 이름으로, 내가 지나온 흔적과 앞으로 넓혀 갈 세계를 함께 담는 공간입니다.',
  location: 'Somewhere between build logs and field notes',
  contactEmail: '',
  socialLinks: [],
}

export const defaultHomeSections: HomeSectionsData = {
  eyebrow: 'Journey Atlas',
  heroTitle: '개발과 삶의 흔적이 차분히 쌓이는 개인 세계',
  heroIntro:
    'Iterra는 개발 기록, 커리어 아카이브, 일상의 노트를 같은 지도 위에 올려 두는 사이트입니다. 빠르게 소비되는 정보보다 오래 남는 궤적을 모읍니다.',
  journeyQuote: '한 번의 완성보다, 오래 남는 궤적을 믿습니다.',
  archiveNote: '각 기록은 하나의 문서이면서, 동시에 더 긴 여정의 일부입니다.',
  mapLegend: [
    {
      label: 'Development',
      description: '실험, 학습, 구현 기록',
    },
    {
      label: 'Career',
      description: '전환점과 역할의 축적',
    },
    {
      label: 'Life',
      description: '사소하지만 오래 남는 생활 메모',
    },
  ],
}

export const defaultAgentSignals: AgentSignalData[] = [
  {
    name: 'Caretaker',
    blurb: '페이지 가장자리의 움직임을 정리하고, 기록의 먼지를 털어내는 존재.',
    surface: 'ambient',
    intensity: 2,
  },
  {
    name: 'Indexer',
    blurb: '아카이브의 태그와 경로를 조용히 갱신하는 존재.',
    surface: 'archive',
    intensity: 3,
  },
  {
    name: 'Night Clerk',
    blurb: '하루의 끝에 남은 메모를 분류하고, 바닥에 작은 흔적만 남기는 존재.',
    surface: 'footer',
    intensity: 1,
  },
]

