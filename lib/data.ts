/**
 * BACKWARD-COMPATIBLE RE-EXPORT
 *
 * All imports like `import { products } from "@/lib/data"` continue to work.
 * The actual data now lives in lib/data/ (split by entity).
 *
 * @deprecated Use `@/lib/data/index` for new imports.
 */
export { products, categories, brands, clients, testimonials } from "./data/index"
