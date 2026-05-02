/**
 * features/reclamaciones/schemas.ts — Validación Zod del libro de reclamaciones.
 * Cumple los requisitos mínimos de la Ley N° 29571 (INDECOPI).
 */

import { z } from "zod"

export const TIPOS_DOC = ["DNI", "RUC", "Carné de Extranjería", "Pasaporte"] as const

const onlyLetters = /^[a-zA-ZÀ-ÿ\s'-]+$/

export const reclamacionSchema = z
  .object({
    nombres:  z.string().min(2, "Ingresá tu nombre (mín. 2 caracteres)").regex(onlyLetters, "Solo letras y espacios"),
    apellidos: z.string().min(2, "Ingresá tus apellidos (mín. 2 caracteres)").regex(onlyLetters, "Solo letras y espacios"),
    tipoDoc:  z.enum(TIPOS_DOC, { message: "Seleccioná un tipo de documento válido" }),
    nroDoc:   z.string().min(7, "Número de documento inválido").max(20),
    email:    z.string().email("Ingresá un correo electrónico válido"),
    telefono: z.string().regex(/^[\d\s\-\+]{7,15}$/, "Teléfono inválido (7-15 dígitos)").or(z.literal("")).optional(),
    domicilio: z.string().optional(),
    descripcion: z.string().min(20, "Describí el reclamo con más detalle (mín. 20 caracteres)").max(2000, "Máximo 2000 caracteres"),
    pedido:   z.string().min(10, "Especificá qué solución solicitás (mín. 10 caracteres)").max(1000, "Máximo 1000 caracteres"),
  })
  .superRefine((data, ctx) => {
    if (data.tipoDoc === "DNI" && !/^\d{8}$/.test(data.nroDoc)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El DNI debe tener exactamente 8 dígitos", path: ["nroDoc"] })
    }
    if (data.tipoDoc === "RUC" && !/^\d{11}$/.test(data.nroDoc)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El RUC debe tener exactamente 11 dígitos", path: ["nroDoc"] })
    }
    if (data.tipoDoc === "Carné de Extranjería" && !/^[a-zA-Z0-9]{7,12}$/.test(data.nroDoc)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Carné de extranjería: 7-12 caracteres alfanuméricos", path: ["nroDoc"] })
    }
  })

export type ReclamacionErrors = Partial<Record<keyof z.infer<typeof reclamacionSchema>, string>>
