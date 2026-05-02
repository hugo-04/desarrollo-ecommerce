-- CreateTable: modelo Subcategory
CREATE TABLE "subcategories" (
    "id"        SERIAL       NOT NULL,
    "name"      TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: nombre único
CREATE UNIQUE INDEX "subcategories_name_key" ON "subcategories"("name");
CREATE INDEX "subcategories_name_idx" ON "subcategories"("name");

-- CreateTable: join table implícita many-to-many
CREATE TABLE "_CategoryToSubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToSubcategory_A_fkey"
        FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToSubcategory_B_fkey"
        FOREIGN KEY ("B") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "_CategoryToSubcategory_AB_unique" ON "_CategoryToSubcategory"("A" ASC, "B" ASC);
CREATE INDEX "_CategoryToSubcategory_B_index" ON "_CategoryToSubcategory"("B");

-- Migrar datos existentes desde el array de strings
DO $$
DECLARE
  cat_id  INTEGER;
  sub_nm  TEXT;
  sub_id  INTEGER;
BEGIN
  FOR cat_id, sub_nm IN
    SELECT c.id, unnest(c.subcategories)
    FROM categories c
    WHERE array_length(c.subcategories, 1) > 0
  LOOP
    sub_nm := TRIM(sub_nm);
    CONTINUE WHEN sub_nm = '';

    INSERT INTO subcategories (name, "updatedAt")
      VALUES (sub_nm, NOW())
      ON CONFLICT (name) DO NOTHING;

    SELECT id INTO sub_id FROM subcategories WHERE name = sub_nm;

    INSERT INTO "_CategoryToSubcategory" ("A", "B")
      VALUES (cat_id, sub_id)
      ON CONFLICT ("A", "B") DO NOTHING;
  END LOOP;
END $$;

-- Eliminar columna antigua
ALTER TABLE "categories" DROP COLUMN IF EXISTS "subcategories";
