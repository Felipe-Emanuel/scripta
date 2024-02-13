import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { getSession, signIn, signOut } from 'next-auth/react'
import { useCallback } from 'react'
import { useQuery } from 'react-query'

export const useProvidersSession = () => {
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

  const logInWithProviders = (provider: BuiltInProviderType) =>
    signIn(provider, {
      redirect: true,
      callbackUrl: APP_ROUTES.private.dashboard.name,
    })

  const logOut = () =>
    signOut({
      redirect: true,
      callbackUrl: APP_ROUTES.public.auth.name,
    })

  return {
    session,
    sessionLoading,
    logInWithProviders,
    logOut,
  }
}
