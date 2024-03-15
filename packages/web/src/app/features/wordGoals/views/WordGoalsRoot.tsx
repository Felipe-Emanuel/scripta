import { wordGoalsRootTV } from '@features/wordGoals/WordGoalsTV'
import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function WordGoalsRoot({ children }: TRootComponent) {
  return <Template className={wordGoalsRootTV()}>{children}</Template>
}
