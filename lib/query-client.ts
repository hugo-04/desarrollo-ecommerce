import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query"

/**
 * Crea una instancia de QueryClient con configuraciones optimizadas.
 * En Next.js, necesitamos asegurarnos de que el cliente sea estable en el cliente
 * y se cree uno nuevo por request en el servidor.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Con SSR, solemos querer staleTime por encima de 0 para evitar
        // refetch inmediato en la hidratación.
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      dehydrate: {
        // Incluir queries con error en la deshidratación (opcional)
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Servidor: siempre crear un nuevo cliente por request
    return makeQueryClient()
  } else {
    // Cliente: crear el cliente solo una vez y reutilizarlo
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
