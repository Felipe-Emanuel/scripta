'use client'

import { TRootComponent } from '@shared/types'
import { motion, AnimatePresence } from 'framer-motion'
import { newBookWrapperFormVariants } from '../NewBookUtils'
import { FormProvider } from 'react-hook-form'
import { useNewBookController } from '../controller'
import { Form } from '@shared/components'
import { NewBookFormActions } from './components/NewBookFormActions'
import { State } from '@features/books/BooksUtils'

interface INewBookFormWrapperProps extends TRootComponent {
  handleBackFormState: () => void
  handleNextFormState: () => void
  showForm: boolean
  state: State
}

export function NewBookFormWrapper({
  showForm,
  children,
  state,
  handleNextFormState,
  handleBackFormState
}: INewBookFormWrapperProps) {
  const { bookSchema, isFirstAccess, handleSubmit, onSubmit } = useNewBookController()

  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.2 }}
        animate={showForm ? 'showCreateBookForm' : 'hideCreateBookForm'}
        exit="exit"
        variants={newBookWrapperFormVariants}
        className={`fixed duration-500 inset-0 z-0 bg-primary-background flex items-center justify-center pt-12 pl-24 md:pl-28 pr-2 md:pr-4 ${isFirstAccess ? 'hidden' : 'visible'}`}
      >
        <FormProvider {...bookSchema}>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[50rem] flex flex-col overflow-hidden py-3"
          >
            {children}
            <NewBookFormActions
              handleNewBookSubmit={handleSubmit(onSubmit)}
              handleBackFormState={handleBackFormState}
              handleNextFormState={handleNextFormState}
              state={state}
            />
          </Form>
        </FormProvider>
      </motion.div>
    </AnimatePresence>
  )
}
