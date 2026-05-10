"use client"

import { useRouter } from "next/navigation"
import { useCreateEspecialidad } from "@/features/especialidades/hooks"
import { EspecialidadForm } from "@/components/admin/EspecialidadForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function NuevaEspecialidadPage() {
  const router    = useRouter()
  const createEsp = useCreateEspecialidad()

  async function handleSave(data: any) {
    await createEsp.mutateAsync(data)
    toast.success("Especialidad creada correctamente")
    router.push("/especialidades")
  }

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/especialidades"
        backLabel="Volver a Especialidades"
        title="Nueva Especialidad"
        subtitle="Agregá una especialidad que aparecerá en la sección del home."
        mode="crear"
      />
      <EspecialidadForm onSave={handleSave} />
    </div>
  )
}
