import Link from 'next/link'

import { EmptyState } from '@/components/site/EmptyState'
import { SectionHeader } from '@/components/site/SectionHeader'
import { getCollectionPosts, getFeaturedProjects } from '@/lib/content'

export const metadata = {
  title: 'Projects',
}

export default async function ProjectsPage() {
  const [featured, latestDevelopment] = await Promise.all([
    getFeaturedProjects(),
    getCollectionPosts('development', 8),
  ])

  const projects = featured.length > 0 ? featured : latestDevelopment

  return (
    <div className="page-frame">
      <section className="hero-panel">
        <SectionHeader
          eyebrow="Projects"
          title="선별된 작업의 흔적"
          description="개발 기록 중에서 작업물 성격이 강한 글들을 따로 모아봅니다."
        />
      </section>

      {projects.length > 0 ? (
        <section className="card-grid">
          {projects.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-card__link">
                <div className="post-card__meta">
                  <span className="post-card__kind">Project</span>
                  <span>{post.development?.stack.join(' · ') || 'Stack pending'}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="post-card__summary">{post.summary}</p>
                <div className="detail-links">
                  <Link className="inline-link" href={post.href}>
                    기록 읽기
                  </Link>
                  {post.development?.projectLinks.slice(0, 2).map((item) => (
                    <Link
                      className="inline-link"
                      href={item.url}
                      key={item.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState
          description="Development 글에서 프로젝트 링크나 featured 설정을 추가하면 이곳이 채워집니다."
          title="아직 프로젝트 쇼케이스가 없습니다."
        />
      )}
    </div>
  )
}
