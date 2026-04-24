"use client"

/**
 * /login — Inicio de sesión del panel admin.
 * Responsabilidad única: punto de entrada de la ruta.
 * Toda la UI vive en LoginView.
 */

import { LoginView } from "@/features/auth/components/LoginView"

export default function LoginPage() {
  return <LoginView />
}
