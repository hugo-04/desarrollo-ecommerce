import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Electro Thina | Ferretería y Accesorios Eléctricos AT/MT',
  description: 'Electro Thina - Fabricantes y distribuidores de ferretería y accesorios eléctricos para alta y media tensión. Aisladores, herrajes, conectores, cables y transformadores con certificaciones IEC y ANSI.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { AppShell } from "@/components/layout/AppShell"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <AppShell>
          {children}
        </AppShell>
        <Analytics />
      </body>
    </html>
  )
}
