import { profileRootTV } from '@features/profile/ProfileTV'
import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'

export function ProfileRoot({ children }: TRootComponent) {
  return (
    <Template
      overflow="hidden"
      flex-direction="row"
      className={profileRootTV()}
    >
      {children}
    </Template>
  )
}
