"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { BlogForm } from "@/components/admin/BlogForm"
import { createBlogPostAction } from "@/features/blogs/actions"
import { blogKeys } from "@/features/blogs/hooks"
import type { CreateBlogPostDTO, UpdateBlogPostDTO } from "@/features/blogs/types"

export default function NuevoBlogPage() {
  const router      = useRouter()
  const queryClient = useQueryClient()

  async function handleSave(data: CreateBlogPostDTO | UpdateBlogPostDTO) {
    const result = await createBlogPostAction(data as CreateBlogPostDTO)
    await queryClient.invalidateQueries({ queryKey: blogKeys.all() })
    return result
  }

  return (
    <div className="mx-auto max-w-5xl px-2 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Nuevo artículo</h1>
        <p className="text-sm text-slate-500 mt-1">Completá el formulario para crear un nuevo artículo del blog.</p>
      </div>
      <BlogForm onSave={handleSave} backHref="/blogs" />
    </div>
  )
}
