"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Layers, Tag, Plus, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_SECTIONS: {
  label: string
  items: { href: string; label: string; icon: React.ElementType; newHref?: string }[]
}[] = [
  {
    label: "General",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Catálogo",
    items: [
      { href: "/productos",  label: "Productos",  icon: Package, newHref: "/productos/nuevo"  },
      { href: "/categorias", label: "Categorías", icon: Layers,  newHref: "/categorias/nueva" },
      { href: "/marcas",     label: "Marcas",     icon: Tag,     newHref: "/marcas/nueva"      },
    ],
  },
  {
    label: "Atención",
    items: [
      { href: "/reclamaciones", label: "Reclamaciones", icon: ClipboardList },
    ],
  },
]

export function AdminNav({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname()

  return (
    <nav className="relative z-10 flex flex-col gap-5">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="mb-1.5 px-3 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">
            {section.label}
          </p>

          <div className="flex flex-col gap-0.5">
            {section.items.map(({ href, label, icon: Icon, newHref }) => {
              const isActive =
                href === "/dashboard" ? pathname === href : pathname.startsWith(href)

              return (
                <div key={href} className="flex items-center gap-1">
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 overflow-hidden",
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-100"
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600/25 via-cyan-500/10 to-transparent border-l-2 border-cyan-400" />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-150" />
                    )}

                    <div className={cn(
                      "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-slate-300"
                    )}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <span className="relative z-10">{label}</span>

                    {isActive && (
                      <span className="ml-auto flex shrink-0 items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
                      </span>
                    )}
                  </Link>

                  {newHref && (
                    <Link
                      href={newHref}
                      title={`Nuevo en ${label}`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-white/10 hover:text-cyan-300 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
