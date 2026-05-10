"use client"

import { useState, useCallback, useTransition, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Save, Eye, EyeOff, Tag, X, Sparkles, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { BlogRichEditor } from "@/components/admin/BlogRichEditor"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import type { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO } from "@/features/blogs/types"

// ─── Slug helper ─────────────────────────────────────────────────────────────

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .slice(0, 100)
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface BlogFormProps {
  post?:     BlogPost
  onSave:    (data: CreateBlogPostDTO | UpdateBlogPostDTO) => Promise<BlogPost>
  onDelete?: () => Promise<void>
  backHref?: string
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex items-center gap-0.5 text-xs font-semibold text-slate-600">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="flex items-center gap-1 text-xs text-red-500">
      <AlertCircle className="h-3 w-3" />
      {msg}
    </p>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">{title}</h3>
      {children}
    </div>
  )
}

function KeywordsEditor({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  const [input, setInput] = useState("")

  function add() {
    const trimmed = input.trim().toLowerCase()
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed])
    setInput("")
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() } }}
          placeholder='Ej: "conductores eléctricos" → Enter'
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15"
        />
        <Button type="button" variant="outline" size="xs" onClick={add} className="shrink-0">
          <Tag className="h-3 w-3 mr-1" /> Agregar
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((kw) => (
            <span
              key={kw}
              className="flex items-center gap-1 rounded-full bg-[#1B2B4B]/8 px-2.5 py-0.5 text-[11px] font-medium text-[#1B2B4B]"
            >
              {kw}
              <button
                type="button"
                onClick={() => onChange(value.filter((k) => k !== kw))}
                className="ml-0.5 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function BlogForm({ post, onSave, onDelete, backHref = "/blogs" }: BlogFormProps) {
  const router = useRouter()
  const [isPending,  startTransition] = useTransition()
  const [isDeleting, setIsDeleting]   = useState(false)

  // Campos
  const [title,       setTitle]       = useState(post?.title       ?? "")
  const [slug,        setSlug]        = useState(post?.slug        ?? "")
  const [excerpt,     setExcerpt]     = useState(post?.excerpt     ?? "")
  const [coverImage,  setCoverImage]  = useState(post?.coverImage  ?? "")
  const [coverAlt,    setCoverAlt]    = useState(post?.coverAlt    ?? "")
  const [image2,      setImage2]      = useState(post?.image2      ?? "")
  const [image2Alt,   setImage2Alt]   = useState(post?.image2Alt   ?? "")
  const [image3,      setImage3]      = useState(post?.image3      ?? "")
  const [image3Alt,   setImage3Alt]   = useState(post?.image3Alt   ?? "")
  const [tag,         setTag]         = useState(post?.tag         ?? "")
  const [tagCategory, setTagCategory] = useState(post?.tagCategory ?? "")
  const [metaTitle,   setMetaTitle]   = useState(post?.metaTitle   ?? "")
  const [metaDesc,    setMetaDesc]    = useState(post?.metaDesc    ?? "")
  const [keywords,    setKeywords]    = useState<string[]>(post?.keywords ?? [])
  const [published,   setPublished]   = useState(post?.published   ?? false)
  const [showSeo,     setShowSeo]     = useState(false)

  // Errores
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Auto-slug a partir del título (solo en modo creación)
  const slugEdited = useRef(!!post)
  useEffect(() => {
    if (!slugEdited.current && title) {
      setSlug(toSlug(title))
    }
  }, [title])

  // Auto-metaTitle desde el título
  useEffect(() => {
    if (!metaTitle && title) {
      setMetaTitle(title.slice(0, 70))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  function validate(content: string): boolean {
    const errs: Record<string, string> = {}
    if (!title.trim())         errs.title   = "El título es obligatorio"
    if (!slug.trim())          errs.slug    = "El slug es obligatorio"
    if (!/^[a-z0-9-]+$/.test(slug)) errs.slug = "Solo letras minúsculas, números y guiones"
    if (!content.trim() || content === "<p></p>") errs.content = "El contenido es obligatorio"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd      = new FormData(e.currentTarget)
    const content = fd.get("content") as string ?? ""

    if (!validate(content)) return

    startTransition(async () => {
      try {
        const data: CreateBlogPostDTO = {
          title, slug, excerpt, content,
          coverImage,  coverAlt:    coverAlt    || undefined,
          image2:      image2       || undefined,
          image2Alt:   image2Alt    || undefined,
          image3:      image3       || undefined,
          image3Alt:   image3Alt    || undefined,
          tag:         tag          || undefined,
          tagCategory: tagCategory  || undefined,
          metaTitle:   metaTitle    || undefined,
          metaDesc:    metaDesc     || undefined,
          keywords,    published,
        }
        await onSave(data)
        toast.success(post ? "Blog actualizado" : "Blog creado correctamente")
        router.push(backHref)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error al guardar")
      }
    })
  }

  const metaTitleLen = metaTitle.length
  const metaDescLen  = metaDesc.length

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Portada + datos básicos ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Imagen de portada */}
        <SectionCard title="Imagen de portada">
          <ImageUpload
            value={coverImage}
            onChange={setCoverImage}
            altValue={coverAlt}
            onAltChange={setCoverAlt}
            aspect="16/9"
            folder="blog"
          />
        </SectionCard>

        {/* Identificación */}
        <div className="lg:col-span-2 space-y-5">
          <SectionCard title="Información del artículo">

            {/* Título */}
            <div className="space-y-1.5">
              <FieldLabel required>Título del artículo</FieldLabel>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Tipos de cables eléctricos en Perú y sus usos industriales"
                className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                  errors.title
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#334155]/40 focus:ring-[#334155]/15"
                }`}
              />
              <FieldError msg={errors.title} />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <FieldLabel required>Slug (URL)</FieldLabel>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 shrink-0">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); slugEdited.current = true }}
                  placeholder="tipos-cables-electricos-peru"
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-mono text-slate-700 outline-none transition focus:ring-2 ${
                    errors.slug
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#334155]/40 focus:ring-[#334155]/15"
                  }`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => { setSlug(toSlug(title)); slugEdited.current = true }}
                  title="Regenerar slug desde el título"
                >
                  <Sparkles className="h-3 w-3" />
                </Button>
              </div>
              <FieldError msg={errors.slug} />
            </div>

            {/* Extracto */}
            <div className="space-y-1.5">
              <FieldLabel>Extracto (descripción breve para las cards)</FieldLabel>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Breve descripción que aparece en la tarjeta del blog (2-3 líneas)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15 resize-none"
              />
            </div>

            {/* Etiqueta de categoría */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <FieldLabel>Etiqueta (badge del artículo)</FieldLabel>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder='Ej: PUESTA A TIERRA'
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15"
                />
                <p className="text-[11px] text-slate-400">Se muestra como badge rojo sobre el artículo</p>
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Categoría de productos (para el botón)</FieldLabel>
                <input
                  type="text"
                  value={tagCategory}
                  onChange={(e) => setTagCategory(e.target.value)}
                  placeholder='Ej: Cables y Conductores'
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15"
                />
                <p className="text-[11px] text-slate-400">Nombre exacto de la categoría para filtrar productos</p>
              </div>
            </div>

            {/* Publicado */}
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">Estado de publicación</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {published ? "Visible en el sitio web" : "Borrador — no visible al público"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  published
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                {published ? "Publicado" : "Borrador"}
              </button>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Contenido del artículo ──────────────────────────────────────── */}
      <SectionCard title="Contenido del artículo">
        {errors.content && <FieldError msg={errors.content} />}
        <BlogRichEditor
          name="content"
          defaultValue={post?.content}
          placeholder="Comenzá a escribir el artículo aquí. Usá los botones H1, H2, H3 para títulos y subtítulos, e ImagePlus para insertar fotos."
          minHeight="400px"
        />
      </SectionCard>

      {/* ── Imágenes adicionales ────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-700">Imágenes adicionales del artículo</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Imagen 2 aparece antes del texto principal · Imagen 3 aparece al final del artículo
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold text-slate-600">Imagen 2 (antes del contenido)</p>
            <ImageUpload
              value={image2}
              onChange={setImage2}
              altValue={image2Alt}
              onAltChange={setImage2Alt}
              aspect="16/9"
              folder="blog"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-slate-600">Imagen 3 (al final del artículo)</p>
            <ImageUpload
              value={image3}
              onChange={setImage3}
              altValue={image3Alt}
              onAltChange={setImage3Alt}
              aspect="16/9"
              folder="blog"
            />
          </div>
        </div>
      </div>

      {/* ── SEO (colapsable) ────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSeo(!showSeo)}
          className="flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FF6B35]" />
            <span className="text-sm font-bold text-slate-700">SEO — Optimización para buscadores</span>
            {metaTitle && metaDesc && keywords.length > 0 && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
          </div>
          {showSeo ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {showSeo && (
          <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-4">

            {/* Meta título */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <FieldLabel>Meta título (Google)</FieldLabel>
                <span className={`text-[10px] font-mono ${metaTitleLen > 70 ? "text-red-500" : metaTitleLen > 55 ? "text-amber-500" : "text-slate-400"}`}>
                  {metaTitleLen}/70
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Título que aparece en Google (máx. 70 caracteres)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15"
              />
            </div>

            {/* Meta descripción */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <FieldLabel>Meta descripción</FieldLabel>
                <span className={`text-[10px] font-mono ${metaDescLen > 160 ? "text-red-500" : metaDescLen > 140 ? "text-amber-500" : "text-slate-400"}`}>
                  {metaDescLen}/160
                </span>
              </div>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                placeholder="Descripción que aparece en los resultados de Google (máx. 160 caracteres)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#334155]/40 focus:ring-2 focus:ring-[#334155]/15 resize-none"
              />
            </div>

            {/* Keywords */}
            <div className="space-y-1.5">
              <FieldLabel>Keywords (palabras clave)</FieldLabel>
              <KeywordsEditor value={keywords} onChange={setKeywords} />
            </div>

            {/* Preview Google */}
            {(metaTitle || title) && (
              <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Vista previa en Google</p>
                <p className="text-[13px] font-medium text-blue-700 truncate">{metaTitle || title} | INSUMIND</p>
                <p className="text-[11px] text-green-700">insumindperu.pe › blog › {slug || "url-del-articulo"}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {metaDesc || excerpt || "Agrega una meta descripción para mejorar el posicionamiento en Google."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Acciones ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(backHref)}
            disabled={isPending || isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPending || isDeleting}
            className="bg-[#1B2B4B] hover:bg-[#1B2B4B]/90 text-white"
          >
            {isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" />Guardando…</>
            ) : (
              <><Save className="h-4 w-4 mr-2" />{post ? "Actualizar artículo" : "Crear artículo"}</>
            )}
          </Button>
        </div>

        {onDelete && post && (
          <DeleteDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting || isPending}
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              >
                {isDeleting
                  ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Eliminando…</>
                  : <><Trash2 className="h-4 w-4 mr-2" />Eliminar artículo</>}
              </Button>
            }
            itemName={post.title}
            onConfirm={async () => {
              setIsDeleting(true)
              try { await onDelete() }
              catch (err) {
                toast.error(err instanceof Error ? err.message : "Error al eliminar el artículo")
                setIsDeleting(false)
              }
            }}
          />
        )}
      </div>
    </form>
  )
}
