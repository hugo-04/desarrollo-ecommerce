"use client"

import { useRouter, useParams } from "next/navigation"
import { useEntidadBancaria, useUpdateEntidadBancaria, useDeleteEntidadBancaria } from "@/features/entidades-bancarias/hooks"
import { EntidadBancariaForm } from "@/components/admin/EntidadBancariaForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function EditarEntidadBancariaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const numId = parseInt(id, 10)

  const { data: ent, isLoading } = useEntidadBancaria(numId)
  const updateEnt = useUpdateEntidadBancaria()
  const deleteEnt = useDeleteEntidadBancaria()

  if (isNaN(numId)) {
    router.replace("/entidades-bancarias")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#334155] border-t-transparent" />
        Cargando entidad…
      </div>
    )
  }

  if (!ent) {
    router.replace("/entidades-bancarias")
    return null
  }

  async function handleSave(data: any) {
    await updateEnt.mutateAsync({ id: numId, data })
    toast.success("Entidad bancaria actualizada correctamente")
    router.push("/entidades-bancarias")
  }

  async function handleDelete() {
    await deleteEnt.mutateAsync(numId)
    toast.success(`"${ent!.name}" eliminada correctamente`)
    router.push("/entidades-bancarias")
  }

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/entidades-bancarias"
        backLabel="Volver a Entidades Bancarias"
        title="Editar Entidad Bancaria"
        subtitle={<>Modificando: <span className="font-semibold text-slate-700">{ent.name}</span></>}
        mode="editar"
      />
      <EntidadBancariaForm initialData={ent} onSave={handleSave} onDelete={handleDelete} />
    </div>
  )
}
