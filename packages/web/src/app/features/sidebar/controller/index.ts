import { useState } from 'react'

export const useSidebarController = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen((prev) => !prev)

  return {
    isOpen,
    toggleSidebar
  }
}
