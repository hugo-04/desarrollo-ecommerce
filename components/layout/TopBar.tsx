"use client"

import { CONTACT } from "@/lib/contact"

export function TopBar() {
  return (
    <div className="bg-[#FF6B35] text-white py-1.5 border-b border-[#ffffff10] relative z-50">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-center text-[11px] font-medium tracking-wide">
        
        {/* Container: Centered on desktop, scrollable on mobile */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap w-full md:w-auto md:justify-center">
          
          <span className="flex items-center gap-1.5 font-bold shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            EN LÍNEA
          </span>
          
          <span className="w-px h-3 bg-white/30 shrink-0" />
          
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white/80 transition-colors shrink-0">
            {CONTACT.email}
          </a>
          
          <span className="w-px h-3 bg-white/30 shrink-0" />
          
          <span className="shrink-0">
            xxxxxxxxxxxxxxxx
          </span>
          
          <span className="w-px h-3 bg-white/30 shrink-0" />
          
          <span className="shrink-0">
            {CONTACT.hours}
          </span>
          
        </div>

      </div>
    </div>
  )
}
