import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { logoutAction } from "@/features/auth/actions"
import Link from "next/link"
import { LayoutDashboard, Package, Layers, Tag, ExternalLink, LogOut } from "lucide-react"
import { Toaster } from "sonner"

const NAV = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { href: "/productos",  label: "Productos",  icon: Package          },
  { href: "/categorias", label: "Categorías", icon: Layers           },
  { href: "/marcas",     label: "Marcas",     icon: Tag              },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/login")

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-white/5 bg-[#07091E] text-white">
        {/* Brand */}
        <div className="border-b border-white/8 px-5 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C2870]">
              <span className="text-xs font-black text-white">ET</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Electro Thina</p>
              <p className="text-[10px] text-white/30">Panel de Administración</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/8 hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/8 px-3 py-4 space-y-0.5">
          <div className="mb-3 px-3">
            <p className="text-[10px] text-white/25">Sesión activa</p>
            <p className="mt-0.5 truncate text-xs font-medium text-white/50">{session.email}</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 transition-all hover:bg-white/8 hover:text-white/70"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver sitio
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/40 transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  )
}
