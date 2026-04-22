import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acceso — Panel de Administración",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
