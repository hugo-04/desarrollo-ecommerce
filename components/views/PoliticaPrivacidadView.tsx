import Link from "next/link"

/**
 * PoliticaPrivacidadView — Contenido de la política de privacidad.
 * Server Component. Extraído de politica-privacidad/page.tsx (SRP).
 */

const SECTIONS = [
  { title: "1. Responsable del Tratamiento", content: ["Razón Social: Electro Thina S.A.C.", "RUC: 20609410711", "Domicilio: Av. Guillermo Dansey N° 481 - Int. 143 - C.C. Loreto, Lima, Perú", "Correo electrónico: electrothina522@gmail.com", "Teléfono: +51 995 318 976"] },
  { title: "2. Datos Personales que Recopilamos", content: ["Información de identificación: nombre completo, documento de identidad (DNI / RUC).", "Información de contacto: correo electrónico, número de teléfono, número de WhatsApp.", "Información empresarial: nombre o razón social de la empresa, cargo del contacto.", "Información técnica de navegación: dirección IP, tipo de navegador, páginas visitadas.", "Información de cotizaciones y pedidos: productos consultados, historial de compras."] },
  { title: "3. Finalidad del Tratamiento", content: ["Atender solicitudes de cotización, pedidos y consultas técnicas.", "Enviar información comercial y técnica (con su consentimiento previo).", "Gestionar la relación contractual y administrativa.", "Cumplir con obligaciones legales, tributarias y contables.", "Mejorar la experiencia de navegación en nuestro sitio web."] },
  { title: "4. Base Legal del Tratamiento", content: ["Consentimiento del titular: cuando usted llena nuestros formularios o inicia un chat por WhatsApp.", "Ejecución de un contrato: para gestionar pedidos y relaciones comerciales.", "Obligación legal: para cumplir con normativas tributarias y contables peruanas.", "Interés legítimo: para mejorar nuestros servicios y prevenir fraudes."] },
  { title: "5. Destinatarios de los Datos", content: ["No compartimos, vendemos ni cedemos sus datos personales a terceros con fines comerciales.", "Podremos compartir información con proveedores de servicios tecnológicos o autoridades públicas cuando sea requerido por ley."] },
  { title: "6. Uso de WhatsApp", content: ["Los botones de cotización en nuestro sitio web abren una conversación de WhatsApp Business. El número del usuario no se registra en bases de datos propias.", "Las conversaciones están sujetas a la Política de Privacidad de Meta (WhatsApp)."] },
  { title: "7. Transferencias Internacionales", content: ["Nuestro sitio puede utilizar servicios de terceros cuyos servidores se ubican fuera del Perú. Adoptamos medidas contractuales para garantizar un nivel de protección equivalente al exigido por la ley peruana."] },
  { title: "8. Derechos del Titular", content: ["Conforme a la Ley N° 29733: Acceso, Rectificación, Cancelación y Oposición.", "Para ejercer sus derechos, escriba a electrothina522@gmail.com indicando 'Derechos ARCO'.", "Responderemos en un plazo máximo de 20 días hábiles."] },
  { title: "9. Seguridad de los Datos", content: ["Implementamos medidas técnicas y organizativas (HTTPS, acceso restringido) para proteger sus datos."] },
  { title: "10. Conservación de Datos", content: ["Conservamos sus datos durante el tiempo necesario para las finalidades recopiladas. Los datos de clientes se conservan por un mínimo de 5 años por obligaciones tributarias."] },
  { title: "11. Cookies", content: ["Utilizamos cookies técnicas necesarias. No usamos cookies de seguimiento publicitario de terceros."] },
  { title: "12. Cambios en esta Política", content: ["Nos reservamos el derecho de actualizar esta Política. Cualquier cambio será comunicado en esta página con la fecha de actualización."] },
  { title: "13. Contacto y Autoridad de Control", content: ["Para consultas: electrothina522@gmail.com o WhatsApp +51 981 375 196.", "Si sus derechos no han sido atendidos, puede acudir al MINJUS — Autoridad Nacional de Protección de Datos Personales."] },
]

export function PoliticaPrivacidadView() {
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

      {/* Contenido */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed">
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-800">
                Electro Thina S.A.C. se compromete a proteger la privacidad y los datos personales de sus clientes, proveedores y usuarios, en conformidad con la Ley N° 29733 — Ley de Protección de Datos Personales del Perú.
              </p>
            </div>

            {SECTIONS.map((section, i) => (
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
              <a href="mailto:electrothina522@gmail.com" className="font-semibold text-primary hover:underline">electrothina522@gmail.com</a>
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
