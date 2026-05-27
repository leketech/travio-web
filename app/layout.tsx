import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Travio — Know before you go.',
    template: '%s · Travio',
  },
  description:
    'AI-powered travel budget planner. Enter your budget, destination, and trip length — we build the smartest spend plan for your trip.',
  keywords: ['travel budget', 'travel planner', 'AI travel', 'budget travel', 'can I afford'],
  authors: [{ name: 'Travio' }],
  creator: 'Travio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://travio.app',
    siteName: 'Travio',
    title: 'Travio — Know before you go.',
    description: 'AI-powered travel budget planner. Know exactly what you can afford before you fly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travio — Know before you go.',
    description: 'AI-powered travel budget planner.',
    creator: '@travio_app',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
