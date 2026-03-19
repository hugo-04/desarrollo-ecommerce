/**
 * DATA LAYER — Entry point
 *
 * Currently exports mock data directly.
 * When migrating to a real DB/API, replace the mock imports
 * with your repository/service calls — the rest of the app stays unchanged.
 *
 * Backward-compatible: all previous `import { products } from "@/lib/data"`
 * should now be `import { products } from "@/lib/data"` pointing here.
 */

export { MOCK_PRODUCTS as products } from "./mock/products.mock"
export { MOCK_CATEGORIES as categories } from "./mock/categories.mock"
export { MOCK_BRANDS as brands } from "./mock/brands.mock"
export { MOCK_CLIENTS as clients } from "./mock/clients.mock"
export { MOCK_TESTIMONIALS as testimonials } from "./mock/testimonials.mock"

// Static UI content (texts, labels, arrays shown in sections)
export * from "./mock/static-content.mock"
