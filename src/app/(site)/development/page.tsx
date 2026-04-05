import { CollectionPage } from '@/components/site/CollectionPage'
import { getCollectionPosts } from '@/lib/content'

export const metadata = {
  title: 'Development',
}

export default async function DevelopmentPage() {
  const posts = await getCollectionPosts('development', 24)

  return <CollectionPage kind="development" posts={posts} />
}

