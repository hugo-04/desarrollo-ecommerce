"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Search, Plus, X, Check, ExternalLink } from "lucide-react"
import { getAllSubcategoriesAction, createSubcategoryAction } from "@/features/categorias/actions"
import type { SubcategoryItem } from "@/lib/types"
import { toast } from "sonner"

interface SubcategoriesEditorProps {
  values:   SubcategoryItem[]
  onChange: (values: SubcategoryItem[]) => void
}

export function SubcategoriesEditor({ values, onChange }: SubcategoriesEditorProps) {
  const [allOptions, setAllOptions] = useState<SubcategoryItem[]>([])
  const [open, setOpen]     = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Modal crear ────────────────────────────────────────────────────────────
  const [modalOpen,   setModalOpen]   = useState(false)
  const [modalName,   setModalName]   = useState("")
  const [modalError,  setModalError]  = useState("")
  const [modalSaving, setModalSaving] = useState(false)

  useEffect(() => {
    getAllSubcategoriesAction().then(setAllOptions).catch(() => {})
  }, [])

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [modalOpen])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const searchTrimmed = search.trim()

  const filtered = allOptions.filter((o) =>
    o.name.toLowerCase().includes(searchTrimmed.toLowerCase()),
  )

  function isSelected(item: SubcategoryItem) {
    return values.some((v) => v.id === item.id)
  }

  function toggleItem(item: SubcategoryItem) {
    if (isSelected(item)) {
      onChange(values.filter((v) => v.id !== item.id))
    } else {
      onChange([...values, item])
    }
    setOpen(false)
    setSearch("")
  }

  function removeValue(id: number) {
    onChange(values.filter((v) => v.id !== id))
  }

  function openModal() {
    setModalName(searchTrimmed)
    setModalError("")
    setOpen(false)
    setSearch("")
    setModalOpen(true)
  }

  async function handleModalConfirm() {
    const trimmed = modalName.trim()
    if (!trimmed) {
      setModalError("El nombre es requerido")
      return
    }

    // Check duplicado case-insensitive contra existentes
    const dup = allOptions.find((o) => o.name.toLowerCase() === trimmed.toLowerCase())
    if (dup) {
      if (values.some((v) => v.id === dup.id)) {
        const msg = `"${dup.name}" ya está seleccionada para esta categoría`
        setModalError(msg)
        toast.error(msg)
        return
      }
      // Existe en DB pero no está seleccionada → conectar directamente
      onChange([...values, { id: dup.id, name: dup.name }])
      toast.success(`"${dup.name}" agregada`)
      setModalOpen(false)
      setModalName("")
      setModalError("")
      return
    }

    setModalSaving(true)
    try {
      const newSub = await createSubcategoryAction(trimmed)
      setAllOptions((prev) => [...prev, newSub].sort((a, b) => a.name.localeCompare(b.name, "es")))
      onChange([...values, newSub])
      toast.success(`Subcategoría "${newSub.name}" creada`)
      setModalOpen(false)
      setModalName("")
      setModalError("")
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al crear la subcategoría"
      setModalError(msg)
      toast.error(msg)
    } finally {
      setModalSaving(false)
    }
  }

  return (
    <>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-600">Subcategorías</label>

        {/* Chips seleccionadas */}
        {values.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {values.map((v) => (
              <span
                key={v.id}
                className="flex items-center gap-1 rounded-full bg-[#1C2870]/8 px-2.5 py-1 text-xs font-medium text-[#1C2870]"
              >
                {v.name}
                <button
                  type="button"
                  onClick={() => removeValue(v.id)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-[#1C2870]/15"
                  aria-label={`Quitar ${v.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Trigger */}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            onClick={() => { setOpen((o) => !o); setSearch("") }}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all ${
              open
                ? "border-[#1C2870]/40 bg-white ring-2 ring-[#1C2870]/15"
                : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
            }`}
          >
            <span>
              {values.length > 0
                ? `${values.length} subcategoría${values.length !== 1 ? "s" : ""} seleccionada${values.length !== 1 ? "s" : ""}`
                : "Buscar o crear subcategoría…"}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              {/* Búsqueda */}
              <div className="border-b border-slate-100 p-2">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        const unselected = filtered.filter((o) => !isSelected(o))
                        if (unselected.length === 1) {
                          toggleItem(unselected[0])
                        } else if (searchTrimmed) {
                          openModal()
                        }
                      }
                      if (e.key === "Escape") { setOpen(false); setSearch("") }
                    }}
                    placeholder="Buscar subcategoría…"
                    className="flex-1 bg-transparent text-xs outline-none placeholder-slate-400"
                    autoFocus
                  />
                </div>
              </div>

              {/* Opciones */}
              <div className="max-h-48 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <p className="px-4 py-3 text-xs text-slate-400">
                    {searchTrimmed
                      ? `"${searchTrimmed}" no existe aún — créala abajo`
                      : "Sin subcategorías registradas aún"}
                  </p>
                ) : (
                  filtered.map((o) => {
                    const sel = isSelected(o)
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => toggleItem(o)}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                          sel ? "bg-[#1C2870]/5 font-medium text-[#1C2870]" : "text-slate-700"
                        }`}
                      >
                        <span>{o.name}</span>
                        {sel && <Check className="h-3.5 w-3.5 shrink-0" />}
                      </button>
                    )
                  })
                )}
              </div>

              {/* Botones en el footer del dropdown */}
              <div className="border-t border-slate-100 p-1.5 space-y-0.5">
                {/* Crear rápido (modal inline) */}
                <button
                  type="button"
                  onClick={openModal}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#1C2870] transition-colors hover:bg-[#1C2870]/5"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#1C2870]/20 bg-[#1C2870]/5">
                    <Plus className="h-3 w-3" />
                  </div>
                  {searchTrimmed
                    ? `Crear subcategoría "${searchTrimmed}"`
                    : "Crear subcategoría (rápido)"}
                </button>
                {/* Ir a la página completa de creación */}
                <Link
                  href={searchTrimmed ? `/subcategorias/nueva?nombre=${encodeURIComponent(searchTrimmed)}` : "/subcategorias/nueva"}
                  target="_blank"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50">
                    <ExternalLink className="h-3 w-3" />
                  </div>
                  Crear con imagen y SEO completo
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-1.5 text-[11px] text-slate-400">
          Seleccioná existentes o creá nuevas — se guardan en la base de datos
        </p>
      </div>

      {/* ── Modal crear subcategoría ─────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { if (!modalSaving) { setModalOpen(false); setModalError("") } }}
          />

          {/* Diálogo */}
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="mb-1 text-base font-bold text-slate-800">Nueva subcategoría</h3>
            <p className="mb-5 text-xs text-slate-500">
              Se registra en la base de datos y queda disponible para todas las categorías.
            </p>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={modalName}
                onChange={(e) => { setModalName(e.target.value); setModalError("") }}
                placeholder="Ej: Aisladores Poliméricos"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#1C2870]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2870]/15"
                autoFocus
                disabled={modalSaving}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); handleModalConfirm() }
                  if (e.key === "Escape") { setModalOpen(false); setModalError("") }
                }}
              />
              {modalError && (
                <p className="mt-1.5 text-xs text-red-500">{modalError}</p>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleModalConfirm}
                disabled={modalSaving}
                className="flex-1 rounded-lg bg-[#1C2870] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1C2870]/90 disabled:opacity-60"
              >
                {modalSaving ? "Creando…" : "Crear subcategoría"}
              </button>
              <button
                type="button"
                onClick={() => { setModalOpen(false); setModalError("") }}
                disabled={modalSaving}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
