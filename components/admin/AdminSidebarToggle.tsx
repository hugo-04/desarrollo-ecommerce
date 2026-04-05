"use client"

import { Menu } from "lucide-react"

function setSidebarOpen(open: boolean) {
  const sidebar = document.getElementById("admin-sidebar")
  if (sidebar) {
    sidebar.classList.toggle("open", open)
    sidebar.style.transform = open ? "translateX(0)" : ""
  }
  const backdrop = document.getElementById("admin-backdrop")
  if (open) backdrop?.classList.remove("hidden")
  else backdrop?.classList.add("hidden")
}

export function AdminSidebarToggle() {
  return (
    <button
      onClick={() => setSidebarOpen(true)}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
      aria-label="Abrir menú"
    >
      <Menu size={16} />
    </button>
  )
}

export function AdminSidebarClose() {
  return (
    <button
      onClick={() => setSidebarOpen(false)}
      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-white/10 hover:text-white transition-colors md:hidden"
      aria-label="Cerrar menú"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  )
}
