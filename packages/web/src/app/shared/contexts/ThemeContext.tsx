import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TTheme } from '@shared/types'

interface ThemeContextProps {
  isSystem: boolean
  theme: TTheme
  changeTheme: () => void
}

interface AppThemeProviderProps {
  children: ReactNode
}

const localStorageThemeName = 'theme'

export const ThemeContext = createContext({} as ThemeContextProps)

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { setLocalStorage, getLocalStorage } = useLocalStorage()
  const [theme, setTheme] = useState<TTheme>('')
  const [isSystem, setIsSystem] = useState(false)

  const changeTheme = () => {
    setIsSystem(false)
    const newTheme: TTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setLocalStorage(localStorageThemeName, newTheme)
  }

  const getSystemThemePreference = useCallback(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!prefersDarkMode) setIsSystem(true)
    return prefersDarkMode ? 'dark' : 'light'
  }, [])

  useEffect(() => {
    const themeValue: TTheme = getLocalStorage(localStorageThemeName)
    const defaultTheme = themeValue === null ? getSystemThemePreference() : themeValue
    setTheme(defaultTheme)
  }, [getLocalStorage, getSystemThemePreference])

  return (
    <ThemeContext.Provider
      value={{
        isSystem,
        theme,
        changeTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
