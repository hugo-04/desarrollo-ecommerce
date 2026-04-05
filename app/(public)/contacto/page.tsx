import { SEO } from "@/lib/seo"
import { ContactoView } from "@/components/views/ContactoView"

export const metadata = SEO.contacto

export default function ContactoPage() {
  return <ContactoView />
}
