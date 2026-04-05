import { createBasePostCollection } from './shared/basePost'

export const DevelopmentPosts = createBasePostCollection({
  slug: 'development-posts',
  labels: {
    plural: 'Development Posts',
    singular: 'Development Post',
  },
  extraFields: [
    {
      name: 'stack',
      type: 'array',
      labels: {
        plural: 'Stack',
        singular: 'Stack Item',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'projectLinks',
      type: 'array',
      labels: {
        plural: 'Project Links',
        singular: 'Project Link',
      },
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
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'repo',
          options: [
            {
              label: 'Repository',
              value: 'repo',
            },
            {
              label: 'Demo',
              value: 'demo',
            },
            {
              label: 'Reference',
              value: 'reference',
            },
          ],
        },
      ],
    },
    {
      name: 'showcase',
      type: 'group',
      fields: [
        {
          name: 'featuredOnHome',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'featuredOnProjects',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
})

