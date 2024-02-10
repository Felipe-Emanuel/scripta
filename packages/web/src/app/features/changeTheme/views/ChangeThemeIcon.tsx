'use client'

import { RiComputerLine } from 'react-icons/ri'
import { IoMdSunny } from 'react-icons/io'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { Icon } from '@shared/components'
import { useTheme } from '@shared/hooks/contexts/useTheme'

export function ChangeThemeIcon() {
  const { isSystem, theme } = useTheme()

  const themeIcon = theme === 'dark' ? BsFillMoonStarsFill : IoMdSunny

  const iconToBeUsed = isSystem ? RiComputerLine : themeIcon

  const themeTestId = theme === 'dark' ? 'dark' : 'light'
  const testId = isSystem ? 'system' : themeTestId

  return <Icon icon={iconToBeUsed} size="md" testid={`testid=${testId}`} />
}
