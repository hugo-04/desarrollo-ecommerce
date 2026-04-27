import Link from "next/link"
import { ProductCard }                    from "@/components/product/ProductCard"
import { IconChevronRight, IconArrowRight } from "@/components/icons"
import type { CategoryDTO }               from "@/features/categorias/types"
import type { Product }                   from "@/lib/types"

/**
 * CategoriaView — Vista completa de la página de categoría pública.
 *
 * Server Component: recibe `category` y `products` ya obtenidos por page.tsx.
 * El page conserva generateMetadata y los schemas JSON-LD (responsabilidad SEO).
 * Esta vista solo se ocupa del renderizado visual (SRP).
 */

interface CategoriaViewProps {
  category: CategoryDTO
  products: Product[]
}

export function CategoriaView({ category, products }: CategoriaViewProps) {
  return (
    <>
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#07091E] via-[#1e293b] to-[#0f172a] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500" />
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

          {/* Subcategorías — visibles para Google */}
          {category.subcategories.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Tipos de productos
              </p>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((sub, i) => (
                  <span key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
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
                  <h2 className="text-xl font-extrabold text-[#1e293b]">Productos de {category.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">Mostrando {products.length} de {category.count} productos</p>
                </div>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1e293b] transition-all hover:border-primary/30 hover:text-primary sm:flex"
                >
                  Ver todos <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* CTA si hay más productos que los mostrados */}
              {category.count > 12 && (
                <div className="mt-10 text-center">
                  <Link
                    href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1e293b] to-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
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

      {/* FAQ — rich snippet para Google */}
      {category.subcategories.length >= 2 && (
        <section className="border-t border-slate-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-lg font-extrabold text-[#1e293b]">
              Preguntas frecuentes sobre {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">¿Qué tipos de {category.name} tienen?</h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Distribuimos: {category.subcategories.slice(0, 4).join(", ")}
                  {category.subcategories.length > 4 && ` y ${category.subcategories.length - 4} variantes más`}.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">¿Lorem ipsum dolor sit amet consectetur?</h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-sm font-bold text-slate-800">¿Lorem ipsum adipiscing elit sed eiusmod?</h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor. Lorem ipsum quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Internal linking — otras categorías */}
      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
            También te puede interesar
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/catalogo"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-primary/30 hover:bg-white hover:text-primary">
              Ver todo el catálogo
            </Link>
            <Link href="/contacto"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100">
              Cotizar ahora →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
