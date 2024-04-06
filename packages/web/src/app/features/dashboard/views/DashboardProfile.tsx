import { Profile } from '@features/profile'

export function DashboardProfile() {
  return (
    <Profile.root>
      <Profile.info />
      <Profile.hero />
    </Profile.root>
  )
}
