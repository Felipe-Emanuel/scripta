import { Button } from "@heroui/react"

import { State } from '@features/books/BooksUtils'
import { newBookFormActionsTV } from '@features/newBook/NewBookTV'
import { Icon, Text } from '@shared/components'

import { IoChevronBack, IoChevronForward, IoCloudDone } from 'react-icons/io5'
import { toast } from 'react-toastify'

interface INewBookFormActionsProps {
  handleBackFormState: VoidFunction
  handleNextFormState: VoidFunction
  handleNewBookSubmit: VoidFunction
  state: State
  isValid: boolean
}

export function NewBookFormActions({
  handleBackFormState,
  handleNextFormState,
  handleNewBookSubmit,
  state,
  isValid
}: INewBookFormActionsProps) {
  const isLastStateOfNewBookForm = state.stage === 'OVERVIEW'
  const submitButtonIcon = isLastStateOfNewBookForm ? IoCloudDone : IoChevronForward

  const progressPositive = state.progress > 1

  const submitBook = () => {
    handleNewBookSubmit()

    !isValid && toast.info('Confira as informações do seu livro')
  }

  return (
    <div className={newBookFormActionsTV({ progressPositive })}>
      {progressPositive && (
        <Button
          data-testid="new-book-form-action"
          size="sm"
          onClick={handleBackFormState}
          type="button"
          variant="bordered"
          color="secondary"
          startContent={<Icon icon={IoChevronBack} size="md" color="white" />}
        >
          <Text size="sm" text={state.lastLabel} color="white" />
        </Button>
      )}
      <Button
        data-testid="new-book-form-action"
        size="sm"
        color="primary"
        onClick={() => (isLastStateOfNewBookForm ? submitBook() : handleNextFormState())}
        endContent={<Icon icon={submitButtonIcon} size="md" color="white" />}
      >
        <Text size="sm" text={isLastStateOfNewBookForm ? 'Publicar' : state.label} />
      </Button>
    </div>
  )
}
