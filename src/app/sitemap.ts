import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/content'
import { serverUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: serverUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${serverUrl}/development`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${serverUrl}/career`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${serverUrl}/life`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${serverUrl}/archive`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${serverUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${serverUrl}/projects`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${serverUrl}${post.href}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...postPages]
}
