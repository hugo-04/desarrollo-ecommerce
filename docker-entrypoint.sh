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

echo "🚀 Iniciando Next.js..."
exec node server.js
