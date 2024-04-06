import { authRootTv } from '@features/auth/AuthTV'
import { TRootComponent } from '@shared/types'

export function AuthRoot({ children }: TRootComponent) {
  return <div className={authRootTv()}>{children}</div>
}
