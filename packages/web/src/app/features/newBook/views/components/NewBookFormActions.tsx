import { State } from '@features/books/BooksUtils'
import { Button } from '@nextui-org/react'
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

  return (
    <div
      className={`flex items-center ${state.progress > 1 ? 'justify-between' : 'justify-end'} w-full py-2 md:py-4`}
    >
      {state.progress > 1 && (
        <Button
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
