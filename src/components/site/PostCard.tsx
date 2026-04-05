import Image from 'next/image'
import Link from 'next/link'

import { collectionConfig, formatKoreanDate } from '@/lib/site'
import type { NormalizedPost } from '@/types/site'

type PostCardProps = {
  post: NormalizedPost
}

export const PostCard = ({ post }: PostCardProps) => (
  <article className={`post-card post-card--${post.kind}`}>
    <Link className="post-card__link" href={post.href}>
      <div className="post-card__meta">
        <span className={`post-card__kind post-card__kind--${post.kind}`}>
          {collectionConfig[post.kind].label}
        </span>
        <span className="post-card__date">{formatKoreanDate(post.publishedAt)}</span>
      </div>

      <h3>{post.title}</h3>
      <p className="post-card__summary">{post.summary}</p>

      {post.coverUrl ? (
        <div className="post-card__image">
          <Image
            alt={post.coverAlt || post.title}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            src={post.coverUrl}
          />
        </div>
      ) : null}

      {post.tags.length > 0 ? (
        <ul className="tag-list">
          {post.tags.slice(0, 4).map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      ) : null}

      <span className="post-card__cta">Read Record</span>
    </Link>
  </article>
)
