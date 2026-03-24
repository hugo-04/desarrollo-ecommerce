/**
 * AdminLayout — Layout principal del panel de administración.
 *
 * Es un Server Component: solo verifica la sesión y renderiza la estructura.
 * La navegación activa se delega a AdminNav (Client Component) para poder
 * usar usePathname() sin convertir este layout a "use client".
 */

import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { logoutAction } from "@/features/auth/actions"
import Link from "next/link"
import { ExternalLink, LogOut } from "lucide-react"
import { Toaster } from "sonner"
import { AdminNav } from "@/components/admin/AdminNav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/login")

  return (
    <div className="flex min-h-screen bg-slate-100/80">

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className="flex w-60 shrink-0 flex-col bg-[#07091E] text-white">

        {/* Marca / Logo del panel */}
        <div className="border-b border-white/[0.06] px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1C2870] to-[#0d1240] shadow-inner">
              <span className="text-xs font-black tracking-tight text-white">ET</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight text-white">Electro Thina</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/25">Admin</p>
            </div>
          </div>
        </div>

        {/* Navegación — Client Component con estado activo */}
        <AdminNav />

        {/* Footer del sidebar: sesión + acciones */}
        <div className="border-t border-white/[0.06] px-3 py-4">
          {/* Email de sesión activa */}
          <div className="mb-3 rounded-lg bg-white/[0.03] px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-widest text-white/20">Sesión activa</p>
            <p className="mt-0.5 truncate text-xs font-medium text-white/45">{session.email}</p>
          </div>

          {/* Ver sitio público */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/35 transition-all hover:bg-white/[0.05] hover:text-white/65"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver sitio
          </Link>

          {/* Cerrar sesión */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/35 transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── Contenido principal ─────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>

      {/* Toast notifications */}
      <Toaster richColors position="top-right" />
    </div>
  )
}
