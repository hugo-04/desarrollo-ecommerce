/**
 * AdminDashboardView — Vista del dashboard admin.
 * Server Component: recibe los datos ya obtenidos por el page.
 * Extraído para mantener page.tsx como thin shell (SRP).
 */

import Link from "next/link"
import { Package, Tag, Layers, ArrowRight, Plus, ExternalLink, Sparkles, TrendingUp } from "lucide-react"
import { AdminTableThumb } from "@/components/admin/AdminTableThumb"
import { VisitsChart } from "@/features/analytics/components/VisitsChart"
import type { Product } from "@/lib/types"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Brand } from "@/lib/types"

interface AdminDashboardViewProps {
  recentProducts: Product[]
  totalProducts:  number
  categories:     CategoryDTO[]
  brands:         Brand[]
}

export function AdminDashboardView({ recentProducts, totalProducts, categories, brands }: AdminDashboardViewProps) {
  // Tarjetas de estadísticas
  const stats = [
    {
      label: "Productos",   value: totalProducts,      desc: "total del catálogo",
      href: "/productos",   newHref: "/productos/nuevo", icon: Package,
      bgGlow: "from-blue-500/10 to-transparent",
      iconBox: "bg-blue-600 text-white shadow-blue-500/30",
      pillBg:  "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      label: "Categorías",  value: categories.length,  desc: "clasificaciones",
      href: "/categorias",  newHref: "/categorias/nueva", icon: Layers,
      bgGlow: "from-violet-500/10 to-transparent",
      iconBox: "bg-violet-600 text-white shadow-violet-500/30",
      pillBg:  "bg-violet-50 text-violet-600 hover:bg-violet-100",
    },
    {
      label: "Marcas",      value: brands.length,      desc: "socios fabricantes",
      href: "/marcas",      newHref: "/marcas/nueva",    icon: Tag,
      bgGlow: "from-emerald-500/10 to-transparent",
      iconBox: "bg-emerald-600 text-white shadow-emerald-500/30",
      pillBg:  "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    },
  ]

  return (
    <div className="space-y-8 pb-12">

      {/* Cabecera */}
      <div className="flex animate-in slide-in-from-top-4 fade-in flex-col items-start justify-between gap-4 duration-500 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Resumen Operativo
            <span className="flex items-center gap-1.5 rounded-full bg-cyan-100/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-800 ring-1 ring-cyan-500/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              En vivo
            </span>
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Monitor centralizado del catálogo de Electro Thina</p>
        </div>
        <Link href="/productos/nuevo"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1C2870] to-[#0ea5e9] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-[#1C2870]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30">
          <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <Plus className="relative z-10 h-4 w-4" />
          <span className="relative z-10">Nuevo Producto</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, desc, href, newHref, icon: Icon, bgGlow, iconBox, pillBg }, idx) => (
          <div key={label}
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-6 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]"
            style={{ animationDelay: `${idx * 150}ms`, animationFillMode: "both" }}>
            <div className={`absolute left-0 top-0 h-full w-full bg-gradient-to-br ${bgGlow} opacity-40 transition-opacity duration-500 group-hover:opacity-100`} />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-2 text-5xl font-extrabold tracking-tighter text-slate-800">{value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />{desc}
                </p>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBox} shadow-lg ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:scale-110`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-200/50 pt-5">
              <Link href={href} className="group/link flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-800">
                Ver listado <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
              </Link>
              <Link href={newHref} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${pillBg}`}>
                <Plus className="h-3 w-3" />Agregar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de visitas */}
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: "250ms", animationFillMode: "both" }}>
        <VisitsChart />
      </div>

      {/* Fila inferior */}
      <div className="grid animate-in fade-in slide-in-from-bottom-8 grid-cols-1 gap-6 fill-mode-both delay-300 duration-700 lg:grid-cols-5">

        {/* Productos recientes */}
        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-200/50 px-6 py-5">
            <div>
              <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
                <Sparkles className="h-4 w-4 text-emerald-500" />Ingresos Recientes
              </h2>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Últimos módulos añadidos al catálogo</p>
            </div>
            <Link href="/productos" className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900">
              Catálogo completo →
            </Link>
          </div>
          <div className="divide-y divide-slate-100/50">
            {recentProducts.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <Package className="mb-3 h-10 w-10 text-slate-300" />
                <p className="text-sm font-medium text-slate-500">Aún no hay productos registrados.</p>
                <Link href="/productos/nuevo" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#1C2870] transition-colors hover:text-[#0ea5e9]">
                  <Plus className="h-4 w-4" /> Crear el primero
                </Link>
              </div>
            ) : recentProducts.map((product) => (
              <div key={product.id} className="group flex items-center gap-4 px-6 py-4 transition-all duration-300 hover:bg-white">
                <div className="shrink-0 overflow-hidden rounded-xl border border-slate-200/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <AdminTableThumb src={product.image} alt={product.name} fallback={product.name} variant="cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800 transition-colors group-hover:text-[#1C2870]">{product.name}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {product.category}
                    {product.brand && <><span className="px-1 text-slate-300">•</span><span className="font-semibold text-slate-600">{product.brand}</span></>}
                  </p>
                </div>
                <div className="hidden shrink-0 gap-1.5 sm:flex">
                  {product.featured   && <span className="rounded-md bg-amber-100/50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-amber-600 ring-1 ring-amber-500/20">Dest.</span>}
                  {product.bestSeller && <span className="rounded-md bg-rose-100/50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-rose-600 ring-1 ring-rose-500/20">Top</span>}
                </div>
                <Link href={`/productos/${product.id}/editar`}
                  className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 opacity-0 shadow-sm transition-all duration-300 hover:bg-slate-200 hover:text-slate-800 focus:opacity-100 group-hover:opacity-100">
                  Editar
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Acciones rápidas */}
          <div className="rounded-3xl border border-white/60 bg-white/50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
            <h2 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-slate-800">Accesos Directos</h2>
            <div className="flex flex-col gap-3">
              <Link href="/productos/nuevo" className="group flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-[#1C2870] to-blue-600 p-4 text-sm font-bold text-white shadow-xl shadow-blue-900/10 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10"><Package className="h-4 w-4" /></div>
                Alta de Producto
                <ArrowRight className="ml-auto h-4 w-4 opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
              <Link href="/categorias/nueva" className="group flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white/60 p-4 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-50 hover:text-violet-700">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white"><Layers className="h-4 w-4" /></div>
                Nueva Categoría
                <Plus className="ml-auto h-4 w-4 text-slate-300 group-hover:text-violet-500" />
              </Link>
              <Link href="/marcas/nueva" className="group flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white/60 p-4 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-50 hover:text-emerald-700">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white"><Tag className="h-4 w-4" /></div>
                Registrar Marca
                <Plus className="ml-auto h-4 w-4 text-slate-300 group-hover:text-emerald-500" />
              </Link>
            </div>
          </div>
          {/* Links al sitio público */}
          <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-slate-900 to-[#1C2870] p-6 text-white shadow-xl">
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-cyan-400">Sitio Público</h2>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Catálogo", href: "/catalogo" }, { label: "Inicio", href: "/" }, { label: "Nosotros", href: "/nosotros" }, { label: "Contacto", href: "/contacto" }].map(({ label, href }) => (
                <Link key={href} href={href} target="_blank"
                  className="group flex items-center justify-between gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold transition-all hover:border-white/20 hover:bg-white/10">
                  {label}
                  <ExternalLink className="h-3 w-3 opacity-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
