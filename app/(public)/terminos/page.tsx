import { SEO } from "@/lib/seo"
import { TerminosView } from "@/components/views/TerminosView"

/**
 * /terminos — Términos y Condiciones.
 * Thin shell: solo metadatos + renderiza TerminosView.
 */

export const metadata = SEO.terminos

export default function TerminosPage() {
  return <TerminosView />
}
