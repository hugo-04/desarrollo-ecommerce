/**
 * DATOS DE CONTACTO — fuente única de verdad
 */

export const CONTACT = {
  whatsappNumber: "00000000000",
  phone2: "000000000",
  phoneDisplay: "000 000 000",
  phone2Display: "000 000 000",
  phoneTel: "tel:+00000000000",
  email: "lorem@ipsum.com",
  address: "Lorem Ipsum N° 000 - Int. 000 - Lorem Ipsum",
  hours: "L-V: 9am-6pm | Sáb: 9am-3pm",
} as const

const base = `https://wa.me/${CONTACT.whatsappNumber}`

export const WA = {
  general:    `${base}?text=${encodeURIComponent("Hola, me gustaría solicitar información.")}`,
  cotizar:    `${base}?text=${encodeURIComponent("Hola, me gustaría solicitar una cotización directa.")}`,
  catalogo:   `${base}?text=${encodeURIComponent("Hola, quisiera cotizar varios productos del catálogo.")}`,
  materiales: `${base}?text=${encodeURIComponent("Hola, quisiera cotizar materiales.")}`,
  ingeniero:  `${base}?text=${encodeURIComponent("Hola, quisiera hablar con un ingeniero sobre mi proyecto.")}`,
  producto:   (nombre: string, sku: string, marca: string) =>
    `${base}?text=${encodeURIComponent(
      `Hola, me gustaría solicitar cotización del producto:\n*${nombre}*\nSKU: ${sku}\nMarca: ${marca}`
    )}`,
} as const
