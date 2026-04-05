#!/bin/sh
set -e

echo "⏳ Esperando base de datos PostgreSQL..."

# Espera hasta que Postgres acepte conexiones
until pg_isready -h "$PGHOST" -p "${PGPORT:-5432}" -U "$PGUSER" -q; do
  echo "   DB no lista — reintentando en 2s..."
  sleep 2
done

echo "✅ Base de datos lista"

echo "🔧 Creando/actualizando tablas..."
psql "$DATABASE_URL" -f /app/docker/init.sql -v ON_ERROR_STOP=1
echo "✅ Tablas sincronizadas"

echo "🚀 Iniciando Next.js..."
exec node server.js
