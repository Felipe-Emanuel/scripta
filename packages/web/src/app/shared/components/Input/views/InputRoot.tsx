import { inputRootTV } from '@shared/components/Input/InputTV'
import { TRootComponent } from '@shared/types'

export function InputRoot({ children, className }: TRootComponent) {
  return <div className={inputRootTV({ className })}>{children}</div>
}
