"use client"

import { useRouter, useParams } from "next/navigation"
import { useEspecialidad, useUpdateEspecialidad, useDeleteEspecialidad } from "@/features/especialidades/hooks"
import { EspecialidadForm } from "@/components/admin/EspecialidadForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function EditarEspecialidadPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const numId = parseInt(id, 10)

  const { data: esp, isLoading } = useEspecialidad(numId)
  const updateEsp = useUpdateEspecialidad()
  const deleteEsp = useDeleteEspecialidad()

  if (isNaN(numId)) {
    router.replace("/especialidades")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#334155] border-t-transparent" />
        Cargando especialidad…
      </div>
    )
  }

  if (!esp) {
    router.replace("/especialidades")
    return null
  }

  async function handleSave(data: any) {
    await updateEsp.mutateAsync({ id: numId, data })
    toast.success("Especialidad actualizada correctamente")
    router.push("/especialidades")
  }

  async function handleDelete() {
    await deleteEsp.mutateAsync(numId)
    toast.success(`"${esp!.title}" eliminada correctamente`)
    router.push("/especialidades")
  }

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/especialidades"
        backLabel="Volver a Especialidades"
        title="Editar Especialidad"
        subtitle={<>Modificando: <span className="font-semibold text-slate-700">{esp.title}</span></>}
        mode="editar"
      />
      <EspecialidadForm initialData={esp} onSave={handleSave} onDelete={handleDelete} />
    </div>
  )
}
