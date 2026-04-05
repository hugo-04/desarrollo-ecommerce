import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { MOCK_BRANDS } from "../lib/data/mock/brands.mock"

const prisma = new PrismaClient()

// ─── Categorías del XLSX con subcategorías SEO optimizadas ──────────────────
const CATEGORIES = [
  { name: "Grapas para Conductores AT/MT",            slug: "grapas",          color: "#374151", subcategories: ["Grapa de Anclaje Tipo Pistola", "Grapa de Suspensión Tipo Barquito", "Grapa Forjada"] },
  { name: "Conectores Eléctricos Bimetálicos",        slug: "conectores",       color: "#B91C1C", subcategories: ["Conector AB Cobreado", "Conector Splitbolt Perno Partido"] },
  { name: "Pernos de Acero Galvanizado",              slug: "pernos",           color: "#52525B", subcategories: ["Perno Angular de Acero Galvanizado", "Perno Ojo con Tuerca y Contratuerca", "Perno Gancho de Acero Galvanizado"] },
  { name: "Sistemas de Puesta a Tierra",              slug: "puesta-a-tierra",  color: "#047857", subcategories: ["Disco Antirrobo para Puesta a Tierra"] },
  { name: "Aisladores Eléctricos de Porcelana",       slug: "aisladores",       color: "#1D4ED8", subcategories: ["Aislador de Tracción ANSI 54-1", "Aislador Carrete 53-1"] },
  { name: "Varillas de Anclaje y Conductor",          slug: "varillas",         color: "#92400E", subcategories: ["Varilla de Anclaje de Acero Galvanizado", "Varilla de Armar de Aluminio", "Varilla de Cobre para Puesta a Tierra"] },
  { name: "Herrajes de Anclaje para Postes",          slug: "herrajes-anclaje", color: "#4B5563", subcategories: ["Plancha Gancho de Acero Galvanizado", "Clevis Portalinea Unipolar", "Guardacable de Acero", "Guardacabo de Acero"] },
  { name: "Tuercas de Acero Galvanizado",             slug: "tuercas",          color: "#3F3F46", subcategories: ["Tuerca Ojo de Acero Galvanizado"] },
  { name: "Pararrayos Tipo Franklin y Descargadores", slug: "pararrayos",       color: "#DC2626", subcategories: ["Pararrayo Tetrapuntal Tipo Franklin"] },
  { name: "Amarres Preformados para Cables",          slug: "amarres",          color: "#0369A1", subcategories: ["Amarre Preformado para Conductor"] },
  { name: "Abrazaderas de Acero para Postes",         slug: "abrazaderas",      color: "#6D28D9", subcategories: ["Abrazadera para Pastoral Simple", "Abrazadera 4 Sectores para Postes", "Abrazadera para Retenida", "Abrazadera Tipo Cash Doble"] },
  { name: "Adaptadores y Grilletes Metálicos",        slug: "adaptadores",      color: "#475569", subcategories: [] },
  { name: "Accesorios para Retenidas y Vientos",      slug: "retenidas",        color: "#78350F", subcategories: [] },
  { name: "Cintas de Acero Inoxidable para Fijación", slug: "cintas-acero",     color: "#1E3A5F", subcategories: ["Cinta de Acero Inoxidable"] },
  { name: "Accesorios para Fibra Óptica ADSS",        slug: "fibra-optica",     color: "#0E7490", subcategories: [] },
  { name: "Empalmes para Conductores Eléctricos",     slug: "empalmes",         color: "#065F46", subcategories: ["Empalme de Aluminio 25mm²"] },
  { name: "Herramientas de Enzunchado",               slug: "enzunchadora",     color: "#92400E", subcategories: [] },
  { name: "Espigas para Crucetas y Postes",           slug: "espigas",          color: "#374151", subcategories: ["Espiga para Cruceta 3/4\"", "Espiga para Punta de Poste 508mm"] },
  { name: "Fusibles de Media Tensión",                slug: "fusibles",         color: "#B45309", subcategories: ["Fusible Chicote Tipo K Cabeza Removible"] },
  { name: "Grilletes Forjados de Acero",              slug: "grilletes",        color: "#4B5563", subcategories: ["Grillete Forjado 1/2\" Pin Rojo"] },
  { name: "Hebillas para Cintas Metálicas",           slug: "hebillas",         color: "#475569", subcategories: ["Hebilla de Acero Inoxidable"] },
  { name: "Accesorios para Iluminación Pública",      slug: "iluminacion",      color: "#D97706", subcategories: [] },
  { name: "Templadores para Retenidas y Acometidas",  slug: "templadores",      color: "#1F2937", subcategories: ["Templador Tipo Sapito Monofásico", "Templador Forjado Ojo/Gancho", "Templador Forjado Ojo/Ojo"] },
  { name: "Terminales a Compresión para Cables",      slug: "terminales",       color: "#1C3A5F", subcategories: ["Terminal a Compresión"] },
  { name: "Accesorios para Acometida Eléctrica",      slug: "acometida",        color: "#374151", subcategories: ["Tubo Bastón de Acero Galvanizado"] },
  { name: "Seccionadores y Enlace Metálico",          slug: "seccionadores",    color: "#1E3A5F", subcategories: [] },
]

// ─── Solo productos resaltados en AMARILLO del XLSX ──────────────────────────
const PRODUCTS_DATA: { sku: string; name: string; catSlug: string }[] = [
  // GRAPAS (3 amarillos)
  { sku: "ET-GRP-001", name: "Grapa de Anclaje Tipo Pistola de Aluminio 25/70mm² 2 Pernos",  catSlug: "grapas" },
  { sku: "ET-GRP-002", name: "Grapa de Suspensión Tipo Barquito 50/120mm²",                  catSlug: "grapas" },
  { sku: "ET-GRP-003", name: "Grapa Forjada de 3/8\" para Líneas Eléctricas",                catSlug: "grapas" },
  // CONECTORES (2 amarillos)
  { sku: "ET-CON-001", name: "Conector AB Cobreado 5/8\" para Conductores AT/MT",            catSlug: "conectores" },
  { sku: "ET-CON-002", name: "Conector Splitbolt Tipo Perno Partido 16mm²",                  catSlug: "conectores" },
  // PERNOS (3 amarillos)
  { sku: "ET-PRN-001", name: "Perno Angular de A°G° 5/8Ø x 6\" con Tuerca",                 catSlug: "pernos" },
  { sku: "ET-PRN-002", name: "Perno Ojo de A°G° 5/8Ø x 6\" con Tuerca y Contratuerca",      catSlug: "pernos" },
  { sku: "ET-PRN-003", name: "Perno Gancho de A°G° 5/8Ø x 6\" con Tuerca y 2 Arandelas",    catSlug: "pernos" },
  // PUESTA A TIERRA (1 amarillo)
  { sku: "ET-PAT-001", name: "Disco Antirrobo 5/8\" para Sistema de Puesta a Tierra",        catSlug: "puesta-a-tierra" },
  // AISLADORES (2 amarillos)
  { sku: "ET-AIS-001", name: "Aislador de Tracción ANSI 54-1 de Porcelana para Líneas MT",   catSlug: "aisladores" },
  { sku: "ET-AIS-002", name: "Aislador Carrete 53-1 de Porcelana para Baja Tensión",         catSlug: "aisladores" },
  // VARILLAS (3 amarillos)
  { sku: "ET-VAR-001", name: "Varilla de Anclaje de A°G° 5/8Ø x 1.80m con Tuerca",          catSlug: "varillas" },
  { sku: "ET-VAR-002", name: "Varilla de Armar de Aluminio Simple 25mm² para Líneas BT",     catSlug: "varillas" },
  { sku: "ET-VAR-003", name: "Varilla de Cobre 5/8\" x 2.40m para Puesta a Tierra",          catSlug: "varillas" },
  // HERRAJES DE ANCLAJE (4 amarillos)
  { sku: "ET-ANC-001", name: "Plancha Gancho de A°G° 1/2\" para Anclaje en Postes",          catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-002", name: "Clevis Portalinea Unipolar 53-1 para Líneas Eléctricas",       catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-003", name: "Guardacable de Acero Forjado 3/8\" para Retenidas",            catSlug: "herrajes-anclaje" },
  { sku: "ET-ANC-004", name: "Guardacabo de Acero Forjado 3/8\" para Retenidas",             catSlug: "herrajes-anclaje" },
  // TUERCAS (1 amarillo)
  { sku: "ET-TRC-001", name: "Tuerca Ojo de A°G° 16mm 5/8Ø para Líneas Eléctricas",         catSlug: "tuercas" },
  // PARARRAYOS (1 amarillo)
  { sku: "ET-PAR-001", name: "Pararrayo Tetrapuntal Tipo Franklin 1/2\" con Base",           catSlug: "pararrayos" },
  // AMARRES (1 amarillo)
  { sku: "ET-AMR-001", name: "Amarre Preformado 3/8\" Color Naranja 80cm para Conductores",  catSlug: "amarres" },
  // ABRAZADERAS (4 amarillos)
  { sku: "ET-ABR-001", name: "Abrazadera de A°G° para Pastoral Simple 1-1/2 x 3/16 x 125mm", catSlug: "abrazaderas" },
  { sku: "ET-ABR-002", name: "Abrazadera de A°G° 150/200mm de 4 Sectores para Postes",       catSlug: "abrazaderas" },
  { sku: "ET-ABR-003", name: "Abrazadera de A°G° para Retenida 2 x 3/16 x 130mm",           catSlug: "abrazaderas" },
  { sku: "ET-ABR-004", name: "Abrazadera Tipo Cash de A°G° 2 x 1/4 x 180mm Doble",          catSlug: "abrazaderas" },
  // CINTAS (1 amarillo)
  { sku: "ET-CNT-001", name: "Cinta de Acero Inoxidable para Fijación de Herrajes en Postes", catSlug: "cintas-acero" },
  // EMPALMES (1 amarillo)
  { sku: "ET-EMP-001", name: "Empalme de Aluminio 25mm² para Conductores Eléctricos",        catSlug: "empalmes" },
  // ESPIGAS (2 amarillos)
  { sku: "ET-ESP-001", name: "Espiga para Cruceta 3/4\" x 12\" de Acero Galvanizado",        catSlug: "espigas" },
  { sku: "ET-ESP-002", name: "Espiga para Punta de Poste 508mm de Acero Galvanizado",        catSlug: "espigas" },
  // FUSIBLES (1 amarillo)
  { sku: "ET-FUS-001", name: "Fusible Chicote Tipo K Cabeza Removible 1A para Media Tensión", catSlug: "fusibles" },
  // GRILLETES (1 amarillo)
  { sku: "ET-GRL-001", name: "Grillete Forjado de 1/2\" Pin Rojo para Líneas Eléctricas",   catSlug: "grilletes" },
  // HEBILLAS (1 amarillo)
  { sku: "ET-HBL-001", name: "Hebilla de Acero Inoxidable para Cinta de Fleje Metálico",     catSlug: "hebillas" },
  // TEMPLADORES (4 amarillos)
  { sku: "ET-TMP-001", name: "Templador Tipo Sapito Monofásico para Acometida Eléctrica",    catSlug: "templadores" },
  { sku: "ET-TMP-002", name: "Templador Forjado Ojo/Gancho de A°G° 1/2\" para Retenidas",   catSlug: "templadores" },
  { sku: "ET-TMP-003", name: "Templador Forjado Ojo/Ojo de A°G° 1/2\" para Retenidas",      catSlug: "templadores" },
  { sku: "ET-TMP-004", name: "Templador Ojo/Gancho de A°G° 5/8\" x 10\" para Retenidas",    catSlug: "templadores" },
  // TERMINALES (1 amarillo)
  { sku: "ET-TRM-001", name: "Terminal a Compresión de 10mm² Largo para Cables Eléctricos",  catSlug: "terminales" },
  // ACOMETIDA (1 amarillo)
  { sku: "ET-ACM-001", name: "Tubo Bastón de A°G° 2\" x 3m para Acometida Eléctrica",       catSlug: "acometida" },
]

async function main() {
  console.log("Starting seed...")

  // ── 1. Admin User ─────────────────────────────────────────────────────────
  await prisma.adminUser.deleteMany({ where: { email: "admin@electrothina.com" } })
  const passwordHash = await bcrypt.hash("ElectroThina26", 12)
  const adminUser = await prisma.adminUser.upsert({
    where:  { email: "electrothina123@gmail.com" },
    update: { passwordHash, isActive: true },
    create: { email: "electrothina123@gmail.com", passwordHash, isActive: true },
  })
  console.log(`Admin user: ${adminUser.email}`)

  // ── 2. Limpiar productos y categorías anteriores ──────────────────────────
  await prisma.product.deleteMany()
  console.log("Productos anteriores eliminados")
  await prisma.category.deleteMany()
  console.log("Categorías anteriores eliminadas")

  // ── 3. Brands ─────────────────────────────────────────────────────────────
  for (const brand of MOCK_BRANDS) {
    await prisma.brand.upsert({
      where:  { name: brand.name },
      update: {},
      create: { name: brand.name, logo: brand.logo, showInCarousel: brand.showInCarousel || false },
    })
  }
  // Marca por defecto para productos sin marca asignada
  const defaultBrand = await prisma.brand.upsert({
    where:  { name: "Electro Thina" },
    update: {},
    create: { name: "Electro Thina", logo: "/logotipo.png", showInCarousel: false },
  })
  console.log(`Seeded ${MOCK_BRANDS.length + 1} brands`)

  // ── 4. Nuevas categorías ──────────────────────────────────────────────────
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where:  { slug: cat.slug },
      update: { name: cat.name, subcategories: cat.subcategories, color: cat.color },
      create: { name: cat.name, slug: cat.slug, image: "", color: cat.color, subcategories: cat.subcategories, count: 0 },
    })
  }
  console.log(`Seeded ${CATEGORIES.length} categorías`)

  // ── 5. Nuevos productos del XLSX ──────────────────────────────────────────
  let seeded = 0
  for (const p of PRODUCTS_DATA) {
    const category = await prisma.category.findUnique({ where: { slug: p.catSlug } })
    if (!category) {
      console.warn(`Categoría no encontrada para slug "${p.catSlug}", saltando ${p.sku}`)
      continue
    }
    await prisma.product.upsert({
      where:  { sku: p.sku },
      update: { name: p.name, categoryId: category.id },
      create: {
        sku:         p.sku,
        name:        p.name,
        description: "",
        image:       "",
        gallery:     [],
        specs:       [],
        featured:    false,
        bestSeller:  false,
        rating:      4.5,
        categoryId:  category.id,
        brandId:     defaultBrand.id,
      },
    })
    seeded++
  }
  // Actualizar count real en cada categoría
  for (const cat of CATEGORIES) {
    const count = await prisma.product.count({ where: { category: { slug: cat.slug } } })
    await prisma.category.update({ where: { slug: cat.slug }, data: { count } })
  }
  console.log(`Seeded ${seeded} productos`)

  console.log("Seed completado.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
