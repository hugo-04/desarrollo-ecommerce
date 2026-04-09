#!/bin/sh
set -e

echo "⏳ Esperando base de datos PostgreSQL..."

until psql "$DATABASE_URL" -c '\q' > /dev/null 2>&1; do
  echo "   DB no lista — reintentando en 2s..."
  sleep 2
done

echo "✅ Base de datos lista"

echo "🔧 Creando/actualizando tablas..."
psql "$DATABASE_URL" -f /app/docker/init.sql -v ON_ERROR_STOP=1
echo "✅ Tablas sincronizadas"

# Ejecutar seed solo si la BD está vacía (primer deploy)
BRAND_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM brands;" | tr -d ' \n')
if [ "$BRAND_COUNT" = "0" ]; then
  echo "🌱 Ejecutando seed inicial (primera vez)..."
  node /app/seed.cjs
  echo "✅ Seed completado"
else
  echo "ℹ️  Seed omitido — la BD ya tiene datos"
fi

echo "🚀 Iniciando Next.js..."
exec node server.js
