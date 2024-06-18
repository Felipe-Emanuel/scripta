import { iconContentTV } from '@features/BookInformation/BookInformationTV'
import { Icon } from '@shared/components'
import { ElementType } from 'react'

interface IconContentProps {
  icon: ElementType
  color?: 'primary' | 'danger' | 'warning' | 'secondary'
}

export const IconContent = ({ icon, color = 'primary' }: IconContentProps) => (
  <div className={iconContentTV()}>
    <Icon icon={icon} color={color} />
  </div>
)
