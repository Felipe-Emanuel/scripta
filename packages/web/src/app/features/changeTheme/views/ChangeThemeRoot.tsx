'use client'

import { changeThemeRootTV } from '@features/changeTheme/ChangeThemeTV'
import { useTheme } from '@shared/hooks/contexts/useTheme'
import { TRootComponent } from '@shared/types'
import { HTMLAttributes } from 'react'

type TChangeThemeRoot = TRootComponent & HTMLAttributes<HTMLButtonElement>

export function ChangeThemeRoot({ children, ...props }: TChangeThemeRoot) {
  const { changeTheme } = useTheme()
  return (
    <button onClick={changeTheme} className={changeThemeRootTV()} {...props}>
      {children}
    </button>
  )
}
