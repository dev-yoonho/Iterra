import type { Access } from 'payload'

export const authenticatedOnly: Access = ({ req: { user } }) => Boolean(user)

