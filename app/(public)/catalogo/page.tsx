import { Suspense } from "react"
import { CatalogoView } from "@/components/views/CatalogoView"

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
