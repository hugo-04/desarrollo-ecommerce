/** @type {import('next').NextConfig} */

// Lee orígenes permitidos para Server Actions desde ALLOWED_ORIGINS (CSV, sin protocolo).
// Ejemplo en .env: ALLOWED_ORIGINS=electrothina.com,www.electrothina.com
const extraOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const nextConfig = {
  output: "standalone", // Genera build auto-contenido para Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.electrothina.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", ...extraOrigins],
    },
  },
}

export default nextConfig
