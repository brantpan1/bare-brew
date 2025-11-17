import type { Metadata, Viewport } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-baskerville',
})

export const metadata: Metadata = {
  title: 'BOBA - Premium Packaged Bubble Tea',
  description:
    'Artisanal bubble tea, packaged at peak freshness and delivered to your door.',
  keywords: [
    'bubble tea',
    'boba',
    'milk tea',
    'taiwanese tea',
    'premium beverages',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
  openGraph: {
    title: 'BOBA - Premium Packaged Bubble Tea',
    description:
      'Artisanal bubble tea, packaged at peak freshness and delivered to your door',
    url: '/',
    siteName: 'BOBA',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable}`}
    >
      <body
        className={`${inter.className} antialiased min-h-screen bg-gray-50`}
      >
        <Navbar />

        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'font-sans',
            duration: 4000,
          }}
          richColors
          closeButton
        />

        {/* Dev indicator */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-50 rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white">
            DEV
          </div>
        )}
      </body>
    </html>
  )
}
