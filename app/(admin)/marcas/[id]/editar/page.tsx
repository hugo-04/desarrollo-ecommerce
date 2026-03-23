"use client"

/**
 * /marcas/[id]/editar — Editar marca existente.
 * Carga la marca por ID y delega el formulario a BrandForm.
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { getBrandByIdAction, updateBrandAction, deleteBrandAction } from "@/features/marcas/actions"
import { BrandForm } from "@/components/admin/BrandForm"
import { IconChevronLeft } from "@/components/icons"
import type { Brand } from "@/lib/types"
import { toast } from "sonner"

export default function EditarMarcaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [brand, setBrand] = useState<Brand | null>(null)

  useEffect(() => {
    getBrandByIdAction(Number(id)).then((b) => {
      if (!b) router.replace("/marcas")
      else setBrand(b)
    })
  }, [id, router])

  if (!brand) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-slate-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Cargando marca…
      </div>
    )
  }

  async function handleSave(data: { name: string; logo: string; logoAlt?: string; showInCarousel: boolean }) {
    await updateBrandAction(brand!.id, data)
    toast.success("Marca actualizada correctamente")
    router.push("/marcas")
    router.refresh()
  }

  async function handleDelete() {
    await deleteBrandAction(brand!.id)
    toast.success(`"${brand!.name}" eliminada correctamente`)
    router.push("/marcas")
    router.refresh()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/marcas"
          className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          Volver a Marcas
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Editar Marca</h1>
        <p className="mt-1 text-sm text-slate-500">
          Modificando: <span className="font-semibold text-slate-700">{brand.name}</span>
        </p>
      </div>

      <BrandForm
        initialData={brand}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
