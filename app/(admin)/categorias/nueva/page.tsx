"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { createCategoryAction } from "@/features/categorias/actions"
import { categoryKeys } from "@/features/categorias/hooks"
import { CategoryForm, type CategorySaveData } from "@/components/admin/CategoryForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function NuevaCategoriaPage() {
  const router      = useRouter()
  const queryClient = useQueryClient()

  async function handleSave(data: CategorySaveData) {
    await createCategoryAction({ ...data, count: 0 })
    await queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    toast.success("Categoría creada correctamente")
    router.push("/categorias")
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <AdminFormHeader
        backHref="/categorias"
        backLabel="Volver a Categorías"
        title="Nueva Categoría"
        subtitle="Completá los datos para agregar una nueva categoría al catálogo."
        mode="crear"
      />
      <CategoryForm onSave={handleSave} />
    </div>
  )
}
