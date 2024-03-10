import { TRootComponent } from '@shared/types'

export function DashboardRoot({ children }: TRootComponent) {
  return (
    <div className="flex flex-wrap min-[1075px]:flex-nowrap items-center justify-center gap-4">
      {children}
    </div>
  )
}
