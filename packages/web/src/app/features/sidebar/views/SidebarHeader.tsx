import { Title } from '@shared/components'
import { sidebarHeaderDivisorTv, sidebarHeaderTv } from '../SidebarTV'

export function SidebarHeader() {
  return (
    <div className={sidebarHeaderTv()}>
      <Title as="h5" size="md" title="Scripta" fontFamily="jacques-francois" />

      <div className={sidebarHeaderDivisorTv()} />
    </div>
  )
}
