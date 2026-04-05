export type PostKind = 'development' | 'career' | 'life'

export type CollectionSlug = 'development-posts' | 'career-posts' | 'life-posts'

export type AccentTone = 'earth' | 'moss' | 'sun' | 'ink'

export type RichTextValue = {
  root?: {
    children?: unknown[]
  }
}

export type TagData = {
  id: string
  name: string
  slug: string
  accent: AccentTone
}

export type LinkItem = {
  label: string
  url: string
  kind: string
}

export type NormalizedPost = {
  id: string
  slug: string
  title: string
  summary: string
  publishedAt: string | null
  status: 'draft' | 'published'
  kind: PostKind
  href: string
  coverUrl: string | null
  coverAlt: string | null
  tags: TagData[]
  body: RichTextValue | null
  seo: {
    title: string | null
    description: string | null
    canonicalUrl: string | null
    ogImageUrl: string | null
  }
  development?: {
    stack: string[]
    projectLinks: LinkItem[]
    featuredOnHome: boolean
    featuredOnProjects: boolean
  }
  career?: {
    role: string | null
    organization: string | null
    periodStart: string | null
    periodEnd: string | null
    milestones: string[]
  }
  life?: {
    mood: string | null
    location: string | null
  }
}

export type SiteSettingsData = {
  siteName: string
  tagline: string
  description: string
  aboutNarrative: string
  location: string
  contactEmail: string
  socialLinks: Array<{
    label: string
    url: string
  }>
}

export type HomeSectionsData = {
  eyebrow: string
  heroTitle: string
  heroIntro: string
  journeyQuote: string
  archiveNote: string
  mapLegend: Array<{
    label: string
    description: string
  }>
}

export type AgentSignalData = {
  name: string
  blurb: string
  surface: 'ambient' | 'archive' | 'footer'
  intensity: number
}

