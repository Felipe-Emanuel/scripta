import { Text } from '@shared/components'

interface GraphicsHeaderProps {
  text: string
  actions?: JSX.Element
}

export function GraphicsHeader({ text, actions }: GraphicsHeaderProps) {
  const label = <Text text={text} weight="bold" size="sm" className="pl-4" />

  return actions ? (
    <div className="flex justify-between w-full h-fit items-center">
      {label}
      {actions}
    </div>
  ) : (
    <div className="h-2">{label}</div>
  )
}
