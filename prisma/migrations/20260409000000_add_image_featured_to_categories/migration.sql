-- AlterTable: agregar imageAlt y featured a categories
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "imageAlt" TEXT;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "categories_featured_idx" ON "categories"("featured");
