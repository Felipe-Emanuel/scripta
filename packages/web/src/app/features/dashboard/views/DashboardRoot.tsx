import { TRootComponent } from '@shared/types'

export function DashboardRoot({ children }: TRootComponent) {
  return (
    <div className="size-full flex gap-4 flex-wrap sm:flex-nowrap items-center justify-center">
      {children}
    </div>
  )
}
