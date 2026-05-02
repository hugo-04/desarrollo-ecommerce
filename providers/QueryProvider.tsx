"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query-client"

/**
 * Proveedor de TanStack Query optimizado para Next.js 15.
 * Gestiona la instancia del cliente tanto en SSR como en hidratación.
 */
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Nota: Evitamos usar useState aquí para que el cliente sea accesible 
  // inmediatamente durante la hidratación.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
