"use client"

import Link from "next/link"
import { IconPhone, IconMail, IconMapPin, IconClock, IconFacebook, IconInstagram, IconLinkedIn } from "@/components/icons"
import { CONTACT } from "@/lib/contact"

export function Footer() {
  return (
    <footer className="relative bg-[#07091E] py-14 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rotate-45 rounded border-2 border-red-600 bg-white" />
                <span className="relative z-10 text-[10px] font-extrabold text-[#121A47]">ET</span>
              </div>
              <span className="text-lg font-bold">Electro Thina</span>
            </div>
            <p className="mb-4 text-xs text-slate-500">
              Fabricantes y distribuidores especializados en ferreteria y accesorios electricos para lineas de alta y media tension.
            </p>
            <div className="flex gap-2">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-all hover:bg-red-500/20 hover:text-red-400"><IconFacebook className="h-4 w-4" /></a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-all hover:bg-red-500/20 hover:text-red-400"><IconInstagram className="h-4 w-4" /></a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-all hover:bg-red-500/20 hover:text-red-400"><IconLinkedIn className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-300">Navegacion</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link href="/" className="transition-colors hover:text-red-400">Inicio</Link></li>
              <li><Link href="/catalogo" className="transition-colors hover:text-red-400">Catalogo</Link></li>
              <li><Link href="/nosotros" className="transition-colors hover:text-red-400">Nosotros</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-red-400">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-300">Soporte</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="transition-colors hover:text-red-400">Asesoria Tecnica</li>
              <li className="transition-colors hover:text-red-400">Garantias</li>
              <li className="transition-colors hover:text-red-400">Certificaciones</li>
              <li className="transition-colors hover:text-red-400">FAQ</li>
              <li><Link href="/terminos" className="transition-colors hover:text-red-400">Términos y Condiciones</Link></li>
              <li><Link href="/politica-privacidad" className="transition-colors hover:text-red-400">Política de Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-300">Contacto</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li className="flex items-center gap-2"><IconPhone className="h-4 w-4 text-red-500/50" />{CONTACT.phoneDisplay} / {CONTACT.phone2Display}</li>
              <li className="flex items-center gap-2"><IconMail className="h-4 w-4 text-red-500/50" />{CONTACT.email}</li>
              <li className="flex items-center gap-2"><IconMapPin className="h-4 w-4 text-red-500/50" />{CONTACT.address}</li>
              <li className="flex items-center gap-2"><IconClock className="h-4 w-4 text-red-500/50" />{CONTACT.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/[0.06] pt-6 flex flex-col items-center justify-between gap-3 text-xs text-slate-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Electro Thina S.A.C. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <Link href="/terminos" className="transition-colors hover:text-slate-400">Términos y Condiciones</Link>
            <span className="text-slate-700">·</span>
            <Link href="/politica-privacidad" className="transition-colors hover:text-slate-400">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
