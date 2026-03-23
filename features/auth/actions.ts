"use server"

import { redirect } from "next/navigation"
import { validateCredentials, createSession, clearSession } from "@/lib/auth/session"

export async function loginAction(_prevState: unknown, formData: FormData) {
  const email    = (formData.get("email")    as string)?.trim()
  const password = (formData.get("password") as string)?.trim()

  if (!email || !password) {
    return { error: "Completa todos los campos." }
  }

  if (!(await validateCredentials(email, password))) {
    return { error: "Credenciales incorrectas." }
  }

  await createSession(email)
  redirect("/dashboard")
}

export async function logoutAction() {
  await clearSession()
  redirect("/login")
}
