"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ShoppingBag, Users, PhoneCall, UserRound, X, Menu, ChevronDown, LayoutGrid, Award, BookOpen } from "lucide-react"
import { IconChevronRight, IconFire } from "@/components/icons"
import { getCategoryIcon } from "@/lib/category-icons"

import { useInfiniteCategories } from "@/features/categorias/hooks"
import { useInfiniteBrands }    from "@/features/marcas/hooks"
import { Search, Loader2 } from "lucide-react"

// ========== MEGA MENU (botón izquierdo) ==========
function MegaMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteCategories(debouncedSearch)

  const categories = data?.pages.flatMap((page) => page.data) ?? []

  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mobileObserverRef = useRef<HTMLDivElement>(null)
  const desktopObserverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !activeCategory && categories.length > 0)
      setActiveCategory(categories[0]?.id ?? null)
  }, [isOpen, categories])

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  // Bloquea scroll del body cuando el bottom sheet está abierto en móvil
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("drawer-open")
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("drawer-open")
    }
    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("drawer-open")
    }
  }, [isOpen])

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        // Find if any of the entries (mobile or desktop) is intersecting
        const isIntersecting = entries.some(entry => entry.isIntersecting)
        if (isIntersecting) fetchNextPage()
      },
      { threshold: 0.1 }
    )
    if (mobileObserverRef.current) observer.observe(mobileObserverRef.current)
    if (desktopObserverRef.current) observer.observe(desktopObserverRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const activeCat = categories.find((c) => c.id === activeCategory) ?? null

  return (
    <div
      className="relative"
      onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true) }}
      onMouseLeave={() => { timeoutRef.current = setTimeout(() => setIsOpen(false), 180) }}
    >
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
          isOpen ? "bg-[#FF6B35] text-white shadow-md" : "bg-white/10 text-white/90 hover:bg-white/20"
        }`}
      >
        <LayoutGrid className="h-4 w-4 shrink-0" />
        <span className="text-[13px] font-bold tracking-wide">Categorías</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* ══════════════════════════════════════════════════
                MÓVIL — Bottom Sheet (fixed, cubre pantalla)
            ══════════════════════════════════════════════════ */}

            {/* Backdrop móvil */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Bottom sheet */}
            <motion.div
              key="mobile-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-[60] flex flex-col rounded-t-3xl bg-white shadow-2xl sm:hidden"
              style={{ maxHeight: "92vh" }}
            >
              {/* Handle — siempre visible */}
              <div className="flex shrink-0 justify-center pt-3 pb-1">
                <div className="h-1 w-10 rounded-full bg-slate-200" />
              </div>

              {/* Contenedor de scroll único — cubre header + búsqueda + lista + footer */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain">

                {/* Header sticky */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-[#1B2B4B]" />
                    <h2 className="text-base font-extrabold text-[#0f1e35]">Categorías</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Search */}
                <div className="px-4 py-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar categoría..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#1B2B4B]/40 focus:bg-white focus:ring-2 focus:ring-[#1B2B4B]/15"
                    />
                  </div>
                </div>

                {/* Lista de categorías */}
                {status === "pending" ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
                  </div>
                ) : categories.length === 0 ? (
                  <p className="py-8 text-center text-sm italic text-slate-400">Sin resultados</p>
                ) : (
                  <div className="px-3">
                    {categories.map((cat) => {
                      const Icon = getCategoryIcon(cat.slug)
                      const isExpanded = mobileExpanded === cat.id

                      return (
                        <div key={cat.id} className="border-b border-slate-50 last:border-0">
                          {/* Fila: link a categoría (izq) + botón acordeón (der) */}
                          <div className="flex items-center">
                            <Link
                              href={`/categoria/${cat.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="flex flex-1 items-center gap-3 py-3.5 pl-2 pr-1"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1B2B4B]/[0.07] text-[#1B2B4B]">
                                {cat.image && cat.image.startsWith("http") ? (
                                  <img src={cat.image} alt={cat.imageAlt ?? cat.name} className="h-full w-full object-cover" />
                                ) : (
                                  <Icon className="h-4 w-4" />
                                )}
                              </div>
                              <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
                              {cat.count > 0 && (
                                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                                  {cat.count}
                                </span>
                              )}
                            </Link>
                            {cat.subcategoryItems && cat.subcategoryItems.length > 0 && (
                              <button
                                onClick={() => setMobileExpanded(isExpanded ? null : cat.id)}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50"
                                aria-label={isExpanded ? "Cerrar subcategorías" : "Ver subcategorías"}
                              >
                                <ChevronDown
                                  size={15}
                                  className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#1B2B4B]" : ""}`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Acordeón subcategorías */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="ml-2 mb-2 space-y-0.5 border-l-2 border-[#1B2B4B]/10 pl-3">
                                  {/* Ver todos los productos de la categoría */}
                                  <Link
                                    href={`/categoria/${cat.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-xs font-bold text-[#1B2B4B] transition-colors hover:bg-[#1B2B4B]/[0.06]"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
                                    Ver todos ({cat.count} productos)
                                  </Link>
                                  {/* Subcategorías individuales */}
                                  {cat.subcategoryItems?.map((sub) => (
                                    <Link
                                      key={sub.id}
                                      href={`/categoria/${cat.slug}?subId=${sub.id}`}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-[#1B2B4B]"
                                    >
                                      {sub.image && sub.image.startsWith("http") ? (
                                        <div className="flex h-6 w-6 shrink-0 overflow-hidden rounded-md">
                                          <img src={sub.image} alt={sub.imageAlt ?? sub.name} className="h-full w-full object-cover" />
                                        </div>
                                      ) : (
                                        <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                                      )}
                                      <span className="truncate">{sub.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}

                    {/* Infinite scroll trigger */}
                    <div ref={mobileObserverRef} className="h-4 w-full">
                      {isFetchingNextPage && (
                        <div className="flex justify-center py-2">
                          <Loader2 className="h-4 w-4 animate-spin text-slate-300" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer CTA — dentro del scroll, siempre accesible al fondo */}
                <div className="border-t border-slate-100 p-4">
                  <Link
                    href="/catalogo"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0f1e35] to-[#1B2B4B] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1B2B4B]/20"
                  >
                    Ver todo el catálogo
                    <IconChevronRight className="h-4 w-4" />
                  </Link>
                </div>

              </div>
            </motion.div>

            {/* ══════════════════════════════════════════════════
                DESKTOP — Dropdown de dos paneles (sm+)
            ══════════════════════════════════════════════════ */}
            <motion.div
              key="desktop-dropdown"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-full z-50 mt-2 hidden overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.14)] ring-1 ring-slate-200
                         sm:block sm:w-[600px] lg:w-[940px]"
            >
              {/* Search header */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar categoría..."
                    className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-[12px] text-slate-700 outline-none ring-1 ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-[#1B2B4B]/40"
                  />
                </div>
                <Link
                  href="/catalogo"
                  onClick={() => setIsOpen(false)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#1B2B4B] px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-[#243660]"
                >
                  Ver todo
                  <IconChevronRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Body — dos paneles */}
              <div className="flex">
                {/* Panel izquierdo — lista de categorías */}
                <div className="w-56 shrink-0 border-r border-slate-100 lg:w-60 max-h-[58vh] overflow-y-auto overscroll-contain custom-scrollbar">
                  {status === "pending" ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
                    </div>
                  ) : categories.length === 0 ? (
                    <p className="py-6 text-center text-[11px] italic text-slate-400">Sin resultados</p>
                  ) : (
                    <div className="p-2 space-y-0.5">
                      {categories.map((cat) => {
                        const Icon = getCategoryIcon(cat.slug)
                        const isActive = activeCategory === cat.id

                        return (
                          <div
                            key={cat.id}
                            className={`group relative flex w-full items-center rounded-xl transition-all duration-150 ${
                              isActive
                                ? "bg-[#1B2B4B]/[0.07] text-[#1B2B4B]"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                            onMouseEnter={() => setActiveCategory(cat.id)}
                          >
                            {isActive && (
                              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#FF6B35]" />
                            )}
                            <Link
                              href={`/categoria/${cat.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="flex flex-1 items-center gap-2.5 px-3 py-2.5 pl-4"
                            >
                              <div className={`flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-colors ${
                                isActive
                                  ? "bg-[#1B2B4B]/10 text-[#1B2B4B]"
                                  : "bg-slate-100 text-slate-400 group-hover:bg-[#1B2B4B]/10 group-hover:text-[#1B2B4B]"
                              }`}>
                                {cat.image && cat.image.startsWith("http") ? (
                                  <img src={cat.image} alt={cat.imageAlt ?? cat.name} className="h-full w-full object-cover" />
                                ) : (
                                  <Icon className="h-3.5 w-3.5" />
                                )}
                              </div>
                              <span className="text-[12px] font-semibold leading-tight">{cat.name}</span>
                              <IconChevronRight className={`ml-auto h-3 w-3 shrink-0 transition-all ${
                                isActive ? "text-[#FF6B35] opacity-100" : "opacity-0 group-hover:opacity-40"
                              }`} />
                            </Link>
                          </div>
                        )
                      })}
                      <div ref={desktopObserverRef} className="h-3 w-full">
                        {isFetchingNextPage && (
                          <div className="flex justify-center py-1">
                            <Loader2 className="h-3 w-3 animate-spin text-slate-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Panel derecho — subcategorías */}
                <div className="flex flex-1 flex-col max-h-[58vh] overflow-y-auto overscroll-contain">
                  {activeCat ? (
                    <motion.div
                      key={activeCat.id}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-1 flex-col"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <div>
                          <h2 className="text-sm font-extrabold text-[#0f1e35]">{activeCat.name}</h2>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            <span className="font-bold text-[#1B2B4B]">{activeCat.count}</span> productos disponibles
                          </p>
                        </div>
                        <Link
                          href={`/categoria/${activeCat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:border-[#1B2B4B]/30 hover:bg-[#1B2B4B]/[0.04] hover:text-[#1B2B4B]"
                        >
                          Ver todo
                          <IconChevronRight className="h-2.5 w-2.5" />
                        </Link>
                      </div>
                      <div className="flex-1 p-5">
                        {activeCat.subcategoryItems && activeCat.subcategoryItems.length > 0 ? (
                          <div className="grid grid-cols-2 gap-1 lg:grid-cols-3">
                            {activeCat.subcategoryItems.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/categoria/${activeCat.slug}?subId=${sub.id}`}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-2 transition-all hover:border-slate-200 hover:bg-slate-50"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#1B2B4B]/[0.07] transition-colors group-hover:bg-[#1B2B4B]/15">
                                  {sub.image && sub.image.startsWith("http") ? (
                                    <img src={sub.image} alt={sub.imageAlt ?? sub.name} className="h-full w-full object-cover" />
                                  ) : (
                                    <IconChevronRight className="h-2.5 w-2.5 text-[#1B2B4B]" />
                                  )}
                                </div>
                                <span className="truncate text-[12px] font-medium text-slate-600 transition-colors group-hover:text-[#1B2B4B]">
                                  {sub.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-2 py-8 text-center">
                            <p className="text-xs text-slate-400">Explora todos los productos de esta categoría</p>
                            <Link
                              href={`/categoria/${activeCat.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="mt-1 rounded-lg bg-[#1B2B4B] px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-[#243660]"
                            >
                              Ver categoría
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center py-12 text-sm text-slate-300">
                      Selecciona una categoría
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ========== CATEGORIES DROPDOWN (en tab Catálogo del FluidNav) ==========
function CatalogDropdown({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    status 
  } = useInfiniteCategories(debouncedSearch)

  const categories = data?.pages.flatMap(page => page.data) ?? []

  // Ref para el scroll infinito
  const observerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage()
    }, { threshold: 0.1 })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-slate-200"
    >
      {/* Header + Search */}
      <div className="border-b border-slate-100 px-4 py-3 space-y-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">Categorías</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-[12px] text-slate-700 outline-none ring-1 ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-[#1B2B4B]/40"
          />
        </div>
      </div>

      {/* Lista de categorías */}
      <div className="max-h-[60vh] overflow-y-auto py-2 custom-scrollbar">
        {/* Opción — Ver todo el catálogo */}
        <Link
          href="/catalogo"
          onClick={onClose}
          className="group flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-slate-50"
        >
          <span className="font-semibold text-slate-700">Ver todo el catálogo</span>
          <span className="rounded-md bg-[#1B2B4B]/10 px-2 py-0.5 text-[10px] font-bold text-[#1B2B4B]">Todo</span>
        </Link>

        <div className="mx-4 my-1.5 h-px bg-slate-100" />

        {status === "pending" ? (
          <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin text-slate-300" /></div>
        ) : categories.length === 0 ? (
          <p className="py-4 text-center text-[11px] text-slate-400 italic">No hay resultados</p>
        ) : (
          <>
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.slug)
              return (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-colors group-hover:bg-[#1B2B4B]/10 group-hover:text-[#1B2B4B]">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 truncate text-[13px] font-medium text-slate-600 transition-colors group-hover:text-[#1B2B4B]">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#1B2B4B]">{cat.count}</span>
                </Link>
              )
            })}
            <div ref={observerRef} className="h-4 w-full">
               {isFetchingNextPage && <div className="flex justify-center py-2"><Loader2 className="h-3 w-3 animate-spin text-slate-300" /></div>}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// ========== MARCAS DROPDOWN (tab Marcas del FluidNav) ==========
function MarcasDropdown({ onClose }: { onClose: () => void }) {
  const [search, setSearch]             = useState("")
  const [debouncedSearch, setDebounced] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteBrands(debouncedSearch)
  const brands = data?.pages.flatMap((p) => p.data) ?? []

  const observerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage()
    }, { threshold: 0.1 })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-slate-200"
    >
      {/* Header + Search */}
      <div className="border-b border-slate-100 px-4 py-3 space-y-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">Marcas</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar marca..."
            className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-[12px] text-slate-700 outline-none ring-1 ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-[#1B2B4B]/40"
          />
        </div>
      </div>

      {/* Lista de marcas */}
      <div className="max-h-[60vh] overflow-y-auto py-2 custom-scrollbar">
        {/* Ver todas las marcas */}
        <Link
          href="/marcas"
          onClick={onClose}
          className="group flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-slate-50"
        >
          <span className="font-semibold text-slate-700">Ver todas las marcas</span>
          <span className="rounded-md bg-[#1B2B4B]/10 px-2 py-0.5 text-[10px] font-bold text-[#1B2B4B]">Todas</span>
        </Link>

        <div className="mx-4 my-1.5 h-px bg-slate-100" />

        {status === "pending" ? (
          <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin text-slate-300" /></div>
        ) : brands.length === 0 ? (
          <p className="py-4 text-center text-[11px] text-slate-400 italic">No hay resultados</p>
        ) : (
          <>
            {brands.map((brand) => {
              const hasLogo = brand.logo && brand.logo.startsWith("http")
              return (
                <Link
                  key={brand.id}
                  href={`/marca/${encodeURIComponent(brand.name)}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-7 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100 transition-colors group-hover:bg-[#1B2B4B]/10">
                    {hasLogo ? (
                      <img src={brand.logo} alt={brand.logoAlt ?? brand.name} className="h-full w-full object-contain p-0.5" />
                    ) : (
                      <Award className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1B2B4B]" />
                    )}
                  </div>
                  <span className="flex-1 truncate text-[13px] font-medium text-slate-600 transition-colors group-hover:text-[#1B2B4B]">
                    {brand.name}
                  </span>
                  {brand.productCount !== undefined && (
                    <span className="text-[10px] text-slate-400 group-hover:text-[#1B2B4B]">{brand.productCount}</span>
                  )}
                </Link>
              )
            })}
            <div ref={observerRef} className="h-4 w-full">
              {isFetchingNextPage && <div className="flex justify-center py-2"><Loader2 className="h-3 w-3 animate-spin text-slate-300" /></div>}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// ========== FLUID NAV (desktop) ==========
const TAB_W = 100
const TAB_GAP = 6

function FluidNav() {
  const pathname = usePathname()
  const [marcasOpen, setMarcasOpen]   = useState(false)
  const marcasRef                      = useRef<HTMLDivElement>(null)
  const marcasTimeout                  = useRef<NodeJS.Timeout | null>(null)

  const tabs = [
    { id: "/",         label: "Inicio",    icon: <Home size={14} />,        dropdown: null },
    { id: "/catalogo", label: "Productos", icon: <ShoppingBag size={14} />, dropdown: null },
    { id: "/marcas",   label: "Marcas",    icon: <Award size={14} />,       dropdown: "marcas" as const },
    { id: "/blog",     label: "Blog",      icon: <BookOpen size={14} />,    dropdown: null },
    { id: "/nosotros", label: "Nosotros",  icon: <Users size={14} />,       dropdown: null },
    { id: "/contacto", label: "Contacto",  icon: <PhoneCall size={14} />,   dropdown: null },
  ]

  const activeIndex = (() => {
    const i = tabs.findIndex((t) => pathname === t.id || (t.id !== "/" && pathname.startsWith(t.id)))
    if (i !== -1) return i
    if (pathname.startsWith("/producto") || pathname.startsWith("/categoria")) return tabs.findIndex((t) => t.id === "/catalogo")
    if (pathname.startsWith("/marca")) return tabs.findIndex((t) => t.id === "/marcas")
    return 0
  })()

  // Cierra marcas al click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (marcasRef.current && !marcasRef.current.contains(e.target as Node)) setMarcasOpen(false)
    }
    if (marcasOpen) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [marcasOpen])

  return (
    <div className="hidden lg:flex items-center shrink-0">
      <div className="relative flex items-center" style={{ width: TAB_W * tabs.length }}>

        {/* Línea inferior animada — indicador de tab activo */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] rounded-t-full bg-[#FF6B35]"
          initial={false}
          animate={{ x: activeIndex * TAB_W + TAB_GAP / 2, width: TAB_W - TAB_GAP }}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />

        {tabs.map((tab, index) => {
          const isActive = index === activeIndex

          if (tab.dropdown === "marcas") {
            return (
              <div
                key={tab.id}
                ref={marcasRef}
                className="relative"
                style={{ width: TAB_W }}
                onMouseEnter={() => { if (marcasTimeout.current) clearTimeout(marcasTimeout.current); setMarcasOpen(true) }}
                onMouseLeave={() => { marcasTimeout.current = setTimeout(() => setMarcasOpen(false), 180) }}
              >
                <button
                  onClick={() => setMarcasOpen((v) => !v)}
                  style={{ width: TAB_W }}
                  className={`flex items-center justify-center gap-1.5 py-3 pb-3.5 text-[13px] font-bold transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={isActive ? "text-[#FF6B35]" : "text-white/40"}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 ${marcasOpen ? "rotate-180" : ""} ${isActive ? "text-white" : "text-white/40"}`}
                  />
                </button>
                <AnimatePresence>
                  {marcasOpen && <MarcasDropdown onClose={() => setMarcasOpen(false)} />}
                </AnimatePresence>
              </div>
            )
          }

          return (
            <Link
              key={tab.id}
              href={tab.id}
              style={{ width: TAB_W }}
              className={`flex items-center justify-center gap-1.5 py-3 pb-3.5 text-[13px] font-bold transition-colors duration-200 ${
                isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={isActive ? "text-[#FF6B35]" : "text-white/40"}>{tab.icon}</span>
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
    { id: "/marcas",   label: "Marcas",    icon: <Award size={18} />       },
    { id: "/blog",     label: "Blog",      icon: <BookOpen size={18} />    },
    { id: "/nosotros", label: "Nosotros",  icon: <Users size={18} />       },
    { id: "/contacto", label: "Contacto",  icon: <PhoneCall size={18} />   },
  ]

  useEffect(() => { onClose() }, [pathname])
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("drawer-open")
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("drawer-open")
    }
    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("drawer-open")
    }
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
            className="fixed inset-y-0 left-0 z-[70] flex w-[300px] flex-col bg-gradient-to-b from-[#1B2B4B] to-[#0f1e35] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <img src="/logo/logotipo-white.svg" alt="INSUMIND" className="h-8 w-auto object-contain" />
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
                    <span className={isActive ? "text-[#FF6B35]" : "text-white/40"}>{tab.icon}</span>
                    {tab.label}
                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />}
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
      <nav className="bg-[#003D73] border-b border-[#ffffff10] shadow-md relative z-40">
        <div className="mx-auto max-w-7xl px-3 py-1.5 sm:px-4 sm:py-0">
          <div className="flex items-center justify-between gap-2">

            {/* Izquierda */}
            <div className="flex items-center gap-2">
              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu size={18} />
              </button>
              {/* Mega menú categorías — todos los dispositivos */}
              <MegaMenu isOpen={megaMenuOpen} setIsOpen={setMegaMenuOpen} />
            </div>

            {/* Centro — FluidNav */}
            <div className="flex flex-1 justify-center lg:flex-none">
              <FluidNav />
            </div>

            {/* Derecha */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:flex"
              >
                <UserRound size={15} />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                href="/catalogo?bestSellers=true"
                aria-label="Más Vendidos"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#f97316] px-3 py-2 text-[13px] font-bold text-white shadow-sm shadow-[#FF6B35]/20 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#FF6B35]/30 sm:gap-2 sm:px-4"
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
