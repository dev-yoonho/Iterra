import type { Metadata } from 'next'
import { Gowun_Batang, IBM_Plex_Mono, Noto_Sans_KR } from 'next/font/google'
import type { ReactNode } from 'react'

import { getSiteSettings } from '@/lib/content'
import { serverUrl } from '@/lib/site'

import './globals.css'

const display = Gowun_Batang({
  display: 'swap',
  preload: false,
  weight: ['400', '700'],
  variable: '--font-display',
})

const body = Noto_Sans_KR({
  display: 'swap',
  preload: false,
  weight: ['400', '500', '700'],
  variable: '--font-body',
})

const mono = IBM_Plex_Mono({
  display: 'swap',
  preload: false,
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const generateMetadata = async (): Promise<Metadata> => {
  const site = await getSiteSettings()

  return {
    metadataBase: new URL(serverUrl),
    title: {
      default: site.siteName,
      template: `%s | ${site.siteName}`,
    },
    description: site.description,
    openGraph: {
      title: site.siteName,
      description: site.description,
      type: 'website',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={`${display.variable} ${body.variable} ${mono.variable}`} lang="ko">
      <body>{children}</body>
    </html>
  )
}
