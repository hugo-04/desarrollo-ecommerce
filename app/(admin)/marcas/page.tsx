"use client"

/**
 * /admin/marcas — Listado de marcas.
 * Responsabilidad única: punto de entrada de la ruta.
 * Toda la lógica y UI viven en AdminMarcasView.
 */

import { AdminMarcasView } from "@/features/marcas/components/AdminMarcasView"

export default function AdminMarcasPage() {
  return <AdminMarcasView />
}
