import { Suspense } from "react"
import { SEO } from "@/lib/seo"
import { CatalogoView } from "@/components/views/CatalogoView"

export const metadata = SEO.catalogo

interface PageProps {
  searchParams: Promise<{ categoria?: string; q?: string; bestSellers?: string }>
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CatalogoView
        initialCategory={params.categoria}
        initialQuery={params.q}
        initialBestSellers={params.bestSellers === "true"}
      />
    </Suspense>
  )
}
