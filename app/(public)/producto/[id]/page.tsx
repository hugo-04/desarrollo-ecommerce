/**
 * /producto/[id] — Server Component
 *
 * Los Server Components pueden llamar directamente al servicio/repositorio
 * sin pasar por HTTP — es código que corre en el servidor.
 *
 * Al migrar a DB: reemplazar MockProductRepository por DbProductRepository.
 * Este archivo no necesita cambios adicionales.
 */

import Link from "next/link"
import { ProductoView } from "@/components/views/ProductoView"
import { MockProductRepository } from "@/features/productos/repository"
import { ProductService } from "@/features/productos/service"

const service = new ProductService(new MockProductRepository())

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const product = await service.getProductById(Number(id))

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Producto no encontrado</h1>
        <p className="mb-6 text-sm text-slate-500">
          El producto que buscas no existe o fue removido.
        </p>
        <Link
          href="/catalogo"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white"
        >
          Ir al Catalogo
        </Link>
      </div>
    )
  }

  return <ProductoView product={product} />
}
