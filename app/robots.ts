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
    ],
    sitemap: "https://electrothina.com/sitemap.xml",
  }
}
