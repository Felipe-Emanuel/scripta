import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function ReferralTrackingRoot({ children }: TRootComponent) {
  return (
    <Template className="w-48 sm:w-full max-w-[450px] h-[290px]">
      {children}
    </Template>
  )
}
