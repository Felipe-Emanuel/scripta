import { motion, AnimatePresence } from 'framer-motion'
import { FormProvider } from 'react-hook-form'

import { State } from '@features/books/BooksUtils'
import { Form } from '@shared/components'
import { TRootComponent } from '@shared/types'
import { NewBookFormActions } from './components/NewBookFormActions'
import { useNewBookController } from '../controller'
import { newBookWrapperFormVariants } from '../NewBookUtils'
import { newBookFormWrapperRootTV, newBookFormWrapperTV } from '../NewBookTV'
import { useEffect } from 'react'
import { useBook } from '@shared/hooks/contexts/useBook'

interface INewBookFormWrapperProps extends TRootComponent {
  handleBackFormState: () => void
  handleNextFormState: () => void
  state: State
}

export function NewBookFormWrapper({
  children,
  state,
  handleNextFormState,
  handleBackFormState
}: INewBookFormWrapperProps) {
  const { showForm, handleToggleCreateBook } = useBook()
  const { bookSchema, isFirstAccess, isSubmitSuccessful, handleSubmit, onSubmit, clearDraft } =
    useNewBookController()

  useEffect(() => {
    if (isSubmitSuccessful) {
      handleToggleCreateBook()
      clearDraft()
    }

    return () => {
      if (showForm) handleToggleCreateBook()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.2 }}
        animate={showForm ? 'showCreateBookForm' : 'hideCreateBookForm'}
        exit="exit"
        variants={newBookWrapperFormVariants}
        className={newBookFormWrapperRootTV({ isFirstAccess })}
      >
        <FormProvider {...bookSchema}>
          <Form onSubmit={handleSubmit(onSubmit)} className={newBookFormWrapperTV()}>
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
