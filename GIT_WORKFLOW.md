# Guía de Trabajo con Git — Subir Cambios y Fusionar Ramas

## ¿Por qué seguir este flujo?

Este proyecto usa tres ramas principales:

- **`mario`** → aquí es donde tú trabajas y haces tus cambios diarios
- **`dev`** → rama de integración donde se juntan los cambios de todos antes de ir a producción
- **`main`** → rama de producción, solo recibe código estable y probado

El flujo es siempre: `mario` → `dev` → `main`. Nunca se trabaja directamente en `dev` ni en `main`.

---

## Parte 1: Subir tus cambios a tu rama `mario`

### Paso 1 — Verifica en qué rama estás

Antes de hacer cualquier cosa, confirma que estás trabajando en tu rama y no en otra.

```bash
git branch
```

El resultado mostrará todas las ramas locales y marcará con `*` la rama activa. Debe decir `* mario`. Si no es así, cámbiate con:

```bash
git checkout mario
```

---

### Paso 2 — Revisa qué archivos cambiaste

Este comando te muestra un resumen de todo lo que modificaste desde el último commit.

```bash
git status
```

Los archivos en **rojo** son cambios que aún no has preparado para guardar. Los archivos en **verde** ya están listos para el commit. Si ves archivos que no debías haber tocado, revísalos antes de continuar.

---

### Paso 3 — Prepara los archivos que quieres guardar (staging)

Git no guarda automáticamente todo lo que modificas. Primero debes decirle qué archivos quieres incluir en el próximo commit. Esto se llama "staging".

```bash
# Opción A: agregar todos los archivos modificados de una vez
git add .

# Opción B: agregar solo un archivo específico (más seguro y preciso)
git add src/components/MiComponente.tsx
```

> **Recomendación:** Si trabajaste en varias cosas distintas, es mejor agregar archivo por archivo para hacer commits más organizados. Por ejemplo, si cambiaste el header y también arreglaste un bug en el login, haz dos commits separados.

---

### Paso 4 — Crea el commit

Un commit es como una "foto" del estado de tu código en ese momento. Cada commit debe tener un mensaje que explique qué hiciste y por qué.

```bash
git commit -m "feat: agregar filtro por categoría en el catálogo"
```

**Guía para escribir buenos mensajes de commit:**

| Prefijo | Cuándo usarlo |
|---|---|
| `feat:` | Cuando agregas una funcionalidad nueva |
| `fix:` | Cuando corriges un error o bug |
| `style:` | Cambios visuales (colores, tamaños, espaciado) |
| `refactor:` | Cuando reorganizas código sin cambiar su comportamiento |
| `docs:` | Cuando modificas documentación o comentarios |
| `chore:` | Tareas menores como actualizar dependencias |

> **Importante:** Nunca dejes el mensaje vacío ni escribas algo como "cambios" o "update". Un buen mensaje te ayudará a ti y al equipo a entender qué se hizo semanas después.

---

### Paso 5 — Sube tus cambios a GitHub

Este comando envía tus commits locales al repositorio en GitHub para que estén respaldados y el equipo los pueda ver.

```bash
git push origin mario
```

> Si es la **primera vez** que subes esta rama al remoto, usa este comando en su lugar:
> ```bash
> git push -u origin mario
> ```
> El `-u` crea el vínculo entre tu rama local y la rama remota para que los próximos push sean más simples.

Después de hacer push, puedes entrar a [github.com/cornejosonia58-bit/insumind](https://github.com/cornejosonia58-bit/insumind) y verás tu rama `mario` con los cambios subidos.

---

## Parte 2: Fusionar tus cambios en `dev`

Cuando ya terminaste una funcionalidad o corrección y está lista para que el equipo la vea, toca fusionar tu rama `mario` en `dev`.

### Paso 1 — Cámbiate a la rama `dev`

```bash
git checkout dev
```

---

### Paso 2 — Trae los últimos cambios remotos de `dev`

Es posible que otros miembros del equipo hayan subido cambios a `dev` mientras tú trabajabas. Antes de fusionar, debes actualizar tu `dev` local para evitar conflictos.

```bash
git pull origin dev
```

Si ves el mensaje `Already up to date`, significa que nadie más subió cambios y puedes continuar. Si descarga cambios nuevos, Git los integrará automáticamente.

---

### Paso 3 — Fusiona tu rama `mario` en `dev`

```bash
git merge mario
```

Git tomará todos los commits de `mario` que aún no están en `dev` y los aplicará. Si todo va bien, verás un mensaje de éxito.

**¿Qué pasa si hay conflictos?**

A veces dos personas modificaron el mismo archivo en el mismo lugar. Git no sabe cuál versión conservar y marca el archivo con conflicto. Verás algo así dentro del archivo:

```
<<<<<<< HEAD
código que está en dev
=======
código que está en mario
>>>>>>> mario
```

Debes abrir ese archivo, decidir qué código conservar (o combinar ambos), eliminar las marcas `<<<<<<<`, `=======` y `>>>>>>>`, guardar el archivo y luego hacer:

```bash
git add archivo-con-conflicto.ts
git commit -m "merge: resolver conflicto en archivo-con-conflicto.ts"
```

---

### Paso 4 — Sube `dev` actualizado a GitHub

```bash
git push origin dev
```

---

## Parte 3: Fusionar `dev` en `main` (solo cuando el código esté listo para producción)

Este paso solo se hace cuando el equipo decide que `dev` está estable y probado. No se debe hacer con código a medias o sin haber probado.

### Paso 1 — Cámbiate a `main`

```bash
git checkout main
```

---

### Paso 2 — Actualiza tu `main` local

```bash
git pull origin main
```

---

### Paso 3 — Fusiona `dev` en `main`

```bash
git merge dev
```

---

### Paso 4 — Sube `main` a GitHub

```bash
git push origin main
```

A partir de este momento, los cambios están en producción.

---

## Resumen visual del flujo

```
Tu computadora                    GitHub
─────────────────                 ──────────────────────
 rama mario                        rama mario (remoto)
   │  git push origin mario  →        │
   │                                  │
   │  git checkout dev                │
   │  git pull origin dev   ←─────────┤
   │  git merge mario                 │
   │  git push origin dev   ──────────┤──→  rama dev (remoto)
   │                                  │
   │  git checkout main               │
   │  git pull origin main  ←─────────┤
   │  git merge dev                   │
   │  git push origin main  ──────────┴──→  rama main (remoto)
```

---

## Comandos de referencia rápida

| Comando | Para qué sirve |
|---|---|
| `git branch` | Ver en qué rama estás |
| `git branch -a` | Ver todas las ramas, incluidas las remotas |
| `git status` | Ver qué archivos cambiaste |
| `git diff` | Ver exactamente qué líneas cambiaron |
| `git log --oneline -10` | Ver los últimos 10 commits |
| `git stash` | Guardar cambios temporalmente sin hacer commit (útil si necesitas cambiar de rama de urgencia) |
| `git stash pop` | Recuperar los cambios guardados con stash |
