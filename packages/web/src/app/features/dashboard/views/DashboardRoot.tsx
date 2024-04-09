import { TRootComponent } from '@shared/types'
import { Menu } from '@features/menu'
import { menuSearchDefaultItem } from '../DashboardUtils'
import { dashboardRootTV } from '../DashboardTV'

export function DashboardRoot({ children }: TRootComponent) {
  return (
    <div className={dashboardRootTV()}>
      <Menu.root>
        <Menu.pathname />
        <Menu.actions>
          <Menu.search defaultItems={menuSearchDefaultItem} />
        </Menu.actions>
      </Menu.root>
      {children}
    </div>
  )
}
