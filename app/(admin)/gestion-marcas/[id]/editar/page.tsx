"use client"

import { useRouter, useParams } from "next/navigation"
import { useBrand, useUpdateBrand, useDeleteBrand } from "@/features/marcas/hooks"
import { BrandForm } from "@/components/admin/BrandForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function EditarMarcaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const numId = parseInt(id, 10)

  const { data: brand, isLoading } = useBrand(numId)
  const updateBrand = useUpdateBrand()
  const deleteBrand = useDeleteBrand()

  if (isNaN(numId)) {
    router.replace("/gestion-marcas")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#334155] border-t-transparent" />
        Cargando marca…
      </div>
    )
  }

  if (!brand) {
    router.replace("/gestion-marcas")
    return null
  }

  async function handleSave(data: any) {
    await updateBrand.mutateAsync({ id: numId, data })
    toast.success("Marca actualizada correctamente")
    router.push("/gestion-marcas")
  }

  async function handleDelete() {
    await deleteBrand.mutateAsync(numId)
    toast.success(`"${brand!.name}" eliminada correctamente`)
    router.push("/gestion-marcas")
  }

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/gestion-marcas"
        backLabel="Volver a Marcas"
        title="Editar Marca"
        subtitle={<>Modificando: <span className="font-semibold text-slate-700">{brand.name}</span></>}
        mode="editar"
      />
      <BrandForm
        initialData={brand}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
