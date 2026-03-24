/**
 * Helpers de UI reutilizables dentro del formulario de producto.
 *
 * `SectionHeader` — encabezado de sección con título y subtítulo.
 * `Field`         — input genérico con label y manejo de error.
 */

// ─── SectionHeader ─────────────────────────────────────────────────────────

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="border-b border-slate-100 pb-3">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
    </div>
  )
}

// ─── Field ─────────────────────────────────────────────────────────────────

export function Field({
  label,
  name,
  defaultValue,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  step,
  min,
  max,
}: {
  label: string
  name: string
  defaultValue?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  required?: boolean
  type?: string
  step?: string
  min?: string
  max?: string
}) {
  const controlled = value !== undefined
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-0.5 text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        {...(controlled ? { value, onChange } : { defaultValue })}
        placeholder={placeholder}
        required={required}
        step={step}
        min={min}
        max={max}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder-slate-300 focus:border-[#1C2870]/40 focus:ring-2 focus:ring-[#1C2870]/15"
      />
    </div>
  )
}
