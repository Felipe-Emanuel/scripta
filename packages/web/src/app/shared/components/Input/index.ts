import { ErrorMessage } from '@shared/components/Input/views/InputErrorMessage'
import { InputField } from '@shared/components/Input/views/InputField'
import { InputLabel } from '@shared/components/Input/views/InputLabel'
import { InputRoot } from '@shared/components/Input/views/InputRoot'
import { InputTextarea } from './views/InputTextarea'
import { InputSwitch } from './views/InputSwitch'

export const Input = {
  root: InputRoot,
  label: InputLabel,
  field: InputField,
  textarea: InputTextarea,
  error: ErrorMessage,
  switch: InputSwitch
}
