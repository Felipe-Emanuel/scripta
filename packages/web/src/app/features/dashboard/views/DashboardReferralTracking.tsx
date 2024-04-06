import { ReferralTracking } from '@features/referralTracking'

export function DashboardReferralTracking() {
  return (
    <ReferralTracking.root>
      <ReferralTracking.header />
      <ReferralTracking.contentWrapper>
        <ReferralTracking.info />
        <ReferralTracking.graphic />
      </ReferralTracking.contentWrapper>
    </ReferralTracking.root>
  )
}
