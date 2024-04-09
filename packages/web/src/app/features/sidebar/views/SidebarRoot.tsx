'use client'

import { TRootComponent } from '@shared/types'
import { overflowTv, sidebarRootTv } from '../SidebarTV'
import { usePathname } from 'next/navigation'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useSidebar } from '@shared/hooks/contexts/useSidebar'

export function SidebarRoot({ children }: TRootComponent) {
  const { isOpen, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  if (pathname === APP_ROUTES.public.auth.name) return null

  return (
    <>
      <div className={overflowTv({ isOpen })} />
      <aside
        id="aside"
        onMouseEnter={toggleSidebar}
        onMouseLeave={toggleSidebar}
        className={sidebarRootTv({ isOpen })}
      >
        {children}
      </aside>
    </>
  )
}
