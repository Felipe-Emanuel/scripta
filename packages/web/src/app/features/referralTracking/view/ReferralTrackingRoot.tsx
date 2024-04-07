import { referralTrackingRootTV } from '@features/referralTracking/ReferralTrackingTV'
import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function ReferralTrackingRoot({ children }: TRootComponent) {
  return (
    <Template id="referral-tracking" className={referralTrackingRootTV()}>
      {children}
    </Template>
  )
}
