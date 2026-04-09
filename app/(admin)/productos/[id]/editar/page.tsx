/**
 * /productos/[id]/editar — Editar producto existente.
 * Server Component: obtiene el producto, categorías y marcas antes de renderizar.
 */

export const dynamic = "force-dynamic"

import { getProductAction }   from "@/features/productos/actions"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandsAction }     from "@/features/marcas/actions"
import { ProductForm }         from "@/components/admin/ProductForm"
import { AdminFormHeader }     from "@/components/admin/AdminFormHeader"
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
      <AdminFormHeader
        backHref="/productos"
        backLabel="Volver a Productos"
        title="Editar Producto"
        subtitle={
          <>
            <span className="font-mono text-xs text-slate-400">SKU: {product.sku}</span>
            {" · "}
            <span className="font-semibold text-slate-600">{product.name}</span>
          </>
        }
        mode="editar"
      />
      <ProductForm product={product} categories={categories} brands={brands} />
    </div>
  )
}
