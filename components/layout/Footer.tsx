"use client"

import Link from "next/link"
import Image from "next/image"
import { IconPhone, IconMail, IconMapPin, IconClock } from "@/components/icons"
import { CONTACT } from "@/lib/contact"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

const LEGAL_LINKS = [
  { href: "/terminos", label: "Términos y Condiciones" },
  { href: "/politica-privacidad", label: "Política de Privacidad" },
]

export function Footer() {
  return (
    <footer className="relative bg-[#07091E] text-white">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════
            MOBILE / TABLET  (<lg): 2 columnas
            DESKTOP          (lg+): 4 columnas
        ════════════════════════════════════════ */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10 lg:gap-14">

          {/* Col 1 — Marca (ancho completo en mobile, 1 col en desktop) */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/logo/logotipo.png"
              alt="Electro Thina — Soluciones Eléctricas AT/MT"
              width={160}
              height={40}
              className="mb-4 h-10 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,1)) brightness(1.4) contrast(1.1)" }}
            />
            <p className="mb-6 text-[12px] leading-relaxed text-slate-500">
              Fabricantes y distribuidores de ferretería y accesorios eléctricos para alta y media tensión en Lima, Perú.
            </p>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-3 bg-red-500/60" />
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="group flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-red-400">
                    <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-3 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-3 bg-red-500/60" />
              Legal
            </h4>
            <ul className="mb-5 space-y-2.5">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="group flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-red-400">
                    <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-3 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/libro-reclamaciones" title="Libro de Reclamaciones — Ley N° 29571"
              className="inline-block transition-all hover:opacity-80 hover:scale-[1.03]">
              <img src="/libro-reclamaciones.png" alt="Libro de Reclamaciones" className="h-10 w-auto rounded shadow-md" />
            </Link>
          </div>

          {/* Col 4 — Contacto (ancho completo en mobile, 1 col en desktop) */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-3 bg-red-500/60" />
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={CONTACT.phoneTel} className="group flex items-start gap-2.5 text-[12px] text-slate-400 transition-colors hover:text-white">
                  <IconPhone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500/50 group-hover:text-red-400 transition-colors" />
                  <span>{CONTACT.phoneDisplay}{CONTACT.phone2Display ? ` / ${CONTACT.phone2Display}` : ""}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex items-start gap-2.5 text-[12px] text-slate-400 transition-colors hover:text-white">
                  <IconMail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500/50 group-hover:text-red-400 transition-colors" />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[12px] text-slate-400">
                <IconMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500/50" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-[12px] text-slate-400">
                <IconClock className="h-3.5 w-3.5 shrink-0 text-red-500/50" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Copyright centrado ── */}
        <div className="mt-10 border-t border-white/[0.05] pt-5 text-center text-[11px] text-slate-600">
          © {new Date().getFullYear()} Electro Thina S.A.C. · Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}
