import { Icon, Text } from '@shared/components'
import { ElementType } from 'react'

interface IRenderInfoProps {
  label: string
  icon: ElementType
}

export function RenderInfo({ icon, label }: IRenderInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-white p-2 flex items-center justify-center">
        <Icon icon={icon} color="primary" />
      </div>
      <Text weight="bold" text={label} size="sm" />
    </div>
  )
}
