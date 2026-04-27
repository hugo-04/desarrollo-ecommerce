"use client"

/**
 * SECTION HEADER — Componente reutilizable
 *
 * Patron que se repite ~15 veces en el sitio:
 *   linea roja — LABEL — linea roja
 *   Titulo principal
 *   Subtitulo opcional
 *
 * Uso:
 *   <SectionHeader label="Categorias" title="Nuestras Categorias" subtitle="..." center />
 */

import { motion } from "framer-motion"
import { fadeUp } from "@/hooks/useAnimations"

interface SectionHeaderProps {
  label: string
  title: string
  titleHighlight?: string
  subtitle?: string
  center?: boolean
  dark?: boolean
  className?: string
}

export function SectionHeader({
  label,
  title,
  titleHighlight,
  subtitle,
  center = true,
  dark = false,
  className = "",
}: SectionHeaderProps) {
  const textColor = dark ? "text-white" : "text-[#1e293b]"
  const subtitleColor = dark ? "text-slate-400" : "text-slate-500"
  const align = center ? "text-center" : "text-left"

  return (
    <motion.div variants={fadeUp} className={`${align} ${className}`}>
      {/* Badge: línea — LABEL — línea */}
      <div className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <div className="h-px w-8 bg-slate-500" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-600">
          {label}
        </span>
        <div className="h-px w-8 bg-slate-500" />
      </div>

      {/* Título */}
      <h2 className={`text-3xl font-extrabold tracking-tight lg:text-4xl ${textColor}`}>
        {title}
        {titleHighlight && (
          <>
            <br />
            <span className="bg-gradient-to-r from-primary to-slate-600 bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </>
        )}
      </h2>

      {/* Subtítulo */}
      {subtitle && (
        <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
