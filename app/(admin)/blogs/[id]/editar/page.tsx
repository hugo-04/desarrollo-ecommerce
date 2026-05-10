"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { BlogForm } from "@/components/admin/BlogForm"
import { getBlogPostByIdAction, updateBlogPostAction } from "@/features/blogs/actions"
import { blogKeys, useDeleteBlogPost } from "@/features/blogs/hooks"
import type { BlogPost, UpdateBlogPostDTO } from "@/features/blogs/types"
import { Loader2 } from "lucide-react"

export default function EditarBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const postId  = Number(id)
  const router  = useRouter()
  const queryClient  = useQueryClient()
  const deletePost   = useDeleteBlogPost()

  const [post, setPost]       = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPostByIdAction(postId)
      .then((p) => {
        if (!p) { toast.error("Artículo no encontrado"); router.push("/blogs"); return }
        setPost(p)
      })
      .finally(() => setLoading(false))
  }, [postId, router])

  async function handleSave(data: UpdateBlogPostDTO) {
    const result = await updateBlogPostAction(postId, data)
    await queryClient.invalidateQueries({ queryKey: blogKeys.all() })
    return result
  }

  async function handleDelete() {
    await deletePost.mutateAsync(postId)
    toast.success(`"${post!.title}" eliminado correctamente`)
    router.push("/blogs")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="mx-auto max-w-5xl px-2 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Editar artículo</h1>
        <p className="text-sm text-slate-500 mt-1 line-clamp-1">{post.title}</p>
      </div>
      <BlogForm post={post} onSave={handleSave} onDelete={handleDelete} backHref="/blogs" />
    </div>
  )
}
