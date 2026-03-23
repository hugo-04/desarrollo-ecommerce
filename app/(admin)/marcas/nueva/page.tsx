"use client"

/**
 * /marcas/nueva — Crear nueva marca.
 * Delega todo el formulario a BrandForm; esta página solo orquesta la acción y navegación.
 */

import Link from "next/link"
import { useRouter } from "next/navigation"
import { createBrandAction } from "@/features/marcas/actions"
import { BrandForm } from "@/components/admin/BrandForm"
import { IconChevronLeft } from "@/components/icons"
import { toast } from "sonner"

export default function NuevaMarcaPage() {
  const router = useRouter()

  async function handleSave(data: { name: string; logo: string; logoAlt?: string; showInCarousel: boolean }) {
    await createBrandAction(data)
    toast.success("Marca creada correctamente")
    router.push("/marcas")
    router.refresh()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/marcas"
          className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          Volver a Marcas
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Nueva Marca</h1>
        <p className="mt-1 text-sm text-slate-500">
          Agregá una nueva marca al catálogo de productos.
        </p>
      </div>

      <BrandForm onSave={handleSave} />
    </div>
  )
}
