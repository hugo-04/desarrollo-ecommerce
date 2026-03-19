import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { logoutAction } from "@/features/auth/actions"
import Link from "next/link"

const NAV = [
  { href: "/dashboard",  label: "Dashboard" },
  { href: "/productos",  label: "Productos" },
  { href: "/categorias", label: "Categorías" },
  { href: "/marcas",     label: "Marcas" },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/login")

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col bg-[#07091E] text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Electro Thina</p>
          <p className="mt-0.5 text-sm font-semibold text-white">Panel Admin</p>
          <p className="mt-1 text-[10px] text-white/30">{session.email}</p>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="space-y-0.5 border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            ← Ver sitio
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
