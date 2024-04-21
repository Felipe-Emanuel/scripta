import { motion, AnimatePresence } from 'framer-motion'
import { FormProvider } from 'react-hook-form'

import { State } from '@features/books/BooksUtils'
import { Form } from '@shared/components'
import { TRootComponent } from '@shared/types'
import { NewBookFormActions } from './components/NewBookFormActions'
import { useNewBookController } from '../controller'
import { newBookWrapperFormVariants } from '../NewBookUtils'
import { newBookFormWrapperRootTV, newBookFormWrapperTV } from '../NewBookTV'

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
