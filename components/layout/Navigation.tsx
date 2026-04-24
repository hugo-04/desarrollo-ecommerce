"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ShoppingBag, Users, PhoneCall, UserRound, X, Menu, ChevronDown, LayoutGrid } from "lucide-react"
import { IconChevronDown, IconChevronRight, IconFire } from "@/components/icons"
import { useCategories } from "@/features/categorias/hooks"
import { getCategoryIcon } from "@/lib/category-icons"

// ========== MEGA MENU (botón izquierdo) ==========
function MegaMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const { categories } = useCategories()
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isOpen && !activeCategory && categories.length > 0)
      setActiveCategory(categories[0]?.id || null)
  }, [isOpen, activeCategory, categories])

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true) }}
      onMouseLeave={() => { timeoutRef.current = setTimeout(() => setIsOpen(false), 150) }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-white transition-all ${
          isOpen ? "bg-white/20" : "bg-white/10 hover:bg-white/20"
        }`}
      >
        <LayoutGrid className="h-4 w-4 shrink-0" />
        <span className="text-xs font-semibold">Categorías</span>
        <IconChevronDown className={`h-3 w-3 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full z-50 mt-2 flex overflow-hidden rounded-2xl shadow-2xl
                       w-[92vw] max-w-[320px] sm:max-w-[600px] lg:max-w-[920px] sm:w-[600px] lg:w-[920px]"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Left Column */}
            <div className="w-full sm:w-56 lg:w-64 shrink-0 bg-[#0B1035] p-3 max-h-[55vh] overflow-y-auto overscroll-contain">
              <h3 className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">Nuestro Catálogo</h3>
              <div className="space-y-0.5">
                {categories.map((category) => {
                  const Icon = getCategoryIcon(category.slug)
                  const isActive = activeCategory === category.id
                  return (
                    <Link
                      key={category.id}
                      href={`/categoria/${category.slug}`}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onClick={(e) => {
                        if (activeCategory !== category.id) {
                          e.preventDefault()
                          setActiveCategory(category.id)
                        } else {
                          setIsOpen(false)
                        }
                      }}
                      className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                        isActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white active:bg-white/15 active:text-white"
                      }`}
                    >
                      {isActive && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-red-500" />}
                      <div className="flex items-center gap-3 pl-1">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isActive ? "bg-red-500/20 text-red-400" : "bg-white/[0.05] text-white/40 group-hover:bg-white/15 group-hover:text-white group-active:bg-white/15 group-active:text-white"
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[12px] font-semibold">{category.name}</span>
                      </div>
                      <IconChevronRight className={`h-3 w-3 transition-all ${isActive ? "text-red-400 opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                    </Link>
                  )
                })}
              </div>

              {/* Subcategorías inline — solo mobile táctil */}
              {activeCategory && (() => {
                const activeCat = categories.find((c) => c.id === activeCategory)
                if (!activeCat || !activeCat.subcategories.length) return null
                return (
                  <motion.div
                    key={`sub-${activeCategory}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="sm:hidden mt-3 border-t border-white/[0.08] pt-3"
                  >
                    <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                        {activeCat.name}
                      </span>
                      <Link
                        href={`/categoria/${activeCat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300"
                      >
                        Ver todo →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {activeCat.subcategories.map((sub, i) => (
                        <Link
                          key={i}
                          href={`/categoria/${activeCat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-white/60 transition-colors hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white"
                        >
                          <IconChevronRight className="h-2.5 w-2.5 shrink-0 text-red-500/50" />
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )
              })()}
            </div>

            <div className="w-px bg-white/[0.06] shrink-0 hidden sm:block" />

            {/* Right Column — subcategorías, oculta en mobile */}
            <div className="hidden sm:flex flex-col flex-1 bg-white max-h-[55vh] overflow-y-auto overscroll-contain">
              {activeCategory && (() => {
                const activeCat = categories.find((c) => c.id === activeCategory)
                if (!activeCat) return null
                return (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
                      <div>
                        <h2 className="text-base font-extrabold text-[#121A47] sm:text-lg">{activeCat.name}</h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Más de <span className="font-bold text-primary">{activeCat.count}</span> productos
                        </p>
                      </div>
                      <Link
                        href={`/categoria/${activeCat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                      >
                        Ver Todo <IconChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <div className="p-3 sm:p-5">
                      <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
                        {activeCat.subcategories.map((sub, index) => (
                          <Link
                            key={index}
                            href={`/categoria/${activeCat.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 transition-all hover:border-slate-200 hover:bg-slate-50"
                          >
                            <IconChevronRight className="h-3 w-3 shrink-0 text-slate-300 transition-colors group-hover:text-primary" />
                            <span className="text-[12px] font-medium text-slate-600 transition-colors group-hover:text-primary">{sub}</span>
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

// ========== CATEGORIES DROPDOWN (en tab Catálogo del FluidNav) ==========
function CatalogDropdown({ onClose }: { onClose: () => void }) {
  const { categories } = useCategories()

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-[#0d1440] shadow-2xl"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 py-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">Categorías</p>
      </div>

      {/* Lista de categorías */}
      <div className="max-h-[60vh] overflow-y-auto py-2">
        {/* Opción — Ver todo el catálogo */}
        <Link
          href="/catalogo"
          onClick={onClose}
          className="group flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.06]"
        >
          <span className="font-semibold text-white/90">Ver todo el catálogo</span>
          <span className="rounded-md bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">Todo</span>
        </Link>

        <div className="mx-4 my-1.5 h-px bg-white/[0.05]" />

        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.slug)
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              onClick={onClose}
              className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-white/40 transition-colors group-hover:bg-red-500/20 group-hover:text-red-400">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="flex-1 truncate text-[13px] font-medium text-white/60 transition-colors group-hover:text-white">
                {cat.name}
              </span>
              <span className="text-[10px] text-white/20 group-hover:text-white/40">{cat.count}</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}

// ========== FLUID NAV (desktop) ==========
const TAB_W = 130
const TAB_GAP = 6

function FluidNav() {
  const pathname = usePathname()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)
  const catalogTimeout = useRef<NodeJS.Timeout | null>(null)

  const tabs = [
    { id: "/", label: "Inicio", icon: <Home size={14} />, hasDropdown: false },
    { id: "/catalogo", label: "Productos", icon: <ShoppingBag size={14} />, hasDropdown: false },
    { id: "/nosotros", label: "Nosotros", icon: <Users size={14} />, hasDropdown: false },
    { id: "/contacto", label: "Contacto", icon: <PhoneCall size={14} />, hasDropdown: false },
  ]

  const activeIndex = (() => {
    const i = tabs.findIndex(t => pathname === t.id || (t.id !== "/" && pathname.startsWith(t.id)))
    if (i !== -1) return i
    if (pathname.startsWith("/producto")) return tabs.findIndex(t => t.id === "/catalogo")
    return 0
  })()
  const hoveredIndex = tabs.findIndex(t => t.id === hoveredTab)

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
        setCatalogOpen(false)
      }
    }
    if (catalogOpen) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [catalogOpen])

  return (
    <div className="hidden lg:block shrink-0 rounded-full bg-black/15 p-1 shadow-inner backdrop-blur-sm">
      <div className="relative flex items-center" style={{ width: TAB_W * tabs.length }}>
        {/* Active pill */}
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

        {tabs.map((tab, index) => {
          const isActive = index === activeIndex

          if (tab.hasDropdown) {
            return (
              <div
                key={tab.id}
                ref={catalogRef}
                className="relative"
                style={{ width: TAB_W }}
                onMouseEnter={() => {
                  if (catalogTimeout.current) clearTimeout(catalogTimeout.current)
                  setHoveredTab(tab.id)
                  setCatalogOpen(true)
                }}
                onMouseLeave={() => {
                  setHoveredTab(null)
                  catalogTimeout.current = setTimeout(() => setCatalogOpen(false), 180)
                }}
              >
                <button
                  onClick={() => setCatalogOpen((v) => !v)}
                  style={{ width: TAB_W }}
                  className={`relative z-10 flex items-center justify-center gap-1 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-[#121A47]" : "text-white"
                  }`}
                >
                  <span className="opacity-80">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 ${catalogOpen ? "rotate-180" : ""} ${isActive ? "text-[#121A47]/60" : "text-white/40"}`}
                  />
                </button>

                <AnimatePresence>
                  {catalogOpen && <CatalogDropdown onClose={() => setCatalogOpen(false)} />}
                </AnimatePresence>
              </div>
            )
          }

          return (
            <Link
              key={tab.id}
              href={tab.id}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{ width: TAB_W }}
              className={`relative z-10 flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                isActive ? "text-[#121A47]" : "text-white"
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

// ========== MOBILE DRAWER ==========
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  const tabs = [
    { id: "/",         label: "Inicio",    icon: <Home size={18} />        },
    { id: "/catalogo", label: "Productos", icon: <ShoppingBag size={18} /> },
    { id: "/nosotros", label: "Nosotros",  icon: <Users size={18} />       },
    { id: "/contacto", label: "Contacto",  icon: <PhoneCall size={18} />   },
  ]

  useEffect(() => { onClose() }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 z-[70] flex w-[300px] flex-col bg-gradient-to-b from-[#0a0f2c] to-[#121A47] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <img src="/logo/logotipo.png" alt="Electro Thina" className="h-8 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6)) brightness(1.3)" }} />
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-white/30">Menú</p>
              {tabs.map((tab) => {
                const isActive = tab.id === "/" ? pathname === "/" : pathname.startsWith(tab.id)
                return (
                  <Link key={tab.id} href={tab.id}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all mb-1 ${
                      isActive ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className={isActive ? "text-red-400" : "text-white/40"}>{tab.icon}</span>
                    {tab.label}
                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500" />}
                  </Link>
                )
              })}
            </nav>

            {/* Bottom actions */}
            <div className="border-t border-white/[0.07] p-4">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/15"
              >
                <UserRound size={15} /> Login
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ========== NAVIGATION ==========
export function Navigation() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <nav className="bg-primary relative z-40">
        <div className="mx-auto max-w-7xl px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex items-center justify-between gap-2">

            {/* Izquierda */}
            <div className="flex items-center gap-2">
              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu size={18} />
              </button>
              {/* Mega menú — todos los dispositivos */}
              <MegaMenu isOpen={megaMenuOpen} setIsOpen={setMegaMenuOpen} />
            </div>

            {/* Centro — FluidNav */}
            <div className="flex flex-1 justify-center lg:flex-none">
              <FluidNav />
            </div>

            {/* Derecha */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:flex"
              >
                <UserRound size={15} />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                href="/catalogo?bestSellers=true"
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 sm:gap-2 sm:px-4"
              >
                <IconFire className="h-4 w-4" />
                <span className="hidden sm:inline">Mas Vendidos</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
