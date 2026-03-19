"use client"

import { useState, useEffect } from "react"
import { getBrandNamesAction, getBrandsAction } from "./actions"
import type { Brand } from "@/lib/types"

export function useBrandNames() {
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    getBrandNamesAction().then(setBrands).catch(() => {})
  }, [])

  return brands
}

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBrandsAction()
      .then((b) => { setBrands(b); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return { brands, loading }
}
