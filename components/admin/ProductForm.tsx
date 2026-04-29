"use client"

/**
 * ProductForm — Formulario completo para crear y editar productos.
 *
 * Secciones (con pasos numerados para guiar al usuario):
 *   1. Identificación   → Nombre, Categoría, Marca, Rating, flags
 *   2. Imagen principal → ImageUpload con SEO alt text
 *   3. Descripción      → corta (required) + completa (rich editor) + medidas/etiquetas
 *   4. Ficha técnica    → TechSpecsEditor + PDF descargable + Galería
 *
 * Barra de acciones sticky en la parte inferior — siempre visible sin hacer scroll.
 *
 * Validación: Zod importado desde features/productos/schemas.ts (SRP).
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, Package, Image as ImageIcon, AlignLeft, Wrench } from "lucide-react"
import { toast } from "sonner"

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
import { Field } from "./product-form/FormHelpers"

import { productSchema, type ProductErrors } from "@/features/productos/schemas"
import type { Product, TechnicalSpec } from "@/lib/types"
import type { CategoryDTO } from "@/features/categorias/types"
import type { Brand } from "@/lib/types"

// ── Tipos ──────────────────────────────────────────────────────────────────────

interface ProductFormProps {
  product?: Product
  categories: CategoryDTO[]
  brands: Brand[]
}

interface QuickCreateState {
  type: "brand" | "category"
  defaultName: string
}

// ── Sub-componente: número de sección ─────────────────────────────────────────

function SectionStep({ n, icon: Icon, title, subtitle }: {
  n: number
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20">
        {n}
      </div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-400" />
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────────

export function ProductForm({ product, categories, brands }: ProductFormProps) {
  const router = useRouter()
  const isEdit = Boolean(product)

  // Opciones dinámicas (crecen con creaciones rápidas)
  const [categoryOptions, setCategoryOptions] = useState(
    categories.map((c) => ({ value: c.name, label: c.name }))
  )
  const [brandOptions, setBrandOptions] = useState(
    brands.map((b) => ({ value: b.name, label: b.name }))
  )

  // Selects
  const [selectedCategory, setSelectedCategory] = useState(product?.category ?? "")
  const [selectedBrand,    setSelectedBrand]     = useState(product?.brand    ?? "")

  // Creación rápida
  const [quickCreate, setQuickCreate] = useState<QuickCreateState | null>(null)

  // Campos del formulario
  const [name,         setName]         = useState(product?.name         ?? "")
  const [description,  setDesc]         = useState(product?.description  ?? "")
  const [image,        setImage]        = useState(product?.image        ?? "")
  const [imageAlt,     setImageAlt]     = useState(product?.imageAlt     ?? "")
  const [imageTitle,   setImageTitle]   = useState(product?.imageTitle   ?? "")
  const [gallery,      setGallery]      = useState<string[]>(product?.gallery       ?? [])
  const [galleryAlts,  setGalleryAlts]  = useState<string[]>(product?.galleryAlts   ?? [])
  const [keywords,     setKeywords]     = useState<string[]>(product?.keywords        ?? [])
  const [medidas,      setMedidas]      = useState<string[]>(product?.medidas         ?? [])
  const [techSpecs,    setTechSpecs]    = useState<TechnicalSpec[]>(product?.technicalSpecs ?? [])
  const [fichaTecnica, setFichaTecnica] = useState(product?.fichaTecnica ?? "")

  // Temp keys — se finalizan (renombran con SEO) al guardar el formulario
  const [imageTempKey,   setImageTempKey]   = useState<string | null>(null)
  const [galleryTempKeys,setGalleryTempKeys]= useState<(string | null)[]>([])
  const [pdfTempKey,     setPdfTempKey]     = useState<string | null>(null)
  const [pdfSeoName,     setPdfSeoName]     = useState("")

  const [saving,       setSaving]       = useState(false)
  const [serverError,  setServerError]  = useState("")
  const [errors,       setErrors]       = useState<ProductErrors>({})

  // ── Creación rápida de marca ───────────────────────────────────────────────

  async function handleQuickCreateBrand(brandName: string) {
    const newBrand = await createBrandAction({ name: brandName, logo: "" })
    setBrandOptions((prev) => [...prev, { value: newBrand.name, label: newBrand.name }])
    setSelectedBrand(newBrand.name)
    setErrors((e) => ({ ...e, brand: undefined }))
    toast.success(`Marca "${brandName}" creada`)
  }

  // ── Creación rápida de categoría ──────────────────────────────────────────

  async function handleQuickCreateCategory(catName: string, slug: string) {
    const newCat = await createCategoryAction({
      name: catName, slug, image: "", subcategories: [], count: 0, featured: false,
    })
    setCategoryOptions((prev) => [...prev, { value: newCat.name, label: newCat.name }])
    setSelectedCategory(newCat.name)
    setErrors((e) => ({ ...e, category: undefined }))
    toast.success(`Categoría "${catName}" creada`)
  }

  // ── Finalizar uploads temporales con el nombre SEO correcto ──────────────

  async function finalize(tempKey: string, seoName: string, folder: string): Promise<string | null> {
    const res  = await fetch("/api/upload/finalize", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ tempKey, seoName, folder }),
    })
    let data: Record<string, unknown> = {}
    try { data = await res.json() } catch { /* respuesta no-JSON (502, nginx error, etc.) */ }
    // 409 = archivo ya fue finalizado (doble submit) — ignorar, usar URL actual
    if (res.status === 409) return null
    if (!res.ok) throw new Error((data.error as string) ?? `Error al finalizar subida (${res.status})`)
    return data.url as string
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setServerError("")

    const fd = new FormData(e.currentTarget)

    const result = productSchema.safeParse({
      name, brand: selectedBrand, category: selectedCategory,
      description, image, imageAlt: imageAlt.trim(),
    })

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

    // Mover archivos de temp/ a sus carpetas finales con nombre SEO
    let finalImage      = image
    let finalGallery    = [...gallery]
    let finalFicha      = fichaTecnica

    try {
      if (imageTempKey) {
        const url = await finalize(imageTempKey, imageAlt.trim(), "productos/imagenes")
        if (url) { finalImage = url; setImage(url) }
        setImageTempKey(null)
      }

      // Galería: limpiar cada tempKey inmediatamente al finalizar
      // para que un reintento no intente mover archivos ya movidos
      for (let i = 0; i < galleryTempKeys.length; i++) {
        const key = galleryTempKeys[i]
        if (!key) continue
        const url = await finalize(key, galleryAlts[i] ?? "", "productos/galeria")
        if (url) {
          finalGallery[i] = url
          setGallery(prev => { const n = [...prev]; n[i] = url; return n })
        }
        setGalleryTempKeys(prev => { const n = [...prev]; n[i] = null; return n })
      }

      if (pdfTempKey) {
        const url = await finalize(pdfTempKey, pdfSeoName.trim(), "productos/fichas")
        if (url) { finalFicha = url; setFichaTecnica(url) }
        setPdfTempKey(null)
      }
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Error al finalizar subida de archivos")
      setSaving(false)
      return
    }

    const data = {
      name,
      brand:           selectedBrand,
      category:        selectedCategory,
      description,
      fullDescription: (fd.get("fullDescription") as string)?.trim(),
      rating:          Number(fd.get("rating"))  || 4.5,
      featured:        fd.get("featured")        === "on",
      bestSeller:      fd.get("bestSeller")      === "on",
      image:           finalImage,
      imageAlt:        imageAlt.trim() || undefined,
      imageTitle:      imageTitle.trim() || undefined,
      gallery:         finalGallery.filter(Boolean),
      galleryAlts:     galleryAlts.filter(Boolean).length > 0 ? galleryAlts : undefined,
      keywords:        keywords.length > 0 ? keywords : undefined,
      medidas,
      technicalSpecs:  techSpecs.filter((s) => s.label && s.value),
      fichaTecnica:    finalFicha,
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
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Error al guardar")
      toast.error("No se pudo guardar el producto")
      setSaving(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col min-h-full">
      <div className="space-y-5 pb-8">

        {/* ── Errores globales ── */}
        {serverError && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            {serverError}
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Completá los campos requeridos:</p>
              <ul className="mt-1 list-disc pl-4 text-xs text-amber-700">
                {errors.name        && <li>Nombre del producto</li>}
                {errors.description && <li>Descripción corta</li>}
                {errors.image       && <li>Imagen principal</li>}
                {errors.imageAlt    && <li>Nombre SEO de la imagen</li>}
                {errors.category    && <li>Categoría</li>}
                {errors.brand       && <li>Marca</li>}
              </ul>
            </div>
          </div>
        )}

        {/* ── Sección 1: Identificación ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionStep n={1} icon={Package} title="Identificación" subtitle="Nombre, categoría y marca" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Nombre */}
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
                <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-600">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  Tip: incluí marca + tipo + característica
                </p>
              ) : name.trim().split(/\s+/).length >= 3 ? (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  Nombre SEO óptimo
                </p>
              ) : null}
            </div>

            {/* Categoría */}
            <SearchableSelect
              name="category"
              label="Categoría"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(v) => { setSelectedCategory(v); if (v) setErrors((e) => ({ ...e, category: undefined })) }}
              required
              error={errors.category}
              placeholder="Seleccionar…"
              createNewLabel="categoría"
              onCreateNew={(n) => setQuickCreate({ type: "category", defaultName: n })}
            />

            {/* Marca */}
            <SearchableSelect
              name="brand"
              label="Marca"
              options={brandOptions}
              value={selectedBrand}
              onChange={(v) => { setSelectedBrand(v); if (v) setErrors((e) => ({ ...e, brand: undefined })) }}
              required
              error={errors.brand}
              placeholder="Seleccionar…"
              createNewLabel="marca"
              onCreateNew={(n) => setQuickCreate({ type: "brand", defaultName: n })}
            />
          </div>

          {/* Rating + flags */}
          <div className="mt-4 flex flex-wrap items-center gap-6 rounded-lg bg-slate-50 px-4 py-3">
            <div className="w-24">
              <Field
                label="Rating"
                name="rating"
                type="number"
                defaultValue={product?.rating?.toString() ?? "4.5"}
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={product?.featured}
                className="h-4 w-4 rounded border-slate-300 accent-primary"
              />
              <span className="text-sm font-medium text-slate-700">Destacado</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="bestSeller"
                defaultChecked={product?.bestSeller}
                className="h-4 w-4 rounded border-slate-300 accent-primary"
              />
              <span className="text-sm font-medium text-slate-700">Más vendido</span>
            </label>
          </div>
        </div>

        {/* ── Sección 2: Imagen principal ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionStep n={2} icon={ImageIcon} title="Imagen principal" subtitle="Foto del producto + nombre SEO" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Imagen <span className="text-red-500">*</span>
              </label>
              <ImageUpload
                value={image}
                onChange={(v) => { setImage(v); if (v) setErrors((e) => ({ ...e, image: undefined })) }}
                onTempKey={setImageTempKey}
                altValue={imageAlt}
                onAltChange={(v) => { setImageAlt(v); if (v) setErrors((e) => ({ ...e, imageAlt: undefined })) }}
                required
                error={errors.image}
                folder="productos/imagenes"
              />
              {errors.imageAlt && !imageAlt && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.imageAlt}
                </p>
              )}

              {/* Título de imagen (atributo title → tooltip en hover) */}
              <div className="mt-3">
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Título de imagen
                  <span className="ml-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-normal text-slate-500">Opcional</span>
                </label>
                <input
                  type="text"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  maxLength={125}
                  placeholder="Ej: Aislador Polimérico 22kV para líneas de distribución AT"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs transition-all placeholder:text-slate-400 focus:border-[#1C2870]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2870]/15"
                />
                <p className="mt-1 text-[10px] text-slate-400">Aparece como tooltip al pasar el cursor sobre la imagen</p>
              </div>
            </div>

            {/* Galería — en la misma sección para rapidez */}
            <div>
              <GalleryEditor
                values={gallery}
                onChange={setGallery}
                alts={galleryAlts}
                onAltsChange={setGalleryAlts}
                folder="productos/galeria"
                tempKeys={galleryTempKeys}
                onTempKeysChange={setGalleryTempKeys}
              />
            </div>
          </div>
        </div>

        {/* ── Sección 3: Descripción ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionStep n={3} icon={AlignLeft} title="Descripción" subtitle="Texto corto, medidas disponibles y descripción completa" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600">
                  Descripción corta <span className="text-red-500">*</span>
                </label>
                <span className={`text-[11px] tabular-nums ${
                  description.length === 0     ? "text-slate-400"
                  : description.length < 50   ? "text-amber-500"
                  : description.length <= 160 ? "text-emerald-600"
                  :                             "text-red-500"
                }`}>
                  {description.length} / 160
                </span>
              </div>
              <p className="mb-2 text-[11px] text-slate-400">
                Meta description para Google · aparece en la tarjeta del catálogo
              </p>
              <textarea
                name="description"
                rows={4}
                required
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ej: Aislador polimérico para líneas de distribución de media tensión"
                maxLength={200}
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition placeholder-slate-300 focus:ring-2 ${
                  errors.description
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : description.length > 160
                      ? "border-amber-300 focus:border-amber-400 focus:ring-amber-100"
                      : "border-slate-200 focus:border-primary/40 focus:ring-primary/15"
                }`}
              />
              {errors.description ? (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.description}
                </p>
              ) : description.length > 160 ? (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  Demasiado larga — Google la cortará en los resultados de búsqueda.
                </p>
              ) : description.length >= 50 ? (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  Longitud ideal para Google
                </p>
              ) : null}
            </div>

            <TagsEditor
              label="Medidas disponibles"
              hint="Las diferentes medidas o tamaños que tiene el producto (ej: 22kV, DN 50mm, 120–180 mm). Se muestran como badges en la tarjeta y la página de detalle."
              values={medidas}
              onChange={setMedidas}
              placeholder="Ej: 22kV, DN 50mm, 120–180 mm…"
            />
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            <TagsEditor
              label="Palabras clave SEO"
              hint='Keywords para el metatag de la página y búsqueda interna. Usá términos específicos del producto (ej: "aislador polimérico 22kV", "herraje AT", "conector ACSR"). Presioná Enter para agregar cada keyword.'
              values={keywords}
              onChange={setKeywords}
              placeholder="Ej: aislador polimérico 22kV…"
              seoHint
            />
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            <label className="mb-0.5 block text-xs font-semibold text-slate-600">
              Descripción completa
              <span className="ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-normal text-slate-500">
                Opcional
              </span>
            </label>
            <p className="mb-2 text-[11px] text-slate-400">
              Página de detalle — formateá el texto con la barra de herramientas
            </p>
            <RichEditor
              name="fullDescription"
              defaultValue={product?.fullDescription}
              placeholder="Describí el producto: aplicaciones, material, construcción, ventajas…"
            />
          </div>
        </div>

        {/* ── Sección 4: Ficha técnica ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionStep n={4} icon={Wrench} title="Ficha técnica" subtitle="Parámetros técnicos y PDF descargable" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TechSpecsEditor values={techSpecs} onChange={setTechSpecs} />
            <PdfUploader
              label="PDF descargable"
              value={fichaTecnica}
              onChange={setFichaTecnica}
              onTempKey={setPdfTempKey}
              onSeoNameChange={setPdfSeoName}
            />
          </div>
        </div>

      </div>

      {/* ── Barra de acciones sticky ──────────────────────────────────────── */}
      <div className="sticky bottom-0 z-40 mt-6 flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1C2870] to-[#0ea5e9] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#1C2870]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <Package className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{saving ? "Guardando cambios..." : isEdit ? "Actualizar producto" : "Publicar producto"}</span>
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:opacity-50"
          >
            Descartar y volver
          </button>
        </div>

        {isEdit && product && (
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              ID <span className="text-slate-600">{product.id}</span>
            </span>
          </div>
        )}
      </div>

      {/* Diálogos de creación rápida */}
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
