'use client'

import { TRootComponent } from '@shared/types'
import { overflowTv, sidebarRootTv } from '../SidebarTV'
import { usePathname } from 'next/navigation'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'

interface SidebarRootProps extends TRootComponent {
  toggleSidebar: () => void
  isOpen: boolean
}

export function SidebarRoot({ children, isOpen, toggleSidebar }: SidebarRootProps) {
  const pathname = usePathname()

  if (pathname === APP_ROUTES.public.auth.name) return null

  return (
    <>
      <div className={overflowTv({ isOpen })} />
      <aside
        onMouseEnter={toggleSidebar}
        onMouseLeave={toggleSidebar}
        className={sidebarRootTv({ isOpen })}
      >
        {children}
      </aside>
    </>
  )
}
