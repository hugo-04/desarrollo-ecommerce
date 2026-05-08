import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import fs from "fs"
import path from "path"
import productsData from "../lib/data/products.json"

// Cliente dedicado con pool de 1 conexión
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL!, max: 1 })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Iniciando importación de productos desde products.json...")

  // El JSON ya fue importado en la cabecera

  console.log(`Leídos ${productsData.length} productos del JSON.`)

  let insertedCount = 0

  for (const p of productsData) {
    try {
      // 1. Manejo de Marcas (crear si no existen)
      const brandIds: number[] = []
      if (p.brands && Array.isArray(p.brands)) {
        for (const brandName of p.brands) {
          const brandNameTrimmed = brandName.trim()
          if (!brandNameTrimmed) continue
          
          let brand = await prisma.brand.findUnique({
            where: { name: brandNameTrimmed }
          })
          
          if (!brand) {
            console.log(`Creando nueva marca: ${brandNameTrimmed}`)
            brand = await prisma.brand.create({
              data: {
                name: brandNameTrimmed,
                logo: "",
                showInCarousel: false,
              }
            })
          }
          brandIds.push(brand.id)
        }
      }

      // 2. Manejo de Categoría (crear si no existe)
      let categoryId: number | null = null
      if (p.catSlug) {
        let category = await prisma.category.findUnique({
          where: { slug: p.catSlug }
        })
        
        if (!category) {
          console.log(`Creando nueva categoría con slug: ${p.catSlug}`)
          // Crear nombre bonito a partir del slug
          const catName = p.catSlug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          category = await prisma.category.create({
            data: {
              slug: p.catSlug,
              name: catName,
              description: "",
              image: "",
              count: 0
            }
          })
        }
        categoryId = category.id
      }

      // Si no hay categoría, saltamos el producto (requerido por Prisma usualmente)
      if (!categoryId) {
        console.warn(`Saltando producto "${p.name}" porque no tiene categoría asignada.`)
        continue
      }

      // 3. Manejo de Subcategoría (crear si no existe)
      let subcategoryId: number | null = null
      if (p.subcategory) {
        const subName = p.subcategory.trim()
        let subcategory = await prisma.subcategory.findUnique({
          where: { name: subName }
        })
        
        if (!subcategory) {
          console.log(`Creando nueva subcategoría: ${subName}`)
          subcategory = await prisma.subcategory.create({
            data: {
              name: subName
            }
          })
        }
        subcategoryId = subcategory.id

        // Conectar la subcategoría a la categoría si no está conectada
        await prisma.category.update({
          where: { id: categoryId },
          data: {
            subs: {
              connect: { id: subcategoryId }
            }
          }
        })
      }

      // 4. Crear el producto
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description ?? "",
          fullDescription: p.fullDescription ?? "",
          image: "",
          gallery: [],
          medidas: p.medidas ?? [],
          technicalSpecs: p.technicalSpecs ?? undefined,
          fichaTecnica: null, // Forzado a null según instrucciones
          modelo: p.modelo ?? null,
          keywords: p.keywords ?? [],
          featured: false,
          bestSeller: false,
          rating: 4.5, // Valor por defecto
          category: { connect: { id: categoryId } },
          ...(brandIds.length > 0 && { brands: { connect: brandIds.map(id => ({ id })) } }),
          ...(subcategoryId != null && { subcategory: { connect: { id: subcategoryId } } }),
        },
      })
      
      insertedCount++
      console.log(`Producto "${p.name}" insertado correctamente.`)
      
    } catch (err: any) {
      console.error(`Error procesando producto "${p.name}":`, err.message)
    }
  }

  // 5. Actualizar el conteo de productos por categoría
  console.log("Actualizando el conteo de productos de las categorías...")
  const allCategories = await prisma.category.findMany({ select: { slug: true } })
  for (const cat of allCategories) {
    const count = await prisma.product.count({ where: { category: { slug: cat.slug } } })
    await prisma.category.update({ where: { slug: cat.slug }, data: { count } })
  }

  console.log(`\nImportación finalizada. Se procesaron e insertaron ${insertedCount} productos con éxito en la base de datos.`)
}

main()
  .catch((e) => {
    console.error("Error crítico durante la importación:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
