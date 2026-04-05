import { CollectionPage } from '@/components/site/CollectionPage'
import { getCollectionPosts } from '@/lib/content'

export const metadata = {
  title: 'Career',
}

export default async function CareerPage() {
  const posts = await getCollectionPosts('career', 24)

  return <CollectionPage kind="career" posts={posts} />
}

