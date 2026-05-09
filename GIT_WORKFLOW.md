# Git Workflow — Subir cambios y fusionar con Dev

## 1. Asegúrate de estar en tu rama `mario`

```bash
git checkout mario
```

---

## 2. Ver qué archivos cambiaron

```bash
git status
```

---

## 3. Agregar los cambios al staging

```bash
# Agregar todos los archivos modificados
git add .

# O agregar un archivo específico
git add ruta/del/archivo.ts
```

---

## 4. Crear el commit

```bash
git commit -m "feat: descripción corta de lo que hiciste"
```

---

## 5. Subir tu rama al repositorio remoto

```bash
git push origin mario
```

> Si es la primera vez que subes esta rama:
> ```bash
> git push -u origin mario
> ```

---

## 6. Fusionar tus cambios en `dev`

```bash
# Cambia a la rama dev
git checkout dev

# Trae los últimos cambios remotos de dev
git pull origin dev

# Fusiona tu rama mario en dev
git merge mario

# Sube dev actualizado al remoto
git push origin dev
```

---

## 7. Fusionar `dev` en `main` (cuando el código esté listo)

```bash
# Cambia a la rama main
git checkout main

# Trae los últimos cambios remotos de main
git pull origin main

# Fusiona dev en main
git merge dev

# Sube main actualizado al remoto
git push origin main
```

---

## Flujo resumido

```
mario  →  dev  →  main
```

1. Trabajas en `mario`
2. Fusionas `mario` → `dev` para integrar con el equipo
3. Cuando `dev` está estable, fusionas `dev` → `main` para producción

---

## Comandos útiles

| Comando | Descripción |
|---|---|
| `git branch` | Ver en qué rama estás |
| `git branch -a` | Ver todas las ramas (locales y remotas) |
| `git log --oneline -10` | Ver los últimos 10 commits |
| `git diff` | Ver cambios no confirmados |
| `git stash` | Guardar cambios temporalmente sin hacer commit |
| `git stash pop` | Recuperar cambios guardados con stash |
