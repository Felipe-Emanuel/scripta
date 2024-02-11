import { Text, TextProps } from '@shared/components'

export function InputLabel({ text, ...props }: TextProps) {
  return <Text text={text} {...props} />
}
