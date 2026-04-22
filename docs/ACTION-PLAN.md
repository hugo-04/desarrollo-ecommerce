# Plan de Acción SEO — Electro Thina
**Generado:** 2026-04-22
**Puntuación actual:** 58/100 → **Objetivo:** 80+/100

---

## CRÍTICO — Corregir esta semana (impacto inmediato)

### C1. Eliminar `aggregateRating` falso del schema de producto
**Archivo:** [lib/seo.ts](lib/seo.ts#L404-L411)
**Riesgo:** Violación de políticas de Google → puede causar penalización de rich results

Eliminar el bloque `aggregateRating` de `buildProductSchema`. No añadir ratings hasta tener reseñas reales verificables.

```typescript
// ELIMINAR este bloque:
...(product.rating && {
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: product.rating,
    bestRating: 5,
    worstRating: 1,
    reviewCount: 1,
  },
}),
```

**Esfuerzo:** 10 min | **Impacto:** Previene penalización

---

### C2. Corregir `next.config.mjs` — eliminar `unoptimized: true`
**Archivo:** [next.config.mjs](next.config.mjs)
**Riesgo:** Todas las imágenes del sitio se sirven sin WebP, sin lazy loading, sin srcset → LCP > 4s probable

Reemplazar `unoptimized: true` por `remotePatterns` para el bucket R2:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "pub-56324bc94fe8499080e4ab9ca8af567f.r2.dev",
    },
  ],
},
```

Luego en todos los componentes que usen `<img src="https://pub-...">` cambiar a `<Image src="..." width={...} height={...} />`.

**Esfuerzo:** 1 hora (config + actualizar componentes principales) | **Impacto:** +15-20 puntos en Performance

---

### C3. Corregir `robots.ts` — paths admin reales
**Archivo:** [app/robots.ts](app/robots.ts)

```typescript
// Reemplazar:
disallow: ["/admin/", "/api/", "/login"],

// Por:
disallow: [
  "/dashboard",
  "/categorias/nueva",
  "/categorias/",
  "/productos/nuevo",
  "/productos/",
  "/marcas/nueva",
  "/marcas/",
  "/reclamaciones",
  "/api/",
  "/login",
],
```

**Esfuerzo:** 5 min | **Impacto:** Evita indexación de páginas admin + protege crawl budget

---

### C4. Añadir `price` al schema de producto o eliminar `Offer`
**Archivo:** [lib/seo.ts](lib/seo.ts#L393-L401)

Opción A (cotización bajo pedido — sin precio público):
```typescript
offers: {
  "@type": "Offer",
  url: `${SITE_URL}/producto/${product.id}`,
  priceCurrency: "PEN",
  availability: "https://schema.org/InStock",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    description: "Precio disponible bajo cotización",
    priceCurrency: "PEN",
  },
  seller: { "@type": "Organization", name: "Electro Thina S.A.C." },
},
```

Opción B: Eliminar `offers` del schema hasta que los precios sean públicos.

**Esfuerzo:** 15 min | **Impacto:** Elimina schema inválido, mejora calidad de datos estructurados

---

### C5. Eliminar `crossOrigin="anonymous"` en CategoriesGrid
**Archivo:** [components/home/CategoriesGrid.tsx](components/home/CategoriesGrid.tsx#L44)

```tsx
// Cambiar:
<img src={category.image} alt={category.name} crossOrigin="anonymous" ... />

// Por:
<img src={category.image} alt={category.name} ... />
```

**Esfuerzo:** 2 min | **Impacto:** Elimina posibles fallos de carga de imágenes en producción

---

## ALTO — Completar en los próximos 7 días

### A1. Crear `/public/llms.txt` — AI Search Readiness
**Archivo nuevo:** [public/llms.txt](public/llms.txt)

```
# Electro Thina S.A.C.
# Fabricantes de ferretería eléctrica AT/MT — Lima, Perú
# https://electrothina.com

## Descripción
Electro Thina es fabricante y distribuidor de ferretería y accesorios eléctricos
para alta y media tensión en Lima, Perú. Fundada en 2010, fabrica herrajes,
aisladores, conectores bimetálicos y accesorios galvanizados certificados bajo
normas IEC, ANSI y NTP. Despacho nacional en 48 horas.

## Páginas autorizadas para citación AI
- https://electrothina.com/ (Inicio)
- https://electrothina.com/nosotros (Empresa, historia, misión)
- https://electrothina.com/catalogo (Catálogo AT/MT completo)
- https://electrothina.com/contacto (Cotizaciones y asesoría)

## Productos principales
- Grapas para conductores AT/MT (anclaje, suspensión, tipo pistola)
- Conectores eléctricos bimetálicos Al/Cu y Al/Al
- Pernos de acero galvanizado para postes
- Aisladores de porcelana ANSI 54-1 y 53-1
- Herrajes de anclaje para postes de concreto
- Abrazaderas para postes de distribución
- Sistemas de puesta a tierra

## Exclusiones
- /admin/* (panel administrativo)
- /api/* (endpoints internos)
- /libro-reclamaciones
- /terminos
- /politica-privacidad

## Contacto
email: electrothina522@gmail.com
tel: +51 981 375 196
direccion: Av. Guillermo Dansey N° 481 - Int. 143, Lima, Perú
horario: Lunes a Viernes 9:00-18:00, Sábado 9:00-13:00
```

**Esfuerzo:** 20 min | **Impacto:** Visibilidad en ChatGPT, Perplexity, Google AI Overviews

---

### A2. Eliminar imágenes Unsplash de NosotrosView
**Archivo:** [components/views/NosotrosView.tsx](components/views/NosotrosView.tsx#L129)

Subir 2 fotos reales de la empresa (instalaciones, almacén, planta de fabricación) a Cloudflare R2 y reemplazar las URLs de Unsplash. Las fotos reales son señal E-E-A-T positiva para Google.

```tsx
// Cambiar:
<img
  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
  alt="Operaciones Electro Thina — distribución de materiales eléctricos AT/MT"
  crossOrigin="anonymous"
/>

// Por (con foto real subida a R2):
<Image
  src="https://pub-56324bc94fe8499080e4ab9ca8af567f.r2.dev/empresa/operaciones.jpg"
  alt="Almacén de ferretería eléctrica AT/MT — Electro Thina Lima"
  width={800}
  height={440}
  className="h-[440px] w-full object-cover"
/>
```

**Esfuerzo:** 1 hora (incluye fotografía/subida) | **Impacto:** E-E-A-T, elimina dependencia externa

---

### A3. Server-side render productos iniciales en catálogo
**Archivo:** [app/(public)/catalogo/page.tsx](app/(public)/catalogo/page.tsx)

Pasar los primeros productos desde el server component como `initialProducts`:

```typescript
// En CatalogoPage (server component):
const [categories, brandNames, initialProducts] = await Promise.all([
  getCategories(),
  getBrandNamesAction(),
  getProductsAction({ page: 1, limit: 6, categoria: params.categoria }),
])

return (
  <CatalogoView
    initialCategory={params.categoria}
    initialProducts={initialProducts}  // ← nuevo prop
    ...
  />
)
```

Luego en `CatalogoView`, mostrar `initialProducts` en el primer render y reemplazar cuando el hook cargue.

**Esfuerzo:** 2-3 horas | **Impacto:** Googlebot ve productos en HTML inicial → mejor indexación

---

### A4. Añadir `BreadcrumbList` schema en página de producto
**Archivo:** [app/(public)/producto/[id]/page.tsx](app/(public)/producto/[id]/page.tsx)

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
    { "@type": "ListItem", position: 3, name: product.category, item: `${SITE_URL}/catalogo?categoria=${encodeURIComponent(product.category)}` },
    { "@type": "ListItem", position: 4, name: product.name, item: `${SITE_URL}/producto/${product.id}` },
  ],
}
```

**Esfuerzo:** 20 min | **Impacto:** Rich results de breadcrumbs en SERP

---

### A5. Header y Footer con Next.js `<Image>`
**Archivos:** [components/layout/Header.tsx](components/layout/Header.tsx#L51), [components/layout/Footer.tsx](components/layout/Footer.tsx#L38)

```tsx
// Cambiar <img> por <Image> en ambos componentes:
import Image from "next/image"

<Image
  src="/logotipo.png"
  alt="Electro Thina — Soluciones Eléctricas"
  width={160}
  height={40}
  className="h-9 w-auto object-contain drop-shadow-sm sm:h-10"
  priority  // en header, no en footer
/>
```

**Esfuerzo:** 30 min | **Impacto:** Logo optimizado en WebP, mejor performance

---

### A6. Crear `middleware.ts` para proteger rutas admin
**Archivo nuevo:** [middleware.ts](middleware.ts)

```typescript
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_PATHS = ["/dashboard", "/categorias", "/productos", "/marcas", "/reclamaciones"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdmin = ADMIN_PATHS.some(p => pathname.startsWith(p))

  if (isAdmin) {
    // Verificar auth cookie (adaptar según el sistema de auth actual)
    const session = request.cookies.get("auth-session")
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/categorias/:path*", "/productos/:path*", "/marcas/:path*", "/reclamaciones/:path*"],
}
```

**Esfuerzo:** 1 hora (depende del sistema de auth actual) | **Impacto:** Protección real de rutas admin

---

## MEDIO — Próximo mes

### M1. URLs limpias para categorías
Crear rutas `/categoria/[slug]` que resuelvan a la vista de catálogo filtrada. Añadir 301 redirect desde `/catalogo?categoria=...` → `/categoria/[slug]`.

Beneficios: URLs indexables y descriptivas, mejor ranking de categorías individuales.

**Esfuerzo:** 4-6 horas

---

### M2. Slug en URLs de producto
Añadir campo `slug` al modelo `Product` en Prisma. Generar el slug desde el nombre/SKU. Crear ruta `/producto/[slug]` con 301 redirect desde `/producto/[id]`.

**Esfuerzo:** 3-4 horas (migración de DB incluida)

---

### M3. Ampliar `sameAs` en schema Organization
**Archivo:** [lib/seo.ts](lib/seo.ts#L100)

Agregar Google Business Profile URL, LinkedIn y cualquier otro perfil verificado:
```typescript
sameAs: [
  "https://www.facebook.com/electrothina",
  "https://g.co/kgs/XXXXXXX",  // URL del perfil GBP
],
```

**Esfuerzo:** 10 min

---

### M4. Pasar productos a `buildCategorySchema`
**Archivo:** [app/(public)/catalogo/page.tsx](app/(public)/catalogo/page.tsx#L42)

```typescript
const categoryProducts = selectedCat
  ? await getProductsByCategory(selectedCat.name, { limit: 20 })
  : []

const pageSchema = selectedCat
  ? buildCategorySchema(selectedCat, categoryProducts.map(p => p.name))
  : { ... }
```

**Esfuerzo:** 30 min | **Impacto:** CollectionPage schema más rico semánticamente

---

### M5. Optimizar bundle de Framer Motion
Usar `dynamic()` de Next.js para componentes animados below-the-fold:

```typescript
const ProcesoSection = dynamic(() => import("@/components/home/ProcesoSection"), { ssr: false })
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), { ssr: false })
```

Mantener HeroSection con SSR ya que es above-the-fold.

**Esfuerzo:** 1 hora | **Impacto:** Reducción de JS inicial ~30-40KB

---

### M6. Verificar y corregir certificación ISO 9001 en NosotrosView
Si la certificación ISO 9001 es real y actual, añadirla al texto visible y al schema:
```typescript
knowsAbout: [..., "ISO 9001:2015 calidad en fabricación eléctrica"]
```
Si es aspiracional, **eliminar** la tarjeta flotante para evitar claims falsos.

**Esfuerzo:** 30 min | **Impacto:** E-E-A-T positivo o negativo según veracidad

---

## BAJO — Backlog

### B1. `changeFrequency` + `lastModified` dinámico en sitemap
Usar la fecha real del último `updatedAt` del contenido en lugar de `new Date()` para el home/catálogo.

### B2. OG image real de 1200×630
Crear una imagen OG dedicada (no el logo) con diseño que represente el negocio. El logo actual probablemente no tiene las dimensiones correctas para previews sociales óptimas.

### B3. Canonical en OG absolute URL
En `generateCategoryMeta`, usar URL absoluta en `openGraph.url`:
```typescript
openGraph: { url: `${SITE_URL}${categoryUrl(category.name)}`, ... }
```

### B4. H1 explícito en catálogo sin filtros
Añadir un H1 visible cuando no hay categoría seleccionada: "Catálogo de Ferretería Eléctrica AT/MT".

### B5. Foto de perfil real en GBP
Subir fotos del local/almacén/equipo al Google Business Profile para mejorar CTR en búsquedas locales.

---

## Resumen de Impacto Esperado

| Acción | Esfuerzo | Impacto en Score |
|--------|----------|-----------------|
| C1 — Eliminar aggregateRating falso | 10 min | +5 (evita penalización) |
| C2 — Corregir images.unoptimized | 1 hora | +12 (Performance) |
| C3 — Corregir robots.ts | 5 min | +4 (Técnico) |
| C4 — Corregir Offer schema | 15 min | +3 (Schema) |
| C5 — Eliminar crossOrigin | 2 min | +2 (Técnico) |
| A1 — llms.txt | 20 min | +8 (AI Readiness) |
| A2 — Fotos reales NosotrosView | 1 hora | +4 (E-E-A-T) |
| A3 — SSR productos en catálogo | 3 horas | +6 (Content) |
| A4 — BreadcrumbList en producto | 20 min | +2 (Schema) |
| A5 — Image en Header/Footer | 30 min | +2 (Performance) |
| **Total acciones críticas + altas** | **~7 horas** | **+48 puntos → 80+/100** |
