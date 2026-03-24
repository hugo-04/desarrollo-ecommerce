# MIGRACIÓN A POSTGRESQL + S3 COMPLETADA

Esta guía documenta los pasos y la arquitectura habilitada para usar PostgreSQL real a través de Prisma y AWS S3 para el almacenamiento de archivos, reemplazando completamente el JSON mock en local. 

## 1. Arquitectura de Almacenamiento (Base de Datos)

Se adaptó el proyecto completo al uso de **Prisma ORM** con la base de datos **PostgreSQL**.

- **Estructura de Entidades**: Las entidades están definidas en `prisma/schema.prisma` respetando los contratos y tipos del frontend (`Product`, `Category`, `BrandDTO`).
- **Campos JSON**: Los arrays de especificaciones y la galería se almacenan natively en PostgreSQL, mientras que `technicalSpecs` (etiqueta y valor) utiliza el tipo abstracto JSONB (`Json?` en prisma) para mayor eficacia sin tener que manejar complejas tablas adjuntas o joins innecesarios.
- **Repositorios**: Se crearon `DbProductRepository`, `DbCategoryRepository` y `DbBrandRepository` en sus respectivos paths en `features/*`. Estos ejecutan todas las consultas a la base de datos (con filtrado nativo ILIKE ignorando acentos/mayúsculas gracias al tag `insensitive` de prisma).
- **Semilla (Seed)**: Todo tu mock data actual se migró mediante `npx prisma db seed`, permitiendo que la UI y catálogo no resientan el cambio (incluido el usuario admin inicial).

### Comandos de Base de Datos para el Futuro:
Solo necesitas estos comandos cuando modifiques la base de datos a futuro.
1. **Para sincronizar el schema con tu base local si haces cambios al `schema.prisma`:**
   ```bash
   npx prisma db push
   ```
   *(También puedes usar `npx prisma migrate dev --name <nombre_migracion>` si prefieres historial estricto).*
2. **Para volver a popular/restaurar los datos de prueba / admins iniciales:**
   ```bash
   npx prisma db seed
   ```

## 2. Autenticación (Middleware & JWT Base de Datos)
La plataforma ahora utiliza validación real conectada a la base de datos:

- Se utiliza **JWT (Json Web Tokens)** con la librería Edge-ready `jose`.
- Cuando el usuario intenta logearse, el sistema busca en la tabla `AdminUser` (creado mediante tu semilla predeterminada) usando la cuenta y encriptación robusta por medio de **bcrypt** para no almacenar el texto plano en base.
- **Middleware**: Se extrajo la capa lógica y se ubicó siguiendo las mejores prácticas en la subcarpeta `lib/middleware/auth.ts`, protegiendo de golpe todas las rutas bajo `/dashboard`, `/categorias`, `/marcas` y `/productos`. Todo acceso rechazado redirigirá al `/login` automáticamente.

*(El admin por defecto creado con el seed es: `admin@electrothina.com` / Contraseña: `admin`)*.

## 3. Integración AWS S3 para Archivos Subidos
Las directivas descritas prevén que subas archivos y se integren a la base de datos:

- El flujo definido implica que utilices las librerías construidas dentro de `lib/storage/s3.ts`.
- Las creaciones ya no utilizan archivos locales ni temporales; al editar o crear productos (`updateProductAction(data)`) desde el backend administrativo, debes proporcionarle la **URL final de imagen retormada por S3** una vez alojado en el bucket.
- Por diseño y buenas prácticas, la imagen *se guarda primero a S3 (mediante el endpoint route de upload que tengas o crees en admin)*; éste te devolverá `https://tu-bucket.s3.../archivo.jpg`, que se envía en un string plano como atributo de las funciones de acciones server-side (y posteriormente introducido a Postgres). Esto permite que el componente base `ProductCard` las exponga naturalmente.

## 4. Levantar el entorno Local desde Cero (Docker)
Si cambias de computadora o se reinician tus contenedores:

1. Levanta el Docker de PostgreSQL proporcionado:
   ```bash
   docker compose up -d
   ```
2. Corre en terminal la migración inicial o sincronización rápida:
   ```bash
   npx prisma db push
   ```
3. Ejecutar el llenado inicial de datos (que carga Categorías, Marcas, el usuario Admin y Productos con sus fotos asociadas):
   ```bash
   npx prisma db seed
   ```
4. Levanta el desarrollo local de NextJS:
   ```bash
   npm run dev
   ```
