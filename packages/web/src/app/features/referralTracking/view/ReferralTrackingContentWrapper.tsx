import { TRootComponent } from '@shared/types'

export function ReferralTrackingContentWrapper({ children }: TRootComponent) {
  return (
    <div className="flex justify-between items-center relative">{children}</div>
  )
}
