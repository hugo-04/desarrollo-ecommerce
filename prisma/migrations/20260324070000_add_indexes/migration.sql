-- ============================================================
-- Migración: índices de rendimiento para búsqueda y filtrado
-- ============================================================

-- ── 1. Extensión pg_trgm ─────────────────────────────────
-- Habilita índices GIN de trigramas para ILIKE muy rápido.
-- Nativa de PostgreSQL, no requiere instalar nada extra.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ── 2. Índices GIN de trigramas en productos ─────────────
-- Aceleran las queries ILIKE que genera Prisma con
-- contains + mode: "insensitive" en el buscador del catálogo.
CREATE INDEX IF NOT EXISTS products_name_trgm_idx
  ON products USING gin(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS products_sku_trgm_idx
  ON products USING gin(sku gin_trgm_ops);

CREATE INDEX IF NOT EXISTS products_description_trgm_idx
  ON products USING gin(description gin_trgm_ops);

-- ── 3. Índices GIN en marcas y categorías ────────────────
CREATE INDEX IF NOT EXISTS brands_name_trgm_idx
  ON brands USING gin(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS categories_name_trgm_idx
  ON categories USING gin(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS categories_slug_trgm_idx
  ON categories USING gin(slug gin_trgm_ops);

-- ── 4. Índices B-tree para relaciones y filtros ──────────
-- Nota: los nombres de columna en Prisma/PostgreSQL son camelCase
-- y deben ir entre comillas dobles para preservar el casing.

-- FK joins producto → categoría / marca (aceleran los include: { category, brand })
CREATE INDEX IF NOT EXISTS products_category_id_idx ON products("categoryId");
CREATE INDEX IF NOT EXISTS products_brand_id_idx    ON products("brandId");

-- Filtros booleanos — índices parciales (solo almacenan las filas true)
CREATE INDEX IF NOT EXISTS products_featured_idx
  ON products(featured) WHERE featured = true;

CREATE INDEX IF NOT EXISTS products_bestseller_idx
  ON products("bestSeller") WHERE "bestSeller" = true;

-- Sort por rating descendente
CREATE INDEX IF NOT EXISTS products_rating_desc_idx ON products(rating DESC);

-- Carrusel de marcas — índice parcial (solo las marcas activas)
CREATE INDEX IF NOT EXISTS brands_carousel_idx
  ON brands("showInCarousel") WHERE "showInCarousel" = true;

-- Categorías por popularidad (home grid muestra las más cargadas primero)
CREATE INDEX IF NOT EXISTS categories_count_desc_idx ON categories(count DESC);
