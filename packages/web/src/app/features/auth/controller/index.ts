import { TAuthSubmitSchema, authSubmitSchema } from '@features/auth/AuthUtils'
import { auth, createUser } from '@features/auth/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCookie } from '@shared/hooks/useCookies'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { session } from '@shared/utils/constants/cookies'
import { isPasswordStrong } from '@shared/utils/validation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TSessionCustomer } from '@shared/types'
import { toast } from 'react-toastify'

export const useAuthController = () => {
  const { push } = useRouter()
  const { createSession } = useCookie()
  const [strongPasswordMessage, setStrongPasswordMessage] = useState<'Senha fraca' | ''>(
    'Senha fraca'
  )
  const [authPageContent, setAuthPageContent] = useState<'auth' | 'register'>('auth')

  const isAuth = authPageContent === 'auth'

  const authFormSchema = useForm<TAuthSubmitSchema>({
    resolver: zodResolver(authSubmitSchema),
    defaultValues: {
      email: '',
      password: '',
      name: null
    }
  })

  const { handleSubmit, reset, watch } = authFormSchema

  const toastId = 'auth'
  const handleAuthentication = async (email: string, password: string, name?: string) => {
    toast.loading(isAuth ? 'Autenticando...' : 'Criando usuário...', { toastId })

    if (isAuth) {
      return await auth({ email, password })
    } else if (name) {
      return await createUser({
        user: { email, name, password }
      })
    }
  }

  const onSubmit = async (data: TAuthSubmitSchema) => {
    const { name, email, password } = data

    const user = await handleAuthentication(email, password, name || '')

    if (user?.message) {
      return toast.update(toastId, {
        render: `Não conseguimos criar sua conta, ${name}: ${user?.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000
      })
    }

    if (user?.accessToken) {
      toast.update(toastId, {
        render: name ? `Seu usuário foi criado, ${name}` : 'Autenticado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000
      })

      const userSession: TSessionCustomer = {
        accessToken: user?.accessToken,
        picture: user?.picture,
        name: user?.name
      }

      push(APP_ROUTES.private.dashboard.name)

      return createSession({
        cookieName: session,
        value: JSON.stringify(userSession)
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
    onSubmit
  }
}
