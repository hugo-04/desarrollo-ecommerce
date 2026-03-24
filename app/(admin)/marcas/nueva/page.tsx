"use client"

/**
 * /marcas/nueva — Crear nueva marca.
 * Orquesta la navegación y la server action; el formulario vive en BrandForm.
 */

import { useRouter } from "next/navigation"
import { createBrandAction } from "@/features/marcas/actions"
import { BrandForm } from "@/components/admin/BrandForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
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
      <AdminFormHeader
        backHref="/marcas"
        backLabel="Volver a Marcas"
        title="Nueva Marca"
        subtitle="Agregá una nueva marca al catálogo de productos."
        mode="crear"
      />
      <BrandForm onSave={handleSave} />
    </div>
  )
}
