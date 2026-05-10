import Link from "next/link"
import type { BlogPost } from "@/features/blogs/types"
import { ArrowRight } from "lucide-react"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-200"
    >
      {/* Imagen de portada */}
      <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: "16/9" }}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1B2B4B]/10 to-[#FF6B35]/10">
            <span className="text-4xl font-black text-[#1B2B4B]/20">
              {post.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge de categoría sobre la imagen */}
        {post.tag && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
            <span className="rounded-sm bg-[#FF6B35] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
              {post.tag}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-base font-bold leading-snug text-slate-800 line-clamp-3 group-hover:text-[#1B2B4B] transition-colors">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-sm leading-relaxed text-slate-500 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-1 text-xs font-semibold text-[#FF6B35] mt-auto pt-2 border-t border-slate-50">
          Leer artículo
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
