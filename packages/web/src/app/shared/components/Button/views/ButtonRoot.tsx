import { VariantProps } from 'tailwind-variants'
import { ButtonHTMLAttributes } from 'react'
import { buttonRootTv } from '@shared/components/Button/ButtonTV'
import { TRootComponent } from '@shared/types'

type ButtonRootProps = {
  disabled?: boolean
  isLoading?: boolean
  className?: string
  type?: HTMLButtonElement['type']
  onClick?: () => void
} & VariantProps<typeof buttonRootTv> &
  TRootComponent &
  ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonRoot({
  children,
  disabled,
  className,
  variant,
  ...props
}: ButtonRootProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={buttonRootTv({ className, variant })}
    >
      {children}
    </button>
  )
}
