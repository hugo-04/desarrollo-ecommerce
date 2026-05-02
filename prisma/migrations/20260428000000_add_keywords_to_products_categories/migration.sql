-- Add keywords array to products and categories for SEO
ALTER TABLE "products"    ADD COLUMN IF NOT EXISTS "keywords" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "categories"  ADD COLUMN IF NOT EXISTS "keywords" TEXT[] NOT NULL DEFAULT '{}';
