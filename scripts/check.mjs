#!/usr/bin/env node
/**
 * Pre-push safety checker para Insumind.
 *
 * Detecta dos clases de errores antes del build de Docker:
 *   1. Páginas públicas con queries a DB que no tienen force-dynamic ni generateStaticParams
 *      → provocan ECONNREFUSED durante `next build` en el Dockerfile
 *   2. Errores de TypeScript (tsc --noEmit)
 *   3. Errores de ESLint (npm run lint)
 *
 * Uso:  npm run check
 * Salida: exit code 0 = todo OK, 1 = hay errores
 */

import { execSync }                        from 'child_process'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, relative }                  from 'path'
import { fileURLToPath }                   from 'url'

const ROOT = join(fileURLToPath(import.meta.url), '../..')
let failures = 0

const GREEN  = '\x1b[32m'
const RED    = '\x1b[31m'
const YELLOW = '\x1b[33m'
const BOLD   = '\x1b[1m'
const RESET  = '\x1b[0m'

function section(title) {
  console.log(`\n${BOLD}── ${title}${RESET}`)
}
function ok(msg) {
  console.log(`  ${GREEN}✓${RESET} ${msg}`)
}
function warn(msg, detail) {
  console.log(`  ${YELLOW}⚠${RESET}  ${msg}`)
  if (detail) console.log(`     ${detail}`)
  failures++
}
function err(msg, lines = []) {
  console.log(`  ${RED}✗${RESET} ${msg}`)
  lines.slice(0, 25).forEach(l => console.log(`    ${l}`))
  failures++
}

// ─── 1. Páginas públicas sin force-dynamic ────────────────────────────────────
section('Páginas públicas con DB: force-dynamic / generateStaticParams')

const DB_PATTERNS   = [/Action\s*\(/, /prisma\./, /findMany/, /findUnique/, /findFirst/]
const HAS_DYNAMIC   = /export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/
const HAS_STATIC_GEN = /generateStaticParams/

function* walkPages(dir) {
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return }
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) yield* walkPages(full)
    else if (e.name === 'page.tsx' || e.name === 'page.ts') yield full
  }
}

let dynamicOk = true
const publicDir = join(ROOT, 'app', '(public)')
for (const pagePath of walkPages(publicDir)) {
  const rel     = relative(ROOT, pagePath).replace(/\\/g, '/')
  const content = readFileSync(pagePath, 'utf8')

  const hasDb      = DB_PATTERNS.some(p => p.test(content))
  const hasDynamic = HAS_DYNAMIC.test(content)
  const hasStaticGen = HAS_STATIC_GEN.test(content)

  if (hasDb && !hasDynamic && !hasStaticGen) {
    warn(rel, 'falta: export const dynamic = \'force-dynamic\'  ← romperá el build Docker')
    dynamicOk = false
  }
}
if (dynamicOk) ok('Todas las páginas públicas con DB están correctamente configuradas')

// ─── 2. TypeScript ────────────────────────────────────────────────────────────
section('TypeScript  (tsc --noEmit)')
try {
  execSync('npx tsc --noEmit', { cwd: ROOT, stdio: 'pipe' })
  ok('Sin errores de tipos')
} catch (e) {
  const raw = (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '')
  err('Errores de TypeScript', raw.trim().split('\n').filter(Boolean))
}

// ─── 3. ESLint ────────────────────────────────────────────────────────────────
section('ESLint')
const eslintBin = join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? 'eslint.cmd' : 'eslint')
const eslintAvailable = existsSync(eslintBin)

if (!eslintAvailable) {
  console.log(`  ${YELLOW}–${RESET}  ESLint no instalado — instala con: npm i -D eslint @eslint/eslintrc`)
} else {
  try {
    execSync(`"${eslintBin}" .`, { cwd: ROOT, stdio: 'pipe' })
    ok('Sin errores de lint')
  } catch (e) {
    const raw = (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '')
    const lines = raw.trim().split('\n').filter(l => l && !l.includes('npm warn') && !l.includes('npm notice'))
    err('Errores de ESLint', lines)
  }
}

// ─── Resumen ──────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(52))
if (failures === 0) {
  console.log(`${GREEN}${BOLD}✅  Todo OK — listo para subir${RESET}`)
  process.exit(0)
} else {
  console.log(`${RED}${BOLD}❌  ${failures} problema(s) encontrado(s) — corrige antes de subir${RESET}`)
  process.exit(1)
}
