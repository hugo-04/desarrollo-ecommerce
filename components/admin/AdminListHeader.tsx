"use client"

import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AdminListHeaderProps {
  title: string
  subtitle: string
  newHref: string
  newLabel: string
  searchValue: string
  searchPlaceholder: string
  onSearch: (q: string) => void
}

export function AdminListHeader({
  title,
  subtitle,
  newHref,
  newLabel,
  searchValue,
  searchPlaceholder,
  onSearch,
}: AdminListHeaderProps) {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <Button asChild className="bg-[#334155] hover:bg-[#334155]/90">
          <Link href={newHref}>
            <Plus className="h-4 w-4" />
            {newLabel}
          </Link>
        </Button>
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>
    </>
  )
}
