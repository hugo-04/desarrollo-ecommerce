import { Suspense } from "react"
import { AdminEspecialidadesView } from "@/features/especialidades/components/AdminEspecialidadesView"

export default function EspecialidadesPage() {
  return (
    <Suspense>
      <AdminEspecialidadesView />
    </Suspense>
  )
}
