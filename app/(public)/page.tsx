import { HomeView } from "@/components/views/HomeView"
import { getCategoriesAction } from "@/features/categorias/actions"

/**
 * HomePage — Server Component.
 * Carga las categorías desde la DB una sola vez en el servidor
 * y las pasa a HomeView para que las muestre sin llamadas extra al cliente.
 */
export default async function HomePage() {
  const categories = await getCategoriesAction()
  return <HomeView categories={categories} />
}
