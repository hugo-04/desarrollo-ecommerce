import Link from "next/link"
import { IconChevronRight } from "@/components/icons"

const sections = [
  {
    title: "1. Aceptación de los Términos",
    content: "Al acceder y utilizar el sitio web de Electro Thina, usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguno de estos términos, le recomendamos no utilizar nuestros servicios."
  },
  {
    title: "2. Información y Productos",
    content: "La información, descripciones, especificaciones tecnicas e imágenes de productos publicados en este sitio son proporcionados con fines informativos. Nos reservamos el derecho de modificar, actualizar o descontinuar productos sin previo aviso. Las fichas tecnicas y certificaciones están sujetas a disponibilidad."
  },
  {
    title: "3. Cotizaciones y Precios",
    content: "Los precios publicados en este sitio son referenciales y están sujetos a cambios sin previo aviso. Toda cotización formal debe ser solicitada directamente a través de nuestros canales oficiales (formulario de contacto, correo electrónico o WhatsApp). La cotización tiene una vigencia indicada en el documento correspondiente."
  },
  {
    title: "4. Condiciones de Venta",
    content: "Las ventas están sujetas a la disponibilidad de stock, verificación de datos del cliente y aprobación interna. Electro Thina se reserva el derecho de aceptar o rechazar pedidos. Los plazos de entrega son referenciales y pueden variar según disponibilidad logística y ubicación del cliente."
  },
  {
    title: "5. Garantías",
    content: "Los productos comercializados por Electro Thina cuentan con la garantía del fabricante según cada caso. Las reclamaciones de garantía deben presentarse dentro del plazo establecido, acompañadas de la factura de compra y descripción del defecto. Electro Thina actuará como intermediario con el fabricante cuando corresponda."
  },
  {
    title: "6. Uso del Sitio Web",
    content: "Queda prohibido el uso de este sitio web para fines ilegales, fraudulentos o que puedan causar daño a Electro Thina o a terceros. No está permitido reproducir, copiar o redistribuir el contenido de este sitio sin autorización expresa por escrito."
  },
  {
    title: "7. Privacidad y Datos",
    content: "Los datos personales que nos proporcione serán tratados de forma confidencial y utilizados únicamente para gestionar su solicitud de cotización, pedido o contacto. No compartimos su información con terceros sin su consentimiento, salvo obligación legal. Puede solicitar la eliminación de sus datos en cualquier momento."
  },
  {
    title: "8. Propiedad Intelectual",
    content: "Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseño) son propiedad de Electro Thina o de sus respectivos titulares y están protegidos por la legislación peruana e internacional de propiedad intelectual."
  },
  {
    title: "9. Limitación de Responsabilidad",
    content: "Electro Thina no se responsabiliza por daños indirectos, pérdidas de datos o interrupciones del servicio derivados del uso de este sitio. Tampoco somos responsables por errores tipográficos en precios o especificaciones, los cuales serán corregidos una vez detectados."
  },
  {
    title: "10. Legislación Aplicable",
    content: "Estos Términos y Condiciones se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a los tribunales competentes de la ciudad de Lima, renunciando las partes a cualquier otro fuero que pudiera corresponder."
  },
]

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
        {/* Title */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Legal</span>
          </div>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-slate-500">
            Última actualización: enero de 2026 · Electro Thina S.A.C. — Lima, Perú
          </p>
        </div>

        {/* Intro */}
        <div className="mb-8 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6">
          <p className="text-sm leading-relaxed text-slate-600">
            Estos Términos y Condiciones regulan el uso del sitio web y los servicios comerciales de <strong className="text-[#121A47]">Electro Thina S.A.C.</strong>, empresa distribuidora de materiales eléctricos para alta y media tension. Le recomendamos leerlos detenidamente antes de realizar cualquier solicitud o transacción.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h2 className="mb-3 text-base font-bold text-[#121A47]">{section.title}</h2>
              <p className="text-sm leading-[1.85] text-slate-600">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Footer legal */}
        <div className="mt-10 rounded-2xl bg-[#121A47] p-7 text-center">
          <p className="mb-2 text-sm font-semibold text-white">¿Tienes preguntas sobre estos términos?</p>
          <p className="mb-5 text-xs text-slate-400">Contáctanos directamente y te responderemos a la brevedad.</p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-700"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  )
}
