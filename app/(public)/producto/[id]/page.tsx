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
import { ProductoView } from "@/components/views/ProductoView"
import { getProductAction } from "@/features/productos/actions"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const numId  = Number(id)

  // Rechazar IDs inválidos antes de consultar
  if (!id || isNaN(numId) || numId < 1) notFound()

  const product = await getProductAction(numId)
  if (!product) notFound()

  return <ProductoView product={product} />
}
