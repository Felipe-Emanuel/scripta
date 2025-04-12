import { authRightSideRootTV } from '@features/auth/AuthTV'
import { TRootComponent } from '@shared/types'

export function AuthRightSide({ children }: TRootComponent) {
  return <div className={authRightSideRootTV()}>{children}</div>
}
