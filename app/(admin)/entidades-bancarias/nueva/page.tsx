"use client"

import { useRouter } from "next/navigation"
import { useCreateEntidadBancaria } from "@/features/entidades-bancarias/hooks"
import { EntidadBancariaForm } from "@/components/admin/EntidadBancariaForm"
import { AdminFormHeader } from "@/components/admin/AdminFormHeader"
import { toast } from "sonner"

export default function NuevaEntidadBancariaPage() {
  const router    = useRouter()
  const createEnt = useCreateEntidadBancaria()

  async function handleSave(data: any) {
    await createEnt.mutateAsync(data)
    toast.success("Entidad bancaria creada correctamente")
    router.push("/entidades-bancarias")
  }

  return (
    <div className="w-full">
      <AdminFormHeader
        backHref="/entidades-bancarias"
        backLabel="Volver a Entidades Bancarias"
        title="Nueva Entidad Bancaria"
        subtitle="Agregá un banco o medio de pago que aparecerá en el footer."
        mode="crear"
      />
      <EntidadBancariaForm onSave={handleSave} />
    </div>
  )
}
