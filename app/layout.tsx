import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'sonner'

import { Providers } from '@/components/providers/providers'
import { AuthProvider } from '@/components/providers/auth-provider'
import { CartProvider } from '@/components/providers/cart-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'BOBA - Premium Packaged Bubble Tea',
    template: '%s | BOBA',
  },
  description:
    'Artisanal bubble tea, packaged at peak freshness and delivered to your door. Experience premium boba drinks with authentic flavors.',
  keywords: [
    'bubble tea',
    'boba',
    'milk tea',
    'taiwanese tea',
    'packaged drinks',
    'premium beverages',
    'artisanal tea',
  ],
  authors: [{ name: 'BOBA Team' }],
  creator: 'BOBA',
  publisher: 'BOBA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
  openGraph: {
    title: 'BOBA - Premium Packaged Bubble Tea',
    description:
      'Artisanal bubble tea, packaged at peak freshness and delivered to your door',
    url: '/',
    siteName: 'BOBA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BOBA - Premium Bubble Tea',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOBA - Premium Packaged Bubble Tea',
    description: 'Artisanal bubble tea delivered to your door',
    images: ['/twitter-image.jpg'],
    creator: '@boba',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/manifest.json',
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <link rel="preconnect" href="https://cdn.stripe.com" />
            <link rel="preconnect" href="https://api.stripe.com" />
          </>
        )}
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-background`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>

          {/* Global UI Elements */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgb(24 24 27)',
                color: 'rgb(244 244 245)',
                border: '1px solid rgb(39 39 42)',
              },
              className: 'sonner-toast',
              duration: 4000,
            }}
            theme="dark"
            richColors
            closeButton
            expand={false}
          />
        </Providers>

        {/* Development mode indicator */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-50 rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white">
            DEV
          </div>
        )}
      </body>
    </html>
  )
}
