import type { Metadata } from "next"
import { getPublishedBlogPostsAction } from "@/features/blogs/actions"
import { BlogCard } from "@/components/blog/BlogCard"
import { SITE_URL, SITE_NAME } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title:       "Blog | INSUMIND — Artículos sobre Insumos Industriales y Eléctricos",
  description: "Artículos, guías y consejos sobre insumos industriales, cables eléctricos, equipos antiexplosión y más. Blog técnico de Insumind Perú.",
  alternates:  { canonical: "/blog" },
  openGraph: {
    type:        "website",
    url:         `${SITE_URL}/blog`,
    title:       `Blog Técnico | ${SITE_NAME}`,
    description: "Artículos y guías sobre insumos industriales, eléctricos y mineros en Perú.",
    siteName:    SITE_NAME,
    locale:      "es_PE",
  },
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPostsAction()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-[#1B2B4B] py-14 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[#FF6B35] text-sm font-bold uppercase tracking-widest mb-3">Blog Técnico</p>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Artículos y Guías<br />sobre Insumos Industriales
          </h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            Consejos, especificaciones técnicas y guías de selección para profesionales de la industria y minería en Perú.
          </p>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Próximamente — ¡Estamos preparando contenido para vos!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
