"use client"

/**
 * /categorias/[id]/editar — Editar categoría existente.
 * Carga la categoría por ID y delega el formulario a CategoryForm.
 */

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getCategoryByIdAction, updateCategoryAction, deleteCategoryAction } from "@/features/categorias/actions"
import { CategoryForm } from "@/components/admin/CategoryForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import type { CategoryDTO } from "@/features/categorias/types"
import { toast } from "sonner"

export default function EditarCategoriaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<CategoryDTO | null>(null)

  useEffect(() => {
    getCategoryByIdAction(Number(id)).then((c) => {
      if (!c) router.replace("/categorias")
      else setCategory(c)
    })
  }, [id, router])

  if (!category) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1C2870] border-t-transparent" />
        Cargando categoría…
      </div>
    )
  }

  async function handleSave(data: Omit<CategoryDTO, "id" | "count">) {
    await updateCategoryAction(category!.id, data)
    toast.success("Categoría actualizada correctamente")
    router.push("/categorias")
    router.refresh()
  }

  async function handleDelete() {
    await deleteCategoryAction(category!.id)
    toast.success(`"${category!.name}" eliminada correctamente`)
    router.push("/categorias")
    router.refresh()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <AdminFormHeader
        backHref="/categorias"
        backLabel="Volver a Categorías"
        title="Editar Categoría"
        subtitle={<>Modificando: <span className="font-semibold text-slate-700">{category.name}</span></>}
        mode="editar"
      />
      <CategoryForm
        initialData={category}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
