import { Suspense } from "react"
import { AdminProductosView } from "@/features/productos/components/AdminProductosView"

export default function AdminProductosPage() {
  return (
    <Suspense>
      <AdminProductosView />
    </Suspense>
  )
}
