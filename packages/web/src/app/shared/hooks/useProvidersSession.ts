import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { getSession, signIn, signOut } from 'next-auth/react'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { session as cookieSession } from '@shared/utils/constants/cookies'
import { useCookie } from '@shared/hooks/useCookies'

export const useProvidersSession = () => {
  const { createSession, deleteCookie } = useCookie()

  const getNextAuthSession = useCallback(async () => {
    const session = await getSession()

    return session
  }, [])

  const { data: session, isLoading: sessionLoading } = useQuery(
    'session',
    getNextAuthSession,
    {
      refetchOnWindowFocus: false,
    },
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

  const logInWithProviders = (provider: BuiltInProviderType) =>
    signIn(provider, {
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
