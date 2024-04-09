import { SidebarContext } from '@shared/contexts/SidebarContext'
import { useContext } from 'react'

export const useSidebar = () => useContext(SidebarContext)
