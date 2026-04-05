import type { CollectionConfig, Field } from 'payload'

import { authenticatedOnly } from '@/access/authenticatedOnly'
import { publishedOrAuthenticated } from '@/access/publishedOrAuthenticated'
import { slugField } from '@/fields/slugField'

type CreateBasePostArgs = {
  slug: CollectionConfig['slug']
  labels: CollectionConfig['labels']
  extraFields?: Field[]
}

export const createBasePostCollection = ({
  slug,
  labels,
  extraFields = [],
}: CreateBasePostArgs): CollectionConfig => ({
  slug,
  labels,
  access: {
    create: authenticatedOnly,
    delete: authenticatedOnly,
    read: publishedOrAuthenticated,
    update: authenticatedOnly,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const status =
          typeof data?.status === 'string'
            ? data.status
            : typeof originalDoc?.status === 'string'
              ? originalDoc.status
              : null

        const publishedAt =
          typeof data?.publishedAt === 'string'
            ? data.publishedAt
            : typeof originalDoc?.publishedAt === 'string'
              ? originalDoc.publishedAt
              : null

        if (status === 'published' && !publishedAt) {
          return {
            ...data,
            publishedAt: new Date().toISOString(),
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: '글의 제목입니다.',
      },
    },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 260,
      admin: {
        description: '목록 카드와 메타 설명에 쓰이는 짧은 소개입니다.',
      },
    },
    {
      name: 'cover',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    ...extraFields,
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 180,
        },
        {
          name: 'canonicalUrl',
          type: 'text',
        },
        {
          name: 'ogImage',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
  ],
})
