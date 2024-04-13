import { Menu } from '@features/menu'
import { TRootComponent } from '@shared/types'
import { menuSearchDefaultItem } from '../BooksUtils'

export function BooksRoot({ children }: TRootComponent) {
  return (
    <div className="flex flex-col gap-4 max-w-[1500px] m-auto pl-20">
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
