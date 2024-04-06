'use client'

import { authFormRootTV } from '@features/auth/AuthTV'
import { useAuthController } from '@features/auth/controller'
import { AuthForm } from '@features/auth/views/forms/AuthForm'
import { RegisterForm } from '@features/auth/views/forms/RegisterForm'
import { Form } from '@shared/components'
import { motion, AnimatePresence } from 'framer-motion'
import { FormProvider } from 'react-hook-form'

export function AuthenticationForm() {
  const {
    authFormSchema,
    isAuth,
    strongPasswordMessage,
    handleSubmit,
    changeAuthPageContent,
    onSubmit,
  } = useAuthController()

  const authVariants = {
    showAuth: { x: 0 },
    hideAuth: { x: '-100vw' },
    exit: { x: '-100vw' },
  }

  const registerVariants = {
    showRegister: { x: 0 },
    hideRegister: { x: '100vw' },
    exit: { x: '100vw' },
  }

  return (
    <FormProvider {...authFormSchema}>
      <Form onSubmit={handleSubmit(onSubmit)} className={authFormRootTV()}>
        <AnimatePresence>
          {isAuth && (
            <motion.div
              transition={{ duration: 0.1 }}
              animate={isAuth ? 'showAuth' : 'hideAuth'}
              exit="exit"
              variants={authVariants}
            >
              <AuthForm changeAuthPageContent={changeAuthPageContent} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isAuth && (
            <motion.div
              transition={{ duration: 0.1 }}
              exit="exit"
              animate={!isAuth ? 'showRegister' : 'hideRegister'}
              variants={registerVariants}
            >
              <RegisterForm
                strongPasswordMessage={strongPasswordMessage}
                changeAuthPageContent={changeAuthPageContent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Form>
    </FormProvider>
  )
}
