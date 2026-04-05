import { SEO } from "@/lib/seo"
import { HomeView } from "@/components/views/HomeView"
import { getCategoriesAction } from "@/features/categorias/actions"

export const metadata = SEO.home

export default async function HomePage() {
  const categories = await getCategoriesAction()
  return <HomeView categories={categories} />
}
