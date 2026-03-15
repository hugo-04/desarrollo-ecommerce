"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ShoppingBag, Users, PhoneCall } from "lucide-react"
import { IconMenu, IconChevronDown, IconChevronRight, IconFire } from "@/components/icons"
import { categories } from "@/lib/data"

// ========== MEGA MENU ==========
function MegaMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isOpen && !activeCategory) {
      setActiveCategory(categories[0]?.id || null)
    }
  }, [isOpen, activeCategory])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all ${
          isOpen ? "bg-white/20" : "bg-white/10 hover:bg-white/20"
        }`}
      >
        <IconMenu className="h-4 w-4" />
        <span>Categorias</span>
        <IconChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full z-50 mt-8 flex w-[920px] overflow-hidden rounded-2xl shadow-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Left Column — tono oscuro navy */}
            <div className="w-64 shrink-0 bg-[#0B1035] p-3 max-h-[62vh] overflow-y-auto custom-scrollbar">
              <h3 className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Nuestro Catálogo
              </h3>
              <div className="space-y-0.5">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isActive = activeCategory === category.id
                  return (
                    <Link
                      key={category.id}
                      href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onClick={() => setIsOpen(false)}
                      className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/55 hover:bg-white/[0.06] hover:text-white/85"
                      }`}
                    >
                      {/* Borde rojo izquierdo en activo */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-red-500" />
                      )}
                      <div className="flex items-center gap-3 pl-1">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-white/[0.05] text-white/35 group-hover:bg-white/10 group-hover:text-white/65"
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[12.5px] font-semibold">{category.name}</span>
                      </div>
                      <IconChevronRight className={`h-3 w-3 transition-all ${
                        isActive ? "text-red-400 opacity-100" : "opacity-0 group-hover:opacity-30"
                      }`} />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Separador vertical */}
            <div className="w-px bg-white/[0.06] shrink-0" />

            {/* Right Column — blanco limpio */}
            <div className="flex-1 bg-white max-h-[62vh] overflow-y-auto custom-scrollbar">
              {activeCategory && (() => {
                const activeCat = categories.find((c) => c.id === activeCategory)
                if (!activeCat) return null
                return (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                    {/* Header de la columna derecha */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                      <div>
                        <h2 className="text-lg font-extrabold text-[#121A47]">{activeCat.name}</h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Más de <span className="font-bold text-primary">{activeCat.count}</span> productos
                        </p>
                      </div>
                      <Link
                        href={`/catalogo?categoria=${encodeURIComponent(activeCat.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                      >
                        Ver Todo <IconChevronRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Subcategorías */}
                    <div className="p-5">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {activeCat.subcategories.map((sub, index) => (
                          <Link
                            key={index}
                            href={`/catalogo?categoria=${encodeURIComponent(activeCat.name)}`}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 transition-all hover:border-slate-200 hover:bg-white"
                          >
                            <IconChevronRight className="h-3 w-3 shrink-0 text-slate-300 transition-colors group-hover:text-primary" />
                            <span className="text-[12.5px] font-medium text-slate-600 transition-colors group-hover:text-primary">
                              {sub}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ========== FLUID NAV ==========
const TAB_W = 140
const TAB_GAP = 6 // gap visual entre pills

function FluidNav() {
  const pathname = usePathname()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  const tabs = [
    { id: "/", label: "Inicio", icon: <Home size={14} /> },
    { id: "/catalogo", label: "Catalogo", icon: <ShoppingBag size={14} /> },
    { id: "/nosotros", label: "Nosotros", icon: <Users size={14} /> },
    { id: "/contacto", label: "Contacto", icon: <PhoneCall size={14} /> },
  ]

  const activeIndex = (() => {
    const i = tabs.findIndex(t => pathname === t.id || (t.id !== "/" && pathname.startsWith(t.id)))
    if (i !== -1) return i
    // /producto/[id] pertenece al tab Catálogo
    if (pathname.startsWith("/producto")) return tabs.findIndex(t => t.id === "/catalogo")
    return 0
  })()
  const hoveredIndex = tabs.findIndex(t => t.id === hoveredTab)

  return (
    <div className="hidden lg:block shrink-0 rounded-full bg-black/15 p-1 shadow-inner backdrop-blur-sm">
      <div className="relative flex items-center" style={{ width: TAB_W * tabs.length }}>

        {/* Active pill — con margen interno para separación visual */}
        <motion.div
          className="absolute inset-y-[3px] left-0 rounded-full bg-white shadow-sm"
          initial={false}
          animate={{ x: activeIndex * TAB_W + TAB_GAP / 2 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          style={{ width: TAB_W - TAB_GAP }}
        />

        {/* Hover pill */}
        {hoveredIndex !== -1 && hoveredIndex !== activeIndex && (
          <motion.div
            className="absolute inset-y-[3px] left-0 rounded-full bg-white/30"
            initial={false}
            animate={{ x: hoveredIndex * TAB_W + TAB_GAP / 2 }}
            transition={{ type: "spring", stiffness: 480, damping: 32 }}
            style={{ width: TAB_W - TAB_GAP }}
          />
        )}

        {/* Links */}
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex
          const isHovered = tab.id === hoveredTab
          return (
            <Link
              key={tab.id}
              href={tab.id}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{ width: TAB_W }}
              className={`relative z-10 flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#121A47]"
                  : isHovered
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span className="opacity-80">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ========== NAVIGATION ==========
export function Navigation() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  return (
    <nav className="bg-primary relative z-40">
      <div className="mx-auto max-w-7xl px-4 py-2.5">
        <div className="grid grid-cols-3 items-center">
          {/* Col 1 — izquierda */}
          <div className="flex justify-start">
            <MegaMenu isOpen={megaMenuOpen} setIsOpen={setMegaMenuOpen} />
          </div>

          {/* Col 2 — centro exacto */}
          <div className="flex justify-center">
            <FluidNav />
          </div>

          {/* Col 3 — derecha */}
          <div className="flex justify-end">
            <Link
              href="/catalogo?bestSellers=true"
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg"
            >
              <IconFire className="h-4 w-4" />
              <span className="hidden sm:inline">Mas Vendidos</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
