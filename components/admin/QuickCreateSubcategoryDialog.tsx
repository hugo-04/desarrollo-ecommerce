"use client"

/**
 * QuickCreateSubcategoryDialog — Permite crear una subcategoría desde el ProductForm
 * sin salir del flujo de carga del producto.
 *
 * Patrón idéntico a QuickCreateCategoryDialog y QuickCreateBrandDialog.
 * Llama a createSubcategoryAction (de categorias/actions) que es idempotente
 * (si ya existe con ese nombre, devuelve la existente).
 */

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
import { LayoutList } from "lucide-react"

interface QuickCreateSubcategoryDialogProps {
  open:          boolean
  onOpenChange:  (open: boolean) => void
  defaultName:   string
  /** Callback que recibe el id y nombre de la subcategoría recién creada */
  onCreate:      (id: number, name: string) => Promise<void>
}

export function QuickCreateSubcategoryDialog({
  open,
  onOpenChange,
  defaultName,
  onCreate,
}: QuickCreateSubcategoryDialogProps) {
  const [name,   setName]   = useState(defaultName)
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState("")

  /* Reiniciar estado cada vez que el dialog se abre */
  useEffect(() => {
    if (open) {
      setName(defaultName)
      setError("")
    }
  }, [open, defaultName])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setSaving(true)
    setError("")
    try {
      await onCreate(0, trimmed) // el id real lo resuelve el handler en el padre
      onOpenChange(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear la subcategoría")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100">
              <LayoutList className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <DialogTitle>Nueva subcategoría</DialogTitle>
              <DialogDescription className="text-xs">
                Podrás asociarla a otras categorías desde el panel de subcategorías
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="quick-subcat-name" className="text-xs font-semibold text-slate-600">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quick-subcat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Aisladores de suspensión"
              autoFocus
              required
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

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
              disabled={saving || !name.trim()}
              className="bg-[#334155] hover:bg-[#334155]/90"
            >
              {saving ? "Creando…" : "Crear subcategoría"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
