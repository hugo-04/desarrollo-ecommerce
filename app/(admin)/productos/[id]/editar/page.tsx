import { getProductAction }   from "@/features/productos/actions"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction }     from "@/features/marcas/actions"
import { ProductForm }         from "@/components/admin/ProductForm"
import { notFound }            from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditarProductoPage({ params }: PageProps) {
  const { id } = await params

  const [product, categories, brands] = await Promise.all([
    getProductAction(Number(id)),
    getCategoriesAction(),
    getBrandsAction(),
  ])

  if (!product) notFound()

  return (
    <div className="w-full">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Editar Producto</h1>
      <p className="mb-6 text-sm text-slate-500">SKU: {product.sku}</p>
      <ProductForm product={product} categories={categories} brands={brands} />
    </div>
  )
}
