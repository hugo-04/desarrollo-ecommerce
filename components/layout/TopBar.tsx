"use client"

import { IconMail, IconPhone, IconClock, IconFacebook, IconInstagram, IconLinkedIn } from "@/components/icons"

export function TopBar() {
  return (
    <div className="bg-[#121A47] text-white">
      <div className="mx-auto max-w-7xl px-4 py-1.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="mailto:ventas@electrothina.com" className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <IconMail className="h-3 w-3" />
              <span className="hidden sm:inline">ventas@electrothina.com</span>
            </a>
            <a href="tel:+51123456789" className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <IconPhone className="h-3 w-3" />
              <span>(01) 234-5678</span>
            </a>
            <div className="hidden items-center gap-1.5 text-slate-400 md:flex">
              <IconClock className="h-3 w-3" />
              <span>Lun-Vie: 8am - 6pm</span>
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
