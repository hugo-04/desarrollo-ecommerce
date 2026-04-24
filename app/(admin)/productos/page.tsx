"use client"

/**
 * /admin/productos — Página de listado de productos.
 *
 * Responsabilidad única (SRP): punto de entrada de la ruta.
 * Toda la lógica, estado y UI viven en AdminProductosView.
 */

import { AdminProductosView } from "@/features/productos/components/AdminProductosView"

export default function AdminProductosPage() {
  return <AdminProductosView />
}
