import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | Electro Thina",
  description: "Política de privacidad y tratamiento de datos personales de Electro Thina S.A.C.",
}

export default function PoliticaPrivacidadPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#121A47] via-primary to-[#0B1035] py-16">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-red-400">Legal</span>
          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">Política de Privacidad</h1>
          <p className="text-sm text-slate-400">Última actualización: Enero 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed">

            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-800">
                Electro Thina S.A.C. (en adelante "Electro Thina", "nosotros" o "la empresa") se compromete a proteger la privacidad y los datos personales de sus clientes, proveedores y usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal, en conformidad con la Ley N° 29733 — Ley de Protección de Datos Personales del Perú y su Reglamento (D.S. N° 003-2013-JUS).
              </p>
            </div>

            {[
              {
                title: "1. Responsable del Tratamiento",
                content: [
                  "Razón Social: Electro Thina S.A.C.",
                  "RUC: [Número de RUC]",
                  "Domicilio: Av. Industrial 1234, Lima, Perú",
                  "Correo electrónico: ventas@electrothina.com",
                  "Teléfono: (01) 234-5678",
                ],
              },
              {
                title: "2. Datos Personales que Recopilamos",
                content: [
                  "Información de identificación: nombre completo, documento de identidad (DNI / RUC).",
                  "Información de contacto: correo electrónico, número de teléfono, número de WhatsApp (solo para comunicaciones iniciadas por el usuario), dirección postal.",
                  "Información empresarial: nombre o razón social de la empresa, cargo del contacto.",
                  "Información técnica de navegación: dirección IP, tipo de navegador, páginas visitadas, tiempo de sesión (recopilado automáticamente por cookies técnicas).",
                  "Información de cotizaciones y pedidos: productos consultados, especificaciones técnicas solicitadas, historial de compras.",
                ],
              },
              {
                title: "3. Finalidad del Tratamiento",
                content: [
                  "Atender solicitudes de cotización, pedidos y consultas técnicas.",
                  "Enviar información comercial y técnica relacionada con nuestros productos y servicios (con su consentimiento previo).",
                  "Gestionar la relación contractual y administrativa con clientes y proveedores.",
                  "Cumplir con obligaciones legales, tributarias y contables.",
                  "Mejorar la experiencia de navegación en nuestro sitio web.",
                  "Enviar comunicaciones por WhatsApp únicamente cuando el usuario inicia el contacto a través de nuestros botones de cotización.",
                ],
              },
              {
                title: "4. Base Legal del Tratamiento",
                content: [
                  "Consentimiento del titular: cuando usted llena nuestros formularios o inicia un chat por WhatsApp.",
                  "Ejecución de un contrato: para gestionar pedidos y relaciones comerciales.",
                  "Obligación legal: para cumplir con normativas tributarias y contables peruanas.",
                  "Interés legítimo: para mejorar nuestros servicios y prevenir fraudes.",
                ],
              },
              {
                title: "5. Destinatarios de los Datos",
                content: [
                  "No compartimos, vendemos ni cedemos sus datos personales a terceros con fines comerciales.",
                  "Podremos compartir información con: (a) proveedores de servicios tecnológicos que nos asisten en la operación del sitio web, sujetos a acuerdos de confidencialidad; (b) autoridades públicas cuando sea requerido por ley.",
                ],
              },
              {
                title: "6. Uso de WhatsApp",
                content: [
                  "Los botones de cotización en nuestro sitio web abren una conversación de WhatsApp Business. El número de WhatsApp que utiliza el usuario para contactarnos no se registra en bases de datos propias ni se comparte con terceros.",
                  "Las conversaciones de WhatsApp están sujetas a la Política de Privacidad de Meta (WhatsApp). Le recomendamos revisarla en whatsapp.com/legal.",
                  "Nuestro número de WhatsApp de atención comercial (+51 981 375 196) es exclusivo para consultas de cotización y soporte técnico.",
                ],
              },
              {
                title: "7. Transferencias Internacionales",
                content: [
                  "Nuestro sitio web puede utilizar servicios de terceros (como herramientas de análisis web o plataformas de comunicación) cuyos servidores se ubican fuera del Perú. En estos casos, adoptamos las medidas contractuales adecuadas para garantizar un nivel de protección equivalente al exigido por la ley peruana.",
                ],
              },
              {
                title: "8. Derechos del Titular",
                content: [
                  "Conforme a la Ley N° 29733, usted tiene derecho a: (a) Acceso — conocer qué datos personales tratamos; (b) Rectificación — corregir datos inexactos o incompletos; (c) Cancelación — solicitar la eliminación de sus datos cuando ya no sean necesarios; (d) Oposición — oponerse al tratamiento de sus datos para finalidades de marketing.",
                  "Para ejercer sus derechos, puede escribirnos a: ventas@electrothina.com, indicando en el asunto 'Derechos ARCO' y adjuntando una copia de su documento de identidad.",
                  "Responderemos su solicitud en un plazo máximo de 20 días hábiles.",
                ],
              },
              {
                title: "9. Seguridad de los Datos",
                content: [
                  "Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos contra accesos no autorizados, pérdida, destrucción o alteración, incluyendo conexiones cifradas (HTTPS) y acceso restringido a datos sensibles.",
                ],
              },
              {
                title: "10. Conservación de Datos",
                content: [
                  "Conservamos sus datos personales durante el tiempo necesario para las finalidades para las que fueron recopilados, o mientras exista una relación contractual vigente. Los datos de clientes se conservan por un mínimo de 5 años por obligaciones tributarias.",
                ],
              },
              {
                title: "11. Cookies",
                content: [
                  "Nuestro sitio web utiliza cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de seguimiento publicitario de terceros. Puede configurar su navegador para rechazar cookies, aunque esto podría afectar algunas funcionalidades del sitio.",
                ],
              },
              {
                title: "12. Cambios en esta Política",
                content: [
                  "Nos reservamos el derecho de actualizar esta Política de Privacidad. Cualquier cambio relevante será comunicado en esta misma página con la fecha de actualización. Le recomendamos revisarla periódicamente.",
                ],
              },
              {
                title: "13. Contacto y Autoridad de Control",
                content: [
                  "Para consultas relacionadas con esta Política o el tratamiento de sus datos, puede contactarnos en: ventas@electrothina.com o llamar al (01) 234-5678.",
                  "Si considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos del Perú (MINJUS).",
                ],
              },
            ].map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="mb-3 text-base font-extrabold text-[#121A47]">{section.title}</h2>
                <ul className="space-y-2">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-xs text-slate-500">
              ¿Preguntas? Escríbenos a{" "}
              <a href="mailto:ventas@electrothina.com" className="font-semibold text-primary hover:underline">
                ventas@electrothina.com
              </a>
            </p>
            <Link href="/terminos" className="text-xs font-semibold text-primary hover:underline">
              Ver Términos y Condiciones →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
