-- Migration: remove sku column from products and add unique constraint on name
-- Removes the sku field that is no longer used

ALTER TABLE "products" DROP COLUMN IF EXISTS "sku";

-- Add unique constraint on name (replaces sku as the natural identifier)
ALTER TABLE "products" ADD CONSTRAINT "products_name_key" UNIQUE ("name");
