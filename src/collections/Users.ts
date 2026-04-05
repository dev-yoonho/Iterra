import type { CollectionConfig } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'
import { firstUserOrAuthenticated } from '@/access/firstUserOrAuthenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: firstUserOrAuthenticated,
    delete: authenticatedOnly,
    read: authenticatedOnly,
    update: authenticatedOnly,
  },
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'owner',
      options: [
        {
          label: 'Owner',
          value: 'owner',
        },
      ],
      required: true,
    },
  ],
}
