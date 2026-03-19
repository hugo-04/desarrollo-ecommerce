import { getCatalogAction } from "@/features/productos/actions"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction } from "@/features/marcas/actions"
import Link from "next/link"

export default async function DashboardPage() {
  const [catalog, categories, brands] = await Promise.all([
    getCatalogAction({ limit: 1 }),
    getCategoriesAction(),
    getBrandsAction(),
  ])

  const stats = [
    { label: "Productos",  value: catalog.total,      href: "/productos" },
    { label: "Categorías", value: categories.length,  href: "/categorias" },
    { label: "Marcas",     value: brands.length,      href: "/marcas" },
  ]

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mb-8 text-sm text-slate-500">
        Panel de gestión de contenido — conectar PostgreSQL para persistencia.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        {stats.map(({ label, value, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 group-hover:text-[#1C2870]">{value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">📦 Estado: usando datos mock</p>
        <p>Para persistencia real instalar Prisma + PostgreSQL y actualizar el repository en cada feature.</p>
      </div>
    </div>
  )
}
