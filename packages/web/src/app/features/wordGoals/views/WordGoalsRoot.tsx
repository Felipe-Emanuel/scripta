import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function WordGoalsRoot({ children }: TRootComponent) {
  return (
    <Template className="w-48 items-center justify-center">{children}</Template>
  )
}
