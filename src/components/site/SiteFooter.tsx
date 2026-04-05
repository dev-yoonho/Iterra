import Link from 'next/link'

import type { AgentSignalData, SiteSettingsData } from '@/types/site'

type SiteFooterProps = {
  site: SiteSettingsData
  signals: AgentSignalData[]
}

export const SiteFooter = ({ site, signals }: SiteFooterProps) => {
  const footerSignal = signals.find((signal) => signal.surface === 'footer') || signals[0]

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__copy">
          <p className="eyebrow">Iterra Editorial Desk</p>
          <p className="site-footer__stamp">Field Record / Seoul</p>
          <h2>{site.siteName}</h2>
          <p>{site.description}</p>
          {site.location ? <p className="site-footer__muted">{site.location}</p> : null}
        </div>

        <div className="site-footer__links">
          <p className="eyebrow">Signal Desk</p>
          <p className="site-footer__signal">{footerSignal?.blurb || '아직 조용한 편집실입니다.'}</p>

          {site.socialLinks.length > 0 ? (
            <div className="site-footer__socials">
              {site.socialLinks.map((item) => (
                <Link href={item.url} key={item.url} rel="noreferrer" target="_blank">
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
