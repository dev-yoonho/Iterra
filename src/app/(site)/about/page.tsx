import Link from 'next/link'

import { SectionHeader } from '@/components/site/SectionHeader'
import { getAgentSignals, getSiteSettings } from '@/lib/content'

export const metadata = {
  title: '소개',
}

export default async function AboutPage() {
  const [site, signals] = await Promise.all([getSiteSettings(), getAgentSignals()])

  return (
    <div className="page-frame page-frame--voicebox page-frame--about">
      <section className="hero-panel hero-panel--voicebox">
        <div className="voicebox-feature-grid">
          <SectionHeader
            eyebrow="About Iterra"
            title="기록을 통해 나만의 세계를 확장하는 방식"
            description={site.aboutNarrative || site.description}
          />

          <div className="voicebox-lead-grid voicebox-lead-grid--duo">
            <article className="voicebox-lead-card">
              <p className="eyebrow">Core Idea</p>
              <h2>Iterra는 결과보다 경로를 남기는 개인 저널입니다.</h2>
              <p>
                빠르게 소비되는 업데이트보다, 무엇을 배우고 왜 방향을 바꾸었는지까지 기록하는
                저장소를 목표로 합니다. 개발 노트와 커리어의 변화, 사적인 일상은 서로 다른
                섹션이지만 결국 같은 삶의 시간선 위에 있습니다.
              </p>
            </article>

            <article className="voicebox-lead-card">
              <p className="eyebrow">World Building</p>
              <h2>나중에는 AI 에이전트까지 포함한 개인 세계로 확장합니다.</h2>
              <p>
                지금은 기록을 중심에 두지만, 이후에는 보조 에이전트가 정리와 탐색을 돕는 구조로
                확장할 예정입니다. 그래서 Iterra는 단순한 블로그보다 조금 더 운영체계에 가까운
                공간이 됩니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="detail-panel detail-panel--voicebox">
        <h2>세계 안에서 움직이는 신호</h2>
        <ul className="detail-list">
          {signals.map((signal) => (
            <li key={signal.name}>
              <strong>{signal.name}</strong>
              <span>{signal.blurb}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-panel detail-panel--voicebox">
        <h2>연결</h2>
        <p>
          {site.contactEmail ? (
            <Link href={`mailto:${site.contactEmail}`}>{site.contactEmail}</Link>
          ) : (
            'site settings에서 연락처를 추가하면 이 영역에 바로 반영됩니다.'
          )}
        </p>

        {site.socialLinks.length > 0 ? (
          <ul className="detail-list">
            {site.socialLinks.map((link) => (
              <li key={link.url}>
                <strong>{link.label}</strong>
                <Link href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  )
}
