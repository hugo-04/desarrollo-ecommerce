"use client"

import { useState } from "react"
import { useActionState } from "react"
import { loginAction } from "@/features/auth/actions"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07091E]">
      <div className="w-full max-w-sm">
        {/* Logo / marca */}
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Panel de Administración</p>
          <h1 className="mt-2 text-2xl font-extrabold text-white">Electro Thina</h1>
        </div>

        <form action={action} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-base font-semibold text-white">Iniciar Sesión</h2>

          {state?.error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@electrothina.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#1C2870] focus:ring-2 focus:ring-[#1C2870]/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">
                Contraseña
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pr-11 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#1C2870] focus:ring-2 focus:ring-[#1C2870]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full rounded-lg bg-[#1C2870] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1C2870]/80 disabled:opacity-60"
          >
            {pending ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/20">
          Credenciales configuradas en variables de entorno
        </p>
      </div>
    </div>
  )
}
