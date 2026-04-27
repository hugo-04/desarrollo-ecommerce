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
import { Tag } from "lucide-react"

interface QuickCreateBrandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultName: string
  /** Recibe el nombre creado y lo usa para seleccionarlo */
  onCreate: (name: string) => Promise<void>
}

export function QuickCreateBrandDialog({
  open,
  onOpenChange,
  defaultName,
  onCreate,
}: QuickCreateBrandDialogProps) {
  const [name, setName] = useState(defaultName)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  // Reiniciar estado cada vez que se abre
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
      await onCreate(trimmed)
      onOpenChange(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear la marca")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
              <Tag className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <DialogTitle>Nueva marca</DialogTitle>
              <DialogDescription className="text-xs">
                Podrás agregar el logo desde el panel de marcas
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="quick-brand-name" className="text-xs font-semibold text-slate-600">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="quick-brand-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: ABB, Siemens, Schneider"
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
              {saving ? "Creando…" : "Crear marca"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
