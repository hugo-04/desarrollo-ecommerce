/**
 * /marcas — Listado público de todas las marcas.
 *
 * SSR del primer lote + infinite scroll en cliente vía MarcasListView.
 */

import type { Metadata }          from "next"
import Link                        from "next/link"
import { getBrandsPagedAction }    from "@/features/marcas/actions"
import { MarcasListView }          from "@/features/marcas/components/MarcasListView"
import { SITE_URL, SITE_NAME, buildBrandsListSchema } from "@/lib/seo"
import { IconChevronRight }        from "@/components/icons"
import { PageViewTracker }         from "@/components/analytics/PageViewTracker"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title:       `Marcas de Insumos Industriales y Mineros | ${SITE_NAME}`,
  description: "Explora todas las marcas líderes de insumos industriales y mineros disponibles en Insumind: SKF, Parker, Gates, Timken, Donaldson, Schneider Electric y más. Stock permanente en Lima, Perú.",
  alternates:  { canonical: "/marcas" },
  openGraph: {
    type:        "website",
    url:         `${SITE_URL}/marcas`,
    title:       `Marcas — Insumos Industriales y Mineros | ${SITE_NAME}`,
    description: "Catálogo de marcas líderes industriales con stock en Lima: SKF, Parker, Gates, Timken, Donaldson y más.",
    siteName:    SITE_NAME,
    locale:      "es_PE",
  },
  twitter: {
    card:        "summary_large_image",
    title:       `Marcas — Insumos Industriales | ${SITE_NAME}`,
    description: "Catálogo de marcas líderes industriales con stock permanente en Lima, Perú.",
  },
}

export default async function MarcasPage() {
  const { data: initialBrands, total } = await getBrandsPagedAction({ page: 1, limit: 24 })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",  item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Marcas",  item: `${SITE_URL}/marcas` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBrandsListSchema()) }} />

      <PageViewTracker path="/marcas" />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">Marcas</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-linear-to-br from-[#003D73] via-[#002d5f] to-[#001a3d] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
            Marcas — {total} disponibles
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Marcas de Insumos Industriales
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Distribuidores autorizados de las marcas líderes en insumos industriales y mineros. Stock permanente en Lima.
          </p>
        </div>
      </section>

      {/* Listado con búsqueda e infinite scroll */}
      <section className="bg-slate-50 min-h-[60vh]">
        <MarcasListView initialBrands={initialBrands} initialTotal={total} />
      </section>
    </>
  )
}
