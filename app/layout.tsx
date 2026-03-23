import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Plus_Jakarta_Sans, Outfit } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Electro Thina | Ferretería y Accesorios Eléctricos AT/MT",
  description:
    "Electro Thina - Fabricantes y distribuidores de ferretería y accesorios eléctricos para alta y media tensión. Aisladores, herrajes, conectores, cables y transformadores con certificaciones IEC y ANSI.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

/**
 * ROOT LAYOUT — Solo estructura HTML base.
 *
 * Cada grupo de rutas maneja su propio layout:
 *   (public)/layout.tsx  → AppShell (Header, Nav, Footer)
 *   (admin)/layout.tsx   → AdminShell (sidebar, auth guard)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
