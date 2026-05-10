import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPostBySlugAction, getPublishedBlogPostsAction } from "@/features/blogs/actions"
import { SITE_URL, SITE_NAME } from "@/lib/seo"
import { ArrowLeft, ArrowRight, Tag } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlugAction(slug)
  if (!post) return { title: "Artículo no encontrado" }

  const title       = post.metaTitle  || post.title
  const description = post.metaDesc   || post.excerpt || post.title
  const imageUrl    = post.coverImage || `${SITE_URL}/logo/logotipo.png`

  return {
    title:       `${title} | ${SITE_NAME}`,
    description,
    keywords:    post.keywords?.length ? post.keywords : undefined,
    alternates:  { canonical: `/blog/${post.slug}` },
    openGraph: {
      type:        "article",
      url:         `${SITE_URL}/blog/${post.slug}`,
      title:       `${title} | ${SITE_NAME}`,
      description,
      siteName:    SITE_NAME,
      locale:      "es_PE",
      images:      [{ url: imageUrl, width: 1200, height: 630, alt: post.coverAlt || post.title }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${title} | ${SITE_NAME}`,
      description,
      images:      [imageUrl],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPostsAction()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlugAction(slug)
  if (!post || !post.published) notFound()

  const jsonLd = {
    "@context":    "https://schema.org",
    "@type":       "Article",
    headline:      post.title,
    description:   post.excerpt || post.title,
    image:         post.coverImage || undefined,
    datePublished: post.createdAt,
    dateModified:  post.updatedAt,
    author:        { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name:    SITE_NAME,
      logo:    { "@type": "ImageObject", url: `${SITE_URL}/logo/logotipo.png` },
    },
    url:               `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage:  { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    ...(post.keywords?.length && { keywords: post.keywords.join(", ") }),
  }

  const catalogoHref = post.tagCategory
    ? `/catalogo?categoria=${encodeURIComponent(post.tagCategory)}`
    : "/catalogo"

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-white">

        {/* ── Imagen de portada hero ───────────────────────────────────────── */}
        {post.coverImage && (
          <div className="relative w-full overflow-hidden bg-[#1B2B4B]" style={{ maxHeight: "480px" }}>
            <img
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              className="w-full object-cover"
              style={{ maxHeight: "480px", objectFit: "cover", width: "100%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B4B]/70 via-transparent to-transparent" />

            {/* Badge sobre la imagen de portada */}
            {post.tag && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <span className="inline-block rounded-sm bg-[#FF6B35] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-md">
                  {post.tag}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Contenido ───────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 py-10">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al blog
            </Link>
            {post.tag && !post.coverImage && (
              <>
                <span className="text-slate-200">·</span>
                <span className="inline-block rounded-sm bg-[#FF6B35] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  {post.tag}
                </span>
              </>
            )}
          </nav>

          {/* Título principal */}
          <h1 className="text-2xl md:text-4xl font-black text-[#1B2B4B] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Separador naranja */}
          <div className="h-1 w-16 rounded-full bg-[#FF6B35] mb-8" />

          {/* Imagen 2 — aparece antes del texto principal */}
          {post.image2 && (
            <div className="mb-8">
              <img
                src={post.image2}
                alt={post.image2Alt || post.title}
                className="w-full rounded-xl object-cover shadow-md"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Cuerpo del artículo */}
          {post.content ? (
            <article
              className="blog-content prose-custom"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-slate-400 italic">Este artículo no tiene contenido aún.</p>
          )}

          {/* Imagen 3 — aparece al final del artículo */}
          {post.image3 && (
            <div className="mt-10">
              <img
                src={post.image3}
                alt={post.image3Alt || post.title}
                className="w-full rounded-xl object-cover shadow-md"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* ── CTA: botón a productos de esta categoría ───────────────────── */}
          {post.tagCategory && (
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#1B2B4B] to-[#003D73] px-6 py-8 text-center shadow-lg">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
                <Tag className="h-3 w-3" />
                {post.tag || post.tagCategory}
              </div>
              <h3 className="mt-3 text-lg font-black text-white">
                ¿Buscás productos de {post.tagCategory}?
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Tenemos una amplia variedad de productos originales disponibles para entrega inmediata.
              </p>
              <Link
                href={catalogoHref}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#FF6B35]/90 hover:scale-[1.02]"
              >
                Ver productos de {post.tagCategory}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Footer del artículo */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B35] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Más artículos
            </Link>
            <Link
              href="/contacto"
              className="rounded-xl bg-[#1B2B4B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1B2B4B]/90"
            >
              Cotizar insumo →
            </Link>
          </div>
        </div>
      </main>

      {/* Estilos del contenido del blog */}
      <style>{`
        .blog-content { color: #334155; line-height: 1.8; }
        .blog-content h1 { font-size: 1.75rem; font-weight: 800; color: #1B2B4B; margin: 2rem 0 1rem; }
        .blog-content h2 { font-size: 1.35rem; font-weight: 700; color: #1B2B4B; margin: 1.75rem 0 0.75rem; border-left: 4px solid #FF6B35; padding-left: 0.875rem; }
        .blog-content h3 { font-size: 1.1rem; font-weight: 600; color: #334155; margin: 1.5rem 0 0.5rem; }
        .blog-content p  { margin: 0.875rem 0; }
        .blog-content ul { list-style: none; padding-left: 0; margin: 0.875rem 0; }
        .blog-content ul li { position: relative; padding-left: 1.25rem; margin-bottom: 0.4rem; }
        .blog-content ul li::before { content: ""; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background: #FF6B35; }
        .blog-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.875rem 0; }
        .blog-content ol li { margin-bottom: 0.4rem; }
        .blog-content blockquote { border-left: 4px solid #FF6B35; padding: 0.75rem 1.25rem; background: #fff7f4; color: #64748b; font-style: italic; margin: 1.5rem 0; border-radius: 0 8px 8px 0; }
        .blog-content hr { border: none; border-top: 2px solid #f1f5f9; margin: 2rem 0; }
        .blog-content img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .blog-content strong { font-weight: 700; color: #1B2B4B; }
        .blog-content em { font-style: italic; }
        .blog-content u  { text-decoration: underline; text-decoration-color: #FF6B35; }
        .blog-content code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.85em; font-family: monospace; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .blog-content th { background: #1B2B4B; color: white; padding: 0.625rem 1rem; text-align: left; font-size: 0.8rem; }
        .blog-content td { padding: 0.5rem 1rem; border-bottom: 1px solid #f1f5f9; font-size: 0.875rem; }
        .blog-content tr:hover td { background: #f8fafc; }
      `}</style>
    </>
  )
}
