import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { getSession, signIn, signOut } from 'next-auth/react'
import { useCallback } from 'react'
import { session as cookieSession } from '@shared/utils/constants/cookies'
import { useCookie } from '@shared/hooks/useCookies'
import { useQueryData } from '@shared/hooks/useReactQuery'

export const useProvidersSession = () => {
  const { createSession, deleteCookie } = useCookie()

  const getNextAuthSession = useCallback(async () => {
    const session = await getSession()

    return session
  }, [])

  const { data: session, isLoading: sessionLoading } = useQueryData(
    getNextAuthSession,
    'session',
    '12-hours',
  )

  const cookieValue = {
    email: session?.user?.email,
    image: session?.user?.image,
    name: session?.user?.name,
    provider: 'google',
  }

  session?.user &&
    createSession({
      cookieName: cookieSession,
      value: JSON.stringify(cookieValue),
    })

  const logInWithProviders = async (provider: BuiltInProviderType) =>
    await signIn(provider, {
      redirect: true,
      callbackUrl: APP_ROUTES.private.dashboard.name,
    })

  const logOut = () => {
    signOut({
      redirect: true,
      callbackUrl: APP_ROUTES.public.auth.name,
    })

    deleteCookie(cookieSession)
  }

  return {
    session,
    sessionLoading,
    logInWithProviders,
    logOut,
  }
}
