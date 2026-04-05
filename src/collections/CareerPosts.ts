import { createBasePostCollection } from './shared/basePost'

export const CareerPosts = createBasePostCollection({
  slug: 'career-posts',
  labels: {
    plural: 'Career Posts',
    singular: 'Career Post',
  },
  extraFields: [
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      type: 'group',
      fields: [
        {
          name: 'start',
          type: 'date',
        },
        {
          name: 'end',
          type: 'date',
        },
      ],
    },
    {
      name: 'milestones',
      type: 'array',
      labels: {
        plural: 'Milestones',
        singular: 'Milestone',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
})

