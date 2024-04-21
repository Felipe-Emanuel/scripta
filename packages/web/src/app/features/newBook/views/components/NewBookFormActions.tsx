import { Button } from '@nextui-org/react'

import { State } from '@features/books/BooksUtils'
import { newBookFormActionsTV } from '@features/newBook/NewBookTV'
import { Icon, Text } from '@shared/components'

import { IoChevronBack, IoChevronForward, IoCloudDone } from 'react-icons/io5'

interface INewBookFormActionsProps {
  handleBackFormState: () => void
  handleNextFormState: () => void
  handleNewBookSubmit: () => void
  state: State
}

export function NewBookFormActions({
  state,
  handleBackFormState,
  handleNextFormState,
  handleNewBookSubmit
}: INewBookFormActionsProps) {
  const isLastStateOfNewBookForm = state.stage === 'OVERVIEW'
  const submitButtonIcon = isLastStateOfNewBookForm ? IoCloudDone : IoChevronForward

  const progressPositive = state.progress > 1

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
        onClick={() => (isLastStateOfNewBookForm ? handleNewBookSubmit() : handleNextFormState())}
        endContent={<Icon icon={submitButtonIcon} size="md" color="white" />}
      >
        <Text size="sm" text={isLastStateOfNewBookForm ? 'Publicar' : state.label} />
      </Button>
    </div>
  )
}
