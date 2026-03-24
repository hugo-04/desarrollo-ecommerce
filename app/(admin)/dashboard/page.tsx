/**
 * DashboardPage — Página de inicio del panel admin.
 *
 * Muestra un resumen del contenido del catálogo:
 *  - Estadísticas (total productos, categorías, marcas) con acceso rápido
 *  - Lista de los últimos 5 productos ingresados
 *  - Acciones rápidas para crear contenido
 *  - Links al sitio público
 */

import { getCatalogAction } from "@/features/productos/actions"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction } from "@/features/marcas/actions"
import Link from "next/link"
import { Package, Tag, Layers, ArrowRight, Plus, ExternalLink } from "lucide-react"
import { AdminTableThumb } from "@/components/admin/AdminTableThumb"

export default async function DashboardPage() {
  // Cargar datos en paralelo — los primeros 5 productos para la lista reciente
  const [catalog, categories, brands] = await Promise.all([
    getCatalogAction({ limit: 5 }),
    getCategoriesAction(),
    getBrandsAction(),
  ])

  const recentProducts = catalog.data

  // ── Tarjetas de estadísticas ──────────────────────────────────────────────
  const stats = [
    {
      label:       "Productos",
      value:       catalog.total,
      desc:        "en el catálogo",
      href:        "/productos",
      newHref:     "/productos/nuevo",
      icon:        Package,
      border:      "border-blue-100",
      iconBg:      "bg-blue-50",
      iconColor:   "text-blue-500",
      valueColor:  "text-[#1C2870]",
    },
    {
      label:       "Categorías",
      value:       categories.length,
      desc:        "de productos",
      href:        "/categorias",
      newHref:     "/categorias/nueva",
      icon:        Layers,
      border:      "border-violet-100",
      iconBg:      "bg-violet-50",
      iconColor:   "text-violet-500",
      valueColor:  "text-violet-700",
    },
    {
      label:       "Marcas",
      value:       brands.length,
      desc:        "registradas",
      href:        "/marcas",
      newHref:     "/marcas/nueva",
      icon:        Tag,
      border:      "border-emerald-100",
      iconBg:      "bg-emerald-50",
      iconColor:   "text-emerald-500",
      valueColor:  "text-emerald-700",
    },
  ]

  return (
    <div className="space-y-8">

      {/* ── Cabecera ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Resumen del catálogo de Electro Thina
          </p>
        </div>
        <Link
          href="/productos/nuevo"
          className="inline-flex items-center gap-2 rounded-xl bg-[#1C2870] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1C2870]/90"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, desc, href, newHref, icon: Icon, border, iconBg, iconColor, valueColor }) => (
          <div
            key={label}
            className={`overflow-hidden rounded-2xl border ${border} bg-white p-6 shadow-sm`}
          >
            {/* Número + ícono */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                <p className={`mt-2 text-4xl font-bold ${valueColor}`}>{value}</p>
                <p className="mt-1 text-xs text-slate-400">{desc}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
            </div>

            {/* Acciones del card */}
            <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4">
              <Link
                href={href}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-[#1C2870]"
              >
                Ver todos
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href={newHref}
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-[#1C2870] transition-colors hover:text-[#1C2870]/70"
              >
                <Plus className="h-3 w-3" />
                Agregar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Fila inferior: productos recientes + acciones rápidas ─────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

        {/* Productos recientes */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Productos recientes</h2>
              <p className="text-xs text-slate-400">Últimos ingresados al catálogo</p>
            </div>
            <Link href="/productos" className="text-xs font-semibold text-[#1C2870] transition hover:text-[#1C2870]/70">
              Ver todos →
            </Link>
          </div>

          <div className="divide-y divide-slate-50">
            {recentProducts.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-slate-400">No hay productos aún.</p>
                <Link
                  href="/productos/nuevo"
                  className="mt-2 inline-block text-xs font-semibold text-[#1C2870] hover:underline"
                >
                  Crear primer producto →
                </Link>
              </div>
            ) : (
              recentProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 px-6 py-3 transition hover:bg-slate-50/50">
                  <AdminTableThumb
                    src={product.image}
                    alt={product.name}
                    fallback={product.name}
                    variant="cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{product.name}</p>
                    <p className="text-xs text-slate-400">
                      {product.category}
                      {product.brand && (
                        <> · <span className="font-medium text-slate-500">{product.brand}</span></>
                      )}
                    </p>
                  </div>

                  {/* Badges de estado */}
                  <div className="flex shrink-0 gap-1">
                    {product.featured && (
                      <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-200">
                        Dest.
                      </span>
                    )}
                    {product.bestSeller && (
                      <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-500 ring-1 ring-rose-200">
                        Top
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/productos/${product.id}/editar`}
                    className="shrink-0 rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Editar
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Columna derecha: acciones + links + aviso */}
        <div className="flex flex-col gap-4 lg:col-span-2">

          {/* Acciones rápidas */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-slate-800">Acciones rápidas</h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/productos/nuevo"
                className="flex items-center gap-3 rounded-xl bg-[#1C2870] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1C2870]/90"
              >
                <Package className="h-4 w-4 shrink-0" />
                Nuevo producto
                <Plus className="ml-auto h-3.5 w-3.5 opacity-60" />
              </Link>
              <Link
                href="/categorias/nueva"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#1C2870]/25 hover:bg-slate-50"
              >
                <Layers className="h-4 w-4 shrink-0 text-violet-500" />
                Nueva categoría
                <Plus className="ml-auto h-3.5 w-3.5 text-slate-300" />
              </Link>
              <Link
                href="/marcas/nueva"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#1C2870]/25 hover:bg-slate-50"
              >
                <Tag className="h-4 w-4 shrink-0 text-emerald-500" />
                Nueva marca
                <Plus className="ml-auto h-3.5 w-3.5 text-slate-300" />
              </Link>
            </div>
          </div>

          {/* Links al sitio público */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-slate-800">Ver en el sitio</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Catálogo", href: "/catalogo" },
                { label: "Inicio",   href: "/"         },
                { label: "Nosotros", href: "/nosotros"  },
                { label: "Contacto", href: "/contacto"  },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="flex items-center justify-between gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {label}
                  <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
