import type { Access } from 'payload'

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}

