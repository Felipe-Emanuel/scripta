import { ElementType } from 'react'
import { iconTv } from './IconTV'
import { VariantProps } from 'tailwind-variants'

interface IconProps extends VariantProps<typeof iconTv> {
  icon: ElementType
}

export function Icon({ icon: Icon }: IconProps) {
  return <Icon className={iconTv()} />
}
