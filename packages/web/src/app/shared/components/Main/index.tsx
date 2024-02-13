'use client'

import { mainTv } from '@shared/components/Main/MainTV'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { TRootComponent } from '@shared/types'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { VariantProps } from 'tailwind-variants'

type TMain = TRootComponent & VariantProps<typeof mainTv>

export function Main({ children, overflow }: TMain) {
  const { push } = useRouter()
  const { session } = useProvidersSession()

  useEffect(() => {
    if (!session?.user) return push(APP_ROUTES.public.auth.name)
  }, [session])

  return <main className={mainTv({ overflow })}>{children}</main>
}
