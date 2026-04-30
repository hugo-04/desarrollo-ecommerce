import { Suspense } from "react"
import { AdminCategoriasView } from "@/features/categorias/components/AdminCategoriasView"

export default function AdminCategoriasPage() {
  return (
    <Suspense>
      <AdminCategoriasView />
    </Suspense>
  )
}
