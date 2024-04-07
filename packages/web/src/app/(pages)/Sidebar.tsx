'use client'

import { Sidebar as Menu } from '@features/sidebar'
import { useSidebarController } from '@features/sidebar/controller'

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarController()

  return (
    <Menu.root toggleSidebar={toggleSidebar} isOpen={isOpen}>
      <Menu.header />
      <Menu.items isOpen={isOpen} />
    </Menu.root>
  )
}
