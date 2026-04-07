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
  const lead = posts[0] || null

  return (
    <div className="page-frame page-frame--voicebox">
      <section className="hero-panel hero-panel--voicebox">
        <div className="voicebox-feature-grid">
          <SectionHeader
            eyebrow={config.label}
            title={`${config.label} Archive`}
            description={config.description}
          />

          <div className="voicebox-lead-grid voicebox-lead-grid--duo">
            <article className="voicebox-lead-card">
              <p className="eyebrow">Latest Entry</p>
              <h2>{lead?.title || `${config.label}의 첫 기록을 기다리는 중입니다.`}</h2>
              <p>{lead?.summary || '관리자에서 첫 글을 발행하면 이 영역이 채워집니다.'}</p>
            </article>

            <article className="voicebox-lead-card">
              <p className="eyebrow">Collection Info</p>
              <h2>{posts.length}개의 기록</h2>
              <p>{config.description}</p>
            </article>
          </div>
        </div>
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
