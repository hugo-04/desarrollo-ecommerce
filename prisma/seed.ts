import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

// Cliente dedicado al seed con pool de 1 conexión para no competir con Next.js
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL!, max: 1 })
const prisma = new PrismaClient({ adapter })
import { BRANDS_DATA } from "../lib/data/brands.data"
import { CATEGORIES_DATA } from "../lib/data/categories.data"
import { PRODUCTS_DATA } from "../lib/data/products.data"
import { ADMINS_DATA } from "../lib/data/admins.data"

async function main() {
  console.log("Starting seed...")

  // ── 1. Admin Users ────────────────────────────────────────────────────────
  const adminUsers = ADMINS_DATA

  for (const user of adminUsers) {
    // Genera el hash criptográfico para la contraseña antes de guardarla
    const passwordHash = await bcrypt.hash(user.password, 12)

    // Se utiliza `upsert` para evitar duplicados:
    // Si el usuario por email ya existe, actualiza su contraseña y lo marca como activo.
    // Si no existe, crea un nuevo registro con los datos proporcionados.
    const adminUser = await prisma.adminUser.upsert({
      where: { email: user.email },
      update: { passwordHash, isActive: true },
      create: { email: user.email, passwordHash, isActive: true },
    })
    console.log(`Admin user: ${adminUser.email}`)
  }

  // ── 2. Limpiar productos y categorías anteriores ──────────────────────────
  await prisma.product.deleteMany()
  console.log("Productos anteriores eliminados")
  await prisma.category.deleteMany()
  console.log("Categorías anteriores eliminadas")

  // ── 3. Brands ─────────────────────────────────────────────────────────────
  for (const brand of BRANDS_DATA) {
    await prisma.brand.upsert({
      where: { name: brand.name },
      update: { logoAlt: brand.logoAlt ?? null },
      create: {
        name: brand.name,
        logo: brand.logo,
        logoAlt: brand.logoAlt ?? null,
        showInCarousel: brand.showInCarousel || false,
      },
    })
  }
  // Marca por defecto para productos sin marca asignada
  const defaultBrand = await prisma.brand.upsert({
    where: { name: "Lorem Ipsum" },
    update: {},
    create: { name: "Lorem Ipsum", logo: "", showInCarousel: false },
  })
  console.log(`Seeded ${BRANDS_DATA.length + 1} brands`)

  // ── 4. Nuevas categorías y subcategorías ──────────────────────────────────
  for (const cat of CATEGORIES_DATA) {
    // Primero nos aseguramos de que existan las subcategorías (idempotente)
    const subIds = []
    if (cat.subcategories) {
      for (const subName of cat.subcategories) {
        const sub = await prisma.subcategory.upsert({
          where: { name: subName },
          update: {},
          create: { name: subName },
        })
        subIds.push(sub.id)
      }
    }

    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        keywords: cat.keywords ?? [],
        imageAlt: cat.imageAlt ?? null,
        imageTitle: cat.imageTitle ?? null,
        featured: cat.featured ?? false,
        subs: {
          set: subIds.map(id => ({ id }))
        }
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        image: "",
        description: cat.description,
        keywords: cat.keywords ?? [],
        imageAlt: cat.imageAlt ?? null,
        imageTitle: cat.imageTitle ?? null,
        featured: cat.featured ?? false,
        count: 0,
        subs: {
          connect: subIds.map(id => ({ id }))
        }
      },
    })
  }
  console.log(`Seeded ${CATEGORIES_DATA.length} categorías con sus subcategorías`)

  // ── 5. Mapas de lookup: marcas, categorías y subcategorías ───────────────
  const brandMap = new Map<string, number>()
  const allBrands = await prisma.brand.findMany({ select: { id: true, name: true } })
  allBrands.forEach(b => brandMap.set(b.name, b.id))

  const allCategories = await prisma.category.findMany({ select: { id: true, slug: true } })
  const catMap = new Map(allCategories.map(c => [c.slug, c.id]))

  const allSubs = await prisma.subcategory.findMany({ select: { id: true, name: true } })
  const subMap = new Map(allSubs.map(s => [s.name.toLowerCase(), s.id]))

  // ── 6. Nuevos productos ────────────────────────────────────────────────────
  const productData = PRODUCTS_DATA.flatMap(p => {
    const categoryId = catMap.get(p.catSlug)
    if (!categoryId) {
      console.warn(`Categoría no encontrada para slug "${p.catSlug}", saltando "${p.name}"`)
      return []
    }
    const pBrands = p.brands && p.brands.length > 0 ? p.brands : ["Lorem Ipsum"]
    const brandIds = pBrands.map(bName => brandMap.get(bName) ?? defaultBrand.id)
    const subcategoryId = p.subcategory ? (subMap.get(p.subcategory.toLowerCase()) ?? null) : null
    return [{ p, categoryId, brandIds, subcategoryId }]
  })

  await prisma.$transaction(
    productData.map(({ p, categoryId, brandIds, subcategoryId }) =>
      prisma.product.create({
        data: {
          name: p.name,
          description: p.description ?? "",
          fullDescription: p.fullDescription ?? "",
          image: "",
          gallery: [],
          medidas: p.medidas ?? [],
          technicalSpecs: p.technicalSpecs ?? undefined,
          fichaTecnica: p.fichaTecnica ?? null,
          modelo: p.modelo ?? null,
          keywords: p.keywords ?? [],
          featured: false,
          bestSeller: false,
          rating: 4.5,
          category: { connect: { id: categoryId } },
          brands: { connect: brandIds.map(id => ({ id })) },
          ...(subcategoryId != null && { subcategory: { connect: { id: subcategoryId } } }),
        },
      })
    )
  )
  const seeded = productData.length
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
