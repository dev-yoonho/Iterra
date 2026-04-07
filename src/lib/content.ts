import { cache } from 'react'

import {
  defaultAgentSignals,
  defaultHomeSections,
  defaultSiteSettings,
} from '@/content/defaults'
import { getPayloadClient } from '@/lib/payload'
import { collectionConfig, collectionKinds, hrefForPost, makeAbsoluteUrl } from '@/lib/site'
import type {
  AgentSignalData,
  CollectionSlug,
  HomeSectionsData,
  NormalizedPost,
  PostKind,
  RichTextValue,
  SiteSettingsData,
  TagData,
} from '@/types/site'

type RawObject = Record<string, unknown>

const asObject = (value: unknown): RawObject | null =>
  typeof value === 'object' && value !== null ? (value as RawObject) : null

const asString = (value: unknown) => (typeof value === 'string' ? value : null)

const asBoolean = (value: unknown) => Boolean(value)

const asNumber = (value: unknown) => (typeof value === 'number' ? value : null)

const getId = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (asObject(value)?.id) {
    return String(asObject(value)?.id)
  }

  return crypto.randomUUID()
}

const normalizeTag = (value: unknown): TagData | null => {
  const tag = asObject(value)

  if (!tag) {
    return null
  }

  return {
    id: getId(tag),
    name: asString(tag.name) || 'untagged',
    slug: asString(tag.slug) || 'untagged',
    accent: (asString(tag.accent) as TagData['accent']) || 'earth',
  }
}

const normalizeMedia = (value: unknown) => {
  const media = asObject(value)

  if (!media) {
    return {
      url: null,
      alt: null,
    }
  }

  const url =
    asString(asObject(media.sizes)?.card && asObject(asObject(media.sizes)?.card)?.url) ||
    asString(media.url)

  return {
    url: makeAbsoluteUrl(url),
    alt: asString(media.alt),
  }
}

const normalizeSeo = (value: unknown) => {
  const seo = asObject(value)
  const ogImage = normalizeMedia(seo?.ogImage)

  return {
    title: asString(seo?.title),
    description: asString(seo?.description),
    canonicalUrl: asString(seo?.canonicalUrl),
    ogImageUrl: ogImage.url,
  }
}

const normalizeDevelopment = (doc: RawObject) => ({
  stack: Array.isArray(doc.stack)
    ? doc.stack
        .map((entry) => asString(asObject(entry)?.name))
        .filter((entry): entry is string => Boolean(entry))
    : [],
  projectLinks: Array.isArray(doc.projectLinks)
    ? doc.projectLinks
        .map((entry) => {
          const item = asObject(entry)

          if (!item) {
            return null
          }

          const label = asString(item.label)
          const url = asString(item.url)

          if (!label || !url) {
            return null
          }

          return {
            kind: asString(item.kind) || 'reference',
            label,
            url,
          }
        })
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    : [],
  featuredOnHome: asBoolean(asObject(doc.showcase)?.featuredOnHome),
  featuredOnProjects: asBoolean(asObject(doc.showcase)?.featuredOnProjects),
})

const normalizeCareer = (doc: RawObject) => ({
  role: asString(doc.role),
  organization: asString(doc.organization),
  periodStart: asString(asObject(doc.period)?.start),
  periodEnd: asString(asObject(doc.period)?.end),
  milestones: Array.isArray(doc.milestones)
    ? doc.milestones
        .map((entry) => asString(asObject(entry)?.label))
        .filter((entry): entry is string => Boolean(entry))
    : [],
})

const normalizeLife = (doc: RawObject) => ({
  mood: asString(doc.mood),
  location: asString(doc.location),
})

const normalizePost = (kind: PostKind, value: unknown, includeBody = true): NormalizedPost | null => {
  const doc = asObject(value)

  if (!doc) {
    return null
  }

  const slug = asString(doc.slug)
  const title = asString(doc.title)
  const summary = asString(doc.summary)

  if (!slug || !title || !summary) {
    return null
  }

  const media = normalizeMedia(doc.cover)

  return {
    id: getId(doc),
    slug,
    title,
    summary,
    publishedAt: asString(doc.publishedAt),
    status: (asString(doc.status) as NormalizedPost['status']) || 'draft',
    kind,
    href: hrefForPost(kind, slug),
    coverUrl: media.url,
    coverAlt: media.alt,
    tags: Array.isArray(doc.tags)
      ? doc.tags.map(normalizeTag).filter((tag): tag is TagData => Boolean(tag))
      : [],
    body: includeBody ? (doc.body as RichTextValue | null) || null : null,
    seo: normalizeSeo(doc.seo),
    development: kind === 'development' ? normalizeDevelopment(doc) : undefined,
    career: kind === 'career' ? normalizeCareer(doc) : undefined,
    life: kind === 'life' ? normalizeLife(doc) : undefined,
  }
}

const fetchCollection = async (kind: PostKind, limit = 12) => {
  const payload = await getPayloadClient()

  if (!payload) {
    return [] as NormalizedPost[]
  }

  const result = await payload.find({
    collection: collectionConfig[kind].collection,
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return result.docs
    .map((doc) => normalizePost(kind, doc, false))
    .filter((doc): doc is NormalizedPost => Boolean(doc))
}

const fetchBySlug = async (kind: PostKind, slug: string) => {
  const payload = await getPayloadClient()

  if (!payload) {
    return null
  }

  const result = await payload.find({
    collection: collectionConfig[kind].collection,
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return normalizePost(kind, result.docs[0] || null)
}

const readGlobal = async <T>(
  slug: 'agent-signals' | 'home-sections' | 'site-settings',
  fallback: T,
  transform: (value: unknown) => T,
) => {
  const payload = await getPayloadClient()

  if (!payload) {
    return fallback
  }

  const result = await payload.findGlobal({
    slug,
    depth: 2,
  })

  return transform(result)
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  try {
    return await readGlobal('site-settings', defaultSiteSettings, (value) => {
      const doc = asObject(value)

      if (!doc) {
        return defaultSiteSettings
      }

      return {
        siteName: asString(doc.siteName) || defaultSiteSettings.siteName,
        tagline: asString(doc.tagline) || defaultSiteSettings.tagline,
        description: asString(doc.description) || defaultSiteSettings.description,
        aboutNarrative: asString(doc.aboutNarrative) || defaultSiteSettings.aboutNarrative,
        location: asString(doc.location) || defaultSiteSettings.location,
        contactEmail: asString(doc.contactEmail) || defaultSiteSettings.contactEmail,
        socialLinks: Array.isArray(doc.socialLinks)
          ? doc.socialLinks
              .map((entry) => {
                const item = asObject(entry)
                const label = asString(item?.label)
                const url = asString(item?.url)

                if (!label || !url) {
                  return null
                }

                return { label, url }
              })
              .filter(
                (
                  entry,
                ): entry is {
                  label: string
                  url: string
                } => Boolean(entry),
              )
          : defaultSiteSettings.socialLinks,
      }
    })
  } catch {
    return defaultSiteSettings
  }
})

export const getHomeSections = cache(async (): Promise<HomeSectionsData> => {
  try {
    return await readGlobal('home-sections', defaultHomeSections, (value) => {
      const doc = asObject(value)

      if (!doc) {
        return defaultHomeSections
      }

      return {
        eyebrow: asString(doc.eyebrow) || defaultHomeSections.eyebrow,
        heroTitle: asString(doc.heroTitle) || defaultHomeSections.heroTitle,
        heroIntro: asString(doc.heroIntro) || defaultHomeSections.heroIntro,
        journeyQuote: asString(doc.journeyQuote) || defaultHomeSections.journeyQuote,
        archiveNote: asString(doc.archiveNote) || defaultHomeSections.archiveNote,
        mapLegend: Array.isArray(doc.mapLegend)
          ? doc.mapLegend
              .map((entry) => {
                const item = asObject(entry)
                const label = asString(item?.label)
                const description = asString(item?.description)

                if (!label || !description) {
                  return null
                }

                return { label, description }
              })
              .filter(
                (
                  entry,
                ): entry is {
                  label: string
                  description: string
                } => Boolean(entry),
              )
          : defaultHomeSections.mapLegend,
      }
    })
  } catch {
    return defaultHomeSections
  }
})

export const getAgentSignals = cache(async (): Promise<AgentSignalData[]> => {
  try {
    return await readGlobal('agent-signals', defaultAgentSignals, (value) => {
      const doc = asObject(value)
      const signals = Array.isArray(doc?.signals) ? doc.signals : null

      if (!signals) {
        return defaultAgentSignals
      }

      const normalized = signals
        .map((entry) => {
          const item = asObject(entry)
          const name = asString(item?.name)
          const blurb = asString(item?.blurb)
          const surface = asString(item?.surface)
          const intensity = asNumber(item?.intensity)

          if (!name || !blurb || !surface) {
            return null
          }

          return {
            name,
            blurb,
            surface: surface as AgentSignalData['surface'],
            intensity: intensity || 1,
          }
        })
        .filter((entry): entry is AgentSignalData => Boolean(entry))

      return normalized.length > 0 ? normalized : defaultAgentSignals
    })
  } catch {
    return defaultAgentSignals
  }
})

export const getCollectionPosts = cache(async (kind: PostKind, limit = 12) => {
  try {
    return await fetchCollection(kind, limit)
  } catch {
    return [] as NormalizedPost[]
  }
})

export const getAllPosts = cache(async () => {
  const results = await Promise.all(collectionKinds.map((kind) => getCollectionPosts(kind, 24)))

  return results
    .flat()
    .sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0

      return bTime - aTime
    })
})

export const getPostBySlug = cache(async (kind: PostKind, slug: string) => {
  try {
    return await fetchBySlug(kind, slug)
  } catch {
    return null
  }
})

export const getFeaturedProjects = cache(async () => {
  const posts = await getCollectionPosts('development', 18)

  return posts.filter((post) => post.development?.featuredOnProjects)
})

export const getContentSnapshot = cache(async () => {
  const [site, home, agents, development, career, life] = await Promise.all([
    getSiteSettings(),
    getHomeSections(),
    getAgentSignals(),
    getCollectionPosts('development', 6),
    getCollectionPosts('career', 6),
    getCollectionPosts('life', 6),
  ])

  return {
    site,
    home,
    agents,
    development,
    career,
    life,
  }
})

export const getCollectionSlugByKind = (kind: PostKind): CollectionSlug => collectionConfig[kind].collection
