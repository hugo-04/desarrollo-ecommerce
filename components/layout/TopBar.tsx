"use client"

import { IconMail, IconPhone, IconClock } from "@/components/icons"
import { CONTACT } from "@/lib/contact"

export function TopBar() {
  return (
    <div className="bg-[#1e293b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-2">

        {/* Mobile: scrollable con todos los datos */}
        <div className="flex sm:hidden items-center gap-4 overflow-x-auto scrollbar-hide text-[11px] text-white">
          <a href={CONTACT.phoneTel} className="flex items-center gap-1 shrink-0 text-white">
            <IconPhone className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{CONTACT.phoneDisplay}</span>
          </a>
          <span className="h-3 w-px bg-white/15 shrink-0" />
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1 shrink-0 text-white/80">
            <IconMail className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{CONTACT.email}</span>
          </a>
          <span className="h-3 w-px bg-white/15 shrink-0" />
          <span className="flex items-center gap-1 shrink-0 text-white/70">
            <IconClock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{CONTACT.hours}</span>
          </span>
        </div>

        {/* Tablet / Desktop: fila única */}
        <div className="hidden sm:flex items-center gap-5 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/80">En Línea</span>
          </span>
          <span className="h-3 w-px bg-white/10" />
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
            <IconMail className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{CONTACT.email}</span>
          </a>
          <a href={CONTACT.phoneTel} className="flex items-center gap-1.5 text-white transition-colors hover:text-white/80">
            <IconPhone className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{CONTACT.phoneDisplay}</span>
          </a>
          <div className="hidden items-center gap-1.5 text-white/60 md:flex">
            <IconClock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{CONTACT.hours}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
