"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { createSubcategoryFullAction } from "@/features/subcategorias/actions"
import { subcategoryKeys } from "@/features/subcategorias/hooks"
import { SubcategoryForm, type SubcategorySaveData } from "@/components/admin/SubcategoryForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function NuevaSubcategoriaPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const queryClient  = useQueryClient()
  const prefillName  = searchParams.get("nombre") ?? undefined

  async function handleSave(data: SubcategorySaveData) {
    await createSubcategoryFullAction(data)
    await queryClient.invalidateQueries({ queryKey: subcategoryKeys.all })
    toast.success("Subcategoría creada correctamente")
    router.push("/subcategorias")
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <AdminFormHeader
        backHref="/subcategorias"
        backLabel="Volver a Subcategorías"
        title="Nueva Subcategoría"
        subtitle="Completá los datos para agregar una nueva subcategoría al catálogo."
        mode="crear"
      />
      <SubcategoryForm
        initialData={prefillName ? { id: 0, name: prefillName, slug: null, image: "", description: "", keywords: [] } : undefined}
        onSave={handleSave}
      />
    </div>
  )
}
