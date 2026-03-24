-- DropIndex
DROP INDEX "brands_name_trgm_idx";

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

-- CreateIndex
CREATE INDEX "brands_showInCarousel_idx" ON "brands"("showInCarousel");

-- CreateIndex
CREATE INDEX "products_featured_idx" ON "products"("featured");

-- CreateIndex
CREATE INDEX "products_bestSeller_idx" ON "products"("bestSeller");

-- CreateIndex
CREATE INDEX "products_featured_bestSeller_idx" ON "products"("featured", "bestSeller");

-- RenameIndex
ALTER INDEX "categories_count_desc_idx" RENAME TO "categories_count_idx";

-- RenameIndex
ALTER INDEX "products_brand_id_idx" RENAME TO "products_brandId_idx";

-- RenameIndex
ALTER INDEX "products_category_id_idx" RENAME TO "products_categoryId_idx";

-- RenameIndex
ALTER INDEX "products_rating_desc_idx" RENAME TO "products_rating_idx";
