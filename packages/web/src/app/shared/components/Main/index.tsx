'use client'

import { mainTv } from '@shared/components/Main/MainTV'
import { useTheme } from '@shared/hooks/contexts/useTheme'
import { TRootComponent } from '@shared/types'
import { VariantProps } from 'tailwind-variants'

type TMain = TRootComponent & VariantProps<typeof mainTv>

export function Main({ children, themeOptions, overflow }: TMain) {
  const { theme } = useTheme()

  const isDarkMode = theme === 'dark' ? 'dark' : 'light'

  const themeMode: typeof themeOptions =
    theme === 'dark' ? 'darkMode' : 'lightMode'

  return (
    <main
      className={`${isDarkMode} ${mainTv({ themeOptions: themeMode, overflow })}`}
    >
      {children}
    </main>
  )
}
