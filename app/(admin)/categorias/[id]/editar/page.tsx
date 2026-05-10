"use client"

import { useRouter, useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useCategory, useUpdateCategory, useDeleteCategory } from "@/features/categorias/hooks"
import { getCategoryProductCountAction } from "@/features/categorias/actions"
import { CategoryForm, type CategorySaveData } from "@/components/admin/CategoryForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function EditarCategoriaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const numId = parseInt(id, 10)

  const { data: category, isLoading } = useCategory(numId)
  const { data: productCount = 0 } = useQuery({
    queryKey: ["category-product-count", numId],
    queryFn:  () => getCategoryProductCountAction(numId),
    enabled:  !!numId && !isNaN(numId),
  })
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  if (isNaN(numId)) {
    router.replace("/categorias")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#334155] border-t-transparent" />
        Cargando categoría…
      </div>
    )
  }

  if (!category) {
    router.replace("/categorias")
    return null
  }

  async function handleSave(data: CategorySaveData) {
    await updateCategory.mutateAsync({ id: numId, data })
    toast.success("Categoría actualizada correctamente")
    router.push("/categorias")
  }

  async function handleDelete() {
    await deleteCategory.mutateAsync(numId)
    toast.success(`"${category!.name}" eliminada correctamente`)
    router.push("/categorias")
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
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
        deleteWarning={
          productCount > 0
            ? `No se puede eliminar: tiene ${productCount} producto${productCount > 1 ? "s" : ""} asociado${productCount > 1 ? "s" : ""}. Reasigná o eliminá los productos primero.`
            : undefined
        }
      />
    </div>
  )
}
