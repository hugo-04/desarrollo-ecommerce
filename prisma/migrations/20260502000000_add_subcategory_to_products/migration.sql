-- Agrega subcategoryId (opcional) al modelo Product
-- Los productos existentes quedan con NULL (sin subcategoría asignada)

ALTER TABLE "products"
  ADD COLUMN "subcategoryId" INTEGER;

ALTER TABLE "products"
  ADD CONSTRAINT "products_subcategoryId_fkey"
  FOREIGN KEY ("subcategoryId")
  REFERENCES "subcategories"("id")
  ON DELETE SET NULL
  ON UPDATE CASCADE;

CREATE INDEX "products_subcategoryId_idx" ON "products"("subcategoryId");
