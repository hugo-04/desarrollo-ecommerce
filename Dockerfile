# ================================================================
# Electro Thina — Dockerfile optimizado para producción
#
# Estrategia de caché en 3 etapas:
#   1. deps    → instala node_modules (se cachea si package*.json no cambia)
#   2. builder → compila Next.js     (se cachea si el código no cambia)
#   3. runner  → imagen mínima de producción
#
# Resultado: si solo cambiás código fuente, Docker reutiliza la capa
# de node_modules y solo reconstruye la etapa builder (~2 min vs ~8 min).
# ================================================================

# ── Etapa 1: Dependencias ────────────────────────────────────
FROM node:20-alpine AS deps

# postgresql-client para pg_isready y psql en el entrypoint
RUN apk add --no-cache libc6-compat postgresql-client

WORKDIR /app

# Copiar SOLO los archivos de dependencias primero
# Docker cachea esta capa hasta que package.json o el lockfile cambien
COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci --frozen-lockfile

# ── Etapa 2: Build ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Genera el cliente Prisma para la plataforma Linux del contenedor
RUN npx prisma generate

# Build de producción (output: standalone en next.config.mjs)
RUN npm run build

# Compila el seed a JS puro para que corra en el runner sin tsx
RUN npx esbuild prisma/seed.ts \
      --bundle \
      --platform=node \
      --external:@prisma/client \
      --outfile=seed.cjs

# Compila prisma.config.ts a JS para que migrate deploy funcione en el runner sin tsx
RUN npx esbuild prisma.config.ts \
      --bundle \
      --platform=node \
      --packages=external \
      --outfile=prisma.config.cjs

# ── Etapa 3: Runner (imagen final mínima) ────────────────────
FROM node:20-alpine AS runner

RUN apk add --no-cache postgresql-client openssl

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Archivos estáticos públicos
COPY --from=builder /app/public ./public

# Build standalone (auto-contenido, sin node_modules completos)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma CLI + migraciones (para migrate deploy automático en cada deploy)
RUN npm install --global prisma@7 --ignore-scripts
COPY --from=builder /app/prisma/schema.prisma  ./prisma/schema.prisma
COPY --from=builder /app/prisma/migrations     ./prisma/migrations
COPY --from=builder /app/prisma.config.cjs     ./prisma.config.cjs

# Seed compilado y entrypoint
COPY --from=builder --chown=nextjs:nodejs /app/seed.cjs ./seed.cjs
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

USER nextjs

EXPOSE 3000

CMD ["./docker-entrypoint.sh"]
