import Link from 'next/link'

import type { SiteSettingsData } from '@/types/site'

const navigation = [
  { href: '/development', label: 'Development' },
  { href: '/career', label: 'Career' },
  { href: '/life', label: 'Life' },
  { href: '/archive', label: 'Archive' },
]

type SiteHeaderProps = {
  site: SiteSettingsData
}

export const SiteHeader = ({ site }: SiteHeaderProps) => (
  <header className="site-header">
    <div className="site-header__inner">
      <Link className="site-wordmark site-wordmark--header" href="/">
        <span className="site-wordmark__title">{site.siteName}</span>
      </Link>

      <nav aria-label="Primary" className="site-nav">
        {navigation.map((item) => (
          <Link className="site-nav__link" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
)
