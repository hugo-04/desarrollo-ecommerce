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
import { ExternalLink, LogOut, ShieldAlert } from "lucide-react"
import { Toaster } from "sonner"
import { AdminNav } from "@/components/admin/AdminNav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/login")

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-200">
      {/* Background pattern for the main content area (adds texture / life) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      {/* ── Sidebar ── */}
      <aside className="relative flex w-[260px] shrink-0 flex-col border-r border-[#1C2870]/10 bg-gradient-to-b from-[#0a0f2c] via-[#0b143f] to-[#040614] text-slate-300 shadow-xl z-20">
        {/* Decorative top glow */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-600/10 to-transparent pointer-events-none" />
        
        {/* Circuit overlay for tech vibe inside sidebar */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 30h25M35 30h25M30 0v25M30 35v25\' stroke=\'%23a5f3fc\' stroke-width=\'.6\'/%3E%3C/svg%3E")' }} />

        {/* Marca / Logo del panel */}
        <div className="relative z-10 px-6 py-6 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1C2870] to-[#CC1B1B] shadow-lg shadow-[#CC1B1B]/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300">
              <span className="text-xs font-black tracking-tight text-white drop-shadow-md">ET</span>
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-white tracking-tight leading-tight">Electro Thina</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#a5f3fc]">Portal Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación — Client Component con estado activo */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 no-scrollbar">
          <p className="px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 drop-shadow-sm">Menú Principal</p>
          <AdminNav />
        </div>

        {/* Footer del sidebar: sesión + acciones */}
        <div className="relative z-10 p-4 border-t border-white/[0.05]">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-2 backdrop-blur-md shadow-inner">
            {/* Email de sesión activa */}
            <div className="px-3 py-2 flex items-center gap-3">
              <div className="bg-[#1C2870]/40 p-1.5 rounded-lg">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Operador</p>
                <p className="mt-0.5 truncate text-xs font-medium text-slate-200">{session.email}</p>
              </div>
            </div>

            <div className="my-1.5 h-px bg-white/[0.04] mx-2" />

            {/* Ver sitio público */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" />
              Ver tienda pública
            </Link>

            {/* Cerrar sesión */}
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400 group"
              >
                <LogOut className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-red-400 transition-colors" />
                <span>Cerrar sesión</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* ── Contenido principal ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col relative z-10 w-full min-h-screen overflow-hidden">
        <div className="flex-1 p-8 mx-auto w-full max-w-7xl animate-in fade-in zoom-in-95 duration-500 h-full overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster richColors position="top-right" theme="light" className="font-sans" />
      
      {/* Global overrides para el main area si hiciera falta */}
      <style dangerouslySetInnerHTML={{__html:`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  )
}
