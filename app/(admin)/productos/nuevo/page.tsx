/**
 * /productos/nuevo — Crear nuevo producto.
 * Server Component: obtiene categorías y marcas antes de renderizar el formulario.
 */

import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction }    from "@/features/marcas/actions"
import { ProductForm }        from "@/components/admin/ProductForm"
import { AdminFormHeader }    from "@/components/admin/AdminFormHeader"

export default async function NuevoProductoPage() {
  const [categories, brands] = await Promise.all([
    getCategoriesAction(),
    getBrandsAction(),
  ])

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/productos"
        backLabel="Volver a Productos"
        title="Nuevo Producto"
        subtitle="Completá todos los campos obligatorios para publicar el producto en el catálogo."
        mode="crear"
      />
      <ProductForm categories={categories} brands={brands} />
    </div>
  )
}
