"use client"

import { IconMail, IconPhone, IconClock, IconFacebook, IconInstagram, IconLinkedIn } from "@/components/icons"
import { CONTACT } from "@/lib/contact"

export function TopBar() {
  return (
    <div className="bg-[#121A47] text-white">
      <div className="mx-auto max-w-7xl px-4 py-1.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Live indicator */}
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/80">En Línea</span>
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <IconMail className="h-3 w-3" />
              <span className="hidden sm:inline">{CONTACT.email}</span>
            </a>
            <a href={CONTACT.phoneTel} className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <IconPhone className="h-3 w-3" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
            <div className="hidden items-center gap-1.5 text-slate-400 md:flex">
              <IconClock className="h-3 w-3" />
              <span>L-V: 9am-6pm | Sáb: 9am-3pm</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="text-slate-500 transition-colors hover:text-slate-300" aria-label="Facebook"><IconFacebook className="h-3.5 w-3.5" /></a>
            <a href="#" className="text-slate-500 transition-colors hover:text-slate-300" aria-label="Instagram"><IconInstagram className="h-3.5 w-3.5" /></a>
            <a href="#" className="text-slate-500 transition-colors hover:text-slate-300" aria-label="LinkedIn"><IconLinkedIn className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
