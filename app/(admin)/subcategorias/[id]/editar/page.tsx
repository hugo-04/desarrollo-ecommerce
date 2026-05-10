"use client"

import { useRouter, useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useSubcategory, useUpdateSubcategory, useDeleteSubcategory } from "@/features/subcategorias/hooks"
import { getSubcategoryProductCountAction } from "@/features/subcategorias/actions"
import { SubcategoryForm, type SubcategorySaveData } from "@/components/admin/SubcategoryForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function EditarSubcategoriaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const numId = parseInt(id, 10)

  const { data: sub, isLoading } = useSubcategory(numId)
  const { data: productCount = 0 } = useQuery({
    queryKey: ["subcategory-product-count", numId],
    queryFn:  () => getSubcategoryProductCountAction(numId),
    enabled:  !!numId && !isNaN(numId),
  })
  const updateSubcategory = useUpdateSubcategory()
  const deleteSubcategory = useDeleteSubcategory()

  if (isNaN(numId)) {
    router.replace("/subcategorias")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#334155] border-t-transparent" />
        Cargando subcategoría…
      </div>
    )
  }

  if (!sub) {
    router.replace("/subcategorias")
    return null
  }

  async function handleSave(data: SubcategorySaveData) {
    await updateSubcategory.mutateAsync({ id: numId, data })
    toast.success("Subcategoría actualizada correctamente")
    router.push("/subcategorias")
  }

  async function handleDelete() {
    await deleteSubcategory.mutateAsync(numId)
    toast.success(`"${sub!.name}" eliminada correctamente`)
    router.push("/subcategorias")
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <AdminFormHeader
        backHref="/subcategorias"
        backLabel="Volver a Subcategorías"
        title="Editar Subcategoría"
        subtitle={<>Modificando: <span className="font-semibold text-slate-700">{sub.name}</span></>}
        mode="editar"
      />
      <SubcategoryForm
        initialData={sub}
        onSave={handleSave}
        onDelete={handleDelete}
        deleteWarning={
          productCount > 0
            ? `Esta subcategoría está asignada a ${productCount} producto${productCount > 1 ? "s" : ""}. Al eliminarla, esos productos quedarán sin subcategoría.`
            : undefined
        }
      />
    </div>
  )
}
