import { AppShell } from "@/components/layout/AppShell"

/**
 * PUBLIC LAYOUT — Sitio público con AppShell completo.
 * Aplica a todas las rutas bajo (public): inicio, catálogo, producto, etc.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
