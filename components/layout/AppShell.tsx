"use client"

import { useState, useRef } from "react"
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
 * AppShell wraps all pages with the shared layout:
 * TopBar, Header, Navigation, Footer, WhatsApp FAB, and global CSS animations.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isProductDetail = pathname?.startsWith("/producto/")
  const [searchQuery, setSearchQuery] = useState("")
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // Ref (no re-render) — tells us if we're near the top when transitioning to visible
  const nearTop = useRef(true)
  const { scrollY } = useScroll()

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

  // Transition depends on direction and position:
  // - hiding   → instant (0.12s sharp easeIn)
  // - showing near top → no animation (instant snap, no bounce)
  // - showing mid-page → quick easeOut (0.2s)
  const navTransition = hidden
    ? { duration: 0.12, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] }
    : nearTop.current
      ? { duration: 0 }
      : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalAnimationsCSS }} />
      <div className="min-h-screen bg-gradient-to-b from-[#F0F0F5] via-[#EBEBF2] to-[#E7E7EF] font-sans antialiased">
        <TopBar />

        {/* Sticky Wrapper for Header + Navigation */}
        <motion.div
          className={`sticky top-0 z-50 flex flex-col w-full transition-shadow duration-300 ${isScrolled ? "shadow-2xl shadow-black/20" : ""}`}
          animate={{ y: hidden ? "-100%" : 0 }}
          transition={navTransition}
        >
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Navigation />
        </motion.div>

        {children}

        <Footer />

        {/* Floating WhatsApp Button — oculto en detalle de producto */}
        {!isProductDetail && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {/* Tooltip "Cotizar aquí" */}
            <span className="whatsapp-label pointer-events-none whitespace-nowrap rounded-lg border border-green-100 bg-white px-3 py-1.5 text-sm font-semibold text-green-700 shadow-lg shadow-green-500/20">
              Cotizar aquí
            </span>
            {/* Wrapper con bounce — ring y botón se mueven juntos */}
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
