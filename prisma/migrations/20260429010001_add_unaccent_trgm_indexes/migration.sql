-- ============================================================
-- Índices adicionales para búsqueda FTS + ILIKE optimizada
-- ============================================================
-- unaccent() de PostgreSQL es STABLE, no IMMUTABLE.
-- Los índices de expresión requieren funciones IMMUTABLE.
-- Solución: wrapper IMMUTABLE que delega a unaccent().
-- ============================================================

-- ── Wrapper IMMUTABLE para unaccent ──────────────────────────
-- Es seguro porque unaccent es determinista para el mismo input.
CREATE OR REPLACE FUNCTION f_unaccent(text)
  RETURNS text
  LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT AS
$$SELECT public.unaccent('public.unaccent', $1)$$;

-- ── Índices de expresión: f_unaccent(lower(name)) ────────────
-- Aceleran: ILIKE y word_similarity sobre columnas normalizadas.

CREATE INDEX IF NOT EXISTS products_name_unaccent_trgm_idx
  ON products USING GIN(f_unaccent(lower(name)) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS brands_name_unaccent_trgm_idx
  ON brands USING GIN(f_unaccent(lower(name)) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS categories_name_unaccent_trgm_idx
  ON categories USING GIN(f_unaccent(lower(name)) gin_trgm_ops);

