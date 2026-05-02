"use client"

import { IconMail, IconPhone, IconClock } from "@/components/icons"
import { CONTACT } from "@/lib/contact"

export function TopBar() {
  return (
    <div className="relative bg-[#002a52]">
      {/* Orange accent line bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#FF6B35]/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-2">

        {/* Mobile: horizontal scroll */}
        <div className="flex sm:hidden items-center gap-5 overflow-x-auto scrollbar-hide text-xs text-white/80">
          <a href={CONTACT.phoneTel} className="flex items-center gap-2 shrink-0 hover:text-white transition-colors">
            <IconPhone className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
            <span>{CONTACT.phoneDisplay}</span>
          </a>
          <span className="h-3.5 w-px bg-white/15 shrink-0" />
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 shrink-0 hover:text-white transition-colors">
            <IconMail className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
            <span>{CONTACT.email}</span>
          </a>
          <span className="h-3.5 w-px bg-white/15 shrink-0" />
          <span className="flex items-center gap-2 shrink-0 text-white/60">
            <IconClock className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
            <span>{CONTACT.hours}</span>
          </span>
        </div>

        {/* Desktop: centrado */}
        <div className="hidden sm:flex items-center justify-center gap-6 text-xs">

          {/* Online indicator */}
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B35] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B35]" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B35]/90">En Línea</span>
          </span>

          <span className="h-3.5 w-px bg-white/10" />

          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
            <IconMail className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]/70" />
            <span>{CONTACT.email}</span>
          </a>

          <a href={CONTACT.phoneTel} className="flex items-center gap-2 font-semibold text-white/85 transition-colors hover:text-white">
            <IconPhone className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]/70" />
            <span>{CONTACT.phoneDisplay}</span>
          </a>

          <div className="hidden items-center gap-2 text-white/55 md:flex">
            <IconClock className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]/55" />
            <span>{CONTACT.hours}</span>
          </div>

        </div>
      </div>
    </div>
  )
}
