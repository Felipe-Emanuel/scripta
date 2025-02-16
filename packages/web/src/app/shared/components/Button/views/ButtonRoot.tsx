import { Button, ButtonProps, VariantProps } from "@heroui/react"
import { buttonRootTv } from '@shared/components/Button/ButtonTV'
import { TRootComponent } from '@shared/types'

type TButtonProps = ButtonProps & TRootComponent
type TButtonRootStyles = VariantProps<typeof buttonRootTv>
type TVariants = TButtonRootStyles['buttonStyle']
type TButtonRoot = {
  buttonStyle?: TVariants
} & TButtonProps

export function ButtonRoot({
  variant,
  color,
  children,
  buttonStyle,
  ...props
}: TButtonRoot) {
  return (
    <Button
      className={buttonRootTv({ buttonStyle })}
      color={color}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  )
}
