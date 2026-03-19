import Link from "next/link"
import { ProductoView } from "@/components/views/ProductoView"
import { products } from "@/lib/data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === Number(id))

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
