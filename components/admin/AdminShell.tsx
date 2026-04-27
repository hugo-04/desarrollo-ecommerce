"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ExternalLink, LogOut, ShieldAlert } from "lucide-react"
import { AdminNav } from "@/components/admin/AdminNav"

interface AdminShellProps {
  children: React.ReactNode
  email: string
  logoutAction: () => Promise<void>
}

export function AdminShell({ children, email, logoutAction }: AdminShellProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-200 relative">
      {/* Dot pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply"
        style={{ backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
      />

      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 flex w-[260px] shrink-0 flex-col overflow-hidden",
          "border-r border-[#334155]/10 shadow-xl",
          "bg-gradient-to-b from-[#0f172a] via-[#0b143f] to-[#040614] text-slate-300",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Glow top */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-600/10 to-transparent pointer-events-none" />

        {/* Logo header */}
        <div className="relative z-10 px-4 py-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logotipo.png"
              alt="Logo"
              className="h-8 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,1)) brightness(1.4) contrast(1.1)" }}
            />
            <div className="min-w-0 flex-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#a5f3fc]">Portal Admin</p>
            </div>
            {/* Botón cerrar — solo mobile */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Navegación */}
        <div className="flex-1 overflow-hidden py-4 px-3">
          <AdminNav onNavigate={() => setOpen(false)} />
        </div>

        {/* Footer sidebar */}
        <div className="relative z-10 p-4 border-t border-white/[0.05]">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-2 shadow-inner">
            <div className="px-3 py-2 flex items-center gap-3">
              <div className="bg-[#334155]/40 p-1.5 rounded-lg">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Operador</p>
                <p className="mt-0.5 truncate text-xs font-medium text-slate-200">{email}</p>
              </div>
            </div>
            <div className="my-1.5 h-px bg-white/[0.04] mx-2" />
            <Link
              href="/"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" />
              Ver tienda pública
            </Link>
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

      {/* Contenido principal */}
      <main className="flex flex-col relative z-10 w-full min-w-0 min-h-screen overflow-hidden md:ml-[260px]">
        {/* Topbar mobile */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
            aria-label="Abrir menú"
          >
            <Menu size={16} />
          </button>
          <img src="/logo/logotipo.png" alt="Logo" className="h-7 w-auto object-contain" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Admin</span>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 w-full animate-in fade-in zoom-in-95 duration-500 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  )
}
