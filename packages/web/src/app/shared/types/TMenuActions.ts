import { ElementType } from 'react'

export type TMenuActions = {
  id: number
  icon: ElementType
  handleClick: () => void
  isIconOnly: boolean
  label?: string
  tooltipLabel?: string
}
