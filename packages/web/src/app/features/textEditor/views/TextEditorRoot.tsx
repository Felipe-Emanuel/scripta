'use client'

import { Menu } from '@features/menu'
import { TRootComponent } from '@shared/types'
import { menuSearchDefaultItem } from '../TextEditorUtils'
import { textEditorRootTV } from '../TextEditorTV'

export function TextEditorRoot({ children }: TRootComponent) {
  return (
    <div className={textEditorRootTV()}>
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
