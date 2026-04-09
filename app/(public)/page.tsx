import { SEO } from "@/lib/seo"
import { HomeView } from "@/components/views/HomeView"
import { getFeaturedCategoriesAction } from "@/features/categorias/actions"

export const dynamic = "force-dynamic"
export const metadata = SEO.home

export default async function HomePage() {
  const categories = await getFeaturedCategoriesAction()
  return <HomeView categories={categories} />
}
