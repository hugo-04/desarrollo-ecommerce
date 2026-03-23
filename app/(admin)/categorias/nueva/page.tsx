"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { createCategoryAction } from "@/features/categorias/actions"
import { CategoryForm } from "@/components/admin/CategoryForm"
import { IconChevronLeft } from "@/components/icons"
import { toast } from "sonner"
import type { CategoryDTO } from "@/features/categorias/types"

export default function NuevaCategoriaPage() {
  const router = useRouter()

  async function handleSave(data: Omit<CategoryDTO, "id" | "count">) {
    await createCategoryAction({ ...data, count: 0 })
    toast.success("Categoría creada correctamente")
    router.push("/categorias")
    router.refresh()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <Link
          href="/categorias"
          className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          Volver a Categorías
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Nueva Categoría</h1>
        <p className="mt-1 text-sm text-slate-500">
          Completá los datos para agregar una nueva categoría al catálogo.
        </p>
      </div>

      <CategoryForm onSave={handleSave} />
    </div>
  )
}
