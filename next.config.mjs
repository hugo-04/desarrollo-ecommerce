/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Genera build auto-contenido para Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-56324bc94fe8499080e4ab9ca8af567f.r2.dev",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "localhost:3001",
        "6ckxp812-3001.brs.devtunnels.ms",
      ],
    },
  },
}

export default nextConfig
