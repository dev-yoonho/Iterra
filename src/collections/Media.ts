import type { CollectionConfig } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticatedOnly,
    delete: authenticatedOnly,
    read: () => true,
    update: authenticatedOnly,
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'card',
        width: 1200,
        height: 800,
        position: 'centre',
      },
      {
        name: 'square',
        width: 800,
        height: 800,
        position: 'centre',
      },
      {
        name: 'og',
        width: 1600,
        height: 900,
        position: 'centre',
      },
    ],
    adminThumbnail: 'square',
    mimeTypes: ['image/*'],
  },
}

