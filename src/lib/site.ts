import type { CollectionSlug, PostKind } from '@/types/site'

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const collectionConfig: Record<
  PostKind,
  {
    collection: CollectionSlug
    href: string
    label: string
    description: string
    accent: string
  }
> = {
  development: {
    collection: 'development-posts',
    href: '/development',
    label: 'Development',
    description: 'Notes on learning, building, and technical experiments.',
    accent: 'var(--tone-clay)',
  },
  career: {
    collection: 'career-posts',
    href: '/career',
    label: 'Career',
    description: 'Records of roles, decisions, and changes in direction.',
    accent: 'var(--tone-moss)',
  },
  life: {
    collection: 'life-posts',
    href: '/life',
    label: 'Life',
    description: 'Daily notes, moods, and small details worth keeping.',
    accent: 'var(--tone-sun)',
  },
}

export const collectionKinds = Object.keys(collectionConfig) as PostKind[]

export const hrefForPost = (kind: PostKind, slug: string) => `${collectionConfig[kind].href}/${slug}`

export const makeAbsoluteUrl = (value?: string | null) => {
  if (!value) {
    return null
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return new URL(value, serverUrl).toString()
}

export const formatKoreanDate = (value?: string | null) => {
  if (!value) {
    return 'Date pending'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Date TBD'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  }).format(date)
}
