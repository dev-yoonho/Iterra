import { createBasePostCollection } from './shared/basePost'

export const LifePosts = createBasePostCollection({
  slug: 'life-posts',
  labels: {
    plural: 'Life Posts',
    singular: 'Life Post',
  },
  extraFields: [
    {
      name: 'mood',
      type: 'select',
      defaultValue: 'calm',
      options: [
        {
          label: 'Calm',
          value: 'calm',
        },
        {
          label: 'Curious',
          value: 'curious',
        },
        {
          label: 'Warm',
          value: 'warm',
        },
        {
          label: 'Restless',
          value: 'restless',
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
    },
  ],
})

