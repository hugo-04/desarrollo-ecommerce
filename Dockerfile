# ================================================================
# Electro Thina — Dockerfile optimizado para producción
#
# Estrategia de caché en 3 etapas:
#   1. deps    → instala node_modules + genera cliente Prisma
#                (se cachea si package*.json o schema.prisma no cambian)
#   2. builder → compila Next.js
#                (se cachea si el código fuente no cambia)
#   3. runner  → imagen mínima de producción
# ================================================================

# ── Etapa 1: Dependencias ────────────────────────────────────
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci --frozen-lockfile --no-audit --no-fund

# Genera el cliente Prisma cacheado junto con node_modules:
# solo se re-ejecuta si package.json o schema.prisma cambian
RUN npx prisma generate

# ── Etapa 2: Build ───────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build de producción (output: standalone en next.config.mjs)
RUN npm run build

# Compila el seed a JS puro para que corra en el runner sin tsx
RUN npx esbuild prisma/seed.ts \
      --bundle \
      --platform=node \
      --external:@prisma/client \
      --outfile=seed.cjs

# ── Etapa 3: Runner (imagen final mínima) ────────────────────
FROM node:22-alpine AS runner

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

# Prisma CLI copiado del builder (engines ya compilados para Linux, ownership correcto)
# Se llama via "node node_modules/prisma/build/index.js" para que __dirname apunte
# al directorio correcto donde viven los archivos .wasm
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma  ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Migraciones
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma/migrations    ./prisma/migrations

# Seed compilado y entrypoint
COPY --from=builder --chown=nextjs:nodejs /app/seed.cjs ./seed.cjs
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

USER nextjs

EXPOSE 3000

CMD ["./docker-entrypoint.sh"]
