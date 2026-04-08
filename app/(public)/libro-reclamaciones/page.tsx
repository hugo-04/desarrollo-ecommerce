import { SEO } from "@/lib/seo"
import { LibroReclamacionesView } from "@/components/views/LibroReclamacionesView"

export const metadata = SEO.libroReclamaciones

export default function LibroReclamacionesPage() {
  return <LibroReclamacionesView />
}
