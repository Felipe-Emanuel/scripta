import { Text, TextProps } from '@shared/components'
import { inputLabelTV } from '../InputTV'

export function InputLabel({ text, ...props }: TextProps) {
  return <Text as="label" text={text} {...props} className={inputLabelTV()} />
}
