"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { TopBar } from "./TopBar"
import { Header } from "./Header"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { IconWhatsApp } from "@/components/icons"
import { globalAnimationsCSS } from "@/styles/animations"

/**
 * AppShell wraps all pages with the shared layout:
 * TopBar, Header, Navigation, Footer, WhatsApp FAB, and global CSS animations.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    
    // Check if we passed the actual top bar
    setIsScrolled(latest > 50)

    // Hide if scrolling down and passed 200px
    if (latest > previous && latest > 200) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalAnimationsCSS }} />
      <div className="min-h-screen bg-gradient-to-b from-[#F0F0F5] via-[#EBEBF2] to-[#E7E7EF] font-sans antialiased">
        <TopBar />
        
        {/* Sticky Wrapper for Header + Navigation */}
        <motion.div
          className={`sticky top-0 z-50 flex flex-col w-full transition-shadow duration-300 ${isScrolled ? "shadow-2xl shadow-black/20" : ""}`}
          variants={{
            visible: {
              y: 0,
              transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }
            },
            hidden: {
              y: "-100%",
              transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] }
            }
          }}
          animate={hidden ? "hidden" : "visible"}
        >
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Navigation />
        </motion.div>

        {children}

        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/51123456789?text=Hola%2C%20me%20gustaria%20solicitar%20informacion."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-bounce fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-colors hover:bg-green-600"
          aria-label="Contactar por WhatsApp"
        >
          <IconWhatsApp className="h-7 w-7" />
        </a>
      </div>
    </>
  )
}
