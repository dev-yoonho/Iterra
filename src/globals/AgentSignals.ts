import type { GlobalConfig } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'

export const AgentSignals: GlobalConfig = {
  slug: 'agent-signals',
  label: 'Agent Signals',
  access: {
    read: () => true,
    update: authenticatedOnly,
  },
  fields: [
    {
      name: 'signals',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'blurb',
          type: 'textarea',
          required: true,
        },
        {
          name: 'surface',
          type: 'select',
          defaultValue: 'ambient',
          options: [
            {
              label: 'Ambient',
              value: 'ambient',
            },
            {
              label: 'Archive',
              value: 'archive',
            },
            {
              label: 'Footer',
              value: 'footer',
            },
          ],
        },
        {
          name: 'intensity',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 2,
        },
      ],
    },
  ],
}
