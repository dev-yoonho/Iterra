import { EmptyState } from '@/components/site/EmptyState'
import { PostCard } from '@/components/site/PostCard'
import { SectionHeader } from '@/components/site/SectionHeader'
import { collectionConfig } from '@/lib/site'
import type { NormalizedPost, PostKind } from '@/types/site'

type CollectionPageProps = {
  kind: PostKind
  posts: NormalizedPost[]
}

export const CollectionPage = ({ kind, posts }: CollectionPageProps) => {
  const config = collectionConfig[kind]

  return (
    <div className="page-frame">
      <section className="hero-panel">
        <SectionHeader
          eyebrow={config.label}
          title={`${config.label} Archive`}
          description={config.description}
        />
      </section>

      {posts.length > 0 ? (
        <section className="card-grid card-grid--editorial">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <EmptyState
          description="관리자에서 첫 글을 발행하면 이 컬렉션이 열립니다."
          title={`${config.label}의 첫 기록을 기다리는 중입니다.`}
        />
      )}
    </div>
  )
}
