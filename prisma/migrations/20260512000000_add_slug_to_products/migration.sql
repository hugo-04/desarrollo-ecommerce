-- Agrega columna slug a products para URLs SEO-friendly /producto/[id]/[slug]
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "slug" TEXT UNIQUE;

-- Poblar slugs de productos existentes usando unaccent + regexp
UPDATE "products"
SET slug = lower(
  regexp_replace(
    regexp_replace(unaccent(name), '[^a-zA-Z0-9\s-]', '', 'g'),
    '[\s-]+', '-', 'g'
  )
)
WHERE slug IS NULL;
