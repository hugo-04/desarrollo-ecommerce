"use client"

import { IconMail, IconPhone, IconClock } from "@/components/icons"
import { CONTACT } from "@/lib/contact"

export function TopBar() {
  return (
    <div className="bg-[#0f172a] text-[#94a3b8] py-2 border-b border-white/5 relative z-50">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between text-[11px] font-medium tracking-wide">
        
        {/* Contact Info (scrollable on mobile) */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide w-full sm:w-auto">
          {/* Online Indicator */}
          <span className="flex items-center gap-1.5 text-emerald-400 shrink-0">
             <span className="relative flex h-1.5 w-1.5">
               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
               <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
             </span>
             <span className="font-bold tracking-widest text-[10px]">EN LÍNEA</span>
          </span>
          
          <span className="w-px h-3 bg-slate-700 shrink-0" />
          
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0">
            <IconMail className="h-3.5 w-3.5 text-slate-400" /> 
            {CONTACT.email}
          </a>
          
          <span className="w-px h-3 bg-slate-700 shrink-0" />
          
          <a href={CONTACT.phoneTel} className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold text-slate-200 shrink-0">
            <IconPhone className="h-3.5 w-3.5 text-slate-400" /> 
            {CONTACT.phoneDisplay}
          </a>
        </div>

        {/* Business Hours (hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <IconClock className="h-3.5 w-3.5 text-slate-500" /> 
          <span>{CONTACT.hours}</span>
        </div>

      </div>
    </div>
  )
}
