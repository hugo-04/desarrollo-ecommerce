"use client"

/**
 * WHATSAPP BUTTON — Componente reutilizable
 *
 * Variantes:
 *   - "primary"   → fondo verde (CTA principal)
 *   - "outline"   → borde verde (secundario)
 *   - "link"      → solo texto con icono
 *
 * Uso:
 *   <WhatsAppButton href={WA.cotizar} label="Cotizar ahora" />
 */

import { IconWhatsApp } from "@/components/icons"

interface WhatsAppButtonProps {
  href: string
  label?: string
  sublabel?: string
  variant?: "primary" | "outline" | "link"
  className?: string
}

export function WhatsAppButton({
  href,
  label = "Solicitar Cotizacion",
  sublabel,
  variant = "primary",
  className = "",
}: WhatsAppButtonProps) {
  const base = "inline-flex items-center gap-2.5 font-semibold transition-all duration-200"

  const variants = {
    primary:
      "rounded-xl bg-green-600 px-6 py-3 text-sm text-white shadow-md shadow-green-600/25 hover:bg-green-700 hover:shadow-green-600/40",
    outline:
      "rounded-xl border border-green-600 px-6 py-3 text-sm text-green-700 hover:bg-green-50",
    link: "text-sm text-slate-400 hover:text-green-500",
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <IconWhatsApp className="h-4 w-4 shrink-0" />
      <span>
        <span className="block leading-tight">{label}</span>
        {sublabel && (
          <span className="block text-[10px] font-normal opacity-75">{sublabel}</span>
        )}
      </span>
    </a>
  )
}
