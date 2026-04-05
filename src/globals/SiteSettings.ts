import type { GlobalConfig } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: authenticatedOnly,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Iterra',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: '개발과 삶의 여정을 기록하는 개인 세계',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Iterra는 개발, 커리어, 그리고 일상을 하나의 지도처럼 차분히 쌓아가는 개인 사이트입니다.',
      required: true,
    },
    {
      name: 'aboutNarrative',
      type: 'textarea',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
