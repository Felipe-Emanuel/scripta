import { Icon, IconProps } from '@shared/components'

export function ButtonIcon({ icon, ...props }: IconProps) {
  return <Icon icon={icon} {...props} />
}
