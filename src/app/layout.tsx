import type { Metadata } from 'next'
import { Archivo_Black, Space_Mono, Work_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import { getSiteSettings } from '@/lib/content'
import { serverUrl } from '@/lib/site'

import './globals.css'

const display = Archivo_Black({
  display: 'swap',
  preload: true,
  weight: ['400'],
  variable: '--font-display',
  subsets: ['latin'],
})

const body = Work_Sans({
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  subsets: ['latin'],
})

const mono = Space_Mono({
  display: 'swap',
  preload: false,
  weight: ['400', '700'],
  variable: '--font-mono',
  subsets: ['latin'],
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
    <html className={`${display.variable} ${body.variable} ${mono.variable}`} lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
