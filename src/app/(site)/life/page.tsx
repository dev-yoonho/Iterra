import { CollectionPage } from '@/components/site/CollectionPage'
import { getCollectionPosts } from '@/lib/content'

export const metadata = {
  title: 'Life',
}

export default async function LifePage() {
  const posts = await getCollectionPosts('life', 24)

  return <CollectionPage kind="life" posts={posts} />
}

