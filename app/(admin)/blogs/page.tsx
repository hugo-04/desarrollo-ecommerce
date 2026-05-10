import { Suspense } from "react"
import { AdminBlogsView } from "@/features/blogs/components/AdminBlogsView"

export default function AdminBlogsPage() {
  return (
    <Suspense>
      <AdminBlogsView />
    </Suspense>
  )
}
