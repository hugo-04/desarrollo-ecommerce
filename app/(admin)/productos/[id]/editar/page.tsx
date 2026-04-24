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
  const numId = parseInt(id, 10)
  if (!id || isNaN(numId) || numId < 1) notFound()

  const [product, categories, brands] = await Promise.all([
    getProductAction(numId),
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
        subtitle={product.name}
        mode="editar"
      />
      <ProductForm product={product} categories={categories} brands={brands} />
    </div>
  )
}
