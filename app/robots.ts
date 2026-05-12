import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/categorias/",
          "/productos/",
          "/marcas/",
          "/reclamaciones",
          "/api/",
          "/login",
        ],
      },
      // Crawlers de IA — permitidos para recuperación y citación (no entrenamiento)
      { userAgent: "GPTBot",            allow: "/" },
      { userAgent: "ClaudeBot",         allow: "/" },
      { userAgent: "Google-Extended",   allow: "/" },
      { userAgent: "PerplexityBot",     allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider",        allow: "/" },
    ],
    sitemap: "https://insumindperu.pe/sitemap.xml",
  }
}
