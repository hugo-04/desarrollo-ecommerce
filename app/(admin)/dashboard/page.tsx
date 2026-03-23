import { getCatalogAction } from "@/features/productos/actions"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction } from "@/features/marcas/actions"
import Link from "next/link"
import { Package, Tag, Layers, ArrowRight, Plus, ExternalLink } from "lucide-react"

export default async function DashboardPage() {
  const [catalog, categories, brands] = await Promise.all([
    getCatalogAction({ limit: 1 }),
    getCategoriesAction(),
    getBrandsAction(),
  ])

  const stats = [
    {
      label: "Productos",
      value: catalog.total,
      href: "/productos",
      icon: Package,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      accent: "text-[#1C2870]",
    },
    {
      label: "Categorías",
      value: categories.length,
      href: "/categorias",
      icon: Layers,
      color: "bg-violet-50 text-violet-600 border-violet-100",
      accent: "text-violet-700",
    },
    {
      label: "Marcas",
      value: brands.length,
      href: "/marcas",
      icon: Tag,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "text-emerald-700",
    },
  ]

  const quickActions = [
    { label: "Nuevo producto",   href: "/productos/nuevo",   icon: Package },
    { label: "Nueva categoría",  href: "/categorias/nueva",  icon: Layers  },
    { label: "Nueva marca",      href: "/marcas/nueva",      icon: Tag     },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Resumen del contenido del catálogo de Electro Thina
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon, color, accent }) => (
          <Link
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                <p className={`mt-2 text-4xl font-bold ${accent}`}>{value}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors group-hover:text-primary">
              <span>Ver todos</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 text-sm font-bold text-slate-700">Acciones rápidas</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#1C2870]/30 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1C2870]/5">
                <Icon className="h-4 w-4 text-[#1C2870]" />
              </div>
              <span className="text-sm font-semibold text-slate-700">{label}</span>
              <Plus className="ml-auto h-4 w-4 text-slate-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Links del sitio */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold text-slate-700">Ver en el sitio</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Catálogo",  href: "/catalogo"  },
            { label: "Inicio",    href: "/"           },
            { label: "Nosotros",  href: "/nosotros"   },
            { label: "Contacto",  href: "/contacto"   },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {label}
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Estado DB */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
        <p className="text-sm font-semibold text-amber-800">📦 Usando datos mock</p>
        <p className="mt-0.5 text-xs text-amber-700">
          Para persistencia real instalá Prisma + PostgreSQL y actualizá el repositorio en cada feature.
        </p>
      </div>
    </div>
  )
}
