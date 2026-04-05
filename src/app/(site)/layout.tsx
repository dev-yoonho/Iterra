import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getAgentSignals, getSiteSettings } from '@/lib/content'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const [site, signals] = await Promise.all([getSiteSettings(), getAgentSignals()])

  return (
    <div className="site-shell site-shell--voicebox">
      <div className="site-shell__frame">
        <SiteHeader site={site} />
        <main className="site-main site-main--voicebox">
          <div className="site-main__inner">{children}</div>
        </main>
        <SiteFooter signals={signals} site={site} />
      </div>
    </div>
  )
}
