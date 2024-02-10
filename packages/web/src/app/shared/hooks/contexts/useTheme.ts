import { ThemeContext } from '@shared/contexts/ThemeContext'
import { useContext } from 'react'

export const useTheme = () => useContext(ThemeContext)
