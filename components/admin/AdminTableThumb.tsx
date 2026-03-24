"use client"

/**
 * AdminTableThumb — miniatura cuadrada reutilizable para tablas del panel admin.
 * Siempre ocupa un contenedor fijo cuadrado con bordes redondeados.
 * "cover"  → imagen de producto (recorte centrado)
 * "square" → logo de marca (con padding para que respire)
 */
interface AdminTableThumbProps {
  src?: string
  alt: string
  fallback: string
  variant?: "cover" | "square"
}

export function AdminTableThumb({
  src,
  alt,
  fallback,
  variant = "cover",
}: AdminTableThumbProps) {
  const initials = fallback
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")

  const wrapperClass =
    "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50"

  const imgClass =
    variant === "cover"
      ? "h-full w-full object-cover"
      : "h-7 w-7 object-contain"

  return (
    <div className={wrapperClass}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={imgClass}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
      ) : (
        <span className="text-xs font-bold text-slate-400">{initials}</span>
      )}
    </div>
  )
}
