-- ================================================================
-- Electro Thina — Script de inicialización de base de datos
-- Idempotente: IF NOT EXISTS en tablas e índices.
-- Los nombres de índices coinciden exactamente con los generados
-- por Prisma para que no haya conflictos en despliegues.
-- ================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Administradores ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id              SERIAL PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  "passwordHash"  TEXT NOT NULL,
  "isActive"      BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Columna isActive puede no existir en instancias previas — agregar si falta
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT TRUE;

-- Eliminar usuarios anteriores que ya no deben existir
DELETE FROM admin_users WHERE email = 'admin@electrothina.com';

-- Usuario administrador principal — hash generado por pgcrypto en tiempo de ejecución
INSERT INTO admin_users (email, "passwordHash", "isActive")
VALUES (
  'electrothina123@gmail.com',
  crypt('ElectroThina26', gen_salt('bf', 12)),
  TRUE
)
ON CONFLICT (email) DO UPDATE
  SET "passwordHash" = crypt('ElectroThina26', gen_salt('bf', 12)),
      "isActive"     = TRUE;

-- ── Categorías ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL UNIQUE,
  slug            TEXT NOT NULL UNIQUE,
  image           TEXT NOT NULL DEFAULT '',
  color           TEXT NOT NULL DEFAULT '#1C2870',
  subcategories   TEXT[] NOT NULL DEFAULT '{}',
  count           INT NOT NULL DEFAULT 0,
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS categories_count_desc_idx ON categories (count DESC);

-- ── Marcas ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL UNIQUE,
  logo             TEXT NOT NULL DEFAULT '',
  "logoAlt"        TEXT,
  "showInCarousel" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt"      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "brands_showInCarousel_idx" ON brands ("showInCarousel");

-- ── Productos ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                SERIAL PRIMARY KEY,
  sku               TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  description       TEXT NOT NULL DEFAULT '',
  "fullDescription" TEXT NOT NULL DEFAULT '',
  image             TEXT NOT NULL DEFAULT '',
  "imageAlt"        TEXT,
  gallery           TEXT[] NOT NULL DEFAULT '{}',
  "galleryAlts"     TEXT[] NOT NULL DEFAULT '{}',
  specs             TEXT[] NOT NULL DEFAULT '{}',
  "fichaTecnica"    TEXT,
  featured          BOOLEAN NOT NULL DEFAULT FALSE,
  "bestSeller"      BOOLEAN NOT NULL DEFAULT FALSE,
  rating            FLOAT NOT NULL DEFAULT 4.5,
  "categoryId"      INT NOT NULL REFERENCES categories(id),
  "brandId"         INT NOT NULL REFERENCES brands(id),
  "technicalSpecs"  JSONB,
  "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS products_category_id_idx   ON products ("categoryId");
CREATE INDEX IF NOT EXISTS products_brand_id_idx      ON products ("brandId");
CREATE INDEX IF NOT EXISTS products_featured_idx      ON products (featured);
CREATE INDEX IF NOT EXISTS products_bestseller_idx    ON products ("bestSeller");
CREATE INDEX IF NOT EXISTS products_feat_best_idx     ON products (featured, "bestSeller");
CREATE INDEX IF NOT EXISTS products_rating_desc_idx   ON products (rating DESC);

-- ── Libro de Reclamaciones (Ley N° 29571 — INDECOPI) ─────────
CREATE TABLE IF NOT EXISTS reclamaciones (
  id           SERIAL PRIMARY KEY,
  nombres      TEXT NOT NULL,
  apellidos    TEXT NOT NULL,
  "tipoDoc"    TEXT NOT NULL,
  "nroDoc"     TEXT NOT NULL,
  domicilio    TEXT NOT NULL DEFAULT '',
  email        TEXT NOT NULL,
  telefono     TEXT NOT NULL DEFAULT '',
  tipo         TEXT NOT NULL,
  "tipoBien"   TEXT NOT NULL,
  descripcion  TEXT NOT NULL,
  pedido       TEXT NOT NULL,
  estado       TEXT NOT NULL DEFAULT 'PENDIENTE',
  respuesta    TEXT,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS reclamaciones_estado_idx  ON reclamaciones (estado);
CREATE INDEX IF NOT EXISTS reclamaciones_created_idx ON reclamaciones ("createdAt" DESC);
