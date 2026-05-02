import Link from "next/link"
import { IconChevronRight } from "@/components/icons"

/**
 * TerminosView — Contenido de Términos y Condiciones.
 * Server Component. Extraído de terminos/page.tsx (SRP).
 */

const SECTIONS = [
  { title: "1. Aceptación de los Términos", content: "Al acceder y utilizar el sitio web de Lorem Ipsum, usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguno de estos términos, le recomendamos no utilizar nuestros servicios." },
  { title: "2. Información y Productos", content: "La información, descripciones, especificaciones técnicas e imágenes de productos publicados en este sitio son proporcionados con fines informativos. Nos reservamos el derecho de modificar, actualizar o descontinuar productos sin previo aviso." },
  { title: "3. Cotizaciones y Precios", content: "Los precios publicados son referenciales y están sujetos a cambios sin previo aviso. Toda cotización formal debe solicitarse directamente a través de nuestros canales oficiales." },
  { title: "4. Condiciones de Venta", content: "Las ventas están sujetas a disponibilidad de stock, verificación de datos del cliente y aprobación interna. Los plazos de entrega son referenciales y pueden variar según disponibilidad logística." },
  { title: "5. Garantías", content: "Los productos cuentan con la garantía del fabricante según cada caso. Las reclamaciones deben presentarse dentro del plazo establecido, acompañadas de la factura de compra." },
  { title: "6. Uso del Sitio Web", content: "Queda prohibido el uso de este sitio para fines ilegales o fraudulentos. No está permitido reproducir, copiar o redistribuir el contenido sin autorización expresa por escrito." },
  { title: "7. Privacidad y Datos", content: "Los datos personales que nos proporcione serán tratados de forma confidencial y utilizados únicamente para gestionar su solicitud. No compartimos su información con terceros sin su consentimiento, salvo obligación legal." },
  { title: "8. Propiedad Intelectual", content: "Todos los contenidos de este sitio (textos, imágenes, logotipos, diseño) son propiedad de Lorem Ipsum S.A.C. o de sus respectivos titulares y están protegidos por la normativa vigente." },
  { title: "9. Limitación de Responsabilidad", content: "Lorem Ipsum S.A.C. no se responsabiliza por daños indirectos, pérdidas de datos o interrupciones del servicio derivados del uso de este sitio." },
  { title: "10. Legislación Aplicable", content: "Estos Términos y Condiciones se rigen por la normativa aplicable. Cualquier controversia será sometida a los tribunales competentes correspondientes." },
]

export function TerminosView() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-slate-500 hover:text-primary">Inicio</Link>
            <IconChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-slate-800">Términos y Condiciones</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14">
        {/* Título */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-slate-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-600">Legal</span>
          </div>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#1e293b] lg:text-4xl">Términos y Condiciones</h1>
          <p className="text-sm text-slate-500">Lorem ipsum: enero de 2026 · Lorem Ipsum S.A.C.</p>
        </div>

        {/* Intro */}
        <div className="mb-8 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6">
          <p className="text-sm leading-relaxed text-slate-600">
            Estos Términos y Condiciones regulan el uso del sitio web y los servicios comerciales de{" "}
            <strong className="text-[#1e293b]">Lorem Ipsum S.A.C.</strong>, lorem ipsum dolor sit amet, consectetur adipiscing elit ut labore et dolore magna aliqua lorem ipsum.
          </p>
        </div>

        {/* Secciones */}
        <div className="space-y-6">
          {SECTIONS.map((section, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="mb-3 text-base font-bold text-[#1e293b]">{section.title}</h2>
              <p className="text-sm leading-[1.85] text-slate-600">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Footer legal */}
        <div className="mt-10 rounded-2xl -[#003D73] p-7 text-center">
          <p className="mb-2 text-sm font-semibold text-white">¿Tienes preguntas sobre estos términos?</p>
          <p className="mb-5 text-xs text-slate-400">Contáctanos directamente y te responderemos a la brevedad.</p>
          <Link href="/contacto" className="inline-flex items-center gap-2 rounded-xl bg-slate-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-700">
            Contactar
          </Link>
        </div>
      </div>
    </div>
  )
}
