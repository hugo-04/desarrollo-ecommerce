/**
 * DATOS DE CONTACTO — fuente única de verdad
 * Edita este archivo para actualizar la información en todo el sitio.
 */

export const CONTACT = {
  /** Número WhatsApp principal (sin "+" ni espacios, con código de país Perú: 51) */
  whatsappNumber: "xxxxxxxxxxxxxxxxxx",

  /** Número secundario de contacto */
  phone2: "xxxxxxxxxxxxxxxx",

  /** Números para mostrar en pantalla */
  phoneDisplay: "xxxxxxxxxxxxxxxx",
  phone2Display: "xxxxxxxxxxxxxxxx",

  /** Número primario en formato tel: */
  phoneTel: "xxxxxxxxxxxxxxxx",

  /** RUC — Registro Único de Contribuyentes (Perú) */
  ruc: "xxxxxxxxxxxxxxxx",

  /** Correo electrónico principal */
  email: "contacto@empresa.com",

  /** Dirección física */
  address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",

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

  /** Cotización de un producto específico — recibe nombre, marca y modelo */
  producto: (nombre: string, marca: string, modelo?: string) =>
    `${base}?text=${encodeURIComponent(
      `Hola, me gustaría solicitar cotización del producto:\n*${nombre}*\nMarca: ${marca}${modelo ? `\nModelo: ${modelo}` : ""}`
    )}`,
} as const
