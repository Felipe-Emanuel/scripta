import { AuthLeftSide } from '@features/auth/views/AuthLeftSide'
import { AuthRightSide } from '@features/auth/views/AuthRightSide'
import { AuthRoot } from '@features/auth/views/AuthRoot'
import { AuthenticationForm } from '@features/auth/views/AuthenticationForm'

export const Auth = {
  root: AuthRoot,
  form: AuthenticationForm,
  leftSide: AuthLeftSide,
  rightSide: AuthRightSide,
}
