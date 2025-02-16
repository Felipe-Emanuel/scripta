import { ElementType } from 'react'

export type TMenuActions = {
  id: number
  icon: ElementType
  handleClick: VoidFunction
  isIconOnly: boolean
  label?: string
  tooltipLabel?: string
}
