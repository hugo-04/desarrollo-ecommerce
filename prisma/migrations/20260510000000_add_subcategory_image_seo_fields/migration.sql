-- Migration: add_subcategory_image_seo_fields
-- Agrega campos de imagen y SEO al modelo Subcategory

ALTER TABLE "subcategories"
  ADD COLUMN IF NOT EXISTS "slug"        TEXT,
  ADD COLUMN IF NOT EXISTS "image"       TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "imageAlt"    TEXT,
  ADD COLUMN IF NOT EXISTS "imageTitle"  TEXT,
  ADD COLUMN IF NOT EXISTS "description" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "keywords"    TEXT[] NOT NULL DEFAULT '{}';

-- Backfill slug desde el nombre (slugify básico: minúsculas, tildes removidas, espacios → guión)
UPDATE "subcategories"
SET "slug" = lower(
  regexp_replace(
    regexp_replace(
      translate(
        translate(
          translate(
            translate(
              translate(name, 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunAEIOUUN'),
              'àèìòùÀÈÌÒÙ', 'aeiouAEIOU'
            ),
            'âêîôûÂÊÎÔÛ', 'aeiouAEIOU'
          ),
          'äëïöüÄËÏÖÜ', 'aeiouAEIOU'
        ),
        'ãõÃÕ', 'aoAO'
      ),
      '[^a-zA-Z0-9\s-]', '', 'g'
    ),
    '\s+', '-', 'g'
  )
)
WHERE "slug" IS NULL;

-- Agregar unique constraint en slug (permite NULL para compatibilidad con filas anteriores)
CREATE UNIQUE INDEX IF NOT EXISTS "subcategories_slug_key" ON "subcategories"("slug");
