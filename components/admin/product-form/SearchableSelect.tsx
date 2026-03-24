"use client"

/**
 * SearchableSelect — dropdown con búsqueda integrada y opción de creación rápida.
 *
 * Es un componente controlado: el valor actual se pasa desde el padre
 * via `value` y los cambios se notifican via `onChange`.
 *
 * Opcionalmente muestra un botón "Crear [tipo] '[búsqueda]'" al pie
 * del desplegable si se pasa `onCreateNew`.
 */

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Check, Plus, AlertCircle } from "lucide-react"

interface SearchableSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (val: string) => void
  required?: boolean
  error?: string
  placeholder?: string
  /** Texto del botón de creación rápida, ej: "marca", "categoría" */
  createNewLabel?: string
  /** Se llama con el texto de búsqueda actual cuando el usuario quiere crear */
  onCreateNew?: (searchTerm: string) => void
}

export function SearchableSelect({
  name,
  label,
  options,
  value,
  onChange,
  required,
  error,
  placeholder = "Seleccionar…",
  createNewLabel,
  onCreateNew,
}: SearchableSelectProps) {
  const [open, setOpen]     = useState(false)
  const [search, setSearch] = useState("")
  const containerRef        = useRef<HTMLDivElement>(null)

  // Cierra el dropdown al hacer clic fuera
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

  const filtered      = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
  const selectedLabel = options.find((o) => o.value === value)?.label

  function handleSelect(val: string) {
    onChange(val)
    setOpen(false)
    setSearch("")
  }

  function handleCreateNew() {
    setOpen(false)
    setSearch("")
    onCreateNew?.(search)
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      <div ref={containerRef} className="relative">
        <input type="hidden" name={name} value={value} />

        {/* Trigger */}
        <button
          type="button"
          onClick={() => { setOpen(!open); setSearch("") }}
          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all ${
            error
              ? "border-red-300 bg-red-50 text-red-700"
              : open
              ? "border-[#1C2870]/40 bg-white ring-2 ring-[#1C2870]/15"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          }`}
        >
          <span className={value ? "" : "text-slate-400"}>{selectedLabel ?? placeholder}</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            {/* Búsqueda interna */}
            <div className="border-b border-slate-100 p-2">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar…"
                  className="flex-1 bg-transparent text-xs outline-none placeholder-slate-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Opciones */}
            <div className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-xs text-slate-400">
                  {search ? `Sin resultados para "${search}"` : "Sin opciones disponibles"}
                </p>
              ) : (
                filtered.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => handleSelect(o.value)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                      value === o.value ? "bg-primary/5 font-medium text-primary" : "text-slate-700"
                    }`}
                  >
                    <span>{o.label}</span>
                    {value === o.value && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))
              )}
            </div>

            {/* Botón creación rápida */}
            {onCreateNew && (
              <div className="border-t border-slate-100 p-1.5">
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#1C2870] transition-colors hover:bg-[#1C2870]/5"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-[#1C2870]/20 bg-[#1C2870]/5">
                    <Plus className="h-3 w-3" />
                  </div>
                  {search
                    ? `Crear ${createNewLabel ?? "nuevo"} "${search}"`
                    : `Crear ${createNewLabel ?? "nuevo"}`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  )
}
