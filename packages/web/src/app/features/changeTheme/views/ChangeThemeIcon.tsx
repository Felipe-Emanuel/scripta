'use client'

import { RiComputerLine } from 'react-icons/ri'
import { IoMdSunny } from 'react-icons/io'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { Icon } from '@shared/components'
import { useTheme } from '@shared/hooks/contexts/useTheme'

export function ChangeThemeIcon() {
  const { IsSystem, theme } = useTheme()

  const themeIcon = theme === 'dark' ? BsFillMoonStarsFill : IoMdSunny

  const iconToBeUsed = IsSystem ? RiComputerLine : themeIcon

  return <Icon icon={iconToBeUsed} size="md" />
}
