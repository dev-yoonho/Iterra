import Link from 'next/link'

import { GiscusComments } from '@/components/site/GiscusComments'
import { RichTextContent } from '@/components/site/RichTextContent'
import { collectionConfig, formatKoreanDate } from '@/lib/site'
import type { NormalizedPost } from '@/types/site'

type PostTemplateProps = {
  post: NormalizedPost
}

export const PostTemplate = async ({ post }: PostTemplateProps) => (
  <article className="page-frame">
    <Link className="back-link" href={collectionConfig[post.kind].href}>
      {collectionConfig[post.kind].label}로 돌아가기
    </Link>

    <header className="detail-hero">
      <p className="eyebrow">{collectionConfig[post.kind].label}</p>
      <h1>{post.title}</h1>
      <p className="detail-hero__summary">{post.summary}</p>

      <div className="detail-meta">
        <span>{formatKoreanDate(post.publishedAt)}</span>
        {post.tags.map((tag) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </div>
    </header>

    {post.development ? (
      <section className="detail-panel">
        <h2>Project Notes</h2>
        {post.development.stack.length > 0 ? (
          <ul className="tag-list">
            {post.development.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {post.development.projectLinks.length > 0 ? (
          <div className="detail-links">
            {post.development.projectLinks.map((item) => (
              <Link href={item.url} key={item.url} rel="noreferrer" target="_blank">
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    ) : null}

    {post.career ? (
      <section className="detail-panel">
        <h2>Career Notes</h2>
        <div className="detail-grid">
          <div>
            <span>Role</span>
            <p>{post.career.role || '기록 예정'}</p>
          </div>
          <div>
            <span>Organization</span>
            <p>{post.career.organization || '기록 예정'}</p>
          </div>
        </div>
        {post.career.milestones.length > 0 ? (
          <ul className="detail-list">
            {post.career.milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </section>
    ) : null}

    {post.life ? (
      <section className="detail-panel">
        <h2>Life Notes</h2>
        <div className="detail-grid">
          <div>
            <span>Mood</span>
            <p>{post.life.mood || '기록 예정'}</p>
          </div>
          <div>
            <span>Location</span>
            <p>{post.life.location || '기록 예정'}</p>
          </div>
        </div>
      </section>
    ) : null}

    <section className="detail-body">
      <RichTextContent value={post.body} />
    </section>

    <section className="detail-comments">
      <h2>Conversation</h2>
      <GiscusComments />
    </section>
  </article>
)
