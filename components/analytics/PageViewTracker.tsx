"use client"

import { useEffect } from "react"

/** Registra una vista de página en la DB (fire-and-forget, sin bloquear render) */
export function PageViewTracker({ path }: { path: string }) {
  useEffect(() => {
    fetch("/api/views", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ path }),
    }).catch(() => {})
  }, [path])
  return null
}
