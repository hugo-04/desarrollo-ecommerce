"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { TopBar } from "./TopBar"
import { Header } from "./Header"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { IconWhatsApp } from "@/components/icons"
import { globalAnimationsCSS } from "@/styles/animations"
import { WA } from "@/lib/contact"

/**
 * AppShell wraps all pages with the shared layout.
 *
 * El nav usa `position: fixed` (no sticky) para que al ocultarse con
 * translateY(-100%) NO revele contenido que estaba detrás del nav.
 * Con sticky ocurría un flash blanco en páginas con contenido claro al top.
 * Con fixed, el nav flota sobre el contenido y el padding-top compensa su altura.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isProductDetail = pathname?.startsWith("/producto/")
  const [searchQuery, setSearchQuery] = useState("")
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const nearTop = useRef(true)
  const { scrollY } = useScroll()

  // Medir el alto real del nav para el padding-top del contenido
  const navRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(136) // aproximado inicial para evitar FOUC

  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (navRef.current) observer.observe(navRef.current)
    return () => observer.disconnect()
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    nearTop.current = latest < 80
    setIsScrolled(latest > 50)

    if (latest > previous && latest > 200) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  // Transition según dirección y posición
  const navTransition = hidden
    ? { duration: 0.15, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] }
    : nearTop.current
      ? { duration: 0 }
      : { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalAnimationsCSS }} />
      <div className="min-h-screen bg-white font-sans antialiased">

        {/* Nav fijo — TopBar + Header + Navigation se mueven como una unidad */}
        <motion.div
          ref={navRef}
          className={`fixed inset-x-0 top-0 z-50 flex flex-col transition-shadow duration-300 ${
            isScrolled ? "shadow-2xl shadow-black/20" : ""
          }`}
          animate={{ y: hidden ? "-100%" : 0 }}
          transition={navTransition}
        >
          <TopBar />
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Navigation />
        </motion.div>

        {/* Contenido desplazado exactamente el alto del nav fijo */}
        <div style={{ paddingTop: navHeight }}>
          {children}
          <Footer />
        </div>

        {/* Floating WhatsApp Button — oculto en detalle de producto */}
        {!isProductDetail && (
          <div className="fixed bottom-30 right-6 z-50 flex items-center gap-3">
            <span className="whatsapp-label pointer-events-none whitespace-nowrap rounded-lg border border-green-100 bg-white px-3 py-1.5 text-sm font-semibold text-green-700 shadow-lg shadow-green-500/20">
              Cotizar aquí
            </span>
            <div className="whatsapp-bounce relative flex h-14 w-14 items-center justify-center">
              <span className="whatsapp-ring absolute inset-0 rounded-full bg-green-400" />
              <span className="whatsapp-ring-delayed absolute inset-0 rounded-full bg-green-400" />
              <a
                href={WA.general}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-colors hover:bg-green-600"
                aria-label="Contactar por WhatsApp"
              >
                <IconWhatsApp className="h-7 w-7" />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
