import { Suspense } from "react"
import { AdminMarcasView } from "@/features/marcas/components/AdminMarcasView"

export default function AdminMarcasPage() {
  return (
    <Suspense>
      <AdminMarcasView />
    </Suspense>
  )
}
