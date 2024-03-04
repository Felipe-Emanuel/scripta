'use client'

import { authRightSideRootTV } from '@features/auth/AuthTV'
import { Spinner } from '@shared/animations/Spinner'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { useUser } from '@shared/hooks/useUser'
import { TRootComponent } from '@shared/types'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthRightSide({ children }: TRootComponent) {
  const { push } = useRouter()
  const { sessionLoading } = useProvidersSession()
  const { sessionCustomer } = useUser()

  useEffect(() => {
    if (sessionCustomer?.email) return push(APP_ROUTES.private.dashboard.name)
  }, [push, sessionCustomer?.email])

  return (
    <div className={authRightSideRootTV()}>
      {sessionLoading ? <Spinner /> : <>{children}</>}
    </div>
  )
}
