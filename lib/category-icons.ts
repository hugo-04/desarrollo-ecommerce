/**
 * CATEGORY ICON MAP
 *
 * Mapea slug de categoría → componente icono (client-side).
 * La API no puede serializar React components, así que se resuelven aquí.
 *
 * Al migrar a DB: la tabla de categorías tendrá un campo `iconSlug` (string).
 * El frontend usará este mapa para resolver el componente correspondiente.
 */

import type { ComponentType } from "react"
import {
  IconShield,
  IconTools,
  IconBolt,
  IconLightning,
  IconPanel,
  IconBox,
} from "@/components/icons"

export const CATEGORY_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  aisladores: IconShield,
  herrajes: IconTools,
  conectores: IconBolt,
  cables: IconLightning,
  transformadores: IconPanel,
  ferreteria: IconBox,
  celdas: IconPanel,
  pararrayos: IconShield,
  seccionadores: IconBolt,
  iluminacion: IconLightning,
  reclosers: IconPanel,
  pat: IconTools,
  medicion: IconBox,
  herramientas: IconShield,
  tableros: IconPanel,
  mufas: IconBolt,
}

export function getCategoryIcon(slug: string): ComponentType<{ className?: string }> {
  return CATEGORY_ICON_MAP[slug] ?? IconBolt
}
