import { PropsWithChildren } from 'react'
import { RootTV } from '../ChapterTV'
import { Menu } from '@features/menu'
import { menuSearchDefaultItem } from '../ChapterUtils'

export function ChapterRoot({ children }: PropsWithChildren) {
  return (
    <div className={RootTV()}>
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
