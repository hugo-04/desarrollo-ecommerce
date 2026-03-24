"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Layers } from "lucide-react"

interface QuickCreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultName: string
  /** Recibe el nombre creado y lo usa para seleccionarlo */
  onCreate: (name: string, slug: string) => Promise<void>
}

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function QuickCreateCategoryDialog({
  open,
  onOpenChange,
  defaultName,
  onCreate,
}: QuickCreateCategoryDialogProps) {
  const [name, setName] = useState(defaultName)
  const [slug, setSlug] = useState(toSlug(defaultName))
  const [slugEdited, setSlugEdited] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  // Reiniciar estado cada vez que se abre
  useEffect(() => {
    if (open) {
      setName(defaultName)
      setSlug(toSlug(defaultName))
      setSlugEdited(false)
      setError("")
    }
  }, [open, defaultName])

  function handleNameChange(val: string) {
    setName(val)
    if (!slugEdited) setSlug(toSlug(val))
  }

  function handleSlugChange(val: string) {
    setSlug(val.toLowerCase().replace(/[^a-z0-9-]/g, ""))
    setSlugEdited(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedSlug = slug.trim()
    if (!trimmedName || !trimmedSlug) return
    setSaving(true)
    setError("")
    try {
      await onCreate(trimmedName, trimmedSlug)
      onOpenChange(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear la categoría")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 border border-violet-100">
              <Layers className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <DialogTitle>Nueva categoría</DialogTitle>
              <DialogDescription className="text-xs">
                Podrás agregar color e imagen desde el panel de categorías
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="quick-cat-name" className="text-xs font-semibold text-slate-600">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quick-cat-name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Aisladores AT/MT"
              autoFocus
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quick-cat-slug" className="text-xs font-semibold text-slate-600">
              Slug (URL)
            </Label>
            <div className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-slate-50 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <span className="select-none px-2.5 text-xs text-slate-400">/</span>
              <input
                id="quick-cat-slug"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="aisladores-at-mt"
                className="flex-1 bg-transparent py-2 pr-3 text-sm outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">Solo letras minúsculas, números y guiones</p>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving || !name.trim() || !slug.trim()}
              className="bg-[#1C2870] hover:bg-[#1C2870]/90"
            >
              {saving ? "Creando…" : "Crear categoría"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
