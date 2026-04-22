import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getCategoryBySlugAction } from "@/features/categorias/actions"
import { getCatalogAction } from "@/features/productos/actions"
import { generateCategoryMeta, buildCategorySchema, SITE_URL } from "@/lib/seo"
import { ProductCard } from "@/components/product/ProductCard"
import { IconChevronRight, IconArrowRight } from "@/components/icons"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlugAction(slug)
  if (!category) return {}
  return generateCategoryMeta(category)
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params

  const category = await getCategoryBySlugAction(slug)
  if (!category) notFound()

  const { data: products } = await getCatalogAction({
    categories: [category.name],
    page: 1,
    limit: 12,
  })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/categoria/${category.slug}` },
    ],
  }

  const categorySchema = buildCategorySchema(category, products.map((p) => p.name))

  // FAQPage schema — genera rich snippets de preguntas en Google
  const faqSchema = category.subcategories.length >= 2 ? {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:    `¿Qué tipos de ${category.name} tienen disponibles?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:    `En Electro Thina S.A.C. distribuimos: ${category.subcategories.join(", ")}. Todos con certificaciones IEC, ANSI y NTP. Stock permanente en Lima, Perú.`,
        },
      },
      {
        "@type": "Question",
        name:    `¿Los ${category.name} cuentan con certificación IEC y ANSI?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:    `Sí. Todos los ${category.name} que distribuimos cumplen las normas IEC, ANSI y NTP vigentes para instalaciones eléctricas de alta y media tensión en Perú. Fabricamos bajo estándares internacionales de calidad y seguridad eléctrica.`,
        },
      },
      {
        "@type": "Question",
        name:    `¿Hacen despacho de ${category.name} a provincias?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:    `Sí. Realizamos despachos de ${category.name} en Lima en 24 a 48 horas. También coordinamos envíos a provincias de todo el Perú a través de agencias de transporte. Solicite cotización vía nuestra web o por WhatsApp al +51 981 375 196.`,
        },
      },
    ],
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/catalogo" className="hover:text-primary">Catálogo</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero de categoría */}
      <section className="bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#0B1035] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Categoría — {category.count} productos
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {category.description}
            </p>
          )}

          {/* Subcategorías — visibles en HTML para Google */}
          {category.subcategories.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Tipos de productos
              </p>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((sub, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de productos — server-rendered para Googlebot */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4">

          {products.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#121A47]">
                    Productos de {category.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Mostrando {products.length} de {category.count} productos
                  </p>
                </div>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#121A47] transition-all hover:border-primary/30 hover:text-primary sm:flex"
                >
                  Ver todos <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {category.count > 12 && (
                <div className="mt-10 text-center">
                  <Link
                    href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#121A47] to-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
                  >
                    Ver los {category.count} productos de {category.name}
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-slate-500">
              <p className="text-lg font-semibold">No hay productos disponibles en esta categoría aún.</p>
              <Link href="/catalogo" className="mt-4 inline-block text-primary hover:underline">
                Ver catálogo completo →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ — visible para Google y usuarios, genera rich snippet */}
      {category.subcategories.length >= 2 && (
        <section className="bg-white py-12 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-lg font-extrabold text-[#121A47]">
              Preguntas frecuentes sobre {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">
                  ¿Qué tipos de {category.name} tienen?
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Distribuimos: {category.subcategories.slice(0, 4).join(", ")}
                  {category.subcategories.length > 4 && ` y ${category.subcategories.length - 4} variantes más`}.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">
                  ¿Cuentan con certificación IEC y ANSI?
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Sí. Todos los {category.name} cumplen las normas IEC, ANSI y NTP para instalaciones AT/MT en Perú.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">
                  ¿Despachan a provincias?
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Sí. Despacho en Lima en 24–48 h. Enviamos a provincias de todo el Perú. Cotice por web o WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección de otras categorías (internal linking) */}
      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
            También te puede interesar
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/catalogo"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-primary/30 hover:bg-white hover:text-primary"
            >
              Ver todo el catálogo
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-100"
            >
              Cotizar ahora →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
