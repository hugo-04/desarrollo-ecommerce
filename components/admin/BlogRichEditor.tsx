"use client"

import { useCallback, useRef } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Heading1, Heading2, Heading3, Undo2, Redo2,
  AlignLeft, AlignCenter, AlignRight, Minus, Quote, ImagePlus, Loader2,
} from "lucide-react"
import { useState } from "react"

interface BlogRichEditorProps {
  name: string
  defaultValue?: string
  placeholder?: string
  minHeight?: string
}

export function BlogRichEditor({
  name,
  defaultValue,
  placeholder,
  minHeight = "320px",
}: BlogRichEditorProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList:  { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Placeholder.configure({
        placeholder: placeholder ?? "Escribí el contenido del blog aquí…",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-slate-300 before:float-left before:h-0 before:pointer-events-none",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: {
        class: "blog-editor px-5 py-4 outline-none text-sm text-slate-700 leading-relaxed",
        style: `min-height: ${minHeight}`,
      },
    },
  })

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", "blog")
      const res  = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Error al subir")
      editor.chain().focus().setImage({ src: data.url, alt: file.name.replace(/\.[^/.]+$/, "") }).run()
    } catch {
      // silently ignore — user can retry
    } finally {
      setUploading(false)
    }
  }, [editor])

  if (!editor) return null

  const html  = editor.getHTML()
  const value = html === "<p></p>" ? "" : html

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 transition-all focus-within:border-[#334155]/40 focus-within:ring-2 focus-within:ring-[#334155]/15">
      <input type="hidden" name={name} value={value} />

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50/80 px-1.5 py-1.5">

        {/* Headings */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive("heading", { level: 1 })}
            title="Título H1"
          >
            <Heading1 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Subtítulo H2"
          >
            <Heading2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Subtítulo H3"
          >
            <Heading3 className="h-3.5 w-3.5" />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        {/* Texto */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Negrita"
          >
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Cursiva"
          >
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Subrayado"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        {/* Listas */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Lista con viñetas"
          >
            <List className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Lista numerada"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        {/* Bloques */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Cita"
          >
            <Quote className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Línea separadora"
          >
            <Minus className="h-3.5 w-3.5" />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        {/* Alineación */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Alinear izquierda"
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Centrar"
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Alinear derecha"
          >
            <AlignRight className="h-3.5 w-3.5" />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        {/* Imagen inline */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Insertar imagen"
          >
            {uploading
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <ImagePlus className="h-3.5 w-3.5" />
            }
          </ToolbarButton>
        </ToolbarGroup>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) { handleImageUpload(file); e.target.value = "" }
          }}
        />

        <Divider />

        {/* Deshacer / Rehacer */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Deshacer"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rehacer"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </ToolbarButton>
        </ToolbarGroup>
      </div>

      <EditorContent editor={editor} />

      {/* Estilos para el contenido del editor */}
      <style>{`
        .blog-editor h1 { font-size: 1.5rem; font-weight: 700; margin: 1rem 0 0.5rem; color: #1e293b; }
        .blog-editor h2 { font-size: 1.2rem; font-weight: 700; margin: 0.875rem 0 0.4rem; color: #1e293b; }
        .blog-editor h3 { font-size: 1rem; font-weight: 600; margin: 0.75rem 0 0.3rem; color: #334155; }
        .blog-editor p  { margin: 0.5rem 0; }
        .blog-editor ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .blog-editor ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .blog-editor blockquote { border-left: 3px solid #FF6B35; padding-left: 1rem; color: #64748b; font-style: italic; margin: 0.75rem 0; }
        .blog-editor hr { border: none; border-top: 1px solid #e2e8f0; margin: 1rem 0; }
        .blog-editor img { max-width: 100%; border-radius: 8px; margin: 0.75rem 0; }
        .blog-editor strong { font-weight: 700; }
        .blog-editor em { font-style: italic; }
        .blog-editor u  { text-decoration: underline; }
      `}</style>
    </div>
  )
}

function ToolbarButton({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition-all
        ${active ? "bg-[#334155]/10 text-[#334155] shadow-sm" : "hover:bg-white hover:text-slate-700 hover:shadow-sm"}
        ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-slate-200" />
}
