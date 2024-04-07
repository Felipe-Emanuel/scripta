import { TRootComponent } from '@shared/types'
import { menuRootTV } from '../MenuTV'

export function MenuRoot({ children }: TRootComponent) {
  return <div className={menuRootTV()}>{children}</div>
}
