import { TRootComponent } from '@shared/types'

export function WordGoalsContentWrapper({ children }: TRootComponent) {
  return (
    <div className="w-full max-w-56 flex flex-col items-center justify-center">
      {children}
    </div>
  )
}
