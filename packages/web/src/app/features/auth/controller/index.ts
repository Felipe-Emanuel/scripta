import { TAuthSubmitSchema, authSubmitSchema } from '@features/auth/AuthUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { isPasswordStrong } from '@shared/utils/validation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useAuthController = () => {
  const [strongPasswordMessage, setStrongPasswordMessage] = useState<
    'Senha fraca' | ''
  >('Senha fraca')
  const [authPageContent, setAuthPageContent] = useState<'auth' | 'register'>(
    'auth',
  )

  const authFormSchema = useForm<TAuthSubmitSchema>({
    resolver: zodResolver(authSubmitSchema),
  })

  const { handleSubmit, reset, watch } = authFormSchema

  const onSubmit = (data: TAuthSubmitSchema) => console.log(data)

  const changeAuthPageContent = () => {
    setStrongPasswordMessage('')
    reset()
    authPageContent === 'auth'
      ? setAuthPageContent('register')
      : setAuthPageContent('auth')
  }

  const isAuth = authPageContent === 'auth'

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
