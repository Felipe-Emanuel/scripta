'use client'

import { Sidebar as Menu } from '@features/sidebar'

export function Sidebar() {
  return (
    <Menu.root>
      <Menu.header />
      <Menu.items />
    </Menu.root>
  )
}
