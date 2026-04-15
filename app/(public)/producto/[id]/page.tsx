/**
 * /producto/[id] — Server Component de detalle de producto.
 *
 * Llama a la server action en vez de instanciar el repositorio directamente,
 * respetando el principio de inversión de dependencias (DIP):
 * la página no sabe si los datos vienen de mock, DB o API externa.
 *
 * Al migrar a DB: solo cambia `features/productos/actions.ts`.
 */

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductoView } from "@/components/views/ProductoView"
import { getProductAction } from "@/features/productos/actions"
import { generateProductMeta, buildProductSchema } from "@/lib/seo"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const numId   = Number(id)
  if (!id || isNaN(numId) || numId < 1) return {}

  const product = await getProductAction(numId)
  if (!product) return {}

  return generateProductMeta(product)
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const numId  = Number(id)

  // Rechazar IDs inválidos antes de consultar
  if (!id || isNaN(numId) || numId < 1) notFound()

  const product = await getProductAction(numId)
  if (!product) notFound()

  const productSchema = buildProductSchema(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductoView product={product} />
    </>
  )
}
