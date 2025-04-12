import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { signIn, signOut } from 'next-auth/react'

import { session as cookieSession } from '@shared/utils/constants/cookies'
import { useCookie } from '@shared/hooks/useCookies'

export const useProvidersSession = () => {
  const { deleteCookie } = useCookie()

  const logInWithProviders = async (provider: BuiltInProviderType) =>
    await signIn(provider, {
      redirect: true,
      callbackUrl: APP_ROUTES.private.dashboard.name
    })

  const logOut = () => {
    signOut({
      redirect: true,
      callbackUrl: APP_ROUTES.public.auth.name
    })

    deleteCookie(cookieSession)
  }

  return {
    logInWithProviders,
    logOut
  }
}
