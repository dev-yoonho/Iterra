import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostTemplate } from '@/components/site/PostTemplate'
import { getPostBySlug } from '@/lib/content'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug('career', slug)

  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: post.seo.title || post.title,
    description: post.seo.description || post.summary,
  }
}

export default async function CareerPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug('career', slug)

  if (!post) {
    notFound()
  }

  return <PostTemplate post={post} />
}

