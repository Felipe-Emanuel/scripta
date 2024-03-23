import { TRootComponent } from '@shared/types'

export function DashboardRoot({ children }: TRootComponent) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {children}
    </div>
  )
}
