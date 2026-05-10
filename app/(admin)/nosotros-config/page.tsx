import { AdminNosotrosView } from "@/features/nosotros/components/AdminNosotrosView"

export default function AdminNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-[#1B2B4B]">Nosotros</h1>
        <p className="mt-1 text-sm text-slate-500">
          Edita todo el contenido de la página &quot;Nosotros&quot;. Los cambios se reflejan de inmediato en el sitio público.
        </p>
      </div>
      <AdminNosotrosView />
    </div>
  )
}
