import { Nunito_Sans, Rubik } from "next/font/google"
import { SEO, organizationSchema, websiteSchema } from "@/lib/seo"
import "./globals.css"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = SEO.root

/**
 * ROOT LAYOUT — Solo estructura HTML base.
 *
 * Cada grupo de rutas maneja su propio layout:
 *   (public)/layout.tsx  → AppShell (Header, Nav, Footer)
 *   (admin)/layout.tsx   → AdminShell (sidebar, auth guard)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${nunito.variable} ${rubik.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
