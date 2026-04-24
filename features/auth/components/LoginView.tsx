"use client"

/**
 * LoginView — Formulario de inicio de sesión del panel admin.
 * Extraído de app/login/page.tsx (SRP: el page solo importa esta vista).
 */

import { useState }       from "react"
import { useActionState } from "react"
import { loginAction }    from "@/features/auth/actions"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"

export function LoginView() {
  const [state, action, pending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0f2c] font-sans">
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-[#1C2870]/40 blur-[120px] mix-blend-screen" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#CC1B1B]/15 blur-[120px] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 30h25M35 30h25M30 0v25M30 35v25\' stroke=\'%23a5f3fc\' stroke-width=\'.6\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-5 flex flex-col items-center">
            <div className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-white/10 blur-2xl" />
            <img src="/logo/logotipo.png" alt="Electro Thina" className="relative h-14 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6)) brightness(1.15)" }} />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400 drop-shadow-sm">Panel de Administración</p>
        </div>

        {/* Formulario */}
        <form action={action} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]/60 px-8 py-10 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C2870] to-transparent" />
          <h2 className="mb-6 flex items-center justify-between text-xl font-bold tracking-tight text-white">
            <span>Iniciar Sesión</span>
            <ShieldCheck className="h-5 w-5 text-emerald-400 opacity-80" />
          </h2>

          {state?.error && (
            <div className="mb-6 animate-in slide-in-from-top-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {state.error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Correo electrónico</label>
              <input name="email" type="email" autoComplete="email" required placeholder="admin@electrothina.com"
                className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-900/80 focus:ring-4 focus:ring-cyan-500/10" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Contraseña</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 px-4 py-3.5 pr-12 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-900/80 focus:ring-4 focus:ring-cyan-500/10" />
                <button type="button" tabIndex={-1} onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar" : "Mostrar"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={pending}
            className="group relative mt-8 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#1C2870] to-[#0ea5e9] p-[1px] shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
            <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <div className="relative rounded-xl bg-[#1C2870]/10 py-3.5 text-center text-sm font-bold text-white backdrop-blur-sm transition-colors group-hover:bg-transparent">
              <span className="relative z-10">{pending ? "Autenticando..." : "Ingresar de forma segura"}</span>
            </div>
          </button>
        </form>
        <p className="mt-8 text-center text-xs font-medium text-slate-500/70">Infraestructura de Gestión Asegurada</p>
      </div>
    </div>
  )
}
