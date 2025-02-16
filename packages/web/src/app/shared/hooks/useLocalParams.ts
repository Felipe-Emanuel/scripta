'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export const useLocalParams = () => {
  const { push, replace } = useRouter()
  const searchParams = useSearchParams()

  const currentParams = useMemo(() => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [searchParams])

  const navigateWithParams = useCallback(
    (newParams: URLSearchParams, shouldNavigate = true) => {
      const url = `?${newParams.toString()}`

      if (shouldNavigate) {
        return push(url, { scroll: false })
      }

      return replace(url, { scroll: false })
    },
    [push, replace]
  )

  const updateParams = useCallback(
    (updates: Record<string, string | null>, shouldNavigate = true) => {
      const currentParams = new URLSearchParams(searchParams?.toString() || '')
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          currentParams.delete(key)
        } else {
          currentParams.set(key, value)
        }
      })
      navigateWithParams(currentParams, shouldNavigate)
    },
    [navigateWithParams, searchParams]
  )

  const clearParams = useCallback(() => {
    const currentParams = new URLSearchParams()
    navigateWithParams(currentParams)
  }, [navigateWithParams])

  const hasSearchParams = Array.from(searchParams.entries()).length > 0

  const getParamValues = useCallback(
    (param: string) => {
      return searchParams.getAll(param)
    },
    [searchParams]
  )

  return {
    currentParams,
    hasSearchParams,
    updateParams,
    clearParams,
    getParamValues
  }
}
