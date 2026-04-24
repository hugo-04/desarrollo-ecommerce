/**
 * /admin/reclamaciones — Libro de reclamaciones del panel admin.
 *
 * Thin shell (SRP): resuelve la página, obtiene datos y los pasa a la vista.
 * Toda la UI vive en AdminReclamacionesView.
 */

export const dynamic = "force-dynamic"

import { getReclamacionesAction }      from "@/features/reclamaciones/actions"
import { AdminReclamacionesView }      from "@/features/reclamaciones/components/AdminReclamacionesView"

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function ReclamacionesPage({ searchParams }: Props) {
  // Parseo defensivo del número de página
  const { page: pageParam } = await searchParams
  const page = Math.min(100_000, Math.max(1, parseInt(pageParam ?? "1", 10) || 1))

  const data = await getReclamacionesAction(page)

  return <AdminReclamacionesView data={data} />
}
