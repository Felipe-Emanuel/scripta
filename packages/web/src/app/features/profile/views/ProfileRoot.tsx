import { profileRootTV } from '@features/profile/ProfileTV'
import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function ProfileRoot({ children }: TRootComponent) {
  return (
    <Template id="profile-root" overflow="hidden" flex-direction="row" className={profileRootTV()}>
      {children}
    </Template>
  )
}
