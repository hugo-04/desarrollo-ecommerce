"use client"

/**
 * AdminNav — Navegación lateral del panel admin con indicador de sección activa.
 * Es un Client Component separado para poder usar usePathname() sin convertir
 * el layout entero a client (el layout debe seguir siendo Server Component).
 */

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Layers, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/dashboard",  label: "Dashboard",   icon: LayoutDashboard },
  { href: "/productos",  label: "Productos",   icon: Package          },
  { href: "/categorias", label: "Categorías",  icon: Layers           },
  { href: "/marcas",     label: "Marcas",       icon: Tag              },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="relative z-10 flex-1 space-y-1.5">
      {NAV.map(({ href, label, icon: Icon }) => {
        /**
         * Dashboard solo activo en /dashboard exacto.
         * El resto activo en /productos, /productos/nuevo, /productos/123/editar, etc.
         */
        const isActive =
          href === "/dashboard" ? pathname === href : pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 overflow-hidden",
              isActive
                ? "text-white"
                : "text-slate-400 hover:text-slate-100"
            )}
          >
            {/* Background pill for active state */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-transparent border-l-2 border-cyan-400" />
            )}
            
            {/* Hover background for inactive state */}
            {!isActive && (
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
            )}

            {/* Ícono con fondo sutil cuando está activo */}
            <div
              className={cn(
                "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                isActive
                  ? "bg-[#1C2870] text-cyan-400 shadow-md shadow-cyan-500/20 scale-105"
                  : "bg-slate-800/40 text-slate-400 group-hover:bg-slate-700/50 group-hover:text-cyan-200"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            <span className="relative z-10 drop-shadow-sm">{label}</span>

            {/* Indicador activo — punto a la derecha */}
            {isActive && (
              <span className="ml-auto flex items-center shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
