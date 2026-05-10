import { Suspense } from "react"
import { AdminSubcategoriasView } from "@/features/subcategorias/components/AdminSubcategoriasView"

export default function AdminSubcategoriasPage() {
  return (
    <Suspense>
      <AdminSubcategoriasView />
    </Suspense>
  )
}
