"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Layers, Tag, Plus, ClipboardList, BookOpen, FolderOpen, MonitorPlay, Users, Star, Landmark } from "lucide-react"
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
      { href: "/categorias",    label: "Categorías",    icon: Layers,    newHref: "/categorias/nueva"    },
      { href: "/subcategorias", label: "Subcategorías", icon: FolderOpen, newHref: "/subcategorias/nueva" },
      { href: "/gestion-marcas", label: "Marcas",        icon: Tag,        newHref: "/gestion-marcas/nueva" },
    ],
  },
  {
    label: "Contenido",
    items: [
      { href: "/hero",              label: "Hero / Portada",    icon: MonitorPlay, newHref: "/hero/nuevo"              },
      { href: "/blogs",             label: "Blog",              icon: BookOpen,    newHref: "/blogs/nuevo"             },
      { href: "/especialidades",    label: "Especialidades",    icon: Star,        newHref: "/especialidades/nueva"    },
      { href: "/entidades-bancarias", label: "Medios de Pago", icon: Landmark,    newHref: "/entidades-bancarias/nueva" },
      { href: "/nosotros-config",   label: "Nosotros",          icon: Users },
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
          <p className="mb-1.5 px-3 text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em' }}>
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
                      isActive ? "text-white" : "hover:text-white"
                    )}
                    style={!isActive ? { color: '#b8d4ee' } : undefined}
                  >
                    {isActive && (
                  <div
                    className="absolute inset-0 rounded-xl border-l-2"
                    style={{ background: 'linear-gradient(to right, rgba(0,102,179,0.3), rgba(0,102,179,0.08), transparent)', borderColor: 'var(--brand-trust)' }}
                  />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-150" />
                    )}

                    <div className={cn(
                      "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                      isActive ? "" : "group-hover:bg-white/10"
                    )}
                    style={isActive ? { background: 'rgba(0,102,179,0.35)', color: '#ffffff' } : { background: 'rgba(255,255,255,0.07)', color: '#92bfdf' }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <span className="relative z-10">{label}</span>

                    {isActive && (
                      <span className="ml-auto flex shrink-0 items-center">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: 'var(--brand-orange)', boxShadow: '0 0 6px rgba(255,107,53,0.9)' }}
                        />
                      </span>
                    )}
                  </Link>

                  {newHref && (
                    <Link
                      href={newHref}
                      title={`Nuevo en ${label}`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors"
                      style={{ color: '#7aafd4' }}
                      onMouseEnter={e => { e.currentTarget.style.background='rgba(0,102,179,0.2)'; e.currentTarget.style.color='var(--brand-orange)' }}
                      onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='#7aafd4' }}
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
