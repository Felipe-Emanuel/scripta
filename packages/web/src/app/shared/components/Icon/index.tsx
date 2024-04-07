import { ElementType } from 'react'
import { iconTv } from './IconTV'
import { VariantProps } from 'tailwind-variants'

export interface IconProps extends VariantProps<typeof iconTv> {
  icon: ElementType
  testid?: string
  className?: string
}

export function Icon({ icon: Icon, color, size, testid, className }: IconProps) {
  return <Icon className={iconTv({ color, size, className })} data-testid={testid} />
}
