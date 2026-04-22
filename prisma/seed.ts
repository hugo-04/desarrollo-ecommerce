import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"
import { BRANDS_DATA } from "../lib/data/brands.data"
import { CATEGORIES_DATA } from "../lib/data/categories.data"
import { PRODUCTS_DATA } from "../lib/data/products.data"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma  = new PrismaClient({ adapter } as any)

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
  for (const brand of BRANDS_DATA) {
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
  console.log(`Seeded ${BRANDS_DATA.length + 1} brands`)

  // ── 4. Nuevas categorías ──────────────────────────────────────────────────
  for (const cat of CATEGORIES_DATA) {
    await prisma.category.upsert({
      where:  { slug: cat.slug },
      update: { name: cat.name, description: cat.description, subcategories: cat.subcategories },
      create: { name: cat.name, slug: cat.slug, image: "", description: cat.description, subcategories: cat.subcategories, count: 0 },
    })
  }
  console.log(`Seeded ${CATEGORIES_DATA.length} categorías`)

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
  for (const cat of CATEGORIES_DATA) {
    const count = await prisma.product.count({ where: { category: { slug: cat.slug } } })
    await prisma.category.update({ where: { slug: cat.slug }, data: { count } })
  }
  console.log(`Seeded ${seeded} productos`)

  console.log("Seed completado.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
