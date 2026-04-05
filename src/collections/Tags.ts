import type { CollectionConfig } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'
import { slugField } from '@/fields/slugField'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: authenticatedOnly,
    delete: authenticatedOnly,
    read: () => true,
    update: authenticatedOnly,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'accent'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'accent',
      type: 'select',
      defaultValue: 'earth',
      options: [
        {
          label: 'Earth',
          value: 'earth',
        },
        {
          label: 'Moss',
          value: 'moss',
        },
        {
          label: 'Sun',
          value: 'sun',
        },
        {
          label: 'Ink',
          value: 'ink',
        },
      ],
    },
  ],
}

