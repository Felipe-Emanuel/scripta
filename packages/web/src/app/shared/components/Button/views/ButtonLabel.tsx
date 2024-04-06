import { Text, TextProps } from '@shared/components'

export function ButtonLabel({ text, ...props }: TextProps) {
  return <Text text={text} {...props} />
}
