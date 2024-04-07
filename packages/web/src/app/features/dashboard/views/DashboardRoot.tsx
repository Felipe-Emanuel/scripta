import { TRootComponent } from '@shared/types'

export function DashboardRoot({ children }: TRootComponent) {
  return <div className="flex flex-col gap-4 max-w-[1500px] m-auto pl-20">{children}</div>
}
