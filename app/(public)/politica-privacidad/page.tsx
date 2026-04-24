import { SEO } from "@/lib/seo"
import { PoliticaPrivacidadView } from "@/components/views/PoliticaPrivacidadView"

/**
 * /politica-privacidad — Política de privacidad.
 * Thin shell: solo metadatos + renderiza PoliticaPrivacidadView.
 */

export const metadata = SEO.politicaPrivacidad

export default function PoliticaPrivacidadPage() {
  return <PoliticaPrivacidadView />
}
