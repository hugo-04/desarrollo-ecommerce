import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { MOCK_CATEGORIES } from "../lib/data/mock/categories.mock"
import { MOCK_BRANDS } from "../lib/data/mock/brands.mock"
import { MOCK_PRODUCTS } from "../lib/data/mock/products.mock"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // 1. Admin User
  const passwordHash = await bcrypt.hash("admin", 10)
  const adminUser = await prisma.adminUser.upsert({
    where: { email: "admin@electrothina.com" },
    update: {},
    create: {
      email: "admin@electrothina.com",
      passwordHash,
    },
  })
  console.log(`Admin user created: ${adminUser.email}`)

  // 2. Categories
  for (const cat of MOCK_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        color: cat.color,
        subcategories: cat.subcategories,
        count: cat.count,
      },
    })
  }
  console.log(`Seeded ${MOCK_CATEGORIES.length} categories`)

  // 3. Brands
  for (const brand of MOCK_BRANDS) {
    await prisma.brand.upsert({
      where: { name: brand.name },
      update: {},
      create: {
        id: brand.id,
        name: brand.name,
        logo: brand.logo,
        showInCarousel: brand.showInCarousel || false,
      },
    })
  }
  console.log(`Seeded ${MOCK_BRANDS.length} brands`)

  // 4. Products
  for (const product of MOCK_PRODUCTS) {
    // Buscar CategoryId y BrandId
    const category = await prisma.category.findUnique({ where: { name: product.category } })
    const brand = await prisma.brand.findUnique({ where: { name: product.brand } })

    if (!category || !brand) {
      console.warn(`Skipping product ${product.sku} due to missing Brand/Category mappings.`)
      continue
    }

    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        id: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        fullDescription: product.fullDescription,
        image: product.image,
        gallery: product.gallery,
        specs: product.specs,
        fichaTecnica: product.fichaTecnica,
        featured: product.featured,
        bestSeller: product.bestSeller,
        rating: product.rating,
        categoryId: category.id,
        brandId: brand.id,
        technicalSpecs: product.technicalSpecs as any, // Json
      },
    })
  }
  console.log(`Seeded products`)

  console.log("Seed completed.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
