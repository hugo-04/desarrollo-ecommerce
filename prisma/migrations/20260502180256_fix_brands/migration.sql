/*
  Warnings:

  - You are about to drop the column `brandId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brandId_fkey";

-- DropIndex
DROP INDEX "products_brandId_idx";

-- DropIndex
DROP INDEX "products_search_vector_gin_idx";

-- AlterTable
ALTER TABLE "_CategoryToSubcategory" ADD CONSTRAINT "_CategoryToSubcategory_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryToSubcategory_AB_unique";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "keywords" DROP DEFAULT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brandId",
ALTER COLUMN "keywords" DROP DEFAULT;

-- CreateTable
CREATE TABLE "_BrandToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BrandToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BrandToProduct_B_index" ON "_BrandToProduct"("B");

-- AddForeignKey
ALTER TABLE "_BrandToProduct" ADD CONSTRAINT "_BrandToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandToProduct" ADD CONSTRAINT "_BrandToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
