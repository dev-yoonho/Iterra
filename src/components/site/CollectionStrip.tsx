import Link from 'next/link'

import { EmptyState } from '@/components/site/EmptyState'
import { PostCard } from '@/components/site/PostCard'
import { SectionHeader } from '@/components/site/SectionHeader'
import { collectionConfig } from '@/lib/site'
import type { NormalizedPost, PostKind } from '@/types/site'

type CollectionStripProps = {
  kind: PostKind
  posts: NormalizedPost[]
}

export const CollectionStrip = ({ kind, posts }: CollectionStripProps) => {
  const config = collectionConfig[kind]

  return (
    <section className="section-block">
      <div className="section-block__head">
        <SectionHeader
          description={config.description}
          eyebrow={`${config.label} Desk`}
          title={config.label}
        />
        <Link className="inline-link" href={config.href}>
          전체 보기
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="card-grid card-grid--editorial">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          description="첫 기록이 들어오면 이 구역이 바로 열립니다."
          title={`${config.label} 컬렉션이 아직 비어 있습니다.`}
        />
      )}
    </section>
  )
}
