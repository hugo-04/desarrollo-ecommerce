"use client"

/**
 * /admin/categorias — Listado de categorías.
 * Responsabilidad única: punto de entrada de la ruta.
 * Toda la lógica y UI viven en AdminCategoriasView.
 */

import { AdminCategoriasView } from "@/features/categorias/components/AdminCategoriasView"

export default function AdminCategoriasPage() {
  return <AdminCategoriasView />
}
