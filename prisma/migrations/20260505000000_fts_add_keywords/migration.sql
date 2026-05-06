-- ============================================================
-- Migración: Incluir keywords en el search_vector de productos
-- ============================================================
-- El trigger anterior solo indexaba name (A) y description (D).
-- Ahora se añaden las keywords con peso B (alta relevancia):
--   Peso A → name
--   Peso B → keywords (frases clave definidas en admin)
--   Peso D → description
--
-- array_to_string(keywords, ' ') convierte el array a texto para tsvector.
-- El trigger se actualiza para dispararse también en cambios de keywords.
-- ============================================================

-- ── 1. Actualizar función del trigger ────────────────────────
CREATE OR REPLACE FUNCTION products_search_vector_update()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', unaccent(coalesce(NEW.name, ''))), 'A') ||
    setweight(to_tsvector('simple', unaccent(coalesce(array_to_string(NEW.keywords, ' '), ''))), 'B') ||
    setweight(to_tsvector('simple', unaccent(coalesce(NEW.description, ''))), 'D');
  RETURN NEW;
END;
$$;

-- ── 2. Actualizar trigger para incluir keywords ───────────────
DROP TRIGGER IF EXISTS products_search_vector_trigger ON products;

CREATE TRIGGER products_search_vector_trigger
  BEFORE INSERT OR UPDATE OF name, description, keywords
  ON products
  FOR EACH ROW
  EXECUTE FUNCTION products_search_vector_update();

-- ── 3. Re-poblar filas existentes con las keywords ────────────
UPDATE products
SET search_vector =
  setweight(to_tsvector('simple', unaccent(coalesce(name, ''))), 'A') ||
  setweight(to_tsvector('simple', unaccent(coalesce(array_to_string(keywords, ' '), ''))), 'B') ||
  setweight(to_tsvector('simple', unaccent(coalesce(description, ''))), 'D');
