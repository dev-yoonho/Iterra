import type { Field } from 'payload'

const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['".,!?()[\]{}]/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description: 'URL에 사용되는 고유한 경로입니다.',
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }

        const fallback = data?.[fallbackField]

        if (typeof fallback === 'string' && fallback.length > 0) {
          return formatSlug(fallback)
        }

        return value
      },
    ],
  },
})

