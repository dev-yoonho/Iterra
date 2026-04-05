'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
}

export const GiscusComments = () => {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement | null>(null)
  const isReady = Object.values(giscusConfig).every(Boolean)

  useEffect(() => {
    const container = ref.current

    if (!container || !isReady) {
      return
    }

    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', giscusConfig.repo!)
    script.setAttribute('data-repo-id', giscusConfig.repoId!)
    script.setAttribute('data-category', giscusConfig.category!)
    script.setAttribute('data-category-id', giscusConfig.categoryId!)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('data-loading', 'lazy')

    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [isReady, pathname])

  if (!isReady) {
    return (
      <div className="comment-placeholder">
        <p className="eyebrow">Comments</p>
        <p>Set the Giscus environment variables to enable the GitHub-based comment thread.</p>
      </div>
    )
  }

  return <div className="giscus-thread" ref={ref} />
}
