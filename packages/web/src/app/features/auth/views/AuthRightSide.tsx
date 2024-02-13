'use client'

import { authRightSideRootTV } from '@features/auth/AuthTV'
import { Spinner } from '@shared/animations/Spinner'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { TRootComponent } from '@shared/types'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthRightSide({ children }: TRootComponent) {
  const { push } = useRouter()
  const { session, sessionLoading } = useProvidersSession()

  useEffect(() => {
    if (session?.user) return push(APP_ROUTES.private.dashboard.name)
  }, [session])

  return (
    <div className={authRightSideRootTV()}>
      {sessionLoading ? <Spinner /> : <>{children}</>}
    </div>
  )
}
