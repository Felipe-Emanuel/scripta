'use client'

import { useCallback } from 'react'

export const useLocalStorage = () => {
  const STORAGE_KEY = 'Scripta:'

  const getLocalStorage = useCallback((key: string) => {
    const data = window.localStorage.getItem(`${STORAGE_KEY}${key}`)

    return data && JSON.parse(data)
  }, [])

  const setLocalStorage = useCallback((key: string, value: unknown) => {
    const data = JSON.stringify(value)

    return window.localStorage.setItem(`${STORAGE_KEY}${key}`, data)
  }, [])

  const deleteFromStorage = useCallback((key: string) => {
    return window.localStorage.removeItem(`${STORAGE_KEY}${key}`)
  }, [])

  return {
    getLocalStorage,
    setLocalStorage,
    deleteFromStorage,
    STORAGE_KEY
  }
}
