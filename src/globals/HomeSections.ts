import type { GlobalConfig } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'

export const HomeSections: GlobalConfig = {
  slug: 'home-sections',
  label: 'Home Sections',
  access: {
    read: () => true,
    update: authenticatedOnly,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Journey Atlas',
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: '개발과 삶의 흔적이 차분히 쌓이는 개인 세계',
      required: true,
    },
    {
      name: 'heroIntro',
      type: 'textarea',
      defaultValue:
        'Iterra는 개발 기록, 커리어 아카이브, 사적인 생활 메모가 하나의 지형처럼 겹쳐지는 공간입니다.',
      required: true,
    },
    {
      name: 'journeyQuote',
      type: 'textarea',
      defaultValue: '한 번의 완성보다, 오래 남는 궤적을 믿습니다.',
    },
    {
      name: 'archiveNote',
      type: 'textarea',
      defaultValue: '각 기록은 하나의 문서이면서, 동시에 더 긴 여정의 일부입니다.',
    },
    {
      name: 'mapLegend',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
