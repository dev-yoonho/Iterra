import { ArchiveExplorer } from '@/components/site/ArchiveExplorer'
import { SectionHeader } from '@/components/site/SectionHeader'
import { getAllPosts } from '@/lib/content'

export const metadata = {
  title: '아카이브',
}

export default async function ArchivePage() {
  const posts = await getAllPosts()
  const counts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.kind] = (acc[post.kind] || 0) + 1
    return acc
  }, {})
  const lead = posts[0] || null

  return (
    <div className="page-frame page-frame--voicebox page-frame--archive">
      <section className="hero-panel hero-panel--voicebox">
        <div className="voicebox-feature-grid">
          <SectionHeader
            eyebrow="Archive"
            title="모든 기록을 하나의 편집면에서 탐색합니다."
            description="개발, 커리어, 일상 글을 같은 기준으로 훑을 수 있도록 정리한 통합 아카이브입니다."
          />

          <div className="voicebox-lead-grid voicebox-lead-grid--duo">
            <article className="voicebox-lead-card">
              <p className="eyebrow">Latest Entry</p>
              <h2>{lead?.title || '첫 기록을 기다리는 중입니다.'}</h2>
              <p>
                {lead?.summary ||
                  '글이 쌓이기 시작하면 여기에서 가장 최근에 올라온 기록을 먼저 보여줍니다.'}
              </p>
            </article>

            <article className="voicebox-lead-card">
              <p className="eyebrow">Sections</p>
              <ul className="detail-list">
                <li>
                  <strong>개발</strong>
                  <span>{counts.development || 0}개 글</span>
                </li>
                <li>
                  <strong>커리어</strong>
                  <span>{counts.career || 0}개 글</span>
                </li>
                <li>
                  <strong>일상</strong>
                  <span>{counts.life || 0}개 글</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <ArchiveExplorer posts={posts} />
    </div>
  )
}
