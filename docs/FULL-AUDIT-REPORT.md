# Auditoría SEO Completa — Electro Thina
**URL:** https://electrothina.com
**Fecha:** 2026-04-22
**Tipo de negocio:** Fabricante y distribuidor B2B de ferretería eléctrica AT/MT — Lima, Perú
**Stack:** Next.js 14 App Router · PostgreSQL (Prisma) · Cloudflare R2 (imágenes) · Vercel Analytics

---

## Puntuación SEO General: **58 / 100**

| Categoría              | Peso | Puntuación | Nota |
|------------------------|------|------------|------|
| SEO Técnico            | 22%  | 52/100     | robots.txt roto, imágenes sin optimizar |
| Calidad de Contenido   | 23%  | 72/100     | Buena base, imágenes externas problemáticas |
| SEO On-Page            | 20%  | 70/100     | Meta bien estructurada, catálogo client-side |
| Schema / Structured Data | 10% | 45/100   | Rating falso, precio faltante en productos |
| Performance (CWV)      | 10%  | 40/100     | images.unoptimized=true es crítico |
| AI Search Readiness    | 10%  | 20/100     | Sin llms.txt, sin citabilidad estructurada |
| Imágenes               | 5%   | 35/100     | crossOrigin bugs, sin WebP |

---

## Resumen Ejecutivo

Electro Thina tiene una base SEO sólida para el mercado B2B eléctrico peruano: metadata bien estructurada, schema LocalBusiness completo, sitemap dinámico, y keywords técnicas relevantes (aisladores, herrajes AT/MT, conectores bimetálicos). Sin embargo, **5 problemas críticos** neutralizan buena parte del trabajo previo y requieren corrección inmediata antes de que el sitio pueda competir orgánicamente.

### Top 5 Problemas Críticos
1. `images: { unoptimized: true }` en next.config.mjs — deshabilita toda optimización de imágenes
2. `robots.ts` disallows `/admin/` que no existe — rutas admin reales están expuestas
3. Schema de producto tiene `aggregateRating` con datos falsos (`reviewCount: 1`) — riesgo de penalización
4. Schema de producto sin campo `price` — impide resultados enriquecidos en Google Shopping
5. Catálogo cargado 100% client-side — Googlebot no ve los productos en el HTML inicial

### Top 5 Quick Wins (< 2 horas de trabajo)
1. Agregar `price: "0"` o remover `aggregateRating` falso del schema de producto
2. Corregir `robots.ts` para disallowear rutas admin reales
3. Remover `images: { unoptimized: true }` o cambiar a dominios permitidos
4. Crear `/public/llms.txt` para AI search readiness
5. Corregir `crossOrigin="anonymous"` en `CategoriesGrid.tsx` (bug regresado)

---

## 1. SEO Técnico

### 1.1 robots.txt — CRÍTICO

**Problema:** `app/robots.ts` disallowea `/admin/` pero ese path no existe. Los grupos de ruta de Next.js generan las rutas admin en la raíz:

```
/dashboard     → app/(admin)/dashboard/page.tsx
/categorias    → app/(admin)/categorias/page.tsx
/productos     → app/(admin)/productos/page.tsx
/marcas        → app/(admin)/marcas/page.tsx
/reclamaciones → app/(admin)/reclamaciones/page.tsx
```

**Además:** No existe `middleware.ts` que proteja estas rutas a nivel de request. Solo hay protección a nivel de página (server action de auth). Un crawler puede intentar acceder a `/categorias/nueva`, `/productos/nuevo`, etc.

**Impacto:** Crawl budget desperdiciado en páginas admin; potencial indexación de páginas internas.

**Código actual:**
```typescript
disallow: ["/admin/", "/api/", "/login"],
```

**Corrección:**
```typescript
disallow: ["/dashboard", "/categorias/nueva", "/categorias/", "/productos/nuevo", "/productos/", "/marcas/nueva", "/marcas/", "/reclamaciones", "/api/", "/login"],
```

O mejor aún: crear `middleware.ts` que proteja por prefijo y ajustar robots.ts a paths reales.

---

### 1.2 Sitemap — ALTO

**Problema 1:** Las categorías en el sitemap usan query parameters en lugar de URLs canónicas limpias:
```
https://electrothina.com/catalogo?categoria=Grapas+para+Conductores+AT%2FMT
```
Google puede no indexar estas URLs o tratarlas como variantes del `/catalogo` principal. Son distintas páginas de categoría pero sin URL propia.

**Problema 2:** Las páginas de producto usan IDs numéricos `/producto/1`, `/producto/2`, que no son descriptivos y cambian si se reimportan productos.

**Recomendación:** Crear rutas de categoría limpias `/categoria/[slug]` que hagan redirect 301 desde `/catalogo?categoria=...`. Esto requiere cambio de arquitectura pero es el camino correcto.

**Problema 3 (menor):** `changeFrequency: "weekly"` en el home y catálogo junto con `lastModified: new Date()` genera un lastModified diferente en cada build aunque no haya cambios.

---

### 1.3 Canonicals — MEDIO

`generateCategoryMeta` en `lib/seo.ts` (línea 276) pasa la URL relativa al campo `openGraph.url` como string relativo:
```typescript
url: `/catalogo?categoria=${encodeURIComponent(category.name)}`
```
Open Graph requiere URL absoluta. Next.js resuelve esto con `metadataBase` para `alternates.canonical`, pero el campo `openGraph.url` debería ser absoluto explícitamente.

---

### 1.4 Sin middleware.ts — ALTO

No existe `middleware.ts`. Las rutas admin dependen 100% de auth checks en el server component, lo que significa que un crawler malicioso puede recibir la estructura HTML de páginas admin (aunque vacías de datos). Crear un middleware que redirija rutas admin no autenticadas evita crawl budget waste y exposición de estructura.

---

## 2. Rendimiento e Imágenes

### 2.1 `images: { unoptimized: true }` — CRÍTICO

**Archivo:** `next.config.mjs` (línea 8)

Esta configuración deshabilita completamente la optimización de imágenes de Next.js para todo el sitio:
- Sin conversión a WebP/AVIF
- Sin responsive sizing (srcset)
- Sin lazy loading optimizado
- Sin placeholder blur

**Impacto directo en Core Web Vitals:**
- **LCP (Largest Contentful Paint):** El banner hero `/banner.jpg` se sirve sin optimizar. Si pesa >500KB, LCP fácilmente supera 4s.
- **CLS (Cumulative Layout Shift):** Sin dimensiones reservadas, las imágenes pueden causar reflow.

**Causa probable:** Se activó porque las imágenes de Cloudflare R2 no están en `images.domains`. La solución correcta es configurar `remotePatterns`:

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

---

### 2.2 `crossOrigin="anonymous"` en CategoriesGrid — ALTO

**Archivo:** `components/home/CategoriesGrid.tsx` (línea 44)

El commit `f032cac` decía "eliminar crossOrigin anonymous en MarqueeBrands" pero la regresión persiste en `CategoriesGrid.tsx`. El atributo `crossOrigin="anonymous"` en imágenes causa:
- Solicitud CORS adicional al servidor de imágenes
- Si el servidor no responde con headers CORS correctos, la imagen no carga
- En Cloudflare R2, esto puede causar fallos silenciosos en producción

---

### 2.3 Framer Motion en componentes críticos — MEDIO

`HeroSection.tsx`, `NosotrosView.tsx`, y varios componentes del home usan Framer Motion con animaciones complejas. Esto añade ~40KB al bundle JS inicial y puede retrasar el Time to Interactive (TTI) y afectar INP (Interaction to Next Paint).

**Recomendación:** Usar `dynamic(() => import('...'), { ssr: false })` para componentes con animaciones below-the-fold. El HeroSection puede mantener animaciones pero debe ser el único componente animado above-the-fold.

---

### 2.4 Header y Footer usan `<img>` nativo — BAJO

**Archivos:** `components/layout/Header.tsx` (línea 51), `components/layout/Footer.tsx` (línea 38)

El logotipo se carga con `<img>` en lugar de `<Image>` de Next.js. Sin optimización, el logo se sirve como PNG puro sin WebP y sin lazy loading inteligente.

---

### 2.5 Imágenes externas en NosotrosView — ALTO

**Archivo:** `components/views/NosotrosView.tsx` (líneas 129, 205)

Dos imágenes usan URLs de Unsplash directamente:
```
https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80
https://images.unsplash.com/photo-1581093196867-ca9b9e02e42e?w=800&q=80
```

Y tienen `crossOrigin="anonymous"` (líneas 133, 206) que no fue corregido.

**Problemas:**
- Dependencia de CDN externo (si Unsplash cambia las URLs o las políticas, las imágenes se rompen)
- Las fotos de stock de Unsplash reducen la autenticidad percibida por Google (señal E-E-A-T negativa)
- `crossOrigin="anonymous"` puede causar fallos CORS
- No representan el negocio real (son stock, no fotos de la empresa)

**Recomendación:** Subir fotos reales de las instalaciones/operaciones de Electro Thina a Cloudflare R2 y usar Next.js `<Image>`.

---

## 3. Schema / Structured Data

### 3.1 Product Schema sin precio — CRÍTICO para Rich Results

**Archivo:** `lib/seo.ts` (línea 393-401)

El schema de producto incluye `Offer` pero **sin campo `price`**:
```typescript
offers: {
  "@type": "Offer",
  url: `${SITE_URL}/producto/${product.id}`,
  priceCurrency: "PEN",
  availability: "https://schema.org/InStock",
  seller: { "@type": "Organization", name: "Electro Thina S.A.C." },
},
```

Google requiere `price` (o `priceSpecification`) para mostrar rich results en Google Shopping. Sin precio, el schema de producto es válido pero **no califica para precio destacado ni para Google Shopping**.

Si los precios son confidenciales (B2B cotización), se puede omitir el `Offer` completamente o usar:
```typescript
priceSpecification: {
  "@type": "PriceSpecification",
  description: "Precio por cotización",
  priceCurrency: "PEN",
}
```

---

### 3.2 `aggregateRating` con datos fabricados — CRÍTICO (política Google)

**Archivo:** `lib/seo.ts` (línea 404-411)

El schema añade `aggregateRating` cuando `product.rating` existe, y todos los productos tienen `rating: 4.5` en la base de datos (valor por defecto en `prisma/schema.prisma` línea 128) con `reviewCount: 1` hardcodeado.

```typescript
aggregateRating: {
  "@type": "AggregateRating",
  ratingValue: product.rating,  // siempre 4.5
  bestRating: 5,
  worstRating: 1,
  reviewCount: 1,               // hardcodeado, no hay reviews reales
},
```

**Esto viola las directrices de datos estructurados de Google:** "No inventes reseñas o calificaciones." Google puede desindexar rich results o penalizar el sitio por datos estructurados manipulados.

**Solución inmediata:** Eliminar el bloque `aggregateRating` hasta que haya reseñas reales de clientes.

---

### 3.3 Organization `@type` combinado — MENOR

El schema raíz usa `"@type": ["Organization", "LocalBusiness"]`. Esto es válido pero podría ser más específico. Para una ferretería industrial, `HardwareStore` o `ElectronicsStore` serían más específicos y mejoran la comprensión semántica por Google.

---

### 3.4 `buildCategorySchema` llama sin productos — MEDIO

**Archivo:** `app/(public)/catalogo/page.tsx` (línea 42)

```typescript
const pageSchema = selectedCat
  ? buildCategorySchema(selectedCat)   // productNames vacío!
  : { ... }
```

La función `buildCategorySchema` acepta `productNames: string[] = []` como segundo argumento, pero nunca se pasa. El schema `CollectionPage` se genera sin `mainEntity.itemListElement`, perdiendo una señal semántica valiosa para Google.

---

### 3.5 sameAs incompleto — BAJO

**Archivo:** `lib/seo.ts` (línea 100-102)

Solo incluye Facebook:
```typescript
sameAs: ["https://www.facebook.com/electrothina"]
```

Si existe perfil de Google Business Profile, LinkedIn, o YouTube, deben agregarse para consolidar la señal de entidad ante Google.

---

## 4. Contenido y On-Page SEO

### 4.1 Catálogo renderizado en cliente — ALTO

**Archivo:** `components/views/CatalogoView.tsx`

El componente usa `"use client"` y carga los productos via hooks que llaman a `/api/productos`. Cuando Googlebot visita `/catalogo`, el HTML inicial no contiene ningún producto — solo el shell de la UI.

Google puede ejecutar JavaScript y cargar los productos eventualmente, pero:
- El crawl es más costoso y lento
- El contenido dinámico recibe menor peso semántico que el HTML estático
- Las páginas de categoría (`/catalogo?categoria=Aisladores`) no tienen contenido en el HTML inicial

**Recomendación:** Pasar los primeros N productos como `initialProducts` desde el server component (similar a como ya se hace con `initialCategories`).

---

### 4.2 Breadcrumbs sin schema BreadcrumbList en producto — MEDIO

**Archivo:** `components/views/ProductoView.tsx` (líneas 44-100)

El componente `ProductoView` renderiza un breadcrumb visual (Inicio > Catálogo > Categoría > Producto) pero no genera un schema `BreadcrumbList` en JSON-LD. El schema de contacto y nosotros sí incluyen breadcrumbs, pero el producto no.

---

### 4.3 H1 en catálogo sin categoría seleccionada — MEDIO

Cuando se visita `/catalogo` sin filtros, no hay un H1 claro con keyword principal. El `CatalogToolbar` puede mostrar un título pero depende del estado client-side.

---

### 4.4 "Nosotros" no menciona ISO 9001 en texto visible — MENOR

En `NosotrosView.tsx` hay una tarjeta flotante que dice "ISO 9001 — Gestión de Calidad", pero esto es un elemento visual no incluido en el copy principal. Si Electro Thina tiene certificación ISO 9001 real, debe mencionarse en texto corrido para que Google lo indexe como claim verificable.

Si no es certificación actual (solo aspiracional/en proceso), debe removerse para evitar E-E-A-T negativo.

---

## 5. AI Search Readiness

### 5.1 Sin `llms.txt` — ALTO

No existe `/public/llms.txt`. Este archivo permite a AI crawlers (ChatGPT, Perplexity, Claude) entender qué contenido es citeable y cómo se estructura el sitio.

**Crear `/public/llms.txt`:**
```
# Electro Thina S.A.C.
# Fabricantes y distribuidores de ferretería eléctrica AT/MT — Lima, Perú
# https://electrothina.com

## Acerca de
Electro Thina es fabricante y distribuidor de ferretería eléctrica para alta y media tensión en Lima, Perú. Fundada en 2010, fabrica herrajes, aisladores, conectores y accesorios certificados IEC, ANSI y NTP. Despacho nacional en 48 horas.

## Páginas autorizadas para citación
- / (Inicio — descripción del negocio y productos)
- /nosotros (Historia, misión, valores)
- /catalogo (Catálogo de productos AT/MT)
- /contacto (Cotizaciones y asesoría técnica)

## Páginas excluidas
- /admin/*
- /api/*
- /login
- /libro-reclamaciones
- /terminos
- /politica-privacidad

## Contacto
Email: electrothina522@gmail.com
Teléfono: +51 981 375 196
Dirección: Av. Guillermo Dansey N° 481 - Int. 143, Lima, Perú
```

---

### 5.2 Citabilidad de contenido técnico — MEDIO

El catálogo tiene información técnica valiosa (especificaciones de conductores, normas ANSI/IEC) que los AI Overviews podrían citar, pero está cargada client-side. Para que los crawlers de AI puedan acceder a ella, debe estar en el HTML estático.

---

## 6. Local SEO

### 6.1 Schema LocalBusiness correcto — BIEN

El schema `organizationSchema` en `lib/seo.ts` incluye:
- Dirección completa con PostalAddress
- Coordenadas GeoCoordinates (latitud/longitud)
- Horarios de apertura (Lunes-Viernes 9-18h, Sábado 9-13h)
- Teléfono y email
- `areaServed: "PE"`

**Pendiente:** Verificar que el perfil de Google Business Profile esté reclamado y actualizado con los mismos datos del schema.

### 6.2 Foto del logo en GBP vs imagen real — MEDIO

Si el GBP usa el mismo logo que la web, se recomienda agregar fotos del local/almacén en GBP para mejorar el ranking local.

---

## 7. Análisis de URLs y Arquitectura

### 7.1 Estructura de URLs actual

| Tipo | URL actual | Problema |
|------|-----------|----------|
| Inicio | `/` | ✅ OK |
| Catálogo | `/catalogo` | ✅ OK |
| Categoría | `/catalogo?categoria=Aisladores...` | ❌ Query param, no indexable de forma confiable |
| Producto | `/producto/42` | ⚠️ ID numérico, no descriptivo |
| Nosotros | `/nosotros` | ✅ OK |
| Contacto | `/contacto` | ✅ OK |

### 7.2 Recomendación de arquitectura URL

```
/categoria/aisladores                    → Página de categoría limpia
/categoria/aisladores/aislador-traccion-ansi-54-1  → Producto con slug
```

Esto requiere:
1. Agregar campo `slug` a Product en Prisma
2. Crear rutas `app/(public)/categoria/[slug]/page.tsx`
3. Redirigir `/catalogo?categoria=...` → `/categoria/[slug]`
4. Actualizar sitemap y canonicals

---

## 8. Checklist Completo

### Bien implementado ✅
- `metadataBase` configurado correctamente en root layout
- Metadata por página con title, description, OG y Twitter Cards
- Schema `Organization + LocalBusiness` con datos completos
- Schema `WebSite` con `SearchAction`
- Schema `AboutPage`, `ContactPage` con breadcrumbs en nosotros/contacto
- Schema dinámico por categoría (`CollectionPage`) y producto (`Product`)
- sitemap.xml dinámico con productos y categorías
- robots.txt con sitemap referenciado
- `lang="es"` en html tag
- `font-display: swap` en Google Fonts
- Canonical tags por página
- noindex en páginas legales (términos, política, libro reclamaciones)
- `priority` en imagen hero (LCP)
- Vercel Analytics integrado
- WhatsApp CTA en múltiples puntos de conversión
- Breadcrumbs visuales en página de producto

### Pendiente o con errores ❌
- `images: { unoptimized: true }` — deshabilita optimización
- `robots.ts` con paths admin incorrectos
- Sin `middleware.ts`
- `aggregateRating` con datos falsos
- `Offer` sin `price`
- `crossOrigin="anonymous"` en CategoriesGrid
- Sin `llms.txt`
- Catálogo 100% client-side
- URLs de categoría con query params
- Imágenes Unsplash externas en NosotrosView
- Header/Footer con `<img>` nativo
- `buildCategorySchema` sin productos
- `sameAs` incompleto
- Sin `BreadcrumbList` en schema de producto
- Sin `middleware.ts` para proteger rutas admin
