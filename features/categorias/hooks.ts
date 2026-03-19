"use client"

import { useState, useEffect } from "react"
import { getCategoriesAction } from "./actions"
import type { CategoryDTO } from "./types"

export function useCategories() {
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategoriesAction()
      .then((c) => { setCategories(c); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return { categories, loading }
}
