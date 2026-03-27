"use client"

/**
 * /categorias/nueva — Crear nueva categoría.
 * Orquesta la navegación y la server action; el formulario vive en CategoryForm.
 */

import { useRouter } from "next/navigation"
import { createCategoryAction } from "@/features/categorias/actions"
import { CategoryForm } from "@/components/admin/CategoryForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"
import type { CategoryDTO } from "@/features/categorias/types"

export default function NuevaCategoriaPage() {
  const router = useRouter()

  async function handleSave(data: Omit<CategoryDTO, "id" | "count">) {
    await createCategoryAction({ ...data, count: 0 })
    toast.success("Categoría creada correctamente")
    router.push("/categorias")
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
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
