-- ============================================================
-- Migración: Full-Text Search (FTS) con tsvector en productos
-- ============================================================
-- Estrategia:
--   A) unaccent: normaliza acentos (aislación = aislacion)
--   B) search_vector: columna pre-calculada con pesos por relevancia
--        Peso A → name (más importante)
--        Peso D → description (complementario)
--   C) GIN index sobre search_vector → búsquedas O(log n), no O(n)
--   D) Trigger: mantiene search_vector sincronizado automáticamente
--
-- Marca y categoría se computan en la query (están en otras tablas).
-- Diccionario 'simple': sin stemming → ideal para nombres de productos
--   y marcas técnicas (aislador, NEMA, IEC, etc.)
-- ============================================================

-- ── 1. Extensiones ───────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ── 2. Columna search_vector ─────────────────────────────────
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- ── 3. Poblar filas existentes ───────────────────────────────
UPDATE products
SET search_vector =
  setweight(to_tsvector('simple', unaccent(coalesce(name, ''))), 'A') ||
  setweight(to_tsvector('simple', unaccent(coalesce(description, ''))), 'D');

-- ── 4. GIN index (fast @@ lookup) ───────────────────────────
CREATE INDEX IF NOT EXISTS products_search_vector_gin_idx
  ON products USING GIN(search_vector);

-- ── 5. Función del trigger ────────────────────────────────────
CREATE OR REPLACE FUNCTION products_search_vector_update()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', unaccent(coalesce(NEW.name, ''))), 'A') ||
    setweight(to_tsvector('simple', unaccent(coalesce(NEW.description, ''))), 'D');
  RETURN NEW;
END;
$$;

-- ── 6. Trigger: auto-update en INSERT y UPDATE ───────────────
DROP TRIGGER IF EXISTS products_search_vector_trigger ON products;

CREATE TRIGGER products_search_vector_trigger
  BEFORE INSERT OR UPDATE OF name, description
  ON products
  FOR EACH ROW
  EXECUTE FUNCTION products_search_vector_update();
