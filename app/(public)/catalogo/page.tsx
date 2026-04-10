import { Suspense } from "react"
import type { Metadata } from "next"
import { SEO, generateCategoryMeta } from "@/lib/seo"
import { CatalogoView } from "@/components/views/CatalogoView"
import { getCategoriesAction } from "@/features/categorias/actions"
import { getBrandNamesAction } from "@/features/marcas/actions"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ categoria?: string; q?: string; bestSellers?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { categoria } = await searchParams
  if (!categoria) return SEO.catalogo

  const cats = await getCategoriesAction()
  const cat  = cats.find((c) => c.name === categoria)
  return cat ? generateCategoryMeta(cat) : SEO.catalogo
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams

  // Cargar filtros en el servidor — llegan con el HTML, sin espera cliente
  const [categories, brandNames] = await Promise.all([
    getCategoriesAction(),
    getBrandNamesAction(),
  ])

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CatalogoView
        initialCategory={params.categoria}
        initialQuery={params.q}
        initialBestSellers={params.bestSellers === "true"}
        initialCategories={categories}
        initialBrands={brandNames}
      />
    </Suspense>
  )
}
