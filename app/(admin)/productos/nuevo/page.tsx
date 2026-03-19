import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction }    from "@/features/marcas/actions"
import { ProductForm }        from "@/components/admin/ProductForm"

export default async function NuevoProductoPage() {
  const [categories, brands] = await Promise.all([
    getCategoriesAction(),
    getBrandsAction(),
  ])

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Nuevo Producto</h1>
      <ProductForm categories={categories} brands={brands} />
    </div>
  )
}
