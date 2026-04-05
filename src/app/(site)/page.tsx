import Image from 'next/image'
import Link from 'next/link'

import { CollectionStrip } from '@/components/site/CollectionStrip'
import { getContentSnapshot } from '@/lib/content'
import { collectionConfig, formatKoreanDate } from '@/lib/site'

export const metadata = {
  title: '홈',
}

export default async function HomePage() {
  const { agents, career, development, home, life, site } = await getContentSnapshot()

  const flatPosts = [...development, ...career, ...life]
    .filter((post) => post.status === 'published')
    .sort((left, right) => {
      const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0
      const rightTime = right.publishedAt ? new Date(right.publishedAt).getTime() : 0
      return rightTime - leftTime
    })

  const heroStory = flatPosts[0] || development[0] || career[0] || life[0] || null
  const heroVisual = flatPosts.find((post) => post.coverUrl) || heroStory
  const railLead = flatPosts[1] || career[0] || life[0] || development[1] || null
  const railStories = flatPosts.filter((post) => post.id !== heroStory?.id).slice(1, 5)
  const spotlightDeck = [
    {
      kind: 'development' as const,
      post: development[0] || null,
      fallback: '배운 것과 만든 것을 남기는 개발 기록 구획입니다.',
    },
    {
      kind: 'career' as const,
      post: career[0] || null,
      fallback: '역할 변화와 선택의 문맥을 정리하는 커리어 아카이브입니다.',
    },
    {
      kind: 'life' as const,
      post: life[0] || null,
      fallback: '작은 생활과 감정의 잔상을 모아두는 일상 노트입니다.',
    },
  ]

  return (
    <div className="page-frame page-frame--voicebox page-frame--home">
      <section className="front-page-hero">
        <article className="front-page-story">
          <p className="front-page-story__rubric">
            {heroStory ? `Featured ${collectionConfig[heroStory.kind].label}` : `Front Page / ${home.eyebrow}`}
          </p>
          <h1>{heroStory?.title || home.heroTitle}</h1>
          <p className="front-page-story__dek">{heroStory?.summary || home.heroIntro}</p>

          <div className="front-page-story__meta">
            <div>
              <strong>Desk</strong>
              <span>{heroStory ? collectionConfig[heroStory.kind].label : home.eyebrow}</span>
            </div>
            <div>
              <strong>Published</strong>
              <span>{formatKoreanDate(heroStory?.publishedAt)}</span>
            </div>
          </div>

          <div className="front-page-story__actions">
            <Link className="inline-link" href={heroStory?.href || '/archive'}>
              대표 기록 읽기
            </Link>
          </div>
        </article>

        <div className="front-page-visual">
          {heroVisual?.coverUrl ? (
            <Image
              alt={heroVisual.coverAlt || heroVisual.title}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 36vw"
              src={heroVisual.coverUrl}
            />
          ) : (
            <div className="front-page-visual__abstract" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <aside className="front-page-rail">
          <article className="front-page-rail__lead">
            <p className="eyebrow">{railLead ? 'Side Feature' : 'Journey Quote'}</p>
            <h2>{railLead?.title || home.journeyQuote}</h2>
            <p>{railLead?.summary || home.archiveNote}</p>
            <Link className="inline-link" href={railLead?.href || '/about'}>
              {railLead ? '이어서 읽기' : '소개 보기'}
            </Link>
          </article>

          <div className="front-page-rail__list">
            {railStories.map((post) => (
              <Link className="front-page-rail__item" href={post.href} key={post.id}>
                <p className="eyebrow">{collectionConfig[post.kind].label}</p>
                <strong>{post.title}</strong>
                <span>{formatKoreanDate(post.publishedAt)}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="front-page-band">
        <div className="front-page-band__heading">
          <p className="eyebrow">Editorial Desk</p>
          <h2>개발, 커리어, 일상을 하나의 전면 기사처럼 배치합니다.</h2>
        </div>

        <div className="front-page-band__columns">
          {spotlightDeck.map((entry) => {
            const config = collectionConfig[entry.kind]

            return (
              <article className="front-page-band__column" key={entry.kind}>
                <p className="eyebrow">{config.label}</p>
                <h2>{entry.post?.title || `${config.label} 준비 중`}</h2>
                {entry.post ? null : <p>{entry.fallback}</p>}
                <strong>{entry.post ? formatKoreanDate(entry.post.publishedAt) : '새 기록 대기 중'}</strong>
                <div className="detail-links">
                  <Link className="inline-link" href={entry.post?.href || config.href}>
                    {entry.post ? '대표 글 읽기' : '섹션 보러가기'}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="front-page-band detail-panel--briefing">
        <div className="front-page-band__heading">
          <p className="eyebrow">Field Notes</p>
          <h2>완성된 문서만이 아니라, 이어지는 흔적도 함께 남깁니다.</h2>
        </div>

        <div className="front-page-band__columns">
          <article className="front-page-band__column">
            <p className="eyebrow">Map Legend</p>
            <div className="legend-list legend-list--voicebox">
              {home.mapLegend.slice(0, 3).map((item) => (
                <div key={item.label}>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="front-page-band__column">
            <p className="eyebrow">Journey Line</p>
            <div className="legend-list legend-list--voicebox">
              <div>
                <strong>여정의 인용문</strong>
                <p>{home.journeyQuote}</p>
              </div>
              <div>
                <strong>아카이브 메모</strong>
                <p>{home.archiveNote}</p>
              </div>
            </div>
          </article>

          <article className="front-page-band__column">
            <p className="eyebrow">Signal Desk</p>
            <div className="legend-list legend-list--voicebox">
              <div>
                <strong>현재 신호</strong>
                <p>
                  {agents.length > 0 ? agents.slice(0, 3).map((signal) => signal.name).join(' / ') : '보조 신호를 준비 중입니다.'}
                </p>
              </div>
              <div>
                <strong>세계의 설명</strong>
                <p>{site.description}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="voicebox-collection-stack">
        <CollectionStrip kind="development" posts={development} />
        <CollectionStrip kind="career" posts={career} />
        <CollectionStrip kind="life" posts={life} />
      </div>
    </div>
  )
}
