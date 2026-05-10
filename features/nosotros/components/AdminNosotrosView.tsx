"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNosotrosDataAction, saveNosotrosDataAction } from "@/features/nosotros/actions"
import type { NosotrosData, NosotrosIconKey, NosotrosStat, NosotrosValor } from "@/features/nosotros/types"
import { DEFAULT_NOSOTROS } from "@/features/nosotros/types"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_OPTIONS: { value: NosotrosIconKey; label: string }[] = [
  { value: "shield",     label: "Escudo (Garantía)" },
  { value: "truck",      label: "Camión (Entrega)" },
  { value: "bolt",       label: "Rayo (Asesoría)" },
  { value: "headphones", label: "Auriculares (Soporte)" },
]

// ── Componente acordeón para secciones ──────────────────────────────────────
function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-sm font-bold text-[#1B2B4B]">{title}</span>
        {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {open && <div className="border-t border-slate-100 px-6 py-5 space-y-4">{children}</div>}
    </div>
  )
}

// ── Editor de lista de strings ───────────────────────────────────────────────
function StringListEditor({
  label,
  items,
  onChange,
  placeholder = "Nuevo elemento",
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={item}
              onChange={e => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              className="flex-1 text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-red-400 hover:text-red-600 hover:bg-red-50"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onChange([...items, ""])}
        >
          <Plus className="mr-1.5 h-3 w-3" />
          {placeholder}
        </Button>
      </div>
    </div>
  )
}

// ── Editor de stats ──────────────────────────────────────────────────────────
function StatsEditor({ stats, onChange }: { stats: NosotrosStat[]; onChange: (s: NosotrosStat[]) => void }) {
  return (
    <div>
      <Label className="mb-2 block">Estadísticas</Label>
      <div className="space-y-3">
        {stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <div>
              <Label className="text-[10px] text-slate-500 mb-1 block">Número final</Label>
              <Input
                type="number"
                value={stat.end}
                onChange={e => {
                  const next = [...stats]
                  next[i] = { ...next[i], end: Number(e.target.value) }
                  onChange(next)
                }}
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-[10px] text-slate-500 mb-1 block">Sufijo</Label>
              <Input
                value={stat.suffix}
                onChange={e => {
                  const next = [...stats]
                  next[i] = { ...next[i], suffix: e.target.value }
                  onChange(next)
                }}
                className="text-sm"
                placeholder="+, %, etc."
              />
            </div>
            <div>
              <Label className="text-[10px] text-slate-500 mb-1 block">Etiqueta</Label>
              <Input
                value={stat.label}
                onChange={e => {
                  const next = [...stats]
                  next[i] = { ...next[i], label: e.target.value }
                  onChange(next)
                }}
                className="text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Editor de valores ────────────────────────────────────────────────────────
function ValoresEditor({ valores, onChange }: { valores: NosotrosValor[]; onChange: (v: NosotrosValor[]) => void }) {
  return (
    <div>
      <Label className="mb-2 block">Tarjetas de Valores</Label>
      <div className="space-y-4">
        {valores.map((valor, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">VALOR {i + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-600 hover:bg-red-50 h-7 px-2 text-xs"
                onClick={() => onChange(valores.filter((_, j) => j !== i))}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Eliminar
              </Button>
            </div>
            <div>
              <Label className="text-[10px] text-slate-500 mb-1 block">Ícono</Label>
              <Select
                value={valor.iconKey}
                onValueChange={v => {
                  const next = [...valores]
                  next[i] = { ...next[i], iconKey: v as NosotrosIconKey }
                  onChange(next)
                }}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] text-slate-500 mb-1 block">Título</Label>
              <Input
                value={valor.title}
                onChange={e => {
                  const next = [...valores]
                  next[i] = { ...next[i], title: e.target.value }
                  onChange(next)
                }}
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-[10px] text-slate-500 mb-1 block">Descripción</Label>
              <Textarea
                value={valor.description}
                onChange={e => {
                  const next = [...valores]
                  next[i] = { ...next[i], description: e.target.value }
                  onChange(next)
                }}
                className="text-sm"
                rows={3}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() =>
            onChange([...valores, { iconKey: "shield", title: "", description: "" }])
          }
        >
          <Plus className="mr-1.5 h-3 w-3" />
          Agregar valor
        </Button>
      </div>
    </div>
  )
}

// ── Vista principal ──────────────────────────────────────────────────────────
export function AdminNosotrosView() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["nosotros-config"],
    queryFn:  getNosotrosDataAction,
  })

  const [form, setForm] = useState<NosotrosData | null>(null)
  const current = form ?? data ?? DEFAULT_NOSOTROS

  const { mutate: save, isPending } = useMutation({
    mutationFn: saveNosotrosDataAction,
    onSuccess: (saved) => {
      queryClient.setQueryData(["nosotros-config"], saved)
      setForm(null)
    },
  })

  function patch(path: string[], value: any) {
    setForm(prev => {
      const base = JSON.parse(JSON.stringify(prev ?? data ?? DEFAULT_NOSOTROS)) as NosotrosData
      let obj: any = base
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]]
      obj[path[path.length - 1]] = value
      return base
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-100" />
        ))}
      </div>
    )
  }

  const isDirty = form !== null

  return (
    <div className="space-y-4">
      {/* Header sticky */}
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm px-5 py-3 shadow-sm">
        <div>
          <p className="text-sm font-bold text-[#1B2B4B]">Contenido de Nosotros</p>
          <p className="text-[11px] text-slate-400">{isDirty ? "Cambios sin guardar" : "Sin cambios pendientes"}</p>
        </div>
        <Button
          onClick={() => save(current)}
          disabled={!isDirty || isPending}
          className={cn(
            "gap-2 text-sm font-semibold",
            isDirty
              ? "bg-[#0066B3] hover:bg-[#0055a0] text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          <Save className="h-4 w-4" />
          {isPending ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>

      {/* ── HERO ── */}
      <Section title="🏷️ Hero — Encabezado de la página" defaultOpen={true}>
        <div>
          <Label className="mb-1 block text-xs">Badge</Label>
          <Input
            value={current.hero.badge}
            onChange={e => patch(["hero", "badge"], e.target.value)}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Título H1</Label>
          <Textarea
            value={current.hero.h1}
            onChange={e => patch(["hero", "h1"], e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Subtítulo</Label>
          <Textarea
            value={current.hero.subtitle}
            onChange={e => patch(["hero", "subtitle"], e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
      </Section>

      {/* ── STATS ── */}
      <Section title="📊 Estadísticas animadas">
        <StatsEditor
          stats={current.stats}
          onChange={v => patch(["stats"], v)}
        />
      </Section>

      {/* ── HISTORIA ── */}
      <Section title="📖 Quiénes somos — Nuestra Historia">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-1 block text-xs">Etiqueta de sección</Label>
            <Input
              value={current.historia.sectionLabel}
              onChange={e => patch(["historia", "sectionLabel"], e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
        <div>
          <Label className="mb-1 block text-xs">Título H2</Label>
          <Textarea
            value={current.historia.h2}
            onChange={e => patch(["historia", "h2"], e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Párrafo 1</Label>
          <Textarea
            value={current.historia.p1}
            onChange={e => patch(["historia", "p1"], e.target.value)}
            rows={4}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Párrafo 2</Label>
          <Textarea
            value={current.historia.p2}
            onChange={e => patch(["historia", "p2"], e.target.value)}
            rows={4}
            className="text-sm"
          />
        </div>
        <StringListEditor
          label="Badges de confianza"
          items={current.historia.trustBadges}
          onChange={v => patch(["historia", "trustBadges"], v)}
          placeholder="Agregar badge"
        />
        <div>
          <Label className="mb-1 block text-xs">Imagen del almacén</Label>
          <ImageUpload
            value={current.historia.imageUrl}
            onChange={(url: string) => patch(["historia", "imageUrl"], url)}
            folder="nosotros"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Alt de la imagen</Label>
          <Input
            value={current.historia.imageAlt}
            onChange={e => patch(["historia", "imageAlt"], e.target.value)}
            className="text-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-1 block text-xs">Ciudad del overlay</Label>
            <Input
              value={current.historia.overlayCity}
              onChange={e => patch(["historia", "overlayCity"], e.target.value)}
              className="text-sm"
              placeholder="Los Olivos"
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Stock del overlay</Label>
            <Input
              value={current.historia.overlayStock}
              onChange={e => patch(["historia", "overlayStock"], e.target.value)}
              className="text-sm"
              placeholder="500+"
            />
          </div>
        </div>
      </Section>

      {/* ── MISIÓN ── */}
      <Section title="🎯 Misión">
        <div>
          <Label className="mb-1 block text-xs">Badge</Label>
          <Input
            value={current.mision.badge}
            onChange={e => patch(["mision", "badge"], e.target.value)}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Título H3</Label>
          <Textarea
            value={current.mision.h3}
            onChange={e => patch(["mision", "h3"], e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Descripción</Label>
          <Textarea
            value={current.mision.description}
            onChange={e => patch(["mision", "description"], e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
        <StringListEditor
          label="Puntos clave"
          items={current.mision.bullets}
          onChange={v => patch(["mision", "bullets"], v)}
          placeholder="Agregar punto"
        />
      </Section>

      {/* ── VISIÓN ── */}
      <Section title="🔭 Visión">
        <div>
          <Label className="mb-1 block text-xs">Badge</Label>
          <Input
            value={current.vision.badge}
            onChange={e => patch(["vision", "badge"], e.target.value)}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Título H3</Label>
          <Textarea
            value={current.vision.h3}
            onChange={e => patch(["vision", "h3"], e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Descripción</Label>
          <Textarea
            value={current.vision.description}
            onChange={e => patch(["vision", "description"], e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
        <StringListEditor
          label="Puntos clave"
          items={current.vision.bullets}
          onChange={v => patch(["vision", "bullets"], v)}
          placeholder="Agregar punto"
        />
      </Section>

      {/* ── VALORES ── */}
      <Section title="💎 Valores — Tarjetas de compromiso">
        <ValoresEditor
          valores={current.valores}
          onChange={v => patch(["valores"], v)}
        />
      </Section>

      {/* ── CTA ── */}
      <Section title="📣 CTA — Llamada a la acción final">
        <div>
          <Label className="mb-1 block text-xs">Título H2</Label>
          <Textarea
            value={current.cta.h2}
            onChange={e => patch(["cta", "h2"], e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs">Descripción</Label>
          <Textarea
            value={current.cta.description}
            onChange={e => patch(["cta", "description"], e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>
      </Section>
    </div>
  )
}
