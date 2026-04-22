/*
  Warnings:

  - You are about to drop the column `color` on the `categories` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "brands_name_trgm_idx";

-- DropIndex
DROP INDEX "categories_featured_idx";

-- DropIndex
DROP INDEX "categories_name_trgm_idx";

-- DropIndex
DROP INDEX "categories_slug_trgm_idx";

-- DropIndex
DROP INDEX "products_description_trgm_idx";

-- DropIndex
DROP INDEX "products_name_trgm_idx";

-- DropIndex
DROP INDEX "products_sku_trgm_idx";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "color";

-- CreateTable
CREATE TABLE "reclamaciones" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipoDoc" TEXT NOT NULL,
    "nroDoc" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL DEFAULT '',
    "tipo" TEXT NOT NULL,
    "tipoBien" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "pedido" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "respuesta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reclamaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reclamaciones_estado_idx" ON "reclamaciones"("estado");

-- CreateIndex
CREATE INDEX "reclamaciones_createdAt_idx" ON "reclamaciones"("createdAt" DESC);

-- RenameIndex
ALTER INDEX "categories_count_desc_idx" RENAME TO "categories_count_idx";

-- RenameIndex
ALTER INDEX "products_brand_id_idx" RENAME TO "products_brandId_idx";

-- RenameIndex
ALTER INDEX "products_category_id_idx" RENAME TO "products_categoryId_idx";

-- RenameIndex
ALTER INDEX "products_rating_desc_idx" RENAME TO "products_rating_idx";
