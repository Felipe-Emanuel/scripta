import { wordGoalsContentWrapperTV } from '@features/wordGoals/WordGoalsTV'
import { TRootComponent } from '@shared/types'

export function WordGoalsContentWrapper({ children }: TRootComponent) {
  return <div className={wordGoalsContentWrapperTV()}>{children}</div>
}
