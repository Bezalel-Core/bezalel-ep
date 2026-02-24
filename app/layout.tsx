import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bezalel EP 🎮',
  description: 'Bezalel Evolution Points - Sistema de recompensas e gamificação épico!',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#9d00ff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen" style={{ background: '#0a0a0f' }}>
        {children}
      </body>
    </html>
  )
}
