"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { getCategoryByIdAction, updateCategoryAction, deleteCategoryAction } from "@/features/categorias/actions"
import { CategoryForm } from "@/components/admin/CategoryForm"
import { IconChevronLeft } from "@/components/icons"
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
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
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
      <div className="mb-6">
        <Link
          href="/categorias"
          className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          Volver a Categorías
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Editar Categoría</h1>
        <p className="mt-1 text-sm text-slate-500">
          Modificando: <span className="font-semibold text-slate-700">{category.name}</span>
        </p>
      </div>

      <CategoryForm
        initialData={category}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
