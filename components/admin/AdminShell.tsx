"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sube al inicio del área de contenido al cambiar de ruta
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return (
    <div className="flex min-h-screen font-sans relative" style={{ background: 'var(--brand-gray-light)', color: 'var(--brand-gray-mid)' }}>
      {/* Dot pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
        style={{ backgroundImage: "radial-gradient(#b8c5d6 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
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
          "border-r shadow-xl",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
        style={{ background: 'linear-gradient(160deg, var(--brand-deep) 0%, #002856 60%, #001a3a 100%)', borderColor: 'rgba(0,102,179,0.15)', color: '#c8dff0' }}
      >
        {/* Glow top */}
        {/* Glow de marca — azul confianza */}
        <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,102,179,0.18), transparent)' }} />

        {/* Logo header */}
        <div className="relative z-10 px-4 py-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logotipo.svg"
              alt="Logo"
              className="h-8 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,1)) brightness(1.4) contrast(1.1)" }}
            />
            <div className="min-w-0 flex-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--brand-orange)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--brand-orange)' }} />
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--brand-orange)' }}>Portal Admin</p>
            </div>
            {/* Botón cerrar — solo mobile */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors" style={{ color: 'rgba(200,223,240,0.6)' }} onMouseEnter={e => (e.currentTarget.style.background='rgba(0,102,179,0.2)', e.currentTarget.style.color='white')} onMouseLeave={e => (e.currentTarget.style.background='', e.currentTarget.style.color='rgba(200,223,240,0.6)')}
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
          <div className="rounded-2xl p-2 shadow-inner" style={{ background: 'rgba(0,40,86,0.5)', border: '1px solid rgba(0,102,179,0.15)' }}>
            <div className="px-3 py-2 flex items-center gap-3">
              <div className="p-1.5 rounded-lg" style={{ background: 'rgba(0,102,179,0.25)' }}>
                <ShieldAlert className="w-4 h-4" style={{ color: 'var(--brand-orange)' }} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Operador</p>
                <p className="mt-0.5 truncate text-xs font-medium" style={{ color: '#deeaf5' }}>{email}</p>
              </div>
            </div>
            <div className="my-1.5 h-px mx-2" style={{ background: 'rgba(0,102,179,0.15)' }} />
            <Link
              href="/"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors group"
              style={{ color: '#b8d4ee' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(0,102,179,0.15)'; e.currentTarget.style.color='#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='#b8d4ee' }}
            >
              <ExternalLink className="h-4 w-4 shrink-0" style={{ color: 'rgba(200,223,240,0.4)' }} />
              Ver tienda pública
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors group"
                style={{ color: '#b8d4ee' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,107,53,0.1)'; e.currentTarget.style.color='#FF6B35' }}
                onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='#b8d4ee' }}
              >
                <LogOut className="h-4 w-4 shrink-0" style={{ color: 'rgba(200,223,240,0.4)' }} />
                <span>Cerrar sesión</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex flex-col relative z-10 w-full min-w-0 min-h-screen overflow-hidden md:ml-[260px]">
        {/* Topbar mobile */}
        <div className="flex items-center gap-3 px-4 py-3 md:hidden" style={{ background: 'var(--brand-deep)', borderBottom: '1px solid rgba(0,102,179,0.25)' }}>
          <button
            onClick={() => setOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
            style={{ border: '1px solid rgba(0,102,179,0.4)', background: 'rgba(0,102,179,0.2)', color: '#c8dff0' }}
            aria-label="Abrir menú"
          >
            <Menu size={16} />
          </button>
          <img src="/logo/logotipo.svg" alt="Logo" className="h-7 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          <span className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--brand-orange)' }}>Admin</span>
        </div>

        <div ref={scrollRef} className="flex-1 p-4 sm:p-6 lg:p-8 w-full animate-in fade-in zoom-in-95 duration-500 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #b0c6dc; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--brand-trust); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fetchBar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </div>
  )
}
