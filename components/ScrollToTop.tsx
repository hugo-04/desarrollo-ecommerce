"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * ScrollToTop — Sube la ventana al inicio al cambiar de ruta.
 *
 * Úsalo en layouts para que cada navegación comience desde arriba.
 * Para el layout admin (que tiene scroll interno en un div), usa
 * AdminScrollToTop en su lugar.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}
