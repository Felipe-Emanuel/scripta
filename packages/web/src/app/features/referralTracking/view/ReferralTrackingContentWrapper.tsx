import { referralTrackingContentWrapperTV } from '@features/referralTracking/ReferralTrackingTV'
import { TRootComponent } from '@shared/types'

export function ReferralTrackingContentWrapper({ children }: TRootComponent) {
  return <div className={referralTrackingContentWrapperTV()}>{children}</div>
}
