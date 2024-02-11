import { inputRootTV } from '@shared/components/Input/InputTV'
import { TRootComponent } from '@shared/types'

export function InputRoot({ children }: TRootComponent) {
  return <div className={inputRootTV()}>{children}</div>
}
