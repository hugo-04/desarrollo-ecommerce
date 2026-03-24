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
    <nav className="flex-1 space-y-0.5 px-3 py-4">
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
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-white/[0.08] text-white"
                : "text-white/40 hover:bg-white/[0.05] hover:text-white/75",
            )}
          >
            {/* Ícono con fondo sutil cuando está activo */}
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors",
                isActive
                  ? "bg-[#1C2870]/70 text-blue-200"
                  : "group-hover:bg-white/[0.06] text-current",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>

            <span>{label}</span>

            {/* Indicador activo — punto a la derecha */}
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
