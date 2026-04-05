'use client'

import { startTransition, useDeferredValue, useState } from 'react'

import { EmptyState } from '@/components/site/EmptyState'
import { PostCard } from '@/components/site/PostCard'
import type { NormalizedPost, PostKind } from '@/types/site'

type ArchiveExplorerProps = {
  posts: NormalizedPost[]
}

export const ArchiveExplorer = ({ posts }: ArchiveExplorerProps) => {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<PostKind | 'all'>('all')
  const [tag, setTag] = useState<string>('all')
  const deferredQuery = useDeferredValue(query)

  const normalizedQuery = deferredQuery.trim().toLowerCase()
  const tags = Array.from(
    new Map(posts.flatMap((post) => post.tags.map((item) => [item.slug, item.name]))).entries(),
  )

  const visiblePosts = posts.filter((post) => {
    const matchesKind = kind === 'all' || post.kind === kind
    const matchesTag = tag === 'all' || post.tags.some((item) => item.slug === tag)
    const haystack = [post.title, post.summary, ...post.tags.map((item) => item.name)]
      .join(' ')
      .toLowerCase()
    const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery)

    return matchesKind && matchesTag && matchesQuery
  })

  return (
    <div className="archive-explorer">
      <div className="archive-controls">
        <label className="field">
          <span>검색</span>
          <input
            onChange={(event) => {
              const nextValue = event.target.value
              startTransition(() => {
                setQuery(nextValue)
              })
            }}
            placeholder="제목, 요약, 태그 검색"
            type="search"
            value={query}
          />
        </label>

        <label className="field">
          <span>구분</span>
          <select onChange={(event) => setKind(event.target.value as PostKind | 'all')} value={kind}>
            <option value="all">전체</option>
            <option value="development">Development</option>
            <option value="career">Career</option>
            <option value="life">Life</option>
          </select>
        </label>

        <label className="field">
          <span>태그</span>
          <select onChange={(event) => setTag(event.target.value)} value={tag}>
            <option value="all">전체</option>
            {tags.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="archive-count">{visiblePosts.length} records visible.</p>

      {visiblePosts.length > 0 ? (
        <div className="card-grid card-grid--editorial">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          description="검색어나 필터를 조금 더 넓게 조정해 보세요."
          title="현재 조건에 맞는 기록이 없습니다."
        />
      )}
    </div>
  )
}
