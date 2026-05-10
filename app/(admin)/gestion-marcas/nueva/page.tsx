"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { createBrandAction } from "@/features/marcas/actions"
import { brandKeys } from "@/features/marcas/hooks"
import { BrandForm } from "@/components/admin/BrandForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function NuevaMarcaPage() {
  const router      = useRouter()
  const queryClient = useQueryClient()

  async function handleSave(data: { name: string; logo: string; logoAlt?: string; showInCarousel: boolean; description?: string }) {
    await createBrandAction(data)
    await queryClient.invalidateQueries({ queryKey: brandKeys.all })
    toast.success("Marca creada correctamente")
    router.push("/gestion-marcas")
  }

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/gestion-marcas"
        backLabel="Volver a Marcas"
        title="Nueva Marca"
        subtitle="Agregá una nueva marca al catálogo de productos."
        mode="crear"
      />
      <BrandForm onSave={handleSave} />
    </div>
  )
}
