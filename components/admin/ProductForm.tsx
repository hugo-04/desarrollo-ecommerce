"use client"

/**
 * ProductForm — formulario completo para crear y editar productos.
 *
 * Responsabilidades de este archivo:
 *  - Orquestar el estado del formulario (selects controlados, imágenes, specs, etc.)
 *  - Llamar a las server actions de creación / actualización
 *  - Manejar la creación rápida de marca/categoría sin salir de la página
 *
 * Los sub-componentes viven en `./product-form/` para mantener SRP.
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { productSchema, type ProductErrors } from "@/features/productos/schemas"

import { createProductAction, updateProductAction } from "@/features/productos/actions"
import { createBrandAction } from "@/features/marcas/actions"
import { createCategoryAction } from "@/features/categorias/actions"
import { RichEditor } from "@/components/admin/RichEditor"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { QuickCreateBrandDialog } from "@/components/admin/QuickCreateBrandDialog"
import { QuickCreateCategoryDialog } from "@/components/admin/QuickCreateCategoryDialog"

import { SearchableSelect } from "./product-form/SearchableSelect"
import { PdfUploader } from "./product-form/PdfUploader"
import { TagsEditor } from "./product-form/TagsEditor"
import { TechSpecsEditor } from "./product-form/TechSpecsEditor"
import { GalleryEditor } from "./product-form/GalleryEditor"
import { Field, SectionHeader } from "./product-form/FormHelpers"

import type { Product, TechnicalSpec } from "@/lib/types"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Brand } from "@/lib/types"

// ─── Tipos ─────────────────────────────────────────────────────────────────

interface ProductFormProps {
  product?: Product
  categories: CategoryDTO[]
  brands: Brand[]
}

/** Estado para el diálogo de creación rápida activo */
interface QuickCreateState {
  type: "brand" | "category"
  defaultName: string
}

// ─── Componente ─────────────────────────────────────────────────────────────

export function ProductForm({ product, categories, brands }: ProductFormProps) {
  const router = useRouter()
  const isEdit = Boolean(product)

  // Opciones dinámicas (crecen con las creaciones rápidas)
  const [categoryOptions, setCategoryOptions] = useState(
    categories.map((c) => ({ value: c.name, label: c.name }))
  )
  const [brandOptions, setBrandOptions] = useState(
    brands.map((b) => ({ value: b.name, label: b.name }))
  )

  // Selects controlados
  const [selectedCategory, setSelectedCategory] = useState(product?.category ?? "")
  const [selectedBrand, setSelectedBrand]       = useState(product?.brand    ?? "")

  // Diálogo de creación rápida
  const [quickCreate, setQuickCreate] = useState<QuickCreateState | null>(null)

  // Estado del formulario
  const [sku, setSku]                   = useState(product?.sku           ?? "")
  const [name, setName]                 = useState(product?.name          ?? "")
  const [description, setDesc]          = useState(product?.description   ?? "")
  const [image, setImage]               = useState(product?.image         ?? "")
  const [imageAlt, setImageAlt]         = useState(product?.imageAlt      ?? "")
  const [gallery, setGallery]           = useState<string[]>(product?.gallery       ?? [])
  const [galleryAlts, setGalleryAlts]   = useState<string[]>(product?.galleryAlts   ?? [])
  const [specs, setSpecs]               = useState<string[]>(product?.specs         ?? [])
  const [techSpecs, setTechSpecs]       = useState<TechnicalSpec[]>(product?.technicalSpecs ?? [])
  const [fichaTecnica, setFichaTecnica] = useState(product?.fichaTecnica  ?? "")
  const [saving, setSaving]             = useState(false)
  const [serverError, setServerError]   = useState("")
  const [errors, setErrors]             = useState<ProductErrors>({})

  // ── Creación rápida de marca ──────────────────────────────────────────────

  async function handleQuickCreateBrand(brandName: string) {
    const newBrand = await createBrandAction({ name: brandName, logo: "" })
    const opt      = { value: newBrand.name, label: newBrand.name }
    setBrandOptions((prev) => [...prev, opt])
    setSelectedBrand(newBrand.name)
    setErrors((e) => ({ ...e, brand: undefined }))
    toast.success(`Marca "${brandName}" creada`)
  }

  // ── Creación rápida de categoría ──────────────────────────────────────────

  async function handleQuickCreateCategory(catName: string, slug: string) {
    const newCat = await createCategoryAction({
      name: catName,
      slug,
      image: "",
      color: "#1C2870",
      subcategories: [],
      count: 0,
    })
    const opt = { value: newCat.name, label: newCat.name }
    setCategoryOptions((prev) => [...prev, opt])
    setSelectedCategory(newCat.name)
    setErrors((e) => ({ ...e, category: undefined }))
    toast.success(`Categoría "${catName}" creada`)
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setServerError("")

    const fd = new FormData(e.currentTarget)
    const raw = {
      sku,
      name,
      brand:       selectedBrand,
      category:    selectedCategory,
      description,
      image,
      imageAlt:    imageAlt.trim(),
    }

    const result = productSchema.safeParse(raw)
    if (!result.success) {
      const fieldErrors: ProductErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ProductErrors
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      setSaving(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setErrors({})

    const data = {
      sku,
      name,
      brand:           selectedBrand,
      category:        selectedCategory,
      description,
      fullDescription: (fd.get("fullDescription") as string)?.trim(),
      rating:          Number(fd.get("rating"))   || 4.5,
      featured:        fd.get("featured")         === "on",
      bestSeller:      fd.get("bestSeller")       === "on",
      image,
      imageAlt:       imageAlt.trim() || undefined,
      gallery:        gallery.filter(Boolean),
      galleryAlts:    galleryAlts.filter(Boolean).length > 0 ? galleryAlts : undefined,
      specs,
      technicalSpecs: techSpecs.filter((s) => s.label && s.value),
      fichaTecnica,
    }

    try {
      if (isEdit && product) {
        await updateProductAction(product.id, data)
        toast.success("Producto actualizado correctamente")
      } else {
        await createProductAction(data as Parameters<typeof createProductAction>[0])
        toast.success("Producto creado correctamente")
      }
      router.push("/productos")
      router.refresh()
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Error al guardar")
      toast.error("No se pudo guardar el producto")
      setSaving(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Error global del servidor */}
      {serverError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          {serverError}
        </div>
      )}

      {/* Resumen de validaciones */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Completá los campos requeridos antes de guardar:
            </p>
            <ul className="mt-1 list-disc pl-4 text-xs text-amber-700">
              {errors.sku        && <li>SKU</li>}
              {errors.name       && <li>Nombre del producto</li>}
              {errors.description && <li>Descripción corta</li>}
              {errors.image      && <li>Imagen principal</li>}
              {errors.imageAlt   && <li>Nombre SEO de la imagen</li>}
              {errors.category   && <li>Categoría</li>}
              {errors.brand      && <li>Marca</li>}
            </ul>
          </div>
        </div>
      )}

      {/* ── Card 1: Información básica ── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader title="Información básica" subtitle="Identificación del producto" />
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Field
                label="SKU"
                name="sku"
                value={sku}
                onChange={(e) => setSku((e.target as HTMLInputElement).value)}
                placeholder="ET-AIS-001"
                required
              />
              {errors.sku && <p className="mt-1 text-xs text-red-500">{errors.sku}</p>}
            </div>
            <div>
              <Field
                label="Nombre del producto"
                name="name"
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="Aislador Polimérico 22kV"
                required
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              ) : name && name.trim().split(/\s+/).length < 3 ? (
                <p className="mt-1 text-[11px] text-amber-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Tip SEO: incluí marca, tipo y característica (ej: "Aislador Polimérico 22kV Schneider")
                </p>
              ) : name.trim().split(/\s+/).length >= 3 ? (
                <p className="mt-1 text-[11px] text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Nombre SEO óptimo
                </p>
              ) : null}
            </div>
            <SearchableSelect
              name="category"
              label="Categoría"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(v) => {
                setSelectedCategory(v)
                if (v) setErrors((e) => ({ ...e, category: undefined }))
              }}
              required
              error={errors.category}
              placeholder="Seleccionar categoría…"
              createNewLabel="categoría"
              onCreateNew={(n) => setQuickCreate({ type: "category", defaultName: n })}
            />
            <SearchableSelect
              name="brand"
              label="Marca"
              options={brandOptions}
              value={selectedBrand}
              onChange={(v) => {
                setSelectedBrand(v)
                if (v) setErrors((e) => ({ ...e, brand: undefined }))
              }}
              required
              error={errors.brand}
              placeholder="Seleccionar marca…"
              createNewLabel="marca"
              onCreateNew={(n) => setQuickCreate({ type: "brand", defaultName: n })}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4 sm:max-w-md">
            <Field
              label="Rating"
              name="rating"
              type="number"
              defaultValue={product?.rating?.toString() ?? "4.5"}
              step="0.1"
              min="0"
              max="5"
            />
            <label className="flex cursor-pointer items-center gap-2 pt-5">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={product?.featured}
                className="h-4 w-4 rounded border-slate-300 accent-[#1C2870]"
              />
              <span className="text-sm font-medium text-slate-700">Destacado</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 pt-5">
              <input
                type="checkbox"
                name="bestSeller"
                defaultChecked={product?.bestSeller}
                className="h-4 w-4 rounded border-slate-300 accent-[#1C2870]"
              />
              <span className="text-sm font-medium text-slate-700">Más vendido</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Card 2: Imágenes | Ficha técnica ── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col lg:flex-row lg:divide-x lg:divide-slate-100">

          {/* Columna izquierda: imágenes */}
          <div className="flex-1 p-6">
            <SectionHeader title="Imágenes del producto" subtitle="Imagen principal y galería" />
            <div className="mt-5 space-y-6">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Imagen principal <span className="text-red-500">*</span>
                </label>
                <div className="max-w-xs">
                  <ImageUpload
                    value={image}
                    onChange={(v) => {
                      setImage(v)
                      if (v) setErrors((e) => ({ ...e, image: undefined }))
                    }}
                    altValue={imageAlt}
                    onAltChange={(v) => {
                      setImageAlt(v)
                      if (v) setErrors((e) => ({ ...e, imageAlt: undefined }))
                    }}
                    required
                    error={errors.image}
                  />
                  {errors.imageAlt && !imageAlt && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.imageAlt}
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t border-dashed border-slate-200" />
              <GalleryEditor
                values={gallery}
                onChange={setGallery}
                alts={galleryAlts}
                onAltsChange={setGalleryAlts}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 lg:hidden" />

          {/* Columna derecha: ficha técnica + PDF */}
          <div className="flex-1 p-6">
            <SectionHeader title="Ficha técnica" subtitle="Parámetros y documentación" />
            <div className="mt-5 space-y-6">
              <TechSpecsEditor values={techSpecs} onChange={setTechSpecs} />
              <div className="border-t border-dashed border-slate-200" />
              <PdfUploader
                label="PDF descargable (opcional)"
                value={fichaTecnica}
                onChange={setFichaTecnica}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Card 3: Descripción ── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader title="Descripción" subtitle="Texto del producto" />
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-0.5 block text-xs font-semibold text-slate-600">
                Descripción corta <span className="text-red-500">*</span>
              </label>
              <p className="mb-2 text-[11px] text-slate-400">
                Aparece en la tarjeta del catálogo y al costado de la imagen en el detalle
              </p>
              <textarea
                name="description"
                rows={3}
                required
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ej: Aislador polimérico para líneas de distribución de media tensión"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder-slate-300 focus:border-[#1C2870]/40 focus:ring-2 focus:ring-[#1C2870]/15"
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>
            <TagsEditor
              label="Especificaciones / medidas (etiquetas)"
              hint="Badges en la card y en el detalle — máx. 3 visibles en el catálogo"
              values={specs}
              onChange={setSpecs}
              placeholder="Ej: 22kV, DN 50mm, ANSI C29.1"
            />
          </div>
          <div>
            <label className="mb-0.5 block text-xs font-semibold text-slate-600">
              Descripción completa
            </label>
            <p className="mb-2 text-[11px] text-slate-400">
              Página de detalle — usá la barra de herramientas para dar formato al texto
            </p>
            <RichEditor
              name="fullDescription"
              defaultValue={product?.fullDescription}
              placeholder="Describí el producto en detalle: aplicaciones, material, construcción, ventajas…"
            />
          </div>
        </div>
      </div>

      {/* ── Barra de acciones ── */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#1C2870] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1C2870]/90 disabled:opacity-60"
        >
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>

      {/* ── Diálogos de creación rápida (fuera del flujo del form) ── */}
      <QuickCreateBrandDialog
        open={quickCreate?.type === "brand"}
        onOpenChange={(open) => { if (!open) setQuickCreate(null) }}
        defaultName={quickCreate?.defaultName ?? ""}
        onCreate={handleQuickCreateBrand}
      />
      <QuickCreateCategoryDialog
        open={quickCreate?.type === "category"}
        onOpenChange={(open) => { if (!open) setQuickCreate(null) }}
        defaultName={quickCreate?.defaultName ?? ""}
        onCreate={handleQuickCreateCategory}
      />
    </form>
  )
}
