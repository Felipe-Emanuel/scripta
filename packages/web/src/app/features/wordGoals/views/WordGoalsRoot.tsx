import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function WordGoalsRoot({ children }: TRootComponent) {
  return <Template className="items-center justify-center">{children}</Template>
}
