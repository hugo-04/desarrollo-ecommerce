/**
 * DATOS DE CONTACTO — fuente única de verdad
 * Edita este archivo para actualizar la información en todo el sitio.
 */

export const CONTACT = {
  /** Número WhatsApp principal (sin "+" ni espacios, con código de país Perú: 51) */
  whatsappNumber: "51981375196",

  /** Número secundario de contacto */
  phone2: "995318976",

  /** Números para mostrar en pantalla */
  phoneDisplay: "981 375 196",
  phone2Display: "995 318 976",

  /** Número primario en formato tel: */
  phoneTel: "tel:+51981375196",

  /** Correo electrónico principal */
  email: "electrothina522@gmail.com",

  /** Dirección física */
  address: "Av. Guillermo Dansey N° 481 - Int. 143 - C.C. Loreto, Lima",

  /** Horario de atención — fuente única; usado en TopBar, Footer y Contacto */
  hours: "L-V: 9am-6pm | Sáb: 9am-3pm",
} as const

// ─── URLs de WhatsApp prearmadas ──────────────────────────────────────────────

const base = `https://wa.me/${CONTACT.whatsappNumber}`

export const WA = {
  /** Mensaje genérico de información */
  general: `${base}?text=${encodeURIComponent("Hola, me gustaría solicitar información.")}`,

  /** Cotización directa desde el navbar / botón flotante */
  cotizar: `${base}?text=${encodeURIComponent("Hola, me gustaría solicitar una cotización directa.")}`,

  /** Cotización desde la página de catálogo */
  catalogo: `${base}?text=${encodeURIComponent("Hola, quisiera cotizar varios productos de su catálogo AT/MT.")}`,

  /** Cotización de materiales AT/MT (sección home) */
  materiales: `${base}?text=${encodeURIComponent("Hola, quisiera cotizar materiales AT/MT.")}`,

  /** Hablar con un ingeniero (nosotros) */
  ingeniero: `${base}?text=${encodeURIComponent("Hola, quisiera hablar con un ingeniero sobre mi proyecto AT/MT.")}`,

  /** Cotización de un producto específico — recibe nombre y marca */
  producto: (nombre: string, marca: string) =>
    `${base}?text=${encodeURIComponent(
      `Hola, me gustaría solicitar cotización del producto:\n*${nombre}*\nMarca: ${marca}`
    )}`,
} as const
