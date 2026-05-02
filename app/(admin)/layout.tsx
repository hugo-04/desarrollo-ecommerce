/**
 * AdminLayout — Layout principal del panel de administración.
 */

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession, clearSession } from "@/lib/auth/session"
import { logoutAction } from "@/features/auth/actions"
import { Toaster } from "sonner"
import { AdminShell } from "@/components/admin/AdminShell"
import { AdminQueryProvider } from "@/components/admin/AdminQueryProvider"

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) {
    // Limpiar cookie antes de redirigir para evitar bucle proxy ↔ layout
    await clearSession()
    redirect("/login")
  }

  return (
    <AdminQueryProvider>
      <AdminShell email={session.email} logoutAction={logoutAction}>
        {children}
      </AdminShell>
      <Toaster richColors position="top-right" theme="light" className="font-sans" />
    </AdminQueryProvider>
  )
}
