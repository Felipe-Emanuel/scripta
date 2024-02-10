import { Text } from '@shared/components'

interface ButtonLabelProps {
  label: string
}

export function ButtonLabel({ label }: ButtonLabelProps) {
  return <Text text={label} />
}
