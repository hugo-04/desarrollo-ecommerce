/**
 * /admin/dashboard — Dashboard del panel admin.
 * Thin shell: obtiene datos en paralelo y los pasa a AdminDashboardView.
 */

export const dynamic = "force-dynamic"

import { getCatalogAction }    from "@/features/productos/actions"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction }     from "@/features/marcas/actions"
import { AdminDashboardView }  from "@/features/dashboard/components/AdminDashboardView"

export default async function DashboardPage() {
  // Carga en paralelo — mínima latencia
  const [catalog, categories, brands] = await Promise.all([
    getCatalogAction({ limit: 5 }),
    getCategoriesAction(),
    getBrandsAction(),
  ])

  return (
    <AdminDashboardView
      recentProducts={catalog.data}
      totalProducts={catalog.total}
      categories={categories}
      brands={brands}
    />
  )
}
