-- DailyView: tracking de visitas agregadas por ruta y día
CREATE TABLE IF NOT EXISTS "daily_views" (
  "id"    SERIAL PRIMARY KEY,
  "path"  TEXT        NOT NULL,
  "date"  DATE        NOT NULL,
  "count" INTEGER     NOT NULL DEFAULT 1,
  CONSTRAINT "daily_views_path_date_key" UNIQUE ("path", "date")
);
CREATE INDEX IF NOT EXISTS "daily_views_date_idx" ON "daily_views" ("date" DESC);

-- imageTitle para productos y categorías (tooltip + SEO on-page)
ALTER TABLE "products"   ADD COLUMN IF NOT EXISTS "imageTitle"  TEXT;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "imageTitle"  TEXT;
