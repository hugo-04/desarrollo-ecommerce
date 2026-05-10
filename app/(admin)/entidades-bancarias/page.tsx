import { Suspense } from "react"
import { AdminEntidadesBancariasView } from "@/features/entidades-bancarias/components/AdminEntidadesBancariasView"

export default function EntidadesBancariasPage() {
  return (
    <Suspense>
      <AdminEntidadesBancariasView />
    </Suspense>
  )
}
