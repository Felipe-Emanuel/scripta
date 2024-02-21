import { TAuthSubmitSchema, authSubmitSchema } from '@features/auth/AuthUtils'
import { auth, createUser } from '@features/auth/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCookie } from '@shared/hooks/useCookies'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { session } from '@shared/utils/constants/cookies'
import { isPasswordStrong } from '@shared/utils/validation'
import { getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useAuthController = () => {
  const { push } = useRouter()
  const { createSession } = useCookie()
  const [strongPasswordMessage, setStrongPasswordMessage] = useState<
    'Senha fraca' | ''
  >('Senha fraca')
  const [authPageContent, setAuthPageContent] = useState<'auth' | 'register'>(
    'auth',
  )

  const isAuth = authPageContent === 'auth'

  const authFormSchema = useForm<TAuthSubmitSchema>({
    resolver: zodResolver(authSubmitSchema),
    defaultValues: {
      email: '',
      name: null,
      password: '',
    },
  })

  const { handleSubmit, reset, watch } = authFormSchema

  const handleAuthentication = async (
    email: string,
    password: string,
    name?: string,
  ) => {
    if (isAuth) {
      return await auth({ email, password })
    } else if (name) {
      return await createUser({ email, name, password })
    }
  }

  const onSubmit = async (data: TAuthSubmitSchema) => {
    const provider = await getProviders()

    const { name, email, password } = data

    const user = await handleAuthentication(email, password, name || '')

    const userSession = {
      ...user,
      provider: provider?.id,
    }

    if (user?.accessToken) {
      push(APP_ROUTES.private.dashboard.name)
      return createSession({
        cookieName: session ?? '',
        value: JSON.stringify(userSession),
      })
    }
  }

  const changeAuthPageContent = () => {
    setStrongPasswordMessage('')
    reset()
    isAuth ? setAuthPageContent('register') : setAuthPageContent('auth')
  }

  const password = watch('password')
  const resetStrongPasswordMessage = () => setStrongPasswordMessage('')

  useEffect(() => {
    !isPasswordStrong(password) && password?.length >= 8
      ? setStrongPasswordMessage('Senha fraca')
      : resetStrongPasswordMessage()
  }, [password])

  return {
    authFormSchema,
    isAuth,
    strongPasswordMessage,
    handleSubmit,
    changeAuthPageContent,
    onSubmit,
  }
}
