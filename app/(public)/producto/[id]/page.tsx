import { notFound, redirect } from "next/navigation"
import { getProductAction } from "@/features/productos/actions"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * Redirect permanente a /producto/[id]/[slug].
 * Garantiza que URLs antiguas (sin slug) sigan funcionando
 * y que Google las indexe con la URL canónica correcta.
 */
export default async function ProductoRedirectPage({ params }: PageProps) {
  const { id } = await params
  const numId  = Number(id)

  if (!id || isNaN(numId) || numId < 1) notFound()

  const product = await getProductAction(numId)
  if (!product) notFound()

  const slug = product.slug
    ?? product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  redirect(`/producto/${product.id}/${slug}`)
}
