import { ElementType } from 'react'
import { iconTv } from './IconTV'
import { VariantProps } from 'tailwind-variants'

interface IconProps extends VariantProps<typeof iconTv> {
  icon: ElementType
  testid?: string
}

export function Icon({ icon: Icon, testid }: IconProps) {
  return <Icon className={iconTv()} data-testid={testid} />
}
