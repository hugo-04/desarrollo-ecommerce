/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Genera build auto-contenido para Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.brs.devtunnels.ms",
        "*.devtunnels.ms",
      ],
    },
  },
}

export default nextConfig
