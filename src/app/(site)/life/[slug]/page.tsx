import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostTemplate } from '@/components/site/PostTemplate'
import { getCollectionPosts, getPostBySlug } from '@/lib/content'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateStaticParams = async () => {
  const posts = await getCollectionPosts('life', 50)
  return posts.map((post) => ({ slug: post.slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug('life', slug)

  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  const ogImage = post.seo.ogImageUrl || post.coverUrl

  return {
    title: post.seo.title || post.title,
    description: post.seo.description || post.summary,
    openGraph: {
      title: post.seo.title || post.title,
      description: post.seo.description || post.summary,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}

export default async function LifePostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug('life', slug)

  if (!post) {
    notFound()
  }

  return <PostTemplate post={post} />
}
